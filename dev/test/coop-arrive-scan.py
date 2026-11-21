#!/usr/bin/env python3
"""coop-arrive-see scan (law 11): every code path that sets S.place or opens S.visit, and whether co-op presence is refreshed after it.
BEFORE = origin/main (refresh only from the goTo/nextBuoi/placeWhere wrappers on the OUTER seat; her copy on the host only on her buổi step,
and with the host's place of the last step). AFTER = presAll() on the host at every render and after every goTo (both persons; her copy reaches her phone in the next view).
usage: python3 dev/test/coop-arrive-scan.py   (run in the repo root)"""
import re,glob,os
rows=[]
for f in sorted(glob.glob('dev/build/j*.js')):
    if os.path.basename(f) in ('all.js',):continue
    for i,l in enumerate(open(f,encoding='utf8'),1):
        for m in re.finditer(r'S\.(place|visit)=(?!=)',l):
            # enclosing function name: nearest 'function X(' or 'X=function' before the match on this line, else previous lines
            pre=l[:m.start()];fn=re.findall(r'function\s+([A-Za-z0-9_$]+)\s*\(|([A-Za-z0-9_$]+)=function',pre)
            name=(fn[-1][0] or fn[-1][1]) if fn else '?'
            tail=l[m.start():m.start()+400];rend='render(' in tail or 'goTo(' in tail
            rows.append((f[10:],i,m.group(1),name,rend))
print('| file:line | sets | in | ends in render/goTo on the line | BEFORE friend shown to the arriver | AFTER |')
print('|---|---|---|---|---|---|')
for f,i,k,n,r in rows:
    print(f'| {f}:{i} | S.{k} | {n} | {"yes" if r else "no (caller renders)"} | only if a later goTo/nextBuoi/placeWhere hook ran on that seat; her copy: never with his live place | yes: presAll at the next host render or goTo (both seats) |')
print(f'\n{len(rows)} sites')
