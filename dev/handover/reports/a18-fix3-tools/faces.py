import sys
from PIL import Image
c=sys.argv[1]; names=sys.argv[2:]; W='/home/user/wt/w65c-work'
ims=[Image.open(f'{W}/{c}/new/{n}.png').convert('RGBA') for n in names]
tw=320; s=Image.new('RGB',(tw*len(ims),380),(200,200,200))
for i,im in enumerate(ims):
    w,h=im.size; cr=im.crop((int(w*.25),int(h*.03),int(w*.75),int(h*.20))).resize((tw,round(tw*0.17*h/(.5*w)))) 
    s.paste(cr,(i*tw,0),cr)
s.save(f'{W}/{c}/faces.jpg')
