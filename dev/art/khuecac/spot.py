# Manual spot fix: python3 spot.py IMG.png U V [R]  where U,V = position in the LEFT panel of IMG-ret-cmp.jpg (retouch.py
# face crop, before resizing). Inpaints a disc of radius R (default 7 px) on IMG-ret.png (or IMG.png) and rewrites -ret + -cmp.
import sys,os
import numpy as np,cv2
from PIL import Image
p=sys.argv[1];u,v=int(sys.argv[2]),int(sys.argv[3]);R=int(sys.argv[4]) if len(sys.argv)>4 else 7
base=p[:-4];src=base+'-ret.png' if os.path.exists(base+'-ret.png') else p
S=Image.open(src);A=S.getchannel('A') if S.mode=='RGBA' else None
im=np.array(S.convert('RGB'));orig=np.array(Image.open(p).convert('RGB'))
casc=cv2.CascadeClassifier(cv2.data.haarcascades+'haarcascade_frontalface_default.xml')
g=cv2.cvtColor(orig,cv2.COLOR_RGB2GRAY)[:orig.shape[0]//4]
x,y,w,h=max(casc.detectMultiScale(g,1.1,5,minSize=(80,80)),key=lambda f:f[2]*f[3])
cy0=max(y-h//4,0);X,Y=x+u,cy0+v
mask=np.zeros(im.shape[:2],np.uint8);cv2.circle(mask,(X,Y),R,255,-1)
out=cv2.inpaint(im,mask,6,cv2.INPAINT_TELEA)
O=Image.fromarray(out)
if A is not None:O.putalpha(A)
O.save(base+'-ret.png')
Image.fromarray(np.hstack([orig[cy0:y+h,x:x+w],out[cy0:y+h,x:x+w]])).save(base+'-ret-cmp.jpg')
print('spot',X,Y,R)
