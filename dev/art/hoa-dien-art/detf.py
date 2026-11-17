# detf.py (hoa-dien-art): final detector = locate the mark with det3_v3b (dE clusters) or, if none, det3_v5 (colour clusters);
# then the owner-approved box method: box = core box + 0.045 fw; skin = 2nd-order fit on the box ring; mask = dE > 7 inside the box,
# hair/brow-looking pixels (darker, uncoloured) excluded, components touching the core kept, dilated 2 px; fill = harmonic (det3.remove).
import os, numpy as np, cv2
import det3_v3b as A, det3_v5 as B
from det3 import remove, _fit, _ev

def boxmask(rgb, core_box, fw, th=7.0):
    H, W = rgb.shape[:2]; m = 0.045 * fw; r = int(round(0.25 * fw))
    bx0, by0, bx1, by1 = core_box
    x0, y0, x1, y1 = int(max(bx0 - m, 0)), int(max(by0 - m, 0)), int(min(bx1 + m, W)), int(min(by1 + 2.2 * m, H))
    X0, Y0, X1, Y1 = max(x0 - r, 0), max(y0 - r, 0), min(x1 + r, W), min(y1 + r, H)
    lab = cv2.cvtColor(np.ascontiguousarray(rgb[Y0:Y1, X0:X1]), cv2.COLOR_RGB2LAB).astype(np.float32); h, w = lab.shape[:2]
    inb = np.zeros((h, w), bool); inb[y0 - Y0:y1 - Y0, x0 - X0:x1 - X0] = True
    near = np.zeros((h, w), bool); k = int(0.07 * fw) + 2
    near[max(y0 - Y0 - k, 0):y1 - Y0 + k, max(x0 - X0 - k, 0):x1 - X0 + k] = True
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32); xn, yn = xx / w, yy / h
    L = lab[..., 0]; ring = near & ~inb & (L > np.percentile(L[near & ~inb], 30))
    keep = ring.copy(); fit = np.zeros_like(lab)
    for it in range(3):
        if keep.sum() < 20: return None
        for c in range(3):
            co = _fit(xn[keep], yn[keep], lab[..., c][keep]); fit[..., c] = _ev(co, xn.ravel(), yn.ravel()).reshape(h, w)
        res = np.sqrt(((lab - fit) ** 2).sum(-1)); s = np.std(res[keep]); keep = ring & (res < max(4, 2.5 * s))
    rc = np.median(lab[keep], 0) if keep.any() else np.array([0, 128, 128])
    if not (rc[0] > 120 and 128 < rc[1] < 160 and 125 < rc[2] < 165): return None      # ring must be skin
    dE = np.sqrt(((lab - fit) ** 2).sum(-1)); dC = np.hypot(lab[..., 1] - fit[..., 1], lab[..., 2] - fit[..., 2])
    # brow / hair protection on the WIDE region: darker + uncoloured strokes that are long, big or leave the wide region
    hl = (L - fit[..., 0] < -14) & (dC < 12)
    hl = cv2.morphologyEx(hl.astype(np.uint8), cv2.MORPH_OPEN, np.ones((2, 2), np.uint8)).astype(bool)
    prot = np.zeros((h, w), bool); n, lb, st, _ = cv2.connectedComponentsWithStats(hl.astype(np.uint8))
    for i in range(1, n):
        x, y, ww, hh, ar = st[i]
        if ar > 0.012 * fw * fw or ww > 0.12 * fw or (ww > 2.2 * hh and ww > 0.06 * fw) or x == 0 or y == 0 or x + ww >= w or y + hh >= h:
            prot |= lb == i
    prot = cv2.dilate(prot.astype(np.uint8), np.ones((5, 5), np.uint8)).astype(bool)
    mk = (dE > th) & inb & ~prot
    core = np.zeros((h, w), bool); core[by0 - Y0:by1 - Y0, bx0 - X0:bx1 - X0] = True
    if (core & (dE > th) & ~prot).sum() < 6: return None                  # the "mark" was a brow / hair
    n, lb = cv2.connectedComponents(mk.astype(np.uint8))
    ids = set(np.unique(lb[core & mk]).tolist()) - {0}
    for j in range(1, n):          # pendant specks / loose parts of the motif: coloured, small
        if j in ids: continue
        pj = lb == j
        if pj.sum() <= 40 and dC[pj].mean() > 8: ids.add(j)
    mk = np.isin(lb, list(ids))
    mk = cv2.dilate(mk.astype(np.uint8), np.ones((5, 5), np.uint8)).astype(bool) & inb & ~prot
    full = np.zeros((H, W), bool); full[Y0:Y1, X0:X1] = mk
    return full

def _ok(rgb, d, ey, fw):
    # brow guard: the mark sits on the forehead above the brows, and is coloured/bright, never dark-brown like a brow
    if d['anchor'][1] > ey - 0.15 * fw or d['box'][3] > ey - 0.04 * fw: return False
    bw, bh = d['box'][2] - d['box'][0], d['box'][3] - d['box'][1]
    if bw > 3.0 * max(bh, 1): return False                 # long flat stroke = brow / hair edge
    x0, y0, x1, y1 = d['box']; p = cv2.cvtColor(np.ascontiguousarray(rgb[y0:y1, x0:x1]), cv2.COLOR_RGB2LAB).astype(np.float32)
    chroma = np.hypot(p[..., 1] - 128, p[..., 2] - 128)
    return float(np.percentile(chroma, 90)) > 22 or float(np.percentile(p[..., 0], 90)) > 215

def detect(rgb, cx, ey, fw, **kw):
    d = A.detect(rgb, cx, ey, fw, **kw); how = 'v3'
    if d is not None and not _ok(rgb, d, ey, fw): d = None
    if d is None:
        d = B.detect(rgb, cx, ey, fw, **kw); how = 'v5'
        if d is not None and not _ok(rgb, d, ey, fw): d = None
    if d is None: return None
    m = boxmask(rgb, d['box'], fw)
    if m is None or not m.any(): return None
    d['mask'] = m; d['how'] = how
    return d
