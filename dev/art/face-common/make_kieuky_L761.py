#!/usr/bin/env python3
"""Owner Lượt 760/761/763: Kiêu kỳ +5 NEW people s51–s55 (same Kiêu kỳ v5 block T7 as the approved s10–s12 / s19–s25).
Method = make_lanhlung_L761.py / make_sacsao_L737.py / make_nf4.py line() recipe (v5 thướt tha FABRIC sentence, EYES_STRAIGHT,
strong closed-mouth sentence, no "phoenix" words anywhere). Each person: own face swaps, hair, outfit layers, item, angle,
weight-on-one-leg pose — all different from the 10 approved Kiêu kỳ (see DIFF below) and from each other.
COLOURS: NOT picked here (owner Lượt 763 order: P1 palette for 86 first). ROOTS stays empty until the foreman forwards
"P1 NEW16 READY" — then copy each root pair (name + hex) from palettes_season.json and the script writes sNN.v5.FULL.txt.
While ROOTS is empty it writes placeholder drafts sNN.v5.PH.txt with {ROOT_MAIN}/{ROOT_MAIN_HEX}/{ROOT_SEC}/{ROOT_SEC_HEX}.
MG1 MASTER block: when "MG1 FACE READY" lands, add it the way MG1 adds it to the other face makers, then check_store --scope face.
make_nf4.py is loaded read-only (its file writes are swallowed). Run: python3 dev/art/face-common/make_kieuky_L761.py"""
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
KK = T7["Kiêu kỳ"]

# root pairs — EMPTY until P1 NEW16 READY. sid: (root season, main, main_hex, sec, sec_hex), words + hex exactly as palettes_season.json
_SR = _j.load(_open(os.path.join(D, 's_root_colours.json')))   # P1 NEW16 (Lượt 763) roots, words + hex as stored
ROOTS = {k: (_SR[k]['root_season'], _SR[k]['main'], _SR[k]['main_hex'], _SR[k]['sec'], _SR[k]['sec_hex']) for k in "s51 s52 s53 s54 s55".split() if k in _SR}
PH = ("{ROOT_MAIN}", "{ROOT_MAIN_HEX}", "{ROOT_SEC}", "{ROOT_SEC_HEX}")

