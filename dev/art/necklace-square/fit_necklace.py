#!/usr/bin/env python3
"""EAR3: fit the EXISTING EAR2 necklace (sprites/necklace_src.png, gen Lw8dkBzswO -> cut cpSLnHG0eP) onto s62 OPEN-SQUARE-neckline
pictures (t1 Đáp ứng xSBeugTjfW, t2 covuong2 8ai9BR2IrU). 0 credits: no new painting, no SAM; skin mask by colour inside a hand-drawn
polygon of the square opening. The chain is re-laid along a hand-placed curve on her neck base (inverse strip warp by arc length,
true scale -> pearls stay round), pendant pasted at the same scale hanging straight down, contact shadow, everything clipped to skin.
usage: python3 fit_necklace.py  -> out/<id>_base.webp, out/<id>_neck.png (overlay, cropped), out/fit.json
"""
import os, json
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
D = os.path.dirname(os.path.abspath(__file__)); R = os.path.join(D, '..', '..', 'handover', 'review-sheets', 'rank8-s62')
SPR = os.path.join(D, '..', 'earring-test', 'sprites', 'necklace_src.png')
FIGS = json.load(open(os.path.join(D, 'fit_params.json')))
SS = 3                                    # supersampling
src = np.array(Image.open(SPR).convert('RGBA')).astype(float) / 255   # 995x949
PB = (448, 745, 552, 949)                 # pendant box (same as make_jewelry.py)
chain = src.copy(); chain[PB[1]:PB[3], PB[0]:PB[2]] = 0
pend = src[PB[1]:PB[3], PB[0]:PB[2]].copy()
H0, W0 = chain.shape[:2]


def centerline(side):
    """chain centre line of one half, polar around C, ordered from the pendant outward."""
    C = np.array([497.0, -120.0]); a = chain[..., 3]
    ys, xs = np.nonzero(a > 0.5)
    m = (xs < 497) if side == 'L' else (xs > 497)
    xs, ys = xs[m], ys[m]
    ang = np.degrees(np.arctan2(ys - C[1], xs - C[0])); r = np.hypot(xs - C[0], ys - C[1])
    bins = np.arange(ang.min(), ang.max(), 0.4); pts = []
    for b0 in bins:
        k = (ang >= b0) & (ang < b0 + 0.4)
        if k.sum() < 3: continue
        rr = np.median(r[k]); t = np.radians(b0 + 0.2); pts.append(C + rr * np.array([np.cos(t), np.sin(t)]))
    P = np.array(pts)
    P = P[np.argsort(-P[:, 1])]           # from the bottom (pendant) up
    k = np.ones(9) / 9; P = np.stack([np.convolve(np.pad(P[:, i], 4, mode='edge'), k, 'valid') for i in (0, 1)], 1)
    return P


def resample(P, step):
    d = np.r_[0, np.cumsum(np.hypot(*np.diff(P, axis=0).T))]
    s = np.arange(0, d[-1], step)
    Q = np.stack([np.interp(s, d, P[:, 0]), np.interp(s, d, P[:, 1])], 1)
    T = np.gradient(Q, axis=0); T /= np.linalg.norm(T, axis=1, keepdims=True) + 1e-9
    N = np.stack([-T[:, 1], T[:, 0]], 1)
    return Q, N, s


def catmull(pts, n=60):
    P = np.array(pts, float); P = np.vstack([P[0], P, P[-1]]); out = []
    for i in range(1, len(P) - 2):
        p0, p1, p2, p3 = P[i - 1], P[i], P[i + 1], P[i + 2]
        for t in np.linspace(0, 1, n, endpoint=False):
            out.append(0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t ** 3))
    out.append(P[-2]); return np.array(out)


def bilinear(img, x, y):
    h, w = img.shape[:2]; x0 = np.clip(np.floor(x).astype(int), 0, w - 2); y0 = np.clip(np.floor(y).astype(int), 0, h - 2)
    fx = np.clip(x - x0, 0, 1)[..., None]; fy = np.clip(y - y0, 0, 1)[..., None]
    pm = img.copy(); pm[..., :3] *= pm[..., 3:]                       # premultiplied
    v = (pm[y0, x0] * (1 - fx) * (1 - fy) + pm[y0, x0 + 1] * fx * (1 - fy) + pm[y0 + 1, x0] * (1 - fx) * fy + pm[y0 + 1, x0 + 1] * fx * fy)
    ok = ((x >= 0) & (x < w - 1) & (y >= 0) & (y < h - 1))[..., None]
    return v * ok


