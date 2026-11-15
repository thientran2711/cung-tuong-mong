# huafix.py PNG x,y x,y x,y x,y (approx mark centres) : erase each figure's forehead mark (topmost red blob per quarter) by harmonic inpainting, paint a small soft rounded vertical bar
import sys
from PIL import Image,ImageDraw,ImageFilter
import numpy as np
f=sys.argv[1]; CEN=[tuple(int(v) for v in c.split(",")) for c in sys.argv[2:]]; bw,bh=5,12; col=(196,72,58)
im=Image.open(f).convert("RGBA"); A=np.array(im).astype(float); H,W=A.shape[:2]; top=int(H*.2)
def redmask(B): r,g,b,a=B[...,0],B[...,1],B[...,2],B[...,3]; return (a>200)&(r>120)&(r-g>30)&(r-b>22)
red=redmask(A[:top])
for k in range(4):
    cx,cy=CEN[k]
    R=26; sub=A[cy-R:cy+R,cx-R:cx+R]; m=redmask(sub)
    # dilate mask by 3
    from scipy.ndimage import binary_dilation
    m=binary_dilation(m,iterations=3)
    ys2,xs2=np.nonzero(m); cyy,cxx=int(ys2.mean())+cy-R,int(xs2.mean())+cx-R
    C=sub[...,:3].copy(); C[m]=np.median(C[~m],axis=0)
    for it in range(400):
        P=np.pad(C,((1,1),(1,1),(0,0)),mode="edge"); avg=(P[:-2,1:-1]+P[2:,1:-1]+P[1:-1,:-2]+P[1:-1,2:])/4; C[m]=avg[m]
    noise=np.random.normal(0,1.2,C.shape); C[m]+=noise[m]
    A[cy-R:cy+R,cx-R:cx+R,:3]=C
    print(k,"mark",cxx,cyy,"px",m.sum())
    im2=Image.fromarray(np.clip(A,0,255).astype(np.uint8))
    sc=4; L=Image.new("L",((bw+4)*sc,(bh+4)*sc),0); ImageDraw.Draw(L).rounded_rectangle((2*sc,2*sc,(bw+2)*sc,(bh+2)*sc),radius=bw*sc//2,fill=215)
    L=L.resize((bw+4,bh+4),Image.LANCZOS).filter(ImageFilter.GaussianBlur(.5))
    px,py=cxx-(bw+4)//2,cyy-(bh+4)//2; base=im2.crop((px,py,px+bw+4,py+bh+4)); base.paste(Image.new("RGBA",L.size,col+(255,)),(0,0),L); im2.paste(base,(px,py))
    A=np.array(im2).astype(float)
Image.fromarray(np.clip(A,0,255).astype(np.uint8)).save(f); print("ok")
