# spot2.py show OUT.jpg fig...      : numbered small dark/red dot candidates on the face (4x zoom), json -> cand.json
# spot2.py fix "fig:i,j" ...         : inpaint chosen candidates in the 900px fig, then re-cut its portrait
import sys,os,json,subprocess,importlib.util
import numpy as np,cv2
from PIL import Image,ImageDraw
S="/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad"
spec=importlib.util.spec_from_file_location("pc",S+"/tools/porcrop.py"); pc=importlib.util.module_from_spec(spec); spec.loader.exec_module(pc)
CJ=S+"/cand.json"
def region(im):
    cx,ey,fw,how=pc.find_face(im); fw=max(fw,30)
    return int(cx-0.85*fw),int(ey-0.75*fw),int(cx+0.85*fw),int(ey+1.0*fw)
def cands(im):
    x0,y0,x1,y1=region(im); A=np.asarray(im.convert("RGBA"))[y0:y1,x0:x1]
    rgb=np.ascontiguousarray(A[...,:3]); al=A[...,3]
    lab=cv2.cvtColor(rgb,cv2.COLOR_RGB2LAB).astype(np.float32); L,a=lab[...,0],lab[...,1]
    skin=(rgb[...,0]>150)&(L>150)&(al>250)
    dark=cv2.medianBlur(L.astype(np.uint8),9).astype(np.float32)-L
    red=a-cv2.medianBlur(a.astype(np.uint8),9).astype(np.float32)
    out=[]
    for kind,M in (("d",dark>14),("r",red>7)):
        n,lb,st,cen=cv2.connectedComponentsWithStats(M.astype(np.uint8),8)
        for i in range(1,n):
            if not(1<=st[i,4]<=30): continue
            blob=(lb==i).astype(np.uint8); ring=cv2.dilate(blob,np.ones((7,7),np.uint8))-blob
            if skin[ring>0].mean()<0.85: continue
            out.append((kind,int(x0+cen[i][0]),int(y0+cen[i][1])))
    return (x0,y0,x1,y1),out
if sys.argv[1]=="show":
    allc=json.load(open(CJ)) if os.path.exists(CJ) else {}
    tiles=[]
    for f in sys.argv[3:]:
        im=Image.open(f).convert("RGBA"); (x0,y0,x1,y1),c=cands(im); allc[f]=c
        cr=im.crop((x0,y0,x1,y1)); bg=Image.new("RGBA",cr.size,(150,150,150,255)); bg.alpha_composite(cr)
        Z=4; t=bg.convert("RGB").resize((cr.width*Z,cr.height*Z),Image.LANCZOS); d=ImageDraw.Draw(t)
        for i,(k,x,y) in enumerate(c):
            X,Y=(x-x0)*Z,(y-y0)*Z; d.ellipse((X-9,Y-9,X+9,Y+9),outline=(0,160,255) if k=="d" else (0,220,0),width=2); d.text((X+10,Y-6),str(i),fill=(0,0,255))
        d.text((3,3),os.path.basename(f)[12:-5],fill=(255,255,0)); tiles.append(t)
    json.dump(allc,open(CJ,"w"))
    H=max(t.height for t in tiles); W=sum(t.width for t in tiles[:4])
    cols=4; rows=(len(tiles)+cols-1)//cols; tw=max(t.width for t in tiles)
    M=Image.new("RGB",(tw*cols,H*rows),"black")
    for i,t in enumerate(tiles): M.paste(t,((i%cols)*tw,(i//cols)*H))
    M.save(sys.argv[2],quality=85); print(M.size)
else:
    allc=json.load(open(CJ))
    for arg in sys.argv[2:]:
        f,ids=arg.split(":"); c=allc[f]
        im=Image.open(f).convert("RGBA"); A=np.array(im); rgb=np.ascontiguousarray(A[...,:3]); m=np.zeros(rgb.shape[:2],np.uint8)
        for i in ids.split(","):
            k,x,y=c[int(i)]; cv2.circle(m,(x,y),int(os.environ.get("R","3")),255,-1)
        A[...,:3]=cv2.inpaint(rgb,m,5,cv2.INPAINT_TELEA)
        sys.path.insert(0,S+"/tools"); import afix
        afix.save_webp(Image.fromarray(A),f)
        subprocess.run(["python3",S+"/tools/porcrop.py",f],check=True,capture_output=True); print("fixed",f,ids)
