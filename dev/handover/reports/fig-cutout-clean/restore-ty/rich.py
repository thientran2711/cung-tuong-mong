import numpy as np,glob,csv,os
from PIL import Image,ImageFilter
rows=[]
for k in open('keys.txt').read().split():
    if '-ty' not in k: continue
    ty=int(k.split('-')[2][2:])
    if ty>3: continue
    im=Image.open(f'keep/fig-{k}.webp').convert('RGBA'); im.thumbnail((300,600))
    a=np.asarray(im)[...,3]>128; rgb=np.asarray(im.convert('RGB')).astype(float)
    hsv=np.asarray(im.convert('RGB').convert('HSV')).astype(float)
    body=a.copy(); body[:int(a.shape[0]*0.22)]=False   # skip head
    s=hsv[...,1][body].mean()/255
    g=np.asarray(im.convert('L').filter(ImageFilter.FIND_EDGES)).astype(float)[body].mean()
    lum=np.asarray(im.convert('L')).astype(float)[body]; sd=lum.std()
    rows.append((k,round(s,3),round(g,2),round(sd,1)))
w=csv.writer(open('rich.tsv','w'),delimiter='\t');w.writerow(['key','sat','edge','lumsd']);w.writerows(rows)
import statistics
for i,n in ((1,'sat'),(2,'edge'),(3,'lumsd')):
    v=sorted(r[i] for r in rows);print(n,[v[int(len(v)*q)] for q in (0,.1,.25,.5,.75,.9,.99)])
