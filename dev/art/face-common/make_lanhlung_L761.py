#!/usr/bin/env python3
"""Owner Lượt 761: Lạnh lùng +5 NEW people s46–s50 (same Lạnh lùng v5 block as the approved s13–s15 / s26–s32).
Method = make_sacsao_L737.py / make_nf4.py line() recipe (v5: thướt tha FABRIC sentence, EYES_STRAIGHT, strong closed-mouth
sentence, no "phoenix" eye words). Each person: own face swaps, hair, outfit, item, angle.
COLOURS (owner Lượt 750/760 — never self-picked): each person gets a 4-season set in palettes_season.json, built ONLY from
colour names + hexes already in the approved palette (Lượt 758). Root (★) = one season, varied over the 5; she is drawn in
her root pair (words + hex exactly as in the JSON). Roots go to s_root_colours.json (read by gen_palettes3.load_p1, so
check_seasons.py checks them); the other 3 seasons are picked here with the gen_seasons.py rules, then check_seasons → 0 FAIL.
make_nf4.py is loaded read-only (its file writes are swallowed). Run: python3 dev/art/face-common/make_lanhlung_L761.py"""
import os, io, sys, json, builtins
D = os.path.dirname(os.path.abspath(__file__))
P3 = os.path.join(D, '..', 'palettes3')
_open = builtins.open
def _ro_open(p, mode='r', *a, **k):
    if 'w' in mode or 'a' in mode: return io.StringIO()
    return _open(p, mode, *a, **k)
NS = {'__file__': os.path.join(D, 'make_nf4.py'), 'open': _ro_open, 'print': lambda *a, **k: None, '__name__': 'nf4'}
exec(_open(os.path.join(D, 'make_nf4.py')).read(), NS)
line, T7, EYES_STRAIGHT, OLD_MOUTH, NEW_MOUTH = (NS[k] for k in "line T7 EYES_STRAIGHT OLD_MOUTH NEW_MOUTH".split())
LL = T7["Lạnh lùng"]

# ---------- (1) root pairs: names + hexes copied from palettes_season.json (approved Lượt 758) ----------
ROOTS = {  # sid: (root season, main, main_hex, sec, sec_hex)
 "s46": ("dong", "cool aquamarine", "#86CDB9", "deep blue-violet", "#5D5894"),
 "s47": ("ha",   "periwinkle", "#949BD8", "mint", "#9ACBB7"),
 "s48": ("xuan", "soft blush pink", "#DF9FA8", "aqua celadon", "#8BC6BE"),
 "s49": ("thu",  "soft burgundy rose", "#C37986", "pine teal", "#388581"),
 "s50": ("dong", "clear ice blue", "#A6C9E4", "deep raspberry", "#A55D7A"),
}
PS = os.path.join(D, 'palettes_season.json')
pal = json.load(_open(PS))
IDS0 = [k for k in pal if not k.startswith('_') and k not in ('status', 'root_season_counts') and k not in ROOTS]
SEAS = ('xuan', 'ha', 'thu', 'dong')
known = {}
for k in IDS0:
    for se in SEAS:
        p = pal[k][se]; known.setdefault(se, set()).update({(p['main'], p['main_hex'], 'M'), (p['sec'], p['sec_hex'], 'S')})
for sid, (rs, mn, mh, sn, sh) in ROOTS.items():
    assert (mn, mh, 'M') in known[rs] or any(x[:2] == (mn, mh) for s in SEAS for x in known[s]), (sid, mn)
    assert any(x[:2] == (sn, sh) for s in SEAS for x in known[s]), (sid, sn)
sroot_p = os.path.join(D, 's_root_colours.json')
sroot = json.load(_open(sroot_p)) if os.path.exists(sroot_p) else {"_note": "root (★) pairs of new s-ids, chosen from the approved season palette colours (owner Lượt 750/760); read by palettes3/gen_palettes3.load_p1"}
for sid, (rs, mn, mh, sn, sh) in ROOTS.items():
    sroot[sid] = dict(main=mn, main_hex=mh, sec=sn, sec_hex=sh, root_season=rs, src="Lượt 761 Lạnh lùng")
_open(sroot_p, 'w').write(json.dumps(sroot, ensure_ascii=False, indent=1) + "\n")

# ---------- (2) the other 3 seasons: only colours already in that season column of the approved palette ----------
sys.path.insert(0, os.path.abspath(P3))
from colourlib import dE, is_white
from seasons import classify, VN
from gen_palettes3 import lookalike
from gen_seasons import cand_ok, cost
for sid in ROOTS:
    if sid in pal: del pal[sid]
