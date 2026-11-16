#!/usr/bin/env python3
"""unrosy.py — undo ONLY the rosy-skin layer (owner 16/11 12:45Z: "bỏ cái lớp hồng ... về cái B").

The rosy pass (dev/art/skin-smudge.py rosy() via scene-light/tools/hb.py, list dev/art/skin-rosy-fixed.txt; player look 1 via
skin-match/player.py; plus the skin-match neck/hands shift that followed it) only ADDED a smooth, small Lab offset on skin
(a* up to ~+13, b* -2..+6, L* -2.4..0). Later edits (huadian, makeup, outfit, neck wedge, edge extension) are large/sharp changes.

Method per file: D = Lab(current CDN) - Lab(pre-rosy git file, commit 3374e531 = last tree with img/ in git).
  valid = opaque & D inside the rosy envelope; S = normalised Gaussian blur of D over valid pixels (kills WebP noise, bridges
  edited pixels); applied = S x confidence x magnitude gate (|S| < 0.8 -> 0). out = current - applied (alpha, size untouched).
  -> later edits stay (their pixels are outside the envelope and get only the smooth rosy offset of their neighbours removed).
The same correction field (resized) is applied to the img/hd/ twin. Fields saved as .npz for the hd pass.

  python unrosy.py CURDIR PREDIR OUTDIR LIST LOG.jsonl
"""
import sys, os, json, numpy as np, cv2

def lab(im): return cv2.cvtColor(im[..., :3].astype(np.float32) / 255, cv2.COLOR_BGR2LAB)
def bgr(lb): return np.clip(cv2.cvtColor(lb.astype(np.float32), cv2.COLOR_LAB2BGR) * 255 + 0.5, 0, 255).astype(np.uint8)

def field(C, P, sigma):
    lc, lp = lab(C), lab(P); D = lc - lp
    op = (C[..., 3] >= 200) & (P[..., 3] >= 200)
    dl, da, db = D[..., 0], D[..., 1], D[..., 2]
    aligned = float((np.abs(dl[op]) < 4).mean()) if op.any() else 0.0
    v = op & (dl > -3.5) & (dl < 1.5) & (da > -1.5) & (da < 13.5) & (db > -3) & (db < 7.5)
    vf = v.astype(np.float32); Wt = cv2.GaussianBlur(vf, (0, 0), sigma)
    S = np.dstack([cv2.GaussianBlur(D[..., i] * vf, (0, 0), sigma) for i in range(3)]) / np.maximum(Wt, 1e-4)[..., None]
    conf = np.clip(Wt / 0.35, 0, 1)
    mag = np.abs(S[..., 1]) + np.abs(S[..., 2])
    gate = np.clip((mag - 0.8) / 0.8, 0, 1)
    core = (mag * conf > 1.5).astype(np.uint8)                 # rosy zones (face / neck / hands); clothes re-encode noise stays out
    n, lb, st, _ = cv2.connectedComponentsWithStats(core, 8)
    keep = np.isin(lb, [i for i in range(1, n) if st[i, 4] >= 40])
    zone = cv2.GaussianBlur(cv2.dilate(keep.astype(np.uint8), np.ones((9, 9), np.uint8)).astype(np.float32), (0, 0), 2)
    gate = gate * np.clip(zone * 1.5, 0, 1)
    S[..., 0] = np.minimum(S[..., 0], 0.5)            # rosy never brightened; never darken on undo
    A = S * (conf * gate)[..., None]
    return A, aligned, lc

def comp(im):
    a = im[..., 3:].astype(np.float32) / 255; return cv2.cvtColor((im[..., :3] * a + 128 * (1 - a)).astype(np.uint8), cv2.COLOR_BGR2GRAY)

