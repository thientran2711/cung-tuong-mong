# ag.py — age a36/a51 heads of consort-tier maid figures by a gpt-2-6 edit on a head grid, paste back faces only.
#  ag.py make NAME SET...      SETs like m01-t1 (up to 4). grid g/NAME.png (4 cols x 2 rows, 512 tiles): row r = sets 2r,2r+1; cols = [A a36, A a51, B a36, B a51]
#  ag.py paste NAME [SKIP...]  e/NAME.png -> out/fig-maid-SET-AGE.webp (RGB in face zone only, alpha kept). SKIP like m01-t1-a51
#  ag.py chk OUT.jpg SET...    sheet rows=sets: a18 a26 | a36 old new | a51 old new (head crops)
#  env AGES="a36 a51" (default) chooses which tiles; MODE=face (default: brows..chin) | head (whole face incl. forehead)
import sys,os,json,io,numpy as np,cv2
from PIL import Image,ImageDraw,ImageFont
H=os.path.dirname(os.path.abspath(__file__)); Y=H+"/yunet.onnx"
W="/home/user/cung-tuong-mong/.claude/worktrees/agent-a7a7268489937d5f2/img/"
T=int(os.environ.get("T","512")); NC=int(os.environ.get("NC","4")); BG=(236,231,224)
def src(name, orig=False):
    p=f"{H}/out/{name}"
    return p if (not orig and os.path.exists(p)) else W+name
def face(im):
    w,h=im.size; b=Image.new("RGB",(w,h),(255,255,255)); b.paste(im,(0,0),im)
    d=cv2.FaceDetectorYN.create(Y,"",(w,h),0.5); n,r=d.detect(cv2.cvtColor(np.asarray(b),cv2.COLOR_RGB2BGR))
    r=[x for x in (r if r is not None else []) if x[1]<h*0.3]
    x=max(r,key=lambda x:x[2]*x[3]); return [float(v) for v in x[:4]]
def tilebox(f):
    x,y,w,h=f; s=int(round(w*2.4)); cx=x+w/2; cy=y+h*0.55; x0=int(round(cx-s/2)); y0=int(round(cy-s/2))
    return [x0,y0,x0+s,y0+s]
def comp(im):
    b=Image.new("RGBA",im.size,BG+(255,)); b.alpha_composite(im); return b.convert("RGB")
def save_webp(im,path,maxkb=250):
    for q in (86,80,74,68,60,52):
        b=io.BytesIO(); im.save(b,"WEBP",quality=q,method=4)
        if b.tell()<=maxkb*1024: break
    open(path,"wb").write(b.getvalue())
