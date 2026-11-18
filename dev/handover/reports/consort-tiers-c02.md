# consort-tiers c02 — a18 rank set t1–t8 + Nữ đế (W30, Foreman C ROOT-17; brief consort-tiers-B6.md; FIGURE_GATE A–G)

PRIORITY #1 CHECK: OD 1 | ledger 2 | claims 5 (none RUNNING) | main 0 | review/* 0 | archive 0 — reused: live img/hd/fig-consort-c02-t1..t8-a18.webp, ORIGINAL prompts N-c02-t* (dev/figwork/jobs.json via spec5/lad3: sapphire blue + silver, plum blossoms, jasmine, her props), c12 R38/R40/R42 methods, overlay_m09.py.
Face: STYLE_ANCHOR rejected c02's old slanted narrow eyes → kept her identity (por + face-consort-02) with soft round-almond warm eyes; checked at 2x on faces sheet.

Method: measured the 8 live originals first (overlay_m09.py, MediaPipe mesh): t1 −8.1, t2 −7.8, t3 −1.1, t4 −4.8, t5 −2.9, t6 −3.4, t7 −9.2, t8 −5.3 %. t3–t6 pass A → local mouth retouch only (Round 40 method, no regen; brighter smile). t1, t2, t7, t8 failed → regen with gpt-2-6 (folder ba4aecfe…), refs: live original (design/pins/held item/pose, same robe colour, same crown), m09 eIyOFEidqL, c02 por, face-consort-02; prompt = the original outfit wording (sapphire blue/silver, plum blossom, jasmine, held items as live) + relative head-size sentence ("N % larger than reference 1") + brighter closed-lip smile + bare forehead. No tassel added per rank; t7 ≠ t8 kept (t7 one large spread-wing phoenix + scroll; t8 grander crown with few clean dangles + round fan). No rank design changed (none looked too alike).
Nữ đế: own design (no live original), per FIGURE_GATE F: black + gold robe, gold dragon roundel + phoenixes, imperial-yellow inner robe, stiff short slightly pointed cầu vai, phoenix+dragon crown with a row of 7 lưu (short outer, longer middle) to the forehead only, no side dangles, jade seal in both hands. Differs from her t8 (blue, peony). c12 Nữ đế used only as richness ref.

