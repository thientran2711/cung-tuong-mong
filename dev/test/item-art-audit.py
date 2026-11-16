#!/usr/bin/env python3
"""ITEM ART AUDIT step 1c (review/item-art-audit): picture check for every key listed by item-art-audit-enum.js.
usage: python3 -I dev/test/item-art-audit.py <enum.json> <out.json> [workdir]
Per key: does the BIG picture (img/item512 | wd512 | pet512 | mark512) exist on the CDN (img/_index.json)? is it RGBA with transparent corners?
pixel size (longest side of the opaque content) vs the reveal size (kitItem xl = min(260px, 36dvh) -> 520 device px at @2 on iPad 1180x820 and Fold 755x1000)?
sharpness: Laplacian variance of the content scaled to 520 px, normalised by the high-frequency share (see hf()): soft = upscaled/blurry.
Also reports whether a 1024 master (img/hi/) exists. Needs numpy + PIL (python3 -I = isolated)."""
import sys,json,io,os,urllib.request,ssl,hashlib
import numpy as np
from PIL import Image
UA={'User-Agent':'ctm-item-art-audit'}
BASE='https://ctm-img.victoria-tntt.workers.dev/'
REVEAL=520
enum=json.load(open(sys.argv[1]));out=sys.argv[2];work=sys.argv[3] if len(sys.argv)>3 else '/tmp/ia-cache';os.makedirs(work,exist_ok=True)
idx=json.load(urllib.request.urlopen(urllib.request.Request(BASE+'img/_index.json',headers=dict(UA,**{'Cache-Control':'no-cache'}))))
have={f[0]:f[2] for f in idx['files']}
def get(key):
    p=os.path.join(work,key.replace('/','__'))
    if not os.path.exists(p):
        open(p,'wb').write(urllib.request.urlopen(urllib.request.Request(BASE+key,headers=UA),timeout=60).read())
    return p
def lap(g):
    return (-4*g[1:-1,1:-1]+g[:-2,1:-1]+g[2:,1:-1]+g[1:-1,:-2]+g[1:-1,2:])
def metrics(path):
    im=Image.open(path);mode=im.mode;w,h=im.size;im=im.convert('RGBA');a=np.asarray(im)[:,:,3]
    corners=[a[0,0],a[0,-1],a[-1,0],a[-1,-1]];ys,xs=np.where(a>20)
    if len(xs)==0:return dict(w=w,h=h,mode=mode,empty=True)
    x0,x1,y0,y1=xs.min(),xs.max()+1,ys.min(),ys.max()+1;cw,ch=x1-x0,y1-y0;long=max(cw,ch)
    c=im.crop((x0,y0,x1,y1));f=REVEAL/long;c=c.resize((max(1,round(cw*f)),max(1,round(ch*f))),Image.LANCZOS)
    arr=np.asarray(c).astype(np.float32);al=arr[:,:,3]>128;g=arr[:,:,:3]@np.array([.299,.587,.114],np.float32)
    L=lap(g);m=al[1:-1,1:-1]&al[:-2,1:-1]&al[2:,1:-1]&al[1:-1,:-2]&al[1:-1,2:]
    lv=float(L[m].var()) if m.sum()>50 else 0.0
    # high-frequency share: energy of the finest detail (Laplacian at scale) over the energy after a 2x blur; low = soft/upscaled
    sm=np.asarray(c.convert('RGB').resize((max(1,c.width//2),max(1,c.height//2)),Image.LANCZOS).resize(c.size,Image.BICUBIC)).astype(np.float32)@np.array([.299,.587,.114],np.float32)
    Ls=lap(sm);ls=float(Ls[m].var()) if m.sum()>50 else 0.0
    return dict(w=w,h=h,mode=mode,corner_a=int(max(corners)),content=[int(cw),int(ch)],long=int(long),fill=round(float((a>20).mean()),2),lapvar=round(lv,1),hf=round(lv/ls,2) if ls>0 else 0,semi=round(float(((a>20)&(a<235)).mean()),3))
rows=[]
for x in enum['L']:
    r=dict(x);big=x['big'];sm=x['small']
    r['big_ok']=big in have;r['small_ok']=sm in have;r['hi_ok']=bool(x['hi']) and x['hi'] in have;r['same']=big==sm
    r['big_bytes']=have.get(big)
    if r['big_ok']:
        try:r.update(metrics(get(big)))
        except Exception as e:r['err']=str(e)[:80]
    rows.append(r)
json.dump(rows,open(out,'w'),ensure_ascii=False,indent=1)
print(len(rows),'rows')
