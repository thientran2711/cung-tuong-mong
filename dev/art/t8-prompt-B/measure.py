import sys,json,io,urllib.request,colorsys
import numpy as np
from PIL import Image
B="https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers"
def name(rgb):
    h,s,v=colorsys.rgb_to_hsv(*[x/255 for x in rgb]); h*=360
    if s<0.12: return "ivory white" if v>0.85 else "silver grey"
    if v<0.35: return "dark "+("maroon" if h<20 or h>340 else "teal" if 150<h<200 else "indigo")
    tone=("deep " if v<0.6 else "")
    for lo,hi,n in [(0,12,"red"),(12,30,"vermilion-orange"),(30,50,"amber"),(50,70,"yellow-olive"),(70,160,"green"),(160,195,"teal"),(195,250,"blue"),(250,290,"violet"),(290,330,"magenta-pink"),(330,361,"rose red")]:
        if lo<=h<hi:
            if s<0.45 and n in("red","rose red","vermilion-orange"): n={"red":"dusty red","rose red":"rose pink","vermilion-orange":"peach"}[n]
            return tone+n
def measure(c,t):
    u=f"{B}/{c}/b10/{c}_a18_t{t}_v0.png"
    im=Image.open(io.BytesIO(urllib.request.urlopen(urllib.request.Request(u,headers={"User-Agent":"curl/8"}),timeout=120).read())).convert('RGBA')
    im.thumbnail((256,576)); a=np.array(im).astype(float); H=a.shape[0]
    a=a[int(H*0.32):int(H*0.93)]; m=a[...,3]>200; p=a[...,:3][m]
    hsv=np.array([colorsys.rgb_to_hsv(*(q/255)) for q in p])
    gold=(hsv[:,0]>0.08)&(hsv[:,0]<0.17)&(hsv[:,1]>0.33)&(hsv[:,2]>0.6)
    skin=(hsv[:,0]>0.025)&(hsv[:,0]<0.14)&(hsv[:,1]<0.55)&(hsv[:,2]>0.62)
    p=p[~(gold|skin)]
    # kmeans
    rng=np.random.default_rng(1); cen=p[rng.choice(len(p),6,replace=False)]
    for _ in range(25):
        d=((p[:,None]-cen[None])**2).sum(2); l=d.argmin(1)
        for k in range(6):
            if (l==k).any(): cen[k]=np.median(p[l==k],axis=0)
    cnt=np.bincount(l,minlength=6); o=cnt.argsort()[::-1]
    out=[]
    for k in o:
        hx='#%02X%02X%02X'%tuple(int(x) for x in cen[k]); n=name(cen[k])
        if not out or colorsys.rgb_to_hsv(*(cen[k]/255))[0]*360-0>=0 and all(sum(abs(cen[k]-cen[j]))>60 for j in [o[i] for i in range(len(out))]): out.append((hx,n,int(cnt[k])))
        if len(out)==2: break
    return out
if __name__=="__main__":
    t=sys.argv[1]; res={}
    for n in range(1,33):
        c='c%02d'%n
        try: res[c]=measure(c,t); print(c,res[c],flush=True)
        except Exception as e: print(c,'ERR',e,flush=True)
    json.dump(res,open(f'old_t{t}_colours.json','w'))
