import sys; sys.path.insert(0,'cf')
from porcrop import find_face
from PIL import Image,ImageDraw
out=sys.argv[1]; fs=sys.argv[2:]; tiles=[]
for f in fs:
    im=Image.open(f).convert('RGBA'); cx,ey,fw,h=find_face(im)
    T=Image.new('RGB',im.size,'white'); T.paste(im,(0,0),im); T=T.crop((int(cx-0.6*fw),int(ey-0.8*fw),int(cx+0.6*fw),int(ey+0.75*fw))).resize((240,310))
    ImageDraw.Draw(T).text((3,3),f.split('-',2)[-1][:12],fill=(255,0,0)); tiles.append(T)
n=8; S=Image.new('RGB',(240*n,310*((len(tiles)+n-1)//n)),'white')
for i,t in enumerate(tiles): S.paste(t,((i%n)*240,(i//n)*310))
S.save(out)
