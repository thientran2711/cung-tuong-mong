#!/usr/bin/env python3
"""Lip QA for the makeup colour layer (owner 15/11: "lips must fit every face exactly").
For every picture in img/mk-fit/*.json: the lip polygon (outer minus mouth opening) against the painted lips of the picture:
  - red  = mean redness (R - (G+B)/2) inside the polygon minus in a ring just outside it (lips are redder than the skin around them)
  - iou  = overlap of the polygon with the picture's own lip pixels (the reddest pixels of a box around the mouth, as many as the polygon has)
  - shift = distance between the centroid of those lip pixels and the polygon centroid, in mouth widths
Writes .mk/lipqa.json {file: [red, iou, shift]} and contact sheets .mk/lipqa-<n>.jpg (lip close-ups with the outline, worst first), so every
picture can be looked at (tiles of 96 px, 12x10 per sheet).
usage: python3 -I dev/art/mkfit/lipqa.py [--jobs 16] [--only consort-c05] [--sheets all|bad]"""
import json, sys, io, os, glob, math, urllib.request, concurrent.futures as cf
import numpy as np
from PIL import Image, ImageDraw
BASE = "https://ctm-img.victoria-tntt.workers.dev/img/"
ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../.."))
OUT = os.path.join(ROOT, ".mk")

def get(url):
    err = None
    for i in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "curl/8"}), timeout=60) as r: return r.read()
        except Exception as e: err = e
    raise err

def poly_mask(size, pts):
    m = Image.new("L", size, 0); ImageDraw.Draw(m).polygon([tuple(p) for p in pts], fill=255); return np.asarray(m) > 0

def one(n, v):
    im = Image.open(io.BytesIO(get(BASE + n))).convert("RGBA")
    bg = Image.new("RGBA", im.size, (255, 255, 255, 255)); bg.alpha_composite(im); rgb = bg.convert("RGB")
    W, H = rgb.size
    P = [(v[2 * i] / 4000 * W, v[2 * i + 1] / 4000 * H) for i in range(60)]
    out, inn = P[:12], P[12:20]
    xs = [p[0] for p in out]; ys = [p[1] for p in out]; mw = max(xs) - min(xs); cx, cy = sum(xs) / 12, sum(ys) / 12
    r = mw * .72
    x0, y0, x1, y1 = int(max(0, cx - r)), int(max(0, cy - r * .8)), int(min(W, cx + r)), int(min(H, cy + r * .8))
    S = max(1, int(round(96 / max(1, x1 - x0) * 2)))  # work upscaled so small figure mouths have pixels
    cr = rgb.crop((x0, y0, x1, y1)).resize(((x1 - x0) * S, (y1 - y0) * S), Image.BICUBIC)
    a = np.asarray(cr).astype(np.float32)
    loc = lambda pts: [((x - x0) * S, (y - y0) * S) for x, y in pts]
    M = poly_mask(cr.size, loc(out)) & ~poly_mask(cr.size, loc(inn))
    big = [(cx + (x - cx) * 1.45, cy + (y - cy) * 1.9) for x, y in out]
    R = poly_mask(cr.size, loc(big)) & ~poly_mask(cr.size, loc(out))
    red = a[..., 0] - (a[..., 1] + a[..., 2]) / 2
    if M.sum() < 4 or R.sum() < 4: return n, [0, 0, 9], cr, loc(out), loc(inn)
    rd = float(red[M].mean() - red[R].mean())
    k = int(M.sum()); thr = np.sort(red.ravel())[-k] if k < red.size else red.min()
    L = red >= thr
    iou = float((L & M).sum() / max(1, (L | M).sum()))
    ys_, xs_ = np.nonzero(L); my_, mx_ = np.nonzero(M)
    sh = math.hypot(xs_.mean() - mx_.mean(), ys_.mean() - my_.mean()) / (mw * S) if len(xs_) else 9
    return n, [round(rd, 1), round(iou, 3), round(sh, 3)], cr, loc(out), loc(inn)

TW, TH = 72, 62
def tile(cr, o, i, label):
    t = cr.copy(); d = ImageDraw.Draw(t)
    d.line(o + [o[0]], fill=(0, 255, 0), width=max(1, t.width // 90))
    t = t.resize((TW, max(1, int(TW * t.height / t.width))))
    c = Image.new("RGB", (TW, TH), "white"); c.paste(t, (0, 0)); ImageDraw.Draw(c).text((1, TH - 11), label, fill=(0, 0, 0))
    return c
def short(n):  # por-consort-c05-t5-a18.webp -> c05t5a18P
    p = n[:-5].split("-"); return "".join(p[2:]).replace("look", "L") + ("P" if p[0] == "por" else "F")

def main():
    a = sys.argv[1:]
    jobs = int(a[a.index("--jobs") + 1]) if "--jobs" in a else 16
    only = a[a.index("--only") + 1] if "--only" in a else None
    mode = a[a.index("--sheets") + 1] if "--sheets" in a else "bad"
    fit = {}
    for f in sorted(glob.glob(os.path.join(ROOT, "img/mk-fit/*.json"))):
        g = os.path.basename(f)[:-5]
        if only and g != only: continue
        if not (g.startswith("consort-") or g.startswith("maid-") or g.startswith("player-")): continue
        fit.update(json.load(open(f)))
    # her pictures only: not lãnh cung / maid dress (no makeup there)
    import re
    names = sorted(n for n in fit if not re.search(r"-(tcold|cold|tm\d|m\d)-", n))
    res, tiles = {}, {}
    with cf.ThreadPoolExecutor(jobs) as ex:
        for n, sc, cr, o, i in ex.map(lambda n: one(n, fit[n]), names):
            res[n] = sc
            bad = sc[1] < .35 or sc[2] > .12 or sc[0] < 8
            if mode == "all" or bad: tiles[n] = tile(cr, o, i, short(n))
    json.dump(res, open(os.path.join(OUT, "lipqa.json"), "w"))
    order = sorted(tiles, key=lambda n: (res[n][1], -res[n][2])) if mode == "bad" else sorted(tiles)
    NC, NR = 16, 15
    for k in range(0, len(order), NC * NR):
        sh = Image.new("RGB", (TW * NC, TH * NR), "white")
        for j, n in enumerate(order[k:k + NC * NR]): sh.paste(tiles[n], ((j % NC) * TW, (j // NC) * TH))
        sh.save(os.path.join(OUT, "lipqa-%03d.jpg" % (k // (NC * NR))), quality=82)
    vals = list(res.values())
    print(json.dumps({"pictures": len(res), "flagged": sum(1 for v in vals if v[1] < .35 or v[2] > .12 or v[0] < 8),
                      "iou_median": float(np.median([v[1] for v in vals])), "shift_median": float(np.median([v[2] for v in vals])), "sheets": (len(order) + 239) // 240}))

if __name__ == "__main__":
    main()
