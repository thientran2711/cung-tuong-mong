# pv.py OUT.jpg JID... : raw-gen montage (2 cols) + strip of all heads (to check face/huadian/hair)
import sys,json,subprocess,io,os
from PIL import Image,ImageDraw
H=os.path.dirname(os.path.abspath(__file__))
subprocess.run(["python3",H+"/urls.py"],capture_output=True)
db=json.load(open(H+"/urls.json")); g={}
for l in open(H+"/gens.txt"):
    a=l.split(); g[a[0]]=a[1]
out=sys.argv[1]; js=sys.argv[2:]; W=760; Hh=380
rows=(len(js)+1)//2; M=Image.new("RGB",(W*2,(Hh+18)*rows),"white"); d=ImageDraw.Draw(M)
for i,j in enumerate(js):
    u=db[g[j]]; u=u+("&" if "?" in u else "?")+"w=1600&preview=1"
    b=subprocess.run(["curl","-s","--retry","4","--retry-all-errors",u],capture_output=True).stdout
    im=Image.open(io.BytesIO(b)).convert("RGB")
    x=(i%2)*W; y=(i//2)*(Hh+18); M.paste(im.resize((W,Hh)),(x,y+18)); d.text((x+5,y+3),j,fill="black")
M.save(out,quality=85); print(out,M.size)
