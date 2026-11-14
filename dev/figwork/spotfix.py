# spotfix.py fig.webp out.webp [th=22] [spot=x,y ...] : inpaint small dark compact spots on the face of a 900px figure (face via porcrop)
import sys,io
sys.path.insert(0,'/home/user/cung-tuong-mong/dev/figwork')
import numpy as np,cv2
from PIL import Image
import porcrop
src,dst=sys.argv[1],sys.argv[2]
TH=int(next((x[3:] for x in sys.argv if x.startswith('th=')),'22'))
im=Image.open(src).convert('RGBA'); cx,ey,fw,how=porcrop.find_face(im)
A=np.array(im); bgr=cv2.cvtColor(A[...,:3],cv2.COLOR_RGB2BGR); a=A[...,3]
L=cv2.cvtColor(bgr,cv2.COLOR_BGR2GRAY).astype(int)
med=cv2.medianBlur(L.astype(np.uint8),9).astype(int)
x0,x1=int(cx-fw*0.62),int(cx+fw*0.62); y0,y1=int(ey-fw*0.75),int(ey+fw*0.95)
cand=np.zeros_like(L,bool); cand[y0:y1,x0:x1]=((med-L)>TH)[y0:y1,x0:x1]; cand&=a>200
n,lab,st,_=cv2.connectedComponentsWithStats(cand.astype(np.uint8),8)
mask=np.zeros(L.shape,np.uint8); hits=[]
R,G,B=A[...,0].astype(int),A[...,1].astype(int),A[...,2].astype(int)
for i in range(1,n):
    x,y,w,h,ar=st[i]
    if ar<2 or ar>40 or max(w,h)>8 or max(w,h)>2*min(w,h)+1: continue
    r=4; ya,yb,xa,xb=max(0,y-r),y+h+r,max(0,x-r),x+w+r
    blob=lab[ya:yb,xa:xb]==i; ring=~cv2.dilate(blob.astype(np.uint8),np.ones((5,5),np.uint8)).astype(bool)
    rr,gg,bb,ll=R[ya:yb,xa:xb][ring],G[ya:yb,xa:xb][ring],B[ya:yb,xa:xb][ring],L[ya:yb,xa:xb][ring]
    if ((rr>150)&(rr>bb+5)).mean()<0.9 or ll.std()>12: continue
    hits.append((x,y,w,h)); mask[ya:yb,xa:xb]|=cv2.dilate(blob.astype(np.uint8),np.ones((3,3),np.uint8))
for arg in sys.argv:
    if arg.startswith('spot='):
        x,y,*rr=map(int,arg[5:].split(',')); cv2.circle(mask,(x,y),rr[0] if rr else 4,1,-1); hits.append(('m',x,y))
out=cv2.inpaint(bgr,mask,4,cv2.INPAINT_TELEA)
O=np.dstack([cv2.cvtColor(out,cv2.COLOR_BGR2RGB),a])
o=Image.fromarray(O)
for q in (86,80,74,68,60):
    b=io.BytesIO(); o.save(b,'WEBP',quality=q,method=6)
    if b.tell()<=250*1024: break
open(dst,'wb').write(b.getvalue())
print(src.split('/')[-1],how,'face',int(cx),int(ey),int(fw),'hits',hits)
