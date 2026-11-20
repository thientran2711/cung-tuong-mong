"""MARKFIX: full pictures by default; --cuts DIR for the CDN cut-outs; --heal-only s57,s59,s60 = remove only."""
# MARKFIX batch (0 credits): remove wrong/extra beauty marks (inpaint with surrounding skin)
# and place the mark (painted pixels lifted from a real mark) at the measured spot under the
# picture-RIGHT eye's outer corner. Originals untouched; output -> fixed/.
import cv2,numpy as np,json,os
R='dev/handover/review-sheets/rank8-t78/'
def load(n): return cv2.imread(R+n+'_a18.webp')
def mark_mask(img,x,y,r=4):
  L=img.mean(2).astype(np.float32);ring=L[y-8:y+9,x-8:x+9];sk=np.median(ring)
  yy,xx=np.mgrid[-r:r+1,-r:r+1];disk=np.hypot(xx,yy)<=r
  m=np.zeros(L.shape,np.uint8);sub=(L[y-r:y+r+1,x-r:x+r+1]<sk-6)&disk
  m[y-r:y+r+1,x-r:x+r+1]=sub.astype(np.uint8)*255
  return cv2.dilate(m,np.ones((3,3),np.uint8)),sk
def remove(img,x,y):
  m,_=mark_mask(img,x,y);return cv2.inpaint(img,m,3,cv2.INPAINT_TELEA)
def lift(img,x,y,r=4):
  L=img.mean(2).astype(np.float32);sk=img[y-8:y+9,x-8:x+9].reshape(-1,3);skL=sk.mean(1)
  skin=np.median(sk[skL>np.percentile(skL,40)],0)
  p=img[y-r:y+r+1,x-r:x+r+1].astype(np.float32);ratio=p/np.maximum(skin,1)
  dark=np.clip((skin.mean()-p.mean(2))/max(skin.mean()-p.mean(2).min(),1),0,1)
  w=np.clip((dark-0.06)/0.25,0,1)
  return ratio,w
def paste(img,x,y,ratio,w):
  r=ratio.shape[0]//2;t=img[y-r:y+r+1,x-r:x+r+1].astype(np.float32)
  out=t*(1+w[...,None]*(ratio-1));img=img.copy();img[y-r:y+r+1,x-r:x+r+1]=np.clip(out,0,255).astype(np.uint8);return img
J=[ # name, status, remove[(x,y)], add (x,y) or None, source (picture,x,y)
 ('s18_t7','EXTRA',[(476,318)],None,None),
 ('s37_t8','EXTRA',[(626,348)],None,None),
 ('s57_t7','WRONG SIDE',[(466,313)],(583,284),('s57_t7',466,313)),
 ('s59_t7','WRONG SIDE',[(481,330)],(591,307),('s59_t7',481,330)),
 ('s57_t8','WRONG SIDE',[(457,366)],(572,336),('s57_t7',466,313)),
 ('s59_t8','MISSING',[],(588,333),('s59_t7',481,330)),
 ('s60_t7','MISSING',[],(582,334),('s58_t7',606,301)),
 ('s60_t8','MISSING',[],(575,330),('s58_t8',596,350)),
]
import argparse,hashlib
ap=argparse.ArgumentParser(description=__doc__)
ap.add_argument('--cuts',help='folder with the CDN cut-outs <id>-<t>-a18.png: apply the same ops (RGB only, alpha untouched) -> img/fig-cut/rank8/<id>-<t>-a18-mf.png')
ap.add_argument('--heal-only',default='',help='comma ids (e.g. s57,s59,s60): only remove marks, place none (owner: no mark)')
A=ap.parse_args();HEAL=set(x for x in A.heal_only.split(',') if x)
def run(load_fn,save_fn):
  log=[]
  for n,st,rem,add,src in J:
    img=load_fn(n);orig=img.copy()
    if n.split('_')[0] in HEAL: add=None
    if add: ratio,w=lift(load_fn(src[0]),src[1],src[2])
    for x,y in rem: img=remove(img,x,y)
    if add: img=paste(img,add[0],add[1],ratio,w)
    save_fn(n,img)
    log.append(dict(id=n,status=st,old=rem,new=add,src=src if add else None,changed_px=int((np.abs(img.astype(int)-orig).sum(2)>0).sum())))
  return log
if not A.cuts:
  log=run(load,lambda n,img:cv2.imwrite(R+'fixed/'+n+'_a18.webp',img,[cv2.IMWRITE_WEBP_QUALITY,100]))
  json.dump(log,open(R+'fixed/markfix_log.json','w'),indent=1);print(json.dumps(log))
else:
  RGBA={}
  def lc(n):
    k=n.replace('_','-')
    if k not in RGBA: RGBA[k]=cv2.imread(os.path.join(A.cuts,k+'-a18.png'),cv2.IMREAD_UNCHANGED)
    return np.ascontiguousarray(RGBA[k][...,:3])
  os.makedirs('img/fig-cut/rank8',exist_ok=True);out={}
  def sc(n,img):
    k=n.replace('_','-');o=RGBA[k].copy();o[...,:3]=img;p='img/fig-cut/rank8/'+k+'-a18-mf.png';cv2.imwrite(p,o)
    assert (cv2.imread(p,cv2.IMREAD_UNCHANGED)[...,3]==RGBA[k][...,3]).all();out[k]=p
  log=run(lc,sc)
  for e in log: print(e['id'],e['old'],e['new'],e['changed_px'],out[e['id'].replace('_','-')],hashlib.md5(open(out[e['id'].replace('_','-')],'rb').read()).hexdigest())