SRC_L, SRC_R = centerline('L'), centerline('R')
out_json = {}
os.makedirs(os.path.join(D, 'out'), exist_ok=True)
for fid, P in FIGS.items():
    fig = Image.open(os.path.join(R, P['file'])).convert('RGB'); W, H = fig.size
    k = P['scale']; cx, cy = P['pendant']                # pendant attach point (top centre of the gold flower)
    x0, y0, x1, y1 = P['box']                             # work box in the figure
    bw, bh = (x1 - x0) * SS, (y1 - y0) * SS
    gy, gx = np.mgrid[0:bh, 0:bw]; tx = x0 + (gx + 0.5) / SS; ty = y0 + (gy + 0.5) / SS
    acc = np.zeros((bh, bw, 4)); best = np.full((bh, bw), 1e9)
    for side, S in (('L', SRC_L), ('R', SRC_R)):
        Qs, Ns, ss = resample(S, 0.5)
        Qt, Nt, st = resample(catmull(P['curve' + side]), 0.5 / 4)
        # source starts where the chain meets the flower; target starts at the flower edge
        s0 = ss[np.argmin(np.hypot(Qs[:, 0] - (448 if side == 'L' else 552), Qs[:, 1] - 752))]
        hw = 22                                            # source half width (pearl radius ~14 + margin)
        # nearest target polyline point for every pixel (coarse to keep memory small)
        sub = Qt[::2]; subs = st[::2]; subN = Nt[::2]
        bestd = np.full((bh, bw), 1e9); bi = np.zeros((bh, bw), int)
        for j in range(0, len(sub), 64):
            dx = tx[..., None] - sub[None, None, j:j + 64, 0]; dy = ty[..., None] - sub[None, None, j:j + 64, 1]
            d = dx * dx + dy * dy; a = d.argmin(-1); dm = np.take_along_axis(d, a[..., None], -1)[..., 0]
            u = dm < bestd; bestd[u] = dm[u]; bi[u] = a[u] + j
        Pn = sub[bi]; Nn = subN[bi]; s_t = subs[bi]
        n = (tx - Pn[..., 0]) * Nn[..., 0] + (ty - Pn[..., 1]) * Nn[..., 1]
        ssrc = s0 + s_t / k; nsrc = n / k
        sidx = np.clip(np.searchsorted(ss, ssrc), 0, len(ss) - 1)
        sx = Qs[sidx, 0] + nsrc * Ns[sidx, 0]; sy = Qs[sidx, 1] + nsrc * Ns[sidx, 1]
        v = bilinear(chain, sx, sy) * np.clip((st[-1] - s_t) / 3.5, 0, 1)[..., None]   # tip fades where it turns behind the neck
        valid = ((np.abs(nsrc) < hw) & (ssrc < ss[-1]) & (bestd < best) & (np.sqrt(bestd) <= np.abs(n) + 0.35))[..., None]
        acc = np.where(valid, v, acc); best = np.where(valid[..., 0], bestd, best)
    # pendant at the same scale, hanging straight down from (cx, cy)
    pw, ph = pend.shape[1], pend.shape[0]
    px = (tx - cx) / k + 52; py = (ty - cy) / k + 6
    pv = bilinear(pend, px, py)
    acc = pv + acc * (1 - pv[..., 3:])
    L = np.clip(acc, 0, 1).reshape(y1 - y0, SS, x1 - x0, SS, 4).mean((1, 3))   # box downsample of premultiplied
    al = L[..., 3:]
    rgb = np.where(al > 0, L[..., :3] / np.maximum(al, 1e-4), 0)
    # contact shadow: offset down 1.5 px, blurred, warm dark
    sh = Image.fromarray((al[..., 0] * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(1.3))
    sh = np.roll(np.roll(np.array(sh).astype(float) / 255, 2, 0), 1, 1) * P.get('shadow', 0.42)
    # skin clip inside the opening polygon
    pm = Image.new('L', (W, H)); ImageDraw.Draw(pm).polygon([tuple(p) for p in P['opening']], fill=255)
    pm = np.array(pm.crop((x0, y0, x1, y1))).astype(float) / 255
    f = np.array(fig.crop((x0, y0, x1, y1))).astype(float)
    r, g, b = f[..., 0], f[..., 1], f[..., 2]; Lum = 0.3 * r + 0.59 * g + 0.11 * b
    skin = np.clip((r - b - 6) / 10, 0, 1) * np.clip((Lum - 150) / 25, 0, 1) * np.clip((r - g + 2) / 8, 0, 1)
    skin = np.array(Image.fromarray((skin * pm * 255).astype('uint8')).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))).astype(float) / 255
    a_item = al[..., 0] * skin; a_sh = sh * skin * (1 - a_item)
    shc = np.array([92, 52, 44], float) / 255
    outa = a_item + a_sh
    outc = (rgb * a_item[..., None] + shc * a_sh[..., None]) / np.maximum(outa, 1e-4)[..., None]
    o = np.dstack([outc * 255, outa * 255]).clip(0, 255).astype('uint8')
    Image.fromarray(o, 'RGBA').save(os.path.join(D, 'out', f'{fid}_neck.png'))
    Image.fromarray((skin * 255).astype('uint8')).save(os.path.join(D, 'out', f'{fid}_skinmask.png'))
    fig.save(os.path.join(D, 'out', f'{fid}_base.webp'), quality=90, method=6)
    out_json[fid] = {'base': f'{fid}_base.webp', 'neck': f'{fid}_neck.png', 'x': x0, 'y': y0, 'w': x1 - x0, 'h': y1 - y0,
                     'label': P['label'], 'gen': P['gen'], 'zoom': P['zoom']}
json.dump(out_json, open(os.path.join(D, 'out', 'fit.json'), 'w'), ensure_ascii=False, indent=1)
print('ok', list(out_json))
