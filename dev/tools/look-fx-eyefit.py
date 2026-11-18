#!/usr/bin/env python3
"""look-fx-eyefit.py: PER-PICTURE eye / mouth / nose measurement for the face-mark keep-out (owner 18/11: a mark NEVER covers the eyes or the lips; c30 proved ONE constant ellipse is wrong for pictures whose eyes sit off it).
Landmarks = MediaPipe Face Landmarker (478 points incl. irises; works on these painted faces: the iris centres land on the pupils), model file face_landmarker.task
(https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task).  Needs: pip install mediapipe opencv-python-headless==4.10.0.84 numpy pillow; apt libegl1 libgles2.
 run   <veil-fit.json> <targets.txt> <out.jsonl> [N procs]   one JSON line per picture {"f":file,"d":1|0,"e":[[cx,cy,hw,hh],[cx,cy,hw,hh]],"m":[cx,cy,hw,hh],"n":[cx,cy,hw,hh],"p":[eye polygons]}  (resumable)
 All numbers in VEIL-ROW units (u = x/rowW, v = y/rowH from the row's left/top, in the row's own rotated frame) = the units of BAL.looks.keep; e = the two eye CONTOURS (the open eye incl. lashes), left-in-image first.
 pictures are fetched from the CDN and never stored in git (cache dir = argv MODEL dir /pics)."""
import sys, os, json, io, math, urllib.request, multiprocessing as mp
import numpy as np
from PIL import Image
B = 'https://ctm-img.victoria-tntt.workers.dev/img/'
MODEL = os.environ.get('MP_MODEL', '/home/user/wt/lfw-cache/face_landmarker.task'); PICS = os.environ.get('MP_PICS', '/home/user/wt/lfw-cache/pics')
EYE_R = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]       # subject's right eye = image LEFT
EYE_L = [263, 249, 390, 373, 374, 380, 381, 382, 362, 398, 384, 385, 386, 387, 388, 466]
LIPS = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 409, 270, 269, 267, 0, 37, 39, 40, 185]
NOSE = [1, 2, 98, 327, 97, 326, 168, 6, 129, 358]
def get(n):
    p = os.path.join(PICS, n)
    if os.path.exists(p): return open(p, 'rb').read()
    for i in range(3):
        try:
            d = urllib.request.urlopen(urllib.request.Request(B + n, headers={'User-Agent': 'curl/8'}), timeout=40).read(); open(p, 'wb').write(d); return d
        except Exception as e: err = e
    raise err
_L = None
def lmk():
    global _L
    if _L is None:
        import mediapipe as mp_; from mediapipe.tasks import python as mpt; from mediapipe.tasks.python import vision
        _L = (mp_, vision.FaceLandmarker.create_from_options(vision.FaceLandmarkerOptions(base_options=mpt.BaseOptions(model_asset_path=MODEL), num_faces=2, min_face_detection_confidence=.2, min_face_presence_confidence=.2)))
    return _L
def measure(name, v):
    mp_, L = lmk(); im = Image.open(io.BytesIO(get(name))).convert('RGBA'); bg = Image.new('RGBA', im.size, (235, 220, 205, 255)); bg.alpha_composite(im); im = bg.convert('RGB'); W, H = im.size
    x, y, w, h, rot = v; X0, Y0, RW, RH = x / 100 * W, y / 100 * H, w / 100 * W, h / 100 * H; cx, cy = X0 + RW / 2, Y0 + RH / 2
    # crop around the veil row: the whole face (forehead is ~1 row height above the row top), upscaled so the face is >= ~450 px
    a, b, c, d = int(max(0, X0 - .45 * RW)), int(max(0, Y0 - 1.25 * RH)), int(min(W, X0 + 1.45 * RW)), int(min(H, Y0 + 1.15 * RH))
    cr = im.crop((a, b, c, d)); s = max(1.0, 560 / max(1, c - a)); cr = cr.resize((int((c - a) * s), int((d - b) * s)), Image.LANCZOS)
    r = L.detect(mp_.Image(image_format=mp_.ImageFormat.SRGB, data=np.asarray(cr)))
    if not r.face_landmarks: return None
    best = None
    for fl in r.face_landmarks:   # the face whose eye line is nearest the row's top centre
        P = np.array([[a + p.x * cr.size[0] / s, b + p.y * cr.size[1] / s] for p in fl]); ec = P[[468, 473]].mean(0); dd = math.hypot(ec[0] - cx, (ec[1] - Y0) / 1.0)
        if best is None or dd < best[0]: best = (dd, P)
    P = best[1]; th = math.radians(rot); ca, sa = math.cos(th), math.sin(th)
    def row(pts):   # picture px -> row frame (rotate by -rot about the row centre), then row units
        q = pts - [cx, cy]; q = np.stack([q[:, 0] * ca + q[:, 1] * sa, -q[:, 0] * sa + q[:, 1] * ca], 1) + [cx, cy]; return np.stack([(q[:, 0] - X0) / RW, (q[:, 1] - Y0) / RH], 1)
    def box(idx): R = row(P[idx]); lo, hi = R.min(0), R.max(0); return [round((lo[0] + hi[0]) / 2, 4), round((lo[1] + hi[1]) / 2, 4), round((hi[0] - lo[0]) / 2, 4), round((hi[1] - lo[1]) / 2, 4)]
    e = [box(EYE_R), box(EYE_L)]; poly = [np.round(row(P[EYE_R]), 4).tolist(), np.round(row(P[EYE_L]), 4).tolist()]
    return {'e': e, 'm': box(LIPS), 'n': box(NOSE), 'p': poly}
def work(a):
    k, v = a
    try: r = measure(k, v)
    except Exception as ex: return {'f': k, 'd': 0, 'err': str(ex)[:60]}
    return {'f': k, 'd': 1, **r} if r else {'f': k, 'd': 0}
if __name__ == '__main__':
    if sys.argv[1] == 'run':
        vf = json.load(open(sys.argv[2])); T = open(sys.argv[3]).read().split(); out = sys.argv[4]; nw = int(sys.argv[5]) if len(sys.argv) > 5 else 4; os.makedirs(PICS, exist_ok=True)
        done = set()
        if os.path.exists(out): done = {json.loads(l)['f'] for l in open(out)}
        T = [(k, vf[k]) for k in T if k in vf and k not in done]; print('todo', len(T), 'done', len(done), flush=True); n = 0
        with open(out, 'a') as fo, mp.Pool(nw) as pool:
            for r in pool.imap_unordered(work, T, chunksize=8):
                fo.write(json.dumps(r, separators=(',', ':')) + '\n'); n += 1
                if n % 500 == 0: fo.flush(); print(n, flush=True)
