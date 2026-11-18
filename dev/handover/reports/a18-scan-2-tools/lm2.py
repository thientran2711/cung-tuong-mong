import os,json,numpy as np
import mediapipe as mp
from mediapipe.tasks import python as mpp
from mediapipe.tasks.python import vision
from PIL import Image
LM=vision.FaceLandmarker.create_from_options(vision.FaceLandmarkerOptions(base_options=mpp.BaseOptions(model_asset_path='face_landmarker.task'),num_faces=1,min_face_detection_confidence=.1,min_face_presence_confidence=.1))
out={}
for f in sorted(os.listdir('all')):
    im=Image.open('all/'+f).convert('RGBA')
    bg=Image.new('RGBA',im.size,(235,228,215,255)); bg.alpha_composite(im); im=bg.convert('RGB')
    a=np.array(im)
    # find figure bbox top via alpha
    al=np.array(Image.open('all/'+f).split()[-1]); ys=np.where(al.max(1)>20)[0]; top=ys[0]
    crop=im.crop((0,max(0,top-20),1024,min(2304,top+900)))
    crop.save('top/'+f[:-4]+'.jpg',quality=92)
    r=LM.detect(mp.Image(image_format=mp.ImageFormat.SRGB,data=np.array(crop)))
    if not r.face_landmarks: out[f]=None; continue
    L=r.face_landmarks[0]; W,H=crop.size
    P=lambda i:(L[i].x*W,L[i].y*H)
    F=np.hypot(*(np.array(P(10))-np.array(P(152))))
    gap=np.hypot(*(np.array(P(13))-np.array(P(14))))/F
    xs=[p.x*W for p in L]; yy=[p.y*H for p in L]
    out[f]=dict(gap=float(gap),F=float(F),box=[min(xs),min(yy),max(xs),max(yy)],mouth=[P(61),P(291),P(13),P(14)])
json.dump(out,open('lm.json','w'))
print(sum(v is None for v in out.values()),'missing of',len(out))
g=sorted((round(v['gap'],3),k[:-4]) for k,v in out.items() if v)
print(g[-40:])
