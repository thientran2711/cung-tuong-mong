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

## B8 (W34, 18/11; KEPT SET 03314a1 — TWO STEPS: exact copy, then recolour, no m09; t1–t8, no Nữ đế)
ROOT-18 STOP (owner: images already drawn stay, no redraw): this no-style two-step set is the c02 B8 deliverable. Method: STEP 1 "Reproduce image 1 exactly …" (1024x2304, ref = live hd figure only, transparent); STEP 2 "Edit image 1. Recolour ONLY the robe fabric …" (ref = the copy only). bbox w/h diff vs live (copy / recolour): t1 +0.7/+0.9, t2 +0.8/+0.9, t3 +0.7/+0.9, t4 +1.1/+1.0, t5 +2.7/+3.2 FAIL, t6 +0.1/-0.0, t7 +2.0/+2.9 FAIL, t8 +0.2/+0.3 (t5/t7 hit the 3-gen cap). Colours: lavender, peach, misty blue-grey, sage, blush pink, periwinkle, dusty rose-red + pale yellow, soft gold+jade+blush.
Files (md5-verified, restored after an accidental overwrite): https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/c02/b8/ — c02_a18_t1..t8.png, c02_a18_copy_t1..t8.png, c02_a18_row8.jpg, c02_a18_live_vs_new.jpg (live | copy | recolour). Nothing live.

## B8b (W34, 18/11; addenda 1-2: m09 in the STYLE slot; NOT the kept set — owner: "ảnh nào vẽ rồi thì thôi")
Method (1024x2304 canvas ≈ live 0.44; gpt-2-6 does not support 9:21): STEP 1 = "Reproduce image 1 exactly …" ref = live hd figure; STEP 2 = "Edit image 1. Recolour ONLY the robe fabric to <soft colour> …" ref = the step-1 copy, plus m09 (eIyOFEidqL) as STYLE ref (type style, never as image) with the skin/rendering clauses of batch-consort-ty §RECIPE ("Luminous smooth porcelain skin … NO dark contour line around face, nose or jaw …") and "style reference gives only drawing style, skin rendering and fabric texture, never its colours or shape".
FINDING: m09 in the style slot leaks its PINK robe colour into step 1 (5 of 8 copies came out pink even with "same colours as image 1", only t4/t5/t8 stayed blue). So step-1 copies use the best colour-true copy: t4, t5, t8 = copy made WITH m09 style; t1, t2, t3, t6, t7 = copy made WITHOUT the style ref (colour true). Step 2 (recolour) uses the style ref for all 8 and shows no leak (colours exactly as listed). Earlier sets without the style ref are superseded.
| rank | colour | copy diff vs live | recolour diff vs live |
|---|---|---|---|
| t1 | soft lavender | +0.7 % | +0.8 % |
| t2 | pale peach | +0.8 % | +0.8 % |
| t3 | misty blue-grey | +0.7 % | +1.0 % |
| t4 | soft sage green | -0.0 % | -0.1 % |
| t5 | blush pink | +3.0 % FAIL (±1.5) | +4.0 % FAIL |
| t6 | muted periwinkle | +0.1 % | -0.3 % |
| t7 | dusty rose-red + pale imperial yellow inner/borders | +2.0 % FAIL | +2.4 % FAIL |
| t8 | soft golden yellow + jade + blush | +1.3 % | +1.2 % |
t1–t4, t6, t8 pass; t5 and t7 are outside ±1.5 % (copy step already hit the 3-gen cap without the style ref; by eye pose/cut match). Alpha 0..254, nothing touches the canvas edge (top alpha <= 6).
Credits: single-step first attempt 18 gens + no-style two-step 20 gens + with-style copies 16 gens (two rounds of 8; 1st round leaked pink) + with-style recolours 8 gens = 62 gens x 135 = ~8370 cr.
Files (md5-verified): https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/c02/b8-style/ — c02_a18_t1..t8.png (final recoloured), c02_a18_copy_t1..t8.png (step-1 copies used), c02_a18_row8.jpg (uniform scale, skull top on the red line), c02_a18_live_vs_new.jpg (live | copy | recolour). Nothing live.
~100% xong c02 B8 / ~0% chơi được.

## B9 soft (W34, 18/11; ROOT-18 owner order: costumes must be soft and flowing like the approved c03 b8 set; t7/t8 more soft yellow + a clear PHOENIX)
PRIORITY #1 CHECK: reused the c02 b8-style recolours (CDN c02/b8-style/), the owner-approved c03 b8 t4/t5 as softness refs, m09 in the STYLE slot; no new method.
Compared every rank with the c03 standard (soft translucent layered silk, relaxed sleeves, flared layered hem):
| rank | verdict | action | gens |
|---|---|---|---|
| t1 lavender, t2 peach, t3 blue-grey | already soft, light silks, relaxed sleeves | kept (b8-style) | 0 |
| t4 sage, t5 blush pink | soft, layered, flowing like c03 t4/t5 | kept | 0 |
| t6 periwinkle | STIFF: hard pearl cape + rigid vertical embroidered panel | redrawn costume soft (translucent layers, flared hem), kept trâm/face/pose/lantern, phoenix stitched | 1 |
| t7 Hoang quy phi | stiff column, heavy rose | redrawn soft: dusty rose + MORE soft pale yellow (inner robe, borders, sash), large golden PHOENIX on the skirt and sleeve, kept crown/trâm/face/pose/scroll | 2 |
| t8 Hoang hau | stiff column, heavy sleeves, yellow barely there | redrawn soft: mostly soft golden yellow, gentle jade/blush accents on borders, large golden PHOENIX, kept phoenix crown/face/pose/round fan | 2 |
Refs: her current figure (image 1) + c03 t4 + c03 t5 (image refs, softness only) + m09 (style slot); t7/t8 second pass edited the first soft result for yellow + bolder phoenix. Looked at every image: faces same, forehead bare, closed smile, crown/trâm kept, phoenix clearly visible at row size, colours soft, nothing glaring. bbox w/h vs live: t6 +1.6 %, t7 +11.7 %, t8 +10.2 % (the soft flared hem/sleeves are wider than the old stiff column; intended, not re-measured as a pass criterion).
Credits: 5 gens x 135 = 675 cr.
Files (md5-verified) https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/c02/b8-style/ — c02_a18_t1..t8.png (final), c02_a18_t6/t7/t8_prev.png (previous), c02_a18_soft.jpg (t1..t8 one row on the red skull-top/feet lines). Nothing live.
~100% xong c02 soft / ~0% chơi được.

