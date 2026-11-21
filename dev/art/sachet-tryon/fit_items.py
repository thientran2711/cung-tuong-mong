#!/usr/bin/env python3
"""L1689 try-on: put the EXISTING sprites (earring-test/ngoc_boi.png, tui_huong.png) on the waist sash of 3 maid pictures,
under the right hand. The part of the item inside the 'front' polygon (hands + held item) is cut away, so the hands and the
held item stay on top (G45). 0 credits, no new paint."""
import json, os
from PIL import Image, ImageDraw, ImageFilter
D = os.path.dirname(os.path.abspath(__file__)); SPR = os.path.join(D, '..', 'earring-test')
P = json.load(open(os.path.join(D, 'params.json')))
SP = {'ngoc': Image.open(os.path.join(SPR, 'ngoc_boi.png')).convert('RGBA'),
      'tui': Image.open(os.path.join(SPR, 'tui_huong.png')).convert('RGBA')}
out = {}
for n, p in P.items():
    base = Image.open(os.path.join(D, 'out', n + '_base.webp')) if not os.path.exists(os.path.join(D, n + '_src.png')) else Image.open(os.path.join(D, n + '_src.png')).convert('RGB')
    W, H = base.size
    base.save(os.path.join(D, 'out', n + '_base.webp'), quality=92)
    front = Image.new('L', (W, H), 0); ImageDraw.Draw(front).polygon([tuple(q) for q in p['front']], fill=255)
    front = front.filter(ImageFilter.GaussianBlur(0.8))
    rec = {k: v for k, v in p.items() if k not in ('front',)}; rec['base'] = n + '_base.webp'; rec['W'] = W; rec['H'] = H
    for key, spr in SP.items():
        s = p['scale']; sw, sh = round(spr.width * s), round(spr.height * s)
        it = spr.resize((sw, sh), Image.LANCZOS)
        ax, ay = p['anchor']; x0, y0 = ax - sw // 2, ay
        layer = Image.new('RGBA', (W, H), (0, 0, 0, 0)); layer.paste(it, (x0, y0), it)
        # soft contact shadow on the cloth
        a = layer.split()[3]
        sh_ = Image.new('RGBA', (W, H), (60, 35, 40, 0)); sh_.putalpha(a.point(lambda v: v * 0.28).filter(ImageFilter.GaussianBlur(2.2)))
        sh2 = Image.new('RGBA', (W, H), (0, 0, 0, 0)); sh2.paste(sh_, (2, 3))
        comb = Image.alpha_composite(sh2, layer)
        al = comb.split()[3]
        al = Image.composite(Image.new('L', (W, H), 0), al, front)   # cut away under hands / held item
        comb.putalpha(al)
        bb = comb.getbbox(); crop = comb.crop(bb)
        fn = f'{n}_{key}.png'; crop.save(os.path.join(D, 'out', fn))
        rec[key] = {'src': fn, 'x': bb[0], 'y': bb[1], 'w': bb[2] - bb[0], 'h': bb[3] - bb[1]}
    out[n] = rec
json.dump(out, open(os.path.join(D, 'out', 'fit.json'), 'w'), ensure_ascii=False, indent=1)
print('ok')
