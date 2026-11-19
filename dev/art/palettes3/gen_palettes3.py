"""Generate P2 (cool-leaning) and P3 (warm-leaning) palettes for every woman
(m01–m52, c01–c32, nc1–nc3) — owner Lượt 614 / rule B20.
P1 = the approved palette, copied unchanged. Output: dev/art/face-common/palettes3.json
Run: python3 dev/art/palettes3/gen_palettes3.py ; then check_palettes3.py"""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from colourlib import *
from library import LIB

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
FC = os.path.join(ROOT, 'dev', 'art', 'face-common')

def load_p1():
    rows = {}
    m = json.load(open(os.path.join(FC, 'm_colours_proposed.json')))['rows']
    for k, v in m.items():
        rows[k] = dict(main=v['main'], main_hex=v['main_hex'], sec=v['secondary'], sec_hex=v['secondary_hex'])
    c = json.load(open(os.path.join(FC, 'c_rank_colours.json')))
    for k, v in c.items():
        if k[0] == 'c' and k[1:].isdigit():
            rows[k] = dict(main=v['main'], main_hex=v['main_hex'], sec=v['secondary'], sec_hex=v['secondary_hex'])
    # nc1–nc3: from dev/art/t8-prompt-B/build.py (princess colour model, B18)
    for k, mn, mh, sn, sh in (("nc1", "indigo", "#5E6694", "warm ivory", "#EAD7BF"),
                              ("nc2", "soft jade green", "#9EB28F", "deep rose", "#CF7E83"),
                              ("nc3", "wisteria lilac", "#CCA7C8", "rose-red", "#D18A92")):
        rows[k] = dict(main=mn, main_hex=mh, sec=sn, sec_hex=sh)
    return rows

# ---- rules (shared with the checker) ----
MARGIN = 0.35          # palette warmth step P1 -> P2 / P3
COOL_MAX = -0.20       # P2 palette warmth must be <= this
WARM_MIN = 0.45        # P3 palette warmth must be >= this

# names that read cool / warm whatever their score — never used on the other side
COOL_ONLY = {"orchid pink", "cool rose pink", "fuchsia rose", "plum", "raspberry rose", "wisteria lilac", "cool lilac", "cool jade", "cool celadon"}
WARM_ONLY = {"moss green", "fresh moss green", "olive green", "willow green", "spring leaf green",
             "honey peach", "sand apricot", "warm apricot", "apricot", "persimmon", "terracotta", "rust red", "brick red",
             "pistachio green", "bamboo green", "melon orange", "pale persimmon", "maple red", "deep apricot", "light terracotta", "leaf green", "deep peach", "deep tangerine", "peach ivory", "cream", "warm ivory"}

def lookalike(a, b, gap=1):
    """two palettes (main, sec) that read the same at a glance; gap = how many rows apart (1 = next row, stricter)"""
    if is_white(a[1]) and is_white(b[1]): return dE(a[0], b[0]) < (0.09 if gap == 1 else 0.06)   # two '<colour> + ivory' rows
    if gap == 1 and dE(a[1], b[1]) < 0.03: return dE(a[0], b[0]) < 0.10   # same secondary on the next row: mains must differ more
    lim = (0.07, 0.09) if gap == 1 else (0.05, 0.07)
    return dE(a[0], b[0]) < lim[0] and dE(a[1], b[1]) < lim[1]

def p2_target(p1w):  # max allowed P2 palette warmth
    return min(max(p1w - MARGIN, -0.60), COOL_MAX)

def p3_target(p1w):  # min allowed P3 palette warmth
    return max(min(p1w + MARGIN, 0.65), WARM_MIN)

def contrast_ok(a, b, p1_dE=None):
    """main vs secondary: other hue family + clear difference (like P1)."""
    if family(a) == family(b): return False
    wa, wb = is_white(a), is_white(b)
    if wa or wb:
        if abs(oklch(a)[0] - oklch(b)[0]) < 0.12: return False
    elif hue_dist(a, b) < 40: return False
    elif p1_dE is not None and hue_dist(a, b) < 110 and abs(oklch(a)[0] - oklch(b)[0]) < 0.12:
        return False   # neighbouring hues at the same lightness read as one colour
    need = 0.10 if p1_dE is None else max(0.12, min(0.7 * p1_dE, 0.14))
    return dE(a, b) >= need

def cand_ok(kind, p1, m, s):
    mh, sh = m[1], s[1]
    if not contrast_ok(mh, sh, dE(p1['main_hex'], p1['sec_hex'])): return False
    pw = pal_warmth(mh, sh); p1w = pal_warmth(p1['main_hex'], p1['sec_hex'])
    wm, w1m = warmth(mh), warmth(p1['main_hex'])
    if kind == 'P2':
        if pw > p2_target(p1w): return False
        if wm > max(w1m - 0.30, -0.45) or wm > w1m or wm > 0.20: return False
        if warmth(sh) > 0.50 or s[0] in WARM_ONLY: return False
        if m[0] in WARM_ONLY: return False
    else:
        if pw < p3_target(p1w): return False
        if wm < max(min(w1m, 0.55), 0.30): return False
        if warmth(sh) < 0.25 or s[0] in COOL_ONLY or m[0] in COOL_ONLY: return False
    return True

