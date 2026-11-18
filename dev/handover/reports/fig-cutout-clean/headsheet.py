#!/usr/bin/env python3
"""headsheet.py OUT.jpg KEY1 KEY2 ... (reads OUTROOT=/tmp/claude-0/w13/b/<batch>/out via env OUTROOT)
Contact sheet of the top 330 px of each hd fig (scaled so the figure is 1800 tall) with GUIDE lines:
m09 ref: crown/bun top at y=5, chin at y=245 (head 240 px of 1800 = 0.133). Green band = chin 233..257 (+-5%). Cyan = bun top <=20."""
import os,sys
from PIL import Image,ImageDraw
O=os.environ['OUTROOT']; out=sys.argv[1]; keys=sys.argv[2:]
W=300;H=330;cols=min(len(keys),6);rows=(len(keys)+cols-1)//cols
c=Image.new('RGB',(W*cols,(H+14)*rows),(255,255,255));d=ImageDraw.Draw(c)
for n,k in enumerate(keys):
    im=Image.open(f'{O}/img/hd/fig-{k}.webp').convert('RGBA');im=im.crop(im.split()[3].getbbox());s=1800/im.height
    im=im.resize((round(im.width*s),1800));bg=Image.new('RGBA',im.size,(200,200,200,255));bg.alpha_composite(im)
    cx=im.width//2;t=bg.convert('RGB').crop((cx-W//2,0,cx+W//2,H))
    x=(n%cols)*W;y=(n//cols)*(H+14);c.paste(t,(x,y+14));d.text((x+2,y+1),k[9:],fill=(0,0,0))
    d.rectangle([x,y+14+233,x+W,y+14+257],outline=(0,170,0));d.line([(x,y+14+5),(x+W,y+14+5)],fill=(0,170,200))
c.save(out,quality=88)
