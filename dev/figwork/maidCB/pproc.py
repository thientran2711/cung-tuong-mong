# pproc.py JID... : uses bg.txt ("jid gen bg", last wins); downloads cut-out, splits 4 ages, writes wtc2/img fig+por (por centred on detected face), updates myrecs.json
import sys,json,os,subprocess
from PIL import Image
import numpy as np, cv2
H=os.path.dirname(os.path.abspath(__file__)); S=os.path.dirname(H)
import importlib.util
spec=importlib.util.spec_from_file_location("spf",H+"/spfuncs.py"); sp=importlib.util.module_from_spec(spec); spec.loader.exec_module(sp)
OUT=H+"/out"; sp.OUT=OUT
subprocess.run(["python3",H+"/urls.py"],stdout=subprocess.DEVNULL)
db=json.load(open(H+"/urls.json"))
RF=H+"/myrecs.json"; recs=json.load(open(RF)) if os.path.exists(RF) else {}
exec(open(H+"/mjobs.py").read().split("if __name__")[0])
AG=["a18","a26","a36","a51"]
cv2.setLogLevel(0) if hasattr(cv2,"setLogLevel") else None
def face(im):
    w,h=im.size; top=int(h*0.3)
    b=Image.new("RGB",(w,top),(255,255,255)); b.paste(im.crop((0,0,w,top)),(0,0),im.crop((0,0,w,top)))
    d=cv2.FaceDetectorYN.create(H+"/haar/yunet.onnx","",(w,top),0.6)
    n,r=d.detect(cv2.cvtColor(np.asarray(b),cv2.COLOR_RGB2BGR))
    if r is None: return None
    r=[x for x in r if x[1]+x[3]/2<h*0.22]
    if not r: return None
    x=max(r,key=lambda x:x[2]*x[3]*x[-1]); return tuple(float(v) for v in x[:4])
def finish(im,name,rec):
    im=sp.clean(im)
    a=im.split()[3].point(lambda v:255 if v>12 else 0); im=im.crop(a.getbbox()); w,h=im.size
    side=int(h*0.21); f=face(im)
    if f:
        cx=f[0]+f[2]/2; cy=f[1]+f[3]/2; top=int(max(0,cy-side*0.47)); how="face"
    else:
        A=np.asarray(im.split()[3]); xs=n=0
        for y in range(int(h*0.03),int(h*0.13),2):
            row=np.nonzero(A[y]>128)[0]
            if len(row): xs+=(row[0]+row[-1])/2; n+=1
        cx=xs/n if n else w/2; top=int(h*0.01); how="top"
    por=Image.new("RGBA",(side,side),(0,0,0,0)); por.paste(im.crop((int(cx-side/2),top,int(cx-side/2)+side,top+side)),(0,0))
    sp.save_webp(por.resize((256,256),Image.LANCZOS),f"{OUT}/por-{name[4:]}.webp",80)
    sp.save_webp(im.resize((max(1,round(w*900/h)),900),Image.LANCZOS),f"{OUT}/{name}.webp")
    rec=dict(rec); rec["file"]=f"img/{name}.webp"; rec["por"]=f"img/por-{name[4:]}.webp"; recs[rec["file"]]=rec
    return how
LAST={}
for line in open(H+"/bg.txt"):
    p=line.split()
    if len(p)>=3: LAST[p[0]]=p[:3]
for jid in sys.argv[1:]:
    _,gen,bid=LAST[jid]; _,who,tt=jid.split("-"); tier=tt[1:] if tt=="tcold" else tt
    raw=f"{H}/bg/{jid}-{bid}.png"
    if not os.path.exists(raw):
        if bid not in db: print("NOURL",jid,bid); continue
        subprocess.run(["curl","-sS","--retry","5","--retry-all-errors","-o",raw,db[bid]],check=True)
    im=Image.open(raw).convert("RGBA")
    a=np.asarray(im.resize((960,480))).astype(int); op=a[...,3]>200
    if (op&(a[...,:3].max(axis=2)<25)).sum()/max(1,op.sum())>0.03:
        g=f"{H}/bg/gen-{gen}.png"
        if not os.path.exists(g): subprocess.run(["curl","-sS","--retry","5","--retry-all-errors","-o",g,db[gen]],check=True)
        o=Image.open(g).convert("RGB").resize(im.size); o.putalpha(im.split()[3]); im=o; print("darkfix",jid)
    cols=sp.split(im,4); hows=[]
    for (x0,x1),ag in zip(cols,AG):
        rec={"role":"maid","identity":who,"tier":tier,"ageBand":ag,"look":None,"palette":PAL[who],
             "magnificUrl":"https://www.magnific.com/app/creation/"+gen,"bg":bid,"sheet":"C-"+who+"-"+tier}
        hows.append(finish(im.crop((max(0,x0-4),0,min(im.width,x1+4),im.height)),f"fig-maid-{who}-{tier}-{ag}",rec))
    print(jid,"ok",[x1-x0 for x0,x1 in cols],hows)
json.dump(recs,open(RF,"w"),indent=0,ensure_ascii=False)
