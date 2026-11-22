# fix_track.py rim <src> <k>…        : replace <src>/<k>.disc.npy by the gold-rim track (scaled so frame 0 = alpha-track r0); keeps old as .disc_alpha.npy
# fix_track.py loop <src> <out> <k>… : closed-loop pass: fold the residual of the output track (<out>/<k>.after.npy, alpha) back into the source track
import sys,os,shutil,numpy as np
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'../../../art/emo-anim'))
import disc_scale_spec as SP
from disc import frames,rim_track
mode=sys.argv[1]
if mode=='rim':
    src=sys.argv[2]
    for k in sys.argv[3:]:
        D=np.load(f'{src}/{k}.disc.npy'); shutil.copy(f'{src}/{k}.disc.npy',f'{src}/{k}.disc_alpha.npy')
        seq=sum([frames(f'{src}/{k}-{p}.webp') for p in ('out','loop','back')],[])
        T=rim_track(seq,D[0][:3]); T[:,2]*=D[0,2]/T[0,2]; np.save(f'{src}/{k}.disc.npy',T)
        print(k,'rim/alpha r ratio loop-mean %.3f max %.3f'%((T[:,2]/D[:,2]).mean(),(T[:,2]/D[:,2]).max()))
else:
    src,out=sys.argv[2],sys.argv[3]
    for k in sys.argv[4:]:
        D=np.load(f'{src}/{k}.disc.npy'); A=np.load(f'{out}/{k}.after.npy'); n=[len(frames(f'{out}/{k}-{p}.webp')) for p in ('out','loop','back')]
        exp=np.array([SP.scale('out',i,n[0]) for i in range(n[0])]+[SP.PEAK]*n[1]+[SP.scale('back',i,n[2]) for i in range(n[2])])
        s=SP.R0*exp/D[:,2]; base=A[0,2]/SP.R0          # output rest frame defines the measuring offset
        f=(A[:,2]/(SP.R0*exp))/base                      # >1 = output too big
        N=D.copy(); N[:,2]=D[:,2]*f; N[:,0]=D[:,0]+(A[:,0]-A[0,0])/s; N[:,1]=D[:,1]+(A[:,1]-A[0,1])/s
        shutil.copy(f'{src}/{k}.disc.npy',f'{src}/{k}.disc_pass1.npy'); np.save(f'{src}/{k}.disc.npy',N)
        print(k,'residual factor %.3f..%.3f'%(f.min(),f.max()))
