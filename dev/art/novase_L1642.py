#!/usr/bin/env python3
"""DESIGN20 JOB 7 (owner L1438 20/11 'no vase for anyone' + L1642 21/11 verbatim: "bỏ hết tất cả các món đồ mà cầm cái bình hoa"; Foreman C #16).
The SOURCE builders are already vase-free (t8-prompt-B/build.py + item_age.py, B26FAB4 J4: every held vase -> a lotus lamp of the rank's material, same slot).
This script swaps the SAME 1:1 B26FAB4 list (b26/proof/cmp10.py VASE) in every saved FIGURE prompt (.txt + .keep) under dev/art that still holds a vase,
so no old/derived prompt can be reused with a vase. Room/place décor and 'no vase' mentions are untouched. Gate: check_store F19 NOVASE.
Run from the repo root:  python3 dev/art/novase_L1642.py [--dry]   (prints file -> item table)."""
import os, re, sys
ART = os.path.dirname(os.path.abspath(__file__))
MAP = [  # B26FAB4 list (b26/proof/cmp10.py VASE), longest first; + the m44 face-common wordings of the same item
    ("a white-jade vase with gold phoenix mounts and peonies", "a white-jade lotus lamp with gold phoenix mounts"),
    ("a white-jade vase with gold mounts and flowers", "a white-jade lotus lamp with gold mounts"),
    ("a small vase of old celadon with a single orchid", "a small lotus lamp of old celadon"),
    ("a cloisonné enamel vase with flowers", "a cloisonné enamel lotus lamp with gilt petals"),
    ("a gold-mounted jade vase with peonies", "a gold lotus lamp set with gems"),
    ("a small plain clay vase with a flower sprig", "a small plain clay lotus lamp"),
    ("a small porcelain vase with a single flower sprig", "a small porcelain lotus lamp"),
    ("a small porcelain vase holding a single flower sprig", "a small porcelain lotus lamp"),
    ("the small porcelain vase with a single flower sprig", "the small porcelain lotus lamp"),
    ("a small porcelain vase with a flower sprig", "a small porcelain lotus lamp"),
    ("a small celadon vase with a flower sprig", "a small celadon lotus lamp"),
    ("a small cloisonné vase with flowers", "a small cloisonné lotus lamp"),
    ("a small white-jade vase with blossoms", "a small white-jade lotus lamp"),
    ("the vase cradled", "the lamp cradled"),
]
SKIP = re.compile(r"(^|/)(place[^/]*|room[^/]*)(/|$)|flower_sheets/", re.I)
dry = "--dry" in sys.argv
rows = []
for root, dirs, files in os.walk(ART):
    rel = os.path.relpath(root, ART)
    for fn in files:
        if not (fn.endswith(".txt") or fn.endswith(".keep")): continue
        rp = os.path.normpath(os.path.join(rel, fn))
        if SKIP.search(rp): continue
        p = os.path.join(root, fn); s = open(p, encoding="utf-8").read()
        if not re.search(r"\bvase", s, re.I): continue
        t, hit = s, []
        for a, b in MAP:
            if a in t: hit.append(f"{a} -> {b}"); t = t.replace(a, b)
        if t != s:
            rows.append((rp, "; ".join(hit)))
            if not dry: open(p, "w", encoding="utf-8").write(t)
for r in sorted(rows): print(" | ".join(r))
print(len(rows), "files", "(dry run)" if dry else "changed")
