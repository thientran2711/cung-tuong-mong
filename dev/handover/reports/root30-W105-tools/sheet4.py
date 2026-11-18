import sys,os,hashlib
from PIL import Image
import numpy as np
c=sys.argv[1];T=[1,4,5,6];W=300;H=int(W*2.25)
sh=Image.new("RGB",(W*4+6,(H+4)*4+4),"white")
def paste(p,col,row):
    im=Image.open(p).convert("RGBA");im.thumbnail((W,H));bg=Image.new("RGBA",im.size,(255,255,255,255));bg.alpha_composite(im)
    sh.paste(bg.convert("RGB"),(col*W+(W-im.size[0])//2,row*(H+4)+4))
for i,t in enumerate(T):
    paste(f"live_{c}_t{t}.webp",i,0)
    for k in range(3):
        p=f"{c}/{c}_a18_t{t}_v{k}.png";paste(p,i,k+1)
        a=np.array(Image.open(p).convert("RGBA"));op=a[...,3]>200
        print(p,Image.open(p).size,"BLACKFILL" if ((a[...,:3].sum(2)<30)&op).sum()/max(op.sum(),1)>.02 else "ok",hashlib.md5(open(p,'rb').read()).hexdigest()[:8])
sh.save(f"{c}/{c}_a18_low_sheet.jpg",quality=85);sh.thumbnail((600,1400));sh.save("prev.jpg")
