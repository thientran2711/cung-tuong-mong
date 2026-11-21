#!/usr/bin/env python3
"""PAL4: L1583 vs L1726 — per season family counts (same classifier for both) + HSV stats of the 90 mains (and all 360). 0 cr."""
import json, os, sys, colorsys, collections, itertools
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import four_season_L1726  # noqa: F401
import four_season_L1709 as M
import check_unique as CU
old, new = json.load(open(M.SRC)), json.load(open(M.DST))
P = [k for k in new if not k.startswith('_') and k != 'status']
VN = dict(xuan='Xuân', ha='Hạ', thu='Thu', dong='Đông')
def hsv(x): return colorsys.rgb_to_hsv(*(int(x[i:i + 2], 16) / 255 for i in (1, 3, 5)))
def st(ms):
    S = sorted(hsv(m)[1] for m in ms); V = [hsv(m)[2] for m in ms]
    return f'{sum(S) / len(S):.2f} | {S[int(.9 * len(S))]:.2f} | {S[-1]:.2f} | {sum(V) / len(V):.2f}'
print('| mùa | bảng | mean S | p90 S | max S | mean V |\n|---|---|---|---|---|---|')
for s in list(M.SEAS) + ['ALL']:
    for tag, d in (('L1583', old), ('L1726', new)):
        ms = [d[p][t]['main_hex'] for p in P for t in (M.SEAS if s == 'ALL' else [s])]
        print(f'| {VN.get(s, "cả 4 (360)")} | {tag} | {st(ms)} |')
ch = [new[p][s]['main_hex'] for p in P for s in M.SEAS if new[p][s]['main_hex'] != old[p][s]['main_hex']]
print(f'\nchanged mains: {len(ch)} · their max HSV S {max(hsv(m)[1] for m in ch):.2f}')
print('\n| mùa | họ màu | L1583 | L1726 |\n|---|---|---|---|')
for s in M.SEAS:
    co = collections.Counter(M.fam_of(old[p][s]['main_hex'], s) for p in P)
    cn = collections.Counter(new[p][s]['_fam'] for p in P)
    for f in M.FAM[s]: print(f'| {VN[s]} | {f[0]} | {co[f[0]]} | {cn[f[0]]} |')
for tag, d in (('L1583', old), ('L1726', new)):
    a31 = [p for p in P if min(CU.de2000(d[p][a]['main_hex'], d[p][b]['main_hex']) for a, b in itertools.combinations(M.SEAS, 2)) < 20]
    close = sum(1 for s in M.SEAS for p, q in itertools.combinations(P, 2) if d[p]['group'] == d[q]['group'] and CU.de2000(d[p][s]['main_hex'], d[q][s]['main_hex']) < 8)
    print(f'{tag}: same-group same-season main pairs ΔE<8 = {close}; A31 people (4 mains not all ΔE>=20) = {len(a31)} {" ".join(a31)}')
