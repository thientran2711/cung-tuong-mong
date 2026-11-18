# tiersheet.py out.jpg role tier ids... : contact sheet of a finished tier (4 ages per id, 2 ids per row)
import sys
from PIL import Image, ImageDraw
O="/home/user/cung-tuong-mong/img"; out,role,t=sys.argv[1:4]; ids=sys.argv[4:]
TW,TH=130,260; AG=["a18","a26","a36","a51"]; per=2
rows=(len(ids)+per-1)//per
sh=Image.new("RGB",(per*4*TW,rows*(TH+16)),(240,230,210)); d=ImageDraw.Draw(sh)
for i,cid in enumerate(ids):
    for b,ag in enumerate(AG):
        x=((i%per)*4+b)*TW; y=(i//per)*(TH+16)
        try:
            f=Image.open(f"{O}/fig-{role}-{cid}-t{t}-{ag}.webp").convert("RGBA"); f.thumbnail((TW-6,TH-4)); sh.paste(f,(x+(TW-f.width)//2,y+2),f)
        except Exception: d.text((x+5,y+50),"MISSING",fill=(200,0,0))
        d.text((x+3,y+TH+2),f"{cid} t{t} {ag}",fill=(60,30,10))
sh.save(out,quality=85); print(sh.size)
