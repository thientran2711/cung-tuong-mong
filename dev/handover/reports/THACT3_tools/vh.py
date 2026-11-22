# vh.py dir keys : per-frame rim fit (hough), area outside own rim; also rim radius/centre drift vs frame0
import sys,numpy as np
sys.path.insert(0,'/tmp/claude-0/-home-user-cung-tuong-mong/dbcc44c5-817b-5b98-8e11-78465341463b/scratchpad')
exec(open('/home/user/cung-tuong-mong/dev/handover/reports/THACT1_tools/leanout_measure.py').read().split('SETS=')[0])
from hough import hcircle
d=sys.argv[1]
for k in sys.argv[2:]:
    fo=frames(f'{d}/{k}-out.webp'); fl=frames(f'{d}/{k}-loop.webp'); al=fo+fl; c0=circle(fo[0])
    idx=list(range(0,len(al),3)); R=[];A=[];C=[]
    for i in idx:
        c=hcircle(al[i],c0[2],(0.9,1.1)); A.append(stats(al[i],c)[0]); R.append(c[2]/c0[2]); C.append((c[0]-c0[0])/c0[2]); C[-1]=(C[-1],(c[1]-c0[1])/c0[2])
    n=len([i for i in idx if i<len(fo)]); Al=A[n:]
    print(f'{k}: peak {max(A):.1f} loop {np.mean(Al):.1f} (min {min(Al):.1f}) | rim r/r0 {min(R):.2f}-{max(R):.2f} | centre dy {min(c[1] for c in C):+.2f}..{max(c[1] for c in C):+.2f}r')
