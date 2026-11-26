# REVIEW robot-realtap 93812531 (harness) — BIG REVIEWER #4 (session_01UV1Szh4xkQ1qFN3jffTKyr), 25/11
PRIORITY #1 CHECK ('robot-realtap|realtap.js|robot-rt'): claims BIG REVIEWER #2/#3 rows (F) | review/robot-realtap 93812531 (newest; bfe29c95 is its ancestor), review/robot-realtap-r cd89d545 (older merge of bfe29c95 onto LIVE — stale, not used), review/button-crawl-fix-3 6b401cfc (older realtap.js copy) | dev/PROGRESS_robot-realtap.md.

## VERDICT: PASS review/robot-realtap-r2 5e504d79 = merge of 93812531 onto button-crawl-fix-3 6b401cfc (which fast-forwards LIVE 9f72524b) — so r2 fast-forwards LIVE once fix-3 lands, or directly now (it contains fix-3). Test files only: no index.html/sw.js change needed.
Merge: one add/add conflict dev/test/realtap.js → took the robot-realtap version (same API RT.make/tap; adds touch-adjust-safe probe points, nested-chip skip). The fix-3 tests re-run with it: toil-overlay Fold/iPad rc 0 (0 dead), hoa-dien Fold/iPad rc 0, toilette Fold/iPad rc 0 (run alone; under 8 parallel browsers it once timed out on the Tư trang tab = CPU load).

