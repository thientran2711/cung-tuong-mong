# hswap.py RECIPIENT_NAME DONOR_NAME x0 y0 x1 y1 : hand-box erase of old mark (fit fill) + donor flower pasted at 0.085
import sys,os,json,re
sys.path.insert(0,'/home/user/wt/huadian3/dev/art/huadian-size')
import numpy as np,cv2,types
from PIL import Image
import shrink2,runpor
from shrink2 import analyze,swap
from runswap import prune_donor
rn,dn=sys.argv[1:3]; box=[float(v) for v in sys.argv[3:7]]; THR=float(os.environ.get('THR',0))
REF=json.load(open('/home/user/wt/huadian3/dev/art/huadian-size/ref.json'))
pid=re.search(r'((?:consort|maid)-[cm]\d\d)',rn).group(1); fw=REF[pid][2]
im=Image.open(f'orig/{rn}.webp').convert('RGBA'); an=analyze(np.asarray(im)[...,:3],box,fw,inner=None)
if THR:
    st=(an['dE']>THR)&an['inbox']&~an['prot']; n,lbl,s_,_=cv2.connectedComponentsWithStats(st.astype(np.uint8)); keep=np.zeros_like(st)
    for i in range(1,n):
        if s_[i][4]>=5: keep|=(lbl==i)
    an['strong']=keep; an['mark']=keep|(cv2.dilate(keep.astype(np.uint8),np.ones((5,5),np.uint8)).astype(bool)&(an['dE']>THR*0.6)&an['inbox']&~an['prot'])
dinfo,_,dan=runpor.process(f'orig/{dn}.webp',dn,'orig'); dan=prune_donor(dan,dinfo['fw'])
m=types.SimpleNamespace(**{k:getattr(cv2,k) for k in dir(cv2) if not k.startswith('__')}); m.inpaint=lambda a,b,c,d: (np.clip(an['fit'],0,255).astype(np.uint8) if a.shape==an['fit'].shape else cv2.inpaint(a,b,c,d)); shrink2.cv2=m
out,s=swap(im,an,dan,runpor.TARGET); os.makedirs('hfix2',exist_ok=True); out.save(f'hfix2/{rn}.webp','WEBP',quality=93,method=4); print(rn,'scale',s)
