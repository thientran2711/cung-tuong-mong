# consort-tiers c03 — a18 rank set t1–t8 + Nữ đế, section "B7" (W35 painter B; brief consort-tiers-B7.md; FIGURE_GATE A–G)

## B7
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 5 | main 0 | review/* 1 (review/consort-tiers-c03 = B6 set, superseded by the one-colour-per-rank rule) | archive 0. Reused: old-figure pipeline of batch-consort-rest(-B).md (live hd fig as ref + 4 faces, transparent bg gen), palette Q rotation of recolour-sample.md.

Method: old-figure redraw, NO m09 / proportion image / ratio target. Per rank: live hd fig uploaded as image 1 + face-consort-01/05/12/18; gpt-2-6, 1024x2048, 2k, transparentBackground, folder ba4aecfe…; prompt = STYLE_ANCHOR sentence + "redraw her EXACTLY" + only the new robe colour / pin change / brighter closed smile / bare forehead / one held item / slippers / transparent bg. No tassels added per rank, no forced symmetric pairs.

ROW SCAN (C3b) of the live row (p = 2): every live rank is the same GREEN lotus robe (the whole set one colour = the owner's complaint).
| rank | pins look like | change written in prompt | robe colour (Q[(p+k−1) mod 11]) |
|---|---|---|---|
| t1 Đáp ứng | red flower + gold sprigs (alike t2) | red flower → white jasmine cluster | apricot orange (Q2) |
| t2 Thường tại | red flower + gold sprigs (alike t1, t3) | red flower → pink peach blossom + pearl sprigs | sky blue (Q3) |
| t3 Quý nhân | red flower + small comb (alike t2) | flower → pink peony + small gold comb | emerald (Q4; sky-blue neighbour, different family) |
| t4 Tần | gold crown-comb + peach flower | none | rose pink (Q5); lotus motifs cream/gold so they read on pink |
| t5 Phi | gold centre ornament, long+short dangles | none | indigo (Q6) |
| t6 Quý phi | phoenix crown | none | crimson (Q7) |
| t7 Hoàng quý phi | one large spread-wing phoenix (≠ t8) | none | teal (Q8) + imperial-yellow inner robe/borders/sash |
| t8 Hoàng hậu | paired-phoenix crown, few dangles | none | imperial yellow mixed with crimson + jade |
| Nữ đế | own design: phoenix+dragon crown, front lưu to forehead, side-dangle trâm both sides | — | black + gold, imperial-yellow inner robe, dragon+phoenix embroidery (≠ her t8) |

| figure | colour | changed | gens |
|---|---|---|---|
| t1 | apricot | colour + jasmine pins | 1 PASS |
| t2 | sky blue | colour + peach-blossom pins | 1 PASS |
| t3 | emerald | colour + peony pin | 1 PASS |
| t4 | rose | colour | 1 PASS |
| t5 | indigo | colour | 1 PASS |
| t6 | crimson | colour | 1 PASS |
| t7 | teal + yellow | colour | 1 PASS |
| t8 | yellow + crimson/jade | colour | 1 PASS |
| Nữ đế | black + gold | new design, woman's cut dress, stiff short pointed shoulder piece, jade ruyi | 1 PASS |
Checks (looked at all 9 + faces sheet): face is hers, closed-lip smile on all (no teeth), forehead bare, colour as planned, alpha real (0..254), bodies/heads match the live ones in live_vs_new, row on red skull-top/feet lines (MediaPipe head-top method). Weak points: t1/t2/t3 are still the simplest robes (as live); Nữ đế held item is a ruyi not a seal.
Credits: 9 gens × 135 = 1215 cr, 0 bg removals (native transparent).
Files (md5-verified, https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/c03/b7/): c03_a18_t1..t8.png, c03_a18_nude.png, c03_a18_row9.jpg, c03_a18_live_vs_new.jpg, c03_a18_faces.jpg. Nothing live, no manifests.
Gen ids: t1 xSXt3yNjfW, t2 vQ2Ys1Ha47, t3 tC3GxkLmZJ, t4 3z5xXddREY, t5 LwohZ2qswO, t6 cpgJfuw0eP, t7 s78v2Y3l8e, t8 6Aq1etriJO, Nữ đế s78v2eLl8e.
~100% xong c03 / ~0% chơi được (nothing live; owner review pending).

## B8 (W35; order B8 — SAMPLE ONLY, colour change on the LIVE figure, no Nữ đế)
Method: Magnific gpt-2-6 EDIT of the live img/hd/fig-consort-c03-tN-a18.webp, references = [live figure only], aspect 9:16 (9:21 not supported; snapped), transparentBackground, 2k; prompt "Edit image 1. Recolour ONLY the robe fabric to <colour>; keep everything else exactly identical …". Pose/turn, cut, embroidery layout, headdress, face, held item come from the live figure (checked live_vs_new). Forehead/smile untouched.
| rank | colour | bbox w/h live → new | gens |
|---|---|---|---|
| t1 | pale apricot | 0.377 → 0.380 (+0.7 %) | 2 (3rd taken) PASS |
| t2 | powder blue | 0.314 → 0.321 (+2.0 %) | 3, best kept — 0.5 % over ±1.5 % |
| t3 | soft sage | 0.381 → 0.383 (+0.7 %) | 1 PASS |
| t4 | dusty pink | 0.371 → 0.375 (+1.1 %) | 2 PASS |
| t5 | soft lavender-grey | 0.393 → 0.395 (+0.5 %) | 1 PASS |
| t6 | muted coral | 0.379 → 0.395 (+4.1 %) | 3, best kept — FAIL ±1.5 % (3 gens used) |
| t7 | muted teal + pale imperial yellow inner/borders | 0.419 → 0.422 (+0.8 %) | 2 PASS |
| t8 | soft golden yellow + dusty rose + jade | 0.380 → 0.392 (+3.1 %) | 3, best kept — FAIL ±1.5 % (3 gens used) |
Note: the model systematically widens the alpha bbox by ~1–4 % (sleeve/skirt spread); by eye pose and silhouette match the live figure. t6/t8 not closer after 3 gens (stopped at the order's max 3). Canvas is 1520x2688 (not 0.44) — figures are not stretched. Row: uniform scale, skull top on the upper red line (c03_a18_row8.jpg).
Credits: 8 + 6 + 4 = 18 gens × 135 = 2430 cr. Gen ids: t1 v1 SymCD9AUb8 v2 gOtfpJfSXO v3 79aQo0SJAL(kept); t2 v1 eIy6LaJdqL v2 9ZFKhAANYZ(kept) v3 N2HkaoX6D9; t3 rgdIYy8xtc; t4 v1 TdUykv9VNR v2 Cqz06KhEEy(kept); t5 jUBmciFLD0; t6 v1 WDl7bffcXe(kept) v2 LwohVPEswO v3 s78vDchl8e; t7 v1 yiEqoDYPW9 v2 rgdIcyBxtc(kept); t8 v1 6Aq1h8EiJO v2 kspoYyM16B v3 bxVdz2V5Y2(kept).
Files (https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/c03/b8/): c03_a18_t1..t8.png, c03_a18_row8.jpg, c03_a18_live_vs_new.jpg. Nothing live.
~100% xong c03 B8 / ~0% chơi được.

## B8 v2 — two-step (supersedes the B8 section above; B8 addendum from ROOT-18)
STEP 1 = exact copy of the live figure on transparent 2K (gpt-2-6, ref = live fig only, "Reproduce image 1 exactly …"), STEP 2 = recolour edit of the step-1 copy (ref = that copy only), colour only. Files in CDN img/_review/consort-tiers/c03/b8/ (same names, overwritten): c03_a18_t1..t8.png (recoloured), c03_a18_row8.jpg (uniform scale, skull top on upper red line), c03_a18_live_vs_new.jpg = live | copy | recolour per rank.
| rank | colour | bbox w/h: live | copy (Δ) | recolour (Δ) | gens (copy+recolour) |
|---|---|---|---|---|---|
| t1 | pale apricot | 0.377 | 0.380 (+0.6 %) | 0.379 (+0.6 %) | 2+1 PASS |
| t2 | powder blue | 0.314 | 0.321 (+2.0 %) | 0.324 (+2.9 %) | 2+1, FAIL ±1.5 % |
| t3 | soft sage | 0.381 | 0.384 (+0.9 %) | 0.384 (+0.8 %) | 1+1 PASS |
| t4 | dusty pink | 0.371 | 0.372 (+0.2 %) | 0.372 (+0.3 %) | 1+1 PASS |
| t5 | soft lavender-grey | 0.393 | 0.396 (+0.8 %) | 0.397 (+1.1 %) | 1+1 PASS |
| t6 | muted coral | 0.379 | 0.388 (+2.2 %) | 0.388 (+2.1 %) | 2+1, FAIL ±1.5 % |
| t7 | muted teal + pale imperial yellow | 0.419 | 0.424 (+1.1 %) | 0.425 (+1.3 %) | 1+1 PASS |
| t8 | soft golden yellow + dusty rose + jade | 0.380 | 0.387 (+1.9 %) | 0.388 (+2.0 %) | 2+1, FAIL ±1.5 % |
By eye (live | copy | recolour sheet): pose/turn, cut, headdress, face, held item identical in all; only the robe colour differs. t2/t6/t8 stay 2–3 % wider than live (model widens sleeves/skirt slightly; 2 copy gens each, best kept; a 3rd was not run to hand over fast).
Credits this v2: 12 copies... counted: copies 8+4=12, recolours 8 = 20 gens × 135 = 2700 cr (plus the 18 gens of the first B8 = 2430 cr, superseded).
Gen ids: copies t1 SymCBL7Ub8→0eSOsA2TfW(kept) t2 3z5xQ6sREY(kept)→aFAWRIAfSh t3 huZn6aqvqL t4 bxVdW1g5Y2 t5 fHGcRqFCDY t6 WDl7xXVcXe(kept)→0eSOsYnTfW t7 ovNZyQR829 t8 huZn6rUvqL→u5YVGukQLD(kept); recolours t1 w4vuh2a7EI t2 rgdIe9qxtc t3 w4vumOd7EI t4 JNfFv9mOq4 t5 tC3G6EXmZJ t6 0eSOgCvTfW t7 O6CHaZMynm t8 lJIa8zVgv9. Nothing live.
~100% xong c03 B8 v2 / ~0% chơi được.

## B8 v3 — two-step + m09 STYLE ref (supersedes v1/v2 above; ROOT-18 addenda 1+2)
Method: STEP 1 exact copy of the live figure (image ref = live fig only; m09 hd eIyOFEidqL in the STYLE slot for rendering, skin and fabric; clauses "Luminous smooth porcelain skin, soft even light, no grey or dark shading on the face, no nasolabial or under-eye lines, dewy flawless complexion" + "near-3D semi-realistic rendering, soft volumetric shading on face and hair, NO dark contour line around face, nose or jaw, natural eye size, soft individual hair strands, exactly matching the rendering, skin and fabric of the style reference"); STEP 2 recolour edit of the step-1 copy (image ref = copy only + same style slot), colour only. m09 never an image ref (no body/pose/face).
Files (CDN img/_review/consort-tiers/c03/b8/, overwritten): c03_a18_t1..t8.png, c03_a18_row8.jpg, c03_a18_live_vs_new.jpg = live | copy | recolour.
| rank | colour | bbox w/h live | copy (Δ) | recolour (Δ) | gens (copy+recolour) |
|---|---|---|---|---|---|
| t1 | pale apricot | 0.377 | 0.390 (+3.3 %) | +3.4 % | 1+1 |
| t2 | powder blue | 0.314 | 0.326 (+3.7 %) | +3.5 % | 1+1 |
| t3 | soft sage | 0.381 | 0.390 (+2.4 %) | +2.6 % | 1+1 |
| t4 | dusty pink | 0.371 | 0.375 (+1.2 %) | +1.3 % | 1+1 PASS |
| t5 | soft lavender-grey | 0.393 | 0.403 (+2.6 %) | +2.4 % | 1+1 |
| t6 | muted coral | 0.379 | 0.386 (+1.6 %) | +1.7 % | 1+1 |
| t7 | muted teal + pale imperial yellow | 0.419 | 0.434 (+3.6 %) | +3.6 % | 1+1 |
| t8 | soft golden yellow + dusty rose + jade | 0.380 | 0.391 (+3.0 %) | +3.1 % | 1+1 |
Only t4 is inside ±1.5 %; the others are +1.7…+3.6 % wider than live (with the m09 style slot the model widens sleeves/skirt a bit more than v2). By eye pose/turn/cut/headdress/face/held item match; skin smoother, soft pastel colours. No regen rounds run (first gen of each step, to hand over fast): up to 2 more per step available.
Credits: 16 gens × 135 = 2160 cr (v1 2430 + v2 2700 superseded). Gen ids: copies t1 5jMXpkOKxe t2 nVLUl0pYQD t3 1le8Xlur4r t4 6Aq15nAiJO t5 huZnAbKvqL t6 KLDBe7pkqp t7 iGbrKMs3uK t8 SymCvGRUb8; recolours t1 Xm436yZBfo t2 aFAWnGrfSh t3 lJIahhpgv9 t4 SymCaCmUb8 t5 s78vmfHl8e t6 79aQE5AJAL t7 tC3G2V9mZJ t8 gOtfvkGSXO. Nothing live.
~100% xong c03 B8 v3 / ~0% chơi được.

## B8 v4 — c03 t6, t7, t8 NEW COSTUME (ROOT-18 order after owner: "hình thứ 6 … trang phục kỳ quá … giữ trâm"; t4/t5 are her favourites)
Method: 1 gen each. Image refs = her live t6/t7/t8 (face, headdress/trâm, pose, one held item) + her new t4 and t5 (costume style); m09 eIyOFEidqL in the STYLE slot (drawing style + skin + fabric). Prompt: keep exactly face/headdress/hairpins/height/graceful pose/same single held item; NEW costume in the soft family of t4/t5 — light flowing layered silk, wide soft sleeves, gentle layered skirt, delicate stitched embroidery; NOT stiff, no pearl cape, no armour-like panels, no boxy shoulders; richer than t5. Colours: t6 soft muted coral-rose with cream inner (own colour, not t5's lavender-grey), t7 soft muted teal + pale imperial yellow inner/borders/sash, t8 soft golden yellow with pale jade + dusty rose accents. Held items as live (lantern / handkerchief / round fan, no cup).
Files (CDN img/_review/consort-tiers/c03/b8/): c03_a18_t6.png, c03_a18_t7.png, c03_a18_t8.png (new); c03_a18_t6_prev.png, _t7_prev, _t8_prev (the v3 versions); sheet c03_a18_t4t5_t6t7t8.jpg (t4|t5|new t6|t7|t8) and c03_a18_t4t5_prev.jpg (t4|t5|prev t6|t7|t8). t1–t5 untouched.
Gens: 3 (t6 1, t7 1, t8 1) = 405 cr. Gen ids: t6 YMswyEIWeC, t7 yiEqkdOPW9, t8 VXwP61fMMU. Alpha 0..254 on all.
Check by eye: all three read as the same soft family as t4/t5; headdress and pins as live; faces hers; richer than t5 through layers and embroidery, not stiff. Caveats: t6 coral-rose is in the pink family of t4 (t5 lavender between them); t8 yellow is pale/cream-gold. No bbox gate re-run (new costumes, canvas as set).
~100% xong c03 t6–t8 / ~0% chơi được.
