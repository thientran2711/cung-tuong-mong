# r1_sheets.py (reviewer R1): LIVE-CDN forehead contact sheets, per style 9 cols (t1..t8,cold) x ages rows.
# usage: r1_sheets.py PORDIR OUTPREFIX AGES(comma) PER_SHEET
import sys,os,json,re
import numpy as np
from PIL import Image,ImageDraw
pd,pre=sys.argv[1:3]; ages=[int(a) for a in sys.argv[3].split(',')]; per=int(sys.argv[4])
here=os.path.dirname(os.path.abspath(__file__))
L={}
for l in open(here+'/log_por.jsonl'):
    x=json.loads(l); L[x['name']]=x
styles=sorted({re.match(r'por-(.*)-t(?:\d|cold)-a\d+\.webp',f).group(1) for f in os.listdir(pd)})
W,H=130,120; cols=['t1','t2','t3','t4','t5','t6','t7','t8','tcold']
def tile(st,t,a):
    p=f'{pd}/por-{st}-{t}-a{a}.webp'
    if not os.path.exists(p): return Image.new('RGB',(W,H),(255,0,0))
    x=L.get(f'por-{st}-{t}-a{a}') or L.get(f'por-{st}-t1-a{a}') or L.get(f'por-{st}-t3-a{a}') or {}
    im=Image.open(p).convert('RGBA'); b=Image.new('RGBA',im.size,(236,231,224,255)); b.alpha_composite(im); im=b.convert('RGB')
    c=x.get('cx',193); e=x.get('ey',203); f=x.get('fw',133)
    box=(c-0.34*f,e-0.66*f,c+0.34*f,e-0.02*f)
    return im.crop(tuple(int(round(v)) for v in box)).resize((W,H),Image.LANCZOS)
for s in range(0,len(styles),per):
    sh=Image.new('RGB',(9*W,per*len(ages)*H),(255,255,255)); d=ImageDraw.Draw(sh)
    for r,st in enumerate(styles[s:s+per]):
        for ai,a in enumerate(ages):
            for ci,t in enumerate(cols):
                y=(r*len(ages)+ai)*H; sh.paste(tile(st,t,a),(ci*W,y))
                d.text((ci*W+3,y+2),f"{st.replace('consort-','').replace('maid-','')} {t} a{a}",fill=(0,0,255))
    sh.save(f'{pre}_{s//per:02d}.png')
print(len(styles),styles[:3],styles[-3:])
