import urllib.request
import urllib.error
import re
import os
import time
import json

BATCH_FILE = '/sdcard/opencode/scripts/tmp/batch_4.txt'
SCRIPTS_DIR = '/sdcard/opencode/scripts/apps'
OVERRIDE_DIR = '/sdcard/opencode'
BASE_URL = 'https://raw.githubusercontent.com/WeiGiegie/666/main/'
STASH_SCRIPT_BASE = 'https://raw.githubusercontent.com/alzuobaba/private-override/main/scripts/apps/'
TODAY = '2026-06-04'

os.makedirs(SCRIPTS_DIR, exist_ok=True)

# Read existing overrides to avoid duplicates
existing_overrides = set()
if os.path.isdir(OVERRIDE_DIR):
    for f in os.listdir(OVERRIDE_DIR):
        if f.endswith('.stoverride'):
            existing_overrides.add(f[:-len('.stoverride')].lower())

print(f"Existing overrides ({len(existing_overrides)}): {sorted(existing_overrides)[:20]}...")

def parse_header(content):
    """Extract info from JS header comments."""
    result = {
        'app_name': None,
        'hostnames': [],
        'url_patterns': [],       # list of (pattern, type) tuples
        'script_type': None,
        'has_info': False
    }
    
    lines = content.split('\n')
    in_header = False
    header_lines = []
    
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('/*') or stripped.startswith('/*'):
            in_header = True
            header_lines.append(line)
            continue
        if in_header:
            if stripped.endswith('*/') or stripped == '*/':
                header_lines.append(line)
                break
            header_lines.append(line)
    
    header_text = '\n'.join(header_lines)
    
    # Extract app name from 脚本功能 line
    m = re.search(r'脚本功能[：:]\s*(.+?)(?:\s*[\r\n]|$)', header_text)
    if m:
        name = m.group(1).strip()
        # Clean up the name - remove trailing special chars
        name = re.sub(r'[（(].*$', '', name).strip()
        name = re.sub(r'[\[【].*$', '', name).strip()
        name = re.sub(r'[-–—].*$', '', name).strip()
        name = name.strip()
        if name:
            result['app_name'] = name
            result['has_info'] = True
    
    # Extract MITM hostnames
    m = re.search(r'hostname\s*=\s*(.+?)(?:\s*[\r\n*]|$)', header_text)
    if m:
        hosts = m.group(1).strip()
        hosts = re.sub(r'\*', '', hosts).strip()
        for h in re.split(r'[,，]\s*', hosts):
            h = h.strip()
            if h and h != '*':
                result['hostnames'].append(h)
                result['has_info'] = True
    
    # Extract URL rewrite patterns and script type
    for line in header_lines:
        raw = line.strip()
        # Try stripping leading * from comment continuation lines
        candidates = [raw]
        if raw.startswith('* '):
            candidates.append(raw[2:].strip())
        elif raw.startswith('*'):
            candidates.append(raw[1:].strip())
        # Also try stripping leading ; (some files use ; as line separator)
        for alt in candidates[:]:
            if alt.startswith(';'):
                candidates.append(alt[1:].strip())
        
        for stripped in candidates:
            # Look for lines with url script-response-body or url script-request-header
            type_keyword = None
            if 'url script-response-body' in stripped:
                type_keyword = 'url script-response-body'
            elif 'url script-request-header' in stripped:
                type_keyword = 'url script-request-header'
            else:
                continue
            
            # Split on the script marker to get URL pattern and type
            parts = stripped.split(type_keyword, 1)
            if len(parts) < 2:
                continue
            
            left_side = parts[0].strip()
            # Remove leading ^ or ;^
            left_side = re.sub(r'^[;^]+', '', left_side).strip()
            
            # Determine script type
            if 'response-body' in type_keyword:
                script_type = 'response'
            else:
                script_type = 'request'
            
            # Only add if we have a valid URL pattern
            if left_side.lower().startswith('http') or left_side.startswith('https?') or left_side.startswith('http?'):
                url_pattern = left_side.replace('\\/', '/')
                result['url_patterns'].append((url_pattern, script_type))
                result['has_info'] = True
            break  # Only use first matching pattern per line
    
    return result

