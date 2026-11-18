import sys,os,subprocess,hashlib
from PIL import Image
import numpy as np
c=sys.argv[1];os.makedirs(f"{c}/live",exist_ok=True)
W=230;H=int(W*2.25)  # 6 cols *230=1380 + gaps -> <=1400
sh=Image.new("RGB",(W*6+10,(H+4)*4+4),(255,255,255))
def paste(p,col,row):
    im=Image.open(p).convert("RGBA");im.thumbnail((W,H))
    bg=Image.new("RGBA",im.size,(255,255,255,255));bg.alpha_composite(im)
    sh.paste(bg.convert("RGB"),(col*W+(W-im.size[0])//2,row*(H+4)+4))
for t in range(1,7):
    lp=f"{c}/live/t{t}.webp"
    if not os.path.exists(lp): subprocess.run(["curl","-sS","-o",lp,f"https://ctm-img.victoria-tntt.workers.dev/img/hd/fig-consort-{c}-t{t}-a18.webp"],check=True)
    paste(lp,t-1,0)
    for k in range(3):
        paste(f"{c}/out/{c}_a18_t{t}_v{k}.png",t-1,k+1)
sh.save(f"{c}/{c}_a18_low_sheet.jpg",quality=85);print(sh.size)
for t in range(1,7):
  for k in range(3):
    p=f"{c}/out/{c}_a18_t{t}_v{k}.png";a=np.array(Image.open(p).convert("RGBA"));op=a[...,3]>200
    dark=((a[...,:3].sum(2)<30)&op).sum()/max(op.sum(),1)
    fr=(a[...,3]>0).mean()
    print(p.split('/')[-1],Image.open(p).size,"opaque%",round(op.mean()*100,1),"BLACKFILL" if dark>0.02 else "ok",hashlib.md5(open(p,'rb').read()).hexdigest()[:8])
