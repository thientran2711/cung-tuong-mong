import cv2,numpy as np,sys
labs=['Player look 1 + consort c32-t2','Player look 3 + maid m10','Consort c05-t4 + eunuch u20','Maid m03 + man congtu-7','Thai hau h2-a36 + kid p02-a14']
rows=[]
for i in range(1,6):
  a=cv2.imread('proof/%d-before.jpg'%i);b=cv2.imread('proof/%d-after.jpg'%i);h,w=a.shape[:2]
  ca=a[int(h*.18):int(h*.97),:int(w*.64)];cb=b[int(h*.18):int(h*.97),:int(w*.64)]
  s=lambda x:cv2.resize(x,(x.shape[1]//2,x.shape[0]//2),interpolation=cv2.INTER_AREA)
  top=np.hstack([s(ca),np.full((ca.shape[0]//2,8,3),255,np.uint8),s(cb)])
  import json;R=json.load(open('proof/%d-after.json'%i));y0=int(2*min(r[1] for r in R));fh=2*max(r[3] for r in R)
  bh=int(fh*.22);y0=y0+int(fh*.07)
  ha=a[y0:y0+bh,int(w*.08):int(w*.62)];hb=b[y0:y0+bh,int(w*.08):int(w*.62)]
  sc=(top.shape[1]-8)/(ha.shape[1]*2);hs=lambda x:cv2.resize(x,(int(x.shape[1]*sc),int(x.shape[0]*sc)),interpolation=cv2.INTER_AREA)
  A,B=hs(ha),hs(hb);bot=np.hstack([A,np.full((A.shape[0],top.shape[1]-2*A.shape[1],3),255,np.uint8),B])
  hd=np.full((34,top.shape[1],3),255,np.uint8);cv2.putText(hd,'%d. %s  -  LEFT: now (rosy layer)   RIGHT: rosy layer removed (B)'%(i,labs[i-1]),(8,23),cv2.FONT_HERSHEY_SIMPLEX,.55,(30,30,30),1,cv2.LINE_AA)
  rows.append(np.vstack([hd,top,bot,np.full((14,top.shape[1],3),255,np.uint8)]))
S=np.vstack(rows);cv2.imwrite(sys.argv[1],S,[cv2.IMWRITE_JPEG_QUALITY,84]);cv2.imwrite('pv.jpg',S[1500:2500])
