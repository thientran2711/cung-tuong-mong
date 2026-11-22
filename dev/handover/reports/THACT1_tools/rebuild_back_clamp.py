import sys,numpy as np
from PIL import Image
def _win(x,w,fn):
    h=w//2; p=np.pad(x,(h,h),mode='edge'); return np.array([fn(p[i:i+w]) for i in range(len(x))])
def median_filter(x,w): return _win(x,w,np.median)
def minimum_filter1d(x,w): return _win(x,w,np.min)
def uniform_filter1d(x,w): return _win(x,w,np.mean)
def frames(p):
    im=Image.open(p); r=[]
    for i in range(im.n_frames):
        im.seek(i); r.append(np.array(im.convert('RGBA')))
    return r
def meas(fr):
    a=fr[...,3]>128
    ys=np.where(a.any(1))[0]; y0,y1=ys.min(),ys.max(); H=y1-y0+1
    ws=[];cs=[]
    for y in range(int(y0+.38*H),int(y0+.58*H)):
        xs=np.where(a[y])[0]
        if len(xs): ws.append(xs.max()-xs.min()+1); cs.append((xs.max()+xs.min())/2)
    w=np.array([(lambda xs: xs.max()-xs.min()+1 if len(xs) else 0)(np.where(a[y])[0]) for y in range(288)],float)
    w=np.convolve(w,np.ones(9)/9,'same'); lo,hi=int(y0+.3*H),int(y0+.65*H)
    return float(np.median(ws)),float(np.median(cs)),float(lo+np.argmax(w[lo:hi]))
def trim_head(fr):
    a=np.stack([f.astype(float)*(f[...,3:4]/255.) for f in fr])[:,::3,::3]
    d=np.abs(a-a[2]).mean((1,2,3)); thr=.25*d.max()
    idx=next((i for i in range(3,len(d)) if d[i]>thr),0); return max(0,idx-4)
def warp(fr,s,cx_t,cy_t,cx_r,cy_r):
    f=fr.astype(np.float32); al=f[...,3:4]/255.; pm=np.concatenate([f[...,:3]*al,f[...,3:4]],2)
    im=[Image.fromarray(pm[...,i]).convert('F') for i in range(4)]
    co=(1/s,0,cx_t-cx_r/s, 0,1/s,cy_t-cy_r/s)
    ch=[np.array(i.transform((288,288),Image.AFFINE,co,Image.BICUBIC)) for i in im]
    a=np.clip(ch[3],0,255); rgb=np.where(a[...,None]>1,np.stack(ch[:3],2)/np.maximum(a[...,None]/255.,1e-3),0)
    out=np.concatenate([np.clip(rgb,0,255),a[...,None]],2).astype(np.uint8); out[...,3]=np.where(out[...,3]<8,0,out[...,3]); return out
def save(fr,p):
    ims=[Image.fromarray(f) for f in fr]
    ims[0].save(p,save_all=True,append_images=ims[1:],duration=67,loop=0,quality=50,method=4,lossless=False,exact=True)
def run(k,src='webp',dst='webp2'):
    out=frames(f'{src}/{k}-out.webp'); loop=frames(f'{src}/{k}-loop.webp')
    rev=out[::-1]; rev=rev[trim_head(rev):]
    seq=out+loop+rev; n=[len(out),len(loop),len(rev)]
    m=np.array([meas(f) for f in seq]); D,cx,cy=m[:,0],m[:,1],m[:,2]
    Dl=uniform_filter1d(minimum_filter1d(D,13),5)
    cxs=uniform_filter1d(median_filter(cx,9),5); cys=uniform_filter1d(median_filter(cy,9),5)
    Dr,cxr,cyr=D[0],cx[0],cy[0]      # A = first OUT frame
    res=[warp(f,float(np.clip(Dr/Dl[i],1.0,1.10)),cxs[i],cys[i],cxr,cyr) for i,f in enumerate(seq)]
    a,b=n[0],n[0]+n[1]
    save(res[:a],f'{dst}/{k}-out.webp'); save(res[a:b],f'{dst}/{k}-loop.webp'); save(res[b:],f'{dst}/{k}-back.webp')
    print(k,n,'D raw',int(D.min()),int(D.max()),'-> ref',int(Dr),'scale range',round(Dr/Dl.max(),3),round(Dr/Dl.min(),3))
if __name__=="__main__":
    import os; os.makedirs('webp2',exist_ok=True)
    for k in sys.argv[1:]: run(k)
