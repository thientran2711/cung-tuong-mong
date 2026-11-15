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
    dist = cv2.distanceTransform((~clear).astype(np.uint8), cv2.DIST_L2, 3)
    part = (see > 0.02) & (~clear) & (dist > edge)                      # alpha < 250, xa nền thật
    n, lab, st, _ = cv2.connectedComponentsWithStats(part.astype(np.uint8), 8)
    small = max(6, round(minarea * (H / 900) ** 2 / 3))
    holes = []
    mask = np.zeros((H, W), bool)
    for i in range(1, n):
        ar = st[i, cv2.CC_STAT_AREA]
        if ar < small: continue
        m = lab == i
        holes.append(dict(kind="partial", area=int(ar), x=int(st[i, 0]), y=int(st[i, 1]), w=int(st[i, 2]), h=int(st[i, 3]),
                          amin=int(255 - see[m].max() * 255)))
        mask |= m
    # lỗ kim: vùng trong suốt hẳn, không chạm mép ảnh, nhỏ, bị thân đặc bao quanh
    n2, lab2, st2, _ = cv2.connectedComponentsWithStats(clear.astype(np.uint8), 4)
    pin_max = 0.0012 * H * H
    solid = (see < 0.02).astype(np.uint8)
    for i in range(1, n2):
        x, y, w, h, ar = st2[i]
        if x == 0 or y == 0 or x + w >= W or y + h >= H or ar > pin_max or ar < 4: continue
        m = (lab2 == i).astype(np.uint8)
        ring = cv2.dilate(m, np.ones((5, 5), np.uint8)) & (1 - m)
        if ring.sum() and (solid & ring).sum() / ring.sum() > 0.85:   # bao kín bởi phần đặc
            holes.append(dict(kind="pin", area=int(ar), x=int(x), y=int(y), w=int(w), h=int(h), amin=0))
            mask |= m.astype(bool)
    # vùng ĐẦU/MẶT: fig = 22 % trên của thân; por/face (chân dung) = 70 % trên của ảnh
    ys = np.where((~clear).any(axis=1))[0]; top, bot = (ys.min(), ys.max()) if len(ys) else (0, H)
    por = os.path.basename(path).startswith(("por-", "face-"))
    head_y = top + (0.70 if por else 0.22) * (bot - top)
    sil = max(1, int((~clear).sum()))
    fixmask = np.zeros((H, W), bool)
    for h in holes:
        h["head"] = h["y"] + h["h"] / 2 < head_y
        # sửa: mọi lỗ ở đầu/mặt; lỗ kim; lỗ thân thấy rõ (alpha < 128) và gọn (< 1 % thân). Mảng mờ lớn ở thân = có thể là vải sa mỏng → chỉ báo.
        h["fix"] = bool(h["head"] and h["amin"] < 240 or h["kind"] == "pin" or (h["amin"] < 128 and h["area"] < 0.01 * sil))
    for h in holes:
        if h["fix"]:
            x, y, w, hh = h["x"], h["y"], h["w"], h["h"]
            fixmask[y:y + hh, x:x + w] |= mask[y:y + hh, x:x + w]
    fa = sum(h["area"] for h in holes if h["fix"]); ha = sum(h["area"] for h in holes if h["head"])
    area = sum(h["area"] for h in holes)
    thr = minarea * (H / 900) ** 2 if not por else max(8, minarea * (H / 900) ** 2 / 2)
    return dict(file=path, W=W, H=H, area=int(area), head=int(ha), fixarea=int(fa), n=len(holes),
                holes=sorted(holes, key=lambda h: -h["area"])[:12], bad=fa >= thr, review=area - fa >= 20 * thr), (im, fixmask)

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
    ap.add_argument("--min", type=int, default=30)
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
            print("%-48s sửa %5d px (đầu/mặt %d) · tổng lỗ %d" % (os.path.basename(f), info["fixarea"], info["head"], info["area"]), flush=True)
            if o.fix:
                os.makedirs(o.fix, exist_ok=True)
                cv2.imwrite(os.path.join(o.fix, os.path.basename(f)), fix(im, mask), [cv2.IMWRITE_WEBP_QUALITY, 101] if f.endswith(".png") else [cv2.IMWRITE_WEBP_QUALITY, 95])
    if o.json: json.dump(rep, open(o.json, "w"), ensure_ascii=False)
    bad = [r for r in rep if r["bad"]]
    print("quét %d ảnh tách nền, %d có lỗ cần sửa, %d có mảng mờ lớn ở thân (chỉ báo)" % (len(rep), len(bad), sum(r["review"] for r in rep)))

if __name__ == "__main__":
    main()
