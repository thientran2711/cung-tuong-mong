#!/usr/bin/env python3
"""zoom.py OUT.jpg BEFORE_DIR AFTER_DIR NAME... — per fig: before | after | changed-pixel map (red = a*/b* moved >= 2, compression noise below), rows y 0–55 %"""
import sys, os, numpy as np, cv2
def comp(im):
    a = im[..., 3:] / 255.0; return (im[..., :3] * a + np.array([195, 213, 230]) * (1 - a)).astype(np.uint8)
out, bd, ad = sys.argv[1:4]; rows = []; H = int(os.environ.get("SH", 520))
for n in sys.argv[4:]:
    b = cv2.imread(os.path.join(bd, n), -1); a = cv2.imread(os.path.join(ad, n), -1)
    if b is None or a is None: continue
    y1 = int(0.55 * b.shape[0]) if n.startswith("fig-") else b.shape[0]
    cb, ca = comp(b)[:y1], comp(a)[:y1]
    lb = cv2.cvtColor(b[..., :3].astype(np.float32) / 255, cv2.COLOR_BGR2LAB); la = cv2.cvtColor(a[..., :3].astype(np.float32) / 255, cv2.COLOR_BGR2LAB)
    d = cv2.GaussianBlur(np.hypot(*(la - lb)[..., 1:].transpose(2, 0, 1)), (0, 0), 2)[:y1]   # blur: WebP re-encode noise is sparse
    m = (cb * 0.45).astype(np.uint8); m[(d >= 2.0) & (b[:y1, :, 3] >= 250)] = (0, 0, 255)
    t = np.hstack([cb, ca, m]); t = cv2.resize(t, (int(t.shape[1] * H / t.shape[0]), H), interpolation=cv2.INTER_AREA)
    cv2.putText(t, n[:-5], (3, 14), cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 0, 0), 1); rows.append(t)
W = max(r.shape[1] for r in rows); per = max(1, 1900 // W); grid = []
for i in range(0, len(rows), per):
    r = rows[i:i + per]; r = [np.pad(x, ((0, 0), (0, W - x.shape[1] + 6), (0, 0)), constant_values=40) for x in r]
    while len(r) < per: r.append(np.full_like(r[0], 40))
    grid.append(np.hstack(r))
cv2.imwrite(out, np.vstack(grid), [cv2.IMWRITE_JPEG_QUALITY, 85]); print(out, len(rows))
