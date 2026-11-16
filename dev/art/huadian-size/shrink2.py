# shrink2.py: exact-mask huadian shrink (replaces shrink.py's rectangle logic).
# analyze(rgb, win, fw) -> dict(mask,width,...) : win=(x0,y0,x1,y1) search window (int px, expanded a18 box). The mark is
#   what deviates from a poly skin fit (dE) inside win; dark components that leave the window (brows/hair) are never touched,
#   components touching the window border are dropped unless big. Nothing outside win is ever changed.
# apply(img_rgba, an, target) -> new RGBA with the mark scaled about its centroid to width=target*fw, skin refilled under the old mark.
import numpy as np, cv2
from PIL import Image
def _fit(xs,ys,v):
    A=np.stack([np.ones_like(xs),xs,ys,xs*xs,xs*ys,ys*ys],1); return np.linalg.lstsq(A,v,rcond=None)[0]
def _ev(c,xs,ys):
    return np.stack([np.ones_like(xs),xs,ys,xs*xs,xs*ys,ys*ys],1)@c
def analyze(rgb,win,fw,pad=None,inner=None,_depth=0):
    H,W=rgb.shape[:2]
    pad=pad or max(4,int(round(0.06*fw)))
    x0,y0,x1,y1=[int(round(v)) for v in win]
    x0,y0=max(x0,0),max(y0,0); x1,y1=min(x1,W),min(y1,H)
    X0,Y0,X1,Y1=max(x0-pad,0),max(y0-pad,0),min(x1+pad,W),min(y1+pad,H)
    reg=rgb[Y0:Y1,X0:X1].astype(np.float32); h,w=reg.shape[:2]
    inbox=np.zeros((h,w),bool); inbox[y0-Y0:y1-Y0,x0-X0:x1-X0]=True
    yy,xx=np.mgrid[0:h,0:w].astype(np.float32); xn,yn=xx/w,yy/h
    lab=cv2.cvtColor(np.clip(reg,0,255).astype(np.uint8),cv2.COLOR_RGB2LAB).astype(np.float32)
    L=lab[...,0]; ch=np.hypot(lab[...,1]-128,lab[...,2]-128)
    skin=np.median(L[~inbox]) if (~inbox).any() else np.median(L)
    ring=~inbox&(L>0.80*skin)
    if ring.sum()<30: ring=~inbox|(L>0.8*skin)
    keep=ring.copy(); fit=np.zeros_like(reg)
    for it in range(3):
        for c in range(3):
            co=_fit(xn[keep],yn[keep],reg[...,c][keep]); fit[...,c]=_ev(co,xn.ravel(),yn.ravel()).reshape(h,w)
        res=np.abs(reg-fit).sum(-1); s=np.std(res[keep]); keep=ring&(res<max(6,2.5*s))
    noise_sd=np.std((reg-fit)[keep],0)*0.6
    keep_idx=keep
    flab=cv2.cvtColor(np.clip(fit,0,255).astype(np.uint8),cv2.COLOR_RGB2LAB).astype(np.float32)
    dE=np.sqrt(((lab-flab)**2).sum(-1))
    kd=dE[keep_idx]; p95k=float(np.percentile(kd,95)); p99k=float(np.percentile(kd,99))
    # dark components that leave the window = brow / hair  -> protected (+2px)
    dark=((L<flab[...,0]-60)&(ch<30)).astype(np.uint8)
    n,lbl,st,_=cv2.connectedComponentsWithStats(dark)
    prot=np.zeros((h,w),bool); leak=[]
    inn=np.zeros((h,w),bool)
    if inner is not None:
        ix0,iy0,ix1,iy1=[int(round(v)) for v in inner]; inn[max(iy0-Y0,0):max(iy1-Y0,0),max(ix0-X0,0):max(ix1-X0,0)]=True
    for i in range(1,n):
        m=lbl==i
        if (m&~inbox).any():
            if inner is not None and (m&inn).any(): leak.append(m)
            else: prot|=m
    if leak and _depth<2:
        ys,xs=np.nonzero(np.any(leak,0)); lim=int(0.12*fw)
        nx0=max(min(x0,X0+xs.min()-2),int(win[0])-lim); ny0=max(min(y0,Y0+ys.min()-2),int(win[1])-lim)
        nx1=min(max(x1,X0+xs.max()+3),int(win[2])+lim); ny1=min(max(y1,Y0+ys.max()+3),int(win[3])+lim)
        if (nx0,ny0,nx1,ny1)!=(x0,y0,x1,y1):
            r=analyze(rgb,(nx0,ny0,nx1,ny1),fw,pad,inner,_depth+1)
            if r is not None: r['leak']=r.get('leak',0)+1
            return r
    prot=cv2.dilate(prot.astype(np.uint8),np.ones((5,5),np.uint8)).astype(bool)
    # also protect any dark pixel on the window border band (hair edge)
    cand=inbox&(dE>max(10.0,2.2*p99k))&~prot
    if cand.sum()<3: return None
    peak=float(np.percentile(dE[cand],95)); thc=max(10.0,2.2*p99k,0.30*peak); thw=max(4.5,1.1*p99k)
    strong=inbox&(dE>thc)&~prot
    weak=inbox&(dE>thw)&~prot
    # drop speckle
    n,lbl,st,_=cv2.connectedComponentsWithStats(strong.astype(np.uint8))
    for i in range(1,n):
        if st[i][4]<3: strong[lbl==i]=False
    if not strong.any(): return None
    # merge parts of one motif: components within 0.06fw of each other; keep clusters, drop border-touching small ones
    gap=max(3,int(0.06*fw))|1
    clus=cv2.dilate(strong.astype(np.uint8),cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(gap,gap)))
    n,lbl,st,_=cv2.connectedComponentsWithStats(clus)
    wb=np.zeros((h,w),bool); wb[y0-Y0:y1-Y0,x0-X0:x1-X0]=True
    bord=np.zeros((h,w),bool); bm=2
    bord[y0-Y0:y0-Y0+bm,x0-X0:x1-X0]=True; bord[y1-Y0-bm:y1-Y0,x0-X0:x1-X0]=True
    bord[y0-Y0:y1-Y0,x0-X0:x0-X0+bm]=True; bord[y0-Y0:y1-Y0,x1-X0-bm:x1-X0]=True
    areas={i:(strong&(lbl==i)).sum() for i in range(1,n)}
    tot=sum(areas.values()); good=np.zeros((h,w),bool)
    for i,a in areas.items():
        touch=(strong&(lbl==i)&bord).any()
        if a>=0.04*tot and (not touch or a>=0.3*tot): good|=(lbl==i)&strong
    if not good.any(): return None
    near=cv2.dilate(good.astype(np.uint8),np.ones((7,7),np.uint8)).astype(bool)
    n,lbl,st,_=cv2.connectedComponentsWithStats(weak.astype(np.uint8))
    keepl=set(np.unique(lbl[near&(lbl>0)]))
    wk=np.isin(lbl,list(keepl))&(lbl>0)&weak
    mark=good|wk
    cols=np.nonzero(good.any(0))[0]; width=cols[-1]-cols[0]+1
    return dict(leak=len(leak),p95k=p95k,p99k=p99k,reg=reg,fit=fit,dE=dE,mark=mark,strong=good,prot=prot,inbox=inbox,noise=noise_sd,width=float(width),
                org=(X0,Y0,X1,Y1),win=(x0,y0,x1,y1),fw=fw,bbox=(X0+cols[0],X0+cols[-1]+1))
