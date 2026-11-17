from PIL import Image
import numpy as np
# (grid file, cols, rows, [(cell 1-based, key, NN)])
M=[('hd-mai-flowers',4,3,[(i,'hd-mai',i) for i in range(1,11)]),
   ('hd-mai',3,2,[(1,'hd-mai',12),(2,'hd-mai',16),(3,'hd-mai',19)]),
   ('hd-dao',3,2,[(1,'hd-dao',14),(2,'hd-dao',18)]),
   ('hoadien-bac',3,2,[(1,'hoadien-bac',16)]),
   ('hd-diep',3,2,[(2,'hd-diep',15),(3,'hd-diep',18)]),
   ('hd-lan',3,2,[(1,'hd-lan',14),(2,'hd-lan',18),(3,'hd-lan',20)]),
   ('hd-sen',3,2,[(1,'hd-sen',13),(2,'hd-sen',16),(3,'hd-sen',17),(5,'hd-sen',19)]),
   ('hd-maudon',3,2,[(1,'hd-maudon',16),(2,'hd-maudon',19),(3,'hd-maudon',20)]),
   ('hd-phuong',3,2,[(1,'hd-phuong',14),(2,'hd-phuong',17),(3,'hd-phuong',18)])]
def trim(im):
    a=np.asarray(im)[...,3].copy(); a[a<10]=0; im.putalpha(Image.fromarray(a)); return im.crop(im.getbbox())
def save(t,k,i):
    w,h=t.size; s=192/max(w,h); sp=t.resize((max(1,round(w*s)),max(1,round(h*s))),Image.LANCZOS)
    sp.save(f'outR/hd-{k}-{i:02d}.webp','WEBP',quality=92,method=6)
    m=int(256*0.12); s2=(256-2*m)/max(w,h); ic=t.resize((round(w*s2),round(h*s2)),Image.LANCZOS)
    c=Image.new('RGBA',(256,256),(0,0,0,0)); c.paste(ic,((256-ic.width)//2,(256-ic.height)//2),ic)
    c.save(f'outR/wd-{k}-{i:02d}.webp','WEBP',quality=92,method=6)
out=[]
for g,C,R,L in M:
    im=Image.open(f'gc3/{g}.png').convert('RGBA');W,H=im.size
    for cell,k,n in L:
        r,c=divmod(cell-1,C); save(trim(im.crop((c*W//C,r*H//R,(c+1)*W//C,(r+1)*H//R))),k,n); out.append(f'hd-{k}-{n:02d}')
S=Image.new('RGB',(len(out)*100,200))
for i,f in enumerate(out):
    sp=Image.open(f'outR/{f}.webp').convert('RGBA');sp.thumbnail((92,92))
    for j,bg in enumerate([(250,238,228),(40,30,30)]):
        B=Image.new('RGBA',(100,100),bg+(255,));B.alpha_composite(sp,((100-sp.width)//2,(100-sp.height)//2));S.paste(B.convert('RGB'),(i*100,j*100))
S.save('csR.png');print(len(out))
