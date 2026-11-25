#!/usr/bin/env python3
"""anchor-table for EVERY woman picture (consort/maid/mama/thaihau/player): the same checks as dev/test/anchor-table.py, run on a fit dir; usage table.py <dir-with-mk-json> <toil-fit2.json>"""
import json, glob, math, os, re, sys, statistics
D, TF = sys.argv[1], sys.argv[2]
fit = json.load(open(TF)); fit = fit.get('fit', fit); mk = {}
for f in glob.glob(D + '/*.json'):
    if not f.endswith('md5.json') and not f.endswith('toil-fit2.json'): mk.update(json.load(open(f)))
I = json.load(open('/home/user/wt/mkwork/idx.json'))['files']; on = {k[4:] for k, m, s in I}
bad = []; n = 0
for nm, v in sorted(mk.items()):
    if nm not in on: continue
    n += 1; t = fit.get(nm)
    if len(v) < 120: bad.append((nm, 'short')); continue
    A = t[8] if t else 2.4
    P = [(v[2*i] / 40, v[2*i+1] / 40 * A) for i in range(60)]
    c = lambda a, b: (sum(p[0] for p in P[a:b]) / (b-a), sum(p[1] for p in P[a:b]) / (b-a))
    lip, e1, e2, b1, b2 = c(0, 12), c(20, 30), c(30, 40), c(40, 50), c(50, 60)
    ed = math.hypot(e1[0]-e2[0], e1[1]-e2[1]); mx, my = (e1[0]+e2[0])/2, (e1[1]+e2[1])/2; why = []
    if not (lip[1] > max(e1[1], e2[1]) + .5*ed): why.append('lips not below eyes')
    elif not (.55 < (lip[1]-my)/ed < 1.7 and abs(lip[0]-mx) < .5*ed): why.append('lips %.2f/%.2f' % ((lip[1]-my)/ed, (lip[0]-mx)/ed))
    if not (b1[1] < e1[1] and b2[1] < e2[1]) and not (b1[1] < e2[1] and b2[1] < e1[1]): why.append('brows not above eyes')
    if min(abs(math.degrees(math.atan2(e2[1]-e1[1], e2[0]-e1[0]))), abs(math.degrees(math.atan2(e1[1]-e2[1], e1[0]-e2[0])))) > 25: why.append('eye line tilted')
    if t:
        if not (.22 < ed / t[6] < 1.1): why.append('eye dist %.2f of face width' % (ed / t[6]))
        if abs(t[6] / ed / 2.45 - 1) > .25: why.append('face width %.2f x eye dist' % (t[6] / ed))
        d = math.hypot(lip[0]-t[0], lip[1]-t[1]*A) / t[6]
        if d > .10: why.append('toil-fit mouth %.0f%% off' % (d*100))
    else: why.append('no toil-fit row')
    if why: bad.append((nm, '; '.join(why)))
print('pictures', n, 'bad', len(bad))
import collections; print(collections.Counter(w.split(' ')[0]+' '+w.split(' ')[1] for _, ws in bad for w in ws.split('; ')).most_common(10))
for b in bad[:15]: print(' ', *b)
