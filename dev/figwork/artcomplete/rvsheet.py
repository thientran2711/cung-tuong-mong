# rvsheet.py out.jpg row1 row2 ...   each row = comma list of img paths (local img/ or CDN name); renders at height H on grey
import sys,os,urllib.request,io
from PIL import Image,ImageDraw
H=int(os.environ.get("H","300"));BASE="https://ctm-img.victoria-tntt.workers.dev/img/"
def load(p):
    if os.path.exists(p):return Image.open(p).convert("RGBA")
    return Image.open(io.BytesIO(urllib.request.urlopen(urllib.request.Request(BASE+os.path.basename(p),headers={"User-Agent":"curl/8"})).read())).convert("RGBA")
rows=[]
for r in sys.argv[2:]:
    ims=[load(p) for p in r.split(",")];ims=[i.resize((max(1,int(i.width*H/i.height)),H)) for i in ims];rows.append(ims)
W=max(sum(i.width+6 for i in r) for r in rows);s=Image.new("RGB",(W,H*len(rows)+4*len(rows)),(200,200,200))
for y,r in enumerate(rows):
    x=0
    for i in r: s.paste(i,(x,y*(H+4)),i);x+=i.width+6
s.save(sys.argv[1],quality=82)
