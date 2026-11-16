#!/usr/bin/env python3
"""qa_fig.py - auto-QA for a repainted figure master (RGBA PNG/WebP). Python3 -I safe; needs numpy scipy pillow.
usage: qa_fig.py [--ref skin_face.(png|webp)] [--kind master|fig|hd|por] [--json] FILE_OR_URL...
Checks (PASS/FAIL/WARN each, overall = FAIL if any FAIL):
 edge   alpha>EDGE_A on any canvas border row/col within 2 px  -> FAIL (hem/sleeve cut). Also min gap L/R/T/B in % of canvas (WARN <3%).
 halo   semi-alpha rim pixels much DARKER than the opaque colour just inside them (real halo, not dark robes) -> FAIL if per10k rim px > HALO_FAIL
 holes  enclosed transparent holes: pinholes (<400 px) -> FAIL if >3; big holes only reported (arm gaps are legit)
 transl translucent interior (eroded 6 px, alpha<235) per 10k interior px -> FAIL if > TRANSL_FAIL (smoke / see-through sleeve)
 feet   figure bottom not cut, lowest rows not a flat wide hem (flat = bottom-3-rows width / body width > 0.30 -> WARN 'flat hem, check shoes by eye')
 huadian forehead mark width / face width (approx: forehead coloured blob inside skin-blob face box). target 0.085; WARN >0.100 or >0.07..., FAIL >0.125. Approximate: ALWAYS confirm by eye.
 skin   median Lab of face skin vs --ref face median: dE76 <= 6 PASS, <=10 WARN, else FAIL (ref pending owner pick; without --ref only prints Lab)
"""
import sys, io, json, subprocess, argparse
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

EDGE_A = 20
HALO_FAIL = 60      # semi-alpha rim px per 10k rim px that are >40 lum darker than neighbouring opaque colour
TRANSL_FAIL = 40    # per 10k interior px
CDN = "https://ctm-img.victoria-tntt.workers.dev/"

def load(src):
    if src.startswith("http") or src.startswith("img/"):
        url = src if src.startswith("http") else CDN + src
        r = subprocess.run(["curl", "-s", "--max-time", "60", url], capture_output=True)
        return Image.open(io.BytesIO(r.stdout)).convert("RGBA")
    return Image.open(src).convert("RGBA")

def rgb2lab(rgb):
    c = rgb.astype(float) / 255
    c = np.where(c > .04045, ((c + .055) / 1.055) ** 2.4, c / 12.92)
    M = np.array([[.4124, .3576, .1805], [.2126, .7152, .0722], [.0193, .1192, .9505]])
    xyz = c @ M.T / np.array([.95047, 1, 1.08883])
    f = np.where(xyz > .008856, np.cbrt(xyz), 7.787 * xyz + 16 / 116)
    return np.stack([116 * f[..., 1] - 16, 500 * (f[..., 0] - f[..., 1]), 200 * (f[..., 1] - f[..., 2])], -1)

def skin_mask(rgb):
    r, g, b = [rgb[..., i].astype(int) for i in range(3)]
    y = .299 * r + .587 * g + .114 * b
    cb = 128 - .168736 * r - .331264 * g + .5 * b
    cr = 128 + .5 * r - .418688 * g - .081312 * b
    return (cr > 137) & (cr < 175) & (cb > 85) & (cb < 128) & (y > 90) & (r > g) & (g > b - 20)

