#!/usr/bin/env python3
"""ghen shown vs applied scan (LUẬT SỬA CẢ NHÓM, ONE CORE OD:L1267).
Lists EVERY live text that shows a jealousy gain "ghen +n" and every ghenAll() call, and classifies:
  OK      text prints ghenN(...) (the same function ghenAll applies, đa tình ×BAL.ghen.datinh)
  BAD     text prints a plain number/constant next to a ghenAll() write (shown != applied when the Emperor is đa tình)
  DIRECT  text next to a direct one-consort/one-group write v.ghen=cl(v.ghen+n) (no đa tình factor, shown == applied)
  NOTE    text with no write on the same line (code comment / other file applies it) — listed for a human look
  call-OK / call-TYPED  ghenAll() argument read from BAL (or a BAL-backed local) / typed number
Usage: ghen_shown_scan.py [git-rev]   (no rev = working tree)"""
import re,subprocess,sys,os
rev=sys.argv[1] if len(sys.argv)>1 else None
root=subprocess.run(['git','rev-parse','--show-toplevel'],capture_output=True,text=True,cwd=os.path.dirname(os.path.abspath(__file__))).stdout.strip()
def read(p):
  if rev:return subprocess.run(['git','show',f'{rev}:{p}'],capture_output=True,text=True,cwd=root).stdout
  return open(os.path.join(root,p),encoding='utf-8').read()
asm=read('dev/build/assemble.py');files=re.findall(r"'(j\w*\.js)'",asm.split('js=')[1].split(']')[0])
TXT=re.compile(r'ghen \+(\$\{(?:[^{}]|\{[^{}]*\})*\}|\d+)');CALL=re.compile(r'ghenAll\(([^)]*\)?)\)')
DIR=re.compile(r'\.ghen=cl\(\(?\w+\.ghen(?:\|\|0)?\)?\+')
rows=[];calls=[]
for f in files:
  for i,l in enumerate(read('dev/build/'+f).split('\n'),1):
    if l.lstrip().startswith(('/*','*','//')):
      continue
    # rules-prefail: p3GhenAll(p, n, why) (jagacts3, law 1 her and every NPC) = ghenAll(n, why) when p is her — the applied key is its 2nd argument
    for m in re.finditer(r'p3GhenAll\(\w+,\s*([^,()]+)',l):calls.append((f,i,m.group(1).strip(),'call-OK'))
    for m in CALL.finditer(l):
      a=m.group(1)
      # rules-prefail: ghenAll(n, why) — the applied key is the FIRST argument (a «why» text was added later; it made every key read as unapplied)
      d=0;cut=len(a)
      for j,ch in enumerate(a):
        if ch in '([{':d+=1
        elif ch in ')]}':d-=1
        elif ch==',' and d==0:cut=j;break
      a=a[:cut].strip()
      if f=='j1.js' and a=='n':continue
      calls.append((f,i,a,'call-TYPED' if re.fullmatch(r'\d+',a) else 'call-OK'))
    for m in TXT.finditer(l):
      v=m.group(1);ctx=l[max(0,m.start()-50):m.end()+5].replace('|','/')
      if 'ghenN(' in v:k='OK'
      elif 'ghenAll(' in l:k='BAD'
      elif DIR.search(l):k='DIRECT'
      else:k='NOTE'
      rows.append((f,i,v,k,ctx))
print(f"# ghen shown vs applied — {rev or 'working tree'}\n")
print('| file:line | shown | class | text |\n|---|---|---|---|')
for r in rows:print(f'| {r[0]}:{r[1]} | `{r[2]}` | {r[3]} | {r[4].strip()} |')
print('\n| file:line | ghenAll arg | class |\n|---|---|---|')
for c in calls:print(f'| {c[0]}:{c[1]} | `{c[2]}` | {c[3]} |')
# every text key ghenN(K) must be a key some ghenAll(K) applies (same constant for shown and applied)
args={c[2] for c in calls};orph=[r for r in rows if r[3]=='OK' and re.search(r'ghenN\((.*)\)\}$',r[2]).group(1) not in args]
for r in orph:print(f'ORPHAN text key not applied by any ghenAll: {r[0]}:{r[1]} {r[2]}')
from collections import Counter
C=Counter(r[3] for r in rows)+Counter(c[3] for c in calls)+Counter({'ORPHAN':len(orph)})
print('\nTOTAL',dict(C))
sys.exit(1 if C.get('BAD') or C.get('call-TYPED') or C.get('ORPHAN') else 0)
