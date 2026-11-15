#!/usr/bin/env python3
"""alpha-holes.py — tìm LỖ ALPHA bên trong tranh người tách nền (fig-*, por-*, face-*).

Lỗi sếp thấy 11/15 (fig-night.jpg, Kính sự phòng tối, phi áo đỏ c01-t3): một mảng tối trên má phải — ảnh tách nền để
alpha < 255 ở giữa mặt, nền tối lộ qua. Cách dò: ghép ảnh lên nền ĐEN và nền TRẮNG rồi lấy hiệu (hiệu = 255·(1−alpha) =
chỗ nào nền lộ qua). Chỗ trong suốt hẳn (alpha < 16) là nền thật; chỗ còn lộ nền mà cách nền thật xa hơn mép mềm
(EDGE px) là LỖ TRONG. Thêm "lỗ kim": vùng trong suốt hẳn nhỏ bị bao kín giữa thân (giữa ngón tay, má…).

Dùng:
  python3 dev/art/alpha-holes.py [--json OUT.json] [--fix OUTDIR] [--min 30] FILE_OR_GLOB...
  --fix: viết bản sửa (alpha lỗ trong → 255, màu chỗ alpha thấp tô lại từ xung quanh bằng inpaint; mép mềm ngoài giữ nguyên)
  cho các tệp bị cờ vào OUTDIR (cùng tên). Không vẽ lại, không đụng điểm ảnh nào ngoài vùng lỗ.
"""
import sys, os, glob, json, argparse
import numpy as np, cv2

def scan(path, minarea=30):
    im = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    if im is None or im.ndim < 3 or im.shape[2] < 4:
        return None
    H, W = im.shape[:2]
    rgb = im[..., :3].astype(np.float32); a = im[..., 3].astype(np.float32) / 255
    on_black = rgb * a[..., None]
    on_white = rgb * a[..., None] + 255 * (1 - a[..., None])
    see = (np.abs(on_white - on_black).mean(axis=2)) / 255          # 0 = đặc, 1 = nền lộ hẳn
    clear = see > 0.94                                                  # alpha < ~16: nền thật
    if clear.sum() < 0.02 * H * W:                                      # không phải ảnh tách nền
        return None
    edge = max(4, round(0.006 * H))
    cl = clear.copy(); cl[0, :] = cl[-1, :] = cl[:, 0] = cl[:, -1] = True   # mép ảnh (chân chạm đáy) cũng tính là nền
    dist = cv2.distanceTransform((~cl).astype(np.uint8), cv2.DIST_L2, 3)
    part = (see > 0.02) & (~clear) & (dist > edge)                      # alpha < 250, xa nền thật
    solid = see < 0.02
    ycc = cv2.cvtColor(im[..., :3], cv2.COLOR_BGR2YCrCb).astype(np.int16)
    skin = solid & (ycc[..., 0] > 90) & (ycc[..., 1] > 133) & (ycc[..., 1] < 175) & (ycc[..., 2] > 80) & (ycc[..., 2] < 130)
    def ring_frac(m, x, y, w, h):
        """phần DA trong vành 3 px quanh lỗ (lỗ trên da mặt/tay = lỗi; lỗ giữa tóc, tua trâm, khe vải = có thể đúng)"""
        x0, y0, x1, y1 = max(0, x - 4), max(0, y - 4), min(W, x + w + 4), min(H, y + h + 4)
        mm = m[y0:y1, x0:x1].astype(np.uint8)
        ring = (cv2.dilate(mm, np.ones((7, 7), np.uint8)) > 0) & (mm == 0)
        if not ring.any(): return 0.0, 0.0, 99.0
        Y = ycc[y0:y1, x0:x1, 0][ring & solid[y0:y1, x0:x1]]
        return float(skin[y0:y1, x0:x1][ring].mean()), float(solid[y0:y1, x0:x1][ring].mean()), float(Y.std()) if Y.size else 99.0
    small = max(10, round(25 * (H / 900) ** 2))
    sil = max(1, int((~clear).sum()))
    def ok(h):
        """LỖ TRÊN DA = mảng mờ (alpha 20–199, không xuống tới 0 như khe hở thật giữa tua trâm/ngón tay), gọn (≤ 0,4 % thân),
        vành quanh phần lớn là da. Lỗ kim (alpha 0) và mảng mờ lớn (vải sa) chỉ báo."""
        return bool(h["kind"] == "partial" and 20 <= h["amin"] < 200 and h["skin"] >= 0.5 and h["area"] <= 0.004 * sil)
    holes = []
    mask = np.zeros((H, W), bool)
    n, lab, st, _ = cv2.connectedComponentsWithStats(part.astype(np.uint8), 8)
    for i in range(1, n):
        x, y, w, h, ar = st[i]
        if ar < small: continue
        m = lab == i
        sk, so, sd = ring_frac(m, x, y, w, h)
        holes.append(dict(kind="partial", area=int(ar), x=int(x), y=int(y), w=int(w), h=int(h),
                          amin=int(255 - see[m].max() * 255), skin=round(sk, 2), sd=round(sd, 1)))
        holes[-1]["fix"] = ok(holes[-1])
        if holes[-1]["fix"]: mask |= m
    # lỗ kim: vùng trong suốt hẳn, không chạm mép ảnh, nhỏ, bao kín bởi phần đặc
    n2, lab2, st2, _ = cv2.connectedComponentsWithStats(clear.astype(np.uint8), 4)
    pin_max = 0.0012 * H * H
    for i in range(1, n2):
        x, y, w, h, ar = st2[i]
        if x == 0 or y == 0 or x + w >= W or y + h >= H or ar > pin_max or ar < 4: continue
        m = lab2 == i
        sk, so, sd = ring_frac(m, x, y, w, h)
        if so > 0.85:
            holes.append(dict(kind="pin", area=int(ar), x=int(x), y=int(y), w=int(w), h=int(h), amin=0, skin=round(sk, 2), sd=round(sd, 1)))
            holes[-1]["fix"] = ok(holes[-1])
            if holes[-1]["fix"]: mask |= m
    # SỬA chỉ lỗ trên DA (vành quanh lỗ ≥ 50 % là da). Lỗ ở tóc / tua trâm / vải: chỉ báo (thường là khe hở thật hoặc vải sa).
    por = os.path.basename(path).startswith(("por-", "face-"))
    fa = sum(h["area"] for h in holes if h["fix"]); area = sum(h["area"] for h in holes)
    thr = max(15, minarea * (H / 900) ** 2)
    return dict(file=path, W=W, H=H, area=int(area), fixarea=int(fa), n=len(holes),
                holes=sorted(holes, key=lambda h: (not h["fix"], -h["area"]))[:12], bad=bool(fa >= thr),
                review=bool(area - fa >= 30 * thr)), (im, mask)



