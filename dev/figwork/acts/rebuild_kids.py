#!/usr/bin/env python3
# python3 rebuild_kids.py <FIGURES-kids.json pulled from the CDN> <_index.json> <OUT.json>
# act-pic-match 18/11: the 17/11 02:41Z stale push reset FIGURES-kids.json to 192 records; art-complete-p2 (FOREMAN_C_STATUS 21:13Z) had made it 336 (grown kids a26/a36/a51, 48 ids).
# Adds a record for every img/fig-kid-<id>-a<age>.webp on the CDN that the manifest does not list (por only when img/por-kid-<id>-a<age>.webp exists). Idempotent.
import json, sys, re
src, idx, out = sys.argv[1:4]
L = json.load(open(src, encoding='utf-8')); ks = {f[0] for f in json.load(open(idx))['files']}; have = {r['file'] for r in L}
for f in sorted(ks):
    m = re.fullmatch(r'img/fig-kid-([pf]\d+)-a(\d+)\.webp', f)
    if m and f not in have:
        r = {'role': 'princess' if m.group(1)[0] == 'f' else 'prince', 'identity': m.group(1), 'ageBand': m.group(2), 'file': f}
        p = 'img/por-kid-%s-a%s.webp' % (m.group(1), m.group(2))
        if p in ks: r['por'] = p
        L.append(r)
json.dump(L, open(out, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':')); print('records', len(L))
