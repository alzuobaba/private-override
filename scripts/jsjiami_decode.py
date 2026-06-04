#!/usr/bin/env python3
""" jsjiami.com.v5 deobfuscator for Stash override generation """

import re, json, base64, urllib.parse, sys, os

def rc4_decrypt(data: bytes, key: str) -> str:
    s = list(range(256))
    j = 0
    for i in range(256):
        j = (j + s[i] + ord(key[i % len(key)])) & 0xff
        s[i], s[j] = s[j], s[i]
    i = j = 0
    out = []
    for b in data:
        i = (i + 1) & 0xff
        j = (j + s[i]) & 0xff
        s[i], s[j] = s[j], s[i]
        out.append(b ^ s[(s[i] + s[j]) & 0xff])
    return bytes(out).decode('utf-8', errors='replace')

def decode_jsjiami_string(encoded_b64: str, key: str) -> str:
    raw = base64.b64decode(encoded_b64)
    url_enc = ''.join(f'%{b:02x}' for b in raw)
    decoded_str = urllib.parse.unquote(url_enc)
    return rc4_decrypt(decoded_str.encode('latin1'), key)

def extract_string_array(js_code: str):
    m = re.search(r"__0x119fc6=\[(.*?)\];", js_code, re.DOTALL)
    if not m:
        return None
    raw = m.group(1)
    parts = re.findall(r"'([^']*)'", raw)
    return parts

def extract_rotation(js_code: str):
    m = re.search(r'}\(__0x119fc6,0x([0-9a-f]+)\)\)', js_code)
    if m:
        return int(m.group(1), 16)
    return 0

def extract_header(js_code: str):
    lines = js_code.split('\n')
    header_lines = []
    in_header = False
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('/*') or stripped.startswith('/**'):
            in_header = True
        if in_header:
            header_lines.append(line)
        if stripped == '*/' and in_header:
            break
    return '\n'.join(header_lines)

def extract_url_patterns(js_code: str):
    """ Extract rewrite/match URL patterns from header comments """
    header = extract_header(js_code)
    patterns = []
    for line in header.split('\n'):
        if 'url script-response-body' in line or 'url script-request-body' in line or 'url response-body' in line or 'url request-body' in line:
            m = re.search(r'(https?://[^\s]+)', line)
            if m:
                patterns.append(m.group(1))
    return patterns

def extract_hostname(js_code: str):
    header = extract_header(js_code)
    m = re.search(r'hostname\s*=\s*([^\s]+)', header)
    if m:
        return m.group(1)
    return None

def extract_script_type(js_code: str):
    header = extract_header(js_code)
    if 'url script-response-body' in header:
        return 'response'
    if 'url script-request-body' in header:
        return 'request'
    if 'url response-body' in header:
        return 'response'
    if 'url request-body' in header:
        return 'request'
    return 'response'

def decode_all_strings(js_code: str):
    arr = extract_string_array(js_code)
    if not arr:
        return {}
    rotation = extract_rotation(js_code)
    
    # Apply rotation
    if rotation:
        rotation = rotation % len(arr)
        arr = arr[-rotation:] + arr[:-rotation]
    
    # Find all _0x4418('0x...', 'key') calls
    calls = re.findall(r"_0x4418\('0x([0-9a-f]+)','([^']*)'\)", js_code)
    
    decoded = {}
    for hex_idx, key in set(calls):
        idx = int(hex_idx, 16)
        if idx < len(arr):
            try:
                val = decode_jsjiami_string(arr[idx], key)
                decoded[(hex_idx, key)] = val
            except:
                pass
    return decoded

def extract_const_strings(js_code: str):
    """ Find const _0x... = _0x4418(...) patterns to identify URL path fragments """
    decoded = decode_all_strings(js_code)
    consts = {}
    for m in re.finditer(r"const\s+(_0x[0-9a-f]+)\s*=\s*_0x4418\('0x([0-9a-f]+)','([^']*)'\)", js_code):
        var_name = m.group(1)
        hex_idx = m.group(2)
        key = m.group(3)
        val = decoded.get((hex_idx, key), '')
        consts[var_name] = val
    return consts

def extract_mitm_domains(pattern_url: str):
    """ Extract MITM domains from a URL pattern """
    domains = []
    m = re.search(r'https?://([^/]+)', pattern_url)
    if m:
        domain = m.group(1)
        if domain.startswith('*.'):
            domains.append(domain[1:])  # .domain.com
            domains.append(domain[2:])  # domain.com
        else:
            domains.append(domain)
    return domains

def extract_app_name(filename: str):
    name = filename.replace('.js', '')
    # Map common abbreviations
    name_map = {
        '666syh': '666书友会',
        '666.syh': '666书友会',
    }
    if name in name_map:
        return name_map[name]
    return name

