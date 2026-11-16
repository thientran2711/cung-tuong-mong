#!/usr/bin/env python3
"""unrosy_model.py — undo the rosy layer on files whose pre-rosy git copy no longer lines up (re-cut, re-cropped, outfit/pose
edits made from the rosy picture, files born after img/ left git). Companion of unrosy.py (same output layout).

Face: the rosy() field of dev/art/skin-smudge.py rebuilt on the CURRENT pixels (same analyse() masks, same blush/lip shapes, the
  por's pre-rosy a*/b* from dev/art/skin-rosy-fixed.txt / the pre por), subtracted; for portraits the a*/b* parts are then scaled
  once so the measured face (analyse) lands back on its pre-rosy a*/b* (edits made from the rosy picture drift a little).
  Figures use their portrait's scale. Player look 1: player.py field rebuilt with the logged da/db (log/player.log).
Neck/hands: the logged skin-match shift (dev/art/skin-match/log/fix.jsonl) applied with the opposite sign (fix.apply, MediaPipe masks).
  python unrosy_model.py CURDIR OUTDIR NAMES.txt LOG.jsonl M.jsonl
"""
import sys, os, json, importlib.util, numpy as np, cv2
H = os.path.dirname(os.path.abspath(__file__)); W = os.path.abspath(os.path.join(H, "..", "..", "..")) + "/"
def mod(n, p):
    s = importlib.util.spec_from_file_location(n, W + p); m = importlib.util.module_from_spec(s); s.loader.exec_module(m); return m
sk = mod("sk", "dev/art/skin-smudge.py"); sys.path.insert(0, W + "dev/art/skin-match"); import seg, measure, fix
sys.path.insert(0, H); from unrosy import lab, apply, save
MEN = ("man", "eunuch", "official", "emperor", "physician")

def rosy_field(im, path, ac, bc, men, sa=1.0, sb=1.0):
    """returns Lab field the rosy pass added (full image), or None if no face"""
    a = sk.analyse(path)
    if not a: return None
    info, st = a; skin, (x0, y0, x1, y1) = st[2], st[3]
    A_T, B_T, blush = (11.0, 15.0, 1.5) if men else (13.0, 15.0, 4.0)
    sub = im[y0:y1, x0:x1]; lb = lab(sub); h, w = lb.shape[:2]
    m = cv2.GaussianBlur(cv2.dilate(skin.astype(np.uint8), np.ones((3, 3), np.uint8)).astype(np.float32), (0, 0), max(1.5, w / 60))
    m *= (sub[..., 3] >= 200)
    da = float(np.clip(A_T - ac, 0, 7)) * 0.8; db = float(np.clip(B_T - bc, 0, 6)) * 0.5
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32); sg = 0.11 * w
    g = np.exp(-(((xx - 0.30 * w) ** 2 + (yy - 0.62 * h) ** 2) / (2 * sg * sg))) + np.exp(-(((xx - 0.70 * w) ** 2 + (yy - 0.62 * h) ** 2) / (2 * sg * sg)))
    k = blush * (1.0 if A_T - ac > 1 else 0.5)
    F = np.zeros(im.shape[:2] + (3,), np.float32); f = F[y0:y1, x0:x1]
    f[..., 1] = m * (da + k * g) * sa; f[..., 2] = m * (db + 0.3 * k * g) * sb; f[..., 0] = -m * 0.6 * g
    lip = np.zeros((h, w), np.float32); lip[int(.60 * h):int(.86 * h), int(.30 * w):int(.70 * w)] = 1
    lip *= ((lb[..., 1] > ac + 3 + da) & (skin == 0) & (sub[..., 3] >= 250)).astype(np.float32)
    f[..., 1] += cv2.GaussianBlur(lip, (0, 0), 1.0) * (3.0 if da > 1 else 1.5) * sa
    return F, info

def player_field(im, da, db):
    """player.py run() field (whole visible skin offset + cheek blush) rebuilt on current pixels"""
    por = False
    P = seg.probs(im, full=por); r = measure.regions(im, P)
    if r is None: return None
    st = measure.stats(r); lb = r["lab"]; L, A, B = lb[..., 0], lb[..., 1], lb[..., 2]
    Hh, Ww = im.shape[:2]; sg = max(1.0, Ww / 300)
    skinp = np.clip((P[..., 2] + P[..., 3] - 0.3) / 0.4, 0, 1)
    skm = (r["face"] | r["body"]); sa_, sb_ = float(np.median(A[skm])), float(np.median(B[skm]))
    cw = np.exp(-(((A - sa_) / 7.0) ** 2 + ((B - sb_) / 9.0) ** 2) / 2)
    feat = (L < st["face_L"] - 25) | (A > st["face_a"] + 10)
    w = cv2.GaussianBlur(skinp * cw * np.clip((L - 20) / 15, 0, 1) * (~feat), (0, 0), sg) * (im[..., 3] / 255.0)
    x0, y0, x1, y1 = r["fbox"]; fw, fh = x1 - x0, y1 - y0
    yy, xx = np.mgrid[0:Hh, 0:Ww].astype(np.float32); s2 = (0.12 * fw) ** 2
    g = sum(np.exp(-(((xx - (x0 + c * fw)) ** 2 + (yy - (y0 + 0.62 * fh)) ** 2) / (2 * s2))) for c in (0.30, 0.70))
    fm = cv2.GaussianBlur(r["face"].astype(np.float32), (0, 0), sg)
    F = np.zeros(im.shape[:2] + (3,), np.float32)
    F[..., 1] = w * da + fm * 4.5 * g; F[..., 2] = w * db + fm * 0.3 * 4.5 * g; F[..., 0] = -fm * 0.6 * g
    return F

