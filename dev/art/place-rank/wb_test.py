# PLACES1 L2363/L2364 white-balance TEST (0 cr, NOT applied to the group): pull the warm/yellow cast of walls/floor toward neutral white
# like A ca sở (target mean R−B ≈ 28) while saturated object colours are kept (correction weighted by 1 − saturation).
# usage: wb_test.py IN.webp OUT.webp [target_RminusB]
import sys, numpy as np
from PIL import Image
src, out = sys.argv[1:3]; target = float(sys.argv[3]) if len(sys.argv) > 3 else 30
a = np.asarray(Image.open(src).convert('RGB')).astype(np.float32) / 255
mx, mn = a.max(2), a.min(2); sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
w = np.clip(1 - sat / 0.45, 0, 1)[..., None]          # neutral-ish pixels (walls, floor, paper, gauze) get the full shift
def rb(x): return float((x[..., 0] - x[..., 2]).mean() * 255)
lo, hi = 0.0, 2.2
for _ in range(25):                                   # find strength k so the whole picture reaches the target R−B
    k = (lo + hi) / 2; g = np.array([1 - 0.22 * k, 1 - 0.07 * k, 1 + 0.06 * k], np.float32)   # v2: mostly take red/yellow out, little blue added (v1 turned white gauze lilac)
    b = a * (1 - w) + np.clip(a * g, 0, 1) * w
    b *= a.mean() / max(b.mean(), 1e-6)                # keep mean brightness
    (lo, hi) = (k, hi) if rb(b) > target else (lo, k)
Image.fromarray((np.clip(b, 0, 1) * 255).astype(np.uint8)).save(out, 'WEBP', quality=88)
print(f'{src}: R−B {rb(a):.0f} -> {rb(b):.0f} (k={k:.2f})')
