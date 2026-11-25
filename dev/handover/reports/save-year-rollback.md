# save-year-rollback — B FIXER (opus, BIG) session_01N1tNP37vyD6UhgHmsLgow9 → FOREMAN B (child 2 session_01N1tNP5hbqgDXLmADwGysfc)
PRIORITY #1 CHECK ('year rollover save' / 'save held' / 'SP13.held' / 'jqsave hold' / 'saveNow'): OD 0 | ledger 0 | claims 0 (own row via FOREMAN B 10:58Z) | main 0 | review/* 0 (related: review/save-growth e573b9b8, same j6 save path — checked below; review/robot-coop-savert 71c538df owns save-rt-coop) | archive 0.
START_CTX ≈ 4 % (used_tokens read 0; own estimate). Order: FOREMAN_B_STATUS «FROM MAIN 138 (25/11 ~09:58Z)» + «~10:00Z» (read in full). Evidence: dev/handover/robot/m2/saveloss/ (4ab60b24).
Branch **review/save-year-rollback 876415e3126f41c9ff6e08016c747aedcdc9e3fd** on LIVE origin/main 9f72524b (LIVE unchanged at push). Evidence #2 (MAIN 140 via FOREMAN B child 2, 12:28Z): robot M4 seed 104 — reload 0 s after the year flip lost the buổi + the year-end stipend → covered below (jqsave row + 0 s cases).

## Cause (reproduced, on the robot's own sổ)
jspread (D13 spread events) moves world cards that arrive at a buổi change to a later fitting buổi. A moved card whose options run CODE cannot be written into the sổ, so jspread **held every autosave while such a card waited unseen** (`if(SP13.L.some(x=>x.code)){SP13.held=1;return}`), up to BAL.spread.codeWait buổi per card — and the cards chain: Tết / stipend month / the new year bring several («Bổng lộc tháng chạp», «Yến tiệc đầu xuân», «Tết Nguyên đán · Chuyện bên lề», «Điềm báo», then «Bị châm chọc» …). The save written INSIDE a step goes through before the step plans its cards, but the next step's save (and every act in between) is held while the earlier cards still wait. The screen meanwhile shows the new buổi / tháng / năm with **no card open**, so the robot reloaded → the sổ was the old one.
Robot sổ (M2 save_after_rollback Sổ 1 = Year 3, tháng chạp, hạ tuần, buổi tối), 5 taps of «Sang buổi» on the OLD build: screen Year 4 / age 23 at every tap, sổ stays Year 3 / age 22 (`4.1.0.0 … 4.1.1.0 ≠ sổ 3.12.2.3`), reload → Year 3 / age 22 = exactly the robot report. A free-play probe on the old build (no acts) showed the hold chained 4 buổi at the year turn.

## Fix (whole family, LAW 11)
| file | change |
|---|---|
| dev/build/jspread.js | the save wrapper no longer holds while a moved CODE card waits unseen: the step / her acts are always written; such a card cannot be written down, so a reload inside its wait (≤ codeWait buổi) does not bring that one unseen card back (counted in `SP13.stat.unsaved`). Data cards still ride in `S.sp13.q` (unchanged). A code card ON SCREEN still holds (jqsave) — bounded: time cannot move while Q has a card. Header comment updated (canon overwrite). |
| dev/build/jqsave.js | (M4) an OPEN code card (stipend «Bổng lộc tháng» / year-end cards right after the step) held the save until answered → a reload 0 s after the flip went back to the buổi before the step. Now the hold applies only inside the buổi of the last write (`JQ.k` = năm.tháng.tuần.buổi.name, `JQ.s` = the life): the step is written AT ONCE, its open code cards left out (counted `JQ.stat.stepNow`); inside one buổi the hold is as before (reload lands before her open code card). |
| dev/build/j52.js | the new-life gate holds only while the «Thân phận kiếp này» card is really in Q (`NLP && Q.some(m=>m.nl)`); before, a card dropped from Q another way left NLP set → no save for the whole life. |
| dev/build/j6.js | «Tiếp tục kiếp này»: `quiet=true; try{deser(d)}finally{quiet=false}` — a throw in any load step can no longer leave `quiet` on (= no save for the rest of the session). |
| dev/build/j42.js | cung nữ start: `quiet=true; try{srvInit()}finally{quiet=false}` (same family). |
No BAL change (law 4), no player-visible word (law 7), no UI, no new save field.