def apply(rgba,an,target,seed=1,s_override=None):
    A=np.asarray(rgba.convert('RGBA')).astype(np.float32); X0,Y0,X1,Y1=an['org']
    reg,fit,dE,mark,inbox,good=an['reg'],an['fit'],an['dE'],an['mark'],an['inbox'],an['strong']; h,w=reg.shape[:2]
    yy,xx=np.mgrid[0:h,0:w].astype(np.float32)
    s=s_override if s_override is not None else min(1.0,target*an['fw']/an['width'])
    near=cv2.dilate(good.astype(np.uint8),np.ones((9,9),np.uint8)).astype(bool)
    rm=(cv2.dilate(good.astype(np.uint8),np.ones((5,5),np.uint8)).astype(bool)|(mark&near))&inbox&~an['prot']
    # fill: inpaint from the surrounding skin (no tonal mismatch at the borders), then add skin grain
    rmd=cv2.dilate(rm.astype(np.uint8),np.ones((3,3),np.uint8))
    bg=cv2.inpaint(np.clip(reg,0,255).astype(np.uint8),rmd,3,cv2.INPAINT_TELEA).astype(np.float32)
    bg=cv2.GaussianBlur(bg,(0,0),1.2)*rmd[...,None]+bg*(1-rmd[...,None])
    rng=np.random.default_rng(seed); nz=rng.normal(0,1,reg.shape).astype(np.float32)*an['noise']; nz=cv2.GaussianBlur(nz,(3,3),0.7)
    bg=bg+nz*rmd[...,None]
    fe=np.clip(cv2.GaussianBlur(rmd.astype(np.float32),(5,5),1.0),0,1)*inbox
    fe=fe[...,None]; clean=reg*(1-fe)+bg*fe
    a=np.clip((dE-4)/20.0,0,1)*rm
    P=(reg-bg*(1-a[...,None]))*rm[...,None]
    cy,cx=[float((g*a).sum()/max(a.sum(),1e-6)) for g in (yy,xx)]
    M=np.float32([[s,0,cx*(1-s)],[0,s,cy*(1-s)]]); U=4; Mu=M.copy(); Mu[:,2]*=U
    big=lambda z: cv2.resize(z,(w*U,h*U),interpolation=cv2.INTER_CUBIC)
    aw=cv2.warpAffine(big(a),Mu,(w*U,h*U),flags=cv2.INTER_AREA); Pw=cv2.warpAffine(big(P),Mu,(w*U,h*U),flags=cv2.INTER_AREA)
    aw=cv2.resize(aw,(w,h),interpolation=cv2.INTER_AREA); Pw=cv2.resize(Pw,(w,h),interpolation=cv2.INTER_AREA)
    aw=np.clip(aw,0,1)*inbox; Pw=Pw*inbox[...,None]
    out=clean*(1-aw[...,None])+Pw
    A[Y0:Y1,X0:X1,:3]=np.clip(out,0,255)
    return Image.fromarray(A.astype(np.uint8),'RGBA'),s

