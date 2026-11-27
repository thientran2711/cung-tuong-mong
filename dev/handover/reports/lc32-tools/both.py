#!/usr/bin/env python3
# both.py <file>: diff3 hunks whose base is EMPTY (pure additions both sides) -> ours then theirs; any other hunk -> abort
import sys,re
f=sys.argv[1];L=open(f,encoding='utf-8').read().split('\n');out=[];i=0;n=0
while i<len(L):
  if L[i].startswith('<<<<<<< '):
    o=[];b=[];t=[];i+=1
    while not L[i].startswith('||||||| '):o.append(L[i]);i+=1
    i+=1
    while L[i]!='=======':b.append(L[i]);i+=1
    i+=1
    while not L[i].startswith('>>>>>>> '):t.append(L[i]);i+=1
    if b: sys.exit(f'ABORT: hunk with non-empty base in {f}')
    out+=o+t;n+=1
  else: out.append(L[i])
  i+=1
open(f,'w',encoding='utf-8').write('\n'.join(out));print(f,'resolved',n,'hunks (ours+theirs)')
