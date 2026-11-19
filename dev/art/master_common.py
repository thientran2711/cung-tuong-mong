#!/usr/bin/env python3
"""ONE MASTER COMMON BLOCK (owner B25, Lượt 745/766) — the only code that reads dev/art/MASTER_COMMON.txt.
Every builder calls apply(prompt) on its final text; check_store.py calls check(prompt) in EVERY scope.

apply(text): every master sentence must be in the prompt VERBATIM exactly once. Sentences the prompt already has (identical text)
  stay where they are (ONE copy, B5: the approved prompt is not reordered); the missing ones are inserted as ONE block, in master order,
  right after master sentence M01 when the prompt already holds it, else at the very start (B25 'starts from the master block').
  Nothing else in the prompt is touched (conflicting approved sentences are NOT deleted: MG1 report lists them, A18).
check(text): -> list of (id, kind, detail); kind = MISSING | REWRITTEN (a near copy, words changed) | NOT ONCE.
CLI: python3 dev/art/master_common.py apply <file|->   |   check <file|->   |   --show"""
import os, re, sys
ART = os.path.dirname(os.path.abspath(__file__))
FILE = os.path.join(ART, "MASTER_COMMON.txt")


def sentences():
    return [l.rstrip("\n") for l in open(FILE, encoding="utf-8") if l.strip()]


def ids():
    return [f"M{i:02d}" for i in range(1, len(sentences()) + 1)]


def _norm(s): return re.sub(r"\s+", " ", s).strip()


def apply(text):
    S = sentences(); t = text
    for k, s in zip(ids(), S):
        assert t.count(s) <= 1, f"master {k} already present {t.count(s)} times (builder duplicates it)"
    miss = [s for s in S if s not in t]
    if not miss: return t
    block = " ".join(miss)
    if S[0] in t:
        j = t.index(S[0]) + len(S[0])
        return t[:j] + " " + block + t[j:]
    lead = len(t) - len(t.lstrip())
    return t[:lead] + block + " " + t[lead:]


def _overlap(s, text):
    w = set(re.findall(r"[a-zA-Z']+", s.lower())); best = 0.0
    for p in re.split(r"(?<=[.;])\s+", text):
        best = max(best, len(w & set(re.findall(r"[a-zA-Z']+", p.lower()))) / max(1, len(w)))
    return best


def check(text):
    t = _norm(text); out = []
    for k, s in zip(ids(), sentences()):
        n = t.count(_norm(s))
        if n == 1: continue
        if n > 1: out.append((k, "NOT ONCE", f"master sentence {n} times: {s[:70]}…")); continue
        ov = _overlap(s, t)
        out.append((k, "REWRITTEN" if ov >= 0.6 else "MISSING", f"master sentence (best overlap {ov:.0%}): {s[:70]}…"))
    return out


def _read(p): return sys.stdin.read() if p == "-" else open(p, encoding="utf-8").read()


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a or a[0] == "--show": print(" ".join(sentences())); sys.exit(0)
    if a[0] == "apply": sys.stdout.write(apply(_read(a[1]))); sys.exit(0)
    if a[0] == "check":
        r = check(_read(a[1]))
        for x in r: print("  FAIL", *x)
        print("MASTER BLOCK", "FAIL" if r else "PASS"); sys.exit(1 if r else 0)
    print(__doc__); sys.exit(2)
