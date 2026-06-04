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
    else:
        # Try inline url format
        providers = re.findall(r"script-provider[^=]*=\s*.*(WEI_[\w\-]+\.js)", content)
        if providers:
            script_map[sf.name] = list(set(providers))

# Build reverse map: script -> list of stoverrides
reverse_map = {}
for sf_name, scripts in script_map.items():
    for s in scripts:
        reverse_map.setdefault(s, []).append(sf_name)

print("=== Script -> Stoverrides ===")
for script, refs in sorted(reverse_map.items()):
    print(f"  {script}: {refs}")
