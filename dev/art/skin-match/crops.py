#!/usr/bin/env python3
"""crops.py OUT.jpg BEFORE_DIR AFTER_DIR NAME... — native-res before|after crops around the changed skin (neck/hands) of each file"""
import sys, os, numpy as np, cv2
def comp(im):
    a = im[..., 3:] / 255.0; return (im[..., :3] * a + np.array([195, 213, 230]) * (1 - a)).astype(np.uint8)
out, bd, ad = sys.argv[1:4]; tiles = []; S = int(os.environ.get("CS", 200))
for n in sys.argv[4:]:
    b = cv2.imread(os.path.join(bd, n), -1); a = cv2.imread(os.path.join(ad, n), -1)
    if b is None or a is None: continue
    lb = cv2.cvtColor(b[..., :3].astype(np.float32) / 255, cv2.COLOR_BGR2LAB); la = cv2.cvtColor(a[..., :3].astype(np.float32) / 255, cv2.COLOR_BGR2LAB)
    d = (cv2.GaussianBlur(np.hypot(*(la - lb)[..., 1:].transpose(2, 0, 1)), (0, 0), 2) >= 2.0) & (b[..., 3] >= 250) & (a[..., 3] >= 250)
    d = d.astype(np.uint8)
    d = cv2.morphologyEx(d, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    nn, lab, st, cen = cv2.connectedComponentsWithStats(d, 8)
    for i in sorted(range(1, nn), key=lambda i: -st[i, 4])[:2]:
        if st[i, 4] < 60: continue
        cx, cy = cen[i]; h = S // 2; y0 = int(max(0, min(b.shape[0] - S, cy - h))); x0 = int(max(0, min(b.shape[1] - S, cx - h)))
        cb, ca = comp(b)[y0:y0 + S, x0:x0 + S], comp(a)[y0:y0 + S, x0:x0 + S]
        t = np.hstack([cb, np.full((cb.shape[0], 2, 3), 255, np.uint8), ca]); t = cv2.resize(t, (2 * S + 2, S))
        cv2.putText(t, n[4:-5][:28], (2, 11), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (0, 0, 0), 1); tiles.append(t)
per = max(1, 1900 // (2 * S + 8)); rows = []
for i in range(0, len(tiles), per):
    r = [np.pad(x, ((0, 4), (0, 6), (0, 0)), constant_values=40) for x in tiles[i:i + per]]
    while len(r) < per: r.append(np.full_like(r[0], 40))
    rows.append(np.hstack(r))
cv2.imwrite(out, np.vstack(rows), [cv2.IMWRITE_JPEG_QUALITY, 88]); print(out, len(tiles))
