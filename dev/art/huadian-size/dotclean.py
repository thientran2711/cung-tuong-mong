# dotclean.py: remove stray pendant dots / specks left just below a swapped huadian (r3 FAIL items 5+7).
# usage (cwd=work): dotclean.py ORIGDIR DIR names...   (rewrites DIR/<name>.webp in place; the swapped mark = pixels that differ ORIG vs DIR)
import sys,os
import numpy as np,cv2
from PIL import Image
def clean(orig,path,fw):
    o=np.asarray(Image.open(orig).convert('RGB')).astype(int); im=Image.open(path).convert('RGBA'); a=np.asarray(im).copy(); rgb=a[...,:3]
    ch=(np.abs(o-rgb.astype(int)).max(-1)>10).astype(np.uint8)
    ch=cv2.morphologyEx(ch,cv2.MORPH_CLOSE,np.ones((5,5),np.uint8))
    n_,lb,stt,_=cv2.connectedComponentsWithStats(ch,8)
    if n_<2: return None,0
    big=1+int(np.argmax(stt[1:,4])); ys,xs=np.nonzero(lb==big)
    if len(ys)<20: return None,0
    cx=(xs.min()+xs.max())/2; bot=ys.max()
    R=(int(cx-0.15*fw),int(ys.min()-0.03*fw),int(cx+0.15*fw),int(bot+0.2*fw))
    H,W=rgb.shape[:2]; R=(max(R[0],0),max(R[1],0),min(R[2],W),min(R[3],H))
    if R[2]-R[0]<20 or R[3]-R[1]<20: return None,0
    sub=rgb[R[1]:R[3],R[0]:R[2]]
    mk=cv2.dilate((lb==big).astype(np.uint8),np.ones((9,9),np.uint8))[R[1]:R[3],R[0]:R[2]]
    bg=cv2.medianBlur(np.ascontiguousarray(sub),9)
    diff=np.abs(sub.astype(int)-bg.astype(int)).max(-1)
    cand=((diff>16)&(mk==0)).astype(np.uint8)
    n,lab,st,cen=cv2.connectedComponentsWithStats(cand,8); h,w=cand.shape
    rm=np.zeros_like(cand); k=0
    for i in range(1,n):
        x,y,cw,chh,ar=st[i]
        if x<=0 or x+cw>=w or y+chh>=h or y<=0: continue
        if ar<=60*(fw/130.0)**2 and cw<=0.08*fw and chh<=0.08*fw: rm[lab==i]=1; k+=1
    if not k: return None,0
    full=np.zeros(rgb.shape[:2],np.uint8); full[R[1]:R[3],R[0]:R[2]]=cv2.dilate(rm,np.ones((5,5),np.uint8))
    out=cv2.inpaint(np.ascontiguousarray(rgb),full,4,cv2.INPAINT_TELEA)
    a[...,:3]=np.where(full[...,None]>0,out,rgb)
    return Image.fromarray(a,'RGBA'),k
if __name__=='__main__':
    od,d=sys.argv[1:3]
    for n in sys.argv[3:]:
        try: im,k=clean(f'{od}/{n}.webp',f'{d}/{n}.webp',int(os.environ.get('FW','130')))
        except Exception as e: print(n,'ERR',e); continue
        if im is not None: im.save(f'{d}/{n}.webp','WEBP',quality=90,method=4)
        print(n,k)
