# hlock.py k : lock webp/<k>-out.webp frames to A's rim (frame0) by per-frame hough fit -> webp/<k>-out.webp (backup .orig)
import sys,os,shutil,numpy as np
sys.path.insert(0,'/tmp/claude-0/-home-user-cung-tuong-mong/dbcc44c5-817b-5b98-8e11-78465341463b/scratchpad')
exec(open('/home/user/cung-tuong-mong/dev/handover/reports/THACT1_tools/rebuild_back_clamp.py').read().split('if __name__')[0])
from hough import hcircle
k=sys.argv[1]; p=f'webp/{k}-out.webp'
if not os.path.exists(p+'.orig'): shutil.copy(p,p+'.orig')
fr=frames(p+'.orig'); c0=hcircle(fr[0],144*0.55,(0.6,1.4))
cs=np.array([hcircle(f,c0[2],(0.85,1.45)) for f in fr])
r=median_filter(cs[:,2],5); cx=median_filter(cs[:,0],5); cy=median_filter(cs[:,1],5)
s=np.clip(c0[2]/r,0.7,1.0)
print('r0',round(c0[2],1),'scale',np.round(s,2).tolist())
out=[warp(f,float(s[i]),c0[0],c0[1],cx[i],cy[i]) if s[i]<0.98 else f for i,f in enumerate(fr)]
save(out,p)
