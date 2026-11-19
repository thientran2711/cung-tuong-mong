#!/usr/bin/env python3
"""composite_spread.py: check sheets for the place-mass rooms with the 4 test figures spread over the whole room,
like the game's 4-person layout on iPad (stage 1162x599, figure centres x = 193, 426, 660, 893 px, height 0.73 H, feet 0.92 H).
Room is cover-fit to the stage, bottom-anchored, centred horizontally (as the game draws it).

  python3 dev/art/place-redraw/composite_spread.py FIGDIR OUTDIR
FIGDIR holds fig-consort-c06-t1-a18.webp, fig-consort-c30-t1-a18.webp, fig-maid-m19-t1-a18.webp, fig-maid-m39-t1-a18.webp
(from https://ctm-img.victoria-tntt.workers.dev/img/). Writes OUTDIR/place-<first>-<last>-spread.jpg (rows: room alone | room + 4)."""
import os, sys
from PIL import Image, ImageDraw
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'img', '_review', 'place-mass'))
FIG = ['fig-consort-c06-t1-a18', 'fig-consort-c30-t1-a18', 'fig-maid-m19-t1-a18', 'fig-maid-m39-t1-a18']
W, H = 1162, 599
XS = [193, 426, 660, 893]
FH, FEET = 0.73, 0.92
SHEETS = [
    ['khon-ninh-cung', 'canh-phuc-cung', 'canh-phuc-cung-dong-phoi', 'canh-phuc-cung-tay-phoi'],
    ['chung-tu-cung', 'chung-tu-cung-dong-phoi', 'chung-tu-cung-tay-phoi', 'dien-huy-cung'],
    ['dien-huy-cung-dong-phoi', 'dien-huy-cung-tay-phoi', 'ham-an-cung', 'ham-an-cung-dong-phoi'],
    ['ham-an-cung-tay-phoi', 'khai-tuong-cung', 'khai-tuong-cung-dong-phoi', 'khai-tuong-cung-tay-phoi'],
    ['duong-tam-dien', 'tu-ninh-cung'],
    ['thua-minh-cung', 'thua-minh-cung-dong-phoi', 'thua-minh-cung-tay-phoi', 'truong-xuan-cung'],
    ['truong-xuan-cung-dong-phoi', 'truong-xuan-cung-tay-phoi', 'vinh-hoa-cung', 'vinh-hoa-cung-dong-phoi'],
    ['vinh-hoa-cung-tay-phoi', 'a-ca-so', 'cung-nhan', 'dong-cung'],
    ['ngu-thu-phong', 'phi-tan-cung', 'phong-cung-nu', 'tan-gia-kho', 'thai-y-vien'],
]

def stage(path):
    im = Image.open(path).convert('RGB')
    s = max(W / im.width, H / im.height)
    w, h = round(im.width * s), round(im.height * s)
    im = im.resize((w, h), Image.LANCZOS)
    x0 = (w - W) // 2
    return im.crop((x0, h - H, x0 + W, h))  # bottom-anchored

def main(figdir, outdir):
    figs = []
    for f in FIG:
        fg = Image.open(os.path.join(figdir, f + '.webp')).convert('RGBA'); fg = fg.crop(fg.getbbox())
        h = round(FH * H); figs.append(fg.resize((round(fg.width * h / fg.height), h), Image.LANCZOS))
    os.makedirs(outdir, exist_ok=True); outs = []
    G, LH = 10, 22
    for rooms in SHEETS:
        sheet = Image.new('RGB', (2 * W + 3 * G, len(rooms) * (H + LH + G) + G), (30, 30, 30)); d = ImageDraw.Draw(sheet)
        for i, r in enumerate(rooms):
            bg = stage(os.path.join(R, r + '-ha-sang.webp')); y = G + i * (H + LH + G)
            d.text((G, y + 5), r + '  (alone | with c06 c30 m19 m39 spread, iPad 4-person layout)', fill=(240, 240, 240))
            sheet.paste(bg, (G, y + LH))
            comp = bg.convert('RGBA')
            for fg, cx in zip(figs, XS):
                comp.alpha_composite(fg, (round(cx - fg.width / 2), round(FEET * H - fg.height)))
            sheet.paste(comp.convert('RGB'), (2 * G + W, y + LH))
        if sheet.width > 2600:
            sheet = sheet.resize((2600, round(sheet.height * 2600 / sheet.width)), Image.LANCZOS)
        out = os.path.join(outdir, f'place-{rooms[0]}-{rooms[-1]}-spread.jpg')
        sheet.save(out, quality=85); outs.append(out); print(out, sheet.size)
    return outs

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