def fix(im, mask):
    out = im.copy()
    a = out[..., 3]
    m = cv2.dilate(mask.astype(np.uint8), np.ones((3, 3), np.uint8)).astype(bool) & (a < 250)
    low = (m & (a < 200)).astype(np.uint8)                              # màu chỗ này không tin được → tô lại
    if low.any():
        out[..., :3] = cv2.inpaint(np.ascontiguousarray(out[..., :3]), low, 3, cv2.INPAINT_TELEA)
    a[m] = 255
    return out

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("files", nargs="+"); ap.add_argument("--json"); ap.add_argument("--fix")
    ap.add_argument("--min", type=int, default=40)
    o = ap.parse_args()
    files = []
    for f in o.files:
        if f.startswith("@"): files += [l.strip() for l in open(f[1:]) if l.strip()]   # @list.txt: một đường dẫn mỗi dòng
        else: files += sorted(glob.glob(f)) if any(c in f for c in "*?[") else [f]
    rep = []
    for i, f in enumerate(files):
        r = scan(f, o.min)
        if not r: continue
        info, (im, mask) = r
        rep.append(info)
        if info["bad"]:
            print("%-48s lỗ trên da %5d px · tổng lỗ %d" % (os.path.basename(f), info["fixarea"], info["area"]), flush=True)
            if o.fix:
                os.makedirs(o.fix, exist_ok=True)
                cv2.imwrite(os.path.join(o.fix, os.path.basename(f)), fix(im, mask), [cv2.IMWRITE_WEBP_QUALITY, 101] if f.endswith(".png") else [cv2.IMWRITE_WEBP_QUALITY, 95])
    if o.json: json.dump(rep, open(o.json, "w"), ensure_ascii=False)
    bad = [r for r in rep if r["bad"]]
    print("quét %d ảnh tách nền, %d có lỗ trên da (sửa), %d có nhiều lỗ khác ở tóc/trâm/vải (chỉ báo)" % (len(rep), len(bad), sum(r["review"] for r in rep)))

if __name__ == "__main__":
    main()
