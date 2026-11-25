# save-unseen-lists — B FIXER (opus, BIG save) session_01N1tNP6vieKxfAL6QRNeoxY → FOREMAN B (child 3 session_01N1tNP5G9e73inPtyBReKnD)
PRIORITY #1 CHECK ('Tin báo save NT.list' / 'EVHOLD save' / 'new life first save' / 'nlAccept save' / 'reload drift Danh Sủng Bạc'): OD 0 | ledger 0 | claims 0 | main 0 (jnotice header said «State: in memory only … Old saves: nothing new stored») | review/* 0 besides the base review/save-year-rollback 6d2f5a03 (same save family, reused, not redone) | archive 0. Save-size budget: briefs/E-savegrow.md + review/save-growth e573b9b8 read — «nothing may be capped or dropped from the save (law 6c)»: this branch adds two small top-level fields, drops nothing.
depth 4 · START_CTX ≈ 4 % (used_tokens read 0; own estimate).
Branch **review/save-unseen-lists aff8d163baa86bf12266f7115d8fff3441839572 (pushed; = merge of review/save-year-rollback-rv 509fd6c9 + this work)** from review/save-year-rollback 6d2f5a03 (LIVE origin/main 9f72524b ⊂ base, unchanged at push).
Orders (FOREMAN_B_STATUS, verbatim in the brief): MAIN 140 ~13:10Z (unread «Tin báo» lost on true reload; audit every runtime list the player can still open, save + co-op snap, size budget) + ~13:35Z (robot M4: 0 s reload right after a NEW LIFE → no «Tiếp tục kiếp này»; 4 s reload → Danh/Sủng/Bạc drift; every life start + every advance writes the save at once).

