#!/usr/bin/env python3
"""PAL4 — owner L1726 approved the L1721 season-feeling recommendations ("đồng ý, tiến hành làm, rồi đưa cho tôi cái bảng màu mới").
Feelings: Xuân = e ấp tình đầu, đoàn viên · Hạ = tự do, phóng khoáng, tinh nghịch, nắng + mát ·
Thu = HOÀI NIỆM (chiều thu dưới tán lá rụng, ký ức tuổi thơ, chia ly lá rơi — not sad) · Đông = lạnh lẽo, cô quạnh.
Same engine as four_season_L1709.py (L1583 tone kept per person, roots + s62 unchanged, check_unique, A31, group/neighbour spread);
only the FAMILY table follows the 4 khuyennghi sheets (dev/handover/review-sheets/pal_L1721/).
Output NEW dev/art/face-common/palettes_season_L1726.json. Run: python3 dev/art/palettes3/four_season_L1726.py"""
import os, sys, json, functools
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from colourlib import oklch
import four_season_L1709 as M
import four_season_L1583 as F

M.DST = os.path.join(M.FC, 'palettes_season_L1726.json')
# family: (name, hue lo, hue hi, L lo, L hi, C lo, C hi, target of 90)
M.FAM = {
    'xuan': [('hồng hoa đào', 0, 14, .55, .92, .07, .14, 22), ('đỏ son Tết', 16, 30, .44, .74, .11, .16, 18),
             ('xanh lá non tươi', 132, 150, .52, .88, .08, .15, 18), ('hồng mẫu đơn', 338, 356, .58, .88, .07, .13, 12),
             ('cam quýt nhạt', 50, 64, .74, .90, .08, .12, 12), ('vàng hoa mai', 101, 108, .91, .96, .08, .11, 8)],
    'ha':   [('vàng nắng', 92, 108, .90, .96, .07, .13, 22), ('cam đào', 52, 68, .72, .90, .08, .14, 20),
             ('san hô dưa hấu', 24, 40, .62, .86, .09, .15, 14), ('xanh lá sen / bạc hà', 134, 162, .60, .90, .07, .12, 16),
             ('hồng sen', 352, 8, .62, .90, .07, .13, 12), ('xanh ngọc nước', 186, 200, .66, .86, .06, .085, 6)],
    'thu':  [('cam quả hồng', 40, 56, .72, .86, .095, .13, 18), ('hổ phách / đất nung', 28, 40, .68, .82, .095, .13, 12),
             ('ô liu', 116, 134, .52, .82, .075, .11, 20), ('đỏ lá phong', 10, 22, .32, .64, .12, .15, 14),
             ('hồng tro / tím khói', 322, 346, .54, .82, .07, .10, 16), ('xanh cổ vịt trầm', 198, 214, .30, .72, .07, .10, 10)],
    'dong': [('xanh băng', 222, 246, .66, .92, .07, .10, 22), ('chàm / lam đêm', 256, 276, .34, .74, .08, .13, 22),
             ('tím than lạnh', 280, 298, .38, .84, .07, .12, 20), ('xanh tùng trầm', 160, 186, .34, .70, .07, .10, 20),
             ('đỏ mai đông', 4, 18, .38, .56, .12, .15, 6)],
}
M.KIND = {'đỏ lá phong': 'đỏ'}
M.NB_W = 16   # owner: neighbours must look different (Kiêu kỳ Thu had 5 olives in a row)
M.HARD = {'xanh ngọc nước': 6, 'vàng hoa mai': 9, 'đỏ mai đông': 8}

_ok_base = M.ok.__wrapped__ if hasattr(M.ok, '__wrapped__') else M.ok


@functools.lru_cache(maxsize=None)
def ok(x, s):
    L, c, h = oklch(x)
    if s == 'xuan' and 92 <= h <= 125:   # pale mai yellow (L1721 sheet, owner L1726 OK): same pale-yellow test as Hạ
        if M.hsv_s(x) > M.S_CAP or M.de(x, M.ROYAL) < 14: return False
        return M.bad(x) in (None, 'royal band') and L >= .91 and h <= 114 and c >= .075
    if s == 'dong' and 150 <= h <= 200 and L > .72: return False   # bright jade reads spring (L1721 Đông ✗)
    return _ok_base(x, s)


M.ok = ok
# warm families the L1721 sheets ask for more of may lighten a person a little more (ΔL up to ~.15 instead of .12)
MAXC = {'vàng hoa mai': .5, 'cam quýt nhạt': .45, 'cam quả hồng': .45, 'hổ phách / đất nung': .45,
        'xanh lá non tươi': .45, 'hồng tro / tím khói': .62, 'xanh cổ vịt trầm': .62, 'ô liu': .45}   # + lift the dark Xuân greens / dark Thu reds (L1721 ✗)
_fit = M.fit


def fit(L0, C0, fam, t, S0=None, s=None, mc=None):
    if fam[0] in MAXC: mc = max(mc or 0, MAXC[fam[0]])
    return _fit(L0, C0, fam, t, S0, s, mc)


M.fit = fit


if __name__ == '__main__':
    M.main()
    d = json.load(open(M.DST))
    d['_note'] = ('L1726 PAL4 (owner L1726 approved L1721 recommendations): L1583 tone kept per person (OKLCH L/C, HSV S <= .72 for changed mains); '
                  'families per season feeling: Xuân tình đầu/đoàn viên, Hạ tự do/nắng+mát, Thu hoài niệm, Đông lạnh lẽo/cô quạnh. '
                  '★GỐC roots + s62 unchanged. Script dev/art/palettes3/four_season_L1726.py (engine four_season_L1709.py).')
    d['status'] = 'PROPOSAL L1726 — owner verdict pending; palettes_season_L1583.json unchanged; L1709 = draft'
    json.dump(d, open(M.DST, 'w'), ensure_ascii=False, indent=1)
