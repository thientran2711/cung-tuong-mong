#!/usr/bin/env python3
"""review/stat-pace follow-up scan (LAW 4 / LAW 11): player-visible TYPED rise previews of Danh / Đức / Sủng / thiện cảm / oán
(e.g. j7 «thiện cảm +25») that print the raw size, not the paced rise (jstatpace spSee). Pre-existing typed numbers; the fix is the
E-d «+8 (42)» kit result/gain row family (show change + new total from the real funnel). usage: python3 dev/measure/statpace-typed.py [--root dir] [--list]"""
import re,glob,os,sys
ROOT=sys.argv[sys.argv.index('--root')+1] if '--root' in sys.argv else os.path.join(os.path.dirname(__file__),'..','build')
P=re.compile(r"(thiện cảm|Sủng|Danh|Đức|oán ta|oán)[^\"'`<]{0,6}\+[0-9]+")
rows={}
for f in sorted(glob.glob(os.path.join(ROOT,'j*.js'))):
  b=os.path.basename(f)
  if b.startswith('jbal'):continue
  for i,l in enumerate(open(f,encoding='utf-8'),1):
    for m in P.finditer(l):rows.setdefault(b,[]).append((i,m.group(0)))
tot=sum(len(v) for v in rows.values())
if '--list' in sys.argv:
  for b,v in rows.items():
    for i,t in v:print(f'{b}:{i}  {t}')
print('file · typed rise previews');[print(f'{b} · {len(v)}') for b,v in sorted(rows.items(),key=lambda x:-len(x[1]))]
print(f'TOTAL {tot} typed rise previews in {len(rows)} files')
