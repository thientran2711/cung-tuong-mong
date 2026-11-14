# cproc.py JID... : uses bg.txt ("jid gen bg", last wins) + urls.json; splits the cut-out lineup into 4 ages,
# writes out/img/fig-maid-mNN-tK-aAA.webp + por-* (face-centred) and out/recs.json (my FIGURES-servants records)
import sys,json,os,subprocess,importlib.util
from PIL import Image
import numpy as np
H=os.path.dirname(os.path.abspath(__file__))
spec=importlib.util.spec_from_file_location("spf",H+"/spfuncs.py"); sp=importlib.util.module_from_spec(spec); spec.loader.exec_module(sp)
OUT=H+"/out/img"; sp.OUT=OUT
subprocess.run(["python3",H+"/urls.py"],stdout=subprocess.DEVNULL)
db=json.load(open(H+"/urls.json"))
RF=H+"/out/recs.json"; recs={r["file"]:r for r in json.load(open(RF))} if os.path.exists(RF) else {}
AG=["a18","a26","a36","a51"]
LAST={}
for l in open(H+"/bg.txt"):
    p=l.split()
    if len(p)>=3: LAST[p[0]]=p[:3]
def facepor(im,name):
    # face-centred square crop: hair (dark pixels) in the top of the figure locates the head; face = lower part of the hair box
    A=np.asarray(im).astype(int); h,w=A.shape[:2]; top=int(h*.24)
    dk=(A[:top,:,3]>200)&(A[:top,:,:3].max(axis=2)<85)
    ys,xs=np.nonzero(dk); side=int(h*0.20)
    if len(ys)>80:
        y0,y1=np.percentile(ys,2),np.percentile(ys,97); y1=min(y1,y0+h*.115); sel=(ys>y0+(y1-y0)*.45)&(ys<y1)
        cx=int(np.median(xs[sel])); cy=int(y0+(y1-y0)*.74)
    else: cx,cy=w//2,int(h*.08)
    x0=cx-side//2; yy=max(0,cy-side//2)
    por=Image.new("RGBA",(side,side),(0,0,0,0)); por.paste(im.crop((x0,yy,x0+side,yy+side)),(0,0))
    sp.save_webp(por.resize((256,256),Image.LANCZOS),f"{OUT}/por-{name[4:]}.webp",80)
for jid in sys.argv[1:]:
    _,who,tt=jid.split("-"); gen,bid=LAST[jid][1:]
    tier="cold" if tt=="tcold" else tt
    raw=f"{H}/bg/{jid}-{bid}.png"
    if not os.path.exists(raw):
        subprocess.run(["curl","-sS","--retry","5","--retry-all-errors","-o",raw,db[bid]],check=True)
    im=Image.open(raw).convert("RGBA")
    a=np.asarray(im.resize((960,480))).astype(int); op=a[...,3]>200
    dk=(op&(a[...,:3].max(axis=2)<25)).sum()/max(1,op.sum())
    if dk>0.03:
        g=f"{H}/bg/gen-{gen}.png"
        if not os.path.exists(g): subprocess.run(["curl","-sS","--retry","5","--retry-all-errors","-o",g,db[gen]],check=True)
        o=Image.open(g).convert("RGB").resize(im.size); o.putalpha(im.split()[3]); im=o; print("darkfix",jid)
    cols=sp.split(im,4)
    for (x0,x1),ag in zip(cols,AG):
        name=f"fig-maid-{who}-{tt}-{ag}"
        rec={"role":"maid","identity":who,"tier":tier,"ageBand":ag,"look":None,"magnificUrl":"https://www.magnific.com/app/creation/"+gen,"bg":bid,"sheet":jid}
        sp.byfile={}
        sp.finish(im.crop((max(0,x0-4),0,min(im.width,x1+4),im.height)),name,rec)
        fig=Image.open(f"{OUT}/{name}.webp").convert("RGBA"); facepor(fig,name)
        recs.update(sp.byfile)
    print(jid,"ok",[x1-x0 for x0,x1 in cols])
json.dump(sorted(recs.values(),key=lambda r:r["file"]),open(RF,"w"),indent=1,ensure_ascii=False)
print(len(recs),"records")
