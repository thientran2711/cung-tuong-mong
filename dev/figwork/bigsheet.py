import sys
from PIL import Image, ImageDraw
O="/home/user/cung-tuong-mong/img"
rows=[r.split(",") for r in sys.argv[2:]]; TW=260; FH=520; PH=230
cols=max(map(len,rows))
sh=Image.new("RGB",(cols*TW,len(rows)*(FH+PH+20)),(242,232,212)); d=ImageDraw.Draw(sh)
for i,r in enumerate(rows):
  for j,n in enumerate(r):
    x=j*TW; y=i*(FH+PH+20)
    f=Image.open(f"{O}/fig-{n}.webp").convert("RGBA"); f.thumbnail((TW-10,FH-6)); sh.paste(f,(x+(TW-f.width)//2,y+3),f)
    p=Image.open(f"{O}/por-{n}.webp").convert("RGBA").resize((PH-10,PH-10))
    m=Image.new("L",p.size,0); ImageDraw.Draw(m).ellipse((0,0,p.width-1,p.height-1),fill=255)
    b=Image.new("RGBA",p.size,(225,205,170,255)); b.alpha_composite(p); sh.paste(b,(x+(TW-p.width)//2,y+FH),m)
    d.text((x+6,y+FH+PH+2),n,fill=(80,30,10))
sh.save(sys.argv[1],quality=88); print(sh.size)
