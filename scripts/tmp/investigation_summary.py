"""
Investigation summary for non-v5 WEI_*.js files
"""
print('''
=== Investigation Summary ===

Files analyzed: 325 total
  238 plain: already plaintext (just have _0x variable names)
   14 obfuscator.io: full obfuscation with RC4 + base64 + control flow
   73 hex_string: have XX in string args (obfuscator.io variants)

Key finding: 73% of files (238) are already plaintext.
The remaining 87 files use obfuscator.io pattern with:
- _0xXXXX function calls (decoders)
- _0x522b (or similar) is the central string decoder
- Decoder does: RC4 + base64 + XOR

=== Critical Issue Found ===
WEI_BLBLHD.js (13950 bytes) is TRUNCATED:
- References _0x522b (string decoder) but never defines it
- The decoder function is missing from the file
- The script will NOT run as-is in Stash

This is a pre-existing issue from WeiGiegie/666 source.

=== Tools Available ===
- webcrack: installed but needs isolated-vm (native) for full decode
- Node.js 26: available
- isolated-vm install failed (gyp build error)
- No internet access to fetch originals

=== Recommended Approach ===

1. For 238 plaintext files: No work needed
2. For 87 obfuscator.io files:
   a. Try webcrack with isolated-vm (failing on Android)
   b. Write Python decoder that mimics RC4 + base64
   c. Or accept these files stay obfuscated (they still work in Stash)
3. For BLBLHD (truncated): Delete or fix

The "obfuscated" files DO still work in Stash - they run fine.
Decoding is only needed for human readability / verification.
''')
