import sys; sys.path.insert(0,'cf')
from porcrop import find_face
from PIL import Image,ImageDraw
tiles=[]
for f in sys.argv[2:]:
    im=Image.open(f).convert('RGBA'); cx,ey,fw,h=find_face(im)
    x0,y0=int(cx-0.55*fw),int(ey-0.7*fw); x1,y1=int(cx+0.1*fw),int(ey+0.55*fw)
    T=Image.new('RGB',im.size,'black'); T.paste(im,(0,0),im); T=T.crop((x0,y0,x1,y1)); s=6
    T=T.resize((T.width*s,T.height*s),Image.NEAREST); D=ImageDraw.Draw(T)
    for gx in range((x0//5+1)*5,x1,5): D.line(((gx-x0)*s,0,(gx-x0)*s,T.height),fill=(0,160,255) if gx%10 else (255,0,255)); gx%10==0 and D.text(((gx-x0)*s+2,2),str(gx),fill=(0,0,255))
    for gy in range((y0//5+1)*5,y1,5): D.line((0,(gy-y0)*s,T.width,(gy-y0)*s),fill=(0,160,255) if gy%10 else (255,0,255)); gy%10==0 and D.text((2,(gy-y0)*s+2),str(gy),fill=(0,0,255))
    tiles.append(T)
W=sum(t.width for t in tiles); H=max(t.height for t in tiles); S=Image.new('RGB',(W,H),'white'); x=0
for t in tiles: S.paste(t,(x,0)); x+=t.width
S.save(sys.argv[1])
