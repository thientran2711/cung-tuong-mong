# BRIEF trieu-phuc-r10 (Foreman C ROOT-34, 18/11 ~23:45Z real): successor of W104g
PRIORITY #1 CHECK: FIGURE_GATE "TRIỀU PHỤC EMBROIDERY EVERYWHERE" (owner 23:33Z) + "TRIỀU PHỤC CUT B + PEARL FRINGE" (23:28Z) | report reports/trieu-phuc-sample.md §14 (W104g round 9 + HANDOVER) | builder dev/art/t8-prompt-B/build.py TRIEU block at/after 9fb756a | main/review: none.
OWNER (verbatim, 18/11): "Cho dù mày có đổi phiên đi chăng nữa, cho dù mày có mở thợ mới đi chăng nữa thì làm ơn nhắc các thợ là đọc kỹ." → re-read FIGURE_GATE (A0 + REFERENCES, rule 3 incl. "BENCHMARK OF THE GAME COLOUR", the TRIỀU PHỤC lines) + consort-B10 before every person.

ROUND 9 VERDICT (Foreman C looked):
- KEEP: cut B; fringe per rank (t1–t3 none with pearls on the shoulder piece, t4–t6 short, t7–t8 long); t7/t8 sleeves + crown; colours.
- FAIL t1–t6: the robe body and sleeves are plain red, with embroidery only on the two panels + hem. The owner calls this "giống như là một con nữ mang na" (a mannequin).
JOB (c06 a18, option B):
1. BUILDER: add a whole-robe embroidery sentence for EVERY rank. Dense embroidery all over the robe body, both sleeves, the skirt and every red/crimson area, not only on the front panels; as fully embroidered as the approved Nữ đế A–D (img/_review/states-r10/). Motif richness may rise with rank (t1 delicate small sprays → t8 dense phoenix/peony), but no rank has a plain robe body. Keep everything else from 9fb756a. Colour = rule 3: the soft yellow of the Nữ đế is the benchmark; red areas a soft, toned-down crimson, never rực. Commit.
2. GENERATE B t1..t8 (8 gens; settings as in §14). LOOK at every image. Extra check: is any large area of the robe left plain? → regen (max 3).
3. Make two sheets and cdn_sync them to img/_review/trieu-phuc/:
   - c06_sheet10_2x4.jpg = B t1..t8.
   - c06_sheet10_vsHH.jpg = t8 | approved Hoàng hậu c06_a18_t8_v0 | Nữ đế A (states-r10).
   Note: dev/site/cdn_sync.py lives on main; use it untracked.
4. Report §15, push the handover branch, send READY to Foreman C ROOT-34 (session_01PEhRbxEqMo11RRz1YMMxN4).
Roll over at START_CTX+25 % (ceiling 60 %): write the handover in the report and tell me; I open the successor.
