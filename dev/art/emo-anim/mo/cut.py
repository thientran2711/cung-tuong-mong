#!/usr/bin/env python3
"""Cut one emo-anim clip (green-screen mp4) into a 288 px / 15 fps animated webp with alpha (brief emo-anim-mass step 6).
usage: cut.py PART in.mp4 out.webp   PART = out | loop | back
  out : trimmed to the burst (from where motion starts to where it settles)
  loop: full clip
  back: from where the slide-in starts to the end (last frame = the still)"""
import subprocess, sys, numpy as np
VF = "chromakey=0x00FF00:0.28:0.08,despill=type=green,scale=288:288:flags=lanczos,fps=15"
def frames(src):
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", src, "-vf", "fps=15,scale=96:96,format=gray", "-f", "rawvideo", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.uint8).reshape(-1, 96, 96).astype(np.float32)
def span(part, src, T=4.0):
    f = frames(src); n = len(f); dur = n / 15.0
    if part == "loop": return 0.0, None
    d0 = np.abs(f - f[0]).mean(axis=(1, 2))
    moving = np.nonzero(d0 > T)[0]
    s = max(0, (moving[0] if len(moving) else 0) - 2) / 15.0
    if part == "back": return s, None
    dl = np.abs(f - f[-1]).mean(axis=(1, 2))
    still = np.nonzero(dl > T)[0]
    e = min(n, (still[-1] if len(still) else n - 1) + 6) / 15.0
    e = max(e, s + 1.2)
    return s, min(e, dur)
if __name__ == "__main__":
    part, src, dst = sys.argv[1:4]
    s, e = span(part, src)
    cmd = ["ffmpeg", "-loglevel", "error", "-y", "-ss", f"{s:.3f}", "-i", src]
    if e: cmd += ["-t", f"{e - s:.3f}"]
    cmd += ["-vf", VF, "-an", "-c:v", "libwebp_anim", "-pix_fmt", "yuva420p", "-loop", "0", "-q:v", "50", "-compression_level", "6", dst]
    subprocess.run(cmd, check=True)
    print(f"{dst}: start {s:.2f}s end {e if e else 'full'}")
