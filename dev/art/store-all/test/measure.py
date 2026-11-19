import sys,os,json,colorsys
import numpy as np
from PIL import Image
L=sys.argv[1]
NAMES=[(0,12,"crimson red"),(12,28,"coral"),(28,42,"apricot"),(42,70,"gold"),(70,95,"willow green"),(95,150,"jade green"),(150,185,"teal"),(185,215,"sky blue"),(215,245,"sapphire blue"),(245,275,"violet"),(275,305,"orchid purple"),(305,335,"rose pink"),(335,361,"rose red")]
def name(h):
    for a,b,n in NAMES:
        if a<=h<b: return n
res={}
for f in sorted(os.listdir(L)):
    if not f.endswith(".webp"): continue
    im=np.asarray(Image.open(os.path.join(L,f)).convert("RGBA")).astype(float)/255
    a=im[...,3]>0.5; ys,xs=np.where(a)
    if len(ys)==0: continue
    y0,y1=ys.min(),ys.max(); h=y1-y0
    reg=im[y0+int(.28*h):y0+int(.95*h)]; m=reg[...,3]>0.5; px=reg[m][:,:3]
    px=px[::7]
    hsv=np.array([colorsys.rgb_to_hsv(*p) for p in px])
    ok=(hsv[:,1]>0.16)&(hsv[:,2]>0.3)&(hsv[:,2]<0.98)
    H=hsv[ok,0]*360; P=px[ok]
    bins=np.histogram(H,bins=24,range=(0,360))[0]
    order=np.argsort(-bins); main=order[0]
    def dist(i,j): d=abs(i-j)*15; return min(d,360-d)
    sec=None
    for i in order[1:]:
        hc=i*15+7.5
        if dist(i,main)>=45 and bins[i]>=0.06*ok.sum() and not (42<=hc<70):
            sec=i; break
    out={"main_hue":main*15+7.5,"main":name(main*15+7.5),"chroma_px":int(ok.sum())}
    if sec is not None:
        sel=(H>=sec*15)&(H<sec*15+15); c=np.median(P[sel],axis=0)
        out.update(sec=name(sec*15+7.5),sec_hex="#%02X%02X%02X"%tuple(int(v*255) for v in c),share=round(bins[sec]/ok.sum(),2))
    res[f[:-5]]=out
json.dump(res,open(sys.argv[2],"w"),indent=0); 
for k,v in res.items(): print(k,v.get("main"),"|",v.get("sec","-"),v.get("sec_hex",""),v.get("share",""))
