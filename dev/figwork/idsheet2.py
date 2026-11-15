# rows = ages, cols = t1..t8 (+cold optional); face crop from por, scale SC
import sys,os
from PIL import Image,ImageDraw,ImageFont
R=os.environ.get('R','/home/user/cung-tuong-mong/.claude/worktrees/agent-a4a32ff575576735e/img/')
out=sys.argv[1]; c=sys.argv[2]
tiers=os.environ.get('TIERS','1,2,3,4,5,6,7,8').split(',')
box=(100,95,284,325); sc=float(os.environ.get('SC','1.25'))
cw,ch=int((box[2]-box[0])*sc),int((box[3]-box[1])*sc)
ages=['18','26','36','51']
fn=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',18)
W=50+len(tiers)*(cw+3); H=24+4*(ch+3)
im=Image.new('RGB',(W,H),(60,60,60)); d=ImageDraw.Draw(im)
for ti,t in enumerate(tiers):
  d.text((50+ti*(cw+3)+4,2),f'{c} t{t}',fill=(255,255,255),font=fn)
  for ai,a in enumerate(ages):
    x=50+ti*(cw+3); y=24+ai*(ch+3)
    if ti==0: d.text((2,y+ch//2),'a'+a,fill=(255,255,0),font=fn)
    p=R+f'por-consort-{c}-t{t}-a{a}.webp'
    if not os.path.exists(p): d.text((x+5,y+5),'MISSING',fill=(255,0,0),font=fn); continue
    p_=Image.open(p).convert('RGBA'); bg=Image.new('RGBA',p_.size,(235,225,205,255)); bg.alpha_composite(p_)
    im.paste(bg.crop(box).convert('RGB').resize((cw,ch),Image.LANCZOS),(x,y))
im.save(out,quality=88); print(out,im.size)