def jsjiami_to_plaintext(obfuscated_js: str) -> str:
    """
    Attempt to reconstruct plaintext JS from jsjiami obfuscated code.
    Returns the reconstructed JS or empty string if failed.
    """
    decoded = decode_all_strings(obfuscated_js)
    if not decoded:
        return ""
    
    # Build decoded string mapping
    str_map = {}
    for (hex_idx, key), val in decoded.items():
        str_map[f"('0x{hex_idx}','{key}')"] = val
    
    # Basic reconstruction: replace _0x4418 calls with their decoded values
    result = obfuscated_js
    for call_sig, val in sorted(str_map.items(), key=lambda x: -len(x[0])):
        escaped_val = json.dumps(val, ensure_ascii=False)
        result = result.replace(f'_0x4418{call_sig}', escaped_val)
    
    return result

def generate_stoverride(app_name: str, mitm_domains: list, match_patterns: list, script_type: str, filename_base: str):
    st_name = app_name.replace("'", "\\'")
    
    lines = []
    lines.append(f"name: '{st_name}'")
    lines.append("desc: |-")
    lines.append(f"  由 WeiGiegie/666 仓库改写为 Stash 格式明文脚本。")
    mitm_str = ', '.join(mitm_domains)
    lines.append(f"  MITM: {mitm_str}")
    lines.append(f"  拦截 {len(match_patterns)} 个接口响应。")
    lines.append("author: alzuobaba (rewritten from WeiGiegie/666)")
    lines.append("homepage: https://github.com/alzuobaba/private-override")
    lines.append("category: '解锁'")
    lines.append("date: '2026-06-04'")
    lines.append("version: '1.0.0'")
    lines.append("")
    lines.append("http:")
    lines.append("  mitm:")
    for d in set(mitm_domains):
        if d.startswith('.'):
            lines.append(f"    - '{d}'")
        else:
            lines.append(f"    - {d}")
    lines.append("")
    lines.append("  script:")
    for i, pat in enumerate(match_patterns):
        script_name = f"JS_{filename_base}_{i}" if len(match_patterns) > 1 else f"JS_{filename_base}"
        lines.append(f"    - match: '{pat}'")
        lines.append(f"      name: {script_name}")
        lines.append(f"      type: {script_type}")
        lines.append(f"      require-body: true")
        lines.append(f"      timeout: 5")
    lines.append("")
    lines.append("script-providers:")
    script_names = set()
    for i, pat in enumerate(match_patterns):
        script_name = f"JS_{filename_base}_{i}" if len(match_patterns) > 1 else f"JS_{filename_base}"
        if script_name not in script_names:
            script_names.add(script_name)
            lines.append(f"  {script_name}:")
            lines.append(f"    url: https://raw.githubusercontent.com/alzuobaba/private-override/main/scripts/apps/{filename_base}.js")
            lines.append(f"    interval: 86400")
    
    return '\n'.join(lines)

def generate_js_template(app_name: str, match_patterns: list, script_type: str, decoded_strings: dict):
    lines = []
    lines.append('"use strict"')
    lines.append('')
    lines.append(f"console.log($script.name)")
    lines.append(f"console.log($script.name + ' {app_name} 解锁')")
    lines.append('')
    lines.append('var url = $request.url')
    lines.append('var body = $response.body')
    lines.append('')
    lines.append("if (!body) { $done({}) }")
    lines.append('')
    lines.append('var obj')
    lines.append("try { obj = JSON.parse(body) } catch (e) {")
    lines.append("  console.log($script.name + ' parse error: ' + e)")
    lines.append("  $done({})")
    lines.append('}')
    lines.append('')
    lines.append("if (!obj || !obj.data) { $done({}) }")
    lines.append('')
    lines.append("console.log($script.name + ' matched: ' + url)")
    lines.append("console.log($script.name + ' data keys: ' + Object.keys(obj.data).join(', '))")
    lines.append('')
    lines.append('// TODO: customize field modifications based on HAR capture')
    lines.append('// Current fields from original script analysis:')
    for k, v in list(decoded_strings.items())[:10]:
        lines.append(f"// {k}: {v}")
    lines.append('')
    lines.append('$done({ body: JSON.stringify(obj) })')
    lines.append('')
    return '\n'.join(lines)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python3 jsjiami_decode.py <input.js> [output_dir]")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else '/sdcard/opencode'
    
    with open(input_file, 'r', encoding='utf-8', errors='replace') as f:
        js = f.read()
    
    filename = os.path.basename(input_file)
    app_name = extract_app_name(filename)
    
    print(f"=== {filename} ===")
    
    patterns = extract_url_patterns(js)
    print(f"  URL patterns: {patterns}")
    
    hostname = extract_hostname(js)
    print(f"  Hostname: {hostname}")
    
    decoded = decode_all_strings(js)
    print(f"  Decoded strings: {len(decoded)}")
    
    consts = extract_const_strings(js)
    print(f"  Const variables: {consts}")
    
    # Output decoded strings for analysis
    for (hex_idx, key), val in sorted(decoded.items(), key=lambda x: int(x[0][0], 16)):
        print(f"    _0x4418('0x{hex_idx}','{key}') = {repr(val)}")
