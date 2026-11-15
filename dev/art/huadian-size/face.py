# face.py: haar face/eyes on a portrait (384x506). returns cx, eye_y, face_w(haar box), eye_dist or None
import numpy as np, cv2
from PIL import Image
d=cv2.data.haarcascades
F1=cv2.CascadeClassifier(d+"haarcascade_frontalface_alt2.xml"); F2=cv2.CascadeClassifier(d+"haarcascade_frontalface_default.xml")
EYE=cv2.CascadeClassifier(d+"haarcascade_eye.xml")
BG=(236,231,224)
def comp(im):
    b=Image.new("RGBA",im.size,BG+(255,)); b.alpha_composite(im.convert("RGBA")); return np.asarray(b.convert("RGB"))
def face(path):
    rgb=comp(Image.open(path)); h,w=rgb.shape[:2]
    g=cv2.equalizeHist(cv2.cvtColor(rgb[:int(h*.7)],cv2.COLOR_RGB2GRAY))
    S=2; g2=cv2.resize(g,None,fx=S,fy=S,interpolation=cv2.INTER_CUBIC)
    best=None
    for det in (F1,F2):
        r=det.detectMultiScale(g2,scaleFactor=1.05,minNeighbors=4,minSize=(160,160))
        for x,y,fw,fh in r:
            sc=fw/S-0.8*abs((x+fw/2)/S-w/2)-0.5*abs((y+fh*.45)/S-0.40*h)
            if best is None or sc>best[0]: best=(sc,x/S,y/S,fw/S,fh/S)
        if best: break
    if not best: return w/2,0.40*h,0.36*w,None,rgb
    _,x,y,fw,fh=best
    roi=g2[int(y*S):int((y+fh*.6)*S),int(x*S):int((x+fw)*S)]
    es=[e for e in EYE.detectMultiScale(roi,1.05,5,minSize=(int(fw*S/8),)*2) if e[2]<fw*S*.45]
    ed=None; ey=y+fh*.45
    if len(es)>=2:
        es=sorted(es,key=lambda e:-e[2])[:2]
        ey=y+np.mean([e[1]+e[3]/2 for e in es])/S
        ed=abs((es[0][0]+es[0][2]/2)-(es[1][0]+es[1][2]/2))/S
    return x+fw/2,ey,fw,ed,rgb
