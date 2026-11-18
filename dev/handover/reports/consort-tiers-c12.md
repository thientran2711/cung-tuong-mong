# consort-tiers c12 — B9 (W34 painter A, 18/11; brief consort-B9.md; ROOT-18 order)
PRIORITY #1 CHECK: reused the c02/c03 B8–B9 method (reports consort-tiers-c02.md / -c03.md), base = c12 owner-approved R40 smile set img/_review/maid-consort-sample/c12_a18_r10_t1..t8_smile.png (maid-consort-sample.md Round 40), c03 b8 t4/t5 as softness refs. No Nữ đế.
Method: STEP 1 exact copy (gpt-2-6, 1024x2304, ref = R40 base only, NO m09) → bbox within +2.5 % of base for all 8, looked at every copy. STEP 2 recolour (+ costume softened where stiff) with m09 (eIyOFEidqL) in the STYLE slot + skin clause for every one of the 8 figures. Image refs: the copy (t1–t4); the copy + c03 t4 + c03 t5 (softness only) for t5–t8.
Scan R40 base: colours loud (orange, navy, coral-red, purple, red+yellow). Stiff: t5 heavy navy pearl cape + panels, t6 coral heavy cape + phoenix embroidery (must go), t7 boxy purple/yellow shoulder cape, t8 rigid column + shoulder boxes. t1–t4 already soft/flowing (kept cut, recoloured only).
| rank | colour (soft) | costume | phoenix | held item | bbox w/h vs base | gens (copy+recolour+retry) |
|---|---|---|---|---|---|---|
| t1 | celadon | kept | none | pearl beads | +0.6 % | 1+1 |
| t2 | lilac | kept | none | scroll | +0.3 % | 1+1 |
| t3 | apricot | kept | none | round fan | +1.5 % | 1+1 |
| t4 | sky blue | kept | none | peony | -0.2 % | 1+1 |
| t5 | sage jade | redrawn soft (cape/panels → translucent layers) | none (flowers, birds, butterflies) | book | +7.1 % | 1+1 |
| t6 | rose | redrawn soft | none (phoenix replaced by peonies/birds/butterflies) | plum branch | +8.1 % | 1+1 |
| t7 | periwinkle + soft golden-yellow inner robe | redrawn soft | large golden phoenix + flowers | lantern | +13.3 % | 1+1+1 |
| t8 | soft golden yellow, jade/blush accents on borders | redrawn soft | large golden phoenix + flowers | lotus | +8.8 % | 1+1+1 |
t5–t8 are wider than the base because the soft flared hems/sleeves replace the boxy columns (intended; pose, face, crown/trâm, held item kept). t7 and t8 second pass added yellow and a bolder phoenix (first pass: t8 came out pale cream, t7 phoenix faint). Looked at every image: faces unchanged, bare forehead, closed smile, trâm/crowns kept, no cup, feet natural (not fixed in the prompt), no glaring colour.
Credits: 8 copies + 8 recolours + 2 second passes = 18 gens x 135 = 2430 cr.
Files (md5-verified) https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/c12/b9/ — c12_a18_t1..t8.png, c12_a18_row8.jpg (uniform scale, skull top on the red line), c12_a18_live_vs_new.jpg (R40 base | new). Nothing live.
~100% xong c12 B9 / ~0% chơi được.

## B10 (W34, 18/11; ROOT-18 order after the owner REJECTED B9: "Mày sao y" — copy the LIVE originals, change only the colour; B9 above is superseded, do not use)
PRIORITY #1 CHECK: base = LIVE originals img/hd/fig-consort-c12-t1..t8-a18.webp (NOT the R40 sample set). Owner method (verbatim via ROOT-18): one gen per figure, refs = m09 (eIyOFEidqL) in the STYLE slot (skin, drawing style, fabric) + the live original as image; prompt "Copy image 1 EXACTLY (face, hair, headdress, costume, pose, fabric, stitching) — ONLY change the robe colour"; NO soft/flowing words. Owner add-ons: remove any hoa điền/forehead mark; replace any cup with one other item; t1–t6 NEVER a phoenix (flowers/birds/butterflies); t7 + t8 phoenix = MAIN stitched motif, t8 warm golden yellow, t7 own tone + soft yellow. m09 in the STYLE slot on all 8 gens (+ the 2 retries).
Overlay check (IoU of the alpha masks, new scaled uniformly to the live bbox height and centred on it; overlay sheet c12_a18_overlay_live.jpg = new figure with the live outline in red): t1 97.6 % | t2 98.6 % | t3 95.7 % | t4 98.8 % | t5 99.0 % | t6 97.2 % | t7 97.6 % | t8 95.5 % — all >= 95 %. bbox w/h live → new: t7 0.424 → 0.444, t8 0.398 → 0.424 (phoenix embroidery enlarges the sleeve spread a little); others within 1.5 %.
| rank | colour | what changed besides colour | gens |
|---|---|---|---|
| t1 | lilac | forehead dot removed (verified at zoom) | 1 |
| t2 | sky blue | — | 1 |
| t3 | apricot | — | 1 |
| t4 | dusty rose | — | 1 |
| t5 | periwinkle | live had a small golden phoenix on the skirt → replaced by flowers, small birds, butterflies | 2 (1st kept the phoenix) |
| t6 | teal-aqua | phoenix embroidery → flowers, birds, butterflies, pomegranates | 1 |
| t7 | mauve-rose outer + soft golden-yellow inner robe/borders/sash | large golden PHOENIX as the main stitched motif (flowers secondary) | 1 |
| t8 | warm golden yellow, gentle jade/blush on borders | large golden PHOENIX main motif; green forehead mark removed; cup → folded fan held in both hands | 2 (1st still had the forehead mark, IoU 93.7 %) |
Looked at every figure (heads at zoom): face, hair, headdress/trâm, pose and stance as live; t1–t8 foreheads bare; one held item each (beads, scroll, round fan, none/hand drape on t4, book, blossom branch, lantern, folded fan). Note t4 holds nothing in the live original (hand lifts the sleeve) — kept as is. Crown/headdress phoenixes on t5/t7/t8 are the live headdress and unchanged (the no-phoenix rule is about the robe).
Credits: 8 + 2 retries = 10 gens x 135 = 1350 cr. Wasted before the permission stop: 3-4 step-1 copy gens (old method, unused, ~405-540 cr).
Files (md5-verified) https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/c12/b10/ — c12_a18_t1..t8.png (8 singles), c12_a18_row8.jpg (uniform scale, skull top on the red line), c12_a18_overlay_live.jpg (overlay vs live), c12_a18_live_vs_new.jpg (live | new). Nothing live.
~100% xong c12 B10 / ~0% chơi được.
