#!/usr/bin/env python3
"""frame_wide.py (review/hc-portrait, owner 15/11 "kéo giãn cạnh trái và phải cho khung avatar to bề ngang"):
   make the WIDE person-card variant of every kit frame: img/kit/frame-<x>.webp (550x1037) -> img/kit/frame-<x>-w.webp (550x1037).
   The frame's left and right halves are pushed outward by s canvas units each (content-aware seam insertion: low-energy vertical seams
   through the plain parts of the top / bottom bars, never through corners, the side bars, the centre crest or the pendant), then s is
   cropped from each (transparent) outer margin, so the canvas, the crest, the pendant and the opening's TOP/BOTTOM stay where they are and
   only the opening gets 2s wider. s per frame = what brings the frame's opaque width to TARGET (wide frames: 0 = unchanged copy).
   Also writes dev/tools/frame_wide.json {name: [s, opaqueTop, opaqueBottom]} (canvas units) for KIT_FRW in jhcpor.js.
   usage: python3 dev/tools/frame_wide.py <dir with frame-*.webp> <out dir> [frame names: only these, meta to <out>/<name>.json]"""
import sys, os, glob, json
import numpy as np
from PIL import Image
TARGET = 536          # opaque width after widening (canvas 550)
CX = 275              # canvas centre (opening 83..467)
SIDE_IN = 97          # seams stay right of the left side bar's inner edge (83) + margin
CENTRE = 62           # ... and this far from the centre (crest / pendant)
def opaque_box(a):
    m = a > 40; ys = np.where(m.any(1))[0]; xs = np.where(m.any(0))[0]
    return xs[0], ys[0], xs[-1] + 1, ys[-1] + 1
def energy(rgba):
    a = rgba[..., 3:4] / 255.0; p = rgba[..., :3] * a
    dx = np.zeros(p.shape[:2]); dx[:, 1:-1] = np.abs(p[:, 2:] - p[:, :-2]).sum(2)
    da = np.zeros(p.shape[:2]); da[:, 1:-1] = np.abs(rgba[:, 2:, 3] - rgba[:, :-2, 3])
    return dx + da
def seam(E, lo, hi):
    H, W = E.shape; INF = 1e18
    M = np.full((H, W), INF); M[0, lo:hi] = E[0, lo:hi]; B = np.zeros((H, W), np.int16)
    for y in range(1, H):
        prev = M[y - 1]
        l = np.r_[INF, prev[:-1]]; r = np.r_[prev[1:], INF]
        st = np.stack([l, prev, r]); k = st.argmin(0); best = st[k, np.arange(W)]
        row = np.full(W, INF); row[lo:hi] = best[lo:hi] + E[y, lo:hi]; M[y] = row; B[y] = k - 1
    x = int(M[-1].argmin()); xs = [x]
    for y in range(H - 1, 0, -1):
        x = x + int(B[y, x]); xs.append(x)
    return xs[::-1]
def insert(img, pen, xs):
    H, W, C = img.shape; out = np.zeros((H, W + 1, C)); po = np.zeros((H, W + 1))
    for y, x in enumerate(xs):
        x2 = min(x + 1, W - 1); new = (img[y, x] + img[y, x2]) / 2
        out[y, :x + 1] = img[y, :x + 1]; out[y, x + 1] = new; out[y, x + 2:] = img[y, x + 1:]
        po[y, :x + 1] = pen[y, :x + 1]; po[y, x + 2:] = pen[y, x + 1:]
        if img[y, x, 3] > 10: po[y, x] += 400; po[y, x + 1] = pen[y, x] + 400
    return out, po
def widen(rgba, s):
    img = rgba.astype(np.float64); pen = np.zeros(img.shape[:2])
    for i in range(s):  # left half: region [SIDE_IN, CX-CENTRE) (shifts right of it by 1 per insert)
        E = energy(img) + pen; xs = seam(E, SIDE_IN, CX - CENTRE + i); img, pen = insert(img, pen, xs)
    for i in range(s):  # right half: mirror region, offset by the s columns already added on the left
        W = img.shape[1]; E = energy(img) + pen; xs = seam(E, CX + s + CENTRE, W - SIDE_IN); img, pen = insert(img, pen, xs)
    img = img[:, s:img.shape[1] - s]
    return np.clip(img + .5, 0, 255).astype(np.uint8)
def main(src, out, only=None):
    os.makedirs(out, exist_ok=True); meta = {}
    J = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'frame_wide.json')
    if only:
        try: meta = json.load(open(J))
        except Exception: meta = {}
    for f in sorted(glob.glob(os.path.join(src, 'frame-*.webp'))):
        n = os.path.basename(f)[:-5]
        if n.endswith('-w') or (only and n not in only): continue
        im = np.array(Image.open(f).convert('RGBA')); x0, y0, x1, y1 = opaque_box(im[..., 3])
        s = int(max(0, min(round((TARGET - (x1 - x0)) / 2), x0 - 2, 548 - x1)))
        w = widen(im, s) if s else im
        Image.fromarray(w, 'RGBA').save(os.path.join(out, n + '-w.webp'), 'WEBP', quality=88, method=6)
        meta[n] = [s, int(y0), int(y1)]; print(n, 'x', x0, x1, 's', s, 'top', y0, 'bottom', y1, flush=True)
        if only: json.dump({n: meta[n]}, open(os.path.join(out, n + '.json'), 'w'))
    if not only: json.dump(meta, open(J, 'w'), separators=(',', ':'))
if __name__ == '__main__': main(sys.argv[1], sys.argv[2], sys.argv[3:] or None)
