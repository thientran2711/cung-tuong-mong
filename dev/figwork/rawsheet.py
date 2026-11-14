# rawsheet.py out.jpg name... : raw images with face zoom (top 18%)
import sys,os
from PIL import Image, ImageDraw
W=os.path.dirname(os.path.abspath(__file__))
ns=sys.argv[2:]; TW=170; TH=255; FZ=170
cols=min(6,len(ns)); rows=(len(ns)+cols-1)//cols
sh=Image.new("RGB",(cols*(TW+FZ),rows*(TH+16)),(255,255,255)); d=ImageDraw.Draw(sh)
for k,n in enumerate(ns):
    x=(k%cols)*(TW+FZ); y=(k//cols)*(TH+16)
    im=Image.open(f"{W}/raw/{n}.png").convert("RGB"); w,h=im.size
    t=im.copy(); t.thumbnail((TW,TH)); sh.paste(t,(x,y))
    # face zoom: find nonbg content in top part
    g=im.convert("L").point(lambda v:255 if v<200 else 0); bb=g.getbbox() or (0,0,w,h)
    fh=int((bb[3]-bb[1])*0.17); cx=(bb[0]+bb[2])//2
    # centre on top-part content
    top=g.crop((0,bb[1],w,bb[1]+fh)).getbbox()
    if top: cx=(top[0]+top[2])//2
    z=im.crop((cx-fh//2,bb[1],cx+fh//2,bb[1]+fh)).resize((FZ,FZ))
    sh.paste(z,(x+TW,y)); d.text((x+2,y+TH+2),n[4:],fill=(0,0,0))
sh.save(sys.argv[1],quality=85); print(sh.size)
