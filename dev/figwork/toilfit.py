#!/usr/bin/env python3
"""Face landmarks for the makeup layer (review/toilette, dev/build/jtoil.js §makeup look).
For every women's picture in img/veil-fit.json (por-* portraits and fig-* figures; the face box was measured for the veil),
find the MOUTH by colour inside the lower face box (weighted centroid of the reddest lip pixels), then the two CHEEK centres from
the eye line (veil band) and the mouth, tilted with the face. Output img/toil-fit.json:
  { "<file>": [mouthX, mouthY, cheekLX, cheekLY, cheekRX, cheekRY, faceW, faceH, aspect, rotDeg] }   (x/w in % of image width,
  y/h in % of image height, aspect = height/width) — the game draws blush, lip tint and skin light from these numbers.
usage: python3 -I dev/figwork/toilfit.py (-I: dev/figwork has its own cv2.py) [--limit N] [--only por-consort-c01]   (reads the pictures from the CDN, keeps nothing on disk)
"""
import json, sys, io, math, urllib.request, concurrent.futures as cf
import numpy as np
from PIL import Image
BASE = "https://ctm-img.victoria-tntt.workers.dev/img/"
B0 = .165  # band (eye line) as a fraction of the veil box (j92 KIT_VEIL.B0)

def get(url):
    for i in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "curl/8"}), timeout=40) as r:
                return r.read()
        except Exception as e:
            err = e
    raise err

def land(name, box):
    im = Image.open(io.BytesIO(get(BASE + name))).convert("RGBA")
    W, H = im.size
    a = np.asarray(im).astype(np.float32)
    l, t, w, h, rot = box
    x0, y0, bw, bh = l / 100 * W, t / 100 * H, w / 100 * W, h / 100 * H
    ang = math.radians(rot or 0)
    cx, cy = x0 + bw / 2, y0 + bh / 2
    def P(u, v):  # box units → image px, rotated about the box centre
        px, py = x0 + u * bw - cx, y0 + v * bh - cy
        return cx + px * math.cos(ang) - py * math.sin(ang), cy + px * math.sin(ang) + py * math.cos(ang)
    ex, ey = P(.5, B0)
    # mouth search window: middle of the box, below the eye line
    gx0, gx1 = int(max(0, x0 + .26 * bw)), int(min(W, x0 + .70 * bw))
    gy0, gy1 = int(max(0, y0 + .30 * bh)), int(min(H, y0 + .72 * bh))
    reg = a[gy0:gy1, gx0:gx1]
    mx, my, ok = None, None, 0
    if reg.size:
        r, g, b, al = reg[..., 0], reg[..., 1], reg[..., 2], reg[..., 3]
        red = (r - np.maximum(g, b)) * (al > 200) * (r > 110)
        ex0, ey0 = P(.48, .50)
        yy, xx = np.mgrid[gy0:gy1, gx0:gx1]
        near = np.hypot(xx - ex0, (yy - ey0) * 1.3) < .2 * bw
        red = red * near
        thr = np.percentile(red[near], 97.0) if near.sum() > 50 else 0
        m = red >= max(thr, 40)
        if m.sum() >= 3:
            ys, xs = np.nonzero(m)
            wt = red[m]
            mx, my = gx0 + (xs * wt).sum() / wt.sum(), gy0 + (ys * wt).sum() / wt.sum()
            ok = 1
    if mx is None:
        mx, my = P(.46, .49)
    # cheeks: the face axis is the box's own tilt (not eye→mouth: the box centre is not the nose on a turned face); cheek apples sit
    # 60 % of the way from the eye line down to the mouth, a quarter of the face width either side of the mouth
    ux, uy = -math.sin(ang), math.cos(ang)        # down the face
    vx, vy = math.cos(ang), math.sin(ang)         # across the face
    dv = (mx - ex) * ux + (my - ey) * uy          # eye line → mouth distance along the axis
    bx, by = mx - ux * dv * .40, my - uy * dv * .40
    # the face's own width on the cheek line (skin run around the axis point): a turned face gets its cheeks where the skin is
    def skin(x, y):
        xi, yi = int(round(x)), int(round(y))
        if xi < 0 or yi < 0 or xi >= W or yi >= H: return False
        R, G, Bc, A = a[yi, xi]
        return A > 200 and R > 170 and G > 120 and Bc > 100 and R >= G >= Bc * .9 and R - Bc < 90
    def run(sign):
        n, gap = 0, 0
        for k in range(1, int(bw * .9)):
            if skin(bx + vx * k * sign, by + vy * k * sign): n, gap = k, 0
            else:
                gap += 1
                if gap > max(3, bw * .04): break
        return n
    lft, rgt = run(-1), run(1)
    if lft < bw * .12 or rgt < bw * .12: lft = rgt = bw * .36
    c0 = (rgt - lft) / 2                          # centre of the face on this line, relative to the axis point
    half = (lft + rgt) / 2
    cl = (bx + vx * (c0 - half * .55), by + vy * (c0 - half * .55)); cr = (bx + vx * (c0 + half * .55), by + vy * (c0 + half * .55))
    pc = lambda x, y: [round(x / W * 100, 2), round(y / H * 100, 2)]
    return [*pc(mx, my), *pc(*cl), *pc(*cr), round(bw / W * 100, 2), round(bh / H * 100, 2), round(H / W, 4), round(rot or 0, 1), ok]

