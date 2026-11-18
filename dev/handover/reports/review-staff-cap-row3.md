PRIORITY #1 CHECK ('staff-cap-row3|staff-cap-apply'): OD 0 | ledger 0 | claims 8 | main 3 | review/* 3 | archive 0
# review staff-cap-row3 (sonnet reviewer) — review/staff-cap-row3 @456010f8 → verdict branch review/staff-cap-row3-rv @bc7640dd (origin/main a95e8d41 merged in, FF-able)

Merge: main had moved; only conflict = index.html (branch carried just the CTM_BI build stamp) → took main's. Diff vs origin/main is now dev/test/** only (6 files + my 2 small edits).

| # | check | result |
|---|---|---|
| 1 | diff touches only dev/test/** | PASS (worker's raw branch also had the 1-line CTM_BI stamp in index.html; dropped in the merge — no dev/build, no BAL) |
| 2 | Row 3 verdict | PASS. j17.js:43 comment + code: `@W<n>` keys = `AV.women[n]` inline faces, set to 1 without any file. Test now counts only non-`@` FAV keys; it still asserts identity pool 52/30/8, roomFor maid+eunuch, worst palace 12/16/20/24 each household = table row, old-save eunuch leaves + told, 30-year face GC, Nữ đế capNd. Table in BAL (jpromo.js:23) = OD 18/11 ~02:15Z + FINAL ~02:50Z verbatim ([1,0],[2,0],[2,0],[2,1],[3,1],[3,2],[4,2],[5,2]; Thái hậu 5+2; Nữ đế 5+3). Not weakened. staff-cap-apply ALL PASS on merged tree. |
| 3 | outside/route.js | PASS. Branch ×3 fail:[] (danh 31/33/32 ≤ lim 44); live main ×3 with the fixed test fail:[]; OLD test on main fails `Danh carry-over 32` (premise confirmed). Bound reads BAL.kcv + carry. I changed the typed tier factor `[.8,1,1.2]` to `S.kc.carry.f` (ONE CORE). Still typed: entry caps 30 / 400 (mirror jkc.js:539). |
| 4 | data-tgo=cont → slots/data-load, run end-to-end | life-preload CONT=1 PASS (0 blank, no error); sw-update `main` 5/5 PASS (old sổ loads); **warm-continue FAILED as the worker wrote it** (`no Tiếp tục`: the solo button's text is "Chơi một mình…", "Tiếp tục" is only its subtitle, so the /^Tiếp tục/ match never hit) → I fixed (select `[data-tgo=slots][data-cstab=solo]`), now runs: firstScreen 641 ms, blank 0. **tutorial.js `old` still FAILS** (below). |
| 5 | one-core-guard / quickcheck / touched tests | one-core-guard 0 fails. quickcheck PASS (render 149/167, tab 350/358, buổi 862/911, tasks>200ms 14/14, old save ok, core gates + time-spill PASS). staff-cap-apply PASS, route PASS, life-preload PASS, warm-continue PASS (after my fix), sw-update main PASS, **tutorial old FAIL**. |
Fold/iPad shots: none — diff has no UI/game line.
Not touched / noted: sw-update `play` scenario 21/24 (same tab, 0-lost ×2) — in code the touched line is only in `main` scenario; same game as main, unrelated, not chased.

## FAIL 1 @bc7640dd9ff82924605799d9c70fc2e6b0bf690e
1. dev/test/tutorial.js `old` mode is still red on the branch: `{"old":{"loaded":true},"asked":false}` then `null.click` crash at line 73 (`#ktut [data-ktut=no]` never shown). Loading now works, but the "asked once" card never appears (same on main's build). Worker blamed the dead `data-tgo="cont"` in jtut.js:398 addReplay (that is a real separate game bug: the ☰ "Xem lại lời dặn" never gets added — send to a tutorial/title worker), but that is not what blocks `asked`; in my probe after the slot load `quiet===true` (jtut `botOff()` → loop returns before askOnce) — so the test must clear `quiet` as the other CONT tests do, or the load path leaves quiet on. Worker: diagnose, fix the test (or file the game bug) and make `old` PASS (or drop the assertion with owner-visible reason); do not claim "SẴN SÀNG" with a red touched test.
Everything else is PASS; my 2 small fixes (warm-continue selector, route.js carry factor) are on review/staff-cap-row3-rv — keep them. Re-review = tutorial.js old only.

FAIL 1 @bc7640dd9ff82924605799d9c70fc2e6b0bf690e + list above
