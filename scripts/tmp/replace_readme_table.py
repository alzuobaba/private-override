#!/usr/bin/env python3
"""Replace the long single-app table in README with auto-generated content."""
from pathlib import Path
import re

ROOT = Path("/sdcard/opencode")
readme_path = ROOT / "README.md"
table_path = ROOT / "scripts" / "tmp" / "single_app_table.md"

content = readme_path.read_text(encoding="utf-8")
table = table_path.read_text(encoding="utf-8")

# Extract the 单 App section from generated table (everything from "### 单 App" onwards)
lines = table.split("\n")
start = 0
for i, line in enumerate(lines):
    if "### 单 App" in line:
        start = i
        break
new_table = "\n".join(lines[start:])

# Find the 单 App section in README (from "### 单 App 解锁覆写" to "---" before "各脚本原理")
# Use a regex to find the section
pattern = r"### 单 App 解锁覆写.*?(?=\n---\n)"
match = re.search(pattern, content, re.DOTALL)

if match:
    new_content = content[:match.start()] + new_table + "\n" + content[match.end():]
    readme_path.write_text(new_content, encoding="utf-8")
    print(f"Replaced table section ({len(new_table)} chars)")
    print(f"Old README: {len(content)} chars")
    print(f"New README: {len(new_content)} chars")
else:
    print("ERROR: Could not find table section to replace")
