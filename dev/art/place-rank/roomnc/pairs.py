import sys
from PIL import Image,ImageDraw
out=sys.argv[1]; names=sys.argv[2:]; W=760
rows=[]
for n in names:
    o=Image.open('old/'+n+'.webp').convert('RGB'); w=Image.open('nc/new_'+n+'.png').convert('RGB')
    rows.append((n,o.resize((W,int(o.height*W/o.width))),w.resize((W,int(w.height*W/w.width)))))
H=rows[0][1].height+22
sh=Image.new('RGB',(W*2+10,H*len(rows)),'white'); d=ImageDraw.Draw(sh)
for j,(n,o,w) in enumerate(rows):
    y=j*H; d.text((4,y+4),'OLD '+n,fill='black'); d.text((W+14,y+4),'NEW '+n,fill='black'); sh.paste(o,(0,y+20)); sh.paste(w,(W+10,y+20))
sh.save(out,quality=80)
