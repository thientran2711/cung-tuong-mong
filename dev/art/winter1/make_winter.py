#!/usr/bin/env python3
"""WINTER prompt maker (TEST, WINTER1 for Foreman C #3). Builder is NOT changed: this takes build_all.py output and applies
  G25  autumn/winter t1-t3: old crossed collar = the builder's own a36 Outfit sentence (G21 words)
  G22r t4 Tần: pre-G22 crossed collar (owner revert ~19:00Z 20/11; G22 big flowers kept) - only while the builder still has the square neck
  G28  winter fabric t1-t6: every see-through wording -> soft flowing OPAQUE silk (same drape; never thick/padded words); t7/t8 unchanged
  G26  fur: ONE sentence before 'Pose:', 3-step width ladder (t1-t3 / t4-t6 / t7-t8), plain ivory for all
  LEN  > 10 000 chars: drop the ANGLE sentence (owner OK to cut one side sentence, ~15:39Z) and say so
Usage: python3 dev/art/winter1/make_winter.py s62 [--out DIR] [--gate]
"""
import os, re, subprocess, sys
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
B = os.path.join(ROOT, "dev/art/store-all/build_all.py")
LIMIT = 10000

FUR_END = (", visibly warm and cosy, yet lying smooth and close, never puffy or bulky; the same plain ivory at every rank, "
           "no coloured fur, never covering her face or neck, the neckline keeps its shape.")
FUR = {  # G26 ladder (owner ~19:00Z + ~19:15Z)
 1: "WINTER: a WIDE band of soft plain ivory-white fur trim, about a hand's width, along her collar, the front edges and hem of her outer garment, and her cuffs" + FUR_END,
 2: "WINTER: a WIDER band of soft plain ivory-white fur trim, about one and a half hands wide, along her collar, the front edges and hem of her outer garment, and her cuffs" + FUR_END,
 3: "WINTER: the WIDEST, most luxurious band of thick soft plain ivory-white fur trim, clearly wider than at any lower rank, about two and a half hands wide, "
    "along her collar, the front edges and hem of her outer garment, and her cuffs, rich, warm and cosy, yet lying smooth and close, never puffy or bulky; "
    "the same plain ivory at every rank, no coloured fur, never covering her face or neck, the neckline keeps its shape."}
def fur(t): return FUR[1 if t <= 3 else 2 if t <= 6 else 3]

# G28 fabric swaps: (old exact text, new text). Each must match where present; the report lists which ones fired.
sys.path.insert(0, os.path.join(ROOT, "dev/art")); import winter_g28   # G28: ONE copy of the swaps (shared with check_store winter scope)

def build(p, t, age="a18"):
    return subprocess.run(["python3", B, p, str(t), age], capture_output=True, text=True, check=True).stdout.rstrip("\n")
def outfit(s):
    i = s.index("Outfit ("); return s[i:s.index(". ", i) + 1]

def winter(p, t):
    s = build(p, t); notes = []
    if t <= 3:
        s = s.replace(outfit(s), outfit(build(p, t, "a36")), 1); notes.append("G25 crossed collar (a36 outfit)")
    if t == 4 and "the low square neckline of rank 1, richer gold-brocade edge, NO crossed collar," in s:
        s = re.sub(r"(embroidered borders of [^,]+?) at sleeves and hem,", r"\1 at collar, sleeves and hem,", s, count=1)
        s = s.replace(" the low square neckline of rank 1, richer gold-brocade edge, NO crossed collar,", " a crossed collar,", 1)
        notes.append("pre-G22 crossed collar")
    if t <= 6:   # G28 t1-t6 only (owner ~19:22Z: "Hqp và hh không đổi vải, vì là gấm rồi")
        s, done = winter_g28.apply(s); notes += ["G28 " + d + "…" for d in done]
    assert s.count(" Pose:") == 1
    s = s.replace(" Pose:", " " + fur(t) + " Pose:", 1)
    if len(s) > LIMIT:
        m = re.search(r"ANGLE: .*?(?= GRACE)", s); s = s.replace(m.group(0) + " ", "", 1) if m else s; notes.append("ANGLE sentence dropped (length)")
    return s, notes

if __name__ == "__main__":
    a = sys.argv[1:]; p = a[0]; out = a[a.index("--out") + 1] if "--out" in a else os.path.join(ROOT, "dev/art/winter1/g28")
    os.makedirs(out, exist_ok=True)
    for t in range(1, 9):
        s, notes = winter(p, t); f = os.path.join(out, f"{p}_t{t}_dong.txt"); open(f, "w").write(s + "\n")
        g = ""
        if "--gate" in a:
            r = subprocess.run(["python3", os.path.join(ROOT, "dev/art/check_store.py"), f, "--scope", f"tp{t}", "--age", "a18"], capture_output=True, text=True)
            g = "approved PASS" if r.returncode == 0 else "approved FAIL: " + "; ".join(l.strip()[:90] for l in (r.stdout + r.stderr).splitlines() if "FAIL" in l and "CHECK FAIL" not in l)
        print(f"t{t} {len(s):5d} {'OK' if len(s) <= LIMIT else 'TOO LONG'} | {', '.join(notes)} | {g}")
