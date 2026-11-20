#!/usr/bin/env python3
"""Occluders for the try-on demo: pieces of the SAME figure drawn above the items.
usage: python3 make_occ.py <dir with c09.png c22.png = full-size 1024x2304 cut-outs (Magnific xSBWFuTjfW, rgXY1yHxtc)>
- c22_occ_hands.png (x380,y760): hand skin (colour threshold inside the hand box, grown 2 px) + polygons along the
  inner edges of both sleeve cuffs -> cords run under the hands, items pass behind the cuffs.
- c09_occ_cheek.png (x530,y220): far-side cheek/jaw skin (opaque) + hair strands (alpha from darkness, max 0.9)
  -> the far earring is half behind the cheek, strands cross it.
"""
import sys, os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
SRC = sys.argv[1]
D = os.path.dirname(os.path.abspath(__file__))


def save(fig, box, mask, name):
    im = Image.open(os.path.join(SRC, fig + '.png')).convert('RGBA').crop(box)
    a = np.array(im.getchannel('A')).astype(float) * (np.asarray(mask, dtype=float) / 255)
    im.putalpha(Image.fromarray(a.astype('uint8')))
    im.save(os.path.join(D, name))


# c22 hands + cuffs
box = (380, 760, 780, 1260)
im = np.array(Image.open(os.path.join(SRC, 'c22.png')).convert('RGB').crop(box)).astype(int)
R, G, B = im[..., 0], im[..., 1], im[..., 2]
skin = (G > 175) & (R > 215) & (B > 160) & (R - B < 70)
hz = Image.new('L', (400, 500), 0)
ImageDraw.Draw(hz).rectangle((487 - 380 - 5, 0, 659 - 380 + 10, 924 - 760 + 8), fill=255)
m = Image.fromarray(((skin * 255).astype('uint8')) & np.array(hz))
m = m.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(3))
d = ImageDraw.Draw(m)
left = [(380, 800), (500, 800), (512, 924), (516, 960), (505, 1100), (487, 1260), (380, 1260)]
right = [(780, 800), (640, 800), (626, 924), (632, 1000), (650, 1120), (666, 1260), (780, 1260)]
for poly in (left, right):
    d.polygon([(x - 380, y - 760) for x, y in poly], fill=255)
save('c22', box, m.filter(ImageFilter.GaussianBlur(0.8)), 'c22_occ_hands.png')

# c09 far cheek + hair strands
box = (530, 220, 640, 380)
fig = Image.open(os.path.join(SRC, 'c09.png')).convert('RGBA').crop(box)
rgb = np.array(fig.convert('RGB')).astype(float)
R, G, B = rgb[..., 0], rgb[..., 1], rgb[..., 2]
L = 0.3 * R + 0.59 * G + 0.11 * B
sk = ((G > 180) & (R > 225) & (R - B < 60)).astype('uint8') * 255
sk = np.array(Image.fromarray(sk).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3))
              .filter(ImageFilter.GaussianBlur(0.7))).astype(float) / 255
hair = np.clip((190 - L) / 90, 0, 1) * 0.9
save('c09', box, np.maximum(sk, hair) * 255, 'c09_occ_cheek.png')
print('ok')
