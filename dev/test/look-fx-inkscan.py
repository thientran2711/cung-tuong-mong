#!/usr/bin/env python3
"""look-fx-inkscan.py <cache dir: veil-fit.json keep-fit.json face-fit.json pics/ art/> [--n N] [--grid] [--place a,b,k] [--out table.txt] [--list N]
INK (mực) family scan (r11, LUẬT SỬA CẢ NHÓM): the ink art fx-muc-1..3 (+ -m) is rendered exactly like the game does it (jlooks.js lkFaceImg -> lkFaceClipAll):
face square (KIT_RASH / lkSquareRect), ink placement (BAL.looks.keep.ink, NEW in r11; OLD = the art on the plain face square), keep-out ellipses (lkKeepFor + pad x1.22, opaque to 82 %,
fading out over the next 18 %), feathered face polygon (BAL.looks.keep.face + face-fit row, gaussian sigma = feather). Per picture and level it measures:
  hair  = visible ink pixels (effective alpha > .1) that are NOT face skin (skin mask = look-fx-facefit.py skin(): LAB distance to the cheek colour, features filled in) -> must be 0
  eye   = visible ink pixels within GAP (14 px of 384, the live eye pad) of the eye contour ellipse (keep-fit raw eye half-size)            -> must be 0
  area  = visible ink alpha / the art's own alpha                                                                                          -> must be >= FLOOR
Prints the OLD -> NEW table (pictures failing, by level). --grid searches the placement constants on a sample."""
import sys, os, re, json, random
import numpy as np, cv2
from PIL import Image
from scipy import ndimage as ndi
D = sys.argv[1]; a = sys.argv[2:]
opt = lambda k, d: a[a.index(k) + 1] if k in a else d
N = int(opt('--n', '0')); S = 160; GAP = 14 / 384; FLOOR = float(opt('--floor', '.45')); HAIRTOL = int(opt('--hairtol', '0'))
VF = json.load(open(D + '/veil-fit.json')); KF = json.load(open(opt('--keepfit', D + '/keep-fit.json'))); FF = json.load(open(opt('--facefit', D + '/face-fit.json')))
src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'build', 'jlooks.js'), encoding='utf-8').read()
jl = lambda x: json.loads(re.sub(r'(?<![\d])\.(\d)', r'0.\1', x))
FIT = {'eye': jl(re.search(r'fit:\{eye:(\[.*?\])', src).group(1)), 'mouth': jl(re.search(r'fit:\{eye:\[.*?\],mouth:(\[.*?\])', src).group(1))}
T = re.search(r'mouth:\[.*?\]\},mouth:(\[.*?\]),nose:(\[.*?\]),pad:([\d.]+)', src); NOSE = jl(T.group(2)); PAD = float(T.group(3))
POLY = np.array(jl(re.search(r'face:(\[\[.*?\]\])\}', src).group(1))); FEATH = float(re.search(r'keep:\{feather:([\d.]+)', src).group(1))
m = re.search(r'ink:\{at:(\[.*?\]),k:(\[.*?\]|[\d.]+),(?:rot:-?[\d.]+,)?an:(\[\[.*?\]\])', src)
PLACE_NEW = (jl(m.group(1)) + [jl(m.group(2))] + sum(jl(m.group(3)), [])) if m else None   # k = one number or [k_lv1, k_lv2, k_lv3]   # [a, b, k, an_s1, an_t1, an_s2, an_t2, an_s3, an_t3]
mb = re.search(r'ink:\{.*?box:(\[.*?\])', src); BOX = jl(mb.group(1)) if mb else None
mr = re.search(r'ink:\{.*?rot:(-?[\d.]+)', src); ROT = float(mr.group(1)) if mr else 0.
if '--rot' in a: ROT = float(opt('--rot', '0'))
if '--box' in a: BOX = [float(x) for x in opt('--box', '').split(',')]
if '--place' in a: PLACE_NEW = [float(x) for x in opt('--place', '').split(',')]
ART = {n: cv2.resize(np.asarray(Image.open(f'{D}/art/fx-muc-{n}.png').convert('RGBA'))[..., 3].astype(np.float32) / 255, (S, S), interpolation=cv2.INTER_AREA) for n in (1, 2, 3)}
yy, xx = np.mgrid[0:S, 0:S]; SS = (xx + .5) / S; TT = (yy + .5) / S; U = SS * 1.08 - .04; V = TT * 1.165 - .3826   # square -> veil-row units
def square(k):   # = look-fx-facefit.py square()
    im = np.array(Image.open(D + '/pics/' + k).convert('RGB')); H, W = im.shape[:2]; x, y, w, h, rot = VF[k]; rw, rh = w / 100 * W, h / 100 * H; sw, sh = 1.08 * rw, 1.165 * rh; cx = x / 100 * W + rw / 2; cy = y / 100 * H - .3826 * rh + sh / 2
    r = cv2.warpAffine(im, cv2.getRotationMatrix2D((cx, cy), rot, 1.0), (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)
    y0, x0 = int(cy - sh / 2), int(cx - sw / 2); pad = max(0, -y0, -x0, int(cy + sh / 2) - H, int(cx + sw / 2) - W) + 2
    r = cv2.copyMakeBorder(r, pad, pad, pad, pad, cv2.BORDER_REPLICATE); c = r[y0 + pad:int(cy + sh / 2) + pad, x0 + pad:int(cx + sw / 2) + pad]
    return cv2.resize(c, (S, S))
def skin(sq):    # = look-fx-facefit.py skin()
    lab = cv2.cvtColor(sq, cv2.COLOR_RGB2LAB).astype(np.float32); A_ = lab[int(.55 * S):int(.66 * S), int(.2 * S):int(.4 * S)].reshape(-1, 3); B_ = lab[int(.55 * S):int(.66 * S), int(.6 * S):int(.8 * S)].reshape(-1, 3)
    d = np.linalg.norm(lab - np.median(np.vstack([A_, B_]), 0), axis=2); sk = (d < 28).astype(np.uint8); c = cv2.morphologyEx(sk, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (11, 11))); c = ndi.binary_fill_holes(c); l2, n = ndi.label(c); l = l2[int(.62 * S), int(.5 * S)]
    return (l2 == l) if l > 0 else c > 0
