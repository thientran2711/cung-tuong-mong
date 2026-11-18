#!/usr/bin/env python3
"""look-fx-keepscan.py <art dir> <veil-fit.json> <eye jsonl ...> [--keepfit keep-fit.json] [--out table.txt]
Owner 18/11 standing rule: a face mark NEVER covers the eyes or the lips. TRUTH per picture = the measured eye CONTOURS (MediaPipe, dev/tools/look-fx-eyefit.py, polygon dilated 2 px of 384)
and the lip box. For every picture and every mark art (face-square finals fx-*.png + the cào strokes scar-N.png in the cheek3 box) the script counts the mark pixels (alpha > 24 after the
keep-out mask) that lie on the truth, with the keep-out of the OLD game (BAL.looks.keep constants) and of the NEW game (keep-fit row, same BAL.looks.keep.fit knobs), the mask = lkKeepCss / lkScarFix
(each ellipse grown by pad and 1.22, opaque to 82 %, fading to 100 %, ellipses excluded one after the other). Prints the before / after table (pictures touching, by mark). exit 1 when any NEW touch is left."""
import sys, os, re, json, glob
import numpy as np
from PIL import Image, ImageDraw
A = sys.argv[1]; VF = json.load(open(sys.argv[2])); args = sys.argv[3:]
KF = json.load(open(args[args.index('--keepfit') + 1])) if '--keepfit' in args else {}
OUT = args[args.index('--out') + 1] if '--out' in args else None
GAP = int(args[args.index('--gap') + 1]) if '--gap' in args else 2   # R9g: clear gap (px of 384) kept between any mark pixel and the eye contour; 14 px ~ 4 % of the face width (main ROOT-50 18/11)
J = [a for a in args if a.endswith('.jsonl')]; R = {}
for f in J:
    for l in open(f): r = json.loads(l); R[r['f']] = r
src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'build', 'jlooks.js'), encoding='utf-8').read()
jl = lambda x: json.loads(re.sub(r'(?<![\d])\.(\d)', r'0.\1', x))
K_EYE = jl(re.search(r'keep:\{feather:[\d.]+,eye:(\[\[.*?\]\])', src).group(1)); T = re.search(r'fit:\{eye:\[.*?\],mouth:\[.*?\]\},mouth:(\[.*?\]),nose:(\[.*?\]),pad:([\d.]+),cheek:', src); K_MOUTH = jl(T.group(1)); K_NOSE = jl(T.group(2)); PAD = float(T.group(3))
T2 = re.search(r'fit:\{eye:(\[.*?\]),mouth:(\[.*?\])\}', src); F = {'eye': jl(T2.group(1)), 'mouth': jl(T2.group(2))}; C3 = jl(re.search(r'cheek3:(\[.*?\])', src).group(1))
S = 384
def fit_ellipses(r):   # = lkKeepFor
    q = lambda x: x / 1000
    ex = q(r[4]) * F['eye'][0] + F['eye'][1]; ey = q(r[5]) * F['eye'][2] + F['eye'][3]
    return [[q(r[0]), q(r[1]), ex, ey], [q(r[2]), q(r[3]), ex, ey], [q(r[6]), q(r[7]), q(r[8]) * F['mouth'][0] + F['mouth'][1], q(r[9]) * F['mouth'][2] + F['mouth'][3]], [q(r[10]), q(r[11]), K_NOSE[2], K_NOSE[3]]]
OLD = [*K_EYE, K_MOUTH, K_NOSE]
def vis(u, v, E):   # visible share of the mark at row coords (u, v) arrays
    o = np.ones_like(u)
    for cu, cv, ru, rv in E:
        d = np.sqrt(((u - cu) / (ru * PAD * 1.22)) ** 2 + ((v - cv) / (rv * PAD * 1.22)) ** 2); o = o * (1 - np.clip((1 - d) / .18, 0, 1))
    return o
yy, xx = np.mgrid[0:S, 0:S]; xs = (xx + .5) / S; ys = (yy + .5) / S; U = xs * 1.08 - .04; V = ys * 1.165 - .3826   # square -> row units
ARTS = {}
for f in sorted(glob.glob(A + '/fx-*.png')): ARTS[os.path.basename(f)[:-4]] = np.asarray(Image.open(f).convert('RGBA'))[..., 3] > 24
CAO = {}
for n in (1, 2, 3):
    a = np.asarray(Image.open(f'{A}/scar-{n}.png').convert('RGBA'))[..., 3][:, ::-1]; ys_, xs_ = np.nonzero(a > 24); CAO[f'cao-{n}'] = ((xs_ + .5) / a.shape[1], (ys_ + .5) / a.shape[0])
