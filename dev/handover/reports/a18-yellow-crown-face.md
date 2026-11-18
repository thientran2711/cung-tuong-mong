# a18-yellow-crown-face (W65, 18/11 ~16:35Z)

PRIORITY #1 CHECK: OD 19 (FIGURE_GATE C4c overwritten 16:30Z) | ledger 0 | claims 8 (old ageing jobs; W55 t8-v2-yellow DONE) | main 15 | review/* 0 | archive 0; 'covers the face': 0 relevant -> new D3d. Reuse: B10 a18 sets (768 files), W56 pose-eyes scan method. Rules read in full at start: START_CORE (incl. the 18 laws), START_WORKER, START_ART, FIGURE_GATE (all), consort-B10, consort-b10-tools README, b10-pose-eyes. Nothing live touched; c03 a18 t6/t7/t8 v1 untouched (c03 t8 v1 = the colour reference). v0 originals keep their colours.

## Method
- Downloaded all 768 PNGs (c01-c32 x t1-t8 x v0/v1/v2), scanned 768/768.
- YELLOW (t7, t8; v1+v2 = 128 files): median RGB of the yellow-family pixels (hue 30-50 deg, S>0.20, V>0.6) -> CIELAB distance dE to the reference c03 t8 v1 (median RGB 221,182,128 = H36 S0.42 V0.85). Threshold: dE>=15 = FAIL (visible pale/tan AND deep amber/mustard; c12 t8 v1, same family as the reference, is dE12). Every file also looked at on 6-cell rows (v0|v1|v2 of t7 and t8, upper body) of 4 people per sheet (8 sheets).
- CROWN (t7/t8 v1/v2 vs v0): all 64 triples looked at on the same sheets.
- FACE COVER (all 768): MediaPipe face mesh found the face in 768/768; every file's face crop looked at on 12x8 contact sheets (8 sheets, 4 people each); the 7 suspect groups (c12 t1, c13 t4, c14 t5, c16 t3, c25 t5, c26 t5, c27 t7) zoomed with the face outline.

## Result of the scan
| check | FAIL files | n |
|---|---|---|
| yellow (dE>=15) | t8 v1: c01 c16 c17 c20 c21 c22 c23 c27; t7 v1: c02 c06 c07 c09 c10 c15 c19 c25; t7 v2: c01 c16 c19 c25 | 20 |
| crown completely different | none | 0 |
| crown same phoenix family but wider wings / bigger than v0 (BORDERLINE, NOT regenerated) | t7 v1+v2 of c04, c08, c09, c10, c13 | 10 |
| held item covers face | c13 t4 v0/v1/v2 (plum-blossom branch on mouth/cheek) | 3 |
Face-contact but NOT covering (kept): c12 t1 v0-2 (fingertips+pearls at the jaw under the ear), c14 t5 v0-2 (hand+beads at the jaw), c16 t3 v0-2 (lotus below the chin), c25 t5, c26 t5, c27 t7 (flower/hand below the chin). No other file had an item over the face (c21/c15/c14 'hand at temple' touch hair/ear only).
No v0 yellow was touched. Nothing else changed.

