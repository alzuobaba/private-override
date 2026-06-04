#!/usr/bin/env python3
"""Generate the single-app stoverride table for README.md."""
import urllib.parse
from pathlib import Path

ROOT = Path("/sdcard/opencode")
stov_files = sorted([f.name for f in ROOT.glob("*.stoverride")])

UNIVERSAL = {
    "rc-unlock.stoverride": "内购解锁（RevenueCat 验证拦截）",
    "itunes-unlock.stoverride": "iTunes verifyReceipt 验证绕过（兜底）",
    "blockad.stoverride": "通用广告拦截（穿山甲/广点通/百度等）",
    "bilibili.stoverride": "Bilibili 净化（4K/1080P + 去广告）",
    "quark.stoverride": "夸克浏览器去广告",
    "kcallme.stoverride": "KCallme 城市码修改",
}

lines = []

# Universal table
lines.append("### 基础覆写（功能型，无需单 App 导入）")
lines.append("")
lines.append("| 文件 | 功能 | 订阅 URL |")
lines.append("|------|------|----------|")
for name, desc in UNIVERSAL.items():
    if name not in stov_files:
        continue
    url_name = urllib.parse.quote(name, safe="")
    lines.append(f"| `{name}` | {desc} | `https://raw.githubusercontent.com/alzuobaba/private-override/main/{url_name}` |")
lines.append("")
lines.append("**推荐组合**：`rc-unlock.stoverride` + `itunes-unlock.stoverride` + `blockad.stoverride`（广告拦截兜底）")
lines.append("")

# Single app table - all in one big table
single = [f for f in stov_files if f not in UNIVERSAL]
lines.append(f"### 单 App 覆写（{len(single)} 个，按需单独导入）")
lines.append("")
lines.append("订阅 URL 规则：`https://raw.githubusercontent.com/alzuobaba/private-override/main/<URL编码的文件名>`")
lines.append("")
lines.append("| 文件 | 订阅 URL |")
lines.append("|------|----------|")

# Sort: ASCII first, then Chinese (so the table is alphabetically organized)
def sort_key(name):
    return (not name.isascii(), name.lower())

for name in sorted(single, key=sort_key):
    url_name = urllib.parse.quote(name, safe="")
    lines.append(f"| `{name}` | `https://raw.githubusercontent.com/alzuobaba/private-override/main/{url_name}` |")

text = "\n".join(lines) + "\n"
out = ROOT / "scripts" / "tmp" / "single_app_table.md"
out.write_text(text, encoding="utf-8")
print(f"Generated {out}")
print(f"Total: {len(single)} single apps")
