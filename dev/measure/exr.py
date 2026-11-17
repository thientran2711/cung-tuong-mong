import json,sys
for f in sys.argv[1:]:
  d=json.load(open(f));R=[r for x in d for r in ((x.get('ix') or {}).get('exr') or [])]
  print('==',f,'lives',len(d),'exams',len(R),'pass',sum(r[7] for r in R))
  import collections as C;G=C.defaultdict(list)
  for r in R: G[r[0]].append(r)
  print(' to  n pass  vir  art   sh  play total bar  arts  virs  hh danh')
  for k in sorted(G):
    L=G[k];n=len(L);m=lambda i:sum(r[i] for r in L)/n
    print('%3d %3d %4d'%(k,n,sum(r[7] for r in L))+''.join(' %5.1f'%m(i) for i in (1,2,3,4,5,6,8,9,10,11)))