def normalize_for_filename(name):
    """Normalize app name to file-safe name."""
    s = name.strip()
    # Replace path-unfriendly characters
    s = re.sub(r'[:*?"<>|]', '', s)
    s = re.sub(r'[^\w\u4e00-\u9fff\s\-\.]', '_', s)
    s = re.sub(r'_+', '_', s)
    s = s.strip('_')
    return s

def sanitize_filename(name):
    """Remove characters invalid in filenames on Android/FAT32."""
    s = name.strip()
    s = re.sub(r'[:*?"<>|/\\]', '', s)
    return s

def app_name_exists(name, existing_set):
    """Check if app name already has a stoverride file."""
    normalized = normalize_for_filename(name)
    # Check exact, lower, and with underscores
    candidates = [normalized, normalized.lower(), normalized.replace('_', ''), 
                  normalized.replace('_', ' '), normalized.replace(' ', '_').lower()]
    for c in candidates:
        c = c.strip()
        if c in existing_set:
            return True
    return False

def make_stoverride(app_name, hostnames, url_patterns, script_type, filename):
    """Generate .stoverride content."""
    hostnames_clean = [h for h in hostnames if h and h != '*']
    
    mitm_section = ''
    if hostnames_clean:
        mitm_section = '\n'.join(f'    - {h}' for h in hostnames_clean)
    else:
        mitm_section = '    - *'
    
    hostnames_str = ', '.join(hostnames_clean) if hostnames_clean else '*'
    
    script_entries = []
    provider_names = set()
    
    fn_base = filename.replace('.js', '')
    
    for i, (pattern, pat_type) in enumerate(url_patterns):
        regex_pattern = f'^{pattern}$'
        # Generate unique name per pattern
        if len(url_patterns) == 1:
            entry_name = f'WEI_{fn_base}'
        else:
            entry_name = f'WEI_{fn_base}_{i+1}'
        
        entry = {
            'match': regex_pattern,
            'name': entry_name,
            'type': pat_type or script_type or 'response',
        }
        script_entries.append(entry)
    
    if not script_entries:
        return None
    
    script_yaml_parts = []
    for e in script_entries:
        script_yaml_parts.append(f"    - match: '{e['match']}'")
        script_yaml_parts.append(f"      name: {e['name']}")
        script_yaml_parts.append(f"      type: {e['type']}")
        script_yaml_parts.append(f"      require-body: true")
        script_yaml_parts.append(f"      timeout: 5")
    
    script_providers_yaml = []
    for e in script_entries:
        n = e['name']
        if n not in provider_names:
            provider_names.add(n)
            script_providers_yaml.append(f"  {n}:")
            script_providers_yaml.append(f"    url: {STASH_SCRIPT_BASE}{filename}")
            script_providers_yaml.append(f"    interval: 86400")
    
    intercept_count = len(script_entries)
    
    yaml = f"""name: '{app_name}'
desc: |-
  从 WeiGiegie/666 仓库转换。MITM: {hostnames_str}
  拦截 {intercept_count} 个接口。
author: alzuobaba (converted)
homepage: https://github.com/alzuobaba/private-override
category: '解锁'
date: '{TODAY}'
version: '1.0.0'

http:
  mitm:
{mitm_section}

  script:
"""
    yaml += '\n'.join(script_yaml_parts)
    yaml += '\n\nscript-providers:\n'
    yaml += '\n'.join(script_providers_yaml)
    yaml += '\n'
    
    return yaml

# Read batch file
with open(BATCH_FILE, 'r', encoding='utf-8') as f:
    lines = f.readlines()

filenames = []
for line in lines:
    line = line.strip()
    if not line:
        continue
    m = re.match(r'\d+:\s*(.+\.js)', line)
    if m:
        filenames.append(m.group(1))
    elif line.endswith('.js'):
        filenames.append(line)

print(f"Total files to process: {len(filenames)}")

results = {
    'success': [],
    'skipped_exists': [],
    'skipped_no_info': [],
    'error': []
}

