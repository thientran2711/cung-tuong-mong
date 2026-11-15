# hd.py — huadian motif swap, generic (FACE like maid-m02 / consort-c17). Same method as hg.py (m05).
#  hd.py make FACE [tiers]     copy originals to hd/FACE/orig, 2x2 head grids g/tN.png|jpg (+json)
#  hd.py prompt FACE tN        edit prompt
#  hd.py paste FACE tN         e/tN.png -> out/fig-FACE-tN-aXX.webp (forehead ellipse only, alpha kept)
#  hd.py ecrop FACE OUT tiers  forehead crops of the 2k edits
#  hd.py cmp FACE OUT tiers    before/after forehead crops from the figs
import sys,os,json,shutil,numpy as np,cv2
from PIL import Image,ImageDraw
import lib
from lib import ccrop,comp,save_webp,find_face,fh_crop,F,AGES,BG,WT
from swap import SW
ROOT=os.path.abspath(os.environ.get("HDROOT",os.path.dirname(os.path.abspath(__file__))+"/../hd"))
T=1024; NC=2
SZ={1:60,2:63,3:66,4:70,5:73,6:77}
PAINT="painted directly on the skin like lip rouge, soft natural painted edges that melt into the skin texture (never a sticker, never a decal, no shadow, no thickness)"
SIZE78=("TINY and delicate, about the size of a lentil: its whole height about half the length of one eye, clearly narrower than the gap between the inner ends of the eyebrows; "
        "centred on the lower forehead just above that gap, well clear of the brows and the hairline; ")
def D(face): return f"{ROOT}/{face}"
def src(face,fn,orig=False):
    p=f"{D(face)}/out/{fn}"
    return p if (not orig and os.path.exists(p)) else f"{D(face)}/orig/{fn}"
def prompt(face,t):
    old,short,mot,col=SW[face]
    head=("Edit this image. It is a 2x2 grid of four close-up portraits of the same woman at four ages (top-left youngest, bottom-right oldest). "
          "Keep everything exactly identical: faces, identity, ages, expressions, eyes, eyebrows, hair, crown and hair ornaments, earrings, clothing, colours, lighting, framing and the grid layout. "
          f"The ONLY change: on EACH of the four faces, completely remove the current ornament between the brows (the current mark, {old}, and any gold around it; restore clean smooth skin there, no trace of it) "
          f"and paint a new huadian in its place, her signature motif: {mot}. ")
    if t<=6:
        st={1:f"The simplest form: flat {col} paint, no detail, no outline, no gold",
            2:f"Flat {col} paint with a clear, crisp, recognisable shape, shaded slightly lighter toward the edges, with one tiny paler accent at its centre; no outline, no gold",
            3:f"Finely painted in {col} with more detail: a tiny deeper-coloured centre and very fine inner veins or lines; still NO gold",
            4:f"Painted in {col}, every edge outlined with a hair-thin line of shimmering gold (the first touch of gold)",
            5:f"Made of shining flat gold leaf: a clearly visible gold rim around its whole shape, fine gold inner lines and a little gold centre, filled with {col}; clearly MORE gold than a thin outline, gold and {col} in equal measure, no pearl, no gem",
            6:f"Made of flat gold leaf with {col} inlay, refined and compact, and ONE minute flat pearl-white dot at its centre (flush with the skin, not a raised bead)"}[t]
        orn=(st+"; "+PAINT+"; size: small and delicate, its width about "+str(SZ[t])+"% of the length of one eye "
             "(like the classic tiny red flower mark between the brows); centred on the lower forehead just above the gap between the inner ends of the eyebrows, well clear of the brows and the hairline; "
             f"it must clearly read as a {short}, a plant motif, not an object. ")
    else:
        orn=(f"Rank 7 version: the {short} made of paper-thin gold leaf laid flat on the skin, filled with glossy cinnabar-red enamel, with fine gold filigree lines, two minute flat gold curls hugging it closely "
             "and one very tiny ruby-red glint at its centre; completely flat, no raised gems, no pearls, no beads; "+SIZE78)
    return head+orn+"Crisp, elegant, clearly a painted ornament, never a scar or birthmark; no frame. Exactly the same ornament and size on all four faces. No moles, no beauty marks. No text."
