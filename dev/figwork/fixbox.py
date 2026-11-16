# fixbox.py fig.webp x0,y0,x1,y1 [th] : inpaint faint darker marks inside a forehead box (in place)
import sys,io
import numpy as np,cv2
from PIL import Image
f=sys.argv[1]; x0,y0,x1,y1=map(int,sys.argv[2].split(',')); th=int(sys.argv[3]) if len(sys.argv)>3 else 6
im=Image.open(f).convert('RGBA'); A=np.array(im)
bgr=cv2.cvtColor(A[...,:3],cv2.COLOR_RGB2BGR); g=cv2.cvtColor(bgr,cv2.COLOR_BGR2GRAY).astype(int)
med=cv2.medianBlur(g.astype(np.uint8),31).astype(int)
hsv=cv2.cvtColor(bgr,cv2.COLOR_BGR2HSV)
m=np.zeros(g.shape,np.uint8)
sub=(np.abs(med-g)>th)[y0:y1,x0:x1]
m[y0:y1,x0:x1]=sub
m=cv2.dilate(m,np.ones((3,3),np.uint8),iterations=1)
out=cv2.inpaint(bgr,m,4,cv2.INPAINT_TELEA)
# soften inside the box
blur=cv2.GaussianBlur(out,(0,0),1.2); out[y0:y1,x0:x1]=blur[y0:y1,x0:x1]
O=Image.fromarray(np.dstack([cv2.cvtColor(out,cv2.COLOR_BGR2RGB),A[...,3]]))
b=io.BytesIO(); O.save(b,'WEBP',quality=86,method=4); open(f,'wb').write(b.getvalue()); print(f,int(m.sum()))
