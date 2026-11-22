# overlay.py <dir> <out.jpg> [suffix]: per seal 6 frames (out 0/mid/end, loop worst-r, loop mid, back mid) with the tracked disc circle drawn
import sys,os,numpy as np
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from disc import frames
from PIL import Image,ImageDraw
d,o=sys.argv[1],sys.argv[2]; K='vui lo an muu ghen buon so chan khochiu tinhtu binh dau hothen choang hon hanghai chuyentam hungkhoi gian tutin tinhnghich'.split()
T=96; W=288
sheet=Image.new('RGB',(T*12,T*11),(70,70,70)); dr=ImageDraw.Draw(sheet)
for n,k in enumerate(K):
    fo,fl,fb=[frames(f'{d}/{k}-{p}.webp') for p in ('out','loop','back')]; al=fo+fl+fb; D=np.load(f'{d}/{k}.disc.npy'); a,b=len(fo),len(fo)+len(fl)
    rr=D[a:b,2]; wl=a+int(np.argmax(np.abs(rr/np.median(rr)-1)))
    idx=[0,a//2,a-1,wl,(a+b)//2,(b+len(al))//2]
    for j,i in enumerate(idx):
        f=al[i]; H=f.shape[0]; im=Image.new('RGBA',(H,H),(110,110,110,255)); im.alpha_composite(Image.fromarray(f)); g=ImageDraw.Draw(im)
        cx,cy,r,_=D[i]; g.ellipse((cx-r,cy-r,cx+r,cy+r),outline=(0,255,255,255),width=2)
        x=(n%2)*6*T+j*T; y=(n//2)*T; sheet.paste(im.convert('RGB').resize((T,T)),(x,y))
        dr.text((x+2,y+2),f'{k[:6]} {i} {r/D[0,2]:.2f}',fill=(255,255,0))
sheet.save(o,quality=82)
