# rectfix.py: remove a light rectangle (old cover patch) around a mark by pulling the box towards the surrounding skin along its edges.
# usage: rectfix.py DIR name x0 y0 x1 y1 mcx mcy mr [sides=RB]   (rect in px, mark centre/radius protected; sides = which edges mismatch (L,R,T,B))
import sys,numpy as np,cv2
from PIL import Image
def fix(im,rect,mc,mr,sides='RB',k=3,mx=45,fade=9):
    a=np.asarray(im.convert('RGBA')).astype(np.float32); rgb=a[...,:3]; H,W=rgb.shape[:2]; x0,y0,x1,y1=rect
    lum=rgb.mean(-1); D=np.zeros((H,W,3),np.float32)
    def prof(vals):  # smooth, clip
        return np.clip(cv2.GaussianBlur(vals.astype(np.float32).reshape(-1,1,3),(1,0),2.0,sigmaY=2.0).reshape(-1,3),-2,mx)
    if 'R' in sides:
        ys=np.arange(y0,y1); ins=rgb[y0:y1,x1-k:x1].mean(1); out=rgb[y0:y1,x1+1:x1+1+k].mean(1)
        bad=(lum[y0:y1,x1+1:x1+1+k].min(1)<lum[y0:y1,x1-k:x1].mean(1)-50)   # brow/dark pixels outside -> no correction
        m=np.clip(ins-out,0,mx); m[bad]=0; m=prof(m)
        wx=np.clip((np.arange(x0,x1)-(x1-fade))/fade,0,1)**1.3
        D[y0:y1,x0:x1]+=m[:,None,:]*wx[None,:,None]
    if 'B' in sides:
        ins=rgb[y1-k:y1,x0:x1].mean(0); out=rgb[y1+1:y1+1+k,x0:x1].mean(0)
        bad=(lum[y1+1:y1+1+k,x0:x1].min(0)<lum[y1-k:y1,x0:x1].mean(0)-50)
        m=np.clip(ins-out,0,mx); m[bad]=0; m=prof(m)
        wy=np.clip((np.arange(y0,y1)-(y1-fade))/fade,0,1)**1.3
        D[y0:y1,x0:x1]+=m[None,:,:]*wy[:,None,None]
    yy,xx=np.mgrid[0:H,0:W]; r=np.hypot(xx-mc[0],yy-mc[1]); prot=np.clip((r-mr)/3.0,0,1)
    a[...,:3]=np.clip(rgb-D*prot[...,None],0,255); return Image.fromarray(a.astype(np.uint8),'RGBA')
if __name__=='__main__':
    d,n=sys.argv[1:3]; v=list(map(float,sys.argv[3:10])); sides=sys.argv[10] if len(sys.argv)>10 else 'RB'
    p=f'{d}/{n}.webp'; im=fix(Image.open(p),tuple(int(t) for t in v[:4]),(v[4],v[5]),v[6],sides); im.save(p,'WEBP',quality=90,method=4)
