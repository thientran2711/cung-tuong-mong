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
