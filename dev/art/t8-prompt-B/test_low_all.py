#!/usr/bin/env python3
"""Self-test of build.py --low for all faces c01–c32: python3 test_low_all.py  (exit 0 = green)."""
import importlib.util, os, re, sys
H=os.path.dirname(os.path.abspath(__file__))
spec=importlib.util.spec_from_file_location("b",os.path.join(H,"build.py")); b=importlib.util.module_from_spec(spec); sys.argv=["x"]; spec.loader.exec_module(b)
NOPH="No phoenix anywhere on the robe or in the hair: only flowers, birds, butterflies or other motifs."
n=0; err=[]
for i in range(1,33):
    c=f"c{i:02d}"
    for t in range(1,7):
        for v in ("v0","v1","v2"):
            for a in ("a18","a26","a36","a51"):
                b.AGE=a
                try: s=b.build_low(c,t,v)
                except Exception as e: err.append(f"{c} t{t} {v} {a}: EXC {e!r}"); continue
                n+=1
                if not s.strip(): err.append(f"{c} t{t} {v} {a}: empty")
                if "phoenix" in s.replace(NOPH,""): err.append(f"{c} t{t} {v} {a}: phoenix outside the 'No phoenix' clause")
                if NOPH not in s: err.append(f"{c} t{t} {v} {a}: 'No phoenix' clause missing")
                if t<=3 and "cloud collar" in s: err.append(f"{c} t{t} {v} {a}: cloud collar in t1-t3")
                if v!="v0":
                    s0=s; s=s.replace(b.AGE_TXT[a],"")   # age phrase (a51/a65) mentions royal yellow generically; not the colour slot
                    if t<=5 and re.search(r"royal|yellow",s): err.append(f"{c} t{t} {v} {a}: royal/yellow in t1-t5 v1/v2")
                    if t==6:
                        k=s.find("; plus a clearly visible amount of royal yellow"); e=s.find("COLOUR RULE:",k)
                        if k<0 or e<0 or s.count("clearly visible amount of royal yellow")!=1: err.append(f"{c} t6 {v} {a}: small-touch clause missing/duplicated")
                        elif re.search(r"royal|yellow",s[:k]+s[e:]): err.append(f"{c} t6 {v} {a}: yellow beyond the single royal-yellow clause")
                    if (b.LOWV1 if v=="v1" else b.LOWV2)[c][t][1] not in s: err.append(f"{c} t{t} {v} {a}: LOWV hex missing in prompt")
                    s=s0
                if t==6 and "clearly visible amount of royal yellow" not in s: err.append(f"{c} t6 {v} {a}: royal-yellow sentence missing")
                if t==6 and "more luxury than the rank below" not in s: err.append(f"{c} t6 {v} {a}: luxury sentence missing")
for T_ in (b.LOWV1,b.LOWV2):
    if sorted(T_)!=[f"c{i:02d}" for i in range(1,33)] or any(sorted(T_[c])!=[1,2,3,4,5,6] for c in T_): err.append("LOWV table does not cover 32x6")
b.AGE="a18"
G=os.path.join(H,"golden_low")
for i in range(1,33):
    c=f"c{i:02d}"
    for t in range(1,7):
        f=os.path.join(G,f"t{t}_v0_{c}.txt")
        if not os.path.exists(f): err.append(f"golden missing {f}"); continue
        if open(f,encoding="utf-8").read()!=b.build_low(c,t,"v0"): err.append(f"golden_low differs: t{t}_v0_{c}")
if err: print("\n".join(err[:60])); print(f"FAIL {len(err)} problems / {n} builds"); sys.exit(1)
print(f"OK {n} builds (faces c01..c32 x t1..t6 x v0/v1/v2 x 4 ages), goldens c01..c32 match"); 
