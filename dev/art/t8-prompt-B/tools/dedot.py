# dedot.py in.png out.png x0 y0 x1 y1 : find the reddest small blob in box, replace with surrounding skin (feathered)
import sys; from PIL import Image, ImageFilter, ImageDraw
import numpy as np
src,dst=sys.argv[1:3]; x0,y0,x1,y1=map(int,sys.argv[3:7])
im=Image.open(src).convert("RGBA"); a=np.asarray(im).astype(float)
b=a[y0:y1,x0:x1,:3]; red=b[:,:,0]-(b[:,:,1]+b[:,:,2])/2
yy,xx=np.unravel_index(np.argmax(red),red.shape); cx,cy=x0+xx,y0+yy
sub=red[max(yy-15,0):yy+15,max(xx-15,0):xx+15]; ys,xs=np.nonzero(sub>red.max()*0.5); r=int(sys.argv[7]) if len(sys.argv)>7 else int(max(np.ptp(ys),np.ptp(xs))/2)+5
print("dot at",cx,cy,"r",r,"redness",red.max())
R=r*3; ring=a[cy-R:cy+R,cx-R:cx+R,:3]; yy,xx=np.mgrid[-R:R,-R:R]; d=np.hypot(yy,xx)
skin=np.median(ring[(d>r*1.6)&(d<R)],0)
blur=Image.fromarray(a[:,:,:3].astype('uint8')).filter(ImageFilter.GaussianBlur(r*1.5)); bl=np.asarray(blur).astype(float)
w=np.clip((r*1.5-d)/(r*0.7),0,1)[...,None]
patch=0.5*skin+0.5*bl[cy-R:cy+R,cx-R:cx+R]
a[cy-R:cy+R,cx-R:cx+R,:3]=a[cy-R:cy+R,cx-R:cx+R,:3]*(1-w)+patch*w
Image.fromarray(a.astype('uint8'),"RGBA").save(dst)
Image.fromarray(a.astype('uint8'),"RGBA").crop((cx-120,cy-90,cx+120,cy+150)).save(dst+".chk.png")
