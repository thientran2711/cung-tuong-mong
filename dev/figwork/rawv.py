# rawv.py out.jpg gen... : stack raw gens vertically (1400 px wide) for review
import sys,json,subprocess,os
from PIL import Image
db=json.load(open('urls.json')); out=sys.argv[1]; ims=[]
os.makedirs('raw',exist_ok=True)
for g in sys.argv[2:]:
    f=f"raw/{g}.png"
    if not os.path.exists(f): subprocess.run(["curl","-sS","-o",f,db[g]],check=True)
    im=Image.open(f).convert('RGB'); ims.append(im.resize((1400,int(im.height*1400/im.width))))
s=Image.new('RGB',(1400,sum(i.height for i in ims)),'white'); y=0
for i in ims: s.paste(i,(0,y)); y+=i.height
s.save(out,quality=85)
