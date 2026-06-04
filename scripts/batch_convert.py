#!/usr/bin/env python3
""" Batch convert WeiGiegie/666 Quantumult X scripts to Stash .stoverride format """
import re, urllib.request, os, sys, json, hashlib

WEI_BASE = 'https://raw.githubusercontent.com/WeiGiegie/666/main/'
OUT_DIR = '/sdcard/opencode'
APPS_DIR = os.path.join(OUT_DIR, 'scripts', 'apps')

os.makedirs(APPS_DIR, exist_ok=True)

def extract_meta(js_code, filename):
    """ Extract metadata from header comments of a jsjiami-obfuscated Quantumult X script """
    header = ''
    lines = js_code.split('\n')
    in_header = False
    for line in lines:
        stripped = line.strip()
        if '/*' in stripped or '/**' in stripped:
            in_header = True
        if in_header:
            header += line + '\n'
        if stripped.rstrip().endswith('*/') and in_header:
            break

    # app description
    desc = ''
    for line in header.split('\n'):
        s = line.strip().lstrip('*').strip()
        if '脚本功能：' in s:
            desc = s.split('脚本功能：', 1)[1].strip()
        elif '功能：' in s:
            desc = s.split('功能：', 1)[1].strip()
        elif '软件版本' in s:
            pass

    # URL patterns from rewrite rules
    patterns = []
    mitm_domains = set()
    for line in header.split('\n'):
        # Extract MITM hostname
        if 'hostname' in line.lower() and '=' in line:
            m = re.search(r'hostname\s*=\s*([^\s]+)', line)
            if m:
                host = m.group(1)
                for h in host.split(','):
                    h = h.strip()
                    if h and h != '*':
                        if h.startswith('*.'):
                            mitm_domains.add(h[2:])
                        else:
                            mitm_domains.add(h)

        # Extract rewrite URL patterns
        for kw in ['url script-response-body', 'url script-request-body',
                    'url response-body', 'url request-body',
                    'url reject', 'url reject-200', 'url reject-dict',
                    'url 302', 'url reject-array']:
            if kw in line:
                # pattern is before the keyword
                m = re.match(r'^\s*(https?://[^\s]+)\s+' + re.escape(kw), line)
                if m:
                    patterns.append(m.group(1))
                break

    # guess script type
    script_type = 'response'
    if 'url script-request-body' in header or 'url request-body' in header:
        script_type = 'request'

    # also extract hostname from patterns
    for p in patterns:
        m = re.search(r'https?://([^/]+)', p)
        if m:
            domain = m.group(1)
            if domain.startswith('*.'):
                mitm_domains.add(domain[2:])
            else:
                mitm_domains.add(domain)

    # app name
    app_name = filename.replace('.js', '')
    # try to get a better name
    for line in header.split('\n'):
        s = line.strip().lstrip('*').strip()
        if '功能' in s and '脚本' not in s:
            m = re.match(r'^(.+?)(?:脚本|解锁|去广告|会员|VIP|付费)', s)
            if m:
                app_name = m.group(1).strip('：: ')
                break

    return {
        'app_name': app_name,
        'desc': desc or f'从 WeiGiegie/666 转换的 Stash 覆写 ({filename})',
        'patterns': patterns,
        'mitm_domains': sorted(mitm_domains),
        'script_type': script_type,
        'header': header,
    }

def generate_stoverride(meta, filename_base):
    """ Generate .stoverride YAML content """
    safe_name = meta['app_name'].replace("'", "\\'")
    lines = []
    lines.append(f"name: '{safe_name}'")
    lines.append("desc: |-")
    if meta['desc']:
        lines.append(f"  {meta['desc']}")
    if meta['mitm_domains']:
        lines.append(f"  MITM: {', '.join(meta['mitm_domains'])}")
    lines.append(f"  从 Quantumult X 格式转换为 Stash 覆写。")
    lines.append(f"  原始脚本来源: WeiGiegie/666")
    lines.append("author: alzuobaba (converted)")
    lines.append("homepage: https://github.com/alzuobaba/private-override")
    lines.append("category: '解锁'")
    lines.append("date: '2026-06-04'")
    lines.append("version: '1.0.0'")
    lines.append("")
    lines.append("http:")

    if meta['mitm_domains']:
        lines.append("  mitm:")
        for d in meta['mitm_domains']:
            if d.startswith('.'):
                lines.append(f"    - '{d}'")
            else:
                lines.append(f"    - {d}")

    if meta['patterns']:
        lines.append("")
        lines.append("  script:")
        for i, pat in enumerate(meta['patterns']):
            script_name = f"WEI_{filename_base}_{i}"
            lines.append(f"    - match: '^{pat.replace('?', '\\?')}$'")
            lines.append(f"      name: {script_name}")
            lines.append(f"      type: {meta['script_type']}")
            lines.append(f"      require-body: true")
            lines.append(f"      timeout: 5")

    lines.append("")
    lines.append("script-providers:")
    seen = set()
    for i, pat in enumerate(meta['patterns']):
        script_name = f"WEI_{filename_base}_{i}"
        if script_name not in seen:
            seen.add(script_name)
            lines.append(f"  {script_name}:")
            lines.append(f"    url: {WEI_BASE}{filename_base}.js")
            lines.append(f"    interval: 86400")

    return '\n'.join(lines)

