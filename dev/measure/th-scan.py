#!/usr/bin/env python3
"""ROW 9 (Thái hậu levels by her nết): list every gate on Thái hậu's thiện cảm — toward her (S.th) and toward each consort (p.th) —
that does not read netTh("th",key). Usage: python3 dev/measure/th-scan.py dev/build [--list]
A gate = <holder>.th (or (x.th||0)) compared (<, <=, >, >=) with a number or a name. Sign tests (>= 0 / < 0 / > 0) are not levels.
KEEP = rows that are not levels of her regard (a cap of the thỉnh an gain, a running compare, a Sủng band)."""
import re, sys, os
D = sys.argv[1] if len(sys.argv) > 1 else 'dev/build'
LIST = '--list' in sys.argv
G = re.compile(r'\(?\b([A-Za-z_]\w*)\.th(?:\|\|0)?\)?\s*(<=|>=|<|>)\s*(-?\d+(?:\.\d+)?|[A-Za-z_$][\w$]*(?:\.[\w$]+|\[\d+\]|\([^()]*\))*)')
ALIAS = re.compile(r'\b(?:const|let)\s+(\w+)\s*=\s*\(?S\.th(?:\|\|0)?\)?\s*[;,]')
KEEP = {  # (file, rhs-prefix) -> why
 ('jtrong.js', 'cap'): 'cap of the thỉnh an gain (archetype cap), not a level of regard',
 ('jtrong.js', 'A.cap'): 'cap of the thỉnh an gain (archetype cap), not a level of regard',
 ('jwhyn.js', 'A.cap'): 'cap of the thỉnh an gain (archetype cap), not a level of regard',
 ('jtrong.js', '0'): 'sign',
 ('j8.js', 'tn'): 'tn = hhNeed(p).th = netTh("th","than2") / netAt("th","than2",..) (jbal hhNeed)',
 ('jpet.js', 'K'): 'K = netAt("th","than2",B.kyTh) one line above',
 ('jpromob.js', 'ct'): 'ct = pbThCut() = netTh("th","than2")',
}
HOLD = {'S', 'p', 'v', 'x', 'o', 'a', 'b', 'q', 'w', 'r', 'me', 't', 'y', 'c'}
rows = []; keep = 0
for f in sorted(os.listdir(D)):
    if not f.endswith('.js') or not f.startswith('j') or f.startswith('jbal'): continue  # sources only (all.js = the built bundle)
    src = open(os.path.join(D, f), encoding='utf8').read().split('\n')
    for i, line in enumerate(src, 1):
        if '.th' not in line: continue
        for m in G.finditer(line):
            h, op, rhs = m.group(1), m.group(2), m.group(3)
            if h not in HOLD: continue
            if rhs.startswith('netTh("th"') or rhs.startswith('netAt("th"'): continue
            if re.fullmatch(r'0', rhs) and op in ('>=', '<', '>'): continue  # sign test
            if f == 'jtrong.js' and h == 'w': continue  # greet-log weight, not Thái hậu regard
            k = next((v for (ff, pre), v in KEEP.items() if ff == f and rhs.startswith(pre)), None)
            if k: keep += 1; continue
            kind = 'typed number' if re.fullmatch(r'-?\d+', rhs) else 'BAL / alias copy'
            rows.append((f, i, kind, m.group(0)[:90]))
        for m in ALIAS.finditer(line):
            name = m.group(1)
            tail = line[m.end():]
            for mm in re.finditer(r'\b' + name + r'\s*(<=|>=|<|>)\s*([\w.\[\]]+)', tail):
                r2 = mm.group(2)
                if r2 in ('0',) or r2.startswith('netTh') or r2.startswith('netAt') or re.search(r'\b' + re.escape(r2) + r'\s*=\s*net(Th|At)\("th"', line): continue
                rows.append((f, i, 'via a local copy', (name + mm.group(1) + mm.group(2))[:90]))
by = {}
for r in rows: by[r[2]] = by.get(r[2], 0) + 1
if LIST:
    for r in rows: print('%s:%d\t%s\t%s' % r)
print('TOTAL Thái hậu regard gates off netTh("th"): %d %s | kept (not levels): %d' % (len(rows), by, keep))
