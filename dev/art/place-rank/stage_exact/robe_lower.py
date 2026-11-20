"""Owner Lượt 824 chroma test (0 gens): lower ONLY the robe chroma of a cut-out; hue and L kept; face/hair/skin untouched.
Mask: rows below the collar (soft ramp 15 %→21 % of the figure box), minus skin (ΔE to the figure's own face skin < 6 AND L > skin L − 4 protected, ramps to 10 / −8; peach robes sit ~8 L below skin).
k = max(0.55, min(1, MAIN_T / MAIN C, SEC_T / SEC C)) from robe_colour.py; a,b *= k inside the mask.
python3 robe_lower.py IN OUT [MAIN_T=14] [SEC_T=20]  -> prints k and before/after MAIN/SEC"""
import sys, json, os
import numpy as np
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from robe_colour import lab, robe
def lab2rgb(L):
    fy = (L[..., 0] + 16) / 116; fx = fy + L[..., 1] / 500; fz = fy - L[..., 2] / 200
    f = np.stack([fx, fy, fz], -1); xyz = np.where(f ** 3 > 0.008856, f ** 3, (f - 16 / 116) / 7.787) * np.array([0.95047, 1.0, 1.08883])
    M = np.linalg.inv(np.array([[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]]))
    c = xyz @ M.T; c = np.where(c > 0.0031308, 1.055 * np.clip(c, 0, None) ** (1 / 2.4) - 0.055, 12.92 * c)
    return np.clip(c * 255, 0, 255)
KMIN = 0.55  # below this warm reds turn muddy brown (first pass: s58 k .43, s60 .45)
def lower(src, dst, mt=14.0, st=20.0):
    m, s = robe(src); k = max(KMIN, min(1.0, mt / max(m['C'], 1e-6), st / max(s['C'], 1e-6)))
    im = Image.open(src).convert('RGBA'); a = np.asarray(im, float); A = a[..., 3]
    ys, xs = np.nonzero(A > 8); y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max(); h = y1 - y0
    X = lab(a[..., :3])
    # face skin: rows 6–12 % of box, central third, skin-like pixels
    fy0, fy1 = y0 + int(.06 * h), y0 + int(.12 * h); cx = (x0 + x1) // 2; wq = (x1 - x0) // 8
    F = X[fy0:fy1, cx - wq:cx + wq].reshape(-1, 3); Fa = A[fy0:fy1, cx - wq:cx + wq].reshape(-1)
    Fc = np.hypot(F[:, 1], F[:, 2]); F = F[(Fa > 250) & (F[:, 0] > 60) & (Fc > 5) & (Fc < 40)]
    skin = np.median(F, 0)
    dE = np.sqrt(((X - skin) ** 2).sum(-1)); protect = np.clip((10 - dE) / 4, 0, 1) * np.clip((X[..., 0] - (skin[0] - 8)) / 4, 0, 1)
    rows = (np.arange(a.shape[0]) - y0) / h; ramp = np.clip((rows - .15) / .06, 0, 1)[:, None]
    w = ramp * (1 - protect) * (A > 0)
    f = 1 - w * (1 - k); Y = X.copy(); Y[..., 1] *= f; Y[..., 2] *= f
    out = a.copy(); out[..., :3] = lab2rgb(Y); Image.fromarray(out.round().astype(np.uint8), 'RGBA').save(dst)
    m2, s2 = robe(dst)
    return dict(k=round(k, 2), skin=[round(v, 1) for v in skin], before=[m, s], after=[m2, s2])
if __name__ == '__main__':
    a = sys.argv[1:]; r = lower(a[0], a[1], *(float(v) for v in a[2:4])); print(os.path.basename(a[0]), json.dumps(r))
