#!/usr/bin/env python3
"""Like dev/art/emo-anim/mo/cut.py, but the key is an RGB distance to the sampled background green (not ffmpeg chromakey),
so a bright lime/green DISC (hanghai) is not made see-through. Same trim, 288 px, 15 fps, edge-only despill."""
import subprocess, sys, numpy as np
sys.path.insert(0, '/home/user/cung-tuong-mong/dev/art/emo-anim/mo')
from cut import span, dilate, S
part, src, dst = sys.argv[1:4]
s, e = span(part, src)
cmd = ["ffmpeg", "-loglevel", "error", "-ss", f"{s:.3f}", "-i", src]
if e: cmd += ["-t", f"{e - s:.3f}"]
cmd += ["-vf", f"scale={S}:{S}:flags=lanczos,fps=15", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"]
fr = np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.uint8).reshape(-1, S, S, 3)
out = np.zeros(fr.shape[:3] + (4,), np.uint8)
for i, f in enumerate(fr):
    c = f.astype(np.int16); bg = np.median(np.concatenate([c[:6].reshape(-1, 3), c[-6:].reshape(-1, 3)]), 0)
    d = np.sqrt(((c - bg) ** 2).sum(-1)); a = np.clip((d - 70) / (140 - 70), 0, 1)
    a = (a * 255).astype(np.uint8)
    r, g, b = c[..., 0], c[..., 1], c[..., 2]; edge = dilate(a < 250, 3); lim = np.maximum(r, b)
    g = np.where(edge & (g > lim), lim, g)
    out[i] = np.dstack([r, g, b, np.where(a < 8, 0, a)]).astype(np.uint8)
enc = ["ffmpeg", "-loglevel", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgba", "-s", f"{S}x{S}", "-r", "15", "-i", "-",
       "-c:v", "libwebp_anim", "-pix_fmt", "yuva420p", "-loop", "0", "-q:v", "50", "-compression_level", "6", dst]
subprocess.run(enc, input=out.tobytes(), check=True)
print(f"{dst}: {len(out)} frames, start {s:.2f}s end {f'{e:.2f}s' if e else 'full'}")
