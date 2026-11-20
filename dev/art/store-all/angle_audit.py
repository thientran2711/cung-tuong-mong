#!/usr/bin/env python3
"""ANGLE AUDIT + GATE (owner Lượt 806 via ROOT-58, MG3; rule E1 Lượt 469/476 + Lượt 440 left/right):
E1 = 14 angles (7 + 7 mirrored), a seeded random draw per (person, rank), 8 distinct angles inside one person, across people the same rank
roughly even, never one angle for everyone. Reads the real store plan (build_all.plan(age): the angle index that build_all writes into
every store prompt) for the 5 ages and checks:
  G1 every one of the 14 angles is used at every age            G2 8 distinct angles inside each person (no repeat across her ranks)
  G3 per rank: no angle used by more than ceil(N/14)+2 people   G4 left vs right balance: |L-R| <= 10 % of the turned pictures
Usage: python3 dev/art/store-all/angle_audit.py   -> markdown tables; exit 1 when a G-check fails (FAIL = fix the plan before a mass)."""
import os, sys, math, collections, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build_all as B
AGES = ["a18", "a26", "a36", "a51", "a65"]


def side(t):
    tl = t.lower()
    if "fully frontal" in tl: return "F"
    m = re.search(r"(?:to|toward)(?: the)?(?: viewer's)? (left|right)", tl)
    return ("R" if m.group(1) == "right" else "L") if m else "?"


def main():
    bad = 0; out = []
    for age in AGES:
        P = B.plan(age); A = B.LAST_G["ANG14"]
        people = sorted({c for c, t in P}); N = len(people); cap = math.ceil(N / 14) + 2   # "roughly even" (E1); the E12 look-group override moves a few
        use = collections.Counter(a for (c, t), (a, pz, gr) in P.items())
        per_rank = {t: collections.Counter(P[(c, t)][0] for c in people if (c, t) in P) for t in range(1, 9)}
        rep = [c for c in people if len({P[(c, t)][0] for t in range(1, 9) if (c, t) in P}) != len([t for t in range(1, 9) if (c, t) in P])]
        sides = collections.Counter(side(A[a]) for (c, t), (a, pz, gr) in P.items())
        g1 = [k for k in range(14) if not use.get(k)]
        g3 = [(t, k, n) for t, cn in per_rank.items() for k, n in cn.items() if n > cap]
        turned = sides["L"] + sides["R"]; g4 = abs(sides["L"] - sides["R"]) > 0.10 * max(turned, 1)
        out.append(f"\n### {age}: {N} people × 8 ranks = {len(P)} pictures · L {sides['L']} / R {sides['R']} / frontal {sides['F']}" + (f" / ? {sides['?']}" if sides['?'] else ""))
        out.append("| angle | side | uses | " + " | ".join(f"t{t}" for t in range(1, 9)) + " | words |")
        out.append("|---|---|---|" + "---|" * 8 + "---|")
        for k in range(14):
            out.append(f"| {k} | {side(A[k])} | {use.get(k, 0)} | " + " | ".join(str(per_rank[t].get(k, 0)) for t in range(1, 9)) + f" | {A[k][:60]} |")
        mm = [(min(per_rank[t].get(k, 0) for k in range(14)), max(per_rank[t].values())) for t in range(1, 9)]
        out.append("- per-rank min/max people per angle: " + " · ".join(f"t{t} {a}-{b}" for t, (a, b) in zip(range(1, 9), mm)) + f" (ideal {N/14:.1f})")
        for name, ok, det in (("G1 all 14 used", not g1, g1), ("G2 8 distinct per person", not rep, rep[:8]), (f"G3 per rank ≤ {cap}", not g3, g3[:6]), ("G4 L/R within 10 %", not g4, f"L {sides['L']} R {sides['R']}")):
            out.append(f"- {name}: **{'PASS' if ok else 'FAIL'}**" + ("" if ok else f" — {det}")); bad += not ok
    print("\n".join(out)); print(f"\n{bad} check(s) failed"); return 1 if bad else 0


if __name__ == "__main__": sys.exit(main())
