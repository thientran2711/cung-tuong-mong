# agesheet.py out.jpg tier : 32 pairs (a18 | a51) face crops, 8 pairs per row
import sys
from PIL import Image,ImageDraw,ImageFont
R='/home/user/cung-tuong-mong/.claude/worktrees/agent-a4a32ff575576735e/img/'
out,t=sys.argv[1],sys.argv[2]
box=(105,100,279,320); cw,ch=130,164
fn=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',14)
o=Image.new('RGB',(8*(2*cw+8),4*(ch+4)),(50,50,50)); d=ImageDraw.Draw(o)
for i in range(32):
    c='c%02d'%(i+1); x0=(i%8)*(2*cw+8); y0=(i//8)*(ch+4)
    for k,a in enumerate(('18','51')):
        p=Image.open(R+f'por-consort-{c}-t{t}-a{a}.webp').convert('RGBA'); b=Image.new('RGBA',p.size,(235,225,205,255)); b.alpha_composite(p)
        o.paste(b.crop(box).convert('RGB').resize((cw,ch),Image.LANCZOS),(x0+k*cw,y0))
    d.text((x0+2,y0+2),f'{c}',fill=(255,255,0),font=fn)
o.save(out,quality=88); print(out,o.size)
