#!/usr/bin/env python3
"""LADDER1 JOB L1590 (owner DUYỆT L1590 via Foreman C #14, A39: ONLY these two changes, built from the L1574 files, never hand-written):
  1. OUT1 outer robe OUTSIDE the sash on all 8 tiers: master_common.OUTER_OUT clause added to t1/t2/t3 (t1 + t3 were tucked: ribbon band / girdle over the robe).
  2. t1–t3 embroidery density = the approved common TIER_LOW wording: the L1574 make_han_bac.DENSE sentence is removed again
     (owner L1590: 'hai cái luật chung … đưa cái prompt chung vô'); the TIER_LOW embroidery words already in the files stay.
  t1 _v2d -> _v2e ; t2 _v2d -> _v2e ; t3 _v2e -> _v2f.  t2 BODY design untouched (DESIGN18 redesigns it next).
Run from the repo root."""
import os, sys
D = os.path.dirname(os.path.abspath(__file__)); ART = os.path.dirname(D); sys.path.insert(0, ART)
from master_common import OUTER_OUT
DENSE = "the robe body densely embroidered ALL OVER (not only the borders) with many {sz} spring flowers spread over the whole garment, clearly more embroidery than any palace maid"
def dense(sz, motif): return DENSE.format(sz=sz) + f" ({motif} in gold and blush); "
LIMIT = 10000
def sw(s, a, b):
    assert s.count(a) == 1, ("fix", a[:80]); return s.replace(a, b, 1)
JOBS = {
 "dapung4/s62_t1_COMOI_v2e.txt": ("dapung4/s62_t1_COMOI_v2d.txt", dense("small-size", "lilac sprays")),
 "dapung4/s62_t2_COMOI_v2e.txt": ("dapung4/s62_t2_COMOI_v2d.txt", dense("small-size (a little larger than at the lowest rank)", "tiger lilies")),
 "dapung4/s62_t3_COMOI_v2f.txt": ("dapung4/s62_t3_COMOI_v2e.txt", dense("small-to-medium-size", "semi-double China roses")),
}
if __name__ == "__main__":
    for out, (src, d) in JOBS.items():
        s = open(os.path.join(ART, src), encoding="utf-8").read()
        s = sw(s, d, OUTER_OUT + "; ")          # DENSE out, OUT1 clause in at the same place (inside the Outfit sentence)
        assert len(s.strip()) <= LIMIT, ("too long", len(s))
        open(os.path.join(ART, out), "w", encoding="utf-8").write(s); print(len(s), out)
