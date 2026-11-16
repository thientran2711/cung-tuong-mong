# locate.py: find the a18 mark patch inside an aged portrait (template match, multi-scale) -> (score, scale, box in this image)
import os,sys,json,re
import numpy as np,cv2
from PIL import Image
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from face import comp
D=os.path.dirname(os.path.abspath(__file__))
REF=json.load(open(D+'/ref.json')); BOX=json.load(open(D+'/a18_boxes.json'))
if os.path.exists(D+'/ty_boxes.json'): BOX.update(json.load(open(D+'/ty_boxes.json')))
def gray(p): return cv2.cvtColor(comp(Image.open(p)),cv2.COLOR_RGB2GRAY)
def locate(a18path,tpath,name18):
    pid=re.match(r'por-((?:consort|maid)-[cm]\d\d|player-look\d)',name18).group(1); cx0,ey0,fw0=REF[pid]; b=BOX[name18]
    g18=gray(a18path); gt=gray(tpath); m=int(0.05*fw0)
    x0,y0,x1,y1=int(b[0])-m,int(b[1])-m,int(b[2])+m,int(b[3])+m
    P=g18[y0:y1,x0:x1]
    best=None; S=int(0.30*fw0)
    sx0,sy0=max(x0-S,0),max(y0-S,0); sx1,sy1=min(x1+S,gt.shape[1]),min(y1+S,gt.shape[0])
    area=gt[sy0:sy1,sx0:sx1]
    for k in np.arange(0.70,1.31,0.03):
        p=cv2.resize(P,None,fx=k,fy=k,interpolation=cv2.INTER_AREA)
        if p.shape[0]>=area.shape[0] or p.shape[1]>=area.shape[1]: continue
        r=cv2.matchTemplate(area,p,cv2.TM_CCOEFF_NORMED); _,mx,_,loc=cv2.minMaxLoc(r)
        if best is None or mx>best[0]: best=(mx,k,loc,p.shape)
    mx,k,loc,shp=best
    # box in aged image: a18 box mapped through the patch placement
    ox,oy=sx0+loc[0],sy0+loc[1]
    bx=(ox+(b[0]-x0)*k,oy+(b[1]-y0)*k,ox+(b[2]-x0)*k,oy+(b[3]-y0)*k)
    return float(mx),float(k),bx
if __name__=='__main__':
    for n in sys.argv[1:]:
        for a in (26,36,51):
            t=n.replace('-a18',f'-a{a}')
            print(t,[round(v,2) if not isinstance(v,tuple) else [round(x,1) for x in v] for v in locate(f'src/{n}.webp',f'src/{t}.webp',n)])

def locate_face(a18path,tpath,name18):
    """match the a18 forehead/brow structure (mark box blanked) in the aged image -> (score,k,box_mapped)"""
    pid=re.match(r'por-((?:consort|maid)-[cm]\d\d|player-look\d)',name18).group(1); cx0,ey0,fw0=REF[pid]; b=BOX[name18]
    g18=gray(a18path); gt=gray(tpath)
    X0,Y0,X1,Y1=int(cx0-0.55*fw0),int(ey0-0.80*fw0),int(cx0+0.55*fw0),int(ey0+0.10*fw0)
    P=g18[Y0:Y1,X0:X1].copy()
    mx0,my0,mx1,my1=int(b[0])-3-X0,int(b[1])-3-Y0,int(b[2])+3-X0,int(b[3])+3-Y0
    P[max(my0,0):my1,max(mx0,0):mx1]=int(np.median(P))
    best=None
    for k in np.arange(0.88,1.13,0.02):
        p=cv2.resize(P,None,fx=k,fy=k,interpolation=cv2.INTER_AREA)
        r=cv2.matchTemplate(gt,p,cv2.TM_CCOEFF_NORMED); _,mx,_,loc=cv2.minMaxLoc(r)
        if best is None or mx>best[0]: best=(mx,k,loc)
    mx,k,loc=best
    mp=lambda x,y:(loc[0]+(x-X0)*k,loc[1]+(y-Y0)*k)
    a=mp(b[0],b[1]); c=mp(b[2],b[3])
    return float(mx),float(k),(a[0],a[1],c[0],c[1])
