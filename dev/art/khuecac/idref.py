# Identity reference for a khue cac generation: the face's live t1 a18 figure on parchment, with the
# forehead huadian painted out (cv2 inpaint) so the model never copies it, plus a 2x face close-up beside it.
# Usage: python3 idref.py WORKDIR c05 ...   (reads WORKDIR/ref/<c>.webp, writes WORKDIR/idref/<c>.png + <c>-mask.png)
import sys,os
import numpy as np, cv2
from PIL import Image
W=sys.argv[1];os.makedirs(os.path.join(W,'idref'),exist_ok=True)
casc=cv2.CascadeClassifier(cv2.data.haarcascades+'haarcascade_frontalface_default.xml')
for c in sys.argv[2:]:
    im=Image.open(os.path.join(W,'ref',c+'.webp')).convert('RGBA')
    up=im.resize((im.width*3,im.height*3),Image.LANCZOS)
    bg=Image.new('RGBA',up.size,(236,226,208,255));bg.alpha_composite(up)
    rgb=np.array(bg.convert('RGB'))
    g=cv2.cvtColor(rgb,cv2.COLOR_RGB2GRAY);top=g[:int(g.shape[0]*.25)]
    fs=casc.detectMultiScale(top,1.1,5,minSize=(60,60))
    if not len(fs): print(c,'no face');continue
    x,y,w,h=max(fs,key=lambda f:f[2]*f[3])
    # forehead band: upper ~35% of the face box, central half
    fx0,fx1,fy0,fy1=x+int(w*.32),x+int(w*.68),max(y-h//6,0),y+int(h*.25)
    reg=rgb[fy0:fy1,fx0:fx1].astype(int);R,G,B=reg[...,0],reg[...,1],reg[...,2]
    med=cv2.medianBlur(rgb[fy0:fy1,fx0:fx1].astype(np.uint8),31).astype(int)
    d=np.abs(reg-med).sum(-1);L=reg.mean(-1);Lm=med.mean(-1)
    # anything that differs from the surrounding skin (paint, gold leaf, dots), but not hair (dark areas)
    m=((R-G>45)&(R-B>30))|((R>150)&(G>110)&(B<90)&(R-B>80))   # red / gold paint only (wider rules ate the brows)
    mask=np.zeros(rgb.shape[:2],np.uint8);mask[fy0:fy1,fx0:fx1]=m.astype(np.uint8)*255
    mask=cv2.dilate(mask,np.ones((9,9),np.uint8))
    out=cv2.inpaint(rgb,mask,9,cv2.INPAINT_TELEA)
    print(c,'face',w,'mask px',int(m.sum()))
    O=Image.fromarray(out)
    # close-up of the head
    hx0,hy0,hx1,hy1=max(x-w,0),max(y-int(h*1.1),0),min(x+2*w,O.width),y+int(h*1.9)
    hd=O.crop((hx0,hy0,hx1,hy1));hd=hd.resize((round(hd.width*O.height/hd.height*.6),round(O.height*.6)))
    S=Image.new('RGB',(O.width+hd.width+40,O.height),(236,226,208));S.paste(O,(0,0));S.paste(hd,(O.width+40,int(O.height*.05)))
    S.thumbnail((2400,2400));S.save(os.path.join(W,'idref',c+'.png'))
    Image.fromarray(mask).save(os.path.join(W,'idref',c+'-mask.png'))
