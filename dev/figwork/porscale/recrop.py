#!/usr/bin/env python3
"""porscale/recrop.py: re-crop (zoom/shift, no redrawing) por-* portraits so the face matches the group target (plan.json from plan.py).
usage: python3 -I recrop.py <plan.json> <before dir> <fig dir> <out dir> [only-substring]
Per planned picture: output pixel u = cx_t*W + (x - cx*W)*s (same for y) — the face centre (forehead/chin midpoint) goes to the group's
target point, the face height becomes the group's target. Size stays 384x506 RGBA. Where the new view reaches past the portrait's own
edge on a PAINTED border (zoom out, or a shift), the missing strip is filled from the same painting's full figure fig-*.webp
(register.py, score >= .9), so the body continues; transparent borders stay transparent. Resampling: Lanczos on premultiplied alpha.
Writes <out dir>/por-*.webp and <out dir>/recrop.json {name: {s, dx, dy, fill, score, flags}}."""
import sys, os, json
import numpy as np
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from register import reg
def run1(name, P, bdir, fdir, odir):
    im = Image.open(os.path.join(bdir, name + '.webp')).convert('RGBA'); W, H = im.size
    s, cx, cy, tx, ty = P['s'], P['cx'] * W, P['cy'] * H, P['tx'] * W, P['ty'] * H
    x0, y0 = cx - tx / s, cy - ty / s; x1, y1 = x0 + W / s, y0 + H / s      # source box in por px
    A = np.array(im)[..., 3]
    need = []
    if x0 < -0.5 and (A[:, 0] > 128).mean() > .02: need.append('L')
    if x1 > W + .5 and (A[:, -1] > 128).mean() > .02: need.append('R')
    if y1 > H + .5 and (A[-1] > 128).mean() > .02: need.append('B')
    if y0 < -0.5 and (A[0] > 128).mean() > .02: need.append('T')
    info = {'s': round(s, 4), 'flags': []}
    X0, Y0 = int(np.floor(min(0, x0))) - 2, int(np.floor(min(0, y0))) - 2
    X1, Y1 = int(np.ceil(max(W, x1))) + 2, int(np.ceil(max(H, y1))) + 2
    can = Image.new('RGBa', (X1 - X0, Y1 - Y0), (0, 0, 0, 0))
    if need:
        fp = os.path.join(fdir, 'fig-' + name[4:] + '.webp')
        if not os.path.exists(fp):
            info['flags'].append('no-fig:' + ''.join(need))
        else:
            fig = Image.open(fp).convert('RGBA')
            k, ox, oy, sc = reg(np.array(im), np.array(fig)); info['score'] = round(float(sc), 3); info['fill'] = ''.join(need)
            if sc < .9: info['flags'].append('fig-mismatch:%.2f' % sc)
            else:
                fw, fh = round(fig.width / k), round(fig.height / k)
                big = fig.convert('RGBa').resize((fw, fh), Image.LANCZOS)
                can.paste(big, (round(-ox / k) - X0, round(-oy / k) - Y0))
    # the portrait itself replaces the figure inside its own rectangle (a hard replace, not a blend: transparent stays transparent)
    can.paste(im.convert('RGBa'), (-X0, -Y0))
    out = can.resize((W, H), Image.LANCZOS, box=(x0 - X0, y0 - Y0, x1 - X0, y1 - Y0)).convert('RGBA')
    oa = np.array(out)[..., 3]
    if (oa[-1] > 128).mean() < .8 * (A[-1] > 128).mean(): info['flags'].append('bottom-gap')
    if s > 1.30: info['flags'].append('upscale:%.2f' % s)
    top_new = P['ty'] + (P['top'] - P['cy']) * s
    if P['top'] > .005 and top_new < -.01: info['flags'].append('crown-cut:%.3f' % -top_new)
    out.save(os.path.join(odir, name + '.webp'), quality=90, method=4)
    return info
G = {}
def job(n):
    try: return n, run1(n, G['plan'][n], G['b'], G['f'], G['o'])
    except Exception as e: return n, {'flags': ['ERR ' + str(e)[:80]]}
if __name__ == '__main__':
    plan = json.load(open(sys.argv[1]))['plan']; bdir, fdir, odir = sys.argv[2:5]; only = sys.argv[5] if len(sys.argv) > 5 else ''
    G.update(plan=plan, b=bdir, f=fdir, o=odir)
    os.makedirs(odir, exist_ok=True)
    rp = os.path.join(odir, 'recrop.json'); R = json.load(open(rp)) if os.path.exists(rp) else {}
    todo = [n for n in sorted(plan) if (not only or only in n)]
    from multiprocessing import Pool
    with Pool(int(os.environ.get('PROCS') or 2)) as Pl:
        for i, (n, v) in enumerate(Pl.imap_unordered(job, todo, chunksize=4)):
            R[n] = v
            if i % 200 == 0: print(i, len(todo), file=sys.stderr, flush=True)
    json.dump(R, open(rp, 'w'), indent=0, sort_keys=True)
    fl = {n: v['flags'] for n, v in R.items() if v.get('flags')}
    print(len(todo), 'recropped;', len(fl), 'flagged')
