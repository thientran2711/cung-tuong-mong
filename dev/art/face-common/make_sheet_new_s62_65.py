#!/usr/bin/env python3
"""F4 / ROOT-66 (owner GO Lượt 1045): sheet of the 4 NEW faces s62 s63 s64 (Dịu dàng) + s65 (Đoan trang) — full figure + face zoom + root
swatches, big labels on the image (A27: "sNN · group · MẶT MỚI · thử khuôn"). Usage: python3 make_sheet_new_s62_65.py <dir with s62.png … s65.png cut-outs>"""
import sys, os, json
from PIL import Image, ImageDraw, ImageFont
D = os.path.dirname(os.path.abspath(__file__)); R = os.path.abspath(os.path.join(D, '..', '..', '..'))
src = open(os.path.join(D, 'face_page', 'crop.py')).read(); src = src[:src.index('out=sys.argv[1]')]
NS = {}; exec(src, NS); face = NS['face']; BG = NS['BG']
cut = sys.argv[1]; SR = json.load(open(os.path.join(D, 's_root_colours.json')))
F = lambda s, b=False: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf' % ('-Bold' if b else ''), s)
P = [('s62', 'Dịu dàng', 'chuông gió'), ('s63', 'Dịu dàng', 'thỏ nâu'), ('s64', 'Dịu dàng', 'chùm nhót vàng'), ('s65', 'Đoan trang', 'chuỗi hạt trầm')]
SEA = {'xuan': 'Xuân', 'ha': 'Hạ', 'thu': 'Thu', 'dong': 'Đông'}
CW, FH, ZH, HH = 460, 1000, 520, 120
sh = Image.new('RGB', (CW * 4 + 60, 110 + HH + FH + ZH + 130), (250, 247, 241)); dr = ImageDraw.Draw(sh)
dr.text((12, 10), 'MẶT MỚI · thử khuôn — 4 người mới → đủ 90', fill=(30, 30, 30), font=F(46, True))
dr.text((12, 66), 'khối Dịu dàng / Đoan trang v5 lần đầu được vẽ · chưa đổi FACE_CUTS, chờ chủ duyệt', fill=(150, 30, 50), font=F(26, True))
for i, (sid, grp, item) in enumerate(P):
    x = i * (CW + 20); y = 110; r = SR[sid]; col = (60, 110, 160) if grp == 'Dịu dàng' else (110, 70, 40)
    dr.rectangle((x, y, x + CW, y + HH - 6), fill=col)
    dr.text((x + 12, y + 8), f'{sid} · {grp}', fill='white', font=F(40, True))
    dr.text((x + 12, y + 62), 'MẶT MỚI · thử khuôn', fill='white', font=F(32, True)); y += HH
    im = Image.open(os.path.join(cut, sid + '.png')).convert('RGBA'); fig = im.crop(im.split()[3].getbbox())
    sc = min((CW - 10) / fig.width, (FH - 10) / fig.height); fig = fig.resize((int(fig.width * sc), int(fig.height * sc)), Image.LANCZOS)
    t = Image.new('RGB', (CW, FH), BG); t.paste(fig, ((CW - fig.width) // 2, FH - 5 - fig.height), fig); sh.paste(t, (x, y)); y += FH
    sh.paste(face(os.path.join(cut, sid + '.png')).resize((CW, ZH)), (x, y)); y += ZH + 8
    for j, (n, h) in enumerate(((r['main'], r['main_hex']), (r['sec'], r['sec_hex']))):
        yy = y + j * 36; dr.rectangle((x + 8, yy, x + 38, yy + 30), fill=h, outline=(60, 60, 60)); dr.text((x + 48, yy + 2), f'{n} {h}', fill=(30, 30, 30), font=F(22, True))
    dr.text((x + 8, y + 74), f'gốc {SEA[r["root_season"]]} · cầm {item}', fill=(80, 80, 80), font=F(22))
out = os.path.join(R, 'dev/handover/review-sheets/new-faces-v4/new_s62_65_F4.jpg'); sh.save(out, quality=86); print(out, sh.size)
