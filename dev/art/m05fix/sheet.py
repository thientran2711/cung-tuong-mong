# sheet.py OUT ORIGDIR NEWDIR FACE TITLE [tiers]: before/after portrait sheet: row1 before t1..tN a18, row2 after, row3 t1 4 ages before|after
import sys
from PIL import Image,ImageDraw
from lib import F
out,od,nd,face,title=sys.argv[1:6]; ts=sys.argv[6:] or [f"t{i}" for i in range(1,9)]
W,Hh=240,316; L=24; top=40
G=Image.new("RGB",(8*W,top+3*(Hh+L)),(250,248,244)); d=ImageDraw.Draw(G)
d.text((8,8),title,fill=(0,0,0),font=F(20))
def por(dr,fn):
    im=Image.open(f"{dr}/{fn}").convert("RGBA"); b=Image.new("RGBA",im.size,(236,231,224,255)); b.alpha_composite(im)
    return b.convert("RGB").resize((W,Hh),Image.LANCZOS)
for r,(dr,lab) in enumerate([(od,"trước"),(nd,"SAU")]):
    for k,t in enumerate(ts):
        y=top+r*(Hh+L); G.paste(por(dr,f"por-{face}-{t}-a18.webp"),(k*W,y+L)); d.text((k*W+4,y+3),f"{t} a18 {lab}",fill=(0,0,0) if r==0 else (170,0,0),font=F(15))
y=top+2*(Hh+L)
for k,a in enumerate(["a18","a26","a36","a51"]):
    for j,(dr,lab) in enumerate([(od,"trước"),(nd,"SAU")]):
        x=(2*k+j)*W; G.paste(por(dr,f"por-{face}-{ts[0]}-{a}.webp"),(x,y+L)); d.text((x+4,y+3),f"{ts[0]} {a} {lab}",fill=(0,0,0) if j==0 else (170,0,0),font=F(15))
G.save(out,quality=88); print(out,G.size)
