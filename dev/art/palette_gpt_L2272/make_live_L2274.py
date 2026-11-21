#!/usr/bin/env python3
"""PALGPT1 (OWNER L2274 verbatim: "Vậy thì giữ cái bảng màu của ChatGPT đi, bỏ cái bảng màu này vào game giùm tôi cái.")
Puts the ChatGPT palette v3 (dev/art/palette_gpt_L2272/atlas.html + parsed.json, L2272) into the LIVE game data. 0 gens, no prompt-file edits.
Mapping: inside each personality group, our consorts in sorted id order <-> GPT code 01..N (QR=Quyến rũ, SS=Sắc sảo, KK=Kiêu kỳ,
LL=Lạnh lùng, DD=Dịu dàng, DT=Đoan trang). GPT slot order per season: Main, Secondary, Accent, Flower, Veil, Feather outer/inner/tip.
Writes (old files kept once as *_preGPT_L2274.json history, never overwritten):
  face-common/palettes_season.json  B20 main/sec (+accent data, unused by the TWO-COLOUR builder); *_vi = GPT's own Vietnamese words,
                                    main/sec = English words from the existing helper chain (four_season_L1583.vi_sec -> make_live_L1726.en
                                    + make_live_L1726.disambiguate). root / root_drawn kept; where her root pair changes and she had no
                                    root_drawn, the old live root pair is saved as root_drawn (make_live_L1726 precedent; G50-released excepted).
  face-common/flower_colours_L2013.json  F20: embroidery = GPT flower; hair = GPT flower (hue allowed for hair) else the maker's own hair pick;
                                    then the maker's enforce() + hair_by_tier ramp (hair always lighter, F20) — make_flower_colours_L2013 logic.
  face-common/phibach_3rd_L1821.json  G56 veil (hạ/thu used by build_all.phi_bach; xuân/đông stored, unused per G36).
  phoenix_plumage_L2227.json        G33 plumage per person x season (outer/inner/tip) — REPLACES the L2235-approved 10 sets.
Run from repo root: python3 dev/art/palette_gpt_L2272/make_live_L2274.py"""
import json, os, re, sys, io, contextlib, collections, importlib.util
HERE = os.path.dirname(os.path.abspath(__file__)); ART = os.path.dirname(HERE); FC = os.path.join(ART, 'face-common')
sys.path.insert(0, os.path.join(ART, 'palettes3'))
with contextlib.redirect_stdout(io.StringIO()):
    import four_season_L1583 as F, make_live_L1726 as ML
_sp = importlib.util.spec_from_file_location('mfc', os.path.join(FC, 'make_flower_colours_L2013.py')); MFC = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(MFC)
SEAS = ['xuan', 'ha', 'thu', 'dong']
OWNER = 'OWNER L2274 verbatim: "Vậy thì giữ cái bảng màu của ChatGPT đi, bỏ cái bảng màu này vào game giùm tôi cái."'
GROUP = {'QR': 'Quyến rũ', 'SS': 'Sắc sảo', 'KK': 'Kiêu kỳ', 'LL': 'Lạnh lùng', 'DD': 'Dịu dàng', 'DT': 'Đoan trang'}
SLOTS = ['main', 'sec', 'accent', 'flower', 'veil', 'f_outer', 'f_inner', 'f_tip']
HH_YELLOW = '#EFBD69'
ML.BASE.setdefault('vàng chanh', 'lemon yellow')   # the only helper family word missing from make_live_L1726.BASE (7 olive-lemon GPT colours)

def en(h): return ML.en(F.vi_sec(h))

def atlas():
    h = open(os.path.join(HERE, 'atlas.html'), encoding='utf-8').read(); rows = {}
    for m in re.finditer(r'<tr><td><b>([A-Z]{2}\d\d)</b></td>(.*?)</tr>', h, re.S):
        if m.group(1) in rows: continue
        tds = re.findall(r'<td>(.*?)</td>', m.group(2), re.S)
        rows[m.group(1)] = [{SLOTS[i]: (x.upper(), n.strip()) for i, (x, n) in enumerate(
            re.findall(r'<i style="background:(#[0-9A-Fa-f]{6})"></i>([^<]*)<code>#[0-9A-Fa-f]{6}</code>', td))} for td in tds]
    par = {c: s for c, s in json.load(open(os.path.join(HERE, 'parsed.json'), encoding='utf-8'))}
    for c, ss in par.items():   # html names and parsed.json hexes must agree
        assert [[v[0] for v in (rows[c][i][k] for k in SLOTS)] for i in range(4)] == [[x.upper() for x in s] for s in ss], c
    return rows

