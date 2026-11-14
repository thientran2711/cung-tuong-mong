# rawheads.py out.jpg gen... : top band (heads) of raw lineups, one row per gen (art8)
import sys,json,os,subprocess
from PIL import Image,ImageDraw
db=json.load(open(os.path.dirname(os.path.abspath(__file__))+'/urls.json')); rows=[]
for g in sys.argv[2:]:
    f=f'raw/{g}.png'
    if not os.path.exists(f): subprocess.run(['curl','-sS','-o',f,db[g]],check=True)
    im=Image.open(f).convert('RGB'); w,h=im.size; r=im.crop((0,0,w,int(h*0.2))).resize((1600,round(1600*h*0.2/w)))
    ImageDraw.Draw(r).text((5,5),g,fill='red'); rows.append(r)
o=Image.new('RGB',(1600,sum(r.height for r in rows))); y=0
for r in rows: o.paste(r,(0,y)); y+=r.height
o.save(sys.argv[1],quality=85)
