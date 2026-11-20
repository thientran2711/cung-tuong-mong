"""PR18 L867: 3-row sheet = nf840 -lbl sheet (GỐC | PASTEL số) + row 3 PASTEL VẼ (Magnific cut-outs staged with nf_tags.py, same room/numbers).
python3 sheet3.py LBL_JPG ROOM_IMG OUT 'header text' sA,sB,sC,sD CUTDIR   (CUTDIR/sNN.png = Magnific pastel cut-outs)"""
import sys, os, json, subprocess, tempfile
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__)); NF = os.path.join(HERE, '..', '..', 'place-rank', 'stage_exact', 'nf_tags.py')
lbl, room, out, head, ids, cut = sys.argv[1:7]; ids = ids.split(',')
HX = json.load(open(os.path.join(HERE, 'pastel_hexes.json')))
GROUP = lambda s: 'Lạnh lùng' if int(s[1:]) <= 50 else 'Kiêu kỳ' if int(s[1:]) <= 55 else 'Quyến rũ'
F = '/usr/share/fonts/truetype/dejavu/'
tags = ';'.join(f"{s} · mã pastel vẽ|{HX[s]['main'][2]} + {HX[s]['sec'][2]}|PASTEL VẼ" for s in ids)
tmp = tempfile.mktemp(suffix='.jpg')
subprocess.run([sys.executable, NF, room, tmp, ','.join(os.path.join(cut, s + '.png') for s in ids), tags], check=True, capture_output=True)
st = Image.open(tmp).convert('RGB'); W = st.width
A = Image.open(lbl).convert('RGB'); BG = (250, 244, 232); RED = (122, 30, 22)
def header(t):
    hd = Image.new('RGB', (W, 96), BG); d = ImageDraw.Draw(hd); sz = 52
    while True:
        fh = ImageFont.truetype(F + 'DejaVuSans-Bold.ttf', sz)
        if d.textlength(t, font=fh) <= W - 40 or sz <= 30: break
        sz -= 2
    d.text((20, 48), t, font=fh, fill=RED, anchor='lm'); return hd
hd = header(head); A.paste(header('PASTEL SỐ (digital) — ' + head.split(' — ', 1)[1]), (0, 1438))
bd = Image.new('RGB', (W, 124), BG); d = ImageDraw.Draw(bd)
fg = ImageFont.truetype(F + 'DejaVuSans-Bold.ttf', 60); fs = ImageFont.truetype(F + 'DejaVuSans.ttf', 36)
for cx, s in zip([168, 421, 654, 888], ids):
    d.text((cx * 2, 46), GROUP(s), font=fg, fill=(40, 28, 20), anchor='mm'); d.text((cx * 2, 100), f'thiếu nữ · {s}', font=fs, fill=(90, 70, 50), anchor='mm')
sep = Image.new('RGB', (W, 20), (200, 181, 151))
O = Image.new('RGB', (W, A.height + 20 + 96 + st.height + 124), BG)
O.paste(A, (0, 0)); O.paste(sep, (0, A.height)); y = A.height + 20
for p in (hd, st, bd): O.paste(p, (0, y)); y += p.height
O.save(out, quality=90); print(out, O.size)
