import numpy as np, cv2, os, sys
from PIL import Image, ImageDraw
def facebox(f):
    im=np.array(Image.open(f).convert('RGBA')); A=im[...,3]; H,W=A.shape
    ycc=cv2.cvtColor(im[...,:3],cv2.COLOR_RGB2YCrCb)
    skin=(A>200)&(ycc[...,1]>135)&(ycc[...,1]<175)&(ycc[...,2]>85)&(ycc[...,2]<130)&(ycc[...,0]>120)
    skin[int(H*.2):]=False
    n,lab,st,_=cv2.connectedComponentsWithStats(skin.astype(np.uint8))
    i=1+np.argmax(st[1:,4]); x,y,w,h,_=st[i]; return x,y,w,h
def sheet(c,ages,out,tiers=range(1,9),size='hd_fig-'):
    tiles=[]
    for a in ages:
        for t in tiers:
            f=f'/tmp/w51/all/{c}/{size}consort-{c}-t{t}-{a}.webp'
            if not os.path.exists(f): continue
            x,y,w,h=facebox(f)
            im=Image.open(f).convert('RGBA'); bg=Image.new('RGBA',im.size,(40,36,52,255)); bg.alpha_composite(im)
            cx=x+w//2
            cr=bg.convert('RGB').crop((cx-int(w*.1),y+int(h*.15),cx+int(w*.75),y+int(h*1.15))).resize((300,300),Image.LANCZOS)
            ImageDraw.Draw(cr).text((4,4),f'{c} t{t} {a}',fill=(255,255,0))
            tiles.append(cr)
    s=Image.new('RGB',(300*4,300*((len(tiles)+3)//4)))
    for i,t in enumerate(tiles): s.paste(t,((i%4)*300,(i//4)*300))
    s.save(out); print(out,len(tiles))
for c in ('c01','c16'):
    for a in ('a18','a26','a36','a51'):
        sheet(c,[a],f'/tmp/w51/sh_{c}_{a}.png')