| figure | changed what | gens | face % vs m09 (±5 %) | pass |
|---|---|---|---|---|
| t1 Đáp ứng | regen (head +8 %), brighter smile | 1 (−1.5) | −1.5 | PASS |
| t2 Thường tại | regen (head +8 %), brighter smile | 1 (+0.6) | +0.6 | PASS |
| t3 Quý nhân | live + mouth retouch | 0 + 1 retouch | −0.9 | PASS |
| t4 Tần | live + mouth retouch | 0 + 1 retouch | −3.6 | PASS (loosest-but-OK) |
| t5 Phi | live + mouth retouch | 0 + 1 retouch | −3.9 | PASS |
| t6 Quý phi | live + mouth retouch | 0 + 1 retouch | +0.9 | PASS |
| t7 Hoàng quý phi | regen, head +11 % → +18 % | 3 (−7.5, −3.2, −8.5) | −3.2 | PASS |
| t8 Hoàng hậu | regen, head +6 % → +15 % | 3 (−8.6, +3.0, +3.8) | +3.0 | PASS |
| Nữ đế | new design | 2 (+0.9, +1.4; picked #1, clearer dragon+phoenix crown) | +0.9 | PASS |
Gate: A all 9 within ±5 % (overlay sheet), skull top→feet row on red lines; B pins/crown follow the live original of each rank (t1 new pins = flower + jewelled sprigs, a little fewer than live); C robe/embroidery/colour as live, Nữ đế rich black+gold; D bare forehead 100 % (faces sheet), closed-lip smile on all (none shows teeth), eyes round-almond.
Credits: 10 gens × 80 = 800 + 10 bg removals × 3 = 30 + 4 retouches × 175 = 700 → ~1530 cr.
Weak points: (1) t3–t6 are the live images re-fitted into 768x2000 (scaled, not re-drawn); retouched smile is only slightly brighter than live (subtle at game size; a stronger one = another 175 cr each). (2) t4 −3.6 / t5 −3.9 sit near the tolerance (live was −4.8 / −2.9; scale jitter of the tool). (3) New t1 hairpins are a bit simpler than the live t1. (4) Head size needed relative wording 15–18 % for t7/t8 (noisy ±4 % per gen). (5) Nothing live, no fig-ht.json rows. Working files (masks, RGB crops) in img/_review/consort-tiers/c02/_w/ — wipe with the verdict.
Files (md5-verified, https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/c02/): c02_a18_t1..t8.png, c02_a18_nude.png (768x2000 transparent), c02_a18_row8.jpg, c02_a18_overlay_m09.jpg, c02_a18_live_vs_new.jpg, c02_a18_faces.jpg.
~100% xong c02 / ~0% chơi được (nothing live; owner review pending).

## B7 (W34 painter A, 18/11; brief consort-tiers-B7.md; old-figure method, one colour per rank)
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 5 | main 0 | review/* 1 (consort-tiers-c03, W31 B6, superseded) | archive 0 — reused: old-figure pipeline of batch-consort-rest.md (W3 Workflow) + batch-consort-rest-B.md (W7 Pipeline), palette Q rotation (recolour-sample.md), her LIVE img/hd/fig-consort-c02-t1..t8-a18.webp as image 1. No m09, no proportion image, no ratio target.

ROW SCAN (C3b) of live t1..t8 (all sapphire blue before): rank | pins look like | change written in prompt | robe colour
| t1 | t2/t3 (flower + small sprigs) | none | wisteria (Q1) |
| t2 | t1, t3 | more flowers + longer pearl dangles | apricot (Q2) |
| t3 | t2 | small gold flower-cluster comb + pink flowers + long dangles | sky blue (Q3) |
| t4 | none (centre crown-comb) | none | emerald (Q4) |
| t5 | none | none (varied-length asymmetric pins as live) | rose (Q5) |
| t6 | t7 (gold crown) | none (phoenix crown kept) | indigo (Q6) |
| t7 | t8 (phoenix) | none (one large spread-wing phoenix, ≠ t8) | crimson (Q7) + imperial yellow inner/borders/sash |
| t8 | t7 | none (paired phoenix, few dangles) | imperial yellow mixed with crimson + jade |
| Nữ đế | new | own design | black + gold, yellow inner robe |
No Q colour clashed or repeated a neighbour family; t6 indigo is the nearest to her old blue but differs from t5 rose and t7 crimson.

| figure | colour | changed | gens | alpha / look |
|---|---|---|---|---|
| t1 Đáp ứng | wisteria | colour, brighter smile | 1 | PASS |
| t2 Thường tại | apricot | colour, more flowers/longer dangles, smile | 1 | PASS |
| t3 Quý nhân | sky blue | colour, gold flower-cluster comb, smile | 1 | PASS |
| t4 Tần | emerald | colour, smile | 1 | PASS |
| t5 Phi | rose | colour, smile | 1 | PASS |
| t6 Quý phi | indigo | colour, smile | 1 | PASS |
| t7 Hoàng quý phi | crimson + yellow | colour, smile | 1 | PASS |
| t8 Hoàng hậu | yellow + crimson/jade | colour, smile | 1 | PASS |
| Nữ đế | black + gold | new design: phoenix+dragon crown, lưu to forehead, side-dangle pins both sides, woman's layered dress, stiff short pointed shoulder piece, dragon+phoenix embroidery, jade seal both hands | 1 | PASS |
Checks: every image looked at; faces sheet shows bare foreheads, closed-lip brighter smiles (no teeth), her own face; body/head match the live figure (live_vs_new sheet); alpha 0..254, nothing touching canvas edge; row on red skull-top/feet lines (MediaPipe method of overlay_m09, row part only). Weak points: embroidery on t1/t2 is slightly sparser than live; hand poses follow live (t4/t5 branch hold unchanged).
Credits: 9 gens x 135 = 1215 cr (no retries).
Files (md5-verified): https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/c02/b7/ — c02_a18_t1..t8.png, c02_a18_nude.png (Nữ đế), c02_a18_row9.jpg, c02_a18_live_vs_new.jpg, c02_a18_faces.jpg. Nothing live, no manifests.
~100% xong c02 B7 / ~0% chơi được.
