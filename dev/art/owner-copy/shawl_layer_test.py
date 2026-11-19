import sys,numpy as np
from PIL import Image
S="/tmp/claude-0/-home-user-cung-tuong-mong/bfd5eb66-ea2d-59f8-a288-6d7ea7aa7c6a/scratchpad/"
sh=Image.open(S+"shawl.png").convert("RGBA"); sh=sh.crop(sh.getbbox())
def comp(figp,out,front=(0.28,0.45)):
    f=Image.open(figp).convert("RGBA"); a=np.array(f)[:,:,3]>40
    ys,xs=np.where(a); top,bot=ys.min(),ys.max(); H=bot-top
    sy=int(top+0.19*H)   # shoulder line
    row=np.where(a[sy])[0]; x0,x1=row.min(),row.max(); cx=(x0+x1)/2; sw=x1-x0
    W=int(sw*1.35); hh=int(sh.height*W/sh.width)
    hh=min(hh,int(0.78*H)); W=int(sh.width*hh/sh.height)
    s=sh.resize((W,hh),Image.LANCZOS)
    px,py=int(cx-W/2),int(sy-0.05*H)
    back=Image.new("RGBA",f.size,(0,0,0,0)); back.paste(s,(px,py),s)
    fr=s.copy(); m=np.array(fr); n=m.shape[0]
    m[:int(front[0]*n),:,3]=0; m[int(front[1]*n):,:,3]=0
    fr=Image.fromarray(m); frl=Image.new("RGBA",f.size,(0,0,0,0)); frl.paste(fr,(px,py),fr)
    outi=Image.alpha_composite(Image.alpha_composite(back,f),frl)
    outi.save(out); return outi
a=comp("send/Luot260_m19_t5_NOSHAWL.png","send/Luot265_khan_tach_lop_nguoi1_m19.png")
b=comp("v2_c20_t4.png" if False else "n_t5.png","send/Luot265_khan_tach_lop_nguoi2_c20.png")
v=Image.new("RGB",(2*1024+30,2304),(60,60,60)); v.paste(a,(10,0),a); v.paste(b,(1044,0),b); v.resize((517,576)).save(S+"comp_v.jpg")
