#!/usr/bin/env python3
"""fix.py — bring neck / hands / forearms skin to the face tone (skin-match, owner 15/11 20:15Z).
Local colour transfer in Lab: a constant a*/b* offset per region (neck, hands) added with a soft weight
  w = P_body (MediaPipe body-skin, blurred) x Lab closeness to the body-skin median x alpha x (1 - P_face)
so texture, shading and line work stay (L* untouched), clothes/props (not skin-coloured / not body-skin) are not touched and
the face (already rosy, owner-approved) is not touched. Positions/alpha never change (toil-fit / veil / scar data stay valid).
  shift(region) = clip((face - region) - BASE(region), caps)  where BASE = natural face-minus-body offset measured on figures that
  never had the rosy pass (calibrate.py)."""
import sys, os, json, numpy as np, cv2
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import seg, measure

from rule import shift_for, CAP_A, TRIG_A

def apply(im, r, sh_neck, sh_hands, por=False):
    lab = r["lab"].copy(); P = r["P"]; A, B, L = lab[..., 1], lab[..., 2], lab[..., 0]
    body = r["body"]
    if body.sum() < 40: return im
    ba, bb = float(np.median(A[body])), float(np.median(B[body]))
    H, W = im.shape[:2]; sg = max(1.0, W / 300)
    pb = cv2.GaussianBlur(np.clip((P[..., 2] - 0.25) / 0.45, 0, 1), (0, 0), sg)
    pf = cv2.GaussianBlur(np.clip((P[..., 3] - 0.3) / 0.4, 0, 1), (0, 0), sg)
    cw = np.exp(-(((A - ba) / 6.0) ** 2 + ((B - bb) / 8.0) ** 2) / 2)
    lw = np.clip((L - 20) / 15, 0, 1)
    w = pb * cw * lw * (im[..., 3].astype(np.float32) / 255) * (1 - pf)
    w = np.minimum(w, cv2.GaussianBlur(w, (0, 0), sg) * 1.6)   # no isolated speckles
    fx0, fy0, fx1, fy1 = r["fbox"]; fh = fy1 - fy0 + 1
    yy = np.arange(H, dtype=np.float32)[:, None] * np.ones((1, W), np.float32)
    t = np.clip((yy - (fy1 + 0.9 * fh)) / (0.4 * fh) + 0.5, 0, 1)   # 0 = neck, 1 = hands/forearms
    if por: t[:] = 0
    da = (1 - t) * sh_neck[0] + t * sh_hands[0]; db = (1 - t) * sh_neck[1] + t * sh_hands[1]
    lab[..., 1] += w * da; lab[..., 2] += w * db
    out = im.copy()
    out[..., :3] = np.clip(cv2.cvtColor(lab, cv2.COLOR_LAB2BGR) * 255 + 0.5, 0, 255).astype(np.uint8)
    return out

def por_regions(im):
    """portrait (square-ish crop): one whole-image tile; neck = all body skin"""
    P = seg.probs(im, full=True)
    return measure.regions(im, P)
