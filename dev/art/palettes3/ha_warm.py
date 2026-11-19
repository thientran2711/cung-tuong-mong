"""Owner Lượt 752: Hạ (summer) was almost all blue / aqua / lilac -> give Hạ "a little yellow".
Re-picks the MAIN of about 39 % of the Hạ palettes (all 87 rows counted, ★ roots included) to a light, fresh
summer yellow / orange (lemon / sunflower / canary yellow, marigold, mango, apricot orange, tangerine, cantaloupe,
summer peach) at the Xuân+Hạ tone level (main C ~0.08, L 0.76-0.90 — yellows have to be light to read yellow and
not olive). Season rule: seasons.summer_warm (a warm Hạ needs a clearly cool secondary — blue / aqua / teal /
violet — so it differs from Xuân, and Lmin >= 0.65 / main L >= 0.76 so it is lighter and fresher than Thu).
The secondary is kept when it is already such a cool colour and contrasts; otherwise (pink / jade / dark teal,
which clash with a yellow-orange main or make it read Xuân / Thu) it is replaced by a cool blue / aqua / violet.
No gold: hue 80-100° with chroma > 0.06 and anything near royal yellow #EFBD69 stay banned (B21) — the yellows
used are the clean lemon side (hue 100-107°), the oranges stay below 72°.
Not touched: ★ root pairs, Xuân / Thu / Đông, the other Hạ rows.
Same rules as check_seasons.py. ONE-SHOT: run once, then check_seasons.py, then make_season_sheets_by_season.py."""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from colourlib import *
from seasons import SEASONS, target_ok, summer_warm, temp
from gen_palettes3 import load_p1, contrast_ok, lookalike
from gen_seasons import POOL, season_contrast
from xuan_pink import lch2hex, tone_ok

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
F = os.path.join(ROOT, 'dev/art/face-common/palettes_season.json')
SHARE = 0.39            # wanted share of warm yellow / orange Hạ mains (all rows)

WARM = [(n, lch2hex(L, C, H), kind) for n, L, C, H, kind in (
    ("sunflower yellow", 0.88, 0.095, 101, 'Y'), ("lemon yellow", 0.90, 0.090, 106, 'Y'),
    ("canary yellow", 0.86, 0.091, 103.5, 'Y'), ("marigold", 0.79, 0.088, 71, 'O'),
    ("mango", 0.79, 0.086, 65, 'O'), ("apricot orange", 0.78, 0.084, 59, 'O'),
    ("tangerine", 0.76, 0.090, 52, 'O'), ("cantaloupe", 0.80, 0.082, 56, 'O'),
    ("summer peach", 0.81, 0.076, 47, 'O'))]
WARM = [w for w in WARM if tone_ok(w[1])]

def ids_of(d): return [k for k in d if not k.startswith('_') and k not in ('status', 'root_season_counts')]

def main():
    d = json.load(open(F)); roots = load_p1(); ids = ids_of(d)
    cool_secs = [(n, h) for n, h, r in POOL if not is_white(h) and temp(h) <= -0.45 and tone_ok(h)]
    want = round(SHARE * len(ids))
    # rows that can be changed; prefer rows whose secondary is already cool enough (secondary kept)
    free = [k for k in ids if not d[k]['ha'].get('root')]
    pairs = {}
    for i, k in enumerate(ids):
        for se in SEASONS: pairs.setdefault((d[k][se]['main'], d[k][se]['sec']), []).append((i, se))
    use, done, log = {}, [], []
    for pos, k in enumerate(ids):
        if k not in free: continue
        i = ids.index(k); old = dict(d[k]['ha'])
        # even spread: convert when behind the running quota (a bit earlier when the secondary can stay)
        sec_cool = temp(old['sec_hex']) <= -0.45 and oklch(old['sec_hex'])[0] >= 0.65
        quota = SHARE * (pos + 1) + (1.0 if sec_cool else 0.0)
        if len(done) >= want or len(done) >= quota: continue
        rdE = dE(roots[k]['main_hex'], roots[k]['sec_hex'])
        near = [(d[ids[j]]['ha'], abs(j - i)) for j in (i - 2, i - 1, i + 1, i + 2) if 0 <= j < len(ids)]
        own = [d[k][se] for se in SEASONS if se != 'ha']
        prev_kind = [w[2] for w in WARM if any(q['main'] == w[0] for q, g in near)]
        best = None
        for m in WARM:
            if any(g == 1 and q['main'] == m[0] for q, g in near): continue
            for s in [(old['sec'], old['sec_hex'])] + cool_secs:
                if s[0] == m[0]: continue
                mh, sh = m[1], s[1]
                pu = [p for p in pairs.get((m[0], s[0]), []) if not (p[0] == i and p[1] == 'ha')]
                if len(pu) >= 2 or any(abs(p[0] - i) < 10 for p in pu): continue
                if not (summer_warm(mh, sh) and target_ok('ha', mh, sh) and contrast_ok(mh, sh, rdE)
                        and season_contrast(mh, sh) and tone_ok(sh)): continue
                if any(lookalike((mh, sh), (q['main_hex'], q['sec_hex']), g) for q, g in near): continue
                if any(lookalike((mh, sh), (q['main_hex'], q['sec_hex']), 1) for q in own): continue
                c = (0 if s[0] == old['sec'] else 1.0) + 0.5 * use.get(m[0], 0) + 0.25 * use.get('s:' + s[0], 0)
                c += 0.4 * (m[2] in prev_kind)                       # alternate yellow / orange down the column
                c += 0.15 * abs(oklch(sh)[0] - 0.74) / 0.05           # secondary near the Hạ tone level
                c += 0.3 * (m[2] != 'Y') * (sum(1 for x in done if d[x]['ha']['main'] in YN) < 0.4 * len(done))
                if best is None or c < best[0]: best = (c, m, s)
        if best is None: log.append(f'{k}: no candidate, kept'); continue
        _, m, s = best
        pairs.get((old['main'], old['sec']), []).remove((i, 'ha'))
        d[k]['ha'] = dict(main=m[0], main_hex=m[1], sec=s[0], sec_hex=s[1])
        pairs.setdefault((m[0], s[0]), []).append((i, 'ha'))
        use[m[0]] = use.get(m[0], 0) + 1; use['s:' + s[0]] = use.get('s:' + s[0], 0) + 1
        done.append(k)
        log.append(f"{k}: {old['main']} + {old['sec']}  ->  {m[0]} {m[1]} + {s[0]} {s[1]}"
                   + ('' if s[0] == old['sec'] else '  (secondary changed)'))
    d['_note_ha'] = ('Owner Lượt 752: about 39 % of Hạ mains re-picked to light summer yellow / orange by '
                     'dev/art/palettes3/ha_warm.py, with a cool secondary (rule seasons.summer_warm). ★ roots unchanged.')
    json.dump(d, open(F, 'w'), ensure_ascii=False, indent=1)
    print('\n'.join(log)); print(f'{len(done)} Hạ palettes changed (wanted {want})')

YN = {w[0] for w in WARM if w[2] == 'Y'}

if __name__ == '__main__':
    main()
