# manual wave-2 rewrites: (file, old, new) — each old must occur exactly once
import sys,os
os.chdir('/home/user/wt/ng')
E=[l for l in open('/home/user/wt/ng-tools/man.txt',encoding='utf-8').read().split('\n####\n') if l.strip()]
bad=0
for e in E:
  f,old,new=e.split('\n@@\n') if '\n@@\n' in e else (None,None,None)
  f=f.strip();p='dev/build/'+f;t=open(p,encoding='utf-8').read();n=t.count(old)
  if new in t:continue
  if n==1:t=t.replace(old,new);open(p,'w',encoding='utf-8').write(t)
  elif t.count(new)>=1 and n==0:pass
  else:print('MISS',f,n,old[:80]);bad+=1
print('entries',len(E),'bad',bad)
