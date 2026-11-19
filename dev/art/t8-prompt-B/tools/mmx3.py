#!/usr/bin/env python3
"""MMX3 ma ma two-colour no-flower helper (scratch I/O under $MMX3_DIR, default /tmp/mmx3).
  mmx3.py look <id>-<age> <gen_url>      download the gen, write look_<id>-<age>.jpg (full 1400 tall) + face_<id>-<age>.jpg (native top crop)
  mmx3.py cut  <id>-<age> <cut_url>      download the cut to img/_review/mama-mass/twocol/cuts/<id>-<age>.png (+ check composite on #efe9df)
  mmx3.py sheet <id>                     row sheet OLD one-colour (CDN cuts/<id>-<age>.png, if any) | NEW two-colour, ages a36 a51 a65
                                         -> img/_review/mama-mass/twocol/mama-twocol-<id>.jpg + dev/handover/review-sheets/mama-mass/twocol/
"""
import sys, os, subprocess, shutil
from PIL import Image, ImageDraw
R = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))
T = os.environ.get("MMX3_DIR", "/tmp/mmx3"); os.makedirs(T, exist_ok=True)
CDN = "https://ctm-img.victoria-tntt.workers.dev/img/_review/mama-mass/cuts/"
NEWD = os.path.join(R, "img/_review/mama-mass/twocol/cuts"); os.makedirs(NEWD, exist_ok=True)
BG = (0xef, 0xe9, 0xdf)
def get(url, p): subprocess.run(["curl", "-sSfL", "-o", p, url], check=True)
def onbg(p, h):
    im = Image.open(p).convert("RGBA"); bb = im.getbbox()
    if bb: im = im.crop(bb)
    im.thumbnail((10000, h)); c = Image.new("RGB", (int(h * 0.48), h), BG)
    c.paste(im, ((c.width - im.width) // 2, h - im.height), im); return c
cmd, a = sys.argv[1], sys.argv[2]
if cmd == "look":
    p = f"{T}/gen_{a}.png"; get(sys.argv[3], p); im = Image.open(p).convert("RGB")
    v = im.copy(); v.thumbnail((10000, 1400)); v.save(f"{T}/look_{a}.jpg", quality=85)
    w, h = im.size; im.crop((int(w * .22), 0, int(w * .78), int(h * .24))).save(f"{T}/face_{a}.jpg", quality=88)
    print(f"{T}/look_{a}.jpg {T}/face_{a}.jpg", im.size)
elif cmd == "cut":
    p = f"{NEWD}/{a}.png"; get(sys.argv[3], p); onbg(p, 1200).save(f"{T}/cutbg_{a}.jpg", quality=85); print(p, f"{T}/cutbg_{a}.jpg")
elif cmd == "sheet":
    H = 900; cols = []
    for age in ("a36", "a51", "a65"):
        o = f"{T}/old_{a}-{age}.png"
        if not os.path.exists(o):
            try: get(CDN + f"{a}-{age}.png", o)
            except Exception: o = None
        n = f"{NEWD}/{a}-{age}.png"
        cols.append((age, o, n if os.path.exists(n) else None))
    pairs = any(o for _, o, _ in cols); cw = int(H * 0.48)
    W = len(cols) * cw * (2 if pairs else 1) + 20 * (len(cols) - 1)
    sh = Image.new("RGB", (W, H + 40), (255, 255, 255)); d = ImageDraw.Draw(sh); x = 0
    for age, o, n in cols:
        for lab, p in ([("OLD 1 màu", o)] if pairs else []) + [("NEW 2 màu", n)]:
            if p: sh.paste(onbg(p, H), (x, 40))
            d.text((x + 8, 10), f"{a} {age} {lab}", fill=(0, 0, 0)); x += cw
        x += 20
    out = os.path.join(R, f"img/_review/mama-mass/twocol/mama-twocol-{a}.jpg"); sh.save(out, quality=85)
    rd = os.path.join(R, "dev/handover/review-sheets/mama-mass/twocol"); os.makedirs(rd, exist_ok=True); shutil.copy(out, rd)
    print(out)
