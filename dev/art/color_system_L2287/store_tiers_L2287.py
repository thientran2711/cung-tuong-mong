#!/usr/bin/env python3
"""PALGPT1 job 2 (ROOT-B8 brief, owner L2287 attached Imperial_Court_Color_System_Handoff.xml; DESIGN_BIBLE §5).
DATA ONLY, 0 gens, no prompt files, no rule changes. The builder does NOT read any of this yet (no TIER_PAL wired).
(1) verify XML tier 2 (medium) == palette_gpt_L2272/parsed.json == LIVE files (palettes_season / flower GPT / veil / plumage);
(2) store tier 1 (light, t1-3) + tier 3 (deep, t7-8) as `by_tier.{light,deep}` inside each person x season of the 4 LIVE files,
    every entry status "proposal_L2287" (NOT approved); medium = the live value itself (not duplicated);
(3) store Royal gold + Chu Sa #B62832 + t6/t7/t8 royal rank rules as `_royal_L2287` (status unapproved) in palettes_season.json;
(4) one swatch sheet per group, xuân, light | medium | deep, our sNN ids -> sheet_L2287_xuan_<GROUP>.png here.
Names: XML gives only English names; *_vi / English prompt words use the same helper chain as make_live_L2274.py.
Run from repo root: python3 dev/art/color_system_L2287/store_tiers_L2287.py"""
import json, os, sys, io, contextlib, collections, xml.etree.ElementTree as ET
HERE = os.path.dirname(os.path.abspath(__file__)); ART = os.path.dirname(HERE); FC = os.path.join(ART, 'face-common')
sys.path.insert(0, os.path.join(ART, 'palettes3'))
with contextlib.redirect_stdout(io.StringIO()):
    import four_season_L1583 as F, make_live_L1726 as ML
ML.BASE.setdefault('vàng chanh', 'lemon yellow')
SEAS = {'Spring': 'xuan', 'Summer': 'ha', 'Autumn': 'thu', 'Winter': 'dong'}; S4 = ['xuan', 'ha', 'thu', 'dong']
ROLES = ['main', 'secondary', 'accent', 'floral', 'gauze', 'phoenix-outer', 'phoenix-inner', 'phoenix-tip']
TIER = {'1': 'light', '2': 'medium', '3': 'deep'}; ST = 'proposal_L2287'
def en(h): return ML.en(F.vi_sec(h))
def vi(h): return F.vi_sec(h)

