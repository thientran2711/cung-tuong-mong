# bsheet.py RES.json OUT.jpg [first] [n] : por before|after + fig head before|after, labels with what changed
import sys,os,json,cv2,numpy as np
W="/home/user/cung-tuong-mong/.claude/worktrees/agent-a4e8c6432e582a50a/.ahcache/hb/"
R=json.load(open(sys.argv[1]));a0=int(sys.argv[3]) if len(sys.argv)>3 else 0;n=int(sys.argv[4]) if len(sys.argv)>4 else len(R);R=R[a0:a0+n]
BG=np.array([52,38,30],np.float32)
def comp(p,head=False):
    im=cv2.imread(p,cv2.IMREAD_UNCHANGED)
    if im is None: return None
    if head:
        ys=np.where((im[...,3]>16).any(axis=1))[0];t,b=ys.min(),ys.max();hh=int((b-t)*.17);im=im[t:t+hh]
        xs=np.where((im[...,3]>16).any(axis=0))[0];cx=(xs.min()+xs.max())//2 if len(xs) else im.shape[1]//2;x0=max(0,cx-hh//2);im=im[:,x0:x0+hh]
    else:
        h,w=im.shape[:2];im=im[int(h*.12):int(h*.72),int(w*.12):int(w*.88)]
    a=im[...,3:]/255.;return (im[...,:3]*a+BG*(1-a)).astype(np.uint8)
tiles=[]
for r in R:
    cells=[]
    for nm,head in ((r["por"],False),(r.get("fig"),True)):
        if not nm: continue
        b=comp(W+"img/"+nm,head);f=comp(W+"fix/"+nm,head) if os.path.exists(W+"fix/"+nm) else None
        if b is None: continue
        if f is None: f=b
        cells+= [cv2.resize(b,(190,int(190*b.shape[0]/b.shape[1])),interpolation=cv2.INTER_CUBIC),cv2.resize(f,(190,int(190*f.shape[0]/f.shape[1])),interpolation=cv2.INTER_CUBIC)]
    h=max(c.shape[0] for c in cells);cells=[np.vstack([c,np.full((h-c.shape[0],190,3),235,np.uint8)]) for c in cells]
    t=np.hstack(sum([[c,np.full((h,3,3),235,np.uint8)] for c in cells],[]))
    what=[]
    if r.get("hd_k"): what.append(f"hoa dien x{r['hd_k']} (fig {r.get('hd_fig')})")
    if r.get("rosy"): what.append(f"hong hao a*={r.get('ac')} (fig {r.get('rosy_fig')})")
    lab=np.full((40,t.shape[1],3),235,np.uint8);cv2.putText(lab,r["por"][4:-5],(3,15),cv2.FONT_HERSHEY_SIMPLEX,.45,(0,0,0),1);cv2.putText(lab,"; ".join(what)[:70],(3,33),cv2.FONT_HERSHEY_SIMPLEX,.38,(0,0,150),1)
    tiles.append(np.vstack([lab,t,np.full((8,t.shape[1],3),235,np.uint8)]))
w=max(t.shape[1] for t in tiles);h=max(t.shape[0] for t in tiles)
tiles=[np.vstack([np.hstack([t,np.full((t.shape[0],w-t.shape[1],3),235,np.uint8)]),np.full((h-t.shape[0],w,3),235,np.uint8)]) for t in tiles]
while len(tiles)%2: tiles.append(np.full_like(tiles[0],235))
rows=[np.hstack([tiles[i],np.full((h,24,3),235,np.uint8),tiles[i+1]]) for i in range(0,len(tiles),2)]
cv2.imwrite(sys.argv[2],np.vstack(rows),[cv2.IMWRITE_JPEG_QUALITY,85]);print(sys.argv[2],len(R))