Trade (gain vs risk): GAIN — a reload at any step returns what the screen shows (robot: ~5 weeks lost → 0). RISK — a reload while a code card waits UNSEEN (jspread) or is open right after a step (jqsave) loses that card (she never saw it; the step that made it re-rolls nothing — it is simply not shown): possible (only in the ≤ 2-buổi wait, only on a reload), small, visible as `SP13.stat.unsaved` > 0. Before jqsave existed every such card was dropped by a reload the same way. → gain larger.

## Scan — dev/measure/time-advance-save-scan.js (every time-advance path + every save gate)
`node dev/measure/time-advance-save-scan.js [buildDir]` (exit 1 = a FAIL gate or a save wrapper the scan does not know — a new wrapper must be added to it).
Paths listed (both builds, all found): buổi j9 nextBuoi · day/tuần j3 endTurn · tháng/năm j3 monthTick · cung nữ j42 srvEndTurn · khuê các jkc kcEndTurn + jkc2 · night jnf hold/herNight · new life j52 nlBegin · death j32 over · co-op week jcoopworld snapSave; no other calendar writer. Each persists by render() → save().
| gate | before (LIVE 9f72524b) | after |
|---|---|---|
| j6 base quiet (load «Tiếp tục») | FAIL — no finally | OK |
| j42 cung nữ start quiet | FAIL — no finally | OK |
| j52 new-life card | FAIL — held on NLP alone | OK |
| jcloud stale / title up | OK (by design: cloud copy replaced the playing sổ / not playing) | OK |
| jcoopworld co-op room | OK (room server is the save) | OK |
| jslots co-op life | OK (owner save-slots rule) | OK |
| jqsave open code card | **FAIL — held across the step that opened the card (M4)** | OK |
| jspread waiting code card | **FAIL — held while unseen (the robot bug)** | OK |
| total | SCAN FAIL 5 | **SCAN PASS (10 paths, 8 gates)** |

## Regression test — dev/test/save-boundary-reload.js
Each case: a seeded life (Math.random + crypto seeded: same life on both builds) in Sổ 1, calendar one buổi before the boundary, real taps on #next (again after the night scene, as a player), every card / scene / mini-game answered or closed until the screen is free; after EACH tap the sổ must equal the screen (date, age, name, khắc, bạc), plus a «+1 bạc while unseen code cards wait» probe (= any act ending in render()); at the end a TRUE page.reload() → title → «Tiếp tục kiếp này». Cases buoi · day · month · year ×2 seeds · year-srv (cung nữ) · robot-y3 (the M2 sổ, 5 taps over the new year; read from the handover branch or SBR_SAVE) · newlife (death → Luân hồi) · oldsave (a sổ written by the OLD build).
`node dev/test/save-boundary-reload.js index.html <old.html> fold|ipadAir 1,2`
| case | LIVE Fold | fix Fold | LIVE iPad 1180x820 | fix iPad |
|---|---|---|---|---|
| buoi | PASS | PASS | PASS | PASS |
| day | **FAIL** reload 1.3.0.3 (screen 1.3.1.1) | PASS | **FAIL** | PASS |
| month | **FAIL** reload 1.3.2.3 (screen 1.4.0.1, stipend lost) | PASS | **FAIL** | PASS |
| year s1 | **FAIL** reload Y1 tháng 12 age 20 (screen Y2/21) | PASS | **FAIL** | PASS |
| year s2 | **FAIL** | PASS | **FAIL** | PASS |
| year-srv | PASS (srvEndTurn moves no code card) | PASS | PASS | PASS |
| robot-y3 (M2 sổ) | **FAIL** reload Y3/22 (screen Y4/23, 10 moments) | PASS | **FAIL** | PASS |
| newlife | PASS | PASS | PASS | PASS |
| oldsave (LIVE-built sổ) | — | PASS | — | PASS |
| total | FAIL 5/8 | **PASS 9/9** | FAIL 5/8 | **PASS 9/9** |
(«Fold» = device profile fold 755x1000 direct mode; logic test, layout untouched.)

