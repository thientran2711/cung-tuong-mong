# kc-roads-cn-nc-fix: per-arm V with spread and selection tier mix, both arms from ONE file (same build). python3 dev/measure/kc2val-arm.py <kc2val json...>
# V = the kc2val-sum.py rule. tier: selection result kém/khá/tốt (palace arm: the direct selection; home arm: the home-road selection).
import json,sys,statistics as st
RS=[(0,0),(15,10),(25,20),(38,30),(52,42),(66,55),(78,68),(85,78)]
def V(r):
  rv=sum(RS[r['rank']]) if not r['srv'] else (r['srk'] or 0)*15+(r.get('tin') or 0)/2
  return rv+(r['sung'] or 0)+(r['danh'] or 0)+r['stats']/2+r['arts']*4+(r['bac'] or 0)/10+r['known']*3
R=[]
for f in sys.argv[1:]:R+=json.load(open(f))['rows']
print('| origin | arm | n alive / n | V mean | V sd | V min–max | tier kém/khá/tốt | Danh | Sủng | stats/2 | known×3 |')
print('|---|---|---|---|---|---|---|---|---|---|---|')
for o in sorted(set(r['o'] for r in R)):
  for arm in ('cung','nha'):
    L=[r for r in R if r['o']==o and r['arm']==arm];A=[r for r in L if not r['dead'] and not r.get('res') and not r.get('home') and not r.get('end')]
    if not A:continue
    v=[V(r) for r in A];t=[sum(1 for r in A if r.get('tier')==i) for i in range(3)]
    m=lambda k:round(st.mean([(r[k] or 0) for r in A]))
    print(f"| {o} | {'palace' if arm=='cung' else 'home'} | {len(A)}/{len(L)} | {round(st.mean(v))} | {round(st.pstdev(v))} | {round(min(v))}–{round(max(v))} | {t[0]}/{t[1]}/{t[2]} | {m('danh')} | {m('sung')} | {round(st.mean([r['stats']/2 for r in A]))} | {round(st.mean([r['known']*3 for r in A]))} |")
