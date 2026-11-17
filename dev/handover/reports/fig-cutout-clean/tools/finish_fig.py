#!/usr/bin/env python3
"""finish_fig.py MASTER.png KEY OUTROOT   (KEY e.g. consort-c30-t2-a18 or maid-m22-t2-a18)
Turns ONE new master (RGBA PNG, wide canvas) into every CDN twin of that figure, same names, scale DOWN only:
  OUTROOT/img/fig-KEY.webp      900 tall, figure height = OLD fig height (fit_fig), 8 % side padding
  OUTROOT/img/hd/fig-KEY.webp   1800 tall, only if the CDN already has that hd twin (maids have none)
  OUTROOT/img/tn/fig-KEY.webp   240 tall, only if the CDN already has it
  OUTROOT/img/por-KEY.webp      384x506 bust: SAME face scale + face position as the OLD por (measured on old por vs new master)
Old twins are read from the CDN for geometry; originals are saved to OUTROOT/_old/ for revert. python3 -I; numpy scipy pillow."""
import sys, os, io, subprocess
import numpy as np
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import fit_fig, qa_fig
CDN = "https://ctm-img.victoria-tntt.workers.dev/img/"
def get(path):
    r = subprocess.run(["curl", "-s", "-w", "\n%{http_code}", "--max-time", "60", CDN + path], capture_output=True)
    body, code = r.stdout.rsplit(b"\n", 1)
    return body if code.strip() == b"200" else None
def save(im, path, q=88):
    os.makedirs(os.path.dirname(path), exist_ok=True); im.save(path, "WEBP", quality=q, method=6)
def _flat(im, bg=128):
    c = Image.new("RGBA", im.size, (bg, bg, bg, 255)); c.alpha_composite(im); return np.asarray(c.convert("L"))
def locate(oldfig, por):
    """where did the OLD por come from inside the OLD fig? multi-scale template match -> (x0,y0,w,h) in old-fig px + score"""
    import cv2
    M = 400; F = Image.new("RGBA", (oldfig.width + 2 * M, oldfig.height + 2 * M), (128, 128, 128, 255)); F.alpha_composite(oldfig, (M, M))
    f = np.asarray(F.convert("L")); P = _flat(por); best = (-1, None)
    for s in np.arange(0.6, 3.01, 0.04):                       # s = por px per fig px
        t = cv2.resize(P, (round(384 / s), round(506 / s)), interpolation=cv2.INTER_AREA)
        if t.shape[0] > f.shape[0] or t.shape[1] > f.shape[1]: continue
        r = cv2.matchTemplate(f, t, cv2.TM_CCOEFF_NORMED); _, v, _, loc = cv2.minMaxLoc(r)
        if v > best[0]: best = (v, (loc[0] - M, loc[1] - M, 384 / s, 506 / s))
    return best
def headx(im, frac=0.12):
    a = np.asarray(im)[..., 3] > 40; ys = np.nonzero(a.any(1))[0]; h = ys.max() - ys.min()
    band = a[ys.min():ys.min() + int(h * frac) + 1]; xs = np.nonzero(band)[1]; return xs.mean()
def main(master_p, key, out):
    m = Image.open(master_p).convert("RGBA"); info = {}
    oldfig_b = get(f"fig-{key}.webp"); oldfig = Image.open(io.BytesIO(oldfig_b)).convert("RGBA")
    os.makedirs(out + "/_old", exist_ok=True); open(f"{out}/_old/fig-{key}.webp", "wb").write(oldfig_b)
    f900, i = fit_fig.fit(m, oldfig, 900); save(f900, f"{out}/img/fig-{key}.webp"); info["fig"] = i
    for sub, H, name in (("hd/", 1800, "hd"), ("tn/", 240, "tn")):
        b = get(f"{sub}fig-{key}.webp")
        if not b and name == "hd" and os.environ.get("FORCE_HD"): b = oldfig_b   # whole-set plan: hd for ALL (maids have none on CDN)
        if b: open(f"{out}/_old/{name}-fig-{key}.webp", "wb").write(b); im, _ = fit_fig.fit(m, oldfig, H); save(im, f"{out}/img/{sub}fig-{key}.webp", 90 if H > 300 else 92); info[name] = im.size
    pb = get(f"por-{key}.webp")
    if pb:
        open(f"{out}/_old/por-{key}.webp", "wb").write(pb); op = Image.open(io.BytesIO(pb)).convert("RGBA")
        score, box = locate(oldfig, op)
        if score < 0.5: info["por"] = f"MATCH WEAK {score:.2f} - make this crop by hand"
        else:
            x0, y0, w, h = box; f1800, _ = fit_fig.fit(m, oldfig, 1800)      # same geometry x2
            dx = (headx(f1800) / 2 - headx(oldfig))                          # head centre shift, in fig px
            X0, Y0, W, H = (x0 + dx) * 2 + (f1800.width / 2 - oldfig.width) , y0 * 2, w * 2, h * 2   # canvases differ in width: keep head-centred
            cx_old = headx(oldfig); cx_new = headx(f1800) / 2
            X0 = (cx_new - (cx_old - x0)) * 2
            canvas = Image.new("RGBA", (f1800.width + 2000, f1800.height + 2000), (0, 0, 0, 0)); canvas.alpha_composite(f1800, (1000, 1000))
            por = canvas.crop((round(X0 + 1000), round(Y0 + 1000), round(X0 + 1000 + W), round(Y0 + 1000 + H))).resize((384, 506), Image.LANCZOS)
            save(por, f"{out}/img/por-{key}.webp", 90); info["por"] = {"match": round(float(score), 2), "box_old_fig": [round(float(v)) for v in box]}
    print(key, info)
if __name__ == "__main__": main(*sys.argv[1:4])