## Other checks
- save size: robot Y3 sổ written by save() = 1,212,989 chars on BOTH builds (no new field; save-growth budget untouched).
- save-rt-coop (from review/robot-coop-savert 71c538df, not on main): LIVE and fix give the SAME rows (5 FAIL, all pre-existing rows that branch fixes: pool-name sweep ×2, Sức ceiling ×2, law 6a ledger) → no regression from this branch.
- coop-e2e SWAP0: 142/142 PASS. SWAP1: see «Tests (final)» below. quickcheck alone: see below.
- review/save-growth e573b9b8: `git merge-tree` HEAD × save-growth → source files merge CLEAN (j6.js auto-merges: they change save()/loadSlot lines, this branch the «Tiếp tục» load line); only the generated index.html / sw.js conflict → whichever lands second rebuilds (bash dev/site/build_site.sh). No semantic overlap: save-growth packs what save() writes, this branch decides when save() is allowed to write.

## Tests (final)
0 s cases (`SBR_ONLY=day-0s,month-0s,year-0s`, reload the instant the date flips, Fold):
| case | LIVE | fix before the jqsave row (f8122962) | fix 876415e3 |
|---|---|---|---|
| day-0s | PASS | PASS | PASS |
| month-0s | **FAIL** reload 1.3.2.3 (screen 1.4.0.0, stipend lost) | PASS by luck (sổ at the flip was still 1.3.2.3, written ms later) | PASS (sổ = screen at the flip) |
| year-0s | PASS by luck (sổ at the flip 1.12.2.3) | **FAIL** reload Y1 tháng 12 (= M4) | PASS (sổ = screen at the flip) |
Full runs on 876415e3 (all 12 cases incl. 0 s, Fold + iPad) were RUNNING when this fixer rolled over — see HANDOVER.
Earlier results above (9/9 Fold + iPad, coop-e2e 142/142 ×2, save-rt-coop = LIVE, size equal) were on f8122962 (= 876415e3 minus the jqsave row + test cases).

## HANDOVER (FIXER 37vyD6Uh → successor; rolled at ctx ≈ 45 %, START ≈ 4 %)
State: review/save-year-rollback 876415e3 PUSHED (built: index.html/sw.js committed, shell 2c2a7813a2fe). Nothing uncommitted.
Successor does, in this order (all on 876415e3, sparse worktree, LIVE 9f72524b or newer — re-merge LIVE if it moved, rebuild):
1. `node dev/measure/time-advance-save-scan.js` → PASS; on `git archive origin/main dev/build` → FAIL 5 (before/after table above).
2. `git show origin/main:index.html > bare.html` (root, untracked) then `node dev/test/save-boundary-reload.js index.html bare.html fold 1,2` and `… ipadAir 1,2` → expect PASS 12/12 each (≈ 25 min each; run both at once). LIVE column: `node dev/test/save-boundary-reload.js bare.html "" fold 1,2` (expect FAIL on day / month / year / robot-y3 / month-0s).
3. coop-e2e SWAP0 + SWAP1 (`node dev/test/coop-e2e.js <out>`, `COOP_SWAP=1 …`) → 142/142 each (jqsave changed after the last co-op run; co-op save goes through jcoopworld, expected unaffected).
4. `node dev/test/spread-e2e.js http://127.0.0.1:PORT index.html <old dev/index.html>` (jspread save wrapper changed; test C saves while DATA cards wait — must still PASS).
5. save-rt-coop (copy dev/test/save-rt-coop.js from review/robot-coop-savert 71c538df, run on dev/index.html of this sha AND of LIVE): rows must be identical (5 pre-existing FAIL rows).
6. `bash dev/tools/quickcheck.sh` ALONE (nothing else running) → QUICKCHECK PASS.
7. Fill «Tests (final)» here, then FOREMAN_B_STATUS line «SẴN SÀNG KIỂM review/save-year-rollback <sha>» FOR FOREMAN B (+ FOR MAIN 140).
Open questions for the reviewer (not blocking): the trade in «Fix» (a reload inside the short wait loses an unseen / just-opened code card instead of the whole step). save-growth: source merges clean, rebuild index/sw after whichever lands second.

