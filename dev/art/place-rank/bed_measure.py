#!/usr/bin/env python3
"""BEDSIZE1 (owner L2316): bed size in every drawn bedroom vs the in-game figure, + one comparison sheet.  0 cr.
METHOD: bbox of each bed's canopy frame (outer posts / outer curtain edge, canopy top, lowest edge of the bed base or
its step/platform) read BY EYE on 5 %-gridded contact sheets of the CDN pictures (2688x1386, all the same size);
precision about +-2 % of the picture. Auto bbox failed (curtains/partitions merge with walls), so the numbers are
typed below. For phối rooms (2 beds) the width is ONE bed.
In-game scale = the live iPad stage of stage_exact/nf_tags.py (W 1162 x H 599, cover crop -> the whole 2688x1386
picture is shown, scale 0.4323): figure visible height 438.7 px = 73.2 % of the picture height = 37.7 % of its width;
feet 69.7 px above the bottom (88.4 % H).
  python3 bed_measure.py table             -> markdown table
  python3 bed_measure.py sheet DLDIR FIG OUT.jpg   (DLDIR = downloaded <folder>__<key>-ha-sang.webp, FIG = fig cut-out)"""
import sys
W, H, VH, GAP = 1162, 599, 438.7, 69.7
FIG_H = VH / H * 100                 # 73.2 % of picture height
FIG_W = FIG_H * 1386 / 2688          # 37.7 % of picture width
RANK = {'phoi': '1-3 Đáp ứng/Thường tại/Quý nhân (phối, 2 giường)', 'tan': '4 Tần', 'phi': '5 Phi', 'quyphi': '6 Quý phi',
        'hqp': '7 Hoàng quý phi', 'hh': '8 Hoàng hậu'}