def neck_hands(im, n, sh):
    """opposite of the skin-match shift (fix.apply with negated shifts)"""
    if n.startswith("por-"):
        r = fix.por_regions(im)
        if r is None or r["body"].sum() < 40: return im
        return fix.apply(im, r, (-sh[0][0], -sh[0][1]), (-sh[0][0], -sh[0][1]), por=True)
    r = measure.regions(im, seg.probs(im))
    if r is None: return im
    return fix.apply(im, r, (-sh[0][0], -sh[0][1]), (-sh[1][0], -sh[1][1]))

if __name__ == "__main__":
    CUR, OUT, LST, LOG, MJ = sys.argv[1:6]; os.makedirs(OUT + "/img", exist_ok=True); os.makedirs(OUT + "/fld", exist_ok=True)
    rows = {}; 
    for l in open(W + "dev/art/skin-rosy-fixed.txt"):
        p = l.split()
        if len(p) >= 3 and p[0].startswith("por-"): rows[p[0]] = float(p[2]); rows[p[1]] = float(p[2])
    M = {}
    for l in open(MJ):
        r = json.loads(l); M[r["por"]] = r
        if r.get("fig"): M[r["fig"]] = r
    SM = {}
    for l in open(W + "dev/art/skin-match/log/fix.jsonl"):
        r = json.loads(l); s = r.get("shift")
        if not s: continue
        if r["f"] not in SM: SM[r["f"]] = (s["neck"], s["hands"])
        if r.get("por"): SM[r["por"]] = (s["neck"], s["neck"])
    PL = {}
    for l in open(W + "dev/art/skin-match/log/player.log"):
        n, d = l.split(" ", 1); PL[n] = eval(d)
    scale = {}
    if os.path.exists(OUT + "/scale.json"): scale = json.load(open(OUT + "/scale.json"))
    log = open(LOG, "a")
    names = open(LST).read().split(); names.sort(key=lambda n: 0 if n.startswith("por-") else 1)   # portraits first: their scale feeds the figure
    for n in names:
        path = f"{CUR}/img/{n}"; C = cv2.imread(path, cv2.IMREAD_UNCHANGED); rec = dict(f=n, st="ok")
        if C is None: rec["st"] = "missing"; log.write(json.dumps(rec) + "\n"); continue
        men = n.split("-")[1] in MEN
        if n in PL:
            F = player_field(C, PL[n]["da"], PL[n]["db"]); rec["mode"] = "player"
        else:
            mr = M.get(n); ac = rows.get(n)
            if ac is None or mr is None: rec["st"] = "noparams"; log.write(json.dumps(rec) + "\n"); continue
            bc = mr["pre"][2] if "pre" in mr else None
            if bc is None and "cur" in mr:   # invert b-shift: cur = pre + 0.5*clip(15-pre,0,6) + ~0.4 blush
                c = mr["cur"][2] - 0.4; bc = c - 3.0 if c - 3.0 <= 9 else (2 * c - 15 if c < 15 else c)
            if bc is None: rec["st"] = "noparams"; log.write(json.dumps(rec) + "\n"); continue
            por = n.startswith("por-"); key = "por-" + n[4:]
            sa, sb = scale.get(key, (1.0, 1.0)) if not por else (1.0, 1.0)
            r = rosy_field(C, path, ac, bc, men, sa, sb)
            if r is None: rec["st"] = "noface"; log.write(json.dumps(rec) + "\n"); continue
            F, info = r; rec.update(mode="rosy", ac_pre=ac, bc_pre=round(bc, 2), ac_cur=info["ac"], bc_cur=info["bc"])
            if por:   # one calibration step: measured face back to pre-rosy a*/b*
                os.makedirs(f"{OUT}/tmp{os.getpid()}", exist_ok=True); tmp = f"{OUT}/tmp{os.getpid()}/{n}"; cv2.imwrite(tmp, apply(C, F), [cv2.IMWRITE_WEBP_QUALITY, 101])
                a2 = sk.analyse(tmp); os.remove(tmp)
                if a2:
                    ga, gb = info["ac"] - a2[0]["ac"], info["bc"] - a2[0]["bc"]
                    sa = float(np.clip((info["ac"] - ac) / ga, 0.5, 1.6)) if ga > 0.3 else 1.0
                    sb = float(np.clip((info["bc"] - bc) / gb, 0.5, 1.6)) if gb > 0.3 else 1.0
                    F[..., 1] *= sa; F[..., 2] *= sb; scale[n] = (round(sa, 3), round(sb, 3)); rec["scale"] = scale[n]
        if F is None: rec["st"] = "noface"; log.write(json.dumps(rec) + "\n"); continue
        O = apply(C, F)
        if n in SM and any(v != 0 for v in SM[n][0] + SM[n][1]):
            O = neck_hands(O, n, SM[n]); rec["sm"] = SM[n]
        A = lab(C) - lab(O); A *= (C[..., 3:] >= 150)
        q, rr, b = save(f"{OUT}/img/{n}", O, C); rec.update(q=q, sharp=rr, bytes=b)
        np.savez_compressed(f"{OUT}/fld/{n}.npz", A=A.astype(np.float16))
        log.write(json.dumps(rec) + "\n"); log.flush(); json.dump(scale, open(OUT + "/scale.json", "w"))
