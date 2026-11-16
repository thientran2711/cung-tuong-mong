# view.py OUT SCALE files... : forehead crop with absolute pixel ticks every 10px (labels)
import sys,json,re
from PIL import Image,ImageDraw
out,sc=sys.argv[1],float(sys.argv[2]); fs=sys.argv[3:]
REF=json.load(open('/home/user/wt/huadian3/dev/art/huadian-size/ref.json'))
tiles=[]
for f in fs:
    pid=re.search(r'((?:consort|maid)-[cm]\d\d|player-look\d)',f).group(1); cx,ey,fw=REF[pid]
    x0,y0=int(cx-float(__import__("os").environ.get("VX",0.40))*fw),int(ey-float(__import__("os").environ.get("VT",0.72))*fw); x1,y1=int(cx+float(__import__("os").environ.get("VX",0.40))*fw),int(ey-float(__import__("os").environ.get("VB",0.02))*fw)
    im=Image.open(f).convert('RGBA'); b=Image.new('RGBA',im.size,(236,231,224,255)); b.alpha_composite(im)
    c=b.convert('RGB').crop((x0,y0,x1,y1)); c=c.resize((int(c.width*sc),int(c.height*sc)),Image.LANCZOS); d=ImageDraw.Draw(c)
    for x in range((x0//10+1)*10,x1,10):
        X=(x-x0)*sc; d.line([(X,0),(X,6)],fill=(0,0,255)); d.text((X-8,7),str(x),fill=(0,0,255))
    for y in range((y0//10+1)*10,y1,10):
        Y=(y-y0)*sc; d.line([(0,Y),(6,Y)],fill=(0,0,255)); d.text((8,Y-5),str(y),fill=(0,0,255))
    d.text((60,c.height-12),f.split('/')[-1],fill=(255,0,0)); tiles.append(c)
W=sum(t.width for t in tiles); H=max(t.height for t in tiles); sh=Image.new('RGB',(W,H),(255,255,255)); x=0
for t in tiles: sh.paste(t,(x,0)); x+=t.width
sh.save(out,quality=88)