FIX={"fig-maid-m09-t3-a18.webp":(178,88,88)}   # face detector hit the hairpin
def sprompt(face,t):
    old,short,mot,col=SW[face]
    st={1:f"Simplest form: flat {col} paint, no detail, no gold",
        2:f"Flat {col} paint, crisp clear shape, edges a little lighter, one tiny paler centre; no outline, no gold",
        3:f"Finely painted {col}: tiny deeper centre and very fine inner veins; no gold",
        4:f"{col} paint with every edge outlined in a hair-thin shimmering gold line",
        5:f"Shining flat gold leaf: clear gold rim, fine gold inner lines, little gold centre, filled with {col}; gold and {col} equally",
        6:f"Flat gold leaf with {col} inlay, compact, ONE minute flat pearl-white dot at its centre",
        7:"Paper-thin flat gold leaf filled with glossy cinnabar-red enamel, fine gold filigree, two minute gold curls hugging it closely, one tiny ruby glint at its centre; flat, no raised gems or beads"}[t]
    sz=(f"width about {SZ[t]}% of one eye's length" if t<=6 else "TINY, lentil-sized: height about half an eye's length, narrower than the gap between the inner brow ends")
    return ("Edit: a 2x2 grid of the same woman at four ages. Keep everything identical: faces, ages, expressions, eyes, brows, hair, ornaments, clothes, colours, light, framing, layout. "
            f"ONLY change, on all four faces: remove the mark between the brows ({old}, with any gold; clean smooth skin, no trace) and paint instead {mot}. "
            f"{st}. Painted flat on the skin like rouge, soft natural edges, not a sticker. Small: {sz}; just above the gap between the inner brow ends, clear of brows and hairline. "
            f"It must read as a {short}. Same ornament and size on all four. No moles. No text.")
def tile(im,fn=""):
    cx,ey,fw=FIX[fn] if fn in FIX else find_face(im)[:3]; return cx,ey-fw*0.05,fw*2.0,(cx,ey,fw)
