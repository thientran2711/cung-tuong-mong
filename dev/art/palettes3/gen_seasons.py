"""B20 (owner Lượt 616): 4 palettes per woman, one per season (xuân / hạ / thu / đông).
Root palette (approved) is classified into its season and kept unchanged (★); the 3 missing seasons are generated.
Output: dev/art/face-common/palettes_season.json. Rules: seasons.py. Run, then check_seasons.py, then make_season_sheets.py."""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from colourlib import *
from library import LIB
from seasons import SEASONS, classify, target_ok, VN
from gen_palettes3 import load_p1, contrast_ok, lookalike, COOL_ONLY, WARM_ONLY

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
OUTF = os.path.join(ROOT, 'dev', 'art', 'face-common', 'palettes_season.json')
# extra named colours for the seasons (same nc1–nc3 tone): soft light ones for hạ, clear ones for xuân
EXTRA = [
 ("powder blue", "#A9BEDB", "M"), ("soft rose pink", "#D9A3B6", "B"), ("pale orchid", "#D3AED6", "M"),
 ("soft teal", "#6FAFB0", "S"), ("soft mauve pink", "#C98DAA", "S"), ("soft blue-violet", "#8E88C8", "S"),
 ("soft jade", "#7DBA9E", "S"), ("light leaf green", "#9CCB7A", "B"), ("ice pink", "#E2B6CB", "M"),
 ("deep plum", "#7E456E", "S"), ("deep peacock blue", "#2F7A96", "S"), ("pine teal", "#2E7C78", "S"),
 ("deep sapphire", "#44609F", "S"), ("deep blue-violet", "#5D55A0", "S"), ("deep raspberry", "#A2486F", "S"),
]
POOL = LIB + EXTRA
COOL_X = {'deep plum', 'deep raspberry', 'ice pink', 'pale orchid', 'soft mauve pink', 'soft rose pink'}
SEASON_SIDE = {'xuan': 'warm', 'thu': 'warm', 'ha': 'cool', 'dong': 'cool'}

def season_contrast(a, b):
    """extra for the seasons: close hues (< 110°) need a clear lightness gap (>= 0.15), unless one is ivory/white"""
    if is_white(a) or is_white(b): return True
    return hue_dist(a, b) >= 110 or abs(oklch(a)[0] - oklch(b)[0]) >= 0.15

def cost(root, m, s, usage, se=''):
    mh, sh = m[1], s[1]
    c = hue_dist(mh, root['main_hex']) / 60.0                      # recognisably hers: near her main hue
    c += 0.8 * abs(oklch(mh)[0] - oklch(root['main_hex'])[0])
    c += 0.35 * hue_dist(sh, root['sec_hex']) / 60.0               # and her secondary hue
    c += 0.45 * usage.get(m[0], 0) + 0.15 * usage.get(s[0], 0)     # spread
    c += 0.35 * usage.get(se + ':' + m[0], 0)                     # same main within one season column
    if is_white(sh): c += 0.12 * usage.get('_white', 0)
    return c

def cand_ok(season, root, m, s):
    if m[0] == s[0]: return False
    side = SEASON_SIDE[season]
    if side == 'warm' and (m[0] in COOL_ONLY or s[0] in COOL_ONLY or m[0] in COOL_X or s[0] in COOL_X): return False
    if side == 'cool' and (m[0] in WARM_ONLY or s[0] in WARM_ONLY): return False
    if not contrast_ok(m[1], s[1], dE(root['main_hex'], root['sec_hex'])): return False
    if not season_contrast(m[1], s[1]): return False
    return target_ok(season, m[1], s[1])

