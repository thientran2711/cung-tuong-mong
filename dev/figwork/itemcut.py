#!/usr/bin/env python3
"""itemcut.py — audit (and clean) the cutouts of the item / wardrobe pictures (img/item-*.webp, img/item512/, img/wd512/).

  python3 dev/figwork/itemcut.py audit [--json out.json] [files…]      # score every picture, print the dirty ones
  python3 dev/figwork/itemcut.py sheet <out.jpg> files…                # composite on dark / mid / light / place backgrounds
  python3 dev/figwork/itemcut.py clean <in> <out> [--matte m.png]      # re-cut: alpha matte (+ optional Magnific matte) + defringe

Dirt measured on the alpha edge (what shows as a halo on a real backdrop):
  halo    edge pixels (alpha 10–235 and the opaque rim 2 px deep) whose colour is not the object's colour 4 px inward — leftover
          background mixed into the edge: light (paper/white key), dark (shadow) or green (chroma key); score = mean colour
          distance of the worst 20 % of edge pixels, and the share of edge pixels with a distance > 45.
  specks  pixels with alpha > 16 outside the main object (+ its 6 px neighbourhood): crumbs of the old background.
  soft    share of the object's outline that is a wide semi-transparent band (> 4 px of alpha 20–200): a smeared cut.
A picture is DIRTY when halo_p > 0.06 or halo_d > 40 or specks > 30 or soft > 0.35.

Cleaning (no redraw): the alpha is kept or replaced by a better matte (Magnific images_remove_background result, passed with
--matte), tightened (alpha < 14 → 0, remove specks, choke 0.6 px on smeared bands), then DEFRINGED: every edge pixel takes the
colour of the object 2–5 px inward (colour decontamination, alpha unchanged), so no background colour is left on the rim.
"""
import sys, os, json, argparse, glob
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

LIGHT_MAX, DARK_MAX = 8.0, 12.0

def load(p):
    im = Image.open(p).convert("RGBA"); A = np.asarray(im).astype(np.float32)
    return A[..., :3], A[..., 3]

def inner_colour(rgb, a, inset=4):
    """colour of the object a few px inside the edge, spread outward over the edge (normalised blur of opaque pixels)"""
    solid = ndi.binary_erosion(a > 235, iterations=inset).astype(np.float32)
    if solid.sum() < 50: solid = (a > 235).astype(np.float32)
    w = ndi.gaussian_filter(solid, 3.0) + 1e-6
    c = np.stack([ndi.gaussian_filter(rgb[..., i] * solid, 3.0) / w for i in range(3)], -1)
    # far from the solid core the blur fades: fill by nearest solid colour
    far = w < 0.02
    if far.any():
        idx = ndi.distance_transform_edt(~(solid > 0), return_distances=False, return_indices=True)
        c[far] = rgb[idx[0][far], idx[1][far]]
    return c

def score(path):
    rgb, a = load(path); H, W = a.shape
    obj = a > 32
    lab, n = ndi.label(ndi.binary_dilation(obj, iterations=3))
    if n == 0: return dict(file=path, empty=1, dirty=0)
    sizes = ndi.sum(np.ones_like(a), lab, range(1, n + 1)); keep = np.zeros(n + 1, bool)
    keep[1 + np.where(sizes >= sizes.max() * 0.02)[0]] = True       # the object (and its sizeable parts: tassels, beads)
    main = ndi.binary_dilation(keep[lab], iterations=6)
    specks = int(((a > 16) & ~main).sum())
    # halo: the outermost 2 px of the cut, composited on a dark and on a light backdrop, against the same pixels painted in the
    # object's own colour (nearest pixel ≥ 3 px inside the solid part). Light halo = old light background on the rim (shows on
    # dark places), dark halo = shadow / dark key on the rim (shows on light places). Luminance excess, 0–255.
    core = ndi.binary_erosion(a >= 230, iterations=3)
    if core.sum() < 50: core = a >= 230
    _, idx = ndi.distance_transform_edt(~core, return_indices=True)
    ic = rgb[idx[0], idx[1]]
    out = ndi.distance_transform_edt(a > 8)
    ring = (a > 8) & (out <= 2.0) & main
    if ring.sum() < 20: return dict(file=path, specks=specks, light=0, dark=0, transl=0, dirty=int(specks > 30))
    L = lambda c: c @ np.array([.299, .587, .114])
    al = (a[ring] / 255.0)[:, None]
    D, Lt = np.array([15, 12, 10.]), np.array([245, 238, 224.])
    cd = L(rgb[ring] * al + D * (1 - al)) - L(ic[ring] * al + D * (1 - al))
    cl = L(ic[ring] * al + Lt * (1 - al)) - L(rgb[ring] * al + Lt * (1 - al))
    light = float(np.clip(cd, 0, None).mean()); dark = float(np.clip(cl, 0, None).mean())
    halo_p = float(((cd > 30) | (cl > 30)).mean())
    kind = "light" if light >= dark else "dark"
    # translucent body: the backdrop shows through the object itself (alpha 200–250 deep inside)
    deep = ndi.binary_erosion(a > 128, iterations=6)
    transl = float((a[deep] < 250).mean()) if deep.sum() else 0.0
    dirty = int(light > LIGHT_MAX or dark > DARK_MAX or specks > 30 or transl > 0.25)
    return dict(file=path, light=round(light, 1), dark=round(dark, 1), halo_p=round(halo_p, 3), kind=kind, specks=specks, transl=round(transl, 3), dirty=dirty)

