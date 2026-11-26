#!/usr/bin/env python3
"""review/pace-speed — gate scan for the palace-wide rescale (BAL.stp.scale.pal, T = BAL.stp.scale.tq): every absolute gate of Sắc / Tài / Tâm cơ in
dev/build/j*.js (x.sac / tai / tamco >= | > number or BAL key) must be ≤ T, else the monthly rescale could close it. Exit 1 when one is above T.
usage: python3 dev/measure/scale-gates.py bal.json   (BAL + RANKS of the built page, e.g. node baldump.js dev/index.html bal.json)"""
import re,glob,json,os,sys
BAL=json.load(open(sys.argv[1]))['BAL'];ROOT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
SC=BAL['stp']['scale'];T=SC['tq']
G=re.compile(r'(?<![\w$])(?:S|p|x|v|c|o|w|me|F|q|r|t|y|it|who|her)\.(sac|tai|tamco)(?:\s*\|\|\s*0\s*\))?\s*(>=|>)\s*\(?\s*(BAL(?:\.[A-Za-z_$][\w$]*|\[\d+\])+|\d+)')
def res(e):
  if e.isdigit():return int(e)
  o=BAL
  for part in re.findall(r'\.([A-Za-z_$][\w$]*)|\[(\d+)\]',e[3:]):
    k=part[0] or int(part[1])
    try:o=o[k]
    except Exception:return None
  return o if isinstance(o,(int,float)) else None
R={k:[] for k in SC['pal']}
for f in sorted(glob.glob(os.path.join(ROOT,'j*.js'))):
  b=os.path.basename(f)
  if b.startswith('jbal') or b=='all.js':continue
  for i,l in enumerate(open(f,encoding='utf8',errors='ignore'),1):
    for m in G.finditer(l):
      k,op,e=m.groups();v=res(e)
      if v is not None and k in R:R[k].append((v,f'{b}:{i}',e))
bad=0;print(f'palace rescale T = {T}')
for k,L in R.items():
  L.sort(reverse=True);hi=L[0][0] if L else 0;over=[x for x in L if x[0]>T];bad+=len(over)
  print(f'{k}\tgates {len(L)}\thighest {hi} ({", ".join(x[1] for x in L[:3])})\tabove T {len(over)}')
sys.exit(1 if bad else 0)
