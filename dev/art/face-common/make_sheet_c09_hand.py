#!/usr/bin/env python3
"""F4 / ROOT-66 (owner 20/11 ~06:45Z c09 hand): sheet CŨ | MỚI for c09 (Tinh nghịch) — full figure + HAND zoom (lantern hand) + face zoom,
big labels on the image (A27). Usage: python3 make_sheet_c09_hand.py <dir with c09_old.png c09_new.png (cut-outs)>"""
import sys, os
from PIL import Image, ImageDraw, ImageFont
D = os.path.dirname(os.path.abspath(__file__)); R = os.path.abspath(os.path.join(D, '..', '..', '..'))
src = open(os.path.join(D, 'face_page', 'crop.py')).read(); src = src[:src.index('out=sys.argv[1]')]
NS = {}; exec(src, NS); face = NS['face']; BG = NS['BG']
cut = sys.argv[1]
F = lambda s, b=False: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf' % ('-Bold' if b else ''), s)
CW, FH, HZ, ZH, HH = 460, 1000, 380, 460, 80
# lantern hand box in the 1024x2304 picture (looked at full size)
COLS = [('c09_old.png', 'CŨ (hiện tại)', (110, 110, 110), (600, 600, 840, 790), 'tay cầm lồng đèn = tay PHẢI (sai)'),
        ('c09_new.png', 'MỚI · sửa tay', (40, 120, 60), (660, 670, 870, 835), 'tay TRÁI đúng, ngón cái ở trên')]
sh = Image.new('RGB', (CW * 2 + 20, 130 + HH + FH + HZ + ZH + 70), (250, 247, 241)); dr = ImageDraw.Draw(sh)
dr.text((12, 10), 'c09 · Tinh nghịch · tay cầm lồng đèn', fill=(30, 30, 30), font=F(40, True))
dr.text((12, 66), 'vẽ lại 1 lần: cùng prompt / seed / ảnh mẫu, chỉ thêm câu về tay', fill=(150, 30, 50), font=F(26, True))
for i, (fn, lab, col, box, note) in enumerate(COLS):
    x = i * (CW + 20); y = 130
    dr.rectangle((x, y, x + CW, y + HH - 6), fill=col); dr.text((x + 12, y + 14), 'c09 · ' + lab, fill='white', font=F(36, True)); y += HH
    im = Image.open(os.path.join(cut, fn)).convert('RGBA'); fig = im.crop(im.split()[3].getbbox())
    sc = min((CW - 10) / fig.width, (FH - 10) / fig.height); fig = fig.resize((int(fig.width * sc), int(fig.height * sc)), Image.LANCZOS)
    t = Image.new('RGB', (CW, FH), BG); t.paste(fig, ((CW - fig.width) // 2, FH - 5 - fig.height), fig); sh.paste(t, (x, y)); y += FH
    hz = Image.new('RGB', im.size, BG); hz.paste(im, (0, 0), im); hz = hz.crop(box)
    sc = min(CW / hz.width, (HZ - 40) / hz.height); hz = hz.resize((int(hz.width * sc), int(hz.height * sc)), Image.LANCZOS)
    t = Image.new('RGB', (CW, HZ), BG); t.paste(hz, ((CW - hz.width) // 2, 40)); sh.paste(t, (x, y))
    dr.text((x + 8, y + 4), note, fill=col, font=F(24, True)); y += HZ
    sh.paste(face(os.path.join(cut, fn)).resize((CW, ZH)), (x, y))
dr.text((12, sh.height - 56), 'FACE_CUTS chưa đổi — chờ chủ duyệt', fill=(30, 30, 30), font=F(28, True))
out = os.path.join(R, 'dev/handover/review-sheets/new-faces-v4/c09_hand_F4.jpg'); sh.save(out, quality=86); print(out, sh.size)
