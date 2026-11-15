# jidsheet.py out.jpg cXX-tT ... : rows = lineups, cols = 4 ages; face crop from por (with one lower tier reference col)
import sys,os
from PIL import Image,ImageDraw,ImageFont
R='/home/user/cung-tuong-mong/.claude/worktrees/agent-a4a32ff575576735e/img/'
box=(110,110,274,300); sc=1.1
cw,ch=int((box[2]-box[0])*sc),int((box[3]-box[1])*sc)
fn=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',16)
js=sys.argv[2:]; cols=4
o=Image.new('RGB',(90+cols*(cw+3),len(js)*(ch+3)),(60,60,60)); d=ImageDraw.Draw(o)
for r,j in enumerate(js):
    d.text((2,r*(ch+3)+ch//2),j,fill=(255,255,0),font=fn)
    for k,a in enumerate(('18','26','36','51')):
        p=Image.open(R+f'por-consort-{j}-a{a}.webp').convert('RGBA'); b=Image.new('RGBA',p.size,(235,225,205,255)); b.alpha_composite(p)
        o.paste(b.crop(box).convert('RGB').resize((cw,ch),Image.LANCZOS),(90+k*(cw+3),r*(ch+3)))
o.save(sys.argv[1],quality=88); print(o.size)
