#!/usr/bin/env python3
"""LADDER2 (Foreman C #15 GO 01:56Z; owner L1627 G40 all 8 tiers; 0 cr). Run from anywhere. Never hand-edited (L1567).
G40 v8 wording (DESIGN20 9db802f, after the v6 drafts still drew an open coat with OUTER_TIED):
 master_common.OUTER_TIED -> master_common.OUTER_WRAP (same spot) and 'outer robe worn OPEN at the front,' -> 'outer robe open above the waist,'
 (removes the open-coat cue). Nothing else changes. A38: repeats only if > LIMIT (EXTRA per file), listed in the .keep."""
import os, sys
ART = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ART)
from master_common import OUTER_TIED, OUTER_WRAP
WHY = "owner L1627 G40 all 8 tiers: OUTER_TIED -> master_common.OUTER_WRAP + 'open above the waist' (DESIGN20 v8 wording, Foreman GO 01:56Z), LADDER2"
OPEN_OLD, OPEN_NEW = "outer robe worn OPEN at the front,", "outer robe open above the waist,"
JOBS = [  # src, dst, extra A38 repeat trims (old, new, why)
    ("dapung4/s62_t1_COMOI_v6.txt", "dapung4/s62_t1_COMOI_v7.txt", []),
    ("dapung4/s62_t2_COMOI_v6.txt", "dapung4/s62_t2_COMOI_v7.txt", []),
    ("dapung4/s62_t3_COMOI_v6.txt", "dapung4/s62_t3_COMOI_v7.txt", []),
    ("seasons4/s62_t1_HAN_BAC_v7.txt", "seasons4/s62_t1_HAN_BAC_v8.txt", []),
    ("seasons4/s62_t2_HAN_BAC_v7.txt", "seasons4/s62_t2_HAN_BAC_v8.txt", []),
    ("seasons4/s62_t3_HAN_BAC_v7.txt", "seasons4/s62_t3_HAN_BAC_v8.txt",
     [(" (one single visible sleeve layer)", "", "exact repeat of the ONE SINGLE SLEEVE LAYER rule sentence (our builder words)")]),
    ("thu_comoi/s62_t6_THU_COMOIg.txt", "thu_comoi/s62_t6_THU_COMOIh.txt",
     [(", small chrysanthemums on the sleeves,", ", small sleeve chrysanthemums,", "our builder words (G47 sleeve flowers) compressed"),
      ("a pearl-and-jade net over it", "a pearl-jade net over it", "our builder words (G47 Phi net) compressed")]),
    ("thu_comoi/s62_t7_THU_COMOI_v8f.txt", "thu_comoi/s62_t7_THU_COMOI_v8g.txt",
     [("floor-length robe with slippers visible;", "floor-length robe;", "outfit 'with slippers visible' = repeat of the S19 feet tail (G23 feet words)")]),
    ("thu_comoi/s62_t8_THU_COMOI_v10e.txt", "thu_comoi/s62_t8_THU_COMOI_v10f.txt", []),
]
LIMIT = 10000
for src, dst, extra in JOBS:
    s = open(os.path.join(ART, src), encoding="utf-8").read()
    assert s.count(OUTER_TIED) == 1, src
    s = s.replace(OUTER_TIED, OUTER_WRAP); allow = [(OUTER_TIED, "replaced by OUTER_WRAP")]
    if s.count(OPEN_OLD) == 1:
        s = s.replace(OPEN_OLD, OPEN_NEW); allow.append((OPEN_OLD, "open-coat cue removed"))
    for a, b, why in extra:
        if len(s) <= LIMIT: break
        assert s.count(a) == 1, (src, a); s = s.replace(a, b); allow.append((a, "A38: " + why))
    assert len(s) <= LIMIT, (dst, len(s))
    open(os.path.join(ART, dst), "w", encoding="utf-8").write(s)
    with open(os.path.join(ART, dst + ".keep"), "w", encoding="utf-8") as k:
        k.write(f"base: dev/art/{src}\n")
        for a, why in allow:
            for part in [p.strip(" ,;.") for p in a.replace(":", ";").split(";")]:
                if len(part) > 12: k.write(f"allow: {part}  # {WHY}; {why}\n")
    print(len(s), dst, [w for _, w in allow])
