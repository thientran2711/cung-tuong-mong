#!/usr/bin/env python3
"""WINTER prompts for one person, t1-t8 (thin wrapper). The winter words now live in the MAIN builder:
  python3 dev/art/store-all/build_all.py <person> <rank> [aNN] --season dong   (G25 + G28 + G26, words in dev/art/winter_g28.py; builder gate = check_store, season-aware)
Usage: python3 dev/art/winter1/make_winter.py s62 [--out DIR]   -> DIR/<person>_tN_dong.txt (default dev/art/winter1/g28)"""
import os, subprocess, sys
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
a = sys.argv[1:]; p = a[0]; out = a[a.index("--out") + 1] if "--out" in a else os.path.join(ROOT, "dev/art/winter1/g28")
os.makedirs(out, exist_ok=True)
for t in range(1, 9):
    r = subprocess.run(["python3", os.path.join(ROOT, "dev/art/store-all/build_all.py"), p, str(t), "--season", "dong"], capture_output=True, text=True)
    if r.returncode: print(f"t{t} GATE FAIL\n{r.stderr.strip()[:600]}"); continue
    open(os.path.join(out, f"{p}_t{t}_dong.txt"), "w").write(r.stdout + "\n"); print(f"t{t} {len(r.stdout):5d} gate PASS")
