#!/usr/bin/env python3
"""Split each test figure into z-order LAYERS (Photoshop-style) from SAM masks.
usage: python3 make_layers.py <dir with full-size cut-outs c09.png c11.png c22.png>
Masks (Magnific images_segment / SAM 3.1, 35 cr each) are in masks/:
  <id>_hair.png ("her hair"), <id>_face.png ("her face, ears and neck skin"), c22_hands.png ("her two clasped hands").
Every layer = pixels of the SAME figure (so it is invisible on its own); it only matters when an item lies under it.
  face      : face/ears/neck skin                      -> hides far earrings
  fronthair : hair strands lying over the face (face mask closed by 44 px), alpha by darkness (thin strands half-see-through) -> over near earrings
  hairtop   : hair above the earlobe line               -> hides hairpin shafts (pin pushed INTO the hair)
  hands     : hands (SAM) + sleeve-cuff polygons (SAM could not isolate the cuffs: it returned the whole robe)
Output: layers/<id>_<layer>.webp (cropped) + layers/layers.json {id: {layer: [file, x, y]}}.
"""
import sys, os, json
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SRC = sys.argv[1]
D = os.path.dirname(os.path.abspath(__file__))
LOBE_Y = {'c09': 276, 'c11': 256, 'c22': 261}   # hairtop stops 30 px above the near earlobe
CUFFS = {'c22': [[(380, 800), (500, 800), (512, 924), (516, 960), (505, 1100), (487, 1260), (380, 1260)],
                 [(780, 800), (640, 800), (626, 924), (632, 1000), (650, 1120), (666, 1260), (780, 1260)]]}


def m(name):
    p = os.path.join(D, 'masks', name + '.png')
    return np.array(Image.open(p).convert('L')).astype(float) / 255 if os.path.exists(p) else None


def save(fig, alpha, fid, layer, out):
    a = np.clip(alpha, 0, 1) * np.array(fig.getchannel('A')).astype(float)
    im = fig.copy(); im.putalpha(Image.fromarray(a.astype('uint8')))
    bb = im.getchannel('A').point(lambda v: 255 if v > 3 else 0).getbbox()
    if not bb: return
    f = f'{fid}_{layer}.webp'
    im.crop(bb).save(os.path.join(D, 'layers', f), quality=92, method=6)
    out.setdefault(fid, {})[layer] = [f, bb[0], bb[1]]


out = {}
for fid in ['c09', 'c11', 'c22']:
    fig = Image.open(os.path.join(SRC, fid + '.png')).convert('RGBA')
    rgb = np.array(fig.convert('RGB')).astype(float)
    L = 0.3 * rgb[..., 0] + 0.59 * rgb[..., 1] + 0.11 * rgb[..., 2]
    H, F = m(fid + '_hair'), m(fid + '_face')
    save(fig, F, fid, 'face', out)
    # front hair = hair strands lying OVER the face: close the face mask (fills the gaps the strands cut into it)
    fm = Image.fromarray((F * 255).astype('uint8')).resize((256, 576))
    closed = fm.filter(ImageFilter.MaxFilter(11)).filter(ImageFilter.MinFilter(11)).resize(fig.size)
    inside = np.array(closed).astype(float) / 255
    dark = np.clip((205 - L) / 70, 0, 1)
    save(fig, H * inside * dark, fid, 'fronthair', out)
    top = np.zeros_like(H); top[:LOBE_Y[fid] - 30] = 1
    save(fig, H * top, fid, 'hairtop', out)
    hands = m(fid + '_hands')
    if hands is not None:
        cm = Image.new('L', fig.size, 0); d = ImageDraw.Draw(cm)
        for poly in CUFFS.get(fid, []): d.polygon(poly, fill=255)
        cuffs = np.array(cm.filter(ImageFilter.GaussianBlur(0.8))).astype(float) / 255
        save(fig, np.maximum(hands, cuffs), fid, 'hands', out)
os.makedirs(os.path.join(D, 'layers'), exist_ok=True)
json.dump(out, open(os.path.join(D, 'layers', 'layers.json'), 'w'), indent=1)
print(json.dumps(out))
