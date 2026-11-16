"""stitch.py <OUT> <vp>: joins the scroll tiles written by map-labels-2.js into <OUT>/<vp>-map.jpg and deletes the tiles."""
import json,sys,os
from PIL import Image
out,vp=sys.argv[1:3];m=json.load(open(f'{out}/_tiles_{vp}.json'));d=m['dim']
im=Image.new('RGB',(d['sw'],d['sh']))
for x,y,f in m['tiles']:
    t=Image.open(f).convert('RGB');im.paste(t,(x,y));os.remove(f)
os.remove(f'{out}/_tiles_{vp}.json');im.save(f'{out}/{vp}-map.jpg',quality=82)
print(vp,im.size)
