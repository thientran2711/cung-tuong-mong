# lv.py OUTDIR JID... : one readable preview per lineup (4 cutouts on parchment, labelled)
import sys,os
from PIL import Image,ImageDraw,ImageFont
WT=os.path.dirname(os.path.abspath(__file__)).rsplit("/",1)[0]+"/wt-maidB/img"
out=sys.argv[1]; os.makedirs(out,exist_ok=True)
try: font=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",28)
except Exception: font=None
for j in sys.argv[2:]:
    _,who,tt=j.split("-"); H=1100; ims=[]
    for a in ["a18","a26","a36","a51"]:
        im=Image.open(f"{WT}/fig-consort-{who}-t{tt}-{a}.webp").convert("RGBA"); im=im.resize((int(im.width*H/im.height),H)); ims.append(im)
    W=sum(i.width for i in ims)+40*5; S=Image.new("RGB",(W,H+70),(246,240,228)); d=ImageDraw.Draw(S)
    d.text((20,15),f"{who} {tt}  (19 / 24 / 32 / 48)",fill=(90,40,20),font=font); x=40
    for i in ims: S.paste(i,(x,60),i); x+=i.width+40
    S.save(f"{out}/{j}.jpg",quality=85)
print("ok")