ids = IDS0 + list(ROOTS)
usage, pairwho = {}, {}
for k in IDS0:
    for se in SEAS:
        p = pal[k][se]
        pairwho.setdefault((p['main'], p['sec']), []).append(k)
        if p.get('root'): continue
        for n in (p['main'], p['sec']): usage[n] = usage.get(n, 0) + 1
        usage[se + ':' + p['main']] = usage.get(se + ':' + p['main'], 0) + 1
        if is_white(p['sec_hex']): usage['_white'] = usage.get('_white', 0) + 1
from colourlib import oklch, greyish
def col_ok(h):
    L, C, H = oklch(h)
    return not greyish(h) and C <= 0.127 and 0.45 <= L <= 0.93 and not ((80 <= H < 100 and C > 0.06) or dE(h, '#EFBD69') < 0.045)
for sid, (rs, mn, mh, sn, sh) in ROOTS.items():          # all roots first, so neighbours on both sides are known
    assert classify(mh, sh) == rs, (sid, classify(mh, sh))
    assert col_ok(mh) and col_ok(sh), sid
    pal[sid] = {'root_season': rs, rs: dict(main=mn, main_hex=mh, sec=sn, sec_hex=sh, root=True)}
    pairwho.setdefault((mn, sn), []).append(sid)
for sid, (rs, mn, mh, sn, sh) in ROOTS.items():
    root = dict(main=mn, main_hex=mh, sec=sn, sec_hex=sh)
    i = ids.index(sid)
    for se in SEAS:
        if se == rs: continue
        mains = sorted({(pal[k][se]['main'], pal[k][se]['main_hex'], 'M') for k in IDS0})
        secs = sorted({(pal[k][se]['sec'], pal[k][se]['sec_hex'], 'S') for k in IDS0})
        rng = [j for j in range(i - 2, i + 3) if 0 <= j < len(ids) and j != i and se in pal[ids[j]]]
        banned = {pal[ids[j]][se]['main'] for j in rng if abs(j - i) == 1}
        near = [(pal[ids[j]][se], abs(j - i)) for j in rng]
        best = None
        for m in mains:
            if m[0] in banned or not col_ok(m[1]): continue
            for s in secs:
                if not col_ok(s[1]): continue
                pu = pairwho.get((m[0], s[0]), [])
                if len(pu) >= 2 or any(abs(ids.index(q) - i) < 10 for q in pu): continue
                if not cand_ok(se, root, m, s): continue
                if any(lookalike((m[1], s[1]), (q['main_hex'], q['sec_hex']), g) for q, g in near): continue
                if any(lookalike((m[1], s[1]), (q['main_hex'], q['sec_hex']), 1) for sx, q in pal[sid].items() if sx in SEAS): continue
                c = cost(root, m, s, usage, se)
                if best is None or c < best[0]: best = (c, m, s)
        assert best, (sid, se)
        _, m, s = best
        pal[sid][se] = dict(main=m[0], main_hex=m[1], sec=s[0], sec_hex=s[1])
        for n in (m[0], s[0]): usage[n] = usage.get(n, 0) + 1
        usage[se + ':' + m[0]] = usage.get(se + ':' + m[0], 0) + 1
        pairwho.setdefault((m[0], s[0]), []).append(sid)
for sid in ROOTS:
    pal[sid] = {'root_season': pal[sid]['root_season'], **{se: pal[sid][se] for se in SEAS}}
pal['root_season_counts'] = {VN[s]: sum(1 for k in ids if pal[k]['root_season'] == s) for s in SEAS}
_open(PS, 'w').write(json.dumps(pal, ensure_ascii=False, indent=1))
for sid in ROOTS:
    print(sid, ' | '.join(f"{VN[se]}{'★' if pal[sid][se].get('root') else ''}: {pal[sid][se]['main']} {pal[sid][se]['main_hex']} + {pal[sid][se]['sec']} {pal[sid][se]['sec_hex']}" for se in SEAS))

