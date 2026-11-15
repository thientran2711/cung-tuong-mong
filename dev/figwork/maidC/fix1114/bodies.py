# bodies.py OUT DIR tier ids... : small full-figure strip per id (4 ages) to judge clothes
import sys
from PIL import Image,ImageDraw,ImageFont
F=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",18)
out,R,tier=sys.argv[1],sys.argv[2],sys.argv[3]; ids=sys.argv[4:]; H=300
cols=4; rows=(len(ids)+1)//2
G=Image.new("RGB",(2*(4*110+30),rows*H),(255,255,255)); d=ImageDraw.Draw(G)
for n,i in enumerate(ids):
    ox=(n%2)*(4*110+30); oy=(n//2)*H; d.text((ox+2,oy+2),i,fill=(200,0,0),font=F)
    for c,a in enumerate(["a18","a26","a36","a51"]):
        im=Image.open(f"{R}/fig-maid-{i}-{tier}-{a}.webp").convert("RGBA"); im=im.resize((int(im.width*H/im.height),H))
        bg=Image.new("RGBA",im.size,(255,255,255,255)); bg.alpha_composite(im)
        G.paste(bg.convert("RGB").crop((max(0,(im.width-110)//2),0,max(0,(im.width-110)//2)+110,H)),(ox+30+c*110,oy))
G.save(out,quality=85)
