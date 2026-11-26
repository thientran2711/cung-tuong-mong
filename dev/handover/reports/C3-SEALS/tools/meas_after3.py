# meas_after3.py <dir> keys… : independent check with the fixed centre C0: per frame edge-distance-mode radius / R0 vs spec (same radius() as meas_raw3)
import sys,os,numpy as np
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'../../../art/emo-anim'))
import disc_scale_spec as SP
from disc import frames,_med,_box
from importlib.machinery import SourceFileLoader
def radius(a,c,r0):
    from disc import edge_pts
    xs,ys=edge_pts(a); d=np.hypot(xs-c[0],ys-c[1]); rs=np.arange(0.85*r0,1.25*r0,0.25)
    h=np.array([((d>r-1.0)&(d<r+1.0)).sum() for r in rs],float); h=np.convolve(h,np.ones(3)/3,'same'); return rs[int(np.nonzero(h>=0.55*h.max())[0][0])]   # innermost strong ring = the gold rim
d=sys.argv[1]
for k in sys.argv[2:]:
    P=[frames(f'{d}/{k}-{p}.webp') for p in ('out','loop','back')]; r=[np.array([radius(f,SP.C0,SP.R0) for f in fr])/SP.R0 for fr in P]
    exp=[np.array([SP.scale('out',i,len(r[0])) for i in range(len(r[0]))]),np.full(len(r[1]),SP.PEAK),np.array([SP.scale('back',i,len(r[2])) for i in range(len(r[2]))])]
    dv=[np.abs(a-b) for a,b in zip(r,exp)]
    print('%-9s rest %.3f peak %.3f loop %.3f-%.3f back_end %.3f | dev from spec out %.3f loop %.3f back %.3f'%(k,r[0][0],r[0].max(),r[1].min(),r[1].max(),r[2][-1],dv[0].max(),dv[1].max(),dv[2].max()),flush=True)
