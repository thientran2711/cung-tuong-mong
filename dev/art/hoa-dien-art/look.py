# look.py SRC OUT LOG SHEET [Z]: before|after zoom of each clean entry around rect
import sys,json
from PIL import Image
src,out,log,sheet=sys.argv[1:5]; Z=int(sys.argv[5]) if len(sys.argv)>5 else 4
tiles=[]
for l in open(log):
    x=json.loads(l)
    if x.get('status')!='clean': continue
    a=Image.open(f"{src}/{x['name']}.webp").convert('RGBA'); b=Image.open(f"{out}/{x['name']}.webp").convert('RGBA')
    x0,y0,x1,y1=x['rect']; cx,cy=(x0+x1)//2,(y0+y1)//2; r=max(x1-x0,y1-y0,24)*2
    box=(max(0,cx-r),max(0,cy-r),cx+r,cy+r)
    def t(im):
        bg=Image.new('RGBA',im.size,(255,255,255,255)); bg.alpha_composite(im); c=bg.crop(box).convert('RGB'); return c.resize((c.width*Z,c.height*Z),Image.LANCZOS)
    A,B=t(a),t(b); T=Image.new('RGB',(A.width*2+6,A.height),'black'); T.paste(A,(0,0)); T.paste(B,(A.width+6,0)); tiles.append(T)
W=max(t.width for t in tiles); H=sum(t.height+6 for t in tiles)
S=Image.new('RGB',(W,H),'gray'); y=0
for t in tiles: S.paste(t,(0,y)); y+=t.height+6
S.save(sheet,quality=90)
