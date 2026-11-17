# clean3.py SRC OUT NAME... : remove painted hoa dien from por-* files (det3). json line per file; lossless webp out.
import sys,os,json,re
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import numpy as np
from PIL import Image
from det3 import detect,remove
from face import face
D=os.path.dirname(os.path.abspath(__file__)); REF=json.load(open(D+'/ref.json'))
FACE=json.load(open(os.environ['FACES'])) if os.environ.get('FACES') else {}
def params(path,name):
    if name in FACE: return FACE[name]
    m=re.match(r'por-((?:consort|maid)-[cm]\d\d|player-look\d)',name); pid=m.group(1) if m else None
    cx,ey,fw,ed,rgb=face(path)
    if pid in REF:
        cx0,ey0,fw0=REF[pid]
        if abs(fw-fw0)>0.12*fw0 or abs(cx-cx0)>0.10*fw0 or abs(ey-ey0)>0.10*fw0: return cx0,ey0,fw0
    return cx,ey,fw
if __name__=='__main__':
    src,out=sys.argv[1:3]; os.makedirs(out,exist_ok=True)
    for n in sys.argv[3:]:
        p=f'{src}/{n}.webp'
        try:
            im=Image.open(p).convert('RGBA'); rgb=np.ascontiguousarray(np.asarray(im)[...,:3])
            cx,ey,fw=params(p,n); d=detect(rgb,cx,ey,fw)
            info=dict(name=n,face=[round(float(v),1) for v in (cx,ey,fw)],size=list(im.size))
            if d is None: info['status']='nomark'
            else:
                res,rect=remove(im,d); res.save(f'{out}/{n}.webp','WEBP',lossless=True,quality=100,method=6,exact=True)
                A=np.asarray(im).astype(int); B=np.asarray(Image.open(f'{out}/{n}.webp').convert('RGBA')).astype(int)
                diff=np.abs(A-B).max(-1)>0; x0,y0,x1,y1=rect; outside=diff.copy(); outside[y0:y1,x0:x1]=False
                info.update(status='clean',box=list(d['box']),anchor=list(d['anchor']),width=d['width'],peak=d['peak'],th=d['th'],
                            rect=list(rect),changed=int(diff.sum()),out_diff=int(outside.sum()),size_ok=list(B.shape[:2])==list(A.shape[:2]))
        except Exception as e:
            import traceback; info=dict(name=n,status='error',err=traceback.format_exc()[-500:])
        print(json.dumps(info),flush=True)
