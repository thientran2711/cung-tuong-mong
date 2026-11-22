import sys,numpy as np
from PIL import Image, ImageDraw
sys.path.insert(0,'/tmp/claude-0/-home-user-cung-tuong-mong/dbcc44c5-817b-5b98-8e11-78465341463b/scratchpad')
exec(open('/tmp/claude-0/-home-user-cung-tuong-mong/dbcc44c5-817b-5b98-8e11-78465341463b/scratchpad/bm.py').read().split("d=sys.argv[1]")[0].replace("sys.path.insert","pass#"))
from hough import hcircle
def L(p): 
    a=load(p); return np.array(Image.fromarray(a).resize((256,256),Image.LANCZOS))
d,k=sys.argv[1:3]; tags=sys.argv[3:]; A=L(f'{d}/{k}-A.png'); cA=circle(A)
out=Image.new('RGB',(len(tags)*300,300),'white')
for c,t in enumerate(tags):
    B=L(f'{d}/{k}-{t}.png'); cB=hcircle(B,cA[2]); ar,ov=stats(B,cB)
    print(f'{k} {t}: out={ar:.1f}% reach={ov:.1f}% rB/rA={cB[2]/cA[2]:.2f}')
    im=Image.fromarray(B[...,:3]); dr=ImageDraw.Draw(im); cx,cy,r=cB; dr.ellipse((cx-r,cy-r,cx+r,cy+r),outline=(0,0,255),width=2); dr.text((4,4),f'{k} {t} {ar:.0f}%',fill=(0,0,0))
    out.paste(im,(c*300,20))
out.save(f'{d}/{k}-h.jpg',quality=80)
