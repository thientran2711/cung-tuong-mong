# hdg.py — head-grid edits taken from the HIGH-RES 4k lineup, pasted back into the published figs (RGB only, alpha kept).
# hdg.py make NAME cXX-tN-aNN x4      -> g/NAME.jpg (2x2 grid, 1024/tile, from raw/<gen>.png) + g/NAME.json
#    tiles TL,TR,BL,BR; source lineup = FIGURES magnificUrl gen (raw/<gen>.png must exist, see need.py)
# hdg.py paste NAME edit.png MODES   MODES = 4 letters-groups comma sep, per tile: m=new forehead mark, a=age face (keep mark), ma=both, -=skip
#    writes img/fig-consort-...webp from figbak/ (original backup), masks -> g/NAME-mk*.png ; DRY=1 = no write
# hdg.py view NAME edit.png out.jpg [W]  -> 4 edit tiles side by side (native res, W px per tile, default 1800)
import sys,json,os,io,shutil,numpy as np,cv2
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__)); os.chdir(H)
R='/home/user/cung-tuong-mong/.claude/worktrees/agent-a878b9d4ac20deacb/'; I=R+'img/'
GEN=json.load(open('gen.json')); T=1024; BOX=float(os.environ.get('BOX','2.4'))
os.makedirs('g',exist_ok=True); os.makedirs('figbak',exist_ok=True)
def flat(im):
    b=Image.new('RGBA',im.size,(235,225,205,255)); b.alpha_composite(im); return b.convert('RGB')
def faces(rgb,sc):
    sm=rgb.resize((int(rgb.width*sc),int(rgb.height*sc)),Image.LANCZOS)
    d=cv2.FaceDetectorYN.create('yunet.onnx','',sm.size,0.5); n,f=d.detect(cv2.cvtColor(np.asarray(sm),cv2.COLOR_RGB2BGR))
    return [[float(v)/sc for v in x[:14]]+[float(x[14])] for x in (f if f is not None else [])]
def figface(fr):
    fs=faces(fr,3.0); good=[x for x in fs if x[14]>0.6] or fs; mw=max(x[2] for x in good); good=[x for x in good if x[2]>0.6*mw]
    return min(good,key=lambda x:x[1])
def eyes(F): return (F[4]+F[6])/2,(F[5]+F[7])/2,float(np.hypot(F[6]-F[4],F[7]-F[5]))
def figpath(sp): c,t,a=sp.split('-'); return I+f'fig-consort-{c}-{t}-{a}.webp'
def bak(sp):
    f=figpath(sp); b='figbak/'+os.path.basename(f)
    if not os.path.exists(b): shutil.copy(f,b)
    return b
def aligned(rgb,F,s=160):
    ex,ey,d=eyes(F); k=s*0.4/d; M=np.float32([[k,0,s/2-ex*k],[0,k,s*0.4-ey*k]])
    g=cv2.cvtColor(np.asarray(rgb),cv2.COLOR_RGB2GRAY); return cv2.warpAffine(g,M,(s,s)).astype(np.float32)
def ncc(a,b): a=a-a.mean(); b=b-b.mean(); return float((a*b).sum()/np.sqrt((a*a).sum()*(b*b).sum()+1e-6))
def lminit(g1,g2):
    try:
        f1=max(faces(Image.fromarray(np.clip(g1,0,255).astype(np.uint8)).convert('RGB'),0.5),key=lambda x:x[2]*x[3])
        f2=max(faces(Image.fromarray(np.clip(g2,0,255).astype(np.uint8)).convert('RGB'),0.5),key=lambda x:x[2]*x[3])
        p1=np.float32(f1[4:14]).reshape(5,2); p2=np.float32(f2[4:14]).reshape(5,2)
        M,_=cv2.estimateAffinePartial2D(p1,p2); return [M.astype(np.float32)] if M is not None else []
    except Exception: return []
