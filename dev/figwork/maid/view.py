# view.py out.jpg id... : stack gen previews (1024 wide) vertically for checking
import sys,os,json,subprocess
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__))
subprocess.run(["python3",H+"/urls.py"],stdout=subprocess.DEVNULL)
db=json.load(open(H+"/urls.json")); ims=[]
for i in sys.argv[2:]:
    f=f"{H}/bg/pv-{i}.png"
    if not os.path.exists(f): subprocess.run(["curl","-sS","--retry","6","--retry-all-errors","-o",f,db[i]+"&w=1024&preview=1"],check=True)
    im=Image.open(f).convert("RGB"); im.thumbnail((1024,1024)); ims.append(im)
S=Image.new("RGB",(1024,sum(i.height for i in ims)+6*len(ims)),(0,0,0)); y=0
for im in ims: S.paste(im,(0,y)); y+=im.height+6
S.save(sys.argv[1],quality=85); print(S.size)
