# rv.py out.jpg [W=1000] ref:new ... : rows of [t1 ref lineup | new lineup] raw images (from urls.json), for quick review
import sys,os,json,subprocess
from PIL import Image, ImageDraw
W=os.path.dirname(os.path.abspath(__file__)); db=json.load(open(W+"/urls.json"))
out=sys.argv[1]; pairs=[a.split(":") for a in sys.argv[2:]]; CW=int(os.environ.get("CW",800)); CH=CW//2
def get(i):
    p=f"{W}/raw/{i}.png"
    if not os.path.exists(p): subprocess.run(["curl","-sS","-o",p,db[i]],check=True)
    return Image.open(p).convert("RGB")
ncol=max(len(p) for p in pairs)
sh=Image.new("RGB",(CW*ncol,CH*len(pairs)),(255,255,255)); d=ImageDraw.Draw(sh)
for r,p in enumerate(pairs):
    for c,i in enumerate(p):
        if not i: continue
        im=get(i); im.thumbnail((CW,CH)); sh.paste(im,(c*CW,r*CH)); d.text((c*CW+4,r*CH+4),i,fill=(200,0,0))
sh.save(out,quality=82); print(sh.size)
