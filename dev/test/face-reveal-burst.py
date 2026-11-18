# review/face-reveal-anim: contact sheet from the burst screenshots written by face-reveal-rec.js. usage: python3 dev/test/face-reveal-burst.py <outdir> <A|B> [cols]
import sys,json
from PIL import Image,ImageDraw
o,k=sys.argv[1],sys.argv[2];cols=int(sys.argv[3]) if len(sys.argv)>3 else 4;m=json.load(open(o+'/marks.json'));T=m[k+'burst']
ims=[Image.open(f'{o}/f{k}{i}.jpg') for i in range(12)];w,h=ims[0].size;s=min(1,380/w);ims=[i.resize((int(w*s),int(h*s))) for i in ims];rows=(12+cols-1)//cols
S=Image.new('RGB',(ims[0].width*cols,ims[0].height*rows),'white');d=ImageDraw.Draw(S)
for i,im in enumerate(ims):x,y=(i%cols)*im.width,(i//cols)*im.height;S.paste(im,(x,y));d.rectangle((x,y,x+44,y+13),fill='black');d.text((x+2,y+1),f'{T[i]}ms',fill='white')
S.save(f'{o}/burst-{k}.png');print(f'{o}/burst-{k}.png')
