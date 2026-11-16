#!/usr/bin/env python3
"""Cut the 4 Magnific gpt-2-6 buổi-transition sheets (raw/*.png) into img/fx/buoi-*.webp (true alpha). Usage: python3 dev/fxwork/buoi/slice_buoi.py"""
import os, numpy as np
from PIL import Image
D=os.path.dirname(os.path.abspath(__file__)); OUT=os.path.join(D,"..","..","..","img","fx")
def ink(a,k=1.0):  # painted on white: alpha = darkness
    m=a.min(axis=2); al=np.clip((250-m)*255/235*k,0,255); f=np.maximum(al/255,1e-3)[...,None]
    rgb=np.clip((a-(1-f)*255)/f,0,255); o=np.dstack([rgb,al]).astype(np.uint8); o[al<=0]=0; return o
def luma(a,lo=8):  # painted on black: alpha = brightness
    m=a.max(axis=2); al=np.clip((m-lo)*255/(255-lo),0,255); rgb=np.clip(a*(255/np.maximum(m,1))[...,None],0,255)
    o=np.dstack([rgb,al]).astype(np.uint8); o[al<=0]=0; return o
def ld(n,size):
    im=Image.open(os.path.join(D,"raw",n+".png")).convert("RGB"); 
    if size: im=im.resize(size,Image.LANCZOS)
    return np.asarray(im).astype(np.float32)
def sv(arr,n,q=80):
    p=os.path.join(OUT,n+".webp"); Image.fromarray(arr,"RGBA").save(p,"WEBP",quality=q,method=6); print(n,os.path.getsize(p))
sv(ink(ld("wash",(512,256)),1.5),"buoi-wash",60)
sv(luma(ld("mist",(512,256))),"buoi-mist",55)
h=ld("hills",(896,299))[int(299*.5):]; sv(ink(h,1.3),"buoi-hills",65)
o=ld("orb",None); H,W=o.shape[:2]; fr=[]
for i in range(2):
    c=Image.fromarray(o[:,i*W//2:(i+1)*W//2].astype(np.uint8)).resize((128,128),Image.LANCZOS); fr.append(luma(np.asarray(c).astype(np.float32),4))
sv(np.concatenate(fr,axis=1),"buoi-orb",85)
