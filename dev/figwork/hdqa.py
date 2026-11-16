#!/usr/bin/env python3
"""hdqa.py <hd_dir> <cur_figs_dir> <out.tsv> [sheet_prefix]: check every HD twin before upload.
 back  = mean |luma(down(hd)->900) - luma(cur900)| over opaque pixels: the HD twin must BE the approved 900 file (fixes kept, aligned); pass < 2.5
 aback = mean |alpha diff| (0..255); pass < 3
 gain  = head fine detail (top 22%) of hd / of cur900 upscaled to hd size; pass >= 1.0 (sharper, never softer)
 Writes a face contact sheet per 40 files (left 900 upscaled, right HD) to LOOK at: <sheet_prefix>-N.jpg"""
import sys, os
import numpy as np
from PIL import Image, ImageDraw
Y=np.array([.299,.587,.114],dtype=np.float32)
def blur(g):
    for _ in range(2):
        p=np.pad(g,1,mode='edge');g=sum(p[1+dy:p.shape[0]-1+dy,1+dx:p.shape[1]-1+dx] for dy in(-1,0,1) for dx in(-1,0,1))/9
    return g
hd,cur,out=sys.argv[1:4];pre=sys.argv[4] if len(sys.argv)>4 else None
fs=sorted(f for f in os.listdir(hd) if f.startswith('fig-') and f.endswith('.webp'));rows=[];tiles=[]
for f in fs:
    H=Image.open(os.path.join(hd,f)).convert('RGBA');C=Image.open(os.path.join(cur,f)).convert('RGBA')
    d=np.asarray(H.resize(C.size,Image.LANCZOS)).astype(np.float32);c=np.asarray(C).astype(np.float32);m=c[...,3]>240
    back=float(np.abs(d[...,:3]@Y-c[...,:3]@Y)[m].mean());aback=float(np.abs(d[...,3]-c[...,3]).mean())
    h=np.asarray(H).astype(np.float32);u=np.asarray(C.resize(H.size,Image.LANCZOS)).astype(np.float32);k=int(H.height*.22)
    mm=h[:k,...,3]>250;gh=h[:k,...,:3]@Y;gu=u[:k,...,:3]@Y
    gain=float(np.abs(gh-blur(gh))[mm].mean()/max(.01,np.abs(gu-blur(gu))[mm].mean()))
    ok=back<2.5 and aback<3 and gain>=1.0;rows.append((f,round(back,2),round(aback,2),round(gain,3),'PASS' if ok else 'FAIL'))
    if pre:
        bg=Image.new('RGBA',H.size,(205,180,195,255));bh=bg.copy();bh.alpha_composite(H);bu=bg.copy();bu.alpha_composite(C.resize(H.size,Image.LANCZOS))
        w=H.width;box=(int(w*.2),int(H.height*.03),int(w*.8),int(H.height*.17));t=Image.new('RGB',((box[2]-box[0])*2,box[3]-box[1]+14),'white')
        t.paste(bu.crop(box).convert('RGB'),(0,14));t.paste(bh.crop(box).convert('RGB'),(box[2]-box[0],14));ImageDraw.Draw(t).text((2,1),f[4:-5]+(' '+rows[-1][4]),fill=(0,0,0))
        tiles.append(t.resize((360,int(360*t.height/t.width))))
with open(out,'w') as fh:
    fh.write('file\tback\taback\tgain\tqa\n');[fh.write('\t'.join(map(str,r))+'\n') for r in rows]
if pre:
    for i in range(0,len(tiles),40):
        T=tiles[i:i+40];cols=5;hh=max(t.height for t in T);S=Image.new('RGB',(cols*360,((len(T)+cols-1)//cols)*hh),'white')
        for j,t in enumerate(T):S.paste(t,((j%cols)*360,(j//cols)*hh))
        S.save(f'{pre}-{i//40}.jpg',quality=80)
print(len(rows),'pass',sum(r[4]=='PASS' for r in rows))
