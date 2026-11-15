# Remove a small leftover forehead mark (huadian echo) from a raw generation: haar face box -> central forehead band ->
# pixels darker than the local skin median -> keep only small compact blobs (never brows/hair) -> cv2 inpaint.
# Writes <in>-ret.png and <in>-ret-cmp.jpg (before | after). Usage: python3 retouch.py RAW.png [thr=15]
import sys,os
import numpy as np,cv2
from PIL import Image
p=sys.argv[1];thr=float(sys.argv[2]) if len(sys.argv)>2 else 15
im=np.array(Image.open(p).convert('RGB'))
casc=cv2.CascadeClassifier(cv2.data.haarcascades+'haarcascade_frontalface_default.xml')
g=cv2.cvtColor(im,cv2.COLOR_RGB2GRAY)[:im.shape[0]//4]
fs=casc.detectMultiScale(g,1.1,5,minSize=(80,80))
x,y,w,h=max(fs,key=lambda f:f[2]*f[3])
x0,x1,y0,y1=x+int(w*.36),x+int(w*.64),y,y+int(h*.36)
pad=24
big=im[y0-pad:y1+pad,x0-pad:x1+pad]
med=cv2.medianBlur(big,31)[pad:-pad,pad:-pad].astype(int)
reg=im[y0:y1,x0:x1].astype(int)
d=(med-reg).sum(-1)
m0=((d>thr)&(med.mean(-1)>150)).astype(np.uint8)
n,lab,st,_=cv2.connectedComponentsWithStats(m0,8)
m=np.zeros(m0.shape,bool)
for i in range(1,n):
    bw,bh,ar=st[i,2],st[i,3],st[i,4]
    touches=st[i,0]==0 or st[i,0]+bw>=m0.shape[1] or st[i,1]+bh>=m0.shape[0]
    if ar<=w*w*0.006 and bw<=w*0.12 and bh<=w*0.16 and not touches:m|=lab==i
mask=np.zeros(im.shape[:2],np.uint8);mask[y0:y1,x0:x1]=m*255
mask=cv2.dilate(mask,np.ones((7,7),np.uint8))
out=cv2.inpaint(im,mask,6,cv2.INPAINT_TELEA)
print(os.path.basename(p),'face',w,'mask px',int(m.sum()))
base=p[:-4];Image.fromarray(out).save(base+'-ret.png')
cy0,cy1,cx0,cx1=max(y-h//4,0),y+h,x,x+w
Image.fromarray(np.hstack([im[cy0:cy1,cx0:cx1],out[cy0:cy1,cx0:cx1]])).save(base+'-ret-cmp.jpg')
