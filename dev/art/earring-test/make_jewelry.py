#!/usr/bin/env python3
"""EAR2: prepare bangle / necklace / phi bạch sprites from the gpt-2-6 gens (bg removed) in sprites/.
  bangle_src.png  (gen bxMcu0g5Y2 -> bg cut tCRNogAmZJ): split at the ellipse's long axis ->
      bangle_back.webp (upper arc = the far side, goes UNDER the hand/wrist layer) + bangle_front.webp (lower arc, ABOVE the hand).
  necklace_src.png (gen Lw8dkBzswO -> bg cut cpSLnHG0eP): chain (stretched per neck) + pendant (true proportions); in the page it is CLIPPED to the neck-skin mask
      (layers/<id>_skin.png), so every part outside the skin (under both cross-collar edges, under hair) disappears.
  phibach_src.png (gen Lw8dko8swO, white bg): colour-to-alpha against white (sheer gauze keeps its see-through),
      then cut in 3 pieces in sprite coords: back (top arc, behind body+hair), sides (over the upper arms/sleeves,
      fading in at the shoulder so it reads as cloth coming round the arm), swag (middle loops, under the hands layer).
"""
import os, numpy as np
from PIL import Image
D = os.path.dirname(os.path.abspath(__file__)); S = os.path.join(D, 'sprites')

b = Image.open(os.path.join(S, 'bangle_src.png')).convert('RGBA'); W, H = b.size; cy = H // 2
for name, box in (('back', (0, 0, W, cy)), ('front', (0, cy, W, H))):
    im = Image.new('RGBA', (W, H)); im.paste(b.crop(box), box[:2])
    im.resize((360, round(360 * H / W)), Image.LANCZOS).save(os.path.join(S, f'bangle_{name}.webp'), quality=90, method=6)
n = Image.open(os.path.join(S, 'necklace_src.png')).convert('RGBA')   # 995x949
PB = (448, 745, 552, 949)            # pendant (gold flower + jade drop): kept at its own proportions in the page
n.crop(PB).resize((208, 408), Image.LANCZOS).save(os.path.join(S, 'necklace_pendant.webp'), quality=92, method=6)
ch = n.copy(); ch.paste((0, 0, 0, 0), PB)   # chain only: stretched to each neck
ch.resize((420, round(420 * n.height / n.width)), Image.LANCZOS).save(os.path.join(S, 'necklace.webp'), quality=92, method=6)

p = np.array(Image.open(os.path.join(S, 'phibach_src.png')).convert('RGB')).astype(float)
a = (255 - p.min(2)) / 255                      # colour-to-alpha vs white
a = np.clip(a * 2.4, 0, 0.82)                   # boost: pale veil that still shows the robe through it
a[a < 0.03] = 0
c = np.clip((p - (1 - a[..., None]) * 255) / np.maximum(a, 1e-3)[..., None], 0, 255)
h, w = a.shape; yy = np.arange(h)[:, None] * np.ones((1, w)); xx = np.ones((h, 1)) * np.arange(w)[None, :]
swag = (xx > 205) & (xx < 545) & (yy > 300) & (yy < 540)
fade = np.clip((yy - 110) / 90, 0, 1)            # 0 above the shoulder line, 1 below
parts = {'back': (1 - fade) * (~swag), 'sides': fade * (~swag), 'swag': swag * 1.0}
for k, m in parts.items():
    Image.fromarray(np.dstack([c, a * m * 255]).astype('uint8'), 'RGBA').save(os.path.join(S, f'phibach_{k}.webp'), quality=88, method=6)
print('ok', b.size, (w, h))
