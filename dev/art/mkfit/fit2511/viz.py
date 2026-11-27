#!/usr/bin/env python3
"""viz: picture face crop with OLD (stored, red) vs NEW (fresh, green) points; usage viz.py out.jpg name1 name2 ..."""
import sys, json, io, re, urllib.request, os
from PIL import Image, ImageDraw
os.chdir('/home/user/wt/mkwork')
def face_of(n): return re.match(r"(?:por|fig)-([a-z]+-[a-z]*\d+)-", n).group(1)
def get(n):
    p = 'pics/' + n
    if os.path.exists(p): return open(p, 'rb').read()
    d = urllib.request.urlopen(urllib.request.Request('https://ctm-img.victoria-tntt.workers.dev/img/' + n, headers={'User-Agent': 'curl/8'}), timeout=60).read()
    os.makedirs('pics', exist_ok=True); open(p, 'wb').write(d); return d
out, names = sys.argv[1], sys.argv[2:]
T = 300; tiles = []
for n in names:
    g = face_of(n); im = Image.open(io.BytesIO(get(n))).convert('RGBA'); bg = Image.new('RGBA', im.size, (255, 255, 255, 255)); bg.alpha_composite(im); im = bg.convert('RGB'); W, H = im.size
    old = json.load(open('cdnfit/%s.json' % g)).get(n); new = (json.load(open('res/%s.json' % g)).get(n) or [None, None])[1]
    try: fix = json.load(open('fixed/%s.json' % g)).get(n)
    except Exception: fix = None
    sets = [(old, (255, 0, 0)), (new, (0, 200, 0)), (fix, (0, 80, 255))]
    allp = [(v[2*i]/4000*W, v[2*i+1]/4000*H) for v, c in sets if v for i in range(60)]
    xs = [p[0] for p in allp]; ys = [p[1] for p in allp]
    cx, cy = (min(xs)+max(xs))/2, (min(ys)+max(ys))/2; s = max(max(xs)-min(xs), max(ys)-min(ys)) * 1.4 + 10
    if s > W * .9 or not allp: cx, cy, s = W/2, H*.15, W*.6
    cr = im.crop((int(cx-s/2), int(cy-s/2), int(cx+s/2), int(cy+s/2))).resize((T, T)); k = T / s
    d = ImageDraw.Draw(cr)
    for v, c in sets:
        if not v: continue
        P = [((v[2*i]/4000*W-(cx-s/2))*k, (v[2*i+1]/4000*H-(cy-s/2))*k) for i in range(60)]
        for a, b in ((0,12),(12,20),(20,30),(30,40),(40,50),(50,60)): d.line(P[a:b]+[P[a]], fill=c, width=1)
    d.text((3, T-12), n[4:-5][:44], fill=(0,0,0))
    tiles.append(cr)
C = min(5, len(tiles)); R = (len(tiles)+C-1)//C
sh = Image.new('RGB', (C*T, R*T), 'white')
for i, t in enumerate(tiles): sh.paste(t, ((i%C)*T, (i//C)*T))
sh.save(out, quality=85)
