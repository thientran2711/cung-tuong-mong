#!/usr/bin/env python3
"""rank-colour.py — before/after table for dev/test/rank-colour.js.
usage: python3 dev/test/rank-colour.py before.json after.json [more after.json …] [--md out.md]
Rows = surface family (spy picker, talk pickers per place kind, tabs, bot-play dialogs, log); columns = pairs seen / in rank colour."""
import json, sys, re, collections
a = [x for x in sys.argv[1:] if not x.startswith('--')]
md = sys.argv[sys.argv.index('--md') + 1] if '--md' in sys.argv else None
if md in a: a.remove(md)
def fam(s):
    s = re.sub(r':\d+', '', s)
    s = re.sub(r'^(talk|place):r\d*', r'\1:consort palace', s)
    return s
def load(f):
    d = json.load(open(f)); c = collections.defaultdict(lambda: [0, 0])
    for r in d['rows']:
        k = fam(r['surface']); c[k][0] += 1; c[k][1] += 1 if r['ok'] else 0
    return d, c
B, cb = load(a[0]); runs = [load(f) for f in a[1:]]
keys = sorted(set(cb) | {k for _, c in runs for k in c})
out = ['| surface | before: pairs / in rank colour | ' + ' | '.join(f'after {d["size"]}: pairs / in rank colour' for d, _ in runs) + ' |',
       '|---|---|' + '---|' * len(runs)]
for k in keys:
    out.append(f'| {k} | {cb[k][0]} / {cb[k][1]} | ' + ' | '.join(f'{c[k][0]} / {c[k][1]}' for _, c in runs) + ' |')
tot = lambda c: (sum(v[0] for v in c.values()), sum(v[1] for v in c.values()))
tb = tot(cb)
out.append(f'| **total** | **{tb[0]} / {tb[1]}** | ' + ' | '.join('**%d / %d**' % tot(c) for _, c in runs) + ' |')
bad = []
for d, _ in runs:
    for r in d['rows']:
        if not r['ok']: bad.append(f'{d["size"]} {r["surface"]}: {r["title"]} {r["name"]} got {r["got"]} want {r["want"]} ({r["cls"][:40]}) «{r["ctx"][:70]}»')
    if d['errs']: bad += [f'{d["size"]} pageerror: {e}' for e in d['errs']]
txt = '\n'.join(out) + '\n' + ('\nStill plain / errors:\n' + '\n'.join('- ' + x for x in bad[:60]) + '\n' if bad else '\nStill plain: none.\n')
if md: open(md, 'w', encoding='utf-8').write(txt)
print(txt)
sys.exit(1 if bad else 0)
