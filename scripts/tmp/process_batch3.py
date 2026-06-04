import re
import os
import json

DESC_DIR = "/sdcard/opencode/scripts/tmp"
APPS_DIR = "/sdcard/opencode/scripts/apps"
OUT_DIR = "/sdcard/opencode"

os.makedirs(APPS_DIR, exist_ok=True)
os.makedirs(OUT_DIR, exist_ok=True)

with open(os.path.join(DESC_DIR, "batch_3.txt"), "r") as f:
    filenames = [line.strip() for line in f if line.strip()]

results = {"processed": [], "skipped": [], "errors": []}

for fname in filenames:
    basename = fname.replace(".js", "")
    js_path = os.path.join(DESC_DIR, basename + ".js")
    
    if not os.path.exists(js_path) or os.path.getsize(js_path) < 20:
        results["skipped"].append((basename, "File too small or missing"))
        continue
    
    # Check for stoverride already exists
    # We'll check after parsing
    
    with open(js_path, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()
    
    # Check if it's obfuscated/minified without header
    if not content.strip().startswith("/*"):
        results["skipped"].append((basename, "No header comment block"))
        continue
    
    # Extract header section (between /* and */)
    header_match = re.search(r'/\*([^*]*(?:\*(?!/)[^*]*)*)\*/', content, re.DOTALL)
    if not header_match:
        results["skipped"].append((basename, "Cannot parse header block"))
        continue
    
    header = header_match.group(0)
    
    # Extract app name from 脚本功能
    app_match = re.search(r'脚本功能[：:]\s*(.*?)[\n\r]', header)
    if not app_match:
        results["skipped"].append((basename, "No app name in header"))
        continue
    
    app_name = app_match.group(1).strip()
    # Clean up app name - remove extra markers
    app_name = re.sub(r'^\s*[#>\s]+\s*', '', app_name)
    
    if not app_name:
        results["skipped"].append((basename, "Empty app name"))
        continue
    
    # Extract MITM hostnames
    hostname_match = re.search(r'hostname\s*=\s*(.*?)[\n\r*]', header)
    if not hostname_match:
        results["skipped"].append((basename, "No MITM hostname"))
        continue
    
    hostnames_raw = hostname_match.group(1).strip()
    # Split by comma
    hostnames = []
    for h in hostnames_raw.split(","):
        h = h.strip().strip(',').strip()
        if h and not h.startswith('*'):
            hostnames.append(h)
        elif h:
            hostnames.append(h)
    
    if not hostnames:
        results["skipped"].append((basename, "Empty MITM hostnames"))
        continue
    
    # Extract URL rewrite patterns from the header
    # Look for lines between [rewrite_local] and [mitm]
    rewrite_section = re.search(r'\[rewrite_local\](.*?)(?:\[mitm\]|/\*)', header, re.DOTALL)
    if not rewrite_section:
        rewrite_section = re.search(r'\[rewrite_local\](.*?)(?:\[mitm\])', content, re.DOTALL)
    if not rewrite_section:
        results["skipped"].append((basename, "No rewrite_local section"))
        continue
    
    rewrite_text = rewrite_section.group(1)
    
    # Extract URL patterns with script type
    # Pattern: ^URL_PATTERN url script-response-body/script-request-header SCRIPT_URL
    patterns = []
    
    # Match lines that start with ^ and contain url script-response-body or url script-request-header
    for line in rewrite_text.splitlines():
        line = line.strip()
        if not line or line.startswith('#') or line.startswith('*'):
            continue
        
        # Match url patterns
        # url script-response-body
        m = re.search(r'(\^.*?)\s+url\s+(script-response-body|script-request-header|reject(?:\-\d+)?)\s*(https?://\S+)?', line)
        if m:
            url_pattern = m.group(1).strip()
            script_type_raw = m.group(2)
            script_url = m.group(3) if m.group(3) else ""
            
            if script_type_raw.startswith("reject"):
                # Skip reject rules for now (we could add them as mitm skip or something)
                continue
            
            if script_type_raw == "script-response-body":
                script_type = "response"
            elif script_type_raw == "script-request-header":
                script_type = "request"
            else:
                continue
            
            patterns.append({
                "match": url_pattern,
                "type": script_type,
                "script_url": script_url
            })
    
    if not patterns:
        results["skipped"].append((basename, "No valid URL rewrite patterns"))
        continue
    
    # Check if output stoverride already exists
    # Clean app name for filename
    safe_appname = re.sub(r'[\\/:*?"<>|]', '', app_name)
    out_path = os.path.join(OUT_DIR, f"{safe_appname}.stoverride")
    
    if os.path.exists(out_path):
        results["skipped"].append((basename, f"stoverride already exists for '{app_name}'"))
        continue
    
    # Copy original JS to scripts/apps
    wei_filename = f"WEI_{basename}.js"
    wei_path = os.path.join(APPS_DIR, wei_filename)
    
    try:
        with open(js_path, "rb") as src:
            with open(wei_path, "wb") as dst:
                dst.write(src.read())
    except Exception as e:
        results["errors"].append((basename, f"Failed to copy JS: {e}"))
        continue
    
    # Build stoverride content
    hostname_list_str = ", ".join(hostnames)
    mitm_lines = "\n".join([f"    - '{h}'" for h in hostnames])
    
    # Use the first pattern's type for the single script entry (as in the original format)
    # Determine if all patterns are the same type
    types = set(p["type"] for p in patterns)
    
    # If there are multiple types, we need multiple script entries
    script_lines = []
    provider_names = []
    
    used_types = set()
    for i, p in enumerate(patterns):
        st = p["type"]
        if st in used_types and len(types) > 1:
            # Need a separate entry
            pass
        used_types.add(st)
        
        # Generate a unique name if there are multiple of the same type
        name = f"WEI_{basename}"
        if len(patterns) > 1:
            if patterns.count(p) > 1:
                name = f"WEI_{basename}_{i}"
        
        escaped_match = p["match"].replace("'", "''")
        script_lines.append(f"""    - match: '{escaped_match}'
      name: {name}
      type: {st}
      require-body: true
      timeout: 5""")
        provider_names.append((name, basename))
    
    # Deduplicate provider names
    seen = set()
    unique_providers = []
    for n, b in provider_names:
        if n not in seen:
            seen.add(n)
            unique_providers.append((n, b))
    
    provider_entries = []
    for n, b in unique_providers:
        provider_entries.append(f"""  {n}:
    url: https://raw.githubusercontent.com/alzuobaba/private-override/main/scripts/apps/WEI_{b}.js
    interval: 86400""")
    
    scripts_section = "\n".join(script_lines)
    providers_section = "\n".join(provider_entries)
    
    desc = f"从 WeiGiegie/666 仓库转换。MITM: {hostname_list_str}\n  拦截 {len(patterns)} 个接口。"
    
    stoverride = f"""name: '{safe_appname}'
desc: |-
  {desc}
author: alzuobaba (converted)
homepage: https://github.com/alzuobaba/private-override
category: '解锁'
date: '2026-06-04'
version: '1.0.0'

http:
  mitm:
{mitm_lines}

  script:
{scripts_section}

script-providers:
{providers_section}
"""
    
    try:
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(stoverride)
        results["processed"].append((basename, safe_appname, len(patterns), hostname_list_str))
    except Exception as e:
        results["errors"].append((basename, f"Failed to write stoverride: {e}"))

# Summary
print("=" * 60)
print("BATCH 3 PROCESSING SUMMARY")
print("=" * 60)
print(f"\nProcessed: {len(results['processed'])}")
for b, a, n, h in results["processed"]:
    print(f"  ✅ {b} -> {a}.stoverride ({n} patterns, mitm: {h})")

print(f"\nSkipped: {len(results['skipped'])}")
for b, reason in results["skipped"]:
    print(f"  ⏭️  {b}: {reason}")

print(f"\nErrors: {len(results['errors'])}")
for b, reason in results["errors"]:
    print(f"  ❌ {b}: {reason}")

# Save results as JSON for subsequent processing
with open(os.path.join(DESC_DIR, "batch3_results.json"), "w") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
