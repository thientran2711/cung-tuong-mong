#!/usr/bin/env python3
"""cutset.py name part=url ...  (part = out|loop|back): download mp4s to g/<name>-<part>.mp4, cut with th_cut.py (auto start),
still from g/<A png> if given as A=path, frame sheet. Run from repo root. Optional start override: out@1.5=url"""
import sys, os, subprocess
R = "/home/user/cung-tuong-mong"; G = os.environ.get("SG2_G", "/tmp/sg2/g"); os.makedirs(G, exist_ok=True); D = f"{R}/img/_review/emo-anim-groups"
name = sys.argv[1]
for a in sys.argv[2:]:
    p, u = a.split("=", 1); st = None
    if "@" in p: p, st = p.split("@")
    if p == "A":
        import numpy as np; from PIL import Image
        im = np.asarray(Image.open(u).convert("RGB")).astype(np.float32); R_, G_, B_ = im[..., 0], im[..., 1], im[..., 2]
        bg = np.median(np.concatenate([im[:20, :20].reshape(-1, 3), im[-20:, -20:].reshape(-1, 3)]), 0); ex = bg[1] - max(bg[0], bg[2])
        t = np.clip(1 - (G_ - np.maximum(R_, B_)) / ex, 0, 1); t = np.where(t > .93, 1, t); t = np.where(t < .06, 0, t); ts = np.maximum(t, 1e-3)
        c = [np.clip((im[..., i] - (1 - t) * bg[i]) / ts, 0, 255) for i in range(3)]; c[1] = np.minimum(c[1], np.maximum(c[0], c[2]))
        o = np.zeros(im.shape[:2] + (4,), np.uint8)
        for i in range(3): o[..., i] = c[i]
        o[..., 3] = (np.clip((t - .2) / .73, 0, 1) * 255).astype(np.uint8)
        img = Image.fromarray(o, "RGBA"); x0, y0, x1, y1 = img.getchannel("A").point(lambda v: 255 if v > 20 else 0).getbbox()
        s = max(x1 - x0, y1 - y0); cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
        os.makedirs(f"{D}/still", exist_ok=True)
        img.crop((cx - s // 2, cy - s // 2, cx - s // 2 + s, cy - s // 2 + s)).resize((160, 160), Image.LANCZOS).save(f"{D}/still/{name}.webp", quality=85); continue
    mp = f"{G}/{name}-{p}.mp4"
    if u.startswith("http"): subprocess.run(["curl", "-s", "-o", mp, u], check=True)
    dst = f"{D}/{name}.webp" if p == "loop" else f"{D}/{name}-{p}.webp"
    cmd = ["python3", f"{R}/dev/art/emo-anim/groups/th_cut.py", p, mp, dst] + ([st] if st else [])
    r = subprocess.run(cmd, capture_output=True, text=True); print(r.stdout.strip().splitlines()[-1] if r.stdout.strip() else r.stderr[-300:])
    if os.path.exists(dst + ".npy"): os.replace(dst + ".npy", f"{G}/{os.path.basename(dst)}.npy")
subprocess.run(["python3", f"{R}/dev/art/emo-anim/groups/th_sheet.py", name], cwd=R)
