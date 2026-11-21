#!/usr/bin/env python3
"""MAIDFIX4 owner L1952 (via #27). Base = <pid>_nhi[_thancan]_L1924.txt (nhị approved: sample 3zKP2qZREY). Writes *_L1952.txt + .keep.
(a) bow ALWAYS exactly at the body's centre front (it drifted sideways) -> stronger centre sentence after the bow phrase;
(b) the sash binds the jacket IN (many nhị looked like an open coat) -> sash over + closing the jacket, fronts closed under it;
(c) thân cận hair must differ from the regular ranks (regular = double buns / double-loop buns / simple bun) -> ONE thân cận hair block,
    used here only in the ONE sample file m18_nhi_thancan_L1952 (owner wants one sample picture before any thân cận is drawn).
Pure additions + the hair-phrase swap in the sample. Run from repo root."""
import sys
sys.path.insert(0, "dev/art"); import keep_check as kc
P = "dev/art/maid7/prod/"
BOW_OLD = "the sash tied at the FRONT of the waist in a pretty, graceful bow;"
BOW_NEW = ("the sash tied at the FRONT of the waist in a pretty, graceful bow; the bow sits EXACTLY at the centre front of her body, "
           "on the vertical centre line straight below the collar opening, never shifted to the left or right, never at the side or hip;")
CLOSE_OLD = "the jacket hem clearly visible at both sides, "
CLOSE_NEW = ("the jacket hem clearly visible at both sides; the jacket is CLOSED: both jacket fronts overlap and are bound in at the waist "
             "under the sash, the sash wrapped OVER the jacket and holding it shut, never an open coat hanging loose over the outfit, ")
HAIR_OLD = "neat double-loop buns with several silver and pearl hairpins"
HAIR_TC = ("THÂN CẬN HAIR (different from every regular maid's double buns): ONE single rounded bun set high at the back of the crown, "
           "its base wrapped by a thin neat braid, hair combed smoothly back from the forehead, never two buns, never double or "
           "double-loop buns, with several silver and pearl hairpins set round the one bun")
WHY = {"bow": "owner L1952: bow always exactly at centre front", "close": "owner L1952: sash binds the jacket closed, no open coat",
       "hair": "owner L1952: thân cận hair differs from the regular ranks (ONE sample first)"}
jobs = [(p, "nhi", False) for p in ("m09", "m10", "m12", "m13", "m18")] + [("m18", "nhi_thancan", True)]
for pid, rk, hair in jobs:
    b = P + f"{pid}_{rk}_L1924.txt"; s = open(b, encoding="utf-8").read()
    for o, n in ((BOW_OLD, BOW_NEW), (CLOSE_OLD, CLOSE_NEW)) + (((HAIR_OLD, HAIR_TC),) if hair else ()):
        assert s.count(o) == 1, (pid, rk, o[:30]); s = s.replace(o, n)
    if hair: s = s.replace("set densely around both buns", "set densely around the one bun")
    assert len(s) <= 10000, (pid, rk, len(s))
    f = P + f"{pid}_{rk}_L1952.txt"; open(f, "w", encoding="utf-8").write(s)
    d = kc.check(b, f, [])[0]
    open(f + ".keep", "w", encoding="utf-8").write("\n".join([f"base: {b}"] + [f"allow: {x.split('#')[0].strip()}   # {WHY['hair'] if 'bun' in x else WHY['bow'] if 'bow' in x else WHY['close']}" for x in d]) + "\n")
    print(f, len(s), "drops:", d)