# DIFF vs approved Kiêu kỳ (make_nf4 S4 + FACEV/HAIR/ITEMS/ANGS):
#  face swaps used: DIAMOND-OVAL (s11,s20) · crisp lip line (s12,s21) · pointed chin (s22) · thin brows (s23) · slender oval (s24) · high fine bridge (s25)
#  hair used: crown section + gold pin · tall bun · centre part + ribbon · flat knot · over right shoulder · two thin braids · soft waves
#  (s51 item changed from a gold wine cup: the common block says 'no cup')
#  items used: round fan (s10,s19,s25) · white peony (s20,s24) · purple orchid · hand mirror (s12,s21) · black folding fan · jade seal
#  angles used: SR×2 TL×2 FF×2 SL×2 TR ST
S761K = [
("s51", 18, [("a narrow elegant jaw", "a firm, clearly angled jaw"),
             ("long slender brows rising", "thick dark slender brows rising")],
 "fully up: all the hair lifted into two tall symmetric loops at the crown held by one gold hairpin pointing upward, two long thin locks falling straight behind the shoulders",
 "a cross-collar ruqun of {m} silk satin with a soft sheen and a {s} floor-length skirt of plain silk, small embroidered gold peony scrolls at the collar and hem, a wide {s} silk sash with a small gold buckle, a long sheer {s} silk shawl draped over both forearms, long sleeves",
 "standing tall and upright with her weight on one leg, a small round openwork gold incense ball on a red silk cord held up at chest height between her fingertips, the other hand resting at her sash", "TR"),
("s52", 17, [("long refined OVAL face", "refined HEART-OVAL face, a wide smooth forehead,"),
             ("THIN well-defined lips held firm", "small, slightly full, well-defined lips held firm")],
 "half-up: the top hair in one tall bun tilted to one side at the crown held by one long gold hairpin with a small dangling pearl, the rest long and straight behind",
 "a half-sleeved short jacket of {s} silk over a cross-collar {m} silk satin top with a soft sheen and a {m} high-waisted floor-length skirt of plain silk, small gold-embroidered lotus scrolls at the jacket edges and hem, a {s} silk sash with a small red jade pendant, long inner sleeves",
 "standing tall and upright with her weight on one leg, a long iridescent peacock tail feather held upright beside her shoulder in one hand, the other hand resting at her sash", "FF"),
("s53", 18, [("long narrow almond eyes with sharply UP-SWEPT outer corners", "large almond eyes with sharply UP-SWEPT outer corners"),
             ("a straight slim high-bridged nose", "a high-bridged nose with a slightly arched bridge")],
 "fully loose and very long, sleek, parted deeply on the left side, the right side swept back and fastened behind the ear with one small gold comb, a thin gold chain with one tiny pearl across the parting",
 "a light open beizi of {m} silk satin with a soft sheen over a cross-collar {s} inner top and a {s} floor-length skirt of plain silk, small embroidered magnolias along the front edges, a {s} silk sash with a small white jade pendant, long sleeves",
 "walking slowly with poise mid-step, a small closed red lacquer jewel box resting on the open palm of one hand at her waist, the other sleeve trailing", "SL"),
("s54", 18, [("long refined OVAL face", "long refined TEARDROP-OVAL face"),
             ("HIGH defined cheekbones", "very HIGH, sharply defined cheekbones and slightly lean cheeks")],
 "low chignon: all the hair gathered into a neat low coiled bun at the nape held by two crossed silver hairpins, one long thin lock falling in front of each ear",
 "a high-waisted {m} silk satin skirt with a soft sheen tied above the chest, a {s} wide-sleeved short top of plain silk, small embroidered gold orchids along the skirt hem and cuffs, a long {s} silk ribbon sash with a small green jade pendant",
 "standing tall and upright with her weight on one leg, a strand of white pearls draped over the fingers of one raised hand at chest height as if judging their worth, the other hand resting at her sash", "ST"),
("s55", 17, [("long narrow almond eyes", "long narrow, slightly deep-set almond eyes"),
             ("a small firm chin", "a small, softly rounded firm chin"),
             ("a straight slim high-bridged nose", "a straight slim high-bridged nose with a small lifted tip")],
 "half-up: the top hair woven into one thick braid wound around the back of the head like a crown, one small ruby hairpin pointing upward, the rest long and loose",
 "a long sleeveless {s} silk overvest open at the front over a cross-collar ruqun of {m} silk satin with a soft sheen and a {m} floor-length skirt of plain silk, small embroidered begonias along the vest edges and hem, a {s} silk sash with a small carnelian pendant, long sleeves",
 "standing tall and upright with her weight on one leg, a closed red silk parasol with a gold-tipped handle held upright at her side in one hand, the other hand resting at her sash", "SR"),
]
assert len({x[0] for x in S761K}) == 5 and len({x[5] for x in S761K}) == 5   # 5 different angles
out = {}
for sid, age, sw, hair, outfit, pose, ak in S761K:
    if sid in ROOTS: _rs, mn, mh, sn, sh = ROOTS[sid]; ext = "FULL"
    else: mn, mh, sn, sh = PH; ext = "PH"
    face = KK["face"]
    for a, b in sw: assert face.count(a) == 1, (sid, a); face = face.replace(a, b)
    face = face + ". " + EYES_STRAIGHT[:-1]
    v = line(age, face, KK["expr"], hair, outfit.replace("{m}", mn).replace("{s}", sn), mn, mh, sn, sh, pose, ak)
    assert "phoenix" not in v.lower(), sid
    assert v.count(OLD_MOUTH) == 1 and "(thướt tha)" in v, sid
    out[f"{sid}.v5.{ext}"] = v.replace(OLD_MOUTH, NEW_MOUTH)
for k, v in out.items():
    if k.endswith('.FULL'): v = FG.final(v, k)
    _open(os.path.join(D, f'{k}.txt'), 'w').write(v)
    print(f"== {k}\n{v}\n")
