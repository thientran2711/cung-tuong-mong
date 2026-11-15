# gridv.py out.jpg figs... : por face crop (x 80..300, y 120..300) at 2x with 20px grid in por coords
import sys,os,cv2
sys.path.insert(0,'/home/user/cung-tuong-mong/.claude/worktrees/agent-a4a32ff575576735e/dev/figwork')
import porcrop
from PIL import Image,ImageDraw
X0,Y0,X1,Y1=80,120,300,300; Z=2
tiles=[]
for f in sys.argv[2:]:
    im=Image.open(f).convert('RGBA'); por=porcrop.crop(im,porcrop.find_face(im))
    b=Image.new('RGBA',por.size,(235,225,205,255)); b.alpha_composite(por)
    t=b.crop((X0,Y0,X1,Y1)).convert('RGB').resize(((X1-X0)*Z,(Y1-Y0)*Z),Image.LANCZOS); d=ImageDraw.Draw(t)
    for x in range(X0,X1,20): d.line(((x-X0)*Z,0,(x-X0)*Z,t.height),fill=(0,200,255) if x%100 else (255,0,0),width=1); d.text(((x-X0)*Z+2,2),str(x),fill=(0,0,255))
    for y in range(Y0,Y1,20): d.line((0,(y-Y0)*Z,t.width,(y-Y0)*Z),fill=(0,200,255) if y%100 else (255,0,0),width=1); d.text((2,(y-Y0)*Z+2),str(y),fill=(0,0,255))
    d.text((t.width-150,t.height-14),os.path.basename(f)[12:-5],fill=(0,0,0)); tiles.append(t)
cols=min(4,len(tiles)); rows=(len(tiles)+cols-1)//cols; w,h=tiles[0].size
sh=Image.new('RGB',(cols*(w+4),rows*(h+4)),'white')
for i,t in enumerate(tiles): sh.paste(t,((i%cols)*(w+4),(i//cols)*(h+4)))
sh.save(sys.argv[1],quality=90); print(sh.size)
