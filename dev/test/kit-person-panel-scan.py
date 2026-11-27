#!/usr/bin/env python3
"""KIT §6.5 person panel B — law 11 family scan (static).
Lists every module that builds a person-info card through pcard() (all of them get panel B through kitPcFix → kitPP),
and every OTHER person surface (person pop-up dialog, face strip, Sổ ghi row) with the kit path it uses.
usage: python3 dev/test/kit-person-panel-scan.py   (run from the repo root; prints a markdown table, exit 1 if kitPP is not wired)"""
import re, glob, os, sys
B = 'dev/build/'
asm = open(B + 'assemble.py', encoding='utf-8').read()
order = re.findall(r"'([a-z0-9_]+\.js)'", asm)
rows = []
for f in sorted(glob.glob(B + 'j*.js')):
    n = os.path.basename(f)
    if n == 'all.js' or n not in order: continue
    t = open(f, encoding='utf-8').read()
    c = len(re.findall(r'\bpcard\(', t)) - len(re.findall(r'function pcard\(', t))
    if c > 0: rows.append((n, c, 'pcard → kitPcFix → kitPP (panel B)'))
others = [('jpdlg.js', 'kitPersonDlg', 'person pop-up (event dialog, KIT §50.2/§84 S/M/L/XL frame + pcPort figure): not a person-info panel, no act tabs — unchanged'),
          ('jksize.js', 'ksz3', 'dialog frame size system (§84) — unchanged'),
          ('j15.js', 'kpstrip', 'face strip / pager above the card (mdH round avatar) — unchanged, opens the panel-B card'),
          ('j6.js', 'mdH', 'Sổ ghi row (26 px avatar + text) — unchanged, no person panel')]
for n, key, note in others:
    t = open(B + n, encoding='utf-8').read() if os.path.exists(B + n) else ''
    rows.append((n, t.count(key), note))
ok = 'jkpp.js' in order and order.index('jkpp.js') > order.index('jk4.js')
print('| module | hits | path |\n|---|---|---|')
for r in rows: print('| %s | %d | %s |' % r)
print('\nkitPP wired after jk4:', ok)
sys.exit(0 if ok else 1)
