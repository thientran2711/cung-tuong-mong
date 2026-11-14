# hdf.py make cXX tN grid.png : 2x2 grid (1024/tile) of the 4 faces taken straight from img/fig-consort-cXX-tN-a{18,26,36,51}.webp
# hdf.py paste cXX tN edit.png : paste back ONLY the forehead mark zone (union of old+new saturated marks, feathered) into each fig
#   (RGB only, alpha kept -> rematte/fa cut-outs untouched; backup in hgrid/figbak/), then run porcrop on the 4 figs yourself.
import sys,json,os,io,shutil,numpy as np,cv2
from PIL import Image
os.chdir(os.path.dirname(os.path.abspath(__file__)))
def satmask(o,e,cx,cy,D):
    # MASK=sat: union of saturated marks (old in o, new in e) inside a forehead window, dilated + feathered
    win=np.zeros(o.shape[:2],np.uint8); cv2.ellipse(win,(int(cx),int(cy+0.1*D)),(int(0.55*D),int(0.5*D)),0,0,360,1,-1)
    m=np.zeros(o.shape[:2],np.uint8)
    for im in (o,e):
        u=np.clip(im,0,255).astype(np.uint8); S=cv2.cvtColor(u,cv2.COLOR_RGB2HSV)[...,1].astype(np.float32)
        d=S-cv2.medianBlur(S.astype(np.uint8),int(0.45*D)|1).astype(np.float32)
        b=((d>float(os.environ.get("STH","30")))&(win>0)).astype(np.uint8)
        n,lab,st,_=cv2.connectedComponentsWithStats(b)
        for i in range(1,n):
            if st[i,4]>0.002*D*D: m[lab==i]=1
    if m.sum()==0: cv2.ellipse(m,(int(cx),int(cy+0.1*D)),(int(0.3*D),int(0.3*D)),0,0,360,1,-1)
    k=int(0.12*D)|1; m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(k,k)))
    k=int(0.08*D)|1; m=cv2.dilate(m,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(k,k)))
    return cv2.GaussianBlur(m.astype(np.float32),(0,0),D*0.03)
def diffmask(o,e,cx,cy,D):
    # convex hull of the changed pixels (old mark erased + new mark) in a forehead window, dilated + feathered
    win=np.zeros(o.shape[:2],np.uint8); cv2.ellipse(win,(int(cx),int(cy+0.05*D)),(int(float(os.environ.get("WX","0.5"))*D),int(float(os.environ.get("WY","0.42"))*D)),0,0,360,1,-1)
    df=cv2.GaussianBlur(np.abs(o-e).max(axis=2),(0,0),3)
    b=((df>float(os.environ.get("DTH","35")))&(win>0)).astype(np.uint8)
    n,lab,st,_=cv2.connectedComponentsWithStats(b); m=np.zeros(o.shape[:2],np.uint8)
    for i in range(1,n):
        if st[i,4]>0.003*D*D: m[lab==i]=1
    if m.sum()==0: return satmask(o,e,cx,cy,D)
    pts=cv2.findNonZero(m); h=cv2.convexHull(pts); m=np.zeros_like(m); cv2.fillConvexPoly(m,h,1)
    k=int(0.08*D)|1; m=cv2.dilate(m,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(k,k)))
    return cv2.GaussianBlur(m.astype(np.float32),(0,0),D*0.03)
I='/home/user/cung-tuong-mong/.claude/worktrees/agent-a36359ad81f20b98e/img/'; T=1024; AG=('18','26','36','51')
os.makedirs('hgrid/figbak',exist_ok=True)
def flat(im):
    b=Image.new('RGBA',im.size,(235,225,205,255)); b.alpha_composite(im); return b.convert('RGB')
def face(rgb):
    sc=3.0; sm=rgb.resize((int(rgb.width*sc),int(rgb.height*sc)),Image.LANCZOS)
    d=cv2.FaceDetectorYN.create('yunet.onnx','',sm.size,0.5); n,f=d.detect(cv2.cvtColor(np.asarray(sm),cv2.COLOR_RGB2BGR))
    f=max(list(f),key=lambda x:x[2]*x[3]); return [float(v)/sc for v in f[:14]]
