# cutgrid.py RAW COLS ROWS OUTDIR NAME1,NAME2,... (use "-" to skip a cell)
# 1) background: flood-fill the plain parchment from the borders (+ big enclosed parchment blobs) -> transparent, soft rim, decontaminated edges;
#    SHADOW=1 (hairpins): warm cast shadows of the parchment (uniform darkening, same tint) connected to the background are removed too.
# 2) objects: connected parts (dilated so tassels/pearl strands stay with their pin) are assigned to the grid cell holding their centre,
#    so an item that crosses an equal-grid line is still cut whole. Saves OUTDIR/<name>.webp (256) and OUTDIR/wd512/<name>.webp (512).
import sys,os,numpy as np
from PIL import Image,ImageFilter
from scipy import ndimage
raw,C,R,out,names=sys.argv[1],int(sys.argv[2]),int(sys.argv[3]),sys.argv[4],sys.argv[5].split(",")
T1=float(os.environ.get("T1",16));T2=float(os.environ.get("T2",42));EN=float(os.environ.get("EN",11));MINA=int(os.environ.get("MINA",2500))
SH=os.environ.get("SHADOW")=="1";GAP=int(os.environ.get("GAP",18))
os.makedirs(out+"/wd512",exist_ok=True)
IM=Image.open(raw)
if IM.mode=="RGBA" and np.asarray(IM)[:,:,3].min()==0:
  # already cut out (Magnific remove-background): use its alpha, skip the parchment flood
  rgba=np.asarray(IM).copy();H,W,_=rgba.shape;alpha=rgba[:,:,3].astype(np.float32)/255;bgc=np.zeros(3)
else:
 IM=None
if IM is None:
 a=np.asarray(Image.open(raw).convert("RGB")).astype(np.float32);H,W,_=a.shape
 band=np.concatenate([a[:8].reshape(-1,3),a[-8:].reshape(-1,3),a[:,:8].reshape(-1,3),a[:,-8:].reshape(-1,3)])
 bgc=np.median(band,0)
 # local background (handles vignette/gradient): heavy blur of the image with objects masked by the global estimate
 d0=np.abs(a-bgc).max(2)
 small=Image.fromarray(np.clip(a,0,255).astype(np.uint8)).resize((W//16,H//16),Image.BILINEAR)
 sm=np.asarray(small).astype(np.float32);ms=np.asarray(Image.fromarray((d0<T1+14).astype(np.uint8)*255).resize((W//16,H//16),Image.BILINEAR)).astype(np.float32)/255
 num=ndimage.gaussian_filter(sm*ms[...,None],(6,6,0));den=ndimage.gaussian_filter(ms,6)[...,None]+1e-3
 loc=num/den;loc=np.where(den>0.05,loc,bgc)
 locf=np.asarray(Image.fromarray(np.clip(loc,0,255).astype(np.uint8)).resize((W,H),Image.BILINEAR)).astype(np.float32)
 d=np.abs(a-locf).max(2)
 cand=d<T1+10
 if SH:
   rat=a/np.maximum(locf,1);spread=rat.max(2)-rat.min(2);mr=rat.mean(2)
   cand|=(spread<0.09)&(mr>0.5)&(mr<0.985)&(rat[...,2]<=rat[...,0]+0.01)
 lab,_=ndimage.label(cand);border=np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]]));border=border[border>0]
 bg=np.isin(lab,border)
 lt,nt=ndimage.label(d<EN)
 if nt:
   sz=np.bincount(lt.ravel());big=np.where(sz>=MINA)[0];big=big[big>0];bg|=np.isin(lt,big)
 rim=ndimage.binary_dilation(bg,iterations=2)&~bg
 alpha=np.where(bg,0.0,1.0).astype(np.float32)
 alpha[rim]=np.clip((d[rim]-T1)/(T2-T1),0,1)
 alpha=np.asarray(Image.fromarray((alpha*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8))).astype(np.float32)/255
 alpha=np.where(bg,0,alpha)
 rgb=a.copy();m=(alpha>0.05)&(alpha<0.99)
 al=alpha[m][:,None];rgb[m]=np.clip((a[m]-locf[m]*(1-al))/al,0,255)
 rgba=np.dstack([rgb,alpha*255]).astype(np.uint8)
mk=alpha>0.12
# group parts: dilate (downsampled for speed), label, assign each group to the cell of its centre
f=4;mks=np.asarray(Image.fromarray(mk.astype(np.uint8)*255).resize((W//f,H//f),Image.BOX))>20
grp,ng=ndimage.label(ndimage.binary_dilation(mks,iterations=max(1,GAP//f)))
sz=np.bincount(grp.ravel());sz[0]=0
keep=[i for i in range(1,ng+1) if sz[i]>=sz.max()*0.004]
cells={}
for i in keep:
  ys,xs=np.where(grp==i);cy,cx=ys.mean()*f,xs.mean()*f
  ci=int(cx//(W/C));ri=int(cy//(H/R));cells.setdefault(ri*C+ci,[]).append(i)
grpF=np.asarray(Image.fromarray(grp.astype(np.int32)).resize((W,H),Image.NEAREST))
for idx,n in enumerate(names):
  if n=="-":continue
  G=cells.get(idx)
  if not G:print("WARN empty cell:",n);continue
  sel=np.isin(grpF,G)&mk
  ys,xs=np.where(sel);y0,y1,x0,x1=ys.min(),ys.max()+1,xs.min(),xs.max()+1
  crop=rgba[y0:y1,x0:x1].copy();crop[:,:,3]=np.where(np.isin(grpF[y0:y1,x0:x1],G),crop[:,:,3],0)
  im=Image.fromarray(crop);s=max(im.size);pad=int(s*0.04);S=s+2*pad
  sq=Image.new("RGBA",(S,S),(0,0,0,0));sq.paste(im,((S-im.width)//2,(S-im.height)//2))
  sq.resize((512,512),Image.LANCZOS).save(f"{out}/wd512/{n}.webp","WEBP",quality=90,method=6)
  sq.resize((256,256),Image.LANCZOS).save(f"{out}/{n}.webp","WEBP",quality=88,method=6)
extra=[k for k in cells if k>=len(names)]
if extra:print("WARN objects outside named cells:",extra)
print("bg",bgc.round(),"groups",len(keep))
