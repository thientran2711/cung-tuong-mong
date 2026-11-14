# fc.py OUT.jpg GENID... : head crops of all four figures of each raw gen (rows = gens)
import sys,json,subprocess,io,os
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__))
subprocess.run(["python3",H+"/urls.py"],capture_output=True)
db=json.load(open(H+"/urls.json")); rows=[]
for g in sys.argv[2:]:
    u=db[g]; u=u+("&" if "?" in u else "?")+"w=3000&preview=1"
    im=Image.open(io.BytesIO(subprocess.run(["curl","-s","--retry","4",u],capture_output=True).stdout)).convert("RGB")
    W,Hh=im.size; r=Image.new("RGB",(1600,360),"white")
    for k in range(4):
        r.paste(im.crop((int(W*k/4),0,int(W*(k+1)/4),int(Hh*.22))).resize((400,360)),(400*k,0))
    rows.append(r)
M=Image.new("RGB",(1600,360*len(rows)),"white")
for i,r in enumerate(rows): M.paste(r,(0,360*i))
M.save(sys.argv[1],quality=88); print("ok")
