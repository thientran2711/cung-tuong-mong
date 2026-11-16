#!/usr/bin/env python3
"""porcrop.py — make the portrait crop (por-*.webp, 384x506) from a full-body figure (fig-*.webp).

Face-centred: OpenCV haar face (+eyes) detection on the head area of the figure, with an
alpha-silhouette fallback. Eyes land at ~40% from the top, face centred horizontally,
head + shoulders/upper chest visible, face never touching the edge.

  python3 dev/figwork/porcrop.py img/fig-consort-c01-t1-a18.webp            # writes img/por-consort-c01-t1-a18.webp
  python3 dev/figwork/porcrop.py --out /tmp/p img/fig-*.webp                 # write elsewhere
  python3 dev/figwork/porcrop.py --src-scale 2.1 big_cut.png --name fig-...  # from a full-res cut
Needs: pip install "opencv-python-headless==4.10.0.84" (4.x ships the haar files; 5.x does not).
"""
import sys, os, io, argparse, json
import numpy as np
from PIL import Image

W_OUT, H_OUT = 384, 506
EYE_Y = 0.40          # eye line, fraction of the frame height from the top
FACE_W = 0.36         # face width as fraction of the frame width (=> frame ~2.8 face widths)

_cv = None
def cv():
    global _cv
    if _cv is None:
        import cv2
        d = cv2.data.haarcascades
        _cv = (cv2, cv2.CascadeClassifier(d + "haarcascade_frontalface_alt2.xml"),
               cv2.CascadeClassifier(d + "haarcascade_frontalface_default.xml"),
               cv2.CascadeClassifier(d + "haarcascade_eye.xml"))
    return _cv

def silhouette_head(a):
    """head centre x and top y from alpha (fallback)"""
    h, w = a.shape
    rows = np.nonzero((a > 128).sum(1) > 2)[0]
    top = rows[0] if len(rows) else 0
    xs = []
    for y in range(int(top + h * 0.03), int(top + h * 0.11), 2):
        r = np.nonzero(a[y] > 128)[0]
        if len(r): xs.append((r[0] + r[-1]) / 2)
    cx = float(np.median(xs)) if xs else w / 2
    return cx, top

def find_face(im):
    """returns (cx, eye_y, face_w, how) in figure pixels"""
    A = np.asarray(im.convert("RGBA"))
    a = A[..., 3]; h, w = a.shape
    cx0, top = silhouette_head(a)
    # composite on mid-grey, search the head band only
    rgb = A[..., :3].astype(np.float32); al = a[..., None] / 255.0
    comp = (rgb * al + 128 * (1 - al)).astype(np.uint8)
    y1 = min(h, int(top + h * (0.30 if h / max(w, 1) < 2.6 else 0.22)))
    band = comp[top:y1]
    cv2, f1, f2, eye = cv()
    s = 360.0 / max(1, band.shape[1]) if band.shape[1] < 360 else 1.0
    g = cv2.cvtColor(band, cv2.COLOR_RGB2GRAY)
    if s != 1.0: g = cv2.resize(g, None, fx=s, fy=s, interpolation=cv2.INTER_CUBIC)
    g = cv2.equalizeHist(g)
    minf = int(g.shape[1] * 0.10)
    faces = []
    for det in (f1, f2):
        r = det.detectMultiScale(g, scaleFactor=1.05, minNeighbors=4, minSize=(minf, minf))
        if len(r): faces = list(r); break
    if faces:
        # prefer big faces near the silhouette head centre
        def rank(f):
            x, y, fw, fh = f
            return fw - 0.6 * abs((x + fw / 2) / s - cx0)
        x, y, fw, fh = max(faces, key=rank)
        fx, fy, fW, fH = x / s, y / s + top, fw / s, fh / s
        # eyes inside the upper part of the face box
        roi = g[y:y + int(fh * 0.6), x:x + fw]
        es = eye.detectMultiScale(roi, scaleFactor=1.05, minNeighbors=5, minSize=(max(4, fw // 8),) * 2)
        es = [e for e in es if e[1] + e[3] / 2 < fh * 0.6 and e[2] < fw * 0.45]
        if len(es) >= 2:
            es = sorted(es, key=lambda e: -e[2])[:2]
            ey = np.mean([e[1] + e[3] / 2 for e in es]) / s + fy
            ex = np.mean([e[0] + e[2] / 2 for e in es]) / s + fx
            return float(ex), float(ey), float(fW), "eyes"
        return float(fx + fW / 2), float(fy + fH * 0.45), float(fW), "face"
    # fallback: typical head proportions from the silhouette
    ws = []
    for y in range(int(top + h * 0.02), int(top + h * 0.16), 2):
        r = np.nonzero(a[y] > 128)[0]
        if len(r): ws.append(r[-1] - r[0])
    hw = float(np.percentile(ws, 85)) if ws else h * 0.1      # head (+hair) width
    fW = hw * 0.62
    return float(cx0), float(top + hw * 0.90), float(fW), "sil"

def crop(im, face, scale=1.0, fig_h=None):
    cx, ey, fw, how = face
    cx, ey, fw = cx * scale, ey * scale, fw * scale
    H = im.height
    # keep the zoom consistent across a set: face width is clamped to a sane range of figure height
    fh = fig_h or H
    fw = float(np.clip(fw, fh * 0.045, fh * 0.20))
    Wc = fw / FACE_W; Hc = Wc * H_OUT / W_OUT
    x0 = cx - Wc / 2; y0 = ey - EYE_Y * Hc
    box = (int(round(x0)), int(round(y0)), int(round(x0 + Wc)), int(round(y0 + Hc)))
    canvas = Image.new("RGBA", (box[2] - box[0], box[3] - box[1]), (0, 0, 0, 0))
    canvas.paste(im.crop((max(0, box[0]), max(0, box[1]), min(im.width, box[2]), min(im.height, box[3]))),
                 (max(0, -box[0]), max(0, -box[1])))
    out = canvas.resize((W_OUT, H_OUT), Image.LANCZOS)
    if W_OUT / max(1, canvas.width) > 1.15:      # upscaled: restore a little crispness (RGB only)
        from PIL import ImageFilter
        r = out.convert("RGB").filter(ImageFilter.UnsharpMask(radius=1.4, percent=55, threshold=2))
        r.putalpha(out.split()[3]); out = r
    return out

def save_webp(im, path, maxkb=90):
    for q in (86, 80, 74, 68, 60):
        b = io.BytesIO(); im.save(b, "WEBP", quality=q, method=4)
        if b.tell() <= maxkb * 1024: break
    open(path, "wb").write(b.getvalue())

def make(fig_path, out_dir=None, src=None, name=None):
    im = Image.open(fig_path).convert("RGBA")
    face = find_face(im)
    if src is not None:            # full-res source of the same figure: crop there for sharpness
        big = src; sc = big.height / im.height
        por = crop(big, face, sc, fig_h=big.height)
    else:
        por = crop(im, face)
    base = os.path.basename(name or fig_path)
    out = os.path.join(out_dir or os.path.dirname(fig_path), "por-" + base[4:].rsplit(".", 1)[0] + ".webp")
    save_webp(por, out)
    return out, face

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("files", nargs="+"); ap.add_argument("--out")
    o = ap.parse_args()
    if o.out: os.makedirs(o.out, exist_ok=True)
    for f in o.files:
        try:
            out, face = make(f, o.out)
            print(face[3], f"{face[0]:.0f},{face[1]:.0f},{face[2]:.0f}", out)
        except Exception as e:
            print("ERR", f, e, file=sys.stderr)
