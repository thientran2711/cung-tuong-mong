# runpor.py: shrink portraits. usage (cwd=work): runpor.py SRC OUT NAMES... | --all-glob PATTERN
# window = a18 box (a18_boxes.json, relative to ref.json cx/ey/fw) mapped onto this age's face (haar, clamped to ref), expanded.
import sys,os,json,re,glob
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import numpy as np
from PIL import Image
from face import face
from shrink2 import analyze,apply
from locate import locate
D=os.path.dirname(os.path.abspath(__file__))
REF=json.load(open(D+'/ref.json')); BOX=json.load(open(D+'/a18_boxes.json'))
if os.path.exists(D+'/ty_boxes.json'): BOX.update(json.load(open(D+'/ty_boxes.json')))  # r6: Trung y (ty1-8) a18 boxes
MAN_AGED=json.load(open(D+'/manual_aged.json')) if os.path.exists(D+'/manual_aged.json') else {}
TARGET=0.085; KEEP=0.088
def window(name,cx,ey,fw):
    m=re.match(r'por-((?:consort|maid)-[cm]\d\d|player-look\d)-(t\d|ty\d)-a(\d+)',name); pid,t,a=m.groups()
    cx0,ey0,fw0=REF[pid]; b=BOX[f'por-{pid}-{t}-a18']
    r=[(b[0]-cx0)/fw0,(b[1]-ey0)/fw0,(b[2]-cx0)/fw0,(b[3]-ey0)/fw0]
    return (cx+(r[0]-0.04)*fw,ey+(r[1]-0.04)*fw,cx+(r[2]+0.04)*fw,ey+(r[3]+0.015)*fw),pid
def faceparams(path,pid,age):
    cx0,ey0,fw0=REF[pid]
    if age==18: return cx0,ey0,fw0
    cx,ey,fw,ed,rgb=face(path)
    if abs(fw-fw0)>0.08*fw0 or abs(cx-cx0)>0.06*fw0 or abs(ey-ey0)>0.06*fw0: return cx0,ey0,fw0
    return cx,ey,fw
def process(path,name,srcdir=None):
    pid=re.match(r'por-((?:consort|maid)-[cm]\d\d|player-look\d)',name).group(1); age=int(name.rsplit('-a',1)[1])
    cx,ey,fw=REF[pid]; info0={}
    if age==18 and os.environ.get('TYBOX') and '-ty' in name and name in BOX:
        bx=BOX[name]; win=(bx[0]-0.035*fw,bx[1]-0.035*fw,bx[2]+0.035*fw,bx[3]+0.035*fw); inner=bx  # r6: ty marks, tight window from detected box
    elif age==18:
        win,_=window(name,cx,ey,fw); inner=None
    elif name in MAN_AGED:
        bx=MAN_AGED[name]; win=(bx[0]-0.12*fw,bx[1]-0.12*fw,bx[2]+0.12*fw,bx[3]+0.10*fw); inner=bx; info0=dict(match=1.0,manual=1)
    else:
        n18=re.sub(r'-a\d+$','-a18',name); sc,k,bx=locate(f'{srcdir}/{n18}.webp',path,n18); info0=dict(match=round(sc,3),mk=round(k,3))
        if sc>=float(os.environ.get("LOCMIN","0.50")):
            win=(bx[0]-0.04*fw,bx[1]-0.04*fw,bx[2]+0.04*fw,bx[3]+0.015*fw); inner=bx
        else:
            win,_=window(name,cx,ey,fw); inner=None
    im=Image.open(path).convert('RGBA'); rgb=np.asarray(im)[...,:3]
    if inner is None:
        w=win; bw=w[2]-w[0]; bh=w[3]-w[1]; mx=0.04*fw+0.0
        inner=(w[0]+mx+0.1*(bw-2*mx),w[1]+0.04*fw+0.1*(bh-0.055*fw),w[2]-mx-0.1*(bw-2*mx),w[3]-0.015*fw-0.1*(bh-0.055*fw))
    else:
        iw=inner[2]-inner[0]; ih=inner[3]-inner[1]; inner=(inner[0]+0.1*iw,inner[1]+0.1*ih,inner[2]-0.1*iw,inner[3]-0.1*ih)
    an=analyze(rgb,win,fw,inner=inner)
    info=dict(name=name,cx=cx,ey=ey,fw=fw,win=[round(float(v),1) for v in win]); info.update(info0)
    if an is None: info['status']='nomark'; return info,None,None
    info['ratio']=round(an['width']/fw,4); info['leak']=an['leak']; info['winx']=[int(v) for v in an['win']]; info['inner']=[round(float(v),1) for v in inner]; info['bbox']=[int(an['bbox'][0]),int(an['bbox'][1])]
    if age!=18 and info0.get('match',0)>=0.5 and not info0.get('manual'):
        bw0=bx[2]-bx[0]; cxb=(bx[0]+bx[2])/2; cyb=(bx[1]+bx[3])/2
        mb=an['bbox']; cm=(mb[0]+mb[1])/2
        if abs(cm-cxb)>0.10*fw or an['width']<0.30*bw0 or an['width']>1.5*bw0+0.05*fw: info['status']='suspect'; return info,None,an
    if info['ratio']<=KEEP: info['status']='keep'; return info,None,an
    out,s=apply(im,an,TARGET); info['status']='shrunk'; info['scale']=round(float(s),3)
    return info,out,an
if __name__=='__main__':
    src,out=sys.argv[1:3]; os.makedirs(out,exist_ok=True)
    for n in sys.argv[3:]:
        try:
            info,im,an=process(f'{src}/{n}.webp',n,src)
            if im is not None: im.save(f'{out}/{n}.webp','WEBP',quality=90,method=4)
        except Exception as e: info=dict(name=n,status='error',err=repr(e))
        print(json.dumps(info),flush=True)
