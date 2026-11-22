# vm.py dir keys... : official leanout measure (circle of OUT frame0, every OUT+LOOP frame) + B-pose (last 5 OUT frames, loop mean)
import sys,numpy as np
src=open('/home/user/cung-tuong-mong/dev/handover/reports/THACT1_tools/leanout_measure.py').read().split('SETS=')[0]; exec(src)
d=sys.argv[1]
for k in sys.argv[2:]:
    fo=frames(f'{d}/{k}-out.webp'); fl=frames(f'{d}/{k}-loop.webp'); c=circle(fo[0])
    A=[stats(f,c)[0] for f in fo+fl]; lo=A[len(fo):]
    print(f'{k}: peak {max(A):.1f}  loop mean {np.mean(lo):.1f} (min {min(lo):.1f}, max {max(lo):.1f})  OUT-end {np.mean(A[len(fo)-5:len(fo)]):.1f}  frames {len(fo)}+{len(fl)}')
