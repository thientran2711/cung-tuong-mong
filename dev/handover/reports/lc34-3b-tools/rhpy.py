# helper: get hunk k (1-based among remaining) of file -> (o,b,t) lists; put(file,k,lines)
def get(f,h):
  L=open(f,encoding='utf-8').read().split('\n');i=0;k=0
  while i<len(L):
    if L[i].startswith('<<<<<<< '):
      k+=1;st=i;o=[];b=[];t=[];i+=1
      while not L[i].startswith('||||||| '):o.append(L[i]);i+=1
      i+=1
      while L[i]!='=======':b.append(L[i]);i+=1
      i+=1
      while not L[i].startswith('>>>>>>> '):t.append(L[i]);i+=1
      if k==h: return o,b,t,(st,i)
    i+=1
def put(f,h,lines):
  L=open(f,encoding='utf-8').read().split('\n');o,b,t,(st,en)=get(f,h);L[st:en+1]=lines
  open(f,'w',encoding='utf-8').write('\n'.join(L));print('resolved',f,h)
def rep(s,a,c):
  assert s.count(a)==1,(s.count(a),a[:80]);return s.replace(a,c)
