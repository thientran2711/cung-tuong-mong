#!/usr/bin/env python3
"""Preview MP4 for group seals: per seal OUT + LOOP×2 + BACK + 1 s hold, Vietnamese caption (accents) under it, on a light background, 15 fps, 576 px (2× the 288 px webp).
usage: th_preview.py out.mp4 th-vui th-buon ... [--dir img/_review/emo-anim-groups]"""
import sys, subprocess
from PIL import Image, ImageDraw, ImageFont
import os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); from th_names import caption   # Vietnamese caption with accents under each seal (owner)
args = [a for a in sys.argv[1:] if not a.startswith("--")]
d = "img/_review/emo-anim-groups"
if "--dir" in sys.argv: d = sys.argv[sys.argv.index("--dir") + 1]; args.remove(d)
dst, names = args[0], args[1:]
BG, S, HH = (242, 238, 230), 576, 640
FT = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 30)
def frames(f, cap):
    im = Image.open(f)
    for i in range(im.n_frames):
        im.seek(i); c = Image.new("RGBA", im.size, BG + (255,)); c.alpha_composite(im.convert("RGBA"))
        fr = Image.new("RGB", (S, HH), BG); fr.paste(c.convert("RGB").resize((S, S), Image.LANCZOS), (0, 0))
        d = ImageDraw.Draw(fr); w = d.textlength(cap, font=FT); d.text(((S - w) / 2, S + 12), cap, font=FT, fill=(60, 40, 40))
        yield fr
p = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{S}x{HH}", "-r", "15", "-i", "-",
                      "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", dst], stdin=subprocess.PIPE)
n = 0
for nm in names:
    seq = [f"{d}/{nm}-out.webp", f"{d}/{nm}.webp", f"{d}/{nm}.webp", f"{d}/{nm}-back.webp"]
    last = None
    for f in seq:
        for fr in frames(f, caption(nm, True)): p.stdin.write(fr.tobytes()); last = fr; n += 1
    for _ in range(15): p.stdin.write(last.tobytes()); n += 1
p.stdin.close(); p.wait()
print(dst, n, "frames", f"{n/15:.1f}s")
