# rawband.py outprefix jid=gen ... : head band (y0..y1 frac) of raw lineups at scale, N rows per sheet
import sys,os
from PIL import Image,ImageDraw,ImageFont
R='/tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/fw/raw10/'
Y0,Y1,SC,N=float(os.environ.get('Y0','0.03')),float(os.environ.get('Y1','0.22')),float(os.environ.get('SC','0.5')),int(os.environ.get('N','5'))
fn=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22)
rows=[]
for a in sys.argv[2:]:
    j,g=a.split('=')
    im=Image.open(R+g+'.png').convert('RGB'); w,h=im.size
    r=im.crop((0,int(h*Y0),w,int(h*Y1))); r=r.resize((int(r.width*SC),int(r.height*SC)),Image.LANCZOS)
    ImageDraw.Draw(r).text((6,6),j,fill=(200,0,0),font=fn); rows.append(r)
for k in range(0,len(rows),N):
    ch=rows[k:k+N]; o=Image.new('RGB',(ch[0].width,sum(r.height+4 for r in ch)),'black'); y=0
    for r in ch: o.paste(r,(0,y)); y+=r.height+4
    o.save(f'{sys.argv[1]}_{k//N}.jpg',quality=88); print(f'{sys.argv[1]}_{k//N}.jpg',o.size)
