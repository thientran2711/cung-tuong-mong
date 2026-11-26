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

# REVIEW robot-realtap d2e03d80..fd9218fe (harness) — BIG REVIEWER #8, 26/11 ~06:30Z
PRIORITY #1 CHECK: F #18 05:56Z order | review/robot-realtap ff4a99a4 (F10 renderer-mem hooks, from review/rerun-cnv-ban 8bd0b16c) + fd9218fe (FIXER #9 .kscn) | repro dev/handover/robot/stuck/E-S1-speed-buoi1-sangbuoi-disabled/ | LIVE = origin/main 02f564ae (stamp f009e1a6+ dd1ce3d0) via file:// (http server refused earlier).

## VERDICT: PASS robot-realtap fd9218fe (test/measure files only) — with one follow-up (F1) for the next harness commit

## Checks
- Static: robot-lint OK 0 findings; node --check renderer-mem-lib.js OK; .click( in robot-rt.js = 3, all page.mouse.click; lib 0 clicks / 0 dispatchEvent.
- (a) ff4a99a4 opt-in: MEMH is required only when RT_MEM is set; MEMH.init / MEMH.sample are no-ops otherwise; RT_DSF defaults to 1 (same viewport). Normal life, no env: iPad seed 501 slice 6 = 99 taps, 0 dead / 0 stuck / 0 bugs. RT_MEM life Fold seed 502 slice 6 = 49 taps, 0/0/0, mem.jsonl 6 rows (one per buổi) + .min.jsonl. sample() is fire-and-forget and BUSY-guarded; the hang watchdog runs only with RT_MEM (exit 3 above RT_HANGKILL MB = the existing crash→resume path).
- (b) fd9218fe .kscn, E-S1 ckpt (Fold thd/thd_tho bold seed 608519237, resume=1): OLD harness d2e03d80 → again «game softlock: Sang buổi disabled (Q=1 Đông sở)» + 93 new dead-button lines (taps on the covered page). NEW fd9218fe → area taps on the scene moved the story on («Sân chờ» → «Điện tuyển» → Thái hậu / Hoàng thượng), the life reached the game-imposed ending «Ban hoa · Bị ban hoa, xuất cung» at buổi 2, 16 taps, 0 new dead / 0 new bugs (the 96 dead / 2 bugs in its JSON are the ckpt's old ones). loop-1.png checked: «VIỆC · Giáo tập ma ma … Chạm để tiếp ▸» over the greyed «Sang buổi» = harness gap, not a game softlock. Same family as the .kscn-veil Q=3 line in my d2e03d80 review → that line is now explained (harness), not a game bug.

## F1 (follow-up, not blocking): RT_COLD (renderer-mem-lib coldHook) calls the game's own cold() = a game-function call that sends the life to lãnh cung. It is env-gated (RT_MEM + RT_COLD), but unlike the RT_TEST_* hooks it leaves NO trace in the results JSON (only in the mem .jsonl), so robot-audit would count such a run as a VALID real-tap life. Fix: stamp every game-driving test env present (RT_TEST_*, RT_COLD) into R.harness.testHooks at start; robot-audit marks a life with testHooks INVALID («test hook drove the game»). Gain vs risk: PASS now unblocks every life stuck on a .kscn story scene (frequent, hours lost); the RT_COLD risk is rare (only F10 memory runs set it), small, and found by grepping RT_COLD in run commands → gain is bigger.

# REVIEW robot-realtap fd9218fe..c18e3d7d + robot-audit 41f6e99c (F1) — BIG REVIEWER #8, 26/11 ~06:20Z
## VERDICT: PASS robot-realtap c18e3d7d
- Diff = 5 lines in robot-rt.js before play starts: TEST_HOOKS = env keys matching ^RT_(TEST_*|COLD)$ (not '' / '0') → R.harness.testHooks, merged after the ckpt resume (a ckpt's hooks survive a resume without env via Object.assign(R, ck.R)). No play-path change; robot-lint OK 0 findings.
- Stamp run: RT_TEST_SKIP=99 Fold seed 601 slice 1 → results harness.testHooks = {RT_TEST_SKIP: '99'}.
- Audit 41f6e99c: E-S1 resumed life (no hooks, ending «Ban hoa» game-imposed) → VALID; same JSON with testHooks {RT_COLD: '3'} → INVALID «test hooks used (RT_COLD=3)». F1 closed.

# REVIEW robot-realtap c18e3d7d..89f5b956 (#rtoast) — BIG REVIEWER #8 for F #19, 26/11 ~08:05Z
## VERDICT: PASS robot-realtap 89f5b956
- Diff: ignoreCover gains /rtoast/; INFO's #rtoast closer counts option cards (.kfoc-b/.kopt/.opt) as blocked targets and taps the bare THÀNH/BẠI .seal first (skips .kalog/.kkem/.kitem/buttons). robot-lint OK; 0 non-mouse .click.
- Game check: #rtoast is created in j19/j25/j42/j63 with onclick → remove «on» (j63's handler keeps KÈM as the pin); no other id/class contains «rtoast» (68 hits, all #rtoast) → the regex cannot match another layer.
- No real dead button hidden (synthetic realtap probe, button under 4 covers): span.kitem in #rtoast → popup; div#rtoast.on → popup; span.kitem in #kfoo (any other layer) → DEAD BUTTON; a child with its own id inside #rtoast → DEAD BUTTON (conservative, not hidden). The ignored refusal does not tap the button; the INFO closer must close the toast first, and if it never closes, the stall / 150-tap / 15-min stuck rules still report it.
- INFO closer: #rtoast.on (seal + kitem rows) over a .kfoc-b card → NEW returns the seal point (80,270), a real mouse tap closes it (on removed); OLD c18e3d7d returned null (the card was not counted as blocked) = the s9f gap.
- Plain slices on 89f5b956: Fold seed 701 slice 8 = 76 taps 0 dead/0 stuck/0 bugs; iPad seed 702 = 48 taps, game-imposed «Ban hoa» b1, 0/0/0.

# REVIEW robot-realtap 89f5b956..074abe46 + robot-audit 7cbc260e — BIG REVIEWER #8 for F #19, 26/11 ~09:00Z
## VERDICT: FAIL robot-realtap 074abe46 (1 item; the rest is OK)
LIVE = origin/main 6b5d3d05 (file://).
### FAIL 1 — BIG #7 regression: exam RESULT no longer seen (mgRes / mgPh «visible kitOvBtn»)
- jexam's result screen HIDES #kg82ok on purpose and leaves only the ✕ «Quay lại» (kitOvSync routes it to kitOvBtn) — the exact BIG #7 FAIL 54fa0112 case. jk4 kitOvBtn() returns that hidden #kg82ok (its panel is shown); the new check `k.getClientRects().length && k.offsetParent !== null` is false for it → mgRes false / mgPh '' → the ✕ is filtered as «back» → the robot area-taps the result board (Fold s31: 40+ AREA taps, then «#kg82 «Quay lại»» only via the give-up path) and the exam never records a result.
- Proof, RT_TEST_EXAM=2, same LIVE: NEW 074abe46 Fold s31 → done:false raws null; iPad s12 → done:false raws null. CONTROL 89f5b956 iPad s12 → done:true raws [5,5] (Fold s31 control ended at b1 «Ban hoa» on this LIVE, no exam reached).
- Fix idea: «stale» = the kitOvBtn's PANEL is hidden / not on screen (or the #ov frame is not the current board), not the button itself; or accept a hidden kitOvBtn when the visible ✕ of the same shown panel routes to it. Re-prove RT_TEST_EXAM Fold + iPad = done:true [5,5] AND the E-S6 «Lễ ra mắt» stale-panel case.
### OK (no change needed)
- (1) .kscn on top: synthetic SCAN — dialog on top covering the middle stays the layer (hits Nhận/Lui), a .kscn over a #kg82 under its veil → .kscn (tapSkip); a dialog on top but off-centre → .kscn in BOTH 89f5b956 and 074abe46 (pre-existing, not new). No cover is hidden: buttons under the veil were never «dead» (scene first), and a scene that never ends still hits the stall/stuck rules.
- (2) «Sẵn sàng» first + back only when it is the ONLY button and (result or mgLong give-up): no new early leave of a board (back is filtered whenever another button exists, also on mgLong). Law «no voluntary exit» kept — except that FAIL 1 turns every exam result into the give-up path.
- (3) audit 7cbc260e: exit with no exitPick on a realtap harness → VALID (imposed). Sound because the harness logs every tap on an EXIT_RE label into exitPick; residual gap (an exit option whose label is NOT in EXIT_RE) is shared with the picker blacklist — note for the fixer: when a new exit-road label shows up, add it to EXIT_RE (picker + audit both depend on it). mgQuit now counts #kg «Quay lại».
- Plain Fold s801 slice 10 = 112 taps, 0 dead/0 stuck/0 bugs; robot-lint OK.

# REVIEW robot-realtap 074abe46..08a4ff8b (fix of my FAIL 1) — BIG REVIEWER #8 for F #19, 26/11 ~09:40Z
## VERDICT: PASS robot-realtap 08a4ff8b (covers 074abe46 items 1–3 as reviewed above + this fix)
- Diff: mgRes / mgPh = kitOvBtn() (game's own panel test) AND no visible «Sẵn sàng» in #ov (mgRulesUp); the button's own visibility is no longer tested. robot-lint OK.
- RT_TEST_EXAM=1 on LIVE 6b5d3d05: Fold s31 → done:true raws [5,5]; iPad s12 → done:true raws [5,5] (was done:false ×2 on 074abe46). Both lives then ended at b1 «Ban hoa» (game-imposed). Fold logged 1 «harness area tap would have landed on a button — blocked» = the existing bare-area guard working, not a regression.
- Plain iPad s902 slice 10 = 52 taps, 0 dead / 0 stuck / 0 bugs.
- Residual (note, not blocking): a stale kitOvBtn during the PLAY phase with ONLY a back button on screen would read as result → back allowed; with any other board button present the back stays filtered (nb rule), so the window is a board that shows only ✕ mid-round — not seen in any run. The E-S6 stale-panel case is covered by logic (Sẵn sàng visible → not result), not by a replayed save.

## HANDOVER — BIG REVIEWER #8 (session_01UV1Szh76joeMedrwKCwNE6), 26/11 09:45Z, depth 3, START_CTX ~5 %, now ~53 % → rollover (worker rule: Foreman opens the successor)
- Verdict chain on review/robot-realtap: PASS 4d7a22c6 (BIG #7) → PASS d2e03d80 → PASS fd9218fe (+F1) → PASS c18e3d7d → PASS 89f5b956 → FAIL 074abe46 (exam result regression) → PASS 08a4ff8b. All sections above.
- OPEN, not started: review 08a4ff8b..5c62c2b9 (fixer #9: board play via KG82.peek() + real touch, persona hit rates; quick/auto-result family never picked except jexam drag rounds; unstick never taps ✕/«Quay lại» on a board not showing result; mgBackWhy log; RT_TEST_BOARD). Asked by F #20 session_01UV1SzgwtMTK26QKqkzEVsp 09:41Z. Also queued: review/qc-noise-hygiene when READY.
- How I tested (reuse): LIVE = repo root index.html of origin/main loaded by file:// (local http server was refused by the auto-mode classifier). Sparse worktree /home/user/wt/rr8 (review branch, dev/test + dev/measure/renderer-mem-lib.js). Old harness for controls: `git archive <sha> dev/test | tar -x -C <dir>` and run from there. Self-tests: RT_TEST_EXAM=1 (on LIVE 6b5d3d05 seeds 31/12 lose the selection at b1 with EXAM=2/3 → use 1), RT_TEST_SKIP=1, RT_TEST_Q72=2:ns_doi, RT_TEST_KID=2; always RT_NOSHOT=1, slice=4–10; rt-optcard-spots.js ONLY=… MAXP=6 for card probe points; synthetic SCAN probes = extract `const SCAN = () => {…\n};` from robot-rt.js and evaluate on a setContent page.
- For 5c62c2b9 check specially: KG82.peek() must be read-only (grep the game for peek; no state write), every tap still page.mouse/touchscreen; the quick/auto list must not open an exit road; regression RT_TEST_EXAM=1 Fold+iPad must stay done:true [5,5]; plain slices 0 dead.
