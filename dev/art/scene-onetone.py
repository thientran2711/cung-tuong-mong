#!/usr/bin/env python3
"""scene-onetone.py — LUẬT SỬA CẢ NHÓM for the paintings themselves (review/place-colour).
The stage code adds no brown any more (dev/test/place-colour.js: 0 sepia, 0 stacked filters), but some graded paintings are painted almost
one-tone: every pixel the same warm hue (Ngọc Thanh các trưa = owner 17:24Z "her room at trưa all brown").
Measures every graded scene painting <scene>-<season>-<buổi>.webp (10 scenes × 4 × 4):
  cast  = |mean(a*,b*)| / mean(|(a*,b*)|)   (1.0 = the whole picture one hue, like a sepia print)
  spread = mean distance of (a*,b*) from the mean (colour variety)
and flags a DAY painting one-tone when cast >= .95 and spread < 7.5 and spread < .7 × its sáng sibling (chiều golden hour is reported,
not flagged: warm is intended there). For each flagged painting it writes a re-grade (Lab colour transfer from the sáng sibling + a
little warmth; luminance untouched; see regrade()) and a before/after sheet. NOTHING is uploaded: the CDN images are
owner-approved art (coordinator decides; upload = python3 dev/site/cdn_sync.py <files>).
usage: python3 dev/art/scene-onetone.py <dir with img__<name>.webp (Playwright cache .ahcache/img)> <outdir>"""
import sys, os, json, glob
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from skimage import color

SRC, OUT = sys.argv[1], sys.argv[2]; os.makedirs(OUT, exist_ok=True)
SC = ['duong-tam-dien', 'khon-ninh-cung', 'kinh-su-phong', 'lanh-cung', 'ngu-hoa-vien', 'ngu-thu-phong', 'phi-tan-cung', 'tam-cung-dem',
      'thai-y-vien', 'tu-ninh-cung', 'tan-gia-kho', 'phong-cung-nu']
SE = ['xuan', 'ha', 'thu', 'dong']; BU = ['sang', 'trua', 'chieu', 'toi']

def load(n, small=True):
    p = f'{SRC}/img__{n}.webp'
    if not os.path.exists(p): return None
    im = Image.open(p).convert('RGB')
    if small: im = im.resize((im.width // 4, im.height // 4))
    return im

def meas(im):
    lab = color.rgb2lab(np.asarray(im) / 255.0); A, B = lab[..., 1], lab[..., 2]
    ma, mb = A.mean(), B.mean()
    return dict(cast=round(float(np.hypot(ma, mb) / np.hypot(A, B).mean()), 3), spread=round(float(np.hypot(A - ma, B - mb).mean()), 2),
                a=round(float(ma), 2), b=round(float(mb), 2), L=round(float(lab[..., 0].mean()), 1))

def regrade(im, m, ref, sib=None):
    """v2 (review/place-art, coordinator-approved art fix): per-channel Lab colour transfer from the sáng sibling (same room, same
    composition): a* and b* get the sibling's mean (+1.5 b* = a touch of noon warmth) and 0.9 × its spread (std, scale capped ×2.4);
    L* untouched (trưa stays the brightest buổi). v1 (spread ×≤2.2 around a mean only halfway to the sibling) left them pink-brown."""
    lab = color.rgb2lab(np.asarray(im) / 255.0)
    if sib is None:
        s = min(2.2, max(1.0, 0.8 * ref['spread'] / max(m['spread'], .1)))
        ta, tb = (m['a'] + ref['a']) / 2, (m['b'] + ref['b']) / 2 + 1.5
        lab[..., 1] = (lab[..., 1] - m['a']) * s + ta; lab[..., 2] = (lab[..., 2] - m['b']) * s + tb
    else:
        sl = color.rgb2lab(np.asarray(sib) / 255.0); s = 0
        for c in (1, 2):
            mc, sc = lab[..., c].mean(), lab[..., c].std(); k = min(2.4, max(1.0, .9 * sl[..., c].std() / max(sc, .1))); s = max(s, k)
            lab[..., c] = (lab[..., c] - mc) * k + sl[..., c].mean() + (1.5 if c == 2 else 0)
    out = np.clip(color.lab2rgb(lab), 0, 1)
    return Image.fromarray((out * 255 + .5).astype(np.uint8)), s

R = {}; flagged = []
for sc in SC:
    for se in SE:
        ref = None
        for bu in BU:
            n = f'{sc}-{se}-{bu}'; im = load(n)
            if im is None: continue
            m = meas(im); R[n] = m
            if bu == 'sang': ref = m
            if bu in ('trua',) and ref and m['cast'] >= .95 and m['spread'] < 7.5 and m['spread'] < .7 * ref['spread']:
                flagged.append((n, m, ref))
json.dump(R, open(f'{OUT}/measure.json', 'w'), indent=0)
with open(f'{OUT}/report.txt', 'w') as f:
    f.write('painting                      cast  spread   (sáng sibling cast/spread)\n')
    for n, m in R.items():
        sib = R.get(n.rsplit('-', 1)[0] + '-sang', {})
        tag = ' <- ONE-TONE (flagged)' if any(x[0] == n for x in flagged) else (' (chiều: warm, not flagged)' if n.endswith('chieu') and m['cast'] >= .97 and m['spread'] < 6 else '')
        f.write(f"{n:30}{m['cast']:.2f}  {m['spread']:5.1f}   ({sib.get('cast', 0):.2f}/{sib.get('spread', 0):.1f}){tag}\n")
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'; fnt = ImageFont.truetype(FONT, 12) if os.path.exists(FONT) else None
tw = 210; rows = []
for n, m, ref in flagged:
    big = load(n, small=False); fixed, s = regrade(big, m, ref, load(n.rsplit('-', 1)[0] + '-sang', small=False)); fixed.save(f'{OUT}/{n}.webp', quality=88)
    fm = meas(fixed.resize((fixed.width // 4, fixed.height // 4)))
    sib = load(n.rsplit('-', 1)[0] + '-sang'); cells = [sib, load(n), fixed.resize((fixed.width // 4, fixed.height // 4))]
    rows.append((n, cells, f"sáng {ref['spread']:.1f} | now {m['spread']:.1f} cast {m['cast']:.2f} | proposed {fm['spread']:.1f} cast {fm['cast']:.2f} (×{s:.2f})"))
if rows:
    th = int(tw * rows[0][1][0].height / rows[0][1][0].width)
    sh = Image.new('RGB', (3 * tw + 8, len(rows) * (th + 18) + 4), (250, 246, 236)); dr = ImageDraw.Draw(sh)
    for i, (n, cells, txt) in enumerate(rows):
        for j, c in enumerate(cells):
            c = c.copy(); c.thumbnail((tw - 4, th)); sh.paste(c, (2 + j * tw, 2 + i * (th + 18)))
        dr.text((4, i * (th + 18) + th + 3), f'{n}: {txt}', fill=(60, 40, 20), font=fnt)
    sh.save(f'{OUT}/onetone-sheet.jpg', quality=82)
print(len(R), 'paintings measured,', len(flagged), 'one-tone trưa flagged:', ', '.join(x[0] for x in flagged))
