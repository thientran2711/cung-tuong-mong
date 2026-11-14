# crop.py OUT GEN x0 y0 x1 y1 (fractions) : crop region of full-res gen
import sys,json,subprocess,os
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__)); db=json.load(open(H+"/urls.json"))
o,g=sys.argv[1],sys.argv[2]; f=f"{H}/rawprev/{g}.full.png"
if not os.path.exists(f): subprocess.run(["curl","-sS","--retry","4","-o",f,db[g]],check=True)
im=Image.open(f); W,Hh=im.size; x0,y0,x1,y1=map(float,sys.argv[3:7])
c=im.crop((int(x0*W),int(y0*Hh),int(x1*W),int(y1*Hh))); c.thumbnail((1600,1600)); c.convert("RGB").save(o,quality=85)
