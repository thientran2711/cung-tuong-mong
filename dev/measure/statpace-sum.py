import json,sys,statistics as st
L=[json.loads(l) for f in sys.argv[1:] for l in open(f) if l.startswith('{')]
print('lives',len(L),'ends',[d['end'] for d in L],'errs',sum(len(d['errs']) for d in L))
K=['rank','sung','danh','duc','th','hh','relM','relX','oanM','oanX']
for mo in [1,2,3,4,6,9,12,18,24]:
  rows=[x for d in L for x in d['days'] if x['t']==mo and x['tu']==0]
  if not rows: continue
  med={k:st.median([x[k] for x in rows]) for k in K}
  mx={k:max(x[k] for x in rows) for k in ['sung','danh','duc','th','hh','relX','oanX']}
  n100=sum(1 for x in rows for k in ['sung','danh','duc','th','hh','relX','oanX'] if x[k]>=99)
  lc=sum(1 for x in rows if x.get('out'));rk=sorted(x['rank'] for x in rows)
  print(f"mo{mo:>3} n{len(rows)} lc{lc} ranks{rk} "+' '.join(f"{k}{med[k]:g}" for k in K)+" | max "+' '.join(f"{k}{v}" for k,v in mx.items())+f" | at100 {n100}")
