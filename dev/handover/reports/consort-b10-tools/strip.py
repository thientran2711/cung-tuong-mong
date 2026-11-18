import sys
from PIL import Image
d,out=sys.argv[1],sys.argv[2];ts=[int(x) for x in sys.argv[3].split(',')]
cols=[]
for v in (0,1,2):
    r=[]
    for t in ts:
        im=Image.open(f'{d}/v{v}_t{t}.png').convert('RGBA');h=560;im=im.resize((int(im.width*h/im.height),h));b=Image.new('RGB',im.size,(235,225,205));b.paste(im,(0,0),im);r.append(b)
    cols.append(r)
rows=[]
for r in cols:
    S=Image.new('RGB',(sum(x.width for x in r),560));x=0
    for i in r:S.paste(i,(x,0));x+=i.width
    rows.append(S)
W=max(s.width for s in rows);T=Image.new('RGB',(W,560*3),(235,225,205))
for i,s in enumerate(rows):T.paste(s,(0,560*i))
T.resize((1400,int(T.height*1400/T.width))).save(out,quality=85)
