#!/usr/bin/env python3
"""dark-residue.py — vết ĐEN/XÁM TỐI sót lại khi tách nền ở vùng đầu–cổ–cổ áo của tranh người (fig-*/por-*).

Sếp 15/11 17:40Z: hình nàng (Thường tại) có vết đen ở cổ, bên trái cổ áo — nền tối cũ còn dính lại sau tách nền.
Cách dò: trong dải trên của hình (đỉnh đầu → 38 % chiều cao; tâm mảng ở vùng cổ 9–30 % với fig, 45–98 % với por), lấy điểm ĐẶC (alpha ≥ 160) TỐI (độ sáng < 85) và ÍT MÀU (sắc < 28),
gom thành mảng; mảng bị cờ khi: chạm nền trong suốt (trong 3 px), nhỏ gọn (≤ 0,6 % dải), vành 5 px quanh nó phần lớn SÁNG (da/áo, trung
bình độ sáng ≥ 150, ≤ 25 % tối) — tức là KHÔNG dính vào khối tóc lớn. Tóc, lông mày, mắt (không chạm nền) không bị bắt.
Sửa (--fix OUT): mảng bị cờ + 1 px → trong suốt nếu nằm ở mép ngoài (vết sót nền), tô lại từ xung quanh (inpaint) nếu lọt vào giữa thân.
Dùng: python3 dev/art/dark-residue.py [--json R.json] [--fix OUTDIR] [--sheet S.jpg] FILE|GLOB|@list ...
"""
import sys, os, glob, json, argparse
import numpy as np, cv2
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "scene-light", "tools"))
try:
    import face as FACE                       # Haar face box (needs opencv 4.x with CascadeClassifier)
except Exception:
    FACE = None

SKIN_MIN = 0.45
MEN = ("man", "eunuch", "emperor", "official", "physician")
NECK = {False: (0.09, 0.30), True: (0.45, 0.98)}   # tỉ lệ theo chiều cao hình: fig = dưới cằm–cổ áo; por = nửa dưới khung

def scan(path):
    im = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    if im is None or im.ndim < 3 or im.shape[2] < 4: return None
    H, W = im.shape[:2]; a = im[..., 3]
    ys = np.where((a > 16).any(1))[0]
    if not len(ys): return None
    top, bot = ys.min(), ys.max()
    por = os.path.basename(path).startswith(("por-", "face-"))
    if os.path.basename(path).split("-")[1] in MEN: return None      # men: dark hair at the nape / hat ribbons are real, not residue
    y1 = H if por else min(H, int(top + 0.38 * (bot - top)))
    if FACE is None: raise SystemExit("dark-residue.py needs cv2.CascadeClassifier (opencv-python-headless<5)")
    fb = FACE.face_box(path, im)
    if fb is None: return None                 # no face found → do not guess
    fx0, fy0, fx1, fy1 = fb; fw, fh = fx1 - fx0, fy1 - fy0
    sub = im[:y1]; A = sub[..., 3]
    hsv = cv2.cvtColor(np.ascontiguousarray(sub[..., :3]), cv2.COLOR_BGR2HSV)
    lab = cv2.cvtColor(np.ascontiguousarray(sub[..., :3]), cv2.COLOR_BGR2LAB).astype(np.int16)
    Lm = lab[..., 0]; C = np.hypot(lab[..., 1] - 128, lab[..., 2] - 128)
    solid = A >= 160; clear = A < 40
    dark = solid & (Lm < 85) & (C < 28)
    ycc = cv2.cvtColor(np.ascontiguousarray(sub[..., :3]), cv2.COLOR_BGR2YCrCb).astype(np.int16)
    skin = solid & (ycc[..., 0] > 120) & (ycc[..., 1] > 136) & (ycc[..., 1] < 170) & (ycc[..., 2] > 95) & (ycc[..., 2] < 125)
    nearbg = cv2.dilate(clear.astype(np.uint8), np.ones((7, 7), np.uint8)) > 0
    band = int(solid.sum())
    if band < 100: return None
    n, lb, st, _ = cv2.connectedComponentsWithStats(dark.astype(np.uint8), 8)
    hits = []; mask = np.zeros(A.shape, bool)
    for i in range(1, n):
        x, y, w, h, ar = st[i]
        k9 = fw / 112                                                     # size unit: face width (≈112 px in a 900-px fig)
        if ar < max(12, 36 * k9 ** 2) or ar > 150 * k9 ** 2 or h > 28 * k9 or w > 14 * k9 or h < 0.8 * w or h > 3.4 * w: continue
        # the neck wedge = a small upright dark triangle under the ear (buns and hair strands are larger / longer and are skipped)
        m = lb[y:y+h, x:x+w] == i
        if not (nearbg[y:y+h, x:x+w] & m).any(): continue
        x0, y0, x1, y1_ = max(0, x-6), max(0, y-6), min(W, x+w+6), min(A.shape[0], y+h+6)
        mm = np.zeros((y1_-y0, x1-x0), np.uint8); mm[y-y0:y-y0+h, x-x0:x-x0+w] = m
        ring = (cv2.dilate(mm, np.ones((11, 11), np.uint8)) > 0) & (mm == 0) & solid[y0:y1_, x0:x1]
        if ring.sum() < 10: continue
        rl = Lm[y0:y1_, x0:x1][ring]; rd = (dark[y0:y1_, x0:x1][ring]).mean(); rs = float(skin[y0:y1_, x0:x1][ring].mean())
        if rs < SKIN_MIN: continue                                       # must sit against neck/jaw SKIN (not hair ornaments, tassels)
        if rl.mean() < 150 or rd > 0.25: continue
        ry = (y + h / 2 - top) / max(1, bot - top)
        if not (NECK[por][0] <= ry <= NECK[por][1]): continue          # chỉ vùng cổ / cổ áo (dưới tai), không tóc đỉnh đầu
        cx_, cy_ = x + w / 2, y + h / 2                                   # the neck wedge sits under the ear, jaw → chin level, at the face side
        if not (fy0 + 0.50 * fh <= cy_ <= fy1 + 0.45 * fh): continue
        if fx0 + 0.22 * fw < cx_ < fx1 - 0.22 * fw: continue              # not in the middle of the face/neck
        if cx_ < fx0 - 0.30 * fw or cx_ > fx1 + 0.30 * fw: continue       # not far out in hair/ornaments
        depth = float(rl.mean() - Lm[y:y+h, x:x+w][m].mean())
        hits.append(dict(x=int(x), y=int(y), w=int(w), h=int(h), area=int(ar), ring=round(float(rl.mean()), 1), depth=round(depth, 1), skin=round(rs, 2),
                         rel_y=round((y - top) / max(1, bot - top), 3)))
        mask[y:y+h, x:x+w] |= m
    score = sum(h["area"] * h["depth"] for h in hits) / 100
    return dict(file=path, n=len(hits), score=round(score, 1), hits=sorted(hits, key=lambda h: -h["area"] * h["depth"])[:8]), (im, mask, clear)