def truth(r):
    t = Image.new('L', (S, S), 0); d = ImageDraw.Draw(t)
    for poly in r['p']: d.polygon([((u + .04) / 1.08 * S, (v + .3826) / 1.165 * S) for u, v in poly], fill=255, outline=255)   # eye contour polygon (grown by GAP px below)
    m = r['m']; d.ellipse([((m[0] - m[2]) + .04) / 1.08 * S, ((m[1] - m[3]) + .3826) / 1.165 * S, ((m[0] + m[2]) + .04) / 1.08 * S, ((m[1] + m[3]) + .3826) / 1.165 * S], fill=128)   # lips = ellipse inscribed in the lip box (corners of the box are not lips)
    a = np.asarray(t); e = (a == 255).astype(np.uint8)
    if GAP > 0:
        import cv2; e = cv2.dilate(e, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * GAP + 1, 2 * GAP + 1)))   # R9g: the eye truth is the contour grown by GAP px (PIL polygon width does NOT dilate)
    return e > 0, a == 128
rows = [k for k in VF if k in R and R[k]['d']]; print('pictures with a measurement', len(rows), 'of', len(VF), '; keep-fit rows', len(KF))
BADL = {}
cnt = {m: {'eye': [0, 0], 'lip': [0, 0]} for m in list(ARTS) + list(CAO)}; per_old = {}
for k in rows:
    r = R[k]; te, tl = truth(r); new_e = fit_ellipses(KF[k]) if k in KF else OLD
    box = (te | tl); ysn, xsn = np.nonzero(box); y0, y1, x0, x1 = ysn.min(), ysn.max() + 1, xsn.min(), xsn.max() + 1   # work only on the truth's bounding window
    u, v = U[y0:y1, x0:x1], V[y0:y1, x0:x1]; vo, vn = vis(u, v, OLD), vis(u, v, new_e); e, l = te[y0:y1, x0:x1], tl[y0:y1, x0:x1]
    for m, a in ARTS.items():
        a = a[y0:y1, x0:x1]
        for j, vv in enumerate((vo, vn)):
            # a pixel is visible when alpha > 24 AND the mask leaves > ~9 % (24/255) of it
            s = a & (vv > .1); he = bool((s & e).any()); hl = bool((s & l).any()); cnt[m]['eye'][j] += he; cnt[m]['lip'][j] += hl
            if j and (he or hl): BADL.setdefault(k, []).append(m + (' eye' if he else '') + (' lip' if hl else ''))
    # cào: strokes in the cheek3 box of the row (row frame), cut by the same ellipses
    for m, (fx, fy) in CAO.items():
        uu = C3[0] + fx * C3[2]; vv_ = C3[1] + fy * C3[3]
        for j, E in enumerate((OLD, new_e)):
            ok = vis(uu, vv_, E) > .1
            # truth in row units: rasterise the truth masks at the stroke points
            sx = np.clip(((uu + .04) / 1.08 * S).astype(int), 0, S - 1); sy = np.clip(((vv_ + .3826) / 1.165 * S).astype(int), 0, S - 1)
            cnt[m]['eye'][j] += bool((ok & te[sy, sx]).any()); cnt[m]['lip'][j] += bool((ok & tl[sy, sx]).any())
lines = [f'pictures scanned {len(rows)}; per mark art: pictures with any mark pixel on an eye contour / on the lips, OLD constants -> NEW keep-fit rows']
bad = 0
for m, c in cnt.items(): lines.append(f'  {m:16s} eye {c["eye"][0]:5d} -> {c["eye"][1]:5d}   lips {c["lip"][0]:5d} -> {c["lip"][1]:5d}'); bad += c['eye'][1] + c['lip'][1]
lines.append(f'TOTAL touching after: {bad}')
if '--list' in args:
    for k, v_ in list(BADL.items())[:int(args[args.index('--list') + 1])]: lines.append(f'  {k} {"(no keep-fit row)" if k not in KF else ""} {v_[:3]}')
lines.append(f'pictures with a touch after: {len(BADL)} (no keep-fit row: {sum(1 for k in BADL if k not in KF)})')
print('\n'.join(lines))
if OUT: open(OUT, 'w').write('\n'.join(lines) + '\n')
sys.exit(1 if bad else 0)
