import sys,json
sys.path.insert(0,'/home/user/wt/huadian3/dev/art/huadian-size')
import numpy as np,cv2
from PIL import Image
from shrink2 import analyze,layer
R=json.load(open('/home/user/wt/huadian3/dev/art/huadian-size/ref.json'))['consort-c20']; fw=R[2]
im=np.asarray(Image.open('hand/por-consort-c20-t3-a36.webp').convert('RGBA')).astype(np.float32)
an=analyze(im[...,:3].astype(np.uint8),(172,158,200,186),fw,inner=None)
import os
print(an['width'] if an else None)
import cv2 as c
a,P,bb,rm=layer(an); x0,y0,x1,y1=bb; print(bb)
# crop patch
pa=a[y0-2:y1+2,x0-2:x1+2]; pP=P[y0-2:y1+2,x0-2:x1+2]
s=float(sys.argv[3]) if len(sys.argv)>3 else 0.9
tgt=np.asarray(Image.open('hand/por-consort-c20-t3-a51.webp').convert('RGBA')).astype(np.float32)
cx,cy=float(sys.argv[1]),float(sys.argv[2])
h,w=pa.shape; M=np.float32([[s,0,cx-s*w/2],[0,s,cy-s*h/2]]); H,W=tgt.shape[:2]
aw=cv2.warpAffine(pa,M,(W,H),flags=cv2.INTER_AREA); Pw=cv2.warpAffine(pP,M,(W,H),flags=cv2.INTER_AREA)
# boost a bit so the faint mark is legible like its a36 sibling
out=tgt.copy(); out[...,:3]=tgt[...,:3]*(1-aw[...,None])+Pw
Image.fromarray(np.clip(out,0,255).astype(np.uint8),'RGBA').save('hfix/por-consort-c20-t3-a51.webp','WEBP',quality=93,method=4)
