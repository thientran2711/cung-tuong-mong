#!/usr/bin/env python3
"""DESIGN20 JOB 2 (owner L1625/L1626/L1628 via Foreman C #15; 0 cr). Run from anywhere. Never hand-edited (L1567).
thu s62 t5 Phi v6 = thu_comoi/s62_t5_THU_COMOId.txt (KHO2) with ONLY:
 1. cape: CAPE5_V3 sentence -> the thu Tần capelet words copied VERBATIM from the t4 thu prompt (s62_t4_THU_COMOIf, = make_thu_comoi COMOI
    open-front form of build.py's Tần capelet: chest cord + jade clasp, pearl net, fringe) + build.py CAPE5_V4_EXTRA (owner L1626: one extra small
    layer on top of each shoulder, pearls + tassel fringe; L1623 clearly visible);
 2. G40 strong: master_common.OUTER_TIED instead of OUTER_IN (shared with LADDER2, all tiers);
 3. G42/G47 ladder (everything Tần t4 v6 has, denser): long vertical front-edge panels shoulder->hem, embroidered neckline band across the chest
    + chest embroidery, wide hem bands on outer AND inner robe, many small flowers over robe+skirt, jade pendant sets in front never covered (G45);
 4. caption; A38 repeat trims (listed in TRIM6, gate-checked)."""
import os, re, sys
ART = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ART)
from master_common import OUTER_IN, OUTER_TIED
src = open(os.path.join(ART, "t8-prompt-B/build.py"), encoding="utf-8").read()
EXTRA = eval(re.search(r'^CAPE5_V4_EXTRA=(".*?")\n', src, re.M).group(1))
V7 = "--v7" in sys.argv   # v7 = COMOIf: t4 COMOIg capelet (cord across the chest, jade in the middle) + t3 apron panels/jade sets (Foreman C #15 01:39Z, G47)
t4 = open(os.path.join(ART, "thu_comoi/s62_t4_THU_COMOI" + ("g" if V7 else "f") + ".txt"), encoding="utf-8").read()
a = t4.index("a short round embroidered silk capelet"); END = "no cloud collar, vest or stiff shoulder pieces"
TAN_CAPE = t4[a:t4.index(END, a) + len(END)]
cape = TAN_CAPE + EXTRA   # verbatim (L1626 "từng câu từng chữ")
s = open(os.path.join(ART, "thu_comoi/s62_t5_THU_COMOId.txt"), encoding="utf-8").read()
a = s.index("TWO layered embroidered light plum pearl-edged shoulder capes"); END = "never covering the neckline"
s = s[:a] + cape + s[s.index(END, a) + len(END):]
for x, y in [
    (OUTER_IN, OUTER_TIED),
    ("that square neckline edged by a wide gold-embroidered band (the Phi edge), the inner top also richly embroidered across the chest;",
     "that square neckline edged by a wide blush band richly embroidered with double hollyhocks running straight ACROSS the chest (the Phi edge), many small double hollyhocks embroidered below it;"),
    ("(a gold-edged blush band embroidered with small double hollyhocks, down past the waist)",
     "(each a long vertical gold-edged blush panel of double hollyhock embroidery from shoulder to hem)"),
    ("the robe richly embroidered in gold with double hollyhocks and small birds,",
     "the robe richly embroidered in gold with double hollyhocks and small birds, many small double hollyhocks over the robe and skirt, "
     "WIDE embroidered double hollyhock hem bands on the outer and the inner robe,"),
    ("a broad gold brocade girdle with two long jade pendants hanging on silk cords,",
     "a broad gold brocade girdle tied flat at the CENTRE front, NO bow, with two long carved jade pendant sets (ngọc bội) and tassels in front, never covered by sleeve or shawl,"),
]:
    assert s.count(x) == 1, x; s = s.replace(x, y)
TRIM7 = [   # Foreman C #15 01:47Z A + D + C: A comes already dropped with the t4 COMOIg capelet copy; D not in t5; C = t5 pose tail
    ", the robe hem stirring slightly",
]
TRIM6 = [   # A38: repeats only, gate-checked (DESIGN20 sentence scan)
    " Hair: her own hair colour, decorated with ONE fresh flower and several gold hairpins (trâm) with dangles, rich like her rank.",
    " (her secondary colour, clearly different from her main robe colour light plum)",
]
if V7:
    x = "with two long carved jade pendant sets (ngọc bội) and tassels in front, never covered by sleeve or shawl, the front of the skirt embroidered with large double hollyhock medallions,"
    assert s.count(x) == 1
    s = s.replace(x, "with TWO embroidered blush APRON PANELS (double hollyhocks, gold-braid edge) side by side to the ankles, a long jade pendant set (ngọc bội) "
                     "of jade plaques on pearl strings with tassels at each outer side, never covered by sleeve or shawl, the skirt embroidered with large double hollyhock medallions,")
    for x, y in [   # compacting OUR OWN v6 words (Foreman C #15 01:47Z), same meaning
        ("of double hollyhock embroidery from shoulder to hem)", "of double hollyhocks, shoulder to hem)"),
        ("many small double hollyhocks embroidered below it", "small double hollyhocks below it"),
        ("hem bands on the outer and the inner robe", "hem bands on outer and inner robe")]:
        assert s.count(x) == 1, x; s = s.replace(x, y)
    TRIM6 += TRIM7
for x in TRIM6:
    assert s.count(x) == 1, x; s = s.replace(x, "")
CAP = "Mùa Thu · Thiết kế hiện tại · Phi · 2 lớp choàng (Quý phi cũ) + lưới ngọc trai + cổ mở"; assert s.count(CAP) == 1
s = s.replace(CAP, "Mùa Thu · Phi · v7" if V7 else "Mùa Thu · Phi · v6")
if "--raw" in sys.argv: print(s); sys.exit()
if "--len" in sys.argv: print(len(s)); sys.exit()
assert len(s) <= 9990, len(s)
out = os.path.join(ART, "thu_comoi/s62_t5_THU_COMOI" + ("f" if V7 else "e") + ".txt")
open(out, "w", encoding="utf-8").write(s); print(len(s), out)
