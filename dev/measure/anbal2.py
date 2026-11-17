#!/usr/bin/env python3
"""balance-2 (D8) summary of runbal2.sh output. usage: python3 dev/measure/anbal2.py [--flow] [--press] [--pun] <b2_*.json ...>
Head table per difficulty (and per origin with --orig): lives, Hoàng hậu reached, early end < 3 y, avg max rank, rank at end, Sủng/Danh at months 12/24/36.
--flow  top Danh losses / gains by cause (indanhlog x.ix.danh / danhG), per life.   --pun  punishments her (S) vs NPC (N) per life.
--press per-rank pressure (inbal2 x.b2.rk): bạc held, monthly bạc net, Sức, khắc left unused per buổi, open cards left per buổi, monthly Danh/Sủng change."""
import json,sys,collections as C,statistics as st
A=[a for a in sys.argv[1:] if not a.startswith('--') and not a.endswith('.ext.json')];O=set(a for a in sys.argv[1:] if a.startswith('--'))
R=[]
for f in A:
  try:R+=json.load(open(f))
  except Exception as e:print('skip',f,e,file=sys.stderr)
R=[x for x in R if x.get('origin')]
RK=['Đáp ứng','Thường tại','Quý nhân','Tần','Phi','Quý phi','HQP','Hoàng hậu']
def ended(x):return x['title'] not in('CHSTOP','TIMEOUT','HH') and not str(x['title']).startswith('CRASH')
def dm(x,m,i):
  d=(x.get('b2') or {}).get('dm',{}).get(str(m));return d[i] if d else None
def med(L):
  L=[v for v in L if v is not None];return round(st.median(L)) if L else '-'
def head(L,lab):
  n=len(L);hh=sum(1 for x in L if (x.get('maxRank') or 0)>=7);early=sum(1 for x in L if ended(x) and x['years']<3)
  stuck=sum(1 for x in L if x['title']=='TIMEOUT' or str(x['fate']).startswith('CRASH'))
  dd=sum(1 for x in L if ended(x));print(f"| {lab} | {n} | {hh} ({round(100*hh/n) if n else 0} %) | {dd} ({round(100*dd/n) if n else 0} %) | {early} ({round(100*early/n) if n else 0} %) | {sum(x.get('maxRank') or 0 for x in L)/max(1,n):.1f} | {sum(x.get('rank') or 0 for x in L)/max(1,n):.1f} | {med([dm(x,12,1) for x in L])}/{med([dm(x,24,1) for x in L])}/{med([dm(x,36,1) for x in L])} | {med([dm(x,12,2) for x in L])}/{med([dm(x,24,2) for x in L])}/{med([dm(x,36,2) for x in L])} | {stuck} |")
print("| group | lives | Hoàng hậu | life ended before HH / cap | early end < 3 y | avg max rank | avg rank at end | Sủng m12/24/36 | Danh m12/24/36 | stuck |\n|---|---|---|---|---|---|---|---|---|---|")
by=C.defaultdict(list)
for x in R:by[x.get('diff') or 'vua'].append(x)
for k in ('de','vua','kho'):
  if by[k]:head(by[k],k)
if '--orig' in O:
  bo=C.defaultdict(list)
  for x in R:bo[(x.get('diff') or 'vua',x['origin'])].append(x)
  for k in sorted(bo):head(bo[k],'/'.join(k))
n=max(1,len(R))
if '--flow' in O:
  for key,lab in (('danh','Danh LOST'),('danhG','Danh GAINED')):
    c=C.Counter()
    for x in R:
      for k,v in ((x.get('ix') or {}).get(key) or {}).items():c[k.split(': ',1)[1] if ': ' in k else k]+=v
    print(f"\n{lab} per life (top 25):");[print(f"  {v/n:6.1f}  {k}") for k,v in c.most_common(25)]
if '--pun' in O:
  c=C.Counter()
  for x in R:
    for k,v in ((x.get('b2') or {}).get('pun') or {}).items():c[k]+=v
  print("\npunish() per life (S = her, N = NPCs):");[print(f"  {v/n:5.2f}  {k}") for k,v in c.most_common(30)]
if '--press' in O:
  T=C.defaultdict(lambda:C.Counter())
  for x in R:
    for r,v in ((x.get('b2') or {}).get('rk') or {}).items():T[int(r)].update(v)
  print("\n| rank | buổi | months | bạc held | bạc net / month | Sức | khắc left / buổi | open cards left / buổi | cards blocked by bạc | blocked by Sức | Danh / month | Sủng / month |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|")
  for r in sorted(T):
    v=T[r];b=max(1,v['b']);m=max(1,v['m'])
    print(f"| {RK[r]} | {v['b']} | {v['m']} | {v['bac']/b:.0f} | {v['net']/m:+.0f} | {v['suc']/b:.0f} | {v['kl']/b:.2f} | {v['oc']/b:.1f} | {100*v['bb']/max(1,v['dk']):.0f} % | {100*v['sb']/max(1,v['dk']):.0f} % | {v['dn']/m:+.1f} | {v['sg']/m:+.1f} |")
if '--gate' in O:
  c=C.Counter()
  for x in R:c.update((x.get('b2') or {}).get('hq') or {})
  print("\nmonths a «Muốn lên» row is NOT met, share of months at that rank:")
  for r in range(7):
    m=c.get(f"{r}|_m",0)
    if not m:continue
    L=sorted(((v,k.split('|',1)[1]) for k,v in c.items() if k.startswith(f"{r}|") and not k.endswith('|_m')),reverse=True)
    print(f"  {RK[r]} → {RK[r+1]} ({m} months): "+" · ".join(f"{k} {round(100*v/m)} %" for v,k in L[:6]))
if '--dbl' in O:
  c=C.Counter()
  for x in R:c.update((x.get('b2') or {}).get('dbl') or {})
  print("\noptions whose real change was exactly twice the shown fx (count over all lives):");[print(f"  {v:4d}  {k}") for k,v in c.most_common(20)]
