# runpatch.py: carry the fixed portraits onto fig / hd / tn as a DELTA: T_new = T + m * (R(por_fixed) - R(por_orig))
# where R = resample into T's pixel grid (template-matched scale/offset for fig/hd; plain resize for tn) and m = mask of the changed por pixels.
# Everything outside the changed forehead window stays bit-identical.
# usage (cwd=work): runpatch.py MODE TDIR OUTDIR ORIGDIR FIXEDDIR names...    MODE: fig|hd (match from por) | tnpor | tnfig(source = fig orig/fixed)
import sys,os,json,re
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import numpy as np,cv2
from PIL import Image
from face import comp
from runfig import match,gray
D=os.path.dirname(os.path.abspath(__file__))
WIN={}
for _l in open(os.environ.get('WINLOG','logm.jsonl')):
    _x=json.loads(_l)
    if _x.get('winx'): WIN[_x['name']]=_x['winx']
FIGBOX={}
if os.environ.get('FIGLOG'):
    for _l in open(os.environ['FIGLOG']):
        _x=json.loads(_l)
        if _x.get('box'): FIGBOX[_x['name']]=_x['box']
REF=json.load(open(D+'/ref.json'))
def load(p): return np.asarray(Image.open(p).convert('RGBA')).astype(np.float32)
def process(mode,tpath,name,odir,fdir):
    pid=re.match(r'(?:por|fig)-((?:consort|maid)-[cm]\d\d|player-look\d)',name).group(1)
    pn='por-'+name.split('-',1)[1]; fn=name
    if mode in('fig','hd'):
        so,sf=f'{odir}/{pn}.webp',f'{fdir}/{pn}.webp'
    else: # tn: source is the same-named full image (por or fig)
        so,sf=f'{odir}/{name}.webp',f'{fdir}/{name}.webp'
    if not os.path.exists(sf): return dict(name=name,status='unchanged'),None
    T=load(tpath); Ao=load(so); Af=load(sf)
    wb=WIN.get(pn) if mode!='tnfig' else FIGBOX.get(name)
    if wb is None: return dict(name=name,status='nowin'),None
    changed=(np.abs(Af[...,:3]-Ao[...,:3]).max(-1)>1.5).astype(np.uint8)
    lim=np.zeros_like(changed); lim[max(wb[1]-5,0):wb[3]+5,max(wb[0]-5,0):wb[2]+5]=1; changed*=lim
    if not changed.any(): return dict(name=name,status='unchanged'),None
    info=dict(name=name)
    if mode in('fig','hd'):
        cx,ey,fw=REF[pid]
        kr=(0.50,0.74,0.02) if mode=='fig' else (1.0,1.5,0.04)
        Image.open(so)
        (sc,k,loc),(tx0,ty0)=match(gray(Image.open(so).convert('RGBA')),gray(Image.open(tpath).convert('RGBA')),cx,ey,fw,kr)
        info.update(score=round(float(sc),3),k=round(float(k),4))
        if sc<0.9: info['status']='lowmatch'; return info,None
        M=np.float32([[k,0,loc[0]-k*tx0],[0,k,loc[1]-k*ty0]])
    else:
        sx=T.shape[1]/Ao.shape[1]; sy=T.shape[0]/Ao.shape[0]; M=np.float32([[sx,0,0],[0,sy,0]]); k=min(sx,sy)
    H,W=T.shape[:2]; fl=cv2.INTER_AREA if k<1 else cv2.INTER_CUBIC
    ys,xs=np.nonzero(changed); pad=6
    cx0,cy0,cx1,cy1=max(xs.min()-pad,0),max(ys.min()-pad,0),xs.max()+pad+1,ys.max()+pad+1
    # target bbox
    tx0=int(max(np.floor(M[0,0]*cx0+M[0,2])-4,0)); ty0=int(max(np.floor(M[1,1]*cy0+M[1,2])-4,0))
    tx1=int(min(np.ceil(M[0,0]*cx1+M[0,2])+4,W)); ty1=int(min(np.ceil(M[1,1]*cy1+M[1,2])+4,H))
    Mt=M.copy(); Mt[0,2]-=tx0; Mt[1,2]-=ty0; sz=(tx1-tx0,ty1-ty0)
    big=lambda a: cv2.warpAffine(a[...,:3],Mt,sz,flags=fl,borderMode=cv2.BORDER_REPLICATE)
    wo=big(Ao); wf=big(Af)
    md=cv2.dilate(changed,np.ones((7,7),np.uint8)).astype(np.float32)
    wm=cv2.warpAffine(md,Mt,sz,flags=cv2.INTER_LINEAR); wm=np.clip(cv2.GaussianBlur(wm,(0,0),0.8)*1.5,0,1)
    out=T.copy(); reg=out[ty0:ty1,tx0:tx1,:3]
    # replace (not add) inside the mask so thin old lines can never ghost through; colour offset fixed from the ring around the mask
    mb=(wm>0.02).astype(np.uint8); ring=(cv2.dilate(mb,np.ones((9,9),np.uint8))-cv2.dilate(mb,np.ones((5,5),np.uint8))).astype(bool)
    off=(reg-wo)[ring].mean(0) if ring.sum()>10 else np.zeros(3,np.float32)
    out[ty0:ty1,tx0:tx1,:3]=np.clip(reg*(1-wm[...,None])+(wf+off)*wm[...,None],0,255)
    info['status']='patched'; info['box']=[tx0,ty0,tx1,ty1]
    return info,Image.fromarray(out.astype(np.uint8),'RGBA')
if __name__=='__main__':
    mode,td,od,orig,fixed=sys.argv[1:6]; os.makedirs(od,exist_ok=True)
    for n in sys.argv[6:]:
        try:
            info,im=process(mode,f'{td}/{n}.webp',n,orig,fixed)
            if im is not None: im.save(f'{od}/{n}.webp','WEBP',quality=93,method=4)
        except Exception as e: info=dict(name=n,status='error',err=repr(e))
        print(json.dumps(info),flush=True)
