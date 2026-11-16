import sys,os,numpy as np,cv2
d,out=sys.argv[1],sys.argv[2]; names=sys.argv[3:]
H=420; tiles=[]
for n in names:
    im=cv2.imread(os.path.join(d,n),cv2.IMREAD_UNCHANGED)
    if im is None: continue
    a=im[...,3:]/255.; c=(im[...,:3]*a+np.array([195,213,230])*(1-a)).astype(np.uint8)
    if n.startswith('fig-'): c=c[:int(.62*c.shape[0])]
    t=cv2.resize(c,(int(c.shape[1]*H/c.shape[0]),H),interpolation=cv2.INTER_AREA)
    cv2.putText(t,n[4:-5][:26],(3,12),cv2.FONT_HERSHEY_SIMPLEX,.38,(0,0,0),1); tiles.append(np.pad(t,((0,0),(0,6),(0,0)),constant_values=60))
rows,cur,W=[],[],1900
for t in tiles:
    if cur and sum(x.shape[1] for x in cur)+t.shape[1]>W: rows.append(cur);cur=[]
    cur.append(t)
rows.append(cur)
rows=[np.hstack(r+[np.full((H,W-sum(x.shape[1] for x in r),3),60,np.uint8)]) for r in rows]
cv2.imwrite(out,np.vstack(rows),[cv2.IMWRITE_JPEG_QUALITY,80]); print(out,len(tiles),len(rows))
