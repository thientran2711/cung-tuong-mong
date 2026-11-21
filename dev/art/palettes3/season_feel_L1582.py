"""THUPAL1 — owner L1582 ("trang phục mùa thu ... nó màu hồng không à, cái như là mùa xuân") + L1583 (pink is not banned in
Thu; the MAIN colour of each season must carry that season's feeling, the SECONDARY is free but must suit the main).
NO palette change: reads palettes_season_deep.json, writes an audit JSON + proposal for s62 (owner picks first).

SEASON FEELING TEST (costume-colour expert model, OKLCH; nearest prototype by ΔE2000 decides what the MAIN 'reads as'):
  XUÂN  hoa nở, chồi non — trong, tươi: hồng, hồng hoa đào, hồng mẫu đơn, đỏ Tết, xanh lá non   (clear, C ≈ .12–.15)
  HẠ    nắng — ấm, sáng, tươi: cam đào, cam mơ, cam san hô, vàng xoài, vàng chanh                 (clear warm, C ≈ .12)
  THU   mùa gặt, lá chuyển màu — ấm, đất, hơi trầm (muted): gạch / đất nung, cam quả hồng trầm, hổ phách,
        vàng nghệ dịu, ô liu, rêu, hồng đất (hồng gỗ), đỏ lá phong (chỉ khi trầm)                 (muted warm, C ≈ .06–.09)
  ĐÔNG  băng, ngọc, đêm — lạnh: xanh băng, lam ngọc, chàm, tím, tím mận, ngọc bích, mòng két          (cool, C ≈ .08–.10)
Run: python3 dev/art/palettes3/season_feel_L1582.py
"""
import json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from colourlib import oklch, family
import four_season86 as B
import check_unique as CU

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
SRC = os.path.join(ROOT, 'dev/art/face-common/palettes_season_deep.json')
OUT = os.path.join(ROOT, 'dev/handover/review-sheets/thu_palette_L1582')
de = CU.de2000
SEAS = ('xuan', 'ha', 'thu', 'dong')
VN = dict(xuan='Xuân', ha='Hạ', thu='Thu', dong='Đông')

# prototypes: season, OKLCH hue, chroma, Vietnamese name, lightness levels
PROTO = [
    ('xuan', 0, .12, 'hồng xuân'), ('xuan', 12, .12, 'hồng hoa đào'), ('xuan', 350, .13, 'hồng mẫu đơn'),
    ('xuan', 25, .15, 'đỏ Tết'), ('xuan', 140, .12, 'xanh lá non'),
    ('ha', 35, .13, 'cam san hô'), ('ha', 48, .12, 'cam đào'), ('ha', 62, .12, 'cam mơ'), ('ha', 75, .12, 'vàng xoài'),
    ('ha', 100, .11, 'vàng chanh'),
    ('thu', 35, .08, 'đất nung / gạch'), ('thu', 50, .085, 'cam quả hồng trầm'), ('thu', 70, .075, 'hổ phách'),
    ('thu', 92, .065, 'vàng nghệ dịu'), ('thu', 115, .065, 'ô liu'), ('thu', 128, .06, 'rêu'), ('thu', 20, .07, 'hồng đất'),
    ('dong', 235, .08, 'xanh băng'), ('dong', 260, .10, 'lam ngọc'), ('dong', 285, .10, 'chàm'), ('dong', 305, .10, 'tím'),
    ('dong', 330, .10, 'tím mận'), ('dong', 170, .09, 'ngọc bích'), ('dong', 200, .08, 'mòng két'),
]
LEVELS = (.45, .55, .65, .75, .85)
PROTOS = [(s, n, L, B.lch2hex(L, c, h)) for s, h, c, n in PROTO for L in LEVELS]
PROTOS += [('thu', 'đỏ lá phong trầm', L, B.lch2hex(L, .11, 30)) for L in (.45, .55)]   # maple only when deep
PROTOS += [('thu', 'đỏ rượu trầm', L, B.lch2hex(L, .11, 8)) for L in (.40, .48)]        # deep burgundy = rich autumn


