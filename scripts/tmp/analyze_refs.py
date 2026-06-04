from pathlib import Path
import re

root = Path('.')
stoverrides = sorted(root.glob('*.stoverride'))

# Build full map: stoverride -> list of script files it references
script_map = {}
for sf in stoverrides:
    content = sf.read_text(encoding='utf-8', errors='replace')
    providers = re.findall(r"script-provider[^=]*=[\s]*(scripts/apps/[^\s'\"]+)", content)
    if not providers:
        providers = re.findall(r"script-url[^=]*=[\s]*.*raw\.githubusercontent\.com/[^/]+/[^/]+/[^/]+/scripts/apps/([^\s'\"\)]+)", content)
    if providers:
        script_map[sf.name] = list(set(p.strip() for p in providers))

# Print all stoverrides with their script references
print("=== Stoverride -> script map ===")
for sf_name, scripts in sorted(script_map.items()):
    if scripts:
        print(f"  {sf_name}: {scripts}")
print(f"\nTotal stoverrides with script refs: {len(script_map)}")

# Now: identify scripts shared between multiple stoverrides
script_to_stoverrides = {}
for sf_name, scripts in script_map.items():
    for s in scripts:
        script_to_stoverrides.setdefault(s, []).append(sf_name)

print("\n=== Scripts referenced by multiple stoverrides ===")
for script, refs in sorted(script_to_stoverrides.items()):
    if len(refs) > 1:
        print(f"  {script}: {refs}")
