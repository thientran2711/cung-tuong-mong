#!/usr/bin/env python3
"""DESIGN21 (Foreman C #16, owner L1645: 'đừng có ép một cái prom nào nó quá là gò bó'; 0 cr). Never hand-edited.
REVERT thu s62 t6 Quý phi + t7 Hoàng quý phi to the last texts BEFORE Foreman C #15 / LADDER1-2 / DESIGN20
(no OUTER_IN / OUTER_TIED / OUTER_WRAP, no G47 garment-piece copies, no EAR_FREE block):
  t6 base = s62_t6_THU_COMOId (DESIGN17 2e1677d, L1576 final gen)   t7 base = s62_t7_THU_COMOI_v8c (COLORFIX1 cd40fcb, last t7 before LADDER1)
On top ONLY: bare ears (shared LADDER2 make_no_ears2 wording), one hair flower (t6 words already full), no held vase (bases have none),
G47 = embroidery copy only (t6 gets the Phi t5 embroidery placements, no garment piece), G44 t7 bow allowed (base bans none -> nothing).
t7 also: the 3 old gate faults of v8c fixed with the same words LADDER2 used in v8e (G23 walk+still, E1 angle table, S19 feet tail)."""
import os, sys
ART = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WHY = "owner L1645 via Foreman C #16 (revert to pre-#15 text + ears/flower/vase/G47-embroidery only), DESIGN21"
EMB = ("rich gold-thread embroidery covering much of the robe,",
       "rich gold-thread embroidery covering much of the robe (also on the chest, both front edges, wide outer and inner hem bands, cuffs and skirt-front medallions),",
       "G47 ladder copy = embroidery placements of Phi t5 only")
JOBS = [
    ("thu_comoi/s62_t6_THU_COMOId.txt", "thu_comoi/s62_t6_THU_COMOIk.txt", [
        ("several gold hairpins (trâm) with dangles,", "several gold hairpins (trâm) with dangles, nothing at the ears,", "dangling hair ornaments: nothing at the ears (LADDER2 wording)"),
        EMB], [
        (" Everyone beautiful at every age.", "", "A38 std trim (LADDER1 list): boilerplate"),
        ("image 2 is only a colour reference, never copy anything but its colour;", "image 2 is only a colour reference;", "A38 std trim: repeat"),
        ("her head never back-turned, never in profile.", "her head never back-turned.", "A38 std trim (LADDER1 list)"),
        ("blush only as a small accent; gold only as thin accents on the borders;", "blush only as a small accent;", "repeat of TWO-COLOUR 'gold or silver only as thin accents'")]),
    ("thu_comoi/s62_t7_THU_COMOI_v8c.txt", "thu_comoi/s62_t7_THU_COMOI_v8j.txt", [
        ("and a few gold tassels.", "and a few gold tassels, none at the ears.", "crown tassels: none at the ears (LADDER2 wording)"),
        ("mirrored: her weight and the item on her LEFT side", "mirrored: her weight and the item on the LEFT side of the picture", "E1 gate: 14-angle table words (as LADDER2 v8e)"),
        ("with stately grace, the robe falling still and straight.", "with stately grace.", "G23 gate: walking + 'still and straight' contradict (as LADDER2 v8e)"),
        ("eyes open, floor-length robe with slippers visible, no train", "eyes open, floor-length robe, only slipper toe tips peeking under the hem, no train", "S19 gate: store feet tail (as LADDER2 v8e)")], [
        ("Image 2 is only a colour reference for the royal yellow, never copy anything but its colour;", "Image 2 is only a colour reference for the royal yellow;", "A38 std trim: repeat")]),
]
LIMIT = 10000
bad = 0
for src, dst, edits, trims in JOBS:
    s = open(os.path.join(ART, src), encoding="utf-8").read(); allow = []
    for a, b, why in edits:
        assert s.count(a) == 1, (src, a); s = s.replace(a, b); allow.append((a, why))
    for a, b, why in trims:
        if len(s) <= LIMIT: break
        assert s.count(a) == 1, (src, a); s = s.replace(a, b); allow.append((a, "A38: " + why))
    if len(s) > LIMIT: print("OVER", dst, len(s)); bad = 1; continue
    open(os.path.join(ART, dst), "w", encoding="utf-8").write(s)
    with open(os.path.join(ART, dst + ".keep"), "w", encoding="utf-8") as k:
        k.write(f"base: dev/art/{src}\n")
        for a, why in allow:
            parts = [p.strip(" ,;.()") for p in a.replace("(", ",").replace(")", ",").split(",")] + [a.strip(" ,;.")]
            for part in dict.fromkeys(parts):
                if len(part) > 12: k.write(f"allow: {part}  # {WHY}; {why}\n")
    print(len(s), dst, [w[:40] for _, w in allow])
sys.exit(bad)
