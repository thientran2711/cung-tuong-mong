import sys,subprocess,os,hashlib
import numpy as np
from PIL import Image
# usage: fin.py cNN aXX t8v0=url ... ; downloads cuts to out/, black-fill check, sheet (t8 v0-2 | t7 v0-2)
c,a=sys.argv[1],sys.argv[2];m=dict(x.split("=",1) for x in sys.argv[3:])
os.makedirs("out",exist_ok=True)
fn=lambda l:f"out/{c}_{a}_{l[:2]}_{l[2:]}.png"
for l,u in m.items():
    if u.startswith("http"): subprocess.run(["curl","-sS","-o",fn(l),u],check=True)
cols=[fn(f"t8{v}") for v in("v0","v1","v2")]+[fn(f"t7{v}") for v in("v0","v1","v2")]
W=230;H=int(W*2.25);sh=Image.new("RGB",(W*6,H),(255,255,255))
for i,p in enumerate(cols):
    if not os.path.exists(p): continue
    im=Image.open(p).convert("RGBA");im.thumbnail((W,H));sh.paste(im,(i*W+(W-im.size[0])//2,0),im)
sh.save(f"out/{c}_{a}_t7t8_sheet.jpg",quality=85)
for l in m:
    x=np.array(Image.open(fn(l)).convert('RGBA'));op=x[...,3]>200
    d=((x[...,:3].sum(2)<30)&op).sum()/max(op.sum(),1)
    if d>0.02: print('!!! BLACK FILL',l,round(d,3))
    print(fn(l),hashlib.md5(open(fn(l),'rb').read()).hexdigest(),Image.open(fn(l)).size,"alpha%",round(float((x[...,3]<10).mean()),2))