CHEEK_X, CHEEK_Y = .27, .17   # cheek apples: ±27 % of the face-box width from the mouth, 17 % of the box height above it
def recheek(v):
    """cheeks from the (reliable) mouth + face box size + tilt: under the pupils, at the nose-tip line (owner check 15/11:
    the skin-line estimate sat too close to the nose on turned faces)"""
    mx, my, _, _, _, _, fw, fh, A, rot = v
    ang = math.radians(rot or 0)
    W, H = 100., 100. * A                         # work in % of the width on both axes
    X, Y = mx, my * A
    dx, dy = fw * CHEEK_X, fh * A * CHEEK_Y
    pts = []
    for s in (-1, 1):
        px, py = s * dx, -dy
        x, y = X + px * math.cos(ang) - py * math.sin(ang), Y + px * math.sin(ang) + py * math.cos(ang)
        pts += [round(x, 2), round(y / A, 2)]
    return [mx, my] + pts + [fw, fh, A, rot]

# ---------- --extend: every other portrait / figure of the same face (higher ranks t5–t8, lãnh cung, cung nữ dress, kc/ngheo) ----------
# The face is the same painting identity; only dress and hair change. The face around the mouth of a measured portrait (same identity, same
# age band) is found in the new portrait by multi-scale template matching, its points mapped over; each new figure is then matched to its portrait.
def _gray(x):
    import cv2
    al = x[..., 3:4] / 255.
    rgb = x[..., :3] * al + 255 * (1 - al)
    return cv2.cvtColor(rgb.astype(np.uint8), cv2.COLOR_RGB2GRAY)
def _img(name):
    return np.asarray(Image.open(io.BytesIO(get(BASE + name))).convert("RGBA")).astype(np.float32)
def transfer(src_img, v, dst_img, scales, top=1.0, minv=.55):
    import cv2
    SH, SW = src_img.shape[:2]; DH, DW = dst_img.shape[:2]
    mx, my, fw = v[0] / 100 * SW, v[1] / 100 * SH, v[6] / 100 * SW
    x0, x1 = int(max(0, mx - fw * .95)), int(min(SW, mx + fw * .95)); y0, y1 = int(max(0, my - fw * 1.15)), int(min(SH, my + fw * .45))
    tpl = _gray(src_img)[y0:y1, x0:x1]; dg = _gray(dst_img)[:int(DH * top), :]
    best = (-2, 0, 0, 0)
    for s in scales:
        tw, th = int(tpl.shape[1] * s), int(tpl.shape[0] * s)
        if tw < 10 or th < 10 or tw >= dg.shape[1] or th >= dg.shape[0]: continue
        r = cv2.matchTemplate(dg, cv2.resize(tpl, (tw, th), interpolation=cv2.INTER_AREA), cv2.TM_CCOEFF_NORMED)
        _, mvv, _, ml = cv2.minMaxLoc(r)
        if mvv > best[0]: best = (mvv, s, ml[0], ml[1])
    mvv, s, ox, oy = best
    if mvv < minv: return None
    mp = lambda x, y: [round((ox + (x / 100 * SW - x0) * s) / DW * 100, 2), round((oy + (y / 100 * SH - y0) * s) / DH * 100, 2)]
    return mp(v[0], v[1]) + mp(v[2], v[3]) + mp(v[4], v[5]) + [round(v[6] / 100 * SW * s / DW * 100, 2), round(v[7] / 100 * SH * s / DH * 100, 2), round(DH / DW, 4), v[9]]
