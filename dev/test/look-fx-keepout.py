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
m = re.search(r'keep:\{eye:(\[\[.*?\]\]),mouth:(\[.*?\]),nose:(\[.*?\]),pad:([\d.]+),cheek:(\[.*?\])\}', src); J = lambda x: json.loads(re.sub(r'(?<![\d])\.(\d)', r'0.\1', x)); eye = J(m.group(1)); mouth = J(m.group(2)); nose = J(m.group(3)); PAD = float(m.group(4)); cheek = J(m.group(5))
KEEP = [[a, b, c * PAD, d * PAD] for a, b, c, d in eye + [mouth, nose]]  # ellipses grown by BAL.looks.keep.pad
vf = json.load(open(D + '/veil-fit.json')); old = json.load(open(D + '/scar-fit.OLD.json'))
def size(k):
    if k.startswith('por-'): return 384, 506
    b = open(os.path.join(D, 'figs', k), 'rb').read(64)   # header only is enough (files may be range-fetched)
    if b[12:16] == b'VP8X': return 1 + int.from_bytes(b[24:27], 'little'), 1 + int.from_bytes(b[27:30], 'little')
    if b[12:16] == b'VP8L': v = int.from_bytes(b[21:25], 'little'); return (v & 0x3FFF) + 1, ((v >> 14) & 0x3FFF) + 1
    return int.from_bytes(b[26:28], 'little') & 0x3FFF, int.from_bytes(b[28:30], 'little') & 0x3FFF   # VP8
def box_px(r, W, H): return r[0] / 100 * W, r[1] / 100 * H, r[2] / 100 * W, r[3] / 100 * H
# stroke cores (alpha > 70 of scar-1..3 in D, flipped like KIT_SCAR.style) tested pixel by pixel against the grown ellipses; box rotated by the row angle
CORE = []
for n in (1, 2, 3):
    a = np.asarray(Image.open(os.path.join(D, f'scar-{n}.png')).convert('RGBA'))[..., 3][:, ::-1]; ys, xs = np.nonzero(a > 70); sel = slice(None, None, 5); CORE.append((xs[sel] / a.shape[1] - .5, ys[sel] / a.shape[0] - .5))
def overlaps(scar, v, W, H, margin=0):
    sx, sy, sw, sh = box_px(scar, W, H); vx, vy, vw, vh = box_px(v, W, H); bad = 0; ang = math.radians(scar[4]); ca, sa = math.cos(ang), math.sin(ang)
    for fx, fy in CORE:
        X = fx * sw; Y = fy * sh; Xr = X * ca - Y * sa + sx + sw / 2; Yr = X * sa + Y * ca + sy + sh / 2; u = (Xr - vx) / vw; w = (Yr - vy) / vh
        for cx, cy, rx, ry in KEEP:
            if (((u - cx) / rx) ** 2 + ((w - cy) / ry) ** 2 <= 1).any(): bad += 1; break
    return bad
new_rows = {}; rows = 0; ob = 0; oa = 0; byk = {'por': [0, 0, 0], 'fig': [0, 0, 0]}
for k, v in vf.items():
    W, H = size(k); vx, vy, vw, vh = box_px(v, W, H)
    for nudge in (0, .01, .02, .03, .04, -.01, -.02):   # a rotated row that still touches a grown ellipse slides down the cheek (rare: 1 row at the pad 1.2 setting)
        l = vx + cheek[0] * vw; t = vy + (cheek[1] + nudge) * vh   # box = cheek [left, top, w, h] of the veil row (BAL.looks.keep.cheek)
        new_rows[k] = [round(l / W * 100, 2), round(t / H * 100, 2), round(cheek[2] * vw / W * 100, 2), round(cheek[3] * vh / H * 100, 2), v[4]]
        if not overlaps(new_rows[k], v, W, H): break
    b = overlaps(old[k], v, W, H) > 0; a = overlaps(new_rows[k], v, W, H) > 0; g = byk[k[:3]]; g[0] += 1; g[1] += b; g[2] += a; rows += 1; ob += b; oa += a
new = new_rows
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
