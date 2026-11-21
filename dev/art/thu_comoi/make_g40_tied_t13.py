#!/usr/bin/env python3
"""LADDER2 (owner L1627 'phải áp dụng cho cả 8 bậc' via Foreman C #15; 0 cr). Run from anywhere. Never hand-edited (L1567).
G40 strong clause for t1–t3 too: master_common.OUTER_IN -> master_common.OUTER_TIED (same spot, nothing else), so every tier t1–t8 carries
the ONE shared clause (agreed with DESIGN20, used in t4 COMOIf / t5 COMOIe / t6–t8).
 thu   dapung4/s62_t{1,2,3}_COMOI_v5   -> _v6
 xuân  seasons4/s62_t{1,2,3}_HAN_BAC_v6 -> _v7
A38 trims (only when > LIMIT): REPEATED boilerplate only, in TRIM order, listed in the .keep."""
import os, re, sys
ART = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ART)
from master_common import OUTER_IN, OUTER_TIED
WHY = "owner L1627 G40 all 8 tiers: OUTER_IN -> shared master_common.OUTER_TIED (LADDER2)"
TRIM = [
    (", never copy anything but its colour", "repeat of 'Image 2 is only a colour reference' (A38 std trim list)"),
    ("; the royal yellow in the robe is exactly that colour", "repeat of the yellow hex sentence"),
    ("; face clearly visible, 3/4 or frontal view.", "repeat of the face / ANGLE words (A38 std trim list)"),
    (", never a pair", "A38 std trim list"), (", no cluster", "A38 std trim list"), (", never back-turned", "A38 std trim list"),
    (", never in profile", "A38 std trim list"),
    ("RX:; her signature colour family [^.]*? robe(?=\\.)", "the 'her signature colour family … robe' colour-repeat clause (A38 std trim list)"),
]
LIMIT = 10000
JOBS = [("dapung4/s62_t%d_COMOI_v5.txt", "dapung4/s62_t%d_COMOI_v6.txt"), ("seasons4/s62_t%d_HAN_BAC_v6.txt", "seasons4/s62_t%d_HAN_BAC_v7.txt")]
for src_p, dst_p in JOBS:
    for t in (1, 2, 3):
        src, dst = src_p % t, dst_p % t
        s = open(os.path.join(ART, src), encoding="utf-8").read()
        assert s.count(OUTER_IN) == 1, src
        s = s.replace(OUTER_IN, OUTER_TIED); allow = []
        for a, why in TRIM:
            if len(s) <= LIMIT: break
            if a.startswith("RX:"):
                m = re.search(a[3:], s)
                if m: s = s.replace(m.group(0), ""); allow.append((m.group(0).strip(" ,;."), why))
            elif s.count(a) == 1: s = s.replace(a, "" if not a.endswith(".") else "."); allow.append((a.strip(" ,;."), why))
        if len(s) > LIMIT:
            print("NOT BUILT", dst, len(s), "(only owner / gate words left: needs foreman call)"); continue
        open(os.path.join(ART, dst), "w", encoding="utf-8").write(s)
        with open(os.path.join(ART, dst + ".keep"), "w", encoding="utf-8") as k:
            k.write(f"base: dev/art/{src}\nallow: {OUTER_IN}  # {WHY}\n")
            for a, why in allow: k.write(f"allow: {a}  # {WHY}; A38 trim: {why}\n")
        print(len(s), dst, [a for a, _ in allow])
