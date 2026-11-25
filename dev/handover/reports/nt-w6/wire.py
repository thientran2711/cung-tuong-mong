#!/usr/bin/env python3
"""wave-2 wirer: for each RAW aff site in relshow-scan, find the apply call (affAdd/relAdd/msAffAdd) with the SAME amount
expression on the same line; holder = the non-player side whose thiện cảm rises; rewrite LAB<num> -> ${pvQuy(holder,E,"LAB")}.
usage: wire.py [--apply] [--only file]"""
import re,sys,subprocess,os
os.chdir('/home/user/wt/ng')
out=subprocess.run(['python3','dev/test/relshow-scan.py','--list'],capture_output=True,text=True).stdout
sites=[l.split(' ',3) for l in out.split('\n') if ' aff RAW ' in l]
from collections import defaultdict
by=defaultdict(set)
for s in sites:
  f,l=s[0].split(':');by[(f,int(l))].add(s[3])
APPLY=re.compile(r'\b(relAdd|affAdd|msAffAdd)\(\s*([A-Za-z_$][\w$.\[\]()]*?)\s*,\s*([A-Za-z_$][\w$.\[\]()]*?)\s*,\s*([^;]+?)\)\s*(?=[;}\]),]|$)')
PL={'S','p','me','P','pl'}
def norm(e):return re.sub(r'\s','',e)
def holderOf(fn,a,b):
  # thiện cảm that rises with the nết factor: relAdd(a,b): both; the shown «quý ngươi / thiện cảm» belongs to the non-player
  if fn=='relAdd':
    if a in PL and b not in PL:return b
    if b in PL and a not in PL:return a
    return None
  # affAdd(x,y,n): x = holder
  return a if a not in PL else None
NUMS=[(r'\$\{balSg\(([^{}]+?)\)\}','sg'),(r'\+\$\{([^{}]+?)\}','plus'),(r'\+([0-9]+)\b','lit')]
args=sys.argv[1:];APPLYIT='--apply' in args;only=args[args.index('--only')+1] if '--only' in args else None
files={};done=0;skip=[]
for (f,l),labs in sorted(by.items()):
  if only and f!=only:continue
  if f not in files:files[f]=open('dev/build/'+f,encoding='utf-8').read().split('\n')
  L=files[f][l-1]
  applies=[(m.group(1),m.group(2),m.group(3),norm(m.group(4))) for m in APPLY.finditer(L)]
  rx=re.compile(r'(?<![\w"])(thiện cảm|Thiện cảm|quý ngươi|quý ta)(\s)(?:'+'|'.join(p for p,_ in NUMS)+')')
  newL=L;changed=[]
  def rep(m):
    lab=m.group(1);E=next(g for g in m.groups()[2:] if g is not None)
    kind='lit' if m.group(0).split(m.group(2),1)[1].lstrip('+').isdigit() else None
    ne=norm(E)
    if not any(x.startswith(m.group(0)[:70]) or m.group(0).startswith(x) for x in labs):return m.group(0)
    for fn,a,b,amt in applies:
      if amt==ne or amt.replace('+','')==ne:
        h=holderOf(fn,a,b)
        if h:
          changed.append((lab,E,fn,h,L[max(0,m.start()-260):m.start()].replace('\n',' ')));return '${pvQuy('+h+','+E+',"'+lab+'")}'
    return m.group(0)
  # do not rewrite inside an existing ${...} expression's string args: simple guard: skip if line already wires this
  newL=rx.sub(rep,L)
  if changed:
    done+=len(changed);print(f'{f}:{l}',changed)
    files[f][l-1]=newL
  else:skip.append((f,l,labs,[a[:3] for a in applies]))
print('WIRED',done,'lines',len(by)-len(skip),'SKIP lines',len(skip))
if '--skips' in args:
  for s in skip:print('SKIP',s)
if APPLYIT:
  for f,ls in files.items():open('dev/build/'+f,'w',encoding='utf-8').write('\n'.join(ls))
