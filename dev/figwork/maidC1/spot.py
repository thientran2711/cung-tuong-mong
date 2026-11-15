# spot.py PNG x,y[,r] ... : retouch small spots (moles) in place: fill disk radius r (default 6) with ring-median skin, feathered
import sys
from PIL import Image,ImageFilter
import numpy as np
f=sys.argv[1]; im=Image.open(f).convert("RGBA"); A=np.array(im).astype(float)
for s in sys.argv[2:]:
    p=[int(v) for v in s.split(",")]; x,y=p[0],p[1]; r=p[2] if len(p)>2 else 6
    yy,xx=np.mgrid[-3*r:3*r+1,-3*r:3*r+1]; d=np.hypot(xx,yy)
    ring=(d>1.5*r)&(d<2.5*r)
    patch=A[y-3*r:y+3*r+1,x-3*r:x+3*r+1,:3]
    med=np.median(patch[ring],axis=0)
    w=np.clip((1.6*r-d)/(0.6*r),0,1)[...,None]
    A[y-3*r:y+3*r+1,x-3*r:x+3*r+1,:3]=patch*(1-w)+med*w
Image.fromarray(A.astype(np.uint8)).save(f); print("ok",f)
