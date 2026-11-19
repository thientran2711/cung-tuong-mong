#!/usr/bin/env python3
"""recut.py src dst ss [frames|-] MODE PARAM   MODE=rgb (RGB distance to sampled bg green, PARAM='lo,hi') or ck (chromakey sim)
288 px, 15 fps, edge-only despill (3 px), animated webp alpha (same encode as mo/cut.py)."""
import subprocess, sys, numpy as np
S=288
def dilate(m, r):
    o = m.copy()
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1):
            o |= np.roll(np.roll(m, dy, 0), dx, 1)
    return o
src,dst,ss,nf,mode,param=sys.argv[1:7]
cmd=["ffmpeg","-loglevel","error","-ss",ss,"-i",src]
if mode=="rgb":
    cmd+=["-vf",f"scale={S}:{S}:flags=lanczos,fps=15","-f","rawvideo","-pix_fmt","rgb24","-"]
    fr=np.frombuffer(subprocess.run(cmd,capture_output=True,check=True).stdout,np.uint8).reshape(-1,S,S,3)
    lo,hi=map(float,param.split(","))
    out=np.zeros(fr.shape[:3]+(4,),np.uint8)
    for i,f in enumerate(fr):
        c=f.astype(np.int16); bg=np.median(np.concatenate([c[:6].reshape(-1,3),c[-6:].reshape(-1,3)]),0)
        d=np.sqrt(((c-bg)**2).sum(-1)); a=(np.clip((d-lo)/(hi-lo),0,1)*255).astype(np.uint8)
        out[i,...,:3]=f; out[i,...,3]=a
else:
    cmd+=["-vf",f"chromakey=0x00FF00:{param}:0.05,scale={S}:{S}:flags=lanczos,fps=15,format=rgba","-f","rawvideo","-"]
    out=np.frombuffer(subprocess.run(cmd,capture_output=True,check=True).stdout,np.uint8).reshape(-1,S,S,4).copy()
if nf!="-": out=out[:int(nf)]
for f in out:
    a=f[...,3]; edge=dilate(a<250,3)
    r,g,b=(f[...,i].astype(np.int16) for i in range(3)); lim=np.maximum(r,b)
    f[...,1]=np.where(edge&(g>lim),lim,g).astype(np.uint8)
    f[...,3]=np.where(a<8,0,a)
np.save(dst+".npy",out)
enc=["ffmpeg","-loglevel","error","-y","-f","rawvideo","-pix_fmt","rgba","-s",f"{S}x{S}","-r","15","-i","-",
     "-c:v","libwebp_anim","-pix_fmt","yuva420p","-loop","0","-q:v","50","-compression_level","6",dst]
subprocess.run(enc,input=out.tobytes(),check=True)
print(dst,len(out),"frames ss",ss)
