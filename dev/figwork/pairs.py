# pairs.py out.jpg tier cXX... : per lineup a18|a26|a36|a51 face crops (forehead visible), 4 lineups per row
import sys
from PIL import Image,ImageDraw,ImageFont
R='/home/user/cung-tuong-mong/.claude/worktrees/agent-a4b0765092fc7d9e0/img/'
out,t=sys.argv[1],sys.argv[2]; cs=sys.argv[3:]
box=(110,110,274,300); cw,ch=140,162; per=4
fn=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',15)
rows=(len(cs)+per-1)//per
o=Image.new('RGB',(per*(4*cw+10),rows*(ch+4)),(50,50,50)); d=ImageDraw.Draw(o)
for i,c in enumerate(cs):
    x0=(i%per)*(4*cw+10); y0=(i//per)*(ch+4)
    for k,a in enumerate(('18','26','36','51')):
        p=Image.open(R+f'por-consort-{c}-t{t}-a{a}.webp').convert('RGBA'); b=Image.new('RGBA',p.size,(235,225,205,255)); b.alpha_composite(p)
        o.paste(b.crop(box).convert('RGB').resize((cw,ch),Image.LANCZOS),(x0+k*cw,y0))
    d.text((x0+2,y0+2),f'{c} t{t}',fill=(255,255,0),font=fn)
o.save(out,quality=90); print(out,o.size)