MD5F = "dev/art/toil-fit-md5.json"   # {picture: CDN md5[:16]} the points were measured on (live art changes → re-measure)
def cdn_md5():
    idx = json.loads(get(BASE + "_index.json"))
    return {f[0][4:]: f[1] for f in idx["files"]}
def save_md5(keys):
    m = cdn_md5()
    json.dump({k: m.get(k, "") for k in sorted(keys)}, open(MD5F, "w"), separators=(",", ":"), sort_keys=True)
def stale():
    """pictures whose CDN md5 differs from the one measured (or never recorded)"""
    try: old = json.load(open(MD5F))
    except Exception: old = {}
    m = cdn_md5(); out = json.load(open("img/toil-fit.json"))
    return sorted(k for k in out if old.get(k) != m.get(k))

def extend():
    import re
    out = json.load(open("img/toil-fit.json"))
    idx = json.loads(get(BASE + "_index.json"))
    files = set(f[0][4:] for f in idx["files"])
    pors = sorted(f for f in files if re.match(r"por-(consort|maid)-", f) and f not in out)
    # the player's own pictures first: consort faces in consort dress (t5–t8 above the measured t1–t4) and lãnh cung; "--all" adds cung nữ dress,
    # origin pictures (kc/ngheo) and the maid identities
    # "--more": also her own other dresses as a consort face — cung nữ dress (tm0–tm4: she starts as a maid) and the origin pictures (kc / ngheo)
    if "--all" not in sys.argv:
        pat = r"por-consort-c\d+-(t([5-8]|cold|m[0-4])|kc|ngheo)-a\d+\.webp$" if "--more" in sys.argv else r"por-consort-c\d+-t([5-8]|cold)-a\d+\.webp$"
        pors = [f for f in pors if re.match(pat, f)]
    # "--re <regex>": only the portraits whose name matches (e.g. her maid face's consort tiers: 'por-maid-m\d+-t[1-8]-')
    if "--re" in sys.argv: pors = [f for f in pors if re.search(sys.argv[sys.argv.index("--re") + 1], f)]
    only = sys.argv[sys.argv.index("--only") + 1] if "--only" in sys.argv else None
    if only: pors = [f for f in pors if only in f]
    keys0 = [k for k in out if k.startswith("por-")]   # measured portraits (snapshot: the pool threads must not read `out` while it grows)
    base = {k: out[k] for k in keys0}
    def ref_of(n):
        m = re.match(r"por-(consort|maid)-(\w+?)-t?(\w+)-a(\d+)\.webp", n)
        if not m: return None
        role, ident, _, age = m.groups()
        cand = [k for k in keys0 if k.startswith(f"por-{role}-{ident}-")]
        if not cand: return None
        cand.sort(key=lambda k: (0 if k.endswith(f"-a{age}.webp") else 1, k))
        return cand[0]
    bad = []
    def one(n):
        r = ref_of(n)
        if not r: return n, None, None
        pv = transfer(_img(r), base[r], _img(n), np.linspace(.8, 1.25, 19), .8)
        if not pv: return n, None, None
        f = "fig-" + n[4:]
        fv = transfer(_img(n), pv, _img(f), np.linspace(.25, 1.2, 40), .4, .5) if f in files else None
        return n, pv, fv
    with cf.ThreadPoolExecutor(4) as ex:
        for i, (n, pv, fv) in enumerate(ex.map(one, pors)):
            if pv: out[n] = pv
            else: bad.append(n)
            if fv: out["fig-" + n[4:]] = fv
            if i % 200 == 0:
                print("extend", i, len(pors), len(bad), file=sys.stderr)
                json.dump({k: recheek(v) for k, v in out.items()}, open("img/toil-fit.json", "w"), separators=(",", ":"), sort_keys=True)
    out = {k: recheek(v) for k, v in out.items()}
    json.dump(out, open("img/toil-fit.json", "w"), separators=(",", ":"), sort_keys=True)
    save_md5(out.keys())
    print(json.dumps({"n": len(out), "noRef": len(bad), "bad": bad[:10]}))

