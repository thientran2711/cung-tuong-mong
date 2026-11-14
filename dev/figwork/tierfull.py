# tierfull.py out.jpg tier c.. : full figures on dark green, rows of 4 identities x 4 ages
import sys
from PIL import Image,ImageDraw,ImageFont
N='/home/user/cung-tuong-mong/.claude/worktrees/agent-a4a32ff575576735e/img/'
out,t=sys.argv[1],sys.argv[2]; cids=sys.argv[3:]; H=300; PER=4
fn=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',14)
rows=[]
for k in range(0,len(cids),PER):
    tiles=[]
    for c in cids[k:k+PER]:
        for a in ('18','26','36','51'):
            im=Image.open(N+f'fig-consort-{c}-t{t}-a{a}.webp').convert('RGBA')
            im=im.resize((max(1,int(im.width*H/im.height)),H),Image.LANCZOS)
            b=Image.new('RGBA',im.size,(38,84,58,255)); b.alpha_composite(im); b=b.convert('RGB')
            if a=='18': ImageDraw.Draw(b).text((2,2),f'{c} t{t}',fill=(255,255,0),font=fn)
            tiles.append(b)
        tiles.append(Image.new('RGB',(10,H),'black'))
    r=Image.new('RGB',(sum(x.width for x in tiles),H),'black'); x=0
    for tt in tiles: r.paste(tt,(x,0)); x+=tt.width
    rows.append(r)
W=max(r.width for r in rows); o=Image.new('RGB',(W,sum(r.height+4 for r in rows)),'black'); y=0
for r in rows: o.paste(r,(0,y)); y+=r.height+4
o.save(out,quality=86); print(out,o.size)
