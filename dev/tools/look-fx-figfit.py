#!/usr/bin/env python3
"""look-fx-figfit.py: re-measure EVERY fig-* row of img/veil-fit.json + scar-fit.json (owner/C: fig rows sit off the face, ~ -0.30W +0.18H).
Method = the por rows' method (dev/art/facefit): OpenCV Haar frontal face (alt2 then default) on the figure's top 22 % at 2.5x, then the veil box from the
FACE RECT with the POR calibration ratios (the por rows are correct: cx -0.031, band .465, w .892, bottom 1.113 of the face rect), rotation kept from the old row
(eye-line tilt of the old row is the por-measured one). Scar row from the veil box (l-0.003w, t-0.014h, .714w, .817h).
usage: look-fx-figfit.py <cache dir> <out.json> [N workers]
       look-fx-figfit.py add <cache dir> <targets.txt> <out.json> [N workers]   NEW fig pictures that have no row yet (R9f: the tcold figures): same Haar detect + rows(), rotation 0 (the por rule), no row when Haar finds no face (never a guess)   -> out.json = {"fig-x.webp":{"old":[..],"new":[..],"snew":[..],"det":[..]|null}}  + prints the before/after table"""
import sys, os, json, io, urllib.request, concurrent.futures as cf
import cv2, numpy as np
from PIL import Image
cv2.setNumThreads(1)
B = 'https://ctm-img.victoria-tntt.workers.dev/img/'
D = cv2.data.haarcascades
import threading
_TL = threading.local()
def fcs():  # CascadeClassifier is not thread safe: one pair per thread
    if not hasattr(_TL, 'c'): _TL.c = [cv2.CascadeClassifier(D + 'haarcascade_frontalface_alt2.xml'), cv2.CascadeClassifier(D + 'haarcascade_frontalface_default.xml')]
    return _TL.c
CX, BN, WR, BT = -0.031, .465, .892, 1.113   # por calibration
def get(n, cache):
    p = os.path.join(cache, n)
    if os.path.exists(p): return open(p, 'rb').read()
    for i in range(3):
        try:
            d = urllib.request.urlopen(urllib.request.Request(B + n, headers={'User-Agent': 'curl/8'}), timeout=40).read(); open(p, 'wb').write(d); return d
        except Exception as e: err = e
    raise err
def detect(data):
    for sf, mn, sc in ((1.1, 4, 2.5), (1.05, 3, 3.0), (1.03, 2, 3.5), (1.05, 2, 2.0)):
        r = detect1(data, sf, mn, sc)
        if r: return r
    return None
def detect1(data, sf=1.1, mn=4, s=2.5):
    im = Image.open(io.BytesIO(data)).convert('RGBA'); bg = Image.new('RGBA', im.size, (235, 220, 205, 255)); bg.alpha_composite(im); im = bg.convert('RGB')
    W, H = im.size; y1 = int(H * .22)
    crop = im.crop((0, 0, W, y1)); g = cv2.cvtColor(np.asarray(crop.resize((int(W * s), int(y1 * s)), Image.LANCZOS)), cv2.COLOR_RGB2GRAY)
    best = None
    for c in fcs():
        for (x, y, w, h) in c.detectMultiScale(g, sf, mn, minSize=(int(.12 * W * s),) * 2, maxSize=(int(.55 * W * s),) * 2):
            if best is None or w > best[2]: best = (x, y, w, h)
        if best is not None: break
    if best is None: return None
    x, y, w, h = [v / s for v in best]; return [x / W * 100, y / H * 100, w / W * 100, h / H * 100]   # % of the figure
def rows(fb, rot):
    fx, fy, fw, fh = fb
    cx = fx + fw / 2 + CX * fw; w = WR * fw; by = fy + BN * fh; h = (fy + BT * fh - by) / .835; t = by - .165 * h; l = cx - w / 2
    return [round(l, 1), round(t, 1), round(w, 1), round(h, 1), rot], [round(l - .003 * w, 1), round(t - .014 * h, 1), round(.714 * w, 1), round(.817 * h, 1), rot]
