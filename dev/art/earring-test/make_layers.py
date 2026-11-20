#!/usr/bin/env python3
"""Split each test figure into z-order LAYERS (Photoshop-style) from SAM masks.
usage: python3 make_layers.py <dir with full-size cut-outs c09.png c11.png c22.png>
Masks (Magnific images_segment / SAM 3.1, 35 cr each) are in masks/:
  <id>_hair.png ("her hair"), <id>_face.png ("her face, ears and neck skin"), c22_hands.png ("her two clasped hands").
Every layer = pixels of the SAME figure (so it is invisible on its own); it only matters when an item lies under it.
  face      : face/ears/neck skin                      -> hides far earrings
  fronthair : hair strands lying over the face (face mask closed by 44 px), alpha by darkness (thin strands half-see-through) -> over near earrings
  hairtop   : hair above the earlobe line               -> hides hairpin shafts (pin pushed INTO the hair)
  hairneck  : hair beside the neck/shoulders (lobe+10 .. lobe+320), alpha by darkness -> over the necklace
  hands     : hands (SAM) + sleeve-cuff polygons (SAM could not isolate the cuffs: it returned the whole robe)
  wcuffs    : (EAR2) the sleeve edge right next to each bangle wrist, minus the hand -> lies over the bangle's end so it wraps the wrist
  skin      : (EAR2) the face/neck-skin mask as an alpha PNG; the page CLIPS the necklace to it (= under both collar edges + hair)
  hairlong  : (EAR2, c22) hair below y 360 -> long hair falls OVER the phi bach on the shoulders
c09 = NEW cut UPvIb4owny (owner-approved hand fix, 20/11); its left (lowered) hand was missed by SAM ("her two hands" gave only
the lantern hand; a point prompt was refused) -> added by a skin-colour threshold in a box, union into masks/c09_hands.png.
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

WCUFFS = {'c09': [[(240, 1015), (325, 1015), (325, 1050), (290, 1053), (276, 1057), (262, 1063), (248, 1072)],  # sleeve edge right on the cloth line
                  [(640, 720), (703, 720), (701, 830), (640, 830)]],
          'c11': [[(652, 780), (740, 780), (740, 890), (655, 890)]],
          'c22': [[(420, 790), (498, 790), (496, 900), (420, 900)],
                  [(652, 830), (740, 830), (740, 940), (672, 940), (668, 900), (655, 850)]]}


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
    band = np.zeros_like(H); band[LOBE_Y[fid] + 10:LOBE_Y[fid] + 320] = 1
    save(fig, H * band * dark, fid, 'hairneck', out)   # hair falling beside the neck/shoulders -> over the necklace
    top = np.zeros_like(H); top[:LOBE_Y[fid] - 30] = 1
    save(fig, H * top, fid, 'hairtop', out)
    hands = m(fid + '_hands')
    if hands is not None:
        cm = Image.new('L', fig.size, 0); d = ImageDraw.Draw(cm)
        for poly in CUFFS.get(fid, []): d.polygon(poly, fill=255)
        cuffs = np.array(cm.filter(ImageFilter.GaussianBlur(0.8))).astype(float) / 255
        save(fig, np.maximum(hands, cuffs), fid, 'hands', out)
        wm = Image.new('L', fig.size, 0); d = ImageDraw.Draw(wm)
        for poly in WCUFFS.get(fid, []): d.polygon(poly, fill=255)
        wc = np.array(wm.filter(ImageFilter.GaussianBlur(0.8))).astype(float) / 255
        save(fig, wc * (1 - hands), fid, 'wcuffs', out)
    # skin clip for the necklace (alpha only; colour irrelevant), feathered 1 px
    sk = Image.fromarray((F * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.7))
    bb = sk.getbbox(); skin = Image.new('RGBA', fig.size, (0, 0, 0, 0)); skin.putalpha(sk)
    skin.crop(bb).save(os.path.join(D, 'layers', f'{fid}_skin.png'), optimize=True)
    out[fid]['skin'] = [f'{fid}_skin.png', bb[0], bb[1]]
    if fid == 'c22':
        low = np.zeros_like(H); low[360:] = 1
        save(fig, H * low, fid, 'hairlong', out)
os.makedirs(os.path.join(D, 'layers'), exist_ok=True)
json.dump(out, open(os.path.join(D, 'layers', 'layers.json'), 'w'), indent=1)
print(json.dumps(out))
