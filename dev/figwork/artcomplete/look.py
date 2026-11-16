# look.py OUT.jpg "label url" ... : download previews, stack them with labels into one contact sheet (for looking at new gens)
import sys,io,urllib.request
from PIL import Image,ImageDraw
out=sys.argv[1];rows=[]
for a in sys.argv[2:]:
    lab,u=a.split(" ",1)
    if "w=" not in u: u+=("&" if "?" in u else "?")+"w=1024&preview=1"
    im=Image.open(io.BytesIO(urllib.request.urlopen(u,timeout=60).read())).convert("RGB")
    im=im.resize((900,int(im.height*900/im.width)));d=ImageDraw.Draw(im);d.rectangle((0,0,140,22),fill="black");d.text((4,4),lab,fill="white");rows.append(im)
H=sum(r.height for r in rows);S=Image.new("RGB",(900,H),"white");y=0
for r in rows: S.paste(r,(0,y));y+=r.height
S.save(out,quality=80);print(out,S.size)
