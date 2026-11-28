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

# REVIEW robot-realtap 08a4ff8b..5c62c2b9 (board play / no quick option / unstick no-back / mgBackWhy / RT_TEST_BOARD) — BIG REVIEWER #9 (session_01UV1SzhG9iG47sywkoL5qVr) for F #20, 26/11 ~10:35Z
PRIORITY #1 CHECK: OD robot-realtap reviews | main none (harness lives on review/*) | review/robot-realtap 5c62c2b9 (fixer #9, on 08a4ff8b PASS) | claims BIG #8 → #9.
## VERDICT: PASS robot-realtap 5c62c2b9 (test files only: dev/test/robot-rt.js + PROGRESS)
LIVE tested: 6b5d3d05 (the fixer's LIVE) and 3af7896e (current origin/main, LIVE 6b + mghelp-dress-r6), both by file://.
### Code checks
- Real taps only: board play taps via p.mouse.click (iPad) / p.touchscreen.tap (Fold), or bareTap when the peek point is not bare; 0 `.click()` in robot-rt.js; robot-lint OK.
- KG82.peek() read-only: every peek in j82 (lines 293/342/376/399/428), j91 (67/119/168/216/283/317) and j92 (462) is a pure lookup (find / compute a client point); no state write. Peeks returning {drag}/{sel}/{hold-only} have no finite x → the robot waits 1.5 s, then after 6 s idle falls back to the old area taps (as claimed).
- (b) quick family: removed only when another option stays (nq.length && nq.length < b.length); the jexam DRAG exam rule runs BEFORE it and now needs sc.mgExam → quick kept for exam drag rounds only. Labels checked in the game: «Thôi, không chơi» jsmg, «Giao cho người làm» jsgame, «Để trời định» j5/j79/j82, «Kết nhanh» jveil, «Học nhanh» j83, «Để tài nghệ quyết định» j82. None is an exit road.
- (c) unstick: lvl < 3 on /^#kg\d/ not on «result» → logged «mini-game board: no back», returns; lvl 3 reload still allowed, stall/stuck rules untouched.
- (d) mgBackWhy logged on every board back (capped 40). (e) RT_TEST_BOARD is stamped in R.harness.testHooks (TEST_HOOKS regex RT_TEST_*) → robot-audit marks such a life INVALID (F1 kept).
- mgLive(): phase play/intro/tut is never «result» even with a stale kitOvBtn — closes the residual I noted on 08a4ff8b (stale kitOvBtn mid-round).
### Runs (RT_NOSHOT=1)
| run | LIVE | result |
|---|---|---|
| RT_TEST_BOARD=vu Fold s31 | 6b5d3d05 | done, raw 9, not skipped, Sẵn sàng 1, peek taps 24 / miss 7, back 1 = result; life Ban hoa b1 (game) |
| RT_TEST_BOARD=vu iPad s12 | 6b5d3d05 | done, raw 10, not skipped, peek 24 / miss 8, back 1 = result |
| RT_TEST_BOARD=vu Fold s7 | 3af7896e | done, raw 10, peek 29 / miss 9, back = result |
| RT_TEST_BOARD=cam iPad s8 | 3af7896e | done, raw 2 (Đàn timed: known limit), not skipped, backs = result ×2 |
| RT_TEST_EXAM=1 Fold s31 / iPad s12 | 6b5d3d05 | done:true raws [5,5] both (dragSkipExam 2) — no regression of 08a4ff8b |
| plain Fold cautious s909 slice 8 / iPad bold s4242 slice 8 | 6b5d3d05 | buổi 8 / 8, 89 / 94 taps, 0 dead / 0 stuck / 0 bugs |
| plain iPad cautious s99 slice 8 | 3af7896e | buổi 8, 0 dead / 0 stuck / 0 bugs |
Every mgBackWhy entry in every run = ph «result», buttons [«Quay lại»]. 0 DEAD, 0 jsClicks everywhere.
### Notes for the next harness commit (not blocking)
- N1: the board-play bare check uses `button,[role=button],a,input,select,textarea`, narrower than GUARD_SEL (misses [data-tab], .kcard[data-i], #rtoast, .kkem, .kalog), and a bare hit taps WITHOUT the capture guard. Window = one CDP round trip, board is a canvas → rare, small (worst case a toast closes). Fix: reuse GUARD_SEL in the peek check and set window.__rtBare in the same page call.
- N2: a board showing ONLY a quick option + ✕/«Quay lại» (no «Sẵn sàng»): quick is removed (✕ counts as «another option»), then the back is filtered → null until the 6-min give-up, which then backs out (0/10) instead of taking the quick. Not seen in any run (every kg82 rules board has «Sẵn sàng»/«Bắt đầu»). Fix: count only non-back options in nq.
- N3: board moves are traced only as «BOARD n moves» and not counted in areaTaps / taps; fine for audit (real taps), but tap totals undercount boards.
- Limits as the fixer states: Đàn timed on Fold ~0, «Dâng hương» has no peek.

# REVIEW robot-realtap 5c62c2b9..ec026335 (kscn-veil family part 3) — BIG REVIEWER #9 for F #20, 26/11 ~11:30Z — ONE verdict for 08a4ff8b..ec026335
PRIORITY #1 CHECK: OD robot-realtap reviews | main none | review/robot-realtap ec026335 (on 5c62c2b9 PASS above) + review/temper-g4 bb86d9ac (reused .kdv-next tap) | claims BIG #9.
## VERDICT: PASS robot-realtap ec026335 (test files only; = 5c62c2b9 PASS above + ec026335)
- Diff: SCAN takes any visible .kscn (visibility ≠ hidden, ≥ 20 % of the screen, on top at its OWN centre) as the layer when the screen middle is not on a scene; new sc.kdvNext = point 40 px above the visible .kdv-next in the layer; an «area» choice taps it first through bareTap (guarded, real tap), else the old area taps. robot-lint OK, 0 `.click()`. Matches Foreman D's local patch bb86d9ac (same .kdv-next cue).
- Synthetic SCAN probe (iPad 1180x820, extract of SCAN on setContent pages): scene 540x820 at the right, off the screen middle, page buttons under it → NEW .kscn + kdv point inside the card / OLD 5c62c2b9 «page» with «Túi đồ | Sang buổi» (= the 25-min DEAD case). Scene < 20 % → page (both). visibility:hidden scene → page (both). A dialog on top at the scene's centre → not taken by the scene (both). So the new rule only adds the off-middle case.
- #kroul «Bỏ qua» confirmed: jk2b kitRoulette .krskip → end() (same end as the spin; the roll is dealt) = animation skip before the life, not a result skip; #kroul is not a #kg layer, so the board quick filter never sees it. Keep as is.
- Runs (RT_NOSHOT=1, NEW ec026335 vs CONTROL 5c62c2b9, same seed):
| run | LIVE | NEW | CONTROL |
|---|---|---|---|
| iPad cautious s21 slice 26 | 6b5d3d05 | buổi 26, 136 taps, 0 dead / 0 stuck / 0 bugs | buổi 26, 0 dead |
| iPad cautious s21 slice 26 | 3af7896e | buổi 26, 0 dead / 0 stuck / 0 bugs | buổi 26, 0 dead |
| iPad cautious s15 slice 6 | 3af7896e | buổi 6, 0 dead | through «Dưỡng Tú viện · Đông sở», 0 dead, Ban hoa b1 (game) |
| Fold cautious s15 slice 17 | 3af7896e | through «Dưỡng Tú viện» → «Đông sở» (map, night scene), 0 dead / 0 stuck / 0 bugs, Ban hoa b1 (game) | — |
- Gap (honest): on these LIVEs no run reproduced the QC 25-min «cover div.kscn-veil» DEAD case (controls 0 dead too; s21 on this harness does not pass through Đông sở on iPad), so the fix is proven by the synthetic probe + the fixer's lives, not by a replayed QC life. No regression seen.
- N1–N3 from the 5c62c2b9 review sent to fixer #9 directly (still open, non-blocking). New N4: the off-middle rule checks visibility:hidden but not opacity 0 / pointer-events; a fading-out scene still hit at its centre would be taken as the layer for a moment — rare, small, self-heals when it is removed.

# REVIEW robot-realtap ec026335..2df8f5fa (my N1–N3, fixer #9 READY) — BIG REVIEWER #9, 26/11 ~10:55Z
## VERDICT: PASS robot-realtap 2df8f5fa (test files only) — the branch tip now carries every verdict above (08a4ff8b..2df8f5fa)
- N1 OK: the peek bare check uses GUARD_SEL (passed in) and arms window.__rtBare in the same page call; with no capture guard installed yet (no __rtG) the point is «not bare» → bareTapOn takes the tap. Residual (tiny): a guard block during a board tap is counted in __rtBareN but logged on the next bareTapOn call, not on the board move.
- N2 OK: quick removed only when nq has a non-back move (`nq.some(x => !isMgBack(x))`); quick + ✕ only → the quick stays the move. Logic only (no live board shows just quick + ✕), as the fixer says.
- N3 OK: board moves add to areaTaps and boardTaps.
- Runs (RT_NOSHOT=1): RT_TEST_BOARD=vu iPad s12 raw 9 / Fold s7 raw 9 on 3af7896e, never skipped, backs = result; RT_TEST_EXAM=1 Fold s31 on 6b5d3d05 → done:true [5,5]. 0 dead / 0 stuck / 0 bugs; lint OK, 0 `.click()`. N4 (fading scene) still open, non-blocking.

# REVIEW robot-realtap 2df8f5fa..cbeb334b (BUILD PIN) + robot-audit 782c9fac — BIG REVIEWER #9 for F #21, 26/11 ~11:30Z
PRIORITY #1 CHECK: OD robot-realtap reviews | main none (harness on review/*) | review/robot-realtap cbeb334b (fixer #9 READY, on 2df8f5fa PASS), handover 782c9fac | claims BIG #9.
## VERDICT: FAIL robot-realtap cbeb334b (1 item: the recovery tool cannot find merge-built LIVE builds; the gate itself is right)
### FAIL 1 — rt-serve-build.sh `--b <id>` misses every build made in a STACK LAND merge (= the current LIVE)
- The lookup is `git log -S'"b":"<id>"' FETCH_HEAD -- index.html`; git log shows no diff for merge commits by default, and every LIVE build since the stack lands is rebuilt IN the merge (3af7896e = merge 6b5d3d05 + 4f377603, b7dcbbd06e03 appears in no parent).
- Proof: `rt-serve-build.sh --b b7dcbbd06e03 8899` (current LIVE 3af7896e) → «no main commit with build b7dcbbd06e03 in the last 60 main commits», exit 2. `--b 0281bf7bcef6` (LIVE 6b5d3d05) finds only 42e1fd7f (the review-branch parent that happened to carry the same built file), not 6b5d3d05. With `-m --first-parent` the same search returns 3af7896e.
- Also: the help says «<sha> = the «s» of window.CTM_BI, without «+»», but CTM_BI.s is the PARENT the build was made on (3af7896e's page says s 6b5d3d05+, 6b5d3d05's says bf6dd041+) → `rt-serve-build.sh <s>` serves the build BEFORE the life's build → the gate stops it again. The hard-stop message rightly points to --b, which is the broken path.
- Fix: find the commit by content on the first-parent main chain, e.g. `for c in $(git rev-list --first-parent -n 60 FETCH_HEAD); do git show $c:index.html | grep -q "\"b\":\"$BID\"" && { SHA=$c; break; }; done` (or `git log -m --first-parent -S…`); fix the help line (s = the build's parent, use --b); re-prove: start on one LIVE, mismatch on the next, `--b` serves the first LIVE (a merge-built one) and the resume goes on.
### OK
- buildGate after every load: boot (start / resume / crash restart resume=1; label resume vs reload by ck) and unstick reload; build0 kept in the ckpt; builds[] logged; robot-lint OK; no .click() / dispatchEvent anywhere in robot-rt.js (0 hits).
- Proof here: iPad bold s4242 started on LIVE 6b5d3d05 file:// (build0 bf6dd041+/0281bf7bcef6) → resume=1 against 3af7896e → «BUILD MISMATCH at resume: … page is 6b5d3d05+ (b7dcbbd06e03) — hard stop», exit 3, results json has buildMismatch + builds [start, resume], ckpt md5 unchanged (d5e15b6a… before and after) ✓.
- Co-op: robot-rt-coop seats are `Seat(...)` from robot-rt.js → same boot → same gate (process.exit(3) stops both seats = a hard stop, as wanted) ✓ (code read; no co-op run).
- robot-audit 782c9fac: builds with > 1 b or buildMismatch → INVALID «mixed build (s/b → s/b)» ✓. A mismatch run writes the wrong b into the results json only; the ckpt is clean, so the resumed life overwrites it with one build ✓.
- Small notes: (a) a later load with NO CTM_BI passes the gate silently (`if (!bi) return true`) — only matters for a pre-CTM_BI build, rare; (b) the fixer's announced follow-up (audit verdict wording) had not landed at this review — fold it into the FAIL fix.

# RE-REVIEW robot-realtap cbeb334b..8366c261 (BUILD PIN fix + part 2, RANK METRIC, GIFT PICKER, N4) — BIG REVIEWER #9 for F #21, 26/11 ~12:20Z
PRIORITY #1 CHECK: OD robot-realtap reviews | main none | review/robot-realtap 8366c261 (f3f8d944 + 8366c261 on cbeb334b FAIL) | claims BIG #9.
## VERDICT: FAIL robot-realtap 8366c261 (FAIL 1 of cbeb334b is fixed; 1 new blocking item + 2 small ones)
### FIXED (my cbeb334b FAIL 1)
- rt-serve-build.sh --b now walks main commits newest-first by index.html CONTENT (+ optional --t): `--b b7dcbbd06e03` → serves 3af7896e (merge-built LIVE) ✓; `--b 0281bf7bcef6` → 6b5d3d05 ✓. Gate compares b AND t ✓. A NEW life on LIVE 3af7896e (file://, from a git worktree) → «BUILD PIN: … served at http://127.0.0.1:8745/», played there, builds = 1, 205 s for a 2-buổi slice ✓.
- Nit left: the help line still says «<sha> = the «s» of window.CTM_BI» (s is the PARENT the build was made on) — fix the wording.
### FAIL 1 (new, blocking) — PIN is on by default and STALLS every run on a build that is not on main
- pinUrl() spawns rt-serve-build.sh detached and then polls 120 × 5 s; it never looks at the child's exit. When the build is not on the last 60 main commits (every review candidate a reviewer or a QC hook plays, a local worktree build) the script exits 2 at once, the harness waits 10 min at buổi 0, the freeze watchdog fires: «PAGE FROZE pinB at buổi 0 … exit 3», no life. Proof: 3af7896e index.html with b changed to a non-main id, file:// → rc 3 after 601 s, 0 buổi. Same when the harness runs outside a git checkout (`git archive` copy): «fatal: not a git repository» → 10-min stall.
- Fix: watch the child — exit ≠ 0 → no pin, log «BUILD PIN: build not on main, playing the given url (gate still on)» and go on at once; pin only a build rt-serve-build can find (or only when the given url is remote / LIVE), never stall.
### FAIL 2 (small) — `pin=0` on the command line does nothing
- PIN reads `C.pin`, but the main entry builds `Seat({ url, out, dev, bot, seed, life, origin, road, stuckMin, slice, cp, resume })` without `pin` → `pin=0` is ignored (my pin=0 runs were still pinned to :8745); only env RT_PIN=0 works. PROGRESS documents «pin=0 / RT_PIN=0 off». Fix: pass `pin: A.pin` (and the co-op Seat calls).
### FAIL 3 (small) — RT_TEST_KIP proves nothing on 4 seeds
- Fold s7 / s41, iPad s12 / s42 (LIVE 3af7896e): RT_TEST_KIP → {"open":"open 1","closed":true,"sec":3,"kipPick":0,"kipScroll":0,"kipGo":0,"deadEnd":0}. The check ends 3 s after the open when no `#modal [data-kip]` is on screen — the picker is queued (pushDil) and not yet shown, so the test reports «closed» before it ever appeared. Fix: wait until the picker is on screen first (or fail «never shown» after N s), then judge pick / scroll / go / dead-end.
- In real play the new code did run: iPad s42 buổi 3–4 logged «[game] item pick grid dead-end: no item can be given (28 items, every confirm disabled …)» then ✕, no stall ✓. Note: a confirm disabled for lack of khắc is the game's rule, not a game fault — consider [harness]/info instead of [game] when the card names the cost, so bug counts stay true.
### OK
- RANK METRIC: every S.rank snapshot (status / moments / end / dumps / over() wrapper) reads isSrv() ? 'maid ' + S.srv.rk : S.rank ✓ (code; read-only).
- N4: off-middle .kscn skipped at opacity < .1 or .kscn-out ✓.
- Real taps only: kip tiles / kipgo / ✕ via rt.tap, scroll via mouse.wheel; 0 .click() / dispatchEvent; robot-lint OK.
- Co-op: not exercised live here. The gate and pin go through the same Seat boot (code) → not blocking for the gate; the shared pin port for the friend seat is unproven — run one co-op room after FAIL 1–3.
- Audit: robot-audit.js (handover) still says «mixed build» inside the INVALID reasons; there is no separate «MIXED-BUILD» verdict yet → REQUIRED FOLLOW-UP (non-blocking for runners): a distinct verdict/label so mixed-build lives are counted apart from other INVALID ones.

# RE-REVIEW robot-realtap 8366c261..0e0ebe29 + robot-audit 851bc8c0 + 359716b8 — BIG REVIEWER #9 for F #21, 26/11 ~12:55Z (ONE verdict)
PRIORITY #1 CHECK: OD robot-realtap reviews | main none | review/robot-realtap 0e0ebe29 (7767c6fc + 0e0ebe29 on my 8366c261 FAIL) + handover 851bc8c0 / 359716b8 | claims BIG #9.
## VERDICT: PASS robot-realtap 0e0ebe29 (test files only) + robot-audit 851bc8c0 + 359716b8 — the tip carries every verdict 08a4ff8b..0e0ebe29
### My FAILs on 8366c261 — fixed
- FAIL 1 (pin stall): pinUrl now listens to the child's exit/error, caps the wait at 72 × 5 s and keeps R._loopAt fresh (the freeze watchdog reads it). Proof: 3af7896e page with a non-main b (fffffff00000), file:// from a git worktree → «BUILD PIN: rt-serve-build.sh exited 2 … no pin, the given url is used, the gate still stops a mismatch» at once, harness.pinFail {code 2}, life played to buổi 2, 171 s, builds = 1 (was 601 s «PAGE FROZE», 0 buổi) ✓.
- FAIL 2 (pin=0): Seat gets `pin: A.pin` in robot-rt.js and robot-rt-coop.js; the wrong 127.0.0.1:87xx–89xx skip regex is gone. Proof: `pin=0` iPad bold s4242 → no pinUrl, buổi 2, 87 s ✓.
- FAIL 3 (RT_TEST_KIP): judged only after the picker was SEEN, else «never shown» at 30 s ✓ (honest now). But on my seeds it is never shown: Fold s43 on 3af7896e AND on 6b5d3d05, iPad s12 → {"shown":false,…}; the fixer's Fold s43 shown:true is not reproduced here. Not blocking (self-test only; it no longer claims a pass): the grid play itself was seen in real play on 8366c261 (iPad s42 buổi 3–4: every confirm off → logged, ✕, no stall), same code in 0e0ebe29.
- «no item can be given now» is now [note], not [game] ✓. Help line: «use --b, CTM_BI.s = the parent» ✓ (7767c6fc). A load without CTM_BI = one [harness] bug + harness.buildUnknown ✓.
### Audit (handover)
- 851bc8c0 MIXED-BUILD: builds with > 1 b or buildMismatch → own verdict MIXED-BUILD, counted apart from VALID / INVALID in COUNTS and the table ✓.
- 359716b8 board quit: a board back is a quit only before the result (harness ≥ 5c62c2b9: mgBackWhy ph ≠ result and not a give-up; older traces: not after BOARD moves or a Đã hiểu / Xong / Nhận / Tiếp button); «Bỏ cuộc?» still a quit ✓. Note: mgBackWhy keeps the last 40 entries → a very long life can undercount quits (raise the cap or count in a counter).
### Notes (non-blocking)
- RT_TEST_KIP opens pushDil(mkP('giftpick')) but on Fold s43 / iPad s12 the picker never reaches the screen within 30 s — find why (queue behind another card, item rules) so the self-test can prove the scroll + confirm path.
- Co-op room still not run live (pin port shared via the same Seat — code read only).

## HANDOVER — BIG REVIEWER #9 (session_01UV1SzhG9iG47sywkoL5qVr), 26/11 ~12:50Z, depth 5, START_CTX ~5 %, now ~29 % → rollover (worker rule: Foreman F #22 session_01UV1SzhSdVUsfkytrb26tER opens the successor)
- Verdict chain on review/robot-realtap since BIG #8: PASS 5c62c2b9 → PASS ec026335 → PASS 2df8f5fa → FAIL cbeb334b (--b missed merge builds) → FAIL 8366c261 (pin 10-min stall, pin=0 ignored, KIP) → PASS 0e0ebe29 + audit 851bc8c0 / 359716b8. qc-noise-hygiene: FAIL 81c148b0 (sampler calls tinBaoList = state-writing), dev/handover/reports/qc-noise-hygiene-review.md (326067dd).
- QUEUE (from F #22): (1) QC-NOISE-HYGIENE #2 re-review when READY — check FIRST that noise-sampler.js calls no state-writing game function (my probe: real save + expired S.tb.K item + due S.tb.W item, one tinBaoList() → line rewritten / Math.random / KN.cb fired; re-run the same probe against the new sampler for 30 s: S unchanged, 0 Math.random), then re-measured tables A/B, then landing notes Q1 (quickcheck lanes rarely meet a flood day) / Q2 (base 6b5d3d05 vs LIVE 3af7896e). (2) HARNESS FIXER #10 session_01UV1SzhD1StB7MbhXXgUALS READY on robot-realtap (pick=<label regex> + uniform rand, exitPick pre-life tap, RT_TEST_KIP honest shown, mgBackWhy full count).
- Test recipe (reuse): run the harness from a GIT worktree (rt-serve-build.sh needs git; `git worktree add --no-checkout --detach <dir> <sha>` + sparse /dev/test/ /dev/measure/renderer-mem-lib.js); LIVE pages by file:// from `git archive <sha> index.html sw.js manifest.webmanifest assets.json icons`; RT_NOSHOT=1; RT_PIN=0 for quick checks, pin on to test pinning; a fake non-main build = sed the "b":"…" id in a LIVE index.html; controls = the previous harness sha in a second dir. Never run a bare `git fetch` in a worktree (it hung = unbounded); always `flock /home/user/wt/fetch.lock git fetch --depth=30 origin <branch>`. Kill leftover `http.server` / `rt-serve-build` after pin tests. Scratch: /home/user/wt/rr9 (not in git).

## REVIEW robot-realtap 0e0ebe29..8ea10d7e (+ audit 6ad6dad0) — BIG REVIEWER #10 (session_01UV1Szhak9NE4akDTPc45mF) for F #23, 26/11 ~15:20Z
PRIORITY #1 CHECK: OD 25/11 robot rules (F-robot-2511 verbatim) | main robot-rt.js copy 69e41729 (old, see note N3) | review/robot-realtap 8ea10d7e (fixer #10), BIG #9 PASS 0e0ebe29 | claims HARNESS FIXER #10 session_01UV1SzhD1StB7MbhXXgUALS (archived), fixer #11 (jobs 8, 9: not in this tip, not judged).
### VERDICT: PASS review/robot-realtap 8ea10d7e + robot-audit 6ad6dad0 (handover branch)
Tested on LIVE origin/main aa37de21 (git archive, served 127.0.0.1:8811), RT_PIN=0, RT_NOSHOT=1, harness run from a git worktree.
- Real taps only (owner 25/11 05:10Z): new code 0e0ebe29..8ea10d7e has 0 `.click(` / dispatchEvent / focus / keyboard (one «no keyboard» comment); RT_TEST_MENU taps by rt.tap; NO-EXIT fast path = option tap / bareTap / backdrop / unstick ladder / reload. jsClicks 0 and dead buttons 0 in all 8 slices (Fold 755x1000 + iPad 1180x820).
- JOB 1 pick= (+ JOB 7, my early finding 2): fixer's own cmd `RT_TEST_KC=n_c1@2 … pick='^(Ở cố quốc chờ hòa ước|Thưa: con xin đi)'` → took «Thưa: con xin đi, vì muôn dân» 3/3: Fold sens 64, Fold cautious 66, iPad sens 61; pick.n 2, exitRefused 0 each (the Fold seed-61 undo I saw on b57ba63b is gone: siblings blocked for that screen + buổi). Exit roads never pickable (ne = !isExit) ✓. Uniform rand / .kodds weights: code read (cardWay → score(c), oddsOf reads the kit odds word) ✓. rt-choice-scan --unit OK.
- JOB 2 + JOB 6 (my early finding 1): exitPick.live = last scan S.name && !S.dead; entry excused only when !live. RT_TEST_MENU=2 mid-life ☰ («Ô lưu» = #menu) → «Chơi một mình» → «Bắt đầu kiếp mới»: Fold exitPick {screen «Chọn sổ», live:true}, iPad {.dlg «Chọn sổ», live:true} ✓. Audit on those records (test hooks stripped, ending «Xuất gia»): live:true → INVALID «bot-chosen exit road»; the same tap with live:false → excused (game-imposed); no exitPick → VALID ✓. robot-audit-unit 11/11 on the handover tip ✓. Fresh starts in every slice: exitPick null ✓.
- JOB 3a/3b (KIP queue, mgBack counters): KC test shows queuedFirst → shown → closed (waits while queued) ✓; mgBackN / mgBackQuitN present, audit uses mgBackQuitN (unit «57 with 40 details → 57») ✓.
- JOB 4 resume: pf64 ckpt resumed (resume=1) → «RESUME: save restored on http://127.0.0.1:8811 … 8 keys» → buổi 7, 0 dead ✓ (cross-origin pin move not re-run by me: needs the pin server; fixer proofs Fold 162140/162140, iPad 148158/148158 accepted).
- JOB 5 NO-EXIT: RT_TEST_NOEXIT=2 Fold seed 61 → «NO-EXIT DIALOG» logged once (bugs 1), visit 1 63 s, visits 2–3 42 s each (fast path), stuck 0 ✓ (= fixer 64 / 42–48 s; was 920 s).
- JOB 10 (answer, rank = S.rank / S.srv.rk) — no code; routed to MAIN by F ✓.
### Notes (not blocking)
- N1 resume check is length-only and silent when the ckpt holds no save: my resume of an early (buổi 1) ckpt printed «126492 of 0 chars» — want 0 (no hclh-save in that ckpt), got = the save left in the persistent profile. When want == 0, print «ckpt holds no save» (and prefer comparing a hash / S.name+buổi, not length).
- N2 audit wording: «bot-chosen exit road «X» with undefined options» when exitPick has no n (tap outside the exit-only branch) → print «by a tap outside the picker».
- N3 (FOR MAIN, also in qc-noise-hygiene review): hook 96 / noise-day use the kit's dev/test/robot-rt.js when present (noise-day.js:63) = main's old copy 69e41729; landing robot-realtap 8ea10d7e's dev/test (robot-rt.js, realtap.js, rt-*.js) on main gives the hooks this harness.
- Jobs 8 (board idle leave) and 9 (save stale / console) open at fixer #11 → second verdict.

## HANDOVER — BIG REVIEWER #10 (session_01UV1Szhak9NE4akDTPc45mF), 26/11 ~15:25Z, depth 7, START_CTX ~5 % est., now ~33 % → rollover (worker rule: Foreman F #23 session_01UV1SzkBqakBZsp8BKPE4Y2 opens BIG #11)
- Verdicts this shift: qc-noise-hygiene FAIL e5c39877 (09e2d976) → PASS review/qc-noise-hygiene-r10b bdb0f65d (007ec6de; = 5e1a6eda + main aa37de21; -r10 acf94a95 superseded, force-push was denied so a new branch name was used) · robot-realtap PASS 8ea10d7e + audit 6ad6dad0 (38dc5f18).
- QUEUE for BIG #11: (1) HARNESS FIXER #11 jobs 8 (board idle leave: stay to the round's end, every persona, 39 mg kinds) + 9 (save stale / console) → one verdict 8ea10d7e..<tip>; (2) re-check my notes N1/N2 if the fixer takes them.
- Recipe (adds to BIG #9's): LIVE = `git archive origin/main index.html sw.js manifest.webmanifest assets.json icons` → `python3 -m http.server <port>` → RT_PIN=0 RT_NOSHOT=1 node dev/test/robot-rt.js http://127.0.0.1:<port>/ <out> … from a git worktree of the harness tip. Use origin=pf road=pt_su for self-test slices (plain seeds often end «Ban hoa» at buổi 1 before RT_TEST_* fire). robot-audit skips slices: to audit a test record, copy it, set life {id:<an EXIT_IDS name>, type:'end'}, drop harness.testHooks, give a distinct job.id + age. Hook 96 / noise-day use the KIT's dev/test/robot-rt.js when present (main's old 69e41729), RT_HARNESS_REF is ignored then. Handover-branch ancestry checks lie on --depth=30 (shallow graft): check content (git show <ref>:<file> | grep) not merge-base; a non-FF fetch needs `+refspec` into the tracking ref.

## REVIEW robot-realtap 8ea10d7e..947aeec9 (+ audit 74d434fb) — BIG REVIEWER #11 (session_01UV1Szjs3UrHr6zeryojcgp) for F #23 → F #24, 26/11 ~16:30Z
PRIORITY #1 CHECK: OD robot rules 25/11 (F-robot-2511.md verbatim) | main dev/measure/robot-audit.js, old robot-rt copy 69e41729 | review/robot-realtap 8ea10d7e (BIG #10 PASS) → cebb0213 → 947aeec9 (fixer #11 item 16 LATE BUTTON) | claims BIG #11 by F #23 15:24Z.
### VERDICT: FAIL review/robot-realtap 947aeec9 (2 blocking items; everything else checked OK) · audit 74d434fb PASS
Tested on LIVE origin/main aa37de21 (build 5ab5b80e406e, git archive served 127.0.0.1:8831), RT_PIN=0 RT_NOSHOT=1, harness from git worktrees of cebb0213 and 947aeec9.
### BLOCKING
1. JOB 15 is a no-op. robot-rt.js: `rt.tap(h, {…})` has no `keep`, so realtap disposes `h` after the tap; the ownOpen check then calls `p.evaluate(([e0, c]) => …, [h, cr0])` with the disposed handle → Playwright throws («arg.handles[0]: no object with guid handle@…», reproduced) → `.catch(() => true)` → ownOpen is ALWAYS true → `closeOwnLayer` can never count, the shop card «Lui» (.kshdet data-kshdetx) still counts toward NO EFFECT exactly as before. Every run here: closeOwnLayer 0. Fix: tap with `{ keep: true }` and dispose h after the check (or drop e0 and judge by the cr0 point check alone); a throw must fall back to the point check, not to «open». Proof wanted: a self-test where a close removes only its own card while the dialog title stays (→ closeOwnLayer 1, no NO EFFECT) AND a truly dead ✕ (→ NO EFFECT still counted at 3).
2. JOB 9 (b) SAVE STALE never fires once the robot reloads. RT_TEST_QUOTA=2 cp=5 to buổi 30, 3 of 3 lives: Fold speed s21, Fold sens pf/pt_su s43, iPad cautious s72 — the stored save stays at clock «1.1.0.0» (120237 / 97782 / 120117 chars) from buổi 2 to 30, «CP SAVE ERROR: setItem failed N× QuotaExceededError» and the game bug QuotaExceededError ARE logged, but 0 «SAVE STALE». Cause (traces): each life had an unstick reload → «Chọn sổ» «Tiếp tục kiếp này» → the game loads the stale save, the live clock jumps back to the stored clock, and `cm[key] = R.buoi` re-dates that clock to «now» → lag ≈ 0 again. The rewind itself (the life silently loses every buổi since the last good save — the s3f harm) is not flagged either. Fix: keep the FIRST buổi a clock was seen (never overwrite cm[key]); after every reload / resume compare the live clock with the last live clock before it — a backward jump = bug game «SAVE REWIND: reload went back from b<x> to the stored b<y> (N buổi lost)». Proof: RT_TEST_QUOTA + one forced reload, Fold + iPad (the fixer's q-i / q-f2 proofs had no reload, so they passed).
### CHECKED OK
- Real taps (owner 25/11 05:10Z): 0 `.click(` / dispatchEvent in play paths (only the realtap.js comment; the RT_TEST_LATE fixture's `b.onclick` is the test layer's own handler, tapped for real); jsClicks 0, dead buttons 0 in all 20 runs. robot-lint OK (cebb0213 and 947aeec9).
- JOB 11 BARE_CHECK: rt-bare-unit 16/16 (Fold touch + iPad mouse). Live slices: bareBlocked 0, bareCovered 1–6 per life (moving button.kbtn.k1, button.tok.fig.bob). DEAD BUTTON NOT HIDDEN: BARE_CHECK is used only by bare-area taps (bareTapOn); rt.tap / PROBE / dead() are unchanged. My proof (scratch, realtap.js of the tip): a button under a steady opaque layer, under a LEAVING layer (30 s opacity transition), and with a live animated button nearby → rt.tap = false + DEAD BUTTON, button not hit, 3/3 on Fold and 3/3 on iPad; the uncovered button → tapped, hit 1.
- JOB 8 boards played to the result, every log line «BOARD <kind> N moves <result>»: RT_TEST_BOARD Fold mua 23 moves 6/10 (cautious, 44 s), Fold hat 15 moves 0/10 (sens), iPad dan 8 moves 0/10 raw 2.3 (bold), iPad theu 32 moves 10/10 (speed); natural board Fold sens s61 «dan 15 moves 4/10 raw 7.3»; harness.boards + boardN filled; quickSkipped 1, no «Bỏ qua».
- JOB 9 (a): «PAGE CONSOLE error» lines with the file named (×n, then every 100th); setItem observer: «[rt] localStorage.setItem failed: QuotaExceededError key hclh-save-v2-1 (106499 chars)» + bug game QuotaExceededError + CP SAVE ERROR, game flow unchanged (lives played on).
- JOB 12: two resumes of buổi-1 ckpts (Fold, save stripped; iPad, none) → «RESUME: NO SAVE IN CKPT» + harness bug ✓. The hash branch (ckpt with a save) not re-run by me (no such ckpt in my slices) — fixer's rs-i accepted on code read.
- JOB 13 / audit 74d434fb: robot-audit-unit 12/12 on the handover tip; «(option count not recorded)», no «undefined» ✓.
- JOB 14: first CP lines «CP buổi 5 year 1 …», none with year null ✓.
- Item 16 LATE BUTTON (947aeec9): RT_TEST_NOEXIT=2 RT_TEST_LATE=40000 → «LATE BUTTON … «Ta biết rồi» after 35075 / 34125 / 34211 ms» + «NO-EXIT withdrawn», closed by a real tap at 42 s: Fold s21, iPad s21, iPad s61 ✓ (see N1 for the 4th run).
### NOTES (not blocking)
- N1 LATE BUTTON can be missed: 1 of 4 runs (iPad sens pf/pt_su s61, first run) the NO-EXIT unstick ladder («NOEXIT UNSTICK 2» ×6) tapped «Ta biết rồi» itself («#rtTestNx «unstick Ta biết rồi»» at 140 s) before a picker scan saw it → no LATE BUTTON, no bug — the s10g case is exactly this path. Fix: the unstick ladder, when it taps a button on an nx visit whose noWayAt is ≥ 10 s old, logs the same late-button bug.
- N2 LATE BUTTON counts any button that becomes `hit` ≥ 10 s after the visit began; a button below the fold that becomes hit only after the harness scrolls to it would read as a game «late button» (code read; not seen) — exclude buttons that were present but not hit.
- N3 CP default 50 buổi: in real lives SAVE STALE (once fixed) speaks at buổi 50 at the earliest; fine, but say so in the help line.
- N4 «RESUME: save restored … (127189 of 0 chars …)» still prints before the NO SAVE line (cosmetic).
- N5 For MAIN (game, already in the fixer's note): Đàn / Hát boards score low with every peek hit (hat 15 moves 0/10, dan 8 moves 0/10).
- N6 After a resume on the local serve, #kload «Vào cung ngay» stalled the picker 105 steps (button gone) — local serve without assets; check on github.io before calling it a game bug.

## HANDOVER — BIG REVIEWER #11 (session_01UV1Szjs3UrHr6zeryojcgp), 26/11 ~16:30Z, START_CTX ~5 % est., now ~40 % est. (worker rule: Foreman F #24 session_01UV1SzmHA5hTTRBKmL8icCW opens the successor if needed)
- Verdict: FAIL robot-realtap 947aeec9 (JOB 15 disposed-handle no-op; SAVE STALE defeated by a reload) · audit 74d434fb PASS.
- Re-review recipe: (1) JOB 15 self-test both ways (own-card close → closeOwnLayer ≥ 1; dead ✕ → NO EFFECT 3); (2) `RT_TEST_QUOTA=2 … cp=5 slice=30` with a reload in the life → «SAVE STALE» and «SAVE REWIND»; seeds that live past buổi 1 on LIVE aa37de21: Fold `bot=speed seed=21`, Fold `origin=pf road=pt_su bot=sens seed=43`, iPad `bot=cautious seed=72` (most pf/pt_su seeds and Fold s33/62/72 end «Ban hoa» at buổi 1); (3) RT_TEST_NOEXIT=2 RT_TEST_LATE=40000 ×4 for N1. Run each from a git worktree of the tip; LIVE by git archive + http.server; kill leftover http.server after.
- QUEUE for the next reviewer (F #24 16:01Z): ONE verdict on review/robot-realtap 8ea10d7e..<fixer tip> (+ audit 74d434fb): my 2 blockers + N1/N2 fixes, AND bb89b055 job 17 tap-to-skip (skipLay(): .kmov .kne .kscn #kdaytc, .kmhint/.kne-beat, tap-anywhere text; real centre tap must hit the layer; ≤20 taps / 90 s per visit; RT_TEST_SKIPLAYER) — NOT reviewed by me. Check that a layer with NO button and NO skip hint still logs a GAME bug (NO-EXIT / no way out), and that skip taps can never hide a DEAD BUTTON. BIG #11 rolled at ~40 % (START_CTX ~5 % + 25 % passed).

## REVIEW robot-realtap 8ea10d7e..aece1ff5 — BIG #12 (range extended by F #24 to 8ea10d7e..6677dd13; + audit 74d434fb), 26/11 ~19:30Z
PRIORITY #1 CHECK: OD robot real-tap rules 25/11 (F-robot-2511.md verbatim) | main dev/test/robot-rt* old copy 69e41729 | review/robot-realtap 8ea10d7e (BIG #10 PASS) → 947aeec9 (BIG #11 FAIL) → aece1ff5 → 6677dd13 | claims BIG #11 rolled, its queue = this job.
### VERDICT: FAIL review/robot-realtap 6677dd13 (2 blocking items, both JOB 17 bb89b055) · audit 74d434fb PASS
Tested on LIVE origin/main b881686f (build 4eb0cbfc91b0; main moved since aa37de21), git archive served 127.0.0.1:8841, RT_NOSHOT=1, harness from git worktrees of 947aeec9 (control), aece1ff5, 6677dd13; job-17 fixtures in scratch copies only (hook /home/user/wt/rr12-probe/hook-rev12.js, env RT_REV12=<mode>, not in git).
### BLOCKING
1. JOB 17 REGRESSION on the game's own night card (the s14 family the job was meant to fix). SCAN now skips the «no hit button → layer of the last hit button» fallback whenever skipLay(lay) is true. kitNewDay (lonely night «Đêm không được triệu») puts `.kne.kne-beat` inside host `#dawn`; the first tap calls kitSceneEnd(host), which appends `button.kmend «Tiếp theo»` to `#dawn` — a SIBLING of `.kne`, outside the voted layer — and `host.onclick` ignores every later tap once `.kmend` exists. The robot never sees «Tiếp theo», skip-taps 20–25×, then «NO-EXIT DIALOG .kne «» (div.kne.kne-beat): no button at all» + reload (unstick 3). Repro: game's own `window.kitNewDay({host:#dawn, night:{k:'lonely',line:'…'}, day:{…}})` at buổi 2 (RT_REV12=kne): 947aeec9 Fold s43 pf + iPad s61 pf → «#dawn «Tiếp theo»» tapped, closed in 9 s, 0 bugs; aece1ff5 same seeds → 63 / 64 s, 20/25 skip taps, NO-EXIT + reload, Fold AND iPad. Seen naturally too: RT_TEST_QUOTA=2 RT_TEST_RELOAD=8 Fold pf/pt_su sens s43 30 buổi: «NOEXIT UNSTICK 3 .kne «»» → reload 5× (each reload = SAVE REWIND under quota). On a real life this is one reload per lonely night. Fix: when the skip layer has no hit button, still take a hit button of its host / enclosing LAYER (`#dawn` around `.kne`), i.e. keep the old fallback for buttons that are on top and belong to an ancestor host; add a self-test that uses the game's kitNewDay, not a synthetic layer.
2. JOB 17 HIDES A TRULY COVERED BUTTON. The skip block runs when `!sc.b.some(x => x.hit || x.cl)`: a layer whose only button is covered by a FOREIGN layer (deadSuspect) counts as «no button» → 20 skip taps → NO-EXIT «no button at all» (type harness) → reload; DEAD BUTTON never fires. Fixture (RT_REV12=cov-steady|cov-leave|cov-anim): a role=dialog layer with «Chạm để bỏ qua», one button «Tiếp» (its only way out), a separate fixed div over the button (steady opaque / 60 s opacity transition / infinite animation). aece1ff5: cov-steady Fold s43 + iPad s61, cov-leave Fold, cov-anim iPad → dead [] and «NO-EXIT DIALOG #rtR12 … no button at all» in all 4. Control 947aeec9 cov-steady Fold s43 → «DEAD BUTTON Tiếp cover div#rtR12c» + game «no way out». When another button of the layer IS hit (RT_REV12=mix-*, tap on the layer skips by design), DEAD BUTTON still fires on aece1ff5 for steady (Fold), leaving (iPad), animated (Fold) covers ✓ — the hole is the all-covered case only. Fix: skip taps must not run while any button of the layer is deadSuspect (let the dead check / «no way out» run), and the NO-EXIT reason must not say «no button at all» when the layer has buttons.
### CHECKED OK
- B1 JOB 15 (keep:true + point fallback): RT_TEST_OWNCLOSE own Fold s43 → {closeOwnLayer 1, noEffect 0, closed by «Đóng» 6 s}; dead Fold s43 → «close button has no effect … «Lui»», noEffect 1; dead iPad s72 (debug copy) → handle check v=true every tap, NO EFFECT 1 ✓. Code read: a throw / disposed handle → cr0 point check, never «open»; h disposed after ✓. See N1 for the iPad fixture.
- B2 SAVE STALE / SAVE REWIND: RT_TEST_QUOTA=2 RT_TEST_RELOAD=8 cp=5 slice=30 → Fold speed s21 «SAVE REWIND … from b8 (1.0.1.3) to the stored b2 (1.0.0.1) (6 buổi lost)» + «SAVE STALE stored b2 live b25 … QuotaExceededError»; iPad sens pf s61 the same (6 lost, STALE b2/b25); iPad cautious s72 the same; Fold pf s43 rewinds 2–3 buổi each (see blocking 1) + STALE b2/b30 ✓. jsClicks 0, dead 0, stuck 0 in all.
- N1/N2 LATE BUTTON (RT_TEST_NOEXIT=2 RT_TEST_LATE=40000, tip 6677dd13): Fold s21 34750 ms, Fold pf s43 33736 ms, iPad pf s61 33600 ms → «LATE BUTTON … «Ta biết rồi»» + «NO-EXIT withdrawn», 3/3 (iPad s72 died «Ban hoa» at buổi 1). N1 code: unstick() calls R._lateFn before its tap ✓. N2 code: labels clipped below the fold at noWayAt are excluded (no fixture run; code read only).
- JOB 17 other cases: a layer with neither button nor hint (RT_REV12=plain) → NO-EXIT DIALOG on Fold + iPad ✓; a .kmov with hint and no way (RT_REV12=skip, iPad) → 20 skip taps then NO-EXIT ✓; skip-tap guard rt-bare-unit 20/20 (I/J own-layer cases) ✓. Note: NO-EXIT is logged as type harness (pre-existing since 8ea10d7e, PASSed by BIG #10), not game.
- JOB 19 BUILD PIN (6677dd13): law-11 scan — every reload / goto in play: boot() (pins), resume put+reload → boot() (pins), pre-life stuck → reloadPinned, unstick lvl 3 (all 9 callers incl. RT_TEST_RELOAD, no-way-out, SANG-BUỔI, peer rejoin) → reloadPinned; only RT_TEST_DRIFT / RT_TEST_CRASH goto on purpose; crash/freeze → exit + resume → boot. RT_TEST_RELOAD=3 RT_TEST_DRIFT=1 (pin on): Fold pf s43 and iPad pf s61 → «BUILD PIN: unstick reload — the tab was on :8841, back to the pinned :8767 (carrying 5 localStorage keys …)», testReload url :8767, pinReturn 1, life played on, 0 bugs ✓. Twin server: the iPad life started with the Fold's server up → «rt-serve-build.sh exited 1 but :8767 serves 4eb0cbfc91b0 (another life started it) — pinned» ✓. rt-serve-build checkout under a per-dir flock (code read) ✓.
- JOB 18 dress board (RT_TEST_DRESS=2, 12 fitting pieces): Fold s43 → done, placed 4, not skipped, 58 s; iPad s61 → placed 4, 68 s; taps alternate «tile → Đặt vào <ô>» by real taps, no «Bỏ qua» ✓. It reads the board (takes whatever «Đặt vào …» the game shows, tiles from the screen) — not a blind script; but see N3.
- Real taps: 0 `.click(` / dispatchEvent / focus in play paths of robot-rt.js / realtap.js / robot-rt-coop.js (only the realtap comment; keyboard only types the ám hiệu, pre-existing); new fixtures' listeners are their own test layers. robot-lint OK (aece1ff5, 6677dd13); rt-bare-unit 20/20; robot-audit-unit UNIT OK on the handover tip.
- LIVE slices (game = origin/main b881686f): tip 6677dd13 12 buổi Fold speed s21, iPad cautious s72, iPad sens pf s61 + aece1ff5 10 buổi Fold/iPad pf s43/s61: jsClicks 0, dead 0, NO-EXIT 0, stuck 0, exitPick none; boards to a result («BOARD tho 0 moves 2/10 … area 40»). Fold pf s43 on the tip died «Ban hoa» at buổi 1 (seeds are not stable on b881686f).
### NOTES (not blocking)
- N1 RT_TEST_OWNCLOSE fixture uses class `.dlg`: the game's CSS caps .dlg at 470 px, so on iPad 1180x820 it is a left panel with the page live beside it and the robot plays the page (oc i61/i72 own: «still open», closeOwnLayer 0 / counts from real game dialogs). Use role=dialog + full-screen (no .dlg) so the iPad proof means something.
- N2 skip-tap `own` = document.querySelector(sc.layer): '.kne' / '.kmov' pick the FIRST match (may be a hidden copy); an element with no id/class gives '.' (invalid → refused → fallback tap). Pass the element itself (window.__rtLay) instead.
- N3 JOB 18: tiles are picked at random even for bot=sens/cautious, ignoring the board's own «hợp đề / không hợp đề» lines, and «Ra mắt» goes after a fixed 4 puts / 16 looks (replacements count as puts) — a person reads the theme fit and the slot count. Suggest: prefer «hợp đề» pieces by persona, present when every slot the board shows is filled (or the cap).
- N4 tho board: «BOARD tho 0 moves … area 40–46, 0–2/10» on Fold and iPad (tip and aece1ff5) — check whether tho has real moves the robot misses (for the next fixer; not a job-17 item).
- N5 «late button «Vào cung ngay» 13.3 s after #klife» on the local serve (assets missing locally); judge on github.io (same as the fixer's note).

## HANDOVER — BIG REVIEWER #12 (for F #24 session_01UV1SzmHA5hTTRBKmL8icCW), 26/11 ~19:30Z
- Verdict: FAIL robot-realtap 6677dd13 (job 17: night card .kne/#dawn «Tiếp theo» regression; all-covered button hidden by skip taps) · audit 74d434fb PASS. Everything else (B1, B2, N1, N2, JOB 18, JOB 19) checked OK above.
- Re-review recipe: (1) RT_REV12=kne (game's kitNewDay lonely night) Fold + iPad → closed via «#dawn «Tiếp theo»» ≤ 15 s, NO-EXIT 0; (2) RT_REV12=cov-steady|cov-leave|cov-anim → DEAD BUTTON «Tiếp» (cover div#rtR12c) on both devices, and mix-* still DEAD; (3) plain / skip still NO-EXIT. Hook text: /home/user/wt/rr12-probe/hook-rev12.js + the kne branch (insert before `if (process.env.RT_TEST_QUOTA && started` in a scratch copy) — better: the fixer adds these as RT_TEST_* modes. Seeds alive past buổi 1 on b881686f: Fold speed s21, Fold pf/pt_su sens s43, iPad cautious s72, iPad pf/pt_su sens s61 (each dies «Ban hoa» at buổi 1 now and then — run 2 copies). Server: python3 -m http.server 8841 in /home/user/wt/rr12-live (git archive origin/main).

## REVIEW robot-realtap 8ea10d7e..f0737e88 — BIG #13 (resume of the BIG #13 run lost to a container restart; + audit 74d434fb), 26/11 ~22:30Z
PRIORITY #1 CHECK: OD robot real-tap rules 25/11 (F-robot-2511.md verbatim) | review/robot-realtap 8ea10d7e PASS (BIG #10) → 947aeec9 FAIL (BIG #11) → 6677dd13 FAIL (BIG #12, bf5e865a) → f0737e88 (FIXER #12, items 21–24) | claims BIG #13 (first run's logs in /home/user/wt/rr13-out reused when finished: LIFE DONE + result line; cut-off runs rerun).
### VERDICT: FAIL review/robot-realtap f0737e88 (1 blocking item: item 21 rule (b) «NEW hit button since the skip layer came up») · audit 74d434fb PASS
Tested on LIVE origin/main f573dc94 (build cc68dcfd2b1b), git archive served 127.0.0.1:8861, RT_NOSHOT=1, RT_PIN=0 (pin on for DRIFT), harness from a git worktree of f0737e88; controls 6677dd13 (+ the KNE hook = rr13-ctl, + my fixture = rr13-ctlx). Scratch fixtures (not in git): RT_REV13=plain|rerender|rerender5|stale|stale5|shift|newbtn|covkeep in /home/user/wt/rr13-out/hook-rev13.js (a .kscn scene on the right 65 %, a page bar of 2 buttons on the left re-drawn every 1.5 s; `stale*` = the first page button's label carries a counter «Tin báo (k)» like the game's badges; `*5` = the scene needs 6 taps).
### BLOCKING
1. ITEM 21 RULE (b) PULLS THE ROBOT OFF A STORY SCENE AND FLOODS FALSE DEAD BUTTONS (brief point d). SCAN keys the skip layer's first-scan hit buttons by `label(40) + spot`; any hit button whose LABEL changed later counts as «new» and beats skip taps, and the base is never refreshed. The game's top bar and tab bar stay live beside a .kscn scene (the same note in SCAN: «both stay live», E-S1 «probed covered page buttons for 5 min»), and their labels change while a scene runs («Bạc130Sức100/100», «Buổi sáng, còn 4 khắc», «Tin báo: 2 tin mới», «(có mới)»). After one scene tap the page under it re-renders → a top-bar button is «new» → `lay` = page → deadCheck (now also run for a no-hit layer) probes every page button under div.kscn-veil → one DEAD BUTTON every ~6 s until the 150-tap loop bug.
   - LIVE, no test hook, tip unchanged: `RT_PIN=0 RT_NOSHOT=1 node dev/test/robot-rt.js http://127.0.0.1:8861/ <out> life=L-i72a dev=ipad bot=cautious seed=72 slice=12` → after «.dlg «Sân chờ» «Đứng yên giữ sức»» (Ngày thứ hai — Điện tuyển) the .kscn scene stays up and the robot logs 88 «DEAD BUTTON page «Dưỡng Tú viện · Tiền sảnh …» «<every page button>» cover div.kscn-veil» from 125 s to 724 s, then a false «stuck no-clock loop: 150 taps» + a false game «softlock: «Sang buổi» disabled with no dialog». jsClicks 0, but dead 88 → brief (f) fails.
   - The same moment on Fold speed s21 (lives on the tip with hooks that had not fired yet): oc-own-f21 93 dead, sc-mix-anim-f21 93 dead + the same false stuck/softlock pair, tsl-plain-f21 (cut-off first run) 13+, r13-stale5-f21 100 natural. It shows in ~1 of 3 lives that take the «Sân chờ» road (the road is random; other lives skip it).
   - Deterministic repro (RT_REV13=stale5, scene needs 6 taps, page badge counts up): tip f0737e88 Fold speed s21 → scene «still open» after 180 s, 194 page-fixture taps, 110 DEAD BUTTONs; iPad pf/pt_su sens s61 → «still open» 180 s, 77 page taps, 24 DEAD. Control 6677dd13 (same hook): Fold s21 → closed by 6 skip taps in 11 s, 0 dead; iPad s61 → closed by 6 skip taps in 7 s, 0 dead. RT_REV13=rerender5 (same labels re-drawn) → closed by 6 skip taps in 12 s on the tip: the hole is a CHANGED label, not a re-render. RT_REV13=newbtn iPad s61 (a third page button «Nút mới» appears 4.5 s after the scene) → 173 s, 21 false DEAD BUTTONs (on Fold the first skip tap closed the scene before the new button came).
   Fix (law 11, one rule): «new since the skip layer came up» must not take page (document.body-layer) buttons at all — kmend-like way-on buttons are caught by the host-tree rule (a), or count only a new button inside a LAYER that is not the page; never count a label change as new (key by element + spot, or add every scan's page buttons to the base while the skip layer is up); and when the pulled-to layer's buttons are all covered by the skip layer itself, fall back to skip taps instead of deadCheck. Self-tests to add as RT_TEST_*: stale-label page badge + 6-tap scene (must close by skip taps, 0 dead) on Fold + iPad, and keep RT_TEST_KNE.
### CHECKED OK
- (a) RT_TEST_KNE=2 (game's own kitNewDay lonely night): Fold pf/pt_su sens s43 and iPad pf/pt_su sens s61 → {closedAfterS 6.5, by «#dawn «Tiếp theo»», skipTaps 1, noExit 0, unstick 0} both; control 6677dd13 + same hook Fold s43 → «NO-EXIT DIALOG .kne … no button at all» (the test tells them apart).
- (b) RT_TEST_SKIPCOV=2: steady Fold s21, Fold s43, iPad s61 · leave iPad s61 · anim Fold s21, iPad s61 → «DEAD BUTTON «Tiếp» cover div#rtTestSc», skipTaps 0, noExit 0, closedBy still open; mix-steady Fold s21 + iPad s61, mix-leave Fold s43 + iPad s61, mix-anim iPad s61 → DEAD «Tiếp», then «Xem thêm» (closedBy more). Plain Fold «leave» not seen by me (5 lives died «Ban hoa» at buổi 1); Fold leaving cover shown by mix-leave s43. Skip taps only when the layer has no tappable button: code read of sc.skipFree (all 4 callers use it) ✓.
- (c) OWNCLOSE full-screen role=dialog: own Fold s21 {closeOwnLayer 1, noEffect 0, «Đóng» 8 s}, iPad s61 {1, 0, 3 s}; dead iPad s61 → noEffect 1 (Fold dead life died at buổi 1). QUOTA+RELOAD cp=5 slice=30: Fold speed s21 «SAVE REWIND b13→b2 (11 buổi lost)» + «SAVE STALE stored b2 live b25»; iPad pf s61 REWIND b8→b2 and b19→b2 + STALE b2/b25; Fold pf s43 REWIND b8→b2 (cut at b20). LATE: Fold s21 / iPad s61 «NO-EXIT withdrawn … «Ta biết rồi» came late», fast 7 / 2. SKIPLAYER plain Fold s21 7.6 s, cover iPad s61 7.7 s, noWayOut 0, noExit 0, dead 0 (css Fold s43 died at buổi 1). DRESS Fold s43 placed 4 / 18 s, iPad s61 placed 2 / 17 s (N3 known). RELOAD+DRIFT pin on: Fold s43 + iPad s61 «BUILD PIN: unstick reload — the tab was on :8861, back to the pinned :8914 (carrying 5 localStorage keys)», pinReturn 1, 0 dead; law-11 goto/reload scan: the p.goto / reload set is identical to 6677dd13 (BIG #12 scan) ✓. See N1.
- (d) a layer with neither button nor hint: RT_REV13=plain Fold s21 + iPad s61 → NO-EXIT «no button at all for 30 s», skipTaps 0 ✓; re-render with the SAME labels does not pull the scan (rerender Fold, rerender5 iPad, stale/shift Fold single-tap scenes closed by 1 skip tap) — but see BLOCKING 1 for changed labels.
- (e) 0 `.click(` / dispatchEvent / focus / keyboard in 8ea10d7e..f0737e88 (only rt-bare-unit's real mouse.click / touchscreen.tap); direct game calls only in env-gated RT_TEST_KNE / RT_TEST_DRESS, stamped in harness.testHooks. robot-lint OK 0 findings · rt-bare-unit 20/20 · robot-audit-unit UNIT OK (handover tip, robot-audit.js = 74d434fb content).
- (f) LIVE slices, no hooks: Fold speed s21 a/b 12/12 buổi · iPad pf/pt_su sens s61 a/b 12/12 → jsClicks 0, dead 0, NO-EXIT 0, stuck 0, skip taps 3–4. iPad cautious s72 a → 88 dead (BLOCKING 1). Fold pf/pt_su sens s43 a/b both «Ban hoa» at buổi 1 (no 12-buổi slice on that seed; seeds are not stable on f573dc94). Not run further after the FAIL.
### NOTES (not blocking)
- N1 BUILD PIN fails on today's main: origin/main is now 03a8c17c (renderer-mem merges with LIVE f573dc94 as the SECOND parent), so `rt-serve-build.sh --b cc68dcfd2b1b` walks first-parent main and exits 2 («no pin, the given url is used, the gate still stops a mismatch»). Loud, not silent; I proved DRIFT by serving /home/user/wt/build-f573dc94… on the computed port 8914 myself. For a later fixer: also walk second parents of merges (or try `git log --all -S'"b":"<id>"' index.html` within the depth).
- N2 the scratch fixture modes newbtn/stale are on a .kscn that covers 65 % of the screen; the game's .kscn sits between top bar and tab bar, so the natural repro above is the stronger proof.

## HANDOVER — BIG REVIEWER #13 (resume), 26/11 ~22:30Z
- Verdict: FAIL robot-realtap f0737e88 (item 21 rule (b): a changed page label = «new button» → robot leaves the .kscn scene, false DEAD BUTTON flood + false stuck/softlock; LIVE iPad s72 88 dead) · audit 74d434fb PASS. Items 22, 23, N2, KNE (a), SKIPCOV (b), regressions (c), (e) and Fold s21 / iPad s61 LIVE slices checked OK.
- Re-review recipe: (1) LIVE iPad `bot=cautious seed=72 slice=12` and Fold `bot=speed seed=21` ×3 each → 0 «DEAD BUTTON … cover div.kscn-veil» through «Ngày thứ hai — Điện tuyển» / «Sân chờ»; (2) RT_REV13=stale5 (hook /home/user/wt/rr13-out/hook-rev13.js, insert after the RT_TEST_KNE block in a scratch copy; better as an RT_TEST_* mode) Fold s21 + iPad pf s61 → closed by 6 skip taps ≤ 20 s, 0 dead, 0 page taps; (3) RT_TEST_KNE Fold s43 + iPad s61 still «#dawn «Tiếp theo»» ≤ 15 s; (4) RT_TEST_SKIPCOV steady/anim/mix-* still DEAD «Tiếp». Server: `python3 -m http.server 8861` in /home/user/wt/rr13-live (git archive f573dc94); for DRIFT also serve /home/user/wt/build-f573dc949ee37af84e46ad2d385fdba2344dee94 on :8914 (see N1). Logs: /home/user/wt/rr13-out/<run>/log.txt.

## REVIEW robot-realtap 8ea10d7e..97e55a457 — BIG #14 (+ audit 74d434fb), 27/11 ~01:30Z
PRIORITY #1 CHECK: OD robot real-tap rules 25/11 (dev/handover/briefs/F-robot-2511.md) | review/robot-realtap 8ea10d7e PASS (BIG #10) → 947aeec9 FAIL (BIG #11) → 6677dd13 FAIL (BIG #12) → f0737e88 FAIL (BIG #13, efcf64295) → 97e55a457 (FIXER #13 items 25–26) | claims: BIG #13 re-review queue = this job.
### VERDICT: PASS review/robot-realtap 97e55a457 (one verdict for 8ea10d7e..97e55a457, test files only) · audit 74d434fb PASS
Tested on the NEWEST main 4cfcda61 (build 97a2b0691bf3, CTM_BI.s 504d2e6a+; main moved since the fixer's 03a8c17c), git archive served 127.0.0.1:8881, RT_NOSHOT=1, RT_PIN=0 (pin on for DRIFT), harness from fresh sparse worktrees of 97e55a457 (tip), f0737e88 (control) and 8ea10d7e (base). Control with the same hook = f0737e88 + the tip's RT_TEST_STALELABEL block pasted in (scratch copy). Logs: /home/user/wt/rr14-out/<run>/log.txt. Many lives end «Ban hoa» at buổi 1 (game selection); extra copies were run, only finished hook lines / 12-buổi slices are counted.
### (1) BIG #13 BLOCKING 1 — FIXED
- LIVE repro, no hook, `life=L-i72a dev=ipad bot=cautious seed=72 slice=12` ×6: a = «Sân chờ» «Đứng yên giữ sức» → «Điện tuyển» «Quỳ xuống thỉnh an» → Thái hậu / Hoàng thượng, 0 DEAD, 0 «kscn-veil», no stuck / softlock (then «Ban hoa» b1, game); e = «Sân chờ» → 14 «SKIP TAP .kscn» → «Điện tuyển», 0 dead (Ban hoa b1); b/c/d/f 12/12 buổi, 0 dead. Fold speed s21 ×3: a = «Sân chờ» → 14 .kscn skip taps → «Điện tuyển», 0 dead; b/c 12 buổi, 0 dead. On f0737e88 BIG #13 had 88 «… cover div.kscn-veil» on the same road.
- RT_TEST_STALELABEL (6-tap .kscn on the right 65 % + a page bar re-drawn every 1.5 s):
| mode | tip Fold 755x1000 | tip iPad 1180x820 | control f0737e88 + same hook |
|---|---|---|---|
| stale5 | s21 7 s, s43 11 s: 6 skip taps, 0 page taps, 0 dead | s61 7 s, 6 skip taps, 0 dead | Fold s21 «still open» 180 s, 28 DEAD («Bạc85Sức80/100 cover div#rtTestSl.kscn» …) · iPad s61 «still open» 211 s, 32 DEAD |
| rerender5 | s21 11 s, 6 skip taps, 0 dead | s61 11 s, 0 dead | — |
| newbtn | s21 11 s, 6 skip taps, 0 page taps, 0 dead | s61 11 s, 0 dead | Fold s21 «still open» 215 s, 32 DEAD · iPad s61 closed 12 s (timing) |
| newlayer | s21 6 s ×2 gone «newlayer», 0 dead | s61 6 s gone «newlayer»; 1 run «still open» 193 s, 29 DEAD (see N1, pre-existing) | Fold 43 s / iPad 6 s «newlayer» |
### (2) A NEW LAYER ON TOP IS STILL TAKEN
Synthetic SCAN probe (SCAN extracted from each robot-rt.js, setContent page: .kscn scene + page bar, scan 1, then change, scan 2), Fold + iPad, same on both devices:
| change after the scene's first scan | 8ea10d7e | f0737e88 | 97e55a457 |
|---|---|---|---|
| role=dialog on the screen middle (fixed / aria-modal) | dialog | dialog | dialog |
| role=dialog off-centre (top right) | scene (skip taps) | dialog (new) | dialog (new) |
| .kpop off-centre | scene | .kpop (new) | .kpop (new) |
| .ov > .dlg off-centre | scene | .dlg (new) | .dlg (new) |
| page label change «Tin báo (0)→(3)» | scene | PAGE (= BIG #13 bug) | scene |
| new PAGE button | scene | PAGE | scene |
| role=dialog UNDER the scene (z lower) | scene | PAGE | scene |
| plain div popup (no LAYER class) off-centre | scene | page | scene (= 8ea10d7e; see N6) |
→ a new LAYER that opens on top and holds the way on is taken (rule b), a label change / page button / layer under the veil is not. Live fixture newlayer above. Host rule (a) kept: RT_TEST_KNE below.
### (3) NO REGRESSIONS (tip, both devices)
- KNE: Fold s43 6.5 s / iPad s61 1.5 s «SKIPWIN #dawn host Tiếp theo», skipTaps 1, noExit 0, unstick 0.
- SKIPCOV: steady Fold s21 + iPad s61, leave Fold s43 + iPad s61, anim iPad s61 → «DEAD BUTTON «Tiếp» cover div#rtTestSc», skipTaps 0, noExit 0; mix-steady iPad s61, mix-leave Fold s43, mix-anim Fold s21 → DEAD «Tiếp» then «Xem thêm» (closedBy more). (Fold anim: both copies «Ban hoa» b1; Fold animated cover shown by mix-anim.)
- OWNCLOSE: own Fold s21 / iPad s61 {closeOwnLayer 1, noEffect 0, «Đóng» 9 s}; dead Fold s43 / iPad s61 {noEffect 1}.
- QUOTA+RELOAD cp=5 slice=30: Fold s21 + iPad s61 «SAVE REWIND … from b8 (1.0.1.3) to the stored b2 (1.0.0.1) (6 buổi lost)» + «SAVE STALE stored b2 live b25 … QuotaExceededError», 0 dead.
- LATE (RT_TEST_NOEXIT + RT_TEST_LATE=40000): iPad s61 33.5 s, Fold s21 34.5 / 34.8 s «LATE BUTTON … «Ta biết rồi»» + NO-EXIT withdrawn.
- SKIPLAYER: plain Fold s43 7.6 s / iPad s61 2.8 s; cover iPad s61 7.8 s, Fold s21 7.6–7.7 s in 11 of 13 runs; css iPad s61 7.6 s; noWayOut 0, noExit 0. The 2 other Fold cover runs (127 s, 19 DEAD) = hook timing, N2.
- DRESS: Fold s43 placed 4 / 23 s, iPad s61 placed 4 / 34 s, not skipped.
- RELOAD+DRIFT (pin on): Fold s43 + iPad s61 «BUILD PIN: life … on 504d2e6a+ 97a2b0691bf3 served at :8723» → «unstick reload — the tab was on :8881, back to the pinned :8723 (carrying 5 localStorage keys)», pinReturn 1, 0 dead (Fold: then «#kload» stall NO-EXIT = BIG #11 N6, local serve without assets).
- Law-11 goto/reload scan: tip has the same 5 .goto( / 4 .reload( / 3 reloadPinned( lines as f0737e88 (line text identical).
- rt-serve-build.sh --b on today's main (each run): 97a2b0691bf3 (= 4cfcda61) → tip and old both serve 4cfcda61f; 1b5137935266 (03a8c17c, on the second-parent line of 504d2e6a) → tip «serving 03a8c17ca», old f0737e88 exit 2 «no main commit with build 1b5137935266»; cc68dcfd2b1b → both serve f573dc949 (main moved: it is now on the first-parent chain). Item 26 proven.
### (4) N5 (double «Lật thẻ bài» NO-EXIT) — PRE-EXISTING, NOT A REGRESSION (note)
- Seen again on the tip: L-f43b (Fold pf/pt_su sens s43) «GONE Chuẩn bị thị tẩm» at 167 s, second flip at 228 s → «NO-EXIT DIALOG .kmov … picker stalled 80 steps, no close / next» → NOEXIT UNSTICK 3 → reload (1 of 4 Fold s43 slices; fixer 1 of 7).
- Code: the three parts are byte-identical in 8ea10d7e and 97e55a457 — `repeat.set(rk, … + (ok ? 1 : 5))` (8ea L476 / tip L623), sig = layer|title|labels|clock (L407 / L552), stall-force `noExit(… 'no close / next')` unless CLOSE_RE / NEXT_RE / x (L453 / L598). Nothing in the range touches them; skip taps never run here (the .kmov has a hit button).
- Runs: scratch hook RT_REV14 = the GAME's own kitCardFlip end card «Chuẩn bị thị tẩm» twice in one buổi: 8ea10d7e Fold s21 «gone 1» (the +5 refusal also happens on the base), second card closed 9.6 s; iPad s61 6 s · f0737e88 iPad s61 ×2 9 s · tip Fold s21 / s43 / iPad s61 ×2 5–10 s — 0 NO-EXIT on every version (the fixture does not reach the stall: the game's second natural flip has a full deck). 11 base 8ea10d7e Fold s43 lives (7 reached 12 buổi) met only 1 single flip. → pre-existing, rare; fix stays with the next fixer (as N5 says: a refused «gone» tap adds 0, not 5; the stall force counts a .kmend / data-km-close end button as a way on).
### (5) STATIC
- 8ea10d7e..97e55a457 added lines: 0 `.click(` / dispatchEvent / focus / keyboard (only rt-bare-unit's own p.mouse.click / touchscreen.tap); STALELABEL builds DOM only (no game call); game calls only in env-gated RT_TEST_KNE / RT_TEST_DRESS (stamped in harness.testHooks).
- robot-lint «LINT OK 0 finding(s)» · rt-bare-unit «RT-BARE-UNIT OK 20/20» · robot-audit-unit «UNIT OK» on the handover tip (robot-audit.js = 74d434fb content, no diff).
### (6) LIVE SLICES (no hooks, main 4cfcda61, slice=12)
| seed | 12-buổi copies | jsClicks / dead / NO-EXIT / stuck |
|---|---|---|
| Fold speed s21 | b, c (a «Ban hoa» b1 after «Sân chờ», 0 dead) | 0 / 0 / 0 / 0 |
| Fold pf/pt_su sens s43 | a, c, d (+ b = N5) | 0 / 0 / 0 / 0 (b: NO-EXIT 1 = N5) |
| iPad pf/pt_su sens s61 | a, b, c | 0 / 0 / 0 / 0 |
| iPad cautious s72 | b, c, d, f (a, e «Ban hoa» b1 after «Sân chờ», 0 dead) | 0 / 0 / 0 / 0 |
realtap true, exitPick none, build 97a2b0691bf3 in every life; skip taps 2–7 per slice; 0 «kscn-veil» lines in any tip life.
### NOTES (not blocking)
- N1 (pre-existing, all three versions): SCAN's «dialog without a backdrop» rule keeps only `.dlg,[role=dialog]` with `offsetParent !== null`, so a position:fixed role=dialog WITHOUT aria-modal is dropped and a partly visible .dlg under a scene wins. Live: newlayer iPad s61 run 1 — the robot had opened «Lịch tháng» just as the fixture came; the scan stayed on «Lịch tháng» (some day buttons left of the scene still hit), 29 DEAD (covered by the scene / new layer, true covers), «Xong» never taken in 193 s. Probe (.dlg under a .kscn + fixed role=dialog on the middle): 8ea10d7e, f0737e88, tip all → .dlg, 9 dead suspects; with aria-modal → the dialog. Most game role=dialog are aria-modal; KP_SEAL / x.name / RK_T.screen dialogs are not. Fix idea: use getClientRects().length (not offsetParent) in that filter.
- N2 (hook timing): RT_TEST_* fixtures are inserted AFTER the step's SCAN and the same step goes on with the pre-fixture scan. 2 of 13 Fold s21 SKIPLAYER cover runs (buổi 1, Đông sở) fired while the page had 19 dead suspects (only «Thỉnh tranh nhân vật (có mới)» hit, the rest under the .k3btns option panel) → deadCheck probed them under the new fixture → 19 DEAD «cover div in #rtTestTs», closed 127 s later via #kdaytc. Instrumented proof: «DC550 92 page hits=Thỉnh tranh nhân vật n=20» right after «RT_TEST_SKIPLAYER on». Fix idea: `continue` (re-scan) after every fixture insert.
- N3 (pre-existing): that same Đông sở screen (Sân chờ road) costs ~60 s with no tap: deadCheck probes the ~19 covered page buttons one by one, then «GONE Thỉnh tranh nhân vật (có mới)». Same gap on base 8ea10d7e (E-f21b 94 → 153 s). No false DEAD in natural lives; time only.
- N4: item 25's «stay (all covered by the skip layer)» branch cannot fire (the pull needs a HIT button in the pulled-to layer, so `nb.every(bySk)` is false); harmless, the table line overstates it.
- N5 = section (4).
- N6: a new popup that is not a LAYER (plain div) beside a scene is not taken by rule (b) — same as 8ea10d7e; it would end as skip taps → NO-EXIT (loud, not hidden).
- N7: every `rt-serve-build.sh --b` call re-fetches main --depth=60 (≈12k objects, 1–5 min here) before the walk; a pinned life start waits that long.

## HANDOVER — BIG REVIEWER #14, 27/11 ~01:30Z
- Verdict: PASS robot-realtap 97e55a457 (one verdict 8ea10d7e..97e55a457) · audit 74d434fb PASS. The tip is ready for the coordinator (test files only: dev/test/robot-rt.js, rt-serve-build.sh, realtap.js, rt-bare-unit.js + PROGRESS).
- Open for the next harness fixer (none blocking): N5 double flip (+5 on «gone», stall force vs .kmend), N1 offsetParent in the dialog rule, N2 continue after RT_TEST_* fixture insert, N3 60 s deadCheck at Đông sở, N7 fetch per --b, older N3 dress / N4 tho.
- Recipe reuse: worktrees /home/user/wt/rr14-{tip,ctl,8ea} (+ «x» copies with the RT_REV14 kitCardFlip×2 hook, rr14-ctlh = f0737e88 + STALELABEL, rr14-dbg = tip + DBG/DC prints), LIVE /home/user/wt/rr14-live (git archive 4cfcda61) on :8881, runner /home/user/wt/rr14-out/run.sh «H|name|env|args», SCAN probes /home/user/wt/rr14-probe/probe*.js.

## REVIEW robot-realtap 97e55a457..39c6e505 — BIG #15 (session_01UV1SzhuX1hpBKRWeY1SQPX, for F ROOT #2 session_01UV1SzjiyJzqC1pGgm8zVFQ), 27/11 ~03:10Z
PRIORITY #1 CHECK: OD robot real-tap rules 25/11 (dev/handover/briefs/F-robot-2511.md) | review/robot-realtap 97e55a457 PASS (BIG #14) → 943285b5 (FIXER #14, PROGRESS items 27–39) → 39c6e505 (FIXER #15, item 14 rt-serve-build) | claims: BIG REVIEWER #15 = this job (CLAIMS.md 02:12Z).
### VERDICT: PASS review/robot-realtap 39c6e505 (one verdict for 97e55a457..39c6e505, test files only: robot-rt.js, realtap.js, rt-serve-build.sh + PROGRESS)
Tested on the NEWEST main 17f23656 (build 5a7a9c4004c1, CTM_BI.s 540358c4+; main moved since the fixer's a22cf45d), git archive (root files + coop + icons + dev/vendor) served 127.0.0.1:8895, RT_NOSHOT=1, RT_PIN=0 unless said. Harness from fresh sparse worktrees of 943285b5 (rr15-tip), 39c6e505 (rr15-fin; robot-rt.js identical to 943285b5) and 97e55a457 (rr15-ctl); control rr15-ctlh = 97e55a457 + the tip's STALELABEL block + RT_TEST_DEADMANY block pasted in (scratch). Logs /home/user/wt/rr15-out/<run>/log.txt (not in git).
### (1) STATIC
- 97e55a457..39c6e505 added lines: 0 `.click(` / dispatchEvent / focus / keyboard. Every new tap (deadCheck group, kipgo, «close (confirm unreachable)») goes through rt.tap (real pointer). Game calls only in env-gated RT_TEST_* fixtures (END over(), IDENT S.name, FLIP2 kitCardFlip, day kitDayTitleShow) + one read-only overAlive(fate) (j32:34, a pure regex test).
- robot-lint «LINT OK 0 finding(s)» · rt-bare-unit «RT-BARE-UNIT OK 20/20».
- Identity rule: game writes S.name only at life start (j2:12 freshName) and the co-op clash rename (jcoopthinb:58, handled as a note); S.origin only on load (j6/jload) → no false IDENTITY stop expected in a natural life.
### (2) LIVE SLICES (no hooks, main 17f23656, slice=12, harness 943285b5)
| seed | copies | jsClicks / DEAD / NO-EXIT / stuck |
|---|---|---|
| Fold speed s21 | a «Ban hoa» b1 (stamped, 0 «Chuyển kiếp» taps), b 12 | 0 / 0 / 0 / 0 |
| Fold pf/pt_su sens s43 | a, b 12/12 | 0 / 0 / 0 / 0 (b: game bug js «sx is not defined», see N5) |
| iPad pf/pt_su sens s61 | a, b 12/12 | 0 / 0 / 0 / 0 |
| iPad cautious s72 | a, b 12/12 | 0 / 0 / 0 / 0 |
realtap true, exitPick none, build 5a7a9c4004c1 in all 8; 0 «Chuyển kiếp» lines; 0 «popup» skip wins.
### (3) FIXER #14 CLAIMS — each on my own runs
| claim | tip | control |
|---|---|---|
| N1 dialog filter (getClientRects, top at own centre) | STALELABEL newlayerdlg iPad s61 5 s gone «newlayer», 0 dead, 0 page taps; SCAN probe: fixed role=dialog no aria-modal on the middle → the dialog (Fold + iPad) | probe same (my layout does not split them; fixer's probe is the differing case) |
| N2 re-scan after a fixture | SKIPLAYER cover at buổi 1 Fold s21: 3.9 s, 0 dead, noWayOut 0 (1st copy «Ban hoa» b1 before it) | — |
| N3 deadCheck one settle per group | DEADMANY Fold s43 18.0 s / iPad s61 18.1 s, 18 DEAD each (every covered button still tapped) | iPad s61 120.3 s, 18 DEAD |
| N5 refused «gone» adds 0 + end button = a way on | FLIP2 Fold s43 13 s / iPad s61 12 s: 2 end taps, 0 NO-EXIT, 0 stall force, 0 unstick | — |
| N6 plain-div popup is a layer | STALELABEL newpopup Fold s43 6 s / iPad s61 7 s gone «newpopup», 0 dead, 0 page taps | iPad s61 171 s, 25 DEAD («Tin báo … cover div#rtTestSl.kscn» …), 3 page taps |
| E1 pin=0 resume on an older build | ckpt F21b (b11, recorded 5a7a9c4004c1) resumed pin=0 on the OLDER build a22cf45d (:8782) → «serving the recorded build (pin=0 …)» → «moved to … :8841 (carrying 5 localStorage keys)», save hash identical, played b11→b14, 0 dead | — |
| E2 gift chooser loop | GIFTLOOP Fold s43 10 s / iPad s61 11 s: 3 openings, [game] «re-opened 3×» once, loopBan 1, closed «Thôi» | — |
| E3 life identity hard stop | IDENT Fold s43: «LIFE IDENTITY CHANGE at buổi 2 (name … → Thử Người Khác, birth year −18 → −23)» → LIFE VOID, exit 4; resume=1 → «LIFE ALREADY ENDED (checkpoint stamped ENDED)» | — |
| E4 never auto «Chuyển kiếp» | END Fold s43: «LIFE DONE … Thử kết · buổi 2», 0 «Chuyển kiếp» taps; ENDKILL iPad s61 exit 3 → resume=1: «NO SAVE IN CKPT» → «the saved life is already over («Thử kết» …) — stamped ENDED, never «Chuyển kiếp»» (read from Sổ luân hồi) | — |
| E5 #kdaytc tap-anywhere | SKIPLAYER_MODE=day Fold s43 1.9 s, 3 skip taps, NO-EXIT 0, noWayOut 0 | — |
| E6 .kmov stall | covered by FLIP2 (0 stall force) + 0 NO-EXIT in all 8 live slices | — |
| N7 cache / local walk | c1633dab8e17: 1st call 7 s (local walk), next calls «build cache: … → a22cf45d» ~1–2 s | — |
### (4) REGRESSIONS (tip)
KNE iPad s61 1.5 s «SKIPWIN #dawn host Tiếp theo», noExit 0 · SKIPCOV mix-anim Fold s43 → «DEAD BUTTON «Tiếp» cover div#rtTestSc», closed by «more», skipTaps 0 · OWNCLOSE own iPad s61 {closeOwnLayer 1, noEffect 0, «Đóng» 4 s} · STALELABEL stale5 Fold s43 7 s / newbtn iPad s61 7 s (6 skip taps, 0 page taps, 0 dead) / newlayer Fold s43 6 s gone «newlayer» · DRESS iPad s61 placed 3 / 14 s, Fold s43 placed 4 / 13 s, not skipped.
### (5) FIXER #15 DELTA 943285b5..39c6e505 (rt-serve-build.sh)
- Old script 943285b5 on build c1633dab8e17 :8781 → GET /dev/vendor/pixi-8.5.2.min.js = 404 (item 14 confirmed). Same pin dir, new script :8782 → sparse set repaired IN PLACE (+ /dev/vendor/ /audio/ /icons/), «self-check OK: 8 local paths all 200 (incl. pixi-8.5.2.min.js)», pixi 200, audio/bgm-day.mp3 200, not killed (foreman ask (a)).
- Fail case: pixi file removed from the pin dir → «SELF-CHECK FAIL: … does not serve: dev/vendor/pixi-8.5.2.min.js(not checked out)», exit 143; port up at 0.34 s, down at 0.78 s. Race (foreman ask (b)): pinUrl's first re-check is 5 s after the spawn, then exit ≠ 2 → «no pin», so the life that spawned it never starts on the dying server (see N4 for a twin).
- E1 auto-serve above ran on the FIXED script: the auto-served :8841 serves pixi 200.
- Foreman extra (s7b): build a1d2c8d4a29c (older, not in the depth-30 main) → found by the --deepen=300 step: «serving 9d5d1af37 act-merge-ALL r4», self-check OK, 454 s (network fetch; now in the cache). Resume after a «container restart» (pin server killed): pin ON (RT_PIN=1) → re-serves itself (boot pinUrl) → «save restored on :8841», hash identical, b12→b16, 0 dead. pin=0 → see N1.
### NOTES (not blocking)
- N1 (pin=0 + dead pin server): a resumed ckpt that holds pinUrl of a server that died is loaded as URL0 without a check when RT_PIN=0 → p.goto ERR_CONNECTION_REFUSED → seat exits 1 (robot-rt.js:255). No life lost (ckpt intact, not stamped; a rerun with pin on resumes). Fix idea: in boot, when R.harness.pinUrl is set and PIN is off, call pinUrl(build0) too (it checks the kept server first) or fall back to the given url and let the gate auto-serve.
- N2 (N6 rule, probe only): a body-child fixed box (z ≥ 100, holding buttons) that the PAGE re-creates (remove + append) while a skip scene is up counts as a «new popup» → the scan leaves the scene for its buttons (probe E_bodyBarRecreated: tip → «new popup Trang 1», 97e55a457 → stays on the scene). Not seen in 8 live lives (0 popup wins). Fix idea: a fresh popup must be stacked above the skip layer (z / elementFromPoint over the skip layer's rect), not beside it.
- N3: the self-check GETs only the 8 paths quoted in index.html / sw.js + dev/vendor; audio mp3 names are built at run time, so they are served (in the sparse set) but not checked.
- N4: a TWIN life whose own first servesBuild lands inside the ~0.45 s window between port-up and the self-check kill would pin to a dying server (rare; it then fails loudly like N1).
- N5 (game, for the coordinator): Fold pf/pt_su sens s43 copy b: [js] page error «sx is not defined» (main 17f23656).
- RT_TEST_DRESS iPad s61 placed 3 (Fold 4); not skipped, no dead — board content, not a harness fault.

## HANDOVER — BIG REVIEWER #15, 27/11 ~03:10Z
- Verdict: PASS robot-realtap 39c6e505 (one verdict 97e55a457..39c6e505). Ready for the coordinator (test files only).
- Open for the next harness fixer (none blocking): N1 pin=0 dead pin server at resume, N2 re-created body box as «new popup», N3/N4 self-check scope / twin window.
- Recipe reuse: worktrees /home/user/wt/rr15-{tip,fin,ctl,ctlh}, LIVE /home/user/wt/rr15-live (git archive 17f23656 incl. dev/vendor) on :8895, runner /home/user/wt/rr15-out/run.sh <list> (lines «name|wt|env|args», U= / RT_PIN= / TMO= env), summary sum.py, SCAN probes /home/user/wt/rr15-probe/probe.js <tip|ctl>.

## REVIEW robot-realtap 39c6e505..f65d019b — BIG #16 (for F ROOT #2 session_01UV1SzjiyJzqC1pGgm8zVFQ), 27/11 ~04:40Z
PRIORITY #1 CHECK: OD robot real-tap rules 25/11 (dev/handover/briefs/F-robot-2511.md) | review/robot-realtap 39c6e505 PASS (BIG #15) → f65d019b (FIXER #16, PROGRESS items 40–42) | claims: BIG REVIEWER #16 = this job (CLAIMS.md 03:40Z).
### VERDICT: PASS review/robot-realtap f65d019b (one verdict for 39c6e505..f65d019b; test files only: robot-rt.js, rt-serve-build.sh, new rt-board-phase-scan.js, PROGRESS)
Tested on main 17f23656 (build 5a7a9c4004c1), git archive served 127.0.0.1:8895, RT_NOSHOT=1 RT_PIN=0. Worktrees /home/user/wt/rr16-{tip (f65d019b), ctl (39c6e505), ctlh (39c6e505 + the tip's RT_TEST_MGGIVEUP / RT_TEST_EXAM_ROUNDS / RT_TEST_BOARDHANG blocks pasted, scratch), tiph (tip + a read-only in-page probe that samples window.__rtMgOver every 50 ms while KG82.phase is «play» and prints FOPROBE at every board end; no tap / no state write)}. Logs /home/user/wt/rr16-out/<run>/log.txt (not in git). ≤2 browsers.
### (1) STATIC
- Added lines: 0 `.click(` / dispatchEvent / focus / keyboard / mouse.click / touchscreen.tap. Game calls only in env-gated fixtures (exRun rounds, kg82Open hang board).
- robot-lint «LINT OK 0 finding(s)» · rt-bare-unit «RT-BARE-UNIT OK 20/20».
- rt-board-phase-scan.js origin/main: 11 end paths, 3 leave KG82.phase «play»: jexam kg82Play→after, jmgcal kg82Play→after, jroute own engine (done). Checked by hand: jexam L217/L223 and jmgcal L80/L84 call kg82ShowRes with no KG82.phase="result"; jroute sets phase only "play" (L436), never "result"; jentry `after` does set it. Game-side finding CONFIRMED (for MAIN).
### (2) FIXER #16 CLAIMS — my own runs
| claim | tip | control |
|---|---|---|
| (b) mgOver, RT_TEST_EXAM=1 ROUNDS=theu,theu | Fold s43: «BOARD theu 32 moves over (phase still «play», way on #kg82ok Môn kế tiếp) 10/10 (42 s)» → «… Xem kết quả» 9/10 (38 s), exam done raws [10,9], boardOver 2, 204 s · iPad s61: 9/10 (28 s) → 8/10 (26 s), done [9,8], 165 s | ctlh Fold s43: «BOARD theu 32 moves still in play (368 s)» + harness bug «still in play after 6 min», exam done false, run timed out at 900 s (the s7b loop) |
| (b) regression RT_TEST_BOARD=mua | tip Fold s21 24 moves 9/10, ready 1, boardOver 0; tiph Fold 10/10, iPad 10/10 | — |
| (a) ladder, RT_TEST_BOARDHANG=1 RT_TEST_MGGIVEUP=30000 | iPad s61: 2 passes (37/38 s) → [stuck] «frozen board: 2 board give-ups …» → board gone 91 s, stuck 1, boardStuck 1 · Fold s44: same, gone 90 s, slice to buổi 3 (Fold s43 tip life ended «Ban hoa» at buổi 1 before the fixture opened — natural end, re-run on s44) | ctlh Fold s43: 13+ passes «0 moves still in play (37 s)», stuck 0, never unstuck |
| (c) rt-serve-build | fresh pin 17f23656 :8781 «self-check OK: 137 local paths all 200» (131 git audio/ files + 6); old dir (sparse set without /audio/ /icons/) → tip repaired in place (131 audio + 6 icons back, sparse file now has all 8 entries), self-check OK | same old dir: «SELF-CHECK FAIL … audio/MANIFEST.json audio/VOICES.json icons/apple-touch-icon.png (not checked out)», exit 143, nothing repaired |
KMUS_NEW keys: j11.js:53–55 serves them from IMG_BASE (CDN), not git → skipping them in the self-check is right.
### (3) RISK SIDE
- False «over» on a live board: tiph RT_TEST_BOARD on all 16 playArt kinds Fold s21 (dan hat co dauho ban tho doi do den ve hoa theu kim mua banh huong) + iPad s61 (dan hat co mua) = 26 boards incl. natural ones in those lives (timed Đàn/Hát notes, drag boards ve/hoa/kim/dauho with area taps, Cờ, «xem bước» phases): 0 «over (» results, 0 non-empty FOPROBE (the 50 ms sampler never saw mgOver true while KG82.phase was «play» on a board whose path sets «result»). Every board done, ready 1, 0 dead.
- Not covered by a run: co-op boards (no co-op seat in this review). Static: mgOver needs the box hidden or its centre covered by a non-hint layer AND an enabled on-top button outside the box whose text is not ✕/Quay lại/help/Sẵn sàng/Chơi tiếp/Bỏ cuộc; a co-op «waiting» overlay with only a ✕ / back does not pass. Worst case (a #modal with a button over a live board) the loop leaves, the picker answers the modal, mgOver turns false and the loop resumes — the round is not lost, only one false [game] line is logged.
- Ladder vs long legit screens: lastProg now moves on clock step / NEW layer+title (first sight since the clock step) / gift / ladder actions; it lost only the board-pass and skip-tap resets. Ordinary taps never reset it before either, so no long screen gets a shorter fuse except a skip scene or a board sequence that shows no new title for 15 min. Boards ≤97.5 s each, exam/LRM sequences 2–3 rounds with new titles → no false fire expected; 4 LIVE slices + 26 board runs: stuck 0 except the hang fixture. A real frozen board with a working «Bỏ cuộc?» confirm: first confirm visit is a new screen (bdStill → 0), the repeat is not → ladder at the 3rd pass (~18 min) or the 15-min timer, whichever first — bounded (was never).
### (4) LIVE SLICES (no RT_TEST hooks, slice=12, harness tiph)
| seed | buổi | jsClicks / DEAD / NO-EXIT / stuck | bugs |
|---|---|---|---|
| Fold speed s21 | 12 | 0 / 0 / 0 / 0 | 0 |
| Fold sens s43 | 12 | 0 / 0 / 0 / 0 | 0 |
| iPad sens s61 | 12 | 0 / 0 / 0 / 0 | 0 |
| iPad cautious s72 | «Ban hoa» b1 (natural end) | 0 / 0 / 0 / 0 | 0 |
realtap true, exitPick none, build 5a7a9c4004c1 in all; 0 «Chuyển kiếp» taps; boardOver 0.
### NOTES (not blocking)
- N1: with RT_TEST_MGGIVEUP=30000 the harness line says «still in play after 1 min» (Math.round of 0.5); cosmetic, test-only.
- N2: «Ban hoa» at buổi 1 ends several seeds early (s43 hang, s72 cautious, some bd-* lives) — known, game content.
- N3: co-op boards not run; worth one co-op seat with a board in the next co-op review.
- N4 (game, for MAIN): jexam / jmgcal / jroute should set KG82.phase="result" in their result path (as jentry `after`); the harness now copes, the game is still wrong.

## HANDOVER — BIG REVIEWER #16, 27/11 ~04:40Z
- Verdict: PASS robot-realtap f65d019b (one verdict 39c6e505..f65d019b). Ready for the coordinator (test files only).
- Recipe reuse: /home/user/wt/rr16-out/{run.sh,q.sh} (lines «name|wt|env|args|tmo», 2 at a time), probe harness /home/user/wt/rr16-tiph (FOPROBE), LIVE /home/user/wt/rr16-live :8895.

## REVIEW robot-realtap-lc27 38cf2208..605c596a — BIG #17 (for F ROOT #3 session_01UV1SzkcxS44fsNiWVm2QoE), 27/11 ~05:45Z
PRIORITY #1 CHECK: OD robot real-tap rules 25/11 (dev/handover/briefs/F-robot-2511.md) | review/robot-realtap f65d019b PASS (BIG #16, above) | MAIN 171 orders 03:46Z/03:52Z: remerge f65d019b onto review/lc27-em 38cf2208 → review/robot-realtap-lc27 | FIXER #17 READY 605c596a (merge 40db39e4 + proof 605c596a; PROGRESS «HARNESS FIXER #17») | claims: BIG REVIEWER #17 = this job (CLAIMS 8ccf3ae7).
START_CTX ~8 %, depth 3.
### VERDICT: PASS review/robot-realtap-lc27 605c596a (one verdict for 38cf2208..605c596a; test-harness files only)
Tip vs lc27-em 38cf2208: 13 files, all dev/test/*, dev/measure/renderer-mem-lib.js, dev/PROGRESS_robot-realtap.md; 0 game / site / root files (the served build is lc27-em's own, b 3c8aded052bf). Worktrees /home/user/wt/rr17-{tip (605c596a), ctl (38cf2208)}; lc27 build served by the tip's rt-serve-build.sh 38cf2208 on 127.0.0.1:8917; RT_PIN=0 RT_NOSHOT=1; logs /home/user/wt/rr17-out/<run>/log.txt (not in git). ≤2 browsers.
### (1) MERGE CORRECTNESS (merge base 69e41729; line-set check: every line a side added vs the base must be in the tip)
| file | lc27 side (69e41729..38cf2208) | realtap side (69e41729..f65d019b) | tip 605c596a |
|---|---|---|---|
| dev/measure/renderer-mem-lib.js | +116 (RT_MOB, RT_PROF, initLight, hang-frame locals) | +87 | = 38cf2208 byte for byte (0 lc27 lines lost). The 3 realtap lines not in the tip are the OLD forms of init() / the RT_LIGHT sample line / the watch() frame line; each LC27 line is the same text extended (init adds MOB/PROF/initLight before the unchanged REG+PKT+MIN body; the LIGHT line adds the RT_MOB __moHot dump after the unchanged row; the watch line adds evaluateOnCallFrame). Non-LIGHT path identical; exports init/sample unchanged → realtap copy is a strict subset, nothing realtap needed is dropped. |
| dev/test/robot-rt.js | +4/−2 (MEMH require, MEMH.sample per buổi, RT_DSF, MEMH.init) | +775/−85 | = f65d019b byte for byte. Each lc27 line present: L24 MEMH require, L371 `if (MEMH) MEMH.sample(p, R)` inside the R.buoi++ branch (the realtap form of the same line, also carries the clock/SAVE REWIND code), L1023 deviceScaleFactor `+(process.env.RT_DSF \|\| 1)`, L1025 `if (MEMH) await MEMH.init(ctx)`. RT_MOB/RT_PROF/initLight live in renderer-mem-lib (LC27 copy kept) and are switched by env → reach robot-rt through MEMH.init/sample. |
| dev/test/realtap.js | +1 | +49/−6 | = f65d019b (lc27 line present) |
| 10 other harness files (robot-lint, robot-rt-coop, rt-bare-unit, rt-board-phase-scan, rt-choice-scan, rt-label-scan, rt-membase, rt-offer, rt-optcard-spots, rt-serve-build.sh) | — | changed | = f65d019b byte for byte |
| PROGRESS_robot-realtap.md | — | — | f65d019b + 12 lines (FIXER #17 section) |
→ Nothing of BIG #16's PASS is lost: every file of 69e41729..f65d019b is identical in the tip except renderer-mem-lib (LC27 superset) and PROGRESS (+FIXER #17).
### (2) STATIC
- Lines added 38cf2208..605c596a with .click( / dispatchEvent / .focus( / keyboard. / mouse.click / touchscreen.tap: 0 JS .click() / dispatchEvent / focus / new keyboard. The pointer taps (robot-rt.js L221 bareTapOn after RT.bareCheck, L355 info layer close at its own rect, L615 board point checked in the same page call, L734 stall point tap only if elementFromPoint is the same enabled option; rt-bare-unit / rt-membase / rt-optcard-spots test fixtures) are the real-tap mechanism itself, each at a hit-checked point, and all are identical to f65d019b (BIG #15/#16 PASS). L630 «keyboard» = a comment («taps only, no keyboard»). robot-rt.js L753 keyboard.type (name field after a real tap) is already in 38cf2208.
- node --check all rt / realtap / renderer-mem files + bash -n rt-serve-build.sh: clean · robot-lint «LINT OK 0 finding(s)» · rt-bare-unit «RT-BARE-UNIT OK 20/20».
### (3) FIXER #17 CLAIMS — my own runs (lc27 build 3c8aded052bf)
| claim | tip 605c596a | control 38cf2208 (lc27's own harness) |
|---|---|---|
| rt-serve-build self-check | «self-check OK: 137 local paths all 200 (incl. pixi-8.5.2.min.js)» fresh dir | — |
| RT_TEST_EXAM=1 ROUNDS=theu,theu Fold s43 | «BOARD theu 32 moves over (… #kg82ok Môn kế tiếp) 10/10 (41 s)» → «… Xem kết quả» 9/10 (31 s), exam done raws [10, 9], boardOver 2, DEAD 0, bugs 2 = the known game-side «KG82.phase stays play» (N4 of BIG #16), 243 s | the LIVE/lc27 harness has no RT_TEST_EXAM / BOARDHANG / mgOver at all (only RT_TEST_CRASH/FREEZE, 363 lines): exam never opened, life just played 6 buổi → the fixtures need the tip |
| RT_TEST_BOARDHANG=1 RT_TEST_MGGIVEUP=30000 iPad s61 | 2 passes (36/37 s) → «BUG stuck frozen board: 2 board give-ups …» → board gone 90 s, stuck 1, boardStuck 1, slice to buổi 6 | (no fixture in the control) |
| RT_MEM full Fold s43 slice 6 | LIFE DONE, mem.jsonl 6 rows (rss + img/bg catalogue) + mem.min.jsonl, dead 0, bugs 0 | — |
| RT_MEM+LIGHT+MOB+PROF iPad s61 slice 6 | LIFE DONE buổi 6, 6 light rows {at,buoi,peak,rss} + min rows + mem.prof.txt (kaRun/kaNorm/kitOpt* counters), no mob.json (no storm), dead 0, bugs 0, 143 s | same row keys, 6 rows, prof.txt — BUT «BUG stuck life not (re)opened within 5 min on #title» (stuck 1), 466 s: the lc27 harness lost 5 min at the title on iPad; the tip did not |
### (4) RISK SIDE
- lc27-side tools that share dev/test/realtap.js (button-crawl.js, next-dead, q-softlock, press-keep, kit-opts-realtap …) now get the realtap version (PROBE option-card points, sideways tab-row swipe, by-design cover name, BARE_CHECK export; make/PROBE API unchanged). button-crawl --fast Fold on the lc27 build: tip «PASS 80 · FAIL 0 (dead 0) · SKIP 1 · hard restores 2 · 160 s, GATE PASS» = control «PASS 80 · FAIL 0 · SKIP 1 · hard restores 4 · 163 s» → no change to the quickcheck gate.
- RT_LIGHT now skips REG in init (LC27 behaviour, by design: nothing runs in the page) — robot-rt's per-buổi sample still writes one row per buổi (seen above).
### (5) LIVE SLICES (lc27 build, no RT_TEST hooks, slice=12, harness tip)
| seed | buổi | jsClicks / DEAD / NO-EXIT / stuck | bugs |
|---|---|---|---|
| Fold speed s21 copy b | 12 | 0 / 0 / 0 / 0 | 0 |
| Fold sens s43 (pf/pt_su) | 12 | 0 / 0 / 0 / 0 | 0 |
| iPad sens s61 (pf/pt_su) | 12 | 0 / 0 / 0 / 0 | 0 |
| Fold speed s21 copy a · s22 | «Ban hoa» b1 (natural end, age 18 / 20) | 0 / 0 / 0 / 0 | 0 |
realtap true, exitPick none, build 3c8aded052bf in all; 0 «Chuyển kiếp» taps; boardOver none outside the exam fixture.
### NOTES (not blocking)
- N1: the exam-fold slice's natural boards «dan 17 moves 0/10» and «hat 164 moves 0/10» (timed boards, 2 browsers on one container) — scored, not «over», not stuck; robot-rt.js is byte-identical to the PASSed f65d019b, so not a merge effect.
- N2: control finding — lc27-em's own harness (38cf2208) stalls 5 min at the title on iPad s61 with RT_MEM light; landing this branch replaces it.
- N3 (game, for MAIN, carried): jexam / jmgcal / jroute still leave KG82.phase «play» on the result path (2 bugs in the exam fixture, as BIG #16 N4).
- N4: «Ban hoa» at buổi 1 on Fold speed s21/s22 (game content, BIG #16 N2).

## HANDOVER — BIG REVIEWER #17, 27/11 ~05:45Z
- Verdict: PASS robot-realtap-lc27 605c596a (one verdict 38cf2208..605c596a). Ready for the coordinator (test files only, ancestor 38cf2208 = lc27-em).
- Recipe reuse: /home/user/wt/rr17-out/{run1.sh,run2.sh (P=),sum.py} (lines «name|wt|env|args|tmo»), lc27 build /home/user/wt/rr17-live :8917.

## REVIEW robot-realtap-lc27 605c596a..7561ffe6 — BIG #18 (for F ROOT #3 session_01UV1SzkcxS44fsNiWVm2QoE), 27/11
PRIORITY #1 CHECK: OD robot real-tap rules 25/11 (dev/handover/briefs/F-robot-2511.md) | review/robot-realtap-lc27 605c596a PASS (BIG #17, above) | rv-165 Info 2 + MAIN 171 order 03:52Z (crawler drives 1/80 on ring UI) | FIXER #17 READY 7561ffe6 (PROGRESS «JOB 2») | review/ring-build-rv165 02b19b2a (KK35 crawler line, jkhand / jkpick / jselxsc) | claims: BIG REVIEWER #18 = this job.
KIT CHECK: n/a (harness only, no UI part touched).
### VERDICT: FAIL review/robot-realtap-lc27 7561ffe6 (3 blocking items F1–F3; the ROOT and the ring walk itself are right)
Tip vs 605c596a: 3 files (dev/test/button-crawl.js, dev/tools/quickcheck.d/README.md, PROGRESS). Ring test copy = tip crawler 3-way merged with ring-build's crawler (git merge-file, base lc27-em 38cf2208): clean, KK35 line kept; control = 605c596a crawler merged the same way. Game = /home/user/wt/r18-rb (02b19b2a index.html); lc27 regression = /home/user/wt/r18-lc (38cf2208). Logs /home/user/wt/r18-out/<run>/log.txt + crawl-all.json (not in git). 2 browsers at a time.
### (1) STATIC
- Added lines: 0 `.click(` / dispatchEvent / `.focus(` / keyboard / mouse.click / touchscreen.tap (the one «.click()» hit is a comment). press() = two calls of realtap tap() (elementFromPoint hit-check, then pointer tap) — card, then its ✓ / «Chọn» chip.
- Game calls are SETUP ONLY, never an answer: nlAccept wrapper (BAL.selx.days=1 only while window.__bcNoSelx is set during START home setup), startState.talk rgFire('c2a') + talk:1 + showModal / start() = OPENS the talk frame; every line, plaque and «Chọn» after that is a real tap. 25/11 real-tap rule kept.
- node --check clean · robot-lint «LINT OK 0» (default set) and «LINT OK 0 finding(s) in button-crawl.js» · rt-bare-unit «RT-BARE-UNIT OK 20/20».
### (2) OWN RUNS (--fast, ring-build-rv165 02b19b2a)
| run | taps | home | selx | talk | gate | time |
|---|---|---|---|---|---|---|
| control 605c596a Fold | 0 | 0 (SKIP 32 «gone») | — | — | GATE PASS (vacuous) | 20 s |
| control 605c596a iPad | 3 | 3 | — | — | GATE PASS (vacuous) | 45 s |
| tip Fold | 118 | 80 PASS | 27 PASS · 1 FAIL soft · 3 SKIP | 10 PASS | GATE PASS | 365 s |
| tip iPad run 1 | 37 | **0 (SKIP 34 «button gone before its tap»)** | 26 PASS · 1 FAIL soft · 3 SKIP | 10 PASS | **GATE PASS (home vacuous)** | 121 s |
| tip iPad run 2 (home only) | 80 | 80 PASS (21 SKIP, 11 hard restores) | — | — | GATE PASS | 338 s |
| tip Fold run 2 (home only) | 80 | 80 PASS | — | — | GATE PASS | 348 s |
Before→after confirmed on Fold (0 → 118). selx: card «Ngày thứ nhất», 19–20 kitScene talk lines, Dưỡng Tú viện, Tiền sảnh hand 3 cards (2 lift + 1 lift+✓), Đông sở hand; talk: 6 stage lines + 3 thẻ gỗ plaques (2 lift + 1 lift+«Chọn»). Every tap went through realtap's elementFromPoint check (DEAD 0).
Regression lc27-em tree (tip crawler alone): Fold 81 taps, home 80 PASS, selx 1 SKIP «no selection-day screen», talk 1 card PASS, GATE PASS, 287 s · iPad same, 80 PASS, 284 s.
### (3) RISK SIDE — blocking
- **F1 FALSE PASS on «choose» (brief question: yes).** Mutation (scratch copy only, /home/user/wt/r18-mut: kitHandChoose = no-op, so the hand ✓ does nothing), Fold --start selx: «Tập qua loa…» lift+✓ «PASS · lift+chip: next» THREE times on the same Tiền sảnh hand, 29 PASS · 0 FAIL, GATE PASS. Cause: the row compares post with the sig taken BEFORE the lift; sig holds [aria-pressed=true] + page text, so the lift alone (klift, aria-pressed, khplate text) counts as «next». Same code in the BFS row (pre before press()). Fix: take a sig right after the lift (just before the chip tap); PASS only if post ≠ that mid sig AND the lift is gone (no .klift / .kpk-up) or the frame changed; else FAIL «✓/«Chọn» does nothing». The selx loop guard also missed the 3 identical rounds (key holds card labels that change) — after the fix they FAIL anyway.
- **F2 «the next card moves the lift» is not checked.** __bc.lifted(null,k) / chip(k) look for ANY lifted card / ANY chip on the page, not the card just tapped; a card whose tap does nothing while an earlier card stays lifted gives «lifts, its chip shows» PASS. Seen live: the «Ra Dư đồ» row reads «lifted true» while that tap opened the map (the lift seen is the old «Làm quen» card). Fix: re-find the tapped card (key/label) after the tap and require IT to carry .klift / .kpk-up (and no other card).
- **F3 vacuous PASS still possible (RV-165 lesson).** iPad tip run 1: home 0 taps, 34 SKIP «button gone before its tap», GATE PASS (run 2: 80). Fix: the gate FAILs (or reruns START home once) when home taps < a floor (e.g. 40) or «gone» SKIPs > half the home list; print the reason. Needed on Fold too (the gate is Fold-only and RV-165's 1/80 was Fold).
- kit-ring-oldleft: not run here (no crawler change touches it); the README «run alone» note is fine.
### (4) GATE BUDGET (for MAIN)
--fast now ≈ 6 min Fold on ring-build (365 s; home alone 348 s with 2 browsers) and ≈ 4.8 min on lc27 (287 s; BIG #17 measured 160 s for the same home crawl) — the 700 ms re-check after every restore + the late-popup waits cost ~2 min even without ring UI. quickcheck.sh says «budget 5–10 min» for the whole check and 90-button-crawl.sh's header still says «~3.5 min»: the crawler alone now eats most of it. MAIN: allow ~7 min for 90-button-crawl, or ask the fixer to skip the 700 ms re-check when no late frame was ever seen.
### (5) GAME FINDING — CONFIRMED (cause found), one part REJECTED
- CONFIRMED, Fold + iPad: Đông sở hand, «Làm quen với một vị tú nữ» lifted, one real tap on resting card «Ra Dư đồ» → frame closes, Dư đồ opens at once (no lift, no ✓). Shots (scratch, not in git): /home/user/wt/r18-out/tipF/shots/fold-selx-107.jpg, /home/user/wt/r18-out/tipI/shots/ipad-selx-59.jpg.
- ROOT: ring-build dev/build/jselxsc.js:177 document CAPTURE click listener on «#modal button[data-m]» whose opt has selxMap → preventDefault + stopImmediatePropagation + selxMapOpen() on ANY tap; jselxsc is assembled before jkhand (assemble.py order), so it runs before the two-tap gate jkhand.js:107 → «Ra Dư đồ» is a one-tap card dressed as a hand card. Fix (ring-build owner, whole family law 11): either the selxMap opt renders as a plain .kbare/.kcard row (not a hand card) or that listener acts only on the ✓ / detail 0 path like every hand card; scan every opt with its own capture listener inside a hand.
- REJECTED: «the second card's tap chose the wrong option». The result card «Học quy củ — Ta ngồi nghỉ ở góc sảnh, Sức +5 / Mất: Giáo tập ma ma không vừa ý» is the EARLIER Tiền sảnh deed «Tập qua loa, để sức cho ngày mai» (jselxday.js:85 SELX_LES), shown late over the map — not a deed from Đông sở.
### NOTES (not blocking)
- N1: robot-rt still has no kitHand / kitPick press (FIXER #17 «NOT DONE») — a ring-build life meets the same two-tap cards; port press() (with F1/F2 fixed) when ring-build lands.
- N2: control iPad: ring-build's own crawler drives 3 taps → RV-165's blind spot is on both devices.

## HANDOVER — BIG REVIEWER #18, 27/11
- Verdict: FAIL robot-realtap-lc27 7561ffe6 (F1 false PASS on choose, F2 lift not per card, F3 vacuous home still possible). Game finding confirmed with root (jselxsc.js:177 before jkhand gate); «wrong option» part rejected.
- Recipe reuse: /home/user/wt/r18-out/{run.sh (name wt dev [args]; env GAME=, BC=), sum.py}, ring game /home/user/wt/r18-rb, lc27 /home/user/wt/r18-lc, mutation copy /home/user/wt/r18-mut.

## REVIEW robot-realtap-lc27 605c596a..4a430cc2 — BIG #19 (for F ROOT #3 session_01UV1SzkcxS44fsNiWVm2QoE), 27/11
PRIORITY #1 CHECK: OD robot real-tap rules 25/11 (dev/handover/briefs/F-robot-2511.md) | BIG #17 PASS 605c596a, BIG #18 FAIL 7561ffe6 (F1–F3, above) | HARNESS FIXER #18 READY 4a430cc2 (PROGRESS «HARNESS FIXER #18 — JOB 2b») | review/ring-build-rv165 02b19b2a | claims: BIG REVIEWER #19 = this job (CLAIMS L648).
KIT CHECK: n/a (harness only, no UI part touched).
### VERDICT: FAIL review/robot-realtap-lc27 4a430cc2 (one verdict for job 2 + job 2b; F1 and F2 are FIXED and proven, F3 is fixed for home only — the same global budget still cuts the selx / talk walks: G1 blocking)
Reviewed 4a430cc2 only (later job 3/4 commits ignored). Tip vs 7561ffe6: button-crawl.js, quickcheck.d/button-crawl-known.txt, PROGRESS. Ring test tree = /home/user/wt/r19-rb (02b19b2a) with the tip crawler + tip realtap.js each 3-way merged with ring-build's copy (git merge-file, base lc27-em 38cf2208): both clean, KK35 line kept; control crawler = 7561ffe6 merged the same way (button-crawl-ctl.js). lc27 regression = the tip's own site (/home/user/wt/r19-tip). Mutations = index-m1/m2/m3.html next to the ring index (scratch, not in git). Logs /home/user/wt/r19-out/<run>/{log.txt,crawl-*.json}. ≤2 browsers.
### (1) STATIC
- Lines added 605c596a..4a430cc2: 0 `.click(` / dispatchEvent / `.focus(` / keyboard / mouse.click / touchscreen.tap (one hit = a comment). New in-page reads only (`typeof S`, __bc.liftOf / sig). Game calls: rgFire + showModal = the talk setup of JOB 2 (BIG #18: opens the frame, never an answer); nlAccept setup-only; no new game call in 2b. The home re-crawl = p.close + open() (fresh page, setup).
- node --check clean · robot-lint «LINT OK 0» (default set) + «LINT OK 0 finding(s) in button-crawl.js» · rt-bare-unit «RT-BARE-UNIT OK 20/20».
### (2) BIG #18 MUTATIONS RE-RUN (Fold, ring-build 02b19b2a, --fast)
| mutation | control 7561ffe6 crawler | tip 4a430cc2 |
|---|---|---|
| M1 kitHandChoose = no-op (--start selx) | 0 taps, SKIP 1 «no selection-day screen» (the window.S start bug — the control walk never started), GATE PASS | «Tập qua loa…» «✓ does nothing» ×3 → **GATE FAIL** (3 sure) ✓ |
| M2 kitHandLift lifts another card (--start selx) | 26 PASS · 1 soft FAIL · GATE PASS | 4 rows «the tapped card did not take the lift (another one is lifted)» (Tiền sảnh ×3, Đông sở) → **GATE FAIL** (4 sure) + «Ra Dư đồ» KNOWN ✓ |
| M3 home buttons hidden (--start home) | 1 tap, GATE FAIL for another reason (stat chip «dead … under div#modal.kpcompactm») — no floor | «home vacuous (9 taps) → re-crawl once» → «(home floor) vacuous home: 9 home taps (floor 40)» → **GATE FAIL** ✓ |
| control: no mutation, Fold alone, gate shape (--fast) | — | 118 taps, home 80, selx 27 / talk 11, two-tap rows 6 lift-only + 2 lift+chip chosen, «Ra Dư đồ» KNOWN, **GATE PASS**, 362 s ✓ |
→ F1 FIXED (mid sig after the lift), F2 FIXED (liftOf = the tapped card), F3 floor + one re-crawl WORK. The `typeof S` fix is real (control M1 shows the old walk never starting).
### (3) REAL RUNS
| run | home Fold / iPad | selx Fold / iPad | talk Fold / iPad | two-tap rows Fold / iPad | gate | wall |
|---|---|---|---|---|---|---|
| ring-build, --dev fold,ipad (one run) | 1st pass **0 taps, 32 «gone»** / **1 tap** → re-crawl → 80 / 80 PASS | **16 rows, no (end)** / 28 rows → room | **7 rows, no (end)** / 10 → room | **0** / 8 | GATE FAIL: 1 sure = iPad DEAD «(Chạm để tiếp) Giáo tập ma ma» covered by div#kload.kpscene (+ «Ra Dư đồ» KNOWN) | 783 s |
| ring-build, Fold alone --start selx,talk | — | 27 → room | 11 → room | 6 + 2 | GATE PASS (KNOWN only) | 105 s |
| ring-build, iPad alone --start selx,talk | — | 29 → room | 11 → room | 6 + 2 | GATE PASS (KNOWN only); the #kload DEAD did not come back | 101 s |
| lc27 (tip site), --dev fold,ipad | 76 / 80 PASS (no re-crawl) | SKIP (no selection days) | 1 / 13 PASS | — | GATE PASS | 738 s |
| kit-ring-oldleft ALONE (ring-build, http, quiet) | Fold 755x1000 «old left = 0» (13 places, 75 s) · iPad 1180x820 «old left = 0» (81 s) | | | | | |
### (4) FINDINGS
- **G1 (BLOCKING, law 11 — F3 family not fixed): the selx / talk walks still use the GLOBAL tap counter.** walkSelx: `const T0=taps` … `while(taps-T0<SELXMAX)` and the inner `if(taps-T0>=SELXMAX)` — `taps` is shared by every device crawled in parallel (Promise.all over DEV). Seen: two-device ring run, Fold selx stopped after 16 own rows (log says «30 taps»), mid «Giáo tập ma ma» talk lines, BEFORE any hand card; Fold talk 7 rows, no plaque — no «(end)» row, no FAIL, no WARN → Fold (the PRIMARY device, law 12) drove 0 two-tap parts while the run reads PASS. Fold alone: 27 + 11 rows, 8 two-tap rows, back to the room → the cut is the shared counter. Fix: count the walk per device (this walk's own rows / a per-device counter, like used()); and a walk that stops on its budget without reaching the room writes a FAIL row «walk cut by budget at N taps (no end)»; on a build with ring UI (kind2 parts seen in home or the walk) require ≥1 two-tap row per device, else gate FAIL «ring UI not driven» (RV-165 floor for the walk, as for home). Scan every other `taps` use for the same (MAXTAPS checks are per device now; walkSelx / crawlTour / any loop on `taps`).
- **G2 (BLOCKING, the F3 ROOT claim is not proven): the first START home pass is STILL vacuous on BOTH devices in a two-device ring run with the per-device budget in** (Fold 0 taps + 32 «button gone before its tap», iPad 1 tap); only the re-crawl rescued it (80 / 80). So the global budget was not the (whole) root of BIG #18's iPad «0 taps». lc27 two-device: no re-crawl needed (76 / 80); Fold alone on ring: no re-crawl. Find the real cause (the «gone» = the button list taken, then the page re-laid before the tap — under parallel load on the ring build), fix it, or at least log the cause; the floor + re-crawl stays as the safety net. Not a false PASS (the floor catches it) — cost ≈ one extra home crawl (~5 min) per device in two-device runs.
- **N1 (risk, not blocking): one new false-FAIL under load.** iPad two-device ring run: «(Chạm để tiếp) Giáo tập ma ma» DEAD «covered by div#kload.modal.kpscene» = a sure gate FAIL on a legit talk line; not seen alone on either device (Fold 27/11, iPad 29/11 clean). The 2b veil wait is 8 s; under load the scene veil stays longer → wait longer (or re-check once) before a DEAD on a talk box behind #kload.kpscene. No other false-FAIL on multi-card hands (Tiền sảnh 3 cards, Đông sở, Theo Hoàng thượng / Thái hậu / Tể tướng plaques: every lift-only row «lifts (the tapped card)», every lift+chip «chosen»), plaques or talk lines.
- N2: «Ra Dư đồ» KNOWN line matches as intended on Fold + iPad (game finding of BIG #18 §5 stays with the ring-build owner); the 3 SKIPs «gone before its tap» after it are the map it opens.
- N3: liftOf compares the first 24 chars of the label; two cards sharing a 24-char start would read as «mine». No such hand on ring-build today; a longer key (full label or data-m) is safer when JOB 4 ports press() to robot-rt.
### (5) WALL TIME vs G4 (for MAIN)
Gate shape (Fold alone, --fast home+selx+talk) on ring-build = **362 s** (≈6 min; BIG #18 365 s; lc27 home alone 160 s in BIG #17). Two-device --fast: ring 783 s, lc27 738 s (both devices + re-crawls). Allow ~7 min for 90-button-crawl in quickcheck (Fold only); a two-device run ≈ 13 min.

## HANDOVER — BIG REVIEWER #19, 27/11
- Verdict: FAIL robot-realtap-lc27 4a430cc2 (F1 + F2 fixed and mutation-proven; G1 selx/talk walk budget still global → Fold drove 0 ring cards in a two-device run; G2 first home pass still vacuous on both devices, root not the budget). N1 one load-only false DEAD under #kload.kpscene (iPad).
- Recipe reuse: /home/user/wt/r19-out/run.sh (name crawler game [args]; env WT=), ring tree /home/user/wt/r19-rb (merged crawler + index-m1/2/3.html), lc27 /home/user/wt/r19-tip.

## REVIEW robot-realtap-live 532c6af5 — BIG #20 (for F ROOT #4 session_01UV1SziA1Pf3LLhALYg4fDU), 27/11
PRIORITY #1 CHECK: «— BIG #19» FAIL 4a430cc2 (G1, G2, N1, above) | FIXER #19 (lc27 48fec922) + FIXER #20 (PROGRESS «HARNESS FIXER #20») | LIVE 0562e15f (origin/main now 00dca386 = 0562e15f + the sx unit, no harness file touched) | claims: BIG REVIEWER #20 (F ROOT #4, 10:40Z).
KIT CHECK: n/a (harness only, no UI part touched).
### VERDICT: FAIL review/robot-realtap-live 532c6af5 (1 blocking item H1; clean base, G1, G2 root, N1 and the real-tap contract are right)
Tree = sparse worktree /home/user/wt/r20 at 532c6af5 (its root index.html == LIVE 0562e15f); crawler serves it itself. Mutations = scratch copies index-m1..m6.html there (untracked, not in git). Logs /home/user/wt/r20-out/<run>/{log.txt,crawl-all.json,crawl-load.json}. ≤ 2 browsers.
### (1) CLEAN BASE — OK
- 532c6af5 = ONE commit on 0562e15f; `git merge-base --is-ancestor a2902d43 532c6af5` → FALSE. diff 0562e15f..532c6af5 = 18 files, 11 A / 7 M, 0 D, all under dev/test, dev/tools/quickcheck.d + dev/PROGRESS_robot-realtap.md: no game file, no LIVE file deleted.
- Harness vs lc27 48fec922 (every file of `git diff 38cf2208..48fec922`): 15 files byte-identical (robot-rt.js, robot-rt-coop.js, robot-lint.js, rt-*.js/sh, quickcheck.d/*). realtap.js = exactly `git merge-file` (ours lc27, base 98c77517 == 38cf2208, theirs LIVE): 0 conflicts, 0 lines off. button-crawl.js = the same clean 3-way merge + only the FIXER #20 job 2c delta (BLOCK, waitLoad/WL/RB, room → next beat, ring floor, BCPROBE, crawl-load.json). Nothing lost from BIG #17 PASS 605c596a. LIVE's own changes to the other harness files since 38cf2208: none.
### (2) STATIC — OK
- node --check button-crawl / realtap / robot-rt clean · robot-lint «LINT OK 0» (default set) + «LINT OK 0 finding(s) in button-crawl.js» · rt-bare-unit «RT-BARE-UNIT OK 20/20».
- Real-tap contract: the added play-path lines use only realtap tap()/press() or page.mouse.click / touchscreen.tap at a hit-checked point and CDP touch for drag/hold (all reviewed in BIG #11–#17, unchanged since). Job 2c delta: 0 `.click(` / dispatchEvent / focus / keyboard; the new «room → next beat» tap goes through press() (realtap); game reads only (selxDaysOn() = pure read, typeof kitHandLift / kitPick, KLOAD fields). The one DOM write is the veil removal in waitLoad (setup) — see H1.
### (3) BIG #19 FINDINGS
- G1 FIXED: walkSelx counts its own `wt` per device (no `taps-T0` left; MAXTAPS checks use per-device used()); «(budget) walk cut» FAIL row present. Two-device runs below: Fold 26–27 selx + 10–11 talk rows and 4 lift-only + 2 lift+chip two-tap rows on EACH device.
- G2 ROOT FIXED and proven: the crawler's own route aborted every .mp3 → jload 'core' (97 mp3 of 2065 files) never completed → #kload re-made on every page / reload. Now only mp4/webm are blocked (none in core). Both two-device runs: first load «≈ 40 s → done 435/435 MB · life gate 0 s» on Fold AND iPad, FIRST home pass Fold 79–80 / iPad 80 taps, no re-crawl row, no veil row. Every reload in crawl-load.json: core done, 0 «STILL UP».
- N1 OK: no load-only false DEAD in 3 two-device-shaped runs (veil retry present).
- (ring floor) widened: now also fires when the build has kitHand / kitPick and 0 two-tap rows on every device — confirmed by the M1 «before» FIXER #20 measured.
### (4) MUTATIONS (re-run by me, LIVE 0562e15f, Fold, --fast)
| mutation | start | result |
|---|---|---|
| M1 kitHandChoose = return | selx | «Tập qua loa…» «✓ does nothing» ×6 → GATE FAIL (6 sure) ✓ |
| M2 kitHandLift lifts another card | selx | GATE FAIL (12 sure) ✓ |
| M3 every body button visibility:hidden | home | «home vacuous (5 taps) → re-crawl» → «(home floor) vacuous home: 5 home taps (floor 40)» → GATE FAIL ✓ |
| M4 kitPick pick() = return | talk | GATE FAIL (6 sure) ✓ |
| M5 kitPick lift() lifts another plaque | talk | «the tapped plaque did not take the lift» + «the tapped card did not lift» → GATE FAIL (2 sure) ✓ |
| **M6 (mine) jload runCore pool = never resolves (first-load screen hangs at «core 0/435 MB» for ever)** | home | «first-load screen (open): 300 s → STILL UP (KLOAD core), taken down (setup)» + the same after EVERY reload (×6, 91 s each) → home 80 PASS → **GATE PASS** ✗ (1132 s) |
### (5) TWO-DEVICE RING RUNS on LIVE (--fast --dev fold,ipad = home, selx, talk)
| run | first load F / I | home 1st pass F / I | selx F / I | talk F / I | two-tap rows F / I | gate | wall |
|---|---|---|---|---|---|---|---|
| ring | 40 s done / 41 s done | 79 PASS + 1 FAIL / 80 | 26 / 27 | 10 / 11 | 6 / 6 | GATE FAIL (1 sure, see N2) | 600 s |
| ring2 | 38 s done / 39 s done | 80 / 80 | 27 / 27 | 11 / 11 | 6 / 6 | GATE PASS | 475 s |
| Fold alone, home | done | 80 | — | — | — | GATE PASS | 313 s |
Home pass really taps on both devices (no re-crawl, no veil, DEAD 0).
### (6) FINDINGS
- **H1 (BLOCKING — the brief's own question «the fix must not hide a real game load problem»: it does).** waitLoad waits as a player would (≤ 300 s on open, 90 s per reload, life gate 30 s) — right — but when #kload (or #klife) is STILL UP after that it only logs and e.remove()s the veil, writes rm:'core' to crawl-load.json, and the gate never reads it. M6 = a player stuck for ever on «Lần đầu nhập cung», 0/435 MB → GATE PASS. Since the mp3 block is gone, a still-up veil on this harness is no longer a harness artefact: it is what a real player meets. Fix: a first-load / life-gate veil still up after the player wait = a sure FAIL row («first-load screen stuck: KLOAD <phase> <have>/<total> MB after N s» / «life gate stuck N s»), counted by the gate (one row per device is enough; if the screen offers its own way in (.kpopts button), REAL-tap it instead of removing it and write a WARN row). Keep the removal only so the rest of the crawl can still run. Whole family (law 11): robot-rt's own first-load / life-gate waits must do the same (check it holds no silent veil removal either).
- N2 (unconfirmed, not blocking — for the next fixer / game owner): run «ring», Fold home: ring person scene «Giáo tập ma ma Tống ma ma» (div.kscn.kring) — real tap on its ✕ «Lui» → «close button did not close its layer (something else changed)»; scene still up after the tap (shot /home/user/wt/r20-out/ring/shots/fold-0134.jpg, scratch). Not reached in ring2 / Fold alone (different crawl order), so not reproduced. The ring opens async (await loadFig) — a restore that re-opens the ring while one is still coming could stack two kscn layers (game double-open) or the tap landed during its fade-in. Probe: real-tap ✕ on that ring right after it opens, then again after 1 s, and count .kscn.kring layers.
- N3 (coverage, not blocking): iPad home: 22–23 SKIP «button gone before its tap (live body, div#kpop …, busy false)» in BOTH two-device runs (FIXER #20 saw 24) — a room popover left up after a soft restore hides about a quarter of the iPad home list each run; the 40-tap floor does not see it. Close the #kpop popover in the restore (as the hard restore does) so those buttons are really tapped.
- N4 (info): LIVE moved to 00dca386 (sx unit) after the cut; it touches no harness file — a rebase is a clean fast path, no re-review needed for it.

## HANDOVER — BIG REVIEWER #20, 27/11
- Verdict: FAIL robot-realtap-live 532c6af5 — H1 only (still-up first-load / life-gate veil is removed silently: M6 «load hangs for ever» = GATE PASS). Clean base, G1, G2 root (mp3 abort), N1, M1–M5 and real-tap contract all OK. N2 one unreproduced ✕ FAIL on the Giáo tập ma ma ring (Fold), N3 iPad #kpop SKIPs.
- Recipe reuse: /home/user/wt/r20-out/run.sh (name game.html [crawler args]), tree /home/user/wt/r20 (index-m1..m6.html; m6 = runCore pool never resolves).

## REVIEW robot-realtap-live e5671907 — BIG #20 RE-CHECK (for F ROOT #4 → F ROOT #5 session_01UV1SzkUFYpHr77k4v7Z31w), 27/11
PRIORITY #1 CHECK: «— BIG #20» FAIL 532c6af5 (H1, N2, N3, above) | FIXER #20 e5671907 (PROGRESS «HARNESS FIXER #20») | claims: BIG REVIEWER #20 re-check.
KIT CHECK: n/a (harness only).
### VERDICT: PASS review/robot-realtap-live e5671907 (H1 fixed and mutation-proven; N3 fix harmless but not effective — follow-up, not blocking)
Same tree /home/user/wt/r20 checked out at e5671907 (index.html == LIVE 0562e15f), same mutation files. Logs /home/user/wt/r20-out/x-*/ and c-ring/ (control = the 532c6af5 crawler on the same box). The container restarted at ~12:05Z; every run below is after it.
### (1) CLEAN BASE — still OK
e5671907 = 532c6af5 + 1 commit (button-crawl.js +11/−1, robot-rt.js 1 line, PROGRESS). `git merge-base --is-ancestor a2902d43 e5671907` FALSE; on LIVE 0562e15f; 0 files outside dev/test, dev/tools, dev/PROGRESS_robot-realtap.md. node --check OK, robot-lint LINT OK 0 (default set + button-crawl.js), rt-bare-unit 20/20.
### (2) H1 — FIXED
- button-crawl waitLoad: #kload / #klife still up after the player's wait → a «(first load)» row (FAIL) that is in the `sure` set; the veil is still removed only so the rest of the crawl runs. M6 (runCore pool never resolves): «first-load screen «Lần đầu nhập cung» still up after 300 s (KLOAD core, core 0/435 MB) — a player is stuck there» + one row per reload → **GATE FAIL (12 sure)** (was GATE PASS on 532c6af5).
- robot-rt family (law 11): the existing #kload path already enters only by a REAL tap on the game's own «Vào cung ngay» after 20 s; it now also writes bug('load', «first-load screen stalled → entered by a real tap on «Vào cung ngay»») — a [load] game-bug row, no silent removal. robot-rt holds no other #kload / #klife remove() (grep).
### (3) MUTATIONS M1–M6 (Fold, --fast) — all GATE FAIL
M1 6 sure (✓ does nothing) · M2 12 sure · M3 (home floor) 5 taps · M4 6 sure · M5 2 sure · M6 12 sure (first load).
### (4) TWO-DEVICE RUNS on LIVE (--fast --dev fold,ipad)
| run | crawler | first load F / I | home F / I (PASS · SKIP) | 1st home pass | selx F / I | talk F / I | two-tap F / I | gate |
|---|---|---|---|---|---|---|---|---|
| x-ring | e5671907 | 55 s / 54 s done | 41·27 / 80·26 | iPad vacuous (0 taps, 35 gone) → re-crawl | 28 / 27 | 11 / 10 | 6 / 6 | PASS |
| x-ring2 | e5671907 | 42 s / 41 s done | 80·2 / 80·27 | iPad vacuous (0 taps, 35 gone) → re-crawl | 27 / 27 | 10 / 10 | 6 / 6 | PASS |
| c-ring (control) | 532c6af5 | 50 s / 50 s done | 80·2 / 80·29 | Fold vacuous (0 taps, 34 gone) → re-crawl | 26 / 29 | 11 / 10 | 6 / 6 | PASS |
Every first load «done 435/435 MB», 0 «(first load)» rows on the plain build (no false FAIL from H1).
### (5) NOTES (not blocking)
- N3 NOT EFFECTIVE (but harmless): iPad home SKIP «button gone before its tap» = 26 / 27 on e5671907 (control 29) — not 22→1. The filter drops body buttons only when the popover screen's roots carry #kpop; in x-ring2 / c-ring the «sương sớm» screen was read as «[body:…]» (no #kpop root), so the old 36-button relist and its «gone» SKIPs came back. It hides no real button: the popover has no buttons of its own (0 listed on Fold in every run, before and after), and the dropped body buttons are the home buttons tapped at depth 0. Fix: key the popover screen on the TAPPED button (the weather chip «sương sớm») or on document.getElementById('kpop') being open, not on the roots list; or close #kpop in the soft restore.
- G2b (pre-existing, caught by the net): the first START home pass is still sometimes vacuous — 3 of 3 two-device runs after the container restart (iPad ×2 on e5671907, Fold on the 532c6af5 control), 0 of 2 before it. Not the #kload veil (load done, 0 first-load rows): the gone rows read «live body · busy false · modal off · same label: none» = the room's buttons were re-laid (new labels) between listing and tap. The home floor + one re-crawl turns it into a full 80-tap pass every time (no false PASS), at ≈ +4 min per run. Successor: log the room label set at list time vs tap time on the first pass to find what re-renders the room in the first minute.
- Fold x-ring: 23 SKIP under «div#modal.modal.kpcompactm» (the Sắc stat panel left open by a restore) → Fold home 41 PASS, just over the floor. Same restore-left-a-panel family as N3; same fix family (close every left panel / popover in the soft restore).
- N2 (✕ «Lui» on the Giáo tập ma ma ring) not reached in any re-check run — still open, unreproduced.
- Job 3 table commits: none on e5671907 (one commit only); nothing else reviewed.
Gain vs risk of PASS now: the H1 gate hole is closed and M1–M6 all bite; the open notes only cost time / coverage (SKIPs, one re-crawl) and never turn a fault into a PASS (floor + sure rows). Gain is bigger.

## HANDOVER — BIG REVIEWER #20, 27/11 (re-check)
- Verdict: PASS robot-realtap-live e5671907. Follow-ups for the fixer: N3 popover key (SKIP 26–29 iPad), G2b first-pass re-lay (net catches it), restore leaves kpcompactm / kpop open, N2 unreproduced.
- Recipe: /home/user/wt/r20-out/run.sh (name game.html [args]); tree /home/user/wt/r20 (index-m1..m6.html).

## REVIEW robot-realtap-live e5671907..d1d1541f — BIG #21 (for F ROOT #5 session_01UV1SzkUFYpHr77k4v7Z31w), 27/11
PRIORITY #1 CHECK: «— BIG #20 RE-CHECK» PASS e5671907 (base, not re-reviewed) | FIXER #21 PROGRESS «HARNESS FIXER #21» (ef9305f0, 8fb32a5f, cca0289c, d1d1541f) | LIVE origin/main 5cee92bb | claims: BIG REVIEWER #21 (CLAIMS 13:02Z, F ROOT #5). depth 5, START_CTX ~4 %.
KIT CHECK: n/a (harness only, no UI part touched).
### VERDICT: FAIL review/robot-realtap-live d1d1541f (2 blocking: F1 the «seen lift» read turns a real dead ✓ into a PASS; F2 every natural thẻ gỗ plaque = false [game] bug and is never chosen — job 4 «liftOnly 0» does not hold on LIVE)
Tree: sparse worktree /home/user/wt/r21 = branch review/robot-realtap-live-r21 (local, not pushed) = d1d1541f + merge of origin/main 5cee92bb (acaf6910). Control tree /home/user/wt/r21c = e5671907 (BIG #20 PASS). LIVE site 5cee92bb served by rt-serve-build.sh :8918 (self-check 137 paths 200); mutation copies index-m1..m8.html in /home/user/wt/r21 (untracked) served by the crawler / http.server :8920. Logs /home/user/wt/r21-out/<run>/ (scratch). No shot in git, no CDN upload.
### (5) MERGE WITH LIVE 5cee92bb — OK
- `git merge origin/main` into d1d1541f: clean, 0 conflicts. button-crawl.js / robot-rt.js / realtap.js in the merge = byte-identical to d1d1541f; LIVE touched no harness file since 0562e15f. e5671907..d1d1541f = 3 files (button-crawl.js, robot-rt.js, PROGRESS): 0 game files (law: harness only — OK).
- On the merge: node --check (button-crawl, robot-rt) OK · robot-lint «LINT OK 0» (default set) + «LINT OK 0 finding(s) in button-crawl.js» · rt-bare-unit «RT-BARE-UNIT OK 20/20». Added lines with `.click(` / dispatchEvent / `.focus(` / keyboard.: 0. New page work = reads only (liftSeen, kitRing.cur.sel / .busy, SCAN) + one waitForFunction. Real-tap contract holds.
### (1) LIFT READ — the hidden-#modal case is right, but a real dead ✓ now PASSES (F1)
| build (Fold --fast) | tip d1d1541f | control e5671907 |
|---|---|---|
| plain LIVE 5cee92bb, --start selx (✓ chooses; #modal hidden, chosen .klift left in the hidden DOM) | GATE PASS, «Tập qua loa…» lift+chip PASS | (robot-rt control es1c on plain LIVE: 3 false «✓ tapped for real, the lift stays» — the FIXER #21 root is real) |
| M1 kitHandChoose = return | GATE FAIL (6 sure) ✓ | — |
| M2 kitHandLift lifts another card | GATE FAIL (12 sure) ✓ | — |
| M3 every body button visibility:hidden (home) | GATE FAIL (1, home floor) ✓ | — |
| M4 plaque «Chọn» = no-op (`if(aa&&0)pick…`) (talk) | GATE FAIL (6 sure) ✓ | — |
| M5 plaque lift() lifts another plaque (talk) | GATE FAIL (2 sure) ✓ | — |
| M6 jload runCore pool never resolves (home) | GATE FAIL (10 sure, «(first load) … still up after 300 s / 91 s (KLOAD core, 0/435 MB)» on open + every reload) ✓ | — |
| **M8 (mine) ✓ = the cards fly away, nothing chosen, frame stays (`setTimeout(go,ms)` → only `__khBusy=0`: what a go() that throws / never runs looks like)** | **GATE PASS** — «✓» row «lift+chip: next» PASS; the stuck frame is only a SOFT row «a selection-day screen with nothing to tap» ✗ | **GATE FAIL** (1 sure) «✓ does nothing (… the lift stays)» ✓ |
| M8, robot-rt (dev=fold origin=pf road=pt_su bot=sens seed=43 slice=3) | no two-tap bug; the stall shows only as «BUG harness NO-EXIT DIALOG .dlg «Lễ ra mắt» … no button at all for 30 s» | 2 × [game] «two-tap hand «Vào cung ngay…» / «Cúi đầu chờ xét…»: ✓ tapped for real, the lift stays (does nothing)» + the same NO-EXIT |
| M7 (mine) ✓ hides #modal and drops the choice | GATE PASS | GATE PASS (pre-existing, see N1) |
Why: kitHandChoose flies EVERY chosen card to opacity 0 (WAAPI fill forwards) before go() clicks it. liftSeen() counts a lift only at opacity > .05 and rect > 2 px, so right after ANY ✓ the lift reads «gone» whether the choice happened or not; the crawler's `chosen = chg && (gone || frame)` then needs only some change (the plate / chip hide), robot-rt's `gone` alone = chosen. The f28d28b9 case FIXER #21 fixed needs only «not under [hidden] / not connected».
### (2) JOB 3 — E-S1 seed 3683447523 Fold, origin=thd road=thd_tho, bot rand, 30 buổi
| run | harness | path | boards | taps | DEAD · stuck · jsClicks · NO-EXIT | bugs |
|---|---|---|---|---|---|---|
| es1 | tip | «Ở nhà chờ tuyển tú» → Chương 1 at home all 30 buổi (no Điện tuyển yet) | tho 8/10 (drag 10, area 0), dan 0/10 (10 taps, area 0) | 212 | 0 · 0 · 0 · 0 | 2 [game] plaque «the tapped part did not take the lift» (F2) |
| es1b | tip | the same home path, 30 buổi | — | 221 | 0 · 0 · 0 · 0 | 3 (F2; plaque 5, liftOnly 4) |
| es1c | control e5671907 | palace → «Ngày thứ hai — Điện tuyển» → dan 0/10 → «Ban hoa» age 20, buổi 1 (game-imposed ending, board played: 10 taps) | dan 0/10 | 88 | 0 · 0 · 0 · 0 | 3 false «✓ … the lift stays» (old harness) |
- The debut «ve» path of the FIXER's o21/es1c is NOT reproduced: with bot rand the seed does not fix the road (thân phận / opening choices differ run to run on the same build). 0 DEAD / stuck / jsClicks / NO-EXIT in all three; no «Ban hoa» after an unplayed board (area 0 everywhere). The only bugs are F2 (tip) and the fixed false ✓ (control).
### (3) JOB 4 — slices on LIVE 5cee92bb (tip)
| slice | args | buổi · taps | twoTap (hand / plaque / chosen / liftOnly / chipFail / chipNoFx) | jsClicks · DEAD · stuck · NO-EXIT | boards |
|---|---|---|---|---|---|
| Fold speed s21 a | dev=fold bot=speed seed=21 slice=12 | 12 · 83 | 9 / 0 / 9 / 0 / 0 / 0 | 0 · 0 · 0 · 0 | — |
| Fold speed s21 b | same | 12 · 74 | 5 / 1 / 6 / 0 / 0 / 0 | 0 · 0 · 0 · 0 | tho 10/10 |
| Fold speed s21 c | slice=6 | 6 · 37 | 3 / 0 / 3 / 0 / 0 / 0 | 0 · 0 · 0 · 0 | — |
| Fold speed s21 d | slice=6 | «Ban hoa» age 20 at buổi 1 (palace road, Điện tuyển answered; game-imposed ending) · 88 | 11 / 0 / 11 / 0 / 0 / 0 | 0 · 0 · 0 · 0 | — (every .kscn moved on by its skip taps: 20 + 16 taps on the two talk scenes, the lines advanced) |
| iPad 1180x820 sens s61 | dev=ipad bot=sens seed=61 slice=12 | 12 · 53 | 2 / 0 / 2 / 0 / 0 / 0 | 0 · 0 · 0 · 0 | — |
| Fold E-S1 (es1, es1b above) | | 30 · 212 / 221 | 13–14 / 3–5 / 13–14 / **3–4** / 0 / 0 | 0 · 0 · 0 · 0 | |
| crawler ring slice, Fold --start talk (LIVE) | | 10 talk rows | plaque 2 lift-only + 1 lift+chip PASS (talk plaques have no sub line → F2 does not bite there) | GATE PASS | |
- liftOnly is NOT 0 on LIVE: the person ring at home (mẫu thân: «Làm vừa lòng mẫu thân · Vững · Tốn 1 khắc · 10 bạc», «Hầu mẫu thân trọn buổi», «Thỉnh an mẫu thân · Rất vững…») gives liftOnly 3–4 / plaque 3–5, every one a false [game] bug (F2). The FIXER's natural slices met no plaque (their note) so F2 never showed.
- NO-EXIT of FIXER s21 run 2 (.kscn after Điện tuyển «Nhận», 12 skip taps, 31 s, reload): NOT reproduced — 4 s21 runs on 5cee92bb: three stayed off the palace road, one (d) answered Điện tuyển and got «Ban hoa» (no pass → no «Nhận» result scene), every .kscn went by one skip tap or «Lui». Reading the game: a .kscn takes a tap anywhere ONLY while a kitDialogue line runs (jkitsel kitDialogue: `L.addEventListener("click",tap)`, removed at the end); a scene left open with no line and no button ignores every tap by design. The harness logged «SKIP TAP .kscn … tap» = each tap hit the scene layer itself (bareTapOn own-layer check), then reloaded after 30 s as a player would. Verdict: GAME-side (a scene left open with no line / no way on after the selection result), not a harness fault — UNCONFIRMED (no repro). Repro recipe for the game owner: dev=fold bot=speed seed=21 slice=12 until a run takes the palace road (run 2 of 2 did on f28d28b9); at the stall read `kitScene` state: `.kscn .kscn-box` count, `.kdw` (dialogue) present, and the `.kmov` «Nhận» handler's next step.
### (4) N2 CRAWLER CHANGE (ring ✕ «Lui» = one step back) — cannot hide a dead ✕
verdict() unit check (scratch vunit.js, tip vs control): dead ✕ at focus (nothing changes) FAIL «nothing happened» both; ✕ at focus, sel stays, something else changes → FAIL both; ✕ at focus steps back (sel 0 → −1) PASS tip (control FAIL = the BIG #20 N2 false row); ring-level dead ✕ FAIL both; no ring FAIL both. press() waits ≤ 2.5 s for kitRing.cur.busy then taps anyway → a ring stuck busy still reads «nothing happened» (FAIL). OK. Nit N3 below.
### (6) FINDINGS
| # | sev | where | finding | fix |
|---|---|---|---|---|
| F1 | BLOCKING (new in ef9305f0) | button-crawl liftSeen/lifts/lifted; robot-rt two-tap `up` / `gone` | A lift counts as «gone» once its card is at opacity ≤ .05 or rect ≤ 2 px. The game's fly animation does that to EVERY chosen card before go(), so a ✓ whose go() never runs (M8) = crawler GATE PASS (control GATE FAIL) and robot-rt no chipNoFx bug (control 2) — the stall then shows only as a «harness» NO-EXIT. | «gone» = the .klift / .kpk-up node is disconnected, under [hidden] / display:none, or lost its class — never opacity / rect (the f28d28b9 case needs only [hidden]). Keep `frame` (roots changed). Whole family: the same read in robot-rt `up`, robot-rt `gone`, crawler lifts()/liftOf()/lifted(). Proof to bring: M8 GATE FAIL + robot-rt M8 chipNoFx ≥ 1, plain LIVE selx GATE PASS, M1–M6 GATE FAIL. |
| F1b | BLOCKING (same family, pre-existing softness) | button-crawl selx walk | M8's stuck frame is written «a selection-day screen with nothing to tap (no button, no talk box)» as a SOFT «no effect» row (not gating). A selection-day frame with nothing to tap = a player stuck there. | make that row a sure FAIL (it never shows on plain LIVE: 0 soft rows in live-selx). |
| F2 | BLOCKING (job 4 criterion; made total by ef9305f0) | robot-rt two-tap «mine» (and crawler liftOf, same family) | «mine» compares the TAPPED .kpk-b label = its aria-label «<name> · <odds word> · Tốn <x>» with the LIFTED .kpk-n label = its textContent / innerText (no aria-label: name + odds chip + parts, no « · »). They never match when the plaque has a sub line → every natural person-ring plaque = [game] «the tapped part did not take the lift (another one is lifted)», no «Chọn» tap (es1 / es1b: plaque 3 / 5, liftOnly 3 / 4, 2 / 3 bugs). The old 24-letter key matched only names ≥ 24 letters; the full key matches none. | key the lift on the plaque itself: `.kpk-n[data-id]` of the lifted node === the tapped `.kpk-b` data-id (or read the lifted node's `.kpk-b` aria-label); hand cards keep the label compare (tapped node = lifted node). Proof: an E-S1 home-path slice (es1 recipe) with plaque ≥ 3, liftOnly 0, chosen counts the plaques. |
| N1 | note (pre-existing since FIXER #19) | crawler chosen = chg && (gone ∥ frame) | M7 (✓ hides #modal and drops the choice) = GATE PASS on tip AND control: «frame closed» is taken as «chosen» without checking the state moved (S / Q). | for the hand: chosen also needs post.S ≠ mid.S or the next frame (Q / title) — follow-up, not blocking. |
| N2 | note | job 3 | the seed does not pin the road with bot rand: the «ve» debut is one sample, not a repeatable proof. | job 3 proof on a pinned save (RT save replay) if a path must be shown. |
| N3 | nit | verdict() ring step-back | the PASS needs only a close-like label; a «Thôi»/«Đóng» of ANOTHER layer that leaves its own layer but moves the ring back would PASS. | require b inside `.kring-x`. |
| N4 | game, for MAIN / game owner | .kscn after Điện tuyển «Nhận» (FIXER s21 run 2) | likely GAME stall (scene open with no running line, taps dropped by design), not reproduced in 4 runs. | recipe above. |
Gain vs loss of FAIL now: F1 reopens the exact hole BIG #18–#20 closed (a dead ✓ = PASS; likelihood: any go()/handler fault in kitHandChoose, can happen; weight big — the owner's «nút nào cũng work» gate stops seeing it; caught only by M8-type proof). F2 puts false [game] bugs in every life that meets a person ring (likely, every home-origin life; weight medium; easy to see in the bug file). Both fixes are small (one read each). Loss of waiting one fixer round: small. Gain is bigger → FAIL.

## HANDOVER — BIG REVIEWER #21, 27/11
- Verdict: FAIL robot-realtap-live d1d1541f — F1 (opacity / rect «lift gone» → M8 dead ✓ GATE PASS; robot-rt silent), F1b (stuck selx frame = soft row), F2 (plaque «mine» aria-label vs textContent → false bugs, plaques never chosen). Merge with LIVE 5cee92bb clean (local review/robot-realtap-live-r21 acaf6910, not pushed); M1–M6 GATE FAIL; N2 crawler change sound.
- Recipe reuse: /home/user/wt/r21-out/run.sh <name> <game.html> [crawler args] (TREE=/home/user/wt/r21c for the control); mutations /home/user/wt/r21/index-m1..m8.html (m8 = `setTimeout(go,ms)}` → `setTimeout(()=>{g.__khBusy=0},ms)}`, m7 = kitHandChoose hides #modal + return); M8 for robot-rt: `python3 -m http.server 8920` in /home/user/wt/r21, URL http://127.0.0.1:8920/index-m8.html; verdict unit /tmp/…/scratchpad/vunit.js (copy into the report if needed).

## REVIEW robot-realtap-live d1d1541f..0191f987 — BIG #21 RE-CHECK (for F ROOT #5 session_01UV1SzkUFYpHr77k4v7Z31w), 27/11
PRIORITY #1 CHECK: «— BIG #21» FAIL d1d1541f (F1, F1b, F2, N1–N4, above) | FIXER #22 READY F1-F2 0191f987 (PROGRESS «HARNESS FIXER #22») | LIVE origin/main 772bee4f | claims: BIG REVIEWER #21 re-check (F ROOT #5).
KIT CHECK: n/a (harness only).
### VERDICT: FAIL review/robot-realtap-live 0191f987 — 1 blocking (F3: a locked plaque = false [game] bug; same class as F2, it showed the moment F2 was fixed). F1, F1b, F2 key, N1, N3, .kfoc layer: fixed and mutation-proven.
Tree /home/user/wt/r21 = review/robot-realtap-live-r21b (local) = 0191f987 + merge of LIVE 772bee4f (f5c8d690). LIVE 772bee4f served by rt-serve-build.sh :8918 (137 paths 200). Mutations index-m1..m9.html rebuilt on 772bee4f's index.html. Logs /home/user/wt/r21-out/rc/<run>/ (scratch).
### (1) MERGE + STATIC — OK
- `git merge 772bee4f` into 0191f987: clean; button-crawl.js / robot-rt.js / realtap.js in the merge = 0191f987. 6fa7584c (FIXER's merge of d9ca7892) left the three harness files untouched. 0191f987 vs 6fa7584c = button-crawl.js, robot-rt.js, PROGRESS only (no game file).
- node --check OK · robot-lint LINT OK 0 (default set + button-crawl.js) · rt-bare-unit 20/20 · added lines with `.click(` / dispatchEvent / `.focus(` / keyboard.: 0. New page work = reads (getClientRects, data-id, S hash, SCAN).
### (2) MUTATIONS on LIVE 772bee4f (Fold --fast)
| mutation | start | tip 0191f987 |
|---|---|---|
| plain LIVE | selx / talk | GATE PASS / GATE PASS (0 soft rows) |
| M1 kitHandChoose = return | selx | GATE FAIL (7 sure) |
| M2 lift lands on another card | selx | GATE FAIL (13) |
| M3 every body button hidden | home | GATE FAIL (2, home floor) |
| M4 plaque «Chọn» no-op | talk | GATE FAIL (6) |
| M5 plaque lift() lifts another | talk | GATE FAIL (2) |
| M6 first-load never completes | home | GATE FAIL (17 sure, «(first load)» on open + every reload) |
| M7 ✓ hides #modal, drops the choice | selx | GATE FAIL (1: «(loop) the same screen after 6 taps») — see N5 |
| M8 ✓ flies the cards, go() never runs | selx | GATE FAIL (2: «✓ does nothing» + «(no target)») — was GATE PASS on d1d1541f ✓ |
| M9 (new) plaque «Chọn» only drops the lift, nothing chosen | talk | GATE FAIL (6) — N1 «moved» check bites on the plaque too |
| robot-rt M8 (dev=fold origin=pf road=pt_su bot=sens seed=43) | — | [game] «two-tap hand «Dâng Kỳ…»: ✓ tapped for real, the lift stays (does nothing)» ✓ (was silent on d1d1541f) |
### (3) LIVE RUNS (tip, LIVE 772bee4f)
| run | args | result | twoTap (hand / plaque / chosen / liftOnly) | jsClicks · DEAD · stuck · NO-EXIT | bugs |
|---|---|---|---|---|---|
| crawler two-device | --fast --dev fold,ipad (home, selx, talk) | 236 taps · GATE FAIL 1 = REAL game DEAD (G1) · home re-crawl both devices (G2b) | rows: 4 lift-only + 2 lift+chip per device | — | — |
| E-S1 e1 | dev=fold origin=thd road=thd_tho bot=rand seed=3683447523 slice=30 | palace road, 30 buổi, 440 taps; boards mua 6/10, hat 6/10, hat 5/10, mua 8/10, hat 5/10 (area ≤ 3) | 47 / 0 / 47 / 0 | 0 · 0 · 0 · **1** | 1 harness NO-EXIT (N6) |
| E-S1 e2 | same | home road, 30 buổi, 201 taps; tho 10/10 | 8 / 9 / 9 / **8** | 0 · 0 · 0 · 0 | 3 [game] «lifted, but no «Chọn» chip came» (F3) |
| iPad 1180x820 sens s61 | dev=ipad bot=sens seed=61 slice=12 | 12 buổi, 156 taps | 17 / 0 / 15 (+2 oneTap) / 0 | 0 · 0 · 0 · 0 | 0 |
- F2 natural proof: e2 met the nhũ mẫu ring (plaques with a sub line «… · Rất vững · Tốn 1 khắc»): the data-id key matched («mine»), the first plaque was lifted + «Chọn» → chosen (no more «another one is lifted»). F2 = FIXED.
### (4) FINDINGS
| # | sev | where | finding | fix |
|---|---|---|---|---|
| F3 | BLOCKING | robot-rt two-tap (picker + `up && !chH` branch); crawler press() liftOnly / «lift» rows (same family) | A LOCKED plaque (act.off → `.kfoc-b.kfoc-off.kitoff`, kitPick conf(): `if(!a||a.off) c.hidden=true`) lifts on a tap but never shows «Chọn» — by design. Probe on LIVE (scratch offprobe.js, real taps): off plaque → up b, chip false; open plaque → up a, chip true. robot-rt does not read kitoff: in e2 it tapped the nhũ mẫu plaques 8 more times after the first choice (very likely locked: onceM «nmke» once a month, khắc spent; robot-rt logs no kitoff, so it cannot tell — the fix must log it) and wrote 3 [game] «lifted, but no «Chọn» chip came» rows (liftOnly 8). | a tapped .kpk-b with .kitoff / .kfoc-off = an «off» tap: count `tw.offTap`, no bug; the picker skips kitoff plaques unless nothing else is left (one read of its reason is fine); crawler: a kitoff plaque lift without chip = PASS «locked: lifts, shows its reason, no Chọn». Proof: e2 recipe with liftOnly 0, offTap > 0, 0 such bugs. |
| N5 | note | crawler M7 | the ✓ row itself still reads PASS «lift+chip: next» ×6 under M7; only the «(loop)» floor row FAILs the gate. Gate right, row text wrong. | the N1 `moved` check: the same hand frame coming back is not «moved» (compare the hand's label set, not only new roots). |
| N6 | game / harness note | e1, palace road buổi 1 (~373 s) | the FIXER's s21 NO-EXIT shape REPRODUCED once: «.kscn «» no button at all for 31 s», taps hit the scene layer; cleared WITHOUT a reload (unstick []), so the scene took ≥ 31 s before it moved — a real wait a player sees, likely GAME-side (a scene with no running line). Lead-in lost: R.trace keeps 400 rows and RT_NOSHOT=1 → no shot. | harness follow-up (not blocking): the NO-EXIT record carries the last 20 trace rows + the .kscn outerHTML head; game owner: rerun e1 recipe WITHOUT RT_NOSHOT. |
| G1 | GAME (for MAIN / kit owner) | Fold 755x1000, person focus .kfoc «Cung nữ thân tín tam đẳng Chi Nhi», tab Giao thiệp | plaque «Chọn làm cung nữ thân cận · Tốn Bạc 30» is cut at the right edge (name «…cung n»), its «!» «Chi tiết» off-screen → DEAD (shot /home/user/wt/r21-out/rc/two/shots/fold-0222.jpg, looked at). Shown now because .kfoc is its own layer (FIXER #22). Real fault, not harness; it will FAIL quickcheck on LIVE until fixed or filed KNOWN. | kit: the left plaque column must fit inside the focus band on Fold. |
| G2b | note (pre-existing) | crawler first home pass | vacuous on BOTH devices in the two-device run (Fold 0 taps / 34 gone, iPad 1 tap); the re-crawl rescued it. | as BIG #20. |
- Job 3: the road is not pinnable (FIXER #22 dropped rngpin — agreed, 2 seeded runs here again split home / palace); every E-S1 run: 0 DEAD / stuck / jsClicks; area ≤ 3. «ve» debut stays an unpinned sample (accepted as such).
Gain vs loss of FAIL: F3 writes false [game] rows in every home-origin life that meets a person ring once its actions are spent (likely; medium; easy to see; fix = one class read in two files). Everything else is fixed and proven. Loss of one more short round: small. → FAIL, narrow.

## HANDOVER — BIG REVIEWER #21 (re-check), 27/11
- Verdict: FAIL robot-realtap-live 0191f987 — F3 only (kitoff plaque). F1 / F1b / F2 / N1 / N3 / .kfoc fixed; M1–M9 all GATE FAIL; robot-rt M8 now flags the dead ✓; iPad slice clean; merge with LIVE 772bee4f clean.
- Recipe: /home/user/wt/r21-out/run.sh rc/<name> <game.html> [args]; tree /home/user/wt/r21 (index-m1..m9.html, m9 = `if(aa)pick(P,aa,…)` → `if(aa)drop(P)`); E-S1 e2 recipe = the job-3 command (home road ≈ every 2nd run); off-plaque probe = kitPick.open on a fixed host with one act off:true, real-tap both.

## READY F3 — HARNESS FIXER #23 → review/robot-realtap-live 3ed71335 (for F ROOT #6), 27/11
- F3 fixed (whole family): locked plaque (.kitoff / .kfoc-off) = robot-rt offTap (no bug) + picker skip unless nothing else (offSkip/offSkipLog); crawler two:'locked' PASS «lifts, shows its reason, no Chọn» (FAIL if a chip shows: M11); realtap.choose logs «locked». N6: NO-EXIT record keeps last 20 trace rows + top-layer outerHTML + middle element chain.
- Proof on LIVE 772bee4f: M10 (locked plaque, talk) old crawler GATE FAIL 1 false row → tip GATE PASS; M1–M9 + M11 all GATE FAIL; plain selx / talk / two-device (Fold+iPad) GATE PASS; robot-rt E-S1 ×5 + iPad s61 + M10 ×8: liftOnly 0 from locked parts, 0 false «no Chọn chip», offSkip up to 14, offTap 3 (offskip=0), jsClicks / DEAD / stuck 0; lint 0, rt-bare-unit 20/20. N6 shape not reproduced in 5 runs without RT_NOSHOT. Open: .kscn «» chipNoFx on M10 (see PROGRESS «HARNESS FIXER #23»), N5 untouched.

## REVIEW robot-realtap-live 0191f987..3ed71335 — BIG #21 RE-CHECK 2 (for F ROOT 7 session_01UV1Szm5i1gFZxqu9LBGQKH), 27/11
PRIORITY #1 CHECK: «— BIG #21 RE-CHECK» FAIL 0191f987 (F3 locked plaque, N5, N6) | FIXER #23 READY F3 3ed71335 (PROGRESS «HARNESS FIXER #23», report 1a34076e) | LIVE origin/main 772bee4f (already merged in 43fafa67) | claims: BIG REVIEWER #21 re-check 2.
KIT CHECK: n/a (harness only).
### VERDICT: FAIL review/robot-realtap-live 3ed71335 — F3 FIXED; 1 blocking left: F4 robot-rt «noLift» = false [game] bug on a one-tap TOGGLE card (same false-bug family as F2 / F3; the noLift branch came in 8fb32a5f, I missed it in round 1).
Tree /home/user/wt/r21 at 3ed71335 (root index.html == LIVE 772bee4f); LIVE served :8918; mutations index-m1..m12.html (scratch). Logs /home/user/wt/r21-out/r3/.
### (1) SCOPE + STATIC — OK
Fixer commits 02e19653 + 3ed71335 = button-crawl.js, realtap.js (1 line), robot-rt.js, PROGRESS; 43fafa67 = clean merge of LIVE 772bee4f (game files only from LIVE). node --check (3 files) OK · robot-lint LINT OK 0 (default set + button-crawl.js) · rt-bare-unit 20/20 · added `.click(` / dispatchEvent / focus / keyboard: 0. Locked = `.kitoff,.kfoc-off` on the tapped part or its .kpk-n (read only); robot-rt picker drops kitoff buttons only while an open one is left (offSkip log); realtap.choose logs «locked» instead of «no ✓».
### (2) MUTATIONS (Fold --fast, LIVE 772bee4f)
| build | start | tip 3ed71335 |
|---|---|---|
| plain LIVE | talk / selx | GATE PASS / GATE PASS |
| **M12 (mine) every plaque's «Chọn» hidden (conf() `if(1)` — OPEN plaques lose the chip)** | talk | GATE FAIL (19) «1st tap: lifted, but no «Chọn» chip came» — the locked rule does not hide a real missing chip ✓ |
| M4 «Chọn» no-op · M9 «Chọn» only drops the lift · M5 lift lands on another plaque | talk | GATE FAIL 6 · 6 · 2 |
| M8 ✓ fly, go() never runs · M7 ✓ hides #modal, drops choice · M1 ✓ = return | selx | GATE FAIL 2 · 3 · 7 — M7 now FAILs on the ✓ row itself «✓ does nothing» (N5 fixed) |
(M2, M3, M6 not re-run: their paths are untouched by 02e19653/3ed71335; the fixer's table has them FAIL.) The off path itself (locked plaque = PASS «locked») is the fixer's M10 (old FAIL → tip PASS) + my LIVE probe of round 2 (kitoff plaque lifts, no chip); not re-run.
### (3) E-S1 (job-3 recipe, tip)
| run | road | buổi · taps | twoTap | offSkip | jsClicks · DEAD · stuck · NO-EXIT | bugs |
|---|---|---|---|---|---|---|
| e1 | palace | 30 · 420 | hand 51 / chosen 46 / liftOnly 0 / **noLift 3** / oneTap 2 | 0 | 0 · 0 · 0 · 0 | 3 [game] «two-tap hand «…»: tapped for real, nothing lifted (2 s) and the frame is still there» (F4) |
| e2 | home | 30 · 175 | hand 8 / chosen 8 / 0 | 0 | 0 · 0 · 0 · 0 | 0 (no person ring met: plaque 0) |
### (4) FINDINGS
| # | sev | where | finding | fix |
|---|---|---|---|---|
| F3 | FIXED | robot-rt + crawler + realtap | locked plaque = offTap / «locked» PASS; a real missing chip on an OPEN plaque still FAILs (M12). | — |
| F4 | BLOCKING | robot-rt two-tap `else if (!up)` branch (noLift, 8fb32a5f) | «nothing lifted (2 s) and the frame is still there» fires on hand cards that ACT on one tap without a lift. Proof e1 t=443–446: «Chọn người theo hầu», tap «Cung nữ thân tín tam đẳng Xuân Yến» → noLift bug, and the next row is «Lên đường … 1 người theo (Cung nữ thân tí…)» = the tap DID select her (a toggle card, the frame re-rendered with the same title). Same for «Trò chuyện với Tú nữ Chu Vân Tịch» (t=314–316, the frame moved to the next card set). The check only compares layer + title + «a hand card exists». | noLift only when NOTHING changed: S hash (the SH of FIXER #22) unchanged AND the frame's text / card set unchanged after 2 s; otherwise oneTap. Proof: e1 recipe (palace road) noLift 0 on «Chọn người theo hầu»; a mutant with kitHandLift = return must still give noLift ≥ 1. |
| N6 | OK (code) | robot-rt NO-EXIT record | +20 trace rows + top layer outerHTML; not exercised here (0 NO-EXIT in e1/e2). | — |
| N7 | note | e2 | no ring in 2 of my E-S1 runs → the natural F3 proof stays the fixer's (M10 ×8, E-S1×5). | — |
Gain vs loss: F4 writes false [game] rows in palace-road lives (likely: every «Chọn người theo hầu» trip; medium; easy to see; fix = one extra «did anything change» read). Everything else is fixed and mutation-proven. → FAIL, narrow.

## HANDOVER — BIG REVIEWER #21 (re-check 2), 27/11
- Verdict: FAIL robot-realtap-live 3ed71335 — F4 only (noLift on one-tap toggle cards). F3, N5, N6 done; M1/M4/M5/M7/M8/M9/M12 GATE FAIL; plain LIVE PASS.
- Recipe: /home/user/wt/r21-out/run.sh r3/<name> <game.html> [args]; tree /home/user/wt/r21 (index-m12.html = conf() `if(!a||a.off)` → `if(1)`); e1 = the job-3 command (palace road ≈ every 2nd run).

- HARNESS FIXER #24 (27/11, session_01UV1SzgbYkDxA85ep4z7ACL → F ROOT 7): READY F4 01b30018 on review/robot-realtap-live (LIVE bd47c753 merged, 0 conflicts). F4: noLift only when S hash + frame text / card set unchanged 2 s after the tap, else oneTap — M13 kitHandLift=return noLift 13/17, plain E-S1 ×13 noLift 0; law 11 chip path («Thân phận kiếp này» re-laid dialog, ring «Xem» room re-laid) — M7 chipNoFx 5, M8 2 still caught. vii fresh start wipes profile storage (cache kept): 2nd fresh life new identity, 0 VOID; resume keeps the save. viii CTMZ saves read through the game's own slotDec (lib/rt-save.js): 6/6 CP clocks readable, 0 SAVE STALE; M15 frozen save caught (b1 vs b25). lint 0, rt-bare-unit 20/20, 0 JS clicks. Details: PROGRESS «HARNESS FIXER #24».

## REVIEW robot-realtap-live 3ed71335..01b30018 — BIG #22 (session_01UV1Szk8KWCz6eZW7CjRVbp, for F ROOT 7 session_01UV1Szm5i1gFZxqu9LBGQKH), 27/11 ~22:50Z
PRIORITY #1 CHECK: «— BIG #21 RE-CHECK 2» FAIL 3ed71335 (F4) | FIXER #24 PROGRESS «HARNESS FIXER #24» (883157d0 … 01b30018) | LIVE origin/main 8330e8b8 (lc32-livebugs) | review/* robot-realtap-live 01b30018 | claims BIG REVIEWER #22 (F ROOT 7 21:25Z). START_CTX ~4 %.
KIT CHECK: n/a (harness only, no UI part touched).
### VERDICT: FAIL review/robot-realtap-live 01b30018 — every FIXER #24 claim reproduced (F4, law-11 chip path, vii, viii); 1 blocking: F5 the crawler START selx is VACUOUS since the LIVE bd47c753 merge (3d346e5e brought 15bd0e29 into button-crawl.js) — plain LIVE selx GATE FAIL «ring floor», and the default --fast (home,selx,talk) GATE PASSES with selx SKIP on both devices (quickcheck no longer walks the selection days). One-line fix, proven below.
Tree /home/user/wt/r22 = review/robot-realtap-live-r22 (local, not pushed) = 01b30018 + merge of LIVE 8330e8b8 (8e11fd01). LIVE 8330e8b8 served by rt-serve-build.sh :8930 (137 paths 200); controls bd47c753 :8931, 772bee4f :8932. Mutants index-m1/4/5/7/8/9/12/13/15/16.html in /home/user/wt/build-8330e8b8…/ (scratch). Logs /home/user/wt/r22-out/{c,r}/<run>(.log). Robot runs pin=0 (mutants). No shot in git, no CDN upload.
### (4) MERGE WITH LIVE 8330e8b8 + STATIC — OK
- `git merge origin/main` into 01b30018: clean, 0 conflicts (LIVE touched jgift/jptime/jts, index.html, sw.js, KIT_REQUESTS, d19-gift, NEW gift-dead-scan.js). robot-rt.js, button-crawl.js, realtap.js, lib/rt-save.js, lib/rt-profile.js in the merge = 01b30018 byte-identical; dev/build/j6.js (slotDec) unchanged since bd47c753.
- 3d346e5e..01b30018 = 6 files (robot-rt.js, robot-rt-coop.js, rt-membase.js, lib/rt-profile.js NEW, lib/rt-save.js NEW, PROGRESS): 0 game files. node --check 7 files OK · robot-lint «LINT OK 0» (default set) + «LINT OK 0 in button-crawl.js» · rt-bare-unit 20/20 · added `.click(` / dispatchEvent / `.focus(` / keyboard.: 0. New page work = reads (SH, FP, FT, PT, window.slotDec).
- The robot runs on the merge: 13 lives on LIVE 8330e8b8 (table 3), CTMZ saves read (table 5), jsClicks 0 everywhere.
### (1) F4 — FIXED, real no-lift faults still caught
| run | build | result |
|---|---|---|
| e2 / e3 E-S1 (thd / thd_tho rand 3683447523 slice 30) | plain LIVE | 30 buổi each, 499 / 606 taps; hand 62 / 62, chosen 56 / 60, **noLift 0**, liftOnly 0, oneTap 6 / 2 (all «Ra Dư đồ … frame changed»: the map opens); offSkip 3 / 18; DEAD · stuck · NO-EXIT · jsClicks 0 |
| e1 | plain LIVE | «Ban hoa» age 20 at buổi 1 (game-imposed), hand 10 / chosen 10, reLaid 1, 0 bugs |
| M13 kitHandLift = return (m13a) | mutant | **noLift 12 / 12** «tapped for real, nothing lifted (2 s), S and the frame unchanged» + NO-EXIT on .dlg «Tiền sảnh» — caught |
| **M16 (mine) kitHandLift adds a class only («kdim»), no lift** | mutant | noLift 9 + oneTap 5 — caught (the life is stuck on «Tiền sảnh», NO-EXIT too), but every FIRST tap of a card reads oneTap «frame changed» (FP keys card classes) — see N9 |
| crawler M13 / M16 (selx, F5-patched copy) | mutant | GATE FAIL 13 / 13 |
- Natural «Chọn người theo hầu» (open item): NOT met. j95s j95sEntAsk is off for a home life (isKc) — e2 / e3 took the home road; 2 extra palace tries (origin=pf road=pt_su, pick «Ra Dư đồ», seeds 43 / 44, 10 buổi) drew a hòa thân princess, pick n=0. The toggle case stays proven by the rule (.ksel + aria-pressed + «Lên đường … n người theo» text → FP changes → oneTap) and the FIXER's «Ra Dư đồ» rows, as FIXER #24 wrote.
### (2) EARLIER GATES (crawler --fast Fold, LIVE 8330e8b8)
| build | start | crawler as on the branch | crawler + F5 one-line guard (scratch copy, not committed) |
|---|---|---|---|
| plain LIVE | talk | GATE PASS (0 soft) | — |
| plain LIVE | selx | **GATE FAIL 1 «(ring floor) ring UI not driven»** — selx SKIP «no selection-day screen came» (same on bd47c753 and 772bee4f builds → harness, not game) | GATE PASS, 25 taps, 2 two-tap rows |
| M1 ✓ = return | selx | GATE FAIL 1 (floor only, vacuous) | GATE FAIL 7 |
| M7 ✓ hides #modal | selx | GATE FAIL 1 (floor only, vacuous) | GATE FAIL 1 «(loop) the same screen after 6 taps» |
| M8 go() never runs | selx | not run (vacuous) | GATE FAIL 2 «✓ does nothing» + «(no target)» |
| M4 «Chọn» no-op · M5 lift lands on another plaque · M9 «Chọn» only drops · M12 every «Chọn» hidden | talk | GATE FAIL 6 · 2 · 6 · 19 | — |
| two-device --fast (home,selx,talk) Fold + iPad 1180x820 | — | **GATE PASS with selx SKIP on BOTH devices** (fold/selx 1 row, ipad/selx 1 row) | GATE PASS, selx 27 rows + 3 two-tap per device |
- robot-rt iPad 1180x820 sens s61: «Ban hoa» at buổi 1 (game-imposed), hand 6 / chosen 4 / oneTap 2, 0 bugs, jsClicks 0.
### (3) vii FRESH START — REPRODUCED
| run | result |
|---|---|
| va1 fresh (seed 5, slice 2) | «Lương Tuyết Nhạn», profile did not exist |
| va2 fresh, SAME life name (seed 6) | «FRESH START: profile-va storage wiped (storage, 16 removed, 2 cache kept)» → new identity «Vương Dao Quang», 0 VOID / identity bugs |
| vt1 slice 3 → resume=1 slice 6 (E-S1 recipe) | no wipe line; «save restored 12724 of 12724 chars»; «hclh-save-v2-1 content identical (clock ckpt 1.0.0.0 · page 1.0.0.0)» (clock read through slotDec); same identity «Nhan Vân Yên», buổi 3 → 6, 0 bugs |
- Note: a fresh (non-resume) start under the name of a life that ENDED stops «LIFE ALREADY ENDED (checkpoint stamped ENDED)» (va3, vs2) — FIXER #14 behaviour, not a vii fault (force=1 / a new name).
### (5) viii CTMZ SAVE READ — REPRODUCED, law 4 OK
- lib/rt-save.js takes the text of `function slotDec` + `SLOTZ` out of dev/build/j6.js and runs it (new Function); slotDec is self-contained in j6 (needs only SLOTZ). No decoder is re-implemented; the page side calls the game's own window.slotDec. Law 4 (one core) holds.
- Round trip (scratch): the game's slotEnc → rt-save.state = same object (Vietnamese + astral char); plain JSON passes; broken «CTMZ…» / bad JSON → null.
| run | result |
|---|---|
| v1 plain LIVE cp=2 slice 8 | stored clocks 1.0.0.1 / 1.0.0.3 / 1.0.1.1 / 1.0.1.3 at all 4 CPs (CTMZ), 0 SAVE STALE |
| CLI on v1 ckpt | «hclh-save-v2-1 CTMZ 25220 chars → clock 1.0.1.1 · name "Lưu Lăng Ba" · rank 0 · suc 100 · age 18 · dead false» |
| M15 slotPut writes once, cp=2 slice 8 | stored 1.0.0.0 at every CP (13009 chars frozen); no bug — below the lag > 20 threshold (by design) |
| M15 cp=4 slice 26 (m15b) | «BUG SAVE STALE stored b1 live b24 chars 12390 (stored clock 1.0.0.0, live 1.1.2.3)» — caught |
### (6) FINDINGS
| # | sev | where | finding | fix |
|---|---|---|---|---|
| F5 | BLOCKING (inherited: LIVE bd47c753 merge 3d346e5e brought 15bd0e29 «rv23: … ends a tú nữ life's selection days for the harness») | button-crawl.js startState.home (line ~362) used by startState.selx (`await h0()`) | the home setup now ends the selection days (`if(S.selx2&&S.selx2.days){S.selx2.days=0;S.selx2.done=1}`) — and START selx calls that SAME setup, so walkSelx never sees `S.selx2.days` → 12 draws → SKIP «no selection-day screen came». Alone: «ring floor» GATE FAIL; inside the default --fast the talk rows fill the floor → GATE PASS with the selection days never walked (both devices). Every selection-day ✓ / lift fault (M1 / M7 / M8 / M13 shapes) is now invisible to quickcheck. | (a) guard it to the home start only: `if(window.__bcNoSelx&&S.selx2&&S.selx2.days)…` (proven: plain selx PASS 25 taps; M1 7 / M7 1 / M8 2 / M13 13 / M16 13 FAIL; two-device selx 27 rows / device); (b) law 11 family: a selx SKIP on a build where `selxDaysOn` exists = a sure FAIL row («selx start drew no selection day in 12 lives»), so a vacuous start can never be silent again. Proof to bring: the table in (2) right column + save-fix-stack's G4 «Ô lưu · Lui» check still PASS with the guard (the reason 15bd0e29 added the line). |
| N8 | nit | lib/rt-save.js load() | if j6.js ever moves / renames slotDec, ERR is kept but never printed: state() returns null, the clocks read «?», RESUME compare and the ended-ckpt check go quiet. | print once «rt-save: slotDec not loaded (…)» + R.harness.saveDecErr. |
| N9 | note | robot-rt FP (F4) | FP keys every card's className, so a tap that only adds a class (M16) reads oneTap on its first tap; the bug shows only on re-taps / NO-EXIT. | key FP on text + aria-pressed + disabled + data-* (the toggle card still moves: .ksel sets aria-pressed, «Lên đường … n người theo» text). Not blocking (M16 is still caught in the life). |
| G3 | GAME (for MAIN / owner of jkring-item) | LIVE 8330e8b8, jkring-item kriFocus | «TypeError: Cannot read properties of undefined (reading 'tile') at kriFocus» in 2 of 13 lives (e2 t=294 s, vr1) — the item ring focuses an index no longer in its list. Also 404 /img/kit/mg-undefined-bg.webp (a mini-game key undefined) in e2. | game owner: guard `it` in kriFocus; find the list that shrinks under the ring (live-bugs-2711 filters gift lists — check the item ring hosts). |
Gain vs loss of FAIL now: F5 — likelihood: certain (every --fast since bd47c753, already on LIVE); weight: big (the owner's «nút nào cũng work» gate stopped walking the selection days, silently); found only by reading SKIP rows; fix = one guard + one floor row. Loss of one more short round: small (FIXER #24's own work is all proven and needs no change). → Mất của việc cho qua lớn hơn: FAIL.

## HANDOVER — BIG REVIEWER #22, 27/11 ~22:50Z, START_CTX ~4 %, now ~20 %
- Verdict: FAIL robot-realtap-live 01b30018 — F5 only (crawler START selx vacuous since the LIVE bd47c753 merge; one-line `window.__bcNoSelx` guard + a selx floor row). FIXER #24 claims all reproduced: F4 noLift 0 in plain E-S1 ×2 (30 buổi), M13 noLift 12/12, M16 caught; vii fresh wipe + resume keep; viii CTMZ via the game's own slotDec (law 4 OK), M15 SAVE STALE caught. Merge with LIVE 8330e8b8 clean (local review/robot-realtap-live-r22 8e11fd01, not pushed). Notes N8, N9; game G3 (kriFocus 'tile').
- Recipe: /home/user/wt/r22-out/crawl.sh <name> <html> <start> (branch crawler) · crawlp.sh (F5-patched scratch copy dev/test/button-crawl-r22p.js, untracked) · rt.sh <name> <html> [k=v] (robot-rt, pin=0, :8930); mutants in /home/user/wt/build-8330e8b82cf06101ce7f02d41f9159e51bae5e77/index-m*.html (m16 = kitHandLift adds «kdim» + return; m15 = slotPut writes only when the key is empty).

## HARNESS FIXER #25 — F5 selx skip (+N8; N9 tried, withdrawn) — session_01UV1SziwPA21EcQTJXp3f1J (depth 2, child of F ROOT 7 child 1 session_01UV1Szk61M2hTnNkbv9xqAz), 28/11 ~00:30Z
PRIORITY #1 CHECK: BIG #22 FAIL 01b30018 (F5 BLOCKING, N8, N9) | main 5fb13d60 (contains LIVE 8330e8b8; harness only on review/*) | review/robot-realtap-live 01b30018 → now e15c9faf | claims CLAIMS «HARNESS FIXER #25 F5 selx skip (+N8)» = me. START_CTX ~5 %.
KIT CHECK: n/a (harness only, dev/test; 0 game files).
Branch review/robot-realtap-live: 357b5d09 (merge LIVE 8330e8b8, clean) · a9c9b106 (F5 + N8 + N9) · **e15c9faf (N9 withdrawn) = READY head**. Files: dev/test/button-crawl.js, dev/test/lib/rt-save.js, dev/test/robot-rt.js (+1 line). node --check OK · robot-lint «LINT OK 0» (default set + button-crawl.js) · rt-bare-unit 20/20 · no `.click(` / dispatchEvent added.
### FIXES
- **F5 (a)** button-crawl.js startState.home: `if(window.__bcNoSelx&&S.selx2&&S.selx2.days){S.selx2.days=0;S.selx2.done=1}` — only START home (which sets __bcNoSelx=1 around h0) ends the selection days; START selx (h0 with __bcNoSelx=0) sees them again.
- **F5 (b) law 11** walkSelx: a selx start whose 12 draws never brought a selection day, on a build where `selxDaysOn` exists, pushes sure FAIL «(selx floor) selx start drew no selection day in 12 lives …» (added to the gate's sure list) instead of a silent SKIP. A build without selxDaysOn keeps the old SKIP.
- **N8** lib/rt-save.js: a slotDec / SLOTZ load error prints once «rt-save: slotDec not loaded (<msg>) — CTMZ saves unreadable»; new export `err()`; robot-rt writes it to R.harness.saveDecErr. Proof (scratch j6 with slotDec renamed): line printed, state → null, err() = «slotDec / SLOTZ not found in dev/build/j6.js»; real j6: err() null, no line.
- **N9 withdrawn**: keying FP on data-* / aria-pressed / disabled / text (not className) made M16 read noLift on its FIRST tap (5 noLift, 0 oneTap, NO-EXIT on «Tiền sảnh» as before), but a plain LIVE life (v1, seed 7, slice 8) then logged 3 «nothing lifted» rows on Đông sở «Ngày thứ ba» talk hands that two more lives (seeds 7, 8) did not reproduce; with className keying those taps may have been a real class-only reaction (e.g. a press class). Unproven → reverted to the BIG #22-proven FP (M16 stays caught via re-taps / NO-EXIT). Stays a note for a later round.
### BEFORE / AFTER (LIVE 8330e8b8 served by rt-serve-build.sh :8930, 137 paths 200; crawler --fast; mutants = index-m*.html with one override script, scratch in /home/user/wt/build-8330e8b8/)
| run | start / dev | BEFORE (01b30018 crawler) | AFTER (e15c9faf) |
|---|---|---|---|
| plain LIVE | selx · Fold 755x1000 | GATE FAIL 1 «(ring floor)» only — selx SKIP (reproduced here) | **GATE PASS, 27 taps, 3 two-tap rows** |
| plain LIVE | selx · iPad 1180x820 | same (BIG #22) | **GATE PASS, 26 taps, 3 two-tap rows** |
| AFTER crawler with the F5 guard removed (scratch copy = the old setup) | selx · Fold | — | GATE FAIL 2: **«(selx floor)»** + «(ring floor)» → a vacuous selx start can no longer be silent |
| M1 kitHandChoose = return | selx · Fold | GATE FAIL 1 (floor only, vacuous) | **GATE FAIL 7** (6× «✓ does nothing» + «(loop)») |
| M7 ✓ hides #modal | selx · Fold | GATE FAIL 1 (vacuous) | **GATE FAIL 1 «(loop) the same screen after 6 taps»** |
| M8 ✓ sets busy, go() never runs | selx · Fold | not walked | **GATE FAIL 17** («✓ does nothing» + «did not take the lift (another one is lifted)») |
| M13 kitHandLift = return | selx · Fold | not walked | **GATE FAIL 13** («1st tap: the tapped card did not lift») |
| M16 kitHandLift adds «kdim» only | selx · Fold | not walked | **GATE FAIL 13** |
| default --fast home,selx,talk · Fold + iPad | — | GATE PASS with selx SKIP on both (fold/selx 1 row, ipad/selx 1 row; BIG #22) | **GATE PASS: selx Fold 25 rows / 3 two-tap, iPad 28 / 3; talk 10 / 3 and 11 / 3; home 80 tapped each; 0 FAIL** |
| save-fix-stack G4 «Ô lưu · Lui» (same --fast run, START home) | Fold + iPad | PASS | **PASS both («closed its layer»)**; «Ô lưu» rows 16, «Chơi một mình · Tiếp tục» resumes the saved life |
### F4 / vii / viii STILL HOLD (robot-rt on plain LIVE 8330e8b8, pin=0, real taps, jsClicks 0)
| check | run | result |
|---|---|---|
| F4 E-S1 (thd / thd_tho rand 3683447523 slice 30) | es1f25 (N9 variant FP; final FP = BIG #22's) | 30 buổi, 467 taps, hand 47 / chosen 44, **noLift 0**, oneTap 3, bugs 0, dead 0, stuck 0 |
| same recipe, final e15c9faf | es1fin | «Ban hoa» age 20 at buổi 1 (game-imposed), hand 18 / chosen 15, reLaid 1, oneTap 3, bugs 0, saveDecErr none |
| vii fresh start, same life name over a live (not ended) profile | v1f25 → seed 9 | «FRESH START: profile-v1f25 storage wiped (storage, 16 removed, 2 cache kept)», new life 0 bugs; a name whose ckpt is ENDED stops «LIFE ALREADY ENDED» (FIXER #14, not a fault) |
| viii CTMZ read | v1f25 cp=2 slice 8 | stored clocks 1.1.0.0 / 1.1.0.2 / 1.1.1.0 / 1.1.1.2 at all 4 CPs, err 0; CLI «hclh-save-v2-1 CTMZ 31278 chars → clock 1.1.1.0 · name "Đoan Mộc Ngân Chúc" · rank 2 · age 20 · dead false» (game's own slotDec, law 4) |
- Open for MAIN via foreman (not touched): G3 kriFocus 'tile' TypeError / 404 mg-undefined-bg.webp (BIG #22). Seen here too, harness-side only: 404 /img/kit/emo-anim/binh.webp and /img/kit/ico-download.webp in the M13 run (local server; check on github.io before filing).
- Gain vs loss of READY: F5 fixed and proven on both devices + every mutant shape caught (likelihood of a silent vacuous selx again: rare, the floor row now FAILs it; weight big if it happened; detect = «(selx floor)» row). N9 withdrawn (loss: M16's first tap still reads oneTap — rare, small, caught on re-tap). → Được lớn hơn.
## HANDOVER — HARNESS FIXER #25, 28/11 ~00:30Z, START_CTX ~5 %, now ~15 %: done; READY e15c9faf. Recipe: /home/user/wt/f25-out/run.sh <name> <script> <html> <start> <dev> (crawler) · robot runs in /home/user/wt/f25-out/rt{,2}/ · mutants /home/user/wt/build-8330e8b8/index-m{1,7,8,13,16}.html.

## REVIEW robot-realtap-live 01b30018..e15c9faf — BIG #22 RE-CHECK 3 (for F ROOT 7 child 1 session_01UV1Szk61M2hTnNkbv9xqAz), 28/11 ~01:30Z
PRIORITY #1 CHECK: «— BIG #22» FAIL 01b30018 (F5, N8, N9) | FIXER #25 READY F5 e15c9faf (report 1c5b9e55) | LIVE origin/main 5fb13d60 at the order → 18003079 (lc33-eg3) during the check | claims BIG #22.
KIT CHECK: n/a (harness only).
### VERDICT: PASS review/robot-realtap-live-r22c 795f87ec = e15c9faf + merge of LIVE 5fb13d60 (a61dae41) + merge of LIVE 18003079 (795f87ec); origin/main 18003079 is its ancestor → fast-forward. Test / harness files only (no game file differs from main).
Tree /home/user/wt/r22 (branch review/robot-realtap-live-r22c, pushed). LIVE 5fb13d60 served by rt-serve-build.sh :8940, 18003079 :8941 (137 paths 200 each). Mutants rebuilt on 5fb13d60 (index-m1/4/7/8/12/13/16.html). Logs /home/user/wt/r22-out/{c3,r3,c4,r4}/.
### MERGE + STATIC — OK
- 357b5d09..e15c9faf (fixer) = button-crawl.js, lib/rt-save.js, robot-rt.js (+ PROGRESS / report). Merge with 5fb13d60: clean, 0 conflicts. button-crawl.js auto-merged with LIVE 251b1ad7 (rv27 CTM_NOTES_UI line next to the F5 guard, both kept). Merge with 18003079: clean; harness files and dev/build/j6.js unchanged by it. Outside dev/test + PROGRESS + quickcheck.d notes, the merge = main.
- node --check OK · robot-lint LINT OK 0 (default set + button-crawl.js) · rt-bare-unit 20/20 · added `.click(` / dispatchEvent / `.focus(` / keyboard.: 0.
### F5 — FIXED (crawler --fast, LIVE 5fb13d60 unless marked)
| build | start | result |
|---|---|---|
| plain LIVE | selx | GATE PASS, 26 taps, 5 two-tap rows (1 known «Ra Dư đồ» row, button-crawl-known.txt) |
| plain LIVE 18003079 | selx / talk | GATE PASS (25 rows, 3 two-tap) / GATE PASS |
| **floor proof: scratch copy with the guard removed (the 01b30018 behaviour)** | selx | GATE FAIL 2: «(selx floor) selx start drew no selection day in 12 lives — this build has selxDaysOn …» + ring floor — a vacuous start can no longer be silent |
| M1 ✓ = return · M7 ✓ hides #modal · M8 go() never runs · M13 kitHandLift = return · M16 lift adds a class only | selx | GATE FAIL 7 · 2 · 2 · 13 · 13 |
| plain LIVE · M4 «Chọn» no-op · M12 every «Chọn» hidden | talk | GATE PASS · GATE FAIL 6 · GATE FAIL 19 |
| two-device --fast (home,selx,talk) Fold 755x1000 + iPad 1180x820 | — | GATE PASS; selx walked on both (fold 25 rows / 3 two-tap, ipad 26 / 3), talk 11 / 10, home 82 / 84; «Ô lưu» (the G4 row 15bd0e29 was added for) PASS on both devices |
### ROBOT + EARLIER CLAIMS ON THE NEW LIVE
| run | result |
|---|---|
| f1 / f2 E-S1 (thd / thd_tho rand 3683447523 slice 30), 5fb13d60 | 30 buổi each, 0 bugs, noLift 0, liftOnly 0, jsClicks 0; f1 cp=5: stored clocks 1.0.1.0 … 1.2.1.1 at 6 CPs (CTMZ via slotDec), no saveDecErr |
| g1 E-S1 slice 12 cp=4, 18003079 | 12 buổi, hand 33 / chosen 30 / oneTap 3 («Ra Dư đồ … frame changed»), 0 bugs; stored clocks 1.1.0.2 / 1.1.1.2 / 1.1.2.2 |
| M13 robot (m13r), 5fb13d60 | noLift 12 / 12 + NO-EXIT «Tiền sảnh» — still caught |
| CLI on f1 ckpt | «hclh-save-v2-1 CTMZ 39309 chars → clock 1.2.0.1 · name "Trình Tịch Nhan" …» |
| N8: rt-save copy pointed at a missing j6 | prints «rt-save: slotDec not loaded (ENOENT …) — CTMZ saves unreadable»; err() returns the reason (robot-rt writes it to R.harness.saveDecErr) — FIXED |
- N9 withdrawn by the fixer (FP keeps className): accepted — it is my note, not blocking, and M16 stays caught (crawler 13, robot noLift on re-taps per round 1). vii (fresh wipe / resume keep) is untouched by e15c9faf (rt-profile.js and the robot-rt start line unchanged) — round-1 proof stands.
- Open (unchanged): natural «Chọn người theo hầu» not met; G3 kriFocus «tile» TypeError is with MAIN (FOR MAIN 181).
Gain vs loss of PASS: the gate walks the selection days again on both devices and a vacuous start now FAILs loud (law 11); every earlier mutant still FAILs; no game file. Remaining risk: N9 (class-only dead card read as oneTap on its first tap) — rare, small, still caught by re-taps / NO-EXIT. → Được lớn hơn: PASS.

## HANDOVER — BIG REVIEWER #22 (re-check 3), 28/11 ~01:30Z, START_CTX ~4 %, now ~27 %
- Verdict: PASS review/robot-realtap-live-r22c 795f87ec (fast-forwards LIVE 18003079). F5 fixed + selx floor proven by a guard-removed copy; N8 fixed; N9 withdrawn (accepted).
- Recipe: /home/user/wt/r22-out/cr3.sh|cr4.sh <name> <html> <start> [crawler] (ports 8940 / 8941), rt3.sh|rt4.sh <name> <html> [k=v] (robot-rt pin=0); mutants /home/user/wt/build-5fb13d60…/index-m*.html.
