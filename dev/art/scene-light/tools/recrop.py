# recrop.py RAW.png INDEX OUT.png : crop ONE figure (0-based, left→right) from a 4-figure raw lineup, with margin (rematte.runs_of)
import sys,importlib.util
from PIL import Image
W="/home/user/cung-tuong-mong/.claude/worktrees/agent-a4e8c6432e582a50a/"
spec=importlib.util.spec_from_file_location("rm",W+"dev/figwork/rematte.py");rm=importlib.util.module_from_spec(spec);spec.loader.exec_module(rm)
raw=Image.open(sys.argv[1]).convert("RGB");i=int(sys.argv[2])
rs=rm.runs_of(raw);cuts=[0]+[(rs[j][1]+rs[j+1][0])//2 for j in range(len(rs)-1)]+[raw.width]
x0=max(cuts[i],rs[i][0]-60);x1=min(cuts[i+1],rs[i][1]+60)
raw.crop((x0,0,x1,raw.height)).save(sys.argv[3]);print(rs,(x0,x1))
