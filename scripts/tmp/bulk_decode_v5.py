#!/usr/bin/env python3
"""Bulk decode all jsjiami v5 WEI_*.js files in place."""

import re
import sys
import json
import base64
import urllib.parse
from pathlib import Path


def rc4_keystream(key: str, n: int) -> list:
    s = list(range(256))
    j = 0
    for i in range(256):
        j = (j + s[i] + ord(key[i % len(key)])) & 0xff
        s[i], s[j] = s[j], s[i]
    i = j = 0
    out = []
    for _ in range(n):
        i = (i + 1) & 0xff
        j = (j + s[i]) & 0xff
        s[i], s[j] = s[j], s[i]
        out.append(s[(s[i] + s[j]) & 0xff])
    return out


def decode_jsjiami(encoded_b64: str, key: str) -> str:
    try:
        raw = base64.b64decode(encoded_b64)
        url_encoded = ''.join(f'%{b:02x}' for b in raw)
        url_decoded = urllib.parse.unquote(url_encoded)
        ks = rc4_keystream(key, len(url_decoded))
        result_chars = []
        for c, k in zip(url_decoded, ks):
            xored = ord(c) ^ k
            if xored > 0xFFFF:
                xored &= 0xFFFF
            result_chars.append(chr(xored))
        return ''.join(result_chars)
    except Exception:
        return ''


def extract_string_array(js_code: str):
    m = re.search(r"(__0x[0-9a-f]+)\s*=\s*\[(.*?)\];", js_code, re.DOTALL)
    if not m:
        return None, None
    raw = m.group(2)
    parts = re.findall(r"'((?:[^'\\]|\\.)*)'", raw)
    return m.group(1), parts


def extract_rotation(js_code: str):
    m = re.search(r"\(\s*__0x[0-9a-f]+\s*,\s*0x([0-9a-f]+)\s*\)", js_code)
    if m:
        return int(m.group(1), 16)
    return 0


def find_decode_calls(js_code: str):
    return re.findall(r"_0x[0-9a-f]+\('0x([0-9a-f]+)'\s*,\s*'([^']*)'\)", js_code)


def decode_all_strings(js_code: str) -> dict:
    arr_name, arr = extract_string_array(js_code)
    if not arr:
        return {}
    rotation = extract_rotation(js_code)
    if rotation and len(arr):
        rotation = rotation % len(arr)
        if rotation:
            arr = arr[rotation:] + arr[:rotation]
    calls = find_decode_calls(js_code)
    decoded = {}
    for hex_idx, key in set(calls):
        idx = int(hex_idx, 16)
        if idx < len(arr):
            val = decode_jsjiami(arr[idx], key)
            decoded[(hex_idx, key)] = val
    return decoded


def replace_calls_with_values(js_code: str, decoded: dict) -> str:
    if not decoded:
        return js_code
    def replace_call(match):
        hex_idx = match.group(1)
        key = match.group(2)
        if (hex_idx, key) in decoded:
            val = decoded[(hex_idx, key)]
            return json.dumps(val, ensure_ascii=False)
        return match.group(0)
    pattern = r"_0x[0-9a-f]+\('0x([0-9a-f]+)'\s*,\s*'([^']*)'\)"
    return re.sub(pattern, replace_call, js_code)


def extract_header(js_code: str) -> str:
    m = re.match(r'\s*(\/\*[\s\S]*?\*\/)\s*', js_code)
    if m:
        return m.group(1)
    return ''


