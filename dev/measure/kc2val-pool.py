# fix2: palace arm pooled over every fresh run (the palace arm never reads BAL.kcv), home arm from the final-build runs only.
# python3 dev/measure/kc2val-pool.py <palace jsons...> -- <home jsons...>
import json,sys,statistics as st
sys.path.insert(0,__import__('os').path.dirname(__file__))
RS=[(0,0),(15,10),(25,20),(38,30),(52,42),(66,55),(78,68),(85,78)]
def V(r):
  rv=sum(RS[r['rank']]) if not r['srv'] else (r['srk'] or 0)*15+(r.get('tin') or 0)/2
  return rv+(r['sung'] or 0)+(r['danh'] or 0)+r['stats']/2+r['arts']*4+(r['bac'] or 0)/10+r['known']*3
alive=lambda r:not r['dead'] and not r.get('res') and not r.get('home') and not r.get('end')
a=sys.argv[1:];i=a.index('--')
P=[r for f in a[:i] for r in json.load(open(f))['rows'] if r['arm']=='cung' and alive(r)]
H=[r for f in a[i+1:] for r in json.load(open(f))['rows'] if r['arm']=='nha']
print('| origin | palace V pooled (n) | home V final build (n alive/n) | gap (± se) |');print('|---|---|---|---|')
for o in sorted(set(r['o'] for r in H)):
  p=[V(r) for r in P if r['o']==o];hl=[r for r in H if r['o']==o];h=[V(r) for r in hl if alive(r)]
  if not p or not h:continue
  g=st.mean(h)-st.mean(p);se=(st.pvariance(p)/len(p)+st.pvariance(h)/len(h))**.5
  print(f"| {o} | {round(st.mean(p))} ({len(p)}) | {round(st.mean(h))} ({len(h)}/{len(hl)}) | **{round(g):+d}** (±{round(se)}) |")
