#!/usr/bin/env python3
"""face-sharp-cmp.py <shot.png> <shot.json> <figs_dir> [crop_out_prefix]
For each stage figure in shot.json: crop its head (top 18% of the picture) from the screenshot and from the source picture resampled
(bilinear, as the browser does) to the same device-pixel box; sharpness = mean |g - blur(g)| over opaque head pixels (alpha 255 in source).
ratio = screen / ideal: 1.0 = drawn as sharp as the file allows; < 0.8 = the page softens it."""
import sys, json, os
import numpy as np
from PIL import Image
def blur(g):
    for _ in range(2):
        p=np.pad(g,1,mode='edge');g=sum(p[1+dy:p.shape[0]-1+dy,1+dx:p.shape[1]-1+dx] for dy in(-1,0,1) for dx in(-1,0,1))/9
    return g
def lum(a):return a[...,:3].astype(np.float32)@np.array([.299,.587,.114],dtype=np.float32)
shot,js,figs=sys.argv[1:4];pre=sys.argv[4] if len(sys.argv)>4 else None
S=np.asarray(Image.open(shot).convert('RGB'));J=json.load(open(js));d=J['dpr'];out=[]
for i,f in enumerate(J['L']):
    src=os.path.join(figs,f['src'].split('?')[0])
    if not os.path.exists(src):continue
    x0,y0=int(round(f['x']*d)),int(round(f['y']*d));w,h=int(round(f['w']*d)),int(round(f['h']*d))
    hh=int(h*.18);x0c,y0c=max(0,x0),max(0,y0);
    scr=S[y0c:y0+hh,x0c:x0+w]
    im=Image.open(src).convert('RGBA').resize((w,h),Image.BILINEAR);I=np.asarray(im)[y0c-y0:hh,x0c-x0:x0c-x0+scr.shape[1]]
    m=I[...,3]>=254
    m[1:]&=m[:-1];m[:-1]&=m[1:];m[:,1:]&=m[:,:-1];m[:,:-1]&=m[:,1:]   # erode: skip edges
    gs,gi=lum(scr),lum(I);hs=np.abs(gs-blur(gs));hi=np.abs(gi-blur(gi))
    r=dict(who=f['who'],src=f['src'],scale=round(h/f['nh'],2),hf_screen=round(float(hs[m].mean()),2),hf_ideal=round(float(hi[m].mean()),2),
           std_screen=round(float(gs[m].std()),1),std_ideal=round(float(gi[m].std()),1))
    r['ratio']=round(r['hf_screen']/max(.01,r['hf_ideal']),3);out.append(r)
    if pre:Image.fromarray(np.concatenate([scr,I[...,:3]],1)).save(f'{pre}-{i}-{f["who"]}.png')
print(json.dumps(out))
