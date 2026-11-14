import sys,re,ast
from PIL import Image,ImageDraw
g,pts=sys.argv[1],ast.literal_eval(sys.argv[2])
im=Image.open(f"raw/{g}.png").convert('RGB'); d=ImageDraw.Draw(im)
for x,y in pts: d.ellipse((x-9,y-9,x+12,y+12),outline=(0,200,255),width=2)
W=im.width; row=Image.new('RGB',(4*300,300))
for i in range(4):
    cx=i*W//4+W//8; c=im.crop((cx-230,100,cx+230,560)).resize((300,300)); row.paste(c,(i*300,0))
row.save(sys.argv[3])
