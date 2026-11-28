#!/usr/bin/env python3
# rh.py <file> <hunk#> <side: ours|theirs> [old new]... : resolve remaining hunk # to side text with exact replacements (each must hit once)
import sys
f,h,side=sys.argv[1],int(sys.argv[2]),sys.argv[3];subs=sys.argv[4:]
L=open(f,encoding='utf-8').read().split('\n');out=[];i=0;k=0
while i<len(L):
  if L[i].startswith('<<<<<<< '):
    k+=1;st=i;o=[];b=[];t=[];i+=1
    while not L[i].startswith('||||||| '):o.append(L[i]);i+=1
    i+=1
    while L[i]!='=======':b.append(L[i]);i+=1
    i+=1
    while not L[i].startswith('>>>>>>> '):t.append(L[i]);i+=1
    if k==h:
      s='\n'.join(o if side=='ours' else t)
      for a,c in zip(subs[::2],subs[1::2]):
        n=s.count(a)
        if n!=1: sys.exit(f'ABORT: «{a[:80]}» hits {n}')
        s=s.replace(a,c)
      out+=s.split('\n');print('resolved',f,'hunk',h)
    else: out+=L[st:i+1]
  else: out.append(L[i])
  i+=1
open(f,'w',encoding='utf-8').write('\n'.join(out))
