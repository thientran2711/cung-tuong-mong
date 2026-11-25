#!/usr/bin/env python3
"""net-build family scan (LAW 11): every relation gate in dev/build/j*.js that compares thiện cảm / oán / danger / hostility
with a TYPED number, plus BAL keys that hold a relation level. usage: python3 dev/measure/net-scan.py [--sum]
Prints file:line  kind  op N  snippet. --sum prints counts per kind and per number (the before/after table)."""
import re,sys,glob,os
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
FN=r'(aff|oan|danger|hostility|affOf|relOf)\s*\([^()]*(?:\([^()]*\)[^()]*)*\)'
G=re.compile(FN+r'\s*(>=|>|<=|<)\s*(-?\d+)\b')
G2=re.compile(r'\b(-?\d+)\s*(>=|>|<=|<)\s*'+FN)
out=[]
for f in sorted(glob.glob(D+'/j*.js')):
  b=os.path.basename(f)
  for i,l in enumerate(open(f,encoding='utf-8'),1):
    for m in G.finditer(l):out.append((b,i,m.group(1),m.group(2),int(m.group(3)),l[max(0,m.start()-30):m.end()+10].strip()))
    for m in G2.finditer(l):out.append((b,i,m.group(4),m.group(2),int(m.group(1)),l[max(0,m.start()-30):m.end()+10].strip()))
if '--sum' in sys.argv:
  from collections import Counter
  c=Counter((k,n) for _,_,k,_,n,_ in out);print('total typed relation gates:',len(out))
  for k in sorted(set(x[0] for x in c)):print(k,', '.join(f'{n}:{c[(k,n)]}' for (kk,n) in sorted(c) if kk==k))
else:
  for r in out:print(f'{r[0]}:{r[1]}\t{r[2]} {r[3]} {r[4]}\t{r[5][:110]}')
