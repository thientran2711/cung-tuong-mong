# graft.py OLD NEW OUT : keep the approved OLD pixels (small huadian, moles removed) wherever OLD was solid; take NEW only
# where OLD had alpha holes (the bite). NEW is aligned to OLD by phase correlation on the alpha masks (sub-pixel warp).
import sys,io,numpy as np,cv2
from PIL import Image
o=cv2.imread(sys.argv[1],cv2.IMREAD_UNCHANGED).astype(np.float32);n=cv2.imread(sys.argv[2],cv2.IMREAD_UNCHANGED).astype(np.float32)
H,W=o.shape[:2]
if n.shape[:2]!=(H,W):
    c=np.zeros((H,W,4),np.float32);h,w=min(H,n.shape[0]),min(W,n.shape[1]);c[:h,:w]=n[:h,:w];n=c
(dx,dy),r=cv2.phaseCorrelate(n[...,3]/255,o[...,3]/255)
M=np.float32([[1,0,dx],[0,1,dy]]);n=cv2.warpAffine(n,M,(W,H),flags=cv2.INTER_LINEAR,borderValue=0)
print("shift",round(dx,2),round(dy,2),"resp",round(r,3))
ao=o[...,3:]/255;keep=(o[...,3]>=250).astype(np.float32)
keep=cv2.GaussianBlur(cv2.erode(keep,np.ones((3,3),np.uint8)),(5,5),0)[...,None]   # feathered seam inside old solid area
rgb=o[...,:3]*keep+n[...,:3]*(1-keep)
a=np.maximum(o[...,3],n[...,3])*(o[...,3]>=8)+n[...,3]*(o[...,3]<8)   # fill old holes; outer edge from new where old empty
out=np.dstack([rgb,a]).clip(0,255).astype(np.uint8)
im=Image.fromarray(cv2.cvtColor(out,cv2.COLOR_BGRA2RGBA))
for q in (90,86,80,74):
    b=io.BytesIO();im.save(b,"WEBP",quality=q,method=4)
    if b.tell()<=250*1024: break
open(sys.argv[3],"wb").write(b.getvalue());print(sys.argv[3],b.tell()//1024,"KB")