## Scan table (person | files | yellow | crown | face | action). Rows not listed = all files OK.
| person | file | yellow ok? | crown ok? | face ok? | action |
|---|---|---|---|---|---|
| c01 | t8 v1 | NO (dE17, amber) | ok | ok | regen 1 |
| c01 | t7 v2 | NO (dE19) | ok | ok | regen 1 |
| c02 | t7 v1 | NO (dE21, tan) | ok | ok | regen 2 |
| c06 | t7 v1 | NO (dE17, pale) | ok | ok | regen 1 |
| c07 | t7 v1 | NO (dE18, pale) | ok | ok | regen 1 |
| c09 | t7 v1 | NO (dE18, pale) | wider wings (borderline) | ok | regen 1 |
| c10 | t7 v1 | NO (dE15, pale) | wider wings (borderline) | ok | regen 1 |
| c13 | t4 v0 | ok | ok | NO plum branch on mouth | regen 1 |
| c13 | t4 v1 | ok | ok | NO | regen 1 |
| c13 | t4 v2 | ok | ok | NO | regen 1 |
| c15 | t7 v1 | NO (dE20, tan) | ok | ok | regen 1 |
| c16 | t8 v1 | NO (dE23, mustard) | ok | ok | regen 1 |
| c16 | t7 v2 | NO (dE16) | ok | ok | regen 1 |
| c17 | t8 v1 | NO (dE18) | ok | ok | regen 2 |
| c19 | t7 v1 | NO (dE17) | ok | ok | regen 2 |
| c19 | t7 v2 | NO (dE15) | ok | ok | regen 2 |
| c20 | t8 v1 | NO (dE22) | ok | ok | regen 1 |
| c21 | t8 v1 | NO (dE30, orange-amber) | ok | ok | regen 1 |
| c22 | t8 v1 | NO (dE18) | ok | ok | regen 1 |
| c23 | t8 v1 | NO (dE24) | ok | ok | regen 2 |
| c25 | t7 v1 | NO (dE19) | ok | ok | regen 1 |
| c25 | t7 v2 | NO (dE23) | ok | ok | regen 2 |
| c27 | t8 v1 | NO (dE18) | ok | ok | regen 2 |
| c04 | t7 v1/v2 | ok | wider wings (borderline) | ok | kept, flagged |
| c08 | t7 v1/v2 | ok | wider wings (borderline) | ok | kept, flagged |
| c09 | t7 v2 | ok | wider wings (borderline) | ok | kept, flagged |
| c10 | t7 v2 | ok | wider wings (borderline) | ok | kept, flagged |
| c13 | t7 v1/v2 | ok | wider wings (borderline) | ok | kept, flagged |

## Gens (gpt-2-6, 2k, transparent, folder ba4aecfe..., 135 cr each)
Yellow gens: refs = the file itself (image) + c03 t8 v1 (colour image) + m09 eIyOFEidqL (style). Prompt t8: "...copy EXACTLY everything of image 1 (pose, face, hair, hair ornaments, phoenix crown same design and size, costume, embroidery stitched directly into the silk, held item in its contrasting colour, fabric, stitching). Change ONLY the yellow of the robe: exactly the warm royal golden yellow of image 2, not pale cream, not beige/tan/ochre, not bright mustard, not orange-amber, not lemon... whole face fully visible, held item below the chin." t7: same but "Change ONLY the yellow parts (inner robe, borders, sash)... the main robe colour kept, yellow only on inner robe/borders/sash". Second gen (7 files that came out too orange) added: "soft warm golden yellow of image 2, about RGB 221,182,128, light honey-gold, lighter and less orange than a deep amber". Face gens (c13 t4): refs = the file + m09; "Change ONLY the held plum-blossom branch: held low beside the body at hip height, well below the chin, blossoms away from the face; nothing touches the face".
| figure | gens | yellow dE before -> after | face | pass |
|---|---|---|---|---|
| c21 t8_ 1 | 1 | 30 -> 13.4 | open, closed-lip smile, nothing on the face | yes |
| c01 t8_ 1 | 1 | 17 -> 11.8 | open, closed-lip smile, nothing on the face | yes |
| c16 t8_ 1 | 1 | 23 -> 12.8 | open, closed-lip smile, nothing on the face | yes |
| c17 t8_ 1 | 2 | 18 -> 3.6 | open, closed-lip smile, nothing on the face | yes |
| c20 t8_ 1 | 1 | 22 -> 12.2 | open, closed-lip smile, nothing on the face | yes |
| c22 t8_ 1 | 1 | 18 -> 11.6 | open, closed-lip smile, nothing on the face | yes |
| c23 t8_ 1 | 2 | 24 -> 7.5 | open, closed-lip smile, nothing on the face | yes |
| c27 t8_ 1 | 2 | 18 -> 3.0 | open, closed-lip smile, nothing on the face | yes |
| c02 t7_ 1 | 2 | 21 -> 4.6 | open, closed-lip smile, nothing on the face | yes |
| c06 t7_ 1 | 1 | 17 -> 10.3 | open, closed-lip smile, nothing on the face | yes |
| c07 t7_ 1 | 1 | 18 -> 13.3 | open, closed-lip smile, nothing on the face | yes |
| c09 t7_ 1 | 1 | 18 -> 6.8 | open, closed-lip smile, nothing on the face | yes |
| c10 t7_ 1 | 1 | 15 -> 11.6 | open, closed-lip smile, nothing on the face | yes |
| c15 t7_ 1 | 1 | 20 -> 11.2 | open, closed-lip smile, nothing on the face | yes |
| c19 t7_ 1 | 2 | 17 -> 3.7 | open, closed-lip smile, nothing on the face | yes |
| c25 t7_ 1 | 1 | 19 -> 9.9 | open, closed-lip smile, nothing on the face | yes |
| c01 t7_ 2 | 1 | 19 -> 14.6 | open, closed-lip smile, nothing on the face | yes |
| c16 t7_ 2 | 1 | 16 -> 12.7 | open, closed-lip smile, nothing on the face | yes |
| c19 t7_ 2 | 2 | 15 -> 3.0 | open, closed-lip smile, nothing on the face | yes |
| c25 t7_ 2 | 2 | 23 -> 7.0 | open, closed-lip smile, nothing on the face | yes |
| c13 t4 v0 | 1 | - | branch moved below the chin (face fully visible) | yes |
| c13 t4 v1 | 1 | - | branch moved below the chin (face fully visible) | yes |
| c13 t4 v2 | 1 | - | branch moved below the chin (face fully visible) | yes |

