# fin.py CUT.png OLDFIG.webp OLDPOR.webp OUTDIR NAME : build fig (old height) + por (old framing) from a fresh single-figure cutout (rematte.cmd_fin)
import sys,os,importlib.util,numpy as np
from PIL import Image
W="/home/user/cung-tuong-mong/.claude/worktrees/agent-a4e8c6432e582a50a/"
spec=importlib.util.spec_from_file_location("rm",W+"dev/figwork/rematte.py");rm=importlib.util.module_from_spec(spec);spec.loader.exec_module(rm)
cut,of,op,out,name=sys.argv[1:6]
c=rm.clean(Image.open(cut).convert("RGBA"))
A=np.asarray(c);op_=A[...,3]>200;dk=(op_&(A[...,:3].max(axis=2)<25)).sum()/max(1,op_.sum());print("dark RGB share",round(dk,3))
a=c.split()[3].point(lambda x:255 if x>12 else 0);c=c.crop(a.getbbox());w,h=c.size
oldfig=Image.open(of).convert("RGBA");oldpor=Image.open(op).convert("RGBA")
fig=c.resize((max(1,round(w*oldfig.height/h)),oldfig.height),Image.LANCZOS)
os.makedirs(out,exist_ok=True)
kb=rm.save_webp(fig,f"{out}/fig-{name}.webp",250)
e,p=rm.fit_por(oldfig,oldpor);por=rm.por_crop(c,*p);pkb=rm.save_webp(por,f"{out}/por-{name}.webp",80)
print(name,"fig",fig.size,"old",oldfig.size,kb//1024,"KB; por fit err",round(e,1),p,pkb//1024,"KB")
