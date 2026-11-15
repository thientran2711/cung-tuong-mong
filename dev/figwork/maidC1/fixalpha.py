# fixalpha.py fig.webp... : solidify semi-transparent sheer fabric inside the silhouette (from consort-art fixalpha.py; por is re-cut by porcrop.py afterwards)
import sys,io,numpy as np
from PIL import Image
from scipy import ndimage as nd
PARCH=np.array([240,232,218],float)
def save_webp(im,path,maxkb=250):
    for q in (86,80,74,68,60,52):
        b=io.BytesIO(); im.save(b,"WEBP",quality=q,method=4)
        if b.tell()<=maxkb*1024: break
    open(path,"wb").write(b.getvalue())
for p in sys.argv[1:]:
    a=np.asarray(Image.open(p).convert("RGBA")).astype(float); al=a[...,3]; m=al>40
    m=nd.binary_closing(m,iterations=4); fill=nd.binary_fill_holes(m); inner=nd.binary_erosion(fill,iterations=3)
    part=inner&(al>40)&(al<250); k=(al[...,None]/255.0); rgb=a[...,:3]*k+PARCH*(1-k)
    a[...,:3]=np.where(part[...,None],rgb,a[...,:3]); a[...,3]=np.where(part,255,al)
    save_webp(Image.fromarray(a.clip(0,255).astype(np.uint8),"RGBA"),p); print("fixalpha",p,int(part.sum()))
