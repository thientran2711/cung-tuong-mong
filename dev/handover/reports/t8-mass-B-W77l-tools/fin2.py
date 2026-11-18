import sys,subprocess,os,hashlib
from PIL import Image
import numpy as np
c,a=sys.argv[1],sys.argv[2];m=dict(x.split("=",1) for x in sys.argv[3:])
B="https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/"
os.makedirs("out",exist_ok=True)
fn=lambda l:f"out/{c}_{a}_{l[:2]}_{l[2:]}.png"
for l,u in m.items(): subprocess.run(["curl","-sS","-o",fn(l),u],check=True)
fold="b10" if a=="a18" else f"b10-{a}"
for v in("v0","v1","v2"):
    p=f"old_{c}_{a}_t8_{v}.png"
    if not os.path.exists(p): subprocess.run(["curl","-sS","-f","-o",p,f"{B}{c}/{fold}/{c}_{a}_t8_{v}.png"])
cols=[f"old_{c}_{a}_t8_{v}.png" for v in("v0","v1","v2")]+[fn(f"t8{v}") for v in("v0","v1","v2")]+[fn(f"t7{v}") for v in("v0","v1","v2")]
W=155;H=int(W*2.25);sh=Image.new("RGB",(W*9+16,H+24),(255,255,255));x=0
for i,p in enumerate(cols):
    if os.path.exists(p) and os.path.getsize(p)>1000:
        try:
            im=Image.open(p).convert("RGBA");im.thumbnail((W,H));sh.paste(im,(x+(W-im.size[0])//2,24),im)
        except Exception as e: pass
    x+=W+(8 if i in(2,5) else 0)
sh.save(f"out/{c}_{a}_sheet.jpg",quality=85)
for l in m:
    arr=np.array(Image.open(fn(l)).convert('RGBA'));op=arr[...,3]>200
    print(fn(l),Image.open(fn(l)).size,'alpha_min',arr[...,3].min(),'dark',round(((arr[...,:3].sum(2)<30)&op).sum()/max(op.sum(),1),3),hashlib.md5(open(fn(l),'rb').read()).hexdigest())
