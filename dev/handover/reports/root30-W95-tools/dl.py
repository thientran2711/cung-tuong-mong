import sys,subprocess
from PIL import Image
# usage: dl.py cNN sheetname dest=url ...   (dest relative to cNN/; raw ones make a contact sheet)
c=sys.argv[1];sn=sys.argv[2];ims=[]
for a in sys.argv[3:]:
    d,u=a.split("=",1);p=f"{c}/{d}"
    subprocess.run(["curl","-sS","-o",p,u],check=True);ims.append(p)
W=300;sh=Image.new("RGB",(W*len(ims),675),"white")
for i,p in enumerate(ims):
    im=Image.open(p).convert("RGBA");bg=Image.new("RGBA",im.size,(255,255,255,255));bg.alpha_composite(im);im=bg.convert("RGB");im.thumbnail((W,675));sh.paste(im,(i*W,0))
sh.save(f"{c}/{sn}.jpg",quality=80);print("ok",len(ims))
