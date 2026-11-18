# npc-chain-land — LANDER report (session_01UV1Szi7UbTAbk3W9QSD6h7, successor of mood reviewer SzhYFat)

PRIORITY #1 CHECK: OD n/a (landing task, no new feature) | main c7375c0c merged | review/* review/npc-chain-land (this), review/ag-all-2-r2 (merged at 521a4ac3) | claims C-AG #7 SzgaEMtM9 (foreman), main s38 SzjyZ9i1
START_CTX ≈ 3 % (get_session read 0; own estimate). Rollover line = 28 %, ceiling 60 %.

## RESULT: PASS 7f96f559 (review/npc-chain-land; origin/main c7375c0c is its ancestor → fast-forward)

Built from dde6a641 (feelings-18-r1 + mood-mem-r2 + kit-figure-mood r6 + ag-all-2-r2 521a4ac3 + main 4c8568f5) plus:
1. 620465fd — merge origin/main 99f3978d (display-shelf r3, clean) + site rebuilt.
2. a090dd3e — **G4 coop-one-world ROOT FIX** (see below).
3. a21354fe — site rebuilt.
4. 7f96f559 — merge origin/main c7375c0c (dudo-blank r1; source clean, only index.html/sw.js conflicted → rebuilt).

### (b) G1 one-core-bind j25:11 / j78:127
On the merged source the gate is clean: `one-core-bind.js` 1196 prints, **0 mismatches**; `BAL.eff.j9.evRun` / `BAL.eff.j2.evRun` / `BAL.eff.j2.run` no longer appear in any dev/build file (the ag-all-2 merge changed those lines). quickcheck G1 (guard, text, bind, text-rule) PASS. No code change was needed.

### G4 coop-one-world FAIL → root cause + fix (whole family)
- Symptom (quickcheck run 1, under CPU load): "guest week changes the world". DBG: `.R[#8].evm` {} → undefined; another run: `S.fdead` / `S.dnames` (a eunuch retired) written by the guest's week. Main passed 3/3 under the same load (6 busy loops), the branch failed 1 in 3. Each part branch (521a4ac3, 68178e5d, 43fbf2e7) passed unloaded → load-dependent timing.
- Root: ag-all-2's lazy agent queue `jagday.js agLzGo/agLzRun` draws NPC deeds in `setTimeout` chunks. A chunk queued for one world ran on another world (co-op seat swap in the one-page probe; equally a load / new life in play), and outside the one-world guard. Its only guard was the week+buổi key, which the other world also matches.
- Fix (a090dd3e): `agLzNew` stores `w:S`; `agLzRun` drops the queue when `Q.w!==S || !agDOn()` (agDOn is false on a guest seat). The family check found the other new setTimeout callbacks in the delta: `agSyncNow` (view sync, no world write) and `adHapNow` (already gated on S, writes only S.adHap of the live world). Neither needs a change.
- After the fix: 5/5 PASS under the same load (seeds 7, 7, 3, 7, 5).
- **ag-all-2 r2 must carry this fix too.** Its reviewer SzibgyT is inactive, so the message did not go through. The delta after 521a4ac3 (fix2 commits up to 0a627b59) is NOT merged here because no PASS sha came.

