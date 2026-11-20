"""PR18 owner order (~01:50Z): GỐC | PASTEL SỐ | PASTEL VẼ figures staged (nf_tags.py numbers) on ONE background (tẩm cung hạ sáng), 0 cr.
python3 sheet_bg.py BG OUT 'place text' sA,sB,... ORIGDIR DIGDIR CUTDIR"""
import sys, os, json, subprocess, tempfile
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__)); NF = os.path.join(HERE, '..', '..', 'place-rank', 'stage_exact', 'nf_tags.py')
bg, out, place, ids, od, dd, cd = sys.argv[1:8]; ids = ids.split(',')
HX = json.load(open(os.path.join(HERE, 'pastel_hexes.json')))
GROUP = lambda s: 'Lạnh lùng' if int(s[1:]) <= 50 else 'Kiêu kỳ' if int(s[1:]) <= 55 else 'Quyến rũ'
F = '/usr/share/fonts/truetype/dejavu/'; BG = (250, 244, 232); RED = (122, 30, 22)
def font(n, b=True): return ImageFont.truetype(F + ('DejaVuSans-Bold.ttf' if b else 'DejaVuSans.ttf'), n)
ROWS = [('GỐC', od, lambda s: (f'{s} · gốc', f"{HX[s]['main'][1]} + {HX[s]['sec'][1]}", 'GỐC')),
        ('PASTEL SỐ (digital)', dd, lambda s: (f'{s} · pastel số', 'robe_pastel.py', 'PASTEL SỐ')),
        ('PASTEL VẼ (Magnific)', cd, lambda s: (f'{s} · mã pastel vẽ', f"{HX[s]['main'][2]} + {HX[s]['sec'][2]}", 'PASTEL VẼ'))]
blocks = []
for name, d, tag in ROWS:
    tmp = tempfile.mktemp(suffix='.jpg')
    subprocess.run([sys.executable, NF, bg, tmp, ','.join(os.path.join(d, s + '.png') for s in ids), ';'.join('|'.join(tag(s)) for s in ids)], check=True, capture_output=True)
    st = Image.open(tmp).convert('RGB'); W = st.width
    hd = Image.new('RGB', (W, 96), BG); dr = ImageDraw.Draw(hd); dr.text((20, 48), f'{name} — {place}', font=font(52), fill=RED, anchor='lm')
    bd = Image.new('RGB', (W, 124), BG); dr = ImageDraw.Draw(bd)
    for cx, s in zip([168, 421, 654, 888], ids):
        dr.text((cx * 2, 46), GROUP(s), font=font(60), fill=(40, 28, 20), anchor='mm'); dr.text((cx * 2, 100), f'thiếu nữ · {s}', font=font(36, False), fill=(90, 70, 50), anchor='mm')
    blocks += [hd, st, bd, Image.new('RGB', (W, 20), (200, 181, 151))]
blocks = blocks[:-1]; O = Image.new('RGB', (blocks[0].width, sum(b.height for b in blocks)), BG); y = 0
for b in blocks: O.paste(b, (0, y)); y += b.height
O.save(out, quality=90); print(out, O.size)
