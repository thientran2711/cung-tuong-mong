# r1_wide.py (reviewer R1): wide forehead crops for explicit names. usage: r1_wide.py PORDIR OUTPREFIX names.txt [name_a18_neighbour: also shows a18 beside]
import sys,os,json
from PIL import Image,ImageDraw
pd,pre,lst=sys.argv[1:4]
L={}
for l in open(os.path.dirname(os.path.abspath(__file__))+'/log_por.jsonl'):
    x=json.loads(l); L[x['name']]=x
names=open(lst).read().split()
TW,TH=300,270; cols,rows=4,3
for s in range(0,len(names),cols*rows):
    sh=Image.new('RGB',(cols*TW,rows*TH),(255,255,255)); d=ImageDraw.Draw(sh)
    for i,n in enumerate(names[s:s+cols*rows]):
        x=L[n]; c,e,f=x['cx'],x['ey'],x['fw']
        im=Image.open(f'{pd}/{n}.webp').convert('RGBA'); b=Image.new('RGBA',im.size,(236,231,224,255)); b.alpha_composite(im); im=b.convert('RGB')
        box=(c-0.62*f,e-1.0*f,c+0.62*f,e+0.12*f)
        t=im.crop(tuple(int(v) for v in box)).resize((TW,TH),Image.LANCZOS)
        X,Y=(i%cols)*TW,(i//cols)*TH; sh.paste(t,(X,Y)); d.text((X+2,Y+2),n.replace('por-','')+f' fw={f:.0f}',fill=(0,0,255))
    sh.save(f'{pre}_{s//(cols*rows):02d}.png')
