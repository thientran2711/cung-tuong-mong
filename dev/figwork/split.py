# split.py bg.png outdir name1 name2 name3 name4  -> outdir/fig-<name>.webp (900 tall), left->right
import sys,os,io
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
src,od=sys.argv[1],sys.argv[2]; names=sys.argv[3:7]
im=Image.open(src).convert('RGBA'); A=np.array(im); a=A[...,3]
# drop small components (corner florals, specks)
m=a>40; lab,n=ndi.label(ndi.binary_dilation(m[::4,::4],iterations=2))
sz=ndi.sum(np.ones_like(lab),lab,range(1,n+1)); big=sz.max()
keep=np.isin(lab,[i+1 for i in range(n) if sz[i]>=big*0.15])
km=keep.repeat(4,0).repeat(4,1)[:a.shape[0],:a.shape[1]]
A[...,3][~km]=0; a=A[...,3]
col=(a>40).sum(0)
W=a.shape[1]
runs=[];s=None
for x,c in enumerate(list(col)+[0]):
    if c>3 and s is None: s=x
    if c<=3 and s is not None:
        if x-s>W*0.02: runs.append([s,x])
        s=None
if len(runs)!=4:
    c=col.astype(float); cuts=[]
    for q in range(1,4):
        e=int(W*q/4); r=int(W*0.08); cuts.append(e-r+int(np.argmin(c[e-r:e+r])))
    b=[0]+cuts+[W]; runs=[[b[i],b[i+1]] for i in range(4)]
    print(' mincut',cuts)
os.makedirs(od,exist_ok=True)
def save(im,p,maxkb=250):
    for q in (86,80,74,68,60,52):
        bb=io.BytesIO(); im.save(bb,'WEBP',quality=q,method=6)
        if bb.tell()<=maxkb*1024: break
    open(p,'wb').write(bb.getvalue()); return bb.tell()
for (x0,x1),nm in zip(runs,names):
    if nm=='-': continue
    sub=Image.fromarray(A[:,x0:x1]); al=sub.split()[3].point(lambda v:255 if v>12 else 0)
    sub=sub.crop(al.getbbox()); w,h=sub.size
    fig=sub.resize((max(1,round(w*900/h)),900),Image.LANCZOS)
    kb=save(fig,f'{od}/fig-{nm}.webp'); print(nm,fig.size,kb//1024,'KB', 'src h',h)
