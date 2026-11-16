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

## r5 (art worker #3, 16/11 ~21:40Z) — HANDOVER at ~25% context (worker rollover rule); coordinator opens the successor
START_CTX ~5%. Code: review/huadian-size @ e46bef2d (pushed; no images in git).
Done: re-ran runswap on the 72 por of r4_probs.txt (orig = live CDN, donors fetched with dev/art/huadian-size/r4_fetch.sh pattern: curl https://ctm-img.victoria-tntt.workers.dev/img/por-<style>-t<T>-a<A>.webp). 72/72 swapped; a18 before/after sheet LOOKED AT: all 18 style-tiers now small flowers at 0.085 (c02-t2/t5, c28-t2 drops gone; c14, c25, c28-t6, m14, m22, m34, m43, m45, m47, m48 OK). Counts: FAIL por before 72 (oversized/non-flower), after 72 flowers; aged ages not all clean yet (below).
Remaining pendant dots at a26/36/51: stray.py (new) cleans a18 only; aged files (c18-t6 triple dots, m43-t5, m45-t1, m47-t3, m47-t6, c25-t5/t6 specks) need explicit per-file rects (mark centre = winx in swap log, dots 8-20 px below / left-below for c18-t6). Also still bad: c25-t4 a26/a36/a51 (pale donor + a leftover old flower at a51 — try donor c03-t4/m05), m22-t6 light rectangle at a26-51, c25-t5-a36 stray arrow right of mark (visible in a36 crop at x+25).
dotclean.py: do NOT use at large FW (smears brows). Use stray.py (env SIDE/BOT/AREA).
Todo unchanged for the rest: (2) twins fig/hd/tn via runpatch with WINLOG=swap log — BUT fig-cutout-clean lead may regenerate fig/hd transparent (owner sample c20/c02-ty3 waiting for her verdict; no file names yet) so do twins from the NEW fig when it tells the names; (3) 22 skipped por by hand; (5) ty1-8 check; (6) Luân hồi browser check, cdn_sync same names, report SẴN SÀNG KIỂM.
Pitfall repeated: Bash shell vars do not persist between calls (a name list built in one call is empty in the next) — write lists to a file.

## r6 (art worker #4, 16/11 ~22:30Z) — code review/huadian-size @ f931416e (no images in git)
START_CTX ~1%.
DONE + UPLOADED to the CDN (same names, 72 por, md5 verified): the 18 style-tiers of the FAIL list x a18/26/36/51, every file looked at (a18 + aged, before/after sheets, zooms). Counts: FAIL por before 72 (oversized/non-flower/dots/rectangle) -> after 72 small flowers/leaves at ~0.085 (measure on aged files is noisy at brows; looked at by eye).
- Swap (donor flower) kept for c02-t2/t5, c14-t4/t5, c18-t6, c28-t2/t6, m14-t6, m22-t6, m34-t7, m43-t5, m45-t1, m47-t3/t6, m48-t5 (LOCMIN=0.99 for the weak-match files).
- c25-t4/t5/t6: NOT swapped (r3 only flagged specks; the original marks are small flowers/sprig): original files + stray cleaning + by-eye rect inpaint of the specks (all 4 ages); c25-t4-a51 shrunk by manual box (manual_aged.json).
- m22-t6 light rectangle: rectfix.py (all 4 ages), gone. Pendant dots (c18-t6, c02-t5, m43-t5, m45-t1, m47-t3/t6, c28-t2): removed at all ages (stray.py + inrect.py rects). Seen and left: m45-t1 a36/a51 has a large light forehead patch with a hard right edge (pre-existing in the CDN original, not flagged by r3).
- The 19 skipped por (r2 list; the task said 22, the list holds 19: r6_skipped19.txt): looked at every one: marks already small (~0.085 by eye, pale/WATCH); the shrink auto-measure there is wrong (reads brows/hair) so I changed nothing.
- Rollback: originals were the live CDN files before upload (fetch no longer possible after overwrite; previous CDN etags in img/_index.json history only). Keep this in mind if the owner rejects.
NOT done:
1. ty1-8 (Trung y): checked a18 of all 84 styles x ty1-8 (672 files) with hmeas.detect (ty_meas.json): median 0.071 by detect, 0.095 by runpor's measure (t batch is 0.0846) => about half of ty are larger than 0.088 (c21, c22, c23, c25, c27, m06, m12, m13, m21, m40, m42, m47, m50, m51 clusters ~0.10-0.13, a few leaf trios wider). Motifs are flowers/leaves/sprigs (OK). Auto shrink (runpor with ty_boxes.json, 396 of 672 would shrink) leaves dark blobs / brow fragments / smears on ~25% of the samples I looked at (wrong box = brows/hair/fallback box for 87 faint marks) => DO NOT batch it. Needs per-file boxes checked on sheets (r6_tysheet.py shows crops with ratio), or an owner/foreman decision whether ty is accepted at ~0.095 (13% above the owner's 0.085).
2. Twins fig/hd/tn for the 72 fixed por (waits for the fig-cutout-clean names), ty aged ages, Luân hồi browser check, WATCH/crescent/flame shapes (owner question open).
Pitfalls: Bash vars do not persist; write each sheet under a new name; stray.py can move a brow fragment (m14-t6-a51 bump) -> use it only on files that need it and look.