def keep(r):     # = lkKeepFor
    q = lambda x: x / 1000; ex = q(r[4]) * FIT['eye'][0] + FIT['eye'][1]; ey = q(r[5]) * FIT['eye'][2] + FIT['eye'][3]
    return [[q(r[0]), q(r[1]), ex, ey], [q(r[2]), q(r[3]), ex, ey], [q(r[6]), q(r[7]), q(r[8]) * FIT['mouth'][0] + FIT['mouth'][1], q(r[9]) * FIT['mouth'][2] + FIT['mouth'][3]], [q(r[10]), q(r[11]), NOSE[2], NOSE[3]]]
def keepvis(E):  # = lkKeepCss (square layer); for a moved layer the game maps the same ellipses into the layer box, which is the same picture-space mask
    o = np.ones((S, S), np.float32)
    for cu, cv, ru, rv in E:
        d = np.sqrt(((U - cu) / (ru * PAD * 1.22)) ** 2 + ((V - cv) / (rv * PAD * 1.22)) ** 2); o *= np.clip((d - .82) / .18, 0, 1)
    return o
def facemask(k):  # = lkFacePts + lkClipFor (blurred polygon)
    ff = FF.get(k, [0, 0, 1, 1]); Q = np.stack([(POLY[:, 0] - .5) * ff[2] + .5 + ff[0], (POLY[:, 1] - .55) * ff[3] + .55 + ff[1]], 1)
    m = np.zeros((S, S), np.float32); cv2.fillPoly(m, [(Q * S).astype(np.int32)], 1.0); sig = FEATH / (1.165 * VF[k][3] / 100) * S
    return cv2.GaussianBlur(m, (0, 0), sig) if sig > .3 else m
def eyetruth(r):
    q = lambda x: x / 1000; t = np.zeros((S, S), bool)
    for cu, cv in ((q(r[0]), q(r[1])), (q(r[2]), q(r[3]))):
        t |= (((U - cu) / (q(r[4]) + GAP * 1.08)) ** 2 + ((V - cv) / (q(r[5]) + GAP * 1.165)) ** 2) <= 1   # eye contour half-size + the 14 px pad
    return t
