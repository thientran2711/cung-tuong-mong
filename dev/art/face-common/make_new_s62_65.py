#!/usr/bin/env python3
"""F4 (Foreman C ROOT-66; owner Lượt 1001 "…thiếu bao nhiêu thì làm ở cái số dịu dàng và đoan trang thêm cho đủ thôi … Thì bây giờ
làm đủ 90 người."): 4 NEW consort people → 90. s62 s63 s64 = Dịu dàng (11 → 14), s65 = Đoan trang (12 → 13).
Method = make_kieuky_L761.py / make_quyenru_L761.py (F1/F2 new faces): make_nf4.py loaded read-only, line() recipe, the T7 group
block of her group (TYPES5 "Dịu dàng" / "Đoan trang", unchanged), EYES_STRAIGHT, strong closed-mouth sentence (OLD_MOUTH →
NEW_MOUTH), FG.final (MG1 master block + D9 + face gate incl. B20 root hex pair). Each person: own face swaps, hair, outfit, item,
angle — all different from the 11 Dịu dàng (m02 m08 m14 m18 m19 m20 c02 c08 c20 c26 c32), the 12 Đoan trang (m04 m05 m10 m16
m22 m28 m29 c04 c10 c16 c22 c28) and from each other (see DIFF below).
COLOURS: root pair read from s_root_colours.json (s62–s65). Until P6's A32 palette lands these are F4 PLACEHOLDER toned picks
(A32 band of four_season86_a32.BAND, src says so); at GO replace them there with P6's root pair and re-run → sNN.v5.FULL.txt.
Run: python3 dev/art/face-common/make_new_s62_65.py"""
EAR = "Bare earlobes: she wears NO earrings, nothing at the ears. "   # owner 20/11 (ROOT-66 relay) "…không ai được đeo hoa tai." (until NOEAR1 puts it in the master block)
import os, io, builtins
D = os.path.dirname(os.path.abspath(__file__))
import sys as _s, json as _j; _s.path.insert(0, D); import face_gate as FG   # MG1 B25: master block + D9 + face gate on every output
_open = builtins.open
def _ro_open(p, mode='r', *a, **k):
    if 'w' in mode or 'a' in mode: return io.StringIO()
    return _open(p, mode, *a, **k)
NS = {'__file__': os.path.join(D, 'make_nf4.py'), 'open': _ro_open, 'print': lambda *a, **k: None, '__name__': 'nf4'}
exec(_open(os.path.join(D, 'make_nf4.py')).read(), NS)
line, T7, EYES_STRAIGHT, OLD_MOUTH, NEW_MOUTH = (NS[k] for k in "line T7 EYES_STRAIGHT OLD_MOUTH NEW_MOUTH".split())

_SR = _j.load(_open(os.path.join(D, 's_root_colours.json')))
IDS = "s62 s63 s64 s65".split()
ROOTS = {k: (_SR[k]['root_season'], _SR[k]['main'], _SR[k]['main_hex'], _SR[k]['sec'], _SR[k]['sec_hex']) for k in IDS if k in _SR}
PH = ("{ROOT_MAIN}", "{ROOT_MAIN_HEX}", "{ROOT_SEC}", "{ROOT_SEC_HEX}")

