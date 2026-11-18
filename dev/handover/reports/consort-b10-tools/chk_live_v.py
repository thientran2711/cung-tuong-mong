import sys
from PIL import Image
ks=[int(x) for x in sys.argv[2].split(',')];d=sys.argv[1];h=760;cols=[]
for k in ks:
    cols.append(Image.open(f'{d}/live/t{k}.webp').convert('RGBA'))
    for v in range(3): cols.append(Image.open(f'{d}/v/v{v}_t{k}.png').convert('RGBA'))
rs=[i.resize((int(i.width*h/i.height),h)) for i in cols];W=sum(r.width for r in rs)
s=Image.new('RGB',(W,h),(235,225,205));x=0
for r in rs: s.paste(r,(x,0),r);x+=r.width
s.save(sys.argv[3],quality=85);print(s.size)
