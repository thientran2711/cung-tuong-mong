#!/usr/bin/env python3
"""porscale/report.py: before -> after table per group (face height = forehead->chin / picture H; spread = (max-min)/median).
usage: python3 report.py <plan.json> <measure-before.json> <measure-after.json (re-cropped only)> <recrop.json>"""
import sys, os, json
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from groups import group
P = json.load(open(sys.argv[1])); B = json.load(open(sys.argv[2])); A = json.load(open(sys.argv[3])); R = json.load(open(sys.argv[4]))
G = {}
for n in B: G.setdefault(group(n), []).append(n)
print('| group | n | target | re-cropped | face h before min–max (spread) | after min–max (spread) | within ±4 % after | centre y spread before → after | flagged |')
print('|---|---|---|---|---|---|---|---|---|')
for g, L in sorted(G.items()):
    T = P['groups'][g]['T']
    b = np.array([B[n]['fh'] for n in L]); a = np.array([(A[n] if n in A else B[n])['fh'] for n in L])
    by = np.array([B[n]['cy'] for n in L]); ay = np.array([(A[n] if n in A else B[n])['cy'] for n in L])
    sp = lambda x: (x.max() - x.min()) / np.median(x) * 100
    fl = [n[4:] + ' ' + ','.join(R[n]['flags']) for n in L if n in R and R[n]['flags']]
    print(f"| {g} | {len(L)} | {T:.3f} | {sum(1 for n in L if n in R)} | {b.min():.3f}–{b.max():.3f} ({sp(b):.0f} %) | {a.min():.3f}–{a.max():.3f} ({sp(a):.0f} %) | {int((abs(a / T - 1) <= .04).sum())}/{len(L)} | {(by.max()-by.min())*100:.1f} → {(ay.max()-ay.min())*100:.1f} % H | {len(fl)} |")
print()
for n in sorted(R):
    if R[n]['flags']: print('-', n, R[n]['s'], ', '.join(R[n]['flags']))