# DIFF vs the approved Dịu dàng / Đoan trang people (their v3 prompts):
#  faces used (DD): slender long oval · egg-shaped · plump lower cheeks · slim oval · graceful oval · round · pear · round-heart ·
#    round-oval + dimple · long round · wide oval.  (DT): diamond · broad round-oval · long oval ×3 · small round · heart ·
#    long heart · wide oval · slender diamond-oval · rounded square.
#  hair used: mostly fully loose + one ribbon / two small plaits or loops / small half-up knot or twist.
#  items used (DD): folding fan · round fan · pink lotus · pear blossom · painting scroll · bird cage · peach blossom · pouch ·
#    morning glory · white lotus bud · China rose.  (DT): plum sprig ×2 · silk ball · book scroll · rabbit lantern · hand mirror ·
#    pinwheel · xiao flute · painting scroll · poetry album · brush case · folding fan.
#  NEW here: wide forehead + feathered brows · soft high cheekbones + wide-set eyes · round-almond double-lid eyes + straight brows ·
#    softly broad cheekbones + long double-lid eyes + clear lip bow; side braid · half-up low loop · half-up pearl top-knot ·
#    half-up neat loop (ROOT-66 F1: thiếu nữ = loose or half-up); brass wind chime · brown rabbit · amber jade cicada (was golden loquats, F16 NOFRUIT; drawn picture kept) · sandalwood beads
#    (items used by no one, item colours outside both root families, B16); angles SR TL FF SL. ROOT-66 review fixes 1–7 applied.
S_NEW = [
("s62", "Dịu dàng", 17,
 [("a SOFT gentle oval face with smooth rounded cheeks", "a SOFT gentle oval face, a smooth wide forehead, smooth rounded cheeks"),
  ("thin long softly curved brows", "softly feathered, gently curved brows")],
 "one long soft loose braid falling over the front of her right shoulder, tied at the end with a small pearl clasp, one small white jasmine flower clasp at the top of the braid, soft short wisps at the temples",
 "a cross-collar ruqun of {m} silk with a soft sheen and a {s} floor-length pleated skirt of plain silk, small embroidered plum blossoms at the collar and hem, a {s} silk sash with a small white jade pendant, long sleeves",
 "standing with her weight on one leg, a small wind chime of little brass bells on a red silk cord held up by its cord in one hand at chest height, the other hand resting at her sash", "SR"),
("s63", "Dịu dàng", 18,
 [("smooth rounded cheeks", "softly rounded, gently high cheekbones"),
  ("large TENDER almond eyes", "large, slightly wide-set TENDER almond eyes"),
  ("a small soft mouth with gently rounded lips", "a small soft mouth with a softly full lower lip")],
 "half-up: the top hair in a small soft low loop at the back held by one plain jade hairpin, the rest long and loose",
 "a short half-sleeved {m} silk jacket with a soft sheen over a cross-collar {s} inner top and a {m} floor-length skirt of plain silk, small embroidered osmanthus sprigs along the jacket edges and hem, a {s} silk sash with a small amber pendant, long inner sleeves",
 "standing with her weight on one leg, cradling a small chocolate-brown rabbit in the crook of one arm at her chest, the other hand gently stroking its back", "TL"),
("s64", "Dịu dàng", 17,
 [("large TENDER almond eyes with gently LOWERED", "large TENDER round-almond eyes, soft double eyelids, gently LOWERED"),
  ("thin long softly curved brows that slope gently DOWN at the tails", "soft, slightly fuller straight brows that slope gently DOWN at the tails"),
  ("a small delicate nose", "a small nose with a softly rounded tip")],
 "half-up: a small rounded top-knot wrapped with tiny pearls, the rest long and loose, two soft side locks",
 "a high-waisted {m} silk skirt with a soft sheen tied above the chest with a long {s} silk ribbon bow, a {s} wide-sleeved short top of plain silk, small embroidered lily-of-the-valley sprays along the skirt hem and cuffs",
 "standing with her weight on one leg, a small amber-yellow jade cicada on a short cord held at her chest in one hand, the other hand resting at her sash", "FF"),
("s65", "Đoan trang", 18,
 [("classic oval face with a smooth high forehead, evenly full cheeks", "classic oval face with a smooth high forehead, gently rounded, softly broad cheekbones"),
  ("calm LEVEL almond eyes of medium size", "calm LEVEL, slightly long almond eyes with clear double eyelids"),
  ("a medium mouth with evenly shaped lips", "a medium mouth with evenly shaped lips and a clearly defined lip bow")],
 "half-up: the top hair drawn back smoothly into one small neat loop held by a pair of gold pearl-head pins pointing upward, the rest long and straight down her back",
 "a cross-collar ruqun of {m} silk satin with a soft sheen, a long {s} silk overvest with a straight collar falling to the knees, a {m} floor-length skirt of plain silk, small embroidered chrysanthemum roundels along the vest edges and hem, a {s} silk sash with a small jade disc pendant, long sleeves",
 "standing upright and composed with her weight on one leg, a long string of brown sandalwood prayer beads looped over the fingers of one hand at her waist, the other hand resting at her sash", "SL"),
]
assert [x[0] for x in S_NEW] == IDS and len({x[6] for x in S_NEW}) == 4   # 4 different angles
out = {}
for sid, grp, age, sw, hair, outfit, pose, ak in S_NEW:
    blk = T7[grp]
    if sid in ROOTS: _rs, mn, mh, sn, sh = ROOTS[sid]; ext = "FULL"
    else: mn, mh, sn, sh = PH; ext = "PH"
    face = blk["face"]
    for a, b in sw: assert face.count(a) == 1, (sid, a); face = face.replace(a, b)
    face = face + ". " + EYES_STRAIGHT[:-1]
    of = outfit.replace("{m}", mn).replace("{s}", sn)
    import re as _re; of = _re.sub(r"\ba ([aeiouAEIOU])", r"an \1", of)   # "a ivory" -> "an ivory" (colour words from the palette)
    v = line(age, face, blk["expr"], hair, of, mn, mh, sn, sh, pose, ak)
    assert "phoenix" not in v.lower(), sid
    assert v.count(OLD_MOUTH) == 1 and "(thướt tha)" in v, sid
    out[f"{sid}.v5.{ext}"] = v.replace(OLD_MOUTH, NEW_MOUTH)
fails = []
for k, v in out.items():
    if k.endswith('.FULL'):
        pass   # NOEAR1: the bare-earlobes sentence now comes from master_common.apply (EAR_SENT, rule F15); was: v = v.replace("No text, no labels.", EAR + "No text, no labels.") if "NO earrings" not in v else v
        try: v = FG.final(v, k)
        except Exception as e: fails.append(k); print(f"GATE FAIL {k}: {e}"); continue
    _open(os.path.join(D, f'{k}.txt'), 'w').write(v)
    print(f"== {k} ({len(v)} chars) written")
_s.exit(1 if fails else 0)
