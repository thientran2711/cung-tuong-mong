import sys,subprocess
from PIL import Image,ImageDraw
# args: out.jpg label=url ...
out=sys.argv[1];items=[a.split("=",1) for a in sys.argv[2:]]
W=266;H=600;sh=Image.new("RGB",(W*len(items),H+16),(255,255,255));d=ImageDraw.Draw(sh)
for i,(l,u) in enumerate(items):
    f=f"raw/{l}.png";subprocess.run(["curl","-sS","-o",f,u],check=True)
    im=Image.open(f).convert("RGBA");im.thumbnail((W,H));bg=Image.new("RGBA",im.size,(255,255,255,255));bg.alpha_composite(im)
    sh.paste(bg.convert("RGB"),(i*W,16));d.text((i*W+3,2),l,fill=(0,0,0))
sh.save(out,quality=80)
