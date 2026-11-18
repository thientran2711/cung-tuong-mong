#!/usr/bin/env python3
"""look-fx-faceclip.py <dir with veil-fit.json, sample.txt (por file names) and por/<files>>: skin-overshoot table of the BAL.looks.face polygon (jlooks.js).
Square crop of each por picture by its veil row (same geometry as KIT_RASH), skin = LAB distance to the cheek median < 28, closed + filled; share of the polygon NOT on skin per picture. Needs opencv-python-headless==4.10.0.84, scipy. Features (eyes, brows, lips) are closed into the skin mask; remaining overshoot = hair strands / ear / neck."""
import sys,os,re,json,numpy as np,cv2
from PIL import Image
from scipy import ndimage as ndi
D=sys.argv[1];v=json.load(open(D+"/veil-fit.json"))
def square(k,S=300):
    im=np.array(Image.open(D+"/por/"+k).convert("RGB"));H,W=im.shape[:2];x,y,w,h,rot=v[k];rw,rh=w/100*W,h/100*H;sw,sh=1.08*rw,1.165*rh;cx=x/100*W+rw/2;cy=y/100*H-.3826*rh+sh/2
    r=cv2.warpAffine(im,cv2.getRotationMatrix2D((cx,cy),rot,1.0),(W,H),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_REPLICATE);return cv2.resize(r[int(cy-sh/2):int(cy+sh/2),int(cx-sw/2):int(cx+sw/2)],(S,S))
def skin(sq):
    lab=cv2.cvtColor(sq,cv2.COLOR_RGB2LAB).astype(np.float32);S=sq.shape[0];a=lab[int(.55*S):int(.66*S),int(.2*S):int(.4*S)].reshape(-1,3);b=lab[int(.55*S):int(.66*S),int(.6*S):int(.8*S)].reshape(-1,3)
    d=np.linalg.norm(lab-np.median(np.vstack([a,b]),0),axis=2);sk=(d<28).astype(np.uint8);c=cv2.morphologyEx(sk,cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(15,15)));c=ndi.binary_fill_holes(c);lab2,n=ndi.label(c);l=lab2[int(.62*S),int(.5*S)];return (lab2==l) if l>0 else c>0
s=open(os.path.join(os.path.dirname(os.path.abspath(__file__)),"..","build","jlooks.js"),encoding="utf-8").read();P=eval(re.sub(r"(?<![\d])\.(\d)",r"0.\1",re.search(r"face:(\[\[.*?\]\])\}",s).group(1)))
S=300;pm=np.zeros((S,S),np.uint8);cv2.fillPoly(pm,[np.array([(x*S,y*S) for x,y in P],np.int32)],1);pm=pm>0
ks=[k for k in open(D+"/sample.txt").read().split() if k.startswith("por")];r=np.array([(pm&~skin(square(k,S))).sum()/pm.sum() for k in ks])
print("pictures",len(r),"off-skin share of the clip polygon: median %.3f p90 %.3f p95 %.3f max %.3f; pictures > 20 %%: %d"%(np.median(r),np.percentile(r,90),np.percentile(r,95),r.max(),(r>.2).sum()))

