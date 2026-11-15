#!/usr/bin/env python3
"""anecon.py out*.json — her money per month by rank (inecon.js): months, median bạc before pay, median stipend net (pay − wages + nhà gửi + việc vặt),
median lễ nghĩa paid, median FREE silver (net − lễ nghĩa), % months she skipped lễ nghĩa, and what the free silver buys per month at the
price tiers (everyday 10, mid 40, luxury 200 bạc)."""
import json, sys, statistics as st
from collections import defaultdict
P = defaultdict(list); n = 0; inc = []; out = []
for f in sys.argv[1:]:
    for r in json.load(open(f)):
        e = r.get('econ')
        if not e: continue
        n += 1; inc.append(e.get('inc', 0)); out.append(e.get('out', 0))
        for row in e['pay']:
            rank, b, net, staff, cold = row[:5]; duty = row[5] if len(row) > 5 else 0; skip = row[6] if len(row) > 6 else 0
            P['lanh' if cold else rank].append((b, net, staff, duty, skip))
print(f"lives with econ data: {n}; her bạc earned/spent per life (median): +{st.median(inc) if inc else 0} / -{st.median(out) if out else 0}")
print("rank  months  bạc_before  net  staff  duty  FREE  skip%  everyday/mo  mid/mo  luxury/mo")
free = {}
for k in sorted(P, key=lambda x: (isinstance(x, str), x)):
    L = P[k]; fr = st.median(net - duty for _, net, _, duty, _ in L); free[k] = fr
    sk = 100 * sum(s for *_, s in L) // len(L)
    print(f"{k!s:5} {len(L):6}  {st.median(b for b,*_ in L):10}  {st.median(x[1] for x in L):4}  {st.median(x[2] for x in L):5}  {st.median(x[3] for x in L):4}  {fr:4}  {sk:4}%  {fr/10:11.1f}  {fr/40:6.1f}  {fr/200:9.2f}")
if 0 in free and 7 in free and free[0]:
    print(f"free silver Hoàng hậu / Đáp ứng = {free[7]/free[0]:.1f}x")
