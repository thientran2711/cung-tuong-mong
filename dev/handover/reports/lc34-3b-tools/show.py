#!/usr/bin/env python3
# show.py <file>: for each diff3 hunk, line-aligned (if possible): token-level edits base->ours (O) and base->theirs (T)
import sys,re,difflib
TOK=re.compile(r'\w+|\s+|.',re.S)
def edits(b,x):
  B=TOK.findall(b);X=TOK.findall(x);sm=difflib.SequenceMatcher(None,B,X,autojunk=False);r=[]
  for op,i1,i2,j1,j2 in sm.get_opcodes():
    if op!='equal':
      ctx=''.join(B[max(0,i1-4):i1])
      r.append(f"   @{len(''.join(B[:i1]))} [{ctx}] «{''.join(B[i1:i2])}» -> «{''.join(X[j1:j2])}»")
  return r
f=sys.argv[1];L=open(f,encoding='utf-8').read().split('\n');i=0;h=0
while i<len(L):
  if L[i].startswith('<<<<<<< '):
    h+=1;st=i;o=[];b=[];t=[];i+=1
    while not L[i].startswith('||||||| '):o.append(L[i]);i+=1
    i+=1
    while L[i]!='=======':b.append(L[i]);i+=1
    i+=1
    while not L[i].startswith('>>>>>>> '):t.append(L[i]);i+=1
    print(f"== {f} hunk {h} (file line {st+1}) o/b/t lines {len(o)}/{len(b)}/{len(t)}")
    if len(o)==len(b)==len(t):
      for k,(x,y,z) in enumerate(zip(o,b,t)):
        if x==y==z: continue
        print(f" line {k}:")
        for e in edits(y,x): print("  O"+e)
        for e in edits(y,z): print("  T"+e)
    else:
      print(" O:"+"\n O:".join(l[:300] for l in o));print(" B:"+"\n B:".join(l[:300] for l in b));print(" T:"+"\n T:".join(l[:300] for l in t))
  i+=1
