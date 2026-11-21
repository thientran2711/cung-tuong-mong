import json,glob,os,sys,collections
OUT=os.environ.get('OUT','/home/user/wt/rv-bot/outk'); arms=sys.argv[1:]; R={}
def g(k):
  c=k.split(' | ')[0]
  if c.startswith(('card','talk')): return c[:30]
  if c.startswith('dlg'): return 'dlg (events)'
  return c.split(':')[0][:30]
for arm in arms:
  L=[x for f in glob.glob(f'{OUT}/life-{arm}-[0-9]*[0-9].json') for x in json.load(open(f)) if x.get('dt') and 'l36' in x['dt']]
  G=collections.Counter();Lo=collections.Counter()
  for x in L:
    for k,v in x['dt']['src36'].items(): G[g(k)]+=v/len(L)
    for k,v in x['dt']['l36'].items(): Lo[g(k)]+=v/len(L)
  R[arm]=(len(L),G,Lo)
ks=sorted(set().union(*[set(R[a][1])|set(R[a][2]) for a in arms]),key=lambda k:-max(abs(R[a][1][k]+R[a][2][k]) for a in arms))[:18]
print('| m0–36 per life: gain / loss / NET | '+' | '.join(f'{a} (n={R[a][0]})' for a in arms)+' |')
print('|---'*(len(arms)+1)+'|')
print('| TOTAL | '+' | '.join(f'+{sum(R[a][1].values()):.0f} / {sum(R[a][2].values()):.0f} / **{sum(R[a][1].values())+sum(R[a][2].values()):+.0f}**' for a in arms)+' |')
for k in ks: print(f'| {k} | '+' | '.join(f'+{R[a][1][k]:.0f} / {R[a][2][k]:.0f} / {R[a][1][k]+R[a][2][k]:+.0f}' for a in arms)+' |')
