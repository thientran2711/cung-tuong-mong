# ext.py <dir> keys… : content extent around the disc centre in disc-radius units (left,right,up,down) over all frames
import sys,os,numpy as np
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from disc import frames
d=sys.argv[1]; M=np.zeros(4)
for k in sys.argv[2:]:
    al=sum([frames(f'{d}/{k}-{p}.webp') for p in ('out','loop','back')],[]); D=np.load(f'{d}/{k}.disc.npy'); e=np.zeros(4)
    for f,(cx,cy,r,_) in zip(al,D):
        ys,xs=np.nonzero(f[...,3]>24)
        e=np.maximum(e,[(cx-xs.min())/r,(xs.max()-cx)/r,(cy-ys.min())/r,(ys.max()-cy)/r])
    M=np.maximum(M,e); print(k,np.round(e,2))
print('MAX',np.round(M,2))
