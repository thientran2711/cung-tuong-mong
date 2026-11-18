import sys,subprocess,os
from PIL import Image
# usage: rawsheet.py tag label=url ...
tag=sys.argv[1];ims=[]
for a in sys.argv[2:]:
    l,u=a.split("=",1);subprocess.run(["curl","-sS","-o",f"raw_{tag}_{l}.png",u],check=True);ims.append((l,Image.open(f"raw_{tag}_{l}.png").convert("RGB")))
W=300;H=675;n=len(ims)
s=Image.new("RGB",(n*W,H+200),(255,255,255))
for i,(l,im) in enumerate(ims):
    w,h=im.size;s.paste(im.resize((W,int(h*W/w))).crop((0,0,W,H)),(i*W,0))
    f=im.crop((int(w*.2),0,int(w*.8),int(h*.17)));f=f.resize((W,int(f.size[1]*W/f.size[0])));s.paste(f.crop((0,0,W,200)),(i*W,H))
s.save(f"rs_{tag}.jpg",quality=80);print(s.size)
