import sys,os,numpy as np,cv2
sys.path.insert(0,'/home/user/cung-tuong-mong/dev/art/skin-match')
import seg,measure
d,out=sys.argv[1],sys.argv[2]; names=sys.argv[3:]; H=300; tiles=[]
def comp(im):
    a=im[...,3:]/255.; return (im[...,:3]*a+np.array([195,213,230])*(1-a)).astype(np.uint8)
for n in names:
    im=cv2.imread(os.path.join(d,n),cv2.IMREAD_UNCHANGED); r=measure.regions(im,seg.probs(im))
    if r is None: continue
    c=comp(im); x0,y0,x1,y1=r['fbox']; fw=x1-x0; 
    pad=int(.25*(y1-y0)); parts=[c[max(0,y0-pad):y1+int(1.0*(y1-y0)), max(0,x0-pad):x1+pad]]
    hm=r['hands']; 
    if hm.sum()>200:
        ys,xs=np.where(hm); 
        # largest-density window: crop around median of hand pixels, 2 face heights wide
        cy,cx=int(np.median(ys)),int(np.median(xs)); s=int(1.1*(y1-y0))
        parts.append(c[max(0,cy-s//2):cy+s//2,max(0,cx-s//2):cx+s//2])
    ts=[cv2.resize(p,(int(p.shape[1]*H/p.shape[0]),H)) for p in parts if p.size]
    t=np.hstack(ts); cv2.putText(t,n[4:-5][:24],(3,12),cv2.FONT_HERSHEY_SIMPLEX,.4,(0,0,0),1); tiles.append(np.pad(t,((0,0),(0,6),(0,0)),constant_values=60))
rows,cur,W=[],[],1900
for t in tiles:
    if cur and sum(x.shape[1] for x in cur)+t.shape[1]>W: rows.append(cur);cur=[]
    cur.append(t)
rows.append(cur)
rows=[np.hstack(r+[np.full((H,W-sum(x.shape[1] for x in r),3),60,np.uint8)]) for r in rows]
cv2.imwrite(out,np.vstack(rows),[cv2.IMWRITE_JPEG_QUALITY,82]); print(out,len(tiles))
