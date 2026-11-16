# sheet3.py OUT PORDIR COLS TILE_W "label:file ..." -> forehead crops grid
import sys,json,os,re
from PIL import Image,ImageDraw
out,pd,cols=sys.argv[1],sys.argv[2],int(sys.argv[3]); names=sys.argv[4:]
REF=json.load(open('../dev/art/huadian-size/ref.json'))
W,H=int(os.environ.get("TW",150)),int(os.environ.get("TH",130))
rows=(len(names)+cols-1)//cols
sh=Image.new('RGB',(cols*W,rows*H),(255,255,255)); d=ImageDraw.Draw(sh)
for i,n in enumerate(names):
    pid=re.match(r'por-((?:consort|maid)-[cm]\d\d|player-look\d)',n).group(1); cx,ey,fw=REF[pid]
    im=Image.open(f'{pd}/{n}.webp').convert('RGBA'); b=Image.new('RGBA',im.size,(236,231,224,255)); b.alpha_composite(im)
    c=b.convert('RGB').crop(tuple(int(v) for v in (cx-0.30*fw,ey-0.62*fw,cx+0.30*fw,ey-0.02*fw))).resize((W,H),Image.LANCZOS)
    x,y=(i%cols)*W,(i//cols)*H; sh.paste(c,(x,y)); d.text((x+2,y+2),n.replace('por-','').replace('consort-','').replace('maid-',''),fill=(0,0,255))
sh.save(out,quality=85)
