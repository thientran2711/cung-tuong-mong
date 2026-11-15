#!/usr/bin/env python3
"""place-colour.py — measure + flag + sheets for dev/test/place-colour.js output.
usage: python3 dev/test/place-colour.py OUT [BEFORE_OUT]
  writes OUT/table.json (one row per state: filter chain, mean L*, a*, b* as seen, the same for the painting as painted, figure probe),
  OUT/flags.txt, OUT/sheets/<place>.jpg (rows = seasons, columns = buổi × the season's 4 weathers).
  With BEFORE_OUT also OUT/compare.md (place × buổi × weather: before/after filter + L*/a*/b*)."""
import json, sys, os, glob
import numpy as np
from PIL import Image, ImageDraw, ImageFont
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'

OUT = sys.argv[1]; BEF = sys.argv[2] if len(sys.argv) > 2 else None
BU = ['sang', 'trua', 'chieu', 'toi']; SE = ['xuan', 'ha', 'thu', 'dong']

def lab(a):
    a = a.astype(np.float64) / 255.0
    a = np.where(a > 0.04045, ((a + 0.055) / 1.055) ** 2.4, a / 12.92)
    M = np.array([[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]])
    xyz = a @ M.T / np.array([0.95047, 1.0, 1.08883])
    f = np.where(xyz > 0.008856, np.cbrt(xyz), 7.787 * xyz + 16 / 116)
    L = 116 * f[..., 1] - 16; A = 500 * (f[..., 0] - f[..., 1]); B = 200 * (f[..., 1] - f[..., 2])
    return L, A, B

