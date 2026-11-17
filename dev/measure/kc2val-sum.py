# Summary of dev/measure/kc2val.js runs: python3 dev/measure/kc2val-sum.py <cung json...> -- <nha json...>
# V = rank value (RANKS s+d; a cung nữ: servant rank x15 + Chủ tin/2) + Sủng + Danh + (Sắc+Tài+Tâm cơ+Đức)/2 + tài nghệ levels x4 + Bạc/10 + people known x3
import json,sys
a=sys.argv[1:];i=a.index('--');CU,NH=a[:i],a[i+1:]
RS=[(0,0),(15,10),(25,20),(38,30),(52,42),(66,55),(78,68),(85,78)]
def V(r):
  rv=sum(RS[r['rank']]) if not r['srv'] else (r['srk'] or 0)*15+(r.get('tin') or 0)/2
  return rv+(r['sung'] or 0)+(r['danh'] or 0)+r['stats']/2+r['arts']*4+(r['bac'] or 0)/10+r['known']*3
def load(fs,arm):
  R=[]
  for f in fs:R+=[r for r in json.load(open(f))['rows'] if r['arm']==arm]
  return R
cu,nh=load(CU,'cung'),load(NH,'nha')
print('| origin | palace arm V (n alive) | home arm V at entry (n entered / n) | gap | home lives ended outside or dead |')
print('|---|---|---|---|---|')
for o in sorted(set(r['o'] for r in cu+nh)):
  c=[V(r) for r in cu if r['o']==o and not r['dead'] and not r.get('res')]
  nall=[r for r in nh if r['o']==o];n=[V(r) for r in nall if not r['dead'] and not r.get('home') and not r.get('end')]
  m=lambda L:round(sum(L)/len(L)) if L else None
  print(f"| {o} | {m(c)} ({len(c)}) | {m(n)} ({len(n)}/{len(nall)}) | {None if not c or not n else m(n)-m(c)} | {len(nall)-len(n)} |")
