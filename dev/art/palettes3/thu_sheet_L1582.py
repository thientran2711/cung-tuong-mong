"""Swatch sheets for THUPAL1 (owner L1582/L1583). No gens. Reads dev/handover/review-sheets/thu_palette_L1582/audit.json
(run season_feel_L1582.py first). Writes sheet1_s62_options.png, sheet2_flagged.png, sheet3_thu_reads.png there."""
import json, os
from PIL import Image, ImageDraw, ImageFont

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'handover', 'review-sheets', 'thu_palette_L1582')
A = json.load(open(os.path.join(OUT, 'audit.json')))
FR, FB = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
f = lambda n, b=False: ImageFont.truetype(FB if b else FR, n)
SEAS = ('xuan', 'ha', 'thu', 'dong'); VN = dict(xuan='Xuân', ha='Hạ', thu='Thu', dong='Đông')
VI = {'ice blue': 'xanh băng', 'mint mist': 'bạc hà nhạt'}
BG, INK, MUT, OK, BAD = '#FAF7F2', '#2B2622', '#7A716A', '#2E7D32', '#C62828'


def rgb(h): return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))


def outfit(dr, x, y, w, h, main, sec):
    """a robe-like block: main body, secondary collar band + sash + hem band"""
    dr.rounded_rectangle([x, y, x + w, y + h], 14, fill=main, outline='#00000022')
    dr.polygon([(x + w * .30, y), (x + w * .5, y + h * .42), (x + w * .70, y), (x + w * .60, y), (x + w * .5, y + h * .28),
                (x + w * .40, y)], fill=sec)
    dr.rectangle([x, y + h * .50, x + w, y + h * .60], fill=sec)
    dr.rectangle([x, y + h * .88, x + w, y + h - 6], fill=sec)


def sheet1():
    me = next(r for r in A['rows'] if r['id'] == 's62')
    cur = dict(key='0', title='HIỆN TẠI (owner L1582: Thu nhìn hồng như Xuân)', why='Thu = tím mận sáng + hồng phấn nhạt → đọc như hoa xuân / tím đông, không phải thu',
               sets={s: dict(main=me[s]['main'], main_vi=VI.get(me[s]['main_vi'], me[s]['main_vi']), sec=me[s]['sec'], sec_vi=VI.get(me[s]['sec_vi'], me[s]['sec_vi']),
                             reads=me[s]['reads'], proto=me[s]['proto'], changed=False) for s in SEAS}, a31=[])
    rows = [cur] + A['s62_options']
    W, CW, RH = 2000, 440, 470
    img = Image.new('RGB', (W, 150 + RH * len(rows) + 60), BG); dr = ImageDraw.Draw(img)
    dr.text((40, 28), 's62 — bảng màu 4 mùa: Thu phải ra cảm giác THU (owner L1582 + L1583) · chỉ đề xuất, chưa đổi file', font=f(34, 1), fill=INK)
    dr.text((40, 80), 'Nhóm Dịu dàng: nhạt + dịu, không đậm. Màu CHÍNH mang cảm giác mùa; màu PHỤ tự do nhưng hợp với chính. Đông = ★GỐC giữ nguyên. A31: 8 màu không trùng.', font=f(22), fill=MUT)
    for i, r in enumerate(rows):
        y0 = 150 + i * RH
        dr.rectangle([20, y0 - 8, W - 20, y0 + RH - 18], outline='#D8CFC4', width=2, fill='#FFFFFF' if i else '#FBEFEF')
        lab = 'HIỆN TẠI' if r['key'] == '0' else f'PHƯƠNG ÁN {r["key"]}'
        dr.text((40, y0 + 4), f'{lab} — {r["title"]}' if r['key'] != '0' else r['title'], font=f(27, 1), fill=BAD if r['key'] == '0' else INK)
        words, line, ly = r['why'].split(), '', y0 + 40
        for w_ in words:
            if dr.textlength(line + ' ' + w_, font=f(19)) > W - 100: dr.text((40, ly), line, font=f(19), fill=MUT); line, ly = w_, ly + 24
            else: line = (line + ' ' + w_).strip()
        dr.text((40, ly), line, font=f(19), fill=MUT)
        for j, s in enumerate(SEAS):
            st = r['sets'][s]; x = 40 + j * (CW + 40); y = y0 + 96
            hl = s == 'thu'
            outfit(dr, x, y, 165, 260, st['main'], st['sec'])
            dr.text((x + 178, y), VN[s] + ('  ★gốc' if s == 'dong' else '') + ('  (đổi)' if st.get('changed') else ''), font=f(26, 1), fill=INK)
            dr.rectangle([x + 178, y + 42, x + 228, y + 92], fill=st['main']); dr.rectangle([x + 178, y + 102, x + 228, y + 152], fill=st['sec'])
            dr.text((x + 236, y + 44), 'Chính: ' + st['main_vi'], font=f(16), fill=INK); dr.text((x + 236, y + 68), st['main'], font=f(19, 1), fill=INK)
            dr.text((x + 236, y + 104), 'Phụ: ' + st['sec_vi'], font=f(16), fill=INK); dr.text((x + 236, y + 128), st['sec'], font=f(19, 1), fill=INK)
            good = st['reads'] == s
            dr.text((x + 178, y + 172), ('✓ ra ' if good else '✗ ra ') + VN[st['reads']], font=f(24, 1), fill=OK if good else BAD)
            dr.text((x + 178, y + 204), '(' + st['proto'] + ')', font=f(17), fill=MUT)
            if hl and r['key'] != '0': dr.rectangle([x - 8, y - 8, x + CW - 10, y + 272], outline='#B8860B', width=3)
        note = ('A31: ' + ('OK' if not r['a31'] else '; '.join(r['a31']) + ' (lỗi cũ, có sẵn trong file)')) if r['key'] != '0' else ''
        dr.text((40, y0 + RH - 60), note, font=f(18), fill=MUT)
    dr.text((40, img.height - 50), 'Kiểm tra máy: cảm giác mùa = mẫu màu mùa gần nhất (ΔE2000) · bad_colour (không xám/nâu/vàng hoàng gia) · A31 · không trùng cặp với 89 người khác (check_unique).', font=f(18), fill=MUT)
    img.save(os.path.join(OUT, 'sheet1_s62_options.png'))


