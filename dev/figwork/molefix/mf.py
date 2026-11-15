"""molefix helpers: por->fig mapping, local spot removal."""
import sys, os, io
import numpy as np, cv2
from PIL import Image
ROOT = os.path.abspath(os.path.dirname(os.path.abspath(__file__)) + '/../../../../..')
sys.path.insert(0, ROOT + '/dev/figwork')
import porcrop

def load(p):
    return np.array(Image.open(p).convert('RGBA'))

def mapping(fig, por):
    """return (s, ox, oy): fig_xy = (por_xy)*s + (ox,oy). refined by template match on the face."""
    im = Image.fromarray(fig)
    cx, ey, fw, how = porcrop.find_face(im)
    H = im.height
    fw = float(np.clip(fw, H * 0.045, H * 0.20))
    Wc = fw / porcrop.FACE_W; Hc = Wc * porcrop.H_OUT / porcrop.W_OUT
    x0 = cx - Wc / 2; y0 = ey - porcrop.EYE_Y * Hc
    s0 = Wc / 384.0
    g = cv2.cvtColor(fig[..., :3], cv2.COLOR_RGB2GRAY).astype(np.float32)
    pg = cv2.cvtColor(por[..., :3], cv2.COLOR_RGB2GRAY).astype(np.float32)
    best = None
    tpl_box = (110, 140, 280, 330)  # face area in por
    for s in s0 * np.linspace(0.85, 1.15, 31):
        t = pg[tpl_box[1]:tpl_box[3], tpl_box[0]:tpl_box[2]]
        t = cv2.resize(t, None, fx=s, fy=s, interpolation=cv2.INTER_AREA)
        ex, ey2 = x0 + tpl_box[0] * s, y0 + tpl_box[1] * s
        m = int(40 * s0) + 10
        xa, ya = int(max(0, ex - m)), int(max(0, ey2 - m))
        win = g[ya:int(ey2 + t.shape[0] + m), xa:int(ex + t.shape[1] + m)]
        if win.shape[0] <= t.shape[0] or win.shape[1] <= t.shape[1]: continue
        r = cv2.matchTemplate(win, t, cv2.TM_CCOEFF_NORMED)
        _, mv, _, ml = cv2.minMaxLoc(r)
        if best is None or mv > best[0]:
            best = (mv, s, xa + ml[0] - tpl_box[0] * s, ya + ml[1] - tpl_box[1] * s)
    return best  # (score, s, ox, oy)

def spotmask(rgb, x, y, R, minthr=6, grow=2):
    """snap to darkest blob near (x,y) within R; return mask + info"""
    g = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY).astype(int)
    k = max(9, int(R * 3) | 1)
    med = cv2.medianBlur(g.astype(np.uint8), k).astype(int)
    d = med - g
    xa, ya = max(0, x - R), max(0, y - R)
    win = d[ya:y + R + 1, xa:x + R + 1]
    yy, xx = np.unravel_index(win.argmax(), win.shape); X, Y = xa + xx, ya + yy
    peak = d[Y, X]; thr = max(minthr, 0.35 * peak)
    W = R + 4
    sub = d[Y - W:Y + W + 1, X - W:X + W + 1]
    blob = (sub > thr).astype(np.uint8)
    n, lab, st, _ = cv2.connectedComponentsWithStats(blob, 8)
    l = lab[W, W]
    m = (lab == l).astype(np.uint8) if l else np.zeros_like(blob)
    m = cv2.dilate(m, np.ones((3, 3), np.uint8), iterations=grow)
    mask = np.zeros(g.shape, np.uint8); mask[Y - W:Y + W + 1, X - W:X + W + 1] = m
    return mask, (int(X), int(Y), int(peak), int(m.sum()))

def heal(rgb, mask, noise=True):
    """inpaint + re-add local fine grain so the patch does not look smeared"""
    bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)
    out = cv2.inpaint(bgr, mask, 4, cv2.INPAINT_TELEA)
    out = cv2.cvtColor(out, cv2.COLOR_BGR2RGB).astype(np.float32)
    if noise and mask.any():
        # grain = high-pass of the surrounding ring, std matched
        f = rgb.astype(np.float32); hp = f - cv2.GaussianBlur(f, (0, 0), 1.2)
        ring = cv2.dilate(mask, np.ones((7, 7), np.uint8)) & (1 - mask)
        sd = hp[ring.astype(bool)].std(0) if ring.any() else np.zeros(3)
        rng = np.random.default_rng(1)
        nz = rng.normal(0, 1, f.shape[:2])[..., None] * sd[None, None, :] * 0.8
        nz = cv2.GaussianBlur(nz, (0, 0), 0.6)
        soft = cv2.GaussianBlur(mask.astype(np.float32), (0, 0), 1.0)[..., None]
        soft = np.clip(soft * 1.5, 0, 1)
        out = out + nz * (mask[..., None] > 0)
        out = f * (1 - soft) + out * soft
    return np.clip(out, 0, 255).astype(np.uint8)

def save_webp(arr, path, maxkb):
    im = Image.fromarray(arr)
    for q in (90, 86, 80, 74, 68, 60):
        b = io.BytesIO(); im.save(b, 'WEBP', quality=q, method=6)
        if b.tell() <= maxkb * 1024: break
    open(path, 'wb').write(b.getvalue()); return q
