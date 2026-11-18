import sys,subprocess,os,hashlib,numpy as np
from PIL import Image
S="/tmp/claude-0/-home-user-cung-tuong-mong/5565c174-50c8-5868-80e8-39f4da97694c/scratchpad"
R=S+"/cdnroot";D=R+"/img/_review/t8-reprompt/"
c,age=sys.argv[1:3];m=dict(a.split("=",1) for a in sys.argv[3:])  # t8v0=url ...
def fn(l): return f"{D}{c}_{age}_{l[:2]}_{l[2:]}.png"
for l,u in m.items():
    if u.startswith("http"): subprocess.run(["curl","-sS","-o",fn(l),u],check=True)
B="https://ctm-img.victoria-tntt.workers.dev/img/hd/fig-consort-%s-t8-%s.webp"%(c,age)
subprocess.run(["curl","-sS","-o",f"{S}/old_{c}_{age}.webp",B])
cols=[f"{S}/old_{c}_{age}.webp"]+[fn(f"t8v{k}") for k in range(3)]+[fn(f"t7v{k}") for k in range(3)]
W=190;H=int(W*2.25);sh=Image.new("RGB",(W*7+16,H+4),(255,255,255));x=0
for i,p in enumerate(cols):
    try: im=Image.open(p).convert("RGBA")
    except Exception as e: print("miss",p);continue
    im.thumbnail((W,H));sh.paste(im,(x+(W-im.size[0])//2,2),im);x+=W+(8 if i in(0,3) else 0)
sh.save(f"{D}{c}_{age}_sheet.jpg",quality=85)
for l in m:
    a=np.array(Image.open(fn(l)).convert('RGBA'));op=a[...,3]>200
    print(l,Image.open(fn(l)).size,'alpha%',round(op.mean()*100),'dark',round(((a[...,:3].sum(2)<30)&op).sum()/max(op.sum(),1),3),hashlib.md5(open(fn(l),'rb').read()).hexdigest()[:8])
fs=[f"img/_review/t8-reprompt/{c}_{age}_{t}_v{k}.png" for t in("t7","t8") for k in range(3)]+[f"img/_review/t8-reprompt/{c}_{age}_sheet.jpg"]
os.chdir(R);r=subprocess.run(["python3","dev/site/cdn_sync.py"]+fs,capture_output=True,text=True);print(r.stdout[-300:],r.stderr[-300:])
r=subprocess.run(["python3","dev/site/cdn_sync.py","--check"]+fs,capture_output=True,text=True);print("check rc",r.returncode,r.stdout[-200:])
