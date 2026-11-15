# Self-check sheets from cut-outs: python3 cview.py WORKDIR OUTPREFIX TIER face...
# OUTPREFIX-full.jpg: whole figures on parchment; OUTPREFIX-face.jpg: large head crops (forehead/cheeks/chin/lips), 2 rows.
import sys,os
import numpy as np
from PIL import Image,ImageDraw,ImageFont
W,O,T=sys.argv[1:4];faces=sys.argv[4:]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',28)
full=[];heads=[]
for c in faces:
    im=Image.open(os.path.join(W,'cut',f'{T}-{c}.png')).convert('RGBA')
    a=np.array(im)[:,:,3];ys,xs=np.nonzero(a>8);im=im.crop((xs.min(),ys.min(),xs.max()+1,ys.max()+1))
    bg=Image.new('RGBA',im.size,(240,232,215,255));bg.alpha_composite(im);bg=bg.convert('RGB')
    f=bg.resize((round(bg.width*700/bg.height),700));ImageDraw.Draw(f).text((6,4),c,font=F,fill=(160,0,0));full.append(f)
    # head: top 15% of figure height, centred on the alpha mass of that band
    hh=int(bg.height*.17);band=a[ys.min():ys.min()+hh,xs.min():xs.max()+1]
    cx=int(np.nonzero(band>8)[1].mean());w=int(hh*.9)
    h=bg.crop((max(cx-w//2,0),0,cx+w//2,hh)).resize((360,round(360*hh/w)));ImageDraw.Draw(h).text((6,4),c,font=F,fill=(160,0,0));heads.append(h)
S=Image.new('RGB',(sum(x.width for x in full),700),'white');x=0
for i in full:S.paste(i,(x,0));x+=i.width
S.save(O+'-full.jpg',quality=82)
n=(len(heads)+1)//2;hh=max(h.height for h in heads)
S=Image.new('RGB',(360*n,hh*2),'white')
for i,h in enumerate(heads):S.paste(h,((i%n)*360,(i//n)*hh))
S.save(O+'-face.jpg',quality=90)
