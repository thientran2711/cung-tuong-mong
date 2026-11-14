# spotpor.py fig.webp x,y[,r] ... : inpaint spots given in PORTRAIT (384x506) coords on the fig, then re-cut its portrait
import sys,os,subprocess,importlib.util
import numpy as np,cv2
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__))
spec=importlib.util.spec_from_file_location("pc",H+"/porcrop.py"); pc=importlib.util.module_from_spec(spec); spec.loader.exec_module(pc)
sys.path.insert(0,H); import afix
f=sys.argv[1]; im=Image.open(f).convert("RGBA")
cx,ey,fw,how=pc.find_face(im); fw=float(np.clip(fw,im.height*0.045,im.height*0.20))
Wc=fw/pc.FACE_W; Hc=Wc*pc.H_OUT/pc.W_OUT; x0=cx-Wc/2; y0=ey-pc.EYE_Y*Hc; s=Wc/pc.W_OUT
A=np.array(im); rgb=np.ascontiguousarray(A[...,:3]); m=np.zeros(rgb.shape[:2],np.uint8)
for a in sys.argv[2:]:
    p=[float(v) for v in a.split(",")]; r=p[2] if len(p)>2 else 6
    X,Y=x0+p[0]*s,y0+p[1]*s; cv2.circle(m,(int(round(X)),int(round(Y))),max(1,int(round(r*s+0.5))),255,-1)
A[...,:3]=cv2.inpaint(rgb,m,5,cv2.INPAINT_TELEA)
afix.save_webp(Image.fromarray(A),f)
subprocess.run(["python3",H+"/porcrop.py",f],check=True,capture_output=True); print("fixed",os.path.basename(f),"scale",round(s,3))
