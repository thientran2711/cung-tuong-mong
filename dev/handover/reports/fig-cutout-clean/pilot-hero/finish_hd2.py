import sys,os,glob
sys.path.insert(0,"/home/user/wt/repo/dev/handover/reports/fig-cutout-clean/tools")
import fit_fig
from PIL import Image
S="/tmp/claude-0/-home-user/822ff9f7-f197-5a41-b875-e127da8598e6/scratchpad"
for f in sorted(glob.glob(S+"/m/masters/*.png")):
    k=os.path.basename(f)[:-4]; old=Image.open(f"{S}/out/_old/fig-{k}.webp").convert("RGBA")
    im,_=fit_fig.fit(Image.open(f).convert("RGBA"),old,2700); os.makedirs(S+"/out/img/hd2",exist_ok=True)
    im.save(f"{S}/out/img/hd2/fig-{k}.webp","WEBP",quality=90,method=6); print(k,im.size)
for f in sorted(glob.glob(S+"/m/masters/*.png")):
    k=os.path.basename(f)[:-4]; p=f"{S}/out/img/hd/fig-{k}.webp"
    if not os.path.exists(p):
        old=Image.open(f"{S}/out/_old/fig-{k}.webp").convert("RGBA"); im,_=fit_fig.fit(Image.open(f).convert("RGBA"),old,1800)
        os.makedirs(S+"/out/img/hd",exist_ok=True); im.save(p,"WEBP",quality=90,method=6); print("hd",k,im.size)
