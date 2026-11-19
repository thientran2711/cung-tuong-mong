#!/usr/bin/env python3
"""porface.py OLDPOR NEWHD OUTPOR : por crop seated by face mesh (forehead lm10, chin lm152, cheeks 234/454) so the new face has the old por's size+position."""
import sys, numpy as np, mediapipe as mp
from PIL import Image
from mediapipe.tasks.python import vision, BaseOptions
L = vision.FaceLandmarker.create_from_options(vision.FaceLandmarkerOptions(base_options=BaseOptions(model_asset_path="/home/user/wt/face_landmarker.task"), num_faces=1))
def face(im, top=1.0):
    bg = Image.new("RGBA", im.size, (255, 255, 255, 255)); bg.alpha_composite(im); rgb = bg.convert("RGB")
    for fr in ([top] if top == 1.0 else (.35, .5, .7)):
        cr = rgb.crop((0, 0, rgb.width, int(rgb.height * fr))); k = 768 / cr.width
        cr = cr.resize((768, round(cr.height * k)), Image.LANCZOS)
        r = L.detect(mp.Image(image_format=mp.ImageFormat.SRGB, data=np.ascontiguousarray(np.asarray(cr))))
        if not r.face_landmarks: continue
        lm = r.face_landmarks[0]; f = lambda i: (lm[i].x * cr.width / k, lm[i].y * cr.height / k)
        cx = (f(234)[0] + f(454)[0]) / 2; y10 = f(10)[1]; F = f(152)[1] - y10
        return cx, y10, F
    return None
def main(op, nh, out):
    o = Image.open(op).convert("RGBA"); n = Image.open(nh).convert("RGBA")
    a = face(o); b = face(n, top=.5)
    if not a or not b: print("NOFACE", op, bool(a), bool(b)); sys.exit(2)
    s = a[2] / b[2]; x0 = b[0] - a[0] / s; y0 = b[1] - a[1] / s; w, h = o.width / s, o.height / s
    M = 2000; c = Image.new("RGBA", (n.width + 2 * M, n.height + 2 * M), (0, 0, 0, 0)); c.alpha_composite(n, (M, M))
    p = c.crop((round(x0 + M), round(y0 + M), round(x0 + M + w), round(y0 + M + h))).resize(o.size, Image.LANCZOS)
    p.save(out, "WEBP", quality=90, method=6)
    c2 = face(p); print("porface", out, "scale", round(s, 3), "check F old/new", round(a[2]), round(c2[2]) if c2 else None)
if __name__ == "__main__": main(*sys.argv[1:4])