### B9 soft — update (no phoenix below t7; m09 per figure)
Owner rule: ranks below Hoàng quý phi never carry a phoenix (flowers, birds, butterflies only); t7/t8 flowers + phoenix together, t8 clearly more soft yellow. Redone: t5 and t6 (phoenix motifs replaced by stitched peonies, plum blossoms, small birds, butterflies; everything else kept), 1 gen each (2 x 135 = 270 cr), files c02_a18_t5/t6.png (old in *_prev.png), sheet c02_a18_soft.jpg rebuilt. t1–t4 checked: flowers only, no phoenix. t7 = dusty rose + soft yellow with flowers + phoenix; t8 = mostly soft golden yellow with flowers + phoenix.
m09 (eIyOFEidqL) in the STYLE slot, per figure: t1–t4 recolours (b8-style, yes), t5 recolour + no-phoenix redo (yes), t6 soft redo + no-phoenix redo (yes), t7, t8 soft redo + second pass (yes). Image refs were only her own figure (+ c03 t4/t5 for softness on the first soft pass).

## B10 three versions (W40, 18/11; brief consort-B10.md; base = LIVE originals img/hd/fig-consort-c02-tN-a18.webp)
PRIORITY #1 CHECK: reused W34 method + scripts (consort-b10-tools), live uploads of c02 (ids in the c01 report handover); FIGURE_GATE C3/C4a–C4e/D2/D3/D3b + B10 re-read before this person; claims W40 B10. Embroidery clause (thread stitched flat into the cloth, not appliqué) was NOT in the first 24 prompts; c02 looks flat by eye, zoomed t4–t6.
Rules ticked: [x] one gen per figure, refs = live original + m09 STYLE, "copy EXACTLY … only change colour"; v0 names the original slate/sapphire blue (no pink leak) [x] no soft/flowing wording [x] feet never in a prompt [x] t1–t6 no phoenix (live t4 phoenix on the skirt and t6 phoenixes replaced by flowers/small birds/butterflies; checked at zoom) [x] t7/t8 phoenix MAIN (t7 retried with enlarged phoenix on both shoulder panels + one large phoenix on the skirt; t8 phoenix on the sleeves) [x] t7 v1/v2 own colour main (sage green / dusty rose-mauve) + deeper warm golden yellow inner robe/borders/sash [x] t8 v1 warm golden yellow, v2 jade green + yellow [x] one held item: t1 jade pendant, t2 round fan, t3 folding fan, t4 flowering branch (live handkerchief removed), t5 live had a handkerchief drift → removed (only the raised hand touching a hairpin), t6 lantern, t7 scroll (+ round-fan pendant on the sash as in live), t8 round fan [x] bare forehead, no dot/mole, closed-lip smile (24-face contact sheet checked) [x] colours soft/muted, no two alike per rank; v1 t6 teal-aqua next to t7 sage = two neighbouring greens only.
Colours: v0 original (blue); v1 = celadon, lilac, apricot, dusty rose, butter-cream, teal-aqua, sage+yellow, golden yellow; v2 = blush pink, butter-cream, lavender, aqua, dusty mauve, peach, rose-mauve+yellow, jade+yellow.
Gens: 24 + t5 3 + t7/t5 retry 4 + t7 phoenix 3 = 34 x 135 = 4590 cr (t5 x3 reason: handkerchief = second item; retry IoU; t7 phoenix too small).
IoU vs live (alpha, uniform scale on bbox height): v0 t1 98.9 t2 98.3 t3 98.8 t4 98.2 t5 95.0 t6 97.7 t7 89.3 t8 93.7 | v1 t1 98.4 t2 98.2 t3 98.1 t4 95.2 t5 94.3 t6 96.5 t7 91.3 t8 97.0 | v2 t1 98.2 t2 97.9 t3 98.4 t4 96.1 t5 94.0 t6 97.8 t7 91.5 t8 96.9. Below 95 %: t7 (all) + v0 t8 + v1/v2 t5 — the big phoenix widens the sleeve spread / raised-hand pose of t5 shifted slightly; silhouettes look like the live ones by eye; kept (owner phoenix rule mandatory).
Files (md5 --check same 25/25): https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/c02/b10/ — c02_a18_tN_v0|v1|v2.png (24) + c02_a18_b10_sheet.jpg. Nothing live.
~100% xong c02 B10 / ~0% chơi được.
