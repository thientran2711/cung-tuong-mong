# review-diemtrang-score-r2: FAIL (1 small item)

Reviewer: session_01UV1Szh78yi6jMh9mRXX7Pm. Reviewed review/diemtrang-score @ 64effc1c (r1 fixes; origin/main 08725411 is its ancestor). No reviewer commits.

## r1 items
1. Fallback targets / late face points — FIXED. BAL.toil.fb gone; toilIdeal returns null without points; face points preloaded in hồi 1 (toilMkPre); board holds with "Đang soi gương…" (shot looked at), brush off; after BAL.toil.meshWait 8 s with no points her sitting is played from skill (toilNpcPlay). Probe with mk-fit blocked: hold shown, then result vừa 61, no wrong-face scoring.
   Coverage: fresh CDN img/mk-fit (99 files, 15 752 entries): 0 consort/maid/player portraits without points (was 2 409).
   Contact sheet (reviewer, real toilGeom + toilIdeal, 100 random NEW faces: maid tm / kc / cold / ngheo, consort kc a26–a51): 100/100 brows on the painted brows, cheek circles on the cheekbones, lip dots on the mouth. Looked at every tile.
2. NPC look per seat — FIXED: toilNpcOcc() = Thái hậu alive / festival (mourning inside toilAllow), no S rank / place / night. Co-op one-world gate inside quickcheck green.
3. Typed scoring numbers — FIXED (brow near/slack/end/thk, cheek margin/ring/edMin, lip dx/dy/dyLow/rMin/rK, play.cakeOver, pop, lim, ring in BAL.toil; values unchanged, distribution re-measured identical).

## New finding (FAIL)
1. During the hold the "Kẻ xong" button is live: tapping it runs next() → browQ() with I undefined → page error "Cannot read properties of undefined (reading 'brows')" (reproduced: mk-fit blocked, click #toilnx). A player on a slow phone will tap it. Fix: no button (or ignore it) until ready, e.g. setBtn() after anchor succeeds, or `onclick=()=>{if(!stop&&ready)next()}`; add the click to the toil-draw hold check. One line, then PASS from my side.

## Thái hậu face points (asked by main)
Her mk-fit points sit about one feature low on all 12 portraits (brow line on the eyes, lip dots on the chin) — contact sheet looked at. They do NOT break anything today: MK_FIT is read only in jtoil, and the makeup layer is drawn only for the player (toilLookOfP returns null for anyone but S); she never sits at the board. Not blocking; fix the data (re-run mkfit.py on thaihau-*) before any feature draws makeup or marks on her face.

## Tests on 64effc1c
toil-draw Fold 755x1000@2 PASS 10, iPad 1180x820@2 PASS 10; quickcheck PASS 142 s (old save loads + plays a buổi, coop one-world gate, perf new/live render 254/248, tab 333/295, buổi 856/877); dev/measure/toil-dist.js 200 matches the report (thường/thanh nhã vụng 49/34/21/22, NPC unchanged). Shots in scratch only, none uploaded.
