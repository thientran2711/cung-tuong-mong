# hand.py SRC OUT x0 y0 x1 y1 [target=0.085] [fw] : analyze mark inside hand box, shrink as one piece to target*fw, save OUT; also dumps mask preview
import sys,os,json,re
sys.path.insert(0,'/home/user/wt/huadian3/dev/art/huadian-size')
import numpy as np
from PIL import Image
from shrink2 import analyze,apply
src,out=sys.argv[1:3]; box=[float(v) for v in sys.argv[3:7]]; tg=float(sys.argv[7]) if len(sys.argv)>7 else 0.085
REF=json.load(open('/home/user/wt/huadian3/dev/art/huadian-size/ref.json'))
pid=re.search(r'((?:consort|maid)-[cm]\d\d|player-look\d)',src).group(1); fw=REF[pid][2]
im=Image.open(src).convert('RGBA'); rgb=np.asarray(im)[...,:3]
an=analyze(rgb,box,fw,inner=None)
if an is None: print('NOMARK'); sys.exit(1)
import cv2
THR=float(os.environ.get('THR',0))
if THR:
    st=(an['dE']>THR)&an['inbox']&~an['prot']; st=cv2.morphologyEx(st.astype(np.uint8),cv2.MORPH_OPEN,np.ones((2,2),np.uint8)).astype(bool)
    n,lbl,stt,_=cv2.connectedComponentsWithStats(st.astype(np.uint8)); 
    keep=np.zeros_like(st)
    for i in range(1,n):
        if stt[i][4]>=6: keep|=(lbl==i)
    an['strong']=keep; wk=(an['dE']>THR*0.6)&an['inbox']&~an['prot']
    an['mark']=keep|(cv2.dilate(keep.astype(np.uint8),np.ones((5,5),np.uint8)).astype(bool)&wk)
    cols=np.nonzero(keep.any(0))[0]; an['width']=float(cols[-1]-cols[0]+1); an['bbox']=(an['org'][0]+cols[0],an['org'][0]+cols[-1]+1)
print('width',an['width'],'ratio',an['width']/fw,'bbox',an['bbox'])
if os.environ.get('FIT'):
    import types,shrink2
    m=types.SimpleNamespace(**{k:getattr(cv2,k) for k in dir(cv2) if not k.startswith('__')})
    m.inpaint=lambda img,mask,r,fl: np.clip(an['fit'],0,255).astype(np.uint8)
    shrink2.cv2=m
res,s=apply(im,an,tg); print('scale',s); res.save(out,'WEBP',quality=93,method=4)
# preview of mask
X0,Y0,X1,Y1=an['org']; pv=np.asarray(im).copy()[Y0:Y1,X0:X1,:3]; pv[an['mark']]=(255,0,255); pv[an['strong']]=(0,255,0)
Image.fromarray(pv).resize((pv.shape[1]*4,pv.shape[0]*4),Image.NEAREST).save(out.replace('.webp','_mask.png'))