for filename in filenames:
    print(f"\n--- Processing {filename} ---")
    
    # Check if script already downloaded
    script_path = os.path.join(SCRIPTS_DIR, f'WEI_{filename}')
    if os.path.exists(script_path):
        print(f"  Script already exists at {script_path}, skipping download")
        # Still read it to check info
        with open(script_path, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
    else:
        # Download
        url = BASE_URL + filename
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=30) as resp:
                content = resp.read().decode('utf-8', errors='replace')
            print(f"  Downloaded {len(content)} bytes")
            # Save
            with open(script_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  Saved to {script_path}")
            time.sleep(0.5)
        except Exception as e:
            print(f"  Error downloading: {e}")
            results['error'].append((filename, str(e)))
            continue
    
    # Parse header
    info = parse_header(content)
    
    if not info['has_info']:
        print(f"  SKIP: No useful header info found")
        results['skipped_no_info'].append((filename, 'No header info'))
        continue
    
    app_name = info['app_name']
    hostnames = info['hostnames']
    url_patterns = [p for p, t in info['url_patterns']]  # keep backward compat
    script_type = info['script_type']
    
    print(f"  App: {app_name}")
    print(f"  Hostnames: {hostnames}")
    print(f"  URL patterns: {len(info['url_patterns'])} patterns")
    for p, t in info['url_patterns']:
        print(f"    [{t}] {p[:80]}...")
    
    if not app_name:
        print(f"  SKIP: No app name found")
        results['skipped_no_info'].append((filename, 'No app name'))
        continue
    
    if not info['url_patterns']:
        print(f"  SKIP: No URL patterns found")
        results['skipped_no_info'].append((filename, 'No URL patterns'))
        continue
    
    if not hostnames:
        print(f"  SKIP: No hostnames found")
        results['skipped_no_info'].append((filename, 'No hostnames'))
        continue
    
    if not app_name:
        print(f"  SKIP: No app name found")
        results['skipped_no_info'].append((filename, 'No app name'))
        continue
        print(f"  SKIP: No hostnames found")
        results['skipped_no_info'].append((filename, 'No hostnames'))
        continue
    
    # Check if stoverride already exists
    if app_name_exists(app_name, existing_overrides):
        print(f"  SKIP: Override already exists for '{app_name}'")
        results['skipped_exists'].append((filename, app_name))
        continue
    
    # Generate stoverride
    override_content = make_stoverride(app_name, hostnames, info['url_patterns'], script_type, filename)
    
    if not override_content:
        print(f"  SKIP: Could not generate override")
        results['skipped_no_info'].append((filename, 'Could not generate'))
        continue
    
    # Save stoverride - use sanitized app name as filename
    safe_name = sanitize_filename(app_name)
    if not safe_name:
        print(f"  SKIP: Invalid app name after sanitization")
        results['skipped_no_info'].append((filename, 'Invalid app name'))
        continue
    override_filename = f"{safe_name}.stoverride"
    override_path = os.path.join(OVERRIDE_DIR, override_filename)
    
    if os.path.exists(override_path):
        print(f"  SKIP: Override file already exists at {override_path}")
        results['skipped_exists'].append((filename, app_name))
        continue
    
    with open(override_path, 'w', encoding='utf-8') as f:
        f.write(override_content)
    print(f"  Created override: {override_path}")
    
    results['success'].append((filename, app_name, override_filename))

print("\n\n============================================")
print("BATCH 4 PROCESSING SUMMARY")
print("============================================")
print(f"Total files in batch: {len(filenames)}")
print(f"Successfully created: {len(results['success'])}")
print(f"Skipped (already exists): {len(results['skipped_exists'])}")
print(f"Skipped (no info): {len(results['skipped_no_info'])}")
print(f"Errors: {len(results['error'])}")

if results['success']:
    print("\n--- Created Overrides ---")
    for filename, app_name, override_file in results['success']:
        print(f"  {filename} -> {override_file}")

if results['skipped_exists']:
    print("\n--- Skipped (already exists) ---")
    for filename, app_name in results['skipped_exists']:
        print(f"  {filename} ({app_name})")

if results['skipped_no_info']:
    print("\n--- Skipped (no info) ---")
    for filename, reason in results['skipped_no_info']:
        print(f"  {filename} ({reason})")

if results['error']:
    print("\n--- Errors ---")
    for filename, err in results['error']:
        print(f"  {filename}: {err}")