## r2 — B FIXER SAVE-YEAR-ROLLBACK r2 (opus) session_01N1tNP3KgfZcq6zobMQRpTF → FOREMAN B (child 3 session_01N1tNP5G9e73inPtyBReKnD)
PRIORITY #1 CHECK ('save-year-rollback'): reuse review/save-year-rollback 876415e3 (predecessor 37vyD6Uh) — nothing new built; OD 0 | claims = own row | main 0 | review/* = this branch only.
depth 3 · START_CTX ≈ 3 % (used_tokens read 0; own estimate). LIVE origin/main 9f72524b = unchanged (⊂ head) → no re-merge needed.
Branch **review/save-year-rollback 6d2f5a03410ed22c44e824878c2ead2ea5066f85** = 876415e3 + test-only commit (no game code change since 876415e3; index.html/sw.js rebuilt = build stamp only).

### Test-only changes in r2 (no dev/build change)
| file | change | why |
|---|---|---|
| dev/test/save-boundary-reload.js | oldsave case checks that the NEW build loads exactly what the OLD build wrote (its sổ), and prints when the OLD build had held its own last save | iPad run: OLD (LIVE) build's save() was itself held by the bug (sổ 1.3.1.0 while its screen showed 1.3.1.1) → the case compared against the old SCREEN and FAILed although the new build loaded the old sổ exactly. Now PASS ×3 (iPad ×2 shows «OLD build held its save», Fold none). |
| dev/test/spread-e2e.js | (1) a `clr()` step closes old-buổi scenes (kit motion / Nhận / dawn host / roulette / mini-game #ov) like save-boundary-reload before each nextBuoi; (2) «time did not move» is now a FAIL; (3) `modal hidden` is not flagged while jdayq legitimately holds a card under a scene; (4) a card that stays in Q after 3 answers is dropped; (5) `SPREAD_BOT=1` sets window.__bot (jdayq / night holds built after this test; jspread / jqsave / save() never read __bot) | on LIVE AND fix the old harness never moved time (turn 0/0/0 on every viewport: jdayq «ONE NEW-DAY ORDER» held the bare nextBuoi() behind the new-life kit scene) → it «tested» nothing; test C had no waiting card. Also needs a server that sends charset=utf-8 (python http.server mis-decodes dev/index.html → «start is not defined»). |

### Tests (final, r2, all on 876415e3 code)
| check | LIVE 9f72524b | fix |
|---|---|---|
| time-advance-save-scan | FAIL 5 | PASS (10 paths, 8 gates) |
| save-boundary-reload Fold 755x1000 (12 cases incl. day-0s / month-0s / year-0s, robot-y3, newlife, oldsave) | FAIL 7/11 (day, month, year s1, year s2, month-0s, year-0s, robot-y3) | **PASS 12/12** |
| save-boundary-reload iPad 1180x820 | FAIL 7/11 (same 7) | **PASS 12/12** (11/12 first run: oldsave = test flaw above; oldsave rerun PASS ×2) |
| MUTATE A: jspread hold restored (fix build, one line) | — | FAIL 4/6 (day, month, year, robot-y3) → test catches it |
| MUTATE B: jqsave old gate (hold across the step) | — | FAIL month-0s (stipend lost at 0 s) → test catches it |
| coop-e2e SWAP0 (local Worker: wrangler dev --local) | — | 142/142 |
| coop-e2e SWAP1 (iPad hosts) | — | 142/142 |
| spread-e2e (SPREAD_BOT=1, 6 viewports + old save + C) | FAIL 8 = «modal hidden with N cards» rows only (pre-existing, bot mode) | FAIL 8 = the SAME row kind only; **C PASS on substance**: save while data cards wait → after reload the same cards wait («Việc nhờ@5») and are all shown later (1/1; LIVE 2/2); old save loads + plays, no page error anywhere |
| save-rt-coop (71c538df test) | 5 FAIL rows | the SAME 5 FAIL rows (pool-name sweep ×2, Sức ceiling ×2, law 6a ledger — all owned by review/robot-coop-savert) → no regression |
| quickcheck ALONE | — | QUICKCHECK PASS · old save ok · core gates PASS (perf new/live median: render 258/246 ms, buổi 1317/1480 ms) |
Reload-at-once (0 s) and after-delay both covered: *-0s cases reload the instant the date flips; day / month / year / robot-y3 reload after every card is closed (seconds later).
Open for the reviewer (unchanged): the trade in «Fix» (a reload inside the ≤ 2-buổi wait loses one unseen / just-opened code card instead of the whole step). save-growth e573b9b8: source merges clean; whichever lands second rebuilds index/sw.