if __name__ == '__main__' and sys.argv[1] == 'add':
    cache, tf, out = sys.argv[2], sys.argv[3], sys.argv[4]; nw = int(sys.argv[5]) if len(sys.argv) > 5 else 8; os.makedirs(cache, exist_ok=True); T = open(tf).read().split(); res = {}
    def one_add(k):
        try: return k, detect(get(k, cache))
        except Exception: return k, None
    with cf.ThreadPoolExecutor(nw) as ex:
        for k, fb in ex.map(one_add, T):
            if fb: v, sc = rows(fb, 0.0); res[k] = {'det': fb, 'new': v, 'snew': sc}
            else: res[k] = {'det': None}
    json.dump(res, open(out, 'w')); print('new fig rows', sum(1 for r in res.values() if r.get('new')), 'of', len(res))
elif __name__ == '__main__':
    cache, out = sys.argv[1], sys.argv[2]; nw = int(sys.argv[3]) if len(sys.argv) > 3 else 8
    os.makedirs(cache, exist_ok=True)
    v = json.load(open(os.path.join(cache, 'veil-fit.json'))); s = json.load(open(os.path.join(cache, 'scar-fit.json')))
    keys = sorted(k for k in v if k.startswith('fig-'))
    def one(k):
        try: fb = detect(get(k, cache))
        except Exception as e: return k, None, str(e)[:60]
        return k, fb, None
    res = {}
    with cf.ThreadPoolExecutor(nw) as ex:
        for k, fb, err in ex.map(one, keys):
            r = {'old': v[k], 'sold': s.get(k), 'det': fb}
            if fb: r['new'], r['snew'] = rows(fb, v[k][4])
            if err: r['err'] = err
            res[k] = r
    # fallback for faces Haar cannot find: the old row moved by the MEDIAN offset (in the old row's W/H, per identity = the same painted head turn), flagged 'fb'
    import collections, statistics
    ident = lambda k: '-'.join(k.split('-')[1:3]) if k.startswith('fig-consort') else '-'.join(k.split('-')[1:3])
    off = collections.defaultdict(list)
    for k, r in res.items():
        if r.get('new'):
            o = r['old']; n = r['new']; off[ident(k)].append(((n[0] + n[2] / 2 - o[0] - o[2] / 2) / o[2], (n[1] + n[3] / 2 - o[1] - o[3] / 2) / o[3], n[2] / o[2], n[3] / o[3]))
    allo = [x for L in off.values() for x in L]
    for k, r in res.items():
        if r.get('new'): continue
        L = off.get(ident(k)) or allo; m = [statistics.median(c) for c in zip(*L)]; o = r['old']
        cx = o[0] + o[2] / 2 + m[0] * o[2]; cy = o[1] + o[3] / 2 + m[1] * o[3]; w = o[2] * m[2]; h = o[3] * m[3]
        r['new'] = [round(cx - w / 2, 1), round(cy - h / 2, 1), round(w, 1), round(h, 1), o[4]]
        r['snew'] = [round(r['new'][0] - .003 * w, 1), round(r['new'][1] - .014 * h, 1), round(.714 * w, 1), round(.817 * h, 1), o[4]]
        r['fb'] = 1
    json.dump(res, open(out, 'w'))
    ok = [k for k in res if res[k].get('new') and not res[k].get('fb')]
    print('fig rows', len(res), 'detected', len(ok), 'fallback (identity median offset)', len(res) - len(ok))
    # offset table of the old row vs the new one, in units of the OLD row's W and H (centre of box)
    dx = np.array([((res[k]['new'][0] + res[k]['new'][2] / 2) - (res[k]['old'][0] + res[k]['old'][2] / 2)) / res[k]['old'][2] for k in ok])
    dy = np.array([((res[k]['new'][1] + res[k]['new'][3] / 2) - (res[k]['old'][1] + res[k]['old'][3] / 2)) / res[k]['old'][3] for k in ok])
    dw = np.array([res[k]['new'][2] / res[k]['old'][2] for k in ok]); dh = np.array([res[k]['new'][3] / res[k]['old'][3] for k in ok])
    for n, a in (('dx/W', dx), ('dy/H', dy), ('w ratio', dw), ('h ratio', dh)): print(f'{n}: median {np.median(a):+.3f}  p10 {np.percentile(a,10):+.3f}  p90 {np.percentile(a,90):+.3f}')