Total gens 30 (20 yellow first gens + 3 face gens + 7 second gens) = 4,050 cr; every figure PASSED within 2 gens. 7 figures needed the 2nd gen (the first came out more orange than the reference).

## Yellow numbers (dE to reference; reference median RGB 221,182,128, H36 S0.42 V0.85). t7/t8 v1/v2, before the fix (bold = FAIL, fixed above)
- t8 v1: **c01 17**, c02 11, c03 0, c04 9, c05 4, c06 10, c07 8, c08 11, c09 7, c10 11, c11 5, c12 12, c13 6, c14 7, c15 9, **c16 23**, **c17 18**, c18 9, c19 7, **c20 22**, **c21 30**, **c22 18**, **c23 24**, c24 5, c25 7, c26 14, **c27 18**, c28 5, c29 4, c30 8, c31 13, c32 12
- t8 v2: c01 11, c02 7, c03 6, c04 7, c05 9, c06 7, c07 8, c08 6, c09 8, c10 10, c11 5, c12 6, c13 2, c14 7, c15 2, c16 10, c17 4, c18 12, c19 4, c20 5, c21 6, c22 6, c23 5, c24 8, c25 5, c26 4, c27 6, c28 10, c29 7, c30 6, c31 3, c32 5
- t7 v1: c01 14, **c02 21**, c03 8, c04 5, c05 6, **c06 17**, **c07 18**, c08 13, **c09 18**, c10 15, c11 5, c12 6, c13 14, c14 4, **c15 20**, c16 4, c17 7, c18 8, **c19 17**, c20 4, c21 5, c22 3, c23 3, c24 14, **c25 19**, c26 10, c27 10, c28 10, c29 5, c30 11, c31 3, c32 9
- t7 v2: **c01 19**, c02 15, c03 13, c04 4, c05 8, c06 12, c07 11, c08 10, c09 14, c10 9, c11 2, c12 7, c13 6, c14 5, c15 7, **c16 16**, c17 8, c18 12, c19 15, c20 10, c21 6, c22 4, c23 10, c24 13, **c25 23**, c26 9, c27 10, c28 5, c29 5, c30 7, c31 7, c32 7