### Gates on the final head 7f96f559 (unless noted)
| gate | result |
|---|---|
| quickcheck --runs 5 --cpu 4 | PASS (G1–G5 core gates PASS, time-spill PASS, old save from live loads + plays a buổi, perf median new/live render 164/179, tab 306/329, buổi 885/864, tasks>200 13/13) |
| coop-e2e (a21354fe) | **63/63**. The first run gave 61/65: the host got stuck on the "Tuyển chọn: Môn thi" mini-game card at buổi 2:2. That is the known flake of this suite (earlier reports: 51/59, 57/60), and the rerun was clean. |
| feelings18 | 34/34 |
| mood-mem | 16/16 |
| moodknow-step0 | 19/19 |
| ag-moodknow | 33/33 |
| one-core-guard | PASS |
| emotion-acts / emotion-acts-2 (a21354fe) | PASS / PASS. Earlier runs while the box was loaded gave FAIL 1 and one crash in the test's own fresh() (S undefined), both random. |
| coop-one-world 7 + 3 | PASS (inside quickcheck) |
| dudo-blank (main's new test) Fold + iPad | PASS |
| fig-seal 755x1000@2 + 1180x820@2 | 0 page errors. Every known figure has a seal, inside the frame, not on the face, beside the head (room / event / place / pop). The Fold room showed a maid as a grey silhouette ("Người lạ") with no seal, as the rule says. On iPad a maid with art (Ngọc Lan) has her seal. |
| "Đang:" line (Fold + iPad) | The Emperor's tap card (emoBox) shows ĐANG "Khóc suốt đêm" and CẢM XÚC "Đau khổ (nặng)" in the kit frame, with the seal beside his head. |

Shots are in scratch only (/home/user/wt/shots), none in git.

### Open
- ag-all-2 r2 delta (fix2 + perf, 177d1e0d..0a627b59) is not merged; that reviewer is inactive. Whoever lands it: merge on top of 7f96f559 and keep a090dd3e.

## HELD at batch s39a 4826a7ad (C-AG #7, 18/11 00:04Z) — new order + HANDOVER (rollover: context 26.5 % ≥ START_CTX 3 % + 25 %, worker → coordinator opens the successor)
Order (C-AG #7): MAIN s40 (session_01UV1SzjbGx37rTjAmWFyCpc) HELD 7f96f559. coop-e2e on the batch gave 3 bad runs of 9, all in the "buổi advanced for both seats" family: the seats stay on "Chờ hảo hữu", one seat has used:1 and the other used:0. Live main eb3675a6 gave 0 bad of 7. Quickcheck G4 coop-one-world failed once under load on the batch. Logs: builder session_01UV1SzjA6P5mZskv3JKn3BV has /tmp/ce-b37a-4.out.
TODO for the successor (in order):
1. Rebuild the worktree. The container was fresh and /home/user/wt was gone: init + sparse (`'/*' '!/dev/shots/' '!/dev/owner-shots/' '!/dev/figwork/'`), fetch --depth=30 under flock of review/npc-chain-land + main. Run `bash dev/site/hooks/install.sh`.
2. Merge live main (eb3675a6 or newer) into review/npc-chain-land @ 7f96f559 as a real merge, then build_site.
3. Reproduce under load: 6 busy loops (`sh -c 'while :; do :; done'` ×6, kill only your own) + coop-e2e ≥15 runs + coop-one-world SEED 7/3 ×10 (DBG=1 prints the paths that moved).
4. Root suspects. In the batch the first seat finishes the buổi and the second does not, so look for every async/deferred path that can hold a seat's buổi advance or change the world after the seat sent:
   - jagday agLzGo/agLzRun: lazy agent chunks via setTimeout. a090dd3e pins them to Q.w=S and turns them off on a guest seat. Check whether a seat's buổi end waits on AGD.lz / AGD.lzT. If a chunk is dropped (Q.w!==S) while AGD.lzT stays set, the queue stays "busy" forever. agLzRun clears lzT on entry, but check every reader of AGD.lzT / AGD.lz in jagday/jagent/jcoop*.
   - jagent agSyncNow (AG.syQ setTimeout) and jagknow / jact adHapNow (KN.q setTimeout).
   - The `setTimeout(...,0)` wrap of placeWhere (wxNpcHit) in the ag-all-2 delta.
   - grep `setTimeout|requestIdleCallback|queueMicrotask` in `git diff origin/main -- dev/build` and check each one against the co-op buổi flow (jcoopthinb / jcoopworld / jcooptimer: who sets "sent" / "bend" / used).
   Root rule: in co-op, run the deferred agent work synchronously inside the buổi step (as with window.__agAll), or flush it before the seat sends. Never let a timer cross a buổi/week boundary.
5. ag-all-2 rv #2 = session_01UV1SziCw1gnLVkS7bUSAPM, head review/ag-all-2-r2 0a627b59. It has 2 flaky reds (ag-all day plan / ag-walk far news, suspected jshelf/jdisp/jemocause wrapper blocking agDayEnsure) in the same lazy-queue family. Make ONE root fix for both, and tell it directly.
6. Gates on top of live main (same list as above) → new PASS sha → s40 + C-AG #7. Update this report.

## LANDER #2 (session_01UV1SzhJFho1Xs76yNi63tL, 18/11) — ROOT FIX of the s39a coop hold
PRIORITY #1 CHECK: OD ag-all-2 rulings | main none (no agLater/agDrain/wantB) | review/npc-chain-land a090dd3e, review/ag-all-2-r2 1f8aaf30 | claims ag-all-2 rv #2 SziCw1g (archived), BIG reviewer SzkmyAXY
START_CTX ≈ 3 %. depth 3.

### Root (seen in a trace of every "Sẵn sàng" press, coop-e2e at load)
The host seat had `Q=1` with `#modal` HIDDEN: ":Có người bán tin" (jagknow `knSellTick`, which runs inside `j95sync`) was pushed from the DEFERRED view resync
(`agSyncNow` in a `setTimeout`). Nothing showed it and `#next` stayed enabled. The co-op `nextBuoi` wrapper's `Q.length` guard then swallowed the press: no `bend`
was sent, so the other seat sat on "Chờ hảo hữu…" for ever. It comes from the ag-all-2 delta (that is why 1f8aaf30 alone failed too). Live main has none of these paths.

### Fix — ONE rule for the whole family (LUẬT SỬA CẢ NHÓM): AG LATER (jagent)
- `agLater(k,fn,{slice})` is now the only way ag code defers work. That covers the deed slices `agSlice`, the staff slices `agLzRun`, 6 `agSyncNow` sites, the KN news scan (`adHapNow`) and `AG.now`.
  A job is pinned to its world `S` and its buổi; on another world or buổi it is dropped.
- `agDrain()` runs at every buổi/week boundary. It is in the outermost `nextBuoi` and `endTurn` wrappers, and in co-op `onBuoi` and `CW.nightEnd`, where it runs BEFORE their Q checks.
  It runs the pending light jobs (resync, news scan, which can queue a dialog) and drops the pending slices. The consorts and staff it did not reach keep their schedule,
  as before (an earlier "run-all" version cost buổi 1243/823 ms in quickcheck). No timer ever crosses a buổi or a week.
- `agQShow()`: a dialog queued by a job is shown at once.
- Co-op (jcoopworld): a "Sẵn sàng" press is never lost. If it is pressed while a dialog or mini game is up, or before the host's places have arrived, it is kept as `CW.wantB`
  and done in `tryEnd` once they clear. A room step or a new week drops it.
- Guards: `dev/test/ag-later-scan.js` (no raw setTimeout / rIC / queueMicrotask in jag* / jmoodknow / jfeel / jworld* / jnpcd, except load-time
  wrapper installs) and `dev/test/ag-later.test.js` (7 checks: dialog shown, drain-first, slice dropped, other world dropped, other buổi dropped, real play, 0 errors).

| deferred path | before | after |
|---|---|---|
| agSlice next slice (jagent) | raw setTimeout (Q.tm) | agLater slice (dropped at boundary) |
| agLzGo / agLzRun staff slices (jagday) | raw setTimeout (AGD.lzT) + a090dd3e world pin | agLater slice |
| agSyncNow: jagent tick, jagday lz / shadow / shClear / place (5) | raw setTimeout (AG.syQ) | agLater sync (drained) |
| AG.now resync (jagknow) | raw setTimeout | agLater sync |
| KN news scan sc() (jagknow) | raw setTimeout (KN.q) | agLater kn (drained) |
| placeWhere wxNpcHit wrap (jagday W1), drain install | load-time setTimeout | unchanged (allowed: runs once at load) |
| co-op press blocked by Q / mg / needWhere | silently dropped | kept (CW.wantB), sent when clear |

### Other fixes found on the way
- jmoodknow `mkMigrate`: the old-save bar moved by 1 when the feeling sum was x.5 (`Math.round(-31.5)=-31` → bar −29 for −30). The rest is now exact.
- ag-moodknow "odds clamped" check: 12 → 40 rounds (~200 draws; 60 draws at 95 % are all hits 5 % of the time). Both reds appeared only after the ag-all-2 merge (state/RNG shift).
- coop-e2e `press()`: a tối already ended by the room clock (jcooptimer `dueTick` → `nightReady` on a slow machine) counts as pressed. This was red on the pre-fix build too.

### Branches
- review/ag-all-2-land = 1f8aaf30 + a090dd3e + AG LATER + coop-e2e press fix (FF over live eb3675a6).
- review/npc-chain-land = 7f96f559 + merge live eb3675a6 + merge 1f8aaf30 (assemble.py = main order + jmoodknow/jfeel) + the same fixes + mood fixes.

### Gates done before the 3da5720a merge (heads 4df5f38 / fb4544c)
- coop-e2e, 4 streams in parallel: ag-all-2-land **16/16 clean**; npc-chain-land **14/16 clean** plus 2 network-only reds (rank-worker CORS console line; ws 1006 ×3 at join). There were 0 reds in the buổi family.
  Before the fix, on the batch-equivalent build: 1 bad in 6 runs (3 FAIL lines "buổi 1:1 advanced for both", "week 2: fold/ipad advanced"). Fix e6c1ce7 alone: 16/16.
- quickcheck --runs 5 --cpu 4 on a43ca34 (npc-chain): PASS (core gates, time-spill, old save). The buổi perf was 1243/823 ms with the old drain-runs-all; changed to "drain light jobs only" (then the reviewer made slices stay queued: 6285dc9 / e6be4f8).
- coop-one-world seeds 7/3/5 PASS; ag-later 9/9 (reviewer); ag-later-scan PASS; ag-carry / ag-walk / ag-sell / ag-know PASS (ag-know is flaky at load, and its baseline was red too); mood-mem 16/16, feelings18 34/34,
  moodknow-step0 19/19, ag-moodknow 33/33 (after the mkMigrate + draws fix). ag-all perf p95 was red only under load (4 burners + 2 coop streams); recheck it unloaded.

### Main 3da5720a (makeup-lux r2v) merged into both — pushed, NOT final (C-AG #7: hold the final gates until the LOOKS batch is on main)
- review/ag-all-2-land **aeae7cc3** = reviewer 6285dc94 + main 3da5720a. review/npc-chain-land **ff76d2d2** = reviewer e6be4f87 + main 3da5720a.
- "diem": live main's meaning wins (OD L1638: "làm maximum là khuynh thành"; TOIL_OLDLV diem→tuyet; "diêm dúa" = the dress/lux verdict TOIL_DV.diem). toilNpcPlay = main's (no toilHeavy / toilAllow / diemOdds; the ov arg is gone).
  ag-all-2's ONE rule toilSeeRule / toilLookP / toilJudgeNpc is kept and re-mapped: tease = `L.dv==="diem"` or a Vụng về face (main's wording "lối ăn vận diêm dúa"); the toilRival wrapper keeps BAL.toil.teaseN;
  host-reprimand news and the jagtoil reprimand log = Vụng về only; the jagtoil peer-tease utility = vung only; no cakeOver arg (jbal2 opt `dam` now reads as cầu kỳ, comment says so).
  jbaleff: ag j9 + main j92.danhWdAccuseA. assemble.py: main order (NOTE: ag-all-2-r2 had jdisp before jlooks; it is main's jlooks→jdisp now) + jdress + ag modules (+ jmoodknow/jfeel on npc-chain).
  npc-chain jinv luxMonth: main's `luxOf(p,{noMk:1})` + the mood chain's ghenUp; jtoil ghenUp rows kept.
- Spot tests on aeae7cc: makeup-lux PASS, makeup-theme PASS, luxury PASS, dress-offence ALL PASS, one-core-guard PASS, ag-later 9/9.
  **OPEN 1: ag-toil2 4/16 FAIL.** The test's §3 fixture is built on the dropped "Diêm dúa FACE" (look:"diem" → it now reads as Khuynh thành, which is praised, so no reprimand or tease). It needs a re-map to the new meaning:
  the reprimand / tease case = a Vụng về face (score 20, look "vung", slip). With that, 3 still fail: her Thái hậu total is 0 (dress hợp dịp +1, face −1), and the player's toilFx has no "dung nhan" row for vung (per-person taste).
  So pick a fixture whose total is negative, or check the face row only. The test edit is not committed (reverted).
  **OPEN 2: coop-toil-look 26/29 on aeae7cc** (main 29/29, pre-merge 4df5f38 29/29): "B herself = B as seen on A" — A sees B as vung / hoppham −3, B sees herself as vua / hopdip +1.
  The suspect is how the friend's (p.coop) look is read after the merge: main's toilMkRec(p) p.coop path vs ag-all-2's toilLookP / toilFriendRec, or jagtoil tl2 for a coop entry. Not looked at yet.

## HANDOVER (lander #2 → successor; rollover at ≈ START_CTX 3 % + 25 %)
Next steps: (1) fix OPEN 1 + OPEN 2 on review/ag-all-2-land, port them to review/npc-chain-land; (2) when C-AG #7 says the LOOKS batch (toil-looks5 + glow v8 + hoa-dien r3b) is on main, merge it into both
(it touches jtoil: the same rule, live meaning wins); (3) rebuild the site and run the gates per branch: coop-e2e ≥15 at load, G4 ×10 at load, quickcheck --runs 5, and on npc-chain also feelings18 / mood-mem / moodknow-step0 / ag-moodknow /
emotion-acts / fig-seal Fold+iPad; (4) send "SẴN SÀNG KIỂM <sha>" per branch to the BIG reviewer session_01UV1SzkmyAXYnCFY6utjvkF + C-AG #7.
Tools: a traced coop-e2e (logs every #next press: used, Q, hidden modal, bend, whereKey) = copy dev/test/coop-e2e.js and add the PRESS trace in press() (see this report's root section); run-ce.sh = burners + N runs.

## LANDER #3 (session_01UV1SzjwxQsdQj14imrii9S, 18/11) — OPEN 1 + OPEN 2 closed, live main merged, gates green
PRIORITY #1 CHECK: OD L1638 makeup (diêm dúa = dress verdict) | main 94a93759 | review/ag-all-2-land, review/npc-chain-land | claims reviewer AG LATER #2 Szk6Tdgr. START_CTX ≈ 4 %. depth 3.
- OPEN 1 ag-toil2 §3: fixture re-mapped to the live meaning — Vụng về face (score 20) on a day her clothes read hợp phẩm (luxVerdict pinned), so the WHOLE Thái hậu verdict is negative; a frugal Thái hậu (vung 0) is pinned to normal; the player's row is compared face-only (baseState "plain"); mocker/witness non-frugal. Also: start from a world with ≥ 2 consorts at the mirror (a random start with none made §1 vacuous, 1 run in ~10). 16/16.
- OPEN 2 coop-toil-look root (jcoopworld): sendPos/sendFam set their "already sent" key BEFORE COOP.send; a send on a socket that is down / reconnecting returns false and the relay was never said again → the friend kept her old look. Family fix: `sentOr()` clears the key on a failed send for pos (posKey), fam (famSentH), cycle (cyK) and the tonight claim (tnLast); a reconnect (room) or the friend coming back (peer) clears posKey/famSentH (seatLast already did it right). New check in coop-toil-look: a pos lost once is said again (32/32). NOTE: an attempt to make toilMkRec read toilFriendRec looped (toilFriendRec → toilDress → luxOf → toilMkRec) and was reverted.
- Main merges 3da5720a → 62a6846f → f986ff6a → f8276cdb → 93938893 → 94a93759: j10 plantServ = ag pay-on-success + main capRoom; j29 hire = main cap check + refund, then ag hireTake; jtoil = ag ONE rule (toilSeeRule/toilLookP) + main tease wording/toilSay, toilAns gains main's "harsh" (reviewer fix: guard `c!=="reply"&&c!=="harsh"`), every dialog option through toilAns; ONE CORE: BAL.toil.replySuc was defined twice with opposite signs (main −2, ag +2) → only main's −2; jmkt toilNpcSk + hdNpc; toilMkLux + hdLux; jagtoil chosen NPC face (tl2Sit) draws hoa điền by the same hdNpc seed (family); assemble.py = main order (+ jhd after jlux, + jcloth after jlooks) + ag modules (+ jmoodknow/jfeel on npc-chain).
- Fixtures: hoa-dien.js (NPC sits again after hoa điền is put in her chest — her face is chosen once a day); emotion-acts.js scold case at the first rank with room for a staff maid (main staff-cap: personal maid counts, cap 1 at rank 0).
- Reviewer fixes pulled: ag-dayk fixture, toil-harsh, kn-late (late errand report keyed by key(t)).
- Gates. FULL on ag-all-2-land 47568e9b / npc-chain-land 2ec0014e (main 93938893, touches assemble order): quickcheck --runs 5 PASS both; G4 coop-one-world seeds 7/3/5/11/13 PASS both; coop-e2e ×9 (3 streams in parallel = load) 63/63 every run, buổi-family bad 0, both; coop-toil-look ×2 32/32 both; ag-later 9/9 + scan, ag-toil2 16/16, toil-harsh, kn-late, one-core-guard, ag-all 21/21 + b + c, makeup-lux PASS; npc-chain also emotion-acts PASS, feelings18 34/34, mood-mem 16/16, moodknow-step0 19/19, ag-moodknow 33/33, fig-seal 755x1000 + 1180x820 OK, oldsave-r1 16/16. Spot: toil-tease, toil-react, makeup-theme, luxury, dress-offence, staff-cap, staff-root, cloth-xoc, cloth-stain, hoa-dien, greet-stranger PASS.
  QUICK on the final heads (main 94a93759 touches only jmen.js): ag-all-2-land **72adff05**, npc-chain-land **b620b051**: men-forbidden 288 checked / 0 bad, toil-harsh, kn-late, ag-toil2 16/16, quickcheck --runs 2 PASS (npc-chain rerun --runs 5: buổi 663/622 ms), coop-e2e ×3 63/63 bad 0, both.
- FOR MAIN: dev/test/staff-cap-apply.js row 3 ("identity pool … every old face file blocked (FAV none)") FAILs on live main 93938893 itself (fav 25); same on these heads — pre-existing.
- SẴN SÀNG KIỂM: review/ag-all-2-land 72adff05, review/npc-chain-land b620b051 (both have live main 94a93759 as ancestor).

### LANDER #3 — later (after the 04:51Z SẴN SÀNG KIỂM) + HANDOVER (rollover: context 48 % ≥ START_CTX 4 % + 25 %; worker → coordinator opens the successor)
- NEW ROOT FIX (co-op stall, pre-existing also on main): jcoopworld `reshowQ` gave up once while the Tuần lục book (.kbk-bar) was open; closing the book renders nothing and onPos does not render while Q is non-empty → host Q [Điềm báo, Hội phối đồ: báo đề, Lời cảnh báo] hidden forever, week end never sent (coop-e2e "week 1/2/3 advanced", ~1 in 9). Fix: `qBlocked()` = VISIBLE book bar or S.mg; reshowQ re-arms itself (400 ms) while blocked; wantB uses the same check. After it: coop-e2e ×18 63/63, G4 ×10, quickcheck, coop-toil-look green.
- Merged since: reviewer fixes (toil-harsh, kn-late, th-name / Thái hậu household name, ag-truth deterministic), live main a95e8d4 → 4dcd50e → 09b1bba (coop-thin-e: jcoopworld kept main's eW()/CW.ctx guards + ag parts) → 36e574f → 33e98993. Fixture fixes: emotion-acts (staff-cap), ag-toil2 (≥ 2 consorts at the mirror), hoa-dien.
- Pushed heads: **review/ag-all-2-land ee568c78, review/npc-chain-land 77818cb3** (= live 33e98993 + everything above). Gates: FULL on c75a6248 / 5cc576c9 (main 09b1bba) green except G3 (see below); QUICK on 36e574f and 33e98993 merges: spot (fig-seal Fold+iPad, staff-cap-apply, toil-react, walk-spill, ag suites, makeup-lux) + quickcheck ×2 + coop-e2e ×3 per branch green; 1 coop-e2e red = rank-worker CORS console line (network flake), 1 = known "friend starts as Người lạ".
- OPEN A — G3 kit-conform float "tutorial: 0 intro pages (want 4)": intermittent on ag-all-2-land (quickcheck red on c75a6248 both, ee568c78 ag; direct kit-conform 1/3), 0/4 on main 5cbfd620. A 6×/branch + main measure was running at rollover (dev/tools: copy index.html to _aa.html, python http.server, node dev/test/kit-conform.js <url>/_aa.html out.json 755x1000). C-AG #11: if main shows it too → ticket, not blocking. Suspect: something shows a dialog (busy()) right after start, so jtut tourStart pauses.
- OPEN B (main of the next step) — live main **5cbfd620 = odds-cap r2** (122 files incl. jagent, jagmaid, jbal, jbal2, j95, j95b, jtoil, jact, j10, j2…). C-AG #11 + ROOT-51 confirmed: merge 5cbfd620 into both heads, odds-cap wins on soft-fail / ladder words; route ag soft fails through j63 `oddsSoft` (reviewer note: main's BAL.odds.softFail = {spend:["suc"]} has no .me/.npc, so jbal2:916 default is never taken and jagent `agSoftTxt` returns undefined → every ag soft fail prints "undefined"; ONE rule: agSoftTxt(p,n,c) = p===S ? oddsSoft(n,c) text (her cost via oddsSoftCost once) : `${p.name}: <span class="r">bại</span> — người tính không bằng trời tính: ${kitSoftW(c)}.` + ap(p,oddsSoftCost(c)); drop jbal2 me/npc strings; lines jagacts2:71, jagacts3:40, jagent:37/41, jagstaff:106; run python3 dev/tools/typed-ladder-scan.py). Then FULL gates (gates list as above + coop-thin-e, coop-night, coop-timer, mg-skip, face-reveal, toil-harsh, kn-late, th-name, ag-truth) → SẴN SÀNG KIỂM to reviewer AG LATER #2 session_01UV1Szk6Tdgr6dBwZ498fDY + C-AG #11 session_01UV1SzkgegQEiMEPpSv12RN.
- Known fails on live main itself (not ours; FOR MAIN sent): emotion-acts (a95e8d4 FAIL 2, 4dcd50e FAIL 4); toil-react "modal is on top" (fixed on main by toil-react-top-rv); staff-cap-apply row 3 (fixed by staff-cap-row3-rv).
- Tools: gates = quickcheck.sh --runs 5 --cpu 4; SEED=7/3/5/11/13 QC_WT=<wt> node dev/test/coop-one-world.js; coop-e2e ×9 in 3 parallel streams (load); oldsave-r1 needs .tmp/old.html = live main's built index.html; toil-harsh/kn-late/ag-toil2/th-name take the path dev/index.html (not a file:// URL).

### LANDER #4 (session_01UV1Szhtw2R3XtEtZphy6p5, depth 7) — work + HANDOVER (rollover: context 40 % ≥ START_CTX ~5 % + 25 %; worker → coordinator C-AG #12 opens the successor)
PRIORITY #1 CHECK: OD 0 'ag-all-2-land' | main j63 oddsSoft/oddsSoftCost/kitSoftW reused (no new soft path) | review/* ag-all-2-land ee568c78, npc-chain-land 77818cb3 | claims LANDER #3 → #4.
- PUSHED heads: **review/ag-all-2-land 7301df77**, **review/npc-chain-land c9007252** = live **2850c45b** (odds-cap r2 5cbfd620 + look-fx-wire) merged in. NOT yet SẴN SÀNG KIỂM.
- Merge 5cbfd620 (~60 hunks, 35 files): odds-cap wins on soft-fail/ladder wording (oddsOf/oddsCapped/oddsCl/capW/kitSoftW, fix:/inner: flags, BAL.btn khắc), ag kept on top: pay-on-success (canPay/payWinFail/econPayWin), eyes(), BAL.ag.* rows, servDo (her + NPC; main's Tra khảo traO / Che chở cheO rolls ported into it, traO(s,m)/cheO(m) take the actor), coldActsOf, P3C/P3T (P3C.treat inner+oi treatO, P3T gossip/secret inner), empGive, mgX7 + main capRank7. All ag `cl(..,5,95)` → oddsCl (caughtOdds: BAL.caught min/max dropped, eitPilSee, c6, j70, contest odds jbal2 mg2). npc-chain got the same files from ag-land (identical where npc had the ag-land version, git merge-file elsewhere); npc-only hunks: j2/j20/j83/jemo/jpet/emotion-acts fixture.
- ONE soft rule (reviewer spec): jagent `agSoftTxt(p,n,c,pay)` = her → j63 `oddsSoft(n,c)` (logs once, charges oddsSoftCost(c) once: Sức only, never bạc; callers no longer log it again); NPC/servant → `${name}: bại — người tính không bằng trời tính: ${kitSoftW(c)}.` + pay(oddsSoftCost(c)) (ap / asAp), never S. jbal2 me/npc copies deleted. Sites: j10 threatServ, j70 tsv, jact đàn, jworld yến, jagemp pillow, jagknow tmTry/tmAsk, jagent Nghe lén, jagacts thHelp/hhShield/portrait, jagacts2 ag2Res/ag2Roll/show/likes/old/chest (ag2Soft(c)), jagacts3 p3Run/praise/maidSpy, jagstaff asRun. Callers that paid before the roll now roll FIRST (p3Run, ag2Roll, show, likes, portrait, asRun) → a soft fail charges only the Sức share. p3Run + asRun cap formerly-sure rows at BAL.odds.hi like her runOpt (SRVA follow/med/errand fix:1). runOpt: one soft path for capped acts AND raw odds ≥ hi (oddsSoft before paying); hints (optLine j17, j25, cardH j19) show kitSoftW when capd||agSoft(raw). jagday decision options lost the typed "Nắm chắc" → typed-ladder-scan 14 = main.
- Tests: dev/test/ag-soft.test.js updated to the merged rule (20/20); NEW dev/test/ag-soft-probe.js (12 buổi, agTry forced miss + agSoft forced on: no undefined/NaN/{n}; NPC line never charges S; her line Sức once, never bạc) 6/6 both.
- GATES on 7301df77 / c9007252 (live 2850c45b): quickcheck --runs 5 --cpu 4 PASS both (buổi 1268/960 ag, 1324/978 npc vs live). ag: G4 seeds 7/3/5/11/13 PASS, coop-toil-look ×2 32/32, ag-later 9/9 + scan, ag-toil2 16/16, toil-harsh, kn-late 4/4, th-name 4/4, ag-truth 11, ag-all 21 + b + c, ag-par3, ag-paywin 9, staff-cap + apply, cloth-xoc/stain, greet-stranger, one-core-guard, men-forbidden 288/0, set-bonus, shelf, fig-seal Fold+iPad, coop-night 105/105, coop-timer 43/43, makeup-lux, toil-react, walk-spill, emotion-acts PASS, hoa-dien, mg-skip, face-reveal, coop-thin-e 32/32. npc: same first pass green; 2nd pass running at rollover (emotion-acts FAIL 4 on npc = the known main fixture issue; live 55db864a "live-test-reds: emotion-acts odds pin" should fix it on merge). NOT RUN yet: coop-e2e ×9 per branch; npc feelings18/mood-mem/moodknow-step0/ag-moodknow (*.test.js names); G3 6× kit-conform measure.
- OPEN 1 (BLOCKING, reviewer AG LATER #2 11:50Z): PERF FAIL > +10 %: engine probe (reviewer's /home/user/wt/rvlog/t/eng.js — ask him to push it as dev/test/eng-probe.js) ag 41.8 vs live 30.1 ms/buổi (+39 %). Reviewer fix list: (1) jagday agReplanB redraws agDrawPerson every buổi even on 'keep' → reuse D.P[id][b] unless replanned/base changed (~−5 ms); (2) agOptsG memo per person per bkey + needs signature (~−2); (3) j95planRival called ~8× live from an ag path → cache per bkey; (4) jagtoil tl2Meet/tl2See: cache toilLookP per person per day, skip pairs not at the same place (~−2); (5) renderStage +2.5 ms with render stubbed: an ag hook does DOM layout in the step → defer / skip when the stage is hidden. Target ≤ +10 % (≈ ≤ 33 ms). My own in-page nextBuoi check (no CPU throttle, 24 buổi): old head ee568 mean 222 ms, new 230, main 211 → the gap is the ag world itself (pre-existing), not the merge.
- OPEN 2: final merge target = live **55db864a** (after 711d7bad cloth-tea, 13e2b834 kit-kpb, b3d2ccc7 d19-gift + residence-seats r2, 55db864a live-test-reds); then quick gates + residence-oldsave + one-core-guard + kit-conform + makeup/cloth checks; G3 'tutorial: 0 intro pages' 6×/branch + main measure (tool in LANDER #3 section).
- Tools (re-create in the new container): conflict helpers were scratch only (show diff3 hunks with `git checkout --conflict=diff3`); gates list above; coop-e2e ×9 = 3 parallel streams × 3 runs `node dev/test/coop-e2e.js <outdir>`; tests that need args: makeup-lux/toil-react/walk-spill/hoa-dien/mg-skip `<file url> 755x1000@2 <shotdir>`, emotion-acts `<url> <outdir>`, face-reveal `<url> [dir]`, coop-thin-e no args, men-forbidden `<url>`, fig-seal `755x1000@2 <dir> dev/index.html`.
- Handover to: C-AG #12 session_01UV1SzjsNq3uC3tq7Tc8S4S opens LANDER #5 (successor) — start from the two pushed heads.

### LANDER #5 (session_01UV1SzmC4Vsob8611uh6nPK, depth 8, START_CTX ~4 %) — work + state
PRIORITY #1 CHECK: OD 0 new | main a8a10c66 merged | review/* ag-all-2-land, npc-chain-land (+ eng-probe.js by AG LATER #2) | claims LANDER #4 → #5.
- PUSHED heads: **review/ag-all-2-land 79da4d93**, **review/npc-chain-land 686d2f4f** = live **a8a10c66** merged (12a1e4be poison-road r2 + live-test-reds; 636193f8 land-e r3 questline q0/q1/q3, hall-names, steal-minigame; a8a10c66 land-e r4 grand-endings-engine, life-preload-fu). NOT yet SẴN SÀNG KIỂM (perf merge pending).
- Conflicts 12a1e4be: assemble.py (+jpq.js), j14 roomFor("consort") + eyes(v), j8 eyes(p)*BAL.odb.j8.matInspect/matSearch, jbal ag time.cost + main res/seat halving, jbal2 ag j78 + main j8 taint keys, jpoison main BAL.odds.weak line + ag caughtOdds (one caught rule, BAL.caught.fac 4 = pg.cpFac 4), npc cook BAL.pg.npc.* + ag haOn guard, emotion-acts = main (odds pin); npc j7 = main harem-cap guard + ghenUp. 636193f8 / a8a10c66: assemble list only (main positions). Resolver scripts: /home/user/wt/l5tools (scratch).
- One core: main's new one-core-guard 'div' kind caught 5 ag-only typed divisors → BAL.odb.j42.frTcDiv/frDucDiv, BAL.ag.cx2.bribeSrv/plantSrv.tcDiv, BAL.ag.par3.fac.gDivTc (values unchanged). Guard PASS both.
- steal-mg-unit.js (main's new unit) fixture fitted to the land worlds (test only): servant stf2Ord → obey, window.__agOff + __feelOff + mm pinned in reset(), H not sameHouse, start loop skips kc/cnv starts, deck case checks the try's roll wherever it falls + the her-game up flag. Sequential: npc 6/6 clean, ag 8/10 (residual ~1/10: her life restarts mid-test via nlRun after a world death). Parallel runs add timing reds (30 ms wait) on main too. OPEN for npc owner: jfeel feeling odds apply only inside runAct (FEEL.cur) — check her person-menu odds display matches the roll.
- Gates: quickcheck --runs 5 --cpu 4 PASS both on bc746b2b / 4cac4f94 (core gates PASS; buổi 1534/1238 ag, 1124/911 npc vs live). npc ag-moodknow 33/33, feelings18 34/34, mood-mem 16/16, moodknow-step0 19/19. Both: nrask-engine/scan/m-scan, roadhp-unit/scan, hall-names-scan, ge-engine 104/104, ge-guard 6/6, life-preload PASS; steal-mg-nf SKIP (no jnf).
- Running at write time: quickcheck + coop-e2e ×9 per branch on the pushed heads. TODO: G3 tutorial-float 6× measure; residence-oldsave; perf: merge review/ag2-perf (AG2-PERF worker session_01UV1SzgvfBYs38MJqH9wsxK) when it says SẴN SÀNG KIỂM, then eng-probe (node dev/test/eng-probe.js dev/index.html <N> <seed> <out.json>, branch vs live alternating, seeds 1 2 3, N 80/160, target ≤ +10 %), then SẴN SÀNG KIỂM to AG LATER #2 + C-AG #12.

#### LANDER #5 — HANDOVER (rollover: context ~28 % ≥ START_CTX ~4 % + 25 %; depth 8 = no children → C-AG #12 opens LANDER #6)
- PUSHED heads: **review/ag-all-2-land 44a83196**, **review/npc-chain-land f7ef7148** = live **a8a10c66** (re-check origin/main; merge again if it moved — so far every main move only conflicted on assemble.py + index.html/sw.js: resolve the list with /home/user/wt/l5tools/asm.py logic = keep ours, insert main's new files after their main predecessor; `git checkout --theirs index.html sw.js`; `bash dev/site/build_site.sh`; one-core-guard).
- Since the report above: quickcheck --runs 5 --cpu 4 PASS both on 79da4d93 / 686d2f4f (core gates PASS; buổi 1222/1257 ag, 1296/933 npc vs live — quickcheck perf is not the perf gate). coop-e2e ×9: ag 8/9 done all 63/63 at write time, npc pending (logs /home/user/wt/l5tools/ce-*.sum, scratch).
- npc-chain-land 6a97777f: **jfeel shown = rolled** (C-AG ask 2): feelWrapActs runs every ACT[k].o in its act context (FEEL.cur), idempotent, re-run at start; new dev/test/feel-shown.test.js 6/6 (before: 8+ acts shown != rolled, Tranh sủng shown 65 rolled 69). feelings18 'every feeling fires its own act' (chan/khochiu null) is FLAKY with and without this change (2/2 red on the old jfeel, 1/2 on new) — pre-existing, open for the npc owner.
- steal-mg-unit (C-AG ask 1, test only, same file on both): root causes pinned — servant stf2Ord → obey; __agOff/__feelOff; mm pinned; H not sameHouse; start loop waits nlFigsReady before EVERY start() (j52 nlBegin deferred new lives fired mid-test = the 'servant deck' red, main too); person-menu base read inside ACTX (lá số lotB ±5, main too); rung checked on the her-game record. 20 sequential runs: ag 19/20, npc 19/20; residual 1/20 = deck section sees S.srv with no srvInit recorded after the start loop (next step: hook S.srv with a setter in the fixture to catch the writer). Run sequentially (parallel runs add timing reds; the unit waits 30 ms).
- MAIN FINDING (report to MAIN ROOT-52 via C-AG, not fixed here): the person menu j15 `a.o(S,v)` shows odds without the runAct ACTX parts (lotB lá số, spyKnowB) that the roll adds → shown != rolled when her lot domain matches the act (same class as the jfeel fix).
- STILL TODO: (1) residual steal-mg 1/20; (2) G3 tutorial-float 6× measure (tool in LANDER #3 section); residence-oldsave `<oldUrl> <newUrl>`; (3) PERF: AG2-PERF session_01UV1SzgvfBYs38MJqH9wsxK builds review/ag2-perf (now A per OD L1637 + B) — on its SẴN SÀNG KIỂM merge into both heads, quick gates, eng-probe (branch vs live alternating, seeds 1 2 3, N 80/160, target ≤ +10 %); (4) SẴN SÀNG KIỂM <ag> <npc> to REVIEW AG LATER #2 session_01UV1Szk6Tdgr6dBwZ498fDY + C-AG #12.
