#!/usr/bin/env python3
"""shadow.py: floor shadow / ground stain under a figure = semi-transparent pixels in the feet band that are NOT attached to the solid figure.
clean(im): alpha -> 0 for pixels with alpha < LOW that lie farther than R px (at 900-tall scale) from solid (alpha >= SOLID), only in the bottom BAND of the figure box.
usage: shadow.py scan FILE...   |  shadow.py fix IN OUT"""
import sys, numpy as np
from PIL import Image
from scipy import ndimage as ndi
LOW, SOLID, BAND, R = 200, 230, .14, 3
def mask(im):
    a = np.asarray(im)[..., 3].astype(int); H = a.shape[0]; k = H / 900
    ys = np.nonzero((a >= SOLID).any(1))[0]; top, bot = ys.min(), ys.max()
    y0 = int(bot - (bot - top) * BAND)
    solid = a >= SOLID
    near = ndi.binary_dilation(solid, iterations=max(1, round(R * k)))
    m = (a > 0) & (a < LOW) & ~near; m[:y0] = False
    return m, a
def score(im):
    m, a = mask(im); k = (im.height / 900) ** 2
    return int(m.sum() / k), float((a[m]).sum() / 255 / k)
def fix(im):
    m, _ = mask(im); x = np.array(im); x[..., 3][m] = 0; return Image.fromarray(x), int(m.sum())
if __name__ == "__main__":
    if sys.argv[1] == "scan":
        for f in sys.argv[2:]:
            n, w = score(Image.open(f).convert("RGBA")); print(f"{n:6d} {w:8.1f} {f}")
    else:
        im, n = fix(Image.open(sys.argv[2]).convert("RGBA")); im.save(sys.argv[3], "WEBP", quality=90 if im.height > 1000 else 88, method=6); print("fixed", n, sys.argv[3])
