#!/usr/bin/env python3
# review/rank-pace: table from dev/measure/rank-pace.js JSON lines.
# usage: python3 dev/measure/rank-pace-sum.py <label>=<file.jsonl> [...]
# prints per file: lives, end kinds, months to first reach rank 3 / 5 / 7 (median of the lives that got there, n reached),
# rank at the end of year 1..6 (median), and the gate table: share of months each gate was unmet (all ranks) + months it was the SOLE gate,
# then the per-rank gate shares (rank R: months at R, top gates).
import json,sys,statistics as st
def med(a):return st.median(a) if a else None
for arg in sys.argv[1:]:
  lab,fn=arg.split('=',1);L=[json.loads(x) for x in open(fn) if x.startswith('{')]
  if not L:print(lab,'no data');continue
  print(f'\n=== {lab}: {len(L)} lives; ends',{e:sum(1 for x in L if x["end"]==e) for e in set(x["end"] for x in L)},'turns',[x['turn'] for x in L])
  for R in (1,2,3,4,5,6,7):
    t=[x['rp']['first'].get(str(R)) for x in L];t=[v for v in t if v is not None]
    print(f'  first rank {R}: reached {len(t)}/{len(L)}, median month {med(t)}',end='')
  print()
  yr=[]
  for y in range(1,7):
    v=[s['rank'] for x in L for s in x['snaps'] if s['t']==12*y];yr.append(f'y{y}:{med(v)}({len(v)})')
  print('  rank at year end:',' '.join(yr))
  print('  max rank per life:',[max([int(k) for k in x['rp']['first']]) for x in L],' end rank:',[x['rank'] for x in L])
  M=sum(x['rp']['months'] for x in L);C={};SO={}
  for x in L:
    for k,v in x['rp']['cnt'].items():C[k]=C.get(k,0)+v
    for k,v in x['rp']['sole'].items():SO[k]=SO.get(k,0)+v
  print(f'  gate (months unmet / {M} months below Hoàng hậu)  |  sole gate months')
  for k,v in sorted(C.items(),key=lambda a:-a[1]):print(f'    {k:14s} {v:5d} {100*v//max(1,M):3d}%  | sole {SO.get(k,0)}')
  if 'none' in SO:print(f'    (all rows met: {SO["none"]} months)')
  BR={}
  for x in L:
    for rk,B in (x['rp'].get('byRk') or {}).items():
      T=BR.setdefault(rk,{});
      for k,v in B.items():T[k]=T.get(k,0)+v
  for rk in sorted(BR,key=int):
    T=BR[rk];m=T.pop('m',0);top=sorted(T.items(),key=lambda a:-a[1])[:6]
    print(f'  rank {rk}: {m} months; '+', '.join(f'{k} {100*v//max(1,m)}%' for k,v in top))
  dn=[(x['seed'],c) for x in L for c in x['rp']['chg'] if c[1]<0 or True]
  drops=[]
  for x in L:
    prev=None
    for t,rk,why in x['rp']['chg']:
      if prev is not None and rk<prev:drops.append((x['seed'],t,prev,rk,why[:70]))
      prev=rk
  print(f'  rank drops: {len(drops)}');[print('    ',d) for d in drops[:12]]
  ex={};[ex.__setitem__(k,ex.get(k,0)+v) for x in L for k,v in x['ex'].items()];print('  exams',ex)
