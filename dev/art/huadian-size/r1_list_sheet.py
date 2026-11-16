# r1_list_sheet.py (reviewer R1): tiles for an explicit list, crop around the logged window of the LIVE file (3x). usage: r1_list_sheet.py PORDIR OUTPREFIX names.txt|outl.json
import sys,os,json
from PIL import Image,ImageDraw
pd,pre,lst=sys.argv[1:4]
L={}
for l in open(os.path.dirname(os.path.abspath(__file__))+'/log_por.jsonl'):
    x=json.loads(l); L[x['name']]=x
names=[m['name'] for m in json.load(open(lst))] if lst.endswith('.json') else open(lst).read().split()
info={m['name']:m for m in json.load(open(lst))} if lst.endswith('.json') else {}
TW,TH,Z=180,150,3
cols,rows=6,5
for s in range(0,len(names),cols*rows):
    sh=Image.new('RGB',(cols*TW,rows*TH),(255,255,255)); d=ImageDraw.Draw(sh)
    for i,n in enumerate(names[s:s+cols*rows]):
        x=L.get(n,{}); w=x.get('win',[170,150,230,200]); cx=(w[0]+w[2])/2; cy=(w[1]+w[3])/2
        im=Image.open(f'{pd}/{n}.webp').convert('RGBA'); b=Image.new('RGBA',im.size,(236,231,224,255)); b.alpha_composite(im); im=b.convert('RGB')
        t=im.crop((int(cx-TW/Z/2),int(cy-TH/Z/2),int(cx+TW/Z/2),int(cy+TH/Z/2))).resize((TW,TH),Image.LANCZOS)
        X,Y=(i%cols)*TW,(i//cols)*TH; sh.paste(t,(X,Y))
        d.rectangle([X+(w[0]-(cx-TW/Z/2))*Z,Y+(w[1]-(cy-TH/Z/2))*Z,X+(w[2]-(cx-TW/Z/2))*Z,Y+(w[3]-(cy-TH/Z/2))*Z],outline=(0,160,255))
        d.text((X+2,Y+2),n.replace('por-','').replace('consort-','').replace('maid-','')+(f" {info[n]['after']}" if n in info else ''),fill=(0,0,255))
    sh.save(f'{pre}_{s//(cols*rows):02d}.png')
print(len(names))
