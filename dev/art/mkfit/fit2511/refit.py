#!/usr/bin/env python3
"""MAKEUP-FIT 25/11: two-pass whole-picture face mesh (pass 1 finds the head, pass 2 re-meshes a tight face crop at 512 px)."""
import io, math, sys, os, json
import numpy as np
from PIL import Image
sys.path.insert(0, '/home/user/wt/mkfit/dev/art/mkfit')
import mkfit
MK_IDX = mkfit.MK_IDX
_L = {}
def lm(model):
    if model not in _L:
        import mediapipe as mp
        from mediapipe.tasks import python as mpp
        from mediapipe.tasks.python import vision
        o = vision.FaceLandmarkerOptions(base_options=mpp.BaseOptions(model_asset_path=model), num_faces=1,
                                         min_face_detection_confidence=.1, min_face_presence_confidence=.1)
        _L[model] = (mp, vision.FaceLandmarker.create_from_options(o))
    return _L[model]
def run(model, rgb, box, size):
    mp, L = lm(model)
    x0, y0, x1, y1 = [int(round(v)) for v in box]
    cr = rgb.crop((x0, y0, x1, y1)); k = size / max(cr.width, cr.height)
    cr = cr.resize((max(8, int(round(cr.width * k))), max(8, int(round(cr.height * k)))), Image.LANCZOS)
    r = L.detect(mp.Image(image_format=mp.ImageFormat.SRGB, data=np.ascontiguousarray(np.asarray(cr))))
    if not r.face_landmarks: return None
    return np.array([(x0 + p.x * cr.width / k, y0 + p.y * cr.height / k) for p in r.face_landmarks[0]])
def sane(A, W):
    P = A[MK_IDX]; lc = P[0:12].mean(0); ea, eb = P[20:30].mean(0), P[30:40].mean(0)
    ed = math.hypot(*(ea - eb))
    return W * .02 < ed < W * .45 and lc[1] > max(ea[1], eb[1]) + ed * .4
def detect(model, data):
    im = Image.open(io.BytesIO(data)).convert("RGBA")
    bg = Image.new("RGBA", im.size, (255, 255, 255, 255)); bg.alpha_composite(im); rgb = bg.convert("RGB")
    W, H = rgb.size
    A = None
    tries = [(0, 0, W, H if H / W < 1.6 else H * .4)] + [(0, 0, W, H * f) for f in (.3, .5, .25, .6)] + [(W * .15, 0, W * .85, H * .3)]
    for b in tries:
        A = run(model, rgb, b, 640)
        if A is not None and sane(A, W): break
        A = None
    if A is None: return None, (W, H), 0
    for it in range(2):
        x0, y0 = A.min(0); x1, y1 = A.max(0); cx, cy = (x0 + x1) / 2, (y0 + y1) / 2; s = max(x1 - x0, y1 - y0) * 1.7
        B = run(model, rgb, (max(0, cx - s / 2), max(0, cy - s / 2), min(W, cx + s / 2), min(H, cy + s / 2)), 512)
        if B is None or not sane(B, W): break
        A = B
    return [tuple(p) for p in A[MK_IDX]], (W, H), it + 1
def cents(P):
    P = np.asarray(P, float); return [P[0:12].mean(0), P[20:30].mean(0), P[30:40].mean(0), P[40:50].mean(0), P[50:60].mean(0)]
def disp(old_enc, new_pts, W, H):
    old = [(old_enc[2 * i] / 4000 * W, old_enc[2 * i + 1] / 4000 * H) for i in range(60)]
    co, cn = cents(old), cents(new_pts); ed = math.hypot(*(cn[1] - cn[2])) or 1
    return max(math.hypot(*(x - y)) for x, y in zip(co, cn)) / ed