def keep_hist(name):
    src = os.path.join(FC if name != 'phoenix_plumage_L2227.json' else ART, name)
    dst = src.replace('.json', '_preGPT_L2274.json')
    if not os.path.exists(dst): open(dst, 'w', encoding='utf-8').write(open(src, encoding='utf-8').read())
    return json.load(open(dst, encoding='utf-8'))

def mapping(P):
    ppl = sorted(k for k in P if k[0] in 'mcs' and k[1:].isdigit())
    by = collections.defaultdict(list)
    for k in ppl: by[P[k]['group']].append(k)
    rev = {v: k for k, v in GROUP.items()}; mp = {}
    for g, ks in by.items():
        for i, k in enumerate(ks, 1): mp[k] = f'{rev[g]}{i:02d}'
    return mp

def main():
    A = atlas()
    P0 = keep_hist('palettes_season.json'); F0 = keep_hist('flower_colours_L2013.json')
    B0 = keep_hist('phibach_3rd_L1821.json'); X0 = keep_hist('phoenix_plumage_L2227.json')
    mp = mapping(P0)
    cnt = collections.Counter(c[:2] for c in mp.values())
    assert cnt == collections.Counter(c[:2] for c in A), (cnt, collections.Counter(c[:2] for c in A))
    rel = {x.split()[0] for x in P0.get('_g50_released', [])}
    # ---- B20 palettes_season.json
    out = {'_note': f'LIVE B20 = ChatGPT palette v3 (L2272 atlas dev/art/palette_gpt_L2272/) put into the game by PALGPT1, {OWNER} '
                    'Mapping: within each group, sorted ids <-> GPT 01..N (gpt_code). main_hex/sec_hex = GPT; main_vi/sec_vi = GPT Vietnamese words; '
                    'main/sec = English words (existing helper four_season_L1583.vi_sec -> make_live_L1726.en + disambiguate); accent_* = GPT 3rd '
                    'colour (data only: the builder TWO-COLOUR rule uses main+sec). main_before/sec_before = the pre-L2274 live hexes. root/root_drawn kept; '
                    'new root_drawn = old live root pair where it changed (picture drawn in it). Maker dev/art/palette_gpt_L2272/make_live_L2274.py. '
                    'History: palettes_season_preGPT_L2274.json (= LIVE L1726). Previous note: ' + P0['_note'][:400],
           'status': 'LIVE (B20) since PALGPT1 L2274; source dev/art/palette_gpt_L2272/parsed.json; history palettes_season_preGPT_L2274.json, palettes_season_preL1726.json',
           'root_season_counts': {}, '_clashes': [], '_fails': [], '_fails_preGPT_L2274': P0.get('_fails', []),
           '_g50_released': P0.get('_g50_released', []), '_families': {}}
    n_rd = 0
    for k in sorted(mp):
        v = P0[k]; code = mp[k]; e = {x: y for x, y in v.items() if x not in SEAS}; e['gpt_code'] = code
        for i, s in enumerate(SEAS):
            o = v[s]; g = A[code][i]; p = dict(o)
            for f in ('main', 'sec'):
                hx, vi = g[f]
                p[f + '_before'] = o[f + '_hex']; p[f + '_hex'] = hx; p[f + '_vi'] = vi; p[f + '_vi_hex'] = f'{vi} {hx}'; p[f] = en(hx)
            p['accent_hex'], p['accent_vi'] = g['accent']; p['accent'] = en(g['accent'][0])
            p['_fam'] = F.vi_sec(g['main'][0])
            if o.get('root') and not isinstance(o.get('root_drawn'), dict) and k not in rel and (o['main_hex'], o['sec_hex']) != (p['main_hex'], p['sec_hex']):
                p['root_drawn'] = {x: o[x] for x in ('main', 'main_hex', 'sec', 'sec_hex')}; p['root_drawn']['_why'] = 'PALGPT1: her picture was drawn in the pre-L2274 live root pair'; n_rd += 1
            e[s] = p
        out[k] = e
    ML.disambiguate(out)
    ppl = [k for k in out if k in mp]
    def vivid(h):
        c = ML._oklch(h)[1]; return 'muted' if c < .08 else 'vivid' if c > .14 else 'gentle'
    for s in SEAS:   # last pass (check_unique 'same name pair'): a chroma word from each hex on the colour that differs most
        grp = collections.defaultdict(list)
        for k in ppl: grp[(out[k][s]['main'], out[k][s]['sec'])].append(k)
        for ks in grp.values():
            if len(ks) < 2: continue
            for f in ('main', 'sec'):
                if len({vivid(out[k][s][f + '_hex']) for k in ks}) == len(ks):
                    for k in ks: out[k][s][f] = vivid(out[k][s][f + '_hex']) + ' ' + out[k][s][f]
                    break
            else:
                for n, k in enumerate(ks): out[k][s]['sec'] = ('paler ', 'deeper ', 'brighter ', 'duskier ')[n % 4] + out[k][s]['sec'] if n else out[k][s]['sec']
    for k in ppl:   # the 4 helper passes can stack the same word ('clear clear ...'): keep one
        for s in SEAS:
            for f in ('main', 'sec'): out[k][s][f] = re.sub(r'\b(\w[\w-]*) \1\b', r'\1', out[k][s][f])
    out['root_season_counts'] = dict(collections.Counter(out[k]['root_season'] for k in ppl))
    out['_families'] = {s: dict(collections.Counter(out[k][s]['_fam'] for k in ppl).most_common()) for s in SEAS}
    json.dump(out, open(os.path.join(FC, 'palettes_season.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    # ---- F20 flower_colours_L2013.json (maker logic: enforce + ramp)
    fo = {'_note': f'F20 FLOWER COLOURS = ChatGPT palette v3 flower colour (PALGPT1, {OWNER}). embroidery = GPT "Hoa"; hair = GPT "Hoa" when its hue is '
                   'allowed in hair (pink/cream/lilac, F19 never yellow) else make_flower_colours_L2013.flower(hair); then the L2013 maker\'s enforce() '
                   '(hair always lighter, dE>=14 vs main) and hair_by_tier ramp t1..t6 (same code). History flower_colours_L2013_preGPT_L2274.json. '
                   'Maker dev/art/palette_gpt_L2272/make_live_L2274.py.', '_tone_classes': F0.get('_tone_classes')}
    fl_warn = []
    for k in sorted(mp):
        d = out[k]; rec = {'group': d['group']}
        for i, s in enumerate(SEAS):
            m, sc = d[s]['main_hex'], d[s]['sec_hex']; gf, gfv = A[mp[k]][i]['flower']
            cl = MFC.tone(m, sc, d['group']); ee = gf
            Lg, Cg, Hg = MFC.h2o(gf)
            hh = gf if (Cg < 0.025 or Hg >= 295 or Hg <= 60) else MFC.flower(m, sc, d['group'], 'hair', Lg)
            hh = MFC.gamut(min(0.95, Lg + 0.06), *MFC.h2o(hh)[1:]) if hh == gf else hh   # hair one step lighter than embroidery (F20)
            ee, hh = MFC.enforce(m, ee, hh)
            Lh, Ch, Hh = MFC.h2o(hh); ramp = {}
            for t in range(1, 7):
                f = (t - 1) / 5; ramp[f't{t}'] = MFC.gamut(min(0.97, Lh + 0.03 - 0.06 * f), min(MFC.CLS[cl]['cap'] * MFC.GF.get(d['group'], 0.9), Ch * (0.8 + 0.4 * f)), Hh) if Ch > 0.01 else hh
            Le = MFC.h2o(ee)[0]
            for t_ in ramp:
                if MFC.h2o(ramp[t_])[0] < Le + 0.02:
                    Lq, Cq, Hq = MFC.h2o(ramp[t_]); ramp[t_] = MFC.gamut(min(0.97, Le + 0.02), Cq, Hq)
            if MFC.dE(ee, m) < 14: fl_warn.append(f'{k} {s}: embroidery {ee} dE {MFC.dE(ee, m):.1f} < 14 vs main {m}')
            rec[s] = {'tone': cl, 'main_hex': m, 'main_vi': d[s]['main_vi'], 'sec_hex': sc, 'sec_vi': d[s]['sec_vi'], 'gpt_flower_hex': gf, 'gpt_flower_vi': gfv,
                      'embroidery_hex': ee, 'embroidery_vi': gfv if ee == gf else MFC.name_vi(ee), 'hair_hex': hh, 'hair_vi': MFC.name_vi(hh), 'hair_by_tier': ramp}
        fo[k] = rec
    json.dump(fo, open(os.path.join(FC, 'flower_colours_L2013.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    # ---- G56 phibach_3rd_L1821.json
    bo = {'_note': f'G56 PHI BẠCH 3RD COLOUR = ChatGPT palette v3 "Voan" (PALGPT1, {OWNER}). hạ/thu used by build_all.phi_bach (G36: phi bạch only hạ + thu); '
                   'xuân/đông stored for the record, unused. Thin gold edge kept (G56). prompt_colour = English helper words + hex. '
                   'History phibach_3rd_L1821_preGPT_L2274.json. Maker dev/art/palette_gpt_L2272/make_live_L2274.py.', '_usage': {}}
    for k in sorted(mp):
        r = {}
        for i, s in enumerate(SEAS):
            hx, vi = A[mp[k]][i]['veil']; m, sc = out[k][s]['main_hex'], out[k][s]['sec_hex']
            r[s] = {'hex': hx, 'name_vi': vi, 'name_en': en(hx), 'main_hex': m, 'main_vi': out[k][s]['main_vi'], 'sec_hex': sc, 'sec_vi': out[k][s]['sec_vi'],
                    'dE_main': round(MFC.dE(hx, m), 1), 'dE_sec': round(MFC.dE(hx, sc), 1), 'prompt_colour': f'{en(hx)} silk (like {hx})', **({} if s in ('ha', 'thu') else {'used': False})}
        bo[k] = r
    bo['_usage'] = {s: dict(collections.Counter(bo[k][s]['hex'] for k in mp)) for s in ('ha', 'thu')}
    json.dump(bo, open(os.path.join(FC, 'phibach_3rd_L1821.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    # ---- G33 phoenix plumage
    xo = {'_note': f'G33 PHOENIX PLUMAGE = ChatGPT palette v3 per person x season (PALGPT1, {OWNER}). REPLACES the 10 sets approved L2235 '
                   '("Bảng màu của Long Phượng. Ok, duyệt đi.") — those sets are kept in phoenix_plumage_L2227_preGPT_L2274.json. outer / inner / tip = '
                   'GPT "Lông phượng ngoài / trong / đầu lông"; gold-thread outline always; crown phoenix inlay = same colours (G33 L1423). Only t7/t8, Thái hậu, Nữ đế. '
                   'Builder wiring still pending (as before). Maker dev/art/palette_gpt_L2272/make_live_L2274.py.',
          'people': {}}
    for k in sorted(mp):
        xo['people'][k] = {'gpt_code': mp[k], **{s: {f: {'hex': A[mp[k]][i]['f_' + f][0], 'vi': A[mp[k]][i]['f_' + f][1], 'en': en(A[mp[k]][i]['f_' + f][0])}
                                                       for f in ('outer', 'inner', 'tip')} | {'outline': 'gold thread'} for i, s in enumerate(SEAS)}}
    open(os.path.join(ART, 'phoenix_plumage_L2227.json'), 'w', encoding='utf-8').write(json.dumps(xo, ensure_ascii=False, indent=1) + '\n')
    # ---- checks + mapping table
    allhex = {A[c][i][f][0] for c in A for i in range(4) for f in SLOTS}
    yel = min(MFC.dE(HH_YELLOW, h) for h in allhex)
    json.dump({'mapping': mp, 'root_drawn_added': n_rd, 'flower_dE_warn': fl_warn, 'min_dE_any_gpt_hex_vs_HH_yellow': round(yel, 1)},
              open(os.path.join(HERE, 'mapping_L2274.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'people {len(mp)}; root_drawn added {n_rd}; flower warn {len(fl_warn)}; HH yellow in GPT set: {HH_YELLOW in allhex}, min dE {yel:.1f}')

if __name__ == '__main__': main()
