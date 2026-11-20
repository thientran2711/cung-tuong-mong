import numpy as np, sys
from PIL import Image, ImageDraw, ImageFont
F=lambda s,b=False: ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf"%("-Bold" if b else ""),s)
ROWS=[("OLD_m13_t2.png","OLD · m13 t2 a36 · lJtM9A8gv9 · WITH sentence (model alpha)"),
      ("OLD_m33_t2.png","OLD · m33 t2 a18 · Xm9gH28Bfo · WITH sentence (model alpha)"),
      ("NEW_m13_tn.png","NEW · m13 thiếu nữ · VX7IB7sMMU · parchment + remove_bg"),
      ("NEW_m33_tn.png","NEW · m33 thiếu nữ · nVseTaFYQD · parchment + remove_bg"),
      ("NEW_s46.png","NEW · s46 (gauze outfit) · cpS1KEv0eP · parchment + remove_bg")]
DARK=(32,30,36); LIGHT=(246,241,232); C=340
def crops(im):
    a=np.asarray(im)[...,3]; ys,xs=np.where(a>128); x0,x1,y0,y1=xs.min(),xs.max(),ys.min(),ys.max(); h=y1-y0
    head=(x0+(x1-x0)//2-int(.17*h), y0-10, x0+(x1-x0)//2+int(.17*h), y0+int(.30*h))        # hair + hairpins + tassels
    # sleeve: the widest side region in the middle band
    band=slice(y0+int(.35*h), y0+int(.75*h)); cols=np.where((a[band]>20).any(0))[0]
    L=(cols.min()-10, y0+int(.35*h), cols.min()+int(.34*h), y0+int(.69*h)); R=(cols.max()-int(.34*h), y0+int(.35*h), cols.max()+10, y0+int(.69*h))
    return [head,L,R]
def on(im,box,bg):
    c=im.crop(box); b=Image.new("RGBA",c.size,bg+(255,)); b.alpha_composite(c); return b.convert("RGB").resize((C,int(C*c.height/c.width)),Image.LANCZOS)
tiles=[]
for f,lab in ROWS:
    im=Image.open(f).convert("RGBA"); r=[]
    for box in crops(im):
        for bg in (DARK,LIGHT): r.append(on(im,box,bg))
    tiles.append((lab,r))
rh=[max(t.height for t in r) for _,r in tiles]
W=20+6*(C+10); H=70+sum(h+46 for h in rh)
sh=Image.new("RGB",(W,H),(225,220,210)); d=ImageDraw.Draw(sh)
d.text((20,14),"Lượt 825/826 · transparent-bg sentence OLD (with) vs NEW (without) · hair/tassels | left sleeve | right sleeve, each dark | light",fill=(60,30,20),font=F(22,True))
y=60
for (lab,r),h in zip(tiles,rh):
    d.text((20,y),lab,fill=(150,30,30) if lab.startswith("NEW") else (60,60,60),font=F(22,True)); y+=34
    for i,t in enumerate(r): sh.paste(t,(20+i*(C+10),y))
    y+=h+12
q=88
while True:
    sh.save(sys.argv[1],quality=q,optimize=True)
    import os
    if os.path.getsize(sys.argv[1])<900_000 or q<50: break
    q-=6
print(sh.size, os.path.getsize(sys.argv[1]))
