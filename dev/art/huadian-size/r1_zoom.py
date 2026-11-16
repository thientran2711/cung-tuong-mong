# r1_zoom.py (reviewer R1): 3x forehead zoom, per style rows x tiers cols, a18. usage: r1_zoom.py PORDIR OUT AGE tiers(comma) style1 style2 ...
import sys,os,json
from PIL import Image,ImageDraw
pd,out,age,tiers=sys.argv[1:5]; styles=sys.argv[5:]; tiers=tiers.split(',')
L={}
for l in open(os.path.dirname(os.path.abspath(__file__))+'/log_por.jsonl'):
    x=json.loads(l); L[x['name']]=x
TW,TH,Z=170,150,3
per=3
rows=(len(styles)+per-1)//per
sh=Image.new('RGB',(per*len(tiers)*TW,rows*TH),(255,255,255)); d=ImageDraw.Draw(sh)
for i,st in enumerate(styles):
    for j,t in enumerate(tiers):
        n=f'por-{st}-t{t}-a{age}'; x=L.get(n)
        im=Image.open(f'{pd}/{n}.webp').convert('RGBA'); b=Image.new('RGBA',im.size,(236,231,224,255)); b.alpha_composite(im); im=b.convert('RGB')
        c,e,f=x['cx'],x['ey'],x['fw']; cx,cy=c,e-0.22*f
        tl=im.crop((int(cx-TW/Z/2),int(cy-TH/Z/2),int(cx+TW/Z/2),int(cy+TH/Z/2))).resize((TW,TH),Image.LANCZOS)
        X=((i%per)*len(tiers)+j)*TW; Y=(i//per)*TH; sh.paste(tl,(X,Y)); d.text((X+2,Y+2),f'{st.replace("consort-","").replace("maid-","")} t{t}',fill=(0,0,255))
sh.save(out)
