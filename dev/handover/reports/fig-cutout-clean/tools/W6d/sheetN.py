import sys,subprocess,os
from PIL import Image,ImageDraw
rows=[l.rstrip('\n').split('\t') for l in open('a.tsv')]
H=470;ims=[]
for k,i,u in rows:
    p=f'm/{k}.png'
    if not os.path.exists(p): subprocess.run(['curl','-s','-o',p,u])
    ims.append((k,Image.open(p).convert('RGBA')))
S=Image.new('RGB',(sum(int(im.width*H/im.height) for _,im in ims),H),(40,40,46));x=0
for k,im in ims:
    im=im.resize((int(im.width*H/im.height),H));S.paste(im,(x,0),im);ImageDraw.Draw(S).text((x+3,3),k[5:8]+k[9:12],fill=(255,255,255));x+=im.width
S.save(sys.argv[1],quality=82);print(S.size)
