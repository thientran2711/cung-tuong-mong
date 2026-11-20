#!/usr/bin/env python3
"""Owner Lượt 737: Sắc sảo +7 NEW people s39–s45 (Tinh nghịch + Tươi tắn dropped to Kho).
Exactly the NF4 method (make_nf4.py line() recipe, approved Sắc sảo v5 block as for s07–s09, EYES_STRAIGHT, strong
closed-mouth sentence, no "phoenix" eye words). Each person: own face swaps, hair, outfit, two colours (medium tone), item, angle.
c06 / c19 redraw (Lượt 737) = re-run of the approved c06.v5 / c19.v5 prompts unchanged (A13) — this script does not touch them.
make_nf4.py is loaded read-only (its file writes are swallowed). Run: python3 dev/art/face-common/make_sacsao_L737.py"""
import os, io, builtins
D = os.path.dirname(os.path.abspath(__file__))
import sys as _s; _s.path.insert(0, D); import face_gate as FG   # MG1 B25: master block + D9 + face gate on every output
_open = builtins.open
def _ro_open(p, mode='r', *a, **k):
    if 'w' in mode or 'a' in mode: return io.StringIO()
    return _open(p, mode, *a, **k)
NS = {'__file__': os.path.join(D, 'make_nf4.py'), 'open': _ro_open, 'print': lambda *a, **k: None, '__name__': 'nf4'}
exec(_open(os.path.join(D, 'make_nf4.py')).read(), NS)
line, ss_face, SS, EYES_STRAIGHT, C, OLD_MOUTH, NEW_MOUTH = (NS[k] for k in "line ss_face SS EYES_STRAIGHT C OLD_MOUTH NEW_MOUTH".split())

