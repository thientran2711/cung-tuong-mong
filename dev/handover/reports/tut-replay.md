# tut-replay — report (worker, owner-bug fast lane)

Branch review/tut-replay @ ecd2ffb3a (off origin/main). One small change. READY FOR REVIEW (SẴN SÀNG KIỂM ecd2ffb3a).

## Root cause
The suspected spot (jtut.js l.401-404) only triggers the problem; the cause is in the save.
`serQ()` (j3.js) saved every queue item without `opts`, including the open title-menu card (HM/SM, cls `kptitle`). The "back to the game" path of the ☰ menu ("Tiếp tục", and "Xem lại lời dặn" which clicks it) reloads the slot from disk (`deser`). Whenever an autosave (`save()` runs after every render) happened while the menu was open, the slot held the menu card; the reload restored it as an empty legacy popup titled "Cung Tường Mộng" and the menu came back on top of the game, so the tour (waits while `busy()`) never started. Timing dependent → about 1 in 4.
Second entry of the same group: ☰ > Thiết lập > "Xem lại lời dặn" had no "Tiếp tục" to click and only closed the sub page, which lands on the menu home again (failed every time, found by the new test).
Trace evidence: after replay click → cont click → load click, Q empty/modal hidden, then ~90 ms later Q = ["Cung Tường Mộng"], modal open (item keys t,h,cls,btn,who = deserialised legacy item, no kit).

## Fix (whole group)
- dev/build/j3.js: `isMenuCard`; `serQ` never saves menu cards, `deserQ` drops them (old saves that already contain one load clean).
- dev/build/j74.js: `resumeGame()` = the single close-menu-then-load path, exported as `window.kitMenuResume`; "Tiếp tục" uses it.
- dev/build/jtut.js: "Xem lại lời dặn" (home page and Thiết lập) calls `kitMenuResume()`; no per-button hack.
- Rebuilt index.html / assets.json / sw.js (build_site.sh).
Other menu entries that open a flow (Kiếp mới, Sổ luân hồi, Thiết lập, co-op button) do not close-then-open a game flow via the save; they stay unchanged.

## Test
`node dev/test/tut-replay.js <url> WxH@dpr [N]` (env OPT_N = rounds via Thiết lập). Each round: ☰ → (odd rounds: forced `save()` while the menu is open) → replay → modal closed AND tour step 1 visible within 6 s; plus old-save check (stale menu card in a slot loads clean, a real pending event stays).
- BEFORE (origin/main): round 1 with forced save fails, menu stuck; Thiết lập replay 0/8.
- AFTER Fold 755x1000@2: home 20/20, Thiết lập 10/10, old save OK, no page errors.
- AFTER iPad 1180x820@2: home 20/20, Thiết lập 10/10, old save OK, no page errors.
Run in direct mode (`?khost=0`) against the built root index.html served from the worktree.

## Shots
dev/handover/reports/shots/tut-replay-before.jpg (old build: menu stuck open, no tour) and tut-replay-after.jpg (new build: tour card on step 1), Fold 755x1000.

## Handover note
Worker finished well under the context ceiling; nothing left to resume.
