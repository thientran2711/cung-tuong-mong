# hz.py out.jpg gen... : full-res crop of the 4 heads (row per gen), for hair check
import sys,os,json,subprocess
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__))
subprocess.run(["python3",H+"/urls.py"],stdout=subprocess.DEVNULL); db=json.load(open(H+"/urls.json")); rows=[]
for g in sys.argv[2:]:
    f=f"{H}/bg/gen-{g}.png"
    if not os.path.exists(f): subprocess.run(["curl","-sS","--retry","6","--retry-all-errors","-o",f,db[g]],check=True)
    im=Image.open(f).convert("RGB"); im.thumbnail((2400,1200)); w,h=im.size
    rows.append(im.crop((0,int(h*0.02),w,int(h*0.2))).resize((1600,int(1600*0.18*h/w))))
S=Image.new("RGB",(1600,sum(r.height for r in rows))); y=0
for r in rows: S.paste(r,(0,y)); y+=r.height
S.save(sys.argv[1],quality=85)