def make(face,tiers):
    d=D(face)
    for s in ("g","e","out","c","orig"): os.makedirs(f"{d}/{s}",exist_ok=True)
    for t in tiers:
        G=Image.new("RGB",(NC*T,2*T),BG); meta=[]
        for k,a in enumerate(AGES):
            fn=f"fig-{face}-t{t}-{a}.webp"
            if not os.path.exists(f"{d}/orig/{fn}"): shutil.copy(f"{WT}/img/{fn}",f"{d}/orig/{fn}")
            pn="por"+fn[3:]
            if not os.path.exists(f"{d}/orig/{pn}") and os.path.exists(f"{WT}/img/{pn}"): shutil.copy(f"{WT}/img/{pn}",f"{d}/orig/{pn}")
            im=Image.open(f"{d}/orig/{fn}").convert("RGBA"); cx,cy,s,f=tile(im,fn); cr,b=ccrop(im,cx,cy,s)
            G.paste(cr.resize((T,T),Image.LANCZOS),((k%NC)*T,(k//NC)*T)); meta.append({"file":fn,"box":b,"face":f,"col":k%NC,"row":k//NC})
        G.save(f"{d}/g/t{t}.jpg",quality=95); json.dump(meta,open(f"{d}/g/t{t}.json","w"))
    print("grids",face,tiers)
def paste(face,t,RX=0.24,RY=0.30,CY=0.36):
    d=D(face); meta=json.load(open(f"{d}/g/t{t}.json"))
    E=Image.open(f"{d}/e/t{t}.png").convert("RGB").resize((NC*T,2*T),Image.LANCZOS)
    for m in meta:
        im=Image.open(f"{d}/orig/{m['file']}").convert("RGBA"); b=m["box"]; s=b[2]-b[0]; cx,ey,fw=m["face"]
        e=E.crop((m["col"]*T,m["row"]*T,m["col"]*T+T,m["row"]*T+T)).resize((s,s),Image.LANCZOS)
        o=np.asarray(comp(im).crop(b)).astype(np.float32); ea=np.asarray(e).astype(np.float32)
        (dx,dy),r=cv2.phaseCorrelate(cv2.cvtColor(o,cv2.COLOR_RGB2GRAY),cv2.cvtColor(ea,cv2.COLOR_RGB2GRAY))
        if abs(dx)>s*0.06 or abs(dy)>s*0.06: dx=dy=0
        ea=cv2.warpAffine(ea,np.float32([[1,0,-dx],[0,1,-dy]]),(s,s),borderMode=cv2.BORDER_REFLECT)
        mk=np.zeros((s,s),np.float32); sr=np.zeros((s,s),np.float32); C=(int(cx-b[0]),int(ey-fw*CY-b[1]))
        cv2.ellipse(mk,C,(int(fw*RX),int(fw*RY)),0,0,360,1,-1)
        cv2.ellipse(sr,(C[0],C[1]-int(fw*0.04)),(int(fw*0.42),int(fw*0.36)),0,0,360,1,-1)
        # also take wherever the edit clearly changed the forehead (old mark off-centre on turned/tilted heads)
        df=np.abs(cv2.GaussianBlur(o,(0,0),1.2)-cv2.GaussianBlur(ea,(0,0),1.2)).max(2)
        ch=((df>32)&(sr>0)).astype(np.uint8)
        ch=cv2.morphologyEx(ch,cv2.MORPH_OPEN,np.ones((2,2),np.uint8))
        k=max(3,int(fw*0.10)); ch=cv2.dilate(ch,np.ones((k,k),np.uint8)).astype(np.float32)
        mk=np.maximum(mk,ch*sr)
        mk=cv2.GaussianBlur(mk,(0,0),max(1,fw*0.04))
        arr=np.asarray(im).astype(np.float32).copy()
        x0,y0=max(0,b[0]),max(0,b[1]); x1,y1=min(im.size[0],b[2]),min(im.size[1],b[3])
        mm=mk[y0-b[1]:y1-b[1],x0-b[0]:x1-b[0],None]; ee=ea[y0-b[1]:y1-b[1],x0-b[0]:x1-b[0]]
        arr[y0:y1,x0:x1,:3]=arr[y0:y1,x0:x1,:3]*(1-mm)+ee*mm
        save_webp(Image.fromarray(np.clip(arr,0,255).astype(np.uint8),"RGBA"),f"{d}/out/{m['file']}")
        if r<0.6: print("LOWCORR",m["file"],round(r,2))
def ecrop(face,out,ts):
    d=D(face); S=200; G=Image.new("RGB",(4*S,len(ts)*S),(255,255,255)); dr=ImageDraw.Draw(G)
    for r,t in enumerate(ts):
        E=Image.open(f"{d}/e/{t}.png").convert("RGB").resize((2048,2048)); meta=json.load(open(f"{d}/g/{t}.json"))
        for m in meta:
            b=m["box"]; s=b[2]-b[0]; cx,ey,fw=m["face"]; k=1024/s
            x=(cx-b[0])*k+m["col"]*1024; y=(ey-fw*0.33-b[1])*k+m["row"]*1024; z=fw*0.55*k
            G.paste(E.crop((int(x-z/2),int(y-z/2),int(x+z/2),int(y+z/2))).resize((S,S),Image.LANCZOS),(AGES.index(m["file"][-8:-5])*S,r*S))
        dr.text((3,r*S+3),face+" "+t,fill=(0,0,0),font=F(14))
    G.save(out,quality=90)
def cmp(face,out,ts,S=160):
    G=Image.new("RGB",(8*S,len(ts)*(S+18)),(255,255,255)); dr=ImageDraw.Draw(G)
    for r,t in enumerate(ts):
        for k,a in enumerate(AGES):
            fn=f"fig-{face}-{t}-{a}.webp"
            for j,o in enumerate([True,False]):
                G.paste(fh_crop(src(face,fn,orig=o),S),((2*k+j)*S,r*(S+18)+18))
                dr.text(((2*k+j)*S+3,r*(S+18)+2),f"{face[-3:]} {t}-{a} {'trước' if o else 'SAU'}",fill=(0,0,0) if o else (170,0,0),font=F(12))
    G.save(out,quality=90)
if __name__=="__main__":
    c=sys.argv[1]; face=sys.argv[2]
    if c=="make": make(face,[int(x[1:]) for x in sys.argv[3:]] or range(1,8))
    elif c=="prompt": print(prompt(face,int(sys.argv[3][1:])))
    elif c=="sp":
        for x in sys.argv[3:]: print(x+": "+sprompt(face,int(x[1:])))
    elif c=="paste":
        for x in sys.argv[3:]: paste(face,int(x[1:]))
    elif c=="ecrop": ecrop(face,sys.argv[3],sys.argv[4:])
    elif c=="cmp": cmp(face,sys.argv[3],sys.argv[4:])
