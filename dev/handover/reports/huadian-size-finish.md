# huadian-size-finish (C9, Foreman C) — art worker r4 — STATUS: IN PROGRESS, HANDOVER (context)
NOT "SẴN SÀNG KIỂM" yet. Code on review/huadian-size @ 91f4077c (merged with main 1aa0edb2). Nothing uploaded to the CDN in r4.

## What the owner approved
OD:L592 "Huadian size: 8.5%" = 0.085 x face width (sheet sample 0.07 was too small, OD ~18:20Z). Owner 16/11 20:50Z: "0.85" = this 0.085. r3 measured median 0.0846, p10 0.075, p90 0.093: the batch size is right. The big red teardrop in the owner's Luân hồi photo = the oversized drop marks the r3 reviewer listed (c28-t2 pink/red drop, c02-t2, c02-t5 ~0.12-0.13 of face) — not in the "deliberately untouched" list.

## Findings r4
- Families checked on the CDN: t1..t8 (84 styles x 4 ages) = the r3 set. ty1..ty8 (Trung y, 84 x 8 x 4) ALSO carry a small flower mark; looked at 3 styles x ty1-8 and the first sheet of 8 styles (c01-c08) at a18 with a 0.085 bar: sizes look right (~0.085), motifs flowers. NOT yet checked: ty sheets 2-11, ty a26/36/51, and the ty hd/fig twins. tm0-4, kc, tcold: no mark on the samples. (r3 did not cover ty/tm because they appeared after.)
- r3 FAIL list worked through for POR only (72 files): donors chosen (same tier, same colour family) in dev/art/huadian-size/swap_map.json (new per-"style-tN" keys, runswap.py honours them): c02-t2,t5 <- m02; c14-t4 <- m02, c14-t5 <- m16; c18-t6 <- m31; c25-t4 <- c19, c25-t5,t6 <- m02; c28-t2 <- m05, c28-t6 <- m32; m14-t6 <- m02; m22-t6 <- m05; m34-t7 <- m05; m43-t5 <- m02; m45-t1 <- m31; m47-t3,t6 <- m16; m48-t5 <- m02.
- Results (a18 all good: flowers at 0.085, ring/disc/drop gone). Aged ages: runswap's template match (locate) is weak for c25 t4/5/6, c28-t6 a36/a51, m14-t6 a51, m22-t6 a51, c02-t5: re-run those with `LOCMIN=0.99` (uses face-relative a18 box instead) — good for c28-t6, m14-t6, c25-t5/t6 a26; still BAD: c25-t4 a26/a36 (pale donor + remnants; try another donor e.g. m05/c03-t4), c25-t4/t6 a51 (swap_suspect), c25-t5-a36 right-hand stray arrow mark, c25-t6 right-hand speck, m22-t6 (a26..a51) light rectangle beside the mark (pre-existing patch from the shrink, needs skin refill), c18-t6 a36/a51 triple dots.
- dotclean.py (new): erases small pendant dots / specks just under/around the swapped mark (uses diff ORIG vs SWAPPED to find the mark). Works on a18 (m45, m47, c18, m43). Run it AFTER runswap: `dotclean.py ORIGDIR OUTDIR names`.
- PITFALL: the image viewer showed me a cached earlier picture when I re-wrote the same file name; always write each contact sheet under a NEW file name.
- opencv: pip install "opencv-python-headless<4.11" "numpy<2.3" (opencv 5 has no haar).

## Remaining (for the successor)
1. Finish the 72 por above (weak-match files by LOCMIN=0.99 or manual_aged.json boxes; fix c25 strays, m22 rectangle, c18 dots), look at a18 + a51 before/after sheets (dev/art/huadian-size/r4_beforeafter.py).
2. Twins: runpatch.py fig/hd/tnfig/tnpor for the fixed por (WINLOG=log of runswap lines). Orig files to fetch: por, fig, hd/fig, tn/fig, tn/por for the 18 style-tiers x 4 ages (r4_probs.txt lists them; 72 por, 72 fig, 40 hd, 6+6 tn).
3. The 22 por skipped in r2 (see PROGRESS_huadian-size.md: c07-t1-a51, c08-t8-a51, c14-t8-a26, c20-t5-a51, m25-t3-a26/36, m28-t3-a36, m28-t8-a26/36/51, m38-t3-a36, m38-t5-a26/36, m51-t3-a26/51, c02-t7-a26/36/51, c20-t3-a51): by hand.
4. WATCH items + crescent/flame/blade/gem shapes: owner question still open (not failed).
5. Check ty1-8 families (sizes + motifs, all 4 ages + fig/hd twins); fix any > 0.088 or non-flower.
6. Check Luân hồi large figures in the browser (hd twins used there) after the drops are fixed; counts before/after; cdn_sync same names (python3 dev/site/cdn_sync.py <files>); then report SẴN SÀNG KIỂM.
Cut-out worker session_011xDdVQi9izFkArmuejM2aM was told: I touch only forehead pixels; if it regenerates figures, I re-apply huadian after (no reply yet).
