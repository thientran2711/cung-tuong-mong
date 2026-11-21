#!/usr/bin/env python3
"""MAIDFIX4 owner L1924: tam and nhị looked the SAME. Cause: tam's top is "a short jacket ... that ends just below the waist", while nhị's
"layered half-sleeve ... jacket (bijia)" had NO length word, so the model drew the same short top. Fix (nhị + nhị thân cận ONLY):
the bijia's front and back panels (tà) hang down to MID-THIGH = clearly longer than tam (waist), shorter than nhất (tà to just past the knee).
Base = <pid>_nhi[_thancan]_L1919.txt; writes <pid>_nhi[_thancan]_L1924.txt + .keep. Not drawable until the owner OKs one sample (A49)."""
import re, sys
sys.path.insert(0, "dev/art"); import keep_check as kc
P = "dev/art/maid7/prod/"
PERS = ["m09", "m10", "m12", "m13", "m18"]   # m11 dropped (owner L1925)
OLD = re.compile(r"a layered half-sleeve matte silk crepe jacket \(bijia\) on top in ([^,]+?like #[0-9A-F]{6}), ")
NEW = ("a layered half-sleeve matte silk crepe jacket (bijia) on top in \\1, a LONG jacket: its front and back panels (tà) hang down "
       "well below the hips to MID-THIGH, clearly LONGER than a tam đẳng maid's short top that ends at the waist and shorter than a "
       "nhất đẳng maid's knee-length tà, the jacket hem clearly visible at both sides, ")
for pid in PERS:
    for rk in ("nhi", "nhi_thancan"):
        b = P + f"{pid}_{rk}_L1919.txt"; s = open(b, encoding="utf-8").read()
        s, n = OLD.subn(NEW, s); assert n == 1, (pid, rk)
        assert len(s) <= 10000
        f = P + f"{pid}_{rk}_L1924.txt"; open(f, "w", encoding="utf-8").write(s)
        d = kc.check(b, f, [])[0]
        open(f + ".keep", "w", encoding="utf-8").write("\n".join([f"base: {b}"] + [f"allow: {x.split('#')[0].strip()}   # owner L1924: nhị tà longer than tam" for x in d]) + "\n")
        print(f, len(s), len(d))
