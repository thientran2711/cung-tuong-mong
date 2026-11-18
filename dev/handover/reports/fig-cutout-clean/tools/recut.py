import sys,numpy as np, cv2
from PIL import Image
for p in sys.argv[1:]:
    im=np.array(Image.open(p).convert('RGBA')).astype(np.float32)
    a=im[...,3]
    er=cv2.erode((a>0).astype(np.uint8),np.ones((3,3),np.uint8))>0
    inner=cv2.erode((a>200).astype(np.uint8),np.ones((5,5),np.uint8))>0
    band=(~er)|((a<255)&~inner)
    _,lbl=cv2.distanceTransformWithLabels((~inner).astype(np.uint8),cv2.DIST_L2,3,labelType=cv2.DIST_LABEL_PIXEL)
    ys,xs=np.nonzero(inner); order=np.zeros((lbl.max()+1,2),int); order[lbl[inner]]=np.stack([ys,xs],1)
    near=order[lbl]; rgb=im[...,:3].copy(); m=band&(a>0)
    rgb[m]=im[near[...,0],near[...,1],:3][m]
    a2=a.copy(); a2[~er]=0
    Image.fromarray(np.dstack([rgb,a2]).clip(0,255).astype(np.uint8)).save(p,quality=92,method=6)
