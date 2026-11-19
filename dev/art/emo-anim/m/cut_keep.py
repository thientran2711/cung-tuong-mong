#!/usr/bin/env python3
"""cut_keep.py — like ../cut.sh (same chromakey 0x00FF00:0.28:0.08 + despill=green, 288 px lanczos, 15 fps, animated webp alpha,
-q:v 50 -compression_level 6) but the despill is applied ONLY in a thin band at the cut-out edge; inside the figure/medallion
the original colours are kept. Reason: a full-frame despill turns green/teal medallions (binh sage, ghen green, muu teal)
grey/blue, so the clip no longer matches its still seal.

  python3 -I cut_keep.py <in.mp4> <out.webp> <start_s> [end_s]      (trim start = the value cut.sh's auto-trim printed)
"""
import subprocess, sys
import numpy as np

S, BAND = 288, 3
KEY = "chromakey=0x00FF00:0.28:0.08,despill=type=green"
SC = f"scale={S}:{S}:flags=lanczos,fps=15"


def raw(inp, ss, to, vf, fmt, ch):
    a = ["ffmpeg", "-loglevel", "error", "-ss", ss] + (["-to", to] if to else []) + ["-i", inp, "-vf", vf, "-f", "rawvideo", "-pix_fmt", fmt, "-"]
    b = subprocess.run(a, check=True, capture_output=True).stdout
    return np.frombuffer(b, np.uint8).reshape(-1, S, S, ch)


def dilate(m, r):
    o = m.copy()
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1):
            o |= np.roll(np.roll(m, dy, 0), dx, 1)
    return o


def main():
    inp, out, ss = sys.argv[1], sys.argv[2], sys.argv[3]
    to = sys.argv[4] if len(sys.argv) > 4 else None
    keyed = raw(inp, ss, to, f"{KEY},{SC}", "rgba", 4)
    orig = raw(inp, ss, to, SC, "rgb24", 3)
    n = min(len(keyed), len(orig))
    res = keyed[:n].copy()
    for i in range(n):
        band = dilate(keyed[i, :, :, 3] < 250, BAND)
        inner = ~band
        res[i, :, :, :3][inner] = orig[i][inner]
    enc = ["ffmpeg", "-loglevel", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgba", "-s", f"{S}x{S}", "-r", "15", "-i", "-",
           "-c:v", "libwebp_anim", "-pix_fmt", "yuva420p", "-loop", "0", "-q:v", "50", "-compression_level", "6", out]
    subprocess.run(enc, input=res.tobytes(), check=True)
    print(f"{out} start={ss}s frames={n}")


main()
