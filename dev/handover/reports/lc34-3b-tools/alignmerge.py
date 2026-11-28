#!/usr/bin/env python3
# alignmerge.py <file>...: each diff3 hunk = OURS + every base->theirs token edit (or spSee wrap pair) re-applied where ours left that
# exact window (between the nearest tokens both keep) untouched. A wrap whose window ours rewrote into a pv*(…) call is dropped
# (pv* helpers pace internally = one rule); anything else -> hunk left with markers.
import sys,re,difflib
TOK=re.compile(r'\w+|\s+|.',re.S)
WRAP=re.compile(r'^spSee\("(\w+)",$')
PV=re.compile(r'pv(Quy|Oan|Rel|OanSet|QuyAny|OanAny)\(')
def merge(b,o,t,log):
  B=TOK.findall(b);O=TOK.findall(o);T=TOK.findall(t)
  mp={}
  for blk in difflib.SequenceMatcher(None,B,O,autojunk=False).get_matching_blocks():
    for d in range(blk.size): mp[blk.a+d]=blk.b+d
  ops=[x for x in difflib.SequenceMatcher(None,B,T,autojunk=False).get_opcodes() if x[0]!='equal']
  # pair wraps into one edit: (i1,i3, theirs text for base[i1:i3])
  E=[];k=0
  while k<len(ops):
    op,i1,i2,j1,j2=ops[k];R=''.join(T[j1:j2])
    if op=='insert' and WRAP.match(R) and k+1<len(ops) and ops[k+1][0]=='insert' and ''.join(T[ops[k+1][3]:ops[k+1][4]])==')':
      i3=ops[k+1][1];E.append(('wrap',i1,i3,R+''.join(B[i1:i3])+')',WRAP.match(R).group(1)));k+=2
    else: E.append((op,i1,i2,R,None));k+=1
  repl=[];ok=True
  for kind,i1,i2,R,wk in E:
    l=i1-1
    while l>=0 and l not in mp: l-=1
    r=i2
    while r<len(B) and r not in mp: r+=1
    ol=mp[l] if l>=0 else -1; orr=mp[r] if r<len(B) else len(O)
    if ''.join(O[ol+1:orr])==''.join(B[l+1:r]) and (l==i1-1 or True):
      # ours window unchanged: map edit
      a=ol+1+(i1-(l+1)); bb=a+(i2-i1)
      repl.append((a,bb,R));log.append(f'{kind} «{"".join(B[i1:i2])[:50]}»->«{R[:50]}» ok')
    else:
      win=''.join(O[max(0,ol-12):orr+3])
      if kind=='wrap' and PV.search(win):
        log.append(f'wrap {wk} «{"".join(B[i1:i2])}» dropped (ours pv*: {win[-90:]})')
      else:
        ok=False;log.append(f'FAIL {kind} «{"".join(B[i1:i2])[:70]}»->«{R[:90]}» ours-window «{"".join(O[ol+1:orr])[:90]}»')
  repl.sort()
  for x,y in zip(repl,repl[1:]):
    if x[1]>y[0]: ok=False;log.append('FAIL overlapping edits')
  for a,bb,R in reversed(repl): O[a:bb]=[R]
  return ''.join(O),ok
for f in sys.argv[1:]:
  L=open(f,encoding='utf-8').read().split('\n');out=[];i=0;h=0;done=left=0
  while i<len(L):
    if L[i].startswith('<<<<<<< '):
      h+=1;st=i;o=[];b=[];t=[];i+=1
      while not L[i].startswith('||||||| '):o.append(L[i]);i+=1
      i+=1
      while L[i]!='=======':b.append(L[i]);i+=1
      i+=1
      while not L[i].startswith('>>>>>>> '):t.append(L[i]);i+=1
      log=[];r,ok=merge('\n'.join(b),'\n'.join(o),'\n'.join(t),log)
      print(f'== {f} h{h} L{st+1} {"OK" if ok else "LEFT"}');[print('   '+x) for x in log]
      if ok: out+=r.split('\n');done+=1
      else: out+=L[st:i+1];left+=1
    else: out.append(L[i])
    i+=1
  open(f,'w',encoding='utf-8').write('\n'.join(out));print(f,'resolved',done,'left',left)
