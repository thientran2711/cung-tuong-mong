#!/usr/bin/env python3
"""TRYON2 (owner L1701: v1 items were not fitted per figure). 0 credits, no new paint.
Per maid (params.json, pixel coords hand-measured on the 752x1344 base): sash point, where the item emerges, scale,
and occluder polygons (each hand, held item, sleeve). Item = cord from the sash + EXISTING sprite (earring-test), the
part under any occluder is cut away so hands + held item stay on top (G45)."""
import json, os
from PIL import Image, ImageDraw, ImageFilter
D = os.path.dirname(os.path.abspath(__file__)); SPR = os.path.join(D, '..', 'earring-test')
P = json.load(open(os.path.join(D, 'params.json')))
SP = {'ngoc': (Image.open(os.path.join(SPR, 'ngoc_boi.png')).convert('RGBA'), (222, 150, 170), 70),
      'tui': (Image.open(os.path.join(SPR, 'tui_huong.png')).convert('RGBA'), (196, 88, 108), 85)}
out = {}
for n, p in P.items():
    base = Image.open(os.path.join(D, 'out', n + '_base.webp')).convert('RGB'); W, H = base.size
    occ = Image.new('L', (W, H), 0); d = ImageDraw.Draw(occ)
    for poly in p['occ'].values(): d.polygon([tuple(q) for q in poly], fill=255)
    occ = occ.filter(ImageFilter.GaussianBlur(0.9))
    json.dump(p['occ'], open(os.path.join(D, 'out', n + '_occ.json'), 'w'))
    rec = {k: v for k, v in p.items() if k not in ('occ', 'sash', 'top', 'painted_bbox')}; rec.update(base=n + '_base.webp', W=W, H=H)
    for key, (spr, cord, cut) in SP.items():
        spr = spr.crop((0, cut, spr.width, spr.height))   # drop the top loop; the cord is drawn from the sash instead
        s = p['scale']; it = spr.resize((round(spr.width * s), round(spr.height * s)), Image.LANCZOS)
        tx, ty = p['top']; layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        # cord: sash -> top of sprite (gentle curve), 3 px, with a small tie knot at the sash
        import math
        S = 4; cl = Image.new('RGBA', (W * S, H * S), (0, 0, 0, 0)); cd = ImageDraw.Draw(cl)
        sx, sy = p['sash']; N = 40
        pts = [((sx + (tx - sx) * t + 3 * math.sin(t * math.pi)) * S, (sy + (ty - sy) * t) * S) for t in [i / N for i in range(N + 1)]]
        cd.line(pts, fill=cord + (255,), width=3 * S, joint='curve')
        cd.ellipse([(sx - 3) * S, (sy - 2) * S, (sx + 3) * S, (sy + 4) * S], fill=cord + (255,))
        cl = cl.resize((W, H), Image.LANCZOS)
        layer = Image.alpha_composite(layer, cl); layer.paste(it, (tx - it.width // 2, ty), it)
        a = layer.split()[3]
        sh_ = Image.new('RGBA', (W, H), (60, 35, 40, 0)); sh_.putalpha(a.point(lambda v: v * 0.28).filter(ImageFilter.GaussianBlur(2.2)))
        sh2 = Image.new('RGBA', (W, H), (0, 0, 0, 0)); sh2.paste(sh_, (2, 3))
        comb = Image.alpha_composite(sh2, layer)
        al = comb.split()[3]; al = Image.composite(Image.new('L', (W, H), 0), al, occ); comb.putalpha(al)
        bb = comb.getbbox(); crop = comb.crop(bb); fn = f'{n}_{key}.png'; crop.save(os.path.join(D, 'out', fn))
        pb = p['painted_bbox']; band = al.point(lambda v: 255 if v > 20 else 0).crop((0, pb[1], W, pb[3])).getbbox()  # item pixels only in the painted sachet's rows
        gap = 999 if band is None else max(pb[0] - band[2], band[0] - pb[2])
        print(n, key, 'item bbox', bb, 'painted', pb, 'gap px', gap, 'OK' if gap >= 20 else 'FAIL (<20 or intersect)')
        rec[key] = {'src': fn, 'x': bb[0], 'y': bb[1], 'w': bb[2] - bb[0], 'h': bb[3] - bb[1]}
    out[n] = rec
json.dump(out, open(os.path.join(D, 'out', 'fit.json'), 'w'), ensure_ascii=False, indent=1)
print('ok')
