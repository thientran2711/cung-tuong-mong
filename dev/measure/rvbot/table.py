import os
import json,glob,collections,sys
out=[]
def load(arm):
  L=[]
  for f in sorted(glob.glob(os.environ.get('OUT','/home/user/wt/rv-bot/out')+f'/life-{arm}-[0-9]*[0-9].json')):
    for x in json.load(open(f)):
      if x.get('fate')=='TIMEOUT' or str(x.get('fate','')).startswith('CRASH'): x['_bad']=1
      L.append(x)
  return L
A={a:load(a) for a in ['main','br']}
def at(x,m,i):
  me=(x.get('dt') or {}).get('me') or []
  r=[q for q in me if q[0]<=m]
  if not me or me[-1][0]<m: return None  # life ended (or HH-stopped) before month m
  return r[-1][i]
print('| | main (LIVE 8cf6b7d7) | branch e3ed68b9 |\n|---|---|---|')
row=lambda k,f:print(f'| {k} | '+' | '.join(f(A[a]) for a in ['main','br'])+' |')
row('lives (timeout/crash)',lambda L:f"{len(L)} ({sum(1 for x in L if x.get('_bad'))})")
row('reached Hoàng hậu (HH-STOP)',lambda L:f"{sum(1 for x in L if x.get('fate')=='HH-STOP')}/{len(L)} ({100*sum(1 for x in L if x.get('fate')=='HH-STOP')/max(1,len(L)):.0f} %)")
row('HH month (median)',lambda L:str(sorted(x['turns'] for x in L if x.get('fate')=='HH-STOP')[len([1 for x in L if x.get('fate')=='HH-STOP'])//2] if any(x.get('fate')=='HH-STOP' for x in L) else '-'))
row('avg max rank / rank ≥ 4',lambda L:f"{sum(x.get('maxRank',0) for x in L)/len(L):.2f} / {sum(1 for x in L if x.get('maxRank',0)>=4)}")
row('died < 3 years (not HH)',lambda L:f"{sum(1 for x in L if x.get('fate')!='HH-STOP' and not x.get('_bad') and x.get('years',9)<3)}/{len(L)}")
row('mean life years (dead, not HH)',lambda L:f"{sum(x['years'] for x in L if x.get('fate')!='HH-STOP')/max(1,sum(1 for x in L if x.get('fate')!='HH-STOP')):.1f}")
names=['','Sắc','Tài','Tâm cơ','Đức','Danh','Sủng','rank','','','art bậc max']
for i in [5,2,1,3,4,6,7,10]:
  def f(L,i=i):
    s=[]
    for m in [0,12,24,36]:
      v=[at(x,m,i) for x in L];v=[q for q in v if q is not None]
      s.append(f"{sum(v)/len(v):.0f}" if v else '-')
    n36=len([1 for x in L if at(x,36,i) is not None])
    return '/'.join(s)+f" (n36={n36})"
  row(f'm0/12/24/36 {names[i]}',f)
# Danh m36 also with HH lives counted at their HH value (HH-stopped lives keep their last value)
def danh36all(L):
  v=[]
  for x in L:
    me=(x.get('dt') or {}).get('me') or []
    if not me: continue
    if me[-1][0]>=36: v.append([q for q in me if q[0]<=36][-1][5])
    elif x.get('fate')=='HH-STOP': v.append(me[-1][5])
  return f"{sum(v)/len(v):.0f} (n={len(v)})" if v else '-'
row('Danh m36 incl. HH lives at HH',danh36all)
print('\nper origin: HH / lives · died<3y · avg max rank')
O=sorted(set(x.get('origin') for a in A for x in A[a]))
print('| origin | main | branch |\n|---|---|---|')
for o in O:
  def f(L,o=o):
    S=[x for x in L if x.get('origin')==o]
    if not S: return '-'
    return f"{sum(1 for x in S if x.get('fate')=='HH-STOP')}/{len(S)} · {sum(1 for x in S if x.get('fate')!='HH-STOP' and x.get('years',9)<3)} · {sum(x.get('maxRank',0) for x in S)/len(S):.1f}"
  print(f'| {o} | {f(A["main"])} | {f(A["br"])} |')
