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
#  NEW here: short oval / feathered brows · soft high cheekbones + wide-set eyes · round-almond double-lid eyes + straight brows ·
#    egg-shaped classic face + long double-lid eyes + clear lip bow; side braid · low looped nape bun · high crown bun with pearls ·
#    double-loop chignon; embroidery hoop · white rabbit · porcelain vase · sandalwood prayer beads; angles SR TL FF SL.
S_NEW = [
("s62", "Dịu dàng", 17,
 [("a SOFT gentle oval face", "a SOFT gentle, slightly SHORT oval face with a smooth wide forehead"),
  ("thin long softly curved brows", "softly feathered, gently curved brows")],
 "one long soft loose braid falling over the front of her right shoulder, tied at the end with a small pearl clasp, a few small white jasmine flowers tucked along the braid, soft short wisps at the temples",
 "a cross-collar ruqun of {m} silk with a soft sheen and a {s} floor-length pleated skirt of plain silk, small embroidered plum blossoms at the collar and hem, a {s} silk sash with a small white jade pendant, long sleeves",
 "standing with her weight on one leg and her head inclined slightly to one side, a small round embroidery hoop with a half-stitched white orchid held in both hands at her waist", "SR"),
("s63", "Dịu dàng", 18,
 [("smooth rounded cheeks", "softly rounded, gently high cheekbones"),
  ("large TENDER almond eyes", "large, slightly wide-set TENDER almond eyes"),
  ("a small soft mouth with gently rounded lips", "a small soft mouth with a softly full lower lip")],
 "low and soft: all the hair gathered loosely at the nape into one soft low looped bun held by one plain jade hairpin pointing upward, a few soft loose strands framing the face",
 "a short half-sleeved {m} silk jacket with a soft sheen over a cross-collar {s} inner top and a {m} floor-length skirt of plain silk, small embroidered osmanthus sprigs along the jacket edges and hem, a {s} silk sash with a small amber pendant, long inner sleeves",
 "standing with her weight on one leg, cradling a small white rabbit in the crook of one arm at her chest, the other hand gently stroking its back", "TL"),
("s64", "Dịu dàng", 17,
 [("large TENDER almond eyes", "large TENDER round-almond eyes with soft double eyelids"),
  ("thin long softly curved brows that slope gently DOWN at the tails", "soft, slightly fuller straight brows that slope gently DOWN at the tails"),
  ("a small delicate nose", "a small nose with a softly rounded tip")],
 "fully up: one soft high rounded bun at the crown wrapped by a thin string of tiny pearls, one small silver hairpin pointing upward, two soft side locks falling in front of the ears",
 "a high-waisted {m} silk skirt with a soft sheen tied above the chest with a long {s} silk ribbon bow, a {s} wide-sleeved short top of plain silk, small embroidered lily-of-the-valley sprays along the skirt hem and cuffs",
 "standing with her weight on one leg, a small blue-and-white porcelain vase with one sprig of pink apricot blossom held at her chest in both hands", "FF"),
("s65", "Đoan trang", 18,
 [("classic oval face", "classic EGG-shaped oval face"),
  ("calm LEVEL almond eyes of medium size", "calm LEVEL, slightly long almond eyes with clear double eyelids"),
  ("a medium mouth with evenly shaped lips", "a medium mouth with evenly shaped lips and a clearly defined lip bow")],
 "fully up: a smooth neat double-loop chignon at the back of the head held by a pair of gold hairpins with small pearl heads pointing upward, the hair drawn back smoothly from the face",
 "a cross-collar ruqun of {m} silk satin with a soft sheen, a long {s} silk overvest with a straight collar falling to the knees, a {m} floor-length skirt of plain silk, small embroidered chrysanthemum roundels along the vest edges and hem, a {s} silk sash with a small jade disc pendant, long sleeves",
 "standing upright and composed with her weight on one leg, a long string of dark sandalwood prayer beads looped over the fingers of one hand at her waist, the other hand resting at her sash", "SL"),
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
        try: v = FG.final(v, k)
        except Exception as e: fails.append(k); print(f"GATE FAIL {k}: {e}"); continue
    _open(os.path.join(D, f'{k}.txt'), 'w').write(v)
    print(f"== {k} ({len(v)} chars) written")
_s.exit(1 if fails else 0)
