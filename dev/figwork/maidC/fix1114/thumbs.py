# thumbs.py OUT png... : stacked 1200-wide thumbs with labels
import sys,os
from PIL import Image,ImageDraw,ImageFont
F=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",20)
ims=[Image.open(p).convert("RGB") for p in sys.argv[2:]]; W=1200
th=[im.resize((W,int(im.height*W/im.width))) for im in ims]
G=Image.new("RGB",(W,sum(t.height for t in th)),(255,255,255)); y=0; d=ImageDraw.Draw(G)
for p,t in zip(sys.argv[2:],th): G.paste(t,(0,y)); d.text((4,y+4),os.path.basename(p),fill=(200,0,0),font=F); y+=t.height
G.save(sys.argv[1],quality=85)
