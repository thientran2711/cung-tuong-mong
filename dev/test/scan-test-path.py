#!/usr/bin/env python3
"""scan-test-path.py — family scan for the three test-path faults (review/test-path-fix, owner 25/11).
Counts, per dev/test/**/*.js file:
  JSCLICK  machine clicks: .click() on a DOM element (p.$eval(..,e=>e.click()), el.click() inside evaluate), dispatchEvent(
  PWCLICK  Playwright p.click(...) (real mouse event but no own hit-check; should go through realtap.js)
  NORULES  opens the toilette (#k3tt toil chip / toilOpen) or waits '.toilw' WITHOUT ever handling the rules screen '#toilrdy' (MG12 «Sẵn sàng»)
  SRV      starts a local static server without a charset (http.createServer / python http.server) — use lib/device.js serveRoot (utf-8)
  REALTAP  uses realtap.js
usage: python3 -I dev/test/scan-test-path.py [dir=dev/test] [--files a.js,b.js]   (prints a table; exit 0)"""
import os, re, sys

root = 'dev/test'
only = None
for a in sys.argv[1:]:
    if a.startswith('--files='):
        only = set(a[8:].split(','))
    elif not a.startswith('-'):
        root = a

JSCLICK = re.compile(r'=>\s*\w+\.click\(\)|\b(?:el|e|b|c|o|t|x)\.click\(\)|\.dispatchEvent\(')
PWCLICK = re.compile(r'\b(?:p|page)\.click\(')
OPENS_TOIL = re.compile(r'data-k3="toil"|toilOpen\(|#kg82 \.toilw|waitForSelector\([\'"]#toilok')
SRV = re.compile(r'http\.createServer|http\.server')

rows = []
for d, _, fs in os.walk(root):
    for f in fs:
        if not f.endswith('.js') or (only and f not in only):
            continue
        p = os.path.join(d, f)
        t = open(p, encoding='utf8', errors='replace').read()
        jc = len(JSCLICK.findall(t))
        pc = len(PWCLICK.findall(t))
        nr = 1 if OPENS_TOIL.search(t) and ('toilrdy' not in t and 'toilrules' not in t) else 0
        sv = 1 if SRV.search(t) and 'charset' not in t else 0
        rt = 1 if 'realtap' in t else 0
        if jc or pc or nr or sv or rt:
            rows.append((p, jc, pc, nr, sv, rt))

rows.sort(key=lambda r: (-(r[1] + r[2] + 10 * r[3] + 10 * r[4]), r[0]))
print('%-52s %7s %7s %7s %4s %7s' % ('file', 'JSCLICK', 'PWCLICK', 'NORULES', 'SRV', 'REALTAP'))
for r in rows:
    print('%-52s %7d %7d %7d %4d %7d' % r)
print('TOTAL files %d | JSCLICK %d | PWCLICK %d | NORULES files %d | SRV files %d | REALTAP files %d' % (
    len(rows), sum(r[1] for r in rows), sum(r[2] for r in rows), sum(r[3] for r in rows), sum(r[4] for r in rows), sum(r[5] for r in rows)))
