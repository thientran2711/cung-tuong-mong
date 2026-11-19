#!/usr/bin/env python3
"""Preview MP4 for group seals: per seal OUT + LOOP×2 + BACK + 1 s hold, on a light background, 15 fps, 576 px (2× the 288 px webp).
usage: th_preview.py out.mp4 th-vui th-buon ... [--dir img/_review/emo-anim-groups]"""
import sys, subprocess
from PIL import Image
args = [a for a in sys.argv[1:] if not a.startswith("--")]
d = "img/_review/emo-anim-groups"
if "--dir" in sys.argv: d = sys.argv[sys.argv.index("--dir") + 1]; args.remove(d)
dst, names = args[0], args[1:]
BG, S = (242, 238, 230), 576
def frames(f):
    im = Image.open(f)
    for i in range(im.n_frames):
        im.seek(i); c = Image.new("RGBA", im.size, BG + (255,)); c.alpha_composite(im.convert("RGBA"))
        yield c.convert("RGB").resize((S, S), Image.LANCZOS)
p = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{S}x{S}", "-r", "15", "-i", "-",
                      "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", dst], stdin=subprocess.PIPE)
n = 0
for nm in names:
    seq = [f"{d}/{nm}-out.webp", f"{d}/{nm}.webp", f"{d}/{nm}.webp", f"{d}/{nm}-back.webp"]
    last = None
    for f in seq:
        for fr in frames(f): p.stdin.write(fr.tobytes()); last = fr; n += 1
    for _ in range(15): p.stdin.write(last.tobytes()); n += 1
p.stdin.close(); p.wait()
print(dst, n, "frames", f"{n/15:.1f}s")
