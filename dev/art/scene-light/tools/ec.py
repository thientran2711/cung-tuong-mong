# ec.py : extend edge-cut figures from their background-removed source sheet (cheap route, no new generation)
# keeps the CURRENT CDN figure pixels as they are (all later fixes) and only ADDS the cut-off part from the source cut-out.
import os,json,subprocess,io,cv2,numpy as np
from PIL import Image
R=os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),"..","..","..",".."));W=R+"/.ahcache/ec/";os.makedirs(W+"bg",exist_ok=True);os.makedirs(W+"old",exist_ok=True);os.makedirs(W+"out",exist_ok=True)
OFF=json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),"edge-offenders.json")));res=[]
if os.environ.get("ONLY"): OFF=[o for o in OFF if o["file"] in os.environ["ONLY"].split(",")]  # source cut-outs: W/bg/<id>.png (download URLs via Magnific creations_get, tokens expire)
def gray(im):
    a=im[...,3:].astype(np.float32)/255;return cv2.cvtColor((im[...,:3]*a+np.array([195,213,230])*(1-a)).astype(np.uint8),cv2.COLOR_BGR2GRAY)
for o in OFF:
    n=o["file"];rec=dict(file=n,side=o["side"],run=o["run"])
    if not o.get("bg") or not os.path.exists(W+"bg/"+o["bg"]+".png"): rec["result"]="no source cut-out";res.append(rec);continue
    bp=W+"bg/"+o["bg"]+".png"
    op=W+"old/"+n
    if not os.path.exists(op): subprocess.run(["curl","-sSf","-o",op,"https://ctm-img.victoria-tntt.workers.dev/img/"+n],check=True)
    bg=cv2.imread(bp,cv2.IMREAD_UNCHANGED);old=cv2.imread(op,cv2.IMREAD_UNCHANGED)
    if bg is None or bg.shape[2]<4: rec["result"]="bad source";res.append(rec);continue
    BH,BW=bg.shape[:2];FH,FW=old.shape[:2]
    G=gray(bg);T=gray(old);best=None
    # coarse-to-fine scale search: s = old px per source px
    for s in np.arange(0.20,1.30,0.02):
        if int(BH*s)<FH or int(BW*s)<FW: continue
        g=cv2.resize(G,(int(BW*s),int(BH*s)),interpolation=cv2.INTER_AREA)
        r=cv2.matchTemplate(g,T,cv2.TM_CCOEFF_NORMED);_,mv,_,ml=cv2.minMaxLoc(r)
        if best is None or mv>best[0]: best=(mv,s,ml)
    if best is None: rec["result"]="no match";res.append(rec);continue
    s0=best[1]
    for s in np.arange(s0-0.02,s0+0.021,0.004):
        if int(BH*s)<FH or int(BW*s)<FW: continue
        g=cv2.resize(G,(int(BW*s),int(BH*s)),interpolation=cv2.INTER_AREA)
        r=cv2.matchTemplate(g,T,cv2.TM_CCOEFF_NORMED);_,mv,_,ml=cv2.minMaxLoc(r)
        if mv>best[0]: best=(mv,s,ml)
    mv,s,(x,y)=best;rec["match"]=round(float(mv),3)
    if mv<float(os.environ.get("EC_MIN","0.7")): rec["result"]="weak match";res.append(rec);continue
    S=cv2.resize(bg,(int(BW*s),int(BH*s)),interpolation=cv2.INTER_AREA);SH,SW=S.shape[:2]
    al=(S[...,3]>40).astype(np.uint8);nl,lab,st,_=cv2.connectedComponentsWithStats(al,8)
    # components that belong to this figure: they overlap the old box
    box=np.zeros_like(al);box[y:y+FH,x:x+FW]=1
    keep=np.zeros(nl,bool)
    for i in range(1,nl):
        m=lab==i;inside=(m&(box>0)).sum()
        if inside>0.15*m.sum() or inside>200: keep[i]=True
    km=keep[lab]
    ys,xs=np.where(km);nx0,nx1,ny0,ny1=xs.min(),xs.max()+1,ys.min(),ys.max()+1
    touch=(o["side"]=="left" and nx0<=1) or (o["side"]=="right" and nx1>=SW-1)
    nx0,nx1,ny0,ny1=min(nx0,x),max(nx1,x+FW),min(ny0,y),max(ny1,y+FH)
    add_l,add_r=x-nx0,nx1-(x+FW)
    rec.update(add_left=int(add_l),add_right=int(add_r),touches_canvas=bool(touch))
    if add_l+add_r<3: rec["result"]="nothing to add from source"+(" (source cut at canvas edge → outpaint)" if touch else "");res.append(rec);continue
    canvas=S[ny0:ny1,nx0:nx1].copy();canvas[...,3]=np.where(km[ny0:ny1,nx0:nx1],canvas[...,3],0)
    # keep the current figure exactly where it was
    oy,ox=y-ny0,x-nx0;reg=canvas[oy:oy+FH,ox:ox+FW]
    src=reg.copy()
    # colour-match the added source pixels to the CDN figure (Lab mean/std over the lower body where both are solid)
    both=(src[...,3]>220)&(old[...,3]>220);both[:int(FH*.55)]=False
    if both.sum()>500:
        sl=cv2.cvtColor(src[...,:3],cv2.COLOR_BGR2LAB).astype(np.float32);ol=cv2.cvtColor(old[...,:3],cv2.COLOR_BGR2LAB).astype(np.float32)
        ms,ss=sl[both].mean(0),sl[both].std(0)+1e-3;mo,so=ol[both].mean(0),ol[both].std(0)+1e-3
        def cm(img):
            lab=cv2.cvtColor(img[...,:3],cv2.COLOR_BGR2LAB).astype(np.float32);lab=(lab-ms)/ss*so+mo
            out=img.copy();out[...,:3]=cv2.cvtColor(np.clip(lab,0,255).astype(np.uint8),cv2.COLOR_LAB2BGR);return out
        canvas=cm(canvas);src=canvas[oy:oy+FH,ox:ox+FW].copy()
    reg=canvas[oy:oy+FH,ox:ox+FW]
    reg[:]=old                                                  # old figure box = old pixels (incl. transparent ones)
    # feather the seam: on the cut side, below the waist, blend source → CDN over a band so the train joins without a step
    B=int(os.environ.get("EC_BAND","90"));y0=int(FH*.5)   # lower half only; source pixels limited to the train that crosses the old cut (no stray sleeves)
    if o["side"]=="left" and add_l>0:
        w=np.clip(np.arange(FW,dtype=np.float32)/B,0,1)[None,:,None]
        S_=src[y0:].astype(np.float32);O_=old[y0:].astype(np.float32);sa=S_[...,3:]/255;oa=O_[...,3:]/255
        nl_,lb_=cv2.connectedComponents((S_[...,3]>40).astype(np.uint8),connectivity=8)
        tr=np.isin(lb_,[l for l in np.unique(lb_[:,0]) if l>0])|(O_[...,3]>40);sa=sa*tr[...,None]
        a=np.maximum(sa,oa)                                     # silhouette = union (no see-through ghost where the two differ)
        ws=sa*(1-w)+1e-3*sa;wo=(oa**6)*w+1e-3*oa;col=(S_[...,:3]*ws+O_[...,:3]*wo)/np.maximum(ws+wo,1e-6)
        reg[y0:,:,:3]=np.clip(col+.5,0,255).astype(np.uint8);reg[y0:,:,3]=np.clip(a[...,0]*255+.5,0,255).astype(np.uint8)
    canvas[oy:oy+FH,ox:ox+FW]=reg
    # crop height back to the figure's (the canvas height must stay 900 for the kit scale)
    canvas=canvas[oy:]
    # the added train may lie lower than the old bottom (floor): keep it, then scale the whole figure back to FH tall
    rows=np.where((canvas[...,3]>40).any(1))[0];bot=max(FH,int(rows.max())+1) if len(rows) else FH;canvas=canvas[:bot]
    if bot>FH: rec["scaled"]=round(FH/bot,3);canvas=cv2.resize(canvas,(max(1,int(round(canvas.shape[1]*FH/bot))),FH),interpolation=cv2.INTER_AREA)
    a=canvas[...,3];xs=np.where((a>12).any(axis=0))[0];canvas=canvas[:,xs.min():xs.max()+1]
    im=Image.fromarray(cv2.cvtColor(canvas,cv2.COLOR_BGRA2RGBA))
    for q in (90,86,80,74):
        b=io.BytesIO();im.save(b,"WEBP",quality=q,method=4)
        if b.tell()<=250*1024: break
    open(W+"out/"+n,"wb").write(b.getvalue());rec["result"]="extended"+(" (but still at canvas edge → outpaint the rest)" if touch else "");rec["size"]=[canvas.shape[1],canvas.shape[0]]
    res.append(rec);print(n,rec,flush=True)
json.dump(res,open(W+"ec.json","w"),indent=0)
for r in res: print(r["file"],r.get("result"),r.get("match"),r.get("add_left"),r.get("add_right"))
