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
from master_common import OUTER_IN
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
