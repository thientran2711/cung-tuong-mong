#!/usr/bin/env python3
"""player.py — rosy tone for player look 1 (owner 15/11 20:15Z: look 1 still not rosy; reference = maid Ngọc Lan m03 warmth).
Whole visible skin (face + neck + hands, MediaPipe face/body-skin soft masks, Lab-close to the skin) gets one a*/b* offset so the face
reaches the target warmth, plus a soft blush on both cheeks (same shape as skin-smudge.rosy). Texture/L*/alpha untouched.
  python player.py OUTDIR FILE...    (por-* and fig-* of look 1)"""
import sys, os, numpy as np, cv2
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import seg, measure
T_A, T_B, BLUSH = 10.5, 12.5, 4.5   # face median target (m03 Ngọc Lan face ≈ a 8.3–8.5 b 11.0–11.2, approved rosy consorts a 10–12.5 b 12–15)

def run(im, por):
    raise RuntimeError("ROSY PASS RETIRED (owner 16/11 12:45Z: \"Thôi tất cả các hình về bỏ cái lớp dòng đi, về cái B á.\" = no rosy-skin layer on any picture; undone by dev/art/skin-norosy/). Never re-apply.")
    P = seg.probs(im, full=por); r = measure.regions(im, P); st = measure.stats(r)
    lab = r["lab"].copy(); L, A, B = lab[..., 0], lab[..., 1], lab[..., 2]
    da = float(np.clip(T_A - st["face_a"], 0, 4)); db = float(np.clip(T_B - st["face_b"], 0, 6))
    H, W = im.shape[:2]; sg = max(1.0, W / 300)
    skinp = np.clip((P[..., 2] + P[..., 3] - 0.3) / 0.4, 0, 1)
    sk = (r["face"] | r["body"]); sa, sb = float(np.median(A[sk])), float(np.median(B[sk]))
    cw = np.exp(-(((A - sa) / 7.0) ** 2 + ((B - sb) / 9.0) ** 2) / 2)
    feat = (L < st["face_L"] - 25) | (A > st["face_a"] + 10)          # eyes, brows, lips: keep
    w = cv2.GaussianBlur(skinp * cw * np.clip((L - 20) / 15, 0, 1) * (~feat), (0, 0), sg) * (im[..., 3] / 255.0)
    x0, y0, x1, y1 = r["fbox"]; fw, fh = x1 - x0, y1 - y0
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32); s2 = (0.12 * fw) ** 2
    g = sum(np.exp(-(((xx - (x0 + c * fw)) ** 2 + (yy - (y0 + 0.62 * fh)) ** 2) / (2 * s2))) for c in (0.30, 0.70))
    fm = cv2.GaussianBlur(r["face"].astype(np.float32), (0, 0), sg)
    lab[..., 1] += w * da + fm * BLUSH * g; lab[..., 2] += w * db + fm * 0.3 * BLUSH * g; lab[..., 0] -= fm * 0.6 * g
    out = im.copy(); out[..., :3] = np.clip(cv2.cvtColor(lab, cv2.COLOR_LAB2BGR) * 255 + 0.5, 0, 255).astype(np.uint8)
    return out, dict(da=round(da, 2), db=round(db, 2), face_a=st["face_a"], face_b=st["face_b"])

if __name__ == "__main__":
    o = sys.argv[1]; os.makedirs(o, exist_ok=True)
    for f in sys.argv[2:]:
        im = cv2.imread(f, cv2.IMREAD_UNCHANGED); b = os.path.basename(f)
        out, info = run(im, b.startswith("por-")); cv2.imwrite(os.path.join(o, b), out, [cv2.IMWRITE_WEBP_QUALITY, 92]); print(b, info)
