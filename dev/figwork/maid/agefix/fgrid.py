# fgrid.py OUT.jpg fig... : face crop with fig-pixel grid (every 10px), 4 per row
import sys,cv2,numpy as np
from PIL import Image,ImageDraw
det=cv2.FaceDetectorYN.create("haar/yunet.onnx","",(10,10),0.5)
tiles=[]
for f in sys.argv[2:]:
    im=Image.open(f).convert("RGBA"); bg=Image.new("RGB",im.size,(255,255,255)); bg.paste(im,mask=im.split()[3]); A=np.asarray(bg)
    big=cv2.resize(A,None,fx=3,fy=3); det.setInputSize((big.shape[1],big.shape[0])); _,r=det.detect(cv2.cvtColor(big,cv2.COLOR_RGB2BGR))
    if r is None: x,y,w,h=im.width//2-35,40,70,80
    else: x,y,w,h=(r[0][:4]/3).astype(int)
    x0,y0=x-8,y-20; x1,y1=x+w+8,y+h+8
    s=7; c=bg.crop((x0,y0,x1,y1)).resize(((x1-x0)*s,(y1-y0)*s),Image.LANCZOS); d=ImageDraw.Draw(c)
    for gx in range((x0//10+1)*10,x1,10): d.line([((gx-x0)*s,0),((gx-x0)*s,c.height)],fill=(0,0,255)); d.text(((gx-x0)*s+2,2),str(gx),fill="red")
    for gy in range((y0//10+1)*10,y1,10): d.line([(0,(gy-y0)*s),(c.width,(gy-y0)*s)],fill=(0,0,255)); d.text((2,(gy-y0)*s+2),str(gy),fill="red")
    d.text((4,c.height-12),f.split("fig-maid-")[1],fill="red"); tiles.append(c)
H=max(t.height for t in tiles); W=sum(t.width for t in tiles[:2])
cols=2; rows=(len(tiles)+1)//2
S=Image.new("RGB",(max(t.width for t in tiles)*2,H*rows),"white")
for i,t in enumerate(tiles): S.paste(t,((i%2)*(S.width//2),(i//2)*H))
S.save(sys.argv[1],quality=85)
