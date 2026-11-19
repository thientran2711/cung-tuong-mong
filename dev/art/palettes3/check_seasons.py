"""Check dev/art/face-common/palettes_season.json (B20 seasons, owner Lượt 616). Prints FAIL lines; exit 1 on any FAIL.
 - ROOT: each woman's root palette = her approved palette (or, owner Lượt 770, a changed CODE with the drawn one kept in
   root_drawn), in the season classify() gives it (seasons.py), inside the one Xuân/Hạ tone (owner Lượt 769).
 - FOUR: every woman has xuân, hạ, thu, đông.
 - SEASON: every generated palette passes target_ok() for its season (season rule + margins, see seasons.py).
 - CONTRAST: main vs secondary as in gen_palettes3.contrast_ok (other hue family, hue or lightness gap, dE floor tied to her root)
   plus: hues < 110° apart need a lightness gap >= 0.15 (unless one colour is ivory/white).
 - NO GREY (B19): chroma >= 0.045 for non-white colours. TONE (B18): chroma <= 0.127 (strongest approved colour), lightness 0.45–0.93.
 - NO YELLOW (B21/G4): no gold/deep-yellow colour (OKLCH hue 80–100° with chroma > 0.06), nothing near royal yellow #EFBD69.
 - SPREAD: next rows never share a season's main, no look-alike palettes 1–2 rows apart, a pair used at most twice
   and >= 10 rows apart; a woman's own 4 palettes never look alike.
"""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from colourlib import *
from seasons import SEASONS, classify, target_ok, VN, in_tone
from gen_palettes3 import load_p1, contrast_ok, lookalike
from gen_seasons import season_contrast

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
d = json.load(open(os.path.join(ROOT, 'dev/art/face-common/palettes_season.json')))
roots = load_p1()
ids = [k for k in d if not k.startswith('_') and k not in ('status', 'root_season_counts')]
fails = []
def bad(m): fails.append('FAIL ' + m)
pairs = {}
for i, k in enumerate(ids):
    r = d[k]; root = roots[k]; rs = r['root_season']; rp0 = r.get(rs, {})
    if classify(rp0.get('main_hex', root['main_hex']), rp0.get('sec_hex', root['sec_hex'])) != rs:
        bad(f'{k}: root season {rs} but its root pair classifies as {classify(rp0["main_hex"], rp0["sec_hex"])}')
    rp = r.get(rs, {})
    # owner Lượt 770: pictures never redrawn, but root CODES may change; the drawn codes stay in root_drawn.
    # m / c roots: root_drawn (or the root itself) = approved palette; s roots: root = s_root_colours.json (current code)
    drawn = rp.get('root_drawn', rp) if not k.startswith('s') else rp
    if not rp.get('root') or any(drawn.get(x) != root[x] for x in ('main', 'main_hex', 'sec', 'sec_hex')):
        bad(f'{k}: root palette changed or missing in {VN[rs]}')
    if rp.get('root') and not (in_tone(rp['main_hex'], 'm') and in_tone(rp['sec_hex'], 's')):
        bad(f'{k}: root {rp["main_hex"]}/{rp["sec_hex"]} outside the one Xuân/Hạ tone (owner Lượt 769)')
    for se in SEASONS:
        if se not in r: bad(f'{k}: missing {VN[se]}'); continue
        p = r[se]; mh, sh = p['main_hex'], p['sec_hex']
        pairs.setdefault((p['main'], p['sec']), []).append((i, f'{k}{VN[se]}', p.get('root', False)))
        if p.get('root'): continue
        tag = f'{k} {VN[se]} ({p["main"]} {mh} + {p["sec"]} {sh})'
        if not target_ok(se, mh, sh): bad(f'{tag}: does not read as {VN[se]} (classifies {VN[classify(mh, sh)]})')
        if not contrast_ok(mh, sh, dE(rp0['main_hex'], rp0['sec_hex'])) or not season_contrast(mh, sh):
            bad(f'{tag}: weak main/secondary contrast (hue {hue_dist(mh, sh):.0f}°, dE {dE(mh, sh):.2f})')
        for h in (mh, sh):
            L, C, H = oklch(h)
            if greyish(h): bad(f'{tag}: {h} greyish (chroma {C:.3f})')
            if C > 0.127: bad(f'{tag}: {h} too strong (chroma {C:.3f})')
            if not (0.45 <= L <= 0.93): bad(f'{tag}: {h} lightness {L:.2f}')
            if (80 <= H < 100 and C > 0.06) or dE(h, '#EFBD69') < 0.045: bad(f'{tag}: {h} reads yellow/gold')
    have = [s for s in SEASONS if s in r]
    for a in range(len(have)):
        for b in range(a + 1, len(have)):
            pa, pb = r[have[a]], r[have[b]]
            if lookalike((pa['main_hex'], pa['sec_hex']), (pb['main_hex'], pb['sec_hex']), 1):
                bad(f'{k}: own palettes {VN[have[a]]} and {VN[have[b]]} look alike')
    for j in range(i + 1, min(i + 3, len(ids))):
        n = d[ids[j]]
        for se in SEASONS:
            if se not in r or se not in n: continue
            a, b = r[se], n[se]
            if a.get('root') and b.get('root'): continue
            if j == i + 1 and a['main'] == b['main']: bad(f'{k}/{ids[j]} {VN[se]} share main "{a["main"]}"')
            if lookalike((a['main_hex'], a['sec_hex']), (b['main_hex'], b['sec_hex']), j - i):
                bad(f'{k}/{ids[j]} {VN[se]} look alike ({a["main"]}+{a["sec"]} vs {b["main"]}+{b["sec"]})')
for key, who in pairs.items():
    if len(who) > 1 and not all(w[2] for w in who):
        pos = sorted(w[0] for w in who)
        if len(who) > 2 or min(b - a for a, b in zip(pos, pos[1:])) < 10:
            bad(f'same pair {key[0]} + {key[1]}: {", ".join(w[1] for w in who)}')
for x in fails: print(x)
cnt = {VN[s]: sum(1 for k in ids if d[k]['root_season'] == s) for s in SEASONS}
print(f'{len(ids)} women; root palettes per season: {cnt}; {len(fails)} FAIL')
sys.exit(1 if fails else 0)
