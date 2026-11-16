#!/usr/bin/env python3
"""select.py ALL.jsonl BASE.json ROSY_LIST OUT_LIST — audit table: per group, figures measured / with a face / mismatched
(neck or hands excess >= thr after removing the natural offset), split by 'had the rosy pass'. Writes the mismatched names."""
import sys, os, json, collections
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from rule import shift_for
R = {}
for l in open(sys.argv[1]):
    r = json.loads(l); R[r["f"]] = r
base = json.load(open(sys.argv[2])); ta, tb = base["thr"]
rosy = {l.split()[1] for l in open(sys.argv[3]) if l.startswith("por-")}
def excess(r, g):
    if r.get(g + "_n", 0) < 30 or g + "_a" not in r or "face_a" not in r: return None
    return (r["face_a"] - r[g + "_a"]) - base[g][0], (r["face_b"] - r[g + "_b"]) - base[g][1]
T = collections.defaultdict(lambda: collections.Counter()); out = []
for f, r in sorted(R.items()):
    g = f.split("-")[1]; k = "rosy" if f in rosy else "other"
    T[g]["n"] += 1; T[g]["n_" + k] += 1
    if "face_a" not in r: T[g]["noface"] += 1; continue
    bad = [g for g in ("neck", "hands") if shift_for(r, base, g, min_n=30) != (0.0, 0.0)]
    if bad: T[g]["bad_" + k] += 1; out.append(f)
open(sys.argv[4], "w").write("\n".join(out) + "\n")
print("group      figs  rosy-pass  mismatched(rosy)  other  mismatched(other)  no-face")
for g in sorted(T): t = T[g]; print("%-10s %5d %9d %17d %6d %18d %8d" % (g, t["n"], t["n_rosy"], t["bad_rosy"], t["n_other"], t["bad_other"], t["noface"]))
print("total mismatched", len(out))