## VALIDITY chain (code read + runs)
- No machine clicks in play paths: grep realtap.js / robot-rt.js / robot-rt-coop.js for .click( / dispatchEvent = 0 (only page.mouse.click / touchscreen.tap at hit-checked points). keyboard is used only to type text into a field the robot just tapped (a person typing); the unstick ladder is taps only. page.evaluate = reads + pre-life setup (__forceOrigin, a67init road pick) + an over() recording wrapper; no game function drives play.
- Probe points clear of chips (NEAR 24 px, nested .kodm/.kgl/.kchip/odds skipped), figure.ksart thumbnails never probe points; Tin báo act counter keyed without digits; KẾT QUẢ toast closed by a tap on its title / never under bare-area taps; 150 taps without a clock step = stuck loop bug + unstick; co-op seat dropped to #title rejoins via «Cùng hảo hữu → Trở lại phòng»; «Ô lưu»/sổ/settings UI in NAV_RE, never tapped; exit roads (EXIT_RE) never chosen while another option exists, never test-tapped by the dead-button probe; no time cap (harness.cap null), stuck = no clock progress 15 min → bug + shot + save, same life continues; ckpt resume.
- Self-test slices (real taps): LIVE 9f72524b Fold slice 4 = 30 taps, 0 dead, 0 stuck, 0 bugs, jsClicks 0, exitPick none · iPad slice 4 = 36 taps, 0/0/0. On r2 tree: Fold slice 3 = 21 taps 0/0/0 · iPad slice 3 = 39 taps, 1 «life not opened within 5 min on #title» (title had no buttons yet under 8 parallel browsers; the harness logged it, reloaded and finished the slice — designed behaviour, not reproduced in the light-load run).
- robot-rt-coop.js: node --check OK; not run end-to-end here (co-op pairs are covered by the runners' rounds; open co-op items stay with harness fixer #4: two-seat ladder rejoin, calendar divergence report 11:15Z).
- Laws: real taps (owner 25/11 ~05:10Z), no cap (~05:15Z), no exit road (~05:20Z/~05:40Z) all implemented; robot10.js carries the INVALID note. No game code, no UI, no words, no numbers touched.
Shots: scratch only, deleted; none in git.

# REVIEW robot-realtap 4d7a22c6..d2e03d80 (harness) — BIG REVIEWER #8 (session_01UV1Szh76joeMedrwKCwNE6), 26/11
PRIORITY #1 CHECK ('robot-realtap review'): claims BIG REVIEWER #8 row 26/11 04:30Z (F #18) | review/robot-realtap 4d7a22c6 (BIG #7 PASS) → ad5e1265 → d2e03d80 (HARNESS FIXER #9 READY) | dev/PROGRESS_robot-realtap.md FIXER #9 section | reused tools: dev/test/rt-optcard-spots.js, RT_TEST_* hooks.
Depth 3. START_CTX ~5 %. Local http server was REFUSED by the auto-mode classifier → LIVE loaded via file:///…/index.html (origin/main f009e1a6, build stamp 0a4c8010+ d402e37a51ed).

## VERDICT: PASS robot-realtap d2e03d80 (test files only: dev/test/robot-rt.js + PROGRESS)

## Checks
- Static: node dev/test/robot-lint.js → LINT OK 0 findings (7 files). grep .click( / dispatchEvent in play paths: robot-rt.js 3 hits = all page.mouse.click (iPad real pointer), realtap.js 1 mouse.click + comment, coop 0 → 0 machine clicks. New page.evaluate calls (q72Test, cyBook/kitItemCard) sit only inside env-gated RT_TEST_Q72 / RT_TEST_KID blocks.
- (1) .kmov/.kne tapSkip: RT_TEST_SKIP=1 Fold seed 31 → flip 28 s, book 21 s, backdrop 20 s, noCloseVerdicts 0; iPad seed 12 → 26/16/25 s, 0 verdicts (slower than fixer's 10/4/8 s: 6–8 browsers in parallel here). (First try SKIP=3 seeds 77/78 ended at buổi 1 «Ban hoa» = game-imposed selection ending, hook never ran; re-run as above.)
- (2) E-S4 «Lời nhờ»: RT_TEST_Q72=2:ns_doi seed 3966232191 — iPad 1180x820 = 2-column cards «Nhận lời» (554,554) / «Khéo từ chối» (858,554), both hit, robot took «Nhận lời» by real tap, frame gone in 7 s; Fold 755x1000 = 1 column (494,489)/(494,599), both hit, gone in 4 s; dead 0, stuck 0, bugs 0 on both slices. rt-optcard-spots.js ONLY=^q72: MAXP=6 (6 j72 offers): Fold 12/12 cards seen by new SCAN + probe point inside the card + real tap chose; iPad 2-col 8/8, 1-col 4/4; realtap 12+12 taps, dead 0, jsClicks 0, FAIL 0. Open (not reviewable here): the exact E-S4 stuck save was not replayed — re-run it on this sha when it arrives (fixer's note stands).
- (3) d2e03d80 NESTED POPUP ON TOP (#kidfl): RT_TEST_KID=2 Fold seed 91 / iPad seed 92 → card y_saxanh closed in 15 s each, deadNew 0, slice 0 dead/0 stuck/0 bugs. OFF-CENTRE check (fixer's caveat), synthetic SCAN probe (shop .dlg + kit item card [aria-modal] .dlg, both devices):
  | card position | OLD ad5e1265 layer hits | NEW d2e03d80 layer hits |
  | centre | ✕, Mua (card) | ✕, Mua (card) |
  | off left-bottom | Xem Chó, Xem Chim, ✕ (shop = WRONG) | ✕, Mua (card) |
  | off right-top | shop (WRONG) | card |
  | half off-screen right | shop (WRONG) | card |
  | over a full-screen #kg82 aria-modal | card | card |
  → old 6/10 wrong, new 10/10 right on Fold + iPad.
- No regression of BIG #7: RT_TEST_EXAM=2 on d2e03d80 iPad seed 12 → done true, raws [5,5], dragSkipExam 2, 0 dead/stuck/bugs; Fold seed 31 → done true, raws [5,5], 0/0/0 (rerun). Under heavy load the first Fold seed-31 run hit a GAME state: page «Dưỡng Tú viện · Đông sở/Tây sở» covered by div.kscn-veil (jkitsel selection scene, just landed f009e1a6) with «Sang buổi» disabled and Q=3 not shown → 203 dead-button lines + 2 «game softlock» bugs; SCAN layer = page (the new aria-modal rule not involved); same seed with the OLD harness 4d7a22c6 and the NEW one again both passed 0/0/0 → not harness; the harness reported it correctly. FOR F: watch for «.kscn-veil» cover / «Sang buổi disabled, Q=3» in life rounds (selection-scene-r19, load-timing).
- Laws touched: real taps (25/11 ~05:10Z) kept; no cap / no exit road untouched; no game code, UI, words or numbers touched. Shots none (RT_NOSHOT), scratch only.
