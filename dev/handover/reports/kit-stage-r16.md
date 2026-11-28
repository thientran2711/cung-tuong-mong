# KIT-STAGE-R16 report (worker, child of MAIN CHÍNH 181; succeeds R15) — branch review/kit-stage-r16
PRIORITY #1 CHECK ('kit-stage-r15'): OD n/a (re-merge) | main LIVE 5fb13d60 (ui3 incl. ui2l 26a1eacd, kesOwnBox e44e994b) | review/* kit-stage-r15 d2bf0c8c (RV-176 PASS, LAND READY) | claims KIT-STAGE-R15 archived → R16.
KIT CHECK: no new part (merge only); reuses §28.8f own-box clamp (ui2l) + §57 EMO-SEAL text rule (r15). dev/kit/KIT_CHECKLIST.md.
START_CTX ~3 % of the window (own estimate; no rollover needed).

## Chain
5fb13d60 (LIVE) + merge origin/review/kit-stage-r15 d2bf0c8c = e9cc1340 + 1faa468b (test-only press-keep). Gate: `git merge-base --is-ancestor 5fb13d60 <sha>` OK; `git diff --diff-filter=D --name-only 5fb13d60 HEAD` = 0 files deleted. assets.json = LIVE. Built with dev/build/assemble.py + dev/site/build_site.sh (then `git checkout assets.json`).

## Conflicts (5 files) and how each was resolved
- dev/build/jemoseal.js — 3 hunks:
  1. KIT_EMOSEAL.lean knobs = LIVE line (ownPic / ownFrame) + r15 knobs (textPad 4, textMinS 1.15, textStep .9, stillMs 200, watchMs 120).
  2. kesLean plan: BOTH rules at once, in this order inside the size loop `for(;;)`: size from `hp2` (head, capped by own box cap, ui2l) → clamp to screen → clamp inside own box `if(kb){…}` (ui2l kesOwnBox) → text rule `kesTextHit` steps S down by textStep until clear, below textMinS no lean (r15). The own-box sig-stability read (300 ms) and the "hp2 < seal×1.15 = no lean" exit stay before the loop.
  3. watch interval: r15's `L.watchMs` (120 ms) interval + text check, with ui2l's «own box changed under it» end check added in the same interval (the old 250 ms interval is gone, one watch only).
- dev/build/assemble.py — module list = LIVE list (jmgskin.js kept) + r15's jkpcard.js after jkpick.js: 477 modules, each once.
- dev/build/jkhand.js — r15 «Chọn» click path (one «Chọn», no ✕ pair) + LIVE DLG-DEAD-BTN guard: a «Chọn» with no lifted card calls kitHandStale and returns (no dead button); kitHandStale itself came from LIVE (4a02837c) unchanged.
- index.html, sw.js — rebuilt (LIVE copy, then assemble + build_site).
Syntax: `new Function` parse of jemoseal.js and jkhand.js OK.

## Measures (build of e9cc1340/1faa468b, one browser at a time)
| test | result |
|---|---|
| dev/test/emo-over-text.js (r15 text rule; end ×3, person short/long; Fold 755x1000 + iPad 1180x820, 12 s per dialog) | all pass; Đại kết cục banner seal leans 30 samples/device, 0 over text |
| dev/test/kit-dlg-avatar.js (ui2l: avatar inside picture, seal lean own box §28.8f, C) | PASS |
| dev/test/xl-one-size.js (r15 §56.33) | all pass (Fold + iPad) |
| one-core-guard | PASS (477 modules, inlineNow 3075 ≤ baseline 3592, fails 0) |
| coregates G1 / G2 / G3 + hooks 40–92 (odds-cap, coop one-world, mk-layer, manifest, npc, dialog-fixed 80, dead-card 85, button-crawl 90, look-dedupe 92, kit-std-scan 96) | PASS |
| coregates hook 93 press-keep | FAILED on e9cc1340 AND on r15 d2bf0c8c alone (LIVE passes) → test/hand-model mismatch, fixed test-only in 1faa468b → PRESS-KEEP PASS Fold + iPad |
| coregates hook 94 q-softlock | FAIL (1) «view parked by a tab change → card shows on court» — same line fails on LIVE 5fb13d60 (LIVE: FAIL 4, Fold), r15 (FAIL 1), r16 (FAIL 1): PRE-EXISTING / flaky, not from the merge |
| coregates hook 95 next-dead | FIX-6 FAIL 2 under the 17-min coregates load; run alone on r16, LIVE and r15 over http: FIX-6 PASS on all three → load flake |
| quickcheck.js (open, old save, perf vs LIVE) | QUICKCHECK PASS · open 2035 ms · old save ok · render 281/283, tab 489/475, buổi 1573/1420, tasks>200 ms 27/25 |
Note: coregates exits non-zero only on hooks 94 (pre-existing) / the 93 case now fixed; no gate fails because of this merge.

## press-keep cause (fix 1faa468b, test only, dev/test/press-keep.js)
The test taps an option card once to scroll it into view; in the r14/r15 hand (KIT §101.10) that first tap ENLARGES the card in the centre, so the next elementFromPoint of the card's Tốn/Được row hits the enlarged clone's IMG («row text covered: IMG#»). Test rebuilds the frame when the first tap picked OR left a `.opts.khand>button.klift`. No game code touched. Checked in page: a resting card's `.kan` point hits its own `span.kan` (no lift).

## Seal looks (both rules at once), Fold 755x1000 + iPad 1180x820, Đại kết cục
Stills looked (full screen, taken by the test at the 3rd leaning sample): scratchpad stills/755x1000-end_i_k_t_c_c.png, stills/1180x820-end_i_k_t_c_c.png (not in repo). In-page check at that sample: big seal rect inside its own picture strip (Fold seal 351..388 × 169..206 in strip 342..646 × 159..215; iPad 415..451 in 405..1007) AND no text box hit (emo-over-text 0 hits all 5 dialogs × 2 devices). Frame fits the screen on both (XL one-size, r15 §56.33), the whole XL family (end ×3, person long text, list) passes xl-one-size on both devices (law 11). Petals/pink dots visible in the stills are background particles, not the seal.

## HANDOVER
Ready for RV-177 (delta vs r15 d2bf0c8c: only the 5 conflict files + press-keep.js + this report). Worktrees: /home/user/wt/r16 (branch), /home/user/wt/live, /home/user/wt/r15 (reference). Nothing pushed to main; no PR.
