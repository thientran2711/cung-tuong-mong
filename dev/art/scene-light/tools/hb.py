# hb.py LIST OUT.json : one pass per por+fig pair (CDN copies in .ahcache/hb/img): huadian shrink (consorts t1–t8) then rosy skin (a* < 8.0)
# writes fixed files to .ahcache/hb/fix/ ; records per file
import sys,os,re,json,cv2,numpy as np,importlib.util
W=os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),"..","..","..",".."))+"/";I=W+".ahcache/hb/base/";O=W+".ahcache/hb/fix/";os.makedirs(O,exist_ok=True);T=W+".ahcache/hb/tmp%d/"%os.getpid();os.makedirs(T,exist_ok=True)
def mod(n,p):
    s=importlib.util.spec_from_file_location(n,W+p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
sk=mod("sk","dev/art/skin-smudge.py");hd=mod("hd","dev/art/huadian.py")
MEN=("man","eunuch","official","emperor","physician")
A_LIM=-999.0  # ROSY PASS RETIRED (owner 16/11 12:45Z: "Thôi tất cả các hình về bỏ cái lớp dòng đi, về cái B á." = no rosy-skin layer on any picture; undone by dev/art/skin-norosy/). Never re-apply.
def target(name):
    m=re.search(r"-t(\d)-",name)
    if not name.startswith(("por-consort","fig-consort")) or not m: return None
    t=int(m.group(1));return 0.06*min(1.2,1+0.05*(t-1))
def porbox_in_fig(fig,por,fwr):
    """locate the portrait crop inside the figure (multiscale template match around the face-width ratio)"""
    def g(im):
        a=im[...,3:].astype(np.float32)/255;return cv2.cvtColor((im[...,:3]*a+np.array([195,213,230])*(1-a)).astype(np.uint8),cv2.COLOR_BGR2GRAY)
    F=g(fig);P=g(por);best=None
    for s in np.linspace(fwr*0.85,fwr*1.15,13):
        w,h=int(P.shape[1]*s),int(P.shape[0]*s)
        if w<12 or h<12: continue
        t=cv2.resize(P,(w,h),interpolation=cv2.INTER_AREA);fp=cv2.copyMakeBorder(F,h,h,w,w,cv2.BORDER_REPLICATE)
        r=cv2.matchTemplate(fp,t,cv2.TM_CCOEFF_NORMED);_,mv,_,ml=cv2.minMaxLoc(r)
        if best is None or mv>best[0]: best=(mv,s,ml[0]-w,ml[1]-h)
    return best
def fig_mark_from_por(fig,pinfo,best):
    mv,s,x,y=best;px,py,pw,ph=pinfo["mark"];pad=max(2,int(0.3*max(pw,ph)*s))
    bx0,by0=int(x+px*s)-pad,int(y+py*s)-pad;bx1,by1=int(x+(px+pw)*s)+pad,int(y+(py+ph)*s)+pad
    H,Wd=fig.shape[:2];bx0,by0,bx1,by1=max(0,bx0),max(0,by0),min(Wd,bx1),min(H,by1)
    if bx1-bx0<3 or by1-by0<3: return None
    sub=fig[by0:by1,bx0:bx1];lab=cv2.cvtColor(sub[...,:3].astype(np.float32)/255,cv2.COLOR_BGR2LAB)
    ring=np.ones(lab.shape[:2],bool);ring[1:-1,1:-1]=False
    ref=np.median(lab[ring],axis=0);dE=np.sqrt(((lab-ref)**2*np.array([.5,1,1])).sum(-1))
    mk=(dE>9)&(sub[...,3]>=200)
    if mk.sum()<2: return None
    return mk,(bx0,by0,bx1,by1)
res=[]
for l in open(sys.argv[1]):
    por=l.strip()
    if not por: continue
    fign="fig-"+por[4:];pp,fp=I+por,I+fign
    if not os.path.exists(pp): continue
    P=cv2.imread(pp,cv2.IMREAD_UNCHANGED);F=cv2.imread(fp,cv2.IMREAD_UNCHANGED) if os.path.exists(fp) else None
    rec=dict(por=por,fig=fign if F is not None else None)
    # --- huadian (consorts) ---
    tg=target(por)
    if tg:
        r=hd.find(pp,P)
        if isinstance(r,tuple):
            info,(im,mk,win)=r;rec["hd"]=info["ratio"]
            if False and info["ratio"]>tg*1.25:   # coordinator 11/15: CDN marks already shrunk → measure & report only
                k=tg/info["ratio"];P=hd.shrink(P,mk,win,k);rec["hd_k"]=round(k,3)
                if F is not None:
                    rf=hd.find(fp,F);done=False
                    if isinstance(rf,tuple) and abs(rf[0]["ratio"]-info["ratio"])<0.35*info["ratio"]:
                        fi,(fim,fmk,fwin)=rf;F=hd.shrink(F,fmk,fwin,tg/fi["ratio"]);done=True;rec["hd_fig"]="own"
                    if not done:
                        fb=hd.FACE.face_box(fp,F)
                        fwr=((fb[2]-fb[0])/1.3)/info["fw"] if fb else 0.6
                        best=porbox_in_fig(F,cv2.imread(pp,cv2.IMREAD_UNCHANGED),fwr)
                        if best and best[0]>0.6:
                            m2=fig_mark_from_por(F,info,best)
                            if m2: F=hd.shrink(F,m2[0],m2[1],k);rec["hd_fig"]="mapped %.2f"%best[0]
                    if "hd_fig" not in rec: rec["hd_fig"]="MISS"
    # --- rosy skin ---
    a=sk.analyse(pp)
    if a:
        info,st=a;rec["ac"]=info["ac"]
        if info["ac"]<A_LIM:
            men=por.split("-")[1] in MEN;kw=dict(A_T=11.0 if men else 13.0,B_T=15.0,blush=1.5 if men else 4.0)
            # re-analyse on the (maybe huadian-fixed) image to get masks on the current pixels
            cv2.imwrite(T+por,P,[cv2.IMWRITE_WEBP_QUALITY,101]);i2=sk.analyse(T+por);os.remove(T+por)
            if i2:
                inf2,st2=i2;P=sk.rosy(P,st2[2],st2[3],inf2["Lc"],info["ac"],info["bc"],**kw);rec["rosy"]=True
                if F is not None:
                    cv2.imwrite(T+fign,F,[cv2.IMWRITE_WEBP_QUALITY,101]);f2=sk.analyse(T+fign);os.remove(T+fign)
                    if f2:
                        fi,fst=f2;F=sk.rosy(F,fst[2],fst[3],fi["Lc"],info["ac"],info["bc"],**kw);rec["rosy_fig"]="ok"
                    else: rec["rosy_fig"]="MISS"
    if rec.get("hd_k") or rec.get("rosy"):
        cv2.imwrite(O+por,P,[cv2.IMWRITE_WEBP_QUALITY,92])
        if F is not None and (rec.get("hd_fig","").startswith(("own","mapped")) or rec.get("rosy_fig")=="ok"): cv2.imwrite(O+fign,F,[cv2.IMWRITE_WEBP_QUALITY,92])
        res.append(rec)
json.dump(res,open(sys.argv[2],"w"));print(len(res))
