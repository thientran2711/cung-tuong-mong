#!/usr/bin/env python3
"""LADDER1 (owner L1592 rule G40 'tất cả các bậc đều là ôm vô', Foreman C #14 order 21/11 ~00:59Z; A39 ONLY this change):
add the shared G40 clause master_common.OUTER_IN (outer robe HELD IN by the sash tied over it) right after the open-outer-robe clause of
thu t4 / t6 / t7 (t8 blocked by length, see JOBS).  t5 NOT here (KHO2 rebuilds the Phi cape and adds OUTER_IN itself).
  t4 COMOIc -> COMOId ; t6 COMOId -> COMOIe ; t7 v8c -> v8d ; t8 v10c -> v10d
Length: the clause adds ~100 chars; A38 same-prompt-repeat trims only (the make_thu_L1574.TRIM list, same order), just enough for <= LIMIT.
Run from the repo root."""
import os, sys
D = os.path.dirname(os.path.abspath(__file__)); ART = os.path.dirname(D)
sys.path.insert(0, ART); sys.path.insert(0, os.path.join(ART, "dapung4"))
from master_common import OUTER_IN
from make_thu_L1574 import fit            # A38 trim list of DESIGN17 (LIMIT 9990)
ANCHOR = "outer robe worn OPEN at the front"
JOBS = {"s62_t4_THU_COMOId.txt": "s62_t4_THU_COMOIc.txt", "s62_t6_THU_COMOIe.txt": "s62_t6_THU_COMOId.txt",
        "s62_t7_THU_COMOI_v8d.txt": "s62_t7_THU_COMOI_v8c.txt"}
# t8 v10c -> v10d NOT built: +OUTER_IN = 10 073 chars, every A38 boilerplate trim already used (none left), only owner outfit words remain
# -> 39 chars over even at PROMPT_MAX 10 000; needs Foreman/owner OK on what to shorten (A38: never cut outfit words).
if __name__ == "__main__":
    for out, src in JOBS.items():
        s = open(os.path.join(D, src), encoding="utf-8").read()
        assert s.count(ANCHOR) == 1 and OUTER_IN not in s, src
        i = s.index(ANCHOR); j = s.index(";", i) + 1           # end of the open-outer-robe clause
        s = s[:j] + " " + OUTER_IN + ";" + s[j:]
        s, used = fit(s)
        open(os.path.join(D, out), "w", encoding="utf-8").write(s); print(len(s), out, "trims:", used)
