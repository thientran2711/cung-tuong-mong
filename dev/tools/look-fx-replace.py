#!/usr/bin/env python3
"""look-fx-replace.py <art dir> [--write outdir] [--sheet sheet.png]: face-square mark art vs the two filters every face mark meets in the game:
 (1) KEEP-OUT mask (BAL.looks.keep: eye/mouth/nose ellipses x pad 1.45 + the 22 % fade, same maths as lkKeepCss / look-fx-keepout.py) and (2) the FACE clip (BAL.looks.face polygon, face-square units).
Prints per file: share of the mark's alpha that SURVIVES both (target >= 90 %). With --write, a file under 90 % is RE-PLACED: its blobs (connected parts of alpha, nothing redrawn) are translated (nearest free spot first) and, if needed, shrunk (x.85 steps, min .35)
into the free zone (outside every grown ellipse + inside the polygon shrunk by a margin), no two blobs stacked; writes <name>-r9.png. Needs scipy, cv2, PIL."""
import sys,os,re,json,numpy as np,cv2
from PIL import Image
from scipy import ndimage as ndi
D=sys.argv[1];a=sys.argv[2:];W=a[a.index("--write")+1] if "--write" in a else None;SH=a[a.index("--sheet")+1] if "--sheet" in a else None
src=open(os.environ.get("JL") or os.path.join(os.path.dirname(os.path.abspath(__file__)),"..","build","jlooks.js"),encoding="utf-8").read();J=lambda x:json.loads(re.sub(r"(?<![\d])\.(\d)",r"0.\1",x))
m=re.search(r"keep:\{eye:(\[\[.*?\]\]),mouth:(\[.*?\]),nose:(\[.*?\]),pad:([\d.]+)",src);K=J(m.group(1))+[J(m.group(2)),J(m.group(3))];PAD=float(m.group(4));P=np.array(J(re.search(r"face:(\[\[.*?\]\])\}",src).group(1)))
S=384;yy,xx=np.mgrid[0:S,0:S];xs=(xx+.5)/S;ys=(yy+.5)/S;keep=np.zeros((S,S));inside=np.zeros((S,S),bool)
for u,v,ru,rv in K:
    s=(u+.04)/1.08;t=(v+.3826)/1.165;hw=ru*PAD*1.22/1.08;hh=rv*PAD*1.22/1.165;d=np.sqrt(((xs-s)/hw)**2+((ys-t)/hh)**2);keep=np.maximum(keep,np.clip((1-d)/.18,0,1));inside|=d<=1
pm=np.zeros((S,S),np.uint8);cv2.fillPoly(pm,[(P*S).astype(np.int32)],1);pm=pm>0
pm2=np.zeros((S,S),np.uint8);cv2.fillPoly(pm2,[(((P-[.5,.55])*.9+[.5,.55])*S).astype(np.int32)],1)   # blobs go into the polygon shrunk to 90 %: a per-picture face-fit row can move the edge in, and a blob on the edge would be cut into a hard wedge
FREE=(~inside)&(pm2>0);FREE=ndi.binary_erosion(FREE,iterations=4)   # free zone for re-placed blobs (margin 4 px from the polygon edge and the ellipses)
def alpha(f):return np.asarray(Image.open(f).convert("RGBA"))[...,3].astype(float)/255
def kept(al):t=al.sum();return float((al*(1-keep)*pm).sum()/t) if t else 1.
def replace(f):
    im=np.asarray(Image.open(f).convert("RGBA")).copy();al=im[...,3]>8;lab,n=ndi.label(ndi.binary_dilation(al,iterations=3));occ=np.zeros((S,S),bool);out=np.zeros_like(im);rng=np.random.RandomState(7)
    comps=sorted(range(1,n+1),key=lambda i:-(lab==i).sum())
    for i in comps:
        c=(lab==i);ys_,xs_=np.nonzero(c);y0,y1,x0,x1=ys_.min(),ys_.max()+1,xs_.min(),xs_.max()+1;patch=im[y0:y1,x0:x1].copy();pm_=c[y0:y1,x0:x1]&(patch[...,3]>0)
        bad=((keep[y0:y1,x0:x1]>0)|~pm[y0:y1,x0:x1])&pm_
        if bad.sum()<=.02*max(1,pm_.sum()):out[y0:y1,x0:x1][pm_]=patch[pm_];occ[y0:y1,x0:x1]|=pm_;continue
        placed=False
        for sc in (1,.85,.72,.6,.5,.42,.35):
            h,w=patch.shape[:2];nh,nw=max(2,int(h*sc)),max(2,int(w*sc));pt=cv2.resize(patch,(nw,nh),interpolation=cv2.INTER_AREA);mk=pt[...,3]>8;best=None
            for dy in range(0,S-nh,3):
                for dx in range(0,S-nw,3):
                    reg=FREE[dy:dy+nh,dx:dx+nw]
                    if not reg[mk].all():continue
                    if (occ[dy:dy+nh,dx:dx+nw]&ndi.binary_dilation(mk,iterations=4)).any():continue
                    dist=(dx-x0)**2+(dy-y0)**2
                    if best is None or dist<best[0]:best=(dist,dx,dy)
            if best:
                _,dx,dy=best;sl=(slice(dy,dy+nh),slice(dx,dx+nw));out[sl][mk]=pt[mk];occ[sl]|=mk;placed=True;break
        if not placed:   # too big for any free spot even shrunk: keep the part that lies on free skin (what the game mask would leave) instead of dropping the whole blob
            ok=pm_&(keep[y0:y1,x0:x1]<.001)&pm2[y0:y1,x0:x1].astype(bool)&~(occ[y0:y1,x0:x1])
            if ok.sum()<.6*pm_.sum():ok[:]=False   # a blob cut to a hard-edged wedge looks worse than no blob: dropped
            out[y0:y1,x0:x1][ok]=patch[ok];occ[y0:y1,x0:x1]|=ok;print("   blob cut to free skin:",os.path.basename(f),"size",pm_.sum(),"kept",ok.sum())
    return Image.fromarray(out)
res=[]
for f in sorted(x for x in os.listdir(D) if re.fullmatch(r"fx-[a-z]+(-[a-z]+)?-\d(-m|-r\d+)?\.png",x) and "-r" not in x[-7:]):
    k=kept(alpha(os.path.join(D,f)));line="%-24s kept %5.1f %%"%(f,k*100)
    if W and k<.9:
        o=replace(os.path.join(D,f));k2=kept(np.asarray(o)[...,3].astype(float)/255);os.makedirs(W,exist_ok=True);o.save(os.path.join(W,f.replace(".png","-r9.png")));line+="  ->  re-placed kept %5.1f %%"%(k2*100)
    print(line)
