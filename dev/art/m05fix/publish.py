# publish.py FACE... : out/fig -> worktree img, porcrop, alpha-unchanged check, cutcheck vs orig, before/after sheet in dev/shots/m05fix/FACE.jpg
#  (no CDN push here; run cdn_sync after)
import sys,os,glob,shutil,subprocess,numpy as np
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__)); WT="/home/user/cung-tuong-mong/.claude/worktrees/agent-a8fc7f5e0876349f1"
for f in sys.argv[1:]:
    D=os.path.abspath(os.environ.get("HDROOT",f"{H}/../hd"))+f"/{f}"; SUF=os.environ.get("SHOTSUF",""); figs=sorted(glob.glob(f"{D}/out/fig-*.webp")); dst=[]
    for p in figs:
        b=os.path.basename(p); o=np.asarray(Image.open(f"{D}/orig/{b}").convert("RGBA"))[...,3]; n=np.asarray(Image.open(p).convert("RGBA"))[...,3]
        assert o.shape==n.shape and (o==n).all(), ("alpha changed",b)
        shutil.copy(p,f"{WT}/img/{b}"); dst.append(f"{WT}/img/{b}")
    r=subprocess.run([sys.executable,f"{WT}/dev/figwork/maidC/porcrop.py"]+dst,capture_output=True,text=True)
    if r.returncode: print(r.stderr[-500:]); sys.exit(1)
    pors=[x.replace("/fig-","/por-") for x in dst]
    def cc(files):
        r=subprocess.run([sys.executable,f"{WT}/dev/figwork/cutcheck.py"]+files,capture_output=True,text=True).stdout
        return {os.path.basename(l.split()[-1]):float(l.split()[0]) for l in r.splitlines() if l.strip() and l.split()[0].replace('.','',1).isdigit()}
    new=cc(dst+pors); old=cc([f"{D}/orig/{os.path.basename(x)}" for x in dst+pors if os.path.exists(f"{D}/orig/{os.path.basename(x)}")])
    worse=[(k,old.get(k),v) for k,v in new.items() if v>=1 and v>old.get(k,0)+0.8]
    print(f,len(dst),"figs; cutcheck worse than before:",worse or "none")
    ts=sorted({os.path.basename(x).split("-")[3] for x in dst})
    subprocess.run([sys.executable,f"{H}/sheet.py",f"{WT}/dev/shots/m05fix/{f}{SUF}.jpg",f"{D}/orig",f"{WT}/img",f,os.environ.get("SHOTTITLE",f"{f}: hoa điền đổi sang hoa lá")+f" (trước/sau, a18 các bậc; hàng dưới {ts[0]} bốn tuổi)"]+ts,cwd=H,capture_output=True)
    shutil.copy(f"{D}/c/cmp.jpg",f"{WT}/dev/shots/m05fix/{f}{SUF}-forehead.jpg")
