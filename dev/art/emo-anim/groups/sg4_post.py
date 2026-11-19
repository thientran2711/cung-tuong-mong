#!/usr/bin/env python3
"""SEAL4 helpers (run from the repo root).
  flat  in.png out.png                      -> if RGBA: flatten onto #00FF00 (prints 'RGBA' or 'opaque'); opaque input is copied
  cut   <name e.g. ht-vui> A.png out.mp4 loop.mp4 back.mp4 [out_start_s]
        -> img/_review/emo-anim-groups/<name>-out.webp, <name>.webp, <name>-back.webp, still/<name>.webp (A keyed, 160 px), <name>-frames.jpg
  The .npy side files of th_cut.py go to $SG4_SCRATCH (default /tmp)."""
import sys, os, subprocess, shutil, glob
import numpy as np
from PIL import Image
H = os.path.dirname(os.path.abspath(__file__)); D = "img/_review/emo-anim-groups"
SCR = os.environ.get("SG4_SCRATCH", "/tmp")
def flat(src, dst):
    im = Image.open(src)
    if im.mode in ("RGBA", "LA", "P") and im.convert("RGBA").getchannel("A").getextrema()[0] < 255:
        c = Image.new("RGBA", im.size, (0, 255, 0, 255)); c.alpha_composite(im.convert("RGBA")); c.convert("RGB").save(dst); print("RGBA")
    else:
        im.convert("RGB").save(dst); print("opaque")
def still(src, dst):
    f = np.array(Image.open(src).convert("RGB")).astype(np.float32)
    c = np.concatenate([f[:16, :16].reshape(-1, 3), f[-16:, -16:].reshape(-1, 3), f[:16, -16:].reshape(-1, 3), f[-16:, :16].reshape(-1, 3)]); bg = np.median(c, 0)
    bgex = max(bg[1] - max(bg[0], bg[2]), 60.0); r, g, b = f[..., 0], f[..., 1], f[..., 2]
    t = np.clip(1 - (g - np.maximum(r, b)) / bgex, 0, 1); t = np.where(t > 0.93, 1, t); t = np.where(t < 0.06, 0, t); ts = np.maximum(t, 1e-3)
    o = np.zeros(f.shape[:2] + (4,), np.uint8)
    r2 = np.clip((r - (1 - t) * bg[0]) / ts, 0, 255); g2 = np.clip((g - (1 - t) * bg[1]) / ts, 0, 255); b2 = np.clip((b - (1 - t) * bg[2]) / ts, 0, 255)
    g2 = np.minimum(g2, np.maximum(r2, b2))
    o[..., 0], o[..., 1], o[..., 2] = r2, g2, b2; o[..., 3] = (np.clip((t - 0.2) / 0.73, 0, 1) * 255).astype(np.uint8)
    im = Image.fromarray(o, "RGBA"); x0, y0, x1, y1 = im.getchannel("A").point(lambda v: 255 if v > 40 else 0).getbbox()
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2; s = max(x1 - x0, y1 - y0) / 2 + 4
    im.crop((int(cx - s), int(cy - s), int(cx + s), int(cy + s))).resize((160, 160), Image.LANCZOS).save(dst, quality=90, method=6)
if __name__ == "__main__":
    a = sys.argv[1:]
    if a[0] == "flat": flat(a[1], a[2]); sys.exit()
    name, A, o, l, b = a[1:6]; st = a[6:7]
    os.makedirs(f"{D}/still", exist_ok=True)
    for part, src, dst in (("out", o, f"{D}/{name}-out.webp"), ("loop", l, f"{D}/{name}.webp"), ("back", b, f"{D}/{name}-back.webp")):
        r = subprocess.run(["python3", f"{H}/th_cut.py", part, src, dst] + (st if part == "out" else []), capture_output=True, text=True)
        print(r.stdout.strip().splitlines()[-1] if r.returncode == 0 else r.stderr)
        if os.path.exists(dst + ".npy"): shutil.move(dst + ".npy", os.path.join(SCR, os.path.basename(dst) + ".npy"))
    still(A, f"{D}/still/{name}.webp")
    r = subprocess.run(["python3", f"{H}/th_sheet.py", name], capture_output=True, text=True); print(r.stdout.strip())
