#!/usr/bin/env python3
"""KIT §4.1c: derive KIT_PFO.band (the bottom of each portrait frame's carved BAR, canvas units of 550x1037) from the frame pictures' alpha.
Bar bottom = the last canvas row (y 720..900) where >= 50 % of the bar sample columns are opaque (alpha > 60); sample columns = x 25..44 % and 56..75 %
of the canvas, so the corner ornaments (clouds, peonies) and the pendant column never count. Re-run after any frame re-cut and paste the printed table into jk2b §20b.
usage: python3 dev/tools/pframe-band.py [<dir with frame-*.webp>]   (no dir: downloads the LIVE frames from the CDN into a temp dir)"""
import sys, os, re, json, glob, tempfile, urllib.request
from PIL import Image
BASE = re.search(r'const IMG_BASE="([^"]+)"', open(os.path.join(os.path.dirname(__file__), '..', 'build', 'jcdn.js'), encoding='utf-8').read()).group(1)
def bar_bottom(path):
    im = Image.open(path).convert('RGBA'); a = im.getchannel('A').load(); W, H = im.size
    xs = list(range(int(.25 * W), int(.44 * W))) + list(range(int(.56 * W), int(.75 * W))); bar = None
    for y in range(int(720 * H / 1037), int(900 * H / 1037)):
        if sum(1 for x in xs if a[x, y] > 60) >= .5 * len(xs): bar = y
    return round(bar * 1037 / H) if bar is not None else None
d = sys.argv[1] if len(sys.argv) > 1 else None
if not d:
    d = tempfile.mkdtemp(prefix='pfband-'); idx = json.load(urllib.request.urlopen(BASE + 'img/_index.json'))
    for k, *_ in idx['files']:
        if re.fullmatch(r'img/kit/frame-[a-z]+(-\d)?\.webp', k):
            urllib.request.urlretrieve(BASE + k + '?nocache=1', os.path.join(d, os.path.basename(k)))
band = {}
for p in sorted(glob.glob(os.path.join(d, 'frame-*.webp'))):
    k = re.sub(r'^frame-|\.webp$', '', os.path.basename(p))
    if k.endswith('-w'): continue
    band[k] = bar_bottom(p)
print(','.join(f'"{k}":{v}' if '-' in k else f'{k}:{v}' for k, v in band.items()))
