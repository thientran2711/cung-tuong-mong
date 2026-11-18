#!/usr/bin/env python3
"""fit_fig.py MASTER.png OLD(file|img/path.webp|URL) OUT.(png|webp) [--H 900] [--pad 0.08]
Crop the new master to its alpha bbox, scale it so the figure is EXACTLY as tall as the OLD sprite's figure
(same head-top y and feet y in a canvas of height H, H=900 for fig, 1800 for hd with the old bbox scaled x2),
canvas width = figure width + pad each side (hem/sleeves never touch an edge). Prints the old/new geometry.
Reason (owner #1 complaint, 'người thì quá nhỏ, người thì quá to'): the game scales the whole canvas to the slot,
so a wide/margined master shrinks the person; this keeps the on-screen height identical to the old file.
python3 -I; needs numpy pillow."""
import sys, io, subprocess, argparse
import numpy as np
from PIL import Image
CDN = "https://ctm-img.victoria-tntt.workers.dev/"
def load(s):
    if s.startswith("http") or s.startswith("img/"):
        r = subprocess.run(["curl", "-s", "--max-time", "60", s if s.startswith("http") else CDN + s], capture_output=True)
        return Image.open(io.BytesIO(r.stdout)).convert("RGBA")
    return Image.open(s).convert("RGBA")
def bbox(im, thr=20):
    a = np.asarray(im)[..., 3] > thr; ys, xs = np.nonzero(a)
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1
def fit(master, old, H=900, pad=0.08):
    ob = bbox(old); oh = old.height
    top = ob[1] / oh * H; bot = ob[3] / oh * H; fh = bot - top          # old figure span in the H-canvas
    nb = bbox(master); fig = master.crop(nb); s = fh / fig.height
    fig = fig.resize((max(1, round(fig.width * s)), round(fh)), Image.LANCZOS)
    pw = round(fig.width * pad); W = fig.width + 2 * pw
    out = Image.new("RGBA", (W, H), (0, 0, 0, 0)); out.alpha_composite(fig, (pw, round(top)))
    return out, {"old_canvas": old.size, "old_top_pct": round(ob[1] / oh * 100, 1), "old_feet_pct": round(ob[3] / oh * 100, 1),
                 "old_fig_h_pct": round((ob[3] - ob[1]) / oh * 100, 1), "scale": round(s, 3), "out": out.size}
if __name__ == "__main__":
    ap = argparse.ArgumentParser(); ap.add_argument("master"); ap.add_argument("old"); ap.add_argument("out")
    ap.add_argument("--H", type=int, default=900); ap.add_argument("--pad", type=float, default=.08); o = ap.parse_args()
    img, info = fit(Image.open(o.master).convert("RGBA"), load(o.old), o.H, o.pad)
    img.save(o.out, **({"quality": 95, "method": 6} if o.out.endswith("webp") else {})); print(info)
