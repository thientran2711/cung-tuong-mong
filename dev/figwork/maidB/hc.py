# hc.py OUT.jpg JID... : crops the heads of the 48yo (4th) figure of each gen, side by side
import sys,json,subprocess,io,os
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__))
db=json.load(open(H+"/urls.json")); g={l.split()[0]:l.split()[1] for l in open(H+"/gens.txt") if len(l.split())>1}
ims=[]
for j in sys.argv[2:]:
    u=db[g[j]]; u=u+("&" if "?" in u else "?")+"w=2048&preview=1"
    im=Image.open(io.BytesIO(subprocess.run(["curl","-s","--retry","4",u],capture_output=True).stdout)).convert("RGB")
    W,Hh=im.size; ims.append(im.crop((int(W*.76),0,int(W*.98),int(Hh*.28))).resize((400,int(400*Hh*.28/(W*.22)))))
M=Image.new("RGB",(400*len(ims),ims[0].height),"white")
for i,x in enumerate(ims): M.paste(x,(400*i,0))
M.save(sys.argv[1],quality=85)
