# propchk.py [globs...]: figure proportion check (owner 11/14: no squat/short figures).
# Uniform-scale pipeline is assumed (sheetproc only crops + scales uniformly). Metric: neck row = narrowest point of the
# head-centre run between the head's widest row and 30% of height; NECK = H / (top-to-neck). Top includes the hair bun,
# so a ~7-7.5-head adult gives NECK ~5.8-6.9 (calm t1-t3 median 6.2). Also H/W of the opaque bbox: calm standing figures 2.2-2.7;
# owner-marked squat ones (wide swirling fabric) 1.71-1.90 -> they render smaller/shorter in fixed frames. Flag H/W < HWMIN (2.0) or NECK < FLAG (5.5).
import sys,glob,os,numpy as np
from PIL import Image
FLAG=float(os.environ.get('FLAG',5.5)); HWMIN=float(os.environ.get('HWMIN',2.0))
def run_at(row,cx):
    xs=np.nonzero(row)[0]
    if not len(xs): return 0,cx
    if not row[cx]: cx=xs[np.argmin(abs(xs-cx))]
    l=cx
    while l>0 and row[l-1]: l-=1
    r=cx
    while r<len(row)-1 and row[r+1]: r+=1
    return r-l+1,(l+r)//2
def metrics(p):
    a=np.asarray(Image.open(p).convert('RGBA'))[...,3]>60
    ys=np.nonzero(a.any(1))[0]; y0=ys[0]; H=ys[-1]-y0+1; xs=np.nonzero(a.any(0))[0]; W=xs[-1]-xs[0]+1
    a=a[y0:]
    c=[];
    for y in range(int(H*.03),int(H*.13)):
        r=np.nonzero(a[y])[0]
        if len(r): c.append((r[0]+r[-1])/2)
    cx=int(np.median(c)) if c else a.shape[1]//2
    w=[];cc=cx
    for y in range(int(H*.32)):
        k,cc2=run_at(a[y],cc); w.append(k)
        if k: cc=cc2
    w=np.convolve(np.array(w,float),np.ones(5)/5,'same')
    lo,hi=int(H*.04),int(H*.16); yp=lo+int(np.argmax(w[lo:hi]))
    yn=yp+int(np.argmin(w[yp:int(H*.30)]))
    return H,W,yn,H/max(1,yn)
if __name__=="__main__":
    fs=[f for g in sys.argv[1:] for f in sorted(glob.glob(g))]; bad=[]
    for f in fs:
        import re; m=re.search(r"-t(\d)-",f); fl=FLAG-(0.4 if m and int(m.group(1))>=5 else 0)  # tall t5+ headdress adds height above the head
        H,W,yn,r=metrics(f); t=("NECK " if r<fl else "")+("WIDE" if H/W<HWMIN else "")
        if t: bad.append(os.path.basename(f))
        if os.environ.get('V') or t: print(f"{os.path.basename(f):34s} H/W={H/W:4.2f} neck={yn:4d} NECK={r:5.2f} {t}")
    print("flagged",len(bad),"of",len(fs))
