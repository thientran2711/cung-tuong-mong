#!/usr/bin/env python3
"""face_sharp_scan.py (review/face-sharp): measure the FACE of every women's full-body figure (fig-*.webp) for softness / haze.
Usage: python3 -I dev/measure/face_sharp_scan.py <figs_dir> <toil-fit.json> <out.csv> [name-substring]
Face box from img/toil-fit.json (mouth mx,my + cheeks lx,ly,rx,ry + face width fw, % of the picture; dev/figwork/toilfit.py):
 x = cheek centre +- 0.5 fw, y = cheek line - 0.55 fw (brows) .. mouth + 0.12 fw (chin).  Per file:
  fwpx  face width in px (resolution of the face in the file; the stage shows it x1.2-1.5)
  hf    mean |g - blur(g)| in the face box (fine detail: lashes, lid line, lip line); soft / hazy face = low
  eye   skin median - 3rd percentile luminance (how dark the eyes/lashes read against the skin); washed face = low
  rng   luminance p95 - p5
  see   share of face-box pixels with alpha < 250 (see-through face from background removal)
  fringe mean luminance of half-transparent head-edge pixels minus their opaque neighbours (light matte halo from bg removal)"""
import sys, os, csv, json
import numpy as np
from PIL import Image
def blur(g):
    for _ in range(2):
        p=np.pad(g,1,mode='edge');g=sum(p[1+dy:p.shape[0]-1+dy,1+dx:p.shape[1]-1+dx] for dy in(-1,0,1) for dx in(-1,0,1))/9
    return g
Y=np.array([.299,.587,.114],dtype=np.float32)
def fringe(A,y1):
    A=A[:y1];a=A[...,3];L=A[...,:3]@Y;semi=(a>25)&(a<200);op=(a>=250).astype(np.float32);k=np.zeros_like(op);s=np.zeros_like(op)
    for dy in range(-3,4):
        for dx in range(-3,4):k+=np.roll(np.roll(op,dy,0),dx,1);s+=np.roll(np.roll(op*L,dy,0),dx,1)
    m=semi&(k>0);return float((L[m]-(s/np.maximum(k,1))[m]).mean()) if m.any() else 0.
def scan(p,v):
    A=np.asarray(Image.open(p).convert('RGBA')).astype(np.float32);H,W=A.shape[:2]
    mx,my,lx,ly,rx,ry,fw=v[:7];fwp=fw/100*W;cx=(lx+rx)/200*W;cy=(ly+ry)/200*H;my=my/100*H
    x0,x1=int(cx-fwp*.5),int(cx+fwp*.5);y0,y1=int(cy-fwp*.55),int(my+fwp*.12)
    x0,y0=max(0,x0),max(0,y0);x1,y1=min(W,x1),min(H,y1);sub=A[y0:y1,x0:x1];al=sub[...,3:]/255.
    g=(sub[...,:3]*al+255*(1-al))@Y;inner=np.abs(g-blur(g))[2:-2,2:-2]
    med=np.median(g);return dict(W=W,H=H,fwpx=round(fwp,1),hf=round(float(inner.mean()),2),eye=round(float(med-np.percentile(g,3)),1),
        rng=round(float(np.percentile(g,95)-np.percentile(g,5)),1),see=round(float((sub[...,3]<250).mean()),3),fringe=round(fringe(A,int(H*.25)),1),box='%d,%d,%d,%d'%(x0,y0,x1,y1))
K=['W','H','fwpx','hf','eye','rng','see','fringe','box']
if __name__=='__main__':
    d,tf,out=sys.argv[1:4];sub=sys.argv[4] if len(sys.argv)>4 else '';T=json.load(open(tf))
    fs=sorted(f for f in os.listdir(d) if f.startswith('fig-') and f.endswith('.webp') and sub in f)
    with open(out,'w',newline='') as fh:
        w=csv.writer(fh);w.writerow(['file','fit']+K)
        for f in fs:
            v=T.get(f)
            if not v:w.writerow([f,0]+['']*len(K));continue
            try:r=scan(os.path.join(d,f),v)
            except Exception as e:print(f,e);continue
            w.writerow([f,1]+[r[k] for k in K])
