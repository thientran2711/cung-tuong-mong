"""skin-light: face-skin median Lab of the CURRENT CDN figures (the skin-match audit is stale for files re-edited later).
Face box = skin-match fbox (half-size coords, x2), inner 70 %; pixels opaque + skin-coloured (no hair/eyes/lips/brows).
usage: python3 measure.py <all.jsonl> <dir with fig-*.webp> <out.jsonl> [files...]"""
import sys,json,os;sys.path.insert(0,os.path.dirname(__file__));from labmath import rgb2lab;import numpy as np;from PIL import Image
FB={};[FB.__setitem__(r['f'],r.get('fbox')) for r in map(json.loads,open(sys.argv[1]))]
out=open(sys.argv[3],'a')
for f in sys.argv[4:]:
    b=os.path.basename(f);fb=FB.get(b)
    try:im=np.asarray(Image.open(f).convert('RGBA')).astype(float)/255
    except Exception as e:print('ERR',b,e);continue
    H,W=im.shape[:2]
    if not fb:continue
    x0,y0,x1,y1=[v*2 for v in fb];dx,dy=(x1-x0)*.15,(y1-y0)*.15
    c=im[int(y0+dy):int(y1-dy),int(x0+dx):int(x1-dx)].reshape(-1,4)
    c=c[c[:,3]>.95];lab=rgb2lab(c[:,:3]);m=(lab[:,0]>60)&(lab[:,1]>2)&(lab[:,1]<20)&(lab[:,2]>3)&(lab[:,2]<30)
    if m.sum()<80:continue
    L,a,bb=np.median(lab[m],0);out.write(json.dumps({'f':b,'n':int(m.sum()),'L':round(L,2),'a':round(a,2),'b':round(bb,2)})+'\n')