def find_body_start(result: str) -> int:
    patterns = [
        r'(var\s+_0x[0-9a-f]+\s*=\s*\$response\[)',
        r'(var\s+_0x[0-9a-f]+\s*=\s*\$request\[)',
        r'(let\s+_0x[0-9a-f]+\s*=\s*\$response\[)',
        r'(let\s+_0x[0-9a-f]+\s*=\s*\$request\[)',
        r'(const\s+_0x[0-9a-f]+\s*=\s*\$response\[)',
        r'(const\s+_0x[0-9a-f]+\s*=\s*\$request\[)',
        r'(const\s+[a-zA-Z_$][\w$]*\s*=\s*\$request\[)',
        r'(const\s+[a-zA-Z_$][\w$]*\s*=\s*\$response\[)',
        r'(let\s+[a-zA-Z_$][\w$]*\s*=\s*\$request\[)',
        r'(let\s+[a-zA-Z_$][\w$]*\s*=\s*\$response\[)',
        # Decoded (non-obfuscated) variable names
        r'(var\s+[a-zA-Z_$][\w$]*\s*=\s*\$response\[)',
        r'(var\s+[a-zA-Z_$][\w$]*\s*=\s*\$request\[)',
        r'(let\s+[a-zA-Z_$][\w$]*\s*=\s*\$response\[)',
        r'(let\s+[a-zA-Z_$][\w$]*\s*=\s*\$request\[)',
        r'(if\s*\(\s*\$request\[)',
        r'(if\s*\(\s*\$response\[)',
        r'(if\s*\(\s*typeof\s+_0x[0-9a-f]+\s*===)',
        # Generic const/let _0x...= (no specific value pattern)
        r'(const\s+_0x[0-9a-f]+=)',
        r'(let\s+_0x[0-9a-f]+=)',
    ]
    earliest = -1
    for p in patterns:
        m = re.search(p, result)
        if m:
            pos = m.start()
            if earliest == -1 or pos < earliest:
                earliest = pos
    return earliest


def find_body_end(result: str, body_start: int) -> int:
    candidates = []
    for marker in [r';setInterval\(', r';\(function\(_0x', r'function _0x[0-9a-f]+\(_0x[0-9a-f]+\)\{', r"encode_version\s*=\s*'jsjiami\.com\.v5'"]:
        m = re.search(marker, result[body_start:])
        if m:
            candidates.append(body_start + m.start())
    if candidates:
        return min(candidates)
    return len(result)


def deobfuscate_file(content: str):
    header = extract_header(content)
    decoded = decode_all_strings(content)
    if not decoded:
        return None, None, 0
    result = replace_calls_with_values(content, decoded)
    body_start = find_body_start(result)
    if body_start == -1:
        return header, result, len(decoded)
    body_end = find_body_end(result, body_start)
    main_body = result[body_start:body_end].strip()
    if main_body and not main_body.endswith(';') and not main_body.endswith('}'):
        main_body += ';'
    return header, main_body, len(decoded)


def write_text(path: Path, text: str):
    """Write text to path handling surrogates."""
    # Use bytes write to avoid codec errors
    data = text.encode('utf-8', errors='surrogateescape').decode('utf-8', errors='replace')
    path.write_text(data, encoding='utf-8')


def main():
    apps_dir = Path('/sdcard/opencode/scripts/apps')
    backup_dir = apps_dir / '_originals'
    backup_dir.mkdir(exist_ok=True)
    
    v5_files = sorted(apps_dir.glob('WEI_*.js'))
    v5_files = [f for f in v5_files if '_originals' not in str(f)]
    v5_files = [f for f in v5_files if 'jsjiami.com.v5' in f.read_text(encoding='utf-8', errors='replace')]
    
    print(f"Found {len(v5_files)} v5 files to process\n")
    
    total_orig = 0
    total_new = 0
    success = 0
    failed = []
    partial = []
    
    for f in v5_files:
        content = f.read_text(encoding='utf-8', errors='replace')
        orig_size = len(content)
        
        header, body, decoded = deobfuscate_file(content)
        
        if decoded == 0 or not body:
            failed.append(f.name)
            continue
        
        new_content = f'{header}\n\n"use strict";\n\n{body}\n'
        new_size = len(new_content)
        
        backup_path = backup_dir / f.name
        if not backup_path.exists():
            write_text(backup_path, content)
        
        write_text(f, new_content)
        
        if new_size < orig_size * 0.5:
            success += 1
        else:
            partial.append((f.name, orig_size, new_size))
        
        total_orig += orig_size
        total_new += new_size
    
    print(f"=== BULK DECODE COMPLETE ===")
    print(f"Total files: {len(v5_files)}")
    print(f"Successful (<50% original): {success}")
    print(f"Partial (>=50%): {len(partial)}")
    print(f"Failed: {len(failed)}")
    if failed:
        print(f"Failed: {', '.join(failed[:10])}")
    if partial:
        print(f"\nPartial files (>50% original):")
        for name, orig, new in partial[:15]:
            print(f"  {name}: {orig} -> {new} ({new*100//orig}%)")
    print(f"\nTotal chars: {total_orig} -> {total_new} ({100 - total_new*100//total_orig}% reduction)")


if __name__ == '__main__':
    main()
