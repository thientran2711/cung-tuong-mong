# setup: pip install --target <dir> mediapipe; apt-get install libegl1 libgles2; model face_landmarker.task (storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/) one dir above this script
# then: facelm_pack.py img/face-lm.json lm-por.json lm-fig.json ; facelm_check.py for a plausibility sheet
# face landmarks for painted portraits / figure heads (mediapipe FaceLandmarker, 478 pts)
# usage: lm.py <img dir> <out.json> [glob]  -> {file: [[x%,y%],...] subset} ; prints success rate
import sys,glob,os,json
import numpy as np
from PIL import Image
import mediapipe as mp
from mediapipe.tasks import python as mpt
from mediapipe.tasks.python import vision
D,out=sys.argv[1],sys.argv[2];pat=sys.argv[3] if len(sys.argv)>3 else 'por-*.webp'
opt=vision.FaceLandmarkerOptions(base_options=mpt.BaseOptions(model_asset_path=os.path.join(os.path.dirname(__file__),'..','face_landmarker.task')),num_faces=1,min_face_detection_confidence=.2,min_face_presence_confidence=.2)
det=vision.FaceLandmarker.create_from_options(opt)
# subset we keep (mediapipe mesh ids): mouth corners, lips, brows, eyelids, eye corners, nose tip, chin, face sides
KEEP={'mL':61,'mR':291,'uL':0,'lL':17,'uIn':13,'lIn':14,'mUL':40,'mUR':270,'mLL':91,'mLR':321,
 'bLi':55,'bLm':105,'bLo':70,'bRi':285,'bRm':334,'bRo':300,
 'eLo':33,'eLi':133,'eLt':159,'eLb':145,'eRo':263,'eRi':362,'eRt':386,'eRb':374,
 'nose':1,'chin':152,'fL':234,'fR':454,'fh':10}
files=sorted(glob.glob(os.path.join(D,pat)));res={};bad=[]
def run(im):
  r=det.detect(mp.Image(image_format=mp.ImageFormat.SRGB,data=np.ascontiguousarray(im)))
  return r.face_landmarks[0] if r.face_landmarks else None
for f in files:
  img=Image.open(f).convert('RGB');W,H=img.size;n=os.path.basename(f)
  # figures: the head is small; detect on an upscaled crop of the top part
  if n.startswith('fig-'):
    cy=int(H*.26);crop=img.crop((0,0,W,cy));s=3;c=crop.resize((W*s,cy*s),Image.LANCZOS);L=run(np.asarray(c))
    pts=None if L is None else {k:[round(L[i].x*100,2),round(L[i].y*cy/H*100,2)] for k,i in KEEP.items()}
  else:
    L=run(np.asarray(img.resize((W*2,H*2),Image.LANCZOS)))
    pts=None if L is None else {k:[round(L[i].x*100,2),round(L[i].y*100,2)] for k,i in KEEP.items()}
  if pts:res[n]=pts
  else:bad.append(n)
json.dump(res,open(out,'w'),separators=(',',':'))
print(len(files),'ok',len(res),'fail',len(bad),bad[:20])
