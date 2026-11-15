#!/usr/bin/env python3
"""Face boxes of every por-* picture → img/POR_FACE2.json (jkpor.js reads it to give every portrait the same HEAD size).
usage: python3 dev/tools/por_face.py <dir with por-*.webp> <out POR_FACE2.json>
Per picture: [face top, face height, face centre x] as fractions of the picture (OpenCV Haar frontal face on the picture over white;
the largest face), plus the opaque top (hair ornaments) and the body centre on the chest rows. Format:
{"v":2,"f":{"consort-c01-t1-a18":[ft,fh,fx,top,bx],...}} (3 decimals; missing face → fh 0)."""
import sys, os, json
import numpy as np, cv2
from PIL import Image
C1 = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
C2 = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_alt2.xml')
def one(p):
    im = Image.open(p).convert('RGBA'); W, H = im.size
    bg = Image.new('RGBA', im.size, (255, 255, 255, 255)); bg.alpha_composite(im)
    # detection on a half-size copy (faces are ~28 % of the picture height, far above the 24 px Haar window): ~4x faster
    SC = 2 if H >= 400 else 1
    sm = bg.convert('RGB').resize((W // SC, H // SC), Image.BILINEAR) if SC > 1 else bg.convert('RGB')
    g = cv2.cvtColor(np.array(sm), cv2.COLOR_RGB2GRAY)
    face = None
    for c in (C1, C2):
        F = c.detectMultiScale(g, 1.05, 4, minSize=(max(24, int(H / SC * .08)),) * 2)
        if len(F): face = [int(v * SC) for v in max(F, key=lambda r: r[2] * r[3])]; break
    A = np.array(im)[..., 3]
    trans = (A[0] < 20).sum() > W * .5
    top = 0.0
    if trans:
        rows = np.where((A > 60).sum(1) >= max(2, int(W * .01)))[0]
        if len(rows): top = rows[0] / H
    xs = []
    if trans:
        for y in range(int(H * .62), int(H * .8)):
            c = np.where(A[y] > 60)[0]
            if len(c): xs.append((c[0] + c[-1] + 1) / 2 / W)
    bx = float(np.mean(xs)) if xs else .5
    if face is None: return [0, 0, .5, round(top, 3), round(bx, 3)]
    x, y, w, h = face
    return [round(y / H, 3), round(h / H, 3), round((x + w / 2) / W, 3), round(top, 3), round(bx, 3)]
def _job(a):
    try: return a[0], one(a[1])
    except Exception as e: return a[0], None
def main(src, out):
    from multiprocessing import Pool
    fs = sorted(f for f in os.listdir(src) if f.startswith('por-') and f.endswith('.webp'))
    with Pool(int(os.environ.get("POR_PROCS") or max(1, os.cpu_count() or 1))) as P:
        R = {k: v for k, v in P.imap_unordered(_job, [(f[4:-5], os.path.join(src, f)) for f in fs], chunksize=16) if v is not None}
    json.dump({"v": 2, "f": R}, open(out, 'w'), separators=(',', ':'))
    print(len(R), 'pictures', sum(1 for v in R.values() if v[1] == 0), 'without a face')
if __name__ == '__main__': main(*sys.argv[1:3])
