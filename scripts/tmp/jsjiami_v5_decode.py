#!/usr/bin/env python3
"""Full deobfuscation pipeline for jsjiami v5 scripts.

Takes an obfuscated JS file and produces a clean plaintext version:
1. Decodes all _0xNNNN('0xHEX','KEY') calls (RC4 + URL decode)
2. Replaces calls with literal string values
3. Removes:
   - The header comment (Quantumult X config)
   - The encode_version, string array, rotation IIFE
   - The decoder function
   - The IIFE debug-protection wrapper at the end
4. Preserves the main script logic (var declarations, if/else, $done)
"""

import re
import sys
import json
import base64
import urllib.parse
from pathlib import Path


def rc4_keystream(key: str, n: int) -> list:
    """Generate n bytes of RC4 keystream."""
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
    """Decode a single jsjiami v5 string.

    Algorithm (from JS source):
      1. atob(b64) -> string of bytes (each char's charCode = one byte)
      2. URL-encode each char as '%XX', then decodeURIComponent
         This decodes UTF-8 sequences: multi-byte UTF-8 becomes single Unicode chars
      3. RC4 the URL-decoded string: for each char c, output = String.fromCharCode(c.charCodeAt(0) ^ keystream_byte)
    """
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
    except Exception as e:
        return ''


def extract_string_array(js_code: str):
    """Extract the __0xNNNNN=[...] array from the obfuscated code."""
    m = re.search(r"(__0x[0-9a-f]+)\s*=\s*\[(.*?)\];", js_code, re.DOTALL)
    if not m:
        return None, None
    raw = m.group(2)
    parts = re.findall(r"'((?:[^'\\]|\\.)*)'", raw)
    return m.group(1), parts


def extract_rotation(js_code: str):
    """Find the rotation parameter (0xN in (...)(arr, 0xN)).

    The rotation function does: while(--c) { arr.push(arr.shift()); }
    With c = N+1 (because the wrapper does ++N first), effective shifts = N.
    """
    m = re.search(r"\(\s*__0x[0-9a-f]+\s*,\s*0x([0-9a-f]+)\s*\)", js_code)
    if m:
        return int(m.group(1), 16)
    return 0


def find_decode_calls(js_code: str):
    """Find all _0xNNNN('0xHEX','KEY') calls."""
    return re.findall(r"_0x[0-9a-f]+\('0x([0-9a-f]+)'\s*,\s*'([^']*)'\)", js_code)


def decode_all_strings(js_code: str) -> dict:
    """Decode all unique strings in the obfuscated code."""
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
    """Replace all _0xNNNN('0xHEX','KEY') calls with their decoded values."""
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
    """Extract the leading /* ... */ comment block (Quantumult X header)."""
    m = re.match(r'\s*(\/\*[\s\S]*?\*\/)\s*', js_code)
    if m:
        return m.group(1)
    return ''


def deobfuscate_file(content: str) -> tuple:
    """Full deobfuscation pipeline. Returns (header, body, decoded_strings)."""
    header = extract_header(content)

    # 1. Decode all strings
    decoded = decode_all_strings(content)
    if not decoded:
        return header, content, {}

    # 2. Replace all decode calls with literal values
    result = replace_calls_with_values(content, decoded)

    # 3. Find the start of the main body (after decoder function)
    # The decoder function ends with `};` after the last return.
    # The main body starts with `var _0x5dbd9c=` or `var _0x...=$response[`
    # We use $response[ or $request[ as the main body marker.

    body_start_match = re.search(r'(var\s+_0x[0-9a-f]+\s*=\s*\$response\[)', result)
    if not body_start_match:
        return header, result, decoded

    body_start = body_start_match.start()

    # 4. Find the end of the main body (the $done(...) call)
    body_end_match = re.search(r'\$done\s*\(', result[body_start:])
    if not body_end_match:
        return header, result[body_start:], decoded

    body_end = body_start + body_end_match.end()
    # Find the closing paren of $done(...)
    depth = 1
    pos = body_end
    while pos < len(result) and depth > 0:
        if result[pos] == '(':
            depth += 1
        elif result[pos] == ')':
            depth -= 1
        pos += 1
    body_end = pos

    # 5. Extract the main body
    main_body = result[body_start:body_end]

    return header, main_body, decoded


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python3 jsjiami_v5_decode.py <input.js> [output.js]")
        sys.exit(1)

    input_file = Path(sys.argv[1])
    output_file = Path(sys.argv[2]) if len(sys.argv) > 2 else None

    content = input_file.read_text(encoding='utf-8', errors='replace')
    header, body, decoded = deobfuscate_file(content)

    if decoded:
        print(f"=== {input_file.name} ===")
        print(f"Decoded {len(decoded)} unique strings")
        for (hex_idx, key), val in sorted(decoded.items(), key=lambda x: int(x[0][0], 16))[:5]:
            print(f"  '0x{hex_idx}','{key}' = {val!r}")

    if output_file:
        # Format: header + 'use strict' + body
        output = f'{header}\n\n"use strict";\n\n{body}\n'
        output_file.write_text(output, encoding='utf-8')
        print(f"\nWrote deobfuscated to {output_file}")
        print(f"Original: {len(content)} chars, Decoded: {len(output)} chars")
