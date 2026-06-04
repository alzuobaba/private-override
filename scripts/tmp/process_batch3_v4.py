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

# Process in reverse order so earlier entries win (to avoid naming collisions)
# Actually, process normally but track which apps we've already done
processed_apps = {}

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
    
    # Extract app name
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
    
    safe_appname = re.sub(r'[\\/:*?"<>|]', '', app_name)
    
    # Extract MITM hostnames
    mitm_start = header.find("[mitm]")
    if mitm_start == -1:
        results["skipped"].append((basename, "No [mitm] section"))
        continue
    
    mitm_section = header[mitm_start:]
    end_idx = mitm_section.find("*/")
    mitm_section = mitm_section[:end_idx] if end_idx != -1 else mitm_section
    
    hostname_lines = [l.strip() for l in mitm_section.splitlines() if l.strip().startswith("hostname")]
    if not hostname_lines:
        results["skipped"].append((basename, "No hostname in MITM section"))
        continue
    
    m = re.match(r'hostname\s*=\s*(.+)', hostname_lines[0])
    if not m:
        results["skipped"].append((basename, "Cannot parse hostname line"))
        continue
    
    hostnames = [h.strip().strip(',').strip() for h in re.split(r'[,，]+', m.group(1).strip()) if h.strip().strip(',').strip()]
    
    if not hostnames:
        results["skipped"].append((basename, "Empty MITM hostnames"))
        continue
    
    # Extract rewrite patterns
    rewrite_start = header.find("[rewrite_local]")
    if rewrite_start == -1:
        results["skipped"].append((basename, "No [rewrite_local] section"))
        continue
    
    rewrite_end = header.find("[mitm]", rewrite_start)
    rewrite_text = header[rewrite_start:rewrite_end] if rewrite_end != -1 else header[rewrite_start:]
    
    patterns = []
    for line in rewrite_text.splitlines():
        line = line.strip()
        if not line or line.startswith('#') or line.startswith('*'):
            continue
        
        m = re.search(r'(\^.*?)\s+url\s+(script-response-body|script-request-header|reject(?:\-\d+)?)\s*(https?://\S+)?', line)
        if m:
            script_type_raw = m.group(2)
            if script_type_raw.startswith("reject"):
                continue
            
            url_pattern = m.group(1).strip()
            script_url = m.group(3) if m.group(3) else ""
            script_type = "response" if script_type_raw == "script-response-body" else "request"
            
            script_basename = basename
            if script_url:
                m2 = re.search(r'/([^/]+)\.js', script_url)
                if m2:
                    script_basename = m2.group(1)
            
            patterns.append({
                "match": url_pattern,
                "type": script_type,
                "script_basename": script_basename
            })
    
    if not patterns:
        results["skipped"].append((basename, "No valid URL rewrite patterns"))
        continue
    
    out_path = os.path.join(OUT_DIR, f"{safe_appname}.stoverride")
    
    # Copy original JS
    wei_filename = f"WEI_{basename}.js"
    wei_path = os.path.join(APPS_DIR, wei_filename)
    
    try:
        with open(js_path, "rb") as src:
            with open(wei_path, "wb") as dst:
                dst.write(src.read())
    except Exception as e:
        results["errors"].append((basename, f"Failed to copy JS: {e}"))
        continue
    
    # Also copy referenced scripts
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
    
    # Build deduplicated script entries and provider entries
    # First, deduplicate by match
    seen_matches = set()
    script_entries = []
    provider_set = {}
    
    for p in patterns:
        if p["match"] in seen_matches:
            continue
        seen_matches.add(p["match"])
        
        script_name = f"WEI_{p['script_basename']}"
        script_entries.append({
            "match": p["match"],
            "name": script_name,
            "type": p["type"],
            "basename": p["script_basename"]
        })
        
        # Track unique providers
        if script_name not in provider_set:
            provider_set[script_name] = p["script_basename"]
    
    # Build sections
    mitm_lines = "\n".join([f"    - '{h}'" for h in hostnames])
    
    scripts_list = []
    for se in script_entries:
        escaped = se["match"].replace("'", "''")
        scripts_list.append(f"""    - match: '{escaped}'
      name: {se["name"]}
      type: {se["type"]}
      require-body: true
      timeout: 5""")
    
    provider_entries = []
    for pname, pbasename in provider_set.items():
        provider_entries.append(f"""  {pname}:
    url: https://raw.githubusercontent.com/alzuobaba/private-override/main/scripts/apps/WEI_{pbasename}.js
    interval: 86400""")
    
    hostname_list_str = ", ".join(hostnames)
    desc = f"从 WeiGiegie/666 仓库转换。MITM: {hostname_list_str}\n  拦截 {len(script_entries)} 个接口。"
    
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
{chr(10).join(scripts_list)}

script-providers:
{chr(10).join(provider_entries)}
"""
    
    try:
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(stoverride)
        results["processed"].append((basename, safe_appname, len(script_entries), hostname_list_str))
    except Exception as e:
        results["errors"].append((basename, f"Failed to write stoverride: {e}"))

# Summary
print("=" * 60)
print("BATCH 3 PROCESSING SUMMARY V4 (deduplicated)")
print("=" * 60)
print(f"\nProcessed: {len(results['processed'])}")
for b, a, n, h in results["processed"]:
    truncated_h = h if len(h) <= 90 else h[:87] + "..."
    print(f"  ✅ {b} -> {a}.stoverride ({n} patterns)")

print(f"\nSkipped: {len(results['skipped'])}")
for b, reason in results["skipped"]:
    print(f"  ⏭️  {b}: {reason}")

print(f"\nErrors: {len(results['errors'])}")
for b, reason in results["errors"]:
    print(f"  ❌ {b}: {reason}")

with open(os.path.join(DESC_DIR, "batch3_results_v4.json"), "w") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
