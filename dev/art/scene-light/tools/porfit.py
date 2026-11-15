# porfit.py CUT.png OLDFIG OLDPOR OUTPOR : find old por's box inside old fig (multiscale template match on a parchment composite),
# then cut the same box from the new full-res cutout (aligned to the new fig = cut scaled to old fig height) at old por size.
import sys,io,numpy as np,cv2
from PIL import Image
cut,of,op,out=sys.argv[1:5]
def comp(im):
    a=np.asarray(im.convert("RGBA")).astype(np.float32);al=a[...,3:]/255
    return (a[...,:3]*al+np.array([230,213,195])*(1-al)).astype(np.uint8)
F=Image.open(of);P=Image.open(op);C=Image.open(cut).convert("RGBA")
bb=C.split()[3].point(lambda x:255 if x>12 else 0).getbbox();C=C.crop(bb)
f=cv2.cvtColor(comp(F),cv2.COLOR_RGB2GRAY);pw,ph=P.size;best=None
for s in np.arange(0.30,1.60,0.005):
    w,h=int(pw*s),int(ph*s)
    if w<10 or h<10: continue
    t=cv2.cvtColor(comp(P.resize((w,h),Image.LANCZOS)),cv2.COLOR_RGB2GRAY)
    fp=cv2.copyMakeBorder(f,h,h,w,w,cv2.BORDER_CONSTANT,value=int(np.median(f[:5])))
    r=cv2.matchTemplate(fp,t,cv2.TM_CCOEFF_NORMED);_,mv,_,ml=cv2.minMaxLoc(r)
    if best is None or mv>best[0]: best=(mv,s,ml[0]-w,ml[1]-h)
mv,s,x,y=best;print("match",round(mv,3),"scale",round(s,3),"box",x,y,int(pw*s),int(ph*s))
k=C.height/F.height   # new cut pixels per old-fig pixel (new fig = cut scaled to old height)
box=(round(x*k),round(y*k),round((x+pw*s)*k),round((y+ph*s)*k))
canvas=Image.new("RGBA",(box[2]-box[0],box[3]-box[1]),(0,0,0,0));canvas.paste(C.crop((max(0,box[0]),max(0,box[1]),min(C.width,box[2]),min(C.height,box[3]))),(max(0,-box[0]),max(0,-box[1])))
por=canvas.resize((pw,ph),Image.LANCZOS)
for q in (86,80,74,68,60):
    b=io.BytesIO();por.save(b,"WEBP",quality=q,method=4)
    if b.tell()<=80*1024: break
open(out,"wb").write(b.getvalue());print(out,por.size,b.tell()//1024,"KB")
