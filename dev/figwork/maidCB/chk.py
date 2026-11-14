# chk.py OUT tier m.. : grid of sheets (2 cols)
import sys
from PIL import Image
o,t=sys.argv[1],sys.argv[2]; ims=[Image.open(f'sheets/C_m{n}_{t}.jpg') for n in sys.argv[3:]]
w=ims[0].width*45//100;h=ims[0].height*45//100; r=(len(ims)+1)//2
S=Image.new('RGB',(w*2,h*r),'white')
for k,im in enumerate(ims): S.paste(im.resize((w,h)),((k%2)*w,(k//2)*h))
S.save(o,quality=80)
