from pathlib import Path
import re

root = Path('.')
stoverrides = sorted(root.glob('*.stoverride'))

# Build map: stoverride -> list of scripts it references
script_map = {}
for sf in stoverrides:
    content = sf.read_text(encoding='utf-8', errors='replace')
    providers = re.findall(r"^\s+([\w\-\.]+\.js):\s*$", content, re.MULTILINE)
    if providers:
        script_map[sf.name] = list(set(providers))

# Also check stoverrides that reference non-WEI scripts
for sf_name, scripts in sorted(script_map.items()):
    for s in scripts:
        if not s.startswith('WEI_'):
            print(f"  {sf_name}: {s}")

print("\n=== Stoverrides with WEI references ===")
for sf_name, scripts in sorted(script_map.items()):
    print(f"  {sf_name}: {scripts}")
