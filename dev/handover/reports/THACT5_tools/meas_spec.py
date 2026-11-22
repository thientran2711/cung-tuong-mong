# meas_spec.py <dir> keys… : FINAL CHECK. Per frame, search the disc in a ±5 % band around the spec circle (centre within 8 px of C0),
# with BOTH the alpha edge (bg-colour filtered) and the gold rim; r/r_rest with r_rest = own frame-0 value. Any real deviation inside ±5 % shows.
import sys,os,numpy as np
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'../../../art/emo-anim'))
import disc_scale_spec as SP
from disc import frames,disc_pts,bg_colour,rim_pts,rim_colour,ransac,_med,_box
d=sys.argv[1]
for k in sys.argv[2:]:
    fo,fl,fb=[frames(f'{d}/{k}-{p}.webp') for p in ('out','loop','back')]; seq=fo+fl+fb; a,b=len(fo),len(fo)+len(fl)
    exp=np.array([SP.scale('out',i,a) for i in range(a)]+[SP.PEAK]*len(fl)+[SP.scale('back',i,len(fb)) for i in range(len(fb))])
    c0=(SP.C0[0],SP.C0[1],SP.R0); bg=bg_colour(seq[0],c0); rc=rim_colour(seq[0],c0); res={}
    for name in ('alpha','rim'):
        R=[]
        for f,e in zip(seq,exp):
            c=(SP.C0[0],SP.C0[1],SP.R0*e)
            xs,ys=disc_pts(f,c,bg) if name=='alpha' else rim_pts(f,c,rc,0.9,1.08)
            q=ransac(xs,ys,c[2]*0.95,c[2]*1.05,c,8)
            R.append(np.nan if q is None else q[0][2])
        R=np.array(R); m=np.isnan(R); R[m]=np.interp(np.where(m)[0],np.where(~m)[0],R[~m]) if m.any() else R[m]
        R=_box(_med(R,5),5); r=R/R[0]; res[name]=r   # same 5-frame median + mean as the tracker
        print('%-11s %-5s r_rest %.1f | peak %.3f | loop %.3f-%.3f | back_end %.3f | max|r/r_rest-spec| %.3f | no-fit frames %d'%(k,name,R[0],np.nanmax(r),np.nanmin(r[a:b]),np.nanmax(r[a:b]),r[-1],np.nanmax(np.abs(r-exp)),int(np.isnan(R).sum())),flush=True)
    np.save(f'{d}/{k}.spec.npy',np.c_[exp,res['alpha'],res['rim']])
