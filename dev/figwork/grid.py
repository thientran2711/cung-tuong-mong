import sys
from PIL import Image,ImageDraw
O="cung-dau/img"; rows=[r.split(",") for r in sys.argv[3:]]; W=int(sys.argv[2]); H=W*2
cols=max(map(len,rows)); sh=Image.new("RGB",(cols*W,len(rows)*(H+16)),(242,232,212)); d=ImageDraw.Draw(sh)
for i,r in enumerate(rows):
  for j,n in enumerate(r):
    if not n: continue
    f=Image.open(f"{O}/fig-{n}.webp").convert("RGBA"); f.thumbnail((W-4,H-4)); sh.paste(f,(j*W+(W-f.width)//2,i*(H+16)+2),f)
    d.text((j*W+4,i*(H+16)+H+2),n.replace('eunuch-',''),fill=(80,30,10))
sh.save(sys.argv[1],quality=85); print(sh.size)
