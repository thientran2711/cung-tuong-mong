# pv.py OUT.jpg JID... : quick-look montage of raw gens (preview 1024w) with t1 ref thumb, 2 columns
import sys,json,subprocess,io,os
from PIL import Image,ImageDraw
H=os.path.dirname(os.path.abspath(__file__))
subprocess.run(["python3",H+"/urls.py"],capture_output=True)
db=json.load(open(H+"/urls.json")); g={}
for l in open(H+"/gens.txt"):
    a=l.split(); g[a[0]]=a[1] if len(a)>1 else None
out=sys.argv[1]; js=sys.argv[2:]; W=900; Hh=450; HW=225
cols=2; rows=(len(js)+1)//2; M=Image.new("RGB",(W*cols,(Hh+20)*rows+170),"white"); d=ImageDraw.Draw(M)
for i,j in enumerate(js):
    u=db[g[j]]; u=u+("&" if "?" in u else "?")+"w=2048&preview=1"
    for t in range(6):
        b=subprocess.run(["curl","-s","--retry","4","--retry-all-errors",u],capture_output=True).stdout
        try: big=Image.open(io.BytesIO(b)).convert("RGB"); break
        except Exception: pass
    im=big.resize((W,Hh)); BW,BH=big.size
    hd=big.crop((int(BW*.77),0,int(BW*.97),int(BH*.25))).resize((HW,170)); M.paste(hd,(HW*i,(Hh+20)*rows))
    x=(i%cols)*W; y=(i//cols)*(Hh+20); M.paste(im,(x,y+20)); d.text((x+5,y+4),j,fill="black")
M.save(out,quality=85); print(out,M.size)
