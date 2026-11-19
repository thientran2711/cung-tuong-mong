import sys,os
from PIL import Image
import numpy as np
BG=(236,230,220)
def face(path):
    im=Image.open(path).convert('RGBA'); flat=Image.new('RGB',im.size,(40,90,40)); flat.paste(im,mask=im.split()[3])
    a=np.asarray(flat).astype(int)[:1000]; r,g,b=a[...,0],a[...,1],a[...,2]
    m=(r>200)&(g>160)&(b>150)&(r-b>10)&(r-b<70)&(r-g>4)
    rows=m.sum(1); good=np.nonzero(rows>40)[0]
    if len(good)==0: y0,xc=60,512
    else:
        y0=good.min(); cols=m[y0:y0+220].sum(0); xc=int((cols*np.arange(len(cols))).sum()/max(cols.sum(),1))
    yc=y0+110; box=(xc-150,yc-150,xc+150,yc+190)
    out=Image.new('RGB',im.size,BG); out.paste(im,mask=im.split()[3])
    return out.crop(box)
out=sys.argv[1]
for p in sys.argv[2:]:
    n=os.path.basename(p)[:-4]; face(p).save(os.path.join(out,n+'.jpg'),quality=84)
