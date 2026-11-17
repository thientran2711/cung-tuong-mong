# det3.py (hoa-dien-art): find + remove the painted forehead mark, brow/hair safe.
# detect(rgb, cx, ey, fw) -> dict(mask=bool full-image removal mask, box, peak, area, anchor) or None (no mark)
#   cx = face centre x, ey = eye line y, fw = haar face width (portrait scale ~130 px).
# remove(rgba, d) -> RGBA with the mask refilled from surrounding skin (Telea + matched grain); nothing outside the mask changes.
import numpy as np, cv2, os
MINPEAK = float(os.environ.get('MINPEAK', 20))

def _fit(xs, ys, v):
    A = np.stack([np.ones_like(xs), xs, ys, xs * xs, xs * ys, ys * ys], 1); return np.linalg.lstsq(A, v, rcond=None)[0]

def _ev(c, xs, ys):
    return np.stack([np.ones_like(xs), xs, ys, xs * xs, xs * ys, ys * ys], 1) @ c

def detect(rgb, cx, ey, fw, zone=None, th=None, expect=None):
    H, W = rgb.shape[:2]
    if zone is None:
        zone = (cx - 0.28 * fw, ey - 0.62 * fw, cx + 0.28 * fw, ey - 0.06 * fw)
    x0, y0, x1, y1 = [int(round(v)) for v in zone]
    x0, y0 = max(x0, 0), max(y0, 0); x1, y1 = min(x1, W), min(y1, H)
    reg = rgb[y0:y1, x0:x1].astype(np.float32); h, w = reg.shape[:2]
    lab = cv2.cvtColor(rgb[y0:y1, x0:x1], cv2.COLOR_RGB2LAB).astype(np.float32)
    L, a, b = lab[..., 0], lab[..., 1] - 128, lab[..., 2] - 128
    # skin pixels: bright, low-moderate chroma; robust 2nd-order fit per Lab channel
    Ls = np.percentile(L, 75)
    skin = (L > 0.82 * Ls)
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32); xn, yn = xx / max(w, 1), yy / max(h, 1)
    keep = skin.copy(); fit = np.zeros_like(lab)
    for it in range(4):
        if keep.sum() < 40: return None
        for c in range(3):
            co = _fit(xn[keep], yn[keep], lab[..., c][keep]); fit[..., c] = _ev(co, xn.ravel(), yn.ravel()).reshape(h, w)
        res = np.sqrt(((lab - fit) ** 2).sum(-1)); s = np.std(res[keep]); keep = skin & (res < max(4, 2.5 * s))
    dE = np.sqrt(((lab - fit) ** 2).sum(-1))
    dC = np.hypot(lab[..., 1] - fit[..., 1], lab[..., 2] - fit[..., 2])
    base = float(np.percentile(dE[keep], 99))
    # hair / brow = darker than skin and NOT strongly coloured; grows into its neighbourhood (never touched)
    dark = (L < fit[..., 0] - 28) & (dC < 14)
    dark = cv2.morphologyEx(dark.astype(np.uint8), cv2.MORPH_OPEN, np.ones((2, 2), np.uint8))
    n, lbl, st, _ = cv2.connectedComponentsWithStats(dark)
    hair = np.zeros((h, w), bool)
    for i in range(1, n):
        xx0, yy0, ww, hh, ar = st[i]
        # big dark parts or parts touching the zone edge = brow/hair
        if ar > 0.004 * fw * fw * 4 or xx0 <= 1 or yy0 <= 1 or xx0 + ww >= w - 1 or yy0 + hh >= h - 1 or ww > 0.16 * fw:
            hair |= lbl == i
    hairD = cv2.dilate(hair.astype(np.uint8), np.ones((5, 5), np.uint8)).astype(bool)
    T = th if th is not None else max(9.0, 2.0 * base)
    baseC = float(np.percentile(dC[keep], 99))
    dL = L - fit[..., 0]
    hl = (dL < -18) & (dC < 9)                          # hair / brow look: darker, not coloured -> never touched
    hlD = cv2.dilate(hl.astype(np.uint8), np.ones((3, 3), np.uint8)).astype(bool)
    colour = (dC > max(6.0, 1.6 * baseC)) & (dE > T)
    bright = (dL > 9) & (dE > T)                        # white / pale marks
    cand = (colour | bright) & ~hlD
    cand = cv2.morphologyEx(cand.astype(np.uint8), cv2.MORPH_OPEN, np.ones((2, 2), np.uint8)).astype(bool)
    g = max(3, int(0.035 * fw)) | 1
    cl = cv2.dilate(cand.astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (g, g)))
    n, lbl, st, cen = cv2.connectedComponentsWithStats(cl)
    ex, eyy = cx - x0, (ey - 0.27 * fw) - y0
    if expect is not None: ex, eyy = expect[0] - x0, expect[1] - y0
    best = None
    for i in range(1, n):
        m = (lbl == i) & cand; ar = int(m.sum())
        if ar < 6: continue
        bx, by, bw, bh, _ = st[i]
        if bw > 0.30 * fw or bh > 0.30 * fw: continue
        mx, my = cen[i]
        if abs(mx - ex) > 0.20 * fw: continue
        if bx <= 0 or bx + bw >= w or by <= 0:
            if (dC[m] > 12).mean() < 0.5: continue
        pk = float(np.percentile(dE[m], 90))
        sc = ar * pk / (1 + abs(mx - ex) / (0.05 * fw) + abs(my - eyy) / (0.15 * fw))
        if best is None or sc > best[0]: best = (sc, i, ar, pk)
    if best is None or best[3] < MINPEAK or best[2] < 10: return None
    _, i, ar, pk = best
    core = (lbl == i) & cand
    ys_, xs_ = np.nonzero(core); mgn = int(round(0.05 * fw))
    R = np.zeros((h, w), bool); R[max(ys_.min() - mgn, 0):ys_.max() + mgn + 1, max(xs_.min() - mgn, 0):xs_.max() + mgn + 1] = True
    weak = (dE > max(4.0, 1.0 * base)) & ~hl & R
    nw, lw = cv2.connectedComponents(weak.astype(np.uint8))
    touch = cv2.dilate(core.astype(np.uint8), np.ones((3, 3), np.uint8)).astype(bool)
    ids = np.unique(lw[touch & weak]); ids = ids[ids > 0]
    mk = core | np.isin(lw, ids)
    mk = cv2.dilate(mk.astype(np.uint8), np.ones((5, 5), np.uint8)).astype(bool) & ~hl & R
    hair = hl
    full = np.zeros((H, W), bool); full[y0:y1, x0:x1] = mk
    ys, xs = np.nonzero(core)
    box = (x0 + xs.min(), y0 + ys.min(), x0 + xs.max() + 1, y0 + ys.max() + 1)
    wgt = dE * core
    ax = float((wgt * (xx + x0)).sum() / wgt.sum()); ay = float((wgt * (yy + y0)).sum() / wgt.sum())
    noise = np.std((lab - fit)[keep], 0)
    return dict(mask=full, box=tuple(int(v) for v in box), peak=round(pk, 1), area=ar, base=round(base, 1), th=round(T, 1),
                anchor=(round(ax, 1), round(ay, 1)), zone=(x0, y0, x1, y1), width=round((box[2] - box[0]) / fw, 4), noise=noise)

