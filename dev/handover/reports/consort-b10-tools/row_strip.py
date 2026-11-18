import sys
from PIL import Image
d,out=sys.argv[1:3];names=sys.argv[3:]
ims=[Image.open(f'{d}/{n}.png').convert('RGBA') for n in names]
h=500;rs=[i.resize((int(i.width*h/i.height),h)) for i in ims];W=sum(r.width for r in rs)
s=Image.new('RGB',(W,h),(235,225,205));x=0
for r in rs:s.paste(r,(x,0),r);x+=r.width
s=s.resize((1400,int(h*1400/W)));s.save(out,quality=85)
