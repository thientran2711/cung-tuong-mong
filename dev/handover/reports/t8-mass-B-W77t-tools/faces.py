import sys
from PIL import Image
n=["t8v0","t8v1","t8v2","t7v0","t7v1","t7v2"]
ims=[Image.open(f"raw/{k}.png").convert("RGB") for k in n]
W=500;H=420;sh=Image.new("RGB",(W*3,H*2))
for i,im in enumerate(ims):
    w,h=im.size;f=im.crop((int(w*.25),int(h*.03),int(w*.75),int(h*.2)));f=f.resize((W,int(f.size[1]*W/f.size[0])))
    sh.paste(f.crop((0,0,W,H)),((i%3)*W,(i//3)*H))
sh.save(sys.argv[1],quality=88)
