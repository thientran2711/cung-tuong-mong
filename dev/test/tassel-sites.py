#!/usr/bin/env python3
"""review/tassel-fix — static whole-class list: every place that draws a framed portrait (pcPort cell / mdH small frame / pframe /
kitPortrait) and every CSS rule that could still cut the frame canvas (an aspect-ratio or a .kin height other than the whole canvas).
usage: python3 dev/test/tassel-sites.py [--fail]   (--fail: exit 1 when a 550/795 cell or a 130.44 % .kin is left)"""
import re,sys,glob,os
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
calls={};bad=[]
for f in sorted(glob.glob(D+'/j*.js')):
  t=open(f,encoding='utf-8').read();n=os.path.basename(f)
  for fn in ('pcPort','mdH','pframe','kitPortrait'):
    c=len(re.findall(r'(?<![\w.])'+fn+r'\(',t))
    if c:calls.setdefault(n,{})[fn]=c
  for m in re.finditer(r'550\s*/\s*795|130\.44%',t):
    line=t[:m.start()].count('\n')+1;src=t.splitlines()[line-1]
    if 'width:calc(var(--kmeh)' in src or 'tassel-fix' in src or src.lstrip().startswith(('/*','≥','//')):continue  # header WIDTH formula / comments
    bad.append(f'{n}:{line}: {src.strip()[:120]}')
print('call sites (file: function x count)');[print(' ',k,v) for k,v in calls.items()]
print('cells cut at the band (550/795 or .kin 130.44 %):',len(bad));[print(' ',b) for b in bad]
if '--fail' in sys.argv and bad:sys.exit(1)
