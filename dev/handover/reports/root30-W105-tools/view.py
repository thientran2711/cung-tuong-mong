import sys,subprocess
from PIL import Image
# view.py out.jpg name=url ... : saves raw/<name>.png, contact sheet
out=sys.argv[1];ims=[]
for a in sys.argv[2:]:
    n,u=a.split("=",1);p=f"raw/{n}.png"
    subprocess.run(["curl","-sS","-o",p,u],check=True);ims.append(Image.open(p).convert("RGB"))
W=190;H=428;sh=Image.new("RGB",(W*len(ims),H),"white")
for i,im in enumerate(ims):
    im.thumbnail((W,H));sh.paste(im,(i*W,0))
sh.save(out,quality=80)
