#!/usr/bin/env python3
"""F3 (ROOT-63, owner: s43 s44 s45 moved Sắc sảo → Quyến rũ, commit ccbf88d): NEW Quyến rũ base pictures, built EXACTLY by make_quyenru_L761.py
(code + words copied unchanged; only S761Q rows and ROOTS differ). Colours = root_drawn (owner L27 'Giữ lại bảng áo đậm màu').
Each person keeps her own hair, outfit, item and angle from make_sacsao_L737.py; face = Quyến rũ T7 block with swaps carrying her own trait;
pose verbs in the Quyến rũ wording; s43 "as if checking a record" dropped (Sắc sảo flavour).
Original docstring: Owner Lượt 760/761/763: Quyến rũ +6 NEW people s56–s61 (Quyến rũ v5 block T7 as the approved s16–s18 / s33–s38).
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
_PS = _j.load(_open(os.path.join(D, 'palettes_season.json')))   # L27: DEEP drawn colours = root_drawn
def _rd(k):
    p = _PS[k]; rs = p['root_season']; r = p[rs]['root_drawn']; return (rs, r['main'], r['main_hex'], r['sec'], r['sec_hex'])
ROOTS = {k: _rd(k) for k in "s43 s44 s45".split()}
PH = ("{ROOT_MAIN}", "{ROOT_MAIN_HEX}", "{ROOT_SEC}", "{ROOT_SEC_HEX}")

# DIFF vs approved Quyến rũ (make_nf4 S4 s16–s18 + FACEV/HAIR/ITEMS/ANGS s33–s38):
#  face swaps used: slightly LONG OVAL (s17,s35) · deep upper-lip bow (s34) · lifted nose tip (s36) · softly arched brows (s37)
#  hair used: waves over one shoulder · low twist + pearl drop · two thin braids · soft waves + ribbon · crown section gold pin · tall bun · centre part ribbon · flat knot
#  items used: ivory round fan red tassel (s16,s33,s38) · red lacquer folding fan · peach-blossom sprig · handkerchief · red camellia
S761Q = [
("s43", 17, [("slender softly curved brows", "short, nearly straight, softly curved brows"),
             ("smooth full cheeks", "softly sculpted cheeks")],
 "fully loose and very long, straight, parted in the centre, the hair at both temples drawn back and fastened at the back of the head with one small jade hairpin",
 "a cross-collar ruqun of {m} silk satin with a soft sheen and a {s} floor-length skirt of plain silk, small embroidered cloud scrolls at the collar and hem, a {s} silk sash with a small lapis pendant, long sleeves",
 "standing with her weight on one leg and her head softly tilted, a slim bamboo-slip scroll held half-open in both hands at her waist", "SL"),
("s44", 18, [("soft HEART-OVAL face", "soft DIAMOND-OVAL face, widest at the gently high cheekbones,"),
             ("FULL plump lips with a soft curved bow", "softly full lips with a clear curved bow")],
 "half-up: two thin twists from the temples joined at the back of the head under one small gold hairpin pointing upward, the rest long and sleek",
 "a light open beizi of {m} silk satin with a soft sheen over a cross-collar {s} inner top and a {s} floor-length skirt of plain silk, small embroidered pomegranate flowers along the front edges, a {s} silk sash with a small carnelian pendant, long sleeves",
 "walking slowly and gracefully mid-step, a small red pomegranate held in one hand at her waist, the other sleeve trailing", "TR"),
("s45", 17, [("large liquid-bright almond eyes", "very large liquid-bright almond eyes"),
             ("a small fine nose", "a straight nose with a gently arched bridge"),
             ("soft HEART-OVAL face", "soft TEARDROP-OVAL face")],
 "fully loose and very long, sleek, straight side locks framing the cheeks, one small pearl hairpin at the crown pointing upward",
 "a cross-collar ruqun of {m} silk satin with a soft sheen and a {s} floor-length skirt of plain silk, small embroidered cranes at the collar and hem, a {s} silk sash with a small amethyst pendant, long sleeves",
 "standing with her weight on one leg and her head softly tilted, a small embroidered silk sachet held up by its red cord in one hand at chest height, the other hand resting at her sash", "SR"),
]
assert len({x[0] for x in S761Q}) == 3 and len({x[5] for x in S761Q}) == 3   # 3 different angles
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
    out[f"{sid}.qr.{ext}"] = v
for k, v in out.items():
    if k.endswith('.FULL'): v = FG.final(v, k)
    _open(os.path.join(D, f'{k}.txt'), 'w').write(v)
    print(f"== {k}\n{v}\n")