def face_box(rgb, sil):
    """largest skin blob in the top 28% of the figure silhouette = face."""
    ys, xs = np.nonzero(sil)
    top, bot = ys.min(), ys.max()
    lim = top + int((bot - top) * .28)
    m = skin_mask(rgb) & sil
    m[lim:] = False
    m = ndi.binary_opening(m, iterations=2)
    lab, n = ndi.label(m)
    if not n: return None, None
    sz = ndi.sum(m, lab, range(1, n + 1))
    k = int(np.argmax(sz)) + 1
    mk = lab == k
    # keep only the face: rows from blob top down to the chin (width falls below 60% of the widest row above)
    rw = mk.sum(1); r0 = int(np.nonzero(rw)[0][0]); r1 = r0
    wmax = 0
    for y in range(r0, mk.shape[0]):
        wmax = max(wmax, rw[y])
        if wmax > 0 and rw[y] < .6 * wmax and y - r0 > 20: break
        r1 = y
    mk2 = mk.copy(); mk2[r1 + 1:] = False
    wm = rw[r0:r1 + 1].max(); rows = [y for y in range(r0, r1 + 1) if rw[y] >= .4 * wm]
    mk2[:rows[0]] = False
    yy, xx = np.nonzero(mk2)
    return (xx.min(), yy.min(), xx.max(), yy.max()), mk2

def huadian(rgb, al, fb, fm):
    if fb is None: return None
    x0, y0, x1, y1 = fb
    fw = x1 - x0 + 1; fh = y1 - y0 + 1
    # forehead band: top 40% of the face box, middle 50% width
    ya, yb = y0, y0 + int(fh * .55)
    xa, xb = x0 + int(fw * .25), x1 - int(fw * .25)
    patch = rgb[ya:yb, xa:xb].astype(int); skin = fm[ya:yb, xa:xb]
    ref = np.median(rgb[fm].astype(int), 0)
    d = np.abs(patch - ref).sum(-1)
    sat = patch.max(-1) - patch.min(-1)
    # coloured mark: strong colour difference from skin AND inside the (filled) skin region, not hair (dark)
    filled = ndi.binary_fill_holes(skin)
    mark = (d > 90) & (patch.max(-1) > 110) & filled & (sat > 45)
    mark = ndi.binary_opening(mark, iterations=1)
    lab, n = ndi.label(mark)
    if not n: return {"ratio": 0.0, "note": "no coloured forehead mark found (none or too faint)"}
    sz = ndi.sum(mark, lab, range(1, n + 1)); k = int(np.argmax(sz)) + 1
    yy, xx = np.nonzero(lab == k)
    w = max(xx.max() - xx.min() + 1, yy.max() - yy.min() + 1)
    return {"ratio": round(float(w) / fw, 3), "mark_px": int(w), "face_w": int(fw)}

