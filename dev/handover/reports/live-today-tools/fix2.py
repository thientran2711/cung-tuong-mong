"""fix2.py IN OUT: floor-stain removal. In the feet band (bottom BAND of the figure box) alpha *= ramp(person-prob from MediaPipe multiclass
segmenter, measured on the 900-scale fig) — stain = 'background' class. Above the band nothing changes; band top is ramped over 12 px."""
import sys, numpy as np
from PIL import Image
sys.path.insert(0, "/home/user/wt/sh"); import seg
BAND = float(__import__("os").environ.get("BAND", ".08"))
def fix(im, ref=None):
    ref = ref or im; p = seg.person_prob(ref, float(__import__("os").environ.get("FRAC", ".35")))                     # prob on the fig (900) scale
    P = np.asarray(Image.fromarray((p * 255).astype("uint8")).resize(im.size, Image.BILINEAR)) / 255
    a = np.asarray(im)[..., 3].astype(float); H = a.shape[0]
    ys = np.nonzero((a >= 230).any(1))[0]; top, bot = ys.min(), ys.max(); y0 = bot - (bot - top) * BAND
    LO = float(__import__("os").environ.get("LO", ".25")); keep = np.clip((P - LO) / .35, 0, 1)
    yy = np.arange(H)[:, None]; w = np.clip((yy - y0) / (12 * H / 900), 0, 1)      # 0 above band, 1 inside
    k = 1 - w * (1 - keep); x = np.array(im); x[..., 3] = (a * k).round().astype("uint8")
    x[..., 3][x[..., 3] < 8] = 0
    return Image.fromarray(x), int(((a > 0) & (x[..., 3] < a * .5)).sum())
if __name__ == "__main__":
    src = Image.open(sys.argv[1]).convert("RGBA"); ref = Image.open(sys.argv[3]).convert("RGBA").resize(src.size) if len(sys.argv) > 3 else None
    im, n = fix(src, ref); im.save(sys.argv[2], "WEBP", quality=90 if im.height > 1000 else 88, method=6); print("fix2", n, sys.argv[2])
