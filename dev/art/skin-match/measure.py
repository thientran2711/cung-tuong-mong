#!/usr/bin/env python3
"""measure.py — face skin vs body skin (neck / hands-forearms) tone for transparent full-body figures (skin-match, owner 15/11 20:15Z).
  python measure.py OUT.jsonl FILE...      (appends; skips files already in OUT.jsonl)
Skin regions from MediaPipe selfie-multiclass (seg.py): face-skin (class 3) and body-skin (class 2), each refined in Lab:
  face = P_face>0.6, solid alpha, minus eyes/brows/lips (dark or very red) ; body = P_body>0.5, solid alpha, Lab-close to its own
  robust median (drops pink embroidery / props the model calls skin). neck = body pixels within 0.9 face-heights under the face,
  hands = the rest. Reports median L*, a*, b* per region (OpenCV float Lab) + pixel counts."""
import sys, os, json, numpy as np, cv2
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import seg

def lab_of(im):
    return cv2.cvtColor(im[..., :3].astype(np.float32) / 255, cv2.COLOR_BGR2LAB)

def regions(im, P=None):
    if P is None: P = seg.probs(im)
    lab = lab_of(im); L, A, B = lab[..., 0], lab[..., 1], lab[..., 2]; solid = im[..., 3] >= 250
    face = (P[..., 3] > 0.6) & solid
    if face.sum() < 30: return None
    # keep the largest face blob
    n, lb, st, _ = cv2.connectedComponentsWithStats(face.astype(np.uint8), 8)
    if n > 2: face = lb == (1 + int(np.argmax(st[1:, 4])))
    fL, fa, fb = [float(np.median(c[face])) for c in (L, A, B)]
    face &= (L > fL - 25) & (A < fa + 10)
    ys, xs = np.where(face); fy0, fy1 = ys.min(), ys.max(); fh = fy1 - fy0 + 1
    body = (P[..., 2] > 0.5) & solid & (L > 25)
    if body.sum() >= 40:
        for _ in range(2):
            ba, bb = float(np.median(A[body])), float(np.median(B[body]))
            body &= (np.abs(A - ba) < 8) & (np.abs(B - bb) < 10)
            if body.sum() < 40: break
    yy = np.arange(im.shape[0])[:, None]
    neck = body & (yy > fy0 + 0.5 * fh) & (yy < fy1 + 0.9 * fh)
    hands = body & ~neck
    return dict(face=face, body=body, neck=neck, hands=hands, lab=lab, P=P, fbox=(int(xs.min()), int(fy0), int(xs.max()), int(fy1)))

def stats(r):
    out = {}
    for k in ("face", "neck", "hands", "body"):
        m = r[k]; n = int(m.sum()); out[k + "_n"] = n
        if n >= 40:
            for i, c in enumerate("Lab"): out[k + "_" + c] = round(float(np.median(r["lab"][..., i][m])), 2)
    return out

def main():
    out = sys.argv[1]; done = set()
    if os.path.exists(out):
        for l in open(out):
            try: done.add(json.loads(l)["f"])
            except Exception: pass
    with open(out, "a") as fo:
        for f in sys.argv[2:]:
            b = os.path.basename(f)
            if b in done: continue
            im = cv2.imread(f, cv2.IMREAD_UNCHANGED); rec = {"f": b}
            if im is None or im.ndim < 3 or im.shape[2] < 4: rec["err"] = "read"
            else:
                if im.shape[0] > 500: im = cv2.resize(im, None, fx=0.5, fy=0.5, interpolation=cv2.INTER_AREA)   # audit at half size
                r = regions(im, seg.probs_quick(im) if im.shape[0] > 1.3 * im.shape[1] else seg.probs(im, maxt=2))
                if r is None: rec["err"] = "noface"
                else: rec.update(stats(r)); rec["fbox"] = r["fbox"]
            fo.write(json.dumps(rec) + "\n"); fo.flush()

if __name__ == "__main__":
    main()
