# stray.py: erase small pendant dots/specks just below/beside a swapped mark (r4). usage: stray.py LOG DIR names...  (rewrites DIR/<name>.webp)
# window = winx of the swap log; region = win +-0.06fw sideways, from win top to win bottom + 0.09fw; blobs that deviate from a median-blurred background are inpainted.
import sys,os,json
import numpy as np,cv2
from PIL import Image
def run(win,fw,path):
    im=Image.open(path).convert('RGBA'); a=np.asarray(im).copy(); rgb=np.ascontiguousarray(a[...,:3]); H,W=rgb.shape[:2]
    x0,y0,x1,y1=win; m=int(float(os.environ.get('SIDE','0.14'))*fw)
    R=(max(x0-m,0),max(y0,0),min(x1+m,W),min(int(y1+float(os.environ.get('BOT','0.15'))*fw),H))
    bg=cv2.medianBlur(rgb,15); diff=np.abs(rgb.astype(int)-bg.astype(int)).max(-1)
    mask=np.zeros((H,W),np.uint8); mask[R[1]:R[3],R[0]:R[2]]=1
    # exclude the mark itself (its window, grown slightly)
    mask[max(y0-2,0):y1+2,max(x0-2,0):x1+2]=0
    cand=((diff>9)&(mask>0)).astype(np.uint8)
    n,lab,st,_=cv2.connectedComponentsWithStats(cand,8); keep=np.zeros_like(cand)
    for i in range(1,n):
        x,y,w,h,ar=st[i]
        if ar<=int(os.environ.get('AREA','60')) and x>R[0] and y>R[1] and x+w<R[2] and y+h<R[3]: keep[lab==i]=1
    cand=cv2.dilate(keep,np.ones((5,5),np.uint8))*mask
    if not cand.any(): return None
    out=cv2.inpaint(rgb,cand,5,cv2.INPAINT_TELEA)
    a[...,:3]=np.where(cand[...,None]>0,out,rgb); return Image.fromarray(a,'RGBA')
if __name__=='__main__':
    log,d=sys.argv[1:3]; W={}
    for l in open(log):
        x=json.loads(l)
        if x.get('winx'): W[x['name']]=(x['winx'],x['fw'])
    for n in sys.argv[3:]:
        if n not in W: print(n,'nowin'); continue
        im=run(W[n][0],W[n][1],f'{d}/{n}.webp')
        if im is not None: im.save(f'{d}/{n}.webp','WEBP',quality=90,method=4)
        print(n,'ok' if im is not None else 'none')
