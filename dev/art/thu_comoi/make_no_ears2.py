#!/usr/bin/env python3
"""LADDER2 (Foreman C #16 02:01Z + DESIGN20 1e330b0 wording; owner L1627 'fix all files at once'; 0 cr). Run from anywhere. Never hand-edited.
v8 drafts drew TWO hair flowers + jade drop earrings. Cause (DESIGN20): the thu A38 trim list (dapung4/make_thu_L1574.TRIM) cut
', never a pair' / ', no cluster' from HAIR FLOWER SIZE. Fix, from the OUTER_WRAP versions (EAR_FREE versions make_ears_free.py superseded):
 1. HAIR FLOWER SIZE '(never two)' -> '(never two, never a pair, no cluster)' (store _F13 words back);
 2. ', none at the ears' / ', nothing at the ears' on every dangling hair-ornament phrase (pearl ornaments, hairpin dangles, crown tassels).
 Master 'Bare earlobes, no earrings.' stays. A38: our builder words / exact repeats only (listed in the .keep)."""
import os, sys
ART = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WHY = "Foreman C #16 02:01Z + DESIGN20 1e330b0: one hair flower (store _F13 'never a pair, no cluster' back) + nothing at the ears on dangling hair ornaments (owner L1627 all files), LADDER2"
F = ("(never two),", "(never two, never a pair, no cluster),", "store _F13 hair-flower words back")
P = ("each with a small dangling pearl ornament,", "each with a small dangling pearl ornament, none at the ears,", "dangling hair ornament: none at the ears")
JOBS = [  # src, dst, edits (old, new, why) — edits first, then A38 trims (old, new, why) only while > LIMIT
    # thu t1 v7 unchanged (flower words already full, no dangling hair ornament) -> current t1 = dapung4/s62_t1_COMOI_v7
    ("dapung4/s62_t2_COMOI_v7.txt", "dapung4/s62_t2_COMOI_v9.txt", [F], []),
    ("dapung4/s62_t3_COMOI_v7.txt", "dapung4/s62_t3_COMOI_v9.txt", [F, P], [
        ("bands at the sleeve ends and on the outer and inner robe hems;", "bands at sleeve ends and on outer and inner robe hems;", "our G47 inner-hem words compressed"),
        ("hangs a long ceremonial jade pendant set", "hangs a long jade pendant set", "builder word (L1595 shift) 'ceremonial'"),
        ("many small semi-double China roses over the robe and skirt;", "many small China roses over robe and skirt;", "our G42 words compressed")]),
    ("seasons4/s62_t1_HAN_BAC_v8.txt", "seasons4/s62_t1_HAN_BAC_v10.txt", [F], []),
    ("seasons4/s62_t2_HAN_BAC_v8.txt", "seasons4/s62_t2_HAN_BAC_v10.txt", [F], []),
    ("seasons4/s62_t3_HAN_BAC_v8.txt", "seasons4/s62_t3_HAN_BAC_v10.txt", [F, P], [
        ("the embroidered inner robe hem showing below;", "the embroidered inner hem below;", "our G47 inner-hem words compressed"),
        ("a long ceremonial jade pendant set", "a long jade pendant set", "builder word 'ceremonial'")]),
    ("thu_comoi/s62_t6_THU_COMOIh.txt", "thu_comoi/s62_t6_THU_COMOIj.txt", [F,
        ("several gold hairpins (trâm) with dangles,", "several gold hairpins (trâm) with dangles, nothing at the ears,", "dangling hair ornaments + headdress tassels: nothing at the ears")], [
        ("(each a long vertical blush chrysanthemum panel, shoulder to hem)", "(each a long blush chrysanthemum panel, shoulder to hem)", "our G47 panel words compressed"),
        ("NO bow, with TWO embroidered", "NO bow, TWO embroidered", "our G47 apron words compressed"),
        ("a yellow inner robe panel, a yellow sash and narrow yellow borders", "a yellow inner robe panel and narrow yellow borders", "', a yellow sash' = repeat of 'the yellow sash tied flat at the CENTRE front'"),
        ("by a silk cord with a jade clasp in the middle", "by a silk cord with a central jade clasp", "our G47 cord words compressed"),
        ("APRON PANELS side by side to the ankles", "APRON PANELS to the ankles", "our G47 apron words compressed ('TWO' kept)")]),
    ("thu_comoi/s62_t7_THU_COMOI_v8g.txt", "thu_comoi/s62_t7_THU_COMOI_v8i.txt", [
        ("and a few gold tassels.", "and a few gold tassels, none at the ears.", "crown tassels: none at the ears")], [
        (", never a single flat colour all over", "", "repeat of 'NOT an all-yellow robe' + 'secondary clearly visible in large areas' (as t8)")]),
    ("thu_comoi/s62_t8_THU_COMOI_v10f.txt", "thu_comoi/s62_t8_THU_COMOI_v10h.txt", [
        ("a few clean pearl tassels at the sides;", "a few clean pearl tassels at the sides, none at the ears;", "crown side tassels: none at the ears")], [
        ("gold or silver only as thin accents, no other colour", "gold or silver only as thin accents", "'no other colour' = repeat of 'EXACTLY THREE colours'")]),
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
            if "NO bow, with TWO" in a:
                parts.append("with TWO embroidered blush chrysanthemum APRON PANELS side by side to the ankles and a long jade pendant set")
            if "APRON PANELS side by side" in a:
                parts.append("TWO embroidered blush chrysanthemum APRON PANELS side by side to the ankles and a long jade pendant set")
            for part in dict.fromkeys(parts):
                if len(part) > 12: k.write(f"allow: {part}  # {WHY}; {why}\n")
    print(len(s), dst, [w[:30] for _, w in allow])
sys.exit(bad)
