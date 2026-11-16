# r6_sheet.py: before/after sheet for aged por. usage: r6_sheet.py OUT.jpg ORIGDIR NEWDIR LOG names...   cell = orig(light) | new(light) | new(dark), centred on winx of LOG (jsonl from runswap)
import sys,json
from PIL import Image,ImageDraw
out,od,nd,log=sys.argv[1:5]; names=sys.argv[5:]
L={}
for l in open(log):
    x=json.loads(l)
    if x.get('winx'): L[x['name']]=x
def crop(path,c,fw,bgc,S=3):
    im=Image.open(path).convert('RGBA'); bg=Image.new('RGBA',im.size,bgc+(255,)); bg.alpha_composite(im)
    hw=int(0.55*fw); hh=int(0.42*fw)
    return bg.convert('RGB').crop((int(c[0]-hw),int(c[1]-hh),int(c[0]+hw),int(c[1]+hh))).resize((2*hw*S//2,hh*S),Image.LANCZOS)
cells=[]
for n in names:
    x=L.get(n)
    if not x: print('nolog',n); continue
    w=x['winx']; c=((w[0]+w[2])/2,(w[1]+w[3])/2+0.02*x['fw']); fw=x['fw']
    for p,bgc in ((f'{od}/{n}.webp',(236,231,224)),(f'{nd}/{n}.webp',(236,231,224)),(f'{nd}/{n}.webp',(28,24,30))):
        cc=crop(p,c,fw,bgc,S=3); ImageDraw.Draw(cc).text((3,3),n.replace('por-','').replace('consort-',''),fill=(200,0,0)); cells.append(cc)
w,h=cells[0].size; cols=6
sh=Image.new('RGB',(w*cols,h*((len(cells)+cols-1)//cols)))
for i,c in enumerate(cells): sh.paste(c,((i%cols)*w,(i//cols)*h))
sh.save(out,quality=85); print(sh.size,len(cells)//3)
