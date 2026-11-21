#!/usr/bin/env python3
"""PAL5 (owner APPROVED L1726 via Foreman C #20: "Ok, duyệt bảng màu chung mới đi."): make palettes_season_L1726.json the LIVE
B20 palette dev/art/face-common/palettes_season.json.
- old live file kept as history: face-common/palettes_season_preL1726.json (written once, never overwritten)
- every person/season of L1726 copied as is (hexes, *_vi, root, _fam, main_L1583 ...), plus readers' schema:
  main / sec = ENGLISH colour words (build_all.py puts B20 'sec' / đông 'main'+'sec' into English prompts as written),
  main_vi / sec_vi = Vietnamese (sheets), main_vi_hex / sec_vi_hex = the L1726 'main'/'sec' strings ("hồng ... #HEX").
- root_drawn (L27: the colours her EXISTING picture was drawn with; check_store.root_pair uses it first) carried over from the old
  live file onto her L1726 root season, EXCEPT the G50-released people (owner L1645: ★GỐC recoloured, old pictures = kho skins).
- root_season_counts recomputed. Run from repo root: python3 dev/art/palettes3/make_live_L1726.py"""
import json, os, collections
FC = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'face-common')
SEAS = ['xuan', 'ha', 'thu', 'dong']
MOD = [('dịu sáng', 'soft light'), ('trầm sáng', 'light muted'), ('đậm vừa', 'medium-deep'), ('nhạt nhạt', 'pale'),
       ('thẫm', 'dark'), ('đậm', 'deep'), ('dịu', 'soft'), ('sáng', 'light'), ('nhạt', 'pale'), ('trầm', 'muted'),
       ('tươi', 'fresh'), ('sẫm', 'dark'), ('pastel', 'pastel')]
BASE = {
 'bạc hà': 'mint green', 'cam hồng': 'pinkish orange', 'cam mơ': 'apricot orange', 'cam quýt': 'tangerine', 'cam quả hồng': 'persimmon orange',
 'cam san hô': 'coral orange', 'cam đào': 'peach orange', 'chàm / lam đêm': 'indigo night blue', 'chàm': 'indigo blue', 'tím than': 'navy violet',
 'hồng': 'rose pink', 'hồng hoa đào': 'peach-blossom pink', 'hồng mẫu đơn': 'peony pink', 'hồng phấn': 'powder pink', 'hồng san hô': 'coral pink',
 'hồng sen': 'lotus pink', 'hồng tro / tím khói': 'mauve rose', 'hồng tím phấn': 'powder pink-lilac', 'hồng xuân': 'spring pink', 'hồng đất': 'earthy rose',
 'hổ phách / đất nung': 'amber terracotta', 'hổ phách': 'amber', 'kem chanh': 'lemon cream', 'kem mơ': 'apricot cream', 'kem đào': 'peach cream',
 'lam ngọc': 'sapphire blue', 'mòng két': 'teal', 'ngà': 'ivory', 'ngọc bích': 'jade green', 'ngọc': 'jade', 'rêu': 'moss green',
 'san hô dưa hấu': 'watermelon coral', 'trắng hồng': 'blush white', 'trắng ngà': 'ivory white', 'trắng sương': 'frost white', 'tím': 'violet',
 'tím hoa cà': 'lilac', 'tím khói': 'smoky lilac', 'tím mận': 'plum', 'tím than lạnh': 'cold navy violet', 'vàng hoa mai': 'apricot-blossom yellow',
 'vàng nghệ': 'turmeric yellow', 'vàng': 'yellow', 'vàng nắng': 'sunshine yellow', 'vàng xoài': 'mango yellow', 'xanh băng': 'ice blue',
 'xanh cổ vịt trầm': 'muted duck-teal', 'xanh cổ vịt': 'duck teal', 'xanh lá non tươi': 'fresh young-leaf green', 'xanh lá non': 'young-leaf green',
 'xanh lá sen / bạc hà': 'lotus-leaf mint green', 'xanh ngọc nước': 'aqua jade', 'xanh ngọc': 'jade turquoise', 'xanh sương': 'mist blue',
 'xanh trời': 'sky blue', 'xanh tùng trầm': 'dusky pine green', 'ô liu': 'olive green', 'đào': 'peach', 'đất nung / gạch': 'terracotta brick',
 'đỏ Tết': 'festive red', 'đỏ lá phong': 'maple red', 'đỏ mai đông': 'winter-plum red', 'đỏ rượu trầm': 'muted wine red', 'đỏ son Tết': 'festive vermilion',
 'ngọc pastel': 'pastel jade', 'tím pastel': 'pastel violet', 'đào pastel': 'pastel peach', 'xanh ngọc sương': 'misty jade', 'tím khói nhạt': 'pale smoky lilac',
}

def en(vi):
    s = vi.strip()
    if s in BASE: return BASE[s]
    if s.startswith('dịu '): return 'soft ' + en(s[4:])
    for m, e in MOD:
        if s.endswith(' ' + m):
            b = s[:-len(m) - 1]
            if b in BASE: return f'{e} {BASE[b]}'
            return f'{e} {en(b)}'
    raise KeyError(vi)

