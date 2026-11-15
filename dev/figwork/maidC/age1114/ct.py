# ct.py SET... : deterministic LAB colour transfer of the a51 (and a36, env AGES) head region to match the same tier's a26 (reference).
#   hair pixels (dark, low chroma, in hair zone) -> mean/std of a26 hair; skin (face zone) -> mean (and only-reduce contrast) of a26 skin.
#   source = out_bak_hair/ (state after age+hair paste) or worktree img; writes out/. env DRY=1 -> print stats only.
import sys,os,numpy as np,cv2
from PIL import Image
from ag_lib import face,save_webp
H=os.path.dirname(os.path.abspath(__file__)); W="/home/user/cung-tuong-mong/.claude/worktrees/agent-a7a7268489937d5f2/img/"
AG=os.environ.get("AGES","a51 a36").split()
def load(fn,src):
    p=f"{H}/{src}/{fn}"
    return Image.open(p if os.path.exists(p) else W+fn).convert("RGBA")
def zones(im):
    x,y,w,h=face(im); W_,H_=im.size
    hz=np.zeros((H_,W_),np.float32); fz=np.zeros((H_,W_),np.float32)
    cv2.ellipse(hz,(int(x+w/2),int(y-h*0.15)),(int(w*1.3),int(h*1.5)),0,0,360,1,-1)
    cv2.ellipse(fz,(int(x+w/2),int(y+h*0.62)),(int(w*0.55),int(h*0.62)),0,0,360,1,-1)
    hz=np.clip(hz-fz,0,1); a=np.asarray(im)[...,3]>200
    return hz*a,fz*a,w
def lab(im):
    return cv2.cvtColor(np.asarray(im.convert("RGB")),cv2.COLOR_RGB2LAB).astype(np.float32)  # L 0-255, a,b offset 128
def hairsel(L,C): return (L<0.50*255)&(C<30)
def stats(v): return v.mean(0),v.std(0)+1e-3
for s in sys.argv[1:]:
    ref=load(f"fig-maid-{os.environ.get('REF',s)}-a26.webp","out_bak_hair"); R=lab(ref); rh,rf,_=zones(ref)
    RC=np.hypot(R[...,1]-128,R[...,2]-128)
    rhair=R[(rh>0.5)&hairsel(R[...,0],RC)]; rskin=R[(rf>0.5)&(R[...,0]>0.62*255)&(RC<35)]
    for a in AG:
        fn=f"fig-maid-{s}-{a}.webp"; im=load(fn,"out_bak_hair"); X=lab(im); hz,fz,w=zones(im)
        XC=np.hypot(X[...,1]-128,X[...,2]-128)
        sel=(hz>0.5)&hairsel(X[...,0],XC); xh=X[sel]; xs=X[(fz>0.5)&(X[...,0]>0.62*255)&(XC<35)]
        Y=X.copy()
        if len(xh)>80 and len(rhair)>80:
            m0,s0=stats(xh); m1,s1=stats(rhair); k=np.clip(s1/s0,0.6,1.8)
            T=(X-m0)*k+m1
            # weight: hair zone (soft), dark & low-chroma pixels (soft), keeps gold/flowers
            wz=cv2.GaussianBlur(hz,(0,0),max(1,w*0.08))
            wl=1/(1+np.exp((X[...,0]-0.55*255)/8)); wc=1/(1+np.exp((XC-34)/4))
            wt=(wz*wl*wc)[...,None]; Y=Y*(1-wt)+T*wt
        if len(xs)>80 and len(rskin)>80:
            m0,s0=stats(xs); m1,s1=stats(rskin); k=np.clip(s1/s0,0.8,1.0); k[1:]=np.clip(s1[1:]/s0[1:],0.8,1.1)
            T=(Y-m0)*k+m1
            wt=cv2.GaussianBlur(fz,(0,0),max(1,w*0.1))[...,None]; Y=Y*(1-wt)+T*wt
        if os.environ.get("DRY"): print(s,a,"hair",np.round(stats(xh)[0]),"->",np.round(stats(rhair)[0]),"skin",np.round(stats(xs)[0]),"->",np.round(stats(rskin)[0])); continue
        rgb=cv2.cvtColor(np.clip(Y,0,255).astype(np.uint8),cv2.COLOR_LAB2RGB)
        out=np.dstack([rgb,np.asarray(im)[...,3]]); save_webp(Image.fromarray(out,"RGBA"),f"{H}/out/{fn}")
    print(s,"ok")
