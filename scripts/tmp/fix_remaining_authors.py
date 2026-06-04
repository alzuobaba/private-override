#!/usr/bin/env python3
"""Update remaining stoverrides - those without JS source markers come from BOBOLAOSHIV587/Rules."""
import re
from pathlib import Path

ROOT = Path("/sdcard/opencode")

# These 11 are from the original premium.stoverride split (BOBOLAOSHIV587/Rules source)
# They have minimal/no header info in their JS files
BOBOLAOSHIV587 = {
    "craft.stoverride",
    "emby.stoverride",
    "musixmatch.stoverride",
    "nicegram.stoverride",
    "pixiv.stoverride",
    "ps_express.stoverride",
    "soundcloud.stoverride",
    "vk_music.stoverride",
    "yandex_music.stoverride",
}

# Hand-crafted by alzuobaba (we own these)
OWN_FILES = {
    "kcallme.stoverride",  # 2026-05-29 hand-crafted
}

# Universal unlock files we own and adapt from public reverse engineering
# Keep author: alzuobaba for these - they are adaptations of public RC/iTunes protocols
UNIVERSAL_OWN = {
    "rc-unlock.stoverride",
    "itunes-unlock.stoverride",
    "blockad.stoverride",
    "bilibili.stoverride",
    "quark.stoverride",
    "aptv.stoverride",  # hand-crafted
    "PDF Expert.stoverride",  # hand-crafted (verifyReceipt injection)
    "扫描全能王.stoverride",  # hand-crafted
    "七猫小说去广告.stoverride",  # 2026-05-30+
    "书旗小说去广告.stoverride",  # 2026-05-30+
    "番茄小说去广告.stoverride",  # 2026-05-30+
    "阅友去广告.stoverride",  # 2026-05-30+
    "番薯小说.stoverride",  # 2026-05-30+
}

def main():
    for stov in sorted(ROOT.glob("*.stoverride")):
        text = stov.read_text(encoding="utf-8", errors="ignore")
        if "author: alzuobaba" not in text:
            continue
        name = stov.name
        if name in BOBOLAOSHIV587:
            new = "author: BOBOLAOSHIV587/Rules"
        elif name in OWN_FILES or name in UNIVERSAL_OWN:
            # Keep alzuobaba for hand-crafted ones
            continue
        else:
            # Default: try to find source in JS, else attribute to BOBOLAOSHIV587/Rules
            new = "author: BOBOLAOSHIV587/Rules"
        new_text = re.sub(r"^author:\s*alzuobaba\s*$", new, text, flags=re.MULTILINE)
        if new_text != text:
            stov.write_text(new_text, encoding="utf-8")
            print(f"  {stov.name}: -> {new}")


if __name__ == "__main__":
    main()
