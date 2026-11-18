# review-diemtrang-score-r1: FAIL

Reviewer: session_01UV1Szh78yi6jMh9mRXX7Pm (opus). Coordinator: main s26. Reviewed: review/diemtrang-score @ f22147fd, delta on top of review/minigame-frame bd223466 only.
Review branch: review/diemtrang-score-r1 @ 08836c61 = f22147fd + merge origin/main 08725411 (conflicts only in generated index.html / sw.js / assets.json; rebuilt with dev/site/build_site.sh). jtoil.js merged cleanly with main's diemtrang-fx changes.
START_CTX ~20 % of the window; finished at ~45 %, no rollover needed.

## Verdict: FAIL (2 blocking, 1 minor)

1. BLOCKING (owner 16/11 ~22:30Z + ~22:38Z "anchor per portrait, verified on every face"): the hidden targets fall back to `BAL.toil.fb` whenever the face points (img/mk-fit/<face>.json) are not in memory, and that fallback is badly placed.
   - Contact sheet (reviewer, real toilGeom + toilIdeal in the page, 229 tiles): 198/198 faces WITH face points are correct (brow line on the painted brow, cheek circle on the cheekbone, three lip dots on the mouth). 31/31 consort/maid faces WITHOUT face points are wrong exactly like the owner's bug: brow target on the forehead, cheek circle on the eye, lip dots on the nose tip (sheet-fallback: maid-m30-tm4-a51, maid-m21-tm0-a18, consort-c01-kc-a51 …).
   - Even with the toil-fit face box, fallback vs real face points differ by 0.19 eye-distance at the brows on average (60 faces, dev/measure geometry) ≈ 3× the brow tolerance: a perfect stroke on the real brow scores ~0 against the fallback → vụng.
   - When the fallback is used: (a) portraits with no face points: maid tm (832), maid kc (208), maid cold (208), maid ngheo (52), consort kc a26/a36/a51 (96) — some are not reachable on the board (toilOn excludes servants / cold palace), kc / ngheo may be; (b) ANY face when the face-point file arrives late or fails: `anchor()` re-runs only `phase===0 && !strokes.length && !cur`; if she starts drawing before the JSON arrives (slow phone, first sitting; nothing preloads it unless a look already exists) or the fetch fails, the whole sitting (brows, powder AND lips) is scored against the forehead/nose targets. The test waits for the mesh, so it never sees this.
   - Fix asked: never score against the fallback silently. Preload the face points in hồi 1 (toilOpen / toilDressUI) and hold the board (brush inactive, "đang soi gương…") until they are in, re-anchor and re-score if they arrive mid-sitting; for portraits with no points either get points made (mk-fit for the missing sets) or fix the fallback so it lands on the face; re-run the contact sheet incl. fallback faces and LOOK at it.

2. BLOCKING (CO-OP FIRST "cùng đọc một con số"): `toilNpc(v)` → `toilNpcPlay(..., toilOcc().map(o=>o.k))` → `toilAllow`. `toilOcc()` reads THIS seat's player (S.out, S.rank<7 / queen, S.tonight). So the same NPC's diêm dúa roll uses a different allowance on two seats when one player is in cold palace, is Hoàng hậu, or (night/fest edge) differs → the two seats can read a different look for the same consort. It is also the wrong allowance in meaning (the NPC's day, not mine). Fix: NPC allowance from shared/world facts only (Thái hậu alive, festival, tang; or her own occasions), never from S; add a check to the co-op probe that both seats read the same toilNpc(v).look.

3. MINOR (ONE CORE): scoring numbers still typed in code: lip dot offsets (.22/.12/.22 of lip box), lip radius floor 7 and fws*.05, brow smear radius tol*3, pos slack tol*.3, overshoot tol*.6, messy slack th*.6, powder grid margin 1.7 and spill ring 1.3, NPC cake over .35, popup thresholds (.8/.5/.6/.3 powder, .75/.4 lip). Move the ones that decide a result into BAL.toil.

## What passes
- Owner rulings: no palette warning (none added), no dotted guides / cheek circles (only the lip timing ring), freehand, strict scoring, brow target on the painted brow (mesh faces), lip/cheek anchors per portrait (mesh faces) — all OK on the 198 mesh faces.
- Score distribution (PHASE 2) reproduced with dev/measure/toil-dist.js 300: matches the report (thường/thanh nhã vụng 45/31/21/17; khéo ~0; vội 79–98).
- Toddler scribble probe (reviewer, real scoring block, 30 faces × 4, skill .12 and 1): zig-zag over the brows, colouring over/around the brows, blobs, a straight bar; powder everywhere / big rubs / random dabs; random lip taps. Mean scores 3–49, MAX 60; vụng 86–100 % (100 % at low skill), never đẹp. A 2–3 year old's scribble does NOT reach 70–80. Believable.
- NPC/bot: hash-seeded, no Math.random; vụng 43/28/13/3, diêm dúa 10–16 by skill.
- Lines (TOIL_SLIP) cổ trang, witty, no %; "Phấn lem ra ngoài", how-to text OK per VANPHONG. No new UI parts (kit-only; the result rows are the existing ones).
- Tests on the merged build: toil-draw Fold 755x1000@2 PASS 8, iPad 1180x820@2 PASS 8; toilette.js 755x1000 ok (no overflow, 0 errors); toil-react.js ok (fails []); quickcheck PASS 156 s (old save loads + plays a buổi, perf new/live render 234/220, tab 297/281, buổi 775/825). toil-looks.js fails on main too (reads a local img/toil-fit.json that no longer lives in git) — stale test, not this branch.
- Shots looked at (scratch only, not uploaded): Fold board/brow/result, iPad powder; board clean, no guides, figure + frame from kitGameFig. Seen, not this delta: beige strip right of the mirror glass; vụng face uses the generic smudge (worker's KIT REQUEST stands).
- Out of scope note: Thái hậu mk-fit points sit low (brows on eyes, lips on chin) — she never sits at the board, but the makeup layer on her face (if ever drawn) would be off.

Shots: none in git, none on the CDN (nothing to wipe).
