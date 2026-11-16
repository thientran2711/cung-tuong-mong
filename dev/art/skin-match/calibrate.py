#!/usr/bin/env python3
"""calibrate.py ALL.jsonl ROSY_LIST OUT.json — natural face-minus-neck / face-minus-hands offsets (median) on figures that never had
the rosy pass (not in dev/art/skin-rosy-fixed.txt, not players), plus the mismatch threshold = max(1.5, IQR/2) per channel."""
import sys, json, numpy as np
R = [json.loads(l) for l in open(sys.argv[1])]
rosy = {l.split()[1] for l in open(sys.argv[2]) if l.startswith("por-")}
out = {}
for g in ("neck", "hands"):
    d = np.array([(r["face_a"] - r[g + "_a"], r["face_b"] - r[g + "_b"]) for r in R
                  if r["f"] not in rosy and "player" not in r["f"] and g + "_a" in r and "face_a" in r])
    med = np.median(d, 0); q1, q3 = np.percentile(d, [25, 75], 0)
    out[g] = [round(float(med[0]), 2), round(float(med[1]), 2)]; out[g + "_n"] = len(d); out[g + "_iqr"] = (q3 - q1).round(2).tolist()
out["thr"] = [2.5, 3.0]
json.dump(out, open(sys.argv[3], "w"), indent=1); print(out)
