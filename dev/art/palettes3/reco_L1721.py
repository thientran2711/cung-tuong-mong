#!/usr/bin/env python3
"""PAL4 (owner L1721): colour-designer RECOMMENDATIONS per season (feeling -> families), before any palette change. 0 credits.
One sheet per season: feeling words · recommended families (swatches at the L1583 softness) · current L1583 mains grouped
into families, marked hợp / chưa hợp, with counts + example ids · short change list.  Run from anywhere."""
import json, os, sys, collections
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from colourlib import oklch
import four_season86 as B
import four_season_L1709 as M
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
d = json.load(open(os.path.join(ROOT, 'dev/art/face-common/palettes_season_L1583.json')))
OUT = os.path.join(ROOT, 'dev/handover/review-sheets/pal_L1721'); os.makedirs(OUT, exist_ok=True)
FR, FBD = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
f = lambda n, b=False: ImageFont.truetype(FBD if b else FR, n)
P = sorted([k for k in d if not k.startswith('_') and k != 'status'], key=lambda k: (M.GORDER.index(d[k]['group']), k))


def hin(h, a, b): return a <= h <= b if a <= b else (h >= a or h <= b)


# recommended families: (name, hue, [(L, C) ...] at L1583 softness, why)
SOFT = [(.50, .10), (.60, .10), (.68, .09), (.76, .08), (.84, .07), (.90, .06)]
SEASON = {
 'xuan': dict(title='XUÂN', feel='vui tươi · đoàn viên · Tết · nắng ấm đầu năm · lộc non',
   reco=[('đỏ son Tết', 25, [(.50, .14), (.56, .13), (.62, .12), (.68, .11), (.74, .10)], 'màu Tết, đoàn viên'),
         ('hồng hoa đào', 5, [(.58, .11), (.66, .10), (.72, .09), (.80, .08), (.86, .07)], 'hoa đào, vui tươi'),
         ('vàng hoa mai nhạt', 95, [(.90, .08), (.92, .09), (.94, .07)], 'hoa mai Tết (nhạt, không vàng hoàng gia)'),
         ('xanh lá non tươi', 140, [(.52, .12), (.60, .12), (.68, .11), (.76, .10), (.84, .08)], 'lộc non, mới mẻ'),
         ('cam quýt nhạt', 55, [(.76, .10), (.80, .09), (.84, .08), (.88, .07)], 'quýt Tết, ấm áp')],
   cur=[('hồng hoa đào / hồng xuân', lambda L, C, h: hin(h, 0, 14) and L >= .55, True, ''),
        ('đỏ son / đỏ thắm', lambda L, C, h: hin(h, 14, 40), True, ''),
        ('xanh lá xuân sáng–vừa', lambda L, C, h: hin(h, 100, 175) and L >= .50, True, ''),
        ('xanh lá thẫm', lambda L, C, h: hin(h, 100, 175) and L < .50, False, 'tối, nặng → giống Thu/Đông'),
        ('hồng mẫu đơn đậm/thẫm', lambda L, C, h: (hin(h, 320, 360) or hin(h, 0, 14)) and L < .55, False, 'tím-đỏ nặng, buồn → không vui tươi'),
        ('hồng mẫu đơn vừa–sáng', lambda L, C, h: hin(h, 320, 360) and L >= .55, True, '')],
   todo=['Bớt hồng mẫu đơn đậm/thẫm ({MDD}) + xanh lá thẫm ({LT})',
         '   → đổi sang đỏ son Tết (mới {DO} người), hồng hoa đào sáng, cam quýt nhạt',
         'Thêm vàng hoa mai NHẠT (vài người) = Tết; giữ xanh lá non tươi',
         'Giữ độ dịu L1583; chỉ đổi họ màu']),
 'ha': dict(title='HẠ', feel='tỏa nắng · nóng · vui chơi, đi đây đi đó · nhưng MÁT MẺ (gió, nước, sen)',
   reco=[('vàng nắng nhạt', 100, [(.90, .10), (.92, .11), (.94, .09), (.96, .07)], 'nắng hè, tỏa sáng'),
         ('cam đào / cam mơ', 58, [(.74, .12), (.78, .11), (.82, .10), (.86, .09), (.90, .07)], 'nóng, vui'),
         ('san hô dưa hấu', 30, [(.68, .12), (.74, .11), (.80, .10), (.86, .08)], 'trái cây hè, vui chơi'),
         ('xanh lá sen / bạc hà', 150, [(.70, .09), (.78, .08), (.84, .07), (.90, .06)], 'MÁT: lá sen, bạc hà'),
         ('hồng sen', 0, [(.70, .10), (.76, .09), (.82, .08), (.88, .06)], 'hoa sen mùa hạ'),
         ('xanh ngọc nước (ít)', 195, [(.76, .07), (.82, .06), (.88, .05)], 'mát như nước — chỉ vài người')],
   cur=[('vàng chanh', lambda L, C, h: hin(h, 85, 125), True, ''),
        ('cam đào / mơ / quýt', lambda L, C, h: hin(h, 45, 85), True, ''),
        ('cam san hô', lambda L, C, h: hin(h, 20, 45), True, ''),
        ('màu mát (xanh/sen)', lambda L, C, h: hin(h, 125, 260) or hin(h, 340, 360) or hin(h, 0, 20), True, '')],
   todo=['Bảng hiện tại TOÀN màu nóng (cam {CAM} + vàng {VANG}, mát {MAT}) → thiếu cảm giác MÁT MẺ',
         'Đổi ~1/3 người sang mát: xanh lá sen, bạc hà, hồng sen; xanh ngọc nước chỉ vài người (xanh dương thuộc Đông)',
         'Giữ vàng nắng nhạt + cam đào nhiều (tỏa nắng); bớt cam san hô ({SANHO} người quá giống nhau)']),
 'thu': dict(title='THU', feel='ấm áp nhưng ĐƯỢM BUỒN · lá rụng · hoàng hôn · nhớ nhung',
   reco=[('cam quả hồng trầm', 50, [(.70, .10), (.74, .10), (.78, .09), (.82, .08)], 'ấm áp'),
         ('hổ phách / đất nung dịu', 38, [(.68, .10), (.72, .10), (.76, .09), (.80, .08)], 'ấm, hoàng hôn'),
         ('ô liu khói', 125, [(.54, .08), (.62, .08), (.70, .08), (.78, .07)], 'lá úa, trầm'),
         ('đỏ lá phong trầm', 18, [(.42, .13), (.50, .12), (.58, .11), (.66, .10)], 'lá phong, nhớ nhung'),
         ('hồng tro / tím khói', 340, [(.56, .08), (.64, .07), (.72, .07), (.80, .06)], 'ĐƯỢM BUỒN, mơ màng'),
         ('xanh cổ vịt trầm', 205, [(.44, .07), (.52, .07), (.60, .07), (.68, .07)], 'man mác, se lạnh')],
   cur=[('ô liu / rêu', lambda L, C, h: hin(h, 95, 175), True, ''),
        ('đỏ rượu trầm thẫm', lambda L, C, h: (hin(h, 340, 360) or hin(h, 0, 25)) and L < .45, False, 'quá tối, gần như cùng một màu'),
        ('đỏ rượu vừa', lambda L, C, h: (hin(h, 340, 360) or hin(h, 0, 25)) and L >= .45, True, ''),
        ('đất nung / cam quả hồng / hổ phách', lambda L, C, h: hin(h, 25, 95), True, '')],
   todo=['Ô liu quá nhiều ({OLIU}/90) → còn ~25; thêm cam quả hồng + hổ phách (ẤM)',
         'Đỏ rượu thẫm: {RUOU} người gần như cùng một màu → tách ra đỏ lá phong trầm, hồng tro, xanh cổ vịt trầm',
         'Thêm hồng tro / tím khói + xanh cổ vịt trầm = cảm giác ĐƯỢM BUỒN (màu hơi khói, không rực)']),
 'dong': dict(title='ĐÔNG', feel='LẠNH LẼO · tuyết · cô đơn, lạnh trong lòng · tĩnh lặng',
   reco=[('xanh băng', 235, [(.70, .07), (.78, .06), (.84, .05), (.90, .04)], 'băng tuyết, lạnh'),
         ('chàm / lam đêm', 268, [(.38, .10), (.46, .10), (.54, .09), (.62, .08)], 'đêm đông, cô đơn'),
         ('tím than lạnh', 285, [(.42, .09), (.52, .08), (.62, .08), (.72, .07)], 'lạnh lùng, tĩnh'),
         ('xanh tùng trầm', 175, [(.40, .07), (.48, .07), (.56, .07), (.64, .06)], 'thông tuyết'),
         ('bạc xám xanh', 245, [(.66, .045), (.74, .04), (.82, .035)], 'giá lạnh (phụ / vài người)'),
         ('đỏ mai đông (rất ít)', 10, [(.42, .13), (.50, .12)], '1 đốm ấm giữa tuyết — vài người')],
   cur=[('xanh băng / lam / chàm', lambda L, C, h: hin(h, 215, 280), True, ''),
        ('tím than / tím lạnh', lambda L, C, h: hin(h, 280, 300), True, ''),
        ('tím ấm / tím hồng', lambda L, C, h: hin(h, 300, 360), False, 'ngả hồng, ngọt → ấm, không lạnh'),
        ('mòng két / ngọc bích trầm', lambda L, C, h: hin(h, 150, 215) and L < .72, True, ''),
        ('ngọc bích sáng', lambda L, C, h: hin(h, 150, 215) and L >= .72, False, 'tươi như Xuân'),
        ('màu khác', lambda L, C, h: True, False, 'không đúng Đông')],
   todo=['Bớt tím ấm / tím hồng ({TIMAM} người) → tím than lạnh, chàm',
         'Ngọc bích sáng ({NBS}, tươi như Xuân) → xanh băng / xanh tùng trầm',
         'Hơi lạnh hơn: thêm chút xám-xanh (khói băng), vẫn dịu, không tối tăm; đỏ mai chỉ vài người',
         'Lưu ý: nhiều ô ✗ có chấm trắng = màu gốc đã vẽ → giữ, trừ khi chị cho đổi']),
}


