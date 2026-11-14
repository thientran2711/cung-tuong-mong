# fh.py out.jpg tier cXX... : forehead zoom of all 4 ages per lineup (one row per lineup, 8 lineups per column block)
import sys
from PIL import Image,ImageDraw,ImageFont
R='/home/user/cung-tuong-mong/.claude/worktrees/agent-a4b0765092fc7d9e0/img/'
out,t=sys.argv[1],sys.argv[2]; cs=sys.argv[3:]
box=(132,105,252,195); cw,ch=160,120; per=8
fn=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',14)
cols=(len(cs)+per-1)//per
o=Image.new('RGB',(cols*(4*cw+8),min(per,len(cs))*(ch+3)),(50,50,50)); d=ImageDraw.Draw(o)
for i,c in enumerate(cs):
    x0=(i//per)*(4*cw+8); y0=(i%per)*(ch+3)
    for k,a in enumerate(('18','26','36','51')):
        p=Image.open(R+f'por-consort-{c}-t{t}-a{a}.webp').convert('RGBA'); b=Image.new('RGBA',p.size,(235,225,205,255)); b.alpha_composite(p)
        o.paste(b.crop(box).convert('RGB').resize((cw,ch),Image.LANCZOS),(x0+k*cw,y0))
    d.text((x0+2,y0+2),c,fill=(255,255,0),font=fn)
o.save(out,quality=90); print(o.size)
