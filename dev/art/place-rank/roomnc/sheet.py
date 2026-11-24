import sys,json
from PIL import Image,ImageDraw
names=sys.argv[2:]; out=sys.argv[1]; W=760
th=[]
for n in names:
    i=Image.open('old/'+n+'.webp').convert('RGB'); th.append((n,i.resize((W,int(i.height*W/i.width)))))
H=max(t.height for _,t in th)+24; rows=(len(th)+1)//2
sh=Image.new('RGB',(W*2+10,rows*H),'white'); d=ImageDraw.Draw(sh)
for j,(n,t) in enumerate(th):
    x=(j%2)*(W+10); y=(j//2)*H; d.text((x+4,y+4),n,fill='black'); sh.paste(t,(x,y+22))
sh.save(out,quality=80)