def mirrored(k):  # = lkMirror
    s = SCAR.get(k); v = VF.get(k); return bool(s and v and s[0] + s[2] / 2 > v[0] + v[2] / 2 + 1)
SCAR = json.load(open(D + '/scar-fit.json')) if os.path.exists(D + '/scar-fit.json') else {}
def kof(P, n, r=None):   # the level's k (BAL ink.k number or per-level list) x the picture's k scale (override item 15)
    k_ = P[2][n - 1] if isinstance(P[2], list) else P[2]
    return k_ * (r[14] / 1000 if r is not None and P is PLACE_NEW and len(r) >= 15 else 1)
def placed(n, r, P, mir):   # the art under placement P = [a, b, k, an_s, an_t]; None = OLD (plain face square)
    art = ART[n]
    if P is not None and BOX:   # BAL.looks.keep.ink.box: the main stroke only (lv3 splash near the chin dropped), = clip-path inset() on the layer
        x0, y0, x1, y1 = BOX; art = art * ((SS >= x0) & (SS <= x1) & (TT >= y0) & (TT <= y1))
    art = art[:, ::-1] if mir else art
    if P is None: return art
    a_, b_ = P[:2]; k_ = kof(P, n); rot_ = ROT
    if len(r) >= 14 and P is PLACE_NEW:   # per-picture ink override (keep-fit row items 13-16: a, b x1000, k scale x1000, rot x10 deg), = lkInkBox
        a_, b_ = r[12] / 1000, r[13] / 1000
        if len(r) >= 15: k_ *= r[14] / 1000
        if len(r) >= 16: rot_ = r[15] / 10
    an_s, an_t = (P[3 + 2 * (n - 1)], P[4 + 2 * (n - 1)]) if len(P) >= 9 else (P[3], P[4]); E = keep(r); e = E[1] if mir else E[0]
    se = (e[0] + .04) / 1.08; te = (e[1] + .3826) / 1.165; ex = e[2] / 1.08; ey = e[3] / 1.165
    Ts = se + a_ * ex if mir else se - a_ * ex; Tt = te + b_ * ey; ans = 1 - an_s if mir else an_s
    # layer box scaled by k about the art's anchor, anchor moved onto the target: art px (s0,t0) -> (Ts + k (s0 - ans), Tt + k (t0 - an_t))
    rt = np.deg2rad(-rot_ if mir else rot_); c_, n_ = np.cos(rt), np.sin(rt); X_ = (SS - Ts) / k_; Y_ = (TT - Tt) / k_   # extra rotation about the head point (BAL ink.rot, deg; - = lifts the tail)
    s0 = ans + X_ * c_ + Y_ * n_; t0 = an_t - X_ * n_ + Y_ * c_
    return cv2.remap(art, (s0 * S - .5).astype(np.float32), (t0 * S - .5).astype(np.float32), cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT, borderValue=0)
_C = {}
def measure(k, P_list):
    r = KF[k]
    if _C.get('k') != k: sq = square(k); _C.update(k=k, v=(skin(sq), facemask(k), keepvis(keep(r)), eyetruth(r), mirrored(k)))   # per-picture masks cached (the --fit search calls this ~500 times per picture)
    sk, fm, kv, et, mir = _C["v"]; fm = 1.0 if os.environ.get("NOFACE") else fm; out = []
    for P in P_list:
        res = []
        for n in (1, 2, 3):
            art = placed(n, r, P, mir); vis = art * fm * kv; on = vis > .1
            low = 0 if os.environ.get("NOLIP") else (on & (V > r[7] / 1000 - 2 * r[9] / 1000)).sum()   # r11 LOOK: ink down at the lip line reads as a moustache next to the lips -> counted with 'eye' (a face-feature fail)
            res.append(((on & ~sk).sum(), (on & et).sum() + low, vis.sum() / max(ART[n][(TT >= .33) & (TT <= .64) & (SS <= .37)].sum() * (kof(P, n, r) ** 2 if P is not None else 1), 1e-6)))   # share of the PLACED stroke (scaled by k) that stays visible   # area vs the main stroke's own alpha
        out.append(res)
    return out
