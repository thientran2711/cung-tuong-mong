#!/usr/bin/env python3
"""review/opt-render (owner 11/15, KIT 28.6) — static scan of EVERY place that puts a dialog with choices into the queue.
For each Q.push / Q.unshift / pushModal / pushDil / pushFront / mkP site in dev/build/*.js (modules of assemble.py) it prints the title,
whether the literal carries choices (opts / o:), and how the kit classifies it:
  pid    built from a PEND entry (mkP / pushDil / pushFront): event by default, an ACT when its id is in KIT_ACT_PIDS (jk2b)
  ev     flagged event (ev:1 / ev:"fest") → cost mode
  act    flagged active action / confirm (act:1 or showOut) → full numbers
  shop   flagged shop (shop:1) → full numbers
  kit    kitPanel / kitModal: an event when spec.kind is "choice" (decided at run time)
  info   no choices (a notice; its numbers are the real, already-applied result)
  ??     choices but no classification → FAIL
usage: python3 dev/test/opt-scan.py [--fail]"""
import re,sys,os
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
mods=re.search(r"for f in (\[[^\]]*\])",open(os.path.join(D,'assemble.py'),encoding='utf-8').read()).group(1)
mods=eval(mods)
jk=open(os.path.join(D,'jk2b.js'),encoding='utf-8').read()
m=re.search(r'const KIT_ACT_PIDS=new Set\(\[([^\]]*)\]\)',jk);ACT=set(re.findall(r'"([^"]+)"',m.group(1))) if m else set()
def arg(t,i):
  d=0;j=i
  while j<len(t):
    c=t[j]
    if c in '([{':d+=1
    elif c in ')]}':
      d-=1
      if d<0:return t[i:j]
    elif c in '"\'`':
      q=c;j+=1
      while j<len(t) and t[j]!=q:
        if t[j]=='\\':j+=1
        j+=1
    j+=1
  return t[i:]
rows=[]
CALL=re.compile(r'\b(Q\.push|Q\.unshift|pushModal|pushDil|pushFront)\(')
for f in mods:
  t=open(os.path.join(D,f),encoding='utf-8').read()
  if f=='j93.js':t=re.sub(r'KMQ\.push','KMQ_push',t)
  for mm in CALL.finditer(t):
    a=arg(t,mm.end());ln=t.count('\n',0,mm.start())+1
    pre=t[max(0,mm.start()-40):mm.start()]
    if re.search(r'function\s+$',pre) or a.strip()=='' or a.strip() in ('m','...q','h.m','card','iv','fx','fn','d','m,title'):kind='indirect'
    else:kind=None
    tm=re.search(r'\bt:\s*(`[^`]*`|"[^"]*"|\'[^\']*\'|[A-Za-z_][\w.()]*)',a);title=(tm.group(1) if tm else '')[:44]
    pm=re.search(r'mkP\("([^"]+)"',a);pid=pm.group(1) if pm else None
    if mm.group(1) in('pushDil','pushFront') or pid:
      if not pid and kind=='indirect':continue
      cls='act' if pid in ACT else 'pid'
      rows.append((f,ln,mm.group(1),title or (pid or ''),cls,pid));continue
    if kind=='indirect':continue
    has=bool(re.search(r'\bopts\s*:',a))
    flg=set()
    if re.search(r'\bev\s*:',a):flg.add('ev')
    if re.search(r'\b(act\s*:|showOut\s*:\s*(true|1))',a):flg.add('act')
    if re.search(r'\bshop\s*:',a):flg.add('shop')
    if re.search(r'\bpid\s*:',a):flg.add('pidf')
    if re.search(r'opts\s*:\s*\[\s*\]',a) and not re.search(r'opts\s*:\s*\[\s*\]\s*\.concat',a):has=False
    cls='info' if not has else ('ev' if 'ev' in flg else 'act' if 'act' in flg else 'shop' if 'shop' in flg else 'pid' if 'pidf' in flg else '??')
    rows.append((f,ln,mm.group(1),title,cls,None))
# every dialog LITERAL with choices anywhere (builders that return the item: approachOne, FESTEV, …): {t:… opts:…}
LIT=re.compile(r'\{((?:ev|act|shop):[^,{}]{1,8},)?t:')
seenpos=set()
for f in mods:
  t=open(os.path.join(D,f),encoding='utf-8').read()
  for mm in LIT.finditer(t):
    a=arg(t,mm.start()+1)
    if not re.search(r'(^|,)opts\s*:',a) or re.search(r'opts\s*:\s*(d\.o|\[\s*\])',a):continue
    ln=t.count('\n',0,mm.start())+1
    if any(r[0]==f and r[1]==ln for r in rows):continue
    tm=re.search(r'\bt:\s*(`[^`]*`|"[^"]*"|[A-Za-z_][\w.()]*)',a);title=(tm.group(1) if tm else '')[:44]
    head=mm.group(1) or ''
    cls='ev' if head.startswith('ev') or re.search(r'\bev\s*:',a) else 'act' if head.startswith('act') or re.search(r'showOut\s*:\s*(true|1)',a) else 'shop' if head.startswith('shop') else 'kit' if re.search(r'\bkit\s*:\s*spec',a) else 'pid' if re.search(r'\bpid\s*:',a) else '??'
    rows.append((f,ln,'literal',title,cls,None))
# PEND ids: every PEND.<id>= definition, event unless in KIT_ACT_PIDS
pend=[]
for f in mods:
  t=open(os.path.join(D,f),encoding='utf-8').read()
  for mm in re.finditer(r'PEND\.(\w+)\s*=',t):pend.append((mm.group(1),f))
seen=set();P=[]
for k,f in pend:
  if k in seen:continue
  seen.add(k);P.append((k,f,'act' if k in ACT else 'event'))
bad=[r for r in rows if r[4]=='??']
print(f"{'file:line':<14} {'call':<10} {'class':<5} title")
for r in rows:print(f"{r[0]+':'+str(r[1]):<14} {r[2]:<10} {r[4]:<5} {r[3]}")
print(f"\nPEND ids: {len(P)} — act (full numbers): {', '.join(k for k,f,c in P if c=='act')}")
print(f"PEND event (cost mode): {', '.join(k for k,f,c in P if c=='event')}")
from collections import Counter
print("\nTOTAL", dict(Counter(r[4] for r in rows)), "unclassified:",len(bad))
if '--fail' in sys.argv and bad:sys.exit(1)
