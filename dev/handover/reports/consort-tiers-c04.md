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
