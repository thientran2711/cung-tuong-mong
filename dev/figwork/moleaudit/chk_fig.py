import sys,json,importlib.util,re
from PIL import Image
sys.argv=['x','.','hits.json']
src=open('../dev/figwork/moleaudit/fixpair.py').read().split("log = {}")[0]
exec(src)
H=json.load(open('hits.json')); names=sys.stdin.read().split()
tiles=[]
for k in names:
    por=Image.open(f'orig/img/{k}.webp'); b=k[4:]
    for sub in ('','hd/'):
        pth=f'orig/img/{sub}fig-{b}.webp'
        try: d0=Image.open(pth)
        except Exception: continue
        d1=Image.open(f'img/{sub}fig-{b}.webp')
        x,y,w,h=H[k][0]; mv,s,(fx,fy)=locate(por,d0,x+w//2,y+h//2)
        fx,fy=int(fx),int(fy); R=int(26*s*1.5); 
        def cr(im): 
            bg=Image.new('RGBA',im.size,(200,200,200,255)); bg.alpha_composite(im.convert('RGBA')); return bg.convert('RGB').crop((fx-R,fy-R*3//4,fx+R,fy+R*3//4)).resize((240,180))
        t=Image.new('RGB',(480,196),'white'); t.paste(cr(d0),(0,16)); t.paste(cr(d1),(240,16))
        from PIL import ImageDraw; ImageDraw.Draw(t).text((2,2),f'{sub}fig-{b} m={mv:.2f}',fill=0); tiles.append(t)
sh=Image.new('RGB',(4*482,((len(tiles)+3)//4)*198),'white')
for i,t in enumerate(tiles): sh.paste(t,((i%4)*482,(i//4)*198))
sh.save(sys.argv[0] if False else 'chk_fig.jpg',quality=85); print(len(tiles))
