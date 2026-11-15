#!/usr/bin/env python3
"""huadian.py — đo cỡ HOA ĐIỀN (dấu giữa trán) so với bề ngang mặt, và THU NHỎ bằng code (không vẽ lại).

Sếp 11/15: c05 t5 (trăng vàng) và t8 (chim vàng) hoa điền còn TO; mốc = cỡ đã duyệt trên c01-t2 (bản CDN đã thu).
Đo: khung mặt (Haar, face.py) → vùng trán giữa hai mày → điểm khác màu da rõ (đỏ son / vàng kim / sắc), bỏ tóc & mày (tối, ít sắc)
→ mảng gần trục giữa mặt nhất = hoa điền. tỉ lệ = bề ngang dấu / bề ngang mặt.
Thu nhỏ: cắt dấu (mặt nạ mờ biên), tô lại chỗ cũ bằng da xung quanh (inpaint), dán dấu thu nhỏ quanh đúng tâm cũ.
Dùng: python3 dev/art/huadian.py [--json R.json] FILE...      (đo)
      python3 dev/art/huadian.py --shrink RATIO --out DIR FILE...   (thu về tỉ lệ RATIO nếu đang lớn hơn)
"""
import sys, os, json, argparse, glob
import numpy as np, cv2
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", ".ahcache", "tools"))
import face as FACE

