#!/usr/bin/env python3
# usage (in a worktree mid-merge): asmunion.py  -> resolves dev/build/assemble.py module lists = ours + theirs' new modules
import subprocess,re,sys
F='dev/build/assemble.py'
def show(st): return subprocess.run(['git','show',f':{st}:{F}'],capture_output=True,text=True,check=True).stdout
b,o,t=show(1),show(2),show(3)
pat=re.compile(r"for f in \[([^\]]*)\]")
def lists(s): return [re.findall(r"'([^']+)'",m.group(1)) for m in pat.finditer(s)]
B,O,T=lists(b),lists(o),lists(t)
assert len(B)==len(O)==len(T),('list count differs',len(B),len(O),len(T))
# non-list text must be the same in ours and theirs (else stop)
strip=lambda s: pat.sub('for f in []',s)
if strip(o)!=strip(t):
  if strip(b)==strip(o): base_text=t
  elif strip(b)==strip(t): base_text=o
  else: sys.exit('ABORT: non-list text changed on both sides')
else: base_text=o
out=[]
for bl,ol,tl in zip(B,O,T):
  for side,l in (('ours',ol),('theirs',tl)):
    gone=[m for m in bl if m not in l]
    if gone: sys.exit(f'ABORT: {side} drops base modules {gone}')
  res=list(ol)
  for i,m in enumerate(tl):
    if m in res: continue
    j=i-1
    while j>=0 and tl[j] not in res: j-=1
    res.insert(res.index(tl[j])+1 if j>=0 else 0,m)
  out.append(res)
it=iter(out)
txt=pat.sub(lambda m:'for f in ['+', '.join("'"+x+"'" for x in next(it))+']',base_text)
open(F,'w',encoding='utf-8').write(txt)
for bl,r in zip(B,out): print('added:',[m for m in r if m not in bl])