# key: (rank, x0, x1, top, base, status)   all % of picture; status: M = approved MODEL room (L16), D = owner duyệt/OK,
# S = sent, owner said no need to wait for approval (L2300), O = older version / not live
B = {
 'canh-phuc-cung-tan-ngu':            ('tan', 34, 72, 5, 82, 'M'),
 'canh-phuc-cung-phi-ngu':            ('phi', 20, 62, 2, 78, 'M'),
 'canh-phuc-cung-quyphi-ngu':         ('quyphi', 30, 74, 5, 85, 'M'),
 'truong-xuan-cung-hqp-ngu':          ('hqp', 30, 64, 5, 85, 'M'),
 'khon-ninh-cung-ngu':                ('hh', 3, 55, 3, 90, 'M'),
 'pr13/ham-an-cung-tan-ngu':          ('tan', 30, 72, 10, 80, 'D'),
 'pr13/khai-tuong-cung-tan-ngu':      ('tan', 30, 72, 10, 80, 'D'),
 'pr13/thua-minh-cung-tan-ngu':       ('tan', 30, 70, 8, 82, 'D'),   # M2294-11
 'pr13/truong-xuan-cung-tan-ngu':     ('tan', 30, 68, 8, 78, 'S'),   # M2300-17
 'pr19/chung-tu-cung-tan-ngu':        ('tan', 49, 90, 10, 78, 'O'),
 'pr19/ham-an-cung-tan-ngu':          ('tan', 30, 70, 8, 82, 'O'),
 'pr19/khai-tuong-cung-tan-ngu':      ('tan', 30, 68, 10, 78, 'O'),
 'pr20/chung-tu-cung-tan-ngu':        ('tan', 50, 98, 5, 82, 'O'),
 'pr20/dien-huy-cung-tan-ngu':        ('tan', 15, 57, 3, 80, 'D'),
 'pr20/vinh-hoa-cung-tan-ngu':        ('tan', 38, 80, 5, 80, 'D'),
 'pr21/chung-tu-cung-tan-ngu':        ('tan', 29, 80, 5, 82, 'D'),
 'pr13/chung-tu-cung-phi-ngu':        ('phi', 31, 73, 10, 76, 'D'),  # M2294-15
 'pr13/khai-tuong-cung-phi-ngu':      ('phi', 42, 82, 8, 78, 'D'),   # M2294-13
 'pr13/ham-an-cung-phi-ngu':          ('phi', 27, 62, 15, 80, 'S'),  # M2299-12
 'pr13/thua-minh-cung-phi-ngu':       ('phi', 34, 73, 12, 82, 'S'),  # M2299-14
 'pr13/dien-huy-cung-phi-ngu':        ('phi', 31, 66, 10, 80, 'S'),  # M2300-01
 'pr13/vinh-hoa-cung-phi-ngu':        ('phi', 22, 60, 5, 78, 'S'),   # M2300-03
 'pr13/truong-xuan-cung-phi-ngu':     ('phi', 39, 78, 5, 85, 'S'),   # M2300-19
 'pr13/khai-tuong-cung-quyphi-ngu':   ('quyphi', 24, 57, 10, 84, 'S'),  # M2300-05
 'pr13/chung-tu-cung-quyphi-ngu':     ('quyphi', 40, 79, 8, 80, 'S'),   # M2300-07
 'pr13/ham-an-cung-quyphi-ngu':       ('quyphi', 39, 76, 5, 78, 'S'),   # M2300-09
 'pr13/thua-minh-cung-quyphi-ngu':    ('quyphi', 20, 53, 5, 80, 'S'),   # M2300-11  (owner: too small)
 'pr13/dien-huy-cung-quyphi-ngu':     ('quyphi', 35, 76, 8, 78, 'S'),   # M2300-13
 'pr13/vinh-hoa-cung-quyphi-ngu':     ('quyphi', 33, 66, 8, 82, 'S'),   # M2300-15  (owner: too small)
 'pr13/truong-xuan-cung-quyphi-ngu':  ('quyphi', 23, 60, 8, 78, 'S'),   # M2300-21
 'thua-minh-cung-dong-phoi-ngu':      ('phoi', 22, 48, 10, 83, 'M'),
 'pr13/canh-phuc-cung-dong-phoi-ngu': ('phoi', 79, 100, 25, 80, 'D'),
 'pr13/canh-phuc-cung-tay-phoi-ngu':  ('phoi', 15, 42, 22, 72, 'D'),
 'pr13/chung-tu-cung-dong-phoi-ngu-r3': ('phoi', 17, 37, 15, 73, 'D'),
 'pr13/chung-tu-cung-tay-phoi-ngu':   ('phoi', 10, 37, 12, 68, 'D'),
 'pr13/dien-huy-cung-dong-phoi-ngu':  ('phoi', 70, 98, 5, 75, 'D'),
 'pr13/dien-huy-cung-tay-phoi-ngu':   ('phoi', 25, 52, 10, 72, 'D'),
 'pr13/ham-an-cung-dong-phoi-ngu':    ('phoi', 15, 43, 10, 72, 'D'),
 'pr13/ham-an-cung-tay-phoi-ngu':     ('phoi', 18, 48, 10, 68, 'D'),
 'pr13/khai-tuong-cung-dong-phoi-ngu': ('phoi', 28, 55, 15, 75, 'D'),
 'pr13/khai-tuong-cung-tay-phoi-ngu': ('phoi', 15, 45, 15, 75, 'D'),
 'pr13/thua-minh-cung-tay-phoi-ngu':  ('phoi', 17, 44, 20, 75, 'D'),
 'pr13/truong-xuan-cung-dong-phoi-ngu': ('phoi', 78, 100, 0, 85, 'D'),
 'pr13/truong-xuan-cung-tay-phoi-ngu': ('phoi', 18, 43, 10, 78, 'D'),
 'pr13/vinh-hoa-cung-dong-phoi-ngu':  ('phoi', 80, 100, 10, 80, 'D'),
 'pr13/vinh-hoa-cung-tay-phoi-ngu':   ('phoi', 18, 47, 15, 78, 'D'),
}
# option B ladder (% of picture width, canopy outer); tolerance 2 points
LADDER = {'phoi': None,  # 2-bed rooms: info only (side-wall beds read narrow by perspective; L23 OK'd rooms stay)
          'tan': 40, 'phi': 43, 'quyphi': 46, 'hqp': 49, 'hh': 52}
TOL = 2

def row(k):
    r, x0, x1, t, b, st = B[k]; w = x1 - x0; h = b - t
    ratio = (w * 2688) / (h * 1386)        # pixel W:H of the bed block
    return dict(key=k, rank=r, w=w, h=h, wf=w / FIG_W, hf=h / FIG_H, ratio=ratio, st=st,
                low=LADDER[r] is not None and w < LADDER[r] - TOL, boxy=ratio < 1.0 and r != 'phoi')

