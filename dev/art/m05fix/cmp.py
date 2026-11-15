# cmp.py OUT tN... : before/after forehead crops, rows=tier, cols= a18..a51 before|after
import sys
from lib import *
out=sys.argv[1]; ts=sys.argv[2:]; S=200
G=Image.new("RGB",(8*S,len(ts)*(S+20)),(255,255,255)); d=ImageDraw.Draw(G)
for r,t in enumerate(ts):
  for k,a in enumerate(AGES):
    fn=f"fig-maid-m05-{t}-{a}.webp"
    for j,o in enumerate([True,False]):
      G.paste(fh_crop(src(fn,orig=o),S),((2*k+j)*S,r*(S+20)+20))
      d.text(((2*k+j)*S+3,r*(S+20)+2),f"{t}-{a} {'before' if o else 'AFTER'}",fill=(0,0,0),font=F(13))
G.save(out,quality=90)
