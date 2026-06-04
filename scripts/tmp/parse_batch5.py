import os, re, json

batch_file = "/sdcard/opencode/scripts/tmp/batch_5.txt"
existing = set()
for f in os.listdir("/sdcard/opencode/"):
    if f.endswith(".stoverride"):
        existing.add(f.replace(".stoverride", ""))

files = []
with open(batch_file) as fh:
    for line in fh:
        files.append(line.strip())

results = []
skipped = {"small": [], "not_script": [], "no_name": [], "incomplete": [], "exists": []}

for fname in files:
    dl = f"/sdcard/opencode/scripts/tmp/dl_{fname}"
    if not os.path.exists(dl):
        continue
    size = os.path.getsize(dl)
    if size < 50:
        skipped["small"].append(fname)
        continue
    
    with open(dl, 'r', errors='replace') as fh:
        content = fh.read()
    
    if not any(kw in content[:200] for kw in ['$response', '$request', '$done', 'body', 'script', '[rewrite', 'response-body', 'request-header']):
        skipped["not_script"].append(fname)
        continue

    # Extract header comments
    header = ""
    if content.startswith("/*"):
        end = content.find("*/", 2)
        if end > 0:
            header = content[2:end]
    
    app_name = None
    for line in header.split('\n'):
        line = line.strip().rstrip('*/ \t\r')
        if '脚本功能' in line or '脚本功能：' in line:
            parts = line.split('：', 1)
            if len(parts) > 1:
                app_name = parts[-1].strip('* \t\r')
                break
    
    if not app_name:
        for line in header.split('\n'):
            line = line.strip().rstrip('*/ \t\r')
            if line and not line.startswith('*') and len(line) > 2:
                cand = line.strip('* \t\r')
                if cand and len(cand) > 1:
                    app_name = cand
                    break
    
    if not app_name or app_name == '':
        skipped["no_name"].append(fname)
        continue

    app_name = app_name.strip('* \t\r"\'')
    
    # Extract URL patterns
    url_patterns = []
    script_types = []
    
    for line in header.split('\n') + content.split('\n')[:200]:
        line = line.strip()
        m = re.search(r'\^(.+?)\s+url\s+script-(response-body|request-header)', line)
        if m:
            pat = m.group(1).strip()
            if pat and pat not in url_patterns:
                url_patterns.append(pat)
                script_types.append(m.group(2))
    
    # Extract MITM hostnames  
    hostnames = []
    for line in header.split('\n') + content.split('\n')[:200]:
        line = line.strip()
        m = re.search(r'hostname\s*=\s*(.+)', line)
        if m:
            hostname_str = m.group(1).strip()
            for h in hostname_str.split(','):
                h = h.strip()
                if h and h not in hostnames:
                    hostnames.append(h)
    
    if not hostnames or not url_patterns:
        skipped["incomplete"].append(f"{fname} ({app_name})")
        continue
    
    cleaned_hosts = []
    for h in hostnames:
        h = h.strip()
        if h and h != '*' and not h.startswith('#'):
            h = h.lstrip('*').rstrip('.*')
            if h and h not in cleaned_hosts:
                cleaned_hosts.append(h)
    
    if not cleaned_hosts:
        skipped["incomplete"].append(f"{fname} ({app_name})")
        continue

    stem = app_name.replace('/', '_').replace(':', '_')
    if stem in existing:
        skipped["exists"].append(f"{fname} -> {stem}")
        continue
    
    results.append((fname, app_name, url_patterns, script_types, cleaned_hosts))

print("=== SKIPPED ===")
for k, v in skipped.items():
    if v:
        print(f"\n{k} ({len(v)}):")
        for item in v[:10]:
            print(f"  {item}")
        if len(v) > 10:
            print(f"  ...and {len(v)-10} more")

print("\n\n=== TO PROCESS ===")
for fname, app, patterns, stypes, hosts in results:
    print(f"\n{fname}: {app}")
    print(f"  Patterns: {len(patterns)}")
    for p, t in zip(patterns, stypes):
        print(f"    [{t}] {p[:100]}")
    print(f"  Hosts: {', '.join(hosts[:5])}{'...' if len(hosts)>5 else ''}")

