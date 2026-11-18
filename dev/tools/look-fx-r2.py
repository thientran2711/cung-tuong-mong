#!/usr/bin/env python3
"""look-fx-r2.py <dir> <out>: R2 sheets at the owner-picked 85 % (ink/soot/scar), whole face on the por-* pictures, placed by the GAME's own fit rows
(veil-fit square for muoi, scar-fit row for the scratch, flipped). dir needs p01.webp p30.webp (por-consort-c01/c30-t2-a26), veil-fit.json scar-fit.json, fx-muoi-1/2.png, fx-muoi-3-new.png, scar-N.png"""
import sys, os, json
from PIL import Image, ImageDraw, ImageFont
import numpy as np
D, OUT = sys.argv[1], sys.argv[2]; K = .85; PULL = .7; B0 = .165; RB = .47; WX = 1.08
vf = json.load(open(D + '/veil-fit.json')); sf = json.load(open(D + '/scar-fit.json'))
KEYS = {'c01': ('p01.webp', 'por-consort-c01-t2-a26.webp'), 'c30': ('p30.webp', 'por-consort-c30-t2-a26.webp')}
def skin(im, key):
    r = vf[key]; w, h = im.size
    x0 = int((r[0] + r[2] * .2) / 100 * w); x1 = int((r[0] + r[2] * .8) / 100 * w); y0 = int((r[1] + r[3] * .1) / 100 * h); y1 = int((r[1] + r[3] * .5) / 100 * h)
    return np.median(np.asarray(im.convert('RGB').crop((x0, y0, x1, y1))).reshape(-1, 3).astype(float), axis=0)
def tone(m, sk):
    a = np.asarray(m.convert('RGBA')).astype(float); p = (1 - K) * PULL
    a[..., :3] = a[..., :3] * (1 - p) + sk * p; a[..., 3] *= K
    return Image.fromarray(a.clip(0, 255).astype('uint8'), 'RGBA')
def veil_sq(base, key, mark):  # same formula as KIT_RASH.style
    r = vf[key]; w, h = base.size; W = r[2] * WX; H = W * (r[3] * 480) / (r[2] * 445)
    L = r[0] + r[2] / 2 - W / 2; T = r[1] + B0 * r[3] - RB * H
    m = mark.resize((int(W / 100 * w), int(H / 100 * h)), Image.LANCZOS).rotate(-r[4], resample=Image.BICUBIC, center=(W / 100 * w / 2, RB * H / 100 * h))
    base.alpha_composite(m, (int(L / 100 * w), int(T / 100 * h)))
def scar_box(base, key, mark, flip=True):  # KIT_SCAR.style: the row, origin 50% 50%, (new) scaleX(-1)
    r = sf[key]; w, h = base.size
    m = mark.resize((int(r[2] / 100 * w), int(r[3] / 100 * h)), Image.LANCZOS)
    if flip: m = m.transpose(Image.FLIP_LEFT_RIGHT)
    m = m.rotate(-r[4], resample=Image.BICUBIC)
    base.alpha_composite(m, (int(r[0] / 100 * w), int(r[1] / 100 * h)))
def font(n): return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', n)
def sheet(name, title, files, kind):
    S = Image.new('RGB', (384 * 3, 506 * 2 + 40), (30, 28, 34)); d = ImageDraw.Draw(S); d.text((10, 8), title, fill=(255, 255, 255), font=font(18))
    for ri, fk in enumerate(('c01', 'c30')):
        f, key = KEYS[fk]; base0 = Image.open(f'{D}/{f}').convert('RGBA'); sk = skin(base0, key)
        for ci in range(3):
            b = base0.copy(); mk = tone(Image.open(f'{D}/{files[ci]}'), sk)
            (veil_sq if kind == 'sq' else scar_box)(b, key, mk)
            S.paste(b.convert('RGB'), (ci * 384, 40 + ri * 506)); d.text((ci * 384 + 8, 44 + ri * 506), f'lv{ci+1}', fill=(255, 220, 120), font=font(20))
    S.save(f'{OUT}/{name}')
os.makedirs(OUT, exist_ok=True)
sheet('ladder-r2-muoi.png', 'MUOI 85 % (lv3 redone: powdery ash, no strokes)  c01 / c30  game veil-fit rows', ['fx-muoi-1.png', 'fx-muoi-2.png', 'fx-muoi-3-new.png'], 'sq')
sheet('ladder-r2-cao.png', 'CAO 85 %, flipped, game scar-fit rows (por rows = game size)  c01 / c30', ['scar-1.png', 'scar-2.png', 'scar-3.png'], 'scar')
