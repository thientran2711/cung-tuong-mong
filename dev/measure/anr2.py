#!/usr/bin/env python3
"""balance-2 r2 (D11) arm table, reviewer layout. usage: anr2.py name=dir [name=dir ...] [--orig]
HH reach · ended before HH/cap · ended < 3 y · Phi / Quý phi reached + median month (cv, 3-month steps) · HH median month · Danh m12/24/36 (b2.dm)."""
import json,sys,glob,statistics as st,collections as C
def load(d):
  R=[]
  for f in sorted(glob.glob(d+'/b2_sens_*.json')):
    if f.endswith('.ext.json'):continue
    try:R+=json.load(open(f))
    except Exception as e:print('skip',f,e,file=sys.stderr)
  return [x for x in R if x.get('origin')]
def ended(x):return x['title'] not in('CHSTOP','TIMEOUT','HH') and not str(x['title']).startswith('CRASH')
def first(x,r):
  for c in x.get('cv') or []:
    if c[1]>=r:return c[0]
  return None
def med(L):
  L=[v for v in L if v is not None];return (st.median(L)) if L else '-'
def dm(x,m):d=(x.get('b2') or {}).get('dm',{}).get(str(m));return d[2] if d else None
args=[a for a in sys.argv[1:] if '=' in a];O=set(a for a in sys.argv[1:] if a.startswith('--'))
print('| arm | lives | Hoàng hậu | ended before HH/cap | ended < 3 y | Phi reached, median month | Quý phi reached, median month | HH median month | Danh m12/24/36 |\n|---|---|---|---|---|---|---|---|---|')
AR={}
for a in args:
  n,d=a.split('=',1);R=load(d);AR[n]=R;N=max(1,len(R));pc=lambda k:f"{k} ({round(100*k/N)} %)"
  hh=[x for x in R if (x.get('maxRank') or 0)>=7];ph=[first(x,4) for x in R if (x.get('maxRank') or 0)>=4];qp=[first(x,5) for x in R if (x.get('maxRank') or 0)>=5]
  print(f"| {n} | {len(R)} | {pc(len(hh))} | {pc(sum(1 for x in R if ended(x)))} | {pc(sum(1 for x in R if ended(x) and x['years']<3))} | {pc(len(ph))}, m{med(ph)} | {pc(len(qp))}, m{med(qp)} | m{med([x.get("hhTurn") or x["turns"] for x in hh])} | {med([dm(x,12) for x in R])}/{med([dm(x,24) for x in R])}/{med([dm(x,36) for x in R])} |")
if '--orig' in O:
  ks=['tt','dtq','muoi','cn','nc','bd','td','ch','thd','cnv']
  print('\n| arm | '+' | '.join(ks)+' |\n|---|'+'---|'*len(ks))
  for n,R in AR.items():
    by=C.defaultdict(list)
    for x in R:by[x['origin']].append(x)
    print(f"| {n} | "+' | '.join(f"{sum(1 for x in by[k] if (x.get('maxRank') or 0)>=7)}/{len(by[k])}" for k in ks)+' |')
