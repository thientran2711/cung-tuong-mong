#!/usr/bin/env python3
"""look-fx-ladder.py: tone ladder sheets for the face marks (owner 18/11 order). usage: look-fx-ladder.py <dir with c01.webp c30.webp fx-*.png scar-N.png> <outdir>
Strength k in 1.0/.85/.70/.55/.40: alpha*k AND colour pulled toward the sampled skin by (1-k)*PULL (same method for every mark)."""
import sys, os
from PIL import Image, ImageDraw, ImageFont
import numpy as np
D, OUT = sys.argv[1], sys.argv[2]
KS = [1.0, .85, .70, .55, .40]
PULL = 0.7           # fraction of the way to skin when k->0 (colour pull = (1-k)*PULL)
FIGS = {  # hand-measured on c01/c30 t2 a26 (299x900 / 309x900): square centre, side, rotate (CSS deg), skin sample box, mirror flag for muc
 'c01': dict(f='c01.webp', cx=170, cy=84, S=96, rot=-5, skin=(150, 84, 190, 100), scar=(-.16, .02, .70), mir=False),
 'c30': dict(f='c30.webp', cx=175, cy=109, S=96, rot=-1.6, skin=(155, 110, 195, 126), scar=(-.16, .02, .70), mir=False)}
def skin_of(im, box):
    a = np.asarray(im.convert('RGB').crop(box)).reshape(-1, 3).astype(float)
    return np.median(a, axis=0)
def tone(mark, k, skin):
    a = np.asarray(mark.convert('RGBA')).astype(float)
    pull = (1 - k) * PULL
    a[..., :3] = a[..., :3] * (1 - pull) + skin * pull
    a[..., 3] *= k
    return Image.fromarray(a.clip(0, 255).astype('uint8'), 'RGBA')
def put(base, mark, cx, cy, S, rot, alpha=1.0):
    m = mark.resize((int(S), int(S)), Image.LANCZOS)
    if alpha != 1.0:
        a = np.asarray(m).astype(float); a[..., 3] *= alpha; m = Image.fromarray(a.astype('uint8'), 'RGBA')
    m = m.rotate(-rot, resample=Image.BICUBIC)
    base.alpha_composite(m, (int(cx - S / 2), int(cy - S / 2)))
def face(fk, markfile, lvmark, k, mirror=False, scar=False):
    c = FIGS[fk]; base = Image.open(os.path.join(D, c['f'])).convert('RGBA')
    skin = skin_of(base, c['skin'])
    mk = tone(Image.open(os.path.join(D, markfile)), k, skin)
    if scar:  # kit scar: cheek box = 0.70 of the veil square, shifted left (scar-fit / veil-fit ratio), alpha .85 as in KIT_LASTING
        put(base, mk, c['cx'] + c['scar'][0] * c['S'], c['cy'] + c['scar'][1] * c['S'] + 10, c['S'] * c['scar'][2] * 1.1, c['rot'], .85)
    else:
        put(base, mk, c['cx'], c['cy'], c['S'], c['rot'])
    return base
def crop(im, fk, z):
    c = FIGS[fk]; x0, y0 = int(c['cx'] - 65), int(c['cy'] - 62)
    return im.crop((x0, y0, x0 + 130, y0 + 150)).resize((130 * z, 150 * z), Image.LANCZOS)
def font(n):
    try: return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', n)
    except Exception: return ImageFont.load_default()
def sheet(name, files, label, scar=False, z=2):
    """files: list of 3 files for lv1..3 ; rows lv1..3 x cols k ; two sections c01|c30 ; plus full-body inset column"""
    cw, ch = 130 * z, 150 * z
    W = 2 * (5 * cw + 20) + 40; H = 90 + 3 * ch + 40
    S = Image.new('RGB', (W, H), (30, 28, 34)); d = ImageDraw.Draw(S)
    d.text((16, 10), f'{label}  |  columns = strength 100 / 85 / 70 / 55 / 40 %  (alpha x k, colour pulled to skin by (1-k)*{PULL})  |  rows lv1 / lv2 / lv3  |  LEFT c01 RIGHT c30  |  100 % = current', fill=(255, 255, 255), font=font(18))
    for si, fk in enumerate(('c01', 'c30')):
        ox = 20 + si * (5 * cw + 40)
        for ci, k in enumerate(KS):
            d.text((ox + ci * cw + 8, 56), f'{int(k*100)} %' + (' (current)' if k == 1 else ''), fill=(255, 220, 120), font=font(20))
        for ri in range(3):
            for ci, k in enumerate(KS):
                im = face(fk, files[ri], ri, k, scar=scar)
                S.paste(crop(im, fk, z).convert('RGB'), (ox + ci * cw, 90 + ri * ch))
            d.text((ox + 4, 90 + ri * ch + 4), f'lv{ri+1}', fill=(255, 255, 255), font=font(18))
    S.save(os.path.join(OUT, name))
    # 3x face strip: lv2 and lv3 only, c01 and c30 -> second image
    z3 = 3; cw3, ch3 = 130 * z3, 150 * z3
    S2 = Image.new('RGB', (5 * cw3, 2 * ch3 + 30), (30, 28, 34)); d2 = ImageDraw.Draw(S2)
    for ci, k in enumerate(KS):
        d2.text((ci * cw3 + 8, 4), f'{int(k*100)} %', fill=(255, 220, 120), font=font(20))
    for ri, fk in enumerate(('c01', 'c30')):
        for ci, k in enumerate(KS):
            S2.paste(crop(face(fk, files[2], 2, k, scar=scar), fk, z3).convert('RGB'), (ci * cw3, 30 + ri * ch3))
    S2.save(os.path.join(OUT, name.replace('.png', '-3x.png')))
os.makedirs(OUT, exist_ok=True)
sheet('ladder-muc.png', ['fx-muc-1.png', 'fx-muc-2.png', 'fx-muc-3.png'], 'MUC (ink) fx-muc-N', z=2)
sheet('ladder-muoi.png', ['fx-muoi-1.png', 'fx-muoi-2.png', 'fx-muoi-3.png'], 'MUOI (soot) fx-muoi-N', z=2)
sheet('ladder-cao.png', ['scar-1.png', 'scar-2.png', 'scar-3.png'], 'CAO (huy dung scratch, KIT_SCAR scar-N, 1/2/3 strokes)', scar=True, z=2)
