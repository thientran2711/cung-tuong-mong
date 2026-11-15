#!/usr/bin/env python3
"""scene-night.py — night paintings that read as day (review/place-art; flags of dev/test/place-colour.py: "night looks like day",
stage L* > 52 on a toi state). A Lab night grade, done once on the painting itself (no stage filter):
  · luminance scale L' = L·s, s solved so the picture's mean L* hits the target (the gold screen, snow, walls all go down), but lamp /
    moon / candle highlights are protected (weight smoothstep(88, 98, L*) back to the original), so the lamps still glow against the dark;
  · soft vignette (edges −18 % L*): the eye goes to the lit centre, like a lamp-lit hall at night;
  · moonlight in the shadows: b* pulled −5 and chroma −12 % weighted by darkness (shadows cool, lamp-lit areas keep their warm gold).
usage: python3 dev/art/scene-night.py <src dir with <name>.webp> <out dir> name:targetL [name:targetL ...]
writes <out>/<name>.webp (1280x720, q86) + <out>/night-sheet.jpg (before | after, with mean L*)."""
import sys, os
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from skimage import color

SRC, OUT = sys.argv[1], sys.argv[2]; os.makedirs(OUT, exist_ok=True)
JOBS = [(a.split(':')[0], float(a.split(':')[1])) for a in sys.argv[3:]]

def grade(rgb, target):
    lab = color.rgb2lab(rgb); L = lab[..., 0]; h, w = L.shape
    yy, xx = np.mgrid[0:h, 0:w]; r = np.hypot((xx - w / 2) / (w / 2), (yy - h * .55) / (h * .6))
    vig = 1 - .18 * np.clip((r - .45) / .75, 0, 1) ** 1.5
    t = np.clip((L - 88) / 10, 0, 1); keep = t * t * (3 - 2 * t)
    def apply(g): return np.clip(L * (g * vig * (1 - keep) + keep), 0, 100)
    lo, hi = .3, 1.0
    for _ in range(30):
        g = (lo + hi) / 2
        if apply(g).mean() > target: hi = g
        else: lo = g
    L2 = apply(g); dark = (1 - L2 / 100) ** 1.5
    a, b = lab[..., 1], lab[..., 2]; k = 1 - .12 * dark
    lab[..., 0] = L2; lab[..., 1] = a * k; lab[..., 2] = b * k - 5 * dark
    return np.clip(color.lab2rgb(lab), 0, 1), g

FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'; fnt = ImageFont.truetype(FONT, 13) if os.path.exists(FONT) else None
tw, th = 480, 270; sh = Image.new('RGB', (2 * tw + 6, len(JOBS) * (th + 20) + 4), (250, 246, 236)); dr = ImageDraw.Draw(sh)
for i, (n, t) in enumerate(JOBS):
    im = Image.open(f'{SRC}/{n}.webp').convert('RGB'); rgb = np.asarray(im) / 255.0
    L0 = color.rgb2lab(rgb)[..., 0].mean(); out, g = grade(rgb, t)
    o = Image.fromarray((out * 255 + .5).astype(np.uint8)); o.save(f'{OUT}/{n}.webp', quality=86)
    for j, c in enumerate((im, o)): sh.paste(c.resize((tw, th)), (2 + j * (tw + 2), 2 + i * (th + 20)))
    msg = f'{n}: mean L* {L0:.1f} -> {t:.1f} (scale {g:.2f})'; print(msg)
    dr.text((4, i * (th + 20) + th + 4), msg, fill=(60, 40, 20), font=fnt)
sh.save(f'{OUT}/night-sheet.jpg', quality=82)