def register(C, P):
    """pre file re-cut / re-cropped / rescaled later: similarity transform pre -> current (ORB + RANSAC), pre warped into current frame"""
    orb = cv2.ORB_create(4000); gc, gp = comp(C), comp(P)
    kc, dc = orb.detectAndCompute(gc, None); kp, dp = orb.detectAndCompute(gp, None)
    if dc is None or dp is None or len(kc) < 20 or len(kp) < 20: return None
    ms = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True).match(dp, dc)
    if len(ms) < 20: return None
    src = np.float32([kp[m.queryIdx].pt for m in ms]); dst = np.float32([kc[m.trainIdx].pt for m in ms])
    M, inl = cv2.estimateAffinePartial2D(src, dst, method=cv2.RANSAC, ransacReprojThreshold=2.0, maxIters=5000)
    if M is None or inl.sum() < 15: return None
    W = cv2.warpAffine(P, M, (C.shape[1], C.shape[0]), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 0, 0, 0))
    return W, M, int(inl.sum())

def apply(C, A, lc=None):
    if lc is None: lc = lab(C)
    w = np.clip((C[..., 3].astype(np.float32) - 150) / 50, 0, 1)[..., None]
    out = C.copy(); out[..., :3] = bgr(lc - A * w); return out

def headdetail(a, b, al):
    h = a.shape[0]; z = slice(0, int(h * .22)); m = al[z] >= 250
    if m.sum() < 50: return 1.0
    la = cv2.Laplacian(cv2.cvtColor(a[z][..., :3], cv2.COLOR_BGR2GRAY).astype(np.float32), cv2.CV_32F)[m].var()
    lb = cv2.Laplacian(cv2.cvtColor(b[z][..., :3], cv2.COLOR_BGR2GRAY).astype(np.float32), cv2.CV_32F)[m].var()
    return float(lb / max(la, 1e-6))

def save(path, im, ref):
    for q in (95, 98, 100):
        ok, buf = cv2.imencode(".webp", im, [cv2.IMWRITE_WEBP_QUALITY, q]); dec = cv2.imdecode(buf, cv2.IMREAD_UNCHANGED)
        r = headdetail(ref, dec, ref[..., 3])
        if r >= 0.98 or q == 100: open(path, "wb").write(buf.tobytes()); return q, round(r, 3), len(buf)

if __name__ == "__main__":
    CUR, PRE, OUT, LST, LOG = sys.argv[1:6]; os.makedirs(OUT + "/img", exist_ok=True); os.makedirs(OUT + "/fld", exist_ok=True)
    log = open(LOG, "a")
    for n in open(LST).read().split():
        C = cv2.imread(f"{CUR}/img/{n}", cv2.IMREAD_UNCHANGED); P = cv2.imread(f"{PRE}/img/{n}", cv2.IMREAD_UNCHANGED)
        rec = dict(f=n)
        if C is None or P is None or C.shape[2] < 4:
            rec["st"] = "nopre"; log.write(json.dumps(rec) + "\n"); continue
        sig = 2.0 if n.startswith("por-") else 1.3
        al = 0.0
        if C.shape == P.shape: A, al, lc = field(C, P, sig)
        if al < 0.85:
            r = register(C, P)
            if r is not None:
                Pw, M, ni = r; A, al, lc = field(C, Pw, sig)
                rec["reg"] = [round(float(np.hypot(M[0, 0], M[0, 1])), 4), round(float(M[0, 2]), 1), round(float(M[1, 2]), 1), ni]
        rec["aligned"] = round(al, 3)
        if al < 0.85: rec["st"] = "misaligned"; log.write(json.dumps(rec) + "\n"); continue
        m = A[..., 1] ** 2 + A[..., 2] ** 2 > 0.25
        rec["px"] = int(m.sum()); rec["da"] = round(float(A[..., 1][m].mean()), 2) if m.any() else 0; rec["db"] = round(float(A[..., 2][m].mean()), 2) if m.any() else 0
        rec["dL"] = round(float(A[..., 0][m].mean()), 2) if m.any() else 0
        if not m.any(): rec["st"] = "nochange"; log.write(json.dumps(rec) + "\n"); continue
        O = apply(C, A, lc); q, r, b = save(f"{OUT}/img/{n}", O, C); rec.update(st="ok", q=q, sharp=r, bytes=b)
        np.savez_compressed(f"{OUT}/fld/{n}.npz", A=A.astype(np.float16)); log.write(json.dumps(rec) + "\n"); log.flush()
