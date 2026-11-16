"""Glow-aware contrast of the stage name tags (owner 11/16 13:55Z: everybody glows on a painting; reviewer title-tag-r1 item 3).
usage: node dev/test/title-tag-r1.js <url> <outdir> [WxH@dpr]   (writes <outdir>/r.json + g<buoi>.png = stage with the letters made transparent, glow kept + t<buoi>.png = same stage with the letters)
       python3 dev/test/stage-tag-contrast.py <outdir> [dpr=2]
For each tag line the GLYPH MASK = pixels that differ between t (letters) and g (no letters); the halo behind the letters = the g pixels under that mask; contrast = letter colour vs that halo (median, and the worst 10 %).
Pass: every line median >= 3:1 (exit 1 otherwise)."""
import json,sys
from PIL import Image
D=sys.argv[1];dpr=float(sys.argv[2]) if len(sys.argv)>2 else 2
R=json.load(open(D+'/r.json'))
def lin(c):
    c=c/255;return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
def L(rgb):return 0.2126*lin(rgb[0])+0.7152*lin(rgb[1])+0.0722*lin(rgb[2])
def cr(a,b):a,b=max(a,b),min(a,b);return (a+0.05)/(b+0.05)
rows=[]
for r in R['res']:
    im=Image.open(f"{D}/g{r['bu']}.png").convert('RGB');tm=Image.open(f"{D}/t{r['bu']}.png").convert('RGB')
    for t in r['tags']:
        box=tuple(int(v*dpr) for v in (t['x'],t['y'],t['x']+t['w'],t['y']+t['h']))
        if box[2]<=box[0] or box[3]<=box[1]:continue
        g=im.crop(box).getdata();tt=tm.crop(box).getdata()
        ls=sorted(L(a) for a,b in zip(g,tt) if sum(abs(x-y) for x,y in zip(a,b))>60) or sorted(L(a) for a in g)
        c=[int(x) for x in t['col'][t['col'].index('(')+1:-1].split(',')[:3]];lt=L(c);med=ls[len(ls)//2]
        worst=ls[int(len(ls)*0.9)] if lt<0.3 else ls[int(len(ls)*0.1)]
        rows.append((r['bu'],t['line'],'HER' if t['mine'] else 'other',t['txt'],round(cr(lt,med),2),round(cr(lt,worst),2)))
rows.sort(key=lambda x:x[4])
for x in rows:print(x)
bad=[x for x in rows if x[4]<3]
print(len(rows),'lines;',len(bad),'below 3:1 (median)')
sys.exit(1 if bad else 0)
