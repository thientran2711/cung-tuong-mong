# phoenix-t1t6-fix — W53 (Foreman C ROOT-24 brief phoenix-t1t6-fix), 18/11
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 (brief line, prio1.sh 18/11 ~15:00Z). Read in full: START_CORE, START_WORKER, START_ART, FIGURE_GATE, consort-B10, consort-b10-tools README.

## Scan (32 consorts x t1-t6 x v0/v1/v2 = 576 PNGs, all downloaded; one 18-cell sheet per person looked at, every suspect bird zoomed)
Phoenix rule = FIGURE_GATE C4d (t1-t6 never phoenix). Decision rule: crested bird with a long plume tail = phoenix (phụng); red-crowned cranes (hạc), swallows, sparrows, butterflies are fine.
| person | rank | version | phoenix |
|---|---|---|---|
| c03 | t5 Phi | v1 | YES (new find, not in brief) |
| c03 | t6 Quý phi | v1 | YES (the known one = live c03 b8 t6) |
| c07 | t5 Phi | v0 (original), v1, v2 | YES x3 (two crested plume-tail birds per robe) |
| c30 | t5 Phi | v1 | YES (one crested bird, lower robe) |
| all other 26 persons, all other tiers/versions | | | no (c07 t4/t6, c08, c10, c11, c13, c23, c31 carry cranes/swallows only = allowed) |
Borderline: c07 t5 v0 birds are white, crested, long-tailed (peacock/phoenix-like); treated as phoenix (owner rule applied, never asked). Cranes on c07/c08/c10/c11/c13/c23/c31 are red-crowned cranes, left alone; Foreman may overrule.

## Fix (C4a one-gen: refs = the figure itself (image) + m09 eIyOFEidqL (style); prompt copies face/hair/headdress/pose/colour/held item/fabric, replaces ONLY the bird motifs with stitched peony/lotus sprays + small butterflies (c03 t6 also small sparrows); embroidery clause per C1; no soft/feet wording; transparent 2K 1024x2304, gpt-2-6, folder ba4aecfe)
| figure | gens | result |
|---|---|---|
| c03 a18 t5 v1 | 1 | PASS (phoenix gone, pose/colour/scroll/pins identical) |
| c03 a18 t6 v1 | 1 | PASS (lantern kept, flowers+butterflies+small sparrows) |
| c07 a18 t5 v0 | 1 | PASS |
| c07 a18 t5 v1 | 1 | PASS |
| c07 a18 t5 v2 | 1 | PASS |
| c30 a18 t5 v1 | 1 | PASS (butterfly + peonies) |
Credits: 6 gens x 135 = 810 (balance before 774,952). Gate G table: all 1 gen to PASS. Proportion gate not used for women (FIGURE_GATE A1); compared before|after side by side.

## CDN (https://ctm-img.victoria-tntt.workers.dev), md5 verified (cdn_sync --check same 18/18, curl md5 = local)
- Fixed files over the same names: img/_review/consort-tiers/{c03,c07,c30}/b10/<cNN>_a18_tN_vV.png
- Old files kept: same folder, <name>_prev_phx.png
- Before|after sheets: img/_review/phoenix-fix/<name>_before_after.jpg (6 files)
- NOT updated: the per-person row sheets (v0/v1/v2 x t1-t8) of c03, c07, c30 still show the old figures.
- NOTHING live touched. c03 a18 t6 v1 (b8) is the LIVE c03 t6: Foreman C decides the live push (W50 method, reports/c03-a18-live.md). c03 t5 v1 / c07 / c30 are review-only. c03 t5 v1 may also be live if the b8 set was shipped — check.

~100% scan/fix done, 0% live (waiting Foreman).
