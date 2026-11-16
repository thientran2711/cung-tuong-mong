#!/usr/bin/env python3
"""skin-smudge.py — xếp hạng mặt "da bẩn" (vệt xám/tối, mảng bóng loang trên da mặt) trong tranh người tách nền.

Sếp 11/15: vài người có da mặt lấm lem (vệt xám, mảng tối) so với mặt sạch. Cách đo trong KHUNG MẶT (Haar, dev cache face.py):
  da = điểm ảnh đặc (alpha ≥ 250) có màu da (YCrCb), bỏ mắt/mày/môi/hoa điền (không phải màu da) và nới 2 px quanh chúng;
  nền da trơn = trung vị cục bộ (median 1/6 mặt) của độ sáng L và sắc C (Lab);
  VẾT BẨN = điểm da TỐI hơn nền da trơn ≥ 7 L và XÁM hơn (C thấp hơn ≥ 3) — bóng xám, không phải má hồng;
  điểm = % diện tích da là vết bẩn × độ sâu TB; thêm 'loang' = độ lệch chuẩn của L sau lọc thông cao (da mịn thấp).
Dùng: python3 dev/art/skin-smudge.py --json R.json FILE|GLOB|@list.txt
      python3 dev/art/skin-smudge.py --fix OUTDIR FILE...   (sửa nhẹ: tách tần số — chỉ lớp màu/tông thấp của vết bẩn được kéo về nền da trơn,
                                                          giữ lớp chi tiết; mắt/mày/môi/hoa điền/viền mặt không đụng)
"""
import sys, os, glob, json, argparse
import numpy as np, cv2
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "scene-light", "tools"))
try:
    import face as FACE
except Exception:
    FACE = None

