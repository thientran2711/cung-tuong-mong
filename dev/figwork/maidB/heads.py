# heads.py OUT.jpg GENS_TXT JID... : 4 head crops per lineup (from raw gen, 2048w preview), one row per lineup
import sys,json,subprocess,io,os
import numpy as np
from PIL import Image,ImageDraw
S=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
db=json.load(open(S+"/urls_all.json"))
g={}
for l in open(sys.argv[2]):
    p=l.split()
    if len(p)>1: g[p[0]]=p[1]
T=int(os.environ.get("T","220")); only=os.environ.get("ONLY")
def get(gid):
    c=f"{S}/cache/{gid}.jpg"
    if not os.path.exists(c):
        u=db[gid]; u=u+("&" if "?" in u else "?")+"w=2048&preview=1"
        for t in range(5):
            b=subprocess.run(["curl","-s","--retry","4","--retry-all-errors",u],capture_output=True).stdout
            try: Image.open(io.BytesIO(b)).convert("RGB").save(c,quality=92); break
            except Exception: pass
    return Image.open(c).convert("RGB")
rows=[]
for j in sys.argv[3:]:
    gid=j.split(":")[1] if ":" in j else g[j]; j=j.split(":")[0]
    im=get(gid); W,H=im.size; A=np.asarray(im).astype(np.float32)
    bgc=np.median(A[:6].reshape(-1,3),axis=0); m=np.linalg.norm(A-bgc,axis=-1)>30
    heads=[]
    for q in range(4):
        if only and str(q) not in only: continue
        x0,x1=int(W*q/4),int(W*(q+1)/4); sub=m[:,x0:x1]
        rws=np.nonzero(sub.sum(1)>3)[0]; top=rws[0] if len(rws) else 0
        xs=[np.nonzero(sub[y])[0].mean() for y in range(top,min(H,top+int(H*.06))) if sub[y].any()]
        cx=x0+(np.median(xs) if xs else (x1-x0)/2); side=int(H*.16)
        heads.append(im.crop((int(cx-side/2),max(0,top-10),int(cx+side/2),max(0,top-10)+side)).resize((T,T)))
    r=Image.new("RGB",(T*len(heads),T+16),"white"); d=ImageDraw.Draw(r); d.text((3,2),j,fill="black")
    for i,h in enumerate(heads): r.paste(h,(T*i,16))
    rows.append(r)
cols=int(os.environ.get("COLS","2")); n=len(rows); rw=rows[0].width; rh=rows[0].height
M=Image.new("RGB",(rw*cols,rh*((n+cols-1)//cols)),"white")
for i,r in enumerate(rows): M.paste(r,((i%cols)*rw,(i//cols)*rh))
M.save(sys.argv[1],quality=88); print(M.size)
