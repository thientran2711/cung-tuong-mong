# fapick.py fig.webp... : run mm_fa on each, keep the fa version if cutcheck improves by >=1 (writes in place, logs)
import sys,os,subprocess,io,re
from PIL import Image
D='/home/user/cung-tuong-mong/.claude/worktrees/agent-a4a32ff575576735e/dev/figwork/'
T='/tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/fatmp/'
os.makedirs(T,exist_ok=True)
def score(p):
    o=subprocess.run(['python3','-I',D+'cutcheck.py',p],capture_output=True,text=True).stdout.split()
    return float(o[0]) if o else 0.0
for f in sys.argv[1:]:
    s0=score(f); t=T+os.path.basename(f)[:-5]+'.png'
    subprocess.run(['python3','-I',D+'mm_fa.py',f,t],check=True); s1=score(t)
    if s1<=s0-1:
        im=Image.open(t).convert('RGBA')
        for q in (86,80,74,68,60,52):
            b=io.BytesIO(); im.save(b,'WEBP',quality=q,method=4)
            if b.tell()<=250*1024: break
        open(f,'wb').write(b.getvalue()); print('FA',f,s0,'->',s1,flush=True)
    else: print('keep',f,s0,s1,flush=True)
    os.remove(t)
