import sys,subprocess,os,hashlib
from PIL import Image,ImageDraw
import numpy as np
# usage: fin2.py cNN aXX t8v0=url ... t7v2=url
c,a=sys.argv[1],sys.argv[2];m=dict(x.split("=",1) for x in sys.argv[3:])
os.makedirs("out",exist_ok=True)
fn=lambda l:f"out/{c}_{a}_{l[:2]}_{l[2:]}.png"
for l,u in m.items():
    if u.startswith("http"): subprocess.run(["curl","-sS","-o",fn(l),u],check=True)
cols=[fn(f"t8{v}") for v in("v0","v1","v2")]+[fn(f"t7{v}") for v in("v0","v1","v2")]
W=225;H=int(W*2.25)
sh=Image.new("RGB",(W*6+10,H+22),(255,255,255));d=ImageDraw.Draw(sh);x=0
for i,p in enumerate(cols):
    im=Image.open(p).convert("RGBA");im.thumbnail((W,H))
    sh.paste(im,(x+(W-im.size[0])//2,22),im);d.text((x+4,4),f"{c} {a} "+os.path.basename(p)[-9:-4],fill=(0,0,0));x+=W+(10 if i==2 else 0)
sh.save(f"out/{c}_{a}_sheet.jpg",quality=85)
for l in m:
    arr=np.array(Image.open(fn(l)).convert('RGBA'));op=arr[...,3]>200
    dark=((arr[...,:3].sum(2)<30)&op).sum()/max(op.sum(),1);tr=(arr[...,3]<10).mean()
    print(fn(l),Image.open(fn(l)).size,"transp",round(tr,2),"BLACKFILL!!!" if dark>0.02 else "ok",hashlib.md5(open(fn(l),'rb').read()).hexdigest())
