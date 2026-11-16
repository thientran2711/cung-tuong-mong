#!/usr/bin/env python3
"""PERFORMANCE BUDGET report (owner 15/11 22:35Z): picture files over budget on the CDN index + duplicate content.
   centre art <= 250 KB, sprites (fig-/por- sets, figure folders) <= 40 KB, img/fx <= 400 KB. Reads <IMG_BASE>img/_index.json.
   usage: python3 dev/measure/img-budget.py [--list]   (--list prints every offender, biggest excess first)"""
import json, re, sys, urllib.request, collections
B = 'https://ctm-img.victoria-tntt.workers.dev/'
I = json.load(urllib.request.urlopen(urllib.request.Request(B + 'img/_index.json', headers={'User-Agent': 'ctm-build'}), timeout=60))['files']
def cls(k):
    b = k.split('/')[-1]
    if k.startswith('img/fx/'): return 'fx', 400e3
    if re.match(r'(fig|por)-', b) or '/fig' in k: return 'sprite', 40e3
    return 'centre', 250e3
rows = collections.defaultdict(lambda: [0, 0, 0, 0]); off = []
for k, h, n in I:
    if not k.lower().endswith(('.webp', '.png', '.jpg', '.jpeg')): continue
    c, lim = cls(k); r = rows[c]; r[0] += 1; r[1] += n
    if n > lim: r[2] += 1; r[3] += n - lim; off.append((n - lim, n, c, k))
print('| class | files | MB | over budget | excess MB |\n|---|---|---|---|---|')
for c, r in rows.items(): print(f'| {c} | {r[0]} | {r[1]/1e6:.0f} | {r[2]} | {r[3]/1e6:.0f} |')
d = collections.defaultdict(list)
for k, h, n in I: d[(h, n)].append(k)
dup = [(v, n) for (h, n), v in d.items() if len(v) > 1]
print(f'duplicate content: {len(dup)} groups, {sum((len(v)-1)*n for v, n in dup)/1e6:.1f} MB wasted')
if '--list' in sys.argv:
    for ex, n, c, k in sorted(off, reverse=True): print(f'{n//1000:>6} KB  {c:6} {k}')
