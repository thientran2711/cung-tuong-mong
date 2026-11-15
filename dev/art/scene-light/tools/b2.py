# batch 2: keep only skin holes INSIDE the detected face box (flowers/hairpins/tassels are outside the face), fix, save; b2.py PART_LIST OUT.json
import sys,os,json,cv2,numpy as np,importlib.util
W="/home/user/cung-tuong-mong/.claude/worktrees/agent-a4e8c6432e582a50a/"
sys.path.insert(0,W+".ahcache/tools");import face
spec=importlib.util.spec_from_file_location("ah",W+"dev/art/alpha-holes.py");ah=importlib.util.module_from_spec(spec);spec.loader.exec_module(ah)
O=W+".ahcache/b2/fix/";os.makedirs(O,exist_ok=True);res=[]
for p in [l.strip() for l in open(sys.argv[1]) if l.strip()]:
    r=ah.scan(p)
    if not r: continue
    info,(im,m)=r
    fb=face.face_box(p,im)
    if fb is None or not m.any(): res.append(dict(file=p,face=None,px=0));continue
    n,lab,st,cen=cv2.connectedComponentsWithStats(m.astype(np.uint8),8)
    keep=np.zeros_like(m)
    for i in range(1,n):
        cx,cy=cen[i]
        if fb[0]<=cx<=fb[2] and fb[1]<=cy<=fb[3]: keep|=lab==i
    px=int(keep.sum());H=im.shape[0];thr=max(15,40*(H/900)**2)
    rec=dict(file=p,face=[round(v) for v in fb],px=px,fix=bool(px>=thr))
    if rec["fix"]: cv2.imwrite(O+os.path.basename(p),ah.fix(im,keep),[cv2.IMWRITE_WEBP_QUALITY,95]); np.save(O+os.path.basename(p)+".mask.npy",np.packbits(keep))
    res.append(rec)
json.dump(res,open(sys.argv[2],"w"))
print(len(res),sum(r.get("fix",False) for r in res))