def feel(hx):
    """-> (season it reads as, prototype name, ΔE to it, ΔE to the nearest Thu prototype)"""
    best = min(PROTOS, key=lambda p: de(hx, p[3]))
    thu = min((p for p in PROTOS if p[0] == 'thu'), key=lambda p: de(hx, p[3]))
    return best[0], best[1], de(hx, best[3]), de(hx, thu[3])


def pinkish(hx):
    L, c, h = oklch(hx)
    return (h >= 320 or h < 22) and c >= .06


def audit(d):
    ppl = [k for k in d if not k.startswith('_') and k != 'status']
    rows, wrong = [], {s: [] for s in SEAS}
    for p in ppl:
        r = d[p]; row = dict(id=p, group=r['group'])
        for s in SEAS:
            se = r[s]; f = feel(se['main_hex'])
            row[s] = dict(main=se['main_hex'], main_vi=se.get('main_vi') or se['main'], sec=se['sec_hex'],
                          sec_vi=se.get('sec_vi') or se['sec'], reads=f[0], proto=f[1], root=bool(se.get('root')))
            if f[0] != s: wrong[s].append(p)
        t, x = r['thu'], r['xuan']
        row['thu_vs_xuan'] = dict(main_main=round(de(t['main_hex'], x['main_hex']), 1),
                                  main_sec=round(de(t['main_hex'], x['sec_hex']), 1),
                                  sec_sec=round(de(t['sec_hex'], x['sec_hex']), 1))
        row['thu_pink_main'] = pinkish(t['main_hex']); row['thu_pink_sec'] = pinkish(t['sec_hex']) or (
            oklch(t['sec_hex'])[2] >= 330 or oklch(t['sec_hex'])[2] < 20) and oklch(t['sec_hex'])[1] >= .02
        xpink = pinkish(x['main_hex'])
        # "spring-pink in autumn": Thu main is pink/rose/plum AND (light, or Xuân is pink too, or close to Xuân)
        L = oklch(t['main_hex'])[0]
        row['spring_pink'] = row['thu_pink_main'] and (L >= .62 or xpink or row['thu_vs_xuan']['main_main'] < 25)
        rows.append(row)
    return rows, wrong


# ---------- s62 options (found by search: season-feel test + A31 inside her 8 colours + least change; Đông = ★GỐC fixed) ----------
def neu(h):
    L, c, _ = oklch(h); return L >= .85 and c <= .075


def a31(cols):
    """A31 as the owner set it: ΔE2000 ≥ 20, light neutral vs light neutral ≥ 12 (L1015); colours of one family never twice"""
    bad = []
    for i in range(len(cols)):
        for j in range(i + 1, len(cols)):
            (x, n1), (y, n2) = cols[i], cols[j]; e = de(x, y)
            if e < (12 if neu(x) and neu(y) else 20): bad.append(f'{n1} ~ {n2} ΔE {e:.0f}')
            elif not neu(x) and not neu(y) and family(x) == family(y): bad.append(f'{n1} = {n2} cùng họ {family(x)}')
    return bad


