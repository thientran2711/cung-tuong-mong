# meas_raw.py <dir> keys… : disc track of raw out+loop+back -> <dir>/<k>.disc.npy ; prints rest r, min/max r/r0, centre drift
import sys,numpy as np,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from disc import frames,track
d=sys.argv[1]
for k in sys.argv[2:]:
    fo,fl,fb=[frames(f'{d}/{k}-{p}.webp') for p in ('out','loop','back')]
    T=track(fo+fl+fb); np.save(f'{d}/{k}.disc.npy',T); n=[len(fo),len(fl),len(fb)]
    r=T[:,2]/T[0,2]
    print(f'{k:11s} n={n} r0={T[0,2]:.1f} c0=({T[0,0]:.0f},{T[0,1]:.0f}) out_end {r[n[0]-1]:.2f} loop {r[n[0]:n[0]+n[1]].min():.2f}-{r[n[0]:n[0]+n[1]].max():.2f} back_end {r[-1]:.2f} cov_min {T[:,3].min():.2f}',flush=True)
