import sys,glob,json,os
sys.path.insert(0,'../dev/art/huadian-size')
from face import face
from det2 import detect2
import numpy as np
REF=json.load(open('../dev/art/huadian-size/ref.json'))
out={}
for f in sorted(glob.glob('src/por-*-a18.webp')):
    n=os.path.basename(f)[:-5]; pid=n[4:].rsplit('-',2)[0]
    cx,ey,rf=REF[pid]
    from PIL import Image; from face import comp; rgb=comp(Image.open(f))
    r=detect2(rgb,cx,ey,rf)
    out[n]=None if r is None else dict(box=[round(float(v),1) for v in r['box']],w=round(r['w']/rf,4))
json.dump(out,open('det18.json','w'))
print(len(out),sum(v is None for v in out.values()))
