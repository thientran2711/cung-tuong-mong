#!/usr/bin/env python3
"""Still for a group seal: keyframe A (green-screen PNG) → keyed (same un-mix as th_cut.py) → cropped to the medallion → 160 px webp.
usage: grp_still.py A-green.png out.webp"""
import sys, numpy as np
from PIL import Image
src, dst = sys.argv[1:3]
f = np.asarray(Image.open(src).convert('RGB')).astype(np.float32)
bg = np.median(np.concatenate([f[:20, :20].reshape(-1, 3), f[-20:, -20:].reshape(-1, 3)]), 0)
ex = max(bg[1] - max(bg[0], bg[2]), 60)
r, g, b = f[..., 0], f[..., 1], f[..., 2]
t = np.clip(1 - (g - np.maximum(r, b)) / ex, 0, 1); t = np.where(t > 0.93, 1, t); t = np.where(t < 0.06, 0, t); ts = np.maximum(t, 1e-3)
o = np.zeros(f.shape[:2] + (4,), np.uint8)
rr = np.clip((r - (1 - t) * bg[0]) / ts, 0, 255); gg = np.clip((g - (1 - t) * bg[1]) / ts, 0, 255); bb = np.clip((b - (1 - t) * bg[2]) / ts, 0, 255)
o[..., 0] = rr; o[..., 1] = np.minimum(gg, np.maximum(rr, bb)); o[..., 2] = bb; o[..., 3] = (np.clip((t - 0.2) / 0.73, 0, 1) * 255)
im = Image.fromarray(o, 'RGBA'); x0, y0, x1, y1 = im.getbbox(); s = max(x1 - x0, y1 - y0); cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
im.crop((cx - s // 2 - 4, cy - s // 2 - 4, cx + s // 2 + 4, cy + s // 2 + 4)).resize((160, 160), Image.LANCZOS).save(dst, quality=90)
print(dst, s)
