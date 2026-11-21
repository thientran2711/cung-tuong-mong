#!/usr/bin/env python3
"""LADDER2 (owner L1627 'phải áp dụng cho cả 8 bậc' + G42/G47 via Foreman C #15; 0 cr). Run from anywhere. Never hand-edited (L1567).
Prompt files only (approved pictures stay; no regen without owner yes). Makes t1–t3 current with the DESIGN20 checklist (reports/DESIGN20.md JOB 2):
 1. G40 strong: master_common.OUTER_IN -> master_common.OUTER_TIED (same spot; ONE shared clause t1–t8);
 2. G47 inner hem: the hem embroidery band named on the outer AND the inner robe;
 3. thu t1: chest embroidery on the inner top (t2/t3 have it).
 thu   dapung4/s62_t{1,2,3}_COMOI_v5   -> _v6
 xuân  seasons4/s62_t{1,2,3}_HAN_BAC_v6 -> _v7
Length (Foreman C #15): compress OUR builder words / exact repeats only (TRIM, in order, only while > LIMIT; listed in the .keep);
no owner or approved sentence is cut."""
import os, re, sys
ART = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ART)
from master_common import OUTER_IN, OUTER_TIED
WHY = "owner L1627 G40 all 8 tiers (shared master_common.OUTER_TIED) + G47 inner hem / G42 chest (DESIGN20 checklist), LADDER2"
EDITS = {
    "dapung4/s62_t1_COMOI_v5.txt": [
        ("a narrow band of small embroidered lilac sprays outside;",
         "a narrow band of small embroidered lilac sprays outside, the inner top also embroidered with small lilac sprays across the chest;"),
        ("a wide embroidered lilac sprays hem band,", "a wide embroidered lilac sprays hem band on the outer and the inner robe,")],
    "dapung4/s62_t2_COMOI_v5.txt": [
        ("cuff bands at the sleeve ends and the hem;", "cuff bands at the sleeve ends and on the outer and inner robe hems;")],
    "dapung4/s62_t3_COMOI_v5.txt": [
        ("bands at the sleeve ends and the hem;", "bands at the sleeve ends and on the outer and inner robe hems;")],
    "seasons4/s62_t1_HAN_BAC_v6.txt": [
        ("the inner robe hem showing below;", "the embroidered inner robe hem showing below;")],
    "seasons4/s62_t2_HAN_BAC_v6.txt": [
        ("the inner robe hem showing below;", "the embroidered inner robe hem showing below;")],
    "seasons4/s62_t3_HAN_BAC_v6.txt": [
        ("the inner robe hem showing below;", "the embroidered inner robe hem showing below;"),
        # builder words (G42 carry-up phrase of make_han_xuan_t13), compressed: same items, fewer words
        ("wide embroidered semi-double China roses bands at the sleeve ends and the hem,", "wide China rose bands at sleeve ends and hem,")],
}
TRIM = [
    (", never copy anything but its colour", "repeat of 'Image 2 is only a colour reference' (A38 std trim list)"),
    ("; face clearly visible, 3/4 or frontal view.", "repeat of the face / ANGLE words (A38 std trim list)"),
    (", never a pair", "A38 std trim list"), (", no cluster", "A38 std trim list"), (", never back-turned", "A38 std trim list"),
    (", never in profile", "A38 std trim list"),
    ("RX:; her signature colour family [^.]*? robe(?=\\.)", "the 'her signature colour family … robe' colour-repeat clause (A38 std trim list)"),
    ("; her head turns together with her shoulders and body.", "exact repeat of the HEAD AND BODY sentence (after the ANGLE table words)", ";"),
    (" (one single visible sleeve layer, every inner sleeve hidden inside)", "builder words: repeat of the ONE SINGLE SLEEVE LAYER rule sentence -> ' (one single visible sleeve layer)'", " (one single visible sleeve layer)"),
    (" never a simple wrap robe, NO crossed wrap collar,", "builder words: 'NO crossed wrap collar' repeated later in the same outfit"),
    (" (two long narrow ceremonial front panels, semi-double China roses embroidery, gold-braid edge)",
     "builder words (L1595 shift) compressed -> ' (semi-double China roses, gold-braid edge)'", " (semi-double China roses, gold-braid edge)"),
]
LIMIT = 10000
JOBS = [("dapung4/s62_t%d_COMOI_v5.txt", "dapung4/s62_t%d_COMOI_v6.txt"), ("seasons4/s62_t%d_HAN_BAC_v6.txt", "seasons4/s62_t%d_HAN_BAC_v7.txt")]
for src_p, dst_p in JOBS:
    for t in (1, 2, 3):
        src, dst = src_p % t, dst_p % t
        s = open(os.path.join(ART, src), encoding="utf-8").read()
        assert s.count(OUTER_IN) == 1, src
        s = s.replace(OUTER_IN, OUTER_TIED); allow = [(OUTER_IN, "replaced by OUTER_TIED")]
        for a, b in EDITS[src]:
            assert s.count(a) == 1, (src, a); s = s.replace(a, b); allow.append((a, "edit"))
        for x in TRIM:
            a, why, b = (x + ("",))[:3]
            if len(s) <= LIMIT: break
            if a.startswith("RX:"):
                m = re.search(a[3:], s)
                if m: s = s.replace(m.group(0), ""); allow.append((m.group(0), why))
            elif s.count(a) == 1:
                s = s.replace(a, b if b else ("." if a.endswith(".") and not a.startswith(";") else ""))
                allow.append((a, why))
        if len(s) > LIMIT:
            print("NOT BUILT", dst, len(s), "(only owner / gate words left: needs foreman call)"); continue
        open(os.path.join(ART, dst), "w", encoding="utf-8").write(s)
        with open(os.path.join(ART, dst + ".keep"), "w", encoding="utf-8") as k:
            k.write(f"base: dev/art/{src}\n")
            for a, why in allow:
                for part in [p.strip(" ,;.") for p in re.split(r"[;()]", a)]:
                    if len(part) > 12: k.write(f"allow: {part}  # {WHY}; {why}\n")
        print(len(s), dst, [why[:25] for _, why in allow[1 + len(EDITS[src]):]])
