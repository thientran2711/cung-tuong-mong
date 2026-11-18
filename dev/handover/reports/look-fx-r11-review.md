PRIORITY #1 CHECK: brief root52-review-look-fx-r11 | OD owner 04:58Z (0 off-face) + "levels look alike" fault | main live f60b4024 | review/look-fx-wire-r11 aa997f3c (+ CDN cand-keep-fit-r13.json) | report look-fx-wire.md R13 read | claims MAIN ROOT-52 look-fx-wire #12.

# look-fx r11 review (small reviewer)
Tested: aa997f3c + local merge of origin/main f60b4024 (only conflicts = generated index.html / sw.js, resolved by `build_site.sh`), keep-fit.json served from cand-keep-fit-r13.json (LFW_OVR). Nothing pushed to review branch / main / CDN; shots are local scratch.
NOTE for main: aa997f3c does NOT contain f60b4024 yet; merge it and rebuild (index.html + sw.js conflict only).

## (1) LOOK 3x: PASS (2 notes)
Fold 755x1000@2 + iPad 1180x820@2, host mode, stage face + Điểm trang mirror circle. c01 t2 all 8 marks lv1-3 (both devices); ink + cào lv1-3 on c07 t3 (headdress flower), c19 t2 (crown), man-congtu-10-a36 (beard), player-look2-t1-a26 (old-save portrait) on both devices; page errors 0 in all 8 runs.
- Ink (muc): on every picture the stroke lies on the cheek under the viewer-left eye: not in hair/temple, not on eye, not on lips, not hidden by the eye hole, never clipped to nothing. Ladder reads: lv1 short thin dash < lv2 longer/thicker < lv3 long thick bar (women, Fold+iPad+mirror). r10 faults (temple hair lock, c19/c07 vanishing) are gone.
- Other 7 marks (c01): all visible, clearly different per level, on skin, off eyes/lips.
- Cào: 1/2/3 scratches on every picture; A/B vs old live build (2850c45b, c01 lv1-3): same place/shape; the old build showed a hard straight cut across the top of lv2/lv3 (tilted hole bug), r11 removes it = improvement. Faint on the beard man, same as before (pre-existing, per R13 item 3).
Notes (not faults): (a) beard man ink is small at all levels (lv1 tick, lv2 slash, lv3 small block): ladder still readable but weak, known limit of overrides on beard faces. (b) ink lv3 on c07 t3 / c19 t2 ends at the nose-wing edge of the cheek (on skin, not on the nostril); watch if the owner says "touches the nose". (c) poxscar lv1 on c01 is only 2-3 dots (art, unchanged by r11).

## (2) KIT consistency: PASS
lkKeepBox (jlooks.js:347) is the ONE svg keep-out mask builder for turned layers; users: lkScarFix (cào) and the ink layer (lkInkBox path, line ~377); no private mask variant in jk2b/jface/jtoil. Other marks keep the shared lkKeepCss (not touched).

## (3) Gates: PASS
quickcheck.sh on the merged tree: PASS 153 s (open 1273 ms, old save ok, render 241/184, tab 369/336, buổi 1098/851, tasks>200ms 15/13), core gates PASS. Candidate: JSON valid, 17800 rows (12 items live-format; 5860 rows have the 4 override items 13-16: a 0..1250, k 750..1100, rot -450..0), every live key kept, 0 rows without a veil entry. 5 pictures without a row (por-consort-c27-t3-a51, por-consort-c31-ty7-a26, fig-kid-p10/p14/p22-a4) = same 5 as live: safe fallback to the old square.

VERDICT: PASS aa997f3c + cand-keep-fit-r13.json (land code + data together; merge main f60b4024 first)