def stats(p):
    if not os.path.exists(p): return None
    im = Image.open(p).convert('RGB'); im = im.resize((max(1, im.width // 3), max(1, im.height // 3)))
    L, A, B = lab(np.asarray(im))
    return dict(L=round(float(L.mean()), 1), a=round(float(A.mean()), 2), b=round(float(B.mean()), 2),
                C=round(float(np.hypot(A, B).mean()), 2))

def load(d):
    rows = []
    for f in sorted(glob.glob(f'{d}/states*.json')): rows += json.load(open(f))
    return rows

def chain(r):
    """the colour-changing layers on the scene picture, in paint order"""
    if r.get('map'): return ' + '.join(x for x in [('img ' + r['f']) if r.get('f') not in (None, 'none') else '',
                                                 ('wrap ' + r['wf']) if r.get('wf') not in (None, 'none') else ''] + [
        f"layer {l['c']} {l['bg']} {l['f']}" for l in r.get('lay', []) if l['c'] not in ('msil', 'mlab', 'mmeta', 'mspot')] if x) or 'none'
    L = []
    pxon = r.get('px') and r['px'].get('bgv')
    if pxon:
        if r.get('pxf') not in (None, 'none'): L.append('pixi:' + r['pxf'])
    elif r.get('scf') not in (None, 'none'): L.append('css:' + r['scf'])
    lt = r.get('light') or {}
    bg = lt.get('bg', '')
    import re
    alphas = [float(x) for x in re.findall(r'rgba\([^)]*,\s*([0-9.]+)\)', bg)]
    if alphas and max(alphas) > 0.004: L.append('light:' + re.sub(r'\s+', ' ', bg.replace('linear-gradient', 'lg'))[:120])
    af = r.get('after') or {}
    if af.get('c') not in (None, 'none') and float(af.get('op', '0') or 0) > 0.004 and 'rgba(0, 0, 0, 0)' not in af.get('bg', 'rgba(0, 0, 0, 0)'):
        L.append('after:' + af['bg'][:60] + '@' + af['op'])
    if r.get('stf') not in (None, 'none'): L.append('stage:' + r['stf'])
    if 'inset' in (r.get('shadow') or ''): L.append('frost-vignette')
    return ' + '.join(L) or 'none'

def probe(r, d):
    p = f"{d}/f/{r['id']}.jpg"
    if not os.path.exists(p) or not r.get('prR'): return None
    im = np.asarray(Image.open(p).convert('RGB')).astype(float)
    R = r['prR']; Hh, Ww = im.shape[:2]   # the kit figure scaler may resize the probe: use its visible part, away from the edges
    x0, x1 = int(R['x'] + R['w'] * .3), int(R['x'] + R['w'] * .7); y0 = int(R['y'] + 12); y1 = min(int(R['y'] + R['h']), Hh) - 12
    if x1 <= x0 or y1 <= y0: return None
    c = im[max(0, y0):y1, max(0, x0):x1].reshape(-1, 3).mean(0)
    return [round(v, 1) for v in c]

def measure(d):
    rows = load(d); T = []
    for r in rows:
        s = stats(f"{d}/s/{r['id']}.jpg"); raw = None if r.get('map') else stats(f"{os.environ.get('RAWFROM', d)}/r/{r['id']}.jpg")  # RAWFROM: take the painting-as-painted pass from another run (same build layout)
        t = dict(id=r['id'], place=r['place'], se=r['se'], bu=r['bu'], wi=r.get('wi'), wx=r.get('wx'), map=r.get('map', 0),
                 bg=r.get('bg') or r.get('src'), chain=chain(r), seen=s, raw=raw, probe=None if r.get('map') else probe(r, d),
                 mef=r.get('mef'), figf=r.get('figf'), prf=r.get('prf'), cls=r.get('cls', ''))
        T.append(t)
    json.dump(T, open(f'{d}/table.json', 'w'))
    return T

COLD = ('lc', 'tgk')
def flags(T):
    F = []
    for t in T:
        s, r, why = t['seen'], t['raw'], []
        if not s: continue
        ch = t['chain']
        if 'sepia' in ch: why.append('sepia filter')
        if r:
            dL, da, db, dC = s['L'] - r['L'], s['a'] - r['a'], s['b'] - r['b'], s['C'] - r['C']
            if db > 3 and dL < 1: why.append(f'brown wash (dL {dL:+.1f} db {db:+.1f})')
            if t['place'] not in COLD and dC < -3 and db < -1.5: why.append(f'grey cold wash (dC {dC:+.1f} db {db:+.1f})')
            if abs(dL) > 8: why.append(f'brightness changed dL {dL:+.1f}')
        n = sum(1 for x in ch.split(' + ') if x.split(':')[0] in ('css', 'pixi', 'stage'))   # filters (a .light overlay is a layer, not a filter)
        if n >= 2: why.append(f'{n} stacked filters')
        if not t['map'] and t['place'] not in COLD and 'rgba(200, 225, 255' in ch: why.append('cool weather wash')
        if t['bu'] in (0, 1, 2) and s['L'] < 38 and t['place'] not in COLD: why.append(f'dark daytime L {s["L"]}')
        if t['bu'] == 3 and s['L'] > 52: why.append(f'night looks like day L {s["L"]}')
        pr = t['probe']
        if pr and max(abs(v - 128) for v in pr) > 4: why.append(f'figure tinted {pr}')
        for k in ('mef', 'figf', 'prf'):
            v = t.get(k) or ''
            if any(f in v for f in ('sepia', 'hue-rotate', 'grayscale', 'saturate', 'contrast')) or ('brightness(' in v and 'brightness(1)' not in v):
                why.append(f'{k} colour filter: {v[:60]}'); break
        if why: F.append((t['id'], why))
    return F

def sheets(d, T):
    os.makedirs(f'{d}/sheets', exist_ok=True)
    by = {}
    for t in T: by.setdefault(t['place'], []).append(t)
    for pl, L in by.items():
        if L[0]['map']:
            tw, th = 150, 100; cols = 4; rows = (len(L) + 3) // 4
        else:
            tw, th = 92, 112; cols = 16; rows = 4
        fnt = ImageFont.truetype(FONT, 11) if os.path.exists(FONT) else None
        sh = Image.new('RGB', (cols * tw + 60, rows * (th + 14) + 4), (250, 246, 236)); dr = ImageDraw.Draw(sh)
        for i, t in enumerate(L):
            p = f"{d}/s/{t['id']}.jpg"
            if not os.path.exists(p): continue
            im = Image.open(p).convert('RGB'); im.thumbnail((tw - 2, th - 2))
            if t['map']: c, r = i % 4, i // 4
            else: c, r = t['bu'] * 4 + t['wi'], SE.index(t['se'])
            x, y = 58 + c * tw, 2 + r * (th + 14)
            sh.paste(im, (x, y)); dr.text((x, y + th - 1), f"{BU[t['bu']]} {(t['wx'] or '')[:12]}" if not t['map'] else t['id'][:22], fill=(60, 40, 20), font=fnt)
            if c == 0 or t['map']: dr.text((2, y + th // 2), t['se'], fill=(60, 40, 20))
        sh.save(f'{d}/sheets/{pl}.jpg', quality=80)

T = measure(OUT); F = flags(T)
with open(f'{OUT}/flags.txt', 'w') as f:
    from collections import Counter
    cnt = Counter(w.split(' (')[0].split(' L ')[0].split(' dL')[0].split(':')[0] for _, ws in F for w in ws)
    f.write(f'states {len(T)} flagged {len(F)}\n' + ''.join(f'  {k}: {v}\n' for k, v in cnt.most_common()) + '\n')
    for i, ws in F: f.write(f'{i}: ' + '; '.join(ws) + '\n')
sheets(OUT, T)
print(open(f'{OUT}/flags.txt').read()[:1500])
if BEF:
    B = {t['id']: t for t in json.load(open(f'{BEF}/table.json'))}
    with open(f'{OUT}/compare.md', 'w') as f:
        f.write('| state | before: layers | L/a/b before | after: layers | L/a/b after | raw L/a/b |\n|---|---|---|---|---|---|\n')
        for t in T:
            b = B.get(t['id'])
            if not b: continue
            q = lambda s: f"{s['L']}/{s['a']:+.1f}/{s['b']:+.1f}" if s else '-'
            f.write(f"| {t['id']} {t.get('wx') or ''} | {b['chain']} | {q(b['seen'])} | {t['chain']} | {q(t['seen'])} | {q(t['raw'])} |\n")
