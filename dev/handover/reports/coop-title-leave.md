# coop-title-leave — B CO-OP FIXER #12 (review/robot-coop-fix-7)

PRIORITY #1 CHECK ('slot chooser coop leave title'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 (from the brief); my own git grep: the leave-on-☰ is jslots.js:55 (review/save-slots, owner 16/11); no branch had a fix for it.

START_CTX ~8 % of the window (own estimate). Session session_01N1tNP65tXs3614dfaVXJ5p. Base = LIVE main 9f72524b. fix-6 (c4163a93) not landed: the same commit also cherry-picks onto it with no conflict (tested there too, below).

## Root cause (confirmed on LIVE main and on fix-6 c4163a93, local Worker)
1. `jslots.js:55` wrapped ☰ «Ô lưu»: **in a room, ☰ called leaveRoom() = COOP.leave(true)** (review/save-slots, to stop a solo sổ being rebuilt into the co-op life). So the very tap on ☰ left the room: COOP status off, room '', COOPW.on false; the friend froze «Đợi hảo hữu trở lại» for ever.
2. `j74` title home card «Cung Tường Mộng»: its kit ✕ (KIT 32.10 from the hidden #mr «Lui»), Esc and tap-outside ran closeModal → the card left the queue, #modal hidden, **#title stayed up = the bare cover with 0 buttons**. Same in SOLO (main: ☰ → ✕ = bare #title, the life is lost to the player until a reload).
3. Other title-layer cards that drop every kptitle card and then hide #modal (jcloud `drop()` after a cloud pick, jcooplobby `drop()`) can leave the same bare cover (guarded now, see 4).

## Fix (whole family, LAW 11)
| # | Way out to #title during a co-op life | Before (main) | After (fix-7) |
|---|---|---|---|
| 1 | ☰ «Ô lưu» | leaves the room at once | room kept; opens the co-op life menu: «Trở lại cuộc chơi» / «Rời phòng» / Sổ luân hồi / Thiết lập (+ Bảng vàng, Xem lại lời dặn added by their modules) |
| 2 | menu kit ✕ / Esc / tap outside | bare #title, 0 buttons | back to the running game (no reload, same room) |
| 3 | Thiết lập / Sổ luân hồi › ‹ Lui › ✕ | bare #title | back to the menu, then the game |
| 4 | Chơi một mình / Kiếp mới / Cùng hảo hữu (new room, other room) | on the menu, each leaves the room silently | not on a co-op life's menu (the solo-sổ capture that leaves first is kept as a safety) |
| 5 | Xem lại lời dặn (kitMenuResume = load the last SOLO sổ) | left the room, loaded a solo sổ | back to the co-op game, room kept |
| 6 | «Rời phòng» (new) | — | kitConfirm «Rời phòng?» (KIT 83.9); ✕ = stay; yes = a `say` line `ctm:roi-phong` to the friend, then leave (room kept in the list for «Trở lại phòng») |
| 7 | freeze panel «Về màn đầu» | leaves silently | the same confirm first (the freeze panel waits under it; ✕ brings it back) |
| 8 | the friend's side | «Đợi hảo hữu trở lại · Hảo hữu đang vắng» | «Hảo hữu đã rời phòng» (FZT.left, same kit freeze panel) |
| 9 | any card closing while #title is up with nothing on it (jcloud / lobby drop, reload paths) | bare #title | guard `bareCheck` (j74): back to the life behind, else the home menu (`window.__ctmBare` counts it) |
| 10 | first-open home (no life behind) | ✕ shown → bare #title | no ✕ (nothing to go back to) |
| 11 | SOLO ☰ → ✕ / Esc | bare #title | back to the same running life; Chơi một mình / load / new sổ unchanged |

Kit parts only: kitModal home card, kitConfirm (KIT 83.9 danger button), kit ✕ (32.10), the freeze kit panel (#coopfz). No new CSS. Words cổ trang (VANPHONG), no %.
Files: dev/build/j74.js, dev/build/jslots.js, dev/build/jcooplobby.js, dev/test/coop-title-leave.js (new), index.html, sw.js.

## Tests (local Worker = coop/worker of main via `wrangler dev --local --port 8791`)
| Test | main 9f72524b | fix-7 | fix-7 on fix-6 c4163a93 |
|---|---|---|---|
| coop-title-leave.js (Fold 755x1000 host + iPad 1180x820 guest, + solo both devices) | **45/112 FAIL** (☰ → st off, room '', bare #title; solo ✕ bare) | first run 104/107 (3 checks read the fixed #coopfz by offsetParent = null; fixed in the test and in bareCheck), then **82/82 PASS** co-op; solo part 30/30 PASS both devices | 82/82 PASS |
| coop-title-leave.js COOP_SWAP=1 (iPad host) | — | 82/82 PASS | — |
| C8 reload mid-room (XKG7 case) | — | back in the room, never bare | PASS |
| coop-e2e SWAP0 | 142/142 | 142/142 (one earlier run 141/144: «week after rebirth advances» stuck = the fix-6 calendar CAUSE 4, not this change) | 142/142 |
| coop-e2e SWAP1 | — | 142/142 | — |
| coop-cal-rebirth (fix-6 test) | n/a (not on main) | — | 51/51 PASS |
| coop-keymove-unit | — | 12/12 | — |
| quickcheck (open · old save · perf, core gates) | — | PASS (open 2304 ms, old save ok, perf median new/live render 364/309 ms, buổi 2273/1898 ms — machine noise, 4 parallel browsers earlier) | — |

## Notes
- XKG7 (Foreman B 09:40Z): its dumps show `COOPW` null on the bare title (the game globals not there) = the page had not booted (loader / CDN 429, F 5edf09f6) — no game code can draw a menu then. Where the game did boot, C8 shows a reload mid-room comes back to the room.
- Rebase: if fix-6 lands first, `git cherry-pick` of the two commits applies clean (proved on tmp worktree).

### HANDOVER (FIXER #12 → successor)
- Branch review/robot-coop-fix-7 on LIVE main 9f72524b: d678328f (code + test), be6c1159 (index.html/sw.js rebuilt), 4a62e4d9 (this report). SẴN SÀNG KIỂM sent to FOREMAN B; reviewer = session_01N1tNP2DEvrn63HHg5eMcAz. Take any FAIL items from Foreman B.
- Changed files: dev/build/j74.js (lifeBehind, homeMr, backToGame, go("game"/"leave"), resumeGame in a co-op life, bareCheck guard), dev/build/jslots.js (☰ no longer leaves; CTM_ROOM_LIFE menu/ask/askThen/leave; BYE "ctm:roi-phong" via COOP.send("say")), dev/build/jcooplobby.js (addBtn skips data-coop-life menu; FZT.left + LEFT flag from "said"; freeze «Về màn đầu» → confirm with HOLD), dev/test/coop-title-leave.js (new), index.html, sw.js.
- If fix-6 lands first: rebase / cherry-pick d678328f onto it (applies clean, proved), then rebuild with bash dev/site/build_site.sh and commit index.html + sw.js.
- Local Worker: `cp -r coop/worker /home/user/wt/wr && cd /home/user/wt/wr && npm install`, then in the worktree's coop/worker: `ln -s /home/user/wt/wr/node_modules node_modules; node_modules/.bin/wrangler dev --local --port 8791 --ip 127.0.0.1`.
- Run: `python3 dev/build/assemble.py && node dev/test/coop-title-leave.js http://127.0.0.1:8791` (env COOP_SWAP=1 iPad hosts; CTL_SOLO=0 skips the solo part; CTL_ROOT=<main worktree> serves another build = bare FAIL proof; CTL_OUT=<dir> shots). ~6–8 min per run.
- Gates done: coop-title-leave main 45/112 FAIL → fix 82/82 (SWAP0, SWAP1, on fix-6) + solo 30/30; coop-e2e SWAP0 142/142 (1 run 141/144 rebirth-calendar, rerun 142/142) SWAP1 142/142 (`node dev/test/coop-e2e.js <outdir> http://127.0.0.1:8791`); coop-cal-rebirth 51/51 (fix-6 test, on fix-6 + fix-7); keymove 12/12; quickcheck PASS.
- Worktrees deleted; nothing local left.
