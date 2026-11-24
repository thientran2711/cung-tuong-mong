#!/usr/bin/env python3
"""KEEP CHECK — the "nothing cut" machine (owner Lượt 1274, 20/11).

Owner: workers (esp. Sonnet) silently cut outfit details (ribbons, cuffs, pearls,
hair flowers, embroidery) when editing a prompt. This tool compares a NEW prompt
with the BASE prompt it was made from and lists every BASE phrase that is gone.
A dropped phrase is only OK when it is listed in the allow list (what the owner
asked to change, or pure boilerplate the foreman agreed to trim).

Usage
  python3 dev/art/keep_check.py BASE NEW [--allow "phrase" ...] [--allow-file F]
  python3 dev/art/keep_check.py --sidecar NEW        (reads NEW.keep)
  python3 dev/art/keep_check.py --all                (every *.keep under dev/art)

Sidecar file NEW.keep (one per derived prompt; REQUIRED for every edited prompt):
  base: dev/art/seasons4/s62_t5_thu_HAN_B.txt
  allow: no cape, no cloud collar     # Lượt 1263 owner: add signature piece
  allow: Everyone beautiful at every age   # boilerplate, foreman OK
Exit 0 = PASS (nothing unexpected cut), 1 = FAIL (list printed).
"""
import re, sys, os, glob

MIN_WORDS = 3

def norm(s):
    s = s.lower().replace("’", "'").replace("“", '"').replace("”", '"')
    s = re.sub(r"[\"'`*_]", "", s)
    s = re.sub(r"\s+", " ", s)
    return s.strip(" .,;:()-—–")

def units(text):
    # split into small phrases: sentences, clauses, list items, brackets
    parts = re.split(r"[.;:,()\n\[\]]|\s[—–-]\s", text)
    out = []
    for p in parts:
        n = norm(p)
        if len(n.split()) >= MIN_WORDS:
            out.append((p.strip(), n))
    return out

def check(base_path, new_path, allows):
    base = open(base_path, encoding="utf-8").read()
    new = open(new_path, encoding="utf-8").read()
    new_n = norm(re.sub(r"\s+", " ", new))
    new_n_flat = re.sub(r"[.;:,()\[\]]", " ", new_n)
    new_n_flat = re.sub(r"\s+", " ", new_n_flat)
    allows_n = [norm(a) for a in allows if norm(a)]
    dropped, allowed = [], []
    seen = set()
    for raw, n in units(base):
        if n in seen:
            continue
        seen.add(n)
        nf = re.sub(r"\s+", " ", n)
        if nf in new_n or nf in new_n_flat:
            continue
        if any(a in nf or nf in a for a in allows_n):
            allowed.append(raw)
        else:
            dropped.append(raw)
    return dropped, allowed, len(base), len(new)

def read_sidecar(new_path):
    side = new_path + ".keep"
    if not os.path.exists(side):
        return None, []
    base, allows = None, []
    for line in open(side, encoding="utf-8"):
        line = line.split("#", 1)[0].strip()
        if line.startswith("base:"):
            base = line[5:].strip()
        elif line.startswith("allow:"):
            allows.append(line[6:].strip())
    return base, allows

def report(base, new, allows):
    dropped, allowed, lb, ln = check(base, new, allows)
    status = "PASS" if not dropped else "FAIL"
    print(f"[{status}] {new}  (base {base}; {lb} -> {ln} chars; allowed drops {len(allowed)})")
    for d in dropped:
        print(f"   CUT: {d[:220]}")
    return not dropped

def main(a):
    if not a or a[0] in ("-h", "--help"):
        print(__doc__); return 0
    if a[0] == "--all":
        ok = True
        files = sorted(glob.glob("dev/art/**/*.keep", recursive=True))
        for side in files:
            new = side[:-5]
            base, allows = read_sidecar(new)
            if not base or not os.path.exists(new):
                print(f"[FAIL] {side}: missing base: line or prompt file"); ok = False; continue
            ok = report(base, new, allows) and ok
        print(f"{len(files)} sidecar(s) checked: {'PASS' if ok else 'FAIL'}")
        return 0 if ok else 1
    if a[0] == "--sidecar":
        new = a[1]
        base, allows = read_sidecar(new)
        if not base:
            print(f"[FAIL] {new}.keep missing (every edited prompt needs one)"); return 1
        return 0 if report(base, new, allows) else 1
    base, new = a[0], a[1]
    allows, i = [], 2
    while i < len(a):
        if a[i] == "--allow":
            allows.append(a[i + 1]); i += 2
        elif a[i] == "--allow-file":
            allows += [l.split("#", 1)[0].strip() for l in open(a[i + 1], encoding="utf-8") if l.strip() and not l.startswith("#")]
            i += 2
        else:
            i += 1
    return 0 if report(base, new, allows) else 1

if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
