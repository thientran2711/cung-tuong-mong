# Remove small leftover dots (huadian echo on the forehead, mole-like specks on the cheeks) from a generation:
# haar face box -> zones (central forehead band; outer cheeks below the eyes, away from nose/mouth) ->
# pixels darker than the local skin median -> keep only small compact blobs not touching the zone edge (never brows,
# eyes, hair, nostrils) -> cv2 inpaint. Alpha kept. Writes <in>-ret.png and <in>-ret-cmp.jpg (before | after).
# Usage: python3 retouch.py IMG.png [thr=15]
import sys,os
import numpy as np,cv2
from PIL import Image
p=sys.argv[1];thr=float(sys.argv[2]) if len(sys.argv)>2 else 15
src=Image.open(p);A=src.getchannel('A') if src.mode=='RGBA' else None
im=np.array(src.convert('RGB'))
casc=cv2.CascadeClassifier(cv2.data.haarcascades+'haarcascade_frontalface_default.xml')
g=cv2.cvtColor(im,cv2.COLOR_RGB2GRAY)[:im.shape[0]//4]
fs=casc.detectMultiScale(g,1.1,5,minSize=(80,80))
x,y,w,h=max(fs,key=lambda f:f[2]*f[3])
ZONES=[(x+int(w*.36),x+int(w*.64),y,y+int(h*.36),0.006),          # forehead centre
       (x+int(w*.08),x+int(w*.34),y+int(h*.56),y+int(h*.84),0.002),  # left cheek
       (x+int(w*.66),x+int(w*.92),y+int(h*.56),y+int(h*.84),0.002)]  # right cheek
mask=np.zeros(im.shape[:2],np.uint8);tot=0;pad=24
for x0,x1,y0,y1,amax in ZONES:
    big=im[max(y0-pad,0):y1+pad,max(x0-pad,0):x1+pad]
    oy,ox=y0-max(y0-pad,0),x0-max(x0-pad,0)
    med=cv2.medianBlur(big,31)[oy:oy+(y1-y0),ox:ox+(x1-x0)].astype(int)
    reg=im[y0:y1,x0:x1].astype(int)
    d=(med-reg).sum(-1)
    m0=((d>thr)&(med.mean(-1)>150)).astype(np.uint8)
    n,lab,st,_=cv2.connectedComponentsWithStats(m0,8)
    m=np.zeros(m0.shape,bool)
    for i in range(1,n):
        bw,bh,ar=st[i,2],st[i,3],st[i,4]
        touches=st[i,0]==0 or st[i,1]==0 or st[i,0]+bw>=m0.shape[1] or st[i,1]+bh>=m0.shape[0]
        if ar<=w*w*amax and bw<=w*0.12 and bh<=w*0.16 and not touches:m|=lab==i
    mask[y0:y1,x0:x1]|=(m*255).astype(np.uint8);tot+=int(m.sum())
mask=cv2.dilate(mask,np.ones((7,7),np.uint8))
out=cv2.inpaint(im,mask,6,cv2.INPAINT_TELEA)
print(os.path.basename(p),'face',w,'mask px',tot)
base=p[:-4];O=Image.fromarray(out)
if A is not None:O.putalpha(A)
O.save(base+'-ret.png')
cy0,cy1,cx0,cx1=max(y-h//4,0),y+h,x,x+w
Image.fromarray(np.hstack([im[cy0:cy1,cx0:cx1],out[cy0:cy1,cx0:cx1]])).save(base+'-ret-cmp.jpg')
