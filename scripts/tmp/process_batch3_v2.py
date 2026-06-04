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
    # Skip if empty app name
    if not app_name or app_name.startswith("软件版本"):
        results["skipped"].append((basename, "Empty app name"))
        continue
    
    # Clean up app name - remove leading markers
    app_name = re.sub(r'^[#>\s]+', '', app_name).strip()
    
    if not app_name:
        results["skipped"].append((basename, "Empty app name after cleanup"))
        continue
    
    # Extract MITM hostnames - search in the whole header, not until * character
    # Find hostname line in the [mitm] section
    mitm_match = re.search(r'\[mitm\](.*?)(?:\*|/\*|```|$)', header, re.DOTALL)
    if not mitm_match:
        mitm_match = re.search(r'\[mitm\](.*?)(?:\*|/\*|```|$)', content, re.DOTALL)
    
    if not mitm_match:
        results["skipped"].append((basename, "No MITM section"))
        continue
    
    mitm_section = mitm_match.group(1)
    
    hostname_match = re.search(r'hostname\s*=\s*(.+?)(?:\n|\*/)', mitm_section)
    if not hostname_match:
        results["skipped"].append((basename, "No hostname in MITM section"))
        continue
    
    hostnames_raw = hostname_match.group(1).strip()
    # Split by comma, clean each
    hostnames = []
    for h in re.split(r'[,，]+', hostnames_raw):
        h = h.strip().strip(',').strip()
        if h:
            hostnames.append(h)
    
    if not hostnames:
        results["skipped"].append((basename, "Empty MITM hostnames"))
        continue
    
    # Extract URL rewrite patterns from the [rewrite_local] section
    rewrite_match = re.search(r'\[rewrite_local\](.*?)(?:\[mitm\]|```|$)', header, re.DOTALL)
    if not rewrite_match:
        rewrite_match = re.search(r'\[rewrite_local\](.*?)(?:\[mitm\]|```|$)', content, re.DOTALL)
    if not rewrite_match:
        results["skipped"].append((basename, "No rewrite_local section"))
        continue
    
    rewrite_text = rewrite_match.group(1)
    
    # Extract URL patterns with script type
    patterns = []
    
    for line in rewrite_text.splitlines():
        line = line.strip()
        if not line or line.startswith('#') or line.startswith('*'):
            continue
        
        # Match url patterns with script-response-body or script-request-header
        m = re.search(r'(\^.*?)\s+url\s+(script-response-body|script-request-header|reject(?:\-\d+)?)\s*(https?://\S+)?', line)
        if m:
            url_pattern = m.group(1).strip()
            script_type_raw = m.group(2)
            script_url = m.group(3) if m.group(3) else ""
            
            if script_type_raw.startswith("reject"):
                continue
            
            if script_type_raw == "script-response-body":
                script_type = "response"
            elif script_type_raw == "script-request-header":
                script_type = "request"
            else:
                continue
            
            # If the script URL points to a different file, use that file's basename for the provider
            script_basename = basename
            if script_url:
                m2 = re.search(r'/([^/]+)\.js', script_url)
                if m2:
                    script_basename = m2.group(1)
            
            patterns.append({
                "match": url_pattern,
                "type": script_type,
                "script_url": script_url,
                "script_basename": script_basename
            })
    
    if not patterns:
        results["skipped"].append((basename, "No valid URL rewrite patterns"))
        continue
    
    # Check if output stoverride already exists
    safe_appname = re.sub(r'[\\/:*?"<>|]', '', app_name)
    out_path = os.path.join(OUT_DIR, f"{safe_appname}.stoverride")
    
    if os.path.exists(out_path):
        results["skipped"].append((basename, f"stoverride already exists for '{app_name}'"))
        continue
    
    # Copy original JS to scripts/apps
    # First copy this file
    wei_filename = f"WEI_{basename}.js"
    wei_path = os.path.join(APPS_DIR, wei_filename)
    
    try:
        with open(js_path, "rb") as src:
            with open(wei_path, "wb") as dst:
                dst.write(src.read())
    except Exception as e:
        results["errors"].append((basename, f"Failed to copy JS: {e}"))
        continue
    
    # Also copy any referenced script files that might not be in this batch
    for p in patterns:
        if p["script_basename"] != basename:
            ref_path = os.path.join(DESC_DIR, p["script_basename"] + ".js")
            ref_wei_path = os.path.join(APPS_DIR, f"WEI_{p['script_basename']}.js")
            if os.path.exists(ref_path) and not os.path.exists(ref_wei_path):
                try:
                    with open(ref_path, "rb") as src:
                        with open(ref_wei_path, "wb") as dst:
                            dst.write(src.read())
                except:
                    pass
    
    # Build stoverride content
    hostname_list_str = ", ".join(hostnames)
    mitm_lines = "\n".join([f"    - '{h}'" for h in hostnames])
    
    # Build script entries - deduplicate by match pattern
    script_entries = []
    provider_names = set()
    
    for i, p in enumerate(patterns):
        escaped_match = p["match"].replace("'", "''")
        name = f"WEI_{p['script_basename']}"
        # If multiple entries would have same name, add index
        if name in provider_names:
            name = f"WEI_{p['script_basename']}_{i}"
        
        script_entries.append({
            "match": escaped_match,
            "name": name,
            "type": p["type"]
        })
        provider_names.add(name)
    
    # Build unique provider entries
    # Collect unique (name, basename) pairs
    provider_map = {}
    for i, p in enumerate(patterns):
        name = f"WEI_{p['script_basename']}"
        if name in provider_map and i > 0:
            name = f"WEI_{p['script_basename']}_{i}"
        provider_map[name] = p["script_basename"]
    
    provider_entries_list = []
    for name, sname in provider_map.items():
        provider_entries_list.append(f"""  {name}:
    url: https://raw.githubusercontent.com/alzuobaba/private-override/main/scripts/apps/WEI_{sname}.js
    interval: 86400""")
    
    scripts_list = []
    for se in script_entries:
        scripts_list.append(f"""    - match: '{se["match"]}'
      name: {se["name"]}
      type: {se["type"]}
      require-body: true
      timeout: 5""")
    
    scripts_section = "\n".join(scripts_list)
    providers_section = "\n".join(provider_entries_list)
    
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
print("BATCH 3 PROCESSING SUMMARY V2")
print("=" * 60)
print(f"\nProcessed: {len(results['processed'])}")
for b, a, n, h in results["processed"]:
    print(f"  ✅ {b} -> {a}.stoverride ({n} patterns, mitm: {h[:80]})")

print(f"\nSkipped: {len(results['skipped'])}")
for b, reason in results["skipped"]:
    print(f"  ⏭️  {b}: {reason}")

print(f"\nErrors: {len(results['errors'])}")
for b, reason in results["errors"]:
    print(f"  ❌ {b}: {reason}")

# Save results as JSON
with open(os.path.join(DESC_DIR, "batch3_results.json"), "w") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