def align(g1,g2,em):
    crit=(cv2.TERM_CRITERIA_EPS|cv2.TERM_CRITERIA_COUNT,300,1e-6); best=(-1,np.eye(2,3,dtype=np.float32))
    (px,py),_=cv2.phaseCorrelate(g1,g2)
    for init in [np.eye(2,3,dtype=np.float32),np.float32([[1,0,px],[0,1,py]])]+lminit(g1,g2):
        W=init.copy(); ok=True
        for sc,sig in ((0.25,2),(0.5,3)):
            a=cv2.resize(g1,None,fx=sc,fy=sc,interpolation=cv2.INTER_AREA); b=cv2.resize(g2,None,fx=sc,fy=sc,interpolation=cv2.INTER_AREA)
            m=cv2.resize(em,None,fx=sc,fy=sc,interpolation=cv2.INTER_NEAREST); Ws=W.copy(); Ws[:,2]*=sc
            for mt in (cv2.MOTION_TRANSLATION,cv2.MOTION_AFFINE):
                try: cc,Ws=cv2.findTransformECC(a,b,Ws,mt,crit,m,5)
                except cv2.error: cc=-1
            W=Ws.copy(); W[:,2]/=sc
        if cc>best[0]: best=(cc,W)
    return best
cmd,name=sys.argv[1:3]; MJ=f'g/{name}.json'
if cmd=='make':
    specs=sys.argv[3:]; C=int(os.environ.get('COLS','2')); Rw=(len(specs)+C-1)//C; G=Image.new('RGB',(C*T,Rw*T)); meta=[]; cache={}
    for k,sp in enumerate(specs):
        c,t,a=sp.split('-'); gid=GEN[f'{c}-{t}']
        if gid not in cache:
            L=Image.open(f'raw/{gid}.png').convert('RGB'); fl=sorted(faces(L,1.0),key=lambda x:-x[14])[:4]; mw=max(x[2] for x in fl); fl=sorted([x for x in fl if x[2]>0.6*mw],key=lambda x:x[0]); assert len(fl)==4,(gid,len(fl)); cache[gid]=(L,fl)
        L,fl=cache[gid]; fr=flat(Image.open(bak(sp)).convert('RGBA')); FF=figface(fr)
        af=aligned(fr,FF); sc=[ncc(af,aligned(L,x)) for x in fl]; j=['a18','a26','a36','a51'].index(a); FL=fl[j]
        ex,ey,d=eyes(FL); w=FL[2]; s=BOX*w; b=[ex-s/2,ey-0.22*w-s/2+0.0,ex+s/2,ey-0.22*w+s/2]
        G.paste(L.crop(tuple(int(round(v)) for v in b)).resize((T,T),Image.LANCZOS),((k%C)*T,(k//C)*T))
        meta.append({'cols':C,'spec':sp,'gen':gid,'boxL':b,'eyeL':[ex,ey,d],'eyeF':list(eyes(FF)),'ncc':round(sc[j],3)})
        print(sp,'gen',gid,'match',j,'ncc',[round(v,2) for v in sc],'lineup face w',round(w),'fig eye d',round(eyes(FF)[2],1))
    G.save(f'g/{name}.jpg',quality=95); json.dump(meta,open(MJ,'w'))
elif cmd=='view':
    meta=json.load(open(MJ)); C=meta[0].get('cols',2); K=len(meta); E=Image.open(sys.argv[3]).convert('RGB'); n=E.width//C; W=int(sys.argv[5]) if len(sys.argv)>5 else n; Rw=(K+C-1)//C
    O=Image.new('RGB',(4*W,W*((K+3)//4)))
    for k in range(K): O.paste(E.crop(((k%C)*n,(k//C)*n,(k%C)*n+n,(k//C)*n+n)).resize((W,W),Image.LANCZOS),((k%4)*W,(k//4)*W))
    O.save(sys.argv[4],quality=95); print(sys.argv[4],O.size)
else:
    meta=json.load(open(MJ)); C=meta[0].get('cols',2); E=Image.open(sys.argv[3]).convert('RGB'); n=E.width//C; modes=sys.argv[4].split(',')
    for k,m in enumerate(meta):
        md=modes[k]
        if md=='-': continue
        sp=m['spec']; bak(sp); src=Image.open(figpath(sp) if os.environ.get('BASE')=='cur' else bak(sp)).convert('RGBA'); A=np.array(src); rgb=flat(src)
        exL,eyL,dL=m['eyeL']; exF,eyF,dF=m['eyeF']; bL=m['boxL']
        et=np.asarray(E.crop(((k%C)*n,(k//C)*n,(k%C)*n+n,(k//C)*n+n)).resize((T,T),Image.LANCZOS)).astype(np.float32)
        r=dF/dL; bF=[exF+(bL[0]-exL)*r,eyF+(bL[1]-eyL)*r,exF+(bL[2]-exL)*r,eyF+(bL[3]-eyL)*r]; sF=bF[2]-bF[0]
        M=np.float32([[T/sF,0,-bF[0]*T/sF],[0,T/sF,-bF[1]*T/sF]])
        o=cv2.warpAffine(np.asarray(rgb),M,(T,T),flags=cv2.INTER_CUBIC,borderMode=cv2.BORDER_REFLECT).astype(np.float32)
        oref=cv2.warpAffine(np.asarray(flat(Image.open(bak(sp)).convert('RGBA'))),M,(T,T),flags=cv2.INTER_CUBIC,borderMode=cv2.BORDER_REFLECT).astype(np.float32)
        D0=dF*T/sF; cx0=(exF-bF[0])*T/sF; cy0=(eyF-bF[1])*T/sF
        em=np.zeros((T,T),np.uint8); cv2.ellipse(em,(int(cx0),int(cy0+0.5*D0)),(int(1.3*D0),int(1.2*D0)),0,0,360,255,-1)
        cv2.ellipse(em,(int(cx0),int(cy0-0.62*D0)),(int(0.5*D0),int(0.4*D0)),0,0,360,0,-1)
        g1=cv2.GaussianBlur(cv2.cvtColor(o,cv2.COLOR_RGB2GRAY),(0,0),3); g2=cv2.GaussianBlur(cv2.cvtColor(et,cv2.COLOR_RGB2GRAY),(0,0),3)
        resp,W=align(g1,g2,em)
        if resp<0.9:
            print(sp,md,'BAD ALIGN',round(resp,2),'- tile skipped'); continue
        e=cv2.warpAffine(et,W,(T,T),flags=cv2.INTER_LINEAR+cv2.WARP_INVERSE_MAP,borderMode=cv2.BORDER_REFLECT)
        rs=float(np.sqrt(abs(np.linalg.det(W[:,:2])))); dx,dy=float(W[0,2]),float(W[1,2])
        D=dF*T/(bF[2]-bF[0]); cx=(exF-bF[0])*T/(bF[2]-bF[0]); cy=(eyF-bF[1])*T/(bF[2]-bF[0])
        # colour match edit -> fig (global gain/offset per channel over the whole tile)
        for ch in range(3):
            e[...,ch]=(e[...,ch]-e[...,ch].mean())/(e[...,ch].std()+1e-3)*oref[...,ch].std()+oref[...,ch].mean()
        mk=np.zeros((T,T),np.float32)
        if 'a' in md:
            fm=np.zeros((T,T),np.uint8); cv2.ellipse(fm,(int(cx),int(cy+0.68*D)),(int(0.9*D),int(0.92*D)),0,0,360,1,-1)
            ring=(cv2.dilate(fm,np.ones((int(0.25*D),int(0.25*D)),np.uint8))>0)&(fm==0)
            e=e+(oref[ring].mean(0)-e[ring].mean(0))
            # match saturation + contrast inside the face to the original painting (owner: same colour grade as a26/a36)
            fb=fm>0; eh=cv2.cvtColor(np.clip(e,0,255).astype(np.uint8),cv2.COLOR_RGB2HSV).astype(np.float32); oh=cv2.cvtColor(np.clip(oref,0,255).astype(np.uint8),cv2.COLOR_RGB2HSV).astype(np.float32)
            fs=float(np.clip(oh[...,1][fb].mean()/(eh[...,1][fb].mean()+1e-3),0.85,1.35)); eh[...,1]=np.clip(eh[...,1]*fs,0,255)
            e=cv2.cvtColor(eh.astype(np.uint8),cv2.COLOR_HSV2RGB).astype(np.float32)
            for ch in range(3):
                mo,so,me,se=oref[...,ch][fb].mean(),oref[...,ch][fb].std(),e[...,ch][fb].mean(),e[...,ch][fb].std()
                e[...,ch]=(e[...,ch]-me)*float(np.clip(so/(se+1e-3),0.85,1.15))+mo
            mk=np.maximum(mk,cv2.GaussianBlur(fm.astype(np.float32),(0,0),D*0.07))
        if 'm' in md:
            win=np.zeros((T,T),np.uint8); cv2.ellipse(win,(int(cx),int(cy-0.62*D)),(int(float(os.environ.get('WX','0.78'))*D),int(0.45*D)),0,0,360,1,-1)
            df=cv2.GaussianBlur(np.abs(o-e).max(axis=2),(0,0),3)
            bb=((df>float(os.environ.get('DTH','40')))&(win>0)).astype(np.uint8)
            nn,lab,st,_=cv2.connectedComponentsWithStats(bb); mm=np.zeros((T,T),np.uint8)
            for i in range(1,nn):
                if st[i,4]>0.003*D*D: mm[lab==i]=1
            if mm.sum()==0: cv2.ellipse(mm,(int(cx),int(cy-0.6*D)),(int(0.3*D),int(0.35*D)),0,0,360,1,-1)
            h=cv2.convexHull(cv2.findNonZero(mm)); mm=np.zeros_like(mm); cv2.fillConvexPoly(mm,h,1); cv2.ellipse(mm,(int(cx),int(cy-0.72*D)),(int(float(os.environ.get('FX','0.95'))*D),int(0.4*D)),0,0,360,1,-1)
            kk=int(0.08*D)|1; mm=cv2.dilate(mm,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(kk,kk)))
            # local offset so the skin around the mark matches
            ring=(cv2.dilate(mm,np.ones((int(0.2*D),int(0.2*D)),np.uint8))>0)&(mm==0)
            em=e+(o[ring].mean(0)-e[ring].mean(0)) if 'a' not in md else e
            mf=cv2.GaussianBlur(mm.astype(np.float32),(0,0),D*0.03)
            e=e*(1-mf[...,None])+em*mf[...,None]; mk=np.maximum(mk,mf)
        cv2.imwrite(f'g/{name}-mk{k}.png',(mk*255).astype(np.uint8))
        bl=np.clip(o*(1-mk[...,None])+e*mk[...,None],0,255)
        # back to fig coords
        Mi=cv2.invertAffineTransform(M); h0,w0=A.shape[:2]; sg=0.45*T/(bF[2]-bF[0]); bl=cv2.GaussianBlur(bl,(0,0),sg)
        tile=cv2.warpAffine(bl,Mi,(w0,h0),flags=cv2.INTER_AREA if False else cv2.INTER_LINEAR)
        ms=cv2.warpAffine(mk,Mi,(w0,h0),flags=cv2.INTER_LINEAR)[...,None]
        A[...,:3]=np.clip(A[...,:3]*(1-ms)+tile*ms,0,255).astype(np.uint8)
        print(sp,md,'scale',round(rs,3),'shift',round(dx,1),round(dy,1),'resp',round(resp,2),'mask',int((mk>0.5).sum()))
        if os.environ.get('DRY'): continue
        im2=Image.fromarray(A,'RGBA'); f=figpath(sp)
        for q in (90,86,80,74):
            bb2=io.BytesIO(); im2.save(bb2,'WEBP',quality=q,method=4)
            if bb2.tell()<=250*1024: break
        open(f,'wb').write(bb2.getvalue())
