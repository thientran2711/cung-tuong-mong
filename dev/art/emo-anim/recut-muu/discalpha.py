"""discalpha.py files... : per file, ~5 frames, RANSAC circle fit on silhouette boundary, then disc alpha in upper annulus 80-92% R
(pixels whose colour is within 70 of the annulus median colour). Prints name, per-frame mean, min."""
import sys, numpy as np
from PIL import Image, ImageSequence
from scipy import ndimage as nd
rng=np.random.default_rng(1)
def frames(p):
    im=Image.open(p); return [np.array(f.convert('RGBA')) for f in ImageSequence.Iterator(im)]
def fit(a):
    m=nd.binary_fill_holes(a>64); b=m&~nd.binary_erosion(m)
    ys,xs=np.nonzero(b)
    if len(xs)<30: return None
    P=np.stack([xs,ys],1).astype(float)
    idx=rng.integers(0,len(P),(600,3)); p1,p2,p3=P[idx[:,0]],P[idx[:,1]],P[idx[:,2]]
    ax,ay=p1.T; bx,by=p2.T; cx,cy=p3.T
    d=2*(ax*(by-cy)+bx*(cy-ay)+cx*(ay-by)); ok=np.abs(d)>1e-6; d[~ok]=1
    ux=((ax**2+ay**2)*(by-cy)+(bx**2+by**2)*(cy-ay)+(cx**2+cy**2)*(ay-by))/d
    uy=((ax**2+ay**2)*(cx-bx)+(bx**2+by**2)*(ax-cx)+(cx**2+cy**2)*(bx-ax))/d
    r=np.hypot(ax-ux,ay-uy); ok&=(r>40)&(r<160)&(ux>40)&(ux<248)&(uy>40)&(uy<248)
    best=None;bs=0
    for k in np.nonzero(ok)[0]:
        s=(np.abs(np.hypot(P[:,0]-ux[k],P[:,1]-uy[k])-r[k])<1.5).sum()
        if s>bs: bs=s;best=(ux[k],uy[k],r[k])
    return best
def disc(f):
    a=f[...,3]; c=fit(a)
    if c is None: return None
    ux,uy,r=c; yy,xx=np.mgrid[:a.shape[0],:a.shape[1]]
    d=np.hypot(xx-ux,yy-uy); ang=np.degrees(np.arctan2(yy-uy,xx-ux))
    ann=(d>0.80*r)&(d<0.92*r)&(ang>-165)&(ang<-15)&(a>0)
    if ann.sum()<30: return None
    rgb=f[...,:3].astype(float); med=np.median(rgb[ann],0)
    sel=ann&(np.sqrt(((rgb-med)**2).sum(-1))<70)&~nd.binary_dilation(a<8,iterations=3)
    if sel.sum()<20: return None
    return float(a[sel].mean()), c
if __name__=='__main__':
    for p in sys.argv[1:]:
        fr=frames(p); n=len(fr); res=[]
        for i in np.linspace(0,n-1,5).astype(int):
            v=disc(fr[i]); res.append((int(i), None if v is None else round(v[0],1)))
        vals=[v for _,v in res if v is not None]
        print(p.split('/')[-1][:-5], n, min(vals) if vals else 'NA', ' '.join(f'{i}:{v}' for i,v in res), flush=True)