def generate_readme_entry(app_name, filename_base):
    st_name = f"{app_name}.stoverride"
    url_enc = urllib.parse.quote(st_name)
    st_url = f"https://raw.githubusercontent.com/alzuobaba/private-override/main/{url_enc}"
    return f"| `{st_name}` | `{st_url}` |"

def already_exists(filename_base, existing_files):
    """ Check if this script already exists in the repo """
    for f in existing_files:
        if f.lower() == filename_base.lower() or f.lower() == filename_base.lower().replace('.js', ''):
            return True
        if filename_base.lower() in f.lower():
            return True
    return False

def process_file(filename, existing_overrides):
    """ Process a single JS file from WeiGiegie/666 """
    url = WEI_BASE + filename
    filename_base = filename.replace('.js', '')

    # Skip empty files
    if filename in ('blbldownload.js', 'blblplayurl.js'):
        return None

    # Download
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=30) as f:
            js_code = f.read().decode('utf-8', errors='replace')
    except Exception as e:
        return None

    if not js_code or len(js_code) < 100:
        return None

    meta = extract_meta(js_code, filename)

    # Skip if no patterns and no mitm
    if not meta['patterns'] and not meta['mitm_domains']:
        return None

    # Check if already exists
    if already_exists(filename_base, existing_overrides):
        return None

    # Generate stoverride
    st_content = generate_stoverride(meta, filename_base)
    st_filename = f"{meta['app_name']}.stoverride"
    safe_st_fn = re.sub(r'[\\/*?:"<>|]', '_', st_filename)
    st_path = os.path.join(OUT_DIR, safe_st_fn)

    with open(st_path, 'w', encoding='utf-8') as f:
        f.write(st_content)

    # Generate a simple JS template
    js_template = f'''"use strict"

console.log($script.name)
console.log($script.name + ' {meta["app_name"]} 解锁 (原始脚本来源: WeiGiegie/666)')

var url = $request.url
var body = $response.body

if (!body) {{ $done({{}}) }}

var obj
try {{ obj = JSON.parse(body) }} catch (e) {{
  console.log($script.name + ' parse error: ' + e)
  $done({{}})
}}

if (!obj || !obj.data) {{ $done({{}}) }}

console.log($script.name + ' matched: ' + url)
console.log($script.name + ' response data keys: ' + Object.keys(obj.data).join(', '))

// TODO: add field modifications based on HAR capture
// Refer to original script for exact field modifications:
// {WEI_BASE}{filename}

$done({{ body: JSON.stringify(obj) }})
'''
    js_path = os.path.join(APPS_DIR, f"WEI_{filename_base}.js")
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js_template)

    return {
        'st_path': safe_st_fn,
        'app_name': meta['app_name'],
        'filename_base': filename_base,
        'patterns': meta['patterns'],
        'mitm': meta['mitm_domains'],
        'js_path': f"WEI_{filename_base}.js",
    }

def main():
    # Get list of files from WeiGiegie/666
    api_url = 'https://api.github.com/repos/WeiGiegie/666/git/trees/main?recursive=1'
    req = urllib.request.Request(api_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=30) as f:
        tree_data = json.loads(f.read())

    js_files = sorted([item['path'] for item in tree_data['tree']
                       if item['path'].endswith('.js') and item['size'] > 0])

    # Get existing overrides
    existing = set()
    for root, dirs, files in os.walk(OUT_DIR):
        for f in files:
            if f.endswith('.stoverride'):
                name = f.replace('.stoverride', '')
                existing.add(name)

    # Also check existing JS scripts  
    for root, dirs, files in os.walk(APPS_DIR):
        for f in files:
            if f.endswith('.js'):
                existing.add(f.replace('.js', ''))

    total = len(js_files)
    success = 0
    results = []

    print(f"Total JS files in WeiGiegie/666: {total}")
    print(f"Existing overrides/scripts: {len(existing)}")

    for i, js_file in enumerate(js_files):
        result = process_file(js_file, existing)
        if result:
            success += 1
            results.append(result)
            print(f"  [{i+1}/{total}] OK: {result['app_name']} ({js_file})")
        else:
            print(f"  [{i+1}/{total}] SKIP: {js_file}")

    print(f"\n=== Summary ===")
    print(f"New stoverrides generated: {success}")
    print(f"Skipped (existing/no patterns): {total - success}")

    # Generate README entries
    if results:
        print("\n=== New README entries ===")
        entries_text = ""
        for r in sorted(results, key=lambda x: x['app_name']):
            entry = generate_readme_entry(r['app_name'], r['filename_base'])
            entries_text += entry + "\n"
            print(entry)
        
        # Save entries list
        entries_path = os.path.join(OUT_DIR, 'scripts', 'new_readme_entries.txt')
        with open(entries_path, 'w', encoding='utf-8') as f:
            f.write(entries_text)
        print(f"\nREADME entries saved to: {entries_path}")

if __name__ == '__main__':
    main()
