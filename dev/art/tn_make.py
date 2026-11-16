#!/usr/bin/env python3
"""tn_make.py (review/newgame-ui, owner 15/11 "quá lag"): small pre-sized WebP copies of the faces the identity card's face picker shows.
  For each name N in the list (N = "consort-c01-t1-a18" ...):
    img/tn/por-N.webp  picker thumbnail, 128 px wide (the picker cell is ~46 css px; 128 covers dpr 2.7), q80  (~6 KB, was 30-55 KB)
    img/tn/fig-N.webp  low-res standing figure, 240 px tall, q70 (~4 KB): shown at once when a face is picked, then the crisp
                       img/fig-N.webp (~70 KB) replaces it when decoded; also measured by kitFigBody (same fractions, tiny canvas)
  img/TN.json = {"v":1,"have":[N,...]} (the game uses a thumbnail only when it is listed; else the full picture as before).
  usage: python3 dev/art/tn_make.py <names.txt | -> [srcdir]   (srcdir holds por-N.webp / fig-N.webp; missing ones are fetched from the CDN)
  The list = every portrait the picker can show at a new game (ages 18-20 -> a18; ranks 0-3 -> t1..t4; palace maid start -> tm1 / plain maid),
  made by dev/test/newgame-ui-enum.js. Then: python3 dev/site/cdn_sync.py img/tn img/TN.json"""
import json, os, sys, urllib.request
from PIL import Image
R = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
BASE = "https://ctm-img.victoria-tntt.workers.dev/img/"
src = sys.argv[2] if len(sys.argv) > 2 else os.path.join(R, ".tmp", "orig")
names = [l.strip() for l in (sys.stdin if sys.argv[1] == "-" else open(sys.argv[1])) if l.strip()]
names = sorted({n.split("/")[-1].replace(".webp", "").split("-", 1)[1] for n in names})
os.makedirs(os.path.join(R, "img", "tn"), exist_ok=True); os.makedirs(src, exist_ok=True)
tot = {"por": [0, 0], "fig": [0, 0]}
for n in names:
    for kind, size, q in (("por", 128, 80), ("fig", 240, 70)):
        f = os.path.join(src, f"{kind}-{n}.webp")
        if not os.path.exists(f):
            urllib.request.urlretrieve(BASE + f"{kind}-{n}.webp", f)
        im = Image.open(f).convert("RGBA")
        if kind == "por": w, h = size, round(im.height * size / im.width)
        else: h, w = size, round(im.width * size / im.height)
        out = os.path.join(R, "img", "tn", f"{kind}-{n}.webp")
        im.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=q, method=4)
        tot[kind][0] += os.path.getsize(f); tot[kind][1] += os.path.getsize(out)
json.dump({"v": 1, "have": names}, open(os.path.join(R, "img", "TN.json"), "w"), separators=(",", ":"))
for k, (a, b) in tot.items(): print(f"{k}: {len(names)} files, {a//1024} KB -> {b//1024} KB (avg {b/len(names)/1024:.1f} KB)")
