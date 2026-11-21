import json,os,sys
from PIL import Image
D=os.path.dirname(os.path.abspath(__file__)); J=json.load(open(os.path.join(D,'out','fit.json'))); S=sys.argv[1]
tiles=[]
for n,r in J.items():
  for key in ['ngoc','tui']:
    b=Image.open(os.path.join(D,'out',r['base'])).convert('RGBA'); it=Image.open(os.path.join(D,'out',r[key]['src']))
    b.alpha_composite(it,(r[key]['x'],r[key]['y'])); zx,zy=r['zoom']
    tiles.append(b.crop((zx-110,zy-150,zx+110,zy+150)).resize((330,450)))
out=Image.new('RGB',(330*6+50,450),'white')
for i,t in enumerate(tiles): out.paste(t.convert('RGB'),(i*340,0))
out.save(S,quality=88)