def table():
    order = list(LADDER)
    print('| hạng | phòng | trạng thái | rộng %ảnh | cao %ảnh | rộng ÷ cao người | cao ÷ cao người | R:C | ghi chú |')
    print('|---|---|---|---|---|---|---|---|---|')
    for k in sorted(B, key=lambda k: (order.index(B[k][0]), -(B[k][2] - B[k][1]))):
        d = row(k); n = []
        if d['low']: n.append(f"nhỏ hơn mốc B {LADDER[d['rank']]}%")
        if d['boxy']: n.append('vuông/hộp')
        print(f"| {RANK[d['rank']].split(' (')[0]} | {k} | {d['st']} | {d['w']} | {d['h']} | {d['wf']:.2f} | {d['hf']:.2f} | {d['ratio']:.2f} | {', '.join(n)} |")

def sheet(dl, fig, out):
    from PIL import Image, ImageDraw, ImageFont
    FB = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 30)
    FS = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 24)
    panels = [('canh-phuc-cung-quyphi-ngu', 'Cảnh Phúc Quý phi — MẪU ĐÃ DUYỆT'),
              ('khon-ninh-cung-ngu', 'Khôn Ninh Hoàng hậu — MẪU ĐÃ DUYỆT'),
              ('pr13/thua-minh-cung-quyphi-ngu', 'M2300-11 Thừa Minh Quý phi (chủ: giường nhỏ)'),
              ('pr13/vinh-hoa-cung-quyphi-ngu', 'M2300-15 Vĩnh Hòa Quý phi (chủ: giường nhỏ)')]
    SC = 1; PW, PH = W * SC, H * SC; LH = 84; G = 14
    sh = Image.new('RGB', (2 * PW + 3 * G, 2 * (PH + LH) + 3 * G + 60), (26, 22, 20)); d = ImageDraw.Draw(sh)
    d.text((G, 14), 'Giường so với người trong game (iPad, đúng cỡ + vị trí đứng như game). Khung xanh = khung giường đo; vạch trắng = chiều cao người.', font=FS, fill=(245, 235, 215))
    fg0 = Image.open(fig).convert('RGBA'); fg0 = fg0.crop(fg0.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox())
    fg0 = fg0.resize((round(fg0.width * VH * SC / fg0.height), round(VH * SC)), Image.LANCZOS)
    for i, (k, lab) in enumerate(panels):
        x, y = G + (i % 2) * (PW + G), 60 + G + (i // 2) * (PH + LH + G)
        im = Image.open(f"{dl}/{k.replace('/', '__')}-ha-sang.webp").convert('RGB')
        s = max(W / im.width, H / im.height); w, h = round(im.width * s * SC), round(im.height * s * SC)
        st = im.resize((w, h), Image.LANCZOS); x0 = (w - PW) // 2; st = st.crop((x0, h - PH, x0 + PW, h)).convert('RGBA')
        dd = ImageDraw.Draw(st); r = row(k); _, bx0, bx1, bt, bb, _ = B[k]
        dd.rectangle((bx0 / 100 * w - x0, bt / 100 * h - (h - PH), bx1 / 100 * w - x0, bb / 100 * h - (h - PH)), outline=(0, 230, 255), width=4)
        bc = (bx0 + bx1) / 200 * PW; cx = 168 * SC if bc > PW / 2 else 994 * SC   # figure on the free side, at a game slot x
        feet = (H - GAP) * SC; st.alpha_composite(fg0, (round(cx - fg0.width / 2), round(feet - fg0.height)))
        dd.line((cx + fg0.width / 2 + 6, feet - VH * SC, cx + fg0.width / 2 + 6, feet), fill=(255, 255, 255), width=4)
        sh.paste(st.convert('RGB'), (x, y + LH))
        d.text((x + 4, y + 4), lab, font=FB, fill=(255, 225, 170))
        d.text((x + 4, y + 44), f"giường rộng {r['w']}% ảnh = {r['wf']:.2f}× chiều cao người · cao {r['h']}% · R:C {r['ratio']:.2f}", font=FS, fill=(170, 235, 255))
    sh.save(out, quality=84); print(out, sh.size)

if __name__ == '__main__':
    if sys.argv[1] == 'table': table()
    else: sheet(*sys.argv[2:5])
