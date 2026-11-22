import numpy as np
def box3(x):
    p=np.pad(x,1); return sum(p[1+dy:p.shape[0]-1+dy,1+dx:p.shape[1]-1+dx] for dy in (-1,0,1) for dx in (-1,0,1))/9
def edge_pts(a):
    m=a[...,3]>128; p=np.pad(m,1); er=m.copy()
    for dy,dx in ((-1,0),(1,0),(0,-1),(0,1)): er&=p[1+dy:p.shape[0]-1+dy,1+dx:p.shape[1]-1+dx]
    ys,xs=np.nonzero(m&~er); return xs,ys
def hcircle(a,r0,rng=(0.85,1.15)):
    xs,ys=edge_pts(a); H,W=a.shape[:2]; best=(0,None); th=np.linspace(0,2*np.pi,240,endpoint=False)
    for r in np.arange(r0*rng[0],r0*rng[1],1.0):
        acc=np.zeros(H*W,np.int64)
        for dx,dy in zip(np.round(r*np.cos(th)).astype(int),np.round(r*np.sin(th)).astype(int)):
            cx=xs-dx; cy=ys-dy; ok=(cx>=0)&(cx<W)&(cy>=0)&(cy<H); acc+=np.bincount(cy[ok]*W+cx[ok],minlength=H*W)
        acc=box3(acc.reshape(H,W).astype(float)); i=int(np.argmax(acc)); v=acc.flat[i]
        if v>best[0]: best=(v,(i%W,i//W,float(r)))
    return best[1]
