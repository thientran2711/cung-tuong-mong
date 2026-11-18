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

## STEP 2 — LIVE push of c03 a18 t5 + t6 (Foreman C GO 18/11 ~15:15Z), W50 method (reports/c03-a18-live.md)
PRIORITY #1 CHECK: reused finish_fig.py/fit_fig/qa_fig, headtop.py, mkfit/verify.py, fixtoil.py, cdn_sync.py, manifest_guard.py, fullbody-frame-scan.js. No new script. Re-read FIGURE_GATE.
Source = the fixed c03 b10 v1 (= B8) t5/t6 PNGs.
- LIVE on CDN (same names): `fig-consort-c03-t5|t6-a18.webp` (900 tall, widths 423 / 476), `hd/fig-…` (1800 tall), `por-…` (384x506, face match 0.99 vs old por). No tn twins exist for t5/t6. cdn_sync --check same 6/6. Old twins in /home/user/wt/w53/live/_old (scratch, revert = finish_fig on old masters; old B8 masters still on CDN img/_review/consort-tiers/c03/b8/ + *_prev_phx.png).
- `fig-ht.json` (live copy, 8893 rows): t5 278→285, t6 310→313; nothing else changed. 
- `mk-fit/consort-c03.json`: verify.py --fix on fig+por t5,t6: fig t5 d=.118 and fig t6 d=.150 were flagged and re-seated; por t5 .100 and por t6 .033 ok. Only those 2 entries changed. `mk-fit/md5.json` updated for the 4 pictures.
- `toil-fit2.json`: fixtoil re-run on the live copy: fixed 0, nothing changed (not re-pushed).
- manifest_guard --live-check: PASS; cdn_sync held 0; FIGURES*.json unchanged (same names, no shrink).
- Repo copies: branch `review/c03-a18-live` new commit d7aadcc (fig-ht.json, consort-c03.json, mkfit/md5.json) on top of 982beea, for MAIN to land. Main untouched.
- LOOK (local index.html of review/c03-a18-live, live CDN figures, fullbody-frame-scan.js): https://ctm-img.victoria-tntt.workers.dev/img/_review/phoenix-fix/live/ {755x1000,1180x820}-c03-{t5,t6}.jpg. I looked at all 4: crown, hands, feet inside the frame, no page error; scan ALL OK, skull>feet identical for t5/t6 (641.4 Fold, 533.5 iPad), cut 0, squeeze 1.00. Note: t6 (wide sleeve + lantern) overlaps 5–7 text lines by the sleeve edge (7 lines on Fold, 5 on iPad); this is the robe width of the live t6 (W50 reported the same t6 stage case), not new.
- Row sheets rebuilt (sheet2.py, v0/v1/v2 x t1–t8) and re-uploaded: consort-tiers/c03/b10/c03_a18_b10_sheet.jpg, c07/b10/c07_a18_sheet.jpg, c30/b10/c30_a18_b10_sheet.jpg.
- Credits: 0 extra (no new gens).
~100% xong / ~100% chơi được (c03 t5+t6 live on CDN; repo rows pending MAIN landing review/c03-a18-live).
