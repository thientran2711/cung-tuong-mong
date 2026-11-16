#!/usr/bin/env python3
"""Static census of every place in dev/build/j*.js that takes bạc from her (`bac:-N` in a choice / act / cost), per file, and which
group of dev/measure/bacroad.js prices it (bạc ↔ road without silver, owner rule 15/11 20:30Z). Files with no group are the part of the
game the scan does NOT check yet: the list to work through next.
usage: python3 dev/measure/bacsites.py [--md]"""
import re,sys,glob,os
B=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
GROUP={'j67.js':'j67 chapter beats (+ jstory roads)','j72.js':'j72 phụ tuyến (+ jstory roads)','jecon.js':'jecon schemes + monthly duty',
 'jrest.js':'jrest dưỡng sức','j68e.js':'j68 common events (jbac)','j68f.js':'j68 common events (jbac)','j68g.js':'j68 common events (jbac)',
 'j68h.js':'j68 common events (jbac)','j2.js':'act (deck + talk options, value per khắc; partly)','j8.js':'act (scheme acts; via jecon pairs)'}
rows=[]
for f in sorted(glob.glob(os.path.join(B,'j*.js'))):
  n=os.path.basename(f)
  if n=='all.js':continue
  t=open(f,encoding='utf-8').read()
  k=len(re.findall(r'bac:\s*-\s*[0-9A-Za-z(]',t))
  if k:rows.append((n,k,GROUP.get(n,'— not scanned')))
rows.sort(key=lambda r:(-r[1]))
tot=sum(r[1] for r in rows);cov=sum(r[1] for r in rows if not r[2].startswith('—'))
if '--md' in sys.argv:
  print('| file | bạc sites | bacroad.js group |\n|---|---|---|')
  for r in rows:print(f'| {r[0]} | {r[1]} | {r[2]} |')
  print(f'\nTotal {tot} sites in {len(rows)} files; in a scanned group: {cov} ({round(100*cov/max(1,tot))} of 100).')
else:
  for r in rows:print(f'{r[1]:4d}  {r[0]:12s} {r[2]}')
  print('total',tot,'covered',cov)
