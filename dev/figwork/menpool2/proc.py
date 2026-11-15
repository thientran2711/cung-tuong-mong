# proc.py bg.txt [jid...]  lines: jid genId bgId url -> img/fig-man-<identity>-aXX.webp (+ por via porcrop.py), merged into img/FIGURES-congtu.json (pull it first; jht ctFace reads it, the men pool never does)
# (menpool2: suitors / Bắc Địch prince; role man, sub quytu / bacdich, 4 age bands)
import sys, json, os, io, subprocess
from PIL import Image
import numpy as np
W=os.path.dirname(os.path.abspath(__file__))
OUT=os.path.abspath(W+"/../../../img")
J=json.load(open(W+"/jobs.json"))
FP=OUT+"/FIGURES-congtu.json"; RAW=json.load(open(FP)); figs=RAW if isinstance(RAW,list) else (RAW.get("figures") or RAW.get("files"))
byfile={f["file"]:f for f in figs}
def save_webp(im,path,maxkb=250):
    for q in (86,80,74,68,60,52):
        b=io.BytesIO(); im.save(b,"WEBP",quality=q,method=4)
        if b.tell()<=maxkb*1024: break
    open(path,"wb").write(b.getvalue()); return b.tell()
def split(im,n):
    w,h=im.size; small=np.asarray(im.split()[3].resize((w//4,h//4))); sw=small.shape[1]
    col=list((small>20).sum(axis=0)); runs=[]; s=None
    for x,c in enumerate(col+[0]):
        if c>2 and s is None: s=x
        if c<=2 and s is not None: runs.append([s,x]); s=None
    runs=[r for r in runs if r[1]-r[0]>sw*0.01]
    while len(runs)>n:
        gaps=[runs[i+1][0]-runs[i][1] for i in range(len(runs)-1)]; i=gaps.index(min(gaps)); runs[i]=[runs[i][0],runs[i+1][1]]; del runs[i+1]
    return [(r[0]*4,r[1]*4) for r in runs]
only=set(sys.argv[2:]); os.makedirs(W+"/bg",exist_ok=True); made=[]
for line in open(sys.argv[1]):
    p=line.split()
    if len(p)<4: continue
    jid,gen,bid,url=p
    if only and jid not in only: continue
    raw=f"{W}/bg/{jid}-{bid}.png"
    if not os.path.exists(raw): subprocess.run(["curl","-sS","--retry","5","--retry-all-errors","-o",raw,url],check=True)
    im=Image.open(raw).convert("RGBA"); j=J[jid]
    cols=split(im,len(j["figs"]))
    assert len(cols)==len(j["figs"]),(jid,cols)
    for (x0,x1),fr in zip(cols,j["figs"]):
        rec=dict(fr); name=rec.pop("file")
        c=im.crop((max(0,x0-4),0,min(im.width,x1+4),im.height)); a=c.split()[3].point(lambda v:255 if v>12 else 0); c=c.crop(a.getbbox()); w,h=c.size
        save_webp(c.resize((max(1,round(w*900/h)),900),Image.LANCZOS),f"{OUT}/{name}.webp")
        rec.update({"file":f"img/{name}.webp","por":f"img/por-{name[4:]}.webp","tier":None,"look":None,
                    "magnificUrl":"https://www.magnific.com/app/creation/"+gen,"bg":bid,"sheet":jid})
        byfile[rec["file"]]=rec; made.append(f"{OUT}/{name}.webp")
    os.remove(raw)  # disk is tight: the cut-out is re-downloadable from Magnific (bg id)
    print(jid,"ok",im.size)
json.dump(sorted(byfile.values(),key=lambda f:f["file"]),open(FP,"w"),indent=1,ensure_ascii=False)
if made: subprocess.run([sys.executable,"-I",os.path.abspath(W+"/../porcrop.py")]+made)
print("FIGURES-congtu",len(byfile))
