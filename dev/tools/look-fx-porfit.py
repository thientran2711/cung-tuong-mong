#!/usr/bin/env python3
"""look-fx-porfit.py: face-fit rows (img/veil-fit.json + scar-fit.json) for the por-* pictures that have none (owner 18/11: a picture without a row draws NO face mark anywhere:
mirror, stage, avatar). Same method as dev/art/facefit + look-fx-figfit.py: OpenCV Haar frontal face on the WHOLE por picture (4 passes, loosest last), veil box from the face rect
with the POR calibration ratios (cx -0.031, band .465, w .892, bottom 1.113 of the face rect), rotation 0 (eye-line tilt was worse than 0 against the rows), scratch row from the
BAL.looks.keep.cheek box of the veil row (same rule as look-fx-keepout.py). No detection => no row (never a guessed position).
usage:  look-fx-porfit.py validate <veil-fit.json> <out.json> [N]      re-measure the por rows that exist, print the error table (new row vs old row)
        look-fx-porfit.py run <veil-fit.json> <targets.txt> <out.jsonl> [N]   one JSON line per target {"f":..,"det":[..]|null,"v":[..],"s":[..]}  (resumable)
pictures are fetched from the CDN and never stored."""
import sys, os, re, io, json, urllib.request, threading, concurrent.futures as cf
import cv2, numpy as np
from PIL import Image
cv2.setNumThreads(1)
B = 'https://ctm-img.victoria-tntt.workers.dev/img/'
CX, BN, WR, BT = -0.031, .465, .892, 1.113
_TL = threading.local()
def fcs():
    if not hasattr(_TL, 'c'): _TL.c = [cv2.CascadeClassifier(cv2.data.haarcascades + f) for f in ('haarcascade_frontalface_alt2.xml', 'haarcascade_frontalface_default.xml')]
    return _TL.c
def get(n):
    for i in range(3):
        try: return urllib.request.urlopen(urllib.request.Request(B + n, headers={'User-Agent': 'curl/8'}), timeout=40).read()
        except Exception as e: err = e
    raise err
def detect1(im, sf, mn):
    W, H = im.size; g = cv2.cvtColor(np.asarray(im), cv2.COLOR_RGB2GRAY); best = None
    for c in fcs():
        for (x, y, w, h) in c.detectMultiScale(g, sf, mn, minSize=(int(.15 * W),) * 2, maxSize=(int(.75 * W),) * 2):
            if best is None or w > best[2]: best = (x, y, w, h)
        if best is not None: break
    return None if best is None else [best[0] / W * 100, best[1] / H * 100, best[2] / W * 100, best[3] / H * 100]
def detect(data):
    im = Image.open(io.BytesIO(data)).convert('RGBA'); bg = Image.new('RGBA', im.size, (235, 220, 205, 255)); bg.alpha_composite(im); im = bg.convert('RGB')
    for sf, mn in ((1.1, 4), (1.05, 3), (1.03, 2)):
        r = detect1(im, sf, mn)
        if r: return r, im.size
    return None, im.size
def jl(x): return json.loads(re.sub(r'(?<![\d])\.(\d)', r'0.\1', x))
def cheek():
    src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'build', 'jlooks.js'), encoding='utf-8').read()
    return jl(re.search(r'cheek:(\[.*?\])\}', src).group(1))
def rows(fb, size, ck):
    fx, fy, fw, fh = fb; W, H = size
    cx = fx + fw / 2 + CX * fw; w = WR * fw; by = fy + BN * fh; h = (fy + BT * fh - by) / .835; t = by - .165 * h; l = cx - w / 2
    v = [round(l, 1), round(t, 1), round(w, 1), round(h, 1), 0.0]
    s = [round(l + ck[0] * w, 2), round(t + ck[1] * h, 2), round(ck[2] * w, 2), round(ck[3] * h, 2), 0.0]
    return v, s
if __name__ == '__main__':
    mode, vfp = sys.argv[1], sys.argv[2]; ck = cheek(); vf = json.load(open(vfp))
    if mode == 'validate':
        out = sys.argv[3]; nw = int(sys.argv[4]) if len(sys.argv) > 4 else 8; keys = sorted(k for k in vf if k.startswith('por-'))
        def one(k):
            try: fb, sz = detect(get(k)); return k, fb, sz
            except Exception: return k, None, None
        res = {};
        with cf.ThreadPoolExecutor(nw) as ex:
            for k, fb, sz in ex.map(one, keys):
                if fb: v, s = rows(fb, sz, ck); res[k] = {'old': vf[k], 'new': v, 'det': fb}
                else: res[k] = {'old': vf[k], 'new': None}
        json.dump(res, open(out, 'w'))
        ok = [r for r in res.values() if r['new']]; print(f'por rows with a Haar detection: {len(ok)}/{len(res)}')
        d = np.array([[n - o for n, o in zip(r['new'][:4], r['old'][:4])] for r in ok]); W = np.array([r['old'][2] for r in ok]); H = np.array([r['old'][3] for r in ok])
        print('new - old, in % of the old row size: dx/w dy/h dw/w dh/h (median, p10, p90)')
        for i, nme in enumerate(('dx/w', 'dy/h', 'dw/w', 'dh/h')):
            q = d[:, i] / (W if i in (0, 2) else H); print(f'  {nme}: {np.median(q):+.3f}  ({np.percentile(q, 10):+.3f} .. {np.percentile(q, 90):+.3f})')
        c = np.array([[(r["new"][0] + r["new"][2] / 2) - (r["old"][0] + r["old"][2] / 2), (r["new"][1] + r["new"][3] / 2) - (r["old"][1] + r["old"][3] / 2)] for r in ok])
        print(f'  centre shift > 0.25 row width: {(np.abs(c[:, 0]) > .25 * W).sum()} rows; > 0.25 row height (y): {(np.abs(c[:, 1]) > .25 * H).sum()} rows')
    else:
        targets = open(sys.argv[3]).read().split(); out = sys.argv[4]; nw = int(sys.argv[5]) if len(sys.argv) > 5 else 8
        done = set()
        if os.path.exists(out): done = {json.loads(l)['f'] for l in open(out)}
        T = [t for t in targets if t not in done]; lock = threading.Lock()
        def one(f):
            try:
                fb, sz = detect(get(f)); r = {'f': f, 'det': fb}
                if fb: r['v'], r['s'] = rows(fb, sz, ck)
            except Exception as e: r = {'f': f, 'err': str(e)[:80]}
            return r
        with open(out, 'a') as o, cf.ThreadPoolExecutor(nw) as ex:
            for i, r in enumerate(ex.map(one, T)):
                o.write(json.dumps(r) + '\n')
                if i % 500 == 499: o.flush(); print(i + 1, '/', len(T), flush=True)
