import random
G=[(1,.2),(2,.4),(3,.4)]
def g0():
  r=random.random();a=0
  for g,p in G:
    a+=p
    if r<a:return g
  return 3
mode={'self':lambda g:max(1,round(g*.6+1e-9)) if g!=2 else 1,'teacher':lambda g:max(g,max(1,round(g*.6+1e-9))+1),'th':lambda g:g}
def old(m,N=4000):
  res=[0]*6
  for _ in range(N):
    l=0;p=0;n=0
    while l<5:
      n+=1;p+=mode[m](g0())
      while l<5 and p>=l+2:p-=l+2;l+=1;res[l]+=n
  return [round(x/N,1) for x in res[1:]]
T=[0,10,25,45,70,100];GA=[1.2,1,.8,.6,.4]
def new(m,N=4000):
  res=[0]*6
  for _ in range(N):
    l=0;p=0.0;n=0
    while l<5:
      n+=1;left=mode[m](g0())
      while left>1e-9 and l<5:
        room=T[l+1]-T[l]-p;give=left*GA[l]
        if give<room:p+=give;left=0
        else:left-=room/GA[l];p=0;l+=1;res[l]+=n
  return [round(x/N,1) for x in res[1:]]
for m in mode:print(m,'old lessons to bậc1..5',old(m),'| new',new(m))
