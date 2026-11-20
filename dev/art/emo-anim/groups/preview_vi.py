#!/usr/bin/env python3
"""preview_vi.py out.mp4 name:caption ... : like th_preview.py (OUT + LOOP×2 + BACK + 1 s hold, light bg, 576 px, 15 fps)
with a Vietnamese caption (accents) under each seal."""
import sys, subprocess
from PIL import Image, ImageDraw, ImageFont
D = "/home/user/cung-tuong-mong/img/_review/emo-anim-groups"; BG = (242, 238, 230); S = 576; H = 640
F = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 34)
dst = sys.argv[1]; items = [a.split(":", 1) for a in sys.argv[2:]]
p = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{S}x{H}", "-r", "15", "-i", "-",
                      "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", dst], stdin=subprocess.PIPE)
n = 0
for nm, cap in items:
    last = None
    import os
    for f in [x for x in [f"{D}/{nm}-out.webp", f"{D}/{nm}.webp", f"{D}/{nm}.webp", f"{D}/{nm}-back.webp"] if os.path.exists(x)]:   # missing part (e.g. moderation-blocked clip) skipped
        im = Image.open(f)
        for i in range(im.n_frames):
            im.seek(i); c = Image.new("RGBA", im.size, BG + (255,)); c.alpha_composite(im.convert("RGBA"))
            fr = Image.new("RGB", (S, H), BG); fr.paste(c.convert("RGB").resize((S, S), Image.LANCZOS), (0, 0))
            d = ImageDraw.Draw(fr); w = d.textlength(cap, font=F); d.text(((S - w) / 2, S + 10), cap, font=F, fill=(60, 40, 40))
            p.stdin.write(fr.tobytes()); last = fr; n += 1
    for _ in range(15): p.stdin.write(last.tobytes()); n += 1
p.stdin.close(); p.wait(); print(dst, n, "frames", f"{n/15:.1f}s")
