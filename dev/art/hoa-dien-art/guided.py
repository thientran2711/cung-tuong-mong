# guided.py: fallback for twin misses: box method around the KNOWN mark position (por anchor mapped into the twin), at por scale.
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np, cv2
from PIL import Image
from twin import match, gray, KR
from face import comp
from detf import boxmask
from det3 import remove

def guided(im, pl, k, loc, tx0, ty0):
    cx, ey, fw = pl['face']; P0 = (int(cx - 0.7 * fw), int(ey - 1.0 * fw)); w, h = int(1.4 * fw), int(1.25 * fw)
    M = np.float32([[k, 0, loc[0] + (P0[0] - tx0) * k], [0, k, loc[1] + (P0[1] - ty0) * k]])
    crop = cv2.warpAffine(np.ascontiguousarray(comp(im)), M, (w, h), flags=cv2.INTER_CUBIC | cv2.WARP_INVERSE_MAP, borderMode=cv2.BORDER_REPLICATE)
    b = pl['box']; ax, ay = pl['anchor']; ax -= P0[0]; ay -= P0[1]
    hw = max((b[2] - b[0]) * 0.65, 0.05 * fw); hh = max((b[3] - b[1]) * 0.65, 0.06 * fw)
    core = (int(ax - hw), int(ay - hh), int(ax + hw) + 1, int(ay + hh) + 1)
    lab = cv2.cvtColor(np.ascontiguousarray(crop), cv2.COLOR_RGB2LAB).astype(np.float32)
    x0, y0, x1, y1 = core; g = int(0.05 * fw) + 2
    X0, Y0, X1, Y1 = max(x0 - g, 0), max(y0 - g, 0), min(x1 + g, w), min(y1 + g, h)
    reg = lab[Y0:Y1, X0:X1]; ring = np.ones(reg.shape[:2], bool); ring[y0 - Y0:y1 - Y0, x0 - X0:x1 - X0] = False
    L = reg[..., 0]; sk = ring & (L > np.percentile(L[ring], 35))          # skin ring (no brow/hair: brighter part)
    ref = np.median(reg[sk], 0)
    if not (ref[0] > 120 and 128 < ref[1] < 165 and 125 < ref[2] < 170): return None
    dE = np.sqrt(((reg - ref) ** 2).sum(-1)); dC = np.hypot(reg[..., 1] - ref[1], reg[..., 2] - ref[2])
    th = max(float(os.environ.get('GTH', 6)), np.percentile(dE[sk], 90) + 2)
    cand = (dE > th) & ~ring
    cand &= ~((reg[..., 0] < ref[0] - 25) & (dC < 8))                        # dark uncoloured = brow / hair: never
    n, lb = cv2.connectedComponents(cand.astype(np.uint8))
    near = np.zeros_like(cand); r = int(0.05 * fw) + 1
    near[int(ay - Y0 - r):int(ay - Y0 + r), int(ax - X0 - r):int(ax - X0 + r)] = True
    ids = set(np.unique(lb[near & cand]).tolist()) - {0}
    if not ids: return None
    mm = np.isin(lb, list(ids)); mm = cv2.dilate(mm.astype(np.uint8), np.ones((5, 5), np.uint8)).astype(bool)
    m = np.zeros((h, w), bool); m[Y0:Y1, X0:X1] = mm
    ys, xs = np.nonzero(m)
    if abs(xs.mean() - ax) > 0.08 * fw or abs(ys.mean() - ay) > 0.08 * fw or m.sum() > 0.03 * fw * fw: return None
    A = np.asarray(im)
    mk = cv2.warpAffine(m.astype(np.float32), M, (im.width, im.height), flags=cv2.INTER_LINEAR)
    mk = cv2.dilate((mk > 0.2).astype(np.uint8), np.ones((3, 3), np.uint8)).astype(bool) & (A[..., 3] > 0)
    f = lambda x, y: (loc[0] + (x + P0[0] - tx0) * k, loc[1] + (y + P0[1] - ty0) * k)
    p0 = f(core[0], core[1]); p1 = f(core[2], core[3])
    return dict(mask=mk, box=[int(p0[0]), int(p0[1]), int(p1[0]) + 1, int(p1[1]) + 1], anchor=[round(v, 1) for v in f(ax, ay)], peak=0)

if __name__ == '__main__':
    kind, src, out, psrc, plog = sys.argv[1:6]; os.makedirs(out, exist_ok=True)
    L = {json.loads(l)['name']: json.loads(l) for l in open(plog)}
    from twin import save
    for n in sys.argv[6:]:
        info = dict(name=n, kind=kind, mode='guided')
        try:
            pl = L.get('por-' + n.split('-', 1)[1])
            if not pl or pl['status'] != 'clean': info['status'] = 'por_not_clean'; print(json.dumps(info)); continue
            por = Image.open(f"{psrc}/por-{n.split('-',1)[1]}.webp").convert('RGBA'); im = Image.open(f'{src}/{n}.webp').convert('RGBA')
            cx, ey, fw = pl['face']; best, (tx0, ty0) = match(gray(por), gray(im), cx, ey, fw, KR[kind])
            if best is None or best[0] < 0.93: info['status'] = 'nomatch'; print(json.dumps(info)); continue
            sc, k, loc = best; info.update(score=round(float(sc), 3), k=round(float(k), 4))
            d = guided(im, pl, k, loc, tx0, ty0)
            if d is None: info['status'] = 'nomark'
            else: save(im, d, info, n, out)
        except Exception:
            import traceback; info.update(status='error', err=traceback.format_exc()[-400:])
        print(json.dumps(info), flush=True)
