# cmp.py out.jpg cid tierA tierB ...  -> rows per (cid), cols = tiers x ages
import sys
from PIL import Image, ImageDraw
O="/home/user/cung-tuong-mong/img"
out=sys.argv[1]; spec=sys.argv[2:]  # items like consort-c10:1,2  or player-look1:1,2
import os
TW,TH=int(os.environ.get("TW",150)),int(os.environ.get("TH",300)); AG=["a18","a26","a36","a51"]
rows=[]
for s in spec:
    k,ts=s.split(":"); rows.append((k,ts.split(",")))
cols=max(len(t) for _,t in rows)*4
sh=Image.new("RGB",(cols*TW,len(rows)*(TH+16)),(240,230,210)); d=ImageDraw.Draw(sh)
for i,(k,ts) in enumerate(rows):
    for a,t in enumerate(ts):
        for b,ag in enumerate(AG):
            x=(a*4+b)*TW; y=i*(TH+16)
            try:
                f=Image.open(f"{O}/fig-{k}-t{t}-{ag}.webp").convert("RGBA"); f.thumbnail((TW-6,TH-4)); sh.paste(f,(x+(TW-f.width)//2,y+2),f)
            except Exception: d.text((x+5,y+50),"MISSING",fill=(200,0,0))
            d.text((x+3,y+TH+2),f"{k[-5:]} t{t} {ag}",fill=(60,30,10))
sh.save(out,quality=85); print(sh.size)