keys = sorted(k for k in VF if k in KF and os.path.exists(D + '/pics/' + k))
if N: random.seed(7); keys = random.sample(keys, min(N, len(keys)))
if '--only' in a: keys = [k for k in keys if re.search(opt('--only', ''), k)]
if '--dbg' in a:
    out = opt('--dbg', '/tmp/x'); os.makedirs(out, exist_ok=True)
    for k in keys:
        r = KF[k]; sq = square(k); sk = skin(sq); fm = facemask(k); kv = keepvis(keep(r)); et = eyetruth(r); mir = mirrored(k); tiles = []
        for P in ([None, PLACE_NEW] if PLACE_NEW else [None]):
            for n in (1, 2, 3):
                vis = placed(n, r, P, mir) * fm * kv; t = sq.astype(np.float32) * (1 - .85 * vis[..., None]); t = t.astype(np.uint8).copy()
                cs, _ = cv2.findContours(sk.astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE); cv2.drawContours(t, cs, -1, (0, 200, 0), 1)
                ce, _ = cv2.findContours(et.astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE); cv2.drawContours(t, ce, -1, (0, 120, 255), 1)
                t[(vis > .1) & ~sk] = (255, 0, 0); tiles.append(cv2.resize(t, (S * 2, S * 2), interpolation=cv2.INTER_NEAREST))
        Image.fromarray(np.hstack(tiles)).save(f'{out}/{k[:-5]}.png')
    sys.exit(0)
if '--fit' in a:   # per-picture ink override for every picture that fails with the BAL constants: keep-fit row += [a, b x1000, k scale x1000, rot x10] (data only, written to --fit <out keep-fit.json>)
    GA = [0, .25, .5, .75, 1.0, 1.25]; GB = [1.1, 1.3, 1.5, 1.7, 1.9, 2.1]; GKS = [.75, .87, 1.0, 1.1]; GR = [-45, -30, -15, 0]; out = dict(KF); nfix = nbetter = nclean = 0
    ARTA = [ART[n][(TT >= .33) & (TT <= .64) & (SS <= .37)].sum() for n in (1, 2, 3)]
    def bad(res, ks=1.):
        vis = [ar * ARTA[n] * (kof(PLACE_NEW, n + 1) * ks) ** 2 for n, (h, e_, ar) in enumerate(res)]
        return sum(1000 * (h > HAIRTOL) + 1000 * (e_ > 0) + 10 * (ar < FLOOR) - ar for h, e_, ar in res) + 1000 * (not vis[0] < vis[1] < vis[2])
    for k in keys:
        r = list(KF[k][:12]); KF[k] = r
        try: base = measure(k, [PLACE_NEW])[0]
        except Exception as e: continue
        b0 = bad(base)
        if b0 < 0: out[k] = r; continue
        nfix += 1; best = (b0, None)
        for ga in GA:
            for gb in GB:
                for ks in GKS:
                    for gr in GR:
                        KF[k] = r + [round(ga * 1000), round(gb * 1000), round(ks * 1000), round(gr * 10)]
                        try: res = measure(k, [PLACE_NEW])[0]
                        except Exception: continue
                        bb = bad(res, ks)
                        if bb < best[0]: best = (bb, list(KF[k]))
        KF[k] = r
        if best[1]: out[k] = best[1]; nbetter += 1; nclean += best[0] < 0
        else: out[k] = r
    json.dump(out, open(opt('--fit', ''), 'w'), separators=(',', ':')); print('failing with BAL constants', nfix, 'better with a per-picture override', nbetter, 'of them clean', nclean); sys.exit(0)
