# apply.py LIST [ROLE PREFIX MANIFEST] : lines "jid editgen bgid" -> a51 fig/por in worktree img + manifest + afix + porcrop + cutcheck
# part A: jid A-mNN-mK -> fig-maid-mNN-tmK-a51 (FIGURES-servants.json). part B: jid B-cNN-mK -> fig-consort-cNN-tmK-a51 (FIGURES.json)
import sys,json,os,subprocess,shutil
import numpy as np
from PIL import Image
from scipy import ndimage
W=os.environ.get("WT","/home/user/cung-tuong-mong/.claude/worktrees/agent-a86f02629e43ed2fc"); H=os.path.dirname(os.path.abspath(__file__))
import importlib.util
spec=importlib.util.spec_from_file_location("sp",H+"/spfuncs.py"); sp=importlib.util.module_from_spec(spec); spec.loader.exec_module(sp)
sp.OUT=W+"/img"
subprocess.run(["python3",H+"/urls.py"],stdout=subprocess.DEVNULL)
db=json.load(open(H+"/urls.json"))
figs=[]; os.makedirs(H+"/bgc",exist_ok=True); os.makedirs(H+"/old",exist_ok=True)
mans={}
for l in open(sys.argv[1]):
    p=l.split()
    if len(p)<3: continue
    jid,g,b=p[:3]
    part,ident,t=jid.split("-")
    role="maid" if part=="A" else "consort"
    MF=W+("/img/FIGURES-servants.json" if part=="A" else "/img/FIGURES.json")
    if MF not in mans: mans[MF]={r["file"]:r for r in json.load(open(MF))}
    by=mans[MF]
    f=f"{H}/bgc/{b}.png"
    if not os.path.exists(f):
        if b not in db: print("NOURL",jid,b); continue
        subprocess.run(["curl","-sS","--retry","5","-o",f,db[b]],check=True)
    im=Image.open(f).convert("RGBA"); A=np.asarray(im).copy(); al=A[...,3]>20
    lab,n=ndimage.label(al)
    if n==0: print("EMPTY",jid); continue
    sizes=ndimage.sum(al,lab,range(1,n+1)); big=int(np.argmax(sizes))+1
    ys,xs=np.nonzero(lab==big); x0,x1=xs.min(),xs.max()
    keep=np.zeros(n+1,bool); keep[big]=True
    for i in range(1,n+1):
        if sizes[i-1]<30: continue
        yy,xx=np.nonzero(lab==i)
        if x0<=xx.mean()<=x1: keep[i]=True
    A[...,3]=np.where(keep[lab],A[...,3],0)
    name=f"fig-{role}-{ident}-t{t}-a51"
    for pre in ("fig","por"):
        src=f"{W}/img/{pre}-{role}-{ident}-t{t}-a51.webp"; dst=f"{H}/old/{pre}-{role}-{ident}-t{t}-a51.webp"
        if os.path.exists(src) and not os.path.exists(dst): shutil.copy(src,dst)
    old=by.get(f"img/{name}.webp")
    rec=dict(old) if old else {"role":role,"identity":ident,"tier":t,"ageBand":"a51"}
    rec.update(magnificUrl="https://www.magnific.com/app/creation/"+g,bg=b,sheet=jid,ageFix="a51 face aged to ~48 (edit pass)")
    sp.byfile={}; sp.finish(Image.fromarray(A),name,rec)
    for k,r in sp.byfile.items(): by[k]=r
    figs.append(f"{W}/img/{name}.webp"); print(jid,"ok")
for MF,by in mans.items():
    json.dump(sorted(by.values(),key=lambda f:f["file"]),open(MF,"w"),indent=1,ensure_ascii=False)
if figs:
    subprocess.run(["python3",H+"/afix.py"]+figs,stdout=subprocess.DEVNULL)
    subprocess.run(["python3",H+"/porcrop.py"]+figs,stdout=subprocess.DEVNULL)
    r=subprocess.run(["python3",H+"/cutcheck.py"]+figs,capture_output=True,text=True).stdout
    print("\n".join(r.splitlines()[:4]))
