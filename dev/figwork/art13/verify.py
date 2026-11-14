# verify.py : list expected-changed figs that are still identical to figbak (skipped tiles), and alpha changes (must be none)
import os,numpy as np
from PIL import Image
os.chdir(os.path.dirname(os.path.abspath(__file__)))
R='/home/user/cung-tuong-mong/.claude/worktrees/agent-a878b9d4ac20deacb/img/'
exp=[]
for i in range(1,33):
    c='c%02d'%i
    for t in ('t7','t8'):
        for a in ('a18','a26','a36','a51'): exp.append(f'{c}-{t}-{a}')
exp+=[l.strip() for l in open('agequeue.txt') if l.strip()]
same=[];alpha=[]
for sp in sorted(set(exp)):
    c,t,a=sp.split('-'); fn=f'fig-consort-{c}-{t}-{a}.webp'
    if not os.path.exists('figbak/'+fn): same.append(sp+'(nobak)'); continue
    A=np.asarray(Image.open('figbak/'+fn).convert('RGBA')).astype(int); B=np.asarray(Image.open(R+fn).convert('RGBA')).astype(int)
    if A.shape!=B.shape: alpha.append(sp+' shape'); continue
    if np.abs(A[...,3]-B[...,3]).max()>8: alpha.append(sp)
    if np.abs(A[...,:3]-B[...,:3]).max()<12: same.append(sp)
print('UNCHANGED',len(same),' '.join(same)); print('ALPHA',len(alpha),' '.join(alpha))
