import sys,json
from PIL import Image,ImageDraw
log=[json.loads(l) for l in open(sys.argv[1])]; td,od,out=sys.argv[2:5]; sc=float(sys.argv[5]) if len(sys.argv)>5 else 3
tiles=[]
for x in log:
    if x.get('status')!='patched': continue
    b=x['box']; pad=6; bb=(max(b[0]-pad,0),max(b[1]-pad,0),b[2]+pad,b[3]+pad)
    ims=[]
    for d in (td,od):
        im=Image.open(f"{d}/{x['name']}.webp").convert('RGBA'); bg=Image.new('RGBA',im.size,(236,231,224,255)); bg.alpha_composite(im)
        c=bg.convert('RGB').crop(bb); ims.append(c.resize((int(c.width*sc),int(c.height*sc)),Image.LANCZOS))
    t=Image.new('RGB',(ims[0].width*2+4,ims[0].height+12),(255,255,255)); t.paste(ims[0],(0,12)); t.paste(ims[1],(ims[0].width+4,12)); ImageDraw.Draw(t).text((1,0),x['name'][4:],fill=(0,0,255)); tiles.append(t)
cols=4; W=max(t.width for t in tiles); H=max(t.height for t in tiles); rows=(len(tiles)+cols-1)//cols
sh=Image.new('RGB',(cols*W,rows*H),(255,255,255))
for i,t in enumerate(tiles): sh.paste(t,((i%cols)*W,(i//cols)*H))
sh.save(out,quality=85)
