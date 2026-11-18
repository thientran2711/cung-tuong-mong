import sys,subprocess,os,hashlib
from PIL import Image
c=sys.argv[1];m=dict(a.split("=",1) for a in sys.argv[2:])
os.makedirs("out",exist_ok=True)
def fn(l): return f"out/{c}_a18_{l[:2]}_{l[2:]}.png"
for l,u in m.items():
    if u.startswith("http"): subprocess.run(["curl","-sS","-o",fn(l),u],check=True)
for v in("v0","v1","v2"):
    p=f"old_{c}_t8_{v}.png"
    if not os.path.exists(p): subprocess.run(["curl","-sS","-o",p,f"https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/{c}/b10/{c}_a18_t8_{v}.png"])
cols=[f"old_{c}_t8_{v}.png" for v in("v0","v1","v2")]+[fn(f"t8{v}") for v in("v0","v1","v2")]+[fn(f"t7{v}") for v in("v0","v1","v2")]
W=155;H=int(W*2.25)
sh=Image.new("RGB",(W*9+16,H+24),(255,255,255))
x=0
for i,p in enumerate(cols):
    if not os.path.exists(p): continue
    im=Image.open(p).convert("RGBA");im.thumbnail((W,H));
    sh.paste(im,(x+(W-im.size[0])//2,24),im);x+=W+(8 if i in(2,5) else 0)
sh.save(f"out/{c}_sheet.jpg",quality=85)
import numpy as np
for l in m:
    a=np.array(Image.open(fn(l)).convert('RGBA'));op=a[...,3]>200
    dark=((a[...,:3].sum(2)<30)&op).sum()/max(op.sum(),1)
    if dark>0.02: print('!!! BLACK FILL',l,round(dark,3))
for l in m: print(fn(l),hashlib.md5(open(fn(l),'rb').read()).hexdigest(),Image.open(fn(l)).size)