def fix(im, mask, clear):
    out = im.copy(); H = mask.shape[0]
    m = mask | ((cv2.dilate(mask.astype(np.uint8), np.ones((3, 3), np.uint8)) > 0) & (im[:H, :, 3] < 235))
    # mảng tối nối với nền trong suốt = vết sót nền → bỏ (alpha 0, mép mềm 1 px); phần lọt vào giữa thân → tô lại
    n, lb = cv2.connectedComponents(m.astype(np.uint8), connectivity=8)
    outer = np.zeros_like(m); inner = np.zeros_like(m)
    dist = cv2.distanceTransform((~clear).astype(np.uint8), cv2.DIST_L2, 3)
    for i in range(1, n):
        c = lb == i
        if dist[c].min() <= 4: outer |= c                                   # touches the transparent background → remove the whole wedge
        else: inner |= c
    sub = out[:H]
    if inner.any(): sub[..., :3] = cv2.inpaint(np.ascontiguousarray(sub[..., :3]), inner.astype(np.uint8), 3, cv2.INPAINT_TELEA)
    if outer.any():
        # also clear the grey half-transparent fringe around the wedge (the old background shows through it), never skin
        ycc = cv2.cvtColor(np.ascontiguousarray(sub[..., :3]), cv2.COLOR_BGR2YCrCb).astype(np.int16)
        skinlike = (ycc[..., 0] > 120) & (ycc[..., 1] > 136) & (sub[..., 3] > 200)
        zone = cv2.dilate(outer.astype(np.uint8), np.ones((5, 5), np.uint8)) > 0
        outer = outer | (zone & ~skinlike & (sub[..., 3] < 235) & (ycc[..., 0] < 150))
        a = sub[..., 3].astype(np.float32)
        soft = cv2.GaussianBlur(outer.astype(np.float32), (0, 0), 0.8)
        a = a * (1 - np.clip(soft * 1.3, 0, 1)); sub[..., 3] = a.astype(np.uint8)
    return out

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("files", nargs="+"); ap.add_argument("--json"); ap.add_argument("--fix")
    ap.add_argument("--min", type=float, default=3.0, help="điểm tối thiểu để sửa")
    o = ap.parse_args(); files = []
    for f in o.files:
        if f.startswith("@"): files += [l.strip() for l in open(f[1:]) if l.strip()]
        else: files += sorted(glob.glob(f)) if any(c in f for c in "*?[") else [f]
    rep = []
    for f in files:
        r = scan(f)
        if not r: continue
        info, st = r; rep.append(info)
        if o.fix and info["score"] >= o.min:
            os.makedirs(o.fix, exist_ok=True); cv2.imwrite(os.path.join(o.fix, os.path.basename(f)), fix(*st), [cv2.IMWRITE_WEBP_QUALITY, 95])
    if o.json: json.dump(rep, open(o.json, "w"))
    for r in sorted(rep, key=lambda r: -r["score"])[:20]:
        print("%-44s điểm %6.1f  mảng %d  %s" % (os.path.basename(r["file"]), r["score"], r["n"], r["hits"][:1]))
    print("quét", len(rep), "· bị cờ (điểm ≥ %.1f):" % o.min, sum(r["score"] >= o.min for r in rep))

if __name__ == "__main__": main()
