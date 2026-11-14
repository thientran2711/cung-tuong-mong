# spotfix.py FIG x,y[,r] ... : find the darkest spot within 8px of (x,y) and retouch it with ring-median skin
import sys, numpy as np, cv2
from PIL import Image
f=sys.argv[1]; A=np.array(Image.open(f).convert("RGBA")).astype(float)
g=cv2.cvtColor(A[...,:3].astype(np.uint8),cv2.COLOR_RGB2GRAY).astype(float); bg=cv2.medianBlur(g.astype(np.uint8),11).astype(float); d=bg-g
for s in sys.argv[2:]:
    p=[int(v) for v in s.split(",")]; x,y=p[0],p[1]; r=p[2] if len(p)>2 else 3
    K=int(__import__("os").environ.get("K","2")); W=d[y-K:y+K+1,x-K:x+K+1]; j=np.unravel_index(np.argmax(W),W.shape); y2,x2=y-K+j[0],x-K+j[1]
    print(f, (x,y),"->",(x2,y2),"d=%.0f"%W.max())
    yy,xx=np.mgrid[-3*r:3*r+1,-3*r:3*r+1]; dd=np.hypot(xx,yy); ring=(dd>1.6*r)&(dd<2.6*r)
    P=A[y2-3*r:y2+3*r+1,x2-3*r:x2+3*r+1,:3]; med=np.median(P[ring],axis=0)
    w=np.clip((1.7*r-dd)/(0.7*r),0,1)[...,None]; A[y2-3*r:y2+3*r+1,x2-3*r:x2+3*r+1,:3]=P*(1-w)+med*w
Image.fromarray(A.astype(np.uint8)).save(f,quality=92)
