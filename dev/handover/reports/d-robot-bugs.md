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
