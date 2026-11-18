import json
from PIL import Image,ImageDraw,ImageFont
lm=json.load(open('lm.json')); keys=sorted(lm)
font=ImageFont.load_default(size=13)
TW,TH=224,100
tiles=[]
for k in keys:
    v=lm[k]; im=Image.open('top/'+k[:-4]+'.jpg')
    (x1,y1),(x2,y2),(x3,y3),(x4,y4)=v['mouth']; cx=(x1+x2)/2; cy=(y3+y4)/2; w=abs(x2-x1)
    hw=w*.78; hh=hw*TH/TW
    c=im.crop((int(cx-hw),int(cy-hh),int(cx+hw),int(cy+hh))).resize((TW,TH),Image.LANCZOS)
    d=ImageDraw.Draw(c); d.rectangle((0,0,62,15),fill=(0,0,0)); d.text((2,1),k[1:-4].replace('_a18',''),fill=(255,255,0),font=font)
    tiles.append(c)
per=54
for i in range(0,len(keys),per):
    S=Image.new('RGB',(6*TW,9*TH))
    for j,c in enumerate(tiles[i:i+per]): S.paste(c,((j%6)*TW,(j//6)*TH))
    S.save(f'ms2/z_{i//per+1:02d}.jpg',quality=92)
