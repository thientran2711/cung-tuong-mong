#!/usr/bin/env python3
"""fig_proportion.py: measure every full-body figure picture (opaque box, head/body ratio, aspect).
usage: python3 -I fig_proportion.py <dir_with_webps> <out.json>
Head height = top of opaque pixels down to the neck: the narrowest row of the alpha-width profile between 9% and 30% of body height
(after the hair/ornament crown, before the shoulders). Ratios are heads-tall = body_h / head_h."""
import sys, os, json
import numpy as np
from PIL import Image
def measure(p):
    im = Image.open(p).convert('RGBA'); a = np.array(im)[:, :, 3] > 24
    H, W = a.shape; rows = np.where(a.any(1))[0]; cols = np.where(a.any(0))[0]
    if not len(rows): return None
    y0, y1, x0, x1 = rows[0], rows[-1] + 1, cols[0], cols[-1] + 1
    bh, bw = y1 - y0, x1 - x0
    wid = a[y0:y1].sum(1).astype(float)
    k = max(3, bh // 60); sm = np.convolve(wid, np.ones(k) / k, 'same')
    lo, hi = int(bh * .09), int(bh * .30)
    neck = lo + int(np.argmin(sm[lo:hi])) if hi > lo else int(bh * .14)
    # widest row in lower 60% (robe spread)
    lowmax = sm[int(bh * .4):].max()
    return dict(W=W, H=H, bw=int(bw), bh=int(bh), top=int(y0), bottom=int(H - y1), left=int(x0), right=int(W - x1),
                aspect=round(bw / bh, 3), canvas_aspect=round(W / H, 3), fill=round(bh / H, 3),
                head=int(neck), heads=round(bh / max(neck, 1), 2), shoulder=round(float(sm[neck:neck + max(4, bh // 25)].max()) / bh, 3),
                robe=round(float(lowmax) / bh, 3), cropped_top=bool(y0 <= 1), cropped_bottom=bool(y1 >= H - 1),
                cropped_l=bool(x0 <= 0), cropped_r=bool(x1 >= W))
if __name__ == '__main__':
    d, out = sys.argv[1:3]; res = {}
    for f in sorted(os.listdir(d)):
        if f.endswith('.webp'):
            try: res[f] = measure(os.path.join(d, f))
            except Exception as e: res[f] = {'err': str(e)}
    json.dump(res, open(out, 'w'), indent=0); print(len(res))
