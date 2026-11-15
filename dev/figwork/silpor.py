#!/usr/bin/env python3
"""silpor.py — the "người lạ" portrait silhouettes img/kit/unknown-f|m|k.webp, cut from the painted stage silhouettes
img/kit/unknown-fig-f|m|k.webp with the SAME head framing as porcrop.py (a stranger's frame shows a head of the same size as a
known person's portrait — never a zoomed half head), drawn crisp at 2x the portrait size (768x1012) so no screen upscales it.

  python3 dev/figwork/silpor.py [--out DIR]

The outline is the painted silhouette's (alpha upscaled once, then re-cut on its 50 % contour and feathered ~1.5 px: a clean soft
edge instead of a blurred one); the fill is the kit's soft grey (lighter at the head, a faint rim light), on a transparent ground so
the stone frame's brocade (bg-unknown) shows around it. No face, no features.
"""
import os, sys, argparse
import numpy as np
from PIL import Image, ImageFilter

W_OUT, H_OUT = 768, 1012           # 2x the 384x506 portrait opening
EYE_Y = 0.40                       # porcrop.py
FACE_W = 0.33                      # porcrop.py uses .36 for a face; a silhouette head reads larger, keep a little more room

def head(a):
    h, w = a.shape
    rows = np.nonzero((a > 128).sum(1) > 2)[0]; top = rows[0] if len(rows) else 0
    xs, ws = [], []
    for y in range(int(top + h * 0.02), int(top + h * 0.13), 2):
        r = np.nonzero(a[y] > 128)[0]
        if len(r): xs.append((r[0] + r[-1]) / 2); ws.append(r[-1] - r[0])
    cx = float(np.median(xs)) if xs else w / 2
    hw = float(np.percentile(ws, 60)) if ws else h * 0.1      # head width (hats/pins excluded by the percentile)
    return cx, top, hw

def make(src, dst, kid=False):
    im = Image.open(src).convert("RGBA"); a = np.asarray(im.split()[3]).astype(np.float32)
    bb = im.split()[3].point(lambda v: 255 if v > 12 else 0).getbbox(); a = a[bb[1]:bb[3], bb[0]:bb[2]]
    h, w = a.shape; cx, top, hw = head(a)
    # framing by the shoulders (hats, pins and buns differ, shoulders do not): the frame is 1.3 shoulder widths wide, the top of the
    # head 9 % below its top edge — whole head and shoulders, the same bust a por-* portrait shows, never a zoomed half head
    b0, b1 = (0.28, 0.36) if kid else (0.16, 0.25); sw = 0
    for yS in range(int(top + (h - top) * b0), int(top + (h - top) * b1)):
        r = np.nonzero(a[yS] > 128)[0]
        if len(r): sw = max(sw, r[-1] - r[0])
    sw = sw or w * 0.6
    Wc = sw * 1.25; Hc = Wc * H_OUT / W_OUT
    x0 = cx - Wc / 2; y0 = top - 0.09 * Hc
    # crop the alpha into the portrait box (outside = empty), upscale once
    S = 4
    big = Image.fromarray(a.clip(0, 255).astype(np.uint8)).resize((w * S, h * S), Image.LANCZOS)
    box = [int(round(v * S)) for v in (x0, y0, x0 + Wc, y0 + Hc)]
    cv = Image.new("L", (box[2] - box[0], box[3] - box[1]), 0)
    cv.paste(big.crop((max(0, box[0]), max(0, box[1]), min(big.width, box[2]), min(big.height, box[3]))), (max(0, -box[0]), max(0, -box[1])))
    m = cv.resize((W_OUT, H_OUT), Image.LANCZOS).filter(ImageFilter.GaussianBlur(3))
    m = m.point(lambda v: 255 if v >= 110 else 0).filter(ImageFilter.GaussianBlur(1.6))     # clean contour, soft 1.5 px edge
    # the body runs out at the bottom: fade the last 12 % so the bust sits in the window like a portrait
    M = np.asarray(m).astype(np.float32) / 255
    yy = np.linspace(0, 1, H_OUT)[:, None]
    M *= np.clip((1.0 - yy) / 0.12, 0, 1) * 0.15 + 0.85
    # fill: kit grey, lighter towards the head, faint rim light along the contour
    g_top, g_bot = np.array([150, 155, 162]), np.array([112, 117, 126])
    t = np.clip((yy - 0.15) / 0.75, 0, 1)
    rgb = (g_top * (1 - t) + g_bot * t)[..., None, :].repeat(W_OUT, 1).reshape(H_OUT, W_OUT, 3)
    edge = np.asarray(Image.fromarray((M * 255).astype(np.uint8)).filter(ImageFilter.FIND_EDGES).filter(ImageFilter.GaussianBlur(2))).astype(np.float32) / 255
    rgb = np.clip(rgb + edge[..., None] * 38, 0, 255)
    out = np.dstack([rgb, (M * 0.92 * 255)]).astype(np.uint8)
    Image.fromarray(out, "RGBA").save(dst, "WEBP", quality=88, method=6)
    return dst

def stage(path, H=1350):
    """the stage silhouette at H px tall (was 900: 1.43x upscale on the Fold stage); soft painted shape, so one LANCZOS pass; idempotent"""
    im = Image.open(path).convert("RGBA")
    if im.height >= H: return path
    im = im.resize((round(im.width * H / im.height), H), Image.LANCZOS)
    im.save(path, "WEBP", quality=86, method=6); return path

if __name__ == "__main__":
    ap = argparse.ArgumentParser(); ap.add_argument("--out", default=None); o = ap.parse_args()
    root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "img", "kit")
    out = o.out or root; os.makedirs(out, exist_ok=True)
    for g in "fmk":
        if o.out is None: print(stage(os.path.join(root, f"unknown-fig-{g}.webp")))
        print(make(os.path.join(root, f"unknown-fig-{g}.webp"), os.path.join(out, f"unknown-{g}.webp"), kid=g == "k"))