if '--grid' in a:   # per level: best [a, b, k] x rot for each level separately (lv3 is the longest stroke)
    AN = [.086, .507, .042, .443, 0, .407]; RS = eval(opt('--gr', '(%s,)' % ROT))
    G = [[a_, b_, k_] + AN for a_ in eval(opt('--ga', '(0,.3,.6,.9)')) for b_ in eval(opt('--gb', '(1.1,1.3,1.5)')) for k_ in eval(opt('--gk', '(.8,.9,1.0)'))]
    GR = [(g, r_) for r_ in RS for g in G]; sc = np.zeros((len(GR), 3)); det = np.zeros((len(GR), 3, 3), int); ROT0 = ROT
    for i, k in enumerate(keys):
        for r_ in RS:
            ROT = r_
            try: M = measure(k, G)
            except Exception as e: continue
            for j, res in enumerate(M):
                jj = RS.index(r_) * len(G) + j
                for lv, (h, e_, ar) in enumerate(res): det[jj, lv] += [h > HAIRTOL, e_ > 0, ar < FLOOR]; sc[jj, lv] += (h > HAIRTOL) + (e_ > 0) + (ar < FLOOR) - .05 * ar
    for lv in range(3):
        for jj in np.argsort(sc[:, lv])[:5]: print('lv%d' % (lv + 1), 'place', GR[jj][0][:3], 'rot', GR[jj][1], 'fails hair/eye/area', list(det[jj, lv]), 'score %.1f' % sc[jj, lv])
    sys.exit(0)
P_list = [None, PLACE_NEW] if PLACE_NEW else [None]
ARTA = [ART[n][(TT >= .33) & (TT <= .64) & (SS <= .37)].sum() for n in (1, 2, 3)]; LAD = [0 for _ in P_list]
cnt = [[[0, 0, 0, 0] for _ in range(3)] for _ in P_list]; AR = [[[] for _ in range(3)] for _ in P_list]; BAD = {}; n_ok = 0
for i, k in enumerate(keys):
    try: M = measure(k, P_list)
    except Exception as e: print('skip', k, e); continue
    n_ok += 1
    for j, res in enumerate(M):
        Pj = P_list[j]; vis = [ar * ARTA[n] * (kof(Pj, n + 1, KF[k]) ** 2 if Pj is not None else 1) for n, (h, e_, ar) in enumerate(res)]
        if not vis[0] < vis[1] < vis[2]: LAD[j] += 1   # level ladder: visible ink lv1 < lv2 < lv3 on the same picture
        for lv, (h, e_, ar) in enumerate(res):
            c = cnt[j][lv]; c[0] += h > HAIRTOL; c[1] += e_ > 0; c[2] += ar < FLOOR; c[3] += (h > HAIRTOL) or (e_ > 0) or (ar < FLOOR); AR[j][lv].append(ar)
            if j == len(P_list) - 1 and ((h > HAIRTOL) or e_ or ar < FLOOR): BAD.setdefault(k, []).append(f'lv{lv+1} hair {h} eye {e_} area {ar:.2f}')
L = [f'INK scan: {n_ok} pictures (por + fig), S={S}px square, hair tol {HAIRTOL} px, eye gap 14/384, area floor {FLOOR}; NEW placement {PLACE_NEW}',
     'level | OLD hair / eye / area<floor / any | NEW hair / eye / area<floor / any | area median OLD -> NEW (p10)']
for lv in range(3):
    o = cnt[0][lv]; nw = cnt[-1][lv]
    L.append(f'muc lv{lv+1} | {o[0]:5d} {o[1]:5d} {o[2]:5d} {o[3]:5d} | {nw[0]:5d} {nw[1]:5d} {nw[2]:5d} {nw[3]:5d} | {np.median(AR[0][lv]):.2f} ({np.percentile(AR[0][lv],10):.2f}) -> {np.median(AR[-1][lv]):.2f} ({np.percentile(AR[-1][lv],10):.2f})')
L.append(f'level ladder broken (visible ink not lv1 < lv2 < lv3): OLD {LAD[0]} -> NEW {LAD[-1]}')
L.append(f'pictures with any NEW fail: {len(BAD)}')
if '--list' in a:
    for k, v in list(BAD.items())[:int(opt('--list', '10'))]: L.append(f'  {k} {v}')
print('\n'.join(L))
if '--out' in a: open(opt('--out', ''), 'w').write('\n'.join(L) + '\n')
