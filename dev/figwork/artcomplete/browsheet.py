# browsheet.py out.jpg files... : haar face -> brow/forehead crop (zoomed), labelled contact sheet, 8 per row (look for moles at the brows)
import sys,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+"/.cache/pylib")
import cv2,numpy as np
from PIL import Image,ImageDraw
cc=cv2.CascadeClassifier(cv2.data.haarcascades+"haarcascade_frontalface_default.xml")
out=sys.argv[1]; tiles=[]
for f in sys.argv[2:]:
    im=Image.open(f).convert("RGBA"); bg=Image.new("RGB",im.size,(200,200,200)); bg.paste(im,(0,0),im)
    g=cv2.cvtColor(np.asarray(bg),cv2.COLOR_RGB2GRAY)
    fs=cc.detectMultiScale(g,1.1,4,minSize=(60,60))
    if len(fs): x,y,w,h=max(fs,key=lambda r:r[2]*r[3])
    else: x,y,w,h=int(im.width*.3),int(im.height*.15),int(im.width*.4),int(im.width*.4)
    c=bg.crop((x+int(w*.1),y-int(h*.05),x+int(w*.9),y+int(h*.55))).resize((300,int(300*(h*.6)/(w*.8))))
    t=Image.new("RGB",(300,c.height+16),(255,255,255)); t.paste(c,(0,16)); ImageDraw.Draw(t).text((3,2),os.path.basename(f)[4:-5],fill=(0,0,0)); tiles.append(t)
H=max(t.height for t in tiles); n=8; rows=(len(tiles)+n-1)//n
s=Image.new("RGB",(n*302,rows*(H+2)),(255,255,255))
for i,t in enumerate(tiles): s.paste(t,((i%n)*302,(i//n)*(H+2)))
s.save(out,quality=85)
