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
log=[]
for n,st,rem,add,src in J:
  img=load(n);orig=img.copy()
  if src: ratio,w=lift(load(src[0]),src[1],src[2])
  for x,y in rem: img=remove(img,x,y)
  if add: img=paste(img,add[0],add[1],ratio,w)
  cv2.imwrite(R+'fixed/'+n+'_a18.webp',img,[cv2.IMWRITE_WEBP_QUALITY,100])
  log.append(dict(id=n,status=st,old=rem,new=add,src=src,changed_px=int((np.abs(img.astype(int)-orig).sum(2)>0).sum())))
json.dump(log,open(R+'fixed/markfix_log.json','w'),indent=1);print(json.dumps(log))