def main():
    X = ET.parse(os.path.join(HERE, 'Imperial_Court_Color_System_Handoff.xml')).getroot()
    pal = {}
    for p in X.iter('Palette'):
        pal[(p.get('character'), SEAS[p.get('season')], TIER[p.get('tier')])] = {c.get('role'): (c.get('hex').upper(), c.get('name')) for c in p.iter('Color')}
    assert len(pal) == 1080, len(pal)
    G = {c: s for c, s in json.load(open(os.path.join(ART, 'palette_gpt_L2272', 'parsed.json'), encoding='utf-8'))}
    P = json.load(open(os.path.join(FC, 'palettes_season.json'), encoding='utf-8'))
    FL = json.load(open(os.path.join(FC, 'flower_colours_L2013.json'), encoding='utf-8'))
    VB = json.load(open(os.path.join(FC, 'phibach_3rd_L1821.json'), encoding='utf-8'))
    PH = json.load(open(os.path.join(ART, 'phoenix_plumage_L2227.json'), encoding='utf-8'))
    who = {v['gpt_code']: k for k, v in P.items() if isinstance(v, dict) and 'gpt_code' in v}
    diff = []
    for code, ss in G.items():   # (1) medium == source atlas == LIVE
        k = who[code]
        for i, s in enumerate(S4):
            m = pal[(code, s, 'medium')]; src = [x.upper() for x in ss[i]]
            if [m[r][0] for r in ROLES] != src: diff.append(f'{code} {s}: XML medium != palette_gpt_L2272')
            live = [P[k][s]['main_hex'], P[k][s]['sec_hex'], P[k][s]['accent_hex'], FL[k][s]['gpt_flower_hex'], VB[k][s]['hex'],
                    PH['people'][k][s]['outer']['hex'], PH['people'][k][s]['inner']['hex'], PH['people'][k][s]['tip']['hex']]
            if live != src: diff.append(f'{code}={k} {s}: LIVE != source ({[r for r, a, b in zip(ROLES, live, src) if a != b]})')
    # (2) store light + deep
    for code, k in who.items():
        for s in S4:
            for t in ('light', 'deep'):
                d = pal[(code, s, t)]
                P[k][s].setdefault('by_tier', {})[t] = {'status': ST, 'ranks': 't1-t3' if t == 'light' else 't7-t8',
                    **{f'{f}_hex': d[r][0] for f, r in (('main', 'main'), ('sec', 'secondary'), ('accent', 'accent'))},
                    **{f: en(d[r][0]) for f, r in (('main', 'main'), ('sec', 'secondary'), ('accent', 'accent'))},
                    **{f'{f}_vi': vi(d[r][0]) for f, r in (('main', 'main'), ('sec', 'secondary'), ('accent', 'accent'))},
                    'xml_names': {r: d[r][1] for r in ('main', 'secondary', 'accent')}}
                FL[k][s].setdefault('by_tier', {})[t] = {'status': ST, 'embroidery_hex': d['floral'][0], 'embroidery_vi': vi(d['floral'][0]), 'xml_name': d['floral'][1],
                    'note': 'hair flower not derived yet (L2013 enforce/ramp per tier runs only after approval)'}
                VB[k][s].setdefault('by_tier', {})[t] = {'status': ST, 'hex': d['gauze'][0], 'name_vi': vi(d['gauze'][0]), 'name_en': en(d['gauze'][0]), 'xml_name': d['gauze'][1],
                    'prompt_colour': f"{en(d['gauze'][0])} silk (like {d['gauze'][0]})", **({'note': 'no phi bạch at t7/t8 (G34): stored only'} if t == 'deep' else {})}
                PH['people'][k][s].setdefault('by_tier', {})[t] = {'status': ST, **{f: {'hex': d['phoenix-' + f][0], 'vi': vi(d['phoenix-' + f][0]), 'en': en(d['phoenix-' + f][0]), 'xml_name': d['phoenix-' + f][1]}
                    for f in ('outer', 'inner', 'tip')}, **({'note': 'phoenix only t7/t8: light stored only'} if t == 'light' else {})}
    # (3) royal colour system (unapproved)
    R = X.find('RoyalColorSystem')
    P['_royal_L2287'] = {'status': 'UNAPPROVED proposal_L2287 (owner L2287: do not treat proposed HEX as approved)',
        'colours': [{'name': c.get('name'), 'hex': c.get('hex'), 'xml_status': c.get('status')} for c in R.findall('Color')],
        'rank_rules': {f"t{r.get('rank')}": {'name': r.get('name'), 'rule': r.text} for r in R.findall('RankRule')},
        'placement_note': R.findtext('PlacementNote'), 'lower_ranks': R.findtext('LowerRanks'),
        'confirmed_by_owner': 'royal gold + Chu Sa red allowed at t6/t7/t8 with growing presence (DESIGN_BIBLE §5 CONFIRMED); exact Chu Sa HEX and coverage % NOT approved',
        'builder': 'not wired'}
    P['_tiers_L2287'] = {'status': ST, 'tiers': {'light': 't1-t3', 'medium': 't4-t6 (= the live season value itself)', 'deep': 't7-t8'},
        'source': 'dev/art/color_system_L2287/Imperial_Court_Color_System_Handoff.xml', 'builder': 'NOT read by build_all (single season value used until the owner approves tiers)'}
    for fn, obj in ((os.path.join(FC, 'palettes_season.json'), P), (os.path.join(FC, 'flower_colours_L2013.json'), FL), (os.path.join(FC, 'phibach_3rd_L1821.json'), VB)):
        json.dump(obj, open(fn, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    open(os.path.join(ART, 'phoenix_plumage_L2227.json'), 'w', encoding='utf-8').write(json.dumps(PH, ensure_ascii=False, indent=1) + '\n')
    # (4) sheets
    from PIL import Image, ImageDraw, ImageFont
    fb = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 18); f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 14)
    ft = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 26); fs = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 12)
    GN = {'QR': 'Quyến rũ', 'SS': 'Sắc sảo', 'KK': 'Kiêu kỳ', 'LL': 'Lạnh lùng', 'DD': 'Dịu dàng', 'DT': 'Đoan trang'}
    SL = ['Chính', 'Phụ', 'Nhấn', 'Hoa', 'Voan', 'L.ngoài', 'L.trong', 'L.đầu']
    SW, SH, LW, GAP = 50, 38, 150, 26
    for pre, gname in GN.items():
        ppl = sorted(c for c in who if c.startswith(pre)); W = LW + 3 * (8 * SW + GAP) + 20; H = 110 + len(ppl) * (SH + 14) + 20
        im = Image.new('RGB', (W, H), '#FAF8F4'); d = ImageDraw.Draw(im)
        d.text((20, 14), f'{gname} ({pre}) — XUÂN theo bậc (L2287, nhạt/đậm = ĐỀ XUẤT chưa duyệt)', font=ft, fill='#302A35')
        for j, (t, tv) in enumerate((('light', 'NHẠT t1–3 (đề xuất)'), ('medium', 'VỪA t4–6 (= bảng hiện tại)'), ('deep', 'ĐẬM t7–8 (đề xuất)'))):
            x0 = LW + j * (8 * SW + GAP); d.text((x0, 56), tv, font=fb, fill='#302A35')
            for i, n in enumerate(SL): d.text((x0 + i * SW + 2, 84), n, font=fs, fill='#555')
        for r, code in enumerate(ppl):
            y = 106 + r * (SH + 14); d.text((16, y + 8), who[code], font=fb, fill='#302A35'); d.text((78, y + 11), f'= {code}', font=f, fill='#683967')
            for j, t in enumerate(('light', 'medium', 'deep')):
                x0 = LW + j * (8 * SW + GAP)
                for i, ro in enumerate(ROLES): d.rectangle([x0 + i * SW, y, x0 + i * SW + SW - 4, y + SH], fill=pal[(code, 'xuan', t)][ro][0], outline='#0003')
        im.save(os.path.join(HERE, f'sheet_L2287_xuan_{pre}.png'), optimize=True)
    json.dump({'medium_diffs': diff, 'palettes': len(pal), 'status': ST}, open(os.path.join(HERE, 'verify_L2287.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('palettes', len(pal), 'medium diffs', len(diff), diff[:5])

if __name__ == '__main__': main()