S737 = [
("s39", 18, [("clearly DEFINED OVAL face", "clearly DEFINED, slightly WIDE OVAL face, a broad smooth forehead,"),
             ("STRAIGHT, sharp, clearly defined brows", "thick STRAIGHT, sharp, clearly defined brows")],
 "half-up: the top hair coiled into a neat flat bun at the back of the head held by one gold hairpin pointing upward, the rest long and straight behind",
 "a light open beizi of soft saffron-amber silk satin with a soft sheen over a cross-collar smoky-teal inner top and a smoky-teal floor-length skirt of plain silk, small embroidered chrysanthemums along the front edges, a smoky-teal silk sash with a small amber pendant, long sleeves",
 C("soft saffron amber", 38, .52, .55), C("smoky teal", 190, .40, .30),
 "standing upright with her weight on one leg, a slim writing brush held upright between two fingers at chest height as if about to write a sharp reply, the other hand at her sash", "SR"),
("s40", 17, [("clearly DEFINED OVAL face", "clearly DEFINED, narrow V-shaped OVAL face"),
             ("a slim straight nose with a fine high bridge and a neat tip", "a slim nose with a fine high bridge and a small rounded tip")],
 "fully loose and very long, sleek and straight, parted on the left side, a thin ribbon in her secondary colour tied at the back of the head",
 "a cross-collar ruqun of soft cerulean-blue silk satin with a soft sheen and a pale-apricot floor-length skirt of plain silk, small embroidered swallows at the collar and hem, a pale-apricot silk sash with a small blue jade pendant, long sleeves",
 C("soft cerulean blue", 205, .48, .45), C("pale apricot", 25, .84, .40),
 "walking with poise mid-step, a small bronze key on a red silk cord held up in one hand at chest height, the other sleeve flowing", "TL"),
("s41", 18, [("clearly DEFINED OVAL face", "clearly DEFINED, slightly SQUARE OVAL face, a firm jaw angle,"),
             ("well-defined lips with a crisp clear cupid's bow", "wide well-defined lips with a crisp clear cupid's bow")],
 "high half-up: the top hair in one tall single loop at the crown held by one silver hairpin pointing upward, the rest long and straight behind",
 "a cross-collar ruqun of soft olive-green silk satin with a soft sheen and a pale gold-beige floor-length skirt of plain silk, small embroidered ginkgo leaves at the collar and hem, a pale gold-beige silk sash with a small green jade pendant, long sleeves",
 C("soft olive green", 75, .40, .35), C("pale gold beige", 38, .80, .30),
 "standing upright with her weight on one leg, a closed thread-bound book held against her waist in one hand with one finger marking a page, the other hand at her sash", "FF"),
("s42", 18, [("CRISP long almond eyes", "CRISP, slightly smaller deep-set almond eyes"),
             ("clearly DEFINED OVAL face", "clearly DEFINED LONG OVAL face, a long lower face,")],
 "loose and long, swept forward over the left shoulder, the right side pinned back with a small silver comb",
 "a light open beizi of soft raspberry-magenta silk satin with a soft sheen over a cross-collar pale-mint inner top and a pale-mint floor-length skirt of plain silk, small embroidered magnolias along the front edges, a pale-mint silk sash with a small white jade pendant, long sleeves",
 C("soft raspberry magenta", 335, .45, .45), C("pale mint", 155, .82, .25),
 "walking forward with poise mid-step, a single long-stemmed white magnolia blossom held upright at chest height in one hand, the other sleeve flowing", "ST"),
("s43", 17, [("clearly DEFINED OVAL face", "clearly DEFINED HEART-OVAL face, a wide forehead,"),
             ("STRAIGHT, sharp, clearly defined brows", "short STRAIGHT, sharp, clearly defined brows")],
 "fully loose and very long, straight, parted in the centre, the hair at both temples drawn back and fastened at the back of the head with one small jade hairpin",
 "a cross-collar ruqun of soft sapphire-blue silk satin with a soft sheen and a pale lemon-cream floor-length skirt of plain silk, small embroidered cloud scrolls at the collar and hem, a pale lemon-cream silk sash with a small lapis pendant, long sleeves",
 C("soft sapphire blue", 220, .42, .48), C("pale lemon cream", 50, .86, .40),
 "standing upright with her weight on one leg, a slim bamboo-slip scroll held half-open in both hands at her waist as if checking a record", "SL"),
("s44", 18, [("clearly DEFINED OVAL face", "clearly DEFINED DIAMOND-OVAL face, widest at the cheekbones,"),
             ("well-defined lips with a crisp clear cupid's bow", "thin well-defined lips with a crisp clear cupid's bow")],
 "half-up: two thin twists from the temples joined at the back of the head under one small gold hairpin pointing upward, the rest long and sleek",
 "a light open beizi of soft burnt-sienna silk satin with a soft sheen over a cross-collar sage-grey inner top and a sage-grey floor-length skirt of plain silk, small embroidered pomegranate flowers along the front edges, a sage-grey silk sash with a small carnelian pendant, long sleeves",
 C("soft burnt sienna", 15, .45, .45), C("sage grey", 120, .66, .12),
 "walking with poise mid-step, a small cobalt-blue silk lucky-knot charm with a short tassel held in one hand at her waist, the other sleeve flowing", "TR"),
("s45", 17, [("CRISP long almond eyes", "CRISP large almond eyes"),
             ("a slim straight nose with a fine high bridge", "a straight nose with a slightly arched high bridge"),
             ("clearly DEFINED OVAL face", "clearly DEFINED TEARDROP-OVAL face")],
 "fully loose and very long, sleek, straight side locks framing the cheeks, one small pearl hairpin at the crown pointing upward",
 "a cross-collar ruqun of soft aubergine-purple silk satin with a soft sheen and a pale-gold floor-length skirt of plain silk, small embroidered cranes at the collar and hem, a pale-gold silk sash with a small amethyst pendant, long sleeves",
 C("soft aubergine purple", 290, .40, .32), C("pale gold", 45, .76, .40),
 "standing upright with her weight on one leg, a small embroidered silk sachet held up by its red cord in one hand at chest height, the other hand at her sash", "SR"),
]
out = {}
for sid, age, sw, hair, outfit, (mn, mh), (sn, sh), pose, ak in S737:
    face = ss_face(sw) + ". " + EYES_STRAIGHT[:-1]
    assert "phoenix" not in face.lower(), sid
    v = line(age, face, SS["expr"], hair, outfit, mn, mh, sn, sh, pose, ak)
    assert v.count(OLD_MOUTH) == 1, sid
    out[f"{sid}.v5"] = v.replace(OLD_MOUTH, NEW_MOUTH)
for k, v in out.items():
    v = FG.final(v, k); _open(os.path.join(D, f'{k}.FULL.txt'), 'w').write(v)
    print(f"== {k}\n{v}\n")
