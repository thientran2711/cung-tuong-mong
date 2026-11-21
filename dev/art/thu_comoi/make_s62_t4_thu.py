#!/usr/bin/env python3
"""DESIGN20 (owner L1623/L1624 via Foreman C #15: thu s62 Tần t4 next to t1–t3 v5, same palette; 0 cr). Run from anywhere.
thu s62 t4 Tần = thu_comoi/s62_t4_THU_COMOIc.txt (current production thu t4, CHECK1 PASS) with ONLY:
 1. G40 master_common.OUTER_IN after the open-outer-robe clause (same placement as LADDER1 make_thu_g40_L1596.py -> COMOId);
 2. G42 (owner L1605 'bậc dưới có gì thì bậc trên phải có'): the placements of thu t3 v5 (dapung4/s62_t3_COMOI_v5.txt), a bit denser:
    front-edge band shoulder->past waist, inner top embroidered across the chest, sleeve/cuff embroidery, many small flowers over robe+skirt,
    jade pendant set (ngọc bội) at the sash;
 3. G44 (sash flat at centre front, no bow) + G45 (jade pendant never covered by sleeve or shawl);
 4. caption; then dapung4/make_thu_L1574.fit() A38 boilerplate trims if > LIMIT (store sentence 'Everyone beautiful…' never trimmed).
Tần capelet clause untouched (owner liked it, B). Never hand-edited (L1567): rerun this script."""
import os, sys
ART = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ART); sys.path.insert(0, os.path.join(ART, "dapung4"))
from master_common import OUTER_IN, OUTER_TIED
import make_thu_L1574 as _L
_L.TRIM = [x for x in _L.TRIM if x[0] != " Everyone beautiful at every age."]   # store sentence (check_store) -> never trimmed here
fit = _L.fit
s = open(os.path.join(ART, "thu_comoi/s62_t4_THU_COMOIc.txt"), encoding="utf-8").read()
ANCHOR = "outer robe worn OPEN at the front"
assert s.count(ANCHOR) == 1 and OUTER_IN not in s
i = s.index(ANCHOR); j = s.index(";", i) + 1
s = s[:j] + " " + OUTER_IN + ";" + s[j:]
for a, b in [
    # G42 density: t3 v5 'many small … over the robe and skirt' carried up; the Tần LARGE flowers kept on top (a bit denser than t3)
    ("a few LARGE embroidered lotus flowers on the robe (fewer than Phi),",
     "a few LARGE embroidered lotus flowers on the robe (fewer than Phi) among many small lotus flowers over the robe and skirt,"),
    # G42 inner neckline band + chest embroidery (t3 v5: 'the inner top also embroidered across the chest')
    ("(the Tần edge),", "(the Tần edge), the inner top also richly embroidered across the chest,"),
    # G42 front edges shoulder -> past the waist (t3 v5 'an embroidered blush band down past the waist'; t5 COMOId wording, lotus)
    ("(a slim gold edge)", "(an embroidered blush lotus band down past the waist)"),
    # G42 sleeves (cuffs already: 'WIDE … borders … at sleeves and hem') + G44 no bow + G45/G42 jade pendant visible
    ("long trailing wide sleeves, an embroidered silk sash with jade belt pendants and tassels,",
     "long trailing wide sleeves with a few small lotus flowers on them, "
     "an embroidered silk sash tied flat at the CENTRE front, NO bow, with a carved jade pendant set (ngọc bội) and tassels "
     "in front, never covered by sleeve or shawl,"),
    ("Tần · Áo choàng nhỏ + cổ mở", "Tần · Áo choàng nhỏ + cổ mở · v5"),
]:
    assert s.count(a) == 1, a; s = s.replace(a, b)
if "--raw" in sys.argv: print(s); sys.exit()
s, used = fit(s)
assert len(s) <= 10000, len(s)
out = os.path.join(ART, "thu_comoi/s62_t4_THU_COMOIe.txt")
open(out, "w", encoding="utf-8").write(s); print(len(s), out, "trims:", used)

