import sys,subprocess,os,hashlib
from PIL import Image
# fin.py cNN aXX t8v0=url t8v1=url t8v2=url t7v0=url t7v1=url t7v2=url
c,a=sys.argv[1:3];m=dict(x.split("=",1) for x in sys.argv[3:])
D="/tmp/claude-0/w/img/_review/t8-reprompt";os.makedirs(D,exist_ok=True)
fn=lambda l:f"{D}/{c}_{a}_{l[:2]}_{l[2:]}.png"
for l,u in m.items(): subprocess.run(["curl","-sS","-o",fn(l),u],check=True)
cols=[fn(f"t8v{k}") for k in range(3)]+[fn(f"t7v{k}") for k in range(3)]
W=230;H=int(W*2.25);sh=Image.new("RGB",(W*6+20,H),(255,255,255));x=0
for i,p in enumerate(cols):
    im=Image.open(p).convert("RGBA");im.thumbnail((W,H));sh.paste(im,(x+(W-im.size[0])//2,0),im);x+=W+(10 if i==2 else 0)
sh.save(f"{D}/{c}_{a}_sheet.jpg",quality=85)
import numpy as np
for p in cols:
    im=Image.open(p);t=np.array(im.convert("RGBA"))
    print(os.path.basename(p),hashlib.md5(open(p,'rb').read()).hexdigest()[:8],im.size,"alpha-transparent%",round(100*(t[...,3]<10).mean()))
