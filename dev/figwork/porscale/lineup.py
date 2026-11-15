#!/usr/bin/env python3
"""porscale/lineup.py: two rows of the same people side by side — BEFORE row, AFTER row — to see the jump when switching person to person.
usage: python3 lineup.py <plan.json> <before dir> <after dir> <out.jpg> <title> @names.txt|names..."""
import sys, os, json
from PIL import Image, ImageDraw, ImageFont
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sheet import cell, CW, CH
from groups import group
pj, bd, ad, out, title = sys.argv[1:6]; names = []
for a in sys.argv[6:]: names += [l.strip() for l in open(a[1:]) if l.strip()] if a.startswith('@') else [a]
Gs = json.load(open(pj))['groups']
f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 15)
sh = Image.new('RGB', (len(names) * (CW + 2) + 90, 2 * CH + 50), (250, 246, 238)); d = ImageDraw.Draw(sh)
d.text((8, 4), title, fill=(40, 25, 15), font=f)
for r, lab in enumerate(('BEFORE', 'AFTER')):
    y = 26 + r * (CH + 10); d.text((8, y + CH // 2), lab, fill=(40, 25, 15), font=f)
    for i, n in enumerate(names):
        p = os.path.join(ad if r else bd, n + '.webp')
        if not os.path.exists(p): p = os.path.join(bd, n + '.webp')
        sh.paste(cell(p, group(n), Gs), (88 + i * (CW + 2), y))
sh.save(out, quality=82); print(out, sh.size)