# ---------- (3) prompts: v5 Lạnh lùng block + own swaps; outfit in her ROOT pair ----------
S761 = [
("s46", 18, [("LONG narrow OVAL face", "LONG narrow DIAMOND-OVAL face, the cheekbones a little higher,"),
             ("STRAIGHT thin brows", "STRAIGHT, slightly fuller dark brows")],
 "half-up: the top hair smoothed back into a low flat bun at the back of the head held by one long silver hairpin pointing upward, the rest long and straight behind",
 "a light open beizi of {m} silk satin with a soft sheen over a cross-collar {s} inner top and a {s} floor-length skirt of plain silk, small embroidered snowflakes along the front edges, a {s} silk sash with a small white jade pendant, long sleeves",
 "standing still and upright with her weight on one leg, a small round white jade bi disc on a pale silk cord held up at chest height in one hand, the other hand hanging calmly", "FF"),
("s47", 17, [("narrow, long, perfectly LEVEL almond eyes", "narrow, long, perfectly LEVEL almond eyes set slightly wide apart"),
             ("a slim straight nose", "a slim straight nose with a softly rounded tip")],
 "fully loose and very long, perfectly straight, parted on the right side, the left side tucked behind the ear with one small silver hairpin pointing upward",
 "a cross-collar ruqun of {m} silk satin with a soft sheen and a {s} floor-length skirt of plain silk, small embroidered chrysanthemums at the collar and hem, a {s} silk sash with a small moonstone pendant, long sleeves",
 "walking slowly mid-step, a single white chrysanthemum on a long stem held upright at chest height in one hand, the other sleeve hanging still", "TL"),
("s48", 18, [("a straight slender jaw", "a straight, slightly angular jaw"),
             ("a small mouth with thin even lips", "a small mouth with slightly fuller even lips")],
 "high half-up: the top hair in two small neat loops at the crown held by one jade hairpin pointing upward, the rest long and straight behind",
 "a cross-collar ruqun of {m} silk satin with a soft sheen and an {s} floor-length skirt of plain silk, small embroidered pear blossoms at the collar and cuffs, an {s} silk sash with a small green jade pendant, long sleeves",
 "standing still and upright with her weight on one leg, a slim rolled scroll painting tied with a silk cord held at her waist in one hand, the other hand hanging calmly", "SR"),
("s49", 18, [("narrow, long, perfectly LEVEL almond eyes", "long, slightly larger, perfectly LEVEL almond eyes"),
             ("a long tapered chin", "a small softly rounded chin")],
 "loose and long, gathered low at the nape with a thin ribbon in her secondary colour and falling straight down her back, two thin side locks framing the face, one small pearl hairpin at the crown pointing upward",
 "a light open beizi of {m} silk satin with a soft sheen over a cross-collar {s} inner top and a {s} floor-length skirt of plain silk, small embroidered bamboo leaves along the front edges, a {s} silk sash with a small white jade pendant, long sleeves",
 "walking slowly mid-step, a sprig of white winter plum blossom held upright beside her shoulder in one hand, the other sleeve hanging still", "ST"),
("s50", 17, [("LONG narrow OVAL face", "LONG narrow HEART-OVAL face, a wide smooth forehead,"),
             ("a slim straight nose", "a slim straight nose with a high bridge")],
 "half-up: the top hair coiled into a neat flat bun at the back of the head held by one plain white jade hairpin pointing upward, the rest long and sleek, the front locks falling straight beside the cheeks",
 "a cross-collar ruqun of {m} silk satin with a soft sheen and a {s} floor-length skirt of plain silk, small embroidered wave and cloud scrolls at the collar and hem, a {s} silk sash with a small silver pendant, long sleeves",
 "standing still and upright with her weight on one leg, a slim closed folding fan with white jade ribs held upright in one hand at her chest, the other hand hanging calmly", "SL"),
]
out = {}
for sid, age, sw, hair, outfit, pose, ak in S761:
    rs = ROOTS[sid][0]; p = pal[sid][rs]; assert p.get('root')
    mn, mh, sn, sh = p['main'], p['main_hex'], p['sec'], p['sec_hex']
    face = LL["face"]
    for a, b in sw: assert face.count(a) == 1, (sid, a); face = face.replace(a, b)
    face = face + ". " + EYES_STRAIGHT[:-1]
    assert "phoenix" not in face.lower(), sid
    v = line(age, face, LL["expr"], hair, outfit.format(m=mn, s=sn), mn, mh, sn, sh, pose, ak)
    assert v.count(OLD_MOUTH) == 1 and "(thướt tha)" in v, sid
    out[f"{sid}.v5"] = v.replace(OLD_MOUTH, NEW_MOUTH)
for k, v in out.items():
    _open(os.path.join(D, f'{k}.FULL.txt'), 'w').write(v)
    print(f"== {k}\n{v}\n")
