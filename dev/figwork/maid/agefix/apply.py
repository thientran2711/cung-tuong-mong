# apply.py edits.txt [jid..] : lines "A-mNN-mK editgen bgid" -> replace fig/por a51 in wmA/img + record
import sys,json,os,subprocess
import numpy as np
from PIL import Image
from scipy import ndimage
S="/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad"
WM=S+"/wmA"; W=WM+"/dev/figwork/maid"
import importlib.util
spec=importlib.util.spec_from_file_location("sp",W+"/spfuncs.py"); sp=importlib.util.module_from_spec(spec); spec.loader.exec_module(sp)
sp.OUT=WM+"/img"
subprocess.run(["python3",S+"/cwA/urls.py"],stdout=subprocess.DEVNULL)
db=json.load(open(S+"/cwA/urls.json"))
MF=WM+"/img/FIGURES-servants.json"; man=json.load(open(MF)); by={r["file"]:r for r in man}
only=set(sys.argv[2:]); figs=[]
L={}
for l in open(sys.argv[1]):
    p=l.split()
    if len(p)>=3: L[p[0]]=p
os.makedirs("bgc",exist_ok=True)
for j,(jid,g,b) in [(k,v[:3]) for k,v in L.items()]:
    if only and jid not in only: continue
    f=f"bgc/{b}.png"
    if not os.path.exists(f):
        if b not in db: print("NOURL",jid,b); continue
        subprocess.run(["curl","-sS","--retry","5","-o",f,db[b]],check=True)
    im=Image.open(f).convert("RGBA"); A=np.asarray(im).copy(); al=A[...,3]>20
    lab,n=ndimage.label(al); 
    if n==0: print("EMPTY",jid); continue
    sizes=ndimage.sum(al,lab,range(1,n+1)); big=int(np.argmax(sizes))+1
    # keep components whose centroid x lies within the main component's x-span
    ys,xs=np.nonzero(lab==big); x0,x1=xs.min(),xs.max()
    keep=np.zeros(n+1,bool); keep[big]=True
    for i in range(1,n+1):
        if sizes[i-1]<30: continue
        yy,xx=np.nonzero(lab==i)
        if x0<=xx.mean()<=x1: keep[i]=True
    A[...,3]=np.where(keep[lab],A[...,3],0)
    im2=Image.fromarray(A)
    _,m,t=jid.split("-"); name=f"fig-maid-{m}-t{t}-a51"
    old=by.get(f"img/{name}.webp")
    rec=dict(old) if old else {"role":"maid","identity":m,"tier":t,"ageBand":"a51"}
    rec.update(magnificUrl="https://www.magnific.com/app/creation/"+g,bg=b,sheet=jid,ageFix="a51 face aged to ~48 (edit pass)")
    sp.byfile={}; sp.finish(im2,name,rec)
    for k,r in sp.byfile.items(): by[k]=r
    figs.append(f"{WM}/img/{name}.webp"); print(jid,"ok")
json.dump(sorted(by.values(),key=lambda f:f["file"]),open(MF,"w"),indent=1,ensure_ascii=False)
if figs:
    r=subprocess.run(["python3",S+"/cwA/cf/cutcheck.py"]+figs,capture_output=True,text=True).stdout
    fl=[l.split()[-1] for l in r.splitlines() if l.split() and l.split()[0].replace('.','',1).isdigit() and float(l.split()[0])>=1.0]
    if fl: print("fixalpha",len(fl)); subprocess.run(["python3",S+"/cwA/cf/fixalpha.py"]+fl)
    subprocess.run(["python3",S+"/cwA/cf/porcrop.py","--out",WM+"/img"]+figs,stdout=subprocess.DEVNULL)
