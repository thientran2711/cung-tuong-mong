#!/usr/bin/env python3
"""DESIGN21 JOB 2 (owner L1622 G45 + L1667 'are the jade-covering poses fixed?', Foreman C #17; 0 cr). Run from anywhere. Never hand-edited.
POSEFIX1 (87a519f) dropped poses P30-M6 'one hand adjusting her belt pendant' + P30-C3 'hands folded at her waist under the long sleeves'
in the builder; 7 STORED prompts still carry them (check_store G45 FAIL). Here ONLY the Pose sentence of each is swapped for the pose that
build_all.py now re-picks for that cell (same item words as the stored file; no JADE_CLEAR added: G45 passes without it). Everything else unchanged.
The pre-edit files are kept as dev/art/g45_base/<path>.old (= .keep base)."""
import os, sys, shutil
ART = os.path.dirname(os.path.abspath(__file__))
WHY = "owner L1622 G45 (no cloth over the jade pendant) + L1667, Foreman C #17: pose M6/C3 dropped by POSEFIX1 -> builder re-pick pose, DESIGN21"
JOBS = [  # file, old pose sentence, new pose sentence (= build_all.py re-pick pose of that cell, stored item words kept)
 ("rank8-old4/m29_t4.txt",
  "Pose: one hand adjusting her belt pendant, a small white-jade lotus lamp in the other hand, the robe hem stirring slightly.",
  "Pose: one hand drawing back her long sleeve, a small white-jade lotus lamp in the other hand at her chest, the robe hem stirring slightly."),
 ("rank8-s62/g20/m29_t4.txt",
  "Pose: one hand adjusting her belt pendant, a small white-jade lotus lamp in the other hand, the robe hem stirring slightly.",
  "Pose: one hand drawing back her long sleeve, a small white-jade lotus lamp in the other hand at her chest, the robe hem stirring slightly."),
 ("rank8-t78/s07_t7.txt",
  "Pose: hands folded at her waist under the long sleeves, an imperial round fan with a gold filigree frame and gems held between them, with stately grace, the robe falling still and straight.",
  "Pose: walking mid-step with sleeves flowing, an imperial round fan with a gold filigree frame and gems held open at her side, with stately grace, the robe hem swaying gently with her step."),
 ("rank8-t78/s54_t7.txt",
  "Pose: hands folded at her waist under the long sleeves, a folded letter on gold-flecked kingfisher-blue paper tied with a silk cord held between them, with stately grace, the robe falling still and straight.",
  "Pose: one hand touching her hairpin, a folded letter on gold-flecked kingfisher-blue paper tied with a silk cord in the other hand at her waist, with stately grace, the robe falling still and straight."),
 ("rank8-t78/s59_t8.txt",
  "Pose: hands folded at her waist under the long sleeves, a gold phoenix pellet drum (trống lắc) with pearl strings held between them, with stately grace, the robe falling still and straight.",
  "Pose: mid-step while adjusting a gold hairpin set in her hair with one raised empty hand, her sleeve sliding back, a gold phoenix pellet drum (trống lắc) with pearl strings in the other hand, with stately grace, the robe hem swaying gently with her step."),
 ("rank8-t78/s23_t7.txt",
  "Pose: one hand adjusting her belt pendant, an embroidery hoop in a gold-filigree frame with a kingfisher-silk scene in the other hand, with stately grace, the robe falling still and straight.",
  "Pose: a three-quarter turn looking at the viewer, an embroidery hoop in a gold-filigree frame with a kingfisher-silk scene held near her shoulder, with stately grace, the robe falling still and straight."),
 ("rank8-t78/s17_t8.txt",
  "Pose: one hand adjusting her belt pendant, a gold phoenix hairpin with pearl dangles, held in the hand in the other hand, with stately grace, the robe falling still and straight.",
  "Pose: raising a gold phoenix hairpin with pearl dangles, held between her fingers up beside her cheek, glancing at it, with stately grace, the robe falling still and straight."),
]
bad = 0
for rel, old, new in JOBS:
    p = os.path.join(ART, rel); s = open(p, encoding="utf-8").read()
    if new in s: print("already", rel); continue
    if s.count(old) != 1: print("MISSING", rel); bad = 1; continue
    base = os.path.join(ART, "g45_base", rel + ".old"); os.makedirs(os.path.dirname(base), exist_ok=True); shutil.copyfile(p, base)
    s = s.replace(old, new)
    if len(s) > 10000: print("OVER", rel, len(s)); bad = 1; continue
    open(p, "w", encoding="utf-8").write(s)
    with open(p + ".keep", "w", encoding="utf-8") as k:
        k.write(f"base: dev/art/g45_base/{rel}.old\n")
        for part in dict.fromkeys([x.strip(" ,.;()") for x in old.replace("(", ",").replace(")", ",").split(",")] + [old.strip(" .")]):
            if len(part) > 12 and part not in new: k.write(f"allow: {part}  # {WHY}\n")
    print(len(s), rel)
sys.exit(bad)
