#!/usr/bin/env python3
"""REVERT1: write the A38 .keep sidecars for s62_t5..t8_THU_revert_L1714 (base = rank8-s62/s62_tN.txt); every allowed drop tagged with its L1714 row."""
import subprocess, re, sys
ROWS = [(r"peon|plum blossom", "20 F2 species (+21 colour words in the same phrase)"),
 (r"cloud collar|scalloped gold-thread edge", "7+8 cloud collar moved Phi -> Quý phi"), (r"cape/stole|collar and cape trim", "7+8 cape moved Quý phi -> Phi"),
 (r"necklace", "12 no necklaces"), (r"kingfisher", "13 phoenix in own colours"), (r"mantle|broad band of gold brocade and pearls", "15 no HH mantle in daily wear"),
 (r"slippers visible", "22 toe tips only"), (r"falling still and straight|weight on one leg", "22/23 pose"),
 (r"Full-body standing|soft even light|fair porcelain skin", "24 repeat of the opening sentence"), (r"3/4 or frontal", "23/24 angle repeat"),
 (r"never copy anything but its colour", "24 repeat (said again in the last sentence)"),
 (r"ONE fresh flower", "20 hair flower species"),
 (r"SLIGHT|15 degrees|almost frontal|face toward the viewer|never in profile|on her LEFT side|fingers softly|wrists relaxed|counter-line|against the turn", "23 new angle/grace"),
 (r"Pose:|pipa|mother-of-pearl|step forward|head tilted gracefully|hem stirring|lantern|held in the hand", "23 new pose/held item"),
 (r"ice blue|mint mist|ORIGINAL robe colour|first reference|#71B5D7", "21 thu palette olive #9FB577 + lilac (COLOUR SLOT)")]
ok = True
for n in (5, 6, 7, 8):
    p = f"dev/art/thu_comoi/s62_t{n}_THU_revert_L1714.txt"; b = f"dev/art/rank8-s62/s62_t{n}.txt"
    out = subprocess.run(["python3", "dev/art/keep_check.py", b, p], capture_output=True, text=True).stdout
    L = [f"base: {b}", "# REVERT1 owner L1714: back to the old Set A prompt; drops only per the L1714 rows"]
    for c in re.findall(r"CUT: (.*)", out):
        w = next((w for k, w in ROWS if re.search(k, c)), None)
        if not w: print("UNMAPPED t%d:" % n, c); ok = False; continue
        L.append(f"allow: {c}  # owner L1714 row {w}")
    open(p + ".keep", "w").write("\n".join(L) + "\n")
    print(subprocess.run(["python3", "dev/art/keep_check.py", "--sidecar", p], capture_output=True, text=True).stdout.splitlines()[0])
sys.exit(0 if ok else 1)
