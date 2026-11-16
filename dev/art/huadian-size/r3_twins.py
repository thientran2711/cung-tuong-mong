import sys,os,json
sys.path.insert(0,'/home/user/wt/hd3/dev/art/huadian-size')
import numpy as np,cv2
from PIL import Image,ImageDraw

import types
def comp(im):
    im=im.convert('RGBA'); b=Image.new('RGBA',im.size,(236,231,224,255)); b.alpha_composite(im); return np.asarray(b.convert('RGB'))
def gray(im): return cv2.cvtColor(comp(im),cv2.COLOR_RGB2GRAY)
src=open('/home/user/wt/hd3/dev/art/huadian-size/runfig.py').read()
i=src.index('def match'); j=src.index('def process')
exec(src[i:j])

S=os.path.dirname(os.path.abspath(__file__)); L=json.load(open(S+'/L.json'))
names=open(S+'/tw_names.txt').read().split()
def lap(im): return float(cv2.Laplacian(cv2.cvtColor(np.asarray(im.convert('RGB')),cv2.COLOR_RGB2GRAY),cv2.CV_64F).var())
W,H=150,130; rows=[]; res=[]
for n in names:
    x=L.get('por-'+n)
    if not x or 'win' not in x: res.append((n,'nolog')); continue
    fp=f'{S}/tw/fig-{n}.webp'
    if not os.path.exists(fp): res.append((n,'nofig')); continue
    por=Image.open(f'{S}/por/por-{n}.webp').convert('RGBA'); fig=Image.open(fp).convert('RGBA')
    (sc,k,loc),(tx0,ty0)=match(gray(por),gray(fig),x['cx'],x['ey'],x['fw'],(0.45,0.80,0.01))
    w=x['win']; px0,py0=(w[0]+w[2])/2-30,(w[1]+w[3])/2-26; pw,ph=60,52
    fx,fy=loc[0]+(px0-tx0)*k, loc[1]+(py0-ty0)*k
    crops=[por.crop((int(px0),int(py0),int(px0+pw),int(py0+ph))), fig.crop((int(fx),int(fy),int(fx+pw*k),int(fy+ph*k)))]
    hp=f'{S}/tw/hd/fig-{n}.webp'
    if os.path.exists(hp):
        hd=Image.open(hp).convert('RGBA'); r=hd.size[0]/fig.size[0]; crops.append(hd.crop((int(fx*r),int(fy*r),int((fx+pw*k)*r),int((fy+ph*k)*r))))
    else: crops.append(Image.new('RGBA',(10,10),(255,255,255,255)))
    tp=f'{S}/tw/tn/fig-{n}.webp'
    if os.path.exists(tp):
        tn=Image.open(tp).convert('RGBA'); r=tn.size[0]/fig.size[0]; crops.append(tn.crop((int(fx*r),int(fy*r),int((fx+pw*k)*r),int((fy+ph*k)*r))))
    else: crops.append(Image.new('RGBA',(10,10),(255,255,255,255)))
    row=[];laps=[]
    for c in crops:
        b=Image.new('RGBA',c.size,(236,231,224,255)); b.alpha_composite(c); c=b.convert('RGB').resize((W,H),Image.LANCZOS); row.append(c); laps.append(round(lap(c)))
    rows.append((n,round(sc,2),round(k,2),laps,row))
per=10
for s in range(0,len(rows),per):
    ch=rows[s:s+per]; sh=Image.new('RGB',(4*W,len(ch)*H),(255,255,255)); d=ImageDraw.Draw(sh)
    for i,(n,sc,k,laps,row) in enumerate(ch):
        for j,c in enumerate(row): sh.paste(c,(j*W,i*H))
        d.text((2,i*H+2),n.replace('consort-','').replace('maid-','')+f' m={sc}',fill=(0,0,255)); d.text((W+2,i*H+14),f'lap por {laps[0]} fig {laps[1]} hd {laps[3-1]} tn {laps[3]}',fill=(255,0,0))
    sh.save(f'{S}/tw_{s//per}.png')
for r in rows: print(r[0],r[1],r[2],r[3])
print(res)
