# d-robot-bugs — Worker B1 report (25/11) — branch review/d-robot-bugs @ 95eafc6e (off main 9f72524b)

PRIORITY #1 CHECK: `prio1.sh 'rk.split pcPort'` = OD 0 | ledger 0 | claims 0 | main 0 | review/* 0; git grep of review/robot-fix-cnv-2 (F): only "old-world timer" fixes, no ✕/Lui/«???»/rk fix → built new. A4 dumps (rerun-nc_vuong @15d6d63b) read: saves hold NO pending queue (Q=3 / Q=10 counts only) → causes found by code + a harness that re-creates the queue state.

Test: `node dev/test/d-robot-bugs.js [WxH,...]` (Fold 755x1000 + iPad 1180x820, real mouse taps; `ROOT_DIR=<built main checkout>` runs it against another build).
**Before (main 9f72524b): 15 of 16 checks FAIL · After (95eafc6e): ALL PASS.** Shots looked at (Fold + iPad).

| # | Bug | Root cause (one place) | Fix | before → after |
|---|---|---|---|---|
| 1 | JS «f.rk.split is not a function» (Dò hỏi gia thế) | j15 `pcPort` called `f.rk.split(" ")` / `f.rk.slice(1)` on any truthy `.rk`; a person record carries `rk` as a NUMBER (maid/eunuch rank) or object | `kitRk(f)` (string-only) + `kitRkCls(f)` in j15; `pcPort` and j3 `mdH` use them. Static scan in the test: no `.rk.<string method>` anywhere in j*.js | THROW «f.rk.split is not a function» ×5 inputs (number/object/array/null…) → 0 throws, no junk class |
| 2 | «???» under «Thái giám Nội vụ phủ» (pet shop), «Quý phi ??? có lời nhờ» (Tin chờ) | j61 name mask hides the name of anyone she has "not met"; the pet-shop / Nội vụ phủ-shop seller (S.court.ped) and the sender of an order (jptime `ptOrdAdd`) talk to her face to face but were never introduced | `k61Meet(person,"",2)` at the three entry points (jpet `petShop`, jinv `kitShopNvp`, jptime `ptOrdAdd`) → real name from then on (law 6b) | seller shows «???» (3 of 3) → real name (3 of 3) |
| 3 | «Bổng lộc tháng ba · Lễ nghĩa»: both options do nothing | j6 modal click → `chooseM(i)` acts on **Q[0] at the tap**; the dialog on screen was drawn for another card. A gate put a card in front after the draw (dump had 3 queued) → `m.opts[i]` missing / wrong card | j3 `showModal` stores `M.__card`; new `qBind()` (j3) puts THE DRAWN card back to the front by identity (gone card = redraw); j6 option + `#mclose` taps go through it | option tap: A=0,B=0 (nothing ran) → A=1,B=0, the other card untouched |
| 4 | ✕ / Lui no effect on «Tin chờ người sai đi» + 3× «Tâm trạng · X» | (a) same stale-Q[0] bug in jk4 `kitModalCloser` (✕ closed/answered the hidden forced card; «Tin» had no ✕ at all when a forced card was in front); (b) look-up openers pushed ANOTHER copy per tap (dump: 10 queued) so ✕ popped one and the same dialog showed again | (a) kitModalCloser bound to `M.__card` via `qBind`; (b) j79 `kitPanel`: look-up / status panels (`spec.look` or `spec.dedupe`; jstatus sets it) are ONE queued card per title+sub | ✕ pops the wrong card (forced card consumed) / no ✕ → ✕ closes the dialog, forced card kept; 6 taps = 6 queued → 1 |
| 5 | Ending banner over «Kiếp này» rows | **DROPPED by D (MAIN 139 → KK28, KIT BUG #4); my kit CSS change REVERTED** (j93 identical to main) | see «for KK28» | — |

## for KK28 (KIT BUG #4 — repro + the fix I found, NOT on my branch)
- Repro (Fold 755x1000 or iPad): `S.age=19; over("Hồng nhan bạc mệnh","Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 19 tuổi","bệnh",false); showModal()` → wait ~1 s (remove any `[id^=kroul]` overlay and clear `kmReset()` first, they delay the scene).
- The words are NOT part of the card: j93 `W("over")` → `kitInk({title:h})` (j93:206) = a `kmStage("km-inkov", …)` full-screen scene: `.kmov.km-inkov > .kmst > .kmink > .kmicap` («Hồng nhan bạc mệnh» + «Mở Sổ luân hồi» — the review read «Mở» as «Mẹ»). It sits ABOVE `#modal.end` (the «Kiếp này» card is shown at the same time; the ink blot does not cover the caption centre) and the scene only ends on the scene-end button/tap.
- Fix I tried (works, 1 rule, every mourning ending): in the j93 CSS block next to `.kmink{…}` add `body:has(.kmov.km-inkov:not(.km-out)) #modal.end{visibility:hidden}` (card held back while the ink plays, shown the moment it goes). Alternatives: delay `showModal` of the end card until the ink scene's `onEnd`, or put the caption inside the scene's own ground.

## Checks (own build, build_site.sh)
- `dev/test/d-robot-bugs.js` Fold + iPad: ALL PASS (main: 15/16 FAIL). one-core-guard PASS (fails 0). `quickcheck.sh 95eafc6e` (alone): QUICKCHECK PASS · core gates PASS · old save loads + plays a buổi · perf render 214/213 ms, tab 555/456, buổi 1334/1067 (new/live medians, within gate).
- LIMITS: the A4 saves do not hold the pending queue, so the exact dialogs could not be reloaded; the root cause is shown by re-creating the state (forced card put in front after the draw; 6 look-up taps). Images are blocked offline in my runs (grey slots) — layout only. Whole-group scan of other `.rk` string uses = none left; other direct `chooseM`/`closeModal` DOM callers: only j6 (covered) — bots call `chooseM` directly (unchanged).

## Rollover
START_CTX not measured by get_session (reads 0); work finished in one context, nothing left to hand over.


## REVIEW — review/d-robot-bugs 95eafc6e (fixer B1, robot-found bugs #1–#4, #5 reverted) — VERDICT: PASS 95eafc6e (FF on main 9f72524b)

Reviewer RV2 (BIG tier) session_01D3E3NaSsipN1iUZHpNZHje, 25/11, for Foreman D (session_01D3E3NaPBjGqCrNCNpcpoBp).
PRIORITY #1 CHECK: FOREMAN_D_STATUS 11:20Z (B1 fixes #1 f.rk.split; ending banner → REVERT, KK28 owns KIT BUG #4) | main 9f72524b (= branch base, branch is 3 commits on it, FF-able; origin main still 9f72524b at review time) | review/* none overlapping | claims D → B1 session_01D3E3NZRWbpM7zyLv8pxisZ.
Rules: START_CORE (18 laws), START_WORKER, START_REVIEWER, KIT.md / VANPHONG.md (no player wording added beyond the existing k61 notice).

### What the branch does (files j15 j3 j6 jk4 j79 jinv jpet jptime jstatus + dev/test/d-robot-bugs.js)
- #1 `kitRk(f)` / `kitRkCls(f)` (j15): a face's .rk read as a class string only; pcPort + mdH use it (no more `f.rk.split is not a function`).
- #3/#4 `qBind()` (j3): every modal tap (option j6, #mclose j6, ✕ / Lui / Esc / tap-outside jk4 kitModalCloser) acts on `M.__card` = the card the dialog was DRAWN for (set in showModal); if a gate put another card in front after the draw, the drawn card goes back to the front by identity; a card already gone → the screen just redraws (tap does not answer a hidden card).
- #4b kitPanel (j79): look-up / status panels (spec.look / spec.dedupe; status icon panels get dedupe:1, jstatus) = ONE queued card per title+sub.
- #2 law 6b: pet shop + Nội vụ phủ shop sellers and whoever orders / asks her (ptOrdAdd) go through k61Meet(…,2) → named, never «???».
- #5 ending banner: REVERTED — `git diff 9f72524b 95eafc6e -- dev/build/j93.js` = empty ✓ (KK28 owns it).

### Gates (reviewer reran, worktree /home/user/wt/rb; index.html = fresh build, only the CTM_BI line differs)
| Gate | Result |
|---|---|
| d-robot-bugs.js (Fold 755x1000 + iPad 1180x820, real mouse taps after an evaluate setup) | ALL PASS (21/21): scan 0 `.rk.<string method>` left; pcPort/mdH with rk number/object/array/null; ✕ on «Tâm trạng · X» and «Tin chờ người sai đi» closes the drawn dialog, the forced card in front is NOT answered; «Chu toàn lễ nghĩa» runs its own option; look panel ×6 = 1 card, one ✕ closes; sellers + orderer named; 0 page errors |
| coop-e2e | 142/142 |
| dayq-hold-coop | 17/17 |
| night-coop-park | 13/13 |
| visitor-scene | PASS |
| kit-entry-gate / kit-modal-spin | PASS / PASS |
| modal-swipe | same as before (fits; «long event» did not open = probe) |
| oldsave-r1 (main 9f72524b build save → branch) | 16/16 |
| bongloc-coop | FAIL 2 — SAME 2 fails on main 9f72524b («guest: the option buttons are drawn on the frame») → pre-existing, not this branch |
| dayq-hold / dayq-order | harness broken on main too (TimeoutError / `start is not defined`) → not judged |
| one-core / rules-one-source / kit-conform (quickcheck core gates) | PASS ×4 runs |
| quickcheck ALONE ×4 | run1 FAIL perf buổi 3585/1919, runs 2–3 PASS (1585/1378, 2667/1470), (render/tab equal everywhere). The quickcheck buổi plays a DIFFERENT random fresh life on each side and calls chooseM/closeModal directly (qBind is not on that path) → noise. Decided with a seeded same-save A/B (robot save flight2-s8, 10 alternating pairs, iPad): at equal card count branch 1 card 696–908 ms (median ~753) vs main 716–937 (~873); 0 cards 518–619 vs 481–581 → NO slowdown from the branch. |

### Real taps, old save with a queued card (law «old saves load»)
Robot save flight2-s9.ckpt.json (older build, Q = 11 cards, Kính sự phòng card in front + the «Tâm trạng ·» stack): Fold + iPad, branch vs main, real taps on the option title → Kính sự phòng → Chuẩn bị thị tẩm → Đêm thị tẩm → night scene, Q 11→10, identical on branch and main, 0 page errors. Note: a tap on the CENTRE of a kit option card hits its odds bar and opens «Thang cơ duyên» (by design, same on main) — probes must tap the title.

### Code review of qBind (forced card / gate / co-op)
- Every showModal wrapper (48) either calls the base (sets M.__card) or hides the modal (jdayq hold) / keeps it hidden (jdfv wait) → no visible dialog with a stale M.__card found.
- A card removed from Q by other code while its dialog is still visible: the first tap now only redraws (before: it answered whatever was Q[0]). Safer; watch item, no case found in the tests above.
- Co-op: the guest's shop is built in her own context (jcoopthinf KSH) → k61Meet acts on her, one world ✓.

### Laws
1 n/a · 2/3 n/a (no new choice) · 4 no numbers · 6b ✓ (sellers / orderers named) · 7 wording: only the existing k61 notice «X xưng danh với ngươi.» · 9 kit: no UI part added or changed; #5 reverted to the kit keeper ✓ · 11 family: .rk scan (whole build), every modal tap path through ONE qBind (option / mclose / ✕ / Lui / Esc / tap-outside), every look/status panel deduped ✓ · 12 Fold + iPad ✓.

### Non-blocking
NB1. ptOrdAdd / rcvCard: a request SENT THROUGH A MESSENGER («… sai người sang») now runs k61Meet → also sets S.met (face un-greyed) + npcLearn for a consort she never saw. Naming is right (law 6b); the face/met step is more than a messenger gives — prefer k61Know(m,"",false,2) when !ptOrdIs(o).
NB2. d-robot-bugs.js label «six taps on a look-up opener» = six kitModal calls (the real opener jevb.js:80 is kitModal look:1, so the path is the same) — rename or tap the real seal.
NB3. dayq-hold.js / dayq-order.js harness rot (fails on main) — for D's tool list.

### Verdict
PASS 95eafc6e — fast-forward of main 9f72524b. No reviewer commits.