def analyse(path):
    im = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    if im is None or im.ndim < 3 or im.shape[2] < 4 or FACE is None: return None
    fb = FACE.face_box(path, im)
    if fb is None: return None
    H, W = im.shape[:2]
    x0, y0, x1, y1 = [int(round(v)) for v in fb]; x0, y0 = max(0, x0), max(0, y0); x1, y1 = min(W, x1), min(H, y1)
    if x1 - x0 < 20 or y1 - y0 < 20: return None
    sub = im[y0:y1, x0:x1]; bgr = np.ascontiguousarray(sub[..., :3]); a = sub[..., 3]
    lab = cv2.cvtColor(bgr.astype(np.float32) / 255, cv2.COLOR_BGR2LAB); L, A, B = cv2.split(lab); C = np.sqrt(A * A + B * B)
    h, w = L.shape
    cy0, cy1, cx0, cx1 = int(h * .45), int(h * .70), int(w * .35), int(w * .65)     # cheeks + nose: the reference skin
    pm = a[cy0:cy1, cx0:cx1] >= 250
    if pm.sum() < 20: return None
    Lc, ac, bc = [float(np.median(ch[cy0:cy1, cx0:cx1][pm])) for ch in (L, A, B)]; Cc = float(np.hypot(ac, bc))
    core = ((a >= 250) & (np.abs(A - ac) < 12) & (np.abs(B - bc) < 14) & (L > Lc - 30)).astype(np.uint8)
    n, lab_, st, _ = cv2.connectedComponentsWithStats(core, 8)
    cl = lab_[(cy0 + cy1) // 2, (cx0 + cx1) // 2]
    if cl == 0:
        ids, cnt = np.unique(lab_[cy0:cy1, cx0:cx1][lab_[cy0:cy1, cx0:cx1] > 0], return_counts=True)
        if not len(ids): return None
        cl = ids[np.argmax(cnt)]
    main = (lab_ == cl).astype(np.uint8)
    cnts, _ = cv2.findContours(main, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    reg = np.zeros_like(main); cv2.fillPoly(reg, [cv2.convexHull(np.vstack(cnts))], 1)
    reg = cv2.erode(reg, np.ones((5, 5), np.uint8)) & (main | cv2.morphologyEx(main, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8)))
    feat = ((L < Lc - 35) | (C > Cc + 14) | (a < 250)).astype(np.uint8)          # eyes, brows, lashes, lips, huadian, holes
    skin = (reg > 0) & (cv2.dilate(feat, np.ones((5, 5), np.uint8)) == 0)
    skin[int(h * 0.86):] = False                                                  # stop at the chin: neck/collar shade is natural
    if skin.sum() < 0.12 * skin.size: return None
    k = max(5, int((x1 - x0) / 6) | 1)
    def smooth(ch):  # skin-only local median approximation: normalized blur of skin pixels
        m = skin.astype(np.float32); s = cv2.blur(ch * m, (k, k)); n = cv2.blur(m, (k, k)); return s / np.maximum(n, 1e-3)
    Lb, Cb = smooth(L), smooth(C)
    gl = np.median(L[skin]); gc = np.median(C[skin])
    ref_L = np.maximum(Lb, gl - 4)   # local reference, but a wide grey zone cannot become its own reference
    dark = (ref_L - L); grey = (np.maximum(Cb, gc - 2) - C)
    sm = skin & (dark >= 7) & (grey >= 3)
    sm = cv2.morphologyEx(sm.astype(np.uint8), cv2.MORPH_OPEN, np.ones((2, 2), np.uint8)) > 0
    sm = blobs_only(sm, dark, w, h, path, skin=skin, C=C, Cc=Cc)
    hp = (L - cv2.GaussianBlur(L, (0, 0), max(1.0, (x1 - x0) / 60)))[skin]
    frac = float(sm.sum()) / float(skin.sum()); depth = float(dark[sm].mean()) if sm.any() else 0.0
    return dict(file=path, box=[x0, y0, x1, y1], skin=int(skin.sum()), smudge=round(100 * frac, 2), depth=round(depth, 1),
                mottle=round(float(hp.std()), 2), score=round(100 * frac * depth / 10, 2),
                Lc=round(Lc, 1), ac=round(ac, 1), bc=round(bc, 1), Cc=round(Cc, 1)), (im, sm, skin, (x0, y0, x1, y1), Lb, Cb, gl, gc)

MEN_ROLES = ("man", "eunuch", "official", "emperor", "physician")

def blobs_only(sm, dark, w, h, path, skin=None, C=None, Cc=None):
    """CALIBRATION (coordinator 15/11): keep only real smudges = soft, roundish grey patches.
    Dropped: thin/elongated marks (wrinkles, crow's feet, smile lines — normal on 51+ faces, painted on purpose), marks hugging the
    eye band (lashes/eye shadow) and anything on men (beard shadow, stubble). 51+ also needs a deeper patch (dark ≥ 10)."""
    name = os.path.basename(path)
    parts = name.split("-")
    if len(parts) > 1 and parts[1] in MEN_ROLES: return np.zeros_like(sm)
    old = "-a51" in name
    n, lb, st, _ = cv2.connectedComponentsWithStats(sm.astype(np.uint8), 8)
    keep = np.zeros_like(sm)
    amin = (w / 60.0) ** 2; tmin = w / 90.0
    for i in range(1, n):
        x, y, ww, hh, ar = st[i]
        if ar < amin: continue
        m = (lb[y:y + hh, x:x + ww] == i).astype(np.uint8)
        thick = float(cv2.distanceTransform(np.pad(m, 1), cv2.DIST_L2, 3).max()) * 2
        cnts, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        (_, _), (rw, rh), _ = cv2.minAreaRect(np.vstack(cnts)); el = max(rw, rh) / max(1.0, min(rw, rh))
        fill = ar / max(1.0, rw * rh)
        cy = (y + hh / 2) / h
        if thick < tmin or el > 3.0 or fill < 0.35: continue          # line-like → wrinkle / fold
        if 0.30 < cy < 0.47: continue                                  # eye band (lashes, shadow under the eyes)
        cx = (x + ww / 2) / w
        if (cx - .5) ** 2 / .32 ** 2 + (cy - .56) ** 2 / .32 ** 2 > 1: continue   # outside the inner face oval (hair line, jaw edge, props)
        mm = lb == i
        if C is not None and float(C[mm].mean()) < 0.65 * Cc: continue  # nearly colourless = grey hair / book / collar, not skin
        if float(dark[mm].mean()) > 22: continue                       # far too dark for a smudge = hair strand / prop edge
        if skin is not None:
            ring = (cv2.dilate(mm.astype(np.uint8), np.ones((7, 7), np.uint8)) > 0) & ~mm
            if ring.any() and float(skin[ring].mean()) < 0.6: continue    # must sit inside skin all round
        if old and (thick < 1.6 * tmin or float(dark[lb == i].mean()) < 10): continue
        keep |= (lb == i)
    return keep

def fix(im, sm, skin, box, Lb, Cb, gl, gc, strength=0.85):
    """tách tần số trên vết bẩn: tông thấp (blur) kéo về nền da trơn; lớp chi tiết (ảnh − blur) giữ nguyên."""
    x0, y0, x1, y1 = box; out = im.copy(); sub = out[y0:y1, x0:x1]
    bgr = sub[..., :3].astype(np.float32) / 255; lab = cv2.cvtColor(bgr, cv2.COLOR_BGR2LAB)
    r = max(1.5, (x1 - x0) / 70)
    low = cv2.GaussianBlur(lab, (0, 0), r); det = lab - low
    m = cv2.dilate(sm.astype(np.uint8), np.ones((3, 3), np.uint8)).astype(np.float32)
    m = cv2.GaussianBlur(m, (0, 0), r) * skin.astype(np.float32)
    m = np.clip(m * 1.4, 0, 1) * strength
    # target low-frequency = clean skin around (normalized blur of NON-smudge skin)
    clean = (skin & ~sm).astype(np.float32); k = max(5, int((x1 - x0) / 5) | 1)
    tgt = np.dstack([cv2.blur(low[..., i] * clean, (k, k)) / np.maximum(cv2.blur(clean, (k, k)), 1e-3) for i in range(3)])
    m *= np.clip((cv2.blur(clean, (k, k)) - 0.05) / 0.15, 0, 1)        # no clean skin nearby → leave as is (avoids dark blocks)
    newlow = low * (1 - m[..., None]) + tgt * m[..., None]
    res = cv2.cvtColor((newlow + det).astype(np.float32), cv2.COLOR_LAB2BGR)
    sub[..., :3] = np.clip(res * 255 + 0.5, 0, 255).astype(np.uint8)
    return out

def rosy(im, skin, box, Lc, ac, bc, A_T=13.0, B_T=15.0, blush=4.0):
    """HỒNG HÀO nhẹ (sếp 11/15): sưởi tông da về đích (a*, b* của mặt hồng hào) + má hồng mờ hai bên + môi hồng thêm chút.
    Chỉ trong vùng da mặt (mờ biên), không đụng mắt/mày/tóc/áo; không đổi nét."""
    raise RuntimeError("ROSY PASS RETIRED (owner 16/11 12:45Z: \"Thôi tất cả các hình về bỏ cái lớp dòng đi, về cái B á.\" = no rosy-skin layer on any picture; undone by dev/art/skin-norosy/). Never re-apply.")
    x0, y0, x1, y1 = box; out = im.copy(); sub = out[y0:y1, x0:x1]
    bgr = sub[..., :3].astype(np.float32) / 255; lab = cv2.cvtColor(bgr, cv2.COLOR_BGR2LAB); h, w = lab.shape[:2]
    m = cv2.GaussianBlur(cv2.dilate(skin.astype(np.uint8), np.ones((3, 3), np.uint8)).astype(np.float32), (0, 0), max(1.5, w / 60))
    m *= (sub[..., 3] >= 200)
    da = float(np.clip(A_T - ac, 0, 7)) * 0.8; db = float(np.clip(B_T - bc, 0, 6)) * 0.5
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32); sg = 0.11 * w
    g = np.exp(-(((xx - 0.30 * w) ** 2 + (yy - 0.62 * h) ** 2) / (2 * sg * sg))) + np.exp(-(((xx - 0.70 * w) ** 2 + (yy - 0.62 * h) ** 2) / (2 * sg * sg)))
    k = blush * (1.0 if A_T - ac > 1 else 0.5)
    lab[..., 1] += m * (da + k * g); lab[..., 2] += m * (db + 0.3 * k * g); lab[..., 0] -= m * 0.6 * g
    lip = np.zeros((h, w), np.float32); lip[int(.60 * h):int(.86 * h), int(.30 * w):int(.70 * w)] = 1
    lip *= ((lab[..., 1] > ac + 3) & (skin == 0) & (sub[..., 3] >= 250)).astype(np.float32)
    lab[..., 1] += cv2.GaussianBlur(lip, (0, 0), 1.0) * (3.0 if da > 1 else 1.5)
    sub[..., :3] = np.clip(cv2.cvtColor(lab, cv2.COLOR_LAB2BGR) * 255 + 0.5, 0, 255).astype(np.uint8)
    return out

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("files", nargs="+"); ap.add_argument("--json"); ap.add_argument("--fix")
    o = ap.parse_args(); files = []
    for f in o.files:
        if f.startswith("@"): files += [l.strip() for l in open(f[1:]) if l.strip()]
        else: files += sorted(glob.glob(f)) if any(c in f for c in "*?[") else [f]
    rep = []
    for f in files:
        r = analyse(f)
        if not r: continue
        info, st = r; rep.append(info)
        if o.fix:
            os.makedirs(o.fix, exist_ok=True); cv2.imwrite(os.path.join(o.fix, os.path.basename(f)), fix(*st), [cv2.IMWRITE_WEBP_QUALITY, 95])
    if o.json: json.dump(rep, open(o.json, "w"))
    for r in sorted(rep, key=lambda r: -r["score"])[:15]:
        print("%-44s điểm %6.2f  vết %5.2f%%  sâu %4.1f  loang %.2f" % (os.path.basename(r["file"]), r["score"], r["smudge"], r["depth"], r["mottle"]))
    print("đo", len(rep), "mặt")

if __name__ == "__main__":
    main()
