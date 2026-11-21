#!/usr/bin/env python3
"""LADDER2 (Foreman C #16 02:01Z: t6/t7 (+t5 v8) drafts drew jade drop EARRINGS -> fix at the shared source for ALL tiers; 0 cr).
Run from anywhere. Never hand-edited (L1567). Puts master_common.EAR_FREE right after master EAR_SENT ("Bare earlobes, no earrings.")
in every current consort prompt this worker owns (thu t1–t3, xuân t1–t3, thu t6–t8); t4/t5 = DESIGN20 (same constant).
A38: only our builder words / exact repeats compressed if > LIMIT (EXTRA, listed in the .keep)."""
import os, sys
ART = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ART)
from master_common import EAR_SENT, EAR_FREE
WHY = "Foreman C #16 02:01Z: jade drop earrings in the drafts -> shared master_common.EAR_FREE after EAR_SENT, all tiers (owner L1037 NOEAR, L1627), LADDER2"
JOBS = [  # src, dst, extra (old, new, why)
    ("dapung4/s62_t1_COMOI_v7.txt", "dapung4/s62_t1_COMOI_v8.txt", []),
    ("dapung4/s62_t2_COMOI_v7.txt", "dapung4/s62_t2_COMOI_v8.txt", []),
    ("dapung4/s62_t3_COMOI_v7.txt", "dapung4/s62_t3_COMOI_v8.txt",
     [("bands at the sleeve ends and on the outer and inner robe hems;", "bands at sleeve ends and on outer and inner robe hems;", "our G47 inner-hem words compressed")]),
    ("seasons4/s62_t1_HAN_BAC_v8.txt", "seasons4/s62_t1_HAN_BAC_v9.txt", []),
    ("seasons4/s62_t2_HAN_BAC_v8.txt", "seasons4/s62_t2_HAN_BAC_v9.txt", []),
    ("seasons4/s62_t3_HAN_BAC_v8.txt", "seasons4/s62_t3_HAN_BAC_v9.txt",
     [("the embroidered inner robe hem showing below;", "the embroidered inner hem showing below;", "our G47 inner-hem words compressed")]),
    ("thu_comoi/s62_t6_THU_COMOIh.txt", "thu_comoi/s62_t6_THU_COMOIi.txt",
     [("(each a long vertical blush chrysanthemum panel, shoulder to hem)", "(each a long blush chrysanthemum panel, shoulder to hem)", "our G47 panel words compressed"),
      ("NO bow, with TWO embroidered", "NO bow, TWO embroidered", "our G47 apron words compressed"),
      ("a yellow inner robe panel, a yellow sash and narrow yellow borders", "a yellow inner robe panel and narrow yellow borders", "', a yellow sash' = repeat of 'the yellow sash tied flat at the CENTRE front'")]),
    ("thu_comoi/s62_t7_THU_COMOI_v8g.txt", "thu_comoi/s62_t7_THU_COMOI_v8h.txt",
     [(", never a single flat colour all over", "", "repeat of 'NOT an all-yellow robe' + 'secondary clearly visible in large areas' (same trim as t8)")]),
    ("thu_comoi/s62_t8_THU_COMOI_v10f.txt", "thu_comoi/s62_t8_THU_COMOI_v10g.txt",
     [("gold or silver only as thin accents, no other colour", "gold or silver only as thin accents", "'no other colour' = repeat of 'EXACTLY THREE colours'")]),
]
LIMIT = 10000
bad = 0
for src, dst, extra in JOBS:
    s = open(os.path.join(ART, src), encoding="utf-8").read()
    assert s.count(EAR_SENT) == 1 and EAR_FREE not in s, src
    s = s.replace(EAR_SENT, EAR_SENT + " " + EAR_FREE); allow = []
    for a, b, why in extra:
        if len(s) <= LIMIT: break
        assert s.count(a) == 1, (src, a); s = s.replace(a, b); allow.append((a, "A38: " + why))
    if "--raw" in sys.argv: print(len(s), dst); continue
    if len(s) > LIMIT: print("OVER", dst, len(s)); bad = 1; continue
    open(os.path.join(ART, dst), "w", encoding="utf-8").write(s)
    with open(os.path.join(ART, dst + ".keep"), "w", encoding="utf-8") as k:
        k.write(f"base: dev/art/{src}\n")
        for a, why in allow:
            parts = [p.strip(" ,;.") for p in a.split(";")]
            if "NO bow, with TWO" in a:   # keep_check reads the whole clause from 'with' to the next comma
                parts.append("with TWO embroidered blush chrysanthemum APRON PANELS side by side to the ankles and a long jade pendant set")
            for part in parts:
                if len(part) > 12: k.write(f"allow: {part}  # {WHY}; {why}\n")
    print(len(s), dst, [w for _, w in allow])
sys.exit(bad)
