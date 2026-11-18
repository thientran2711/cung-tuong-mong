# consort-tiers c04 — B7 (W34 painter A, 18/11) — STOPPED by ROOT-18 before finishing

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 5 | main 0 | review/* 1 (consort-tiers-c03, superseded) | archive 0 — same pipeline as c02 B7 (old-figure method, live hd t1..t8 as image 1 + 4 faces).
Status: STOPPED on ROOT-18 order (owner rejected the B7 look: colours too loud/garish, pose/outfit cut changed vs live). Nothing from c04 uploaded to the CDN, no c04 READY sent, nothing live.
Done before the stop: row scan + 9 gens (t1..t8 + Nữ đế), 1 gen each, 9 x 135 = 1215 cr. Local-only (scratch, not uploaded): row on red lines, faces, live_vs_new reviewed by eye.
Scan: live c04 was all purple. t5 live had a dot on the forehead; t8 live held a teacup; t5/t6 crowns alike (t6 asked for a taller phoenix crown). Planned colours (Q rotation p=3): t1 sky blue, t2 emerald, t3 rose, t4 indigo, t5 crimson, t6 teal, t7 terracotta (plum skipped: = her old purple) + yellow, t8 yellow + crimson/jade.
Known fail in this set: t5 cut off at the bottom canvas edge (feet touch the edge) — would have needed a regen. Nữ đế showed a red bead at the forehead centre (lưu end).
~40% xong c04 / ~0% chơi được.

# consort-tiers c04 — a18 t1–t8, section "B9" (W35 painter B; brief consort-B9.md)
## B9
PRIORITY #1 CHECK: approved sample c03 b8 (OD owner "C03 … cho qua"); reused c03 method (reports consort-tiers-c03.md), FIGURE_GATE C2/C3/C4b/C4c/C4d/D3. Base = live img/hd/fig-consort-c04-tN-a18.webp (no morning-fixed version exists).
ROW SCAN: whole live row = one purple lotus/orchid robe. Faults found in the live row: t2 held TWO items (branch + round fan) → one item (branch); t5 had a small golden phoenix + forehead dot → small crane, bare forehead; t6 embroidered phoenix + forehead dot + stiff pearl cape → peonies/butterflies, soft draped shoulder, bare forehead; t7 stiff pearl cape → soft draped shoulder, phoenix kept; t8 held a TEACUP + stiff cape → one round fan, soft shoulder, phoenix kept.
Method: STEP 1 exact copy (image ref = live fig only, NO m09; fixes above in the prompt, "same silhouette/width" for t6–t8 after a first too-airy redraw widened them +22…+55 %); STEP 2 recolour (image ref = copy, m09 eIyOFEidqL in STYLE slot + skin clause), colour only.
| rank | colour | live bbox w/h | copy | recolour (Δ live) | gens copy+recolour |
|---|---|---|---|---|---|
| t1 | soft powder blue | 0.365 | 0.372 | 0.373 (+2.0 %) | 1+1 PASS |
| t2 | soft sage | 0.402 | 0.410 | 0.411 (+2.2 %) | 1+1 PASS |
| t3 | dusty pink | 0.328 | 0.329 | 0.330 (+0.7 %) | 1+1 PASS |
| t4 | pale apricot | 0.388 | 0.398 | 0.398 (+2.7 %) | 1+1 PASS |
| t5 | soft celadon aqua (small crane, no phoenix) | 0.427 | 0.438 | 0.438 (+2.7 %) | 1+1 PASS |
| t6 | coral-rose (no phoenix) | 0.376 | 0.382 | 0.382 (+1.6 %) | 2+1 PASS |
| t7 | misty blue-grey + soft pale yellow inner/borders/sash, phoenix | 0.368 | 0.378 | 0.380 (+3.1 %) | 2+1 borderline (3 %) |
| t8 | soft golden yellow + pale jade/dusty rose, phoenix, one round fan (no cup) | 0.317 | 0.345 | 0.351 (+10.8 %) | 2+1 FAIL ±3 % (cup→fan changes the arm pose; looks right by eye) |
By eye: pose/turn/cut/headdress/face same as live; soft pastel colours; t7/t8 phoenix visible, t1–t6 none; one held item each, no cup; skin smooth. Caveat: t6 coral-rose is the most saturated of the set; t8 not regenerated a 3rd time.
Credits: 8+3 copies + 8 recolours = 19 gens × 135 = 2565 cr (3 copy regens for t6–t8 first pass superseded). Gen ids final: copies t1 LwohKatswO t2 LwohKChswO t3 6Aq1OgfiJO t4 xSXtbFvjfW t5 1le8HHir4r t6 mERzopuhJQ t7 jUBmk5wLD0 t8 KLDBHqjkqp; recolours t1 tC3Go1zmZJ t2 dtPiDKHXSL t3 w4vugVp7EI t4 kspobGA16B t5 KLDBqnMkqp t6 kspo5HQ16B t7 gOtfslySXO t8 TdUy0MTVNR.
Files (CDN img/_review/consort-tiers/c04/b9/): c04_a18_t1..t8.png, c04_a18_row8.jpg (uniform scale, skull top on upper red line), c04_a18_live_vs_new.jpg (live | copy | recolour). Nothing live.
~100% xong c04 / ~0% chơi được.


## B9 v2 — c04 t6/t7/t8 redone (ROOT-18 after owner: fabric like t5 not voile/ruffles; t8 more yellow; phoenix main + STITCHED; hand grips fan)
Method: 1 gen each. Image 1 = the step-1 copy (soft-shoulder, no cup) of that rank, image 2 = c04 t5 final (celadon) as FABRIC reference, m09 eIyOFEidqL STYLE slot. Prompts: fabric like image 2 (smooth silk with body, soft natural drape; NOT thin voile, NOT rippled/frilly layers); t6 soft coral-rose, peonies+butterflies only, handkerchief really held; t7 blue-grey outer + generous soft golden-yellow inner robe/borders/sash, large central phoenix as main stitched embroidery, hand grips the round fan; t8 clearly golden YELLOW main colour (not glaring), large central phoenix main motif stitched with thread texture following folds, flowers secondary, hands grip the round fan.
Zoom check (torso crops): embroidery reads as stitched (thread texture, follows folds), hands wrap the handle/handkerchief, no floating item. Gens: 3 (405 cr); ids t6 fHG0F8UCDY, t7 P3u5i7l42C, t8 4RQK34W9Aa. Old v1 t6–t8 kept as c04_a18_t6_prev.png … Files in CDN img/_review/consort-tiers/c04/b9/: c04_a18_t6/t7/t8.png (new), *_prev.png, row8, live_vs_new (live | copy | final; t6–t8 final = new), c04_t5678_full.jpg and c04_t5678_zoom.jpg.
~100% xong c04 / ~0% chơi được.


## B9 v3 — c04 t6/t7/t8: ORIGINAL design, RECOLOUR ONLY (ROOT-18 change after owner: "ảnh gốc rất đẹp … màu tím của hoàng hậu cũng cực kỳ đẹp … chỉ đổi màu")
Supersedes the v2 redesign (fabric/phoenix-main redraw; kept in CDN as c04_a18_t6_v2/t7_v2/t8_v2.png, and v1 soft redesign as *_prev.png). Method: STEP 1 exact copy of the ORIGINAL live figure (no redesign, no soft-shoulder change; only two forced swaps: t8 teacup → small round fan in the same hand position; t6 phoenix embroidery → peonies+butterflies in the same places per the owner's "t1–t6 never a phoenix"), STEP 2 recolour of the copy (m09 eIyOFEidqL STYLE slot + skin clause), every design detail/pearl cape/layers/embroidery/crown/richness kept.
| rank | colour | live bbox w/h | copy | recolour (Δ live) | gens |
|---|---|---|---|---|---|
| t6 | soft coral-rose | 0.376 | 0.397 | 0.401 (+6.5 %) | 1+1 |
| t7 | misty blue-grey outer + soft golden-yellow inner/borders/sash (phoenix kept) | 0.368 | 0.382 | 0.386 (+4.7 %) | 1+1 |
| t8 | warm golden yellow, original purple design kept in yellow (phoenix kept, one fan) | 0.317 | 0.340 | 0.342 (+7.9 %) | 1+1 |
By eye (c04_t678_live_vs_new.jpg): design/embroidery/crown/cape identical to the original, only colour (+ the two forced swaps). bbox over ±3 % because the pose is the same but the model redraws the sleeves a bit wider. t1–t5 unchanged from v1.
Credits: 6 gens = 810 cr (3 v1 + 3 v2 redesign gens = 810 superseded). Gen ids: copies t6 vQ2Wq74a47 t7 P3u528V42C t8 ksp8SWN16B; recolours t6 N2H1nsA6D9 t7 vQ2WbpBa47 t8 dtP3ftnXSL.
Files CDN img/_review/consort-tiers/c04/b9/: c04_a18_t6/t7/t8.png (new), *_v2.png, *_prev.png, row8, live_vs_new (live|copy|final), c04_t678_live_vs_new.jpg, c04_t5678_full/zoom.jpg.
~100% xong c04 / ~0% chơi được.


## B9 v4 — c04 t6/t7/t8 with the owner's ONE-GEN method (ROOT-18: m09 STYLE slot + live original, "copy EXACTLY … ONLY change the robe colour", no soft words)
Supersedes v3 (two-step; kept as c04_a18_t6_v3/t7_v3/t8_v3.png). One gen per figure: image ref = the LIVE original, style slot = m09 eIyOFEidqL; prompt "Copy EXACTLY everything from image 1: hair, headdress, face, costume, pose, proportions, fabric material and stitching. ONLY change the robe colour to <tone>." Forced swaps only: t6 phoenix embroidery → peonies+butterflies (owner: t1–t6 never a phoenix), t8 teacup → small round fan.
| rank | colour | bbox w/h live → new | gens |
|---|---|---|---|
| t6 | soft coral-rose | 0.376 → 0.384 (+2.2 %) | 1 PASS ±3 % |
| t7 | misty blue-grey + soft golden-yellow inner/borders/sash, phoenix kept | 0.368 → 0.395 (+7.2 %) | 1 (over ±3 %) |
| t8 | warm golden yellow, original design/phoenix kept, fan | 0.317 → 0.361 (+13.9 %) | 1 (over ±3 %; cup→fan changes the arm) |
By eye (c04_t678_live_vs_new.jpg): design, embroidery, crown, cape, fabric identical to the original, colour only; closer to the original look than v3. Credits 3 gens = 405 cr. Gen ids t6 JNfHG0ROq4, t7 O6CqzMSynm, t8 MB79akmDCm. Files CDN img/_review/consort-tiers/c04/b9/: c04_a18_t6/t7/t8.png (v4), *_v3.png, *_v2.png, *_prev.png, row8, live_vs_new (live|copy|final, t6–8 copy = v3 copy), c04_t678_live_vs_new.jpg, c04_t5678_full/zoom.jpg. t1–t5 unchanged.
~100% xong c04 / ~0% chơi được.


## B9 v5 — c04 t7 redone (owner: Hoàng quý phi's yellow must match Hoàng hậu's)
One gen, one-gen method: image 1 = LIVE c04 t7, image 2 = approved new c04 t8 (colour reference), m09 STYLE slot. "Copy EXACTLY … ONLY change the robe colour: main colour = the SAME warm golden yellow as image 2; keep a small soft misty blue-grey only as a minor accent." Result: same warm golden yellow as t8, blue-grey only on sleeve linings/small panels; original design, phoenix (sleeve, chest, hem), pearl cape, crown, round fan kept. bbox w/h live 0.368 → 0.405 (+10.0 %, wider sleeves; not regenerated). 135 cr, gen id SymEYo1Ub8. Previous t7 (blue-grey + yellow) kept as c04_a18_t7_v4.png. Files: c04_a18_t7.png, c04_a18_t7_t8.jpg (pair), row8, live_vs_new.
~100% xong c04 / ~0% chơi được.


## B10 — c04 t1–t8 × v0/v1/v2 (W39, 18/11)
PRIORITY #1 CHECK: brief consort-B10.md, FIGURE_GATE C4a/C4b/C4d/D2/D3, c04 B9 v1–v5 (reused as v1), OD owner quote in brief; nothing new built, same one-gen method.
Method: ONE gen per image, gpt-2-6, 9:16 2K transparent, refs = live hd original fig-consort-c04-tN-a18 (image) + m09 eIyOFEidqL (style slot). Prompt "Copy EXACTLY … ONLY change the robe colour to X" (v0: "do not change any colour"). Forced swaps: forehead dot removed (t5/t6), t2 one item, t5/t6 phoenix → crane / peonies+butterflies, t8 cup → round fan; t7/t8 phoenix kept.
| rank | v0 (original) | v1 (= b9) | v2 |
|---|---|---|---|
| t1 | purple | powder blue | buttery cream |
| t2 | purple, one branch | sage | powder blue |
| t3 | purple | dusty pink | pale apricot |
| t4 | purple | pale apricot | pale mint |
| t5 | purple, small crane | celadon aqua | dusty rose |
| t6 | purple, peonies+butterflies | coral-rose | soft sage |
| t7 | purple, phoenix | warm golden yellow (blue-grey accent) | misty blue-grey + same golden yellow inner/borders/sash, phoenix |
| t8 | purple, phoenix, fan | warm golden yellow | crimson-rose + gold trim, phoenix, fan |
Redone after looking: t7 v0 first came out PINK (kept as c04_a18_t7_v0_pink_rejected.png) → regen with "same deep violet-purple"; t7 v2 first = yellow like v1 → regen as blue-grey + yellow.
By eye: pose/headdress/face/embroidery as live, bare forehead, one held item, no cup, t1–t6 no phoenix, t7/t8 phoenix. No bbox gate measured (women: no gate, FIGURE_GATE A1). Not checked: t8 v2 crimson is the most saturated.
Gens: 15 + 2 redo = 17 × 135 = 2295 cr (v1 reused). Gen ids v0 t1 SymEMoHUb8 t2 s78aT58l8e t3 mERnJozhJQ t4 u5YM6ElQLD t5 WDlJ5TTcXe t6 w4vQdPa7EI t7 LwovMrZswO t8 gOtCD65SXO; v2 t1 CqzTNciEEy t2 lJIfMfLgv9 t3 xSXmcaIjfW t4 KLDozv2kqp t5 eIyisWFdqL t6 ksp8nH216B t7 tC3zyIemZJ t8 5jMBG5ZKxe.
Files CDN img/_review/consort-tiers/c04/b10/: c04_a18_tN_v0|v1|v2.png (1520x2688 RGBA), c04_a18_sheet.jpg (rows v0/v1/v2 × t1–t8).
~100% xong c04 / ~0% chơi được.
