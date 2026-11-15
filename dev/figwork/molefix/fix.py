"""fix.py [names...] : remove listed spots on por + matching fig, write to dev/figwork/out/molefix/img/, tiles to work/t/"""
import sys, os, json, glob
import numpy as np, cv2
from PIL import Image, ImageDraw
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import mf
os.chdir(mf.ROOT)
W = 'dev/figwork/out/molefix/work/'; OUT = 'dev/figwork/out/molefix/img/'
os.makedirs(OUT, exist_ok=True); os.makedirs(W + 't', exist_ok=True)
maps = json.load(open(W + 'maps.json'))
rows = [l.split() for l in open(W + 'list2.txt') if l.strip() and not l.startswith('#')]
sel = sys.argv[1:]

def blobs(rgba, pts, R, minpeak, maxdim, maxarea, k):
    rgb = np.ascontiguousarray(rgba[..., :3]); solid = (rgba[..., 3] >= 240).astype(np.uint8)
    g = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY).astype(int)
    med = cv2.medianBlur(g.astype(np.uint8), k).astype(int)
    d = med - g
    mask = np.zeros(g.shape, np.uint8); found = []
    for (x, y, r) in pts:
        r = r or R
        xa, ya = max(0, int(x - r)), max(0, int(y - r))
        win = d[ya:int(y + r) + 1, xa:int(x + r) + 1]
        thr = max(4, 0.4 * min(win.max(), 40))
        # components on a bigger window so brows/lashes come out large and get rejected
        P = int(r + maxdim * 2)
        xb, yb = max(0, int(x - P)), max(0, int(y - P))
        big = (d[yb:int(y + P) + 1, xb:int(x + P) + 1] > thr).astype(np.uint8)
        n, lab, st, cen = cv2.connectedComponentsWithStats(big, 8)
        for i in range(1, n):
            bx, by, bw, bh, ar = st[i]
            cx, cy = cen[i][0] + xb, cen[i][1] + yb
            if (cx - x) ** 2 + (cy - y) ** 2 > r * r: continue
            if max(bw, bh) > maxdim or ar > maxarea: continue
            pk = d[yb:int(y + P) + 1, xb:int(x + P) + 1][lab == i].max()
            if pk < minpeak: continue
            if not solid[yb:int(y + P) + 1, xb:int(x + P) + 1][lab == i].all(): continue
            if any(abs(cx - f[0]) < .2 and abs(cy - f[1]) < .2 for f in found): continue
            m = np.zeros_like(big); m[lab == i] = 1
            m = cv2.dilate(m, np.ones((3, 3), np.uint8), iterations=2 if maxdim > 6 else 1)
            mask[yb:yb + m.shape[0], xb:xb + m.shape[1]] |= m
            found.append((round(cx, 1), round(cy, 1), int(pk), int(ar)))
    return mask, found

def tile(a, b, x, y, sc, R, label):
    A = Image.fromarray(a[..., :3]).crop((int(x - R), int(y - R), int(x + R), int(y + R))).resize((200, 200), Image.LANCZOS)
    B = Image.fromarray(b[..., :3]).crop((int(x - R), int(y - R), int(x + R), int(y + R))).resize((200, 200), Image.LANCZOS)
    t = Image.new('RGB', (400, 214), 'white'); t.paste(A, (0, 14)); t.paste(B, (200, 14))
    ImageDraw.Draw(t).text((2, 1), label, fill='black'); return t

log = json.load(open(W + 'log.json')) if os.path.exists(W + 'log.json') else {}
for r in rows:
    n = r[0]
    if sel and n not in sel: continue
    opts = dict(o.split('=') for o in r[1:] if '=' in o)
    pts = []
    for p in r[1:]:
        if '=' in p: continue
        v = [float(q) for q in p.split(',')]; pts.append((v[0], v[1], v[2] if len(v) > 2 else 0))
    minpk = float(opts.get('pk', 8))
    fig = mf.load(f'img/fig-{n}.webp'); por = mf.load(f'img/por-{n}.webp')
    sc, s, ox, oy = maps[n]
    pm, pf = blobs(por, pts, 7, minpk, 10, 60, 15)
    pnew = por.copy(); pnew[..., :3] = mf.heal(por[..., :3], pm)
    # fig: explicit fig points (fx=..) or mapped from por blobs
    if 'fig' in opts:
        fpts = [tuple(float(q) for q in p.split(',')) + (0,) for p in opts['fig'].split(';')]
        fpts = [(a, b, 0) for a, b, *_ in fpts]
    else:
        src = [(a, b) for a, b, *_ in pf] or [(x, y) for x, y, _ in pts]
        fpts = [(a * s + ox, b * s + oy, 0) for a, b in src]
    fR = float(opts.get('fr', 3.5))
    fm, ff = blobs(fig, fpts, fR, max(4, minpk * 0.6), 6, 25, 9)
    fnew = fig.copy(); fnew[..., :3] = mf.heal(fig[..., :3], fm)
    kp = os.path.getsize(f'img/por-{n}.webp') // 1024 + 8; kf = os.path.getsize(f'img/fig-{n}.webp') // 1024 + 15
    qp = qf = None
    for k_, m_, a_, mx in (('por', pm, pnew, max(kp, 60)), ('fig', fm, fnew, max(kf, 120))):
        o_ = OUT + f'{k_}-{n}.webp'
        if m_.any(): q_ = mf.save_webp(a_, o_, mx)
        elif os.path.exists(o_): os.remove(o_)
    log[n] = {'por': pf, 'fig': ff, 'q': [qp, qf]}
    print(n, 'por', pf, 'fig', ff)
    ts = []
    for (x, y, _) in pts:
        ts.append(tile(por, pnew, x, y, 1, 24, f'{n} por {int(x)},{int(y)}'))
        fx, fy = x * s + ox, y * s + oy
        ts.append(tile(fig, fnew, fx, fy, 1, 24 * s, f'fig'))
    T = Image.new('RGB', (400 * len(ts), 214)); [T.paste(t, (400 * i, 0)) for i, t in enumerate(ts)]
    T.save(W + f't/{n}.jpg', quality=88)
json.dump(log, open(W + 'log.json', 'w'), indent=0)
