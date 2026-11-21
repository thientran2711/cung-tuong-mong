#!/usr/bin/env python3
"""MAIDFIX4 owner L1971: the L1952 nhị (m09 m10 m12 m13) drifted from the APPROVED nhị (m18 3zKP2qZREY = prompt m18_nhi_L1924).
Drift found: (1) the L1952 'jacket is CLOSED … fronts overlap … bound in under the sash' sentence (drew a crossed-collar wrap robe, sash read blue);
(2) per-person ANGLE (frontal / 3/4) instead of the approved SLIGHT left turn. Fix: base = <pid>_nhi_L1952, closed-jacket sentence removed,
ANGLE = the approved m18 one. Left different from 3zKP only: face line, colour names/hex, held item (E13), bow-centre clause (owner L1952 always-order)."""
import re, sys
sys.path.insert(0, "dev/art"); import keep_check as kc
P = "dev/art/maid7/prod/"
CLOSE = "; the jacket is CLOSED: both jacket fronts overlap and are bound in at the waist under the sash, the sash wrapped OVER the jacket and holding it shut, never an open coat hanging loose over the outfit, "
ANG = re.compile(r"ANGLE: .+?;")
APP = open(P + "m18_nhi_L1924.txt", encoding="utf-8").read(); A = ANG.search(APP).group(0)
for pid in ("m09", "m10", "m12", "m13", "m18"):
    b = P + f"{pid}_nhi_L1952.txt"; s = open(b, encoding="utf-8").read()
    assert s.count(CLOSE) == 1; s = s.replace(CLOSE, ", ")
    s, n = ANG.subn(lambda m: A, s, count=1); assert n == 1
    f = P + f"{pid}_nhi_L1971.txt"; open(f, "w", encoding="utf-8").write(s)
    d = kc.check(b, f, [])[0]
    open(f + ".keep", "w", encoding="utf-8").write("\n".join([f"base: {b}"] + [f"allow: {x.split('#')[0].strip()}   # owner L1971: reproduce the approved nhị 3zKP2qZREY (closed-jacket sentence out, approved angle)" for x in d]) + "\n")
    print(f, len(s), len(d))
