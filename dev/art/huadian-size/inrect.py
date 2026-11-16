# inrect.py: inpaint explicit rectangles (x0,y0,x1,y1 px) in a webp. usage: inrect.py FILE x0,y0,x1,y1 [x0,y0,x1,y1 ...]
import sys,numpy as np,cv2
from PIL import Image
p=sys.argv[1]; im=Image.open(p).convert('RGBA'); a=np.asarray(im).copy(); rgb=np.ascontiguousarray(a[...,:3]); m=np.zeros(rgb.shape[:2],np.uint8)
for r in sys.argv[2:]:
    x0,y0,x1,y1=map(int,r.split(',')); m[y0:y1,x0:x1]=1
out=cv2.inpaint(rgb,m,4,cv2.INPAINT_TELEA); a[...,:3]=np.where(m[...,None]>0,out,rgb); Image.fromarray(a,'RGBA').save(p,'WEBP',quality=90,method=4)
