"""Swatch sheets for palettes3.json -> dev/handover/review-sheets/palettes3/palettes3_sheetN.png
Rows = people, columns = Màu gốc | Thiên lạnh | Thiên ấm (main big + secondary swatch, names + hex)."""
import json, os
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
d = json.load(open(os.path.join(ROOT, 'dev/art/face-common/palettes3.json')))
ids = [k for k in d if not k.startswith('_') and k != 'status']
OUT = os.path.join(ROOT, 'dev/handover/review-sheets/palettes3'); os.makedirs(OUT, exist_ok=True)
F = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'; FB = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
f_name, f_hex, f_id, f_head = ImageFont.truetype(F, 21), ImageFont.truetype(F, 18), ImageFont.truetype(FB, 30), ImageFont.truetype(FB, 32)
BG, INK, SUB = (250, 248, 244), (40, 36, 34), (110, 104, 98)
IDW, COLW, ROWH, HEAD = 92, 336, 182, 120
W = IDW + 3 * COLW + 10
CHUNKS = [ids[0:29], ids[29:58], ids[58:]]
HEADS = ['Màu gốc', 'Thiên lạnh', 'Thiên ấm']

def fit(dr, text, font, w):
    while dr.textlength(text, font=font) > w and len(text) > 3: text = text[:-2] + '…' if not text.endswith('…') else text[:-2] + '…'
    return text

for n, chunk in enumerate(CHUNKS, 1):
    H = HEAD + ROWH * len(chunk) + 40
    im = Image.new('RGB', (W, H), BG); dr = ImageDraw.Draw(im)
    dr.text((14, 12), f'Bảng 3 phối màu (B20, Lượt 614) — tờ {n}/3: {chunk[0]}–{chunk[-1]}', font=f_name, fill=SUB)
    for i, h in enumerate(HEADS):
        x = IDW + i * COLW
        dr.text((x + 10, 54), h, font=f_head, fill=INK)
    dr.line([(0, HEAD - 6), (W, HEAD - 6)], fill=(180, 172, 164), width=2)
    for r, k in enumerate(chunk):
        y = HEAD + r * ROWH
        if r % 2: dr.rectangle([0, y, W, y + ROWH], fill=(242, 239, 233))
        dr.text((12, y + 60), k, font=f_id, fill=INK)
        for i, P in enumerate(('P1', 'P2', 'P3')):
            p = d[k][P]; x = IDW + i * COLW + 8
            dr.rectangle([x, y + 10, x + 200, y + 100], fill=p['main_hex'])           # main (big)
            dr.rectangle([x + 200, y + 10, x + 312, y + 100], fill=p['sec_hex'])      # secondary
            dr.rectangle([x, y + 10, x + 312, y + 100], outline=(150, 142, 134), width=1)
            dr.text((x, y + 106), fit(dr, 'C: ' + p['main'], f_name, 316), font=f_name, fill=INK)
            dr.text((x, y + 132), fit(dr, 'P: ' + p['sec'], f_name, 316), font=f_name, fill=INK)
            dr.text((x, y + 157), f"{p['main_hex']} · {p['sec_hex']}", font=f_hex, fill=SUB)
        dr.line([(0, y + ROWH), (W, y + ROWH)], fill=(214, 208, 200), width=1)
    for i in range(1, 3):
        x = IDW + i * COLW; dr.line([(x, HEAD - 6), (x, H)], fill=(200, 192, 184), width=2)
    dr.text((14, H - 22), 'C = màu chính · P = màu phụ', font=f_hex, fill=SUB)
    path = os.path.join(OUT, f'palettes3_sheet{n}.jpg'); q = 82
    while True:   # CLONE_RULE: review sheets = JPG <= 600 KB
        im.save(path, quality=q, optimize=True)
        if os.path.getsize(path) <= 600 * 1024 or q <= 50: break
        q -= 6
    print(path, im.size, q, os.path.getsize(path) // 1024, 'KB')
