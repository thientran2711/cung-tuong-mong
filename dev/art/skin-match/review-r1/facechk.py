import sys,os,numpy as np,cv2
sys.path.insert(0,'/home/user/cung-tuong-mong/dev/art/skin-match')
import seg,measure,fix
d=sys.argv[1]; names=sys.argv[2:]; crops=[]
for n in names:
    im=cv2.imread(os.path.join(d,n),cv2.IMREAD_UNCHANGED); r=measure.regions(im,seg.probs(im))
    x0,y0,x1,y1=r['fbox']
    # stress test: apply an exaggerated shift (6,6) to neck+hands; face box above chin must stay byte-equal
    out=fix.apply(im,r,(6.0,6.0),(6.0,6.0))
    fh=y1-y0; fy1=y0+int(0.62*fh)    # forehead..mouth band
    reg=(slice(y0,fy1),slice(x0,x1))
    diff=int((out[reg][...,:3]!=im[reg][...,:3]).any(-1).sum()); changed=int((out[...,:3]!=im[...,:3]).any(-1).sum())
    print(n,'faceband px changed',diff,'total changed',changed)
    a=im[...,3:]/255.; c=(im[...,:3]*a+np.array([195,213,230])*(1-a)).astype(np.uint8)
    p=c[max(0,y0-int(.1*fh)):y0+int(.5*fh),x0:x1]; crops.append(cv2.resize(p,(int(p.shape[1]*240/p.shape[0]),240)))
W=1900;rows=[];cur=[]
for t in crops:
    if cur and sum(x.shape[1] for x in cur)+t.shape[1]>W: rows.append(cur);cur=[]
    cur.append(t)
rows.append(cur)
rows=[np.hstack(r+[np.full((240,W-sum(x.shape[1] for x in r),3),60,np.uint8)]) for r in rows]
cv2.imwrite('sh/foreheads.jpg',np.vstack(rows),[cv2.IMWRITE_JPEG_QUALITY,88])
