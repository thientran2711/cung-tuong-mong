#!/usr/bin/env python3
"""A26 digital disc recolour (0 credits): set a seal's disc to the official colour, keep the figure and the painted texture.
Mask per frame = pixels inside the medallion (r < 0.9 R of the still's circle) whose colour is close to the MEASURED disc colour (ΔE < tol)
and connected to the disc ring (flood from the 0.78–0.88 R ring) — so a robe/collar of the same hue inside the figure is not touched.
Recolour in Lab: new = official + (pixel − measured) × (1, k, k)  → keeps the brush texture/shading, moves hue + lightness.
usage: disc_recolour.py SRC.webp DST.webp KEY [--measured #RRGGBB] [--tol 25 (hue degrees)]   (still or animated webp; circle from the first/last frame)"""
import sys, json, os, numpy as np
from PIL import Image, ImageSequence
from skimage import color
from scipy import ndimage
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
from disc_measure import disc_hex
def hx(h): return np.array([int(h[i:i + 2], 16) for i in (1, 3, 5)]) / 255.0
def circle(im):
    a = np.asarray(im.convert("RGBA"))[:, :, 3] > 200; ys, xs = np.nonzero(a)
    return (xs.min() + xs.max()) / 2, (ys.min() + ys.max()) / 2, min(xs.max() - xs.min(), ys.max() - ys.min()) / 2
def recolour(fr, cx, cy, R, mlab, olab, tol, k=0.6):
    """hue mask: pixels whose Lab hue angle is within tol° of the measured disc and chroma > 40 % of the disc's, keep only the
    big connected regions (the disc; small same-hue bits in the figure are dropped), then shift in Lab keeping the texture."""
    a = np.asarray(fr.convert("RGBA")).astype(float); rgb = a[:, :, :3] / 255; al = a[:, :, 3] > 30
    lab = color.rgb2lab(rgb); hue = np.degrees(np.arctan2(lab[..., 2], lab[..., 1])); ch = np.hypot(lab[..., 1], lab[..., 2])
    mh = np.degrees(np.arctan2(mlab[2], mlab[1])); mc = np.hypot(mlab[1], mlab[2])
    dh = np.abs((hue - mh + 180) % 360 - 180)
    cand = al & (dh < tol) & (ch > 0.4 * mc) & (np.abs(lab[..., 0] - mlab[0]) < 35)
    lbl, n = ndimage.label(cand)
    if n:
        sz = ndimage.sum(cand, lbl, range(1, n + 1)); big = np.nonzero(sz > 0.15 * sz.max())[0] + 1
        keep = np.isin(lbl, big)
    else: keep = cand
    new = lab.copy(); diff = lab - mlab
    new[..., 0] = olab[0] + diff[..., 0]; new[..., 1] = olab[1] + diff[..., 1] * k; new[..., 2] = olab[2] + diff[..., 2] * k
    with np.errstate(all="ignore"):
        import warnings; warnings.simplefilter("ignore"); rc = np.clip(color.lab2rgb(new), 0, 1)
    out = rgb.copy(); out[keep] = rc[keep]
    o = np.dstack([out * 255, a[:, :, 3]]).astype(np.uint8); return Image.fromarray(o, "RGBA"), keep.mean()
if __name__ == "__main__":
    src, dst, key = sys.argv[1:4]; tol = float(sys.argv[sys.argv.index("--tol") + 1]) if "--tol" in sys.argv else 25
    off = json.load(open(f"{H}/disc_colours.json"))["colours"][key]["hex"]
    im = Image.open(src); frames = [f.copy() for f in ImageSequence.Iterator(im)]; dur = im.info.get("duration", 67); loop = im.info.get("loop", 0)
    ref = frames[-1] if "-back" in src or len(frames) == 1 else frames[0]
    meas = sys.argv[sys.argv.index("--measured") + 1] if "--measured" in sys.argv else disc_hex(ref)
    cx, cy, R = circle(ref)
    mlab = color.rgb2lab(hx(meas)[None, None])[0, 0]; olab = color.rgb2lab(hx(off)[None, None])[0, 0]
    out = []; cov = []
    for f in frames:
        o, c = recolour(f, cx, cy, R, mlab, olab, tol); out.append(o); cov.append(c)
    if len(out) == 1: out[0].save(dst, "WEBP", lossless=True)
    else: out[0].save(dst, "WEBP", save_all=True, append_images=out[1:], duration=dur, loop=loop, lossless=False, quality=90, background=(0, 0, 0, 0))
    print(dst, key, meas, "->", off, f"frames {len(out)} mask {min(cov):.2f}-{max(cov):.2f}")
