# consort-tiers c06 — a18 rank set t1–t8 + Nữ đế, section "B7" (W35 painter B; brief consort-tiers-B7.md; FIGURE_GATE A–G)

## B7
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 5 | main 0 | review/* 1 (review/consort-tiers-c03 = B6, superseded) | archive 0. Reused: old-figure pipeline (live hd fig + 4 faces, transparent-bg gen), palette Q rotation. Method as c03 B7 (no m09, no ratio image).

ROW SCAN (p = 5): the whole live row is one coral/terracotta peach-embroidery robe.
| rank | pins look like | change written in prompt | robe colour (Q[(p+k−1) mod 11]) |
|---|---|---|---|
| t1 | pink flower + sprigs (alike t2, t3) | pink flower → white magnolia | rose pink (Q5) |
| t2 | pink orchid + sprigs | none | indigo (Q6) |
| t3 | pink flower + comb (alike t2) | flower → pale yellow chrysanthemum | crimson (Q7) |
| t4 | gold comb + peach flower | none | teal (Q8) |
| t5 | gold flower crown, dangles | none | plum (Q9) |
| t6 | phoenix-flower crown | none | terracotta (Q10, as live hue but next to plum/celadon so distinct) |
| t7 | large spread-wing phoenix (≠ t8) | none | celadon (Q0) + imperial-yellow inner robe/borders/sash |
| t8 | paired-phoenix crown, few dangles | held teacup → small folded round fan (no teacup rule D3) | imperial yellow mixed with jade + crimson |
| Nữ đế | own design: phoenix+dragon crown, front lưu short outside/longer middle to the forehead, side-dangle trâm both sides | — | imperial yellow + deep gold, dragon+phoenix, stiff short shoulder piece, jade ruyi |

| figure | gens |
|---|---|
| t1..t8, Nữ đế | 1 each, all PASS (9 gens) |
Checks (looked at all 9 + faces + row): own face, closed-lip smile on all, bare forehead, colour as planned, alpha 0..254, body/head as live (live_vs_new), row on red skull-top/feet lines. Weak points: Nữ đế yellow+gold is rather pale/flat beside t8 yellow (design differs; dragon visible); t1 rose is close to her live coral family (but clearly pink now).
Credits: 9 × 135 = 1215 cr.
Files (md5-verified, https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/c06/b7/): c06_a18_t1..t8.png, c06_a18_nude.png, c06_a18_row9.jpg, c06_a18_live_vs_new.jpg, c06_a18_faces.jpg. Nothing live, no manifests.
Gen ids: t1 mERzgNghJQ, t2 JNfFMvnOq4, t3 SymCcmrUb8, t4 w4vuTCn7EI, t5 kspoRoS16B, t6 jUBmGvGLD0, t7 8a62LnOIrU, t8 IfiAscxtvE, Nữ đế s78vnq6l8e.
~100% xong c06 / ~0% chơi được (nothing live; owner review pending).


## B9 — c06 a18 t1–t8, owner's ONE-GEN method (brief consort-B9.md + ROOT-18 method)
PRIORITY #1 CHECK: approved sample c03 b8; method = owner verbatim via ROOT-18: m09 (eIyOFEidqL) in the STYLE slot (skin/drawing style/fabric) + the LIVE original as the image ref; prompt "Copy EXACTLY everything from image 1: hair, headdress, face, costume, pose, proportions, held item, fabric material and stitching. ONLY change the robe colour to <tone>." No soft/flowing words, no redesign. (The earlier B7/B8 c06 attempts were stopped/cancelled; nothing of them is used.)
ROW SCAN: live row = one coral/terracotta robe. Faults: t5 and t6 have an embroidered phoenix (t1–t6 never) → swapped for peonies+butterflies in the same places; t8 held a teacup → small round fan; everything else (cape, layers, embroidery, crowns, pins) kept. All foreheads: "clean bare forehead".
| rank | colour | bbox w/h live → new (Δ) | gens |
|---|---|---|---|
| t1 | soft wisteria lilac | 0.346 → 0.361 (+4.5 %) | 1 |
| t2 | soft celadon green | 0.379 → 0.393 (+3.6 %) | 1 |
| t3 | soft powder blue | 0.345 → 0.375 (+8.9 %) | 1 |
| t4 | soft dusty mauve | 0.402 → 0.411 (+2.1 %) | 1 PASS |
| t5 | soft teal-aqua (phoenix→flowers) | 0.329 → 0.356 (+8.2 %) | 1 |
| t6 | pale apricot-peach (phoenix→flowers) | 0.407 → 0.407 (+0.1 %) | 1 PASS |
| t7 | soft lavender-grey + soft golden-yellow inner/borders/sash, phoenix kept | 0.368 → 0.384 (+4.5 %) | 1 |
| t8 | warm golden yellow, phoenix kept, cup→fan | 0.311 → 0.349 (+12.1 %) | 1 |
By eye (live_vs_new): pose, cut, layers, embroidery, crowns, capes identical to the originals; only the colour (+ swaps) changed; pastel/soft colours, t7/t8 phoenix visible. Bbox over ±3 % on 6 of 8 (sleeves redrawn slightly wider); not regenerated (owner: no regen).
Credits 8 gens × 135 = 1080 cr. Gen ids t1 SymEA59Ub8 t2 CqzTlo8EEy t3 P3u50UQ42C t4 huZYxISvqL t5 gOtC2lbSXO t6 cpgOaVF0eP t7 w4vQnPK7EI t8 LwovRJ1swO. (Earlier unused step-1 copies of this session are ignored.) Files CDN img/_review/consort-tiers/c06/b9/: c06_a18_t1..t8.png, c06_a18_row8.jpg, c06_a18_live_vs_new.jpg (live | new). Nothing live.
~100% xong c06 / ~0% chơi được.


## B10 — c06 t1–t8 × v0/v1/v2 (W39, 18/11)
PRIORITY #1 CHECK: brief consort-B10.md, FIGURE_GATE C4a/C4b/C4d/D2/D3, c06 B9 (reused as v1); same one-gen method as c04 B10.
Method: ONE gen each, gpt-2-6, 9:16 2K transparent; refs = live hd fig-consort-c06-tN-a18 (image) + m09 eIyOFEidqL (style slot); prompt "Copy EXACTLY … ONLY change the robe colour to X" (v0: "do not change any colour, same coral-terracotta"). Swaps: t5/t6 phoenix → peonies+butterflies, t8 cup → round fan, bare forehead, one held item; t7/t8 phoenix kept.
| rank | v0 (original coral-terracotta) | v1 (= b9) | v2 |
|---|---|---|---|
| t1 | coral | wisteria lilac | soft rose pink |
| t2 | coral | celadon green | buttery cream |
| t3 | coral | powder blue | pale sage |
| t4 | coral | dusty mauve | soft sky blue-grey |
| t5 | coral, flowers | teal-aqua | pale lavender |
| t6 | coral, flowers | apricot-peach | soft jade |
| t7 | coral, phoenix | lavender-grey + golden-yellow inner | misty celadon + same golden-yellow inner/borders/sash, phoenix |
| t8 | coral, phoenix, fan | warm golden yellow | crimson rose + gold trim, phoenix, fan |
By eye (sheet incl. live row): pose, headdress, face, cut, embroidery as live, colour only changed; one item, no cup; t1–t6 no phoenix, t7/t8 phoenix. All 16 first-try, no regen. No bbox gate (FIGURE_GATE A1).
Credits 16 × 135 = 2160 cr. Gen ids v0 t1 IfiG9p5tvE t2 4RQKCyK9Aa t3 SymEI7JUb8 t4 tC3z6fdmZJ t5 p8O67t2ehw t6 VXw4SmmMMU t7 cpgOsma0eP t8 ksp8M9X16B; v2 t1 8a6A9cLIrU t2 4RQKESu9Aa t3 79aFhgBJAL t4 gOtC8l5SXO t5 aFAc2E0fSh t6 fHG0AHECDY t7 s78aoyAl8e t8 VXw4UvhMMU.
Files CDN img/_review/consort-tiers/c06/b10/: c06_a18_tN_v0|v1|v2.png, c06_a18_sheet.jpg (rows v0/v1/v2 × t1–t8).
~100% xong c06 / ~0% chơi được.


## B10 t7 EMBROIDERY SCAN (W39, 18/11, foreman ROOT-20 after owner)
t7 EMBROIDERY SCAN (ROOT-20): t7 v0/v1/v2 checked at native res: gold-thread phoenix + borders read stitched and flat (chest phoenix slightly raised on v0) → NOT redrawn.
