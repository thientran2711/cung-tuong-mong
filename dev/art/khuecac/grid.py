# Contact sheet of every finished figure of one tier: python3 grid.py WORKDIR TIER OUT.jpg [cols]
# Reads WORKDIR/img/fig-<role>-<face>-<TIER>-a18.webp for c01..c32, m01..m52; figures on parchment, face label above each.
import sys,os
from PIL import Image,ImageDraw,ImageFont
W,T,O=sys.argv[1:4];N=int(sys.argv[4]) if len(sys.argv)>4 else 12
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',20)
faces=['c%02d'%i for i in range(1,33)]+['m%02d'%i for i in range(1,53)]
CW,CH,TH=200,470,26
rows=(len(faces)+N-1)//N
S=Image.new('RGB',(CW*N,(CH+TH)*rows),(240,232,215));d=ImageDraw.Draw(S)
for i,c in enumerate(faces):
    role='maid' if c[0]=='m' else 'consort'
    p=os.path.join(W,'img',f'fig-{role}-{c}-{T}-a18.webp');x,y=(i%N)*CW,(i//N)*(CH+TH)
    d.text((x+6,y+3),c,font=F,fill=(150,0,0))
    if not os.path.exists(p):d.text((x+6,y+40),'MISSING',font=F,fill=(200,0,0));continue
    im=Image.open(p).convert('RGBA');s=min((CW-8)/im.width,(CH-6)/im.height);im=im.resize((max(1,round(im.width*s)),max(1,round(im.height*s))),Image.LANCZOS)
    S.paste(im,(x+(CW-im.width)//2,y+TH+(CH-im.height)//2),im)
S.save(O,quality=84);print(O,S.size)
