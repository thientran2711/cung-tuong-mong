#!/usr/bin/env python3
"""Cut one emo-anim clip (green-screen mp4) into a 288 px / 15 fps animated webp with alpha (brief emo-anim-mass step 6).
usage: cut.py PART in.mp4 out.webp   PART = out | loop | back
  out : trimmed to the burst (from where motion starts to where it settles)
  loop: full clip
  back: from where the slide-in starts to the end (last frame = the still)
Key = ffmpeg chromakey=0x00FF00:0.28:0.08 (brief). Despill (G <= max(R,B)) is applied ONLY on the cut-out edge (pixels within 3 px of
the keyed area), not on the whole frame: a full-frame despill=type=green turns the yellow/green/teal discs (vui, binh, ghen, muu) orange/grey."""
import subprocess, sys, numpy as np
S = 288
def frames_gray(src):
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", src, "-vf", "fps=15,scale=96:96,format=gray", "-f", "rawvideo", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.uint8).reshape(-1, 96, 96).astype(np.float32)
def span(part, src, T=4.0):
    f = frames_gray(src); n = len(f); dur = n / 15.0
    if part == "loop": return 0.0, None
    d0 = np.abs(f - f[0]).mean(axis=(1, 2))
    moving = np.nonzero(d0 > T)[0]
    s = max(0, (moving[0] if len(moving) else 0) - 2) / 15.0
    if part == "back": return s, None
    dl = np.abs(f - f[-1]).mean(axis=(1, 2))
    still = np.nonzero(dl > T)[0]
    e = min(n, (still[-1] if len(still) else n - 1) + 6) / 15.0
    return s, min(max(e, s + 1.2), dur)
def dilate(m, r):
    o = m.copy()
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1):
            o |= np.roll(np.roll(m, dy, 0), dx, 1)
    return o
if __name__ == "__main__":
    part, src, dst = sys.argv[1:4]
    s, e = span(part, src)
    cmd = ["ffmpeg", "-loglevel", "error", "-ss", f"{s:.3f}", "-i", src]
    if e: cmd += ["-t", f"{e - s:.3f}"]
    cmd += ["-vf", f"chromakey=0x00FF00:0.28:0.08,scale={S}:{S}:flags=lanczos,fps=15,format=rgba", "-f", "rawvideo", "-"]
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    fr = np.frombuffer(raw, np.uint8).reshape(-1, S, S, 4).copy()
    for f in fr:
        a = f[..., 3]
        edge = dilate(a < 250, 3)
        r, g, b = (f[..., i].astype(np.int16) for i in range(3))
        lim = np.maximum(r, b)
        g2 = np.where(edge & (g > lim), lim, g)
        f[..., 1] = g2.astype(np.uint8)
        f[..., 3] = np.where(a < 8, 0, a)
    enc = ["ffmpeg", "-loglevel", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgba", "-s", f"{S}x{S}", "-r", "15", "-i", "-",
           "-c:v", "libwebp_anim", "-pix_fmt", "yuva420p", "-loop", "0", "-q:v", "50", "-compression_level", "6", dst]
    subprocess.run(enc, input=fr.tobytes(), check=True)
    print(f"{dst}: {len(fr)} frames, start {s:.2f}s end {f'{e:.2f}s' if e else 'full'}")
