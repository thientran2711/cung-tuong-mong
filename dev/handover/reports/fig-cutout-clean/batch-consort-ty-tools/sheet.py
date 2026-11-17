#!/usr/bin/env python3
# sheet.py OUT.jpg KEY... : per key: fitted fig on light + dark and face crop of the master (native)
import sys; from PIL import Image
S="/tmp/claude-0/-home-user-cung-tuong-mong/dad78ca2-b43f-5b5f-9eea-225524ea5f8a/scratchpad"
out=sys.argv[1]; keys=sys.argv[2:]; W=330;H=700; cols=[]
for k in keys:
    f=Image.open(f"{S}/out/img/fig-{k}.webp").convert("RGBA"); f=f.resize((int(f.width*H/f.height),H),Image.LANCZOS)
    m=Image.open(f"{S}/m/{k}.png").convert("RGBA"); b=m.getbbox(); top=b[1]; fh=b[3]-b[1]
    cx=(b[0]+b[2])//2; s=int(fh*0.17); face=m.crop((cx-s,top,cx+s,top+int(s*1.3))).resize((W,int(W*1.3)),Image.LANCZOS)
    col=Image.new("RGB",(W*2,H+int(W*1.3)),(255,255,255))
    for i,bg in enumerate([(245,240,230),(40,40,48)]):
        c=Image.new("RGBA",(W,H),bg+(255,)); c.alpha_composite(f,((W-f.width)//2,0)); col.paste(c.convert("RGB"),(i*W,0))
        fc=Image.new("RGBA",face.size,bg+(255,)); fc.alpha_composite(face); col.paste(fc.convert("RGB"),(i*W,H))
    cols.append(col)
sh=Image.new("RGB",(sum(c.width for c in cols),cols[0].height)); x=0
for c in cols: sh.paste(c,(x,0)); x+=c.width
sh.save(out,quality=85)
