# runfig.py: shrink fig/hd images by mapping the (already analysed) por window onto them.
# The fig/hd face is a resized copy of the por face (template match corr ~0.98), so por window + por scale transfer 1:1.
# usage (cwd=work): runfig.py KIND SRC OUT PORSRC PORLOG names...   KIND = fig | hd
import sys,os,json,re
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import numpy as np,cv2
from PIL import Image
from shrink2 import analyze,apply
from face import comp
D=os.path.dirname(os.path.abspath(__file__))
def gray(im): return cv2.cvtColor(comp(im),cv2.COLOR_RGB2GRAY)
def match(por,fig,cx,ey,fw,krange):
    tx0,ty0=int(cx-0.4*fw),int(ey-0.55*fw)
    t=por[ty0:int(ey+0.1*fw),tx0:int(cx+0.4*fw)]
    H=min(fig.shape[0],int(fig.shape[0]*0.45)); best=None
    def tryk(k):
        tt=cv2.resize(t,None,fx=k,fy=k,interpolation=cv2.INTER_AREA)
        if tt.shape[0]>=H or tt.shape[1]>=fig.shape[1]: return None
        r=cv2.matchTemplate(fig[:H],tt,cv2.TM_CCOEFF_NORMED); _,mx,_,loc=cv2.minMaxLoc(r); return mx,k,loc
    for k in np.arange(krange[0],krange[1],krange[2]):
        r=tryk(k)
        if r and (best is None or r[0]>best[0]): best=r
    for k in np.arange(best[1]-krange[2],best[1]+krange[2],krange[2]/5):
        r=tryk(k)
        if r and r[0]>best[0]: best=r
    return best,(tx0,ty0)
def process(kind,path,name,porpath,L):
    info=dict(name=name); pl=L.get('por-'+name.split('-',1)[1])
    if pl is None: info['status']='nolog'; return info,None
    if pl['status']!='shrunk': info['status']='por_'+pl['status']; return info,None
    por=Image.open(porpath).convert('RGBA'); im=Image.open(path).convert('RGBA')
    kr=(0.45,0.80,0.01) if kind=='fig' else (0.9,1.8,0.02)
    (sc,k,loc),(tx0,ty0)=match(gray(por),gray(im),pl['cx'],pl['ey'],pl['fw'],kr)
    info.update(score=round(float(sc),3),k=round(float(k),4))
    info['crop']=[round(float(loc[0]+(pl['cx']-0.34*pl['fw']-tx0)*k),1),round(float(loc[1]+(pl['ey']-0.66*pl['fw']-ty0)*k),1),round(float(loc[0]+(pl['cx']+0.34*pl['fw']-tx0)*k),1),round(float(loc[1]+(pl['ey']-0.02*pl['fw']-ty0)*k),1)]
    if sc<0.9: info['status']='lowmatch'; return info,None
    mp=lambda x,y:(loc[0]+(x-tx0)*k,loc[1]+(y-ty0)*k)
    wx=pl['winx']; a=mp(wx[0],wx[1]); b=mp(wx[2],wx[3]); fwG=pl['fw']*k
    win=(a[0]-1,a[1]-1,b[0]+1,b[1]+1)
    iw=pl['inner']; ia=mp(iw[0],iw[1]); ib=mp(iw[2],iw[3])
    rgb=np.asarray(im)[...,:3]
    an=analyze(rgb,win,fwG,inner=(ia[0],ia[1],ib[0],ib[1]))
    if an is None: info['status']='nomark'; return info,None
    info['ratio']=round(an['width']/fwG,4)
    out,s=apply(im,an,0.085,s_override=pl['scale']); info['status']='shrunk'; info['scale']=round(float(s),3)
    return info,out
if __name__=='__main__':
    kind,src,out,psrc,plog=sys.argv[1:6]; os.makedirs(out,exist_ok=True)
    L={}
    for l in open(plog):
        x=json.loads(l); L[x['name']]=x
    for n in sys.argv[6:]:
        try:
            pn='por-'+n.split('-',1)[1]
            info,im=process(kind,f'{src}/{n}.webp',n,f'{psrc}/{pn}.webp',L)
            if im is not None: im.save(f'{out}/{n}.webp','WEBP',quality=90,method=4)
        except Exception as e: info=dict(name=n,status='error',err=repr(e))
        print(json.dumps(info),flush=True)
