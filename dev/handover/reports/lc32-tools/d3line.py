#!/usr/bin/env python3
# d3line.py <file>...: diff3 hunks where ours/base/theirs have the same line count: each line takes the side that changed it from base
# (both changed the same line differently -> hunk left as is). Prints what is left.
import sys
for f in sys.argv[1:]:
  L=open(f,encoding='utf-8').read().split('\n');out=[];i=0;done=left=0
  while i<len(L):
    if L[i].startswith('<<<<<<< '):
      st=i;o=[];b=[];t=[];i+=1
      while not L[i].startswith('||||||| '):o.append(L[i]);i+=1
      i+=1
      while L[i]!='=======':b.append(L[i]);i+=1
      i+=1
      while not L[i].startswith('>>>>>>> '):t.append(L[i]);i+=1
      res=None
      if len(o)==len(b)==len(t):
        res=[]
        for x,y,z in zip(o,b,t):
          if x==z or z==y: res.append(x)
          elif x==y: res.append(z)
          else: res=None;break
      if res is None: out+=L[st:i+1];left+=1
      else: out+=res;done+=1
    else: out.append(L[i])
    i+=1
  open(f,'w',encoding='utf-8').write('\n'.join(out));print(f,'resolved',done,'left',left)
