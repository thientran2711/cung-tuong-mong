# sheetproc.py sheets_bg.txt [jid...]   lines: jid genId bgId
import sys, json, os, io, subprocess
from PIL import Image
import numpy as np
W=os.path.dirname(os.path.abspath(__file__))
OUT="/home/user/cung-tuong-mong/img"
J=json.load(open(W+"/jobs.json")); db=json.load(open(W+"/urls.json"))
FP=OUT+"/FIGURES.json"; figs=json.load(open(FP)) if os.path.exists(FP) else []
byfile={f["file"]:f for f in figs}
def save_webp(im,path,maxkb=250):
    for q in (86,80,74,68,60,52):
        b=io.BytesIO(); im.save(b,"WEBP",quality=q,method=4)
        if b.tell()<=maxkb*1024: break
    open(path,"wb").write(b.getvalue()); return b.tell()
def clean(im):
    # drop small alpha islands (e.g. a neighbour's fan tip after a min-cut split)
    from collections import deque
    a=np.asarray(im.split()[3]); h,w=a.shape; f=4
    m=(a[:h//f*f,:w//f*f].reshape(h//f,f,w//f,f).max(axis=(1,3))>40)
    lab=np.zeros(m.shape,int); sizes=[0]; H,Wd=m.shape
    for y0,x0 in zip(*np.nonzero(m)):
        if lab[y0,x0]: continue
        k=len(sizes); lab[y0,x0]=k; q=deque([(y0,x0)]); n=0
        while q:
            y,x=q.popleft(); n+=1
            for dy in (-1,0,1):
                for dx in (-1,0,1):
                    yy,xx=y+dy,x+dx
                    if 0<=yy<H and 0<=xx<Wd and m[yy,xx] and not lab[yy,xx]: lab[yy,xx]=k; q.append((yy,xx))
        sizes.append(n)
    if len(sizes)<=2: return im
    big=max(sizes); drop=[k for k in range(1,len(sizes)) if sizes[k]<big*0.02]
    if not drop: return im
    dm=np.isin(lab,drop).repeat(f,0).repeat(f,1); A=np.array(im); A[:dm.shape[0],:dm.shape[1],3][dm]=0
    return Image.fromarray(A)
def finish(im,name,rec):
    im=clean(im)
    a=im.split()[3].point(lambda v:255 if v>12 else 0); bb=a.getbbox(); im=im.crop(bb); w,h=im.size
    A=np.asarray(im.split()[3]); xs=n=0
    for y in range(int(h*0.03),int(h*0.13),2):
        row=np.nonzero(A[y]>128)[0]
        if len(row): xs+=(row[0]+row[-1])/2; n+=1
    cx=xs/n if n else w/2; side=int(h*0.21); top=int(h*0.01)
    por=Image.new("RGBA",(side,side),(0,0,0,0)); por.paste(im.crop((int(cx-side/2),top,int(cx-side/2)+side,top+side)),(0,0))
    save_webp(por.resize((256,256),Image.LANCZOS),f"{OUT}/por-{name[4:]}.webp",80)
    kb=save_webp(im.resize((max(1,round(w*900/h)),900),Image.LANCZOS),f"{OUT}/{name}.webp")
    rec=dict(rec); rec["file"]=f"img/{name}.webp"; rec["por"]=f"img/por-{name[4:]}.webp"
    byfile[rec["file"]]=rec; return kb
def split(im,n):
    w,h=im.size; al=im.split()[3]
    small=al.resize((w//4,h//4)); sw,sh=small.size
    col=list((np.asarray(small)>20).sum(axis=0))
    runs=[];s=None
    for x,c in enumerate(col+[0]):
        if c>2 and s is None: s=x
        if c<=2 and s is not None: runs.append([s,x]); s=None
    runs=[r for r in runs if r[1]-r[0]>sw*0.01]
    while len(runs)>n:
        gaps=[runs[i+1][0]-runs[i][1] for i in range(len(runs)-1)]; i=gaps.index(min(gaps))
        runs[i]=[runs[i][0],runs[i+1][1]]; del runs[i+1]
    if len(runs)<n:
        # fallback: cut at the emptiest column near each expected boundary
        c=np.array(col,dtype=float); cuts=[]
        for k in range(1,n):
            e=int(sw*k/n); r=int(sw*0.08); lo,hi=max(1,e-r),min(sw-1,e+r)
            cuts.append(lo+int(np.argmin(c[lo:hi])))
        b=[0]+cuts+[sw]; print("mincut",cuts,[int(c[x]) for x in cuts])
        return [(b[i]*4,b[i+1]*4) for i in range(n)]
    return [(r[0]*4,r[1]*4) for r in runs]
only=set(sys.argv[2:]); bad=[]
for line in open(sys.argv[1]):
    p=line.split()
    if len(p)<3: continue
    jid,gen,bid=p
    if only and jid not in only: continue
    j=J[jid]; f0=j["figs"][0]["file"]
    if not only and os.path.exists(f"{OUT}/{f0}.webp") and byfile.get(f"img/{f0}.webp",{}).get("bg")==bid: continue
    if bid not in db: print("nourl",jid); continue
    raw=f"{W}/bg/{jid}-{bid}.png"
    if not os.path.exists(raw): subprocess.run(["curl","-sS","-o",raw,db[bid]],check=True)
    im=Image.open(raw).convert("RGBA"); n=len(j["figs"])
    cols=split(im,n)
    if cols is None: bad.append(jid); print("SPLITFAIL",jid); continue
    for (x0,x1),fr in zip(cols,j["figs"]):
        rec=dict(fr); name=rec.pop("file")
        if name.startswith("_"): continue
        rec["magnificUrl"]="https://www.magnific.com/app/creation/"+gen; rec["bg"]=bid; rec["sheet"]=jid
        finish(im.crop((max(0,x0-4),0,min(im.width,x1+4),im.height)),name,rec)
    print(jid,"ok",im.size)
json.dump(sorted(byfile.values(),key=lambda f:f["file"]),open(FP,"w"),indent=1,ensure_ascii=False)
print("FIGURES",len(byfile),"bad",bad)
