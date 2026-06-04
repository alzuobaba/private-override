"""
Decode obfuscator.io pattern in WeiGiegie/666 scripts.
Pattern: const _0xNNNN = ['str1', 'str2', ...];
         function _0xXXXX(idx, key) { return _0xXXXX = function(idx, key) { idx -= OFFSET; return _0xNNNN[idx]; } }
"""
import re
from pathlib import Path
import json
import shutil


def find_string_array(content):
    """Find the const _0xNNNN = [...] array."""
    array_match = re.search(r"const\s+(_0x[0-9a-f]+)\s*=\s*\[(.*?)\];", content, re.DOTALL)
    if not array_match:
        return None, None
    array_name = array_match.group(1)
    array_body = array_match.group(2)
    strings = re.findall(r"'((?:\\'|[^'])*)'", array_body)
    return array_name, strings


def find_decoder_offset(content, array_name):
    """Find the offset subtracted from index in decoder function."""
    # Pattern: _0xAAAA = _0xAAAA - (0xNNN + 0xMMM + ...);
    # The result is the offset value
    pattern = r"[_a-zA-Z0-9]+=([_a-zA-Z0-9]+)\-\(([0-9a-fA-Fx+\-*\s]+)\);"
    matches = re.findall(pattern, content)
    for var, expr in matches:
        # Evaluate the expression
        try:
            # Replace all hex 0xNNN with int values
            cleaned = re.sub(r"0x([0-9a-fA-F]+)", lambda m: str(int(m.group(1), 16)), expr)
            val = eval(cleaned)
            if 0x50 < val < 0x500:  # Typical offset range
                return val
        except:
            pass
    return None


def get_decoder_calls(content):
    """Find all _0xXXXX(idx, key) calls and extract their indices."""
    # Pattern: _0xXXXX(idx, 'key')
    # We just need the indices; keys are usually 'Euj5D2m' style
    pattern = r"(_0x[0-9a-f]+)\((-?0x[0-9a-f]+|-?\d+|'[^']*'|\"[^']*\"(?:[^\\]|\\.)*?\")"
    return re.findall(pattern, content)


def decode_file(path, backup_dir):
    """Decode a single obfuscator.io file. Returns (success, old_size, new_size)."""
    try:
        content = path.read_text(encoding='utf-8', errors='replace')
    except Exception as e:
        return False, 0, 0, str(e)

    # Find the string array
    array_name, strings = find_string_array(content)
    if not array_name or not strings:
        return False, 0, 0, "no string array"

    # Find the offset
    offset = find_decoder_offset(content, array_name)
    if offset is None:
        # Default: try common offsets
        offset = 0xCC  # common for obfuscator.io v4

    # Strategy: replace _0xXXXX(0xINDEX, 'KEY') calls with strings[INDEX - offset]
    # Build a map of decoder function name -> offset
    # Find all decoder functions and their offsets
    decoder_offsets = {}
    # Pattern: function _0xFFFF(...){return _0xFFFF=function(_0xAAAA, _0xBBBB){_0xAAAA=_0xAAAA-(<expr>);
    pattern = r"function\s+(_0x[0-9a-f]+)\s*\([^)]*\)\s*{\s*return\s+\1\s*=\s*function\s*\([^)]+\)\s*{\s*([_a-zA-Z0-9]+)\s*=\s*\2\s*-\s*\(([^)]+)\)"
    for m in re.finditer(pattern, content):
        func_name = m.group(1)
        expr = m.group(3)
        try:
            cleaned = re.sub(r"0x([0-9a-fA-F]+)", lambda mm: str(int(mm.group(1), 16)), expr)
            val = eval(cleaned)
            decoder_offsets[func_name] = val
        except:
            decoder_offsets[func_name] = offset

    # If no decoder functions found, the file structure is different
    if not decoder_offsets:
        return False, 0, 0, "no decoder functions found"

    # Replace calls: _0xXXXX(idx, 'key') with strings[idx - offset]
    new_content = content
    replacements = 0
    decoder_calls = re.findall(r"(_0x[0-9a-f]+)\((-?0x[0-9a-f]+|-?\d+|'[^']*'(?:[^']|\\')*?'|\"[^']*\"(?:[^\\]|\\.)*?\")", content)

    for func_name, arg in decoder_calls:
        if func_name not in decoder_offsets:
            continue
        # Parse the arg
        arg = arg.strip()
        if arg.startswith("'") or arg.startswith('"'):
            continue  # String arg, not index
        try:
            idx = int(arg, 0)
        except:
            continue
        actual_idx = idx - decoder_offsets[func_name]
        if 0 <= actual_idx < len(strings):
            value = strings[actual_idx]
            # Don't replace if the value is a mangled identifier (no spaces, alphanumeric)
            # We want to replace string literals that look like English
            new_content = new_content.replace(f"{func_name}({arg},", f'"{value}",', 1)
            replacements += 1

    if replacements == 0:
        return False, 0, 0, "no replacements made"

    # Write the decoded file
    if not backup_dir.exists():
        backup_dir.mkdir(parents=True, exist_ok=True)
    backup_path = backup_dir / path.name
    if not backup_path.exists():
        shutil.copy(path, backup_path)

    new_size = len(new_content)
    path.write_text(new_content, encoding='utf-8')
    return True, len(content), new_size, f"replaced {replacements} calls"


if __name__ == '__main__':
    # Test on Acfun
    apps_dir = Path('scripts/apps')
    backup_dir = apps_dir / '_originals'
    backup_dir.mkdir(exist_ok=True)

    # Test files
    test_files = ['WEI_Acfun.js', 'WEI_aiaiwang.js', 'WEI_BLBLHD.js']
    for fname in test_files:
        f = apps_dir / fname
        if not f.exists():
            continue
        success, old_size, new_size, msg = decode_file(f, backup_dir)
        if success:
            print(f"  {fname}: {old_size} -> {new_size} ({100*(1-new_size/old_size):.1f}% reduction) {msg}")
        else:
            print(f"  {fname}: SKIP ({msg})")
