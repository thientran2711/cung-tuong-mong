import json,glob,os,sys,collections
OUT=os.environ.get('OUT','/home/user/wt/rv-bot/outk'); arms=sys.argv[1:]; R={}
for arm in arms:
  L=[x for f in glob.glob(f'{OUT}/life-{arm}-[0-9]*[0-9].json') for x in json.load(open(f)) if x.get('dt')]
  C=collections.Counter()
  for x in L:
    for k,v in x['dt']['src36'].items():
      c=k.split(' | ')[0]; c=c if c.startswith(('card','talk','scheme')) else c.split(':')[0]
      C[c[:30]]+=v/len(L)
  R[arm]=(len(L),C)
ks=sorted(set().union(*[R[a][1] for a in arms]),key=lambda k:-max(R[a][1][k] for a in arms))[:16]
print('| Danh gained m0–36 per life | '+' | '.join(f'{a} (n={R[a][0]})' for a in arms)+' |')
print('|---'*(len(arms)+1)+'|')
print('| TOTAL | '+' | '.join(f'{sum(R[a][1].values()):.0f}' for a in arms)+' |')
for k in ks: print(f'| {k} | '+' | '.join(f'{R[a][1][k]:.1f}' for a in arms)+' |')
