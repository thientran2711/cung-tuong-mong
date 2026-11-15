#!/usr/bin/env python3
"""porscale/measure.py: face geometry of every por-* portrait (owner 15/11 19:05Z: one face scale per group).
usage: python3 -I measure.py <dir with por-*.webp> <out.json> [model.task]
MediaPipe Face Landmarker (float16 model, models/face_landmarker.task) on the portrait over a light background, native size.
Per picture (fractions of picture W/H): {"fh": forehead(10)->chin(152) distance / H, "cx","cy": midpoint of 10 and 152,
 "ey": eye line y (mean of 33/263), "ch": chin y, "ft": forehead y, "ok": 1} ; fallback Haar box (ok 0) when no landmarks."""
import sys, os, json
import numpy as np, cv2
from PIL import Image
import mediapipe as mp
from mediapipe.tasks.python import vision, BaseOptions
HERE = os.path.dirname(os.path.abspath(__file__))
_L = None
def lm():
    global _L
    if _L is None:
        model = sys.argv[3] if len(sys.argv) > 3 else os.path.join(HERE, '_work', 'models', 'face_landmarker.task')
        _L = vision.FaceLandmarker.create_from_options(vision.FaceLandmarkerOptions(
            base_options=BaseOptions(model_asset_path=model), num_faces=1, min_face_detection_confidence=.2, min_face_presence_confidence=.2))
    return _L
H1 = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
def one(p):
    im = Image.open(p).convert('RGBA'); W, H = im.size
    bg = Image.new('RGBA', im.size, (236, 228, 214, 255)); bg.alpha_composite(im)
    rgb = np.ascontiguousarray(np.array(bg.convert("RGB")))
    r = lm().detect(mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb))
    A = np.array(im)[..., 3]
    rows = np.where((A > 60).sum(1) >= max(2, int(W * .01)))[0]
    top = float(rows[0] / H) if len(rows) and (A[0] < 20).sum() > W * .5 else 0.0
    if r.face_landmarks:
        L = r.face_landmarks[0]
        P = lambda i: (L[i].x, L[i].y)
        f, c = P(10), P(152)
        fh = float(np.hypot((f[0] - c[0]) * W, (f[1] - c[1]) * H) / H)
        ey = (L[33].y + L[263].y) / 2
        xs = [l.x for l in L]
        return {"fh": round(fh, 4), "cx": round((f[0] + c[0]) / 2, 4), "cy": round((f[1] + c[1]) / 2, 4), "ey": round(ey, 4),
                "ft": round(f[1], 4), "ch": round(c[1], 4), "fw": round(max(xs) - min(xs), 4), "top": round(top, 4), "ok": 1}
    g = cv2.cvtColor(np.array(bg.convert('RGB')), cv2.COLOR_RGB2GRAY)
    F = H1.detectMultiScale(g, 1.05, 4, minSize=(int(H * .1),) * 2)
    if not len(F): return {"ok": -1, "top": round(top, 4)}
    x, y, w, h = max(F, key=lambda q: q[2] * q[3])
    # Haar box ~ brow..mouth; forehead->chin ~ 1.25 box height (calibrated in report)
    return {"fh": round(h * 1.25 / H, 4), "cx": round((x + w / 2) / W, 4), "cy": round((y + h * .55) / H, 4), "top": round(top, 4), "ok": 0}
def job(a):
    try: return a[0], one(a[1])
    except Exception as e: return a[0], {"ok": -2, "err": str(e)[:80]}
if __name__ == '__main__':
    src, out = sys.argv[1], sys.argv[2]
    fs = sorted(f for f in os.listdir(src) if f.startswith('por-') and f.endswith('.webp'))
    old = json.load(open(out)) if os.path.exists(out) and os.environ.get('INCR') else {}
    todo = [(f[:-5], os.path.join(src, f)) for f in fs if f[:-5] not in old]
    from multiprocessing import Pool
    with Pool(int(os.environ.get('PROCS') or 2)) as P:
        for i, (k, v) in enumerate(P.imap_unordered(job, todo, chunksize=8)):
            old[k] = v
            if i % 500 == 0: print(i, len(todo), file=sys.stderr, flush=True)
    json.dump(old, open(out, 'w'), separators=(',', ':'), sort_keys=True)
    print(len(old), 'measured;', sum(1 for v in old.values() if v.get('ok') == 1), 'landmarks;', sum(1 for v in old.values() if v.get('ok') == 0), 'haar;', sum(1 for v in old.values() if v.get('ok', -1) < 0), 'none')
