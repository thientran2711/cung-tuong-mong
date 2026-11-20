import sys,math,json,numpy as np
from PIL import Image
sys.path.insert(0,'dev/art/palettes3')
import four_season86_a32 as A
def srgb2lab(rgb):
    c=rgb/255.0; c=np.where(c>0.04045,((c+0.055)/1.055)**2.4,c/12.92)
    M=np.array([[0.4124,0.3576,0.1805],[0.2126,0.7152,0.0722],[0.0193,0.1192,0.9505]])
    xyz=c@M.T/np.array([0.95047,1.0,1.08883])
    f=np.where(xyz>0.008856,np.cbrt(xyz),7.787*xyz+16/116)
    return np.stack([116*f[...,1]-16,500*(f[...,0]-f[...,1]),200*(f[...,1]-f[...,2])],-1)
def hx(rgb): return '#%02X%02X%02X'%tuple(int(round(v)) for v in rgb)
def km(X,k=5,it=30,seed=0):
    rng=np.random.default_rng(seed); C=X[rng.choice(len(X),k,replace=False)]
    for _ in range(it):
        d=((X[:,None,:]-C[None])**2).sum(-1); l=d.argmin(1)
        C=np.array([X[l==j].mean(0) if (l==j).any() else C[j] for j in range(k)])
    return C,l
SHEETS={'m07':('dev/handover/review-sheets/old-8rank/m07_old_8rank_lbl.jpg',(120,1110)),
        'm29':('dev/handover/review-sheets/old-8rank/m29_old_8rank_lbl.jpg',(120,1110)),
        'm13':('dev/handover/review-sheets/rank-test/v487/m13_8rank_angles.jpg',(30,900)),
        'm20':('dev/handover/review-sheets/rank-test/v487/m20_8rank_angles.jpg',(30,900))}
out={}
for p,(f,(y0,y1)) in SHEETS.items():
    im=np.asarray(Image.open(f).convert('RGB'),dtype=np.float64); W=im.shape[1]; w=W/8
    for t in range(8):
        pan=im[y0:y1,int(t*w)+8:int((t+1)*w)-8]
        bg=np.median(np.concatenate([pan[:15].reshape(-1,3),pan[-15:].reshape(-1,3)]),0)
        lab=srgb2lab(pan); blab=srgb2lab(bg)
        C=np.hypot(lab[...,1],lab[...,2]); h=np.degrees(np.arctan2(lab[...,2],lab[...,1]))%360
        dbg=np.linalg.norm(lab-blab,axis=-1)
        skin=(lab[...,0]>70)&(C<22)&((h<75)|(h>350))
        m=(dbg>12)&(lab[...,0]>28)&(lab[...,0]<92)&~skin&(C>6)
        X=pan[m][::7]; L=srgb2lab(X)
        Cc,l=km(L,6)
        share=np.bincount(l,minlength=6)/len(l)
        rows=[]
        for j in np.argsort(-share):
            rgb=X[l==j].mean(0); lb=srgb2lab(rgb)
            rows.append(dict(share=round(float(share[j]),2),hex=hx(rgb),L=round(float(lb[0])),C=round(float(math.hypot(lb[1],lb[2]))),h=round(float(math.degrees(math.atan2(lb[2],lb[1]))%360))))
        out[f'{p}_t{t+1}']=rows
json.dump(out,open(sys.argv[1],'w'),indent=0)
for k,v in out.items():
    print(k,' '.join(f"{r['hex']}({int(r['share']*100)}% L{r['L']} C{r['C']} h{r['h']})" for r in v[:4]))
