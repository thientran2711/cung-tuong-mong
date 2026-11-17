import sys
from PIL import Image, ImageDraw
def sheet(paths, labels, out, H=700, crop=None, bg=(214,210,200)):
    ims=[]
    for p in paths:
        im=Image.open(p).convert('RGBA')
        if crop: im=im.crop((0,0,im.width,int(im.height*crop)))
        r=H/im.height; im=im.resize((max(1,int(im.width*r)),H),Image.LANCZOS); ims.append(im)
    W=sum(i.width for i in ims)+20*(len(ims)+1)
    S=Image.new('RGB',(W,H+60),bg); d=ImageDraw.Draw(S); x=20
    for im,l in zip(ims,labels):
        S.paste(im,(x,10),im); d.text((x,H+15),l,fill=(255,0,0)); x+=im.width+20
    S.save(out,quality=88)
if __name__=='__main__':
    pass
