#!/usr/bin/env python3
"""look-fx-keepout.py <cache dir with veil-fit.json scar-fit.json (OLD scar rows = scar-fit.OLD.json) fx-*.png and the fig-* files> [--write out scar-fit.json]
Owner 18/11 standing rule: a face mark NEVER covers the eyes or the lips (and not the nose). Keep-out ellipses = BAL.looks.keep (dev/build/jlooks.js, veil-row units).
1. SCRATCH rows: for EVERY por-/fig- row, the new scar box (cheek zone of the veil row, square) vs the eye/mouth/nose keep-out (bounding-box overlap, rotation margin .03): rows checked, rows overlapping OLD -> NEW.
2. FACE-SQUARE marks (24 finals): pixels (alpha>24) inside the keep-out ellipses before the CSS mask -> after the mask (same gradient as lkKeepCss).
exit 1 when any NEW overlap is left."""
import sys, os, re, json, math
import numpy as np
from PIL import Image
D = sys.argv[1]; WRITE = sys.argv[sys.argv.index('--write') + 1] if '--write' in sys.argv else None
src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'build', 'jlooks.js'), encoding='utf-8').read()
m = re.search(r'keep:\{eye:(\[\[.*?\]\]),mouth:(\[.*?\]),nose:(\[.*?\]),cheek:(\[.*?\])\}', src); J = lambda x: json.loads(re.sub(r'(?<![\d])\.(\d)', r'0.\1', x)); eye = J(m.group(1)); mouth = J(m.group(2)); nose = J(m.group(3)); cheek = J(m.group(4))
KEEP = eye + [mouth, nose]
vf = json.load(open(D + '/veil-fit.json')); old = json.load(open(D + '/scar-fit.OLD.json'))
def size(k):
    if k.startswith('por-'): return 384, 506
    return Image.open(os.path.join(D, 'figs', k)).size
def box_px(r, W, H): return r[0] / 100 * W, r[1] / 100 * H, r[2] / 100 * W, r[3] / 100 * H
def overlaps(scar, v, W, H, margin=.03):
    """scar/v = rows; veil-relative box of the scar vs each ellipse bounding rect (units of veil w,h)"""
    sx, sy, sw, sh = box_px(scar, W, H); vx, vy, vw, vh = box_px(v, W, H)
    a = ((sx - vx) / vw, (sy - vy) / vh, (sx + sw - vx) / vw, (sy + sh - vy) / vh); n = 0
    for cx, cy, rx, ry in KEEP:
        if a[0] < cx + rx + margin and a[2] > cx - rx - margin and a[1] < cy + ry + margin and a[3] > cy - ry - margin: n += 1
    return n
new = {}; rows = 0; ob = 0; oa = 0; byk = {'por': [0, 0, 0], 'fig': [0, 0, 0]}
for k, v in vf.items():
    W, H = size(k); vx, vy, vw, vh = box_px(v, W, H); side = min(cheek[2] * vw, .215 * vh)  # square side; capped so the bottom stays above the mouth keep-out
    l = vx + cheek[0] * vw; t = vy + cheek[1] * vh
    new[k] = [round(l / W * 100, 2), round(t / H * 100, 2), round(side / W * 100, 2), round(side / H * 100, 2), v[4]]
    b = overlaps(old[k], v, W, H) > 0; a = overlaps(new[k], v, W, H) > 0; g = byk[k[:3]]; g[0] += 1; g[1] += b; g[2] += a; rows += 1; ob += b; oa += a
print(f'SCRATCH rows checked {rows}: overlapping keep-out OLD {ob} -> NEW {oa}')
for g, (n, b, a) in byk.items(): print(f'  {g}: {n} rows, old {b} -> new {a}')
if WRITE: json.dump(new, open(WRITE, 'w'), separators=(',', ':')); print('wrote', WRITE)
# face-square marks: square coords s=(u+.04)/1.08, t=(v+.3826)/1.165
tot_b = tot_a = 0; print('FACE-SQUARE marks: pixels alpha>24 inside keep-out (before mask -> after mask)')
S = 384; yy, xx = np.mgrid[0:S, 0:S]; xs = (xx + .5) / S; ys = (yy + .5) / S
keep = np.zeros((S, S)); inside = np.zeros((S, S), bool)
for u, v, ru, rv in KEEP:
    s = (u + .04) / 1.08; t = (v + .3826) / 1.165; hw = ru / 1.08; hh = rv / 1.165
    d = np.sqrt(((xs - s) / hw) ** 2 + ((ys - t) / hh) ** 2)   # 1 = ellipse edge; mask: opaque (removes) until .82, fades to 1.0
    keep = np.maximum(keep, np.clip((1.0 - d) / .18, 0, 1)); inside |= d <= 1.0
for f in sorted(x for x in os.listdir(D) if re.fullmatch(r'fx-[a-z-]+-\d(-m)?\.png', x)):
    a = np.asarray(Image.open(os.path.join(D, f)).convert('RGBA'))[..., 3].astype(float)
    b = int(((a > 24) & inside).sum()); af = int(((a * (1 - keep) > 24) & inside & (keep > 0.999)).sum()); tot_b += b; tot_a += af
    print(f'  {f}: {b} -> {af}')
print(f'TOTAL face-square pixels in keep-out: {tot_b} -> {tot_a} (fully-masked core; the 82-100 % rim fades out)')
sys.exit(1 if oa else 0)
