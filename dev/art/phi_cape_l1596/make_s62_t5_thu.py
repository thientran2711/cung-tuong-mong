#!/usr/bin/env python3
"""KHO2 (owner L1580/L1589/L1596 + correction L1598, via Foreman C #14; 0 cr). Run from anywhere.
thu s62 t5 Phi = thu_comoi/s62_t5_THU_COMOIc.txt (current production thu t5, COLORFIX1) with ONLY:
 1. the Phi cape clause -> t8-prompt-B/build.py CAPE5_V3 (shape of picture E = Ba Tư Quý phi t6 V3 JNCRrjtOq4 / owner-copy/pr_bt_t6_V3.txt;
    pearl edge + drop fringe + pearl net kept verbatim from CAPE5_V2, owner L1598), slots: colour 'light plum', F2 flower 'double hollyhocks',
    + the thu COMOI open-front words copied verbatim (Tần thu capelet / old thu t5 cape end);
 2. G40 master_common.OUTER_IN after the open-outer-robe clause (same placement as LADDER1 make_thu_g40_L1596.py);
 3. caption; then dapung4/make_thu_L1574.fit() A38 boilerplate trims if > LIMIT.
Never hand-edited (L1567): rerun this script after any CAPE5_V3 change."""
import os, re, sys
ART = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ART); sys.path.insert(0, os.path.join(ART, "dapung4"))
from master_common import OUTER_IN
import make_thu_L1574 as _L
_L.TRIM = [x for x in _L.TRIM if x[0] != " Everyone beautiful at every age."]   # store sentence (check_store) -> never trimmed here
fit = _L.fit
src = open(os.path.join(ART, "t8-prompt-B/build.py"), encoding="utf-8").read()
m = re.search(r'^CAPE5_V3=\((.*?)\)\n', src, re.S | re.M); assert m
cape = eval("(" + m.group(1) + ")").format(main="light plum").replace("small peonies", "small double hollyhocks")
for a, b in [("over only the shoulders and upper chest,", "over only the shoulders and the outer upper chest, OPEN at the front (never hiding the neck or the square inner neckline),"),
             ("never covering the neckline", "never covering the neckline, never hiding the neck or the square inner neckline")]:
    assert cape.count(a) == 1; cape = cape.replace(a, b)
s = open(os.path.join(ART, "thu_comoi/s62_t5_THU_COMOIc.txt"), encoding="utf-8").read()
assert s.count("TWO layered") == 1
a = s.index("TWO layered embroidered light plum SHORT shoulder capes")
END = "never covering the neckline, never hiding the neck or the square inner neckline"
b = s.index(END, a) + len(END)
s = s[:a] + cape + s[b:]
ANCHOR = "outer robe worn OPEN at the front"
assert s.count(ANCHOR) == 1 and OUTER_IN not in s
i = s.index(ANCHOR); j = s.index(";", i) + 1
s = s[:j] + " " + OUTER_IN + ";" + s[j:]
OLD_CAP = "Phi · 2 choàng vai + lưới ngọc trai + cổ mở"; assert s.count(OLD_CAP) == 1
s = s.replace(OLD_CAP, "Phi · 2 lớp choàng (Quý phi cũ) + lưới ngọc trai + cổ mở")
s, used = fit(s)
assert len(s) <= 10000, len(s)
out = os.path.join(ART, "thu_comoi/s62_t5_THU_COMOId.txt")
open(out, "w", encoding="utf-8").write(s); print(len(s), out, "trims:", used)
