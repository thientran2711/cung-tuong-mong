#!/usr/bin/env python3
"""HAIR1 auto-check: proves the hair table has (1) no duplicate style inside any rank+season, (2) 32 different styles per person (4 different shapes per rank),
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
SE = T["seasons"]
assert SE == ["xuan", "ha", "thu", "dong"], SE
cells = lambda p: [(t, se, P[p][f"t{t}"][se]) for t in range(1, 9) for se in SE]
# (1) inside one rank + one season: 90 different styles
for t in range(1, 9):
    for se in SE:
        for field in ("code", "vi", "en_a18", "en_a36"):
            c = Counter(P[p][f"t{t}"][se][field] for p in P)
            d = [v for v, n in c.items() if n > 1]
            if d: fails.append(f"t{t} {se} duplicate {field}: {d[:2]}")
# (2) one person: all 32 cells different; 4 seasons of one rank = 4 different SHAPES; 8 ranks of one season different
for p in P:
    for field in ("code", "vi", "en_a18"):
        vals = [c[2][field] for c in cells(p)]
        if len(set(vals)) != 32: fails.append(f"{p}: {field} only {len(set(vals))}/32 different")
    for t in range(1, 9):
        sh = [P[p][f"t{t}"][se]["shape"] for se in SE]
        if len(set(sh)) != 4: fails.append(f"{p} t{t}: seasons share a bun shape {sh}")
    for se in SE:
        sh = [P[p][f"t{t}"][se]["shape"] for t in range(1, 9)]
        if len(set(sh)) != 8: fails.append(f"{p} {se}: ranks share a shape {sh}")
# (3) shapes rank-disjoint
shape_rank = {}
for p in P:
    for t, se, r in cells(p):
        if shape_rank.setdefault(r["shape"], t) != t: fails.append(f"shape {r['shape']} used at t{shape_rank[r['shape']]} and t{t}")
# (4) rank laws F1/F11
for p in P:
    for t, se, r in cells(p):
        if t <= 3:
            if "loose" not in r["en_a18"]: fails.append(f"{p} t{t} {se} a18 not loose (F1)")
            if "hanging loose" in r["en_a36"] and "nothing hanging loose" not in r["en_a36"]: fails.append(f"{p} t{t} {se} a36 loose (F11)")
            if "nape" not in r["en_a36"]: fails.append(f"{p} t{t} {se} a36 missing nape knot (F11)")
        else:
            if "all her hair swept up" not in r["en_a18"]: fails.append(f"{p} t{t} {se} not all up (F1)")
            if "loose" in r["en_a18"]: fails.append(f"{p} t{t} {se} loose at t4+ (F1)")
        if t <= 6 and re.search(r"\bcrown\b", r["en_a18"]): fails.append(f"{p} t{t} 'crown' below t7")
LOCAL_BAN = r"\b(phoenix|dragon|flower|blossom|peony|lily|lotus|butterfl\w*|swan|bird\w*|snake|horse|fan|qing|manchu|liangbatou|necklace|tucked beside the bun)\b"
try:
    sys.path.insert(0, os.path.join(ROOT, "dev/art"))
    import check_store
    BANNED = check_store.BANNED if hasattr(check_store, "BANNED") else []
except Exception as e:
    BANNED = []; print("note: check_store BANNED not imported:", e)
allen = {(p, t, se, f): P[p][f"t{t}"][se][f] for p in P for t in range(1, 9) for se in SE for f in ("en_a18", "en_a36")}
for key, txt in allen.items():
    m = re.search(LOCAL_BAN, txt, re.I)
    if m: fails.append(f"{key}: banned word '{m.group(0)}'")
    for b in BANNED:
        rx = b.get("regex")
        if rx and re.search(rx, txt, re.I): fails.append(f"{key}: check_store {b.get('id')} '{b.get('title')}'")
print(f"people {len(P)} · ranks 8 · seasons 4 · styles per rank+season {len({P[p]['t1']['xuan']['code'] for p in P})} · check_store BANNED regexes {len(BANNED)}")
if fails:
    print("FAIL", len(fails)); [print(" -", f) for f in fails[:40]]; sys.exit(1)
print("PASS: no duplicate inside any rank+season (code + VN + EN); each person 32/32 different; her 4 seasons in a rank = 4 different bun shapes; shapes rank-disjoint; F1/F11 OK; no banned words")