def qa(img, ref=None, kind="master"):
    a = np.asarray(img); al = a[..., 3].astype(int); rgb = a[..., :3]
    H, W = al.shape
    res = {"size": f"{W}x{H}"}; fails = []; warns = []
    sil = al > 128
    if sil.sum() < 500: return {"overall": "FAIL", "fails": ["empty"], "size": res["size"]}
    # edge
    b = 2
    border = np.zeros_like(sil); border[:b] = border[-b:] = True; border[:, :b] = border[:, -b:] = True
    ep = int(((al > EDGE_A) & border).sum()); res["edge_px"] = ep
    ys, xs = np.nonzero(al > EDGE_A)
    gaps = {"L": xs.min() / W, "R": (W - 1 - xs.max()) / W, "T": ys.min() / H, "B": (H - 1 - ys.max()) / H}
    res["gap_pct"] = {k: round(v * 100, 1) for k, v in gaps.items()}
    if ep: fails.append(f"edge: {ep} px alpha on canvas border (cut hem/sleeve)")
    elif min(gaps.values()) < .03: warns.append("edge: <3% margin on a side")
    # halo
    semi = (al > 20) & (al < 235)
    opaque = al >= 235
    idx = ndi.distance_transform_edt(~opaque, return_distances=False, return_indices=True)
    near = rgb[idx[0], idx[1]].astype(int)
    lum = rgb.astype(int).mean(-1); nlum = near.mean(-1)
    dark = semi & (lum < nlum - 40)
    res["halo_per10k"] = round(10000 * dark.sum() / max(1, semi.sum()), 1)
    if res["halo_per10k"] > HALO_FAIL * 10: fails.append(f"halo: {res['halo_per10k']}/10k rim px darker than neighbour")
    elif res["halo_per10k"] > HALO_FAIL * 3: warns.append(f"halo: {res['halo_per10k']}/10k (look on dark+light)")
    # holes
    filled = ndi.binary_fill_holes(sil); holes = filled & ~sil
    lab, n = ndi.label(holes); hs = ndi.sum(holes, lab, range(1, n + 1)) if n else []
    pin = int(sum(1 for x in hs if 8 <= x < 400)); big = int(sum(1 for x in hs if x >= 400))
    res["pinholes"] = pin; res["big_holes"] = big
    if pin > 3: fails.append(f"holes: {pin} pinholes")
    # translucent interior
    interior = ndi.binary_erosion(sil, iterations=6)
    tr = int((interior & (al < 235)).sum()); res["transl_per10k"] = round(10000 * tr / max(1, interior.sum()), 1)
    if res["transl_per10k"] > TRANSL_FAIL: fails.append(f"translucent interior {res['transl_per10k']}/10k")
    # feet
    fy1 = ys.max(); fy0 = ys.min(); body = sil.any(0).sum()
    low = sil[max(0, fy1 - 2):fy1 + 1].any(0).sum()
    res["hem_ratio"] = round(float(low) / max(1, body), 3)
    if (al[-2:] > EDGE_A).any(): pass  # already counted in edge
    if res["hem_ratio"] > .30: warns.append("feet: flat wide hem (ratio %.2f): check shoes visible by eye" % res["hem_ratio"])
    if (fy1 - fy0) < .5 * H: warns.append("figure fills <50% of canvas height")
    # face, huadian, skin
    fb, fm = face_box(rgb, sil)
    if fb is None:
        warns.append("face not found (skin detector) -> huadian/skin not measured")
    else:
        hd = huadian(rgb, al, fb, fm); res["huadian"] = hd
        if hd and hd["ratio"] > .125: fails.append(f"huadian {hd['ratio']} x face width (target 0.085)")
        elif hd and hd["ratio"] > .100: warns.append(f"huadian {hd['ratio']} (target 0.085) - look")
        lab_img = rgb2lab(rgb.astype(float))
        sk = lab_img[fm]; res["skin_lab"] = [round(float(v), 1) for v in np.median(sk, 0)]
        if ref is not None:
            r = np.asarray(ref); rs = r[..., 3] > 128 if r.shape[-1] == 4 else np.ones(r.shape[:2], bool)
            rm = skin_mask(r[..., :3]) & rs
            if rm.sum() > 100:
                rl = np.median(rgb2lab(r[..., :3].astype(float))[rm], 0)
                dE = float(np.linalg.norm(np.median(sk, 0) - rl)); res["skin_dE_vs_ref"] = round(dE, 1)
                if dE > 10: fails.append(f"skin dE {dE:.1f} vs reference")
                elif dE > 6: warns.append(f"skin dE {dE:.1f} vs reference")
    res["fails"] = fails; res["warns"] = warns
    res["overall"] = "FAIL" if fails else ("WARN" if warns else "PASS")
    return res

if __name__ == "__main__":
    ap = argparse.ArgumentParser(); ap.add_argument("files", nargs="+"); ap.add_argument("--ref"); ap.add_argument("--kind", default="master"); ap.add_argument("--json", action="store_true")
    o = ap.parse_args(); ref = load(o.ref) if o.ref else None
    bad = 0
    for f in o.files:
        try: r = qa(load(f), ref, o.kind)
        except Exception as e: r = {"overall": "FAIL", "fails": [f"unreadable: {e}"]}
        r["file"] = f; bad += r["overall"] == "FAIL"
        print(json.dumps(r, ensure_ascii=False) if o.json else f"{r['overall']:4} {f} {r.get('size','')} " + "; ".join(r.get("fails", []) + r.get("warns", [])))
    sys.exit(1 if bad else 0)
