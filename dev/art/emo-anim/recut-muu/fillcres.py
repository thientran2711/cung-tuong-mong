"""Fill enclosed see-through regions that border the pink disc (green gap between the gold rim and the disc in the source clip)
with the disc colour (normalised Gaussian fill from nearby disc pixels), alpha 255. Gaps bordered only by rim/sleeve stay transparent."""
import sys, subprocess, numpy as np
from scipy import ndimage as nd
src,dst=sys.argv[1:3]
fr=np.load(src).copy(); S=fr.shape[1]; nfill=0
for f in fr:
    a=f[...,3]; op=a>=128
    lab,n=nd.label(op); big=lab==(np.argmax(np.bincount(lab.ravel())[1:])+1)
    fill=nd.binary_fill_holes(big); holes=fill&~op
    r,g,b=(f[...,i].astype(int) for i in range(3))
    pink=op&(r>g+40)&(b>g+15)&(a>250)
    hl,hn=nd.label(holes)
    tgt=np.zeros_like(holes)
    for k in range(1,hn+1):
        h=hl==k
        if h.sum()<20: tgt|=h; continue   # tiny pin holes: fill too
        bd=nd.binary_dilation(h,iterations=7)&~h
        if (pink&bd).sum()/max(1,bd.sum())>0.15: tgt|=h
    if not tgt.any(): continue
    nfill+=1
    tg=nd.binary_dilation(tgt,iterations=1)   # include the soft edge pixels
    w=pink.astype(float)
    col=np.stack([nd.gaussian_filter(f[...,i]*w,6) for i in range(3)],-1)/np.maximum(nd.gaussian_filter(w,6),1e-6)[...,None]
    # pixels far from pink: wider kernel
    col2=np.stack([nd.gaussian_filter(f[...,i]*w,14) for i in range(3)],-1)/np.maximum(nd.gaussian_filter(w,14),1e-6)[...,None]
    wt=nd.gaussian_filter(w,6)[...,None]; col=np.where(wt>0.05,col,col2)
    aa=a.astype(float)[...,None]/255
    newrgb=f[...,:3]*aa+col*(1-aa)   # blend semi-transparent edge with disc colour
    f[...,:3]=np.where(tg[...,None],np.clip(newrgb,0,255),f[...,:3]).astype(np.uint8)
    f[...,3]=np.where(tg,255,a)
print("frames filled",nfill)
enc=["ffmpeg","-loglevel","error","-y","-f","rawvideo","-pix_fmt","rgba","-s",f"{S}x{S}","-r","15","-i","-",
     "-c:v","libwebp_anim","-pix_fmt","yuva420p","-loop","0","-q:v","50","-compression_level","6",dst]
subprocess.run(enc,input=fr.tobytes(),check=True)
