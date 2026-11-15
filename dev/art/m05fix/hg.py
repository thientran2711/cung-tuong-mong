# hg.py — m05 huadian: 2x2 head grid (4 ages of one tier) -> gpt-2-6 edit -> paste forehead only
#  hg.py make tN            -> g/tN.png (2048^2, tiles 1024: TL a18, TR a26, BL a36, BR a51) + g/tN.json
#  hg.py paste tN [EDIT]    -> e/EDIT.png (default tN) -> out/fig-maid-m05-tN-aXX.webp (RGB in forehead ellipse only, alpha kept)
#  hg.py prompt tN          -> edit prompt
import sys,json,numpy as np,cv2
from lib import *
T=1024; NC=2
SZ={1:60,2:63,3:66,4:70,5:73,6:77}
MOT=("a single tiny cherry blossom (sakura) flower seen from the front: five rounded petals, each petal with a small V-shaped notch cut into its tip, "
     "a tiny centre")
COL="pinkish rose red"
PAINT=("painted directly on the skin like lip rouge, soft natural painted edges that melt into the skin texture (never a sticker, never a decal, no shadow, no thickness)")
TIER={
1:f"{MOT}; the simplest form, flat {COL} paint, no detail, no outline, no gold",
2:f"{MOT}; flat {COL} paint with a clear, crisp, recognisable shape (the five notched petals clearly readable), each petal shaded slightly lighter toward its tip, with one tiny pale blush-pink dot at its centre; no outline, no gold",
3:f"{MOT}; finely painted in {COL} with more detail: a tiny deeper-red centre with a few minute stamen dots and very fine petal veins; still NO gold",
4:f"{MOT}; painted in {COL}, every petal edge outlined with a hair-thin line of shimmering gold (the first touch of gold)",
5:f"{MOT} cut from thin gold leaf laid flat on the skin, each notched petal filled with {COL} paint inside the gold shape, gold and red together",
6:f"{MOT} of flat gold leaf with {COL} inlay, refined and compact, and ONE minute flat pearl-white dot at its centre (flush with the skin, not a raised bead)",
}
SIZE78=("TINY and delicate, about the size of a lentil: its whole height about half the length of one eye, clearly narrower than the gap between the inner ends of the eyebrows; "
        "centred on the lower forehead just above that gap, well clear of the brows and the hairline; ")
def prompt(t):
    head=("Edit this image. It is a 2x2 grid of four close-up portraits of the same woman at four ages (top-left youngest, bottom-right oldest). "
          "Keep everything exactly identical: faces, identity, ages, expressions, eyes, eyebrows, hair, crown and hair ornaments, earrings, clothing, colours, lighting, framing and the grid layout. "
          "The ONLY change: on EACH of the four faces, completely remove the current ornament between the brows (the two red cherries on a stem, or the current mark; restore clean smooth skin there, no trace of cherries, stems or leaves) and paint a new huadian in its place: ")
    if t<=6:
        orn=(TIER[t]+"; "+PAINT+"; size: small and delicate, its width about "+str(SZ[t])+"% of the length of one eye "
             "(like the classic tiny red flower mark between the brows); centred on the lower forehead just above the gap between the inner ends of the eyebrows, well clear of the brows and the hairline; "
             "it must look like a FLOWER BLOSSOM, NOT cherries, NOT berries, NOT round fruit, no stem, no leaves. ")
    elif t==7:
        orn=("a tiny cherry blossom of paper-thin gold leaf laid flat on the skin, its five petals each with a small notch at the tip, filled with glossy cinnabar-red enamel, with fine gold filigree lines, two minute flat gold curls hugging it "
             "and one very tiny ruby-red glint at its centre; completely flat, no raised gems, no pearls, no beads; "+SIZE78+"a flower, NOT cherries, no stem. ")
    else:
        orn=("a tiny, symmetrical, upright stylised phoenix in thin gold leaf painted flat on the skin, seen from the front, its two slender wings lifted evenly to either side and its tail tapering straight down, "
             f"holding her own tiny {COL} five-petal cherry blossom (petal tips notched) centred at its top; all gold with only that tiny {COL} accent: NO blue, NO green, no other colours; "+SIZE78+"NOT cherries, no stem. ")
    return head+orn+"Crisp, elegant, clearly a painted ornament, never a scar or birthmark; no frame. Exactly the same ornament and size on all four faces. No moles, no beauty marks. No text."