def table(rows, title, sub, name, extra):
    W, RH = 2120, 64; cols = 2
    per = (len(rows) + cols - 1) // cols
    img = Image.new('RGB', (W, 170 + per * RH + 40), BG); dr = ImageDraw.Draw(img)
    dr.text((40, 28), title, font=f(32, 1), fill=INK); dr.text((40, 78), sub, font=f(21), fill=MUT)
    hdr = 'người · nhóm      XUÂN chính/phụ        THU chính/phụ           ΔE  Thu đọc ra'
    for c in range(cols): dr.text((40 + c * 1040, 128), hdr, font=f(17, 1), fill=MUT)
    for i, r in enumerate(rows):
        c, k = divmod(i, per); x = 40 + c * 1040; y = 160 + k * RH
        dr.text((x, y + 10), f'{r["id"]} · {r["group"]}', font=f(18, 1), fill=INK)
        for n, s in enumerate(('xuan', 'thu')):
            xx = x + 180 + n * 300
            dr.rectangle([xx, y + 4, xx + 70, y + 50], fill=r[s]['main']); dr.rectangle([xx + 72, y + 4, xx + 104, y + 50], fill=r[s]['sec'])
            dr.text((xx + 112, y + 4), r[s]['main_vi'][:16], font=f(15), fill=INK); dr.text((xx + 112, y + 26), r[s]['main'] + ' / ' + r[s]['sec'], font=f(14), fill=MUT)
        dr.text((x + 790, y + 10), extra(r), font=f(17, 1), fill=BAD)
    img.save(os.path.join(OUT, name))


if __name__ == '__main__':
    sheet1()
    sp = [r for r in A['rows'] if r['spring_pink']]
    table(sp, f'Danh sách Thu "hồng như Xuân": {len(sp)} / {len(A["rows"])} người',
          'Thu chính là hồng / hồng thu / tím mận / đỏ rượu sáng → nhìn ra hoa xuân. ΔE = Thu chính so với Xuân chính (dưới 25 = rất giống).',
          'sheet2_flagged.png', lambda r: f'{r["thu_vs_xuan"]["main_main"]:.0f}  {VN[r["thu"]["reads"]]}')
    other = [r for r in A['rows'] if not r['spring_pink'] and r['thu']['reads'] != 'thu']
    table(other, f'Thu chính KHÔNG ra Thu (không phải hồng): {len(other)} người',
          '"Xanh rêu" hiện tại = xanh lá non tươi (ra Xuân); tím mận đậm = ngọc đông. Chỉ ' +
          str(sum(r['thu']['reads'] == 'thu' for r in A['rows'])) + ' / 90 người có Thu chính ra cảm giác thu.',
          'sheet3_thu_reads.png', lambda r: f'{VN[r["thu"]["reads"]]} ({r["thu"]["proto"]})')
