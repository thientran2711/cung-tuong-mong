# shrink.py: shrink the huadian on an existing portrait (no redraw): remove mark from skin (poly skin fit), scale the
# mark layer (alpha + premultiplied colour) about its centroid so its width = target * face width.
import numpy as np, cv2
from PIL import Image
def _fit(xs,ys,v,deg=2):
    A=np.stack([np.ones_like(xs),xs,ys,xs*xs,xs*ys,ys*ys],1)[:, :1+2+(3 if deg==2 else 0)]
    return np.linalg.lstsq(A,v,rcond=None)[0]
def _ev(c,xs,ys):
    A=np.stack([np.ones_like(xs),xs,ys,xs*xs,xs*ys,ys*ys],1)[:, :len(c)]; return A@c
def shrink(path,box,fw,target,pad=7,seed=1,cur=None,hl=75,hc=14):
    im=Image.open(path).convert("RGBA"); A=np.asarray(im).astype(np.float32)
    rgb=A[...,:3].copy(); boxes=box if isinstance(box[0],(tuple,list)) else [box]
    x0,y0=min(b[0] for b in boxes),min(b[1] for b in boxes); x1,y1=max(b[2] for b in boxes),max(b[3] for b in boxes)
    X0,Y0,X1,Y1=x0-pad,y0-pad,x1+pad,y1+pad
    reg=rgb[Y0:Y1,X0:X1]; h,w=reg.shape[:2]
    yy,xx=np.mgrid[0:h,0:w].astype(np.float32); xn,yn=xx/w,yy/h
    inbox=np.zeros((h,w),bool)
    for b in boxes: inbox[b[1]-Y0:b[3]-Y0,b[0]-X0:b[2]-X0]=True
    lab=cv2.cvtColor(np.clip(reg,0,255).astype(np.uint8),cv2.COLOR_RGB2LAB).astype(np.float32)
    ring=~inbox & (lab[...,0]>0.80*np.median(lab[...,0][~inbox]))
    fit=np.zeros_like(reg); keep=ring.copy()
    for it in range(3):
        for c in range(3):
            co=_fit(xn[keep],yn[keep],reg[...,c][keep]); fit[...,c]=_ev(co,xn.ravel(),yn.ravel()).reshape(h,w)
        res=np.abs(reg-fit).sum(-1); s=np.std(res[keep]); keep=ring&(res<max(6,2.5*s))
    noise_sd=np.std((reg-fit)[keep],0)*0.6
    flab=cv2.cvtColor(np.clip(fit,0,255).astype(np.uint8),cv2.COLOR_RGB2LAB).astype(np.float32)
    dE=np.sqrt(((lab-flab)**2).sum(-1))
    hair=(lab[...,0]<flab[...,0]-hl)&(np.hypot(lab[...,1]-128,lab[...,2]-128)<hc)
    mark=inbox&(dE>8)&~hair
    n,lbl,st,_=cv2.connectedComponentsWithStats(mark.astype(np.uint8))
    for i in range(1,n):
        if st[i][4]<3: mark[lbl==i]=False
    weak=(inbox&(dE>4.5)&~hair).astype(np.uint8)
    n,lbl,st,_=cv2.connectedComponentsWithStats(weak)
    near=cv2.dilate(mark.astype(np.uint8),np.ones((7,7),np.uint8)).astype(bool)
    keepl=set(np.unique(lbl[near&(lbl>0)]))
    wk=np.isin(lbl,list(keepl))&(lbl>0)
    rm=cv2.dilate((mark|wk).astype(np.uint8),np.ones((3,3),np.uint8)).astype(bool)&~hair&inbox
    rng=np.random.default_rng(seed); nz=rng.normal(0,1,reg.shape).astype(np.float32)*noise_sd
    nz=cv2.GaussianBlur(nz,(3,3),0.7)
    fe=np.clip(cv2.GaussianBlur(rm.astype(np.float32),(5,5),1.0)*1.6,0,1)[...,None]
    clean=reg*(1-fe)+(fit+nz)*fe
    md=cv2.dilate(mark.astype(np.uint8),np.ones((3,3),np.uint8)).astype(bool)&rm
    a=np.clip((dE-4)/20.0,0,1)*md
    P=(reg-fit*(1-a[...,None]))*md[...,None]
    cols=np.nonzero((a>0.25).any(0))[0]; mw=(cols[-1]-cols[0]+1) if len(cols) else 1
    s=min(1.0,target/cur if cur else target*fw/mw)
    cy,cx=[float((g*a).sum()/max(a.sum(),1e-6)) for g in (yy,xx)]
    # scale about centroid (affine, Lanczos via supersampling)
    M=np.float32([[s,0,cx*(1-s)],[0,s,cy*(1-s)]])
    U=4; Mu=M.copy(); Mu[:,2]*=U
    big=lambda z: cv2.resize(z,(w*U,h*U),interpolation=cv2.INTER_CUBIC)
    aw=cv2.warpAffine(big(a),Mu,(w*U,h*U),flags=cv2.INTER_AREA if s<1 else cv2.INTER_CUBIC)
    Pw=cv2.warpAffine(big(P),Mu,(w*U,h*U),flags=cv2.INTER_AREA)
    aw=cv2.resize(aw,(w,h),interpolation=cv2.INTER_AREA); Pw=cv2.resize(Pw,(w,h),interpolation=cv2.INTER_AREA)
    out=clean*(1-np.clip(aw,0,1)[...,None])+Pw
    rgb[Y0:Y1,X0:X1]=out; A[...,:3]=np.clip(rgb,0,255)
    return Image.fromarray(A.astype(np.uint8),"RGBA"),mw/fw,s,mark
