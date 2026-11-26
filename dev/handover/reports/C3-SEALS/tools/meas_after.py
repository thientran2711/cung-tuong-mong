# meas_after.py <dir> keys… : independent disc track on normalised clips (rest circle re-detected from frame 0);
# prints r/R0 at rest (OUT f0), peak, LOOP min/max, BACK end, centre drift (px), and out ramp frames; writes <dir>/table.tsv
import sys,os,numpy as np
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'../../../art/emo-anim'))
import disc_scale_spec as SP
from disc import frames,track
d=sys.argv[1]; rows=[]
for k in sys.argv[2:]:
    fo,fl,fb=[frames(f'{d}/{k}-{p}.webp') for p in ('out','loop','back')]
    T=track(fo+fl+fb,band=0.16); np.save(f'{d}/{k}.after.npy',T); a,b=len(fo),len(fo)+len(fl)
    r=T[:,2]/SP.R0; dc=np.hypot(T[:,0]-SP.C0[0],T[:,1]-SP.C0[1])
    exp=np.array([SP.scale('out',i,a) for i in range(a)]+[SP.PEAK]*len(fl)+[SP.scale('back',i,len(fb)) for i in range(len(fb))])
    row=(k,r[0],r.max(),r[a:b].min(),r[a:b].max(),r[-1],np.abs(r-exp).max(),dc.max())
    rows.append(row); print('%-11s rest %.3f peak %.3f loop %.3f-%.3f back_end %.3f |dev from spec| max %.3f centre drift max %.1f px'%row,flush=True)
