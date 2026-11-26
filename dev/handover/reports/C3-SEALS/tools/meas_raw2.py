# meas_raw2.py <dir> keys… : like meas_raw.py but tracks each part (out/loop/back) separately (own rest circle, band 0.16);
# raw Seedance disc size differs between clips (A vs B disc), one shared r0 loses the disc -> pulsing. Writes <dir>/<k>.disc.npy (concatenated).
import sys,numpy as np,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from disc import frames,track
d=sys.argv[1]
for k in sys.argv[2:]:
    fo=frames(f'{d}/{k}-out.webp'); To=track(fo,band=0.16); c=tuple(To[-1,:3])   # LOOP and BACK start at the B pose = OUT end circle
    Ts=[To]+[track(frames(f'{d}/{k}-{p}.webp'),c0=c,band=0.16) for p in ('loop','back')]
    # LOOP: Seedance disc is steady -> one constant circle (median of the best-coverage half); OUT/BACK: heavier smoothing of r and centre
    from disc import _med,_box
    L=Ts[1]; g=L[L[:,3]>=np.median(L[:,3])]; Ts[1][:,:3]=np.median(g[:,:3],0)
    for q in (0,2):
        for j in range(3): Ts[q][:,j]=_box(_med(Ts[q][:,j],9),9)
    np.save(f'{d}/{k}.disc.npy',np.concatenate(Ts))
    print(k,[ '%.1f-%.1f cov%.2f'%(T[:,2].min(),T[:,2].max(),T[:,3].min()) for T in Ts],flush=True)