def layer(an):
    """mark layer of an analysis: (alpha, premultiplied colour P, bbox of strong mark, centroid) in region coords"""
    reg,dE,good,mark,inbox=an['reg'],an['dE'],an['strong'],an['mark'],an['inbox']; h,w=reg.shape[:2]
    near=cv2.dilate(good.astype(np.uint8),np.ones((9,9),np.uint8)).astype(bool)
    rm=(cv2.dilate(good.astype(np.uint8),np.ones((5,5),np.uint8)).astype(bool)|(mark&near))&inbox&~an['prot']
    rmd=cv2.dilate(rm.astype(np.uint8),np.ones((3,3),np.uint8))
    bg=cv2.inpaint(np.clip(reg,0,255).astype(np.uint8),rmd,3,cv2.INPAINT_TELEA).astype(np.float32)
    a=np.clip((dE-4)/20.0,0,1)*rm
    P=(reg-bg*(1-a[...,None]))*rm[...,None]
    ys,xs=np.nonzero(good); return a,P,(xs.min(),ys.min(),xs.max()+1,ys.max()+1),rm
def swap(rgba,an,donor_an,target,seed=1):
    """replace the recipient mark by the donor mark (scaled to width<=target*fw, centred on the recipient mark centre)"""
    A=np.asarray(rgba.convert('RGBA')).astype(np.float32); X0,Y0,X1,Y1=an['org']
    reg,inbox,good=an['reg'],an['inbox'],an['strong']; h,w=reg.shape[:2]
    near=cv2.dilate(good.astype(np.uint8),np.ones((9,9),np.uint8)).astype(bool)
    rm=(cv2.dilate(good.astype(np.uint8),np.ones((5,5),np.uint8)).astype(bool)|(an['mark']&near))&inbox&~an['prot']
    rmd=cv2.dilate(rm.astype(np.uint8),np.ones((3,3),np.uint8))
    bg=cv2.inpaint(np.clip(reg,0,255).astype(np.uint8),rmd,3,cv2.INPAINT_TELEA).astype(np.float32)
    bg=cv2.GaussianBlur(bg,(0,0),1.2)*rmd[...,None]+bg*(1-rmd[...,None])
    rng=np.random.default_rng(seed); nz=rng.normal(0,1,reg.shape).astype(np.float32)*an['noise']; nz=cv2.GaussianBlur(nz,(3,3),0.7)
    bg=bg+nz*rmd[...,None]
    fe=(np.clip(cv2.GaussianBlur(rmd.astype(np.float32),(5,5),1.0),0,1)*inbox)[...,None]; clean=reg*(1-fe)+bg*fe
    da,dP,db,_=layer(donor_an)
    dx0,dy0,dx1,dy1=db; dwid=dx1-dx0; s=min(1.0,target*an['fw']/dwid) if dwid>0 else 1.0
    # donor centre -> recipient centre
    ys,xs=np.nonzero(good); rcx=(xs.min()+xs.max()+1)/2; rcy=(ys.min()+ys.max()+1)/2
    dcx=(dx0+dx1)/2; dcy=(dy0+dy1)/2
    U=4; M=np.float32([[s,0,rcx-s*dcx],[0,s,rcy-s*dcy]]); Mu=M.copy(); Mu[:,2]*=U
    dh,dw=da.shape; Wc,Hc=w,h
    def warp(z):
        zb=cv2.resize(z,(dw*U,dh*U),interpolation=cv2.INTER_CUBIC)
        Mb=np.float32([[s,0,(rcx-s*dcx)*U],[0,s,(rcy-s*dcy)*U]])
        o=cv2.warpAffine(zb,Mb,(Wc*U,Hc*U),flags=cv2.INTER_AREA)
        return cv2.resize(o,(Wc,Hc),interpolation=cv2.INTER_AREA)
    aw=np.clip(warp(da),0,1)*inbox; Pw=warp(dP)*inbox[...,None]
    out=clean*(1-aw[...,None])+Pw
    A[Y0:Y1,X0:X1,:3]=np.clip(out,0,255)
    return Image.fromarray(A.astype(np.uint8),'RGBA'),s
