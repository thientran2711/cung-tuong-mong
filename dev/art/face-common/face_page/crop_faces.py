from PIL import Image
import numpy as np,os,json
u=json.load(open('urls.json'));os.makedirs('jpg',exist_ok=True)
W=460
for k in sorted(u):
    im=Image.open(f'raw/{k}.png').convert('RGBA'); a=np.array(im)[:,:,3]>40
    rows=np.where(a.any(1))[0]; y0=rows[0]
    # head centre: alpha columns in band 25%..45% of the way from y0 to y0+700 (face level)
    band=a[y0+200:y0+380]; cols=np.where(band.any(0))[0]
    cx=int((cols[0]+cols[-1])/2) if len(cols) else 512
    cx+={"c15":-150}.get(k,0)
    H=int(W*340/300)
    x0=max(0,min(1024-W,cx-W//2)); top=max(0,y0-10)
    bg=Image.new('RGBA',im.size,(244,240,238,255)); bg.alpha_composite(im)
    c=bg.crop((x0,top,x0+W,top+H)).convert('RGB').resize((460,int(460*340/300)),Image.LANCZOS)
    c.save(f'jpg/{k}.jpg',quality=86)
# contact sheet
ks=sorted(u); n=len(ks); cw=180; ch=int(cw*340/300); per=10
sh=Image.new('RGB',(cw*per,ch*((n+per-1)//per)),'white')
from PIL import ImageDraw
d=ImageDraw.Draw(sh)
for i,k in enumerate(ks):
    t=Image.open(f'jpg/{k}.jpg').resize((cw,ch)); sh.paste(t,((i%per)*cw,(i//per)*ch)); d.text(((i%per)*cw+4,(i//per)*ch+4),k,fill='red')
sh.save('sheet.jpg',quality=80); print(sh.size, os.path.getsize('jpg/c01.jpg'))