KEEP = object()
OPTS = [
    dict(key='1', title='Chỉ đổi Thu (Xuân · Hạ · Đông giữ nguyên)',
         why='Thu = lá ô liu cuối thu: xanh ô liu ánh vàng, dịu, nhạt — rõ là THU; phụ hồng tím phấn giữ nét nữ tính dịu dàng của cô (hồng được làm màu phụ, L1583)',
         xuan=KEEP, ha=KEEP, thu=('#97AF68', 'xanh ô liu dịu', 'soft olive green', '#FCCFE7', 'hồng tím phấn nhạt', 'pale orchid pink')),
    dict(key='2', title='Thu đất nung (đổi Xuân + Hạ chút ít cho hợp)',
         why='Thu = đất nung hồng: hồng pha cam đất, trầm dịu như lá phong ngả màu — ấm, mùa gặt; phụ trắng sương xanh cho sáng mặt. Xuân sang hồng xuân mát hơn, Hạ sang vàng chanh nắng để Thu có chỗ đứng',
         xuan=('#E680A1', 'hồng xuân', 'spring rose pink', '#FCEEEE', 'trắng hồng ngà', 'blush white'),
         ha=('#F4E798', 'vàng chanh sáng', 'light lemon yellow', '#C9CDF9', 'tím than nhạt', 'soft periwinkle'),
         thu=('#D59278', 'hồng đất nung dịu', 'soft terracotta rose', '#E7F4F9', 'trắng sương xanh', 'ice mist white')),
    dict(key='3', title='Thu quả hồng (đổi Xuân + Hạ chút ít cho hợp)',
         why='Thu = cam quả hồng trầm: màu quả hồng chín tháng chín, ấm, hơi trầm — đậm chất thu nhất; Xuân gần như giữ (hồng hoa đào), Hạ vàng chanh. Cần chủ xem có thấy "nâu" không',
         xuan=('#E98092', 'hồng hoa đào', 'peach-blossom pink', '#FCEEEE', 'trắng hồng ngà', 'blush white'),
         ha=('#F4E798', 'vàng chanh sáng', 'light lemon yellow', '#C9CDF9', 'tím than nhạt', 'soft periwinkle'),
         thu=('#CC8E6B', 'cam quả hồng trầm', 'muted persimmon', '#E7F9FF', 'trắng sương xanh', 'ice mist white')),
]


def s62_options(d):
    me = d['s62']; res = []
    for o in OPTS:
        sets = {}
        for s in SEAS:
            v = o.get(s, KEEP)
            if s == 'dong' or v is KEEP:
                sets[s] = dict(main=me[s]['main_hex'], main_vi='xanh băng' if s == 'dong' else me[s].get('main_vi'), sec=me[s]['sec_hex'],
                               sec_vi='bạc hà nhạt' if s == 'dong' else me[s].get('sec_vi'), changed=False, root=bool(me[s].get('root')))
            else:
                sets[s] = dict(main=v[0], main_vi=v[1], main_en=v[2], sec=v[3], sec_vi=v[4], sec_en=v[5], changed=True)
        cols = [(sets[s][k], f'{VN[s]} {"chính" if k == "main" else "phụ"}') for s in SEAS for k in ('main', 'sec')]
        for s in SEAS:
            st = sets[s]; f = feel(st['main'])
            st['reads'] = f[0]; st['proto'] = f[1]; st['bad'] = B.bad_colour(st['main'])
            st['contrast'] = round(de(st['main'], st['sec']), 1)
            pal = dict(main=st.get('main_en', 'x'), main_hex=st['main'], sec=st.get('sec_en', 'y'), sec_hex=st['sec'])
            st['uniq_fail'] = [k for k in d if not k.startswith('_') and k not in ('status', 's62')
                               and CU.pair_verdict(pal, d[k][s])[0] == 'FAIL'] if st['changed'] else []
        res.append(dict(key=o['key'], title=o['title'], why=o['why'], sets=sets, a31=a31(cols)))
    return res


if __name__ == '__main__':
    d = json.load(open(SRC))
    rows, wrong = audit(d)
    os.makedirs(OUT, exist_ok=True)
    opts = s62_options(d)
    json.dump(dict(rows=rows, wrong=wrong, s62_options=opts), open(os.path.join(OUT, 'audit.json'), 'w'),
              ensure_ascii=False, indent=1)
    for s in SEAS: print(VN[s], 'mains NOT reading as', VN[s], ':', len(wrong[s]), '/', len(rows))
    sp = [r['id'] for r in rows if r['spring_pink']]
    print('Thu spring-pink:', len(sp), sp)
    for o in opts:
        print('option', o['key'], 'A31:', o['a31'] or 'OK')
        for s in SEAS:
            st = o['sets'][s]; print('   ', VN[s], st['main'], st['main_vi'], '->', VN[st['reads']], st['proto'], '| phụ', st['sec'],
                                     st['sec_vi'], '| bad', st['bad'], '| uniq FAIL', st['uniq_fail'])
