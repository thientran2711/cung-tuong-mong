#!/usr/bin/env python3
"""M2228-01..08 (owner L2228 via ROOT-B6, NECK1): the s62 thu test set with ONLY the G76 low-neckline change
(dev/art/lowneck_L2228.post = the M2219-01 wording: post(M2187-06) == M2219-01 byte for byte).
Bases (newest): t1/t2 = M2213-01/02, t3..t6 = M2217-03..06, t7/t8 = M2227-07/08 (THUROOT8 phoenix versions). Words only, 0 cr.
ANGLE / Pose / GRACE blocks asserted byte-identical; the .keep allow lines = exactly the neckline phrases keep_check reports cut."""
import pathlib, re, subprocess, sys
R = pathlib.Path(__file__).resolve().parents[4]; ART = R / "dev/art"; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
sys.path.insert(0, str(ART)); import lowneck_L2228 as L
BASES = {1: "M2213-01", 2: "M2213-02", 3: "M2217-03", 4: "M2217-04", 5: "M2217-05", 6: "M2217-06", 7: "M2227-07", 8: "M2227-08"}
NOTE = "# owner L2228 G76 low neckline a18-a36 (M2219-01 wording), NECK1"
def blocks(s):
    return [s[s.index(k):s.index(". ", s.index(k)) + 1] for k in ("ANGLE:", "Pose:", "GRACE") if k in s]
for n, b in BASES.items():
    src = f"{b}_s62_t{n}_thu.txt"; s = (P / src).read_text(); keep = blocks(s)
    o, notes = L.post(s)
    assert o.count(L.PHRASE) == 1 and blocks(o) == keep, (src, o.count(L.PHRASE))
    code = f"M2228-0{n}"; assert o.count(f'"{b}"') == 1; o = o.replace(f'"{b}"', f'"{code}"'); assert o.rstrip().endswith(f'"{code}"')
    out = f"{code}_s62_t{n}_thu.txt"; (P / out).write_text(o)
    kc = subprocess.run([sys.executable, str(ART / "keep_check.py"), str(P / src), str(P / out)], capture_output=True, text=True).stdout
    cuts = [l.split("CUT: ", 1)[1] for l in kc.splitlines() if "CUT: " in l] + [f'"{b}"']
    (P / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{src}\n" + "".join(f"allow: {c}  {NOTE}\n" for c in cuts))
    (D / out).write_text(o)
    print(out, len(s), "->", len(o), "|", "; ".join(notes))
