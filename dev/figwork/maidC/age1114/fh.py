# fh.py OUT.jpg AGES ITEM... : forehead/hairline crops (huadian check). ITEM = mNN-tK ; AGES like "a18,a26,a36,a51" ; COLS env = items per row
import sys,os
from PIL import Image,ImageDraw,ImageFont
from ag_lib import src,face,comp
out=sys.argv[1]; ages=sys.argv[2].split(","); items=sys.argv[3:]; S=130
cells=[(i,a) for i in items for a in ages]; C=int(os.environ.get("COLS",str(len(ages)*2)))
R=(len(cells)+C-1)//C; G=Image.new("RGB",(C*S,R*(S+14)),(255,255,255)); d=ImageDraw.Draw(G)
F=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",11)
for k,(i,a) in enumerate(cells):
    im=Image.open(src(f"fig-maid-{i}-{a}.webp")).convert("RGBA"); x,y,w,h=face(im)
    cx=x+w/2; z=w*float(os.environ.get("Z","0.8")); top=y-h*float(os.environ.get("TOP","0.3"))
    c=comp(im).crop((int(cx-z/2),int(top),int(cx+z/2),int(top+z))).resize((S,S),Image.LANCZOS)
    G.paste(c,((k%C)*S,(k//C)*(S+14)+14)); d.text(((k%C)*S+2,(k//C)*(S+14)),f"{i}-{a}",fill=(0,0,0),font=F)
G.save(out,quality=90); print(out)