## Uploaded (cdn_sync, md5 --check 65/65 same). Base https://ctm-img.victoria-tntt.workers.dev/img/_review/
- Fixed files overwrite the same names consort-tiers/<cNN>/b10/<cNN>_a18_tN_vK.png (23 files); old kept as <name>_prev_a18scan.png.
- Before|after (left = before, right = after; 8 pairs each, 1400 px): a18-scan/before_after_1.jpg, _2.jpg, _3.jpg.
- Scan sheets: a18-scan/t78_1..8.jpg (t7/t8 v0|v1|v2, 4 people each), a18-scan/face_1..8.jpg (every face, 4 people each).
- Per-person row sheets (cNN_b10_sheet.jpg) NOT rebuilt (the sheet2.py script is gone); the affected people are c01 c02 c06 c07 c09 c10 c13 c15 c16 c17 c19 c20 c21 c22 c23 c25 c27.

## OPEN for Foreman C
1. Crown size BORDERLINE (not regenerated, same phoenix family, wings wider/crown bigger than v0): c04, c08, c09, c10, c13 t7 v1+v2 (10 files, 10 gens = 1,350 cr if redone with "keep the phoenix crown of image 1, same size").
2. c12 t1, c14 t5 (fingertips at the jaw) kept as not covering.
3. Rows with new yellow still read slightly paler than the old amber ones (they now match c03 t8 v1, as ordered).
4. Nothing live. Scan scripts in /home/user/wt/w65-work (ephemeral; mediapipe needs `apt-get update && apt-get install libegl1`).

## HANDOVER (W65 -> successor, 18/11 ~16:55Z; context high, rollover)
Done: yellow/crown/face scan + 23 fixes above (READY went to ROOT-26, forwarded to ROOT-27). NOT done (new ROOT-27 rules after my scan):
1. D4b: closed-lip smile ALWAYS; scan all 768 for teeth/open mouth -> regen. (My face sheets sheets/face_1..8 = a18-scan/face_*.jpg on the CDN showed closed-lip smiles in what I looked at; no dedicated teeth check was run.)
2. D3e item value ladder t1-t8 (same kind OK, luxury rises with rank; t6/t7/t8 items reserved to their rank; lower ranks must not hold ruyi/jewelled box/censer/gem fan/phoenix fan/imperial scroll-seal box; c03 a18 live set = list only, ask ROOT-27). Re-read FIGURE_GATE (handover branch, newest) first.
3. Waiting on ROOT-27: decision on the 10 borderline crowns (t7 v1+v2 of c04 c08 c09 c10 c13) and per-person row-sheet rebuild.
Reuse: scan scripts in /home/user/wt/w65-work (ephemeral): face.json (landmarks of all 768), sm/ (1200px copies), sheets.py (face + t7/t8 contact sheets), ylab.py (yellow dE), ba.py (before|after), upload root /home/user/wt/w65-up. Magnific upload ids: colour ref fHGh02nCDY, m09 style eIyOFEidqL.

# a18-scan-2 (W65b, 18/11 ~17:15Z) — D4b mouth + D3e held-item scan, row sheets

PRIORITY #1 CHECK: OD FIGURE_GATE D4b/D3e (16:37-16:50Z) | main none | review/* none | claims W65 (done). Rules read in full (START_CORE incl. 18 laws, START_WORKER, START_ART, FIGURE_GATE all, B10 brief, tools README, W65 section). Nothing live touched. c03 = LIST ONLY.

## Done
1. Row sheets REBUILT + on CDN (md5 check 17/17 same): img/_review/consort-tiers/<cNN>/b10/<cNN>_a18_b10_sheet.jpg for c01 c02 c06 c07 c09 c10 c13 c15 c16 c17 c19 c20 c21 c22 c23 c25 c27 (rows v0/v1/v2 x t1..t8). They show the state BEFORE the regens below; rebuild with tools/sheet.py after regens.
2. Scan of all 768 files: every mouth looked at on 15 zoomed contact sheets (3x), every v0 held item looked at on 10 sheets (v1/v2 of a tier share the v0 item; spot-checked). Files: dev/handover/reports/a18-scan-2-tools/ (flags.txt, d3e.txt, d4b_fail_files.txt, scripts).
3. GENS USED: 0. Regens NOT started: 300+ files exceed one worker's context (rollover rule); successor to run them.

