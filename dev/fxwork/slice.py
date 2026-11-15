#!/usr/bin/env python3
"""slice.py — painted-fx (KIT §68): cut Magnific gpt-2-6 sprite sheets into small per-kind atlas strips (transparent WebP).

Sources (dev/fxwork/gens.txt): raw/<k>.png (as painted) and cut/<k>.png (images_remove_background result).
Alpha modes:
  cut   — alpha from the Magnific cut-out (images_remove_background).
  luma  — painted on PURE BLACK (light/emissive particles): alpha = brightness, colour un-premultiplied.
          Same principle as mix-blend-mode:screen, but gives a true-alpha sprite that also reads on light paper.
  ink   — painted on PURE WHITE (ink): alpha = darkness, colour un-premultiplied.
Output: img/fx/<name>.webp — N frames side by side, each frame S x S, item centred (aspect kept).
        dev/fxwork/atlas.json — {name: {n, s}} copied into jfxkit.js KFK_SP.
Usage: python3 dev/fxwork/slice.py [names...]   (preview sheets -> dev/fxwork/prev_<name>.jpg on dark + light)
"""
import json, os, sys
from PIL import Image, ImageFilter

D = os.path.dirname(os.path.abspath(__file__))
R = os.path.abspath(os.path.join(D, "..", ".."))
OUT = os.path.join(R, "img", "fx")

# name: (sheet, mode, grid, cells (row,col) or None=all, frame size S)
SPEC = {
    "petal-plum":  ("plum",    "cut",  3, None, 64),
    "petal-peach": ("peach",   "cut",  3, None, 64),
    "petal-lotus": ("lotus",   "cut",  3, None, 80),
    "osmanthus":   ("osman",   "cut",  3, None, 48),
    "leaf":        ("leaf",    "cut",  3, None, 80),
    "ash":         ("ash",     "cut",  3, None, 56),
    "paper":       ("paper",   "cut",  3, None, 72),
    "coin":        ("coin",    "cut",  3, None, 64),
    "lantern":     ("lantern", "cut",  2, None, 128),
    "ink":         ("ink",     "ink",  3, None, 128),
    "snow":        ("snow",    "luma", 3, [(0, 0), (0, 2), (1, 1), (2, 0), (2, 2)], 48),
    "spark":       ("spark",   "luma", 3, None, 64),
    "ember":       ("ember",   "luma", 3, None, 40),
    "orb":         ("orb",     "luma", 3, [(0, 0), (0, 1), (0, 2)], 96),
    "streak":      ("orb",     "luma", 3, [(1, 0), (1, 1), (1, 2)], 192),
    "smoke":       ("orb",     "luma", 3, [(2, 0), (2, 1), (2, 2)], 128),
    "glowburst":   ("glow",    "luma", 1, None, 256),
}


def alpha_img(sheet, mode):
    if mode == "cut":
        return Image.open(os.path.join(D, "cut", sheet + ".png")).convert("RGBA")
    im = Image.open(os.path.join(D, "raw", sheet + ".png")).convert("RGB")
    px = im.load()
    w, h = im.size
    out = Image.new("RGBA", (w, h))
    po = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            if mode == "luma":
                m = max(r, g, b)
                a = max(0, min(255, (m - 10) * 255 // 235))
                if a <= 0:
                    po[x, y] = (0, 0, 0, 0)
                    continue
                k = 255 / max(m, 1)
                po[x, y] = (min(255, int(r * k)), min(255, int(g * k)), min(255, int(b * k)), a)
            else:  # ink on white
                m = min(r, g, b)
                a = max(0, min(255, (245 - m) * 255 // 235))
                if a <= 0:
                    po[x, y] = (0, 0, 0, 0)
                    continue
                f = a / 255
                c = lambda v: max(0, min(255, int((v - (1 - f) * 255) / f)))
                po[x, y] = (c(r), c(g), c(b), a)
    return out


def frames(name):
    sheet, mode, g, cells, S = SPEC[name]
    im = alpha_img(sheet, mode)
    w, h = im.size
    cw, ch = w // g, h // g
    cells = cells or [(r, c) for r in range(g) for c in range(g)]
    out = []
    for (r, c) in cells:
        cell = im.crop((c * cw, r * ch, (c + 1) * cw, (r + 1) * ch))
        a = cell.split()[3].point(lambda v: 255 if v > 12 else 0)
        bb = a.getbbox()
        if not bb:
            continue
        pad = 3
        bb = (max(0, bb[0] - pad), max(0, bb[1] - pad), min(cw, bb[2] + pad), min(ch, bb[3] + pad))
        it = cell.crop(bb)
        sc = (S - 2) / max(it.size)
        it = it.resize((max(1, round(it.size[0] * sc)), max(1, round(it.size[1] * sc))), Image.LANCZOS)
        fr = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        fr.paste(it, ((S - it.size[0]) // 2, (S - it.size[1]) // 2), it)
        out.append(fr)
    return out, S


def build(name):
    fr, S = frames(name)
    strip = Image.new("RGBA", (S * len(fr), S), (0, 0, 0, 0))
    for i, f in enumerate(fr):
        strip.paste(f, (i * S, 0))
    os.makedirs(OUT, exist_ok=True)
    p = os.path.join(OUT, name + ".webp")
    strip.save(p, "WEBP", quality=82, method=6, exact=False)
    # preview on dark + light, 2x
    pv = Image.new("RGB", (strip.size[0] * 2, S * 4), (24, 22, 30))
    lt = Image.new("RGB", (strip.size[0] * 2, S * 2), (244, 236, 218))
    pv.paste(lt, (0, S * 2))
    big = strip.resize((strip.size[0] * 2, S * 2), Image.LANCZOS)
    pv.paste(big, (0, 0), big)
    pv.paste(big, (0, S * 2), big)
    pv.save(os.path.join(D, "prev_" + name + ".jpg"), quality=78)
    return {"n": len(fr), "s": S, "kb": round(os.path.getsize(p) / 1024, 1)}


if __name__ == "__main__":
    names = sys.argv[1:] or list(SPEC)
    jp = os.path.join(D, "atlas.json")
    A = json.load(open(jp)) if os.path.exists(jp) else {}
    for n in names:
        if not os.path.exists(os.path.join(D, "cut" if SPEC[n][1] == "cut" else "raw", SPEC[n][0] + ".png")):
            print("skip (no source)", n)
            continue
        A[n] = build(n)
        print(n, A[n])
    json.dump(A, open(jp, "w"), indent=0, sort_keys=True)
    print("total KB", round(sum(v["kb"] for v in A.values()), 1))
