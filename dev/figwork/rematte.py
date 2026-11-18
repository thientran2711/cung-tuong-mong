#!/usr/bin/env python3
# NOTE: written for the cutout-fix pass; expects index.txt (branch blob path) + named/<file>@<blob8>.webp next to it. Core idea: crop ONE figure from the raw generation (urls.json), upload, images_remove_background (3 credits), then fin.
"""Re-matte figures: crop ONE figure from the raw generation, let Magnific cut it alone
(much cleaner than the 4-figure sheet), then rebuild fig + por with the old framing.
  refix.py recs  targets.txt            -> recs.json (target -> gen id, files, branches)
  refix.py crop  recs.json urls.json    -> crops/<key>.png (+ crops/<key>.json meta)
  refix.py fin   recs.json bgurls.json  -> out/img/fig-*.webp, por-*.webp
"""
import sys, os, json, subprocess, io, glob
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
CC = os.path.dirname(os.path.abspath(__file__))
REPO = "/home/user/cung-tuong-mong"
BR = ["main", "review/consort-art", "review/maid-art", "review/maid-art-b", "review/kids-art"]
P0 = np.array([230, 213, 195], np.float32)

def manifests():
    recs = {}
    for b in BR:
        for mf in ("FIGURES.json", "FIGURES-servants.json", "FIGURES-others.json", "FIGURES-kids.json"):
            try:
                d = json.loads(subprocess.check_output(["git", "-C", REPO, "show", f"origin/{b}:img/{mf}"], stderr=subprocess.DEVNULL))
            except Exception:
                continue
            for r in d:
                recs.setdefault((b, r["file"]), r)
    return recs

def cmd_recs(tfile):
    idx = {}
    for l in open(f"{CC}/index.txt"):
        b, h, f = l.split()
        idx.setdefault(h[:8], []).append((b, f, h))
    M = manifests(); out = {}
    for t in open(tfile).read().split():
        key = os.path.basename(t).replace(".webp", "")
        name, h8 = key.split("@")
        locs = idx[h8]; gen = None
        for b, f, h in locs:
            r = M.get((b, f))
            if r: gen = r["magnificUrl"].rstrip("/").split("/")[-1]; break
        if not gen: print("NOREC", key); continue
        out[key] = dict(gen=gen, file=locs[0][1], branches=sorted({b for b, f, h in locs if f.endswith(name + ".webp")}),
                        fig=f"{CC}/named/{key}.webp")
        # matching por blob on same branches
        pf = locs[0][1].replace("img/fig-", "img/por-")
        for l in open(f"{CC}/index.txt"):
            b, h, f = l.split()
            if f == pf and b == locs[0][0]: out[key]["por"] = f"{CC}/named/{os.path.basename(pf)[:-5]}@{h[:8]}.webp"
    json.dump(out, open(f"{CC}/recs.json", "w"), indent=1)
    print(len(out), "records;", len({v['gen'] for v in out.values()}), "generations")

