# postclean.py SRCDIR OUTDIR LOG names... : remove stray specks around the swapped mark (everything except the largest cluster, inside the swap window)
import sys,os,json,re
sys.path.insert(0,'/home/user/wt/huadian3/dev/art/huadian-size')
import numpy as np,cv2
from PIL import Image
from shrink2 import analyze
src,out,log=sys.argv[1:4]; os.makedirs(out,exist_ok=True)
L={}
for l in open(log):
    x=json.loads(l); L[x['name']]=x
for n in sys.argv[4:]:
    x=L[n]; fw=x['fw']; im=Image.open(f'{src}/{n}.webp').convert('RGBA'); rgb=np.asarray(im)[...,:3]
    win=list(x['winx']); EB=float(os.environ.get('EB',0)); win[3]=max(win[3],int(x['ey']-EB*fw)) if EB else win[3]; an=analyze(rgb,win,fw,inner=None)
    if an is None: print(n,'nomark'); im.save(f'{out}/{n}.webp','WEBP',quality=92,method=4); continue
    g=an['strong'].astype(np.uint8); gap=max(3,int(float(os.environ.get('GAP',0.06))*fw))|1
    k,lbl,st,_=cv2.connectedComponentsWithStats(cv2.dilate(g,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(gap,gap))))
    if False: im.save(f'{out}/{n}.webp','WEBP',quality=92,method=4); print(n,'clean'); continue
    if k<2: print(n,'nomain'); continue
    areas=sorted([(g[lbl==i].sum(),i) for i in range(1,k)],reverse=True); main=areas[0][1]
    # also drop faint weak pieces away from the main cluster
    mainm=cv2.dilate((lbl==main).astype(np.uint8),np.ones((9,9),np.uint8)).astype(bool)
    mz=cv2.dilate((lbl==main).astype(np.uint8),np.ones((max(5,int(float(os.environ.get("MZ",0.07))*fw))|1,)*2,np.uint8)).astype(bool)
    thr=float(os.environ.get('SPK',0)) or max(7.0,1.5*an['p99k'])
    rm=((an['dE']>thr)&an['inbox']&~an['prot']&~mz)|((an['mark']|an['strong'])&~mainm&an['inbox']&~an['prot'])
    rm=cv2.dilate(rm.astype(np.uint8),np.ones((5,5),np.uint8)).astype(bool)&~mainm&an['inbox']&~an['prot']
    if os.environ.get('CUTTAIL'):
        mm=((lbl==main)&(g>0)); wd=mm.sum(1); mx=wd.max(); rows=np.nonzero(wd>=0.5*mx)[0]; yb=rows.max()+2
        cols=np.nonzero(mm.any(0))[0]; cxm=(cols.min()+cols.max())/2; rr=np.zeros_like(rm); rr[yb:]=True
        cc=np.zeros_like(rm); cc[:,int(cxm-0.1*fw):int(cxm+0.1*fw)]=True
        thr2=max(5.0,1.2*an['p99k']); rm=(rr&cc&an['inbox']&~an['prot']&(an['dE']>thr2))|(rm&rr)
        rm=cv2.dilate(rm.astype(np.uint8),np.ones((5,5),np.uint8)).astype(bool)&rr&an['inbox']&~an['prot']
    if os.environ.get('BELOW'):
        ys=np.nonzero((lbl==main)&(g>0))[0] if False else np.nonzero(((lbl==main)&(g>0)).any(1))[0]
        yb=ys.max()+1+int(0.012*fw); rr=np.zeros_like(rm); rr[yb:]=True; rm=rm&rr
    X0,Y0,X1,Y1=an['org']; A=np.asarray(im).astype(np.float32)
    w=np.clip(cv2.GaussianBlur(rm.astype(np.float32),(5,5),1.0),0,1)[...,None]
    reg=A[Y0:Y1,X0:X1,:3]; fit=np.clip(an['fit'],0,255)
    rng=np.random.default_rng(1); nz=cv2.GaussianBlur(rng.normal(0,1,reg.shape).astype(np.float32)*an['noise'],(3,3),0.7)
    A[Y0:Y1,X0:X1,:3]=reg*(1-w)+(fit+nz)*w
    Image.fromarray(np.clip(A,0,255).astype(np.uint8),'RGBA').save(f'{out}/{n}.webp','WEBP',quality=92,method=4)
    print(n,'cleaned',int(rm.sum()))
