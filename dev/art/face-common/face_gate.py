#!/usr/bin/env python3
"""MG1 (owner B25 Lượt 745/766 + A19 Lượt 766): the ONE last step of every face maker (make_c_v3 / make_nf3 / make_nf4 /
make_sacsao_L737 / make_lanhlung_L761 and any new maker): final(v, key) ->
  1. master_common.apply(v): the MASTER block (dev/art/MASTER_COMMON.txt) verbatim, sentences the prompt already has stay put;
  2. D9 (owner Lượt 529, ART_RULES D9 'every prompt'): the store's D9_FOREHEAD words, read from t8-prompt-B/build.py (never retyped),
     right before the END sentence 'No text, no labels.' exactly as the store/NPC/emperor builders place it;
  3. check_store.check_text(v, 'face') -> any FAIL raises (the maker writes nothing): no gate PASS = no prompt file = no gen."""
import os, re, sys
D = os.path.dirname(os.path.abspath(__file__)); ART = os.path.dirname(D)
sys.path.insert(0, ART)
import master_common, check_store

_B = open(os.path.join(ART, "t8-prompt-B", "build.py"), encoding="utf-8").read()
D9 = re.search(r'^D9_FOREHEAD="([^"]+)"', _B, re.M).group(1)          # " NOTHING on the forehead (no hoa điền, no dot, no mark, nothing)."
END = master_common.sentences()[-1]                                  # "No text, no labels." (master M14)


def final(v, key=""):
    v = master_common.apply(v)
    if D9.strip() not in v:
        assert v.count(END) == 1, (key, "END")
        i = v.index(END); v = v[:i].rstrip() + D9 + " " + v[i:]
    f, w, _ = check_store.check_text(v, "face")
    if f: raise SystemExit(f"FACE GATE FAIL {key}: " + "; ".join(f"{i} {k} {d}" for i, k, d in f))
    return v
