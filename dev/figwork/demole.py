# demole.py in.png out.png [-v] : remove small isolated dark spots (moles/beauty marks) sitting on smooth skin; keeps alpha
import sys,cv2,numpy as np
src,dst=sys.argv[1],sys.argv[2]; V='-v' in sys.argv
im=cv2.imread(src,cv2.IMREAD_UNCHANGED); a=None
if im.shape[2]==4: a=im[...,3]; bgr=np.ascontiguousarray(im[...,:3])
else: bgr=im
s=bgr.shape[1]/3840.0
L=cv2.cvtColor(bgr,cv2.COLOR_BGR2GRAY).astype(int)
k=int(21*s)|1; med=cv2.medianBlur(L.astype(np.uint8),max(5,k)).astype(int)
cand=((med-L)>35).astype(np.uint8)
if a is not None: cand&=(a>200).astype(np.uint8)
YT=int(L.shape[0]*float(__import__('os').environ.get('YTOP','0.25'))); cand[YT:]=0  # heads only (lineups: heads in the top quarter)
n,lab,st,cen=cv2.connectedComponentsWithStats(cand,8)
mask=np.zeros(L.shape,np.uint8); B,G,R=[bgr[...,i].astype(int) for i in range(3)]
hits=[]
for i in range(1,n):
    x,y,w,h,ar=st[i]
    if not (3*s*s<=ar<=160*s*s) or max(w,h)>18*s or max(w,h)>2.6*min(w,h)+2: continue
    r=int(10*s)+3; x0,y0,x1,y1=max(0,x-r),max(0,y-r),min(L.shape[1],x+w+r),min(L.shape[0],y+h+r)
    blob=(lab[y0:y1,x0:x1]==i); ring=~cv2.dilate(blob.astype(np.uint8),np.ones((5,5),np.uint8)).astype(bool)
    rr,gg,bb,ll=R[y0:y1,x0:x1][ring],G[y0:y1,x0:x1][ring],B[y0:y1,x0:x1][ring],L[y0:y1,x0:x1][ring]
    skin=((rr>185)&(gg>145)&(bb>120)&(rr-bb>=14)).mean()
    if skin<0.97 or ll.std()>14: continue
    hits.append((x,y,w,h)); mask[y0:y1,x0:x1]|=cv2.dilate(blob.astype(np.uint8),np.ones((5,5),np.uint8))
out=cv2.inpaint(bgr,mask,max(3,int(5*s)),cv2.INPAINT_TELEA)
if a is not None: out=np.dstack([out,a])
cv2.imwrite(dst,out)
print(src.split('/')[-1],"spots",len(hits),[(int(x),int(y)) for x,y,w,h in hits] if V else "")
