import sys,cv2,numpy as np
from PIL import Image
cc=cv2.CascadeClassifier(cv2.data.haarcascades+"haarcascade_frontalface_default.xml")
for f in sys.argv[1:]:
    try: im=Image.open(f).convert('RGBA')
    except Exception: continue
    b=Image.new('RGBA',im.size,(200,200,200,255)); b.alpha_composite(im); g=cv2.cvtColor(np.asarray(b.convert('RGB')),cv2.COLOR_RGB2GRAY)
    r=cc.detectMultiScale(g,1.1,5,minSize=(36,36))
    if len(r): print(f,im.size[0],im.size[1],max(w for x,y,w,h in r),len(r))
