import os,numpy as np,sys
from PIL import Image,ImageDraw,ImageFont
font=ImageFont.load_default(size=14)
V=sys.argv[1]
TW,TH=200,300
def tile(c,t,v):
    f=f'all/c{c:02d}_t{t}_v{v}.png'; im=Image.open(f).convert('RGBA')
    al=np.array(im.split()[-1]); ys=np.where(al.max(1)>20)[0]; xs=np.where(al.max(0)>20)[0]
    top,bot=ys[0],ys[-1]; H=bot-top; cx=(xs[0]+xs[-1])/2
    y0=top+int(.13*H); y1=top+int(.67*H); h=y1-y0; w=int(h*TW/TH)
    bg=Image.new('RGBA',im.size,(235,228,215,255)); bg.alpha_composite(im)
    c2=bg.convert('RGB').crop((int(cx-w/2),y0,int(cx+w/2),y1)).resize((TW,TH),Image.LANCZOS)
    d=ImageDraw.Draw(c2); d.rectangle((0,0,92,17),fill=(0,0,0)); d.text((2,1),f'c{c:02d}_t{t}_v{v}',fill=(255,255,0),font=font)
    return c2
keys=[(c,t) for c in range(1,33) for t in range(1,9)]
per=28
for i in range(0,len(keys),per):
    S=Image.new("RGB",(7*TW,4*TH))
    for j,(c,t) in enumerate(keys[i:i+per]): S.paste(tile(c,t,int(V)),((j%7)*TW,(j//7)*TH))
    S.save(f'it2/i{V}_{i//per+1:02d}.jpg',quality=88)
print(len(keys)//per+1)
