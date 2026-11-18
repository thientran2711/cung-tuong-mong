# idsheet.py out.jpg "row1f1,row1f2,..." "row2..." ; names without fig- prefix/.webp
import sys
from PIL import Image, ImageDraw
OUT="/home/user/cung-tuong-mong/img"
rows=[r.split(",") for r in sys.argv[2:]]; TW,TH=150,270
cols=max(len(r) for r in rows)
sh=Image.new("RGB",(cols*TW,len(rows)*(TH+16)),(240,230,210)); d=ImageDraw.Draw(sh)
for i,r in enumerate(rows):
    for j,n in enumerate(r):
        x=j*TW;y=i*(TH+16)
        try:
            f=Image.open(f"{OUT}/fig-{n}.webp").convert("RGBA"); f.thumbnail((TW-6,TH-50)); sh.paste(f,(x+(TW-f.width)//2,y+2),f)
            p=Image.open(f"{OUT}/por-{n}.webp").convert("RGBA").resize((48,48)); sh.paste(p,(x+TW-50,y+TH-48),p)
        except Exception: d.text((x+5,y+40),"MISSING",fill=(200,0,0))
        d.text((x+2,y+TH+2),n[-22:],fill=(60,30,10))
sh.save(sys.argv[1],quality=84); print(sh.size)
