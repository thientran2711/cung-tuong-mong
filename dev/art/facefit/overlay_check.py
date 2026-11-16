from PIL import Image,ImageDraw
import sys,json,io,random,urllib.request
sys.path.insert(0,'.')
from ov import box
def load(path):
    im=Image.open(path).convert('RGBA');bg=Image.new('RGBA',im.size,(235,220,205,255));bg.alpha_composite(im);return bg.convert('RGB')

res=[json.loads(l) for fn in ('res0.jsonl','res1.jsonl','res_kidfix.jsonl') for l in open(fn)]
res=[r for r in res if r.get('v')]
cat=sys.argv[2];sel=[r for r in res if r['f'].split('-')[1]==cat and r['f'][:3]==sys.argv[3]]
random.seed(int(sys.argv[4]) if len(sys.argv)>4 else 1);sel=random.sample(sel,min(int(sys.argv[5]) if len(sys.argv)>5 else 10,len(sel)))
B='https://ctm-img.victoria-tntt.workers.dev/img/';tiles=[]
for r in sel:
    im=load(io.BytesIO(urllib.request.urlopen(urllib.request.Request(B+r['f'],headers={'User-Agent':'curl/8'})).read()));W,H=im.size;d=ImageDraw.Draw(im)
    box(d,im,r['v'],(255,0,0));box(d,im,r['s'],(0,200,0))
    # crop to head
    v=r['v'];x0=max(0,v[0]/100*W-v[2]/100*W*.5);y0=max(0,v[1]/100*H-v[3]/100*H*.9);x1=min(W,x0+v[2]/100*W*2);y1=min(H,y0+v[3]/100*H*2.6)
    tiles.append(im.crop((int(x0),int(y0),int(x1),int(y1))).resize((200,260)))
n=len(tiles);cols=min(n,5);rows=(n+cols-1)//cols;m=Image.new('RGB',(200*cols,260*rows),'white')
for i,t in enumerate(tiles):m.paste(t,((i%cols)*200,(i//cols)*260))
m.save(sys.argv[1],quality=80)
