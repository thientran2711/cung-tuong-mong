# python3 sheet.py OUT.jpg key1 key2 ...  -> labelled grid (6 cols, 240px tiles + 96px mini to judge small size)
import sys,os,json
from PIL import Image,ImageDraw,ImageFont
H=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.abspath(os.path.join(H,'../../..'))
D=json.load(open(os.path.join(H,'acts_list.json'))); NM={a['key']:a['names'][0] for a in D['acts']}
NM.update({'cat-'+k:'['+v['label']+']' for k,v in D['categories'].items()})
out,keys=sys.argv[1],sys.argv[2:]; T=240; C=6; LH=40
try: F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',13)
except: F=ImageFont.load_default()
TH=round((T-8)*506/384)+8; R=(len(keys)+C-1)//C; W=Image.new('RGB',(C*T,R*(TH+LH)),'#f4ecdd'); d=ImageDraw.Draw(W)
for i,k in enumerate(keys):
    x,y=(i%C)*T,(i//C)*(TH+LH); im=Image.open(os.path.join(ROOT,'img','act-'+k+'.webp')).convert('RGB')
    W.paste(im.resize((T-8,round((T-8)*506/384))),(x+4,y+4)); W.paste(im.resize((72,95)),(x+T-80,y+TH-99))
    d.text((x+4,y+TH),k,fill='#5a1e14',font=F); d.text((x+4,y+TH+17),NM.get(k,'')[:34],fill='#333',font=F)
W.save(out,quality=85); print(out,W.size)
