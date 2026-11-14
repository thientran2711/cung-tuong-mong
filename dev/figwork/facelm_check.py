# plausibility check of face-lm.json + a contact sheet of random faces with landmarks drawn
import json,random,sys
from PIL import Image,ImageDraw
I='/home/user/cung-tuong-mong/.claude/worktrees/agent-ab59c028f1af9c7fb/img/'
K=["mL","mR","uL","lL","bLi","bLm","bLo","bRi","bRm","bRo","eLo","eLi","eLt","eLb","eRo","eRi","eRt","eRb","fL","fR","fh","chin","nose","mUL","mUR","mLL","mLR"]
J=json.load(open('face-lm.json'));vf=json.load(open(I+'veil-fit.json'))
def P(n):a=J[n];return {k:(a[2*i],a[2*i+1]) for i,k in enumerate(K)}
bad=[]
for n in J:
  p=P(n);W,H=(352,900) if n.startswith('fig') else (384,506)
  px=lambda k:(p[k][0]*W/100,p[k][1]*H/100)
  ey=(px('eLb')[1]+px('eRb')[1])/2;my=(px('mL')[1]+px('mR')[1])/2;ny=px('nose')[1];cy=px('chin')[1]
  F=abs(px('fR')[0]-px('fL')[0])
  ok=ey<ny<my<cy and F>(40 if n.startswith('fig') else 70)
  if n in vf:  # mouth must fall inside the veil-fit face box
    r=vf[n];mx=(p['mL'][0]+p['mR'][0])/2;myp=(p['mL'][1]+p['mR'][1])/2
    ok=ok and r[0]-3<mx<r[0]+r[2]+3 and r[1]<myp<r[1]+r[3]+3
  if not ok:bad.append(n)
print('total',len(J),'implausible',len(bad),bad[:30])
random.seed(int(sys.argv[1]) if len(sys.argv)>1 else 1)
S=random.sample(sorted(J),24)+bad[:8];T=[]
for n in S:
  im=Image.open(I+n).convert('RGB');W,H=im.size;p=P(n);d=ImageDraw.Draw(im)
  xs=[p[k][0]*W/100 for k in K];ys=[p[k][1]*H/100 for k in K]
  for x,y in zip(xs,ys):d.ellipse((x-1,y-1,x+1,y+1),fill='red')
  cx,cy=sum(xs)/len(xs),sum(ys)/len(ys);r=max(max(xs)-min(xs),max(ys)-min(ys))*.75
  T.append(im.crop((int(cx-r),int(cy-r),int(cx+r),int(cy+r))).resize((160,160)))
s=Image.new('RGB',(160*8,160*((len(T)+7)//8)),'white')
for i,t in enumerate(T):s.paste(t,((i%8)*160,(i//8)*160))
s.save('lmcheck.jpg',quality=88)