def defringe(rgb, a, depth=5, erode=2):
    """colour decontamination: edge pixels take the object's colour from 2–depth px inward; alpha untouched"""
    core = ndi.binary_erosion(a > 235, iterations=erode) if erode else (a > 235)
    if core.sum() < 50: core = a > 235
    dist, idx = ndi.distance_transform_edt(~core, return_indices=True)
    src = rgb[idx[0], idx[1]]
    # blend: pixels right at the core keep most of their own colour, the rim and the semi band take the inner colour
    t = np.clip(dist / 2.0, 0, 1)[..., None]
    out = rgb * (1 - t) + src * t
    near = (dist <= depth + 3) & (a > 0)
    res = rgb.copy(); res[near] = out[near]
    # soften the copy so the rim is not posterised: blend with a small blur of the decontaminated colours
    blur = np.stack([ndi.gaussian_filter(res[..., i], 0.7) for i in range(3)], -1)
    res[near] = res[near] * 0.6 + blur[near] * 0.4
    return res

def clean(src, dst, matte=None, keep_size=True):
    rgb, a = load(src)
    if matte:
        m = np.asarray(Image.open(matte).convert("RGBA").split()[3].resize((a.shape[1], a.shape[0]), Image.LANCZOS)).astype(np.float32)
        a = np.minimum(a, m) if a.max() > 0 else m
    # tighten: crumbs out, faint veil out, smeared bands choked a little
    a = np.where(a < 14, 0, a)
    obj = a > 32; lab, n = ndi.label(ndi.binary_dilation(obj, iterations=3))
    if n:
        sizes = ndi.sum(np.ones_like(a), lab, range(1, n + 1)); keep = np.zeros(n + 1, bool); keep[1 + np.where(sizes >= sizes.max() * 0.02)[0]] = True
        a = np.where(ndi.binary_dilation(keep[lab], iterations=2), a, 0)
    ch = ndi.grey_erosion(a, size=(2, 2)); smear = (a > 20) & (a < 200)
    a = np.where(smear, a * 0.55 + ch * 0.45, a)
    # small pictures (256 px icons): thin parts (pins, strings, filigree) are only a few px wide — a gentle pass keeps their colours
    small = a.shape[1] <= 300
    rgb = defringe(rgb, a, depth=2 if small else 5, erode=0 if small else 2)
    out = np.dstack([np.clip(rgb, 0, 255), np.clip(a, 0, 255)]).astype(np.uint8)
    Image.fromarray(out, "RGBA").save(dst, "WEBP", quality=90, method=6, exact=True)
    return dst

BGS = [("dark", (22, 17, 14)), ("mid", (122, 106, 88)), ("light", (244, 236, 220))]
def sheet(out, files, cell=220, places=()):
    bgs = [(n, Image.new("RGB", (cell, cell), c)) for n, c in BGS]
    for p in places:
        try:
            pl = Image.open(p).convert("RGB"); s = max(cell / pl.width, cell / pl.height); pl = pl.resize((int(pl.width * s) + 1, int(pl.height * s) + 1))
            bgs.append((os.path.basename(p), pl.crop((0, 0, cell, cell))))
        except Exception: pass
    sh = Image.new("RGB", (cell * len(bgs), cell * len(files)), (0, 0, 0))
    for r, f in enumerate(files):
        im = Image.open(f).convert("RGBA"); im = im.resize((cell, round(cell * im.height / im.width)), Image.LANCZOS)
        for c, (_, bg) in enumerate(bgs):
            t = bg.copy().convert("RGBA"); t.alpha_composite(im, (0, (cell - im.height) // 2)); sh.paste(t.convert("RGB"), (c * cell, r * cell))
    sh.save(out, quality=88); return out

if __name__ == "__main__":
    ap = argparse.ArgumentParser(); ap.add_argument("cmd"); ap.add_argument("args", nargs="*"); ap.add_argument("--json"); ap.add_argument("--matte"); ap.add_argument("--place", action="append", default=[])
    o = ap.parse_args()
    if o.cmd == "audit":
        L = o.args or sorted(glob.glob("img/item-*.webp") + glob.glob("img/item512/*.webp") + glob.glob("img/wd512/*.webp"))
        R = [score(f) for f in L]
        if o.json: json.dump(R, open(o.json, "w"), indent=0)
        for r in R:
            if r.get("dirty"): print("DIRTY", r)
        print(f"{sum(r.get('dirty', 0) for r in R)} dirty of {len(R)}")
    elif o.cmd == "sheet": print(sheet(o.args[0], o.args[1:], places=o.place))
    elif o.cmd == "clean": print(clean(o.args[0], o.args[1], o.matte))
