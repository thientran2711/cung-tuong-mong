#!/usr/bin/env python3
"""kf.py out.jpg name=url ... : download keyframes to g/<name>.png, report mode/alpha, flatten RGBA onto #00FF00 as g/<name>.png
(raw kept as g/<name>-raw.png), make a labelled contact sheet (512 px tiles) for one look."""
import sys, os, subprocess
from PIL import Image, ImageDraw
G = os.environ.get("SG2_G", "/tmp/sg2/g"); os.makedirs(G, exist_ok=True)
out, items = sys.argv[1], [a.split("=", 1) for a in sys.argv[2:]]
tiles = []
for n, u in items:
    p = f"{G}/{n}.png"
    subprocess.run(["curl", "-s", "-o", p, u], check=True)
    im = Image.open(p); flat = False
    if im.mode == "RGBA" and im.getextrema()[3][0] < 250:
        os.replace(p, f"{G}/{n}-raw.png"); im = im.convert("RGBA")
        bg = Image.new("RGBA", im.size, (0, 255, 0, 255)); bg.alpha_composite(im); bg.convert("RGB").save(p); im = bg; flat = True
    print(n, "FLATTENED (was transparent)" if flat else "opaque", im.size)
    t = im.convert("RGB").resize((512, 512), Image.LANCZOS); ImageDraw.Draw(t).text((8, 8), n, fill=(0, 0, 0)); tiles.append(t)
cols = min(4, len(tiles)); rows = (len(tiles) + cols - 1) // cols
sh = Image.new("RGB", (cols * 512, rows * 512), (255, 255, 255))
for i, t in enumerate(tiles): sh.paste(t, ((i % cols) * 512, (i // cols) * 512))
sh.save(out, quality=82); print(out)
