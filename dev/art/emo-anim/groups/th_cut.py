#!/usr/bin/env python3
"""Cut a group-seal clip (green-screen mp4) → 288 px / 15 fps animated webp with alpha (emo-anim-mass step 6, group order 15:40Z).
usage: th_cut.py PART in.mp4 out.webp      PART = out | loop | back
Same trim + key as dev/art/emo-anim/mo/cut.py, but:
 - written with Pillow so the ANIM chunk gets loop count + transparent background: -out/-back loop=1 bg 00000000, LOOP loop=0 (order);
 - own key = green UN-MIXING against the clip's real screen colour (≈#00DE06, not #00FF00): the semi-transparent white steam
   puffs come out white-transparent instead of grey-green (Thái hậu art has no green).
 usage extra: th_cut.py PART in.mp4 out.webp [start_s]"""
import subprocess, sys, numpy as np
from PIL import Image
sys.path.insert(0, __import__('os').path.join(__import__('os').path.dirname(__import__('os').path.abspath(__file__)), '..', 'mo'))
from cut import span
S = 288
def key(src, s, e):
    """Own green key: the Seedance screen is not pure #00FF00 (≈ #00DE06), so un-mix against the clip's REAL background colour
    (median of the frame corners): pixel = t*colour + (1-t)*bg, t = 1 - (G-max(R,B)) / (Gbg-max(Rbg,Bbg)); alpha = t, colour = (C-(1-t)bg)/t.
    Semi-transparent white steam comes out white + transparent (not grey-green); edges get no green fringe."""
    cmd = ["ffmpeg", "-loglevel", "error", "-ss", f"{s:.3f}", "-i", src]
    if e: cmd += ["-t", f"{e - s:.3f}"]
    cmd += ["-vf", f"scale={S}:{S}:flags=lanczos,fps=15,format=rgb24", "-f", "rawvideo", "-"]
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    fr = np.frombuffer(raw, np.uint8).reshape(-1, S, S, 3).astype(np.float32)
    c = np.concatenate([fr[:, :8, :8].reshape(-1, 3), fr[:, :8, -8:].reshape(-1, 3), fr[:, -8:, :8].reshape(-1, 3), fr[:, -8:, -8:].reshape(-1, 3)])
    bg = np.median(c, axis=0)
    bgex = max(bg[1] - max(bg[0], bg[2]), 60.0)
    out = np.zeros(fr.shape[:3] + (4,), np.uint8)
    for i, f in enumerate(fr):
        r, g, b = f[..., 0], f[..., 1], f[..., 2]
        t = np.clip(1.0 - (g - np.maximum(r, b)) / bgex, 0.0, 1.0)
        t = np.where(t > 0.93, 1.0, t)
        t = np.where(t < 0.06, 0.0, t)
        ts = np.maximum(t, 1e-3)
        r2 = np.clip((r - (1 - t) * bg[0]) / ts, 0, 255)
        g2 = np.clip((g - (1 - t) * bg[1]) / ts, 0, 255)
        b2 = np.clip((b - (1 - t) * bg[2]) / ts, 0, 255)
        g2 = np.minimum(g2, np.maximum(r2, b2))          # this art has no green: no cast left
        out[i, ..., 0], out[i, ..., 1], out[i, ..., 2] = r2, g2, b2
        # alpha: drop the faint haze of compressed screen noise (t < 0.2), stretch the rest back to 0..1
        al = np.clip((t - 0.2) / 0.73, 0.0, 1.0)
        out[i, ..., 3] = (al * 255).astype(np.uint8)
    print(f"  bg {bg.round()} green excess {bgex:.0f}")
    return out
def write(fr, dst, loop):
    ims = [Image.fromarray(f, 'RGBA') for f in fr]
    ims[0].save(dst, save_all=True, append_images=ims[1:], duration=67, loop=loop, background=(0, 0, 0, 0),
                quality=62, method=4, minimize_size=False)
if __name__ == "__main__":
    part, src, dst = sys.argv[1:4]
    s, e = span(part, src)
    if len(sys.argv) > 4: s = float(sys.argv[4])      # manual start (seconds in the clip)
    fr = key(src, s, e)
    write(fr, dst, 0 if part == 'loop' else 1)
    np.save(dst + '.npy', fr)  # frames for the review sheet (scratch only)
    print(f"{dst}: {len(fr)} frames, start {s:.2f}s end {f'{e:.2f}s' if e else 'full'}")
