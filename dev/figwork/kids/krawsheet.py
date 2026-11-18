# krawsheet.py out.jpg id... : raw generations (preview 1024 wide) stacked, from kraw.txt
import sys,subprocess,io
from PIL import Image,ImageDraw
U={l.split()[0]:l.split()[1] for l in open('kraw.txt') if l.strip()}
ims=[]
for i in sys.argv[2:]:
    b=subprocess.run(["curl","-sS",U[i]+"&w=1024&preview=1"],capture_output=True).stdout
    im=Image.open(io.BytesIO(b)).convert("RGB").resize((1000,500)); ImageDraw.Draw(im).text((8,8),i,fill=(150,0,0)); ims.append(im)
S=Image.new("RGB",(1000,500*len(ims)))
for k,im in enumerate(ims): S.paste(im,(0,500*k))
S.save(sys.argv[1],quality=85)
