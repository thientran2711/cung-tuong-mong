# fc.py OUT GEN... : top band (faces) of each raw gen, stacked
import sys,json,subprocess,os
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__)); db=json.load(open(H+'/urls.json'))
rows=[]
for g in sys.argv[2:]:
    f=f'{H}/rawprev/{g}_full.png'
    if not os.path.exists(f): subprocess.run(['curl','-sS','-o',f,db[g]],check=True)
    im=Image.open(f).convert('RGB'); w,h=im.size
    b=im.crop((0,int(h*0.06),w,int(h*0.2))).resize((2000,int(2000*0.14*h/w))); rows.append(b)
S=Image.new('RGB',(2000,sum(r.height for r in rows)),'white'); y=0
for r in rows: S.paste(r,(0,y)); y+=r.height
S.save(sys.argv[1],quality=85)