## (A) LAW 11 scan — every runtime list the player can open / that still waits for her
`node dev/measure/unseen-lists-scan.js [buildDir]` (exit 1 = an UNSEEN-kind list without save coverage, or a listed list that moved/vanished).
UNSEEN = she has not seen it / can still open it → must be in the sổ. ACCEPT = cannot be written (code), ruled trade. NOLIST = not a list she opens.
| list | file:line | kind | in sổ (reload) | in co-op snap | how | size |
|---|---|---|---|---|---|---|
| Q — the dialog queue (open + waiting cards) | j3.js:64 | UNSEEN | yes | yes (snap = ser()) | ser() P (pid / generator / data cards; jqsave $full) | ≈ cards × 0.3–4 KB |
| Q code cards (options run code, no generator) | jqsave.js:15 | ACCEPT | no (accepted) | — | held within the buổi; a step / life start writes at once without them (reports/save-year-rollback.md) | — |
| NT.list — «Tin báo» notices (the top-bar «!» box) | jnotice.js:31 | UNSEEN | yes | yes (snap = ser()) | ser() nt (≤ BAL.noticeMax rows; go made again from the id) | ≈ 3 KB at 20 rows |
| NT.pend — the chip waiting for a dialog to close | jnotice.js:123 | UNSEEN | yes | yes (snap = ser()) | = an NT.list row: after a load it is in the box (unread), no second chip | 0 |
| KB — kitKnow batch («Ngươi biết thêm N điều») | jnotice.js:187 | NOLIST | n/a | — | flushed into NT.list in the same tick (setTimeout 0) | 0 |
| EVHOLD — held optional event cards (j68) | j68.js:145 | UNSEEN | yes | yes (snap = ser()) | ser() evh (≤ E68S.hold rows, serQ form) | ≈ 0.3 KB per card |
| SP13.L — world cards moved to a later buổi (jspread) | jspread.js:34 | UNSEEN | yes | yes (snap = ser()) | S.sp13.q (data cards); code cards = ACCEPT row below | ≈ cards × 0.3 KB |
| SP13.L code cards | jspread.js:53 | ACCEPT | no (accepted) | — | ≤ BAL.spread.codeWait buổi, counted SP13.stat.unsaved (reports/save-year-rollback.md) | — |
| S.rcvPend — requests waiting for her answer (jrcv) | jrcv.js:50 | UNSEEN | yes | yes (snap = ser()) | on S; re-raised as notices after a load | small |
| S.ordQ — orders / requests to her (jptime) | jptime.js:328 | UNSEEN | yes | yes (snap = ser()) | on S | small |
| S.erra — errands out / back (jerr) | jerr.js:34 | UNSEEN | yes | yes (snap = ser()) | on S | small |
| S.tb — Tai mắt news (jagknow) | jagknow.js:146 | UNSEEN | yes | yes (snap = ser()) | on S | small |
| S.mg — an open mini-game (resumeMG) | j6.js:85 | UNSEEN | yes | yes (snap = ser()) | on S; the title «Tiếp tục» resumes it | small |
| identity card «Thân phận kiếp này» (j52 NLP) | j52.js:57 | UNSEEN | yes | yes (snap = ser()) | ser() nl {seed}: the same card opens again on load | ≈ 20 chars |
| KMQ — big-moment scenes waiting (j93 kmPush) | j93.js:28 | NOLIST | n/a | — | closures that SHOW what is already applied + logged (rewards given before the scene); kmReset empties it on load | 0 |
| DQ.want — a turn held behind a scene (jdayq) | jdayq.js:27 | NOLIST | n/a | — | the turn has not run yet: nothing applied, she taps again after a load | 0 |
| AGL.L — deferred agent jobs (jagent) | jagent.js:196 | NOLIST | n/a | — | run in the same tick (setTimeout 0) | 0 |
| KSF.q — stat fly / glow animations (jstatfx) | jstatfx.js:8 | NOLIST | n/a | — | animation of a change already in S | 0 |
| NHQ — month lines logged after the palace news (jnroadhp) | jnroadhp.js:48 | NOLIST | n/a | — | written into the log in the same month tick | 0 |
| LDQ — co-op ledger lines waiting for the merged week (jledger) | jledger.js:156 | NOLIST | n/a | — | co-op transport, settled right after the merged week (by design not in S) | 0 |
| RQ — co-op relay queue (jkcco) | jkcco.js:45 | NOLIST | n/a | — | transport until the peer acks | 0 |
Co-op: the seat snap IS ser() (jcoopworld CW.snap → localStorage + seat push; CW.restore → deser), so every «in the sổ» row is also in the co-op snap. Lists on S also ride in the room blob; the two new top-level fields (nt, evh) ride only in her own slot + seat snap (they are hers, not the room's).
| before (LIVE 9f72524b) | after |
|---|---|
| UNSEEN-LISTS SCAN FAIL 4 (NT.list, NT.pend, EVHOLD, identity card) | **SCAN PASS (21 lists, 11 unseen-kind covered)** |

## Fixes (whole family)
| file | change |
|---|---|
| dev/build/jnotice.js | «Tin báo» list in the sổ: ser() writes top-level `nt` (one compact row per notice: id, line, text only when ≠ line, items, pic, kind, sticky, seen, t; ≤ BAL.noticeMax rows = the box's own cap, no new number); deser() puts it back **only into an empty list** (slot «Tiếp tục» / fresh page / co-op seat restore — an in-session ser→deser round trip such as co-op relens keeps the live list and its chip). A notice's button (`go`, code) is written as `g:1` and made again from its id (ntGo: errand «Để ta xem», Tai mắt «Để ta xem», receiver «Trả lời», parallel-time lands «Xem tin» + orders). The list belongs to one life: lifeStore (a new life / slot load / title start empties it — before, the previous life's notices stayed in the box after «Kiếp mới» or loading another sổ). Header canon-overwritten. |
| dev/build/j68.js | held optional event cards (EVHOLD, cards she has not seen) in the sổ: top-level `evh` (≤ E68S.hold rows, each card in its serQ form — pid / generator / data card / notice); a load with nothing held in memory makes them again (deserQ) against the loaded world; the in-place rebuild (evHoldRe) unchanged. A held card that runs code without a generator cannot be written — same rule as Q (row ACCEPT). |
| dev/build/j6.js | `SAVE_N` counts the writes that really reached the slot. |
| dev/build/jqsave.js | the buổi counts as written only when the slot really took the write (SAVE_N moved; co-op rooms as before). **Cause of M4 0-s**: j52 dropped every save while the identity card was open, but jqsave marked the buổi as written; after «Nhận thân phận» an opening CODE card (a visitor «Có người đến») then held every save of the first buổi → the slot stayed EMPTY (after a death it had been removed) → reload = no «Tiếp tục kiếp này». `jqSaveNow()` = one write at once (as a time step). |
| dev/build/j52.js | the new life is in the slot from its first moment: ser() adds the mark `nl {seed}` while the identity card is open; «Tiếp tục kiếp này» on such a sổ opens the SAME card again (same roll, Đổi thân phận still possible); «Nhận thân phận» writes at once (jqSaveNow) without the mark; a mark that no longer matches the stored roll (another slot rolled since) loads as an accepted life. Header canon-overwritten («Until then nothing is saved to the slot» removed). Note: on the base branch the slot was ALREADY written during the roll (save-year-rollback made the j52 gate hold only while the card is in Q, and the card is queued after start()'s first render) but without any mark — a reload at the card then continued the life with the card gone and the stored roll never renewed (the next death re-rolled the same identity). The mark closes that too. |
No BAL change (law 4; noticeMax / E68S.hold reused), no player-visible word (law 7), no UI / kit part, no number typed.

## (B) Danh / Sủng / Bạc drift on a 4-s reload (robot M4)
Reproduced on LIVE with the robot's own sổ (dev/handover/robot/m4/localStorage-saves.json, 10 taps + 2 acts each, reload 4 s after): before Danh 22 · 3.4.2.1 → after Danh 25 · **3.4.1.0** = the sổ was an OLDER moment (held save: the save-year-rollback family), and the robot's «same buổi» case is the same hold inside one buổi (jspread / jqsave held the saves after the step while she acted). On the base branch (save-year-rollback) and on this branch: the same sổ, the same taps → 0 moments where sổ ≠ screen, reload → identical numbers. No value is applied after the save or twice on load (every top-bar number + date compared, sổ vs screen after every tap and every act, and after 0 s / 4 s reloads: «drift» case below). The remaining M4 path (0-s reload right after a new life) is the jqsave mark above.

## Tests
`node dev/test/save-unseen-lists.js <page> fold|ipadAir 1` (real page.reload() → title → «Tiếp tục kiếp này»; player helpers read from save-boundary-reload.js, one copy). Cases: tinbao (20 notices via kitNotice incl. real errand / Tai mắt kinds with buttons, 15 read → reload → same ids/order, unread 5, badge «5», buttons back, panel opens) · held (an EVHOLD card → reload → still held, released later by evRelease) · nl-0s (title → card → one code card waiting behind it, as the robot's life → «Nhận thân phận» → reload 0 ms) · nl-card (reload at the card → same card again → accept works) · nl-death (death → Chuyển kiếp → accept → reload 0 ms) · nl-4s · drift (5 taps over the new year + an act each; sổ = screen every moment; reload 0 s + 4 s).
| check | LIVE 9f72524b (bare.html) | fix c1abd6a8+test (on 6d2f5a03) |
|---|---|---|
| save-unseen-lists Fold 755x1000 | FAIL: tinbao (20/5 → 0/0), held (1 → 0), nl-0s (NO «Tiếp tục»: slot empty, 1 code card behind the card), drift (16 moments sổ ≠ screen, reload 0 s/4 s go back a buổi) | **PASS 7/7** |
| save-unseen-lists iPad 1180x820 | FAIL tinbao (earlier run), nl-0s FAIL | **PASS 7/7** |
| MUTATE nt / evh / nl (fix build) | — | FAIL 1/1 / FAIL 1/1 / FAIL 2/2 → the test catches each |
| unseen-lists-scan | FAIL 4 | PASS (21 lists) |
| time-advance-save-scan | FAIL 6 (incl. new j2 start-quiet row) | PASS (10 paths, 9 gates) |
| save size, robot M2 Y3 sổ | 1,213,911 chars | 1,214,165 (+254); with 20 notices 1,217,083 (+3,172 = +0.26 %) |
| on the merged head aff8d163 (rv 509fd6c9 + j2) | — | RUNNING at handover: t4 Fold tinbao PASS so far — successor re-runs everything below |
NOT yet run on this branch: save-boundary-reload 12/12 ×2, coop-e2e SWAP0/1 (local Worker), save-rt-coop, spread-e2e, quickcheck ALONE → successor.

## Gain vs risk
GAIN — unread notices, held events and the identity card survive a reload / co-op rejoin; a new life is always in its slot (no «Trống» after a death at 0 s). RISKS: (1) a notice whose button belongs to an id family ntGo does not know comes back without its button — possible (only new notice kinds added later), small (the text is still there), visible in the scan/test (go count). (2) Co-op: `nt` / `evh` in every ser() — the room blob is unchanged (top-level fields, myBlob copies only S); co-op e2e ×2 below. (3) save size +≈3 KB at 20 notices (0.25 % of a year-3 sổ ≈ 1.2 M chars) — rare to matter, small. → **Được lớn hơn.**

## HANDOVER (save-unseen-lists 6vieKxfA → successor) — rolled at ctx ≈ 29 % (START ≈ 4 %), FOREMAN B order 14:40Z
State: review/save-unseen-lists **aff8d163** PUSHED = c1abd6a8 (Tin báo nt + EVHOLD evh + j52 nl mark + SAVE_N/jqSaveNow) + test commit (code card behind the identity card; MUTATE nl) + merge of **review/save-year-rollback-rv 509fd6c9** (only index/sw conflicted; jqsave.js auto-merged: LC15 serQ/deserQ + buổi-key gate + SAVE_N mark) + f3a2c8db (rv FIX LIST item 4 DONE: j2 start releases quiet in finally + time-advance-scan rows) + rebuilt index/sw. Nothing uncommitted. Sparse worktree /home/user/wt/sul (scratch /home/user/wt/sul-scr: probes, robot saves m4-ls.json / m2y3.json, bare.html = LIVE index in the worktree root, untracked). Local Worker: `cd coop/worker && npx wrangler dev --local --port 8799` (node_modules installed in /home/user/wt/sul/coop/worker).
Successor does, in order:
1. rv FIX LIST item 1 (reports/save-year-rollback.md «## REVIEW r2», verbatim there): every CODE card open/waiting right after a step must be re-creatable from the sổ. Tool already in the game: **rcpReg(kind, generator)** (j3: the card carries rk + ra = its args with people as ids, serM writes {rk,ra}, rcpMk remakes it on load with RCPRE=1). Do: (a) `jqSaveable` (jqsave.js) must count `m.rk` cards as saveable (serQ already writes them; today jqsave/jspread treat them as code = held/unsaved); (b) wrap each generator so its card carries rk: stipend main card + «· Lễ nghĩa» follow (jecon.js econStipend ~L60–79: money is applied BEFORE the card — the remake must only BUILD the card from plain numbers d/bt/sk/SK/G, never pay again; split a pure builder econCardB(args) out of econStipend), Nội vụ phủ skim answers (jstip.js stipEvent L140–150), «Danh hiệu mới» (jdh.js ~L160 kitPanel reward), «Y phục dự <tết>» (jdc.js L223), «<tết> · Chuyện bên lề hội» (j71c.js L61), «Có người đến» approaches (j24.js L23–27: note L26 pushes an item to S.inv INSIDE the generator → side effect: guard with RCPRE or move it to the answer); (c) a law-11 scan row per code-card family in dev/measure/unseen-lists-scan.js (count Q.push / SP13 cards whose opts carry functions without rk, before/after) — the ACCEPT rows «Q code cards» / «SP13.L code cards» become UNSEEN once fixed.
2. Item 2: a save-boundary-reload case «cards left OPEN at the month/year flip ~3 s, true reload» asserting every card (data AND code) comes back, Fold + iPad; LIVE (step lost) and 6d2f5a03 (cards lost) must FAIL, fix PASS, + a MUTATE (drop rk) FAIL. The reviewer's probe idea: month + year flip, seeds 1,2.
3. Item 3: year s1 Danh 14 → 13 after reload: check whether an open code card's preamble applies Danh before the answer (then it must be in the sổ or applied on answer).
4. Re-run on the final head: save-unseen-lists (`node dev/test/save-unseen-lists.js index.html fold 1` + `ipadAir`; LIVE `bare.html` must FAIL; `SUL_MUTATE=nt SUL_ONLY=tinbao`, `SUL_MUTATE=evh SUL_ONLY=held`, `SUL_MUTATE=nl SUL_ONLY=nl-0s,nl-death` must FAIL); `node dev/test/save-boundary-reload.js index.html bare.html fold 1,2` + `ipadAir` (12/12 each); coop-e2e SWAP0 + SWAP1 on the local Worker (`node dev/test/coop-e2e.js <out> http://127.0.0.1:8799`, `COOP_SWAP=1 …`); save-rt-coop (copy from review/robot-coop-savert 71c538df: /home/user/wt/sul-scr/save-rt-coop.js) on dev/index.html of the head AND LIVE (rows identical); spread-e2e; scans; save size; `bash dev/tools/quickcheck.sh` ALONE last.
5. Fill «Tests», then FOREMAN_B_STATUS «SẴN SÀNG KIỂM review/save-unseen-lists <sha> (BIG; save)» covering all three (year step + unseen lists/code cards + new-life save) + send_message Foreman B.
Notes for the reviewer: the save-unseen-lists test reuses the player helpers of save-boundary-reload.js by reading its H / seedInit text (one copy). nl cases put ONE code card («Có người đến» with a code option) behind the identity card = the robot M4 life (random in real play; LIVE FAILs only with it). The held case empties EVHOLD before adding its card (the scheduler releases the oldest first). A held code card without a generator (e.g. «Có người đến» from j24) is still not written — same ACCEPT rule as Q, closed by step 1.

## r2 (B FIXER save-unseen-lists r2, session_01N1tNP3E3aTTZkCaTT9NmX8, depth 4) — rv r2 FIX items 1–3 CODE DONE; tests partly run; HANDOVER at ctx 26 % (START ≈ 3 %)
PRIORITY #1 CHECK ('save-unseen-lists'): OD 0 | ledger 0 | claims 6vieKxfA (predecessor) | main 0 | review/* review/save-unseen-lists aff8d163 + review/save-year-rollback-rv 509fd6c9 | archive 0 → continued the branch.
Head **review/save-unseen-lists 606457d09582233d8ff4b83638c5b9e606f13a94** (pushed; 2 commits on aff8d163: 557298a5 + 606457d0). Nothing uncommitted.
### What changed (rv FIX 1–3)
- j3: rcpMk — a generator that queues its own card (kitPanel) hands it back, no second copy in Q; RCP_MAX const (4000) + m.__rkLen when args too big (debug).
- jqsave: **jqSaveable counts rk cards as saveable** → Q / SP13.L (S.sp13.q) / EVHOLD write them as {rk,ra}; remade by rcpMk on load; no hold for them.
- Generators registered (rcpReg), each BUILDS only — every effect (pay, goods, Danh, log, title grant, item taken) stays before the card, never re-run on remake:
  jecon econStipCard «Bổng lộc tháng …» (+ Nội vụ phủ skim answers via stipEvent; SK as data, sup as id, goods as JSON ptGLite indexes → ptGBack) + econDutyCard «· Lễ nghĩa» (LAW 2/3: cost card back after reload; test answers «Chu toàn» after reload: Bạc −2 = card −2);
  jdh dhNotice «Danh hiệu mới / lên bậc» (returns the kitPanel card; no log on remake); jdc dcGateK «Y phục dự <tết>» (festival key); j71c compCard «Chuyện bên lề hội»;
  j95b j95bRumCard «Nghe đồn» (rumour id); jeitem eitPilCard «Kẻ hầu ăn bớt» (servant id, piece kind, price); jne neMornCard «Kính sự phòng ghi sổ» / «Lời ra tiếng vào» (Danh applied before, same write);
  jworld worldCardK (world events «Hỏa hoạn lớn», «Sứ đoàn vào triều» …, window id); jworldc wcCardK (composed world card, window id). j24 «Có người đến» was already rcpReg (ap.*).
- FIX 3 (Danh drift on reload): found by a Danh setter trace (SUL_DBGD=1) — jptime's nextBuoi wrapper runs ptTick AFTER the step (also on a nextBuoi that did not move time, jnight rerun): a late order lands as «Từ chối» with its fx (Danh) and NO write after → reload gave Danh 11 → 10. Now: when ptTick/ptLedger change her numbers (PT_FP fingerprint), save() at once.
- dev/measure/unseen-lists-scan.js: 12 new UNSEEN rows (rk saveable + one per code-card family) + a census line (rcpReg count, literal code-card pushes per file). **Before (aff8d163 build): SCAN FAIL 6** (rk, stipend, Lễ nghĩa, Danh hiệu, Y phục, bên lề; j24 already yes) → **after: PASS (33 lists, 23 unseen-kind)**; census 7 → 17 rcpReg, literal code pushes 26 → 24 (jemoact 5, j34 3, jty 3, j29 2, … — not seen at flips in 22 runs; ACCEPT residue).
- dev/test/save-unseen-lists.js: NEW case **flip-<month|year>-<0|3>s-s<seed>** (env SUL_FC / SUL_FCW / SUL_FCS; `SUL_ONLY=flip` runs them all): tối of the last tuần → the flip tap (night answered until the date changes, then NOTHING answered) → FC_WAIT → true reload → «Tiếp tục»: every unseen card (Q + SP13.L + EVHOLD, data and code) back as a multiset, same date, same top-bar numbers, then «Chu toàn lễ nghĩa» after the reload costs as the card says. Prints code cards with no generator at the flip. MUTATE `SUL_MUTATE=rk` (rcpMk → nothing) added — NOT YET RUN. SUL_DBGD=1 = Danh/save trace.
### Tests run so far (Fold only, head ≈ 606457d0 except where noted)
- flip census Fold month+year × 0 s/3 s × seeds 1,2,3,5,6,7 on the 557298a5+jne build: all PASS except families then fixed (Sứ đoàn / Hỏa hoạn → jworld/jworldc; one Danh drift month-0s-s6 → jptime). Re-run on 606457d0: flip-month-3s-s5 PASS (10 cards back incl. Nghe đồn, Lễ nghĩa, Danh hiệu mới), flip-year-0s-s1 PASS.
- scan: PASS (before FAIL 6).
### Successor does (in order, all on 606457d0 or later):
1. Fold + iPad full flip set: `SUL_ONLY=flip SUL_FCS=1,2 node dev/test/save-unseen-lists.js index.html fold,ipadAir 1` (8 cases ×2) → all PASS; LIVE `bare.html` (= `git show origin/main:index.html`) must FAIL; `syr.html` (= origin/review/save-year-rollback 6d2f5a03 index.html, cards lost) must FAIL; `SUL_MUTATE=rk SUL_ONLY=flip` must FAIL. If a new family shows «code cards with no generator», register it the same way (builder only, effects before) + scan row.
2. The other save-unseen-lists rows Fold + iPad (`node dev/test/save-unseen-lists.js index.html fold,ipadAir 1`), LIVE FAIL, MUTATE nt / evh / nl FAIL (commands in «## HANDOVER» above).
3. `node dev/test/save-boundary-reload.js index.html bare.html fold 1,2` + `ipadAir` (12/12 each).
4. coop-e2e SWAP=0 + SWAP=1 on the local Worker (`cd coop/worker && npm install && npx wrangler dev --local --port 8799`; `node dev/test/coop-e2e.js <out> http://127.0.0.1:8799`, `COOP_SWAP=1 …`); save-rt-coop (`git show origin/review/robot-coop-savert:dev/test/save-rt-coop.js` = 71c538df) on head AND LIVE (rows identical); spread-e2e; save size (`JSON.stringify(ser()).length` vs LIVE; new ra per card ≈ 0.1–3 KB); `bash dev/tools/quickcheck.sh` ALONE last (old save).
5. Fill «Tests» here, then FOREMAN_B_STATUS END line «SẴN SÀNG KIỂM review/save-unseen-lists <sha> (BIG; save; covers save-year-rollback + unseen lists + code cards + new-life save)» + send_message Foreman B.
Setup notes: sparse worktree `git worktree add --no-checkout /home/user/wt/sul -B review/save-unseen-lists origin/review/save-unseen-lists` + `sparse-checkout set --no-cone '/*' '!/dev/shots/' '!/dev/owner-shots/' '!/dev/figwork/'` + checkout + `bash dev/site/hooks/install.sh`; build `python3 dev/build/assemble.py && bash dev/site/build_site.sh`. One flip case ≈ 1–2 min.

## r3 (B FIXER save-unseen-lists r3, session_01N1tNP5rythg4fywKyPfyTV, depth 4) — TEST GATE DONE → SẴN SÀNG KIỂM
PRIORITY #1 CHECK ('save-unseen-lists'): OD 0 | ledger 0 | claims 6vieKxfA + 3E3aTTZk (predecessors, this seat) | main 0 | review/* review/save-unseen-lists 606457d0 + save-year-rollback-rv 509fd6c9 | archive 0 → continued, nothing redone.
START_CTX ≈ 5 % (used_tokens read 0; own estimate); end ≈ 25 %. Coordinator: Foreman B child 4 session_01N1tNP4bL26RKz4S6K5DgXY (replaces child 3).
Head **review/save-unseen-lists 7e01f0f54acbfa5ac4e32e049f738ff84f559577** (pushed). LIVE dbae89eb ⊂ head; LC16 stack top 772d05f2 (review/lc16-twoway-on-mfix3) ⊂ head.

### Commits this round (on 606457d0)
| commit | what |
|---|---|
| 51a726ba | merge LC15 top 45b10432 (hardlock4-on-kroul); only index/sw conflicted → rebuilt |
| 239a4c66 | **FIX (found by the flip set, iPad year-0s-s1)**: «Kẻ hầu ăn bớt» (eitPil) was LOST after a reload — the confidant maid has no id/sid, so rcpEnc wrote a COPY of her into ra; on load the copy was a stranger (eitIsMaid false, rcpFail «threw … reading '1'»). j3: rcpP carries her as «maid» / «maid:<rival id>», one decoder rcpByKey shared by rcpDec AND kqDec (kit cards, same family); any other person with no key is never copied (rcpPerson → rcpEnc throws → the card stays a counted code card). Test: flip case remakes every waiting rk card TWICE and asserts S (JSON), notice box and Q do not move; MUTATE rk2 (a remade card pays Bạc +1) |
| 5842f7c3 | test setup: save-boundary-reload newLife counts the figure pictures as ready — j52 nlBegin waits ≤2.5 s for pictures the test aborts → under CPU load S was not set when start() returned (TypeError S.name; LIVE hits it too). Game code unchanged |
| be0ed9b8 | merge LC16 stack top 772d05f2 (LIVE dbae89eb + kit pack-4 + m-fix-3-r6 + two-way-oldsave-night); only index/sw conflicted → rebuilt; j3 / j2 auto-merged (rcp code intact) |
| 7e01f0f5 | quickcheck G4 92 look-dedupe test setup: «Nhận thân phận» as a player (nlAccept(false), as save-boundary-reload newLife) before it clears Q — it threw the identity card away while NLP was open (impossible in play), so the nl mark brought the card back after its save → load. PASS on head + LIVE; game code unchanged (a j52 «card in Q» variant was tried and rejected: the slot write carrying nl happens in start() before the card is queued → nl-card FAIL) |
| bd077b00 | **FIX (found by the remake ×2 check, iPad month-0s-s2)**: «Có người bán tin» (knSell) remade in a later buổi drew a NEW voice line and wrote S.vmem (save changed, card text could change after reload). jvoice kLine (ONE line picker, whole family): during a remake (RCPRE) it returns the last line drawn for that key and writes nothing. Probe: head l0=l1=l2, vmem same; LIVE new line + vmem moved. Test: HUD not compared while kitStatFx still counts a change in at capture (0 ms; S/sổ compared as always) |
No BAL change (law 4), no player-visible word (law 7), no UI / kit part.

### Generator side effects (brief: «never run twice on rebuild»)
Every rk card waiting at the flip is remade twice in-page (rcpMk ×2) and S + NT.list + Q must stay byte-identical: 30 flip runs on the final head, 2–8 rk cards each → **no side effect** in all; before bd077b00 1 run caught knSell (vmem) → fixed; MUTATE rk2 (remake pays Bạc) → caught («stipCard moved bac») + DRIFT after reload. The reload itself (one remake on load) is also covered: same numbers after reload in every flip case.

### Tests on bd077b00 (= final code; 7e01f0f5 adds only the look-dedupe test setup + build line) (commands run in /home/user/wt/sul; pages: index.html = head, bare.html = `git show origin/main:index.html` (LIVE dbae89eb), syr.html = 6d2f5a03 index.html)
| check | command | result |
|---|---|---|
| flip set Fold 755x1000 | `SUL_ONLY=flip SUL_FCS=1,2 node dev/test/save-unseen-lists.js index.html fold 1` | **PASS 8/8** (month/year × 0/3 s × seeds 1,2; 1–13 cards each, every card back, same numbers, Lễ nghĩa after reload Bạc −2 = card) |
| flip set iPad 1180x820 | same, `ipadAir` | **PASS 8/8** |
| flip LIVE dbae89eb | `SUL_ONLY=flip SUL_FCS=2 SUL_FCW=3000 … bare.html fold 1` | FAIL 2/2 (LOST cards + DRIFT) ✔ must FAIL |
| flip 6d2f5a03 | same, `syr.html` | FAIL 2/2 (LOST cards) ✔ |
| MUTATE rk (no remake) | `SUL_MUTATE=rk SUL_ONLY=flip SUL_FCS=2 SUL_FCW=3000 … index.html fold 1` | FAIL 2/2 ✔ |
| MUTATE rk2 (remake pays) | `SUL_MUTATE=rk2 …` | FAIL 2/2 ✔ |
| other rows Fold | `SUL_ONLY=tinbao,held,nl-0s,nl-card,nl-death,nl-4s,drift … index.html fold 1` | **PASS 7/7** |
| other rows iPad | same, `ipadAir` | **PASS 7/7** |
| rows LIVE | `SUL_ONLY=tinbao,held,nl-0s,drift … bare.html fold 1` | FAIL 4/4 (20/5 → lost, held lost, slot empty, 16 moments sổ ≠ screen) ✔ |
| MUTATE nt / evh / nl | `SUL_MUTATE=nt SUL_ONLY=tinbao` · `=evh SUL_ONLY=held` · `=nl SUL_ONLY=nl-0s,nl-death` | FAIL 1/1 · 1/1 · 2/2 ✔ |
| save-boundary-reload Fold | `node dev/test/save-boundary-reload.js index.html bare.html fold 1,2` | **PASS 12/12** |
| save-boundary-reload iPad | same, `ipadAir` | **PASS 12/12** |
| scans | `node dev/measure/unseen-lists-scan.js` · `time-advance-save-scan.js` | PASS (33 lists, 23 unseen-kind) · PASS (10 paths, 9 gates) |
| coop-e2e SWAP=0 (local Worker `npx wrangler dev --local --port 8799`) | `node dev/test/coop-e2e.js <out> http://127.0.0.1:8799` | **142/142** |
| coop-e2e SWAP=1 | `COOP_SWAP=1 …` | 141/144 once («buổi 3:2 advanced for both» / «week after rebirth advances» = the known week-end stuck family, FOREMAN_B 14:38Z) → 2 reruns **142/142, 142/142** |
| save-rt-coop (71c538df) | `node save-rt-coop.js dev/index.html` vs LIVE dev/index.html (assembled from dbae89eb) | rows IDENTICAL 11/11 (6 ok; the 5 FAILs are LIVE's own = robot-coop-savert not landed) |
| spread-e2e | `SPREAD_BOT=1 node dev/test/spread-e2e.js http://127.0.0.1:8811 index.html bare.html` | FAIL 8 = only «modal hidden with N cards» rows (pre-existing bot-mode kind, same as save-year-rollback r2); no page error anywhere; old save loads + plays; **C: save while data cards wait → same cards after reload, shown later 2/2** |
| save size (robot M4 sổ, deser → ser) | /home/user/wt/sul-scr/size.js | LIVE dbae89eb 984,261 chars → head 984,269 (+8; nt 2); 20 notices ≈ +3 KB (r1); one rk card ra ≤ RCP_MAX 4,000 chars (seen 20–600) |
| quickcheck ALONE (old save) | `bash dev/tools/quickcheck.sh` | old save from LIVE loads + plays a buổi ✔, open 2189 ms, perf median new/live render 298/259 · tab 551/579 · buổi 1636/1322 ms · tasks>200 ms 27/27 (QUICKCHECK PASS part); CORE GATES: only G4 90-button-crawl FAIL = the pre-existing «Ô lưu · Lui» fault (LC15/LC16, fixed by review/robot-coop-fix-7-r2, not on the stack) + a crawler crash at its 600 s budget. G4 92 look-dedupe: FAILed on bd077b00 (setup threw away the identity card without «Nhận thân phận» → nl brought it back) → test setup fixed in 7e01f0f5 → PASS (head + LIVE) |
Not a test of this branch: LIVE spread-e2e run hung to its 40-min timeout (EXIT 124) — LIVE only, recorded for the reviewer.

### Gain vs risk
GAIN — every card she has not answered (data AND code: stipend + Lễ nghĩa cost card, Nội vụ phủ skim, Danh hiệu mới, Y phục dự Tết, Tết side stories, Nghe đồn, Kẻ hầu ăn bớt, morning card, world events, Có người đến, Có người bán tin) survives a true reload at the month/year flip; unread «Tin báo», held events and the identity card survive; a new life is in its slot at once; remaking a card never pays, takes or writes anything twice. RISKS: (1) a card generator added later that carries a keyless person → rcpEnc refuses it (stays an unsaved code card, counted by the scan census) — possible, small, visible in the flip test line «code cards with no generator»; (2) kLine during a remake returns the last line of its key — if two cards of the same key wait at once the second may show the first's wording after a reload — rare, cosmetic, no number; (3) co-op SWAP=1 week-end stuck 1/3 runs = pre-existing family, not this diff (rows unrelated to save; 2 clean reruns). → **Được lớn hơn.**

## REVIEW (BIG rv, opus, session_01N1tNP2NAx6v2HeVEvroSiE, depth 5, START_CTX ≈ 3 %) — **FAIL** (one blocking family; everything else PASS)
PRIORITY #1 CHECK ('save-unseen-lists'): OD 0 | ledger 0 | claims 8 | main 0 | review/* review/save-unseen-lists 7e01f0f5 (+ save-year-rollback 6d2f5a03, rv base 509fd6c9) | archive 0 → reused reports/save-unseen-lists.md r3 + save-year-rollback «## REVIEW».
Judged: head 7e01f0f5 bare AND merged onto LIVE 08e7d79f = **review/save-unseen-lists-rv 9037e5a9d4689ac2feb8c9486e69d2e8bd9bf528** (40285628 merge: index/sw/CHANGE conflicts only, CHANGE = LIVE line, rebuilt · 94ae9827 rv fix (below) · 9037e5a9 + dev/test/save-residue-probe.js).

### RV FIX made (landing hygiene)
The head carried **kit pack-4 7603d689 (kszTextFirst3, §56.32b)** in via LC16 772d05f2 — B KIT FAIL 18:31Z, MAIN shipped 8e591b3a WITHOUT it. Landing the head would have shipped a KIT-FAILed UI change (law 9). 94ae9827 puts jksize.js / jopic.js / KIT.md / kit-faces-opts.js back to LIVE 08e7d79f; now `git diff origin/main` = only the 26 save files (j2 j3 j42 j52 j6 j68 j71c j95b jdc jdh jecon jeitem jne jnotice jptime jqsave jspread jvoice jworld jworldc + 2 scans + 4 tests). Any re-stack must start from -rv, not from the bare head.

### BLOCKING (law 11 + law 6c, brief check (2), rv r2 FIX item 1 «every CODE card open/waiting right after a step must be re-creatable»)
Code cards with no generator are still LEFT OUT of a real slot write at ORDINARY buổi steps (not only flips), so a true reload in that window loses them for good (before: the save was held = time rolled back; now: the card vanishes). Proof (`node dev/test/save-residue-probe.js index.html fold 1 36`, rv build, 36 buổi, 936 real writes; the probe hooks save() outermost and lists every unseen card present when SAVE_N moved that serM / sp13Sync / evSer1 cannot write):
| family | where | source | times in 36 buổi |
|---|---|---|---|
| «Hội phối đồ: báo đề» | SP13.L | jts.js:406 tsPanel | 1 |
| «Hội phối đồ · <đề>» (the contest itself) | SP13.L | jts.js:432 tsPanel | 1 |
| «Lời cảnh báo» | SP13.L | jts.js:236 tsPanel (j70 / j24 maidWarn are data) | 2 |
| «Lễ tấn phong <tên>» | Q | jts.js:283 tsPanel | 1 |
| «Bị châm chọc» | Q | jemoact.js:509 (5 literal pushes) | 3 |
Seeds 2/3 timed out under CPU load (4 browsers on 4 cores) — seed 1 alone shows 5 families / 8 cards. **Scan gap**: unseen-lists-scan census counts only literal `Q.push({…go:})`, so jts **tsPanel (8 cards, pushes a variable m)** is invisible to it; the «24 literal pushes = ACCEPT residue, not seen at flips» was never measured at ordinary steps.
FIX LIST (fixer):
1. jts tsPanel callers (8: Lời cảnh báo, Lễ tấn phong · <bậc>, Lễ tấn phong <tên>, Hội phối đồ: báo đề, Hội phối đồ · <đề>, the rest of tsPanel) → rcpReg builders (effects before the card, as jecon / jne), and jemoact «Bị châm chọc» family (5) + the other census files (j34 3, jty 3, j29 2, j27 j55 j71 j77 j95 jdc jfeel jgift jkiep jshelf jthaiy 1 each) — whole family (law 11), or a ONE rule that never lets a generator-less code card cross a step (e.g. jspread never moves one; the step write waits only for it, bounded) — fixer's choice with the gain/risk table.
2. Scan: count every card pushed with function opts (variable pushes / tsPanel / kitPanel wrappers too), not only literals; the census residue must be 0 or each row an explicit ACCEPT with proof it cannot cross a step.
3. Test: save-residue-probe (committed on -rv) as a gate: Fold + iPad, seeds 1,2,3 × 40 buổi → no LOST-AT-WRITE line; LIVE 08e7d79f not comparable (it holds instead); MUTATE (drop one rcpReg) must show a LOST line.
4. Also check while there: jts «Hội phối đồ · <đề>» — a lost contest card must not leave a loan / theme state half-done (law 6c: dcBorrow loans).

### Tests run (rv 94ae9827 = 9037e5a9 code; commands in /home/user/wt/sul; bare.html = LIVE 08e7d79f index, syr.html = 6d2f5a03, head.html = 7e01f0f5)
| check | command | result |
|---|---|---|
| flip set Fold | `SUL_ONLY=flip SUL_FCS=1,2 node dev/test/save-unseen-lists.js index.html fold 1` | **PASS 8/8** |
| flip set iPad | same `ipadAir` | **PASS 8/8** |
| rows Fold / iPad | `SUL_ONLY=tinbao,held,nl-0s,nl-card,nl-death,nl-4s,drift …` | **PASS 7/7 · 7/7** |
| save-boundary-reload Fold / iPad (incl. 0-s) | `node dev/test/save-boundary-reload.js index.html bare.html fold 1,2` / `ipadAir` | **PASS 12/12 · 12/12** |
| sbr bare head 7e01f0f5 Fold | `… head.html bare.html fold 1,2` | PASS 9/9 so far (still running at verdict) |
| flip LIVE 08e7d79f / 6d2f5a03 | `SUL_FCS=2 SUL_FCW=3000 … bare.html` / `syr.html` | FAIL 2/2 (LOST 3/6 + DRIFT) / FAIL 2/2 (LOST 5/6) ✔ must FAIL |
| MUTATE rk / rk2 / nt | | FAIL 2/2 (not remade) / FAIL 2/2 (stipCard moved bac + DRIFT) / FAIL 1/1 ✔ |
| MUTATE evh / nl, rows LIVE, flip head iPad, sbr LIVE | | running at verdict (CPU) |
| scans | unseen-lists-scan · time-advance-save-scan | PASS (33 lists) · PASS (10 paths, 9 gates) — but see scan gap above |
| law 11 gate grep | every `save=function` wrapper (jcloud STALE/title, jcoop*, jqsave in-buổi only, jspread no hold, jslots) + every `quiet=true` (17; j2/j6/j42 now finally) | ONE rule holds: no hold across a step ✔ |
| true reload by hand-script at the year flip, code cards pending (8 rk / 6 rk cards), both devices, shots looked 3× | `SUL_ONLY=flip SUL_FC=year SUL_FCW=3000 SUL_FCS=1 node rv-flipshot.js index.html fold,ipadAir 1` (scratch copy of the flip case + screenshots) | PASS both: 14 cards back, same date (tháng giêng năm thứ hai), same numbers (Fold Danh 13 Sủng 9 Bạc 95; iPad Danh 13 Sủng 4 Bạc 120), same top card «Tin trong cung buổi này» before/after; no overflow / cut text |
| save size (seed 1, 6 buổi over the year flip, ser() chars) | rv-size (scratch) | LIVE 214,140 → rv 222,858 (+8,718 = nt 7,365 for 19 notices + evh 1,418); bounded (noticeMax 20, E68S.hold, ra ≤ 4,000/card), ≈ 0.2–0.9 % of a year-3…15 sổ vs the 5.2 M site limit ✔ |
| code review | diff vs LIVE, 20 game files | rk builders build only (stipEvent deterministic; jdh no log on RCPRE; jvoice no vmem on RCPRE); j52 nl mark solo only; nt/evh top-level, not in room blob ✔ |
NOT run (verdict FAIL first, CPU): coop-e2e SWAP0/1, save-rt-coop vs LIVE, spread-e2e, quickcheck ALONE — successor/fixer run them on the fixed head (local Worker: `cd coop/worker && npm install && npx wrangler dev --local --port 8799`).

### Gain vs risk of landing AS IS (for MAIN, flight)
GAIN: LIVE today rolls time back / drifts numbers / loses Tin báo, held cards and the stipend + Lễ nghĩa cards on a true reload (all FAIL on LIVE above) — -rv fixes all of that. RISK: the 5+ families above vanish on a reload in their window (before: time rolled back instead) — có thể xảy ra (≈ 8 cards in 36 buổi sit in such a window; she must reload exactly then), vừa (a contest / ceremony / taunt she never sees; no number lost), not detectable by her → fix list 1–3. Verdict stays FAIL (law 11 + 6c, brief check 2); if MAIN wants the flight stop-gap, land **-rv 9037e5a9** (never the bare head: it carries the KIT-FAILed 7603d689).