def skin_box(path, im):
    """fallback when Haar misses (crowns, turned heads): largest skin blob in the head zone → a face box like face.face_box"""
    H, W = im.shape[:2]; al = im[..., 3]; ys = np.where((al > 16).any(axis=1))[0]
    if not len(ys): return None
    por = os.path.basename(path).startswith(("por-", "face-"))
    y1 = H if por else int(ys.min() + 0.2 * (ys.max() - ys.min()))
    ycc = cv2.cvtColor(np.ascontiguousarray(im[:y1, :, :3]), cv2.COLOR_BGR2YCrCb).astype(np.int16)
    sk = ((al[:y1] >= 250) & (ycc[..., 0] > 120) & (ycc[..., 1] > 133) & (ycc[..., 1] < 170) & (ycc[..., 2] > 85) & (ycc[..., 2] < 125)).astype(np.uint8)
    sk = cv2.morphologyEx(sk, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    n, lab, st, _ = cv2.connectedComponentsWithStats(sk, 8)
    if n < 2: return None
    i = 1 + int(np.argmax(st[1:, cv2.CC_STAT_AREA])); x, y, w, h, ar = st[i]
    if ar < 80: return None
    fw = w * 1.0; hh = min(h, 1.25 * w)                 # skin blob ≈ face (+neck): keep a face-like height
    return (x - 0.15 * fw, y - 0.05 * hh / 1.3 * 1.3 - 0.2 * hh, x + 1.15 * fw, y + hh)

def find(path, im=None):
    if im is None: im = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    if im is None or im.ndim < 3 or im.shape[2] < 4: return None
    fb = FACE.face_box(path, im)
    if fb is None: fb = skin_box(path, im)
    if fb is None: return None
    x0, y0, x1, y1 = fb; fw = (x1 - x0) / 1.3          # face_box widened 15 % each side → Haar width
    H, W = im.shape[:2]; cx = (x0 + x1) / 2
    hy = (y1 - y0) / 1.30                                 # Haar height
    top = y0 + 0.05 * hy                                  # Haar top (approx. brow/forehead line)
    wx0, wx1 = int(max(0, cx - 0.22 * fw)), int(min(W, cx + 0.22 * fw))
    wy0, wy1 = int(max(0, top - 0.30 * hy)), int(min(H, top + 0.30 * hy))
    if wx1 - wx0 < 6 or wy1 - wy0 < 6: return None
    sub = im[wy0:wy1, wx0:wx1]; a = sub[..., 3]
    lab = cv2.cvtColor(sub[..., :3].astype(np.float32) / 255, cv2.COLOR_BGR2LAB); L, A, B = cv2.split(lab)
    # skin reference: cheeks
    cy0, cy1 = int(y0 + 0.55 * hy), int(y0 + 0.75 * hy); cxa, cxb = int(cx - 0.25 * fw), int(cx + 0.25 * fw)
    ch = cv2.cvtColor(im[cy0:cy1, cxa:cxb, :3].astype(np.float32) / 255, cv2.COLOR_BGR2LAB)
    m0 = im[cy0:cy1, cxa:cxb, 3] >= 250
    if m0.sum() < 20: return None
    Lc, ac, bc = [float(np.median(ch[..., i][m0])) for i in range(3)]
    dE = np.sqrt((L - Lc) ** 2 * 0.5 + (A - ac) ** 2 + (B - bc) ** 2)
    sat = np.sqrt(A * A + B * B); Cc = float(np.hypot(ac, bc))
    mark = (a >= 200) & (dE > 16) & ((sat > Cc + 8) | (A - ac > 10) | (B - bc > 14)) & (L > Lc - 45)
    mark = cv2.morphologyEx(mark.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
    n, lab_, st, cen = cv2.connectedComponentsWithStats(mark, 8)
    skin = (a >= 250) & (dE < 9)
    best = None; ccx = cx - wx0
    for need in (0.45, 0.28):                              # a mark sits ON the forehead skin (not hair, crown, hairpin)
        for i in range(1, n):
            x, y, w, h, ar = st[i]
            if ar < 4: continue
            d = abs(cen[i][0] - ccx)
            if d > 0.12 * fw: continue
            m = (lab_ == i).astype(np.uint8); ring = (cv2.dilate(m, np.ones((7, 7), np.uint8)) > 0) & (m == 0)
            sk = float(skin[ring].mean()) if ring.any() else 0
            if sk < need: continue
            sc = ar * sk / (1 + d)
            if best is None or sc > best[0]: best = (sc, i)
        if best: break
    if best is None: return dict(file=path, fw=round(fw, 1), mark=None)
    i = best[1]
    # grow into the fainter parts of the same ornament (gold wings, filigree): pixels clearly off-skin, connected, close by
    mk = (lab_ == i)
    soft = (a >= 200) & (dE > 9) & (L > Lc - 45)
    for _ in range(int(0.05 * fw) + 2):
        nb = cv2.dilate(mk.astype(np.uint8), np.ones((3, 3), np.uint8)) > 0
        new = nb & soft & ~mk
        if not new.any(): break
        mk = mk | new
    ys, xs = np.where(mk)
    bx0, bx1, by0, by1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
    return dict(file=path, fw=round(fw, 1), mark=[int(wx0 + bx0), int(wy0 + by0), int(bx1 - bx0), int(by1 - by0)],
                ratio=round(float(bx1 - bx0) / fw, 3), area=int(mk.sum())), (im, mk, (wx0, wy0, wx1, wy1))

def shrink(im, mk, win, k):
    """scale the mark by k (<1) around its centre; the old place is refilled from the skin around it"""
    wx0, wy0, wx1, wy1 = win; out = im.copy(); sub = out[wy0:wy1, wx0:wx1]
    bgr = np.ascontiguousarray(sub[..., :3]); m = mk.astype(np.uint8)
    hole = cv2.dilate(m, np.ones((5, 5), np.uint8))
    base = cv2.inpaint(bgr, hole, 5, cv2.INPAINT_TELEA)
    ys, xs = np.where(m > 0); cyy, cxx = (ys.min() + ys.max()) / 2, (xs.min() + xs.max()) / 2
    M = np.float32([[k, 0, cxx * (1 - k)], [0, k, cyy * (1 - k)]])
    alpha = cv2.GaussianBlur(cv2.dilate(m, np.ones((3, 3), np.uint8)).astype(np.float32), (3, 3), 0)
    sm = cv2.warpAffine(bgr.astype(np.float32), M, (bgr.shape[1], bgr.shape[0]), flags=cv2.INTER_AREA)
    sa = cv2.warpAffine(alpha, M, (bgr.shape[1], bgr.shape[0]), flags=cv2.INTER_LINEAR)[..., None]
    res = base.astype(np.float32) * (1 - sa) + sm * sa
    sub[..., :3] = np.clip(res + 0.5, 0, 255).astype(np.uint8)
    return out

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("files", nargs="+"); ap.add_argument("--json"); ap.add_argument("--shrink", type=float); ap.add_argument("--out")
    o = ap.parse_args(); files = []
    for f in o.files:
        if f.startswith("@"): files += [l.strip() for l in open(f[1:]) if l.strip()]
        else: files += sorted(glob.glob(f)) if any(c in f for c in "*?[") else [f]
    rep = []
    for f in files:
        r = find(f)
        if not r: continue
        info = r[0] if isinstance(r, tuple) else r; rep.append(info)
        if isinstance(r, tuple) and o.shrink and info["ratio"] > o.shrink * 1.08:
            im, mk, win = r[1]; os.makedirs(o.out, exist_ok=True)
            cv2.imwrite(os.path.join(o.out, os.path.basename(f)), shrink(im, mk, win, o.shrink / info["ratio"]), [cv2.IMWRITE_WEBP_QUALITY, 95])
        print("%-40s mặt %5.1f  dấu %s  tỉ lệ %s" % (os.path.basename(f), info["fw"], info.get("mark"), info.get("ratio")))
    if o.json: json.dump(rep, open(o.json, "w"))

if __name__ == "__main__":
    main()
