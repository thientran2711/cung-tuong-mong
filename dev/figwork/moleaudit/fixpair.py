#!/usr/bin/env python3
"""fixpair.py: carry a por mole fix over to the matching fig (and hd) file.
  python3 -I fixpair.py DIR hits.json      DIR holds img/ (por-X.webp, fig-X.webp, hd/fig-X.webp as downloaded from the CDN);
  hits.json = {"por-consort-c08-t2-a26": [[x,y,w,h],...]} (por coords, from demole_por.py -n zone=face).
For each: maps por->fig (and fig->hd) by multi-scale template matching on a 90x90 patch around the hit, then inpaints
(cv2 TELEA) a disc of the scaled radius on the fig/hd RGB only (alpha untouched). Never touches the forehead (zone=face has no forehead)."""
import sys, os, json, cv2, numpy as np
from PIL import Image
D = sys.argv[1]; H = json.load(open(sys.argv[2]))
def flat(im):
    a = np.asarray(im.convert('RGBA')).astype(np.float32); al = a[..., 3:4] / 255
    return (a[..., :3] * al + 255 * (1 - al)).astype(np.uint8)
def locate(src, dst, cx, cy, R=45):
    sg = cv2.cvtColor(flat(src), cv2.COLOR_RGB2GRAY); dg = cv2.cvtColor(flat(dst), cv2.COLOR_RGB2GRAY)
    x0, y0 = max(0, cx - R), max(0, cy - R); t = sg[y0:cy + R, x0:cx + R]; best = None
    r0 = dst.width / src.width
    for s in np.arange(r0 * .5, r0 * 2.2, .02) if abs(r0 - 1) > .01 else [1.0]:
        ts = cv2.resize(t, None, fx=s, fy=s, interpolation=cv2.INTER_AREA)
        if ts.shape[0] >= dg.shape[0] or ts.shape[1] >= dg.shape[1]: continue
        r = cv2.matchTemplate(dg, ts, cv2.TM_CCOEFF_NORMED); _, mv, _, loc = cv2.minMaxLoc(r)
        if best is None or mv > best[0]: best = (mv, s, loc)
    mv, s, loc = best
    return mv, s, (loc[0] + (cx - x0) * s, loc[1] + (cy - y0) * s)
def fix(path, pts, rad):
    im = Image.open(path).convert('RGBA'); a = np.asarray(im).copy(); m = np.zeros(a.shape[:2], np.uint8)
    for x, y in pts: cv2.circle(m, (int(round(x)), int(round(y))), rad, 1, -1)
    a[..., :3] = cv2.inpaint(np.ascontiguousarray(a[..., :3]), m, 3, cv2.INPAINT_TELEA)
    Image.fromarray(a, 'RGBA').save(path, 'WEBP', quality=86, method=4)
log = {}
for k, hits in H.items():
    base = k[4:]; por0 = Image.open(f'{D}/img/{k}.webp'); outs = {}
    for dst in (f'{D}/img/fig-{base}.webp', f'{D}/img/hd/fig-{base}.webp'):
        if not os.path.exists(dst): continue
        d = Image.open(dst); pts = []; ms = []
        for (x, y, w, h) in hits:
            cx, cy = x + w // 2, y + h // 2
            mv, s, (fx, fy) = locate(por0, d, cx, cy); ms.append(round(mv, 2))
            if mv < float(os.environ.get('MV', '.85')): print('LOWMATCH', k, dst, mv); continue
            pts.append((fx, fy)); rad = max(2, int(round((max(w, h) / 2 + 3) * s)))
        if pts: fix(dst, pts, rad)
        outs[os.path.relpath(dst, D)] = ms
    log[k] = outs; print(k, outs)
json.dump(log, open(sys.argv[2] + '.figlog', 'w'))
