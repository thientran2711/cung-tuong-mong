"""Owner Lượt 742 / 744: one tone level for all 4 seasons = the Xuân + Hạ level (soft clear medium).
Measured on OKLCH chroma C (saturation) and lightness L of the generated (non-root) colours of Xuân + Hạ:
  main: C mean 0.080, cap 0.095 (~p90) · L floor 0.70 (~p5)
  sec : C mean 0.082, cap 0.100 (~p90) · L floor 0.64 (~p5)
Generated palettes (hue and colour name kept, only C / L change):
  Thu, Đông: C shifted down by (season mean - Xuân/Hạ mean) for that role, then capped; deep secondaries made
             lighter as far as the season rule allows (Thu: darker colour L <= 0.63, Đông: <= 0.575 — seasons.py
             needs a deep colour there, so they cannot reach the Xuân/Hạ lightness).
  Xuân, Hạ : only outliers capped.
  If a palette would break a check_seasons.py rule (season rule, contrast, look-alike with rows ±1/±2 or her own
  other seasons), the chroma / lightness change is scaled back step by step for that palette (listed when run).
★ root pairs: hex NOT changed (approved pictures use them). If a root colour is more vivid than the cap or darker
  than the floor, the same-hue adjusted value goes in a separate field root_tone_adjusted (cap / floor, the darker
  colour of a Thu / Đông root only lifted to the season limit above).
Run after xuan_pink.py; then check_seasons.py and make_season_sheets_by_season.py / make_tone_old_new.py."""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from colourlib import *
from seasons import SEASONS, target_ok
from gen_palettes3 import load_p1, contrast_ok, lookalike
from gen_seasons import season_contrast
from xuan_pink import lch2hex, tone_ok

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
F = os.path.join(ROOT, 'dev/art/face-common/palettes_season.json')
TGT = {'main_hex': dict(mean=0.080, cap=0.095, floor=0.70), 'sec_hex': dict(mean=0.082, cap=0.100, floor=0.64)}
DEEP_MAX = {'thu': 0.63, 'dong': 0.575}

def ids_of(d): return [k for k in d if not k.startswith('_') and k not in ('status', 'root_season_counts')]

def season_mean(d, se, role):
    v = [oklch(d[k][se][role])[1] for k in ids_of(d) if not d[k][se].get('root') and not is_white(d[k][se][role])]
    return sum(v) / len(v)

def move(h, C2, L2, tC, tL):
    L, C, H = oklch(h)
    return lch2hex(L + tL * (L2 - L), C + tC * (C2 - C), H)

def target_LC(h, se, role, shift):
    L, C, H = oklch(h)
    if is_white(h): return L, C
    C2 = min(C - shift, TGT[role]['cap']) if C > TGT[role]['mean'] else min(C, TGT[role]['cap'])
    C2 = max(C2, min(C, 0.055))
    L2 = L
    if se in DEEP_MAX and role == 'sec_hex' and L < DEEP_MAX[se]:
        L2 = min(DEEP_MAX[se], L + (0.03 if se == 'thu' else 0.04))
    return L2, C2

def pal_ok(se, mh, sh, rdE):
    return (target_ok(se, mh, sh) and contrast_ok(mh, sh, rdE) and season_contrast(mh, sh) and tone_ok(mh) and tone_ok(sh))

def main():
    d = json.load(open(F)); roots = load_p1(); ids = ids_of(d)
    shift = {(se, r): (max(0.0, season_mean(d, se, r) - TGT[r]['mean']) if se in DEEP_MAX else 0.0)
             for se in SEASONS for r in TGT}
    T = (1, .75, .5, .25, 0)
    # (main chroma step, secondary chroma step, deep-secondary lightness step, lift of a Đông main's lightness)
    OPTS = sorted(((a, b, c, e) for a in T for b in T for c in (1, .5, 0) for e in (0, .02, .04)),
                  key=lambda o: -(o[0] + o[1] + 0.6 * o[2] - 2 * o[3]))
    scaled = []
    for se in SEASONS:
        for i, k in enumerate(ids):
            p = d[k][se]
            if p.get('root'): continue
            rdE = dE(roots[k]['main_hex'], roots[k]['sec_hex'])
            tg = {r: target_LC(p[r], se, r, shift[(se, r)]) for r in TGT}
            near = [(d[ids[j]][se], abs(j - i)) for j in (i - 2, i - 1, i + 1, i + 2) if 0 <= j < len(ids)]
            own = [d[k][s2] for s2 in SEASONS if s2 != se]
            for o in OPTS:
                if o[3] and se != 'dong': continue
                new = {}
                for r, tC in (('main_hex', o[0]), ('sec_hex', o[1])):
                    if is_white(p[r]): new[r] = p[r]
                    elif r == 'main_hex': new[r] = move(p[r], tg[r][1], min(oklch(p[r])[0] + o[3], 0.84), tC, 1)
                    else: new[r] = move(p[r], tg[r][1], tg[r][0], tC, o[2])
                pr = (new['main_hex'], new['sec_hex'])
                if o == (0, 0, 0, 0): new = {r: p[r] for r in TGT}; break
                if not pal_ok(se, *pr, rdE): continue
                if any(lookalike(pr, (q['main_hex'], q['sec_hex']), g) for q, g in near) or \
                   any(lookalike(pr, (q['main_hex'], q['sec_hex']), 1) for q in own): continue
                break
            if o != (1, 1, 1, 0): scaled.append(f'{k} {se} C{int(o[0]*100)}/{int(o[1]*100)}% L{int(o[2]*100)}%' + (f' main+{o[3]}' if o[3] else ''))
            p.update(new)
    # roots: separate advisory field
    report = []
    for k in ids:
        rs = d[k]['root_season']; p = d[k][rs]; adj = {}
        darker = min(('main_hex', 'sec_hex'), key=lambda r: oklch(p[r])[0])
        for r in TGT:
            h = p[r]; L, C, H = oklch(h)
            if is_white(h): continue
            C2 = min(C, TGT[r]['cap']); L2 = max(L, TGT[r]['floor'])
            if rs in DEEP_MAX and r == darker: L2 = min(L2, max(L, DEEP_MAX[rs]))
            if dE(h, lch2hex(L2, C2, H)) >= 0.015:   # visible difference only
                h2 = lch2hex(L2, C2, H); adj[r] = h2
                report.append(f'{k} {rs} {r[:-4]} {p[r[:-4]]} {h} C{C:.3f} L{L:.2f} -> {h2} C{oklch(h2)[1]:.3f} L{oklch(h2)[0]:.2f}')
        p.pop('root_tone_adjusted', None)
        if adj:
            p['root_tone_adjusted'] = dict(main_hex=adj.get('main_hex', p['main_hex']), sec_hex=adj.get('sec_hex', p['sec_hex']),
                                           note='advisory only (owner Lượt 744): same hue at the Xuân/Hạ tone level; '
                                                'main_hex / sec_hex above stay the approved colours')
    d['_note_tone'] = ('Owner Lượt 742/744: generated colours of all 4 seasons brought to the Xuân+Hạ tone level by '
                       'dev/art/palettes3/tone_unify.py (hue + name kept). ★ roots unchanged; root_tone_adjusted = advisory value.')
    json.dump(d, open(F, 'w'), ensure_ascii=False, indent=1)
    print('shift', {f'{a}/{b[:-4]}': round(v, 3) for (a, b), v in shift.items() if v})
    print('scaled back:', scaled)
    print('ROOTS adjusted (%d):' % len(report)); print('\n'.join(report))

if __name__ == '__main__':
    main()
