import sys,subprocess
from PIL import Image
# usage: dl.py out_prefix label=url ...  -> downloads raw gens to raw/<label>.png and makes face+body review sheet raw_<prefix>.jpg
import os
os.makedirs("raw",exist_ok=True)
pre=sys.argv[1];items=[a.split("=",1) for a in sys.argv[2:]]
ims=[]
for l,u in items:
    subprocess.run(["curl","-sS","-o",f"raw/{l}.png",u],check=True)
    ims.append((l,Image.open(f"raw/{l}.png").convert("RGB")))
n=len(ims);W=330;H=740
sheet=Image.new("RGB",(n*W,H+230),(255,255,255))
for i,(l,im) in enumerate(ims):
    w,h=im.size
    b=im.resize((W,int(h*W/w)));sheet.paste(b.crop((0,0,W,H)),(i*W,0))
    f=im.crop((int(w*.15),0,int(w*.85),int(h*.2)));f=f.resize((W,int(f.size[1]*W/f.size[0])));sheet.paste(f.crop((0,0,W,230)),(i*W,H))
sheet.save(f"raw_{pre}.jpg",quality=82)
