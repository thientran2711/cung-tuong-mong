# kit-size7-compose.py — before/after sheet: rows = (BEFORE, AFTER) per picture, cols = S M L XL. usage: kit-size7-compose.py <dir> <WxH> <kind> <out.jpg> <pic,pic,...> [tile width=300]
import sys
from PIL import Image,ImageDraw
d,dev,kind,out,pics=sys.argv[1:6];TW=int(sys.argv[6]) if len(sys.argv)>6 else 300
rows=[];
for p in pics.split(','):
  for t,lab in (('b','BEFORE'),('a','AFTER')):
    ims=[]
    for K in ('S','M','L','XL'):
      im=Image.open(f'{d}/{t}-{dev}-{p}-{kind}-{K}.png').convert('RGB');ims.append(im.resize((TW,max(1,round(im.height*TW/im.width)))))
    rows.append((f'{lab} {p}',ims))
G=8;H=[max(i.height for i in r[1])+22 for r in rows];Wd=4*TW+5*G;sheet=Image.new('RGB',(Wd,sum(H)+G),(244,234,214));dr=ImageDraw.Draw(sheet);y=G
for (lab,ims),h in zip(rows,H):
  dr.text((G,y),lab+'   S | M | L | XL',fill=(60,30,10));x=G
  for i in ims: sheet.paste(i,(x,y+18));x+=TW+G
  y+=h
sheet.save(out,quality=82)
