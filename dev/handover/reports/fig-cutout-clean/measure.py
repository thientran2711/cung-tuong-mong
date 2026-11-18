#!/usr/bin/env python3
"""measure.py FILE.webp -> dict: crown, hairline, chin, feet (px at 1800 tall), face ratio=(chin-hair)/(feet-hair), head_h=(chin-crown), shoulder width px at y=chin+60, body width max px (sleeves incl.)"""
import sys,numpy as np
from PIL import Image
def meas(p):
    im=Image.open(p).convert('RGBA');im=im.crop(im.split()[3].getbbox());s=1800/im.height;im=im.resize((round(im.width*s),1800))
    a=np.asarray(im).astype(int);al=a[...,3]>128;rgb=a[...,:3]
    r,g,b=rgb[...,0],rgb[...,1],rgb[...,2]
    skin=al&(r>190)&(r>g+8)&(g>=b)&(r-b<70)&(r-b>12)   # warm light skin
    rows=np.nonzero(al.any(1))[0];crown=int(rows[0]);feet=int(rows[-1])
    cx=int(np.nonzero(al[40:200].any(0))[0].mean()) if al[40:200].any() else im.width//2
    # face rows: skin run width near centre (+-120px) per row between 40 and 330
    w=np.array([skin[y,max(0,cx-140):cx+140].sum() for y in range(0,360)])
    hair=None
    for y in range(40,300):
        if w[y]>=60 and w[y+3]>=60 and w[y+6]>=60: hair=y;break
    # chin: after the widest face row (cheeks), first row width < 55% of max, scanning down from eye level
    ymax=int(np.argmax(w[100:260]))+100;wm=w[ymax];chin=None
    for y in range(ymax,340):
        if w[y]<0.6*wm: chin=y;break
    # shoulder width: alpha width at y = chin+70 over the cloth (non-skin) 
    out=dict(crown=crown,hair=hair,chin=chin,feet=feet)
    if hair and chin:
        out['face_ratio']=round((chin-hair)/(feet-hair),3)
        out['head_h']=chin-crown
        y=chin+70;xs=np.nonzero(al[y])[0];out['shoulder_px']=int(xs[-1]-xs[0]) if len(xs) else None
    out['wh']=round(im.width/1800,3)
    return out
if __name__=='__main__':
    for p in sys.argv[1:]:print(p.split('/')[-1],meas(p))
