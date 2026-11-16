# sheet_style.py: review sheets: per style 8 tiers x 4 ages (rows=age), AFTER image (changed file if present else source), forehead crop.
# usage (cwd=work): sheet_style.py KIND OUTDIR SRCDIR LOG OUTPREFIX [styles per sheet=2] [filter]    KIND por|fig|hd
import sys,os,json,re
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import numpy as np
from PIL import Image,ImageDraw
kind,od,sd,logf,pre=sys.argv[1:6]; per=int(sys.argv[6]) if len(sys.argv)>6 else 2; flt=sys.argv[7] if len(sys.argv)>7 else ''
REF=json.load(open(os.path.dirname(os.path.abspath(__file__))+'/ref.json'))
L={}
for l in open(logf):
    x=json.loads(l); L[x['name']]=x
styles=sorted({re.match(r'(?:por|fig)-(.*)-t\d-a\d+',n).group(1) for n in L if flt in n})
W,H=150,130
def tile(n,Z):
    x=L.get(n,{}); changed=x.get('status')=='shrunk'
    if kind!='por' and not x.get('crop'): return Image.new('RGB',(W,H),(225,225,225)),changed
    p=f'{od}/{n}.webp' if changed else f'{sd}/{n}.webp'
    if not os.path.exists(p): return Image.new('RGB',(W,H),(255,0,0)),changed
    im=Image.open(p).convert('RGBA'); b=Image.new('RGBA',im.size,(236,231,224,255)); b.alpha_composite(im); im=b.convert('RGB')
    if kind=='por': c=x.get('cx',193); e=x.get('ey',203); f=x.get('fw',133); box=(c-0.34*f,e-0.66*f,c+0.34*f,e-0.02*f)
    else: box=x.get('crop') or (0,0,60,50)
    t=im.crop(tuple(int(round(v)) for v in box)).resize((W,H),Image.LANCZOS)
    return t,changed
for s in range(0,len(styles),per):
    sh=Image.new('RGB',(8*W,per*4*H),(255,255,255)); d=ImageDraw.Draw(sh)
    for r,st in enumerate(styles[s:s+per]):
        for ai,a in enumerate((18,26,36,51)):
            for t in range(1,9):
                n=f'{kind if kind!="hd" else "fig"}-{st}-t{t}-a{a}'
                if kind=='hd': n=f'fig-{st}-t{t}-a{a}'
                tl,ch=tile(n,1); sh.paste(tl,((t-1)*W,(r*4+ai)*H))
                d.text(((t-1)*W+3,(r*4+ai)*H+2),f"{st.replace('consort-','').replace('maid-','')} t{t} a{a}"+(' *' if ch else ''),fill=(0,0,255))
    sh.save(f'{pre}_{s//per:02d}.png')
print(len(styles))
