import io
from PIL import Image
import numpy as np
OUT=None
byfile={}
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
