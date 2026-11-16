# cmp.py OUT SCALE file1 file2 ... : forehead crops (ref.json) side by side
import sys,json,re
from PIL import Image,ImageDraw
out,sc=sys.argv[1],float(sys.argv[2]); fs=sys.argv[3:]
REF=json.load(open('/home/user/wt/huadian3/dev/art/huadian-size/ref.json'))
tiles=[]
for f in fs:
    pid=re.search(r'((?:consort|maid)-[cm]\d\d|player-look\d)',f).group(1); cx,ey,fw=REF[pid]
    im=Image.open(f).convert('RGBA'); b=Image.new('RGBA',im.size,(236,231,224,255)); b.alpha_composite(im)
    c=b.convert('RGB').crop(tuple(int(v) for v in (cx-0.32*fw,ey-0.66*fw,cx+0.32*fw,ey-0.0*fw)))
    c=c.resize((int(c.width*sc),int(c.height*sc)),Image.LANCZOS); ImageDraw.Draw(c).text((2,2),f.split('/')[-1][:30],fill=(0,0,255)); tiles.append(c)
W=sum(t.width for t in tiles); H=max(t.height for t in tiles); sh=Image.new('RGB',(W,H),(255,255,255)); x=0
for t in tiles: sh.paste(t,(x,0)); x+=t.width
sh.save(out,quality=88)
