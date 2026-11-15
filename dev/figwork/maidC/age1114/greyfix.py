# greyfix.py SET... : darken/warm grey hair strands of SET-a51 (in out/ or worktree) toward the a26 hair colour of the same set. Deterministic colour correction.
import sys,os,numpy as np,cv2
from PIL import Image
from ag_lib import save_webp
import ct  # noqa (only for helpers) -- ct runs on import with empty argv
H=os.path.dirname(os.path.abspath(__file__))
for s in sys.argv[1:]:
    ref=ct.load(f"fig-maid-{s}-a26.webp","out"); R=ct.lab(ref); rh,_,_=ct.zones(ref)
    RC=np.hypot(R[...,1]-128,R[...,2]-128); rhair=R[(rh>0.5)&ct.hairsel(R[...,0],RC)]; m1=rhair.mean(0)
    fn=f"fig-maid-{s}-a51.webp"; im=ct.load(fn,"out"); X=ct.lab(im); hz,fz,w=ct.zones(im)
    XC=np.hypot(X[...,1]-128,X[...,2]-128)
    g=(XC<16)&(X[...,0]>m1[0]+12)&(X[...,0]<190)
    wt=(cv2.GaussianBlur((g*hz).astype(np.float32),(0,0),1.2)*cv2.GaussianBlur(hz,(0,0),max(1,w*0.06)))[...,None]
    T=X.copy(); T[...,0]=m1[0]+(X[...,0]-m1[0])*0.45; T[...,1:]=m1[1:]+(X[...,1:]-m1[1:])*0.5
    Y=X*(1-wt)+T*wt
    rgb=cv2.cvtColor(np.clip(Y,0,255).astype(np.uint8),cv2.COLOR_LAB2RGB)
    save_webp(Image.fromarray(np.dstack([rgb,np.asarray(im)[...,3]]),"RGBA"),f"{H}/out/{fn}"); print(s,"grey px",int(g.sum()*0+(g*hz>0.5).sum()))
