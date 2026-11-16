# batch.py: owner size 8.5% batch. Usage: python3 batch.py SRC_DIR OUT_DIR [names...]  (names = file basenames; default all in SRC_DIR)
# Per image: haar face (fig = upscaled x FIGUP first), detect the mark box (hmeas.detect), measure ratio mark/face width;
# ratio > KEEP -> shrink.shrink() to TARGET; else untouched. Writes OUT_DIR/<name>.webp and a JSON line per image to stdout.
import sys,os,json,re,numpy as np,cv2
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from PIL import Image
from face import face
from hmeas import detect
from shrink import shrink
D=os.path.dirname(os.path.abspath(__file__))
REF=json.load(open(os.path.join(D,'ref.json')))
TARGET=0.085; KEEP=0.088; FIGUP=1.92
MAN=json.load(open(os.path.join(D,'manual_boxes.json'))) if os.path.exists(os.path.join(D,'manual_boxes.json')) else {}
def faceinfo(path,fig,pid):
    im=Image.open(path).convert('RGBA')
    if fig:
        im2=im.resize((int(im.width*FIGUP),int(im.height*FIGUP)),Image.LANCZOS); tmp='/dev/shm/_f%d.png'%os.getpid(); im2.save(tmp); p=tmp
    else: p=path
    cx,ey,fw,ed,rgb=face(p)
    rf=REF[pid][2]
    if abs(fw-rf)>0.1*rf: cx,ey=(cx,ey) if abs(fw-rf)<0.3*rf else (cx,ey); fw=rf
    return cx,ey,fw,rgb
def process(path,name):
    m=re.match(r'(fig|por)-((?:consort|maid)-[cm]\d\d)-t(\d)-a(\d+)',name); kind,pid,t,a=m.groups(); fig=kind=='fig'
    cx,ey,fw,rgb=faceinfo(path,fig,pid)
    r,wb,_=detect(rgb,cx,ey,fw)
    if r is None or r[0]/fw<0.05:
        r2,wb,_=detect(rgb,cx,ey,fw,TH=6,TL=12)
        if r2 and (r is None or r2[0]>r[0]) and r2[0]/fw<0.3: r=r2
    info=dict(name=name,cx=cx,ey=ey,fw=fw)
    if name in MAN: bx=MAN[name]; ratio=bx['ratio']; boxes=[tuple(b) for b in bx['boxes']]
    else:
        if r is None: info['status']='nomark'; return info,None
        hw,hh,x,y=r; ratio=hw/fw; g=0.03*fw
        boxes=[(int(x-g),int(y-g),int(x+hw+g),int(y+hh+g))]
    info['ratio']=round(ratio,4)
    if ratio<=KEEP: info['status']='keep'; return info,None
    S=FIGUP if fig else 1.0
    nb=[(int(b[0]/S),int(b[1]/S),int(b[2]/S)+1,int(b[3]/S)+1) for b in boxes]
    kw=dict(hl=55,hc=20) if False else {}
    im,r0,s,mark=shrink(path,nb[0] if len(nb)==1 else nb,fw/S,TARGET,cur=ratio,**kw)
    info['status']='shrunk'; info['scale']=round(float(s),3); info['box']=nb
    return info,im
if __name__=='__main__':
    src,out=sys.argv[1:3]; os.makedirs(out,exist_ok=True)
    names=sys.argv[3:] or sorted(os.listdir(src))
    for n in names:
        n=n[:-5] if n.endswith('.webp') else n
        try:
            info,im=process(os.path.join(src,n+'.webp'),n)
            if im is not None: im.save(os.path.join(out,n+'.webp'),'WEBP',quality=90,method=4)
        except Exception as e: info=dict(name=n,status='error',err=repr(e))
        print(json.dumps(info),flush=True)
