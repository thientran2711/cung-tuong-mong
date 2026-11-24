import sys
from PIL import Image
src=sys.argv[1]
import os;os.makedirs(src+'_c',exist_ok=True)
for o in 'ABC':
  for s in ['idle','turned','alert','open']:
    f=Image.open(f'{src}/{o}-fold-{s}.png');i=Image.open(f'{src}/{o}-ipad-{s}.png')
    H=1000;f2=f.resize((int(f.width*H/f.height),H));i2=i.resize((int(i.width*H/ i.height),H)) if False else i.resize((int(i.width*0.5),int(i.height*0.5)))
    # fold at 1x (755x1000), ipad at 1x (1180x820) side by side
    f1=f.resize((755,1000));i1=i.resize((1180,820))
    W=Image.new('RGB',(755+1180+30,1000),(30,24,20));W.paste(f1,(0,0));W.paste(i1,(785,90))
    W.save(f'{src}_c/{o}-{s}.png')
