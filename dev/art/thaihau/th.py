# th.py make | paste : age the Thái hậu a51 figs (face region only) + face-thaihau-3/6 icons
import sys,os,json,shutil,numpy as np,cv2
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+"/../m05")
from PIL import Image
from lib import ccrop,comp,save_webp,find_face,WT
H=os.path.dirname(os.path.abspath(__file__)); T=1024
FIGS=["fig-thaihau-h1-a51.webp","fig-thaihau-h2-a51.webp","fig-thaihau-h3-a51.webp"]
def make():
    G=Image.new("RGB",(2*T,2*T)); meta=[]
    for k,fn in enumerate(FIGS):
        if not os.path.exists(f"{H}/orig/{fn}"): shutil.copy(f"{WT}/img/{fn}",f"{H}/orig/{fn}")
        im=Image.open(f"{H}/orig/{fn}").convert("RGBA"); cx,ey,fw=find_face(im)[:3]
        cr,b=ccrop(im,cx,ey+fw*0.15,fw*2.2); G.paste(cr.resize((T,T),Image.LANCZOS),((k%2)*T,(k//2)*T)); meta.append({"file":fn,"box":b,"face":[cx,ey,fw],"col":k%2,"row":k//2})
    for n in (3,6):
        fn=f"face-thaihau-{n}.webp"
        if not os.path.exists(f"{H}/orig/{fn}"): shutil.copy(f"{WT}/img/{fn}",f"{H}/orig/{fn}")
    G.paste(Image.open(f"{H}/orig/face-thaihau-3.webp").convert("RGB").resize((T,T),Image.LANCZOS),(T,T))
    G.save(f"{H}/gridA.jpg",quality=95); json.dump(meta,open(f"{H}/gridA.json","w"))
    Image.open(f"{H}/orig/face-thaihau-6.webp").convert("RGB").resize((T,T),Image.LANCZOS).save(f"{H}/gridB.jpg",quality=95)
def paste():
    E=Image.open(f"{H}/e/A.png").convert("RGB").resize((2*T,2*T),Image.LANCZOS)
    for m in json.load(open(f"{H}/gridA.json")):
        im=Image.open(f"{H}/orig/{m['file']}").convert("RGBA"); b=m["box"]; s=b[2]-b[0]; cx,ey,fw=m["face"]
        e=E.crop((m["col"]*T,m["row"]*T,m["col"]*T+T,m["row"]*T+T)).resize((s,s),Image.LANCZOS)
        o=np.asarray(comp(im).crop(b)).astype(np.float32); ea=np.asarray(e).astype(np.float32)
        (dx,dy),r=cv2.phaseCorrelate(cv2.cvtColor(o,cv2.COLOR_RGB2GRAY),cv2.cvtColor(ea,cv2.COLOR_RGB2GRAY))
        if abs(dx)>s*0.06 or abs(dy)>s*0.06: dx=dy=0
        ea=cv2.warpAffine(ea,np.float32([[1,0,-dx],[0,1,-dy]]),(s,s),borderMode=cv2.BORDER_REFLECT)
        mk=np.zeros((s,s),np.float32); C=(int(cx-b[0]),int(ey+fw*0.18-b[1]))
        cv2.ellipse(mk,C,(int(fw*0.50),int(fw*0.72)),0,0,360,1,-1)
        mk=cv2.GaussianBlur(mk,(0,0),max(1,fw*0.06))
        arr=np.asarray(im).astype(np.float32).copy()
        x0,y0=max(0,b[0]),max(0,b[1]); x1,y1=min(im.size[0],b[2]),min(im.size[1],b[3])
        mm=mk[y0-b[1]:y1-b[1],x0-b[0]:x1-b[0],None]; ee=ea[y0-b[1]:y1-b[1],x0-b[0]:x1-b[0]]
        arr[y0:y1,x0:x1,:3]=arr[y0:y1,x0:x1,:3]*(1-mm)+ee*mm
        save_webp(Image.fromarray(np.clip(arr,0,255).astype(np.uint8),"RGBA"),f"{H}/out/{m['file']}")
        print(m["file"],"corr",round(r,2),(round(dx,1),round(dy,1)))
    sz=Image.open(f"{H}/orig/face-thaihau-3.webp").size
    E.crop((T,T,2*T,2*T)).resize(sz,Image.LANCZOS).save(f"{H}/out/face-thaihau-3.webp","WEBP",quality=90)
    if os.path.exists(f"{H}/e/B.png"):
        Image.open(f"{H}/e/B.png").convert("RGB").resize(sz,Image.LANCZOS).save(f"{H}/out/face-thaihau-6.webp","WEBP",quality=90)
if __name__=="__main__": {"make":make,"paste":paste}[sys.argv[1]]()
