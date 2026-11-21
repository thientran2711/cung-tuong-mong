#!/usr/bin/env python3
"""HAIR1 auto-check: proves the hair table has (1) no duplicate style inside any rank, (2) 8 different styles per person,
(3) no shape reused across ranks, (4) rank laws F1/F11 in the EN words, (5) no banned words (check_store BANNED regexes + local list).
Exit 1 on any FAIL."""
import json, os, re, sys
from collections import Counter
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
T = json.load(open(os.path.join(HERE, "HAIR_TABLE.json"), encoding="utf-8"))
P = T["people"]; fails = []
pal = json.load(open(os.path.join(ROOT, "dev/art/face-common/palettes_season_L1583.json"), encoding="utf-8"))
roster = sorted(k for k in pal if k[:1] in "cms" and k[1:].isdigit())
if sorted(P) != roster: fails.append(f"roster mismatch: table {len(P)} vs palettes {len(roster)}")
for t in range(1, 9):
    k = f"t{t}"
    for field in ("code", "vi", "en_a18", "en_a36"):
        c = Counter(P[p][k][field] for p in P)
        d = [v for v, n in c.items() if n > 1]
        if d: fails.append(f"{k} duplicate {field}: {d[:3]}")
for p in P:
    for field in ("code", "shape", "vi", "en_a18"):
        vals = [P[p][f"t{t}"][field] for t in range(1, 9)]
        if len(set(vals)) != 8: fails.append(f"{p}: {field} repeats across ranks {vals}")
shape_rank = {}
for p in P:
    for t in range(1, 9):
        s = P[p][f"t{t}"]["shape"]
        if shape_rank.setdefault(s, t) != t: fails.append(f"shape {s} used at t{shape_rank[s]} and t{t}")
for p in P:
    for t in range(1, 9):
        r = P[p][f"t{t}"]
        if t <= 3:
            if "loose" not in r["en_a18"]: fails.append(f"{p} t{t} a18 not loose (F1)")
            if "hanging loose" in r["en_a36"] and "nothing hanging loose" not in r["en_a36"]: fails.append(f"{p} t{t} a36 loose (F11)")
            if "nape" not in r["en_a36"]: fails.append(f"{p} t{t} a36 missing nape knot (F11)")
        else:
            if "all her hair swept up" not in r["en_a18"]: fails.append(f"{p} t{t} not all up (F1)")
            if "loose" in r["en_a18"]: fails.append(f"{p} t{t} loose at t4+ (F1)")
        if t <= 6 and re.search(r"\bcrown\b", r["en_a18"]): fails.append(f"{p} t{t} 'crown' below t7")
LOCAL_BAN = r"\b(phoenix|dragon|flower|blossom|peony|lily|lotus|butterfl\w*|swan|bird\w*|snake|horse|fan|qing|manchu|liangbatou|necklace|tucked beside the bun)\b"
try:
    sys.path.insert(0, os.path.join(ROOT, "dev/art"))
    import check_store
    BANNED = check_store.BANNED if hasattr(check_store, "BANNED") else []
except Exception as e:
    BANNED = []; print("note: check_store BANNED not imported:", e)
allen = {(p, t, f): P[p][f"t{t}"][f] for p in P for t in range(1, 9) for f in ("en_a18", "en_a36")}
for key, txt in allen.items():
    m = re.search(LOCAL_BAN, txt, re.I)
    if m: fails.append(f"{key}: banned word '{m.group(0)}'")
    for b in BANNED:
        rx = b.get("regex")
        if rx and re.search(rx, txt, re.I): fails.append(f"{key}: check_store {b.get('id')} '{b.get('title')}'")
print(f"people {len(P)} · ranks 8 · styles per rank {len({P[p]['t1']['code'] for p in P})} · check_store BANNED regexes {len(BANNED)}")
if fails:
    print("FAIL", len(fails)); [print(" -", f) for f in fails[:40]]; sys.exit(1)
print("PASS: no duplicate inside any rank (code + VN + EN), 8 different styles per person, shapes rank-disjoint, F1/F11 words OK, no banned words")