def main():
    if "--extend" in sys.argv: return extend()
    if "--stale" in sys.argv: s = stale(); print(len(s), s[:20]); return
    if "--recheek" in sys.argv:
        d = json.load(open("img/toil-fit.json")); d = {k: recheek(v) for k, v in d.items()}
        json.dump(d, open("img/toil-fit.json", "w"), separators=(",", ":"), sort_keys=True); print(len(d)); return
    fit = json.loads(get(BASE + "veil-fit.json"))
    lim = None; only = None
    if "--limit" in sys.argv: lim = int(sys.argv[sys.argv.index("--limit") + 1])
    if "--only" in sys.argv: only = sys.argv[sys.argv.index("--only") + 1]
    names = [n for n in sorted(fit) if n.startswith("por-") and (not only or only in n)]
    if lim: names = names[:lim]
    out, bad = {}, []
    with cf.ThreadPoolExecutor(8) as ex:
        fut = {ex.submit(land, n, fit[n]): n for n in names}
        for i, f in enumerate(cf.as_completed(fut)):
            n = fut[f]
            try:
                r = f.result(); out[n] = r[:10]
                if not r[10]: bad.append(n)
            except Exception as e:
                bad.append(n + " ERR " + str(e)[:60])
            if i % 100 == 0: print(i, len(names), file=sys.stderr)
    # figures: the portrait is a crop of the same painting. The veil boxes of figures are not reliable enough for makeup, so the
    # portrait's face (box ×1.4) is found in the figure by multi-scale template matching (OpenCV) and its points are mapped over.
    import cv2
    PW, PH = 384, 506
    def figmap(n):
        q = "por-" + n[4:]
        if q not in out: return None
        pb, v = fit[q], out[q]
        por = np.asarray(Image.open(io.BytesIO(get(BASE + q))).convert("RGBA")).astype(np.float32)
        fig = np.asarray(Image.open(io.BytesIO(get(BASE + n))).convert("RGBA")).astype(np.float32)
        FH, FW = fig.shape[:2]
        def gray(x):  # transparent → white, then grey
            al = x[..., 3:4] / 255.
            rgb = x[..., :3] * al + 255 * (1 - al)
            return cv2.cvtColor(rgb.astype(np.uint8), cv2.COLOR_RGB2GRAY)
        pg, fg = gray(por), gray(fig)
        bx0, by0, bw, bh = pb[0] / 100 * PW, pb[1] / 100 * PH, pb[2] / 100 * PW, pb[3] / 100 * PH
        tx0, ty0 = int(max(0, bx0 - bw * .2)), int(max(0, by0 - bh * .5)); tx1, ty1 = int(min(PW, bx0 + bw * 1.2)), int(min(PH, by0 + bh * 1.1))
        tpl = pg[ty0:ty1, tx0:tx1]
        top = fg[:int(FH * .4), :]
        best = (-2, 0, 0, 0)
        for s in np.linspace(.25, 1.2, 40):
            tw, th = int(tpl.shape[1] * s), int(tpl.shape[0] * s)
            if tw < 12 or th < 12 or tw >= top.shape[1] or th >= top.shape[0]: continue
            r = cv2.matchTemplate(top, cv2.resize(tpl, (tw, th), interpolation=cv2.INTER_AREA), cv2.TM_CCOEFF_NORMED)
            _, mv, _, ml = cv2.minMaxLoc(r)
            if mv > best[0]: best = (mv, s, ml[0], ml[1])
        mv, s, ox, oy = best
        if mv < .5: return None
        def mp(x, y):
            px, py = x / 100 * PW - tx0, y / 100 * PH - ty0
            return [round((ox + px * s) / FW * 100, 2), round((oy + py * s) / FH * 100, 2)]
        return mp(v[0], v[1]) + mp(v[2], v[3]) + mp(v[4], v[5]) + [round(v[6] / 100 * PW * s / FW * 100, 2), round(v[7] / 100 * PH * s / FH * 100, 2), round(FH / FW, 4), v[9]]
    figs = [n for n in sorted(fit) if n.startswith("fig-") and "por-" + n[4:] in out]
    with cf.ThreadPoolExecutor(6) as ex:
        fut = {ex.submit(figmap, n): n for n in figs}
        for i, f in enumerate(cf.as_completed(fut)):
            n = fut[f]
            try:
                r = f.result()
                if r: out[n] = r
                else: bad.append(n + " nomatch")
            except Exception as e:
                bad.append(n + " ERR " + str(e)[:60])
            if i % 100 == 0: print("fig", i, len(figs), file=sys.stderr)
    out = {k: recheek(v) for k, v in out.items()}
    json.dump(out, open("img/toil-fit.json", "w"), separators=(",", ":"), sort_keys=True)
    print(json.dumps({"n": len(out), "noMouth": len(bad), "bad": bad[:10]}))

if __name__ == "__main__":
    main()
