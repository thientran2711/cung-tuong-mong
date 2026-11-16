#!/usr/bin/env python3
"""table.py FIX.jsonl BASE.json [ALL.jsonl] — per group: figs changed, por necks changed, median excess a* (face rosier than region,
natural offset removed) before -> after for neck and hands. Markdown to stdout."""
import sys, json, collections, numpy as np
base = json.load(open(sys.argv[2])); G = collections.defaultdict(lambda: collections.defaultdict(list))
for l in open(sys.argv[1]):
    r = json.loads(l); g = r["f"].split("-")[1]
    if "player_look1" in r:
        G["player look1 (rosy)"]["fig" if r["f"].startswith("fig") else "por"].append(1); continue
    if not r.get("after"): G[g]["skip"].append(1); continue
    G[g]["fig"].append(1); G[g]["por"].append(1 if r.get("por") else 0)
    for reg in ("neck", "hands"):
        b, a = r["before"], r["after"]
        if reg + "_a" in b and reg + "_a" in a and r["shift"][reg] != [0.0, 0.0]:
            G[g][reg + "_b"].append((b["face_a"] - b[reg + "_a"]) - base[reg][0]); G[g][reg + "_a"].append((a["face_a"] - a[reg + "_a"]) - base[reg][0])
m = lambda v: "%.1f" % np.median(v) if v else "–"
print("| group | figs fixed | por necks fixed | necks fixed: excess a* before → after | hands fixed: excess a* before → after |")
print("|---|---|---|---|---|")
for g in sorted(G):
    d = G[g]
    print("| %s | %d | %d | %d: %s → %s | %d: %s → %s |" % (g, len(d["fig"]), sum(d["por"]), len(d["neck_b"]), m(d["neck_b"]), m(d["neck_a"]), len(d["hands_b"]), m(d["hands_b"]), m(d["hands_a"])))
