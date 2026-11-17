#!/usr/bin/env python3 -I
"""review/fig-headtop: HEAD-TOP table for every full-body figure (owner 17/11: people stand level by the TOP OF THE HEAD, never by hair bun / hairpin / crown / hat).
Face-mesh (MediaPipe Face Landmarker, same model as dev/art/mkfit) on the top 40 % of each fig-*.webp: landmark 10 (top of the forehead) and 152 (chin) give the face height F;
head top = y(10) - K*F (K = HAIR_K, the hair above the forehead; calibrated on plain-hair figures, see dev/handover/reports/fig-headtop.md).
Out: dev/art/headtop/fig-ht.json  { "<file>.webp": ht in 1/4000 of the picture height }  (also img/fig-ht.json on the CDN).
usage: python3 -I dev/art/headtop/headtop.py --model face_landmarker.task [--dir <local dir of fig-*.webp> | --cdn] [--jobs 8] [--debug]"""
import sys, os, io, re, json, math, argparse, urllib.request, multiprocessing as mp_
import numpy as np
from PIL import Image
BASE = "https://ctm-img.victoria-tntt.workers.dev/img/"
U = 4000
HAIR_K = 0.30   # hair thickness above landmark 10, as a share of the face height (chin .. landmark 10); calibrated, see report
# the face mesh cannot read a face with closed eyes looking down; head top read by eye (hairline just under the crown) -- one picture of 8890 (17/11)
MANUAL = {"fig-maid-m15-t8-a18.webp": 382}
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
def get(url):
    err = None
    for i in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "curl/8"}), timeout=60) as r: return r.read()
        except Exception as e: err = e
    raise err
def face_rows(model, data):
    """-> (y10, y152, H) in picture px, or None"""
    mp, L = landmarker(model)
    im = Image.open(io.BytesIO(data)).convert("RGBA")
    bg = Image.new("RGBA", im.size, (255, 255, 255, 255)); bg.alpha_composite(im); rgb = bg.convert("RGB")
    W, H = rgb.size
    for fr in (.4, .55, .7):   # a crown / tall headdress can push the face lower; retry on a taller crop
        y1 = int(H * fr); cr = rgb.crop((0, 0, W, y1)); k = 640 / cr.width
        cr = cr.resize((640, int(round(cr.height * k))), Image.LANCZOS)
        r = L.detect(mp.Image(image_format=mp.ImageFormat.SRGB, data=np.ascontiguousarray(np.asarray(cr))))
        if not r.face_landmarks: continue
        lm = r.face_landmarks[0]
        y10, y152 = lm[10].y * cr.height / k, lm[152].y * cr.height / k
        F = y152 - y10
        if F < H * .03 or F > H * .2: continue
        return y10, y152, H
    return None
def job(a):
    name, model, d = a
    try:
        data = open(os.path.join(d, name), "rb").read() if d else get(BASE + name)
        r = face_rows(model, data)
    except Exception as e: return name, None
    return name, r
def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--model"); ap.add_argument("--dir"); ap.add_argument("--cdn", action="store_true")
    ap.add_argument("--jobs", type=int, default=8); ap.add_argument("--raw", help="write raw rows (y10,y152,H) to this json"); ap.add_argument("--from-raw", help="rebuild the table from a raw json (no detection)")
    a = ap.parse_args()
    if a.from_raw: raw = json.load(open(a.from_raw)); names = sorted(raw)
    elif a.dir: names = sorted(f for f in os.listdir(a.dir) if f.startswith("fig-") and f.endswith(".webp"))
    else:
        idx = json.loads(get(BASE + "_index.json")); names = sorted(f[0][4:] for f in idx["files"] if re.match(r"img/fig-[a-z]+-.*\.webp$", f[0]) and "/" not in f[0][4:])
    if not a.from_raw:
        with mp_.Pool(a.jobs) as p: res = p.map(job, [(n, a.model, a.dir) for n in names], chunksize=8)
        raw = {n: r for n, r in res}
    if a.raw: json.dump(raw, open(a.raw, "w"))
    out = {n: int(round((r[0] - HAIR_K * (r[1] - r[0])) / r[2] * U)) for n, r in raw.items() if r}
    for n, v in MANUAL.items():
        if n in raw and not raw[n]: out[n] = v
    fails = [n for n, r in raw.items() if not r and n not in MANUAL]
    print("figs", len(names), "ok", len(out), "fail", len(fails))
    json.dump(out, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "fig-ht.json"), "w"), separators=(",", ":"), sort_keys=True)
    if fails: print("FAILED:", *fails[:60])
if __name__ == "__main__": main()
