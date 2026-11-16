import sys,json,math,os
sys.path.insert(0,'/home/user/wt/artc/dev/figwork/artcomplete/.cache/pylib')
import cv2,numpy as np
cv2.setNumThreads(1)
from PIL import Image
D=cv2.data.haarcascades
FC=[cv2.CascadeClassifier(D+'haarcascade_frontalface_alt2.xml'),cv2.CascadeClassifier(D+'haarcascade_frontalface_default.xml'),cv2.CascadeClassifier(D+'haarcascade_profileface.xml')]
EC=cv2.CascadeClassifier(D+'haarcascade_eye.xml')
def load(path):
    im=Image.open(path).convert('RGBA');bg=Image.new('RGBA',im.size,(235,220,205,255));bg.alpha_composite(im);return bg.convert('RGB')
def detect(im,fig):
    W,H=im.size
    # fig: head region = top part
    if fig: y1=int(H*.22);crop=im.crop((0,0,W,y1));s=2.5
    else: crop=im;s=1.0
    a=np.asarray(crop.resize((int(crop.width*s),int(crop.height*s)),Image.LANCZOS));g=cv2.cvtColor(a,cv2.COLOR_RGB2GRAY)
    best=None
    for c in FC[:2]:
        r=c.detectMultiScale(g,1.1,4,minSize=((80,80) if not fig else (int(.12*W*s),)*2),maxSize=((300,300) if not fig else (int(.55*W*s),)*2))
        for (x,y,w,h) in r:
            if best is None or w>best[2]: best=(x,y,w,h)
        if best is not None:break
    if best is None:return None
    x,y,w,h=[v/s for v in best];return (x/W,y/H,w/W,h/H)
if __name__=="__main__":
    v=json.load(open('veil.json'));res={}
    for f in open('cal.txt').read().split():
        im=load('cal/'+f);res[f]=detect(im,f.startswith('fig-'))
    json.dump(res,open('cal_det.json','w'))
    for k in('por','fig'):
        L=[f for f in res if f.startswith(k+'-')];print(k,len(L),sum(res[f] is not None for f in L))
