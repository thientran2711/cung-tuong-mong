# sheetrv.py out.jpg sheetsfile jid... : download raw sheets and tile 2 per row
import sys,json,os,subprocess
from PIL import Image, ImageDraw
W=os.path.dirname(os.path.abspath(__file__)); db=json.load(open(W+"/urls.json"))
m=dict(l.split()[:2] for l in open(W+"/"+sys.argv[2]) if l.strip() and not l.startswith("#"))
js=sys.argv[3:]; TW=700; TH=350
sh=Image.new("RGB",(2*TW,((len(js)+1)//2)*(TH+14)),"white"); d=ImageDraw.Draw(sh)
for k,j in enumerate(js):
    p=f"{W}/raw/{j}.png"
    if not os.path.exists(p): subprocess.run(["curl","-sS","-o",p,db[m[j]]],check=True)
    im=Image.open(p).convert("RGB"); im.thumbnail((TW,TH))
    x=(k%2)*TW; y=(k//2)*(TH+14); sh.paste(im,(x,y)); d.text((x+4,y+TH+1),j,fill=(0,0,0)); im.close()
sh.save(sys.argv[1],quality=85); print(sh.size)