def remove(rgba, d, seed=7, iters=int(os.environ.get("ITERS", 800))):
    """harmonic (Laplace) fill of the mask from its border, NO grain (owner-approved ROOT-8 method, 17/11 ~20:00Z)."""
    A = np.asarray(rgba.convert('RGBA')).copy()
    m = d['mask']; ys, xs = np.nonzero(m)
    pad = 3; H, W = m.shape
    X0, Y0, X1, Y1 = max(xs.min() - pad, 0), max(ys.min() - pad, 0), min(xs.max() + pad + 1, W), min(ys.max() + pad + 1, H)
    reg = A[Y0:Y1, X0:X1, :3].astype(np.float64); mm = m[Y0:Y1, X0:X1]
    f = cv2.inpaint(reg.astype(np.uint8), mm.astype(np.uint8), 3, cv2.INPAINT_TELEA).astype(np.float64)  # warm start
    for _ in range(iters):
        p = np.pad(f, ((1, 1), (1, 1), (0, 0)), mode='edge')
        avg = (p[:-2, 1:-1] + p[2:, 1:-1] + p[1:-1, :-2] + p[1:-1, 2:]) / 4
        f[mm] = avg[mm]
    out = reg.copy(); out[mm] = f[mm]
    A[Y0:Y1, X0:X1, :3] = np.clip(np.round(out), 0, 255).astype(np.uint8)
    from PIL import Image
    return Image.fromarray(A, 'RGBA'), (int(X0), int(Y0), int(X1), int(Y1))
