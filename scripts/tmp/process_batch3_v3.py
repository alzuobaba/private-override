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

# Track which stoverrides were created by batch3 (from v1 run) so we can overwrite
batch3_app_names = set()

results = {"processed": [], "skipped": [], "errors": []}

for fname in filenames:
    basename = fname.replace(".js", "")
    js_path = os.path.join(DESC_DIR, basename + ".js")
    
    if not os.path.exists(js_path) or os.path.getsize(js_path) < 20:
        results["skipped"].append((basename, "File too small or missing"))
        continue
    
    with open(js_path, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()
    
    if not content.strip().startswith("/*"):
        results["skipped"].append((basename, "No header comment block"))
        continue
    
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
    if not app_name or app_name.startswith("软件版本"):
        results["skipped"].append((basename, "Empty app name"))
        continue
    
    app_name = re.sub(r'^[#>\s]+', '', app_name).strip()
    
    if not app_name:
        results["skipped"].append((basename, "Empty app name after cleanup"))
        continue
    
    # Extract MITM hostnames
    # Find the mitm section in the full header
    mitm_start = header.find("[mitm]")
    if mitm_start == -1:
        results["skipped"].append((basename, "No [mitm] section"))
        continue
    
    # The mitm section ends at */ (end of comment) or end of header
    mitm_section = header[mitm_start:]
    # Get content until */ or end
    end_idx = mitm_section.find("*/")
    if end_idx != -1:
        mitm_section = mitm_section[:end_idx]
    
    # Find hostname line
    hostname_lines = []
    for line in mitm_section.splitlines():
        line = line.strip()
        if line.startswith("hostname") or line.startswith("hostname"):
            hostname_lines.append(line)
    
    if not hostname_lines:
        results["skipped"].append((basename, "No hostname in MITM section"))
        continue
    
    hostnames_raw = hostname_lines[0]
    m = re.match(r'hostname\s*=\s*(.+)', hostnames_raw)
    if not m:
        results["skipped"].append((basename, "Cannot parse hostname line"))
        continue
    
    hostnames_str = m.group(1).strip()
    # Split by comma
    hostnames = []
    for h in re.split(r'[,，]+', hostnames_str):
        h = h.strip().strip(',').strip()
        if h:
            hostnames.append(h)
    
    if not hostnames:
        results["skipped"].append((basename, "Empty MITM hostnames"))
        continue
    
    # Extract URL rewrite patterns from [rewrite_local] section
    rewrite_start = header.find("[rewrite_local]")
    if rewrite_start == -1:
        results["skipped"].append((basename, "No [rewrite_local] section"))
        continue
    
    rewrite_end = header.find("[mitm]", rewrite_start)
    if rewrite_end == -1:
        rewrite_end = len(header)
    
    rewrite_text = header[rewrite_start:rewrite_end]
    
    patterns = []
    for line in rewrite_text.splitlines():
        line = line.strip()
        if not line or line.startswith('#') or line.startswith('*'):
            continue
        
        m = re.search(r'(\^.*?)\s+url\s+(script-response-body|script-request-header|reject(?:\-\d+)?)\s*(https?://\S+)?', line)
        if m:
            url_pattern = m.group(1).strip()
            script_type_raw = m.group(2)
            script_url = m.group(3) if m.group(3) else ""
            
            if script_type_raw.startswith("reject"):
                continue
            
            script_type = "response" if script_type_raw == "script-response-body" else "request"
            
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
    
    safe_appname = re.sub(r'[\\/:*?"<>|]', '', app_name)
    out_path = os.path.join(OUT_DIR, f"{safe_appname}.stoverride")
    
    # For batch3, we always regenerate (overwrite if exists from this batch)
    # We'll track this differently - just overwrite
    
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
    
    # Also copy any referenced script files that might not be in downloads yet
    referenced_patterns = []
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
        
        if p["match"] not in [x["match"] for x in referenced_patterns]:
            referenced_patterns.append(p)
    
    # Build stoverride
    hostname_list_str = ", ".join(hostnames)
    mitm_lines = "\n".join([f"    - '{h}'" for h in hostnames])
    
    provider_map = {}
    for i, p in enumerate(referenced_patterns):
        name = f"WEI_{p['script_basename']}"
        if name in provider_map:
            name = f"WEI_{p['script_basename']}_{i}"
        provider_map[name] = p["script_basename"]
    
    # Deduplicate script entries by match pattern
    seen_matches = set()
    unique_entries = []
    for i, p in enumerate(referenced_patterns):
        if p["match"] not in seen_matches:
            seen_matches.add(p["match"])
            name = f"WEI_{p['script_basename']}"
            if name in provider_map:
                existing_for = provider_map[name]
                if existing_for != p["script_basename"]:
                    name = f"WEI_{p['script_basename']}_{i}"
            unique_entries.append({"match": p["match"], "name": name, "type": p["type"]})
    
    scripts_list = []
    for se in unique_entries:
        escaped_match = se["match"].replace("'", "''")
        scripts_list.append(f"""    - match: '{escaped_match}'
      name: {se["name"]}
      type: {se["type"]}
      require-body: true
      timeout: 5""")
    
    provider_entries_list = []
    for name, sname in provider_map.items():
        provider_entries_list.append(f"""  {name}:
    url: https://raw.githubusercontent.com/alzuobaba/private-override/main/scripts/apps/WEI_{sname}.js
    interval: 86400""")
    
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
        batch3_app_names.add(safe_appname)
        results["processed"].append((basename, safe_appname, len(patterns), hostname_list_str))
    except Exception as e:
        results["errors"].append((basename, f"Failed to write stoverride: {e}"))

# Summary
print("=" * 60)
print("BATCH 3 PROCESSING SUMMARY V3")
print("=" * 60)
print(f"\nProcessed: {len(results['processed'])}")
for b, a, n, h in results["processed"]:
    truncated_h = h if len(h) <= 90 else h[:87] + "..."
    print(f"  ✅ {b} -> {a}.stoverride ({n} patterns, mitm: {truncated_h})")

print(f"\nSkipped: {len(results['skipped'])}")
for b, reason in results["skipped"]:
    print(f"  ⏭️  {b}: {reason}")

print(f"\nErrors: {len(results['errors'])}")
for b, reason in results["errors"]:
    print(f"  ❌ {b}: {reason}")

# Save results
with open(os.path.join(DESC_DIR, "batch3_results_v3.json"), "w") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