def cost(p1, m, s, usage, pairuse):
    mh, sh = m[1], s[1]
    c = hue_dist(mh, p1['main_hex']) / 60.0                       # stay near her main hue
    c += 2.0 * abs(oklch(mh)[0] - oklch(p1['main_hex'])[0])        # and her lightness
    c += 0.35 * hue_dist(sh, p1['sec_hex']) / 60.0                 # secondary near hers
    c += 1.2 * abs(oklch(sh)[0] - oklch(p1['sec_hex'])[0])         # deep vs light pattern kept
    c += 0.45 * usage.get(m[0], 0) + 0.12 * usage.get(s[0], 0)     # spread
    c += 1.5 * pairuse.get((m[0], s[0]), 0)
    if is_white(sh): c += 0.12 * usage.get('_white', 0)            # ivory/cream: only now and then
    return c

def main():
    p1s = load_p1()
    over = json.load(open(os.path.join(os.path.dirname(__file__), 'overrides.json'))) \
        if os.path.exists(os.path.join(os.path.dirname(__file__), 'overrides.json')) else {}
    mains = [x for x in LIB if x[2] in 'MB']
    secs = [x for x in LIB if x[2] in 'SB']
    byname = {x[0]: x for x in LIB}
    usage, pairuse, pairwho = {}, {}, {}
    for k, p in p1s.items():
        pairuse[(p['main'], p['sec'])] = pairuse.get((p['main'], p['sec']), 0) + 1
        pairwho.setdefault((p['main'], p['sec']), []).append(k)
    ids = list(p1s)
    out = {k: {'P1': p1s[k]} for k in ids}
    for kind in ('P2', 'P3'):
        # hardest first: the warmest P1s get their warm palette first, the coolest their cool one
        order = sorted(ids, key=lambda k: pal_warmth(p1s[k]['main_hex'], p1s[k]['sec_hex']) * (-1 if kind == 'P3' else 1))
        queue, tries = list(order), {}
        def release(q):
            p = out[q].pop(kind)
            for n in (p['main'], p['sec']): usage[n] -= 1
            if is_white(p['sec_hex']): usage['_white'] -= 1
            pairuse[(p['main'], p['sec'])] -= 1
            pairwho[(p['main'], p['sec'])].remove(q)
        while queue:
            k = queue.pop(0)
            p1 = p1s[k]; i = ids.index(k)
            if k in over and kind in over[k]:
                mn, sn = over[k][kind]; best = (0, byname[mn], byname[sn])
            else:
                nb = [ids[j] for j in (i - 1, i + 1) if 0 <= j < len(ids)]
                banned = {out[q][kind]['main'] for q in nb if kind in out[q]}
                near = [(out[ids[j]][kind], abs(j - i)) for j in range(i - 2, i + 3) if 0 <= j < len(ids) and j != i and kind in out[ids[j]]]
                best = None
                for m in mains:
                    if m[0] in banned: continue
                    for s in secs:
                        if m[0] == s[0]: continue
                        pu = pairwho.get((m[0], s[0]), [])
                        if len(pu) >= 2 or any(abs(ids.index(q) - i) < 10 for q in pu): continue   # a pair at most twice, far apart
                        if not cand_ok(kind, p1, m, s): continue
                        if any(lookalike((m[1], s[1]), (q['main_hex'], q['sec_hex']), g) for q, g in near): continue
                        c = cost(p1, m, s, usage, pairuse)
                        if best is None or c < best[0]: best = (c, m, s)
                if best is None:
                    tries[k] = tries.get(k, 0) + 1
                    if tries[k] > 8:
                        print('NO CANDIDATE', k, kind); continue
                    # repair: free the neighbours (±2), place this one first, then redo them
                    freed = [ids[j] for j in range(i - 2, i + 3) if 0 <= j < len(ids) and j != i and kind in out[ids[j]]]
                    for q in freed: release(q)
                    queue = [k] + freed + queue
                    continue
            _, m, s = best
            out[k][kind] = dict(main=m[0], main_hex=m[1], sec=s[0], sec_hex=s[1])
            usage[m[0]] = usage.get(m[0], 0) + 1; usage[s[0]] = usage.get(s[0], 0) + 1
            if is_white(s[1]): usage['_white'] = usage.get('_white', 0) + 1
            pairuse[(m[0], s[0])] = pairuse.get((m[0], s[0]), 0) + 1
            pairwho.setdefault((m[0], s[0]), []).append(k)
    doc = {'_note': 'B20 (owner Lượt 614): 3 palettes per woman. P1 = approved palette (unchanged, from m_colours_proposed.json / c_rank_colours.json / nc1–nc3 build data); '
                    'P2 = cool-leaning, P3 = warm-leaning; each main+secondary of different hue families, B18 tone, B19 no grey. '
                    'PROPOSAL — not wired into build.py until owner OK. Generator: dev/art/palettes3/gen_palettes3.py; checker: check_palettes3.py.',
           'status': 'PROPOSAL'}
    doc.update(out)
    json.dump(doc, open(os.path.join(FC, 'palettes3.json'), 'w'), ensure_ascii=False, indent=1)
    for n, u in sorted(usage.items(), key=lambda x: -x[1]): print(f'{u:3d} {n}')

if __name__ == '__main__':
    main()
