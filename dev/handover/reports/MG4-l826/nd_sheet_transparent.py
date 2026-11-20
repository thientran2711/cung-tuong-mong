import sys, numpy as np
from PIL import Image, ImageDraw, ImageFont
F=lambda s: ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",s)
out, title, files = sys.argv[1], sys.argv[2], sys.argv[3:]
ims=[]
for f in files:
    im=Image.open(f).convert("RGBA"); a=np.asarray(im)[...,3]; ys,xs=np.where(a>8)
    ims.append((f, im.crop((xs.min()-10, ys.min()-10, xs.max()+10, ys.max()+10))))
H=max(i.height for _,i in ims); PAD=40; TOP=150
W=PAD+sum(i.width+PAD for _,i in ims)
sh=Image.new("RGBA",(W,H+TOP+PAD),(0,0,0,0)); d=ImageDraw.Draw(sh)
def plate(x,y,t,s):
    w=d.textlength(t,font=F(s)); d.rounded_rectangle((x-12,y-8,x+w+12,y+s+12),12,fill=(255,250,240,235)); d.text((x,y),t,fill=(90,25,20,255),font=F(s))
plate(PAD,20,title,44)
x=PAD
for f,i in ims:
    sh.alpha_composite(i,(x,TOP+H-i.height))
    p=f.split("/")[-1][:-4].split("_"); plate(x+10,TOP-50+0,f"Nữ đế {p[0]} · {p[1]} · NEW {p[2]}",30)
    x+=i.width+PAD
sh.save(out, quality=92, method=6)
# checker preview for own look
ck=Image.new("RGBA",sh.size,(200,200,200,255)); cd=ImageDraw.Draw(ck)
for yy in range(0,sh.height,40):
    for xx in range(0,sh.width,40):
        if (xx//40+yy//40)%2: cd.rectangle((xx,yy,xx+39,yy+39),fill=(240,240,240,255))
ck.alpha_composite(sh); ck.convert("RGB").resize((sh.width//3,sh.height//3)).save(out.replace(".webp","_preview.jpg"),quality=80)
print(out, sh.size)
