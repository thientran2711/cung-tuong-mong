# usage: sheet.py out.jpg name1 name2 ...  (or --all start end)
import sys, json
from PIL import Image, ImageDraw
OUT="/home/user/cung-tuong-mong/img"
names=sys.argv[2:]
TW,TH=200,330; cols=min(8,len(names)); rows=(len(names)+cols-1)//cols
sh=Image.new("RGB",(cols*TW,rows*(TH+60)),(240,230,210)); d=ImageDraw.Draw(sh)
for i,n in enumerate(names):
    x=(i%cols)*TW; y=(i//cols)*(TH+60)
    try:
        f=Image.open(f"{OUT}/{n}.webp").convert("RGBA"); f.thumbnail((TW-10,TH-10))
        sh.paste(f,(x+(TW-f.width)//2,y+5),f)
        p=Image.open(f"{OUT}/por-{n[4:]}.webp").convert("RGBA").resize((50,50))
        sh.paste(p,(x+TW-52,y+TH-48),p)
    except Exception as e: d.text((x+5,y+50),"MISSING",fill=(200,0,0))
    d.text((x+3,y+TH+2),n[4:][:32],fill=(60,30,10)); d.text((x+3,y+TH+16),n[4:][32:64],fill=(60,30,10))
sh.save(sys.argv[1],quality=82); print(sh.size)
