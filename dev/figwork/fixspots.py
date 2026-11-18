# fixspots.py fig.webp x,y[,r] ... : snap each point to the darkest small blob within 6px, inpaint it (in place)
import sys,io
import numpy as np,cv2
from PIL import Image
f=sys.argv[1]; im=Image.open(f).convert('RGBA'); A=np.array(im)
bgr=cv2.cvtColor(A[...,:3],cv2.COLOR_RGB2BGR); g=cv2.cvtColor(bgr,cv2.COLOR_BGR2GRAY).astype(int)
med=cv2.medianBlur(g.astype(np.uint8),15).astype(int)
mask=np.zeros(g.shape,np.uint8); log=[]
for p in sys.argv[2:]:
    v=list(map(int,p.split(','))); x,y=v[0],v[1]; R=v[2] if len(v)>2 else 6
    win=g[y-R:y+R+1,x-R:x+R+1]; yy,xx=np.unravel_index(win.argmin(),win.shape); X,Y=x-R+xx,y-R+yy
    d=(med-g)[Y-6:Y+7,X-6:X+7]; thr=max(8,0.35*d[6,6])
    blob=(d>thr).astype(np.uint8); n,lab,st,_=cv2.connectedComponentsWithStats(blob,8); l=lab[6,6]
    m=(lab==l).astype(np.uint8) if l else np.zeros_like(blob)
    m=cv2.dilate(m,np.ones((3,3),np.uint8),iterations=2)
    mask[Y-6:Y+7,X-6:X+7]|=m; log.append((X,Y,int(d[6,6]),int(m.sum())))
out=cv2.inpaint(bgr,mask,5,cv2.INPAINT_TELEA)
O=Image.fromarray(np.dstack([cv2.cvtColor(out,cv2.COLOR_BGR2RGB),A[...,3]]))
for q in (86,80,74,68,60):
    b=io.BytesIO(); O.save(b,'WEBP',quality=q,method=4)
    if b.tell()<=250*1024: break
open(f,'wb').write(b.getvalue()); print(f,log)