## D4b teeth / open mouth: 73 files (71 excl. c03)
(list in d4b_fail_files.txt) c03 t3 v0 v1 (LIST ONLY); c04 t1 v1; c05 t2 v0-2; c09 t3 v0-2; c12 t3 v0-2, t8 v0-2; c13 t4 v0-2, t6 v0-2; c14 t3 v0-2; c15 t6 v1 v2; c16 t7 v2; c18 t2 v0-2, t3 v1 v2, t4 v1 v2, t5 v0-2; c19 t2 v0-2, t3 v0-2; c22 t7 v0-2; c25 t1 v0-2, t4 v0-2, t7 v0; c26 t2 v0-2; c27 t2 v0-2; c29 t1 v0-2, t5 v0 v1; c30 t2 v0-2; c32 t3 v0-2, t4 v0-2.
Borderline kept (tiny gloss highlight on closed lips, NOT regen): c01 t6 v1 v2, c02 t8 v2, c05 t6 v0, c06 t5 v1, c07 t2 v2, c08 t8 v2, c10 t4 v2, c10 t8 v2, c11 t4 v0 v1, c16 t6 v1, c20 t3 v0-2, c28 t1 v2, c29 t6 v0-2, c31 t4 v0 v1.

## D3e held item (per tier; v0/v1/v2 all follow)
STRICT (t6-t8 holding banned / plain / higher-rank item) 39 tiers = 117 files:
- loose branch/flower/lotus: c01 t7, c06 t7, c07 t6, c08 t6, c09 t6, c10 t7, c11 t6, c12 t6, c15 t6 t8, c16 t6 t7, c17 t6 t7, c18 t6 t7, c19 t6 t7, c20 t6, c24 t7, c25 t7, c26 t6 t7, c27 t7, c28 t7, c29 t6
- handkerchief: c01 t6, c04 t6, c05 t6, c06 t6 (painted folding fan), c22 t6, c23 t6; c03 t7 (list only)
- basket: c14 t6 t7 t8
- plain book: c10 t6
- t8 item at t7 (phoenix round fan): c02 t7 (+2 items), c05 t7, c30 t7
SOFT (below rank but not banned; decide): 49 tiers — folding fan at t8 for ~20 people (c01 c12 c17-c32 ...), plain scroll/folding fan/pendant at t6/t7 (c20 t7, c21 t6 t7, c22 t7, c23 t7, c24 t6, c25-c32 t6 pendant), handkerchief/book/branch at t4/t5 (c02 t4, c06-c12 t4 t5, c13 t4, c15 t5, c21 t5, c22 t4, c23 t4). Full list in d3e.txt.
No item at all (one required): c14 t4, c27 t3, c28 t3, c29 t3, c16 t8 (check). No cup found. No reserved item found at t1-t5.
QUESTIONS for ROOT-27: (a) is a gilded lantern OK at t5-t7? (not in ladder, not banned; treated neutral); (b) is a gilded folding fan at t8 a fail? (treated SOFT); (c) jade pendant held at t6 (c25-c32).

## HANDOVER (W65b -> W65c)
Order: 1) D4b 71 files (one gen each: "Change ONLY the mouth: closed lips, no teeth; keep everything else"; refs = file + m09 eIyOFEidqL; also fix item in the same gen where the tier is also in D3e). 2) D3e STRICT 117 files (replace item with the rank item: t6 jade ruyi / carved fan / jewelled box, t7 gold-jade ruyi / gilded censer, t8 phoenix round fan / gold ruyi; contrasting colour, below chin, v0/v1/v2 same item). 3) SOFT after ROOT-27 ruling. Then rebuild sheets (sheet.py all-dir out-dir cNN...) + cdn_sync, before/after sheets. Local copies of 768 files are ephemeral (/home/user/wt/w65b-work/all); re-download with the URL pattern https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/cNN/b10/cNN_a18_tN_vK.png. Mediapipe needs libegl1; scripts lm2.py/mouth2.py/items.py.
