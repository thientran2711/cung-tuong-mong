#!/usr/bin/env python3
"""Cut a group-seal clip (green-screen mp4) → 288 px / 15 fps animated webp with alpha (emo-anim-mass step 6, group order 15:40Z).
usage: th_cut.py PART in.mp4 out.webp      PART = out | loop | back
Same trim + key as dev/art/emo-anim/mo/cut.py, but:
 - written with Pillow so the ANIM chunk gets loop count + transparent background: -out/-back loop=1 bg 00000000, LOOP loop=0 (order);
 - despill G <= max(R,B) on the WHOLE frame (Thái hậu art has no green: red disc, yellow robe, plum, gold) so the white steam puffs,
   which pick up green from the screen, come out clean; near-transparent green haze (alpha < 40 and greenish) is cleared."""
import subprocess, sys, numpy as np
from PIL import Image
sys.path.insert(0, __import__('os').path.join(__import__('os').path.dirname(__import__('os').path.abspath(__file__)), '..', 'mo'))
from cut import span
S = 288
def key(src, s, e):
    cmd = ["ffmpeg", "-loglevel", "error", "-ss", f"{s:.3f}", "-i", src]
    if e: cmd += ["-t", f"{e - s:.3f}"]
    cmd += ["-vf", f"chromakey=0x00FF00:0.28:0.08,scale={S}:{S}:flags=lanczos,fps=15,format=rgba", "-f", "rawvideo", "-"]
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    fr = np.frombuffer(raw, np.uint8).reshape(-1, S, S, 4).copy()
    for f in fr:
        r, g, b, a = (f[..., i].astype(np.int16) for i in range(4))
        lim = np.maximum(r, b)
        greenish = g > lim + 6
        f[..., 1] = np.where(g > lim, lim, g).astype(np.uint8)
        f[..., 3] = np.where((a < 8) | ((a < 40) & greenish), 0, a).astype(np.uint8)
    return fr
def write(fr, dst, loop):
    ims = [Image.fromarray(f, 'RGBA') for f in fr]
    ims[0].save(dst, save_all=True, append_images=ims[1:], duration=67, loop=loop, background=(0, 0, 0, 0),
                quality=80, method=6, minimize_size=False)
if __name__ == "__main__":
    part, src, dst = sys.argv[1:4]
    s, e = span(part, src)
    fr = key(src, s, e)
    write(fr, dst, 0 if part == 'loop' else 1)
    np.save(dst + '.npy', fr)  # frames for the review sheet (scratch only)
    print(f"{dst}: {len(fr)} frames, start {s:.2f}s end {f'{e:.2f}s' if e else 'full'}")
