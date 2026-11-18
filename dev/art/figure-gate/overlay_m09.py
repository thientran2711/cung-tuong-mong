import cv2,numpy as np,sys
cc=cv2.CascadeClassifier(cv2.data.haarcascades+'haarcascade_frontalface_default.xml')
def load(p):
    im=cv2.imread(p,cv2.IMREAD_UNCHANGED); a=im[:,:,3]; g=cv2.cvtColor(im[:,:,:3],cv2.COLOR_BGR2GRAY); g[a<40]=245
    ys=np.where((a>40).any(1))[0]; feet=ys[-1]; top=ys[0]
    fs=cc.detectMultiScale(g[:top+int((feet-top)*0.35)],1.05,6,minSize=(60,60))
    def skin(r):
        x,y,w,h=r; p=im[y+h//4:y+3*h//4,x+w//4:x+3*w//4,:3].reshape(-1,3).astype(int); al=a[y+h//4:y+3*h//4,x+w//4:x+3*w//4].reshape(-1)
        b,g_,rr=p[:,0],p[:,1],p[:,2]; ok=(rr>150)&(rr>g_)&(g_>b)&(rr-b>15)&(al>200); return ok.mean()
    fs=[r for r in fs if skin(r)>0.5] or list(fs)
    x,y,w,h=max(fs,key=lambda r:r[2]*r[3]); return im,feet,y,h
H=1400
def norm(p):
    im,feet,y,h=load(p); skull=y-0.45*h; s=H/(feet-skull)
    im2=cv2.resize(im,None,fx=s,fy=s,interpolation=cv2.INTER_AREA)
    c=np.zeros((H+500,700,4),np.uint8); off=int(300-skull*s); xo=(700-im2.shape[1])//2
    ys0=max(0,off); yi=ys0-off; hh=min(im2.shape[0]-yi,c.shape[0]-ys0)
    xs0=max(0,xo); xi=xs0-xo; ww=min(im2.shape[1]-xi,700-xs0)
    c[ys0:ys0+hh,xs0:xs0+ww]=im2[yi:yi+hh,xi:xi+ww]; return c,h*s
m,mh=norm('m09.webp')
edge=cv2.dilate(cv2.Canny((m[:,:,3]>40).astype(np.uint8)*255,50,150),np.ones((3,3),np.uint8))
cols=[]
for f in sys.argv[2:]:
    c,fh=norm('m_'+f+'.png'); bg=np.full(c.shape[:2]+(3,),(228,240,245),np.uint8)
    al=c[:,:,3:4]/255.; o=(c[:,:,:3]*al+bg*(1-al)).astype(np.uint8)
    mm=m[:,:,3:4]/255.*0.35; o=(o*(1-mm)+np.array([255,120,60])*mm).astype(np.uint8); o[edge>0]=(0,0,255)
    cv2.line(o,(0,300),(700,300),(0,0,200),3); cv2.line(o,(0,300+H),(700,300+H),(0,0,200),3)
    cv2.putText(o,f+' %+.0f%%'%(100*(fh/mh-1)),(10,40),cv2.FONT_HERSHEY_SIMPLEX,1.1,(0,0,0),3)
    cols.append(o); print(f,'%+.1f%%'%(100*(fh/mh-1)))
cv2.imwrite(sys.argv[1],cv2.resize(np.hstack(cols),None,fx=0.4,fy=0.4),[cv2.IMWRITE_JPEG_QUALITY,88])
