# heads.py OUT tier ids... : head crops grid (rows=ids, cols=4 ages) from img/fig-maid-*
import sys
from PIL import Image,ImageDraw,ImageFont
R="/home/user/cung-tuong-mong/.claude/worktrees/agent-ade4e7b6002d975ea/img/"
out,tier=sys.argv[1],sys.argv[2]; ids=sys.argv[3:]
F=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",20)
S=int(__import__("os").environ.get("SZ","300")); frac=float(__import__('os').environ.get('FR','0.24'))
G=Image.new("RGB",(S*4+60,S*len(ids)),(240,235,225)); d=ImageDraw.Draw(G)
for r,i in enumerate(ids):
    d.text((4,r*S+10),i,fill=(0,0,0),font=F)
    for c,a in enumerate(["a18","a26","a36","a51"]):
        im=Image.open(f"{R}fig-maid-{i}-{tier}-{a}.webp").convert("RGBA")
        w,h=im.size; ch=int(h*frac); A=im.split()[3].crop((0,0,w,ch)).getbbox()
        cx=(A[0]+A[2])//2 if A else w//2
        cr=im.crop((cx-ch//2,0,cx+ch//2,ch)).resize((S,S))
        bg=Image.new("RGBA",(S,S),(255,255,255,255)); bg.alpha_composite(cr)
        G.paste(bg.convert("RGB"),(60+c*S,r*S))
G.save(out,quality=88)
