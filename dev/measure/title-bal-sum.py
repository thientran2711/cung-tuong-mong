#!/usr/bin/env python3
"""TITLE-BAL summary: reads the out.json files of dev/measure/title-bal-bot.js and prints
   (1) per life: road, origin, buổi played, deaths shielded, titles earned, top tiers, buổi of the first title, most titles in one buổi;
   (2) the totals: titles per life, first-title buổi (median), share of lives with a top tier;
   (3) the act frequency table: per title key, the raw count at the end of each life (median / max) and per 1000 buổi.
   usage: python3 dev/measure/title-bal-sum.py out1.json [out2.json ...]"""
import json, os, sys, statistics as st
from collections import Counter, defaultdict

lives = []
for f in sys.argv[1:]:
    try:
        lives += json.load(open(f))['lives']
    except Exception as e:
        print('skip', f, e)
CAP = int(os.environ.get('CAP', '0') or 0)   # CAP=1200: count titles only in the first CAP buổi of every life
lives = [l for l in lives if l.get('b', 0) >= (CAP or 200)]
if CAP:
    for l in lives:
        l['gain'] = [x for x in l['gain'] if x[2] < CAP]
if not lives:
    sys.exit('no lives')

def med(a):
    return st.median(a) if a else '-'

print('| road | origin | buổi | age | deaths shielded | titles | top tiers | first title (buổi) | most in one buổi | titles in first 300 buổi |')
print('|---|---|---|---|---|---|---|---|---|---|')
T = []
for l in lives:
    g = [x for x in l['gain'] if x[1] == 0]          # first step of each title = a new title
    per = Counter(x[2] for x in l['gain'])
    first = min((x[2] for x in g), default=None)
    e = l['end']
    early = len([x for x in g if x[2] < 300])
    ns = lambda x: x[5] if len(x) > 5 else (1 if x[0].startswith(('kc_', 'ge_')) else 3)
    top = len({x[0] for x in l['gain'] if ns(x) > 1 and x[1] == ns(x) - 1})
    T.append(dict(t=len(g), top=top, first=first, most=max(per.values(), default=0), b=l['b'], early=early))
    print(f"| {l.get('road')} | {l.get('o0', l.get('origin'))} | {min(l['b'], CAP) if CAP else l['b']} | {e.get('age')} | {l.get('deaths', 0)} | {T[-1]['t']} | {T[-1]['top']} | {first if first is not None else '-'} | {T[-1]['most']} | {early} |")
n = len(T)
print()
print(f"lives {n} · titles per life median {med([x['t'] for x in T])} (mean {sum(x['t'] for x in T)/n:.1f}) · "
      f"first title buổi median {med([x['first'] for x in T if x['first'] is not None])} · "
      f"lives with a top tier {sum(1 for x in T if x['top'] > 0)}/{n} · most titles in one buổi max {max(x['most'] for x in T)} · "
      f"titles in the first 300 buổi median {med([x['early'] for x in T])}")
print()
# raw act frequency per key
K = defaultdict(list)
for l in lives:
    e = l['end']
    for k, v in (e.get('dh') or {}).items():
        K[k].append((v.get('n', 0), l['b']))
    K['nights'].append((e.get('nights', 0), l['b']))
    K['kids'].append((e.get('kids', 0), l['b']))
    for a, lv in (e.get('arts') or {}).items():
        K['art:' + a].append((lv, l['b']))
    for kind, tiers in (l.get('wk') or {}).items():
        K['wk:' + kind + ' all'].append((sum(tiers), l['b']))
        K['wk:' + kind + ' ti>=2'].append((sum(tiers[2:]), l['b']))
    for kind, c in (l.get('ct') or {}).items():
        K['ct:' + kind + ' held'].append((c['n'], l['b']))
        K['ct:' + kind + ' 1st'].append((c['p1'], l['b']))
        K['ct:' + kind + ' top3'].append((c['p3'], l['b']))
print('| key | lives with it | median per life | max | per 1000 buổi (mean) |')
print('|---|---|---|---|---|')
for k in sorted(K):
    v = K[k]
    c = [x[0] for x in v]
    rate = 1000 * sum(c) / max(1, sum(l['b'] for l in lives))
    print(f'| {k} | {len(v)} | {med(c)} | {max(c)} | {rate:.1f} |')
# acts that count for titles
A = Counter()
for l in lives:
    for k, v in (l.get('acts') or {}).items():
        A[k] += v
print()
print('most frequent successful acts (all lives):', ', '.join(f'{k} {v}' for k, v in A.most_common(25)))
