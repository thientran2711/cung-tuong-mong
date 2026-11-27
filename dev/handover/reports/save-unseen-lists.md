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

## r4 (B FIXER save-unseen-lists r4, opus, session_01N1tNP2LHbhSc8CKS2GvBiM, depth 5) — rv FIX LIST 1–4 DONE + M2b rollback row → SẴN SÀNG KIỂM
PRIORITY #1 CHECK ('save-unseen-lists'): OD 0 | ledger 0 | claims 8 | main 0 | review/* review/save-unseen-lists 7e01f0f5 (r3) + review/save-unseen-lists-rv 9037e5a9 (rv base) | archive 0 → based on -rv (kit pack-4 7603d689 stays OUT; never 7e01f0f5), reused the rv probe, rcpReg, the flip / family test helpers.
START_CTX ≈ 3 % (used_tokens read 0; own estimate). Coordinator: Foreman B ROOT 2 session_01N1tNP3oeufPEZL2RqPYKuK (was child 4 / child 5).
Head **review/save-unseen-lists c6d080264cab60b10ba8b4874af861efa2854ea0** = -rv 9037e5a9 + merge LIVE 351122ba (60f9f6a7, only index/sw conflicted → rebuilt) + r4 commits. `git diff origin/main` = save files only (no kit file).

### ONE rule + whole family (rv FIX 1)
- **ONE rule (jqsave jqNoop)**: an option whose go does nothing (`go:()=>{}` — the «Tiếp tục» of a card whose effects ran before it was shown: Bị châm chọc, Thái hậu quở trách, Lỡ lời, Điềm báo, Bị giật y phục …) is data: the card is written whole and shown again (before: one empty function made the whole card unsaveable). Covers every such card in the game at once.
- **Every code card a step makes is now BUILT by a registered generator** (j3 rcpReg; effects before the card, once; a remake only builds). 26 new generators:
  jts tsWarn «Lời cảnh báo» · tsLeMe «Lễ tấn phong · <bậc>» (gifts into her chest before) · tsLeNpc «Lễ tấn phong <tên>» · tsSummon «Hoàng thượng triệu …» · tsDressAnn «Hội phối đồ: báo đề» · tsDress «Hội phối đồ · <đề>»;
  jemoact eaHitMine «Cung nữ bị ức hiếp» · eaHoi «… đến hỏi tội» · eaMe «Lòng không giữ được» (+ jfeel feelActFin by name); jmood mbComfort «Có người đến an ủi»; jthaiy thNausea «Trong người khác lạ»;
  j29 svMarket «Hàng chợ đen»; jbancung banCung + j27 palCer «Ban cung»; j34 j34Between / j34R1 / j34R2 (tranh ghế); j71 j71Fest / j71Day (festival contest cards); j31 festEv (FESTEV rows — jact2 empties FESTEV, kept for parity);
  j95 j95Caught «Bắt gặp» / j95Bribe «Lời nhờ cậy»; jdc dcAsk «… xin mượn trâm» (the piece is found again, never a copy); j25 facAsk «Có người đến» (faction); jpromsv spLeave «Kẻ hầu xin đi»; jshelf shelfWither «<cây> héo»;
  jslap slapNpc «Bị tát» + jlooks lkNpc (NPC acts on her: nothing applied until she answers); jtoil toilPop «… chê / khen dung nhan». j3 pushModal hands the card back.
- **rv FIX 4 (law 6c, Hội phối đồ loans)**: the contest card is a generator from (đề, month, year); the rivals' outfits are drawn when it is judged (tsDressFinish), and tsDressReturn (dcGiveBack of every «ts» loan) runs in finish — a reload while the card waits no longer drops the contest and its loan returns.

### Scan (rv FIX 2) — `node dev/measure/unseen-lists-scan.js [buildDir]`
New CODE-CARD CENSUS: parses EVERY object with an `opts` key whose options carry a function or come from a variable / call / bare names (`opts:[o1,o2]`, tsPanel / kitPanel / kitModal / pushModal specs, table rows); pid cards and empty-go cards are data. Each site must be inside a registered generator or match a CLASS row with its reason (ROUTE = remade by a named generator, proof regex must hold · ACT = made only by her own tap / act inside a buổi · PANEL = a look-up / view panel she opens · KIT · COOP · NOTCARD). Unclassified = SCAN FAIL.
| build | sites | in a generator | ROUTE | ACT | PANEL | KIT | COOP | NOTCARD | UNCLASSIFIED |
|---|---|---|---|---|---|---|---|---|---|
| -rv 9037e5a9 (before) | 156 | 11 (17 rcpReg) | 60 | 24 | 11 | 16 | 4 | 2 | **28** (every family above + jmood) → SCAN FAIL |
| head (after) | 156 | 39 (46 rcpReg) | 60 | 24 | 11 | 16 | 4 | 2 | **0** → SCAN PASS (33 lists) |
The census found jmood «Có người đến an ủi» (opts:[o1,o2]) that the rv probe had not met; fixed in the same family.

### Gate (rv FIX 3) — dev/test/save-residue-probe.js is now a gate (exit 1 on any line)
At every save that reaches the slot: LOST-AT-WRITE (a waiting card the sổ cannot carry), REMAKE-FAIL / REMAKE-SIDE (every generator card is made again once from its save form, as a load does; S + NT.list + Q must not move), SAVE-LAG (robot M2b: after every step the sổ date must equal the screen date), page errors. RP_MUTATE=<kind> strips one generator's rk (= not registered).
| run | result |
|---|---|
| head Fold seeds 1,2,3 × 40 buổi | **PASS** (660 / 1594 / 338 real writes; 36 / 29 / 37 generator cards remade clean) |
| head iPad 1180x820 seeds 1,2,3 × 40 | **PASS** (182 / 280 / 1547 writes; 37 / 26 / 23 remade) |
| r3 7e01f0f5 Fold seed 2 (must FAIL) | FAIL 5: SP13 Hội phối đồ: báo đề · SP13 Hội phối đồ · Thanh nhã · SP13 Lời cảnh báo · Q Lễ tấn phong Tô Mi Trang · Q Lòng không giữ được ✔ |
| LIVE 351122ba Fold seed 2 (must FAIL) | FAIL: **SAVE-LAG ×26/40 steps** (sổ 1.3.1.0 while the screen is at 1.3.1.1 … 1.3.2.1 = the M2b rollback) ✔ |
| MUTATE RP_MUTATE=tsLeNpc head Fold seed 2 | FAIL (LOST line) ✔ (the run met «Có người đến an ủi» before it was routed — fixed in 4af55d8f, then the full gate above re-ran on the final head) |

### Robot M2b rollback (MAIN 145, reports/m2b-rollback.md) — answer
Build f21a1042 = the kit stack on LIVE dbae89eb, BEFORE save-year-rollback: jspread / jqsave held the autosave while a code card waited, so the sổ lagged the screen by buổi → months; each reload restored the old write. Reproduced as the SAVE-LAG row: LIVE lags 26 of 40 steps; head lags 0 of 240 steps (6 runs) — no hold crosses a step, every step writes at once with every waiting card. Second possible cause, NOT covered by this branch: j6 save() swallows a localStorage error (quota) — a very long life whose sổ outgrows the browser limit would keep an older write silently; that is the save-growth family (briefs/E-savegrow.md, review/save-growth), not reachable in 40 buổi (sổ here ≈ 85–220 KB).

