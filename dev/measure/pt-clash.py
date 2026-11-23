#!/usr/bin/env python3
"""pt-clash: every top-level name declared in the Phù Tang files (jbalpt.js, jrd_pt.js, jrd_pt2.js) must not be declared or used
as a global anywhere else in the assembled build (fix 1 of the r1 review: jbalpt `const ptX` clashed with main jptime.js `function ptX`).
usage: python3 dev/measure/pt-clash.py   (run from the repo root; reads the module list from dev/build/assemble.py)"""
import re,sys
A=open('dev/build/assemble.py',encoding='utf-8').read()
s=A[A.index("for f in [")+10:];mods=re.findall(r"'([^']+)'",s[:s.index("])")])
PT={'jbalpt.js','jrd_pt.js','jrd_pt2.js'}
DECL=re.compile(r'^(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)',re.M)
def names(t):return set(DECL.findall(t))
own={};other={}
for f in mods:
  try:t=open('dev/build/'+f,encoding='utf-8').read()
  except FileNotFoundError:continue
  for n in names(t):(own if f in PT else other).setdefault(n,[]).append(f)
bad=0
for n,fs in sorted(own.items()):
  if len(fs)>1:print('DUP inside pt files',n,fs);bad+=1
  if n in other:print('CLASH',n,fs,'vs',other[n]);bad+=1
# stale references: the r2 rename pt*/PT*/P_ -> pf*/PF*/PFD must leave no use of an OLD name in any module that does not itself declare it
OLD="PT97 PTBAC PTCF PTDC PTDK PTFREE PTHT PTKINH PTLOG PTNGOC PTO PTOC PTP PTSAIL PTTNK PTTVK PTXL P_ pt2E ptAlive ptArc ptConfine ptE ptG ptKill ptLife ptMan ptMeet ptMove ptO ptP ptR ptS ptSail ptWhere ptX".split()
for f in mods:
  try:t=open('dev/build/'+f,encoding='utf-8').read()
  except FileNotFoundError:continue
  dec=names(t)
  for n in OLD:
    if n in dec or n in other and f in other[n]:continue
    if re.search(r'(?<![\w$])'+re.escape(n)+r'(?![\w$])',re.sub(r'/\*.*?\*/','',t,flags=re.S)):print('STALE',n,'in',f);bad+=1
print(f'pt-clash: {len(own)} top-level names in {sorted(PT)} · clashes {bad} · {"PASS" if not bad else "FAIL"}')
sys.exit(1 if bad else 0)