cmd,c,t=sys.argv[1:4]; M=f'hgrid/f-{c}-{t}.json'
if cmd=='make':
    G=Image.new('RGB',(2*T,2*T)); meta=[]
    for k,a in enumerate(AG):
        f=I+f'fig-consort-{c}-{t}-a{a}.webp'; bak=f'hgrid/figbak/{os.path.basename(f)}'
        if not os.path.exists(bak): shutil.copy(f,bak)
        rgb=flat(Image.open(bak).convert('RGBA')); F=face(rgb)
        ex=(F[4]+F[6])/2; ey=(F[5]+F[7])/2; d=abs(F[6]-F[4]); s=F[2]*1.9
        b=[ex-s/2,ey-0.1*d-s/2,ex+s/2,ey-0.1*d+s/2]; meta.append({'box':b,'eye':[ex,ey,d]})
        G.paste(rgb.crop(tuple(int(round(v)) for v in b)).resize((T,T),Image.LANCZOS),((k%2)*T,(k//2)*T))
    G.save(sys.argv[4]); json.dump(meta,open(M,'w')); print(c,t,'face px',[round(m['box'][2]-m['box'][0]) for m in meta])
else:
    E=Image.open(sys.argv[4]).convert('RGB').resize((2*T,2*T),Image.LANCZOS); meta=json.load(open(M))
    for k,a in enumerate(AG):
        f=I+f'fig-consort-{c}-{t}-a{a}.webp'; src=Image.open(f'hgrid/figbak/{os.path.basename(f)}').convert('RGBA')
        rgb=flat(src); A=np.array(src); m=meta[k]; b=[int(round(v)) for v in m['box']]; s=b[2]-b[0]; sc=T/s; ex,ey,d=m['eye']
        o=np.asarray(rgb.crop(tuple(b)).resize((T,T),Image.LANCZOS)).astype(np.float32)
        e=np.asarray(E.crop(((k%2)*T,(k//2)*T,(k%2)*T+T,(k//2)*T+T))).astype(np.float32)
        (dx,dy),r=cv2.phaseCorrelate(cv2.cvtColor(o,cv2.COLOR_RGB2GRAY),cv2.cvtColor(e,cv2.COLOR_RGB2GRAY))
        e=cv2.warpAffine(e,np.float32([[1,0,-dx],[0,1,-dy]]),(T,T),borderMode=cv2.BORDER_REFLECT)
        D=d*sc; cx=(ex-b[0])*sc; cy=(ey-b[1])*sc-0.62*D
        mk=(satmask if os.environ.get('MASK')=='sat' else diffmask)(o,e,cx,cy,D); cv2.imwrite(f'hgrid/mk-{c}-{t}-{k}.png',(mk*255).astype(np.uint8))
        bl=o*(1-mk[...,None])+e*mk[...,None]
        tile=np.asarray(Image.fromarray(np.clip(bl,0,255).astype(np.uint8)).resize((s,s),Image.LANCZOS)).astype(np.float32)
        ms=cv2.resize(mk,(s,s))[...,None]
        y0,x0=b[1],b[0]; y1,x1=min(A.shape[0],y0+s),min(A.shape[1],x0+s); yy,xx=max(0,y0),max(0,x0)
        reg=A[yy:y1,xx:x1,:3].astype(np.float32); tl=tile[yy-y0:y1-y0,xx-x0:x1-x0]; mm=ms[yy-y0:y1-y0,xx-x0:x1-x0]
        A[yy:y1,xx:x1,:3]=np.clip(reg*(1-mm)+tl*mm,0,255).astype(np.uint8)
        im2=Image.fromarray(A,'RGBA')
        for q in (90,86,80,74):
            bb=io.BytesIO(); im2.save(bb,'WEBP',quality=q,method=4)
            if bb.tell()<=250*1024: break
        open(f,'wb').write(bb.getvalue()); print(c,t,a,'shift',round(dx,1),round(dy,1),'resp',round(r,2),'mask px',int((mk>0.5).sum()))
