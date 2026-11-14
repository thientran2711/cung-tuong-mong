# hd8.py gen1..gen8 : save huadian_c03_t1..t8.jpg (close-up 1200px) + side-by-side zoom of the brow area (2 rows x 4)
import sys,json,subprocess,os
from PIL import Image,ImageDraw
db=json.load(open('urls.json')); G=sys.argv[1:]; S="../wt-art7/dev/figwork/sheets"
ims=[]
for n,g in enumerate(G,1):
    f=f"raw/{g}.png"
    if not os.path.exists(f): subprocess.run(["curl","-sS","-o",f,db[g]],check=True)
    im=Image.open(f).convert('RGB'); im.resize((1200,1200),Image.LANCZOS).save(f"{S}/huadian_c03_t{n}.jpg",quality=90); ims.append(im)
W=ims[0].width; z=Image.new('RGB',(4*500,2*540),'white'); d=ImageDraw.Draw(z)
for k,i in enumerate(ims):
    c=i.crop((int(W*0.36),int(W*0.17),int(W*0.64),int(W*0.45))).resize((500,500)); x,y=(k%4)*500,(k//4)*540
    z.paste(c,(x,y+40)); d.text((x+10,y+10),f"bac {k+1}",fill='black')
z.save(f"{S}/huadian_c03_8nac.jpg",quality=90)
