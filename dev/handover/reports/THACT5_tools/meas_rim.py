# meas_rim.py <dir> keys… : gold-rim disc track (start circle = alpha track frame 0); r / r_rest per frame -> <dir>/<k>.rim.npy
import sys,os,numpy as np
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'../../../art/emo-anim'))
import disc_scale_spec as SP
from disc import frames,track,rim_track
d=sys.argv[1]
for k in sys.argv[2:]:
    fo,fl,fb=[frames(f'{d}/{k}-{p}.webp') for p in ('out','loop','back')]; seq=fo+fl+fb
    T=rim_track(seq,track(seq[:1])[0][:3]); np.save(f'{d}/{k}.rim.npy',T); a,b=len(fo),len(fo)+len(fl)
    r=T[:,2]/T[0,2]; dc=np.hypot(T[:,0]-T[0,0],T[:,1]-T[0,1])
    exp=np.array([SP.scale('out',i,a) for i in range(a)]+[SP.PEAK]*len(fl)+[SP.scale('back',i,len(fb)) for i in range(len(fb))])
    print('%-11s rest_r %.1fpx | r/r_rest: peak %.3f loop %.3f-%.3f back_end %.3f | max|dev| %.3f | centre drift %.1fpx'%(k,T[0,2],r.max(),r[a:b].min(),r[a:b].max(),r[-1],np.abs(r-exp).max(),dc.max()),flush=True)
