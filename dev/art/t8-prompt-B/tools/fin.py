import sys,subprocess,os,hashlib
from PIL import Image
import numpy as np
c=sys.argv[1];age=sys.argv[2];m=dict(a.split("=",1) for a in sys.argv[3:])
os.makedirs("out",exist_ok=True)
B="https://ctm-img.victoria-tntt.workers.dev/img/"
def fn(l): return f"out/{c}_{age}_{l[:2]}_{l[2:]}.png"
for l,u in m.items():
    if u.startswith("http"): subprocess.run(["curl","-sS","-o",fn(l),u],check=True)
olds=[]
for v in("v0","v1","v2"):
    p=f"old_{c}_{age}_t8_{v}.png"
    if not os.path.exists(p):
        r=subprocess.run(["curl","-sS","-f","-o",p,f"{B}_review/consort-tiers/{c}/b10-{age}/{c}_{age}_t8_{v}.png"])
        if r.returncode!=0 and v=="v0":
            subprocess.run(["curl","-sS","-f","-o",p,f"{B}hd/fig-consort-{c}-t8-{age}.webp"])
    olds.append(p if os.path.exists(p) and os.path.getsize(p)>1000 else None)
cols=olds+[fn(f"t8{v}") for v in("v0","v1","v2")]+[fn(f"t7{v}") for v in("v0","v1","v2")]
W=155;H=int(W*2.25)
sh=Image.new("RGB",(W*9+16,H+24),(255,255,255))
x=0
for i,p in enumerate(cols):
    if p and os.path.exists(p):
        im=Image.open(p).convert("RGBA");im.thumbnail((W,H));sh.paste(im,(x+(W-im.size[0])//2,24),im)
    x+=W+(8 if i in(2,5) else 0)
sh.save(f"out/{c}_{age}_sheet.jpg",quality=85)
for l in m:
    a=np.array(Image.open(fn(l)).convert('RGBA'));op=a[...,3]>200
    dark=((a[...,:3].sum(2)<30)&op).sum()/max(op.sum(),1)
    if dark>0.02: print('!!! BLACK FILL',l,round(dark,3))
for l in m: print(fn(l),hashlib.md5(open(fn(l),'rb').read()).hexdigest(),Image.open(fn(l)).size)
