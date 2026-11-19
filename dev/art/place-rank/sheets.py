#!/usr/bin/env python3
"""place-rank SAMPLE sheets (owner Lượt 447).
  python3 dev/art/place-rank/sheets.py FIGDIR OUTDIR
A = Cảnh Phúc 3x2 (rows Tần/Phi/Quý phi, cols bedroom/reception); B = phối pair + Khôn Ninh pair (2x2);
plus the 4-figure spread composite on the Quý phi bedroom (reuses dev/art/place-redraw/composite_spread.py)."""
import os, sys
from PIL import Image, ImageDraw, ImageFont
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'place-redraw'))
import composite_spread as cs
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'img', '_review', 'place-rank'))
F = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 34)
CW, CH, G, LH = 1000, 516, 12, 50

def grid(rows, out):
    cols = len(rows[0])
    sh = Image.new('RGB', (cols * CW + (cols + 1) * G, len(rows) * (CH + LH + G) + G), (28, 26, 24)); d = ImageDraw.Draw(sh)
    for r, row in enumerate(rows):
        for c, (key, label) in enumerate(row):
            x, y = G + c * (CW + G), G + r * (CH + LH + G)
            d.text((x + 4, y + 6), label, font=F, fill=(245, 235, 215))
            sh.paste(Image.open(os.path.join(R, key + '-ha-sang.webp')).convert('RGB').resize((CW, CH), Image.LANCZOS), (x, y + LH))
    sh.save(out, quality=86); print(out, sh.size)

def main(figdir, outdir):
    os.makedirs(outdir, exist_ok=True)
    grid([[(f'canh-phuc-cung-{k}-ngu', f'{v} · phòng ngủ'), (f'canh-phuc-cung-{k}', f'{v} · phòng tiếp khách')]
          for k, v in [('tan', 'Tần'), ('phi', 'Phi'), ('quyphi', 'Quý phi')]], os.path.join(outdir, 'place-rank-A-canh-phuc.jpg'))
    grid([[('thua-minh-cung-dong-phoi-ngu', 'Quý nhân (phối) · phòng ngủ'), ('thua-minh-cung-dong-phoi', 'Quý nhân (phối) · phòng tiếp khách')],
          [('khon-ninh-cung-ngu', 'Hoàng hậu · phòng ngủ'), ('khon-ninh-cung', 'Hoàng hậu · phòng tiếp khách')]],
         os.path.join(outdir, 'place-rank-B-phoi-khon-ninh.jpg'))
    cs.R, cs.SHEETS = R, [['canh-phuc-cung-quyphi-ngu']]
    cs.main(figdir, outdir)

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
