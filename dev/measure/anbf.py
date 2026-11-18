#!/usr/bin/env python3
"""balance-final (D ROOT) arm table: anr2 layout + deaths / 100 life-years by cause, kids / y, her nights + conceptions / y, NPC conception per night.
usage: anbf.py name=dir [name=dir ...] [--orig] [--fates]   (dirs written by runbal2.sh with INPX=inb2r2.js,inbf.js)"""
import json,sys,glob,statistics as st,collections as C
def load(d):
  R=[]
  for f in sorted(glob.glob(d+'/b2_sens_*.json')):
    if f.endswith('.ext.json'):continue
    try:R+=json.load(open(f))
    except Exception as e:print('skip',f,e,file=sys.stderr)
  return [x for x in R if x.get('origin')]
def ended(x):return x['title'] not in('CHSTOP','TIMEOUT','HH') and not str(x['title']).startswith('CRASH')
def dead(x):return ended(x) and x.get('title')=='Hồng nhan bạc mệnh'
def cause(f):
  f=(f or '').lower()
  if 'độc' in f:return 'poison'
  if 'sinh' in f and ('băng huyết' in f or 'hài nhi' in f or 'khó sinh' in f) or 'phá thai' in f:return 'birth'
  if 'nguy kịch' in f or 'bệnh' in f:return 'illness'
  return 'other'
def first(x,r):
  for c in x.get('cv') or []:
    if c[1]>=r:return c[0]
  return None
def med(L):
  L=[v for v in L if v is not None];return (st.median(L)) if L else '-'
def dm(x,m):d=(x.get('b2') or {}).get('dm',{}).get(str(m));return d[2] if d else None
args=[a for a in sys.argv[1:] if '=' in a];O=set(a for a in sys.argv[1:] if a.startswith('--'))
print('| arm | lives | Hoàng hậu | ended before HH/cap | ended < 3 y | Phi reached, median month | Quý phi reached, median month | HH median month | Danh m12/24/36 |\n|---|---|---|---|---|---|---|---|---|')
AR={}
for a in args:
  n,d=a.split('=',1);R=load(d);AR[n]=R;N=max(1,len(R));pc=lambda k:f"{k} ({round(100*k/N)} %)"
  hh=[x for x in R if (x.get('maxRank') or 0)>=7];ph=[first(x,4) for x in R if (x.get('maxRank') or 0)>=4];qp=[first(x,5) for x in R if (x.get('maxRank') or 0)>=5]
  print(f"| {n} | {len(R)} | {pc(len(hh))} | {pc(sum(1 for x in R if ended(x)))} | {pc(sum(1 for x in R if ended(x) and x['years']<3))} | {pc(len(ph))}, m{med(ph)} | {pc(len(qp))}, m{med(qp)} | m{med([x.get('hhTurn') or x['turns'] for x in hh])} | {med([dm(x,12) for x in R])}/{med([dm(x,24) for x in R])}/{med([dm(x,36) for x in R])} |")
print('\n| arm | life-years | deaths /100 y (poison / birth / illness / other) | early < 3 y deaths (poison) | kids /y | her nights /y | her conceptions /y | her mean conceive % /night | NPC conceptions per 100 NPC nights |\n|---|---|---|---|---|---|---|---|---|')
for n,R in AR.items():
  Y=sum(x['years'] for x in R) or 1;D=C.Counter(cause(x.get('fate')) for x in R if dead(x))
  e=[x for x in R if dead(x) and x['years']<3]
  B=[x.get('bf') or {} for x in R];hn=sum(b.get('hn',0) for b in B);hc=sum(b.get('hc',0) for b in B);hcs=sum(b.get('hcs',0) for b in B)
  nn=sum(b.get('nn',0) for b in B);nc=sum(b.get('nc',0) for b in B)
  print(f"| {n} | {Y:.0f} | {100*sum(D.values())/Y:.2f} ({100*D['poison']/Y:.2f} / {100*D['birth']/Y:.2f} / {100*D['illness']/Y:.2f} / {100*D['other']/Y:.2f}) | {len(e)} ({sum(1 for x in e if cause(x.get('fate'))=='poison')}) | {sum(x.get('kids') or 0 for x in R)/Y:.3f} | {hn/Y:.1f} | {hc/Y:.3f} | {hcs/max(1,hn):.2f} | {100*nc/max(1,nn):.2f} |")
if '--orig' in O:
  ks=['tt','dtq','muoi','cn','nc','bd','td','ch','thd','cnv']
  print('\n| arm (HH/lives) | '+' | '.join(ks)+' |\n|---|'+'---|'*len(ks))
  for n,R in AR.items():
    by=C.defaultdict(list)
    for x in R:by[x['origin']].append(x)
    print(f"| {n} | "+' | '.join(f"{sum(1 for x in by[k] if (x.get('maxRank') or 0)>=7)}/{len(by[k])}" for k in ks)+' |')
if '--fates' in O:
  for n,R in AR.items():
    print(n,C.Counter((cause(x.get('fate')),(x.get('fate') or '')[:50]) for x in R if ended(x)).most_common(30))
