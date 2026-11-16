#!/usr/bin/env python3
# unmix.py LO HI SA SB outdir [keys]  (dùng ở no-moles: 0.03 0.4 3 12) — sau rematte: crops/<k>.png (cắt 1 người từ lineup gốc) + bg/<k>.png (Magnific remove-background của crop đó).
# Gỡ màu nền giấy khỏi điểm bán trong suốt (F=(C-(1-a)B)/a, B = nền cục bộ), bỏ nền nhìn xuyên qua, kéo alpha voan mỏng lên gần đặc, vá lỗ nhỏ, bỏ hạt rời; ra fig 900px. Đường dẫn D/W trong tệp trỏ vào scratchpad: sửa trước khi dùng.
import sys,os,glob
sys.path.insert(0,'/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad/nmfix/dev/figwork')
import rematte, numpy as np, cv2
from PIL import Image
D='/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad/nmf'
W='/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad/nmfix/img'
LO=float(sys.argv[1]); HI=float(sys.argv[2]); SA=float(sys.argv[3]); SB=float(sys.argv[4]); OD=D+"/"+sys.argv[5]; only=sys.argv[6:]
os.makedirs(OD,exist_ok=True)
def ss(x,a,b): t=np.clip((x-a)/(b-a),0,1); return t*t*(3-2*t)
for p in sorted(glob.glob(D+'/bg/*.png')):
    k=os.path.basename(p)[:-4]
    if only and k not in only: continue
    ident,age=k.split('-')
    name={'c':f'fig-consort-{ident}-t4-{age}','u':f'fig-eunuch-{ident}-{age}','h':f'fig-thaihau-{ident}-{age}'}[ident[0]]
    C=np.asarray(Image.open(f'{D}/crops/{k}.png').convert('RGB')).astype(np.float32)
    a=np.asarray(Image.open(p).convert('RGBA'))[...,3].astype(np.float32)/255
    h,w=a.shape; f=8
    m=(a<0.02).astype(np.float32)
    Cs=cv2.resize(C*m[...,None],(w//f,h//f),interpolation=cv2.INTER_AREA); ms=cv2.resize(m,(w//f,h//f),interpolation=cv2.INTER_AREA)
    num=cv2.GaussianBlur(Cs,(0,0),8); den=cv2.GaussianBlur(ms,(0,0),8)
    Bs=num/np.maximum(den[...,None],1e-4); Bs[den<1e-3]=(230,212,195)
    B=cv2.resize(Bs,(w,h),interpolation=cv2.INTER_LINEAR)
    dist=np.linalg.norm(C-B,axis=-1)
    semi=a<0.97
    a1=a.copy(); a1[semi]*=ss(dist[semi],SA,SB)       # backdrop seen through -> transparent
    al=np.clip(a1,1e-3,1)[...,None]
    F=np.clip((C-(1-al)*B)/al,0,255)
    Fm=cv2.medianBlur(F.astype(np.uint8),5).astype(np.float32)
    sel=(a1<0.5)[...,None]; F=np.where(sel,Fm,F)
    a2=np.clip((a1-LO)/(HI-LO),0,1)
    from scipy import ndimage as ndi
    solid=a2>0.3; holes=ndi.binary_fill_holes(solid)&~solid
    lab,n=ndi.label(holes)
    if n:
        sz=ndi.sum(holes,lab,range(1,n+1)); small=np.isin(lab,[i+1 for i in range(n) if sz[i]<1500])
        Fi=cv2.inpaint(F.astype(np.uint8),small.astype(np.uint8),5,cv2.INPAINT_TELEA).astype(np.float32)
        F=np.where((small&(a2<0.5))[...,None],Fi,F); a2=np.where(small,np.maximum(a2,ndi.maximum_filter(a2*solid,9)),a2)
    out=np.dstack([F,a2*255]).astype(np.uint8)
    cut=rematte.clean(Image.fromarray(out,'RGBA'))
    old=Image.open(f'{W}/{name}.webp')
    bb=cut.split()[3].point(lambda x:255 if x>12 else 0).getbbox(); cut=cut.crop(bb)
    ww,hh=cut.size; fig=cut.resize((max(1,round(ww*old.height/hh)),old.height),Image.LANCZOS)
    A=np.array(fig); m=(A[...,3]>12).astype(np.uint8)
    n,lab,st,_=cv2.connectedComponentsWithStats(m,8)
    for i in range(1,n):
        if st[i,4]<80: A[...,3][lab==i]=0
    fig=Image.fromarray(A)
    rematte.save_webp(fig,f'{OD}/{name}.webp',250)
