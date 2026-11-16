#!/usr/bin/env python3
"""mg-balance-2: summarise a dev/measure/mg-bots.js result with the GRADE the player sees (mgGrade: round(10*(raw/10)^kG), kG = BAL.mgTier.kG[kind] or gamma).
usage: python3 dev/measure/mg-grade.py out.json [kind=kG ...]   (kG values default to the ones in dev/build/jbal2.js; pass kind=x to try another curve)"""
import json,re,sys,os
R=os.path.dirname(os.path.abspath(__file__))+'/../build/jbal2.js'
src=open(R,encoding='utf-8').read()
kg=dict((k,float(v)) for k,v in re.findall(r'(\w+):([\d.]+)',re.search(r'kG:\{([^}]*)\}',src).group(1)))
gamma=float(re.search(r'gamma:([\d.]+)',src).group(1))
for a in sys.argv[2:]:
    k,v=a.split('=');kg[k]=float(v)
d=json.load(open(sys.argv[1]))
for r in d['rows']:
    g=kg.get(r['kind'],gamma);G=[int(10*(max(0,min(10,x))/10)**g+.5) for x in r["raw"]];n=len(G) or 1
    pc=lambda t:round(100*sum(1 for x in G if x>=t)/n)
    print(f"{r['kind']:8} {r['tier']:10} {r['bot']:8} n={len(G):3} kG={g:<4} Xuất sắc≥9 {pc(9):3}% · Giỏi+≥7 {pc(7):3}% · mean {sum(G)/n:4.1f}")
if d.get('errors'):print('ERRORS',d['errors'])
