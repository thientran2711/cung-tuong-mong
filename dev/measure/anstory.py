#!/usr/bin/env python3
"""D8 story-bot summary. usage: python3 dev/measure/anstory.py [--md] <story_*.json ...>
Per origin x difficulty: lives, reach rate of chapter 2/3/4/5 starts, median month of ch4 start, early deaths (< 3 game years),
tutorial chapters done (Xong) vs closed by time (Lỡ dịp), stuck (TIMEOUT / CRASH), Sủng / Danh at month 12 / 24 / 36 (median),
plus the per-chapter outcome mix and the ch1-3 milestone misses. Whole-life runs (no CHSTOP) add HH rate, death age, max chapter."""
import json,sys,statistics as st,collections as C
md='--md' in sys.argv;F=[a for a in sys.argv[1:] if not a.startswith('--')]
R=[]
for f in F:
  try:R+=json.load(open(f))
  except Exception as e:print('skip',f,e,file=sys.stderr)
R=[x for x in R if x.get('origin')]
OR=['tt','dtq','muoi','cn','nc','bd','td','ch','thd','cnv'];DF=['de','vua','kho']
def med(L):return st.median(L) if L else None
def pc(a,b):return f"{round(100*a/b)}" if b else "-"
def fmt(v):return '-' if v is None else (f"{v:.0f}" if isinstance(v,(int,float)) else str(v))
def chstart(x,n):
  for c in x.get('chs',[]):
    if c['n']==n:return c['t']
  return None
def at(x,m,i):
  cv=x.get('cv',[]);best=None
  for r in cv:
    if r[0]<=m:best=r
  return best[i] if best and x.get('turns',0)>=m else None
def row(L):
  n=len(L);early=sum(1 for x in L if x['title'] not in('CHSTOP','TIMEOUT') and not str(x['title']).startswith('CRASH') and x['years']<3)
  stuck=sum(1 for x in L if x['title'] in('TIMEOUT',) or str(x['fate']).startswith('CRASH'))
  reach={k:sum(1 for x in L if (x.get('chN') or 0)>=k) for k in (2,3,4,5)}
  t4=[chstart(x,4) for x in L if chstart(x,4) is not None];t5=[chstart(x,5) for x in L if chstart(x,5) is not None]
  b4=[c['b'] for x in L for c in x.get('chs',[]) if c['n']==4]
  tut={i:C.Counter() for i in (1,2,3)}
  for x in L:
    for p in x.get('past',[]):
      if p['n'] in tut:tut[p['n']][p['tag'] if p['tag'] in('Xong','Lỡ dịp') else 'other']+=1
  s12=[v for v in (at(x,12,2) for x in L) if v is not None];s24=[v for v in (at(x,24,2) for x in L) if v is not None]
  d12=[v for v in (at(x,12,3) for x in L) if v is not None];d24=[v for v in (at(x,24,3) for x in L) if v is not None]
  r24=[v for v in (at(x,24,1) for x in L) if v is not None]
  return dict(n=n,early=early,stuck=stuck,reach=reach,t4=med(t4),t5=med(t5),b4=med(b4),tut=tut,s12=med(s12),s24=med(s24),d12=med(d12),d24=med(d24),r24=med(r24),
    hh=sum(1 for x in L if (x.get('maxRank') or 0)>=7),maxch=med([x.get('chN') or 0 for x in L]),dage=med([x.get('age') for x in L if x['title'] not in('CHSTOP','TIMEOUT') and x.get('age')]))
def tut(c):t=sum(c.values());return f"{c['Xong']}/{t}" if t else '-'
H="| origin | diff | lives | reach ch2/ch3/ch4/ch5 (%) | ch4 start (month, median) | ch5 start | buổi to ch4 | early death <3y | stuck | ch1/ch2/ch3 done (Xong/closed) | rank@24m | Sủng 12/24m | Danh 12/24m |"
print(H);print('|'+'---|'*13)
tot=[]
for o in OR:
  for d in DF:
    L=[x for x in R if x['origin']==o and x.get('diff')==d]
    if not L:continue
    r=row(L);n=r['n']
    print(f"| {o} | {d} | {n} | {pc(r['reach'][2],n)}/{pc(r['reach'][3],n)}/{pc(r['reach'][4],n)}/{pc(r['reach'][5],n)} | {fmt(r['t4'])} | {fmt(r['t5'])} | {fmt(r['b4'])} | {r['early']} ({pc(r['early'],n)}%) | {r['stuck']} | {tut(r['tut'][1])} · {tut(r['tut'][2])} · {tut(r['tut'][3])} | {fmt(r['r24'])} | {fmt(r['s12'])}/{fmt(r['s24'])} | {fmt(r['d12'])}/{fmt(r['d24'])} |")
print()
for d in DF+['ALL']:
  L=[x for x in R if d=='ALL' or x.get('diff')==d]
  if not L:continue
  r=row(L);n=r['n']
  print(f"**{d}** lives {n} · reach ch4 {pc(r['reach'][4],n)}% · ch5 {pc(r['reach'][5],n)}% · ch4 start month {fmt(r['t4'])} · early death {pc(r['early'],n)}% · stuck {r['stuck']} · tutorial done ch1 {tut(r['tut'][1])} ch2 {tut(r['tut'][2])} ch3 {tut(r['tut'][3])} · HH reached {pc(r['hh'],n)}% · median last chapter {fmt(r['maxch'])} · median death age {fmt(r['dage'])}")
print()
# per-chapter outcome mix ch4 (origin road first chapter), and where lives end
ends=C.Counter();chdie=C.Counter()
for x in R:
  if x['title'] not in('CHSTOP','TIMEOUT'):
    ends[str(x['fate'])[:40]]+=1;chdie[x.get('chN') or 0]+=1
print('deaths by chapter at death:',dict(sorted(chdie.items())))
print('top fates:',ends.most_common(12))
roads=C.defaultdict(C.Counter)
for x in R:
  for p in x.get('past',[]):
    if p['n']==4:roads[x['origin']][('ok' if p['k']>0 else 'bad' if p['k']<0 else 'mid')]+=1
print('ch4 outcome k (ok>0 / mid 0 / bad<0) by origin:',{o:dict(v) for o,v in roads.items()})
miss=C.Counter()
for x in R:
  for t in x.get('tq',[]):
    for q in t['q']:
      if not q.endswith('+'):miss[t['id']+':'+q]+=1
print('tutorial quests not done at chapter close:',miss.most_common(10))
