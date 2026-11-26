# meas_raw3.py <dir> keys… : disc measure that cannot lose the disc. Static camera => the disc CENTRE is fixed (rest-frame circle of the OUT clip);
# per frame only the RADIUS is read: mode of the alpha-edge distance histogram from that centre (0.5 px bins, ±1 px window) in 0.80..1.20 r0.
# r smoothed (median 9 + box 9) on OUT/BACK, constant median on LOOP. Writes <dir>/<k>.disc.npy like meas_raw.py (cx,cy,r,cov).
import sys,numpy as np,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from disc import frames,track,edge_pts,_med,_box
def radius(a,c,r0):
    xs,ys=edge_pts(a); d=np.hypot(xs-c[0],ys-c[1]); rs=np.arange(0.80*r0,1.20*r0,0.5)
    h=np.array([((d>r-1.0)&(d<r+1.0)).sum() for r in rs],float); h=np.convolve(h,np.ones(3)/3,'same'); i=int(np.nonzero(h>=0.55*h.max())[0][0]); return rs[i],h[i]/(2*np.pi*rs[i])   # innermost strong ring = the gold rim (outer peaks = halo/glow)
d=sys.argv[1]
for k in sys.argv[2:]:
    P=[frames(f'{d}/{k}-{p}.webp') for p in ('out','loop','back')]
    T0=track(P[0][:3]+P[0][:1]*0 if False else P[0],band=0.16)[0]; c=T0[:2]; r0=T0[2]; Ts=[]
    for q,fr in enumerate(P):
        R=np.array([radius(f,c,r0) for f in fr]); r=R[:,0]
        r=np.full_like(r,np.median(r)) if q==1 else _box(_med(r,9),9)
        Ts.append(np.c_[np.full(len(r),c[0]),np.full(len(r),c[1]),r,R[:,1]])
    np.save(f'{d}/{k}.disc.npy',np.concatenate(Ts)); print(k,'c=(%.0f,%.0f) r0=%.1f'%(c[0],c[1],r0),['%.1f-%.1f'%(T[:,2].min(),T[:,2].max()) for T in Ts],flush=True)
