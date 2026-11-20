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
print(f'pt-clash: {len(own)} top-level names in {sorted(PT)} · clashes {bad} · {"PASS" if not bad else "FAIL"}')
sys.exit(1 if bad else 0)