### Other tests (head c6d080264cab60b10ba8b4874af861efa2854ea0, final code 4af55d8f)
| check | command | result |
|---|---|---|
| flip set Fold + iPad (16) | `SUL_ONLY=flip SUL_FCS=1,2 node dev/test/save-unseen-lists.js index.html fold,ipadAir 1` | 15/16 PASS; Fold flip-year-3s-s2 once LOST «Y phục dự Tết Nguyên đán» (dcGate lapsed: rcpFail «no choice now» — her dress need was gone) → re-run **PASS** (risk 2 below) |
| rows + family Fold + iPad (16) | `SUL_ONLY=tinbao,held,nl-0s,nl-card,nl-death,nl-4s,drift,family …` | **PASS 16/16** (family: 19 families made by their generators at an ordinary buổi 1.3.0.3, at-once write in the slot, TRUE reload → every card back, same date; facAsk / dcAsk / shelfWither / j34 «not in this world» there — covered by the probe) |
| rows LIVE (must FAIL) | `… bare.html fold 1` (tinbao, held, nl-0s, drift) | FAIL 4/4 ✔ |
| MUTATE rk · rk2 · nt · evh · nl | `SUL_MUTATE=… SUL_ONLY=…` | FAIL 2/2 · 1/1 · 1/1 · 1/1 · 2/2 ✔ (all must FAIL) |
| save-boundary-reload Fold / iPad (incl. 0-s) | `node dev/test/save-boundary-reload.js index.html bare.html fold 1,2` / `ipadAir` | iPad **12/12**; Fold 11/12 → oldsave FAILed on the OLD build's own held sổ (LIVE lag) → `SBR_ONLY=oldsave` re-run **PASS** |
| scans | unseen-lists-scan · census | PASS (33 lists) · UNCLASSIFIED 0 (before 28) |
| coop-e2e local Worker | `node dev/test/coop-e2e.js <out> http://127.0.0.1:8799` / `COOP_SWAP=1` | **142/142 · 142/142** |
| save-rt-coop (review/robot-coop-savert 71c538df) | head dev/index.html vs LIVE dev/index.html | rows IDENTICAL (12 rows; the 6 FAILs are LIVE's own) |
| save size | in-page, 16 generator cards waiting | +1,736 chars for 16 cards (40–260 chars each, ≤ RCP_MAX 4,000); ser() 85,001 → 86,737 |
| touched-file tests (head vs LIVE, same command) | dev/test: ag-mg2 ban-cung dresscode-loans/-ts-loan/.test/-loan-scan feelings18 law4-typed makeup-theme mood-seal-ev odds-no-unknown promote-servants slap-mg temper-outburst toil-react-layers toil-tease ts-a emotion-acts j71c-play shelf-check | every result = LIVE's (pre-existing FAILs identical) except: ag-mg2 2 vs 1 and feelings18 32 vs 33 → re-runs = LIVE (exam / hờn rows are random draws); dresscode-ts-loan 2 FAIL vs LIVE 3 (one better) |
| quickcheck ALONE (old save) + perf | `bash dev/tools/quickcheck.sh` | QUICKCHECK PASS part: old save loads + plays ✔, open 1850 ms, perf new/live render 244/212 · tab 510/416 · buổi 1252/2161 ms · tasks>200 ms 22/25. CORE GATES: G4 90 button crawl «Ô lưu · Lui» = the pre-existing fault (r3 same, fixed by review/robot-coop-fix-7-r2); **G4 94 q-softlock FAILed on r4 (the view panel «Tin chờ người sai đi» was saved by the empty-go rule) → fixed c6d08026 (jqData never writes a look / view / menu panel) → q-softlock PASS** (LIVE PASS) |
| after c6d08026 | family Fold+iPad · probe seed 2 Fold+iPad · scan | **PASS 2/2 · PASS (Fold 1567 writes, iPad 278; 0 lost / 0 remake faults / 0 SAVE-LAG) · UNCLASSIFIED 0** |

### Gain vs risk
GAIN — no card a step makes can vanish on a true reload any more (26 families + every empty-«Tiếp tục» card), the Hội phối đồ contest and its loan return survive, and the sổ never lags the screen (the M2b months-long rollback). RISKS: (1) a NEW code card added later outside a generator → the census FAILs at once (unclassified site) — possible, small, caught by the scan + probe; (2) a lapsing generator (dcGate «Y phục dự Tết»: the need is gone) gives no card after a reload while the live card still showed — rare (1 of 16 flip runs, timing), no cost or object lost, by design («the gate lapses»); (3) approach cards changed after creation by jtsb / j68h wrappers (opts replaced) come back with the base options after a reload — pre-existing since r2, possible, small (a different but valid choice set); fix = route those wrappers through their own generator (follow-up). → **Được lớn hơn.**

## REVIEW r4 (BIG rv, opus, session_01N1tNP5NE1WTFojcW3fS7Xt, depth 6, START_CTX ≈ 3 %) — PARTIAL (gate ~80 % done) + HANDOVER (rolled at ctx ≈ 47 %)
PRIORITY #1 CHECK ('save-unseen-lists' / 'save quota' / 'rebirth save'): OD 0 | ledger 0 | claims 5NE1WTFo | main 0 | review/* save-unseen-lists c6d08026, -rv 9037e5a9, save-growth-r6 ad8955e1, e-pack-a 7ee5ab55 | archive 0 → reused reports «## REVIEW» + «## r4», save-residue-probe, save-growth-r6 (NOT rebuilt). NEVER 7e01f0f5 (kit pack-4).
**Verdict so far: no blocking fault left in the save-unseen-lists code; 3 faults found and FIXED by me (below). Landing pack = review/save-fix-stack-rv5 (rv5 + save-growth-r6); final LAND READY waits for the gates listed under «LEFT».**

### Branches (all pushed)
| branch | sha | what |
|---|---|---|
| review/save-unseen-lists-rv4 | c51db3d412037302ffa23119b410c33c51ed2eb3 | c6d08026 merged on LIVE 5e013076 (4768ca55) + fix 1 j71Day (192ece5a) + save-quota-repro (aef085c8) + fix 2 jnotice (c51db3d4) |
| **review/save-unseen-lists-rv5** | **deb9859d6f98d1f283b2a0efda2172fa8a18f1c6** | rv4 merged on LIVE **f009e1a6** (20b22b2b; only index/sw/assets conflicted, rebuilt) + scan rows (73c076ef) + test harness fix (deb9859d). `git diff origin/main` = the 39 save game files + tests/scans; no kit file. |
| review/save-fix-stack | ae3251897c6b3b74ca5fc116a3db4fba5bfb9cf4 | OLD stack (rv4 192ece5a + save-growth-r6) — superseded |
| **review/save-fix-stack-rv5** | **0cb4e389832f45b8cefaecd45f4ae2cd62c1fdc8** | rv5 73c076ef + save-growth-r6 ad8955e1 (only j6 save() conflicted → `slotPut` + `SAVE_N++` + `saveBlocked()`; rebuilt). Lacks only the test-only commit deb9859d (copy dev/test/save-boundary-reload.js + notice-late-save.js from rv5 before landing). |

### Faults found by this review and fixed (whole family)
1. **j71Day festival-day card remade from the LIVE plan** (probe REMAKE-FAIL, iPad seed 1): Hội Phượng spans 3 tuần (FEST phoenix t:[0,1,2]); in the same endTurn fDay7 makes the card (P.y=-1) and fPlan7 REPLACES j.plans[k] for next tuần → a reload rebuilt another contest or lapsed. Fix: the card carries its own plan (pp, me, pb) in ra; an old {ra:[k]} falls back. Test dev/test/j71day-remake.js: pre-fix FAIL (same title, different body/entrants), fixed PASS. Only multi-tuần festival: phoenix (j71Fest yearly fx record not affected).
2. **Tin báo line lost on a true reload** (my iPad video, LAW 11 = robot M2 family): kitKnow batches with setTimeout 0, so the «know:» notice is added AFTER the act's render+save; nothing wrote it until the next render. Fix (jnotice, ONE rule for every notice): when NT.list changed after the last slot write (SAVE_N), one more save at the end of the tick. Test dev/test/notice-late-save.js: LIVE / pre-fix FAIL Fold+iPad, fixed PASS Fold+iPad. time-advance-save-scan row added (the wrapper never holds).
3. **Harness on LIVE f009e1a6**: every new life now opens with the 3 selection days (jkc2 kc2SelOn); the player helpers answer option 1, she is not kept (ban hoa), the life ends → every save test showed «1 step, sổ none». TEST SETUP ONLY: save-boundary-reload newLife turns kc2SelOn off unless window.__sbrSelx (the selection days have their own selx-* tests). Census: one NOTCARD row (jselxday selxCard PARAMETER list parse hit; its cards are pid selxD).

### SAVE ROLLBACK (MAIN 151 BLOCKING, M2b Y20→Y19, M5b 5.2 MB) — cause found, fix = this branch + save-growth together
Repro dev/test/save-quota-repro.js (real robot year-14 save dev/handover/robot/nc-B-tuc/saves/20261124-0057-010.json, 4.34 M chars + 820 k other site storage, real taps, true reload):
| build | write errors | SAVE-LAG | true reload | slot |
|---|---|---|---|---|
| rv4 alone (= LIVE save path) | 71 QuotaExceededError, swallowed by j6 save() catch{} | 13/24 | 14.9.2.3 → **14.8.2.2 (−13 buổi; grows without end = M2b)** | 4.42 M stuck |
| e-pack-a 7ee5ab55 (save-growth, no save-unseen) | 0 | **6/24** (LIVE's own lag) | exact | 0.39 M |
| **save-fix-stack (rv4 + sg)** | 0 | **0/84** · **0/160** | Y14 m8 → past Y15 boundary → Y15 m9, **43 min wall**, reload mid-year exact = 0 months / 0 turns lost | 0.40–0.43 M (ser 2.8–2.96 M) |
| **save-fix-stack-rv5** (on f009e1a6) | 0 | **0/160** | Y14 m8 → Y15 m9 exact | 0.40–0.43 M |
| stack, whole site store full (QR_ROOM 200) | game writes refused | — | — | sticky kit notice «saveBlocked» shown (not silent) |

### MAIN 152 rebirth (M5b: death + new life never saved) — dev/test/save-death-rebirth.js (reload at the death card / at the new-life identity card / 4 s after «Nhận thân phận»; the dead life may never come back alive)
LIVE 5e013076 and LIVE f009e1a6: FAIL «reload at the new-life identity card» Fold+iPad (title «Sổ một · Chưa ghi» = the new life never saved); save-unseen-lists nl-death/nl-0s LIVE FAIL 4/4. rv4, rv5, save-fix-stack-rv5: **6/6 PASS** (Fold+iPad). Fixed by the branch's j52 at-once write + jqsave SAVE_N rule.

### Gate results (head = rv4 192ece5a/c51db3d4 on 5e013076 unless marked rv5)
| check | result |
|---|---|
| save-residue-probe Fold seeds 1–3 × 40 | rv4: seed 1 one REMAKE-FAIL ap.svDefect (traced: remake is fine when the rival's maid is still in any staff list, lapses only when she left every staff — j3 «person gone» lapse by design; re-run of seed 1 clean) · seeds 2,3 0 lines · **rv5: seeds 1,2,3 0 lines (689 / 1056 / 378 writes)** |
| probe iPad seeds 1–3 × 40 | rv4: seed 1 j71Day (fixed) → after fix seeds 1,2 0 lines · **rv5: seed 1 0 lines; seeds 2,3 RUNNING at handover** |
| probe with rivals in the remake fingerprint (_rvprobe) | rv4 / rv5 Fold seed 2: 0 lines (remake never touches rivals) |
| RP_MUTATE | tsLeNpc: PASS (that run never met the card — insensitive); **stipCard: FAIL 3 LOST ✔** |
| LIVE must FAIL | 5e013076: SAVE-LAG 6/40 ✔ · f009e1a6: SAVE-LAG 8–10/40 ✔ · rows LIVE: tinbao / held / nl-0s FAIL ✔ |
| save-unseen-lists flip Fold+iPad | rv4 **16/16** · rv5 running |
| rows + family Fold+iPad | rv4 **16/16** · rv5 running |
| MUTATE rk / rk2 / nt / evh / nl | all FAIL ✔ |
| save-boundary-reload (incl. 0-s) | rv4 Fold 12/12, iPad 12/12 · **rv5 Fold 12/12** · rv5 iPad running |
| scans | rv5: unseen-lists PASS (census 157 sites, UNCLASSIFIED 0) · time-advance PASS (10 paths, 10 gates) |
| coop-e2e local Worker | rv4 SWAP0 **143/143**, SWAP1 **143/143** · rv5 queued |
| save-rt-coop (robot-coop-savert 71c538df) | rv4 rows = LIVE rows (identical; 5 FAILs are LIVE's own) |
| death-rebirth / notice-late / j71day | rv5 6/6 · 2/2 · PASS |
| videos (true reload → lists / waiting cards) | rv4 Fold PASS; iPad found fault 2 (fixed). rv5 Fold: Tin báo intact, generator cards intact, ONE pid «Việc khó xử» card lost (open follow-up A) · iPad queued |
| quickcheck ALONE | NOT run yet (needs an idle box) |

### Open follow-ups (not blocking; pre-existing, not made worse)
A. **pid choice cards («Việc khó xử», j7 ev: rvbribe / rvmusk / doll / eunuch / maidhostage / condemnedmaid / rcpMama)**: written in the sổ P now, but on load deserQ → mkP rebuilds only some (in-page test: 4 written, 1 rebuilt at load, 0 left after «Tiếp tục»). On LIVE they are not even written (held). Probability có thể, nặng vừa (an unseen dilemma lost on reload), found by: the rv5 video / /home/user/wt/sul6-out/pid4.js (copy into dev/test to run). Needs its own fixer (pid family: why PEND rebuild / a later load step drops them).
B. jtsb / j68h wrappers change opts after creation (r4 risk 3) and q72o pid retitle («Phụ tuyến · …» → «Việc nhờ» after reload) — cosmetic, same family as A.
C. selection days (S.selx2) save/reload not covered by these tests (selx-* own tests).

### LEFT for the successor (all on rv5 deb9859d / stack-rv5 0cb4e389; worktrees /home/user/wt/sul6 and /home/user/wt/sulsg2 if the container lives, else fresh sparse worktrees)
1. Finish rv5: probe iPad seeds 2,3; sbr iPad; flip + rows Fold+iPad; coop-e2e SWAP0/1 (local Worker: `cd coop/worker && npm install && npx wrangler dev --local --port 8799`); spread-e2e; videos Fold 755x1000 + iPad 1180x820 (dev/test/_rvvideo.js in /home/user/wt/sul6, untracked; expect follow-up A only).
2. Stack-rv5: copy the two rv5 test files, commit, push (new commit, no force); run save-death-rebirth, probe Fold seed 2, coop-e2e SWAP0, savegrow-slot on robot saves.
3. quickcheck ALONE on the stack (`bash dev/tools/quickcheck.sh`), after every other test has stopped.
4. Then «LAND READY review/save-fix-stack-rv5 <sha> FOR MAIN 153 / LC19 (BIG; save; = save-unseen-lists rv5 + save-growth-r6 — land INSTEAD of both, e-pack-a must then drop its save-growth merge or land after)» at the END of FOREMAN_B_STATUS.md + send_message Foreman B, with the numbers above.

## REVIEW r5 (BIG rv successor, opus, session_01N1tNP3Zg2nHbRc546MNZYM, depth 3, START_CTX ≈ 3 %) — **PASS → LAND READY review/save-fix-stack-rv7 587adc6ba40be12b2b38b27c7ac08f77e2b599ca**
PRIORITY #1 CHECK ('save-fix-stack' / 'save-unseen-lists' / 'save-growth'): OD 0 | ledger 0 | claims 5NE1WTFo (predecessor, rolled) | main 0 | review/* save-unseen-lists-rv5 deb9859d, save-fix-stack-rv5 0cb4e389, save-growth-r6 ad8955e1 | archive 0 → reused the r4 handover list 1–4, every test of the branch (NOT rebuilt); helper _rvvideo.js rewritten (untracked, from the report text).
LIVE moved twice during the review: f009e1a6 → 02f564ae (ob-kiep) → 3af7896e (qc-daylife, a9 promo-root, mghelp-dress). Both merges: only index.html / sw.js conflicted (rebuilt by dev/site/build_site.sh); j3 / j42 / jtoil auto-merged (LIVE side = forgetSafe grace + toil text, no save path).

### Branches (pushed, no force)
| branch | sha | what |
|---|---|---|
| review/save-fix-stack-rv6 | 40e3ac5d611d61e215b4ef369ffc7a4a7b0f1473 | stack-rv5 0cb4e389 on LIVE 02f564ae (a0acd111) + the two rv5 test files from deb9859d + test-harness fix (40e3ac5d) |
| **review/save-fix-stack-rv7** | **587adc6ba40be12b2b38b27c7ac08f77e2b599ca** | rv6 + LIVE 3af7896e (ancestor = current origin/main) — LAND THIS |

### Fault found by this review (test harness only, no game code)
save-unseen-lists rows on 02f564ae: nl-4s FAIL (the title path «Bắt đầu kiếp mới» ran the 3 selection days → «Duyên cung lỡ hẹn», S.dead, no slot) and drift «sổ none» (it parsed the packed CTMZ sổ as JSON). Fix 40e3ac5d: selection days off on every page open (as save-boundary-reload newLife, rv5 fix 3) + drift reads through slotGet. After: rows 16/16; LIVE still FAILs nl-0s / drift / tinbao.

### Gates (rv6 = 40e3ac5d, rv7 = 587adc6b)
| check | rv6 | rv7 |
|---|---|---|
| save-residue-probe Fold seeds 1,2,3 × 40 | **PASS** 0 lines (1343 / 689 / 716 writes) | seed 2 **PASS** (685 writes) |
| probe iPad seeds 1,2,3 × 40 | **PASS** 0 lines (1248 / 1009 / 1333) | seed 1 **PASS** (643) |
| probe LIVE 02f564ae Fold seed 2 (must FAIL) | FAIL SAVE-LAG ×5 ✔ | — |
| RP_MUTATE=stipCard (must FAIL) | FAIL 3 (2 LOST + dcGate remake) ✔ | — |
| save-unseen-lists flip Fold+iPad | **16/16** | all cases Fold+iPad **24/24** |
| rows + family Fold+iPad | **16/16** (after harness fix) | (in the 24/24) |
| LIVE rows (must FAIL) | tinbao, nl-0s, drift FAIL ✔ (held: LIVE run hung > 1 h, stopped) | — |
| SUL_MUTATE nt / nl (must FAIL) | FAIL ✔ / FAIL ✔ | — |
| save-boundary-reload Fold+iPad seeds 1,2 | 23/24 → day re-run PASS = **24/24** | 21/22 → day re-run PASS = **22/22**; LIVE day FAIL (3 moments sổ ≠ screen) ✔ |
| save-death-rebirth Fold+iPad | **6/6** | **6/6** |
| notice-late-save | **2/2**, LIVE FAIL 2/2 ✔ | **2/2** |
| j71day-remake | PASS | PASS |
| save-quota-repro (year-14 robot sổ 010, 600 k other storage, 24 buổi, true reload) | **PASS** 0 write errors · lag 0 · reload 14.9.2.3 exact · slot 0.40 M | **PASS** same |
| savegrow-slot (robot sổ 001 / 005 / 010) | **ALL OK** (4.04 M→0.44 M, 0.11 M→0.02 M, 4.35 M→0.49 M; save 27–220 ms) | **ALL OK** (010) |
| coop-e2e local Worker | SWAP0 **143/143** · SWAP1 **143/143** | SWAP0 **143/143** |
| spread-e2e (6 viewports + old LIVE save) | A ×6 + B ×2 **PASS**, no page error, no h-overflow; C cannot set up (SP13 never holds a card in 120 buổi — **same on LIVE**, probe `_spc`: max SP13.L 0 on both) | — |
| scans | unseen-lists PASS (census 157, UNCLASSIFIED 0) · time-advance PASS 10/10 | same |
| videos true reload (_rvvideo, look 3×) | Fold 755x1000: date / numbers / Tin báo «26 tin mới» identical · iPad 1180x820: «Có người đến» lines kept in Tin báo «15 tin mới», identical after reload; 0 page errors | — |
| quickcheck ALONE | rv6: build OK, G1–G3 PASS, hooks 80 dialog-fixed + 90 button-crawl FAIL = **identical on LIVE 02f564ae** (pre-existing: empty Tốn/Được cell kit-dialog-2 a; «Ô lưu · Lui» close); 92 look-dedupe FAIL 3–6 = **flaky on LIVE too** (opening card «Ngày thứ nhất — Nhập cung» races the mood-seal tap; rv6 re-run PASS, LIVE re-runs FAIL 6 / 3); old-save timeout → re-run OK; perf live «not measured» = every run a day life (tool, fixed on LIVE by qc-daylife ef903bbe/66e07c03) | **QUICKCHECK PASS part** (build OK, open 2356 ms, old LIVE save loads + plays, perf day-vs-day new/live render 322/273 · tab 679/679 · buổi 2528/1806 · tasks>200 46/38, within ceilings); CORE GATES: the same 3 hooks 80 / 90 / 92 only (pre-existing, see rv6 column), G1–G3 + every other hook PASS |

### Open follow-ups (not blocking, pre-existing, not made worse)
A. pid «Việc khó xử» cards dropped on load — separate fixer (brief). B. jtsb / j68h opts wrappers + q72o retitle (r4). C. selection days save/reload (selx-* own tests). D. quickcheck hooks 80 dialog-fixed / 90 button-crawl fail on LIVE; 92 look-dedupe harness race with the first-day card. E. spread-e2e case C needs a new setup (SP13 no longer holds data cards in a plain 120-buổi run, LIVE too). F. save-boundary-reload «day» Fold seed 1 sometimes «SCREEN NOT FREE» at 1.3.1.1 under load (LIVE too).

### Gain vs risk
GAIN: the M2b/M5b save rollback (quota-swallowed writes, sổ lagging the screen by months), lost unseen cards / Tin báo lines on a true reload, and the never-saved new life are all fixed in ONE landing; LIVE fails each of these gates, the stack passes them. RISKS: (1) a later code card outside a generator — có thể, nhỏ; the census + probe FAIL at once. (2) packed sổ (CTMZ) on a browser that cannot decode it — hiếm, vừa; old plain sổ still load, export makes plain CTM2 code (savegrow-slot 4), found by savegrow-slot / quickcheck old-save. (3) save() 150–220 ms on a year-14 sổ — có thể, nhỏ; perf gates show buổi within ceilings. → **Được lớn hơn** (a whole family of real data loss is closed; every risk is small and caught by a gate).

## REVIEW r5 — UPDATE after the PASS above: LIVE moved twice more + a new LOST family → HANDOVER (rolled at ctx ≈ 32 %, START_CTX 3 % + 25 %)
The «LAND READY rv7» line above is **SUPERSEDED** (rv7 / rv8 are no longer fast-forward on LIVE). Do NOT land rv7 / rv8.
| branch | sha | what |
|---|---|---|
| review/save-fix-stack-rv8 | 433774eefc765897d9862b778ecbdd8b4e9d738b | rv7 + LIVE 1dcb373e (coop-freeze-kmrew-rv2; only assets/index/sw conflicted). Gates PASS: probe Fold s1 + iPad s1 0 lines, SUL 24/24, death 6/6, coop SWAP0 143/143, scroll-cue-loop PASS, sbr 21/22 (= known «day» SCREEN NOT FREE flake, sổ = screen) |
| **review/save-fix-stack-rv9** | **7446cd0c498280d32e55030ecef9dccfa4dee57f** | rv8 + LIVE aa37de21 (home-way-nits; only index/sw conflicted; j2 / jnotice / jshelf auto-merged, LIVE side text/BAL only) at 01bad0f6, + FIX 7446cd0c below. FF on aa37de21. |

### Fault found on rv9 01bad0f6 and FIXED (7446cd0c, LAW 11 unseen-card family)
probe iPad seed 1: LOST-AT-WRITE SP13 «Bị giật y phục giữa đường» (jty tyRob card; jeitem wrapper REPLACED its opts with eitReOpts code options after creation → not saveable → a true reload drops it; pre-existing on LIVE where the save is held instead = SAVE-LAG). Fix: registered generator `eitRob` (title, body) → the card carries rk; in-page check: rk eitRob, jqSaveable true, rcpMk remakes 4 options, in the sổ. Census 158 sites, UNCLASSIFIED 0. rv9 01bad0f6 gates before the fix: SUL 24/24, death 6/6, notice 2/2, scroll-cue-loop PASS, probe Fold s1 PASS (1313 writes), unseen-lists scan PASS.
FAMILY SCAN still TO DO (the census parses only object literals, not `x.opts=` re-assignments): `grep -n "\.opts=[^=]" dev/build/j*.js` → j75:87 (hide pregnancy), j77:221, jact2:52 (asLightOpts), jecon:90-91 (econDutyOpts stipend), jhaohuu:75, jptime:433, jselxsc:174, jstatus:23 (view panel, by design), jtoilr:66, jtsb:232-240 (follow-up B), jworld:318. For each: is the card in a generator (rk) whose remake makes the SAME opts, or a view/ACT card? Any queued card left with code opts outside a generator = same fix (route through a rcpReg generator) + add a census rule for `.opts=` re-assignment so the scan FAILs on it.

### LEFT for the successor (on review/save-fix-stack-rv9 7446cd0c; fresh sparse worktree; if LIVE moved past aa37de21 merge it → -rv10, rebuild)
1. The `.opts=` family scan + fixes above (+ census rule), commit, push.
2. Re-run on the final head: probe Fold s1,2 + iPad s1,2 (`node dev/test/save-residue-probe.js index.html ipadAir 1,2 40`), RP_MUTATE=eitRob on the seed that meets it (must FAIL), save-unseen-lists all (`SUL_FCS=1 node dev/test/save-unseen-lists.js index.html fold,ipadAir 1`), sbr (`… save-boundary-reload.js index.html bare.html fold,ipadAir 1`; bare.html = `git show origin/main:index.html`), death-rebirth, notice-late, scroll-cue-loop, coop-e2e SWAP0 (local Worker), quickcheck ALONE (known: hooks 80 / 90 same FAIL on LIVE, 92 flaky on LIVE).
3. Then «LAND READY review/save-fix-stack-rv9(or rv10) <sha> FOR MAIN 158 / LC21 (BIG; save; = save-unseen-lists rv5 + save-growth-r6 — land INSTEAD of both; e-pack-a must drop its save-growth merge or land after)» at END of FOREMAN_B_STATUS + send_message Foreman B (child 3 = session_01N1tNP5aForRyuVGCKqGrnC). Ask LC21 to land it NEXT so it stops chasing LIVE.
Helpers (untracked, write again if needed): scratch run.sh (`<name> <cmd…>` → out/<name>.txt + EXIT line), _rvvideo.js (in the r5 text above: real life N buổi, last cards left unseen, Tin báo box, true reload, same Q / NT check + 5 shots).

## REVIEW r6 (BIG rv successor, opus, session_01N1tNP3nNXSbTQpu7VdwCzq, depth 4, START_CTX ≈ 3 %) — PARTIAL (gates ~90 %) + HANDOVER (rolled at ctx ≈ 35 % > START + 25 %)
PRIORITY #1 CHECK ('save-fix-stack' / '.opts=' / 'knSell' / 'inv-stack'): OD 0 | ledger 0 | claims rv r5 3Zg2nHbR (rolled) | main 0 | review/* save-fix-stack-rv9 7446cd0c, inv-stack-rv 1ffddd68 | archive 0 → continued the r5 handover list exactly; reused every test of the branch.
**Verdict so far: no blocking fault left on rv12 25d67e01 that a gate shows; 4 save faults found and FIXED by me (below). Not LAND READY yet: LIVE moved to f573dc94 → rv13 merge + last gates left.**

### Branches (all pushed, no force)
| branch | sha | what |
|---|---|---|
| review/save-fix-stack-rv10 | 290f24534c397d84c3b16589038c854b3dfd6270 | rv9 + «.opts=» family fixes (c0219a98) + knSell fixes 1–2 |
| review/save-fix-stack-rv11 | 8108dfe1… (first parent of rv12) | rv10 + review/inv-stack-rv 1ffddd68 (5e04c538; 5 source conflicts by hand, every new .inv.push → invAdd) + inv-stack test give-return fix |
| **review/save-fix-stack-rv12** | **25d67e01ce11004766f8abe37f88d4164f485394** | rv11 + LIVE b881686f ACT-MERGE (fa4c0945: assemble.py UNION jstack + jactj4/jdoor/jdoor5) + knSell remake-side fixes 3–4. FF on b881686f, NOT on f573dc94 |

### Faults found by this review and fixed (LAW 11, whole family; before/after)
| family | sites | before (rv9) | after |
|---|---|---|---|
| `.opts=` given after the card was made (census never parsed it) | 18 sites scanned: j75 pregFind, jtsb ×5 (approachOne wrappers), jtoilr ×2 → FIXED; jecon / jptime / jworld / jeitem inside a generator; jselxsc pid; j77 / jact2 her act; jhaohuu / jstatus panel; jcoopthin co-op copy; jnolock noop | census + new rule: 8 UNCLASSIFIED; opts-asg-remake FAIL 6/6 («Thái y bắt mạch» LOST at the week flip; jtsb answers / Thái hậu triệu / servant defect came back as j24's plain card; jtoilr 4 answers missing) | UNCLASSIFIED 0; opts-asg-remake PASS 7/7 (rcpReg pregFind, rcpReg tsbAp, QRC.toilPop remake hook) |
| census scanner itself | unseen-lists-scan CLASS check read c[3] (the reason) as the class → no ROUTE proof was ever checked | — | c[2]; every ROUTE proof now holds |
| generator arguments not data («Có người bán tin», jagknow knSell: news object carries code) | probe iPad s1 rv10 LOST-AT-WRITE | rcpEnc threw silently → no rk → left out of the step write | card carries seller + news AS DATA (code left out); remake reads the live news by id (keeps the follow-up), else the carried copy; rcpReg now marks `m.__rkErr` and the probe names such a generator |
| knSell remake side | probe Fold s2 / iPad s1 REMAKE-SIDE | live read rolled S.tb (knTb / knNo roll on read) and made empty lazy stores (S.intel, S.j95 lists) | put back as they were (25d67e01); new test dev/test/knsell-remake.js (30 buổi real life, every seller × news remade, S diff): PASS 19 / 21 cards, 0 touched |

### Gates (rv11 = 5e04c538/8108dfe1, rv12 = fa4c0945 → 6c4ff6b5 → 25d67e01)
| check | result |
|---|---|
| unseen-lists scan / census | PASS (33 lists; 181 sites, 18 «.opts=», UNCLASSIFIED 0) — rv9 build with the new rule FAILs 8 ✔ |
| time-advance scan | PASS 10/10 |
| inv-stack-scan.py | RAW 0 (rv11, rv12) |
| inv-stack.js (s7 robot save, year 18, 1,437 inv) | rv11 / rv12: 25/27 — the 2 FAILs = DOM «Biếu quà làm lành» 2226 nodes (K-LIST-PAGE) = **identical on plain inv-stack-rv 1ffddd68** (A/B same box); save 4,757,978 → 401,324 chars, totals + store equal after reload. Fixer 3tHDZmhE's 3rd row (give 1 refused «trả lại») = test → hardened (8108dfe1) |
| save-residue-probe | rv11: Fold s1,2 **0 lines**; iPad s1 REMAKE-SIDE knSell ×1 (fixed) · rv12 6c4ff6b5 iPad s1 REMAKE-SIDE knSell [S.tb] (fixed in 25d67e01) · **25d67e01 Fold s1,2 + iPad s1,2 RUNNING at handover** (out: scratch o12/probeF.txt, probeI.txt) |
| save-unseen-lists all (Fold+iPad) | rv10 (killed half-way, Fold 12/12) · **rv12 24/24** |
| save-boundary-reload Fold+iPad (bare = LIVE) | **rv12 22/22** |
| save-death-rebirth | rv10 6/6 · rv12 6/6 |
| notice-late-save | rv10 2/2 · rv12 2/2 |
| scroll-cue-loop / j71day-remake | PASS / PASS (rv10, rv12) |
| opts-asg-remake (new) | rv9 FAIL 6/6 · rv10–rv12 PASS 7/7 |
| coop-e2e SWAP0 local Worker | **rv12 143/143** |
| quickcheck ALONE | NOT run yet |

### LEFT for the successor
1. Read the probe result on 25d67e01 (if the container lives: /tmp/claude-0/…/scratchpad/o12/probe{F,I}.txt, else run again: `node dev/test/save-residue-probe.js index.html fold 1,2 40` and `… ipadAir 1,2 40`, worktree from review/save-fix-stack-rv12). Any new line → same LAW 11 fix + before/after.
2. LIVE = f573dc94 (charge-trinh-punish restacked on b881686f + test-only bd0007fe). Merge it → review/save-fix-stack-rv13. Foreman B merge-tree: SOURCE conflicts dev/build/j8.js, jil.js, jtsb.js + assemble.py (+ index/sw). Keep BOTH: my jtsb tsbApCard generator (rcpReg tsbAp; the two approachOne wrappers only pick who comes and Object.assign the generator card) + ctp's deed / punish / «Báo lên Hoàng hậu» needs; if ctp changed the answers inside the old `m.opts=[…]` blocks, move its change INTO tsbApCard. assemble.py = UNION of module lists (each new file after its predecessor). Rebuild (bash dev/site/build_site.sh), never while a test reads index.html.
3. On rv13: unseen-lists scan + census, inv-stack-scan, opts-asg-remake, knsell-remake, save-unseen-lists all, sbr (bare = LIVE f573dc94 index), death, notice, probe Fold s1 + iPad s1, coop SWAP0 (`cd coop/worker && npm install && npx wrangler dev --local --port 8799`, then `node dev/test/coop-e2e.js <out> http://localhost:8799`), inv-stack.js (expect the 2 K-LIST-PAGE rows), then quickcheck ALONE (`bash dev/tools/quickcheck.sh`; known pre-existing: hooks 80 / 90 FAIL on LIVE, 92 flaky).
4. Then «LAND READY review/save-fix-stack-rv13 <sha> FOR MAIN 161 / LC24 (BIG; save; = save-unseen-lists rv5 + save-growth-r6 + inv-stack-rv 1ffddd68 — land INSTEAD of all three; supersedes rv9 7446cd0c / rv10–rv12; covers F's ~5.2 M-char silent save-write failure: packed sổ, s7 4.76 M → 0.40 M, full store → sticky «saveBlocked» notice; inv-stack.js 2 FAIL = K-LIST-PAGE gift picker DOM, same on plain inv-stack-rv; FF onto LIVE f573dc94; Worker deploy: no)» at END of FOREMAN_B_STATUS.md + «## REVIEW r7» here + send_message Foreman B (child 4 = session_01N1tNP6QLnHwEWxnwvUVvhp) + tell the save-pid-cards fixer session_01N1tNP3tHDZmhEaxQ1fmrKZ the final sha.

### Open follow-ups (not blocking)
A–F of r5 unchanged. G. knSell: a habit news (j95 random habit pick) is often not found by id at the remake → the carried copy is used: the text and price are the same, but buying it after a reload does not mark the habit «told» (follow-up only; hiếm, nhỏ). H. inv-stack K-LIST-PAGE gift picker DOM > 2,000 nodes (its own branch's open item).

### Gain vs risk
GAIN: four more ways a waiting card was lost or changed by a reload are closed (pregnancy choice, visitor answers, reaction answers, news seller), and the census can no longer miss a `.opts=` card or a ROUTE row whose proof is gone. RISKS: (1) a generator whose args are not data — có thể, nhỏ; rcpReg marks it, the probe names it at once. (2) S.tb put back after the live read — hiếm, nhỏ; the next render makes the same roll; knsell-remake + probe check S. → **Được lớn hơn**.

## INDEPENDENT CHECK (B CHECK sonnet, read-only; save-fix-stack rv9 7446cd0c → rv12 25d67e01)
PRIORITY #1 CHECK: brief b-save-stack-rvcode-check.md; reused the reviewer's own tests; no code committed. Scope = game source dev/build + dev/test only.
Method: step diffs / `git show --cc` for merges; mutate = patch the built index.html (revert one hunk) and run the node test; pre-fix build = index.html at 7446cd0c.
| hunk | file:line | verdict | why |
|---|---|---|---|
| j75 «Thái y bắt mạch» → rcpReg `pregFind` (body, canHide) | j75.js:87-94 | OK | same card/answers; people/ids only; census catches it (mutated: UNCLASSIFIED 1 j75.js:91). MUTATE (rcpReg removed): opts-asg-remake pregFind FAIL 3/3; pre-fix build FAIL. Note: no-opts branch (canHide false, btn only) has no rk — same as before, not a regression |
| jtsb visitor answers → ONE generator `tsbAp` (mock/ally/sorry/th/sv) + Object.assign onto the j24 card | jtsb.js:231-250 | OK | answers identical to old inline code; people as ids; null guards (v/s missing → null, card kept as j24 made it). MUTATE (rcpReg removed): mock/ally/thCall/svDefect FAIL 3/3. Old saves with rk «ap.*» still remake via j24 (j24 answers, as before the fix) |
| jtoilr QRC.toilPop remake hook adds the 4 reaction answers | jtoilr.js:68-73 | OK | live path untouched (rcpReg closure); remake adds once (toilRx flag); toilRxOpts reads only host/n/name (all in ra); module order jtoil(248) < jtoilr(249). MUTATE: toil rx FAIL |
| jagknow knSell carries news as data (knSellData) + knSellById + wrapper | jagknow.js:586-606 | OK (with notes) | rk now set, remake finds live news by id else carried copy; try/catch marks __rkErr (probe names it). MUTATE (wrapper off): knSell FAIL — but see test row concern below |
| jagknow carried-copy fallback (live news gone) | jagknow.js:603 | CONCERN (low) | the copy has the fact's `go` removed; if the live fact is gone and she buys, `n.f.go()` is skipped. For the «Sủng vừa lên/xuống» fact (knFavFact) go sets S.kf[o.id] → the same favour fact can be offered again later (duplicate news). Rare (needs the news to vanish between save and load), small |
| j3 rcpReg `__rkErr` mark | j3.js:49 | OK | only sets a debug field in the catch; no behaviour change |
| opts-asg-remake.js row `knSell` | test:27-29 | CONCERN (low) | when no seller has news it prints PASS with `skip` (same:true) → cannot FAIL. In my 3 mutate runs it was skipped 2 of 3 times (mut_kn caught only on the run that had a seller). The knsell-remake.js test is the real cover |
| other rows of opts-asg-remake.js | test | OK | real round trip serQ→JSON→deserQ comparing title+options text+fx; every row FAILs on the pre-fix build and on its own mutate |
| rv11 j29 svMarketCard | j29.js:62 | OK | generator + `invAdd(S,{k})` (both sides merged); Q.push inside generator is handled by rcpMk |
| rv11 jallot alNpcSpend / alInit / alStaffGive | jallot.js:65,67,113 | OK | LIVE ilUsedUp / ilStock (E-FIX-3) kept AND invAdd kept in each |
| rv11 jration lxGive | jration.js:154-156 | OK | LIVE ilUsedUp kept + `invAdd(to,g)` |
| rv11 jstip stipGoods | jstip.js:103-105 | OK | ilStockTake → `invAdd(p,e)`; invTop before the keep trim; trim keeps ilStock(e,1,p). Union of both sides, no piece dropped |
| rv11 jts tsLeHost gift | jts.js:275 | OK | `invAdd(S,…)`; tsLeMeCard generator from the other parent exists (jts.js:283) |
| rv11 inv-stack scan | dev/test/inv-stack-scan.py | OK | RAW 0 (I ran it). Only KMSNAP.inv / display fixtures remain |
| rv11 give-1 test relaxation | inv-stack.js:64 | OK (read only) | accepts only «trả lại» text AND both counts 0; a lost piece (hers −1, NPC 0) still FAILs. I could not run inv-stack.js here (needs dev/index.html: assemble.py wants rank/ + the robot save) |
| rv12 assemble.py module UNION | assemble.py:14 | OK | I diffed the lists: stack added jstack; LIVE added jactj4/jdoor/jdoor5; result has all, 0 duplicates, 0 removed, both relative orders kept, each after its LIVE predecessor |
| rv12 knSellLive restore of lazy stores + S.tb | jagknow.js:592-601 | CONCERN (low) | (1) S.tb restore is a JSON round trip: nested arrays/objects (K, R, W, no…) are replaced by copies (identity lost) and any non-JSON value would be damaged; whole restore sits in `catch(e){}` so a throw (e.g. a newly made S.j95 = non-object → Object.values throws) silently skips the S.tb restore. (2) knCarryIn side effects on S.tb.W/C are inside tb only → covered. Fault is invisible; the probe (S / NT ids / Q.length) is the only guard |
| rv12 save-residue-probe names touched S keys | probe | OK | debug text only |
| rv12 knsell-remake.js | test | CONCERN (not verified) | does not finish in my sandbox: 30 buổi → killed at 560 s, 5 buổi → killed at 110 s (page.evaluate never returns; harness __sbr.after wait). So I could NOT run it or MUTATE fixes 3/4. Reviewer reports PASS 19/21 cards, 0 touched: "19 of 21" means 2 cards had no rk/remake — not explained in the commit message; ask the reviewer which 2 and why |
| law 4 (typed numbers) in all hunks | — | OK | no new number; `tsbKh(2)` / «2 khắc» in the th answer is moved old code (pre-existing, not new) |
| law 11 siblings of `.opts=` | j77:221, jact2:52, jecon:90-91, jhaohuu:75, jptime:433, jselxsc:174, jstatus:23, jworld:318 | OK | each has a census row (ROUTE with a code proof / ACT / PANEL); the ROUTE proof now really runs (reviewer fixed c[3]→c[2]); census 181 sites, UNCLASSIFIED 0 (I ran it). jact2 festival card is classed ACT (arrival act) — same precedent as the other ACT rows, but it sets S.adFest before the card is shown: a reload with that card unseen would lose it (probe never met it; low) |
Result: OK 14 / CONCERN 4 (all low; none blocks a landing). Not run here: inv-stack.js, knsell-remake.js (sandbox).

## REVIEW r7 (BIG rv successor, opus, session_01N1tNP2rXGixcTVd1GkYr9V, depth 5, START_CTX ≈ 4 %) — PARTIAL (gates ~85 %) + HANDOVER (rolled at ctx ≈ 28 % ≥ START + 25 %)
PRIORITY #1 CHECK ('save-fix-stack' / 'tsbAp' / 'knSell' / 'visitor'): OD 0 | ledger 0 | claims rv r6 3nNXSbTQ (rolled) | main f573dc94 → 53319e6f → 03a8c17c | review/* save-fix-stack-rv12 25d67e01 | archive 0 → continued the r6 LEFT list; reused every test of the branch.
**Verdict so far: no blocking fault left that a gate shows; 1 new save family found and FIXED (visitor cards); the 4 INDEPENDENT CHECK concerns answered + fixed. Not LAND READY yet: last gates on rv15 left.**

### Branches (all pushed, no force; each FF on the LIVE of its time)
| branch | sha | what |
|---|---|---|
| review/save-fix-stack-rv13 | 9348cf6bbf3260d49944490f9f376ec5865c75b0 | rv12 + LIVE f573dc94 (cad119aa: assemble UNION +jpun/jcharge; j8 invAdd + ilSeize; jil ilGone e.used + o.keep; jtsb tsbApCard kept, ctp's only in-block change deedW("sbribe") moved INTO it) + C1–C3 fixes |
| review/save-fix-stack-rv14 | 2db369966c148fa098eb097e7065a57e963eadae | rv13 + LIVE 53319e6f (1a483cfd: jts tsWarn generator keeps LIVE's new first answer tsOptMend(xv); KIT_REQUESTS union) + r7 FIX visitor cards (2db36996) |
| **review/save-fix-stack-rv15** | **273c64c3758a3ccd2ac036c6f338cb617de3cf7c** | rv14 + LIVE 03a8c17c (built only) + time-advance scan registers the new save wrapper + knsell-remake C4 hardening. FF on 03a8c17c — LAND THIS (after the gates below) |

### INDEPENDENT CHECK answers (sonnet 3Zj12NeY, 4 CONCERN)
| # | concern | answer | proof |
|---|---|---|---|
| C1 | knSell carried copy has no `go` → a «Sủng vừa lên/xuống» fact can come again | ACCEPTED, fixed: knCarryGo — the live fact with the same key about the same person runs its go; favour (fav / sung, both S.kf) → a newer favour fact stands in | opts-asg row «knSell carried go» PASS (kf = sung); MUTATE (fix off) FAIL kf −15 vs 122 |
| C2 | opts-asg knSell row PASSes on a skip | ACCEPTED: the row forces real news (S.kf favour) when no seller has any; skipped rows can no longer PASS | 9/9 rows PASS on rv14 |
| C3 | S.tb restore = JSON round trip in a silent catch | ACCEPTED: S.tb put back BY REFERENCE (top-level stores the roll re-assigns, knNo's T.no); a store changed in place falls back to a copy + console.warn; every throw logged + counted in window.__knLive | knsell-remake PASS on the fix |
| C4 | knsell-remake not mutation-checked; «19/21 cards» | ACCEPTED: the old test could not FAIL (mutants PASSed: the roll / lazy stores were already made by the test's own read). Hardened: before each remake S.tb.no.k is made stale and S.intel / S.j95 are taken away (put back after the S check). «19/21» = the number of seller × news cards in two lives (the count varies by life; every card had rk; no card is skipped) | fix PASS (10 cards); mutTb (S.tb restore off) **FAIL** 22/22 touched S.tb.no.k ✔; mutLazy (lazy cleanup off) re-run with the final version RUNNING at handover (o/f_knmut3) — successor: re-run `node dev/test/knsell-remake.js index.html mutLazy.html` (mutLazy = build with the `for(const k of Object.keys(S))if(!k0.has(k)…)delete S[k];` line removed) → must FAIL |

### Fault found by this review and FIXED (LAW 11 + 6b, whole family: every visitor card j24 ap.* + tsbAp)
probe Fold s1 (rv12 25d67e01 AND rv13 9348cf6b): `REMAKE-FAIL tsbAp: Có người đến [person gone ["sv","<p>Liễu Nhi, cung nữ bên cung Tề Thải Vi … xin theo ngươi]` — the servant left every staff list (dismissed / framed out / dead) while the card waited: a reload drops it, the live game kept offering «Thu làm tai mắt» on a person no longer there. Fix (jtsb, 2db36996): rcpVisitGone / rcpVisitPurge — a waiting visitor card whose people are gone is withdrawn before a card is shown and at every save (the card on screen stays). Test row «visitor gone withdrawn» PASS; MUTATE (purge off) FAIL. The probe now names WHY a REMAKE-FAIL happened (rcpMk reason). time-advance scan: new wrapper registered (never holds).

### Gates
| check | rv13 9348cf6b / cad119aa | rv14 2db36996 | rv15 273c64c3 |
|---|---|---|---|
| inv-stack-scan RAW / census UNCLASSIFIED / time-advance | 0 / 0 / 10 PASS | 0 / 0 / (wrapper unregistered → fixed in rv15) | 0 / 0 / PASS 11 gates |
| punish-scan / seize-scan / charge-scan | 0 / 0 / 0 | 0 / 0 / 0 | — |
| save-unseen-lists all Fold+iPad | 24/24 | **24/24** | — |
| opts-asg-remake | 7/7 → 8/8 | **9/9** | — |
| knsell-remake | PASS (11 cards) | fix PASS, mutTb FAIL ✔ | — |
| charge-trinh-punish / charge-followups / seize-ledger / cold-faction | ALL PASS ×4 | — | — |
| punish-reason Fold / iPad | ALL PASS / ALL PASS | — | — |
| inv-stack.js | 25/27 = the 2 known K-LIST-PAGE rows (gift picker DOM 2,226 / Dâng quà 2,319) | — | — |
| ob-oan.js | — | 24/24 | — |
| ob-oan-enc / kit-gloss-lower | — | first run raced my rebuild (not valid); re-run RUNNING (o/f_enc, f_kgl) | — |
| probe save-residue | rv12 Fold s1 1 line → fixed; Fold s2 0 | iPad s1,2 **0 lines** · Fold s1,2 RUNNING (o/f_pF) | — |
| save-boundary-reload (bare = LIVE 53319e6f) | — | iPad seed 1 PASS seen; full result RUNNING (o/f_sbr) | — |
| death / notice | — | queued (o/f_death, f_notice) | — |

### LEFT for the successor (on review/save-fix-stack-rv15 273c64c3; fresh sparse worktree; if LIVE moved past 03a8c17c merge it → rv16, rebuild, re-run the scans)
1. On rv15: probe Fold s1,2 + iPad s1 (`node dev/test/save-residue-probe.js index.html fold 1,2 40`, `… ipadAir 1 40`), sbr (`… save-boundary-reload.js index.html bare.html fold,ipadAir 1`, bare = `git show origin/main:index.html`), death, notice, knsell-remake (+ mutLazy must FAIL, see C4), ob-oan-enc (`node dev/test/ob-oan-enc.js . -`; compare with plain LIVE if it FAILs), kit-gloss-lower, opts-asg-remake, coop-e2e SWAP0 (`cd coop/worker && npm install && npx wrangler dev --local --port 8799`; `node dev/test/coop-e2e.js <out> http://localhost:8799`), then quickcheck ALONE (`bash dev/tools/quickcheck.sh`; known pre-existing: hooks 80 dialog-fixed / 90 button-crawl FAIL on LIVE, 92 flaky).
2. Then «LAND READY review/save-fix-stack-rv15 <sha> FOR MAIN 163 / LC25 (BIG; save; = save-unseen-lists rv5 + save-growth-r6 + inv-stack-rv 1ffddd68 — land INSTEAD of all three; supersedes rv9–rv14; covers F's ~5.2 M-char silent save-write failure; inv-stack.js 2 FAIL = K-LIST-PAGE gift picker DOM, same on plain inv-stack-rv; FF onto LIVE 03a8c17c; Worker deploy: no)» at END of FOREMAN_B_STATUS.md + mirror in MAIN_STATUS.md + send_message Foreman B child 4 session_01N1tNP6QLnHwEWxnwvUVvhp + tell save-pid-cards fixer session_01N1tNP3tHDZmhEaxQ1fmrKZ the final sha.

### Open follow-ups (not blocking)
A–H of r5/r6 unchanged. I. A non-visitor rk card whose person dies / leaves while it waits is still dropped only on a reload (rcpMk person gone) — the purge covers the visitor family only (a death-related card must not vanish live); hiếm, nhỏ; the probe names any such line with its reason.

### Gain vs risk
GAIN: the stack is FF on LIVE 03a8c17c with ctp + ob-oan + renderer-mem; the knSell remake can no longer lose a follow-up or roll S.tb silently; a visitor who left the palace no longer leaves a ghost card (live = reload). RISKS: (1) the purge drops a visitor card whose person is only briefly missing from every list (e.g. a servant mid-transfer) — hiếm, nhỏ; opts-asg + probe show it, the card's maker can re-offer it. (2) knCarryGo runs a newer favour fact's follow-up (she «knows» the current Sủng, the text she bought is older) — có thể, nhỏ; the next Sủng change is offered as news again. → **Được lớn hơn** (two save-loss paths closed, every risk small and caught by a gate).

## REVIEW r8 (BIG rv successor, opus, session_01N1tNP4iUdmBPnqSx74gVJM, depth 5, START_CTX ≈ 4 %) — **PASS → LAND READY review/save-fix-stack-rv21 61085ce07f3336cc52e71a14daf42a96a7456351**
PRIORITY #1 CHECK ('save-fix-stack'): continued r7's LEFT list on rv15 273c64c3; reused every test of the branch; LIVE moved 6× during the review → merged each time (no force).
### Branches (all FF on the LIVE of their time)
| branch | sha | LIVE | merge |
|---|---|---|---|
| rv16 | 3bb55b12 | 504d2e6a (os stack) | assemble UNION (+jnsieve/jverdict), KIT_REQUESTS both |
| rv17 | 3dcabd75 | 4cfcda61 (pace-all + stat-pace) | jts: tsLeMeCard generator kept, LIVE's lì xì «thiện cảm BAL.eff.jts.liXiAff» moved INTO it; assemble UNION (+jmend/jbalsp/jstatpace/jevc) |
| rv18 | 35fb4542 | a22cf45d (wording-gain + firstcard-3) | jne: generator kept, LIVE's «Đáp lại» odds-word hint moved INTO it |
| rv19 | 6e1f0c02 | fa722503 (title-bal) | sources auto-merged |
| rv20 | 08e36be0 | 540358c4 (wording-marks) | sources auto-merged (stack does not touch j19/j63/jbal/jk2b) |
| **rv21** | **61085ce07f3336cc52e71a14daf42a96a7456351** | **17f23656 (end-maxrank)** | j3/j42 auto-merged (record()/ending rank only, no save code); built rebuilt — LAND THIS |
### Gates
| gate | result |
|---|---|
| probe save-residue Fold s1,2 / iPad s1 (rv15) | 0 families, 0 page errors |
| save-death-rebirth (rv15) | 6/6 |
| notice-late-save | rv15 / rv17 / rv19 PASS |
| opts-asg-remake | 9/9 on rv15, rv17, rv18, rv19, rv20 |
| knsell-remake + mutLazy (C4) | PASS on rv15/17/18/19; mutLazy **FAIL** every time ✔ (S.intel / S.j95 touched) |
| save-unseen-lists Fold+iPad | 32/32 on rv17, rv18, rv19 |
| coop-e2e SWAP0 (rv17) | 143/143 |
| stat-pace / pace-all (rv17) | PASS (LIVE PASS) / 32/32 |
| wording-gain-scan / odds-word-rule (rv18) | 0 left / PASS |
| title-bal (rv19) | PASS (LIVE PASS); title-sys / title-sys2 FAIL rows ⊆ LIVE fa722503's own FAIL rows |
| marks-choice-scan (rv20) | 0 numbers, 0 errs |
| kit-gloss-lower (rv15) | PASS |
| quickcheck ALONE (rv20) | QUICKCHECK PASS core (perf new/live render 193/214, tab 546/654, buổi 1586/1768 ms); G4 90-button-crawl FAIL = pre-existing (below) |
| scans every rv | inv-stack RAW 0 · census UNCLASSIFIED 0 · time-advance PASS 11 gates · punish/seize/charge 0 |
### Pre-existing (A/B on LIVE, not this stack)
1. sbr fold «day seed 1 SCREEN NOT FREE» (0 sổ≠screen): LIVE 03a8c17c same state {modal shown, Q []} 2/4 vs stack 2/4. ROOT (debug copy of the test): every NOT FREE follows the harness's forced `Q.shift()` (sameM ≥ 3) on «Hội phối đồ: báo đề» when its pick «Sai tai mắt dò bên chủ hội» is refused/deferred by a chooseM wrapper; the harness drops the card WITHOUT showModal → the modal stays on screen. TEST HARNESS fault, not a stuck card for a player (she taps «Đã hiểu»). Follow-up J (test): the harness should skip need-unmet / locked options and call showModal after a forced shift.
2. G4 button-crawl «Ô lưu · Lui» close button: LIVE 540358c4 FAIL 2/2, stack same.
3. look-dedupe: LIVE FAIL 7, stack FAIL 6.
4. ob-oan-enc Fold «Nguy hiểm chung» blocks the «Làm lành» card: LIVE FAIL 2/2, stack 2/3 PASS.
### Open follow-ups (not blocking)
A–I of r5–r7 unchanged. J = item 1 above (harness fix).
### Gain vs risk
GAIN: the save-loss cure (silent ~5.2 M-char write failure, E's QuotaExceeded, lost waiting cards) lands on today's LIVE with every LIVE change of the night kept. RISKS: (1) a hand merge of jts/jne dropped a LIVE change — hiếm, nhỏ; each LIVE hunk was moved in by text and checked in the built page (old wording 0, new wording present). (2) LIVE moves again before landing — có thể, nhỏ; built-only conflicts → LC26 restacks. → **Được lớn hơn**.

## LOOK-DEDUPE FIX (rv22) (fixer opus, session_01N1tNP2WGctyD7uE2CnSUuN, for Foreman B ROOT 2 child 5; LC26 hold)
PRIORITY #1 CHECK ('look-dedupe'): reused dev/test/look-dedupe.js + quickcheck.d/92; r6/r8 notes «92 flaky on LIVE too / LIVE FAIL 7» explained below; no new test file.
**Verdict: STACK GAME CODE INNOCENT — the fault is the rv21 harness edit.** save-unseen-lists r3 added `nlAccept(false)` to the setup of look-dedupe.js (so the unseen identity card no longer comes back in the last check). On a tú nữ life, accepting starts the 3 selection days (jselxday nlAccept wrap) and `selxRefill` puts «Ngày thứ nhất — Nhập cung» back after every render → the mood-seal tap, the ✕ tap and the kit-notice round trip all met the day card. Check (3) was a cascade (Q held the day card → q 2, body = day card), NOT a lost kit body.
Why the runs disagreed: quickcheck runs each tree's OWN test file. Lander: LIVE tree + LIVE test = PASS, rv21 tree + rv21 test = FAIL 6. r8 ran the rv21 test on the LIVE page = FAIL 7. Not env/port/timing.
### A/B (serve tree, cp index.html _aa.html, http://127.0.0.1:PORT/_aa.html, Fold + iPad each run)
| game page | test file | runs | result |
|---|---|---|---|
| LIVE 17f23656 | LIVE test | 4 | PASS ×4 |
| rv21 61085ce0 | rv21 test | 4 | FAIL 6 / 9 / 7 / 7 (rows 1, 2, 3 per device; +«P 1» under load) |
| LIVE 17f23656 | rv21 test | 1 | **FAIL 6 (same 3 rows)** → harness, not stack |
| rv21 | LIVE test | 1 | FAIL 2: «save + load with Tâm trạng open» Q 1 = «Thân phận kiếp này» = the save-unseen-lists cure (identity card unseen while the new-life panel is open), the reason r3 edited the setup |
| rv22 | rv22 test | 4 (incl. quickcheck G4 92) | **PASS ×4** |
| LIVE 17f23656 | rv22 test | 3 | FAIL 2 ×3 = only the NEW row (identity card lost on LIVE) = base FAIL |
| rv22 + LD_MUTATE=kit (kit spec dropped at save) | rv22 test | 1 | **FAIL 2** (kit rows) = mutation caught |
### Fix (test + scan only, NO game code): review/save-fix-stack-rv22
1. look-dedupe.js setup: after nlAccept, a life still in its selection days is ended for the harness (`S.selx2.days=0;done=1`).
2. check (3) runs on its own queue (whatever waits stays aside) over 3 notice shapes a restore reads: kit notice about her (subject S), kit notice about another person (@p id), plain text notice → each saved with its spec, back ONCE with its body.
3. NEW check: save + load with the new-life panel open → «Thân phận kiếp này» back exactly once, no look-up (LIVE FAIL, stack PASS).
4. unseen-lists-scan census: row jopic kitHowPanel «Cách làm» = PANEL (UNCLASSIFIED 1 → 0; LIVE code, a panel she opens, never saved by design).
LAW 11 (saved fields a restore / re-shown modal reads): kit notices (her / other person) KEEP — round trip proven; text notices KEEP; look-up / view panels NOT SAVED by design (checks 2,4,5); identity card (unseen) KEEP (new check); pid / rk cards KEEP (probe 0 families, knsell, SUL); jevc daily cap on a remade card = fixed in save-pid-cards b385df9b (not touched here).
### Gates on rv22 (game code = rv21, byte-identical)
| gate | result |
|---|---|
| look-dedupe ×3 Fold+iPad (+ G4 92 in quickcheck) | PASS ×4; base rv21 FAIL; mutate FAIL |
| save-unseen-lists Fold+iPad (SUL_FCS=1) | 24/24 PASS |
| probe save-residue Fold s1 / iPad s1 | 0 families, PASS |
| save-death-rebirth | PASS |
| notice-late-save | PASS Fold + iPad |
| knsell-remake / mutLazy | PASS 13 cards / mutLazy **FAIL** ✔ (S touched 17) |
| inv-stack-scan | RAW 0 |
| census (unseen-lists-scan) | UNCLASSIFIED 0, SCAN PASS (33 lists) |
| time-advance-save-scan | PASS (10 paths, 11 gates) |
| coop-e2e SWAP0 (local Worker) | 143/143 |
| quickcheck ALONE | QUICKCHECK PASS (old save ok; perf new/live render 243/213, tab 570/578, buổi 1183/1442 ms); CORE G4 90 button-crawl FAIL «Ô lưu · Lui» = **identical on LIVE 17f23656 same run** (pre-existing, r8 item 2); every other G4 hook PASS |
Old saves (d): quickcheck «old save ok»; SUL / death on LIVE-format paths PASS; no save code changed.
Note: LIVE moved to 066d9af0 meanwhile; rv22 = FF on 17f23656; no gate needed a merge (lander restacks built-only conflicts).
### Gain vs risk
GAIN: the LC26 hold is lifted without touching game code; the gate now really tests the kit-notice round trip (mutation-proven) and the identity-card cure. RISK: (1) ending the selection days in the harness hides a look-up bug that only shows during those days — hiếm, nhỏ; selx-* tests own those days. (2) LIVE moved past 17f23656 — dễ xảy ra, nhỏ; built-only restack. → **Được lớn hơn**.

## LOOK-DEDUPE FIX — rv23 (LIVE 4cd3f974 merged; Foreman B order 27/11 ~05:30Z)
PRIORITY #1 CHECK ('jlooks jslap mg-trim kptitle-close'): LIVE branches mg-trim (69beb3e2/b8ea33be, test dev/test/mg-trim.js) and kptitle-close (a809ab25, G4 90) reused; no new game code beyond the merge.
**review/save-fix-stack-rv23 15bd0e2989f54e6b81f7449d65d8f0484ff36d84** = rv22 + LIVE 4cd3f974 (dayq q-softlock + mg-trim + parity-facfix + kptitle-close).
### Merge hunks (SOURCE conflicts, both sides kept)
| file | stack side (rv22) | LIVE side (mg-trim) | resolution |
|---|---|---|---|
| jlooks.js NPC look act on her | card built by registered generator `lkCard = rcpReg("lkNpc")` (saved in the sổ, made again on load) | «Né» = ONE roll of the shown odds (`roll(dOd)`), no slapGame board; bot test without slapGame/kg82Open | generator kept; its «Né» option = LIVE one-roll option verbatim; wrapper bot test = LIVE's |
| jslap.js NPC slap on her | `slapCard = rcpReg("slapNpc")` + `window.SLAP_R0=r0` | «Né đòn» = ONE roll, no game | generator kept; its «Né đòn» option = LIVE one-roll option verbatim; bot test unchanged (= LIVE) |
| index.html / sw.js / assets.json | built | built | rebuilt (build_site.sh) |
Merge check (scratch, both devices): slapNpc + lkNpc cards made → saved as rk → made again from the sổ once; options «Né đòn/Chịu đòn», «Né/Đứng yên»; tapping «Né» opens no game frame (slapGame calls 0); no page errors → PASS Fold + iPad. LIVE's own test mg-trim.js: ALL PASS.
### Fault found on rv23 and FIXED (test harness, LAW 11 same family as look-dedupe)
G4 90 button-crawl «Ô lưu · Lui» FAIL on rv23 while LIVE 4cd3f974 PASS (kptitle-close). Root: the crawler's home start makes a life and never accepts «Thân phận kiếp này»; the stack writes the sổ while that card is open (hclh-save-v2-3 14.5 K chars on rv23, none on LIVE — proven in page), so ✕ → tgFix → resumeGame rightly brought the open identity card back (shot: identity card) = what a player sees. Fix: button-crawl home start accepts the identity card as a player (+ ends a tú nữ life's selection days), same as look-dedupe/sbr. Before/after: rv23 FAIL 1 → PASS ×3 (2 alone + quickcheck); LIVE with the fixed harness PASS.
Family scan (tests whose life setup skips the accept and then reads Q / modal / ☰): look-dedupe (fixed rv22), button-crawl (fixed rv23); the other quickcheck hooks (85 dead-card, 93 press-keep, 94 q-softlock, 95 next-dead, 80 dialog-fixed) PASS on rv23.
### Gates on rv23 (be9c66eb merge, 15bd0e29 head)
| gate | result |
|---|---|
| look-dedupe ×3 Fold+iPad | PASS ×3 (+ G4 92 PASS) |
| save-unseen-lists (SUL_FCS=1) | 24/24 PASS |
| probe save-residue Fold s1 / iPad s1 | 0 families PASS |
| death / notice | PASS / PASS Fold+iPad |
| knsell / mutLazy | PASS 8 cards / **FAIL** ✔ (S touched 12) |
| inv-stack-scan · census · time-advance | RAW 0 · UNCLASSIFIED 0 (33 lists) · PASS 11 gates |
| coop-e2e SWAP0 (local Worker) | 143/143 |
| mg-trim.js (LIVE's test for jlooks/jslap) | ALL PASS |
| quickcheck ALONE (15bd0e29) | **CORE GATES PASS** (hooks 13, incl. 90 button-crawl PASS) · QUICKCHECK PASS · old save ok · perf new/live render 213/218, tab 514/517, buổi 1331/1131 ms |
LIVE moved again to 98c77517 (ob-verdict-3: jverdict/jkitpage): merge-tree = index.html + sw.js only (built) → lander restacks; no source conflict.
### Gain vs risk
GAIN: save stack lands on today's LIVE with mg-trim and kptitle-close kept; every core gate PASS. RISKS: (1) hand merge of jlooks/jslap lost a side — hiếm, vừa; both sides checked in the built page by the merge check + mg-trim.js + probe (generator remade clean) → an independent hunk check is planned by Foreman B. (2) the harness accept hides a ☰ path only seen while the identity card is open — hiếm, nhỏ; that path resumes the card, the right screen. (3) LIVE moved (98c77517) — built-only, lander rebuilds. → **Được lớn hơn**.

## MERGE rv24 (merger opus, session_01N1tNP5uYBZmKPzMdYHkuQN, for Foreman B ROOT 2 child 5; brief b-save-stack-rv24-merge.md)
PRIORITY #1 CHECK ('save-fix-stack'): OD 0 | ledger 0 | claims B save stack (B) | main 611fca61 | review/* rv7–rv23 | reused every test of the stack + the LIVE tests of the branches whose files conflicted (dialog-order-r4, kk54, ring-build, KK35); no new game code.
**review/save-fix-stack-rv24 = merge of LIVE 611fca61 (BUNDLE 1 r4) into rv23 15bd0e29** (merge 06043184 + build line ab1e4205 + scan rows 06062f15).
### Source hunks (all conflicts, both sides kept)
| file | stack side (rv23) | LIVE side (611fca61) | resolution |
|---|---|---|---|
| dev/build/assemble.py module list | + jstack.js after jplrule.js | + jkpick.js (after jfocus), jkhand/jkstage/jkmapban (after jplrule), jkring/jkring-item (before jverdict) | UNION by script, LIVE order kept, jstack keeps its neighbour: … jdayq, jplrule, **jstack**, jkhand, jkstage, jkmapban, jbalsp … jcharge, jkring, jkring-item, jverdict (no duplicate; set = both lists) |
| dev/build/j3.js pushModal | `function pushModal(m){Q.push(m);return m}` (save-unseen-lists r4: a registered generator returns the card) | `function pushModal(m){Q.push(m);}` + DIALOG-ORDER r2 window-capture tap hook (dqTap, registered before every other module) | stack's pushModal (returns m; callers ignoring the value unchanged) + LIVE's dqTap hook block verbatim below it |
| dev/test/button-crawl.js home start | accept «Thân phận kiếp này» as a player (`nlAccept(false)`) + end a tú nữ life's selection days (`S.selx2.days=0;done=1`) | KK35: `nlAccept(true);save();` + «Điều mới trong cung» marked seen (`ctm-notes-seen`) | rv23 accept-as-player + selx end kept, then LIVE's `save()` + notes-seen mark; one comment explains both |
| index.html / sw.js | built | built | rebuilt (dev/site/build_site.sh); assets.json = LIVE |
Auto-merged files touched by both sides (checked: no overlapping hunks): j42, jdh, jkc3, jkcg, jnotice, jrcv, jveil, KIT_REQUESTS.md, look-dedupe.js.
### Scan rows for LIVE code (LAW 11: the save scans must know every new save wrapper / code card)
- time-advance-save-scan: NEW gate row «jdayq parked cards» (jdayq.js:188, LIVE DIALOG-ORDER r2: while her tap has cards set aside the save writes them too; always calls the save below it, Q restored in finally). Mutation (wrapper returns without the inner save) → scan FAIL ✔.
- unseen-lists-scan census: KIT row jkitpage kitPgHand («Mẫu kit · Bàn bài / Đối thoại», dev kit sample page) → UNCLASSIFIED 1 → 0.
### Gates on rv24 06062f15 (merge of LIVE 611fca61) — paste
| gate | command | result |
|---|---|---|
| inv-stack-scan | `python3 dev/test/inv-stack-scan.py` | RAW sites 0 · listed 8 |
| census | `node dev/measure/unseen-lists-scan.js` | UNCLASSIFIED 0 · UNSEEN-LISTS SCAN PASS (33 lists) |
| time-advance | `node dev/measure/time-advance-save-scan.js` | PASS (10 paths, 12 gates); mutant jdayq wrapper → FAIL ✔ |
| SUL | `SUL_FCS=1 node dev/test/save-unseen-lists.js index.html fold,ipadAir 1` | SAVE-UNSEEN PASS 24/24 |
| look-dedupe ×2 | `node dev/test/look-dedupe.js index.html` (Fold + iPad) | LOOK-DEDUPE PASS ×2 |
| probe | `node dev/test/save-residue-probe.js index.html fold 1 40` / `… ipadAir 1 40` | SAVE-RESIDUE PASS ×2 (families 0, page errors 0; 21 / 26 generator cards remade clean) |
| death | `node dev/test/save-death-rebirth.js index.html fold,ipadAir` | PASS |
| notice | `node dev/test/notice-late-save.js index.html` | PASS Fold + iPad |
| knsell + mutLazy | `node dev/test/knsell-remake.js index.html mutLazy.html` (mutLazy = index.html without the knSellLive S-store cleanup) | PASS 16 cards, S touched 0 · mutLazy **FAIL** ✔ (S touched 25) |
| kit tests of LIVE KK54 / ring-build (assemble.py hunk) | kit-pick, kit-plaque-confirm, kit-plaque-post, kit-evres, kit-goal-link, kit-chip-mood (755x1000,1180x820), kit-ring-wire, kit-ring-probe, kit-ring-scan | all PASS / no FAIL line; ring-scan OLD 7 = LIVE (stack touches no pager call) |
| LIVE dialog-order-r4 tests (j3.js hunk) | dayq-order · dayq-ghost · own-flow-hold-scan 755/1180 | PASS · PASS all · PASS 5 rows (2 not opened, Tư trang gift locator) both devices |
| dayq-hold | `node dev/test/dayq-hold.js <base> index.html <out>` | FAIL 2 (N2 next-tap, Fold + iPad) = **identical on LIVE 611fca61 same run** (pre-existing) |
| dialog-order-held-probe / next-probe | `<base> index.html W H <out>` | TimeoutError: #kdaytc day-title cover intercepts the token tap = **identical on LIVE 611fca61** (stale probe, pre-existing). NB: these probes need the BUILT index.html (dev/index.html raw has no charset wrapper → boot timeout) |
| button-crawl | `node dev/test/button-crawl.js --fast --game index.html` | FAIL 1 ×2: «Tin báo: 1 tin mới · Để sau» close did not close = LIVE KK54 two-step pick (first tap lifts the card, ✓ confirms); deterministic check (same notice with a go, one tap «Để sau») gives **the same state on LIVE 611fca61 and rv24** {dlg 1, lifted 1}. Only lives that hold a notice with an action hit it (LIVE page + rv24 test crawl without a notice: PASS 80/80). Follow-up for the crawler owner: tap the ✓ of a lifted kitPick card |
| coop-e2e SWAP0 (local Worker) | `node dev/test/coop-e2e.js <out> http://127.0.0.1:8799` | hangs after 28 ok at the first buổiBoth (timeout 1500 s) = **identical on LIVE 611fca61** (own tree, same run) → pre-existing on BUNDLE 1 |
| quickcheck ALONE | — | NOT RUN to the end: stopped when LIVE moved to 5cee92bb (rv24 no longer on the newest LIVE) |
### HANDOVER (rolled at ctx ≈ 24 % with START ≈ 4 %; a 2nd LIVE merge + full gates do not fit)
- PUSHED: review/save-fix-stack-rv24 **06062f1557de3e84fbe174456858c9bccbdbf059** (= rv23 + LIVE 611fca61, gated above). NOT SSK: LIVE is now **5cee92bb** (lc29-ui f28d28b9 + lc30-kg82).
- NEXT (successor): merge origin/main 5cee92bb into rv24 06062f15 → review/save-fix-stack-rv25. `git merge-tree` = SOURCE conflicts **dev/build/assemble.py, j6.js, jgift.js, jgpick.js, dev/kit/KIT_REQUESTS.md** (+ index.html/sw.js). Keep both sides, list hunks in «## MERGE rv25»; re-run the scans first (new LIVE save wrappers / code cards need rows), then the gate table above + quickcheck ALONE; run LIVE's own tests of the branches behind j6/jgift/jgpick (lc29-ui: door-onetap/act-move jgift, ob-m3ui-sololh j6, …).
- Then Foreman B's extra job: review/save-pid-cards-rv6 = merge rv25 into review/save-pid-cards-rv5 4e27a588 (on rv23: merge-tree with rv24 = index.html/sw.js only), rebuild, save-pid-cards Fold then iPad (ONE device per process), save-evc-onscreen, SUL, look-dedupe, quickcheck ALONE; report both SSK lines.
- Tips: serve the repo root (`python3 -m http.server`) for dialog-order / dayq probes and pass index.html; coop-e2e needs `npm install` in coop/worker + `npx wrangler dev --local --port 8799`; a LIVE A/B tree needs `python3 dev/build/assemble.py` first (dev/index.html is not in git). Worktrees: /home/user/wt/rv24, /home/user/wt/live611 (remove when done).

## MERGE rv25 (merger opus, session_01N1tNP4dWzNLTa9hBMQxHNc, depth 7, START_CTX ≈ 5 %, for Foreman B ROOT 2 child 6; brief b-save-stack-rv25-merge.md)
PRIORITY #1 CHECK ('save-fix-stack'): OD 0 | ledger 0 | claims B save stack (B) | main 5cee92bb → d9ca7892 | review/* rv7–rv24 | reused every stack test + LIVE's own tests of the branches whose files conflicted (ob-m3ui / act-move / door-onetap / gift-pick / srv-rank / help-housemate); no new game code.
**review/save-fix-stack-rv25 = rv24 06062f15 + LIVE 5cee92bb (merge cf3b9434) + LIVE d9ca7892 (lc30-b2, merge 22ae90b4)** — LIVE moved during the merge, the 2nd merge had a source conflict so it was merged too (no force).
### Source hunks (all conflicts, both sides kept)
| file | stack side (rv24) | LIVE side | resolution |
|---|---|---|---|
| dev/build/assemble.py module list | + jstack.js after jplrule.js | + jplink.js (before jplrule), + jamove/jone/jkpp (end) | UNION by script, LIVE order, jstack after jplrule: … jdayq, jplink, jplrule, **jstack**, jkhand … jverdict, jamove, jone, jkpp (set = both, no duplicate) |
| dev/build/j6.js title slots onclick | load: `try{deser(d)}finally{quiet=false}` (save-year-rollback) | OB-M3UI: «Kiếp mới» over a sổ = kitConfirm; sololh: a living «trọn» life overwritten writes its Sổ luân hồi row «Bỏ ngang» | stack's load line + LIVE's new-life lines verbatim |
| dev/build/jgift.js courtMeet «Dâng quà» | `n=invCount(S,…)` (inv-stack: stacked pieces counted) | ACT-MOVE-5: khắc from `BAL.time.cost.give` | stack's count line + LIVE's button line |
| dev/build/jgpick.js kipBuild | twin-tile dedupe (one tile ×N, hidden twin cards dropped) | ACT-MOVE-5 kgbest preselect (`L.find(x=>x[0].kgbest&&…)`) | dedupe block then LIVE's sel line. Checked: kgbest = first ok item of the value-sorted list → it is the first of its twin group, so the dedupe keeps the kgbest tile |
| dev/build/jpromsv.js spLeaveCard «Để đi» (2nd merge, d9ca7892) | `return tsPanel(…)` + `spLeaveCard=rcpReg("spLeave",spLeaveCard)` generator | srv-rank: kem adds «<sw> bên ấy sang hầu ngươi thay» (spSwapOf) | LIVE's option line + stack's generator registration; spSwapOf/hhHas/capOf read only the live household → generator stays deterministic |
| dev/kit/KIT_REQUESTS.md | K-LIST-PAGE (26/11) | map-r8 place glyphs (26/11) | both entries |
| index.html / sw.js | built | built | rebuilt (build_site.sh); assets.json = LIVE (diff 0) |
New LIVE modules jplink / jamove / jone / jkpp: no S list, no store write, no save wrapper (grep) → census UNCLASSIFIED stays 0 (LAW 11: nothing to classify).
### Gates on rv25 22ae90b4 (first batch: conflicted-file tests + scans + quickcheck) — paste
| gate | command | result |
|---|---|---|
| inv-stack-scan | `python3 dev/test/inv-stack-scan.py` | RAW sites 0 · listed 8 (both merges) |
| census | `node dev/measure/unseen-lists-scan.js` | UNCLASSIFIED 0 · UNSEEN-LISTS SCAN PASS (33 lists; 182 code-card sites, 49 rcpReg) |
| time-advance | `node dev/measure/time-advance-save-scan.js` | PASS (10 paths, 12 gates) |
| ob-m3ui (LIVE j6 owner) | `node dev/test/ob-m3ui.js index.html m3save.json` (M3 robot save dev/handover/robot/m3/save_dump_latest.json.gz → {"hclh-save-v2-1":…}) | 122 cases FAIL 6 = rows «1 meter-tap plain-card / ksp-card: no meter on the card», «3b death option: NO EFFECT» ×Fold+iPad = **identical on LIVE 5cee92bb, same 6 rows** (pre-existing; the sololh 3a rows PASS) |
| act-move-reach / reach2 / rows-scan (LIVE jgift owner) | `node dev/test/<t>.js dev/index.html` | PASS / PASS (D 263/263) / PASS |
| door-onetap (LIVE jgift/jone owner) | `node dev/test/door-onetap.js dev/index.html` | run 1 FAIL 1 «door word worse than best: hau» (random seeds, Math.random), run 2 **PASS**; LIVE 5cee92bb PASS ×1. Stack touches no door/jone/odds code → seed flake (re-run below) |
| gift-pick-scan (jgpick) | `node dev/test/gift-pick-scan.js origin/main` | every picker = picture grid (28.13i) |
| inv-stack.js (stack's own jgpick test) | `node dev/test/inv-stack.js` | 25/27, FAIL 2 = DOM «Biếu quà làm lành 2,790 nodes (<2,000)» Fold+iPad = **identical on rv24 06062f15** (the open K-LIST-PAGE kit request); 3 mutations caught ✔ |
| srv-rank (LIVE jpromsv owner, 2nd merge) | `node dev/test/srv-rank.js file://…/dev/index.html rv25` | 14/14 PASS, no page errors |
| help-housemate (lc30-b2) | `node dev/test/help-housemate.test.js dev/index.html` | ALL PASS |
| q-softlock alone (G4 94) | `node dev/test/q-softlock.js index.html` | rv25 PASS ×2 · LIVE d9ca7892 FAIL 1 («view parked by a tab change», Fold) → flaky on LIVE too |
| quickcheck ALONE | `bash dev/tools/quickcheck.sh` (×2, default 3 runs) | run 1: G4 94 FAIL 4 iPad + perf longTaskMax 4125/2031; run 2: G4 94 FAIL 1 (same LIVE-flaky row) + longTaskMax 3058/1861 (LIVE runs had a 4,601 ms outlier) |
| quickcheck ALONE `--runs 5` | `bash dev/tools/quickcheck.sh --runs 5` | **QUICKCHECK PASS · core gates PASS (hooks 14, incl. 94)** · old save ok · perf median of 5 new/live: render 282/230, tab 463/462, buổi 1315/1278 ms, tasks>200 26/24, longTaskMax 1865/2857 |
Long gates (SUL, look-dedupe ×2, probe Fold+iPad, death, notice, knsell+mutLazy, coop-e2e with coop-clear-rv173) follow below.

## MERGE rv26 (same merger, session_01N1tNP4dWzNLTa9hBMQxHNc; Foreman B priority change 27/11 ~15:41Z)
PRIORITY #1 CHECK ('save-fix-stack save-rewind'): base review/save-rewind a9772d74 (= rv25 22ae90b4 + dev/test/save-rewind.js); LIVE 772bee4f (lc31-goal: goal-links-rv174-f28 8aee40a9 + coop-clear-rv173 8e1121d3); reused LIVE's goal-links.js / arrive-walk.js / auto-click-scan.js.
**review/save-fix-stack-rv26 bd47c7532c7c3adfa33773d3cbc2cd8466e8d66a = merge of LIVE 772bee4f into save-rewind a9772d74.** DO 2 (pid-cards-rv6 on rv25, local 6068aa6e, built-only conflicts) paused, not pushed; redo on rv26.
### Source hunks (both sides kept)
| file | stack side | LIVE side (goal-links r2) | resolution |
|---|---|---|---|
| dev/build/assemble.py module list | + jstack.js after jplrule.js | + jglink.js | LIVE list + jstack after jplrule (set = both, 475 modules, no duplicate) |
| dev/build/jinv.js kitShopNvp | `have:()=>invCount(S,…)`, `onBuy … invAdd(S,{k})` (inv-stack) | shop title names the eunuch (`Nhờ thái giám ${nm} mua đồ`) | stack's have/onBuy lines + LIVE's kitShop title line |
| index.html / sw.js | built | built | rebuilt; assets.json = LIVE (diff 0) |
jglink.js: no S list / store write / save wrapper → census unchanged (UNCLASSIFIED 0).
**Merge slip caught before push (whole-family check added):** the first rv26 commit's assemble.py union did not apply (no assert) → jstack.js missing from the build → `invAdd is not defined` in every month step (stipGoods, al/rt goods, promo, ilWeek …) → the month step threw, save-rewind showed «NO month flip» (buổi back to 0). Found by save-rewind + console capture; fixed by amend before push. Check used: `git diff --name-only <LIVE> HEAD -- dev` of rv26 = rv25's set + save-rewind.js (identical), and `grep -c 'function invAdd' index.html` = 1. Follow-up K (scan): a build check that every assemble.py module of the stack is in the built page — the source scans (census/inv-stack/time-advance) read dev/build files and could not see it.
### Gates on rv26 bd47c753 — paste
| gate | command | result |
|---|---|---|
| inv-stack-scan · census · time-advance | as rv25 | RAW 0 · UNCLASSIFIED 0 (33 lists) · PASS 12 gates |
| save-rewind | `SR_CKPT=<flight2-s18d.ckpt.json from 8ae99226> node dev/test/save-rewind.js index.html fold,ipadAir` | **PASS 4/4** (month flip, sổ = screen 0 bad moments); LIVE 772bee4f FAIL 2/2 (sổ ≠ screen at the month flip = the bug the stack cures) |
| goal-links (LIVE jinv/jglink owner) | `node dev/test/goal-links.js file://…/index.html 755x1000,1180x820` | iPad PASS every run. Fold «đi tới» (place stays home after Đi tới + companion pick, q 0) FAIL in 3 of 13 Fold runs on rv26 (2 of them under load with coop-e2e running); LIVE 772bee4f 0 of 5; debug copy 6/6 PASS → intermittent, root not found. Open for the reviewer / follow-up L |
| arrive-walk | `node dev/test/arrive-walk.js index.html 755x1000,1180x820` | PASS (19/20 rounds ok, 1 miss = LIVE's own allowance) |
| auto-click-scan | `node dev/measure/auto-click-scan.js` | BUG 0 · UNCLASSIFIED 0 |
| inv-stack.js | `node dev/test/inv-stack.js` | 25/27; FAIL 2 = DOM «Biếu quà làm lành 2,789 (<2,000)» = identical on rv24/rv25 (open K-LIST-PAGE) |
| SUL | `SUL_FCS=1 node dev/test/save-unseen-lists.js index.html fold,ipadAir 1` | SAVE-UNSEEN PASS 24/24 (one earlier run under load FAIL 1/24 flip-month-0s, before the jstack fix) |
| quickcheck ALONE `--runs 5` | `bash dev/tools/quickcheck.sh --runs 5` | **QUICKCHECK PASS · core gates PASS (hooks 14)** · old save ok · perf new/live render 227/229, tab 451/410, buổi 1331/1253 ms, tasks>200 23/23 |
### rv25 long gates (done before the priority change; game code of rv26 = rv25 + LIVE goal-links)
| gate | result |
|---|---|
| SUL 24/24 · look-dedupe ×2 PASS · death PASS · probe Fold/iPad s1 SAVE-RESIDUE PASS (families 0, page errors 0) · notice PASS Fold+iPad | PASS |
| knsell + mutLazy | PASS 31 cards S touched 0 · mutLazy FAIL ✔ (S touched 24) |
| coop-e2e SWAP0 (local Worker, coop-clear.js of rv173) | **139/143**: «the same world on both seats (coop-host-lag family)» after week 2 / week 3 / rejoin + R10RV maid loyalty ±1 differ. Ran in parallel with other browsers (load). A/B on LIVE 772bee4f (coop-clear now live) NOT yet run → next |
### rv26 goal-links A/B (Foreman B ROOT 3 order 27/11 ~17:31Z) + HANDOVER (merger 4dWzNLTa rolled at ctx ≈ 29 %, START ≈ 5 %)
- goal-links Fold 755x1000 on **LIVE 772bee4f: 0/13 FAIL** (13 runs, one process at a time, file://…/index.html) vs **rv26 bd47c753: 3/13 FAIL** («đi tới» → {shop false, place "home", ped false, q 0}; 2 of the 3 ran under load). → NOT a pre-existing flake; cause not found yet. iPad PASS every run on both.
- Hypothesis to test first: the stack's save-year-rollback / load-step guard (a throw inside a step restores the state before it) — a throw during the Nội vụ phủ walk / arrival (e.g. a LIVE arrival path, jglink / arrive-walk «k3Home», or a random «Kỳ ngộ» adHapArrive, reading S.inv the old way on a stacked bag) would put her back «home» with an empty Q — exactly the FAIL state. The first rv26 build (jstack missing) showed this mechanism (invAdd throw → month step undone). Second candidate: extra slot writes per tap (save stack writes the sổ more often) delaying the walk past the test's fixed 1.2 s / 2.2 s waits on Fold.
- Tool running at handover: /home/user/wt/rv26-scr/dbgloop.sh = goal-links with DBG state lines after link / Đi tới / companion / before check + console errors & warnings, up to 20 Fold runs, stops at the first FAIL (log /home/user/wt/rv26-scr/dbgL<n>.log, summary dbgloop.out). Scratch is in this container only — the successor re-creates it: copy dev/test/goal-links.js, add `p.on('console',…)` and a DB() print after each step of «(2b) Đi tới».
- NEXT (successor): (1) find the cause (console errors in the failing run; if a throw → fix the reader to the stack API invCount/invAdd, whole family scan per LAW 11; if timing → wait-for-condition in the test, prove LIVE unchanged); (2) re-run goal-links Fold 13× on the fix (target 0/13), SUL, save-rewind, quickcheck --runs 5 ALONE; push review/save-fix-stack-rv27 (or a test-only commit on rv26) → SSK to Foreman B ROOT 3 session_01N1tNP2DN7zgnH41uQZm6TD. (3) coop-e2e A/B not done (stopped for this order): rv25 under load 139/143 (world-sync rows); run LIVE 772bee4f and rv26 ALONE (wrangler dev --local --port 8799 in coop/worker after npm install). (4) DO 2 pid-cards-rv6: skip until rv26 lands (Foreman), then merge the landed stack into review/save-pid-cards-rv5 4e27a588 (local try on rv25 = 6068aa6e, built-only conflicts, j3 auto-merged; not pushed).
- Worktrees: /home/user/wt/rv25, rv26, live5ce (LIVE 772bee4f built), pid6, rv24, ho — remove when done.
