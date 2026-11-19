#!/usr/bin/env python3
"""Owner Lượt 760/761/763: Quyến rũ +6 NEW people s56–s61 (Quyến rũ v5 block T7 as the approved s16–s18 / s33–s38).
Method = make_kieuky_L761.py / make_nf4.py line() recipe + the approved Quyến rũ round-2 words (make_quyenru_r2.py, Lượt 712:
r2 expression, NEW_COMMON, NEW_FACE) + the NSFW-safe v5b words (s35/s38). EYES_STRAIGHT, strong closed-mouth sentence,
no "phoenix". Beauty mark: copied unchanged from the approved prompts (T7 = "her own LEFT eye (the eye on the RIGHT side of
the picture)"); the side is an open owner question (NF4.md) — nothing added here.
COLOURS: ROOTS empty until "P1 NEW16 READY" (copy name + hex from palettes_season.json) → sNN.v5.FULL.txt; until then
placeholder drafts sNN.v5.PH.txt. MG1 MASTER block + check_store --scope face after "MG1 FACE READY".
Run: python3 dev/art/face-common/make_quyenru_L761.py"""
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
QR = T7["Quyến rũ"]
r2 = _open(os.path.join(D, "make_quyenru_r2.py")).read(); R2 = {"__file__": os.path.join(D, "make_quyenru_r2.py")}
exec(r2[:r2.index("for sid, base in BASE.items():")], R2)          # constants only, no file writes
assert R2["NEW_EXPR"].startswith("Expression: ")
R2_EXPR = R2["NEW_EXPR"][len("Expression: "):]
V5B = (("a sensual, magnetic, enchanting woman", "a magnetic, enchanting young lady"),)   # s35/s38 v5b face words

_SR = _j.load(_open(os.path.join(D, 's_root_colours.json')))   # P1 NEW16 (Lượt 763) roots, words + hex as stored
ROOTS = {k: (_SR[k]['root_season'], _SR[k]['main'], _SR[k]['main_hex'], _SR[k]['sec'], _SR[k]['sec_hex']) for k in "s56 s57 s58 s59 s60 s61".split() if k in _SR}
PH = ("{ROOT_MAIN}", "{ROOT_MAIN_HEX}", "{ROOT_SEC}", "{ROOT_SEC_HEX}")

