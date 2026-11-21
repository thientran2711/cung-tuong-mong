#!/usr/bin/env python3
"""LADDER2 (owner L1627 via Foreman C #15, 0 cr): G40 for ALL 8 tiers with the ONE shared stronger clause master_common.OUTER_TIED
(agreed with DESIGN20) + thu t7 / t8 gate fixes. Run from anywhere; never hand-edit the outputs (L1567).
 t7 HQP  s62_t7_THU_COMOI_v8d -> v8e : OUTER_IN -> OUTER_TIED; old FAILs fixed (COLORFIX1.md:74):
        G23 walk+still (drop 'the robe falling still and straight' from the walking pose), E1 (angle tail = 14-angle table words),
        S19 (store tail feet words 'only slipper toe tips peeking under the hem', G23 owner 20/11).
 t8 HH   s62_t8_THU_COMOI_v10c -> v10d: + OUTER_TIED (same spot); S19 tail fixed as t7.
 Own embroidery style of t7/t8 untouched (owner L1627). Length: A38 trims of REPEATED boilerplate only (listed in TRIMS + .keep)."""
import os, sys
ART = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ART)
from master_common import OUTER_IN, OUTER_TIED
D = os.path.join(ART, "thu_comoi")
WHY = "owner L1627 G40 all 8 tiers (master_common.OUTER_TIED, LADDER2)"
S19_OLD = "eyes open, floor-length robe with slippers visible, no train,"
S19_NEW = "eyes open, floor-length robe, only slipper toe tips peeking under the hem, no train,"
# A38: repeated boilerplate only, cut in this order until <= LIMIT (never owner outfit / embroidery / jewellery / hair words)
TRIMS = [
    (", never copy anything but its colour", "repeat of 'Image 2 is only a colour reference' (A38 std trim list)"),
    ("; the royal yellow in the robe is exactly that colour", "repeat of the yellow hex sentence in COLOUR RULE"),
    (", with slippers visible", "repeat of the S19 feet tail (outfit copy, G23 feet words)"),
    (" with slippers visible", "repeat of the S19 feet tail (outfit copy, G23 feet words)"),
    (", never a single flat colour all over", "repeat of 'NOT an all-yellow robe' + 'secondary clearly visible in large areas'"),
    (" the crown, hairpin and jewellery gold in the same 18K tone;", "repeat of '(medium depth, 18K gold tone)' in the same sentence"),
    (", a jade-and-gold belt with long tassels", "repeat of the luxury sentence 'long jade-and-gold belt pendants with pearl tassels'"),
    (", rubies and pearls", "repeat of 'More jewels on the crown (rubies, sapphires, pearls and jade)'"),
    (", a broad yellow collar and a wide inner panel", "', a broad yellow collar' = repeat of '(the … edge, her broad yellow collar)'", " and a wide inner panel"),
    (", the robe falling still and straight", "pose tail repeat of 'floor-length robe, slim, hanging close'"),
]
LIMIT = 10000
G45_OLD = "long jade-and-gold belt pendants with pearl tassels"
G45_NEW = "long jade-and-gold belt pendants with pearl tassels, never covered by sleeve, cape or shawl"


def put_tied(s):
    if OUTER_IN in s:
        return s.replace(OUTER_IN, OUTER_TIED, 1)
    a = "outer robe worn OPEN at the front"; assert s.count(a) == 1
    j = s.index(";", s.index(a)) + 1
    return s[:j] + " " + OUTER_TIED + ";" + s[j:]


def build(src, dst, edits):
    s = open(os.path.join(D, src), encoding="utf-8").read()
    s = put_tied(s)
    allow = []
    for a, b, why in edits:
        assert s.count(a) == 1, (src, a); s = s.replace(a, b); allow.append((a, why))
    for x in TRIMS:
        a, why, b = (x + ("",))[:3]
        if len(s) <= LIMIT: break
        if s.count(a) == 1:
            s = s.replace(a, b); allow.append((a.strip(" ,;"), "A38 trim: " + why))
    assert len(s) <= LIMIT, (dst, len(s))
    open(os.path.join(D, dst), "w", encoding="utf-8").write(s)
    with open(os.path.join(D, dst + ".keep"), "w", encoding="utf-8") as k:
        k.write(f"base: dev/art/thu_comoi/{src}\n")
        if OUTER_IN in open(os.path.join(D, src), encoding="utf-8").read():
            k.write(f"allow: {OUTER_IN}  # {WHY}: replaced by OUTER_TIED\n")
        for a, why in allow: k.write(f"allow: {a.strip(' ,;')}  # {WHY}; {why}\n")
    print(len(s), dst, [a[:40] for a, _ in allow])


if __name__ == "__main__":
    # v8e / v10d -> CHECK1 FAIL 01:50Z (G45 jade-never-covered words; t8 F18 store hairpin shape words) -> v8f / v10e
    build("s62_t7_THU_COMOI_v8d.txt", "s62_t7_THU_COMOI_v8f.txt", [
        # t7: the luxury sentence is store S14 (never rewritten) -> G45 words on the outfit belt instead
        ("a jade-and-gold belt with long tassels,", "a jade-and-gold belt with long tassels, its pendants never covered by sleeve, cape or shawl,",
         "CHECK1 01:50Z G45 standing checklist (jade never covered, as t4/t5); placed on the outfit belt (S14 store sentence untouched)"),
        (", with stately grace, the robe falling still and straight.", ", with stately grace.", "G23 gate: walking pose + 'still and straight' contradict"),
        ("mirrored: her weight and the item on her LEFT side;", "mirrored: her weight and the item on the LEFT side of the picture;", "E1 gate: 14-angle table words"),
        (S19_OLD, S19_NEW, "S19 gate: store feet tail (G23 owner 20/11)"),
    ])
    build("s62_t8_THU_COMOI_v10c.txt", "s62_t8_THU_COMOI_v10e.txt", [
    (G45_OLD, G45_NEW, "CHECK1 01:50Z G45 standing checklist (jade never covered, as t4/t5)"),
        ("a gold phoenix hairpin with pearl dangles, held in the hand raised and admired, the other hand beneath it",
         "a gold phoenix hairpin with pearl dangles, slim and palm-length, held between her fingers, never a sceptre, raised and admired, the other hand beneath it",
         "CHECK1 01:50Z F18 store hairpin shape words"),
        (S19_OLD, S19_NEW, "S19 gate: store feet tail (G23 owner 20/11)"),
    ])
