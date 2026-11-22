# bm2.py dir key tag... : lean % (own disc) + disc-normalised sheet  -> dir/<key>-sheet.jpg
import sys,numpy as np
from PIL import Image, ImageDraw
exec(open('/tmp/claude-0/-home-user-cung-tuong-mong/dbcc44c5-817b-5b98-8e11-78465341463b/scratchpad/bm.py').read().split("d=sys.argv[1]")[0].replace("sys.path.insert","pass#"))
d,k=sys.argv[1:3]; tags=['A']+sys.argv[3:]; S=200; out=Image.new('RGB',(len(tags)*2*S,2*S),'white')
cA=circle(load(f'{d}/{k}-A.png'))
for c,t in enumerate(tags):
    a=load(f'{d}/{k}-{t}.png'); cx,cy,rad=circle(a); ar,ov=stats(a,(cx,cy,rad))
    print(f'{k} {t}: out={ar:.1f}% reach={ov:.1f}% rB/rA={rad/cA[2]:.2f} centre-shift={(cy-cA[1])/cA[2]:.2f}r')
    im=Image.open(f'{d}/{k}-{t}.png').convert('RGB').resize((512,512)); sc=S/(2*rad); im=im.resize((int(512*sc),int(512*sc)))
    tile=Image.new('RGB',(2*S,2*S),'white'); tile.paste(im,(int(S-cx*sc),int(S-cy*sc))); dr=ImageDraw.Draw(tile)
    dr.ellipse((S/2,S/2,1.5*S,1.5*S),outline=(0,0,255)); dr.text((6,6),f'{t} {ar:.0f}%',fill=(0,0,0))
    out.paste(tile,(c*2*S,0))
out.save(f'{d}/{k}-sheet.jpg',quality=80)