AGES=os.environ.get("AGES","a36 a51").split()
c=sys.argv[1]
if c=="make":
    name=sys.argv[2]; sets=sys.argv[3:]; nt=sum(1 if x.count("-")==2 else len(AGES) for x in sets); nr=max(int(os.environ.get("MINROWS","1")),(nt+NC-1)//NC); G=Image.new("RGB",(NC*T,nr*T),BG); meta=[]
    k=0
    for si,s in enumerate(sets):
        sa=[s[-3:]] if s.count("-")==2 else AGES; s=s[:6] if s.count("-")==2 else s
        for a in sa:
            fn=f"fig-maid-{s}-{a}.webp"; im=Image.open(src(fn)).convert("RGBA"); f=face(im); b=tilebox(f)
            col=k%NC; row=k//NC; k+=1
            G.paste(comp(im).crop(b).resize((T,T),Image.LANCZOS),(col*T,row*T))
            meta.append({"file":fn,"box":b,"face":f,"col":col,"row":row})
    G.save(f"{H}/g/{name}.png"); json.dump(meta,open(f"{H}/g/{name}.json","w")); print("grid",name,len(meta))
elif c=="paste":
    name=sys.argv[2]; skip=set(sys.argv[3:]); meta=json.load(open(f"{H}/g/{name}.json"))
    nr=max(m["row"] for m in meta)+1; E=Image.open(f"{H}/e/{name}.png").convert("RGB").resize((NC*T,nr*T),Image.LANCZOS)
    for m in meta:
        key=m["file"][9:-5]
        if key in skip: print("skip",key); continue
        im=Image.open(src(m["file"])).convert("RGBA"); b=m["box"]; s=b[2]-b[0]; x,y,w,h=m["face"]
        e=E.crop((m["col"]*T,m["row"]*T,m["col"]*T+T,m["row"]*T+T)).resize((s,s),Image.LANCZOS)
        o=np.asarray(comp(im).crop(b)).astype(np.float32); ea=np.asarray(e).astype(np.float32)
        (dx,dy),r=cv2.phaseCorrelate(cv2.cvtColor(o,cv2.COLOR_RGB2GRAY),cv2.cvtColor(ea,cv2.COLOR_RGB2GRAY))
        lim=float(os.environ.get("LIM","0.06"))
        if abs(dx)>s*lim or abs(dy)>s*lim: dx=dy=0
        ea=cv2.warpAffine(ea,np.float32([[1,0,-dx],[0,1,-dy]]),(s,s),borderMode=cv2.BORDER_REFLECT)
        fx=x-b[0]; fy=y-b[1]
        mk=np.zeros((s,s),np.float32)
        if os.environ.get("MODE")=="head": cv2.ellipse(mk,(int(fx+w/2),int(fy+h*0.55)),(int(w*0.62),int(h*0.62)),0,0,360,1,-1)
        elif os.environ.get("MODE")=="hair":
            cv2.ellipse(mk,(int(fx+w/2),int(fy+h*0.25)),(int(w*1.15),int(h*1.05)),0,0,360,1,-1)
            cv2.ellipse(mk,(int(fx+w/2),int(fy+h*0.62)),(int(w*0.52),int(h*0.60)),0,0,360,0,-1)
        elif os.environ.get("MODE")=="fh8":
            cv2.ellipse(mk,(int(fx+w/2),int(fy+h*0.10)),(int(w*0.42),int(h*0.46)),0,0,360,1,-1)
        elif os.environ.get("MODE")=="fh":
            cv2.ellipse(mk,(int(fx+w/2),int(fy+h*0.02)),(int(w*0.30),int(h*0.42)),0,0,360,1,-1)
        else: cv2.ellipse(mk,(int(fx+w/2),int(fy+h*0.70)),(int(w*0.58),int(h*0.44)),0,0,360,1,-1)
        mk=cv2.GaussianBlur(mk,(0,0),max(1,w*0.06))
        if os.environ.get("MODE")=="hair":   # only where the edit made the hair clearly darker
            al=(np.asarray(im.crop(b))[...,3]>200).astype(np.float32)
            wgt=mk*al; lo=(o@[0.3,0.59,0.11]); le=(ea@[0.3,0.59,0.11])
            d=float(((lo-le)*wgt).sum()/max(1,wgt.sum()))
            if d<float(os.environ.get("HMIN","4")): print(key,"hair-skip",round(d,1)); continue
            print(key,"hair-dark",round(d,1))
        A=np.asarray(im)[b[1]:b[3],b[0]:b[2],3] if b[0]>=0 and b[1]>=0 and b[2]<=im.size[0] and b[3]<=im.size[1] else None
        arr=np.asarray(im).astype(np.float32).copy()
        x0,y0=max(0,b[0]),max(0,b[1]); x1,y1=min(im.size[0],b[2]),min(im.size[1],b[3])
        sub=arr[y0:y1,x0:x1,:3]; mm=mk[y0-b[1]:y1-b[1],x0-b[0]:x1-b[0],None]; ee=ea[y0-b[1]:y1-b[1],x0-b[0]:x1-b[0]]
        arr[y0:y1,x0:x1,:3]=sub*(1-mm)+ee*mm
        out=Image.fromarray(np.clip(arr,0,255).astype(np.uint8),"RGBA"); save_webp(out,f"{H}/out/{m['file']}")
        print(key,"shift",round(dx,1),round(dy,1),round(r,2))
elif c=="chk":
    out=sys.argv[2]; sets=sys.argv[3:]; S=int(os.environ.get("SZ","150"))
    F=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",16)
    cols=[("a18",0),("a26",0),("a36",1),("a36",0),("a51",1),("a51",0)]
    G=Image.new("RGB",(S*6+70,S*len(sets)),(250,250,250)); d=ImageDraw.Draw(G)
    for r,s in enumerate(sets):
        d.text((2,r*S+8),s,fill=(0,0,0),font=F)
        for ci,(a,o) in enumerate(cols):
            fn=f"fig-maid-{s}-{a}.webp"; im=Image.open(src(fn,orig=bool(o))).convert("RGBA")
            try: f=face(im)
            except Exception: continue
            x,y,w,h=f; cx=x+w/2; cy=y+h*0.5; z=w*1.7
            G.paste(comp(im).crop((int(cx-z/2),int(cy-z/2),int(cx+z/2),int(cy+z/2))).resize((S,S),Image.LANCZOS),(70+ci*S,r*S))
        for ci,t in enumerate(["18","26","32 old","32 NEW","48 old","48 NEW"]): d.text((70+ci*S+4,r*S+S-20),t,fill=(200,0,0),font=F)
    G.save(out,quality=90); print(out)
