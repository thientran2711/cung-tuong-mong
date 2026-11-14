# hdface.py g1..g8 : full-face previews (top of head to chin) huadian_c03_face_t1..t8.jpg + a 4x2 overview
import sys,json,subprocess,os
from PIL import Image,ImageDraw
db=json.load(open('urls.json')); S="../wt-art7/dev/figwork/sheets"; ims=[]
for n,g in enumerate(sys.argv[1:],1):
    f=f"raw/{g}.png"
    if not os.path.exists(f): subprocess.run(["curl","-sS","-o",f,db[g]],check=True)
    im=Image.open(f).convert('RGB'); W=im.width
    c=im.crop((int(W*0.16),int(W*0.0),int(W*0.84),int(W*0.80))).resize((900,1059),Image.LANCZOS)
    c.save(f"{S}/huadian_c03_face_t{n}.jpg",quality=90); ims.append(c)
o=Image.new('RGB',(4*450,2*560),'white'); d=ImageDraw.Draw(o)
for k,c in enumerate(ims):
    x,y=(k%4)*450,(k//4)*560; o.paste(c.resize((450,530)),(x,y+30)); d.text((x+8,y+8),f"bac {k+1}",fill='black')
o.save(f"{S}/huadian_c03_face_all.jpg",quality=88)
