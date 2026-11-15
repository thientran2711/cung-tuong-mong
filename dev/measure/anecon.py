#!/usr/bin/env python3
"""anecon.py out*.json — bạc of HER at each stipend (inecon.js), by rank: months, median bạc before pay, median net pay,
share of months she holds >= 30 / 60 / 90 bạc (the shop's 20-90 range) right after the pay."""
import json, sys, statistics as st
from collections import defaultdict
P = defaultdict(list)
n = 0
for f in sys.argv[1:]:
    for r in json.load(open(f)):
        e = r.get('econ')
        if not e: continue
        n += 1
        for rank, b, net, staff, out in e['pay']:
            P['lanh' if out else rank].append((b, net, staff))
print(f"lives with econ data: {n}")
print("rank  months  bạc_before(med)  net(med)  staff(med)  >=30  >=60  >=90 (after pay)")
for k in sorted(P, key=lambda x: (isinstance(x, str), x)):
    L = P[k]; after = [b + net for b, net, s in L]
    pc = lambda t: f"{100*sum(a >= t for a in after)//len(after)}%"
    print(f"{k!s:5} {len(L):6}  {st.median(b for b,_,_ in L):15}  {st.median(x for _,x,_ in L):8}  {st.median(s for _,_,s in L):9}  {pc(30):>4}  {pc(60):>4}  {pc(90):>4}")
