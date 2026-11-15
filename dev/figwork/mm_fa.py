# fa.py in.webp out.webp : fixalpha core (solidify partial alpha inside silhouette over parchment)
import sys,numpy as np
from PIL import Image
from scipy import ndimage as nd
PARCH=np.array([240,232,218],float)
a=np.asarray(Image.open(sys.argv[1]).convert("RGBA")).astype(float); al=a[...,3]; m=al>40
m=nd.binary_closing(m,iterations=4); fill=nd.binary_fill_holes(m); inner=nd.binary_erosion(fill,iterations=3)
part=inner&(al>40)&(al<250); k=al[...,None]/255.0; rgb=a[...,:3]*k+PARCH*(1-k)
a[...,:3]=np.where(part[...,None],rgb,a[...,:3]); a[...,3]=np.where(part,255,al)
Image.fromarray(a.clip(0,255).astype(np.uint8),"RGBA").save(sys.argv[2],lossless=True)
