#!/usr/bin/env python3
"""Update author attributions in stoverrides based on original JS script sources."""
import os
import re
from pathlib import Path

ROOT = Path("/sdcard/opencode")
APPS_DIR = ROOT / "scripts" / "apps"


def find_js_for_stoverride(stov_path: Path) -> Path | None:
    """Find the JS file referenced by a stoverride's script-providers or inline script."""
    content = stov_path.read_text(encoding="utf-8", errors="ignore")
    # Find url under script-providers
    m = re.search(r"url:\s*https?://raw\.githubusercontent\.com/alzuobaba/private-override/main/scripts/apps/(\S+\.js)", content)
    if m:
        js_name = m.group(1)
        js_path = APPS_DIR / js_name
        if js_path.exists():
            return js_path
    return None


def extract_author_from_js(js_path: Path) -> str | None:
    """Extract original author from JS file header."""
    try:
        text = js_path.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return None
    # Patterns to match in JS header comments
    patterns = [
        r"脚本作者[::]\s*@?([^\s*\n\r#]+)",
        r"@Author:\s*([^\n\r*]+?)(?:\s*\*|\s*$)",
        r"by[::]\s*([^\n\r]+?)(?:\s*\*|\s*$)",
        r"作者[::]\s*@?([^\s\n\r#]+)",
    ]
    for pat in patterns:
        for m in re.finditer(pat, text, re.MULTILINE):
            val = m.group(1).strip().rstrip("*/").strip()
            # Filter out non-author values
            if not val:
                continue
            if val.lower() in ("参考", "脚本", "项目", "应用", "地址", "频道", "时间", "说明", "通知", "问题"):
                continue
            if val.startswith("http") or val.startswith("#") or val.startswith("**") or len(val) > 80:
                continue
            if re.match(r"^[\W_]+$", val):
                continue
            # Strip leading @
            val = val.lstrip("@").strip()
            if val:
                return val
    return None


def find_source_repo_in_js(js_path: Path) -> str | None:
    """Extract source GitHub repo from raw URL in JS."""
    try:
        text = js_path.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return None
    m = re.search(r"https?://(?:raw\.githubusercontent\.com|github\.com)/([^/\s\"']+)/([^/\s\"']+)", text)
    if m:
        return f"{m.group(1)}/{m.group(2)}"
    return None


def update_stoverride_author(stov_path: Path, new_author: str) -> bool:
    """Replace alzuobaba with new_author in stoverride file."""
    text = stov_path.read_text(encoding="utf-8", errors="ignore")
    new_text = re.sub(r"^author:\s*alzuobaba\s*$", f"author: {new_author}", text, flags=re.MULTILINE)
    if new_text != text:
        stov_path.write_text(new_text, encoding="utf-8")
        return True
    return False


def main():
    stats = {"updated": 0, "skipped": 0, "no_js": 0, "no_author": 0}
    for stov in sorted(ROOT.glob("*.stoverride")):
        text = stov.read_text(encoding="utf-8", errors="ignore")
        if "author: alzuobaba" not in text:
            continue
        # Skip universal unlock files (we own these)
        if stov.name in ("rc-unlock.stoverride", "itunes-unlock.stoverride", "blockad.stoverride", "bilibili.stoverride", "quark.stoverride"):
            continue
        js = find_js_for_stoverride(stov)
        if not js:
            stats["no_js"] += 1
            continue
        author = extract_author_from_js(js)
        if not author:
            # Try source repo
            repo = find_source_repo_in_js(js)
            if repo:
                author = repo
            else:
                stats["no_author"] += 1
                continue
        if update_stoverride_author(stov, author):
            stats["updated"] += 1
            print(f"  {stov.name}: -> {author}")
        else:
            stats["skipped"] += 1
    print(f"\nStats: {stats}")


if __name__ == "__main__":
    main()