def runs_of(raw):
    A = np.asarray(raw.convert("RGB").resize((raw.width // 4, raw.height // 4))).astype(np.float32)
    d = np.linalg.norm(A - np.median(A[:4].reshape(-1, 3), axis=0), axis=-1)
    col = (d > 28).sum(0)
    runs = []; s = None
    for x, c in enumerate(list(col) + [0]):
        if c > 3 and s is None: s = x
        if c <= 3 and s is not None: runs.append([s, x]); s = None
    runs = [r for r in runs if r[1] - r[0] > A.shape[1] * 0.02]
    if len(runs) != 4:
        # figures touch (flowing sashes): cut at the emptiest column near each quarter line
        sw = A.shape[1]; c = col.astype(float); cuts = []
        for q in range(1, 4):
            e = int(sw * q / 4); r = int(sw * 0.08); lo, hi = e - r, e + r
            cuts.append(lo + int(np.argmin(c[lo:hi])))
        b = [0] + cuts + [sw]
        runs = []
        for i in range(4):
            seg = np.nonzero(col[b[i]:b[i + 1]] > 3)[0]
            runs.append([b[i] + (seg[0] if len(seg) else 0), b[i] + (seg[-1] + 1 if len(seg) else b[i + 1] - b[i])])
        print("  mincut", cuts)
    return [(int(r[0]) * 4, int(r[1]) * 4) for r in runs]

def thumb(im, w=24, h=64):
    im = im.convert("RGBA"); a = im.split()[3].point(lambda v: 255 if v > 40 else 0); bb = a.getbbox()
    im = im.crop(bb) if bb else im
    bg = Image.new("RGBA", im.size, (230, 213, 195, 255)); bg.alpha_composite(im)
    return np.asarray(bg.convert("RGB").resize((w, h), Image.BILINEAR)).astype(np.float32)

def cmd_crop(rfile, ufile):
    R = json.load(open(rfile)); U = json.load(open(ufile))
    os.makedirs(f"{CC}/crops", exist_ok=True); os.makedirs(f"{CC}/raw", exist_ok=True)
    bygen = {}
    for k, v in R.items(): bygen.setdefault(v["gen"], []).append(k)
    for gen, keys in bygen.items():
        if all(os.path.exists(f"{CC}/crops/{k}.png") for k in keys): continue
        rp = f"{CC}/raw/{gen}.png"
        if not os.path.exists(rp):
            subprocess.run(["curl", "-sS", "-o", rp, U[gen]], check=True)
        raw = Image.open(rp).convert("RGB")
        rs = runs_of(raw)
        # cut boundaries at gap midpoints
        cuts = [0] + [(rs[i][1] + rs[i + 1][0]) // 2 for i in range(len(rs) - 1)] + [raw.width]
        cand = []
        for i, (x0, x1) in enumerate(rs):
            sub = raw.crop((x0, 0, x1, raw.height))
            S = np.asarray(sub)
            al = np.where(np.linalg.norm(S.astype(np.float32) - P0, axis=-1) > 28, 255, 0).astype(np.uint8)
            cand.append((i, thumb(Image.fromarray(np.dstack([S, al]), "RGBA"))))
        for k in keys:
            t = thumb(Image.open(R[k]["fig"]))
            sc = sorted((float(np.abs(c - t).mean()), i) for i, c in cand)
            i = sc[0][1]
            import re
            mt = re.search(r"-a(\d+)@", k); ages = {"18":0,"26":1,"36":2,"51":3,"4":0,"9":1,"14":2,"20":3}
            ai = ages.get(mt.group(1)) if mt else None
            if ai is not None and len(rs) == 4:
                if ai != i: print("  NOTE thumb-match", i, "but age order", ai, "-> using age order")
                i = ai
            x0 = max(cuts[i], rs[i][0] - 60); x1 = min(cuts[i + 1], rs[i][1] + 60)
            raw.crop((x0, 0, x1, raw.height)).save(f"{CC}/crops/{k}.png", optimize=False, compress_level=3)
            json.dump(dict(runs=rs, pick=i, err=sc[:2], box=[x0, x1]), open(f"{CC}/crops/{k}.json", "w"))
            print(k, "runs", len(rs), "pick", i, "err", [round(s, 1) for s, _ in sc[:2]])
        del raw

def clean(im):
    a = np.asarray(im.split()[3]); m = a > 40
    lab, n = ndi.label(ndi.binary_dilation(m[::4, ::4], iterations=1))
    if n <= 1: return im
    sz = ndi.sum(np.ones_like(lab), lab, range(1, n + 1)); big = sz.max()
    drop = [i + 1 for i in range(n) if sz[i] < big * 0.02]
    if not drop: return im
    dm = np.isin(lab, drop).repeat(4, 0).repeat(4, 1)[:a.shape[0], :a.shape[1]]
    A = np.array(im); A[..., 3][dm[:A.shape[0], :A.shape[1]]] = 0
    return Image.fromarray(A)

def save_webp(im, path, maxkb):
    for q in (86, 80, 74, 68, 60, 52):
        b = io.BytesIO(); im.save(b, "WEBP", quality=q, method=4)
        if b.tell() <= maxkb * 1024: break
    open(path, "wb").write(b.getvalue()); return b.tell()

def head_cx(im):
    A = np.asarray(im.split()[3]); h = A.shape[0]; xs = n = 0
    for y in range(int(h * 0.03), int(h * 0.13), 2):
        row = np.nonzero(A[y] > 128)[0]
        if len(row): xs += (row[0] + row[-1]) / 2; n += 1
    return xs / n if n else A.shape[1] / 2

def por_crop(im, side_f, top_f, dx_f):
    w, h = im.size; cx = head_cx(im) + dx_f * h; side = int(h * side_f); top = int(h * top_f)
    por = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    por.paste(im.crop((int(cx - side / 2), top, int(cx - side / 2) + side, top + side)), (0, 0))
    return por.resize((256, 256), Image.LANCZOS)

def fit_por(fig, por):
    """find (side, top, dx) so that por == crop of fig"""
    tgt = np.asarray(por.convert("RGBA").resize((48, 48), Image.BILINEAR)).astype(np.float32)
    best = None
    def err(p):
        c = np.asarray(por_crop(fig, *p).resize((48, 48), Image.BILINEAR)).astype(np.float32)
        return float(np.abs(c - tgt).mean())
    for s in np.arange(0.14, 0.36, 0.01):
        for t in np.arange(-0.04, 0.07, 0.01):
            e = err((s, t, 0.0))
            if best is None or e < best[0]: best = (e, (s, t, 0.0))
    e0, (s0, t0, _) = best
    for s in np.arange(s0 - 0.01, s0 + 0.011, 0.0025):
        for t in np.arange(t0 - 0.01, t0 + 0.011, 0.0025):
            for d in np.arange(-0.03, 0.031, 0.005):
                e = err((s, t, d))
                if e < best[0]: best = (e, (s, t, d))
    return best

def cmd_fin(rfile, bfile, only=None):
    R = json.load(open(rfile)); B = json.load(open(bfile))
    os.makedirs(f"{CC}/out/img", exist_ok=True); os.makedirs(f"{CC}/bgcut", exist_ok=True)
    log = open(f"{CC}/fin.log", "a")
    for k, v in R.items():
        if only and k not in only: continue
        if k not in B: continue
        bp = f"{CC}/bgcut/{k}.png"
        if not os.path.exists(bp): subprocess.run(["curl", "-sS", "-o", bp, B[k]], check=True)
        cut = clean(Image.open(bp).convert("RGBA"))
        a = cut.split()[3].point(lambda x: 255 if x > 12 else 0); cut = cut.crop(a.getbbox())
        w, h = cut.size
        name = os.path.basename(v["file"])[:-5]
        oldfig = Image.open(v["fig"]).convert("RGBA")
        fig = cut.resize((max(1, round(w * oldfig.height / h)), oldfig.height), Image.LANCZOS)
        kb = save_webp(fig, f"{CC}/out/img/{name}.webp", 250)
        msg = f"{k} fig {fig.size} {kb//1024}KB"
        if v.get("por"):
            oldpor = Image.open(v["por"]).convert("RGBA")
            # framing fitted on the OLD pair at 900px, applied to the new full-res cut
            e, p = fit_por(oldfig, oldpor)
            por = por_crop(cut, *p)
            pkb = save_webp(por, f"{CC}/out/img/por-{name[4:]}.webp", 80)
            msg += f" por fit err {e:.1f} p={tuple(round(x,4) for x in p)} {pkb//1024}KB"
        print(msg); log.write(msg + "\n"); log.flush()

if __name__ == "__main__":
    c = sys.argv[1]
    if c == "recs": cmd_recs(sys.argv[2])
    elif c == "crop": cmd_crop(sys.argv[2], sys.argv[3])
    elif c == "fin": cmd_fin(sys.argv[2], sys.argv[3], set(sys.argv[4:]) or None)
