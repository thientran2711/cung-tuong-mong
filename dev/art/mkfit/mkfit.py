#!/usr/bin/env python3
"""Makeup-colour anchors (review/mk-colour, KIT §60): lips, eyelids, brows for every picture of HER (img/toil-fit.json keys:
por-/fig- of the 84 player faces + the old player looks, every dress tier / age / trung y / kc / ngheo).
Method: MediaPipe Face Landmarker (478-point face mesh) on a face crop (around the toil-fit mouth, upscaled to 400 px wide),
then a sanity check against the toil-fit mouth / face width. A picture whose detection fails or looks wrong gets its points from its
pair (por <-> fig of the same name) by the similarity transform of the two toil-fit point sets (mouth + both cheeks).
Output, one file per face (the game loads only her own face):  img/mk-fit/<face>.json  (copy in dev/art/mkfit/)
  { "<file>": [x0,y0,x1,y1,...] }  60 points, integers in 1/4000 of the image width (x) and height (y), order MK_IDX below.
  dev/art/mkfit/md5.json = {file: CDN md5[:16]} measured on; `--stale` re-measures pictures changed since (e.g. portrait re-crops).
usage: python3 -I dev/art/mkfit/mkfit.py [--only consort-c05] [--stale] [--model face_landmarker.task] [--jobs 8]
needs: pip install mediapipe (+ libegl1 libgles2), model face_landmarker.task (MediaPipe model storage, float16/1).
"""
import json, sys, io, os, re, math, urllib.request, concurrent.futures as cf
import numpy as np
from PIL import Image
BASE = "https://ctm-img.victoria-tntt.workers.dev/img/"
ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../.."))
U = 4000
# lip outer 12 · lip inner 8 · eye A upper 7 + lower 3 · eye B upper 7 + lower 3 · brow A upper 5 + lower 5 · brow B upper 5 + lower 5
MK_IDX = [61, 40, 37, 0, 267, 270, 291, 321, 314, 17, 84, 91,
          78, 81, 13, 311, 308, 402, 14, 178,
          33, 161, 160, 159, 158, 157, 133, 154, 145, 163,
          263, 388, 387, 386, 385, 384, 362, 381, 374, 390,
          70, 63, 105, 66, 107, 55, 65, 52, 53, 46,
          300, 293, 334, 296, 336, 285, 295, 282, 283, 276]
assert len(MK_IDX) == 60

def get(url):
    err = None
    for i in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "curl/8"}), timeout=60) as r:
                return r.read()
        except Exception as e:
            err = e
    raise err

def face_of(name):
    m = re.match(r"(?:por|fig)-([a-z]+-[a-z]*\d+)-", name)
    return m.group(1) if m else None

_LM = None
def landmarker(model):
    global _LM
    if _LM is None:
        import mediapipe as mp
        from mediapipe.tasks import python as mpp
        from mediapipe.tasks.python import vision
        o = vision.FaceLandmarkerOptions(base_options=mpp.BaseOptions(model_asset_path=model), num_faces=1,
                                         min_face_detection_confidence=.1, min_face_presence_confidence=.1)
        _LM = (mp, vision.FaceLandmarker.create_from_options(o))
    return _LM

def detect(model, data, v):
    """data = picture bytes, v = its toil-fit row → 60 points in image px (or None)"""
    mp, L = landmarker(model)
    im = Image.open(io.BytesIO(data)).convert("RGBA")
    bg = Image.new("RGBA", im.size, (255, 255, 255, 255)); bg.alpha_composite(im); rgb = bg.convert("RGB")
    W, H = rgb.size
    mx, my, fw = v[0] / 100 * W, v[1] / 100 * H, v[6] / 100 * W
    x0, y0 = int(max(0, mx - fw * 1.6)), int(max(0, my - fw * 2.0)); x1, y1 = int(min(W, mx + fw * 1.6)), int(min(H, my + fw * 1.2))
    cr = rgb.crop((x0, y0, x1, y1)); k = 400 / cr.width
    cr = cr.resize((400, max(10, int(round(cr.height * k)))), Image.LANCZOS)
    r = L.detect(mp.Image(image_format=mp.ImageFormat.SRGB, data=np.ascontiguousarray(np.asarray(cr))))
    if not r.face_landmarks: return None, (W, H)
    lm = r.face_landmarks[0]
    pts = [(x0 + lm[i].x * cr.width / k, y0 + lm[i].y * cr.height / k) for i in MK_IDX]
    # sanity: lip centre near the toil-fit mouth, eye distance a plausible share of the face width
    lc = np.mean(pts[0:12], axis=0)
    ea, eb = np.mean(pts[20:30], axis=0), np.mean(pts[30:40], axis=0)
    ed = math.hypot(*(ea - eb))
    if math.hypot(lc[0] - mx, lc[1] - my) > fw * .22 or not (fw * .28 < ed < fw * 1.1): return None, (W, H)
    return pts, (W, H)

