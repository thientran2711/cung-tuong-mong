#!/usr/bin/env python3
"""porscale/sheet.py: before | after contact sheet. Guide lines = the group's target forehead and chin rows (plan.json).
usage: python3 sheet.py <plan.json> <before dir> <after dir> <out.jpg> <title> name1 name2 ...   (names without .webp; '@file' = read names from a file)
An 'after' missing from <after dir> means the picture was already on target and is unchanged (shown with '=')."""
import sys, os, json
from PIL import Image, ImageDraw, ImageFont
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from groups import group
CW, CH = 132, 174
def cell(p, g, Gs):
    im = Image.open(p).convert('RGBA'); bg = Image.new('RGBA', im.size, (236, 226, 208, 255)); bg.alpha_composite(im)
    c = bg.convert('RGB').resize((CW, CH), Image.LANCZOS); d = ImageDraw.Draw(c)
    G = Gs.get(g)
    if G:
        for y in (G['ty'] - G['T'] / 2, G['ty'] + G['T'] / 2): d.line([(0, y * CH), (CW, y * CH)], fill=(200, 40, 40), width=1)
        d.line([(G['tx'] * CW, 0), (G['tx'] * CW, 8)], fill=(200, 40, 40), width=1)
    return c
def main():
    pj, bd, ad, out, title = sys.argv[1:6]; names = []
    for a in sys.argv[6:]: names += [l.strip() for l in open(a[1:])] if a.startswith('@') else [a]
    Gs = json.load(open(pj))['groups']
    f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 11); fb = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 16)
    per = 6; nr = (len(names) + per - 1) // per; PW = 2 * CW + 14
    sh = Image.new('RGB', (per * PW + 10, 40 + nr * (CH + 18)), (250, 246, 238)); d = ImageDraw.Draw(sh)
    d.text((8, 6), title, fill=(40, 25, 15), font=fb); d.text((8, 24), 'each pair: BEFORE | AFTER  (red lines = group target forehead / chin)', fill=(110, 90, 70), font=f)
    for i, n in enumerate(names):
        x, y = 8 + i % per * PW, 40 + i // per * (CH + 18); g = group(n)
        sh.paste(cell(os.path.join(bd, n + '.webp'), g, Gs), (x, y))
        a = os.path.join(ad, n + '.webp'); same = not os.path.exists(a)
        sh.paste(cell(a if not same else os.path.join(bd, n + '.webp'), g, Gs), (x + CW + 2, y))
        d.text((x, y + CH + 2), n[4:] + (' (unchanged)' if same else ''), fill=(40, 25, 15), font=f)
    sh.save(out, quality=82); print(out, sh.size)
if __name__ == '__main__': main()
