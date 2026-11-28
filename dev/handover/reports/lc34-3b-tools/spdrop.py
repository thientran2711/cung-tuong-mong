#!/usr/bin/env python3
# spdrop.py <file>...: hunks whose ONLY theirs change is spSee pacing of a shown number (wrap / balSg->spSee / "+" sign) and where ours
# turned that number into a pv* call (which now paces inside, jaudit aaSee) -> ours. Prints each.
import sys,re,difflib
TOK=re.compile(r'\w+|\s+|.',re.S)
OKR=re.compile(r'^(spSee\("\w+",|\)|\+|"\w+",|spSee|\+\$\{spSee\("\w+",|\$\{spSee\("\w+",)$')
for f in sys.argv[1:]:
  L=open(f,encoding='utf-8').read().split('\n');out=[];i=0;n=0
  while i<len(L):
    if L[i].startswith('<<<<<<< '):
      st=i;o=[];b=[];t=[];i+=1
      while not L[i].startswith('||||||| '):o.append(L[i]);i+=1
      i+=1
      while L[i]!='=======':b.append(L[i]);i+=1
      i+=1
      while not L[i].startswith('>>>>>>> '):t.append(L[i]);i+=1
      B=TOK.findall('\n'.join(b));T=TOK.findall('\n'.join(t))
      ops=[x for x in difflib.SequenceMatcher(None,B,T,autojunk=False).get_opcodes() if x[0]!='equal']
      good=all(OKR.match(''.join(T[j1:j2])) and ''.join(B[i1:i2]) in ('','balSg') for _,i1,i2,j1,j2 in ops)
      if good and re.search(r'pv(Quy|Oan)\(','\n'.join(o)): out+=o;n+=1;print(f,'L',st+1,'-> ours (spSee drop)')
      else: out+=L[st:i+1]
    else: out.append(L[i])
    i+=1
  open(f,'w',encoding='utf-8').write('\n'.join(out))
