#!/usr/bin/env python3
# charmerge.py <file>: each diff3 hunk merged CHARACTER by character (git merge-file on one char per line); any char clash -> hunk left
import sys,subprocess,tempfile,os
f=sys.argv[1];L=open(f,encoding='utf-8').read().split('\n');out=[];i=0;ok=bad=0
def w(s):
  fd,p=tempfile.mkstemp();os.write(fd,('\n'.join(s.replace('\n','\x01'))+'\n').encode());os.close(fd);return p
while i<len(L):
  if L[i].startswith('<<<<<<< '):
    st=i;o=[];b=[];t=[];i+=1
    while not L[i].startswith('||||||| '):o.append(L[i]);i+=1
    i+=1
    while L[i]!='=======':b.append(L[i]);i+=1
    i+=1
    while not L[i].startswith('>>>>>>> '):t.append(L[i]);i+=1
    po,pb,pt=w('\n'.join(o)),w('\n'.join(b)),w('\n'.join(t))
    r=subprocess.run(['git','merge-file','-p',po,pb,pt],capture_output=True)
    for p in (po,pb,pt):os.unlink(p)
    if r.returncode==0:
      s=r.stdout.decode().split('\n')[:-1];out+=''.join(s).replace('\x01','\n').split('\n');ok+=1
    else: out+=L[st:i+1];bad+=1
  else: out.append(L[i])
  i+=1
open(f,'w',encoding='utf-8').write('\n'.join(out));print(f,'merged',ok,'left',bad)
