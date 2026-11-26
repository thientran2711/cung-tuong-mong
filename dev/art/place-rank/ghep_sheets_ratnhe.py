"""PR21 (owner L1669 + "phải dán cho tôi mấy cái hình nhân vật này vô trong cái hình phòng"): one figure per room on the graded 'rất nhẹ'
backgrounds (img/_ratnhe/<place>-ha-sang.webp), live iPad stage (stage_one.py), 6 rooms per sheet, big labels. 0 cr.
python3 ghep_sheets_ratnhe.py CUTDIR OUTDIR"""
import sys, os, subprocess, tempfile
from PIL import Image, ImageDraw, ImageFont
cut, outd = sys.argv[1:3]; D = os.path.dirname(os.path.abspath(__file__))
F = lambda s: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', s)
FIG = {'tan': 'Tần thu t4', 'phi': 'Phi thu t5', 'tam': 'cung nữ tam đẳng', 'nhi': 'cung nữ nhị đẳng', 'nhat': 'cung nữ nhất đẳng'}
PAL = [('chung-tu-cung', 'Chung Tú cung'), ('canh-phuc-cung', 'Cảnh Phúc cung'), ('dien-huy-cung', 'Diên Huy cung'), ('ham-an-cung', 'Hàm An cung'),
       ('khai-tuong-cung', 'Khải Tường cung'), ('thua-minh-cung', 'Thừa Minh cung'), ('truong-xuan-cung', 'Trường Xuân cung'), ('vinh-hoa-cung', 'Vĩnh Hòa cung')]
R = []
for i, (k, n) in enumerate(PAL):
    R += [(k, n + ' · chính điện', 'tan' if i % 2 == 0 else 'phi'), (k + '-dong-phoi', n + ' · đông phối điện', 'nhi'), (k + '-tay-phoi', n + ' · tây phối điện', 'nhat')]
R += [('khon-ninh-cung', 'Khôn Ninh cung', 'phi'), ('tu-ninh-cung', 'Từ Ninh cung', 'phi'), ('duong-tam-dien', 'Dưỡng Tâm điện', 'phi'),
      ('ngu-thu-phong', 'Ngự Thư phòng', 'tan'), ('tam-cung-dem', 'Tẩm cung (đêm)', 'phi'), ('phi-tan-cung', 'Phi Tần cung', 'tan'),
      ('ngu-hoa-vien', 'Ngự Hoa Viên', 'tan'), ('dong-cung', 'Đông cung', 'tan'), ('lanh-cung', 'Lãnh cung', 'tam'),
      ('phong-cung-nu', 'Phòng cung nữ', 'tam'), ('cung-nhan', 'Cung nhân', 'nhi'), ('tan-gia-kho', 'Tân Giả khố', 'tam'),
      ('thai-y-vien', 'Thái Y viện', 'nhat'), ('kinh-su-phong', 'Kính Sự phòng', 'nhat'), ('thuong-thu-phong', 'Thượng Thư phòng', 'nhi'),
      ('a-ca-so', 'A Ca sở', 'nhi')]
PW, G, LB, N = 1150, 24, 70, 6
sheets = [R[i:i + N] for i in range(0, len(R), N)]
for si, rows in enumerate(sheets, 1):
    PH = round(PW * 599 / 1162); cols = 2; nr = (len(rows) + 1) // 2; HD = 160
    sh = Image.new('RGB', (cols * PW + 3 * G, HD + nr * (LB + PH + G) + 10), 'white'); d = ImageDraw.Draw(sh)
    d.text((G, 14), f'Ghép nhân vật vào nền rất nhẹ · bảng {si}/{len(sheets)}', fill='black', font=F(56))
    d.text((G, 88), 'nền rất nhẹ · 0 cr (chỉnh màu + tách nền tại máy, không vẽ lại) · TỔNG cả {} bảng: 0 cr'.format(len(sheets)), fill=(150, 0, 40), font=F(38))
    for j, (k, name, f) in enumerate(rows):
        x = G + (j % 2) * (PW + G); y = HD + (j // 2) * (LB + PH + G)
        bg = f'img/_ratnhe/{k}-ha-sang.webp'; tmp = tempfile.mktemp(suffix='.jpg')
        subprocess.run([sys.executable, os.path.join(D, 'stage_one.py'), bg, os.path.join(cut, f + '_cut.png'), tmp, '581'], check=True, capture_output=True)
        lab = f'{name} · {FIG[f]}'; s = 46
        while d.textlength(lab, font=F(s)) > PW and s > 26: s -= 2
        d.text((x, y + 8), lab, fill=(0, 100, 55), font=F(s)); sh.paste(Image.open(tmp).convert('RGB').resize((PW, PH)), (x, y + LB))
    p = os.path.join(outd, f'ghep-ratnhe-bang{si}.jpg'); sh.save(p, quality=86); print(p, sh.size, len(rows))
print('rooms', len(R))
