# r1_twins.py (reviewer R1): por | fig | fig(pre-CDN git copy) | hd forehead montage + sharpness (Laplacian var) per crop.
# usage: r1_twins.py PORDIR TWDIR GITDIR OUT names.txt
import sys,os,json
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import numpy as np,cv2
from PIL import Image,ImageDraw
from runfig import match,gray
pd,td,gd,out,lst=sys.argv[1:6]
L={}
for l in open(os.path.dirname(os.path.abspath(__file__))+'/log_por.jsonl'):
    x=json.loads(l); L[x['name']]=x
names=open(lst).read().split()
W,H=170,150; rows=[]
def lap(im): return float(cv2.Laplacian(cv2.cvtColor(np.asarray(im.convert('RGB')),cv2.COLOR_RGB2GRAY),cv2.CV_64F).var())
sh=Image.new('RGB',(4*W,len(names)*H),(255,255,255)); d=ImageDraw.Draw(sh)
for i,n in enumerate(names):
    x=L[n]; f=n.replace('por-','fig-',1)
    por=Image.open(f'{pd}/{n}.webp').convert('RGBA'); fig=Image.open(f'{td}/fig-{f}.webp').convert('RGBA')
    (sc,k,loc),(tx0,ty0)=match(gray(por),gray(fig),x['cx'],x['ey'],x['fw'],(0.45,0.80,0.01))
    w=x['win']; px0,py0=(w[0]+w[2])/2-30,(w[1]+w[3])/2-26; pw,ph=60,52
    def mapc(px,py): return loc[0]+(px-tx0)*k, loc[1]+(py-ty0)*k
    fx,fy=mapc(px0,py0)
    crops=[por.crop((int(px0),int(py0),int(px0+pw),int(py0+ph)))]
    crops.append(fig.crop((int(fx),int(fy),int(fx+pw*k),int(fy+ph*k))))
    gp=f'{gd}/img/{f}.webp'
    crops.append(Image.open(gp).convert('RGBA').crop((int(fx),int(fy),int(fx+pw*k),int(fy+ph*k))) if os.path.exists(gp) else Image.new('RGBA',(10,10)))
    hp=f'{td}/hd-{f}.webp'
    if os.path.exists(hp):
        hd=Image.open(hp).convert('RGBA'); r=hd.size[0]/fig.size[0]
        crops.append(hd.crop((int(fx*r),int(fy*r),int((fx+pw*k)*r),int((fy+ph*k)*r))))
    else: crops.append(Image.new('RGBA',(10,10)))
    laps=[]
    for j,c in enumerate(crops):
        b=Image.new('RGBA',c.size,(236,231,224,255)); b.alpha_composite(c); c=b.convert('RGB').resize((W,H),Image.LANCZOS); sh.paste(c,(j*W,i*H)); laps.append(round(lap(c)))
    d.text((2,i*H+2),n.replace('por-','')+f' k={k:.2f} m={sc:.2f}',fill=(0,0,255)); d.text((W+2,i*H+14),f'fig lap {laps[1]} git {laps[2]}',fill=(255,0,0)); d.text((3*W+2,i*H+14),f'hd {laps[3]}',fill=(255,0,0))
    rows.append((n,round(sc,2),round(k,2),laps))
sh.save(out)
for r in rows: print(r)
