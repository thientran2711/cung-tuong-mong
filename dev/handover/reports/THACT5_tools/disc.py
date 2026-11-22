# disc.py — per-frame medallion (disc) circle for act-seal webps. Used by THACT5 (ACT-SEAL DISC SCALE SPEC).
import numpy as np
from PIL import Image
def frames(p):
    im=Image.open(p); r=[]
    for i in range(im.n_frames): im.seek(i); r.append(np.array(im.convert('RGBA')))
    return r
ATHR=48   # alpha threshold for the disc edge: low, because teal/green discs come out of the chroma cut semi-transparent (alpha 90-200)
def edge_pts(a):
    m=a[...,3]>ATHR; p=np.pad(m,1); er=m.copy()
    for dy,dx in ((-1,0),(1,0),(0,-1),(0,1)): er&=p[1+dy:p.shape[0]-1+dy,1+dx:p.shape[1]-1+dx]
    ys,xs=np.nonzero(m&~er); return xs.astype(float),ys.astype(float)
def box3(x):
    p=np.pad(x,1); return sum(p[1+dy:p.shape[0]-1+dy,1+dx:p.shape[1]-1+dx] for dy in (-1,0,1) for dx in (-1,0,1))/9
def hough(a,rlo,rhi,step=1.0):
    xs,ys=edge_pts(a); H,W=a.shape[:2]; best=(0,None); th=np.linspace(0,2*np.pi,240,endpoint=False)
    xs=xs.astype(int); ys=ys.astype(int)
    for r in np.arange(rlo,rhi,step):
        acc=np.zeros(H*W,np.int64)
        for dx,dy in zip(np.round(r*np.cos(th)).astype(int),np.round(r*np.sin(th)).astype(int)):
            cx=xs-dx; cy=ys-dy; ok=(cx>=0)&(cx<W)&(cy>=0)&(cy<H); acc+=np.bincount(cy[ok]*W+cx[ok],minlength=H*W)
        acc=box3(acc.reshape(H,W).astype(float)); i=int(np.argmax(acc)); v=acc.flat[i]/r
        if v>best[0]: best=(v,(float(i%W),float(i//W),float(r)))
    return best[1]
def kasa(x,y):
    A=np.c_[2*x,2*y,np.ones_like(x)]; b=x*x+y*y; c=np.linalg.lstsq(A,b,rcond=None)[0]
    return c[0],c[1],np.sqrt(c[2]+c[0]**2+c[1]**2)
def refine(a,c,tol=0.04,it=6):
    """robust circle: keep alpha-edge points within tol*r of the current circle, refit (Kasa), shrink tol."""
    xs,ys=edge_pts(a); cx,cy,r=c
    for k in range(it):
        d=np.abs(np.hypot(xs-cx,ys-cy)-r); m=d<max(tol*r,1.5)
        if m.sum()<30: break
        cx,cy,r=kasa(xs[m],ys[m]); tol=max(tol*0.7,0.012)
    d=np.abs(np.hypot(xs-cx,ys-cy)-r); m=d<2.0
    ang=np.arctan2(ys[m]-cy,xs[m]-cx); cov=len(np.unique(np.round(ang*36/np.pi)))/72  # arc coverage (5° bins)
    return (cx,cy,r),cov
def hough_c(a,rlo,rhi,cprev,dmax,step=1.0):
    """hough with centre limited to within dmax px of cprev."""
    xs,ys=edge_pts(a); H,W=a.shape[:2]; best=(0,None); th=np.linspace(0,2*np.pi,240,endpoint=False)
    xs=xs.astype(int); ys=ys.astype(int); yy,xx=np.mgrid[0:H,0:W]; ok0=np.hypot(xx-cprev[0],yy-cprev[1])<=dmax
    for r in np.arange(rlo,rhi,step):
        acc=np.zeros(H*W,np.int64)
        for dx,dy in zip(np.round(r*np.cos(th)).astype(int),np.round(r*np.sin(th)).astype(int)):
            cx=xs-dx; cy=ys-dy; ok=(cx>=0)&(cx<W)&(cy>=0)&(cy<H); acc+=np.bincount(cy[ok]*W+cx[ok],minlength=H*W)
        acc=box3(acc.reshape(H,W).astype(float))*ok0; i=int(np.argmax(acc)); v=acc.flat[i]/r
        if v>best[0]: best=(v,(float(i%W),float(i//W),float(r)))
    return best[1]
def _med(x,w=5):
    h=w//2; p=np.pad(x,(h,h),mode='edge'); return np.array([np.median(p[i:i+w]) for i in range(len(x))])
def bg_colour(a,c):
    """median colour of the disc background: annulus 0.80–0.93 r of the rest frame."""
    cx,cy,r=c[:3]; H,W=a.shape[:2]; yy,xx=np.mgrid[0:H,0:W]; d=np.hypot(xx-cx,yy-cy)
    m=(d>0.80*r)&(d<0.93*r)&(a[...,3]>250); px=a[m][:,:3].astype(float)
    med=np.median(px,0); dd=np.linalg.norm(px-med,axis=1); return np.median(px[dd<np.percentile(dd,60)],0)
def disc_pts(a,cprev,bg,tol=60):
    """alpha-edge points whose inside (4–9 px toward the previous centre) is disc-background coloured."""
    xs,ys=edge_pts(a); H,W=a.shape[:2]; vx=cprev[0]-xs; vy=cprev[1]-ys; n=np.hypot(vx,vy)+1e-6; vx/=n; vy/=n
    acc=np.zeros((len(xs),3)); cnt=0
    for t in (4,6,8,10):
        X=np.clip(np.round(xs+vx*t).astype(int),0,W-1); Y=np.clip(np.round(ys+vy*t).astype(int),0,H-1); acc+=a[Y,X,:3]; cnt+=1
    col=acc/cnt; ok=np.linalg.norm(col-bg,axis=1)<tol
    return xs[ok],ys[ok]
def ransac(xs,ys,rlo,rhi,cprev,dmax,it=400,seed=0):
    g=np.random.default_rng(seed); best=(0,None); n=len(xs)
    if n<12: return None
    for _ in range(it):
        i=g.choice(n,3,replace=False); x1,y1,x2,y2,x3,y3=xs[i[0]],ys[i[0]],xs[i[1]],ys[i[1]],xs[i[2]],ys[i[2]]
        D=2*(x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2))
        if abs(D)<1e-6: continue
        ux=((x1*x1+y1*y1)*(y2-y3)+(x2*x2+y2*y2)*(y3-y1)+(x3*x3+y3*y3)*(y1-y2))/D
        uy=((x1*x1+y1*y1)*(x3-x2)+(x2*x2+y2*y2)*(x1-x3)+(x3*x3+y3*y3)*(x2-x1))/D
        r=np.hypot(x1-ux,y1-uy)
        if not(rlo<=r<=rhi) or np.hypot(ux-cprev[0],uy-cprev[1])>dmax: continue
        inl=np.abs(np.hypot(xs-ux,ys-uy)-r)<1.5
        ang=np.unique(np.round(np.arctan2(ys[inl]-uy,xs[inl]-ux)*36/np.pi)).size   # spread, not just count
        if ang>best[0]: best=(ang,(ux,uy,r,inl))
    if best[1] is None: return None
    ux,uy,r,inl=best[1]; cx,cy,r=kasa(xs[inl],ys[inl])
    for _ in range(3):
        inl=np.abs(np.hypot(xs-cx,ys-cy)-r)<1.5
        if inl.sum()<10: break
        cx,cy,r=kasa(xs[inl],ys[inl])
    return (cx,cy,r),best[0]/72
def _med(x,w=5):
    h=w//2; p=np.pad(x,(h,h),mode='edge'); return np.array([np.median(p[i:i+w]) for i in range(len(x))])
def track(seq,c0=None,band=0.10):
    """Disc circle per frame. Rest = frame 0 (hough + refine). Every frame: RANSAC circle on alpha-edge points whose inside is
    disc-background coloured (rejects robe, crown, sparkles, floor glow rings), radius within ±band of r0, centre within
    0.3 r0 of the previous frame. Then 5-frame median on cx, cy, r. Column 3 = arc coverage (0..1)."""
    if c0 is None:
        h=hough(seq[0],40,140,2.0); c0,_=refine(seq[0],hough(seq[0],h[2]-3,h[2]+3,0.5))
    r0=c0[2]; bg=bg_colour(seq[0],c0); out=[]; c=c0
    for f in seq:
        xs,ys=disc_pts(f,c,bg); res=ransac(xs,ys,r0*(1-band),r0*(1+band),c,0.3*r0)
        if res is None: out.append((c[0],c[1],c[2],0.0)); continue
        c1,cov=res; out.append((c1[0],c1[1],c1[2],cov)); c=c1
    T=np.array(out)
    for j in range(3): T[:,j]=_box(_med(T[:,j],5),5)
    return T
def _box(x,w=5):
    h=w//2; p=np.pad(x,(h,h),mode='edge'); return np.convolve(p,np.ones(w)/w,'valid')

# ---- gold-rim tracker (what the eye reads as the disc edge; ignores dark/fuzzy halo outside the rim) ----
TH=np.linspace(0,2*np.pi,360,endpoint=False)
def rim_colour(a,c):
    cx,cy,r=c[:3]; cols=[]
    for t in (1.5,2.5,3.5):
        X=np.clip(np.round(cx+(r-t)*np.cos(TH)).astype(int),0,a.shape[1]-1); Y=np.clip(np.round(cy+(r-t)*np.sin(TH)).astype(int),0,a.shape[0]-1)
        cols.append(a[Y,X,:3].astype(float))
    px=np.concatenate(cols); med=np.median(px,0); dd=np.linalg.norm(px-med,axis=1); return np.median(px[dd<np.percentile(dd,50)],0)
def rim_pts(a,c,col,lo=0.86,hi=1.10,tol=50):
    """per ray from centre c: outermost pixel (radius lo..hi * r) whose colour is rim-like and alpha>200."""
    cx,cy,r=c[:3]; rs=np.arange(lo*r,hi*r,0.5); H,W=a.shape[:2]
    X=np.round(cx+np.outer(np.cos(TH),rs)).astype(int); Y=np.round(cy+np.outer(np.sin(TH),rs)).astype(int)
    ok=(X>=0)&(X<W)&(Y>=0)&(Y<H); X=np.clip(X,0,W-1); Y=np.clip(Y,0,H-1); p=a[Y,X]
    g=ok&(p[...,3]>200)&(np.linalg.norm(p[...,:3].astype(float)-col,axis=2)<tol)
    idx=np.where(g.any(1), g.shape[1]-1-np.argmax(g[:,::-1],1), -1); m=idx>=0
    R=rs[idx[m]]; return cx+R*np.cos(TH[m]), cy+R*np.sin(TH[m])
def rim_track(seq,c0,band=0.16):
    col=rim_colour(seq[0],c0); r0=c0[2]; out=[]; c=c0
    for f in seq:
        xs,ys=rim_pts(f,c,col); res=ransac(xs,ys,r0*(1-band),r0*(1+band),c,0.3*r0)
        if res is None: out.append((c[0],c[1],c[2],0.0)); continue
        c1,cov=res; out.append((c1[0],c1[1],c1[2],cov)); c=c1
    T=np.array(out)
    for j in range(3): T[:,j]=_box(_med(T[:,j],5),5)
    return T
