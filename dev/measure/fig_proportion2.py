#!/usr/bin/env python3
"""fig_proportion2.py: face-based proportion measure. face = contiguous skin-colour rows (forehead..chin) of the head region;
skull = face*1.28 (hair above the forehead + chin..crown rule of thumb); feet = bottom of the opaque box.
heads = (feet - skull_top) / skull.  bodyfrac = (feet - skull_top) / bbox height (how much of the box is body, rest = crown/hat).
usage: python3 -I fig_proportion2.py <dir> <out.json>"""
import sys, os, json
import numpy as np
from PIL import Image
def skin(rgb):
    R, G, B = [rgb[..., i].astype(int) for i in range(3)]
    return (R > 150) & (G > 105) & (B > 85) & (R - G >= 6) & (R - G <= 62) & (G - B >= -4) & (G - B <= 48) & (R - B <= 95)
def measure(p):
    im = Image.open(p).convert('RGBA'); A = np.array(im); a = A[..., 3] > 40
    H, W = a.shape; rows = np.where(a.any(1))[0]; cols = np.where(a.any(0))[0]
    y0, y1 = rows[0], rows[-1] + 1; x0, x1 = cols[0], cols[-1] + 1; bh = y1 - y0
    s = skin(A[..., :3]) & a
    lim = y0 + int(bh * .40); cnt = s[y0:lim].sum(1)
    need = max(3, int(W * .012)); face = np.where(cnt >= need)[0] + y0
    if not len(face): return dict(W=W, H=H, bw=int(x1 - x0), bh=int(bh), aspect=round((x1 - x0) / bh, 3), heads=None, err='noface')
    # first contiguous run, allowing 2% gaps (eyes / lips are not skin)
    st = face[0]; en = st
    for r in face[1:]:
        if r - en <= max(3, int(bh * .02)): en = r
        else: break
    seg = cnt[st - y0:en - y0 + 1]; pk = int(np.argmax(seg)); cut = [i for i in range(pk, len(seg)) if seg[i] < seg[pk] * .62]
    if cut: en = st + cut[0] - 1
    f = en - st + 1; sk = max(y0, st - int(f * .30)); skull = f * 1.45
    return dict(W=W, H=H, bw=int(x1 - x0), bh=int(bh), aspect=round((x1 - x0) / bh, 3), face=int(f), top=int(st - y0), fh=round(f / bh, 3),
                heads=round((y1 - sk) / skull, 2), crown=round((sk - y0) / bh, 3))
if __name__ == '__main__':
    d, out = sys.argv[1:3]; res = {}
    for f in sorted(os.listdir(d)):
        if f.endswith('.webp') and 'figbg' not in f:
            try: res[f] = measure(os.path.join(d, f))
            except Exception as e: res[f] = {'err': str(e)}
    json.dump(res, open(out, 'w')); print(len(res))