# DIFF vs approved Quyến rũ (make_nf4 S4 s16–s18 + FACEV/HAIR/ITEMS/ANGS s33–s38):
#  face swaps used: slightly LONG OVAL (s17,s35) · deep upper-lip bow (s34) · lifted nose tip (s36) · softly arched brows (s37)
#  hair used: waves over one shoulder · low twist + pearl drop · two thin braids · soft waves + ribbon · crown section gold pin · tall bun · centre part ribbon · flat knot
#  items used: ivory round fan red tassel (s16,s33,s38) · red lacquer folding fan · peach-blossom sprig · handkerchief · red camellia
S761Q = [
("s56", 18, [("soft HEART-OVAL face", "soft round-cheeked OVAL face"),
             ("a delicate rounded chin", "a small delicate pointed chin")],
 "half-up: the top hair in one loose, slightly tilted bun at the back held by a gold hairpin with a small silk tassel, a few soft loose strands at the temples, the rest long and wavy",
 "a cross-collar ruqun of {m} silk satin with a soft sheen and a {s} floor-length skirt of plain silk, small embroidered butterflies at the collar and hem, a {s} silk sash with a small rose quartz pendant, a long sheer {s} silk shawl draped over both forearms, long sleeves",
 "standing with her weight on one leg and her head softly tilted, a small round lantern of red silk held by its cord in one hand at her waist, the other hand resting at her sash", "FF"),
("s57", 17, [("large liquid-bright almond eyes", "long, slightly narrower liquid-bright almond eyes"),
             ("slender softly curved brows", "thin long softly curved brows set high")],
 "fully loose and very long, sleek and straight, parted on the right side, the left side tucked behind the ear with one small pink silk flower hairpin",
 "a light open beizi of {m} silk satin with a soft sheen over a cross-collar {s} inner top and a {s} floor-length skirt of plain silk, small embroidered wisteria along the front edges, a {s} silk sash with a small amethyst pendant, long sleeves",
 "walking slowly and gracefully mid-step, a long hanging sprig of purple wisteria held up beside her shoulder in one hand, the other sleeve trailing", "TL"),
("s58", 18, [("soft HEART-OVAL face", "soft DIAMOND-OVAL face with gently high cheekbones"),
             ("a small fine nose", "a small straight nose with a fine bridge")],
 "low loose chignon at the nape held by one green jade hairpin, long soft side locks framing the cheeks",
 "a high-waisted {m} silk satin skirt with a soft sheen tied above the chest, a {s} wide-sleeved short top of plain silk, small embroidered plum blossoms along the skirt hem and cuffs, a long {s} silk ribbon sash with a small white jade pendant",
 "standing with her weight on one leg and her shoulders softly turned, a small embroidered fragrant sachet with a long silk tassel dangling from her fingers at chest height, the other hand resting at her waist", "SR"),
("s59", 18, [("FULL plump lips with a soft curved bow", "FULL, slightly wide plump lips with a soft curved bow"),
             ("soft HEART-OVAL face", "soft HEART-OVAL face with a wide smooth forehead,")],
 "fully loose and very long in large soft waves, a thin gold chain with one tiny ruby lying across the crown",
 "a half-sleeved short jacket of {s} silk over a cross-collar {m} silk satin top with a soft sheen and a {m} high-waisted floor-length skirt of plain silk, small gold-embroidered peonies at the jacket edges and hem, a {s} silk sash with a small coral pendant, long inner sleeves",
 "walking slowly and gracefully mid-step, a translucent gauze round fan painted with two butterflies held up at her shoulder in one hand, never covering her face, the other sleeve trailing", "TR"),
("s60", 17, [("smooth full cheeks", "smooth, slightly lean cheeks"),
             ("a delicate rounded chin", "a delicate, slightly long rounded chin")],
 "high half-up: the top hair in one large soft loop at the crown held by one gold hairpin pointing upward, the rest long and wavy, swept forward over the left shoulder",
 "a long sleeveless {s} silk overvest open at the front over a cross-collar ruqun of {m} silk satin with a soft sheen and a {m} floor-length skirt of plain silk, small embroidered lotus flowers along the vest edges and hem, a {s} silk sash with a small pearl pendant, long sleeves",
 "standing with her weight on one leg and her head softly tilted, a single pink lotus flower on a short stem held in both hands at her waist", "SL"),
("s61", 18, [("long sweeping upper lashes", "very long thick sweeping upper lashes"),
             ("slender softly curved brows", "slightly fuller, softly curved brows")],
 "fully loose and very long, softly wavy, parted in the centre, the hair at one temple pinned back with two small crossed gold hairpins",
 "a cross-collar ruqun of {m} silk satin with a soft sheen and a {s} floor-length skirt of plain silk, small embroidered swallows and willow leaves at the collar and hem, a {s} silk sash with a small red jade pendant, long sleeves",
 "walking slowly and gracefully mid-step, a long red silk ribbon trailing from the fingers of one raised hand at shoulder height, the other sleeve trailing", "ST"),
]
assert len({x[0] for x in S761Q}) == 6 and len({x[5] for x in S761Q}) == 6   # 6 different angles
out = {}
for sid, age, sw, hair, outfit, pose, ak in S761Q:
    if sid in ROOTS: _rs, mn, mh, sn, sh = ROOTS[sid]; ext = "FULL"
    else: mn, mh, sn, sh = PH; ext = "PH"
    face = QR["face"]
    for a, b in sw + list(V5B): assert face.count(a) == 1, (sid, a); face = face.replace(a, b)
    face = face + ". " + EYES_STRAIGHT[:-1]
    v = line(age, face, R2_EXPR, hair, outfit.replace("{m}", mn).replace("{s}", sn), mn, mh, sn, sh, pose, ak)
    for a, b in ((OLD_MOUTH, NEW_MOUTH), (R2["OLD_COMMON"], R2["NEW_COMMON"]), (R2["OLD_FACE"], R2["NEW_FACE"])):
        assert v.count(a) == 1, (sid, a[:40]); v = v.replace(a, b)
    assert "phoenix" not in v.lower() and "sensual" not in v.lower() and "(thướt tha)" in v, sid
    assert "her own LEFT eye (the eye on the RIGHT side of the picture)" in v, sid   # same as approved s33–s38
    out[f"{sid}.v5.{ext}"] = v
for k, v in out.items():
    if k.endswith('.FULL'): v = FG.final(v, k)
    _open(os.path.join(D, f'{k}.txt'), 'w').write(v)
    print(f"== {k}\n{v}\n")
