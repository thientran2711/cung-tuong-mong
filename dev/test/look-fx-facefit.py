#!/usr/bin/env python3
"""look-fx-facefit.py <dir with veil-fit.json + pics/> [--write out.json] [--thr .10]: per-picture FACE-FIT rows for the face clip (BAL.looks.face polygon, jlooks.js).
For every por-/fig- picture with a veil row: square crop (same geometry as KIT_RASH / lkSquareRect), skin mask (LAB distance to the cheek median < 28, features closed in, largest blob at the nose-mouth point),
share of the polygon that is NOT skin. Pictures over --thr get a row [dx,dy,sx,sy] (face-square units: polygon scaled by sx,sy about (.5,.55) then moved by dx,dy) found by grid search:
maximise skin inside - 3 x non-skin inside, polygon area >= 55 % of the base one. Pictures under --thr get no row (base polygon). Prints the before/after table.
Needs opencv-python-headless==4.10.0.84, scipy."""
import sys,os,re,json,itertools,numpy as np,cv2
from PIL import Image
from scipy import ndimage as ndi
D=sys.argv[1];a=sys.argv[2:];thr=float(a[a.index("--thr")+1]) if "--thr" in a else .10;out=a[a.index("--write")+1] if "--write" in a else None
v=json.load(open(D+"/veil-fit.json"));S=200
def square(k):
    im=np.array(Image.open(D+"/pics/"+k).convert("RGB"));H,W=im.shape[:2];x,y,w,h,rot=v[k];rw,rh=w/100*W,h/100*H;sw,sh=1.08*rw,1.165*rh;cx=x/100*W+rw/2;cy=y/100*H-.3826*rh+sh/2
    r=cv2.warpAffine(im,cv2.getRotationMatrix2D((cx,cy),rot,1.0),(W,H),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_REPLICATE);c=r[max(0,int(cy-sh/2)):int(cy+sh/2),max(0,int(cx-sw/2)):int(cx+sw/2)]
    return cv2.resize(c,(S,S))
def skin(sq):
    lab=cv2.cvtColor(sq,cv2.COLOR_RGB2LAB).astype(np.float32);a=lab[int(.55*S):int(.66*S),int(.2*S):int(.4*S)].reshape(-1,3);b=lab[int(.55*S):int(.66*S),int(.6*S):int(.8*S)].reshape(-1,3)
    d=np.linalg.norm(lab-np.median(np.vstack([a,b]),0),axis=2);sk=(d<28).astype(np.uint8);c=cv2.morphologyEx(sk,cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(11,11)));c=ndi.binary_fill_holes(c);l2,n=ndi.label(c);l=l2[int(.62*S),int(.5*S)];return (l2==l) if l>0 else c>0
s=open(os.path.join(os.path.dirname(os.path.abspath(__file__)),"..","build","jlooks.js"),encoding="utf-8").read();P=np.array(eval(re.sub(r"(?<![\d])\.(\d)",r"0.\1",re.search(r"face:(\[\[.*?\]\])\}",s).group(1))))
def mask(dx=0,dy=0,sx=1,sy=1):
    Q=np.stack([(P[:,0]-.5)*sx+.5+dx,(P[:,1]-.55)*sy+.55+dy],1);m=np.zeros((S,S),np.uint8);cv2.fillPoly(m,[(Q*S).astype(np.int32)],1);return m>0
base=mask();A0=base.sum()
G=[(dx,dy,sx,sy) for dx in np.arange(-.12,.121,.03) for dy in np.arange(-.10,.121,.03) for sx in (1,.92,.84,.76) for sy in (1,.92,.84,.76)];GM=[(g,mask(*g)) for g in G];GM=[(g,m) for g,m in GM if m.sum()>=.55*A0]
rows={};b4=[];af=[]
for k in sorted(v):
    f=D+"/pics/"+k
    if not os.path.exists(f):continue
    try:sk=skin(square(k))
    except Exception as e:print("skip",k,e);continue
    o=(base&~sk).sum()/A0;b4.append(o)
    if o<=thr:af.append(o);continue
    best=min(GM,key=lambda gm:-((gm[1]&sk).sum()-3*(gm[1]&~sk).sum()));g,m=best;n=(m&~sk).sum()/m.sum()
    if n>.2:g=(0,0,.8,.8);n=min(n,(mask(*g)&~sk).sum()/mask(*g).sum())  # skin mask unreliable (headdress, beard): conservative core, always written
    if n<o or n>.2 or g==(0,0,.8,.8):rows[k]=[round(float(x),3) for x in g];af.append(n)
    else:af.append(o)
b4=np.array(b4);af=np.array(af)
print("pictures",len(b4),"rows written",len(rows))
for nm,r in (("before (one polygon)",b4),("after (per-picture rows)",af)):print("%-26s median %.3f p90 %.3f p95 %.3f max %.3f  >10%%: %d  >20%%: %d"%(nm,np.median(r),np.percentile(r,90),np.percentile(r,95),r.max(),(r>.1).sum(),(r>.2).sum()))
if out:json.dump(rows,open(out,"w"),separators=(",",":"))
