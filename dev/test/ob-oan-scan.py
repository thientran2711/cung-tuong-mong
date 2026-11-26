#!/usr/bin/env python3
"""ob-oan scan (law 11, owner 26/11 ~08:25Z): every info surface that shows a RISING BAD stat, and whether it names the real ways down
(«Cách giảm»). Static scan of dev/build/*.js (all.js excluded). usage: python3 dev/test/ob-oan-scan.py → a markdown table on stdout."""
import re, glob, os
D = os.path.join(os.path.dirname(__file__), '..', 'build')
src = {os.path.basename(f): open(f, encoding='utf-8').read() for f in glob.glob(D + '/*.js') if not f.endswith('all.js')}
J = src.get('jts.js', '')
low = dict(re.findall(r'"([^"]+)":"(oan|ghen|danger|ghet|sung|benh|danh)"', J[J.find('TS_LOWER_TERM'):J.find('function kitLowerText')]))
# surfaces: (name, file regex, how she reaches the info, how Cách giảm reaches her)
S = [
 ('«Nguy hiểm chung» box → panel', r'function tsDangerPanel', 'jts.js', lambda: '["Cách giảm",tsLowerTxt("danger")' in J, 'kit row in the panel + one «Làm lành với …» card per person'),
 ('Maid warning «Lời cảnh báo» (danger step up)', r'function tsDangerOmen', 'jts.js', lambda: 'opts:[tsOptMend(x.v)' in J, '«Làm lành với …» card for the top person'),
 ('«Làm lành với …» dialog (per person)', r'PEND\.tsmend', 'jts.js', lambda: '["Cách giảm",tsLowerTxt("oan")' in J, 'kit row + «Lưu ý» when oán is past her forgiving line'),
]
for term in ['Oán', 'Thù', 'Ghen', 'Nguy hiểm', 'Thiện cảm', 'Quý', 'Sủng', 'Sức khỏe', 'Danh']:
    S.append((f'glossary tap «{term}» (every kitRel2 / stat row / header cell using kitGloss)', r'kitGloss\(', 'j79.js',
              (lambda t=term: False), f'KIT REQUEST (KK39): popup row from kitLowerText("{term}") = {low.get(term, "—")}'))
S.append(('Person card «Có thể hại ngươi» (j24 dangerWord)', r'function dangerWord', 'j24.js', lambda: False, 'via the glossary row (Nguy hiểm) once KK39 adds it'))
print('| Surface | Source | Before | After (this branch) | How |')
print('|---|---|---|---|---|')
for n, rx, f, fn, how in S:
    found = any(re.search(rx, src[k]) for k in src)
    print(f'| {n} | {f} {"" if found else "(NOT FOUND)"} | no «Cách giảm» | {"YES" if fn() else "pending kit"} | {how} |')