def main():
    roots = load_p1(); ids = list(roots)
    over_p = os.path.join(os.path.dirname(__file__), 'overrides_season.json')
    over = json.load(open(over_p)) if os.path.exists(over_p) else {}
    byname = {x[0]: x for x in POOL}
    mains = [x for x in POOL if x[2] in 'MB']; secs = POOL
    usage, pairwho = {}, {}
    out = {}
    for k in ids:
        r = roots[k]; rs = classify(r['main_hex'], r['sec_hex'])
        out[k] = {'root_season': rs, rs: dict(r, root=True)}
        pairwho.setdefault((r['main'], r['sec']), []).append(k)
    def release(q, se):
        p = out[q].pop(se)
        for n in (p['main'], p['sec']): usage[n] -= 1
        usage[se + ':' + p['main']] -= 1
        if is_white(p['sec_hex']): usage['_white'] -= 1
        pairwho[(p['main'], p['sec'])].remove(q)
    for se in SEASONS:
        queue = [k for k in ids if se not in out[k]]
        tries = {}
        while queue:
            k = queue.pop(0); i = ids.index(k); root = roots[k]
            if k in over and se in over[k]:
                mn, sn = over[k][se]; best = (0, byname[mn], byname[sn])
            else:
                nb = [ids[j] for j in (i - 1, i + 1) if 0 <= j < len(ids)]
                banned = {out[q][se]['main'] for q in nb if se in out[q]}
                near = [(out[ids[j]][se], abs(j - i)) for j in range(i - 2, i + 3) if 0 <= j < len(ids) and j != i and se in out[ids[j]]]
                best = None
                for m in mains:
                    if m[0] in banned: continue
                    for s in secs:
                        pu = pairwho.get((m[0], s[0]), [])
                        if len(pu) >= 2 or any(abs(ids.index(q) - i) < 10 for q in pu): continue
                        if not cand_ok(se, root, m, s): continue
                        if any(lookalike((m[1], s[1]), (q['main_hex'], q['sec_hex']), g) for q, g in near): continue
                        if any(lookalike((m[1], s[1]), (q['main_hex'], q['sec_hex']), 1) for sx, q in out[k].items() if sx in SEASONS): continue   # her own 4 differ
                        c = cost(root, m, s, usage, se)
                        if best is None or c < best[0]: best = (c, m, s)
                if best is None:
                    tries[k] = tries.get(k, 0) + 1
                    if tries[k] > 8: print('NO CANDIDATE', k, se); continue
                    freed = [ids[j] for j in range(i - 2, i + 3) if 0 <= j < len(ids) and j != i and se in out[ids[j]] and not out[ids[j]][se].get('root')]
                    for q in freed: release(q, se)
                    queue = [k] + freed + queue
                    continue
            _, m, s = best
            out[k][se] = dict(main=m[0], main_hex=m[1], sec=s[0], sec_hex=s[1])
            usage[m[0]] = usage.get(m[0], 0) + 1; usage[s[0]] = usage.get(s[0], 0) + 1
            usage[se + ':' + m[0]] = usage.get(se + ':' + m[0], 0) + 1
            if is_white(s[1]): usage['_white'] = usage.get('_white', 0) + 1
            pairwho.setdefault((m[0], s[0]), []).append(k)
    counts = {se: sum(1 for k in ids if out[k]['root_season'] == se) for se in SEASONS}
    doc = {'_note': 'B20 (owner Lượt 616): one palette per season per woman. root = approved palette (m_colours_proposed.json FINAL / '
                    'c_rank_colours.json / nc1–nc3 build data), unchanged, in the season it classifies into (root: true = ★). '
                    'Other 3 seasons generated by dev/art/palettes3/gen_seasons.py, rules in seasons.py, checked by check_seasons.py. '
                    'No royal yellow in any of these palettes (B21: consort palettes stay yellow-free; nc1–nc3 foreign = no yellow). '
                    'PROPOSAL — not wired into build.py.',
           'status': 'PROPOSAL', 'root_season_counts': {VN[s]: n for s, n in counts.items()}}
    doc.update(out)
    json.dump(doc, open(OUTF, 'w'), ensure_ascii=False, indent=1)
    print('root seasons:', {VN[s]: n for s, n in counts.items()})

if __name__ == '__main__':
    main()
