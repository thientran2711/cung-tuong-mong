# kc-roads-cn-nc-fix2: gap per origin with standard error and per-seed gaps. python3 dev/measure/kc2val-gap.py <kc2val json...>
# Each file = one seed (SEED=n node dev/measure/kc2val.js ...), both arms in the same file (fresh, same build). V = the kc2val-sum.py rule.
import json,sys,statistics as st
RS=[(0,0),(15,10),(25,20),(38,30),(52,42),(66,55),(78,68),(85,78)]
def V(r):
  rv=sum(RS[r['rank']]) if not r['srv'] else (r['srk'] or 0)*15+(r.get('tin') or 0)/2
  return rv+(r['sung'] or 0)+(r['danh'] or 0)+r['stats']/2+r['arts']*4+(r['bac'] or 0)/10+r['known']*3
alive=lambda r:not r['dead'] and not r.get('res') and not r.get('home') and not r.get('end')
F={f:json.load(open(f))['rows'] for f in sys.argv[1:]}
R=[r for L in F.values() for r in L]
print('| origin | palace V mean (sd, n alive/n) · tier kém/khá/tốt | home V mean (sd, n alive/n) · tier | gap home − palace (± se) | gap per seed | home srk / rank · Danh · Sủng | palace srk / rank · Danh · Sủng |')
print('|---|---|---|---|---|---|---|')
for o in sorted(set(r['o'] for r in R)):
  out=[]
  A={arm:[r for r in R if r['o']==o and r['arm']==arm] for arm in ('cung','nha')}
  if not all(A.values()):continue
  def d(arm):
    L=A[arm];a=[r for r in L if alive(r)];v=[V(r) for r in a];t=[sum(1 for r in a if r.get('tier')==i) for i in range(3)]
    return a,v,f"{round(st.mean(v))} ({round(st.pstdev(v))}, {len(a)}/{len(L)}) · {t[0]}/{t[1]}/{t[2]}"
  ac,vc,sc=d('cung');an,vn,sn=d('nha')
  g=st.mean(vn)-st.mean(vc);se=(st.pvariance(vc)/len(vc)+st.pvariance(vn)/len(vn))**.5
  ps=[]
  for f,L in F.items():
    c=[V(r) for r in L if r['o']==o and r['arm']=='cung' and alive(r)];n=[V(r) for r in L if r['o']==o and r['arm']=='nha' and alive(r)]
    if c and n:ps.append(str(round(st.mean(n)-st.mean(c))))
  def comp(a):
    m=lambda k:round(st.mean([(r[k] or 0) for r in a]),1)
    pos=m('srk') if a[0]['srv'] or a[0].get('risen') else m('rank')
    return f"{pos} · {round(m('danh'))} · {round(m('sung'))}"
  print(f"| {o} | {sc} | {sn} | **{round(g):+d}** (±{round(se)}) | {' / '.join(ps)} | {comp(an)} | {comp(ac)} |")
