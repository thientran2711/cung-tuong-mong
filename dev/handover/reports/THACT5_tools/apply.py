# apply.py <src> <dst> keys… : per-frame disc normalisation to dev/art/emo-anim/disc_scale_spec.py (needs <src>/<k>.disc.npy from meas_raw.py)
import sys,os,numpy as np
from PIL import Image
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'../../../art/emo-anim'))
import disc_scale_spec as SP
from disc import frames
def warp(fr,s,src_c,dst_c,W):
    f=fr.astype(np.float32); al=f[...,3:4]/255.; pm=np.concatenate([f[...,:3]*al,f[...,3:4]],2)
    co=(1/s,0,src_c[0]-dst_c[0]/s, 0,1/s,src_c[1]-dst_c[1]/s)
    ch=[np.array(Image.fromarray(pm[...,i]).convert('F').transform((W,W),Image.AFFINE,co,Image.BICUBIC)) for i in range(4)]
    a=np.clip(ch[3],0,255); rgb=np.where(a[...,None]>1,np.stack(ch[:3],2)/np.maximum(a[...,None]/255.,1e-3),0)
    out=np.concatenate([np.clip(rgb,0,255),a[...,None]],2).astype(np.uint8); out[...,3]=np.where(out[...,3]<8,0,out[...,3]); return out
def save(fr,p):
    ims=[Image.fromarray(f) for f in fr]
    ims[0].save(p,save_all=True,append_images=ims[1:],duration=1000//SP.FPS,loop=0,quality=82,method=6,lossless=False,exact=True)
src,dst=sys.argv[1],sys.argv[2]; os.makedirs(dst,exist_ok=True)
for k in sys.argv[3:]:
    parts=[(p,frames(f'{src}/{k}-{p}.webp')) for p in ('out','loop','back')]; D=np.load(f'{src}/{k}.disc.npy'); i0=0; clip=0
    for p,fr in parts:
        res=[]
        for i,f in enumerate(fr):
            cx,cy,r,_=D[i0+i]; s=SP.R0*SP.scale(p,i,len(fr))/r; g=warp(f,s,(cx,cy),SP.C0,SP.W); res.append(g)
            a=g[...,3]>24; clip=max(clip,int(a[0].sum()+a[-1].sum()+a[:,0].sum()+a[:,-1].sum()))
        save(res,f'{dst}/{k}-{p}.webp'); i0+=len(fr)
    print(k,'done; alpha px on canvas border (max/frame):',clip,flush=True)
