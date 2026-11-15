# hires.py OUT.jpg mNN tiers... : native-res portrait sheet (por 384x506), rows = tiers, cols = a18 a26 a36 a51; por from porc/ if present else worktree
import sys,os
from PIL import Image,ImageDraw,ImageFont
H=os.path.dirname(os.path.abspath(__file__)); W="/home/user/cung-tuong-mong/.claude/worktrees/agent-a7a7268489937d5f2/img/"
out,m=sys.argv[1],sys.argv[2]; tiers=sys.argv[3:]; w,h=384,506; L=70
F=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",22)
G=Image.new("RGB",(L+4*w,30+len(tiers)*h),(250,248,244)); d=ImageDraw.Draw(G)
for c,t in enumerate(["19","24","32","48"]): d.text((L+c*w+w//2-12,3),t,fill=(150,0,0),font=F)
for r,t in enumerate(tiers):
    d.text((6,30+r*h+h//2),t,fill=(0,0,0),font=F)
    for c,a in enumerate(["a18","a26","a36","a51"]):
        fn=f"por-maid-{m}-{t}-{a}.webp"; p=f"{H}/porc/{fn}"
        im=Image.open(p if os.path.exists(p) else W+fn).convert("RGBA")
        b=Image.new("RGBA",im.size,(236,231,224,255)); b.alpha_composite(im); G.paste(b.convert("RGB"),(L+c*w,30+r*h))
G.save(out,quality=92); print(out,G.size)
