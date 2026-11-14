# rv.py OUT.jpg GENID... : download previews (1024px) of raw gens, label, stack 2 columns -> one review sheet
import sys,json,os,subprocess
from PIL import Image,ImageDraw
H=os.path.dirname(os.path.abspath(__file__))
subprocess.run(["python3",H+"/urls.py"],stdout=subprocess.DEVNULL)
db=json.load(open(H+"/urls.json"))
lab={}
for l in open(H+"/gens.txt"):
    p=l.split()
    if len(p)>=2: lab[p[1]]=p[0]
ims=[]
for g in sys.argv[2:]:
    f=f"{H}/rawprev/{g}.jpg"
    if not os.path.exists(f):
        u=db[g]; u=u+("&" if "?" in u else "?")+"w=1024&preview=1" if "preview" not in u else u
        subprocess.run(["curl","-sS","--retry","4","-o",f+".png",u],check=True)
        Image.open(f+".png").convert("RGB").resize((1024,512)).save(f,quality=88); os.remove(f+".png")
    im=Image.open(f); d=ImageDraw.Draw(im); d.rectangle((0,0,170,22),fill=(255,255,255)); d.text((4,4),lab.get(g,g),fill=(200,0,0)); ims.append(im)
rows=(len(ims)+1)//2; S=Image.new("RGB",(2048,512*rows),"white")
for k,im in enumerate(ims): S.paste(im,((k%2)*1024,(k//2)*512))
S.save(sys.argv[1],quality=85); print("ok",len(ims))