def tile(im):
    cx,ey,fw,_=find_face(im); s=fw*2.0; return cx,ey-fw*0.05,s,(cx,ey,fw)
c=sys.argv[1]; t=int(sys.argv[2][1:])
if c=="prompt": print(prompt(t))
elif c=="make":
    G=Image.new("RGB",(NC*T,2*T),BG); meta=[]
    for k,a in enumerate(AGES):
        fn=f"fig-maid-m05-t{t}-{a}.webp"; im=Image.open(src(fn,orig=True)).convert("RGBA")
        cx,cy,s,f=tile(im); cr,b=ccrop(im,cx,cy,s)
        G.paste(cr.resize((T,T),Image.LANCZOS),((k%NC)*T,(k//NC)*T)); meta.append({"file":fn,"box":b,"face":f,"col":k%NC,"row":k//NC})
    G.save(f"{H}/g/t{t}.png"); G.save(f"{H}/g/t{t}.jpg",quality=95); json.dump(meta,open(f"{H}/g/t{t}.json","w")); print("grid",t)
elif c=="paste":
    name=sys.argv[3] if len(sys.argv)>3 else f"t{t}"; meta=json.load(open(f"{H}/g/t{t}.json"))
    E=Image.open(f"{H}/e/{name}.png").convert("RGB").resize((NC*T,2*T),Image.LANCZOS)
    RX=float(os.environ.get("RX","0.24")); RY=float(os.environ.get("RY","0.30")); CY=float(os.environ.get("CY","0.36"))
    for m in meta:
        im=Image.open(src(m["file"],orig=True)).convert("RGBA"); b=m["box"]; s=b[2]-b[0]; cx,ey,fw=m["face"]
        e=E.crop((m["col"]*T,m["row"]*T,m["col"]*T+T,m["row"]*T+T)).resize((s,s),Image.LANCZOS)
        o=np.asarray(comp(im).crop(b)).astype(np.float32); ea=np.asarray(e).astype(np.float32)
        (dx,dy),r=cv2.phaseCorrelate(cv2.cvtColor(o,cv2.COLOR_RGB2GRAY),cv2.cvtColor(ea,cv2.COLOR_RGB2GRAY))
        if abs(dx)>s*0.06 or abs(dy)>s*0.06: dx=dy=0
        ea=cv2.warpAffine(ea,np.float32([[1,0,-dx],[0,1,-dy]]),(s,s),borderMode=cv2.BORDER_REFLECT)
        mk=np.zeros((s,s),np.float32)
        cv2.ellipse(mk,(int(cx-b[0]),int(ey-fw*CY-b[1])),(int(fw*RX),int(fw*RY)),0,0,360,1,-1)
        mk=cv2.GaussianBlur(mk,(0,0),max(1,fw*0.04))
        arr=np.asarray(im).astype(np.float32).copy()
        x0,y0=max(0,b[0]),max(0,b[1]); x1,y1=min(im.size[0],b[2]),min(im.size[1],b[3])
        mm=mk[y0-b[1]:y1-b[1],x0-b[0]:x1-b[0],None]; ee=ea[y0-b[1]:y1-b[1],x0-b[0]:x1-b[0]]
        arr[y0:y1,x0:x1,:3]=arr[y0:y1,x0:x1,:3]*(1-mm)+ee*mm
        save_webp(Image.fromarray(np.clip(arr,0,255).astype(np.uint8),"RGBA"),f"{H}/out/{m['file']}")
        print(m["file"],"shift",round(dx,1),round(dy,1),round(r,2))
