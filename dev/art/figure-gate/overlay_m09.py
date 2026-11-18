# m09 overlay using the GAME's head-top method (MediaPipe face mesh, dev/art/headtop/headtop.py: ht = y(lm10) - 0.30*F)
import sys,numpy as np,cv2,mediapipe as mp
from mediapipe.tasks import python as mpp
from mediapipe.tasks.python import vision
LM=vision.FaceLandmarker.create_from_options(vision.FaceLandmarkerOptions(base_options=mpp.BaseOptions(model_asset_path='face_landmarker.task'),num_faces=1,min_face_detection_confidence=.1,min_face_presence_confidence=.1))
def meas(p):
    im=cv2.imread(p,cv2.IMREAD_UNCHANGED); a=im[:,:,3]; ys=np.where((a>40).any(1))[0]; top,feet=ys[0],ys[-1]
    bg=np.full(im.shape[:2]+(3,),245,np.uint8); al=a[...,None]/255.; rgb=(im[:,:,:3]*al+bg*(1-al)).astype(np.uint8)
    h=im.shape[0]; cut=int(top+(feet-top)*0.4); crop=cv2.cvtColor(rgb[:cut],cv2.COLOR_BGR2RGB)
    r=LM.detect(mp.Image(image_format=mp.ImageFormat.SRGB,data=np.ascontiguousarray(crop)))
    L=r.face_landmarks[0]; y10=L[10].y*cut; y152=L[152].y*cut; F=y152-y10
    return im,feet,y10-0.30*F,F
H=1400
def norm(p):
    im,feet,ht,F=meas(p); s=H/(feet-ht)
    im2=cv2.resize(im,None,fx=s,fy=s,interpolation=cv2.INTER_AREA)
    c=np.zeros((H+500,700,4),np.uint8); off=int(300-ht*s); xo=(700-im2.shape[1])//2
    ys0=max(0,off); yi=ys0-off; hh=min(im2.shape[0]-yi,c.shape[0]-ys0); xs0=max(0,xo); xi=xs0-xo; ww=min(im2.shape[1]-xi,700-xs0)
    c[ys0:ys0+hh,xs0:xs0+ww]=im2[yi:yi+hh,xi:xi+ww]; return c,F*s
if __name__=='__main__':
    m,mF=norm('m09.webp'); edge=cv2.dilate(cv2.Canny((m[:,:,3]>40).astype(np.uint8)*255,50,150),np.ones((3,3),np.uint8))
    cols=[]
    for f in sys.argv[2:]:
        c,F=norm('m_'+f+'.png'); bg=np.full(c.shape[:2]+(3,),(228,240,245),np.uint8)
        al=c[:,:,3:4]/255.; o=(c[:,:,:3]*al+bg*(1-al)).astype(np.uint8)
        mm=m[:,:,3:4]/255.*0.35; o=(o*(1-mm)+np.array([255,120,60])*mm).astype(np.uint8); o[edge>0]=(0,0,255)
        cv2.line(o,(0,300),(700,300),(0,0,200),3); cv2.line(o,(0,300+H),(700,300+H),(0,0,200),3)
        d=100*(F/mF-1); cv2.putText(o,'%s %+.0f%%'%(f.split('_')[-1],d),(10,40),cv2.FONT_HERSHEY_SIMPLEX,1.3,(0,0,0),3)
        cols.append(o); print(f,'%+.1f%%'%d)
    cv2.imwrite(sys.argv[1],cv2.resize(np.hstack(cols),None,fx=0.4,fy=0.4),[cv2.IMWRITE_JPEG_QUALITY,88])
