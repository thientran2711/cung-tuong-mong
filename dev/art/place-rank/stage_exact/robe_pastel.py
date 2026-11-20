"""Owner Lượt 840 PASTEL robe lowering (0 gens): 'hạ màu tức là vẫn giữ tông màu đó nhưng cho nó pastel hơn … chứ không phải đổi sắc màu'.
Replaces robe_lower.py's a,b×k step (that kept L → orange/red went brown). Same mask + skin guard as robe_lower.py.
FORMULA (CIELAB; hue angle atan2(b,a) never changes; per pixel, w = robe mask ∈ [0,1] from robe_lower.py):
  k  = max(0.55, min(1, 14 / MAIN C, 20 / SEC C))          (robe_colour.py MAIN/SEC, same k as robe_lower)
  kc = sqrt(k)                                           chroma factor (k .55 → kc .74: a lighter colour needs less chroma cut to read soft)
  t  = 1.2 · (1 − k)                                     lightness lift (k .55 → t .54)
  g  = clip((C_px − 4)/12, 0, 1) · clip((L_px − 35)/15, 0, 1)   only coloured, not-dark pixels lift: hair, ink lines, whites stay
  a' = a · (1 − w(1 − kc)),  b' = b · (1 − w(1 − kc))
  L' = L + max(0, 88 − L) · t · g · w                    never darker; blends toward light L 88
Result s61 orange #BE755D L57 C36 → #D79B89 L70 C27 (Oklab hue 38.9° → ~39°): soft peach-orange, not brown.
python3 robe_pastel.py IN OUT [MAIN_T=14] [SEC_T=20] [LT=88] [TF=1.2] [KP=0.5]"""
import sys, json, os
import numpy as np
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from robe_colour import lab, robe
from robe_lower import lab2rgb, KMIN
def pastel(src, dst, mt=14.0, st=20.0, lt=88.0, tf=1.2, kp=0.5):
    m, s0 = robe(src); k = max(KMIN, min(1.0, mt / max(m['C'], 1e-6), st / max(s0['C'], 1e-6))); t = tf * (1 - k); kc = k ** kp
    im = Image.open(src).convert('RGBA'); a = np.asarray(im, float); A = a[..., 3]
    ys, xs = np.nonzero(A > 8); y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max(); h = y1 - y0
    X = lab(a[..., :3])
    fy0, fy1 = y0 + int(.06 * h), y0 + int(.12 * h); cx = (x0 + x1) // 2; wq = (x1 - x0) // 8
    F = X[fy0:fy1, cx - wq:cx + wq].reshape(-1, 3); Fa = A[fy0:fy1, cx - wq:cx + wq].reshape(-1)
    Fc = np.hypot(F[:, 1], F[:, 2]); F = F[(Fa > 250) & (F[:, 0] > 60) & (Fc > 5) & (Fc < 40)]
    skin = np.median(F, 0)
    dE = np.sqrt(((X - skin) ** 2).sum(-1)); protect = np.clip((10 - dE) / 4, 0, 1) * np.clip((X[..., 0] - (skin[0] - 8)) / 4, 0, 1)
    rows = (np.arange(a.shape[0]) - y0) / h; ramp = np.clip((rows - .15) / .06, 0, 1)[:, None]
    w = ramp * (1 - protect) * (A > 0)
    C = np.hypot(X[..., 1], X[..., 2]); sc = np.clip((C - 4) / 12, 0, 1) * np.clip((X[..., 0] - 35) / 15, 0, 1)
    f = 1 - w * (1 - kc); Y = X.copy(); Y[..., 1] *= f; Y[..., 2] *= f
    Y[..., 0] = X[..., 0] + np.clip(lt - X[..., 0], 0, None) * t * sc * w
    out = a.copy(); out[..., :3] = lab2rgb(Y); Image.fromarray(out.round().astype(np.uint8), 'RGBA').save(dst)
    m2, s2 = robe(dst)
    return dict(k=round(k, 2), kc=round(kc, 2), t=round(t, 3), skin=[round(v, 1) for v in skin], before=[m, s0], after=[m2, s2])
if __name__ == '__main__':
    a = sys.argv[1:]; r = pastel(a[0], a[1], *(float(v) for v in a[2:7])); print(os.path.basename(a[0]), json.dumps(r))
