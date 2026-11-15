# Side-by-side head crops: old t1 a18 (ref) vs new khue cac raw. Usage: python3 heads.py WORKDIR OUT.jpg c05 c08 ...
import sys,os
import numpy as np
from PIL import Image
W=sys.argv[1];rows=[]
def head(im,frac):
    a=np.array(im.convert('RGBA'))[:,:,3] if im.mode=='RGBA' else None
    if a is not None:
        ys,xs=np.nonzero(a>20);top,bot=ys.min(),ys.max();hh=int((bot-top)*frac)
        cols=xs[ys<top+hh];box=(max(cols.min()-20,0),top,min(cols.max()+20,im.width),top+hh)
    else:
        box=(int(im.width*.2),int(im.height*.03),int(im.width*.8),int(im.height*.03+im.height*frac*.95))
    h=im.convert('RGB').crop(box);return h.resize((round(h.width*420/h.height),420))
for c in sys.argv[3:]:
    a=head(Image.open(os.path.join(W,'ref',c+'.webp')),.2)
    p=os.path.join(W,'raw',c+'.png')
    b=head(Image.open(p).convert('RGB'),.2) if os.path.exists(p) else Image.new('RGB',(10,420),'white')
    r=Image.new('RGB',(a.width+b.width+10,420),'white');r.paste(a,(0,0));r.paste(b,(a.width+10,0));rows.append(r)
S=Image.new('RGB',(max(r.width for r in rows),430*len(rows)),'white')
for i,r in enumerate(rows):S.paste(r,(0,i*430))
S.save(sys.argv[2],quality=85)