# ---- v6 = COMOIf (owner L1625/L1626/L1628 via Foreman C #15; G40 strong, G42/G47 ladder; Tần capelet + chest cord + jade KEPT verbatim) ----
V6 = [
    (OUTER_IN, OUTER_TIED),                                                    # G40 strong shared clause (master_common, agreed with LADDER2)
    ("WIDE gold-thread embroidered borders of lotus flowers at sleeves and hem,",   # L1626 (d): inner robe hem (chân áo áo trong) embroidered too
     "WIDE gold-thread embroidered borders of lotus flowers at sleeves and hem, a wide embroidered lotus band at the inner robe's hem too,"),
    ("edged by a richer gold-brocade band (the Tần edge), the inner top also richly embroidered across the chest,",   # L1628: band itself embroidered
     "edged by a wide blush band embroidered with lotus flowers running straight ACROSS the chest (the Tần edge), small lotus flowers embroidered below it,"),
    ("(an embroidered blush lotus band down past the waist)",                   # L1626 (c) 'mảng dài dọc xuống'
     "(each a long vertical blush panel of lotus embroidery from shoulder to hem)"),
]
TRIM6 = [   # A38: repeats only (each said elsewhere in this prompt); check_store PASS without them (DESIGN20 sentence scan)
    " Hair: her own hair colour, decorated with ONE fresh flower and several gold hairpins (trâm) with dangles, rich like her rank.",  # = HAIR FLOWER SIZE + hairpin sentences
    " (her secondary colour, clearly different from her main robe colour light plum)",   # = TWO-COLOUR RULE
]
if __name__ == "__main__":
    for a, b in V6:
        assert s.count(a) == 1, a; s = s.replace(a, b)
    for a in TRIM6:
        assert s.count(a) == 1, a; s = s.replace(a, "")
    CAP = "Mùa Thu · Thiết kế hiện tại · Tần · Áo choàng nhỏ + cổ mở · v5"; assert s.count(CAP) == 1
    s = s.replace(CAP, "Mùa Thu · Tần · v6")
    assert len(s) <= 9990, len(s)
    out = os.path.join(ART, "thu_comoi/s62_t4_THU_COMOIf.txt")
    open(out, "w", encoding="utf-8").write(s); print(len(s), out)

# ---- v7 = COMOIg (Foreman C #15 01:39Z: YES carry t3 v5's TWO apron panels + long jade sets up (G47); CHECK1: name the outer hem band,
#      capelet cord across the chest with the jade in the middle (G46, owner L1626 'nối nhau bằng một cái sợi dây. Ở giữa có cái ngọc')) ----
V7 = [
    ("linked low on the chest by a small jade clasp on a short silk cord",
     "linked across the chest by a silk cord with a jade clasp in the middle"),
    ("WIDE gold-thread embroidered borders of lotus flowers at sleeves and hem,",
     "WIDE gold-thread embroidered borders of lotus flowers at sleeves and outer hem,"),
    ("with a carved jade pendant set (ngọc bội) and tassels in front, never covered by sleeve or shawl",   # t3 v5 apron panels + jade sets, lotus
     "with TWO embroidered blush APRON PANELS (lotus, gold-braid edge) side by side to the ankles, a long jade pendant set (ngọc bội) "
     "of jade plaques on pearl strings with tassels at each outer side, never covered by sleeve or shawl"),
]
TRIM7 = [   # Foreman C #15 01:47Z: A + D + C (repeats / pose tail) — NOT the S12 shawl words
    " (never hiding the neck or the square inner neckline)",   # A: repeat of 'neck and collarbones visible' / layered neckline
    " neck and collarbones visible;",                          # D: repeat (layered neckline + capelet OPEN at the front)
    ", skirt swirling, the robe hem stirring slightly",        # C: pose tail
]
if __name__ == "__main__":
    for a, b in V7:
        assert s.count(a) == 1, a; s = s.replace(a, b)
    for a in TRIM7:
        assert s.count(a) == 1, a; s = s.replace(a, "")
    s = s.replace("Mùa Thu · Tần · v6", "Mùa Thu · Tần · v7")
    print(len(s)); assert len(s) <= 10000, len(s)
    out = os.path.join(ART, "thu_comoi/s62_t4_THU_COMOIg.txt")
    open(out, "w", encoding="utf-8").write(s); print(len(s), out)