def sw(dr, x, y, hx, w=44, h=40, star=False):
    dr.rectangle([x, y, x + w, y + h], fill=hx, outline='#777')
    if star: dr.ellipse([x + w // 2 - 5, y + h // 2 - 5, x + w // 2 + 5, y + h // 2 + 5], fill='white', outline='#333')


summary = {}
for s, S in SEASON.items():
    W = 2000
    im = Image.new('RGB', (W, 2300), 'white'); dr = ImageDraw.Draw(im)
    dr.text((24, 16), f'{S["title"]} · khuyến nghị bảng màu (chưa đổi gì) · Lượt 1721 · 0 cr', font=f(46, True), fill='#111')
    dr.text((24, 82), 'Cảm giác: ' + S['feel'], font=f(32, True), fill='#9A0E2A')
    y = 150
    dr.text((24, y), 'NÊN DÙNG (vẫn độ dịu như bảng cũ L1583)', font=f(34, True), fill='#0B5A33'); y += 54
    for name, h, LC, why in S['reco']:
        dr.text((24, y + 6), name, font=f(28, True), fill='#111')
        x = 480
        for L, C in LC:
            sw(dr, x, y, B.lch2hex(L, C, h), 70, 46); x += 78
        dr.text((x + 14, y + 8), why, font=f(25), fill='#444'); y += 62
    y += 20; dr.line([24, y, W - 24, y], fill='#999', width=2); y += 16
    dr.text((24, y), 'BẢNG HIỆN TẠI (L1583, 90 người) — màu chính · chấm trắng = màu gốc ★ (đã vẽ, giữ)', font=f(30, True), fill='#111'); y += 52
    groups = collections.OrderedDict((c[0], []) for c in S['cur'])
    for p in P:
        e = d[p][s]; L, C, h = oklch(e['main_hex'])
        for name, test, ok, why in S['cur']:
            if test(L, C, h): groups[name].append((p, e)); break
    summary[s] = {k: len(v) for k, v in groups.items()}
    for name, test, ok, why in S['cur']:
        mem = sorted(groups[name], key=lambda t: oklch(t[1]['main_hex'])[0])
        if not mem: continue
        mark, col = ('✓ HỢP', '#0B7A3B') if ok else ('✗ CHƯA HỢP', '#B00020')
        dr.text((24, y), f'{mark} · {name} · {len(mem)} người' + (f' — {why}' if why else ''), font=f(27, True), fill=col); y += 40
        for i, (p, e) in enumerate(mem):
            sw(dr, 24 + (i % 36) * 53, y + (i // 36) * 50, e['main_hex'], 46, 42, e['root'])
        y += ((len(mem) - 1) // 36 + 1) * 50
        if not ok:
            ex = ' '.join(p for p, e in mem if not e['root'])[:150]
            dr.text((24, y), 'ví dụ: ' + ex, font=f(22), fill='#555'); y += 34
        y += 8
    y += 10; dr.line([24, y, W - 24, y], fill='#999', width=2); y += 16
    dr.text((24, y), 'ĐỀ XUẤT ĐỔI (chờ chị duyệt)', font=f(34, True), fill='#0B5A33'); y += 52
    c = summary[s]
    V = dict(RUOU=c.get('đỏ rượu trầm thẫm'), OLIU=c.get('ô liu / rêu'), CAM=sum(c.get(k, 0) for k in ('cam đào / mơ / quýt', 'cam san hô')),
             VANG=c.get('vàng chanh'), MAT=c.get('màu mát (xanh/sen)'), SANHO=c.get('cam san hô'), DO=c.get('đỏ son / đỏ thắm'),
             MDD=c.get('hồng mẫu đơn đậm/thẫm'), LT=c.get('xanh lá thẫm'), TIMAM=c.get('tím ấm / tím hồng'), NBS=c.get('ngọc bích sáng'))
    for t in S['todo']:
        dr.text((24, y), ('  ' if t.startswith(' ') else '• ') + t.format(**V).strip(), font=f(28), fill='#111'); y += 46
    im = im.crop((0, 0, W, y + 30))
    im.save(os.path.join(OUT, f'khuyennghi_{s}.png'))
print(json.dumps(summary, ensure_ascii=False))
