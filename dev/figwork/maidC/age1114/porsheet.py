# porsheet.py OUT.jpg SET... : rows = sets, cols = por a18 a26 a36 a51 (the in-game portraits) on a light ground, labelled
import sys
from PIL import Image,ImageDraw,ImageFont
W='/home/user/cung-tuong-mong/.claude/worktrees/agent-a7a7268489937d5f2/img/'
out=sys.argv[1]; sets=sys.argv[2:]; w,h=230,303; L=90
F=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",18)
G=Image.new("RGB",(L+4*w,24+len(sets)*h),(250,248,244)); d=ImageDraw.Draw(G)
for c,t in enumerate(["19","24","32","48"]): d.text((L+c*w+w//2-10,2),t,fill=(150,0,0),font=F)
for r,s in enumerate(sets):
    d.text((4,24+r*h+h//2-10),s,fill=(0,0,0),font=F)
    for c,a in enumerate(["a18","a26","a36","a51"]):
        im=Image.open(f"{W}por-maid-{s}-{a}.webp").convert("RGBA").resize((w,h),Image.LANCZOS)
        b=Image.new("RGBA",(w,h),(236,231,224,255)); b.alpha_composite(im); G.paste(b.convert("RGB"),(L+c*w,24+r*h))
G.save(out,quality=88); print(out,G.size)
