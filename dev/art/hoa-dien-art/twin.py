# twin.py KIND SRC OUT PORSRC PORLOG NAME... : clean the fig / hd / tn twin of a cleaned portrait at its OWN size.
#   KIND fig|hd|tn ; NAME e.g. fig-consort-c05-t5-a18 ; PORLOG = clean3.py json lines (box/anchor/face of the por).
# The twin face is a resized copy of the por face: template-match the por forehead+eyes patch (scale search), map the por mark
# box into the twin, run det3.detect inside that mapped zone at the twin's scale; if it finds nothing, report 'nomark' (no change).
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np, cv2
from PIL import Image
from face import comp
from detf import detect
from det3 import remove

def gray(im): return cv2.cvtColor(comp(im), cv2.COLOR_RGB2GRAY)

def match(por, tw, cx, ey, fw, kr):
    tx0, ty0 = int(cx - 0.4 * fw), int(ey - 0.55 * fw)
    t = por[ty0:int(ey + 0.1 * fw), tx0:int(cx + 0.4 * fw)]
    H = min(tw.shape[0], max(int(tw.shape[0] * 0.45), int(t.shape[0] * kr[1]) + 4)); best = None
    def tryk(k):
        tt = cv2.resize(t, None, fx=k, fy=k, interpolation=cv2.INTER_AREA)
        if tt.shape[0] >= H or tt.shape[1] >= tw.shape[1]: return None
        r = cv2.matchTemplate(tw[:H], tt, cv2.TM_CCOEFF_NORMED); _, mx, _, loc = cv2.minMaxLoc(r); return mx, k, loc
    for k in np.arange(*kr):
        r = tryk(k)
        if r and (best is None or r[0] > best[0]): best = r
    if best is None: return None, (tx0, ty0)
    for k in np.arange(best[1] - kr[2], best[1] + kr[2], kr[2] / 5):
        r = tryk(k)
        if r and r[0] > best[0]: best = r
    return best, (tx0, ty0)

def ownface(im):
    # face of a full-body figure at any height: crop the head band, rescale to portrait scale, haar (face.face)
    from face import face
    H = im.height; s = 1.92 * 900.0 / H; top = int(330 * H / 900.0)
    c = im.crop((0, 0, im.width, top)); c = c.resize((int(c.width * s), int(c.height * s)), Image.LANCZOS)
    tmp = '/dev/shm/_tw%d.png' % os.getpid(); c.save(tmp)
    cx, ey, fw, ed, rgb = face(tmp)
    if ed is None and abs(fw - 0.36 * c.width) < 1e-6: return None
    return cx / s, ey / s, fw / s

def standalone(im, info, n, out):
    f = ownface(im)
    if f is None: info['status'] = 'noface'; return
    import det3_v3b, det3_v5; det3_v3b.MINPEAK = det3_v5.MINPEAK = 20.0
    rgb = np.ascontiguousarray(np.asarray(im)[..., :3]); d = detect(rgb, *f)
    info['mode'] = 'own'
    if d is None: info['status'] = 'nomark'; return
    save(im, d, info, n, out)

def save(im, d, info, n, out):
    res, rect = remove(im, d)
    res.save(f'{out}/{n}.webp', 'WEBP', quality=int(os.environ.get('Q', 95)), method=6)   # fig/hd/tn: lossy q98 (ROOT-9 pending) (ROOT-9 20:00Z)
    A = np.asarray(im).astype(int); B = np.asarray(Image.open(f'{out}/{n}.webp').convert('RGBA')).astype(int)
    mk = d['mask']; diff = np.abs(A - B)[..., :3].mean(-1)
    outside = ~mk; vis = A[..., 3] > 0
    info.update(status='clean', box=list(d['box']), anchor=list(d['anchor']), peak=d['peak'], rect=list(rect),
                changed=int(mk.sum()), out_mad=round(float(diff[outside & vis].mean()), 3), size_ok=A.shape == B.shape, size=list(im.size))

KR = dict(fig=(0.45, 1.10, 0.01), hd=(0.9, 2.2, 0.02), tn=(0.15, 0.70, 0.01))

if __name__ == '__main__':
    kind, src, out, psrc, plog = sys.argv[1:6]; os.makedirs(out, exist_ok=True)
    L = {}
    for l in open(plog):
        x = json.loads(l); L[x['name']] = x
    for n in sys.argv[6:]:
        info = dict(name=n, kind=kind)
        try:
            pn = 'por-' + n.split('-', 1)[1]; pl = L.get(pn)
            if pl is None or pl['status'] != 'clean': info['status'] = 'por_' + (pl['status'] if pl else 'nolog'); print(json.dumps(info)); continue
            por = Image.open(f'{psrc}/{pn}.webp').convert('RGBA'); im = Image.open(f'{src}/{n}.webp').convert('RGBA')
            cx, ey, fw = pl['face']
            best, (tx0, ty0) = match(gray(por), gray(im), cx, ey, fw, KR[kind])
            if best is None: standalone(im, info, n, out); print(json.dumps(info)); continue
            sc, k, loc = best; info.update(score=round(float(sc), 3), k=round(float(k), 4))
            if sc < 0.93: standalone(im, info, n, out); print(json.dumps(info)); continue
            mp = lambda x, y: (loc[0] + (x - tx0) * k, loc[1] + (y - ty0) * k)
            b = pl['box']; a0 = mp(b[0], b[1]); a1 = mp(b[2], b[3]); fwT = fw * k
            m = 0.10 * fwT
            zone = (a0[0] - m, a0[1] - m, a1[0] + m, a1[1] + m)
            cT, eT = mp(cx, ey)  # mapped face centre x, eye line y
            rgb = np.ascontiguousarray(np.asarray(im)[..., :3])
            os.environ.setdefault('MINPEAK', '12')
            import det3_v3b, det3_v5; det3_v3b.MINPEAK = det3_v5.MINPEAK = float(os.environ['MINPEAK'])
            d = detect(rgb, cT, eT, fwT, zone=zone, expect=mp(*pl['anchor']))
            if d is None: standalone(im, info, n, out); print(json.dumps(info)); continue
            save(im, d, info, n, out)
        except Exception:
            import traceback; info.update(status='error', err=traceback.format_exc()[-400:])
        print(json.dumps(info), flush=True)
