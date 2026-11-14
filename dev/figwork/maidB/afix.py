# afix.py [--out DIR] fig.webp... : make the inside of the silhouette opaque (garments the cutter left half-transparent)
#   alpha -> 255 where alpha>LO and the pixel lies >= R px inside the (alpha>LO) silhouette; rim and true gaps untouched.
import sys, os, io, argparse
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
def save_webp(im,path,maxkb=250):
    for q in (86,80,74,68,60,52):
        b=io.BytesIO(); im.save(b,"WEBP",quality=q,method=4,exact=True)
        if b.tell()<=maxkb*1024: break
    open(path,"wb").write(b.getvalue())
def fix(im, LO=40, R=3.0):
    A=np.array(im.convert("RGBA")); a=A[...,3].astype(np.float32)
    m=a>LO
    m=ndi.binary_opening(m,iterations=1)
    d=ndi.distance_transform_edt(m)
    inner=m&(d>=R)
    # soft ramp over the rim so the edge stays anti-aliased
    ramp=np.clip((d-1)/(R-1),0,1)
    na=np.where(m, np.maximum(a, 255*ramp), a)
    na[inner]=255
    A[...,3]=na.astype(np.uint8)
    return Image.fromarray(A), int((na-a>40).sum())
if __name__=="__main__":
    ap=argparse.ArgumentParser(); ap.add_argument("files",nargs="+"); ap.add_argument("--out"); ap.add_argument("--lo",type=float,default=40)
    o=ap.parse_args()
    for f in o.files:
        im=Image.open(f); new,n=fix(im,o.lo)
        out=os.path.join(o.out,os.path.basename(f)) if o.out else f
        save_webp(new,out); print(n,out)