def detect_free(model, data):
    """second try when the toil-fit box is wrong (its mouth off the face): the whole portrait, or the top 40 % of a figure, no toil-fit check"""
    mp, L = landmarker(model)
    im = Image.open(io.BytesIO(data)).convert("RGBA")
    bg = Image.new("RGBA", im.size, (255, 255, 255, 255)); bg.alpha_composite(im); rgb = bg.convert("RGB")
    W, H = rgb.size
    y1 = H if H / W < 1.6 else int(H * .4)
    cr = rgb.crop((0, 0, W, y1)); k = 640 / cr.width
    cr = cr.resize((640, int(round(cr.height * k))), Image.LANCZOS)
    r = L.detect(mp.Image(image_format=mp.ImageFormat.SRGB, data=np.ascontiguousarray(np.asarray(cr))))
    if not r.face_landmarks: return None, (W, H)
    lm = r.face_landmarks[0]
    pts = [(lm[i].x * cr.width / k, lm[i].y * cr.height / k) for i in MK_IDX]
    lc = np.mean(pts[0:12], axis=0); ea, eb = np.mean(pts[20:30], axis=0), np.mean(pts[30:40], axis=0)
    ed = math.hypot(*(ea - eb))
    if not (W * .04 < ed < W * .4) or lc[1] < max(ea[1], eb[1]): return None, (W, H)
    return pts, (W, H)

def enc(pts, W, H):
    out = []
    for x, y in pts: out += [int(round(x / W * U)), int(round(y / H * U))]
    return out

def sim_from(a, b):
    """similarity (scale, rot, translation) mapping 3 points a -> b (least squares), in px"""
    A = np.array(a, float); B = np.array(b, float)
    ca, cb = A.mean(0), B.mean(0); A0, B0 = A - ca, B - cb
    za = A0[:, 0] + 1j * A0[:, 1]; zb = B0[:, 0] + 1j * B0[:, 1]
    s = (np.conj(za) * zb).sum() / (np.conj(za) * za).sum()
    return lambda p: (lambda z: (z.real + cb[0], z.imag + cb[1]))(s * ((p[0] - ca[0]) + 1j * (p[1] - ca[1])))

def tf_pts(v, W, H):
    return [(v[0] / 100 * W, v[1] / 100 * H), (v[2] / 100 * W, v[3] / 100 * H), (v[4] / 100 * W, v[5] / 100 * H)]

def main():
    args = sys.argv[1:]
    model = args[args.index("--model") + 1] if "--model" in args else os.path.join(ROOT, ".mk/face_landmarker.task")
    only = args[args.index("--only") + 1] if "--only" in args else None
    jobs = int(args[args.index("--jobs") + 1]) if "--jobs" in args else 8
    fit = json.load(open(os.path.join(ROOT, "dev/art/toil-fit.json")))
    idx = json.loads(get(BASE + "_index.json")); md5 = {f[0][4:]: f[1] for f in idx["files"]}
    md5f = os.path.join(ROOT, "dev/art/mkfit/md5.json")
    try: old5 = json.load(open(md5f))
    except Exception: old5 = {}
    names = sorted(n for n in fit if face_of(n) and (not only or face_of(n) == only) and n in md5)
    outdir = os.path.join(ROOT, "img/mk-fit"); os.makedirs(outdir, exist_ok=True)
    groups = {}
    for n in names: groups.setdefault(face_of(n), []).append(n)
    stale = "--stale" in args
    tot = {"ok": 0, "pair": 0, "fail": 0, "kept": 0}
    for g, L in sorted(groups.items()):
        fn = os.path.join(outdir, g + ".json")
        try: cur = json.load(open(fn))
        except Exception: cur = {}
        todo = [n for n in L if not (stale and n in cur and old5.get(n) == md5.get(n)) and not (not stale and n in cur)]
        tot["kept"] += len(L) - len(todo)
        if not todo: continue
        with cf.ThreadPoolExecutor(jobs) as ex:
            datas = dict(zip(todo, ex.map(lambda n: get(BASE + n), todo)))
        res, size = {}, {}
        for n in todo:
            try:
                p, size[n] = detect(model, datas[n], fit[n])
                if not p: p, size[n] = detect_free(model, datas[n])
            except Exception as e: p = None; print("err", n, e, file=sys.stderr)
            if p: res[n] = p
        for n in todo:
            W, H = size.get(n, (384, 506))
            if n in res:
                cur[n] = enc(res[n], W, H); tot["ok"] += 1; continue
            m = "fig-" + n[4:] if n.startswith("por-") else "por-" + n[4:]
            # pair transfer in "percent space" (x in % of width, y in % of width via the toil-fit aspect)
            Am, An = (fit[m][8] if m in fit else 1.3), fit[n][8]
            src = None
            if m in res:
                Wm, Hm = size[m]; src = [(x / Wm * 100, y / Hm * 100 * Am) for x, y in res[m]]
            elif m in cur:
                src = [(cur[m][2 * i] / U * 100, cur[m][2 * i + 1] / U * 100 * Am) for i in range(60)]
            if src is not None and m in fit:
                T = sim_from(tf_pts(fit[m], 100, 100 * Am), tf_pts(fit[n], 100, 100 * An))
                cur[n] = enc([T(p) for p in src], 100, 100 * An); tot["pair"] += 1
            else:
                tot["fail"] += 1; print("FAIL", n, file=sys.stderr)
        for n in todo:
            if n in cur: old5[n] = md5.get(n, "")
        json.dump(cur, open(fn, "w"), separators=(",", ":"), sort_keys=True)
        json.dump(old5, open(md5f, "w"), separators=(",", ":"), sort_keys=True)
        print(g, len(L), "todo", len(todo), "detected", len(res), flush=True)
    print(json.dumps(tot))

if __name__ == "__main__":
    main()