HUES = [(20, 'rose'), (40, 'coral'), (60, 'peach'), (80, 'amber'), (100, 'golden'), (120, 'lime'), (145, 'leaf'), (165, 'jade'),
        (190, 'aqua'), (215, 'sky'), (245, 'cornflower'), (275, 'periwinkle'), (305, 'lavender'), (335, 'orchid'), (360, 'rose')]

def _oklch(h):
    r, g, b = [(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4) for c in (int(h[i:i + 2], 16) / 255 for i in (1, 3, 5))]
    l = (0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b) ** (1 / 3); m = (0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b) ** (1 / 3)
    s = (0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b) ** (1 / 3)
    L, A, B = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s
    import math; return L, math.hypot(A, B), math.degrees(math.atan2(B, A)) % 360

def cast(h):
    return next(w for t, w in HUES if _oklch(h)[2] < t) + '-tinged'

def depth(h):
    L = _oklch(h)[0]; return 'airy' if L > .9 else 'clear' if L > .75 else 'rich' if L < .5 else 'mellow'

def disambiguate(out):
    """English names are coarser than hexes: where two people share (main, sec) words in a season, the word of the more different
    colour gets a hue-cast word from its own hex (then a depth word), so prompts never read the same (check_unique 'same name pair')."""
    ppl = [k for k in out if k[0] in 'mcs' and k[1:].isdigit()]
    for s in SEAS:
        for n, step in enumerate((cast, depth, cast, depth)):
            grp = collections.defaultdict(list)
            for k in ppl: grp[(out[k][s]['main'], out[k][s]['sec'])].append(k)
            for ks in grp.values():
                if len(ks) < 2: continue
                spread = lambda f: max(_oklch(out[k][s][f + '_hex'])[2] for k in ks) - min(_oklch(out[k][s][f + '_hex'])[2] for k in ks)
                f = 'main' if spread('main') >= spread('sec') else 'sec'
                if n >= 2: f = 'sec' if '-tinged' in out[ks[0]][s]['main'] else 'main'   # passes 3-4: the other colour
                for k in ks: out[k][s][f] = step(out[k][s][f + '_hex']) + ' ' + out[k][s][f]

def main():
    L = json.load(open(os.path.join(FC, 'palettes_season_L1726.json'), encoding='utf-8'))
    live = os.path.join(FC, 'palettes_season.json'); hist = os.path.join(FC, 'palettes_season_preL1726.json')
    if not os.path.exists(hist):
        open(hist, 'w', encoding='utf-8').write(open(live, encoding='utf-8').read())
    O = json.load(open(hist, encoding='utf-8'))
    rel = {x.split()[0] for x in L['_g50_released']}
    out = {'_note': 'LIVE B20 = palettes_season_L1726 (owner APPROVED via Foreman C #20, verbatim "bắt đầu ra đúng cái vibe, đúng cái cảm giác mà tao muốn rồi đó. '
                    'Ok, duyệt bảng màu chung mới đi."), 90 consorts incl. s62–s65. Written by dev/art/palettes3/make_live_L1726.py (PAL5): main/sec = English '
                    'words for prompts, main_vi/sec_vi = Vietnamese; root_drawn kept from the pre-L1726 live file (= palettes_season_preL1726.json, history) '
                    'except the G50-released roots. L1726 note: ' + L['_note'],
           'status': 'LIVE (B20) since PAL5; source palettes_season_L1726.json; history palettes_season_preL1726.json, palettes_season_L1583.json',
           'root_season_counts': {}}
    for k in ('_clashes', '_fails', '_g50_released', '_families'): out[k] = L[k]
    n_rd = 0
    for k, v in L.items():
        if k.startswith('_') or k == 'status' or not isinstance(v, dict) or 'root_season' not in v: continue
        e = {x: y for x, y in v.items() if x not in SEAS}
        for s in SEAS:
            p = dict(v[s]); p['main_vi_hex'], p['sec_vi_hex'] = p['main'], p['sec']
            p['main'], p['sec'] = en(p['main_vi']), en(p['sec_vi'])
            p.pop('root_drawn', None)
            e[s] = p
        o = O.get(k)
        if k not in rel and isinstance(o, dict) and 'root_season' in o:
            rd = o[o['root_season']].get('root_drawn')
            orp = o[o['root_season']]
            if not isinstance(rd, dict) and (orp['main_hex'], orp['sec_hex']) != (v[v['root_season']]['main_hex'], v[v['root_season']]['sec_hex']):
                rd = {x: orp[x] for x in ('main', 'main_hex', 'sec', 'sec_hex')}   # her picture was drawn in the old live root pair (e.g. c20)
            if isinstance(rd, dict): e[v['root_season']]['root_drawn'] = rd; n_rd += 1
        out[k] = e
    disambiguate(out)
    out['root_season_counts'] = dict(collections.Counter(out[k]['root_season'] for k in out if not k.startswith('_') and k not in ('status', 'root_season_counts')))
    json.dump(out, open(live, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'live written: {sum(1 for k in out if k[0] in "mcs" and k[1:].isdigit())} people, root_drawn kept {n_rd}, counts {out["root_season_counts"]}')

if __name__ == '__main__': main()
