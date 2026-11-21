#!/usr/bin/env python3
"""REVERT1 L1723: A38 .keep sidecars for s62_t{5..8}_THU_fix_L1723 (base L1719) and s62_t{1..3}_THU_L1723 (base rank8-s62)."""
import subprocess, re, sys
ROWS = [(r"Mùa Thu", "caption"), (r"hollyhock|chrysanthemum|ONE fresh flower|a fresh flower|plum blossom", "L1723 hair-flower colour/no leaves + L1714 row 20 species"),
 (r"cloud collar with layered", "L1723 HH no bell shape at the neck"), (r"pearl-tipped", "G39 t3 hairpins (X20)"),
 (r"silver hairpins|pearl hairpins", "L1714 row 19 none at the ears"),
 (r"Full-body standing|soft even light|fair porcelain skin", "L1714 row 24 repeat"), (r"3/4 or frontal", "L1714 row 23/24"),
 (r"slippers visible", "L1714 row 22 toe tips"), (r"ANGLE|THREE-QUARTER|SLIGHT|45 degrees|RIGHT|LEFT|frontal|shoulder nearer|never in profile|turned slightly", "L1714 row 23 angle"),
 (r"sleeves and hem and a soft silk sash", "L1714 row 6 motifs never over the bands (inserted)"), (r"her whole body|face still toward|whole face clearly|arms forming|silk ball|GRACE|elbows|S-curve|hips softly|head inclined|curiosity|twirl|letter|sachet|tú cầu|silver bells|touching her hairpin|skirt hem swinging|leaning|flaring", "L1714 row 23 grace/pose/item"),
 (r"ice blue|mint mist|ORIGINAL robe colour|first reference|#71B5D7", "L1714 row 21 colours")]
FILES = [(f"dev/art/thu_comoi/s62_t{n}_THU_revert_sq_L1719.txt", f"dev/art/thu_comoi/s62_t{n}_THU_fix_L1723.txt") for n in (5, 6, 7, 8)] + \
        [(f"dev/art/rank8-s62/s62_t{n}.txt", f"dev/art/thu_comoi/s62_t{n}_THU_L1723.txt") for n in (1, 2, 3)]
ok = True
for b, p in FILES:
    out = subprocess.run(["python3", "dev/art/keep_check.py", b, p], capture_output=True, text=True).stdout
    L = [f"base: {b}", "# REVERT1 owner L1723 (via Foreman C #20) + L1714 rows"]
    for c in re.findall(r"CUT: (.*)", out):
        w = next((w for k, w in ROWS if re.search(k, c)), None)
        if not w: print("UNMAPPED", p, c); ok = False; continue
        L.append(f"allow: {c}  # owner {w}")
    open(p + ".keep", "w").write("\n".join(L) + "\n")
    print(subprocess.run(["python3", "dev/art/keep_check.py", "--sidecar", p], capture_output=True, text=True).stdout.splitlines()[0][:110])
sys.exit(0 if ok else 1)
