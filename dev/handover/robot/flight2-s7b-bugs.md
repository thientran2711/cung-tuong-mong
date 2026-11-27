# flight2-s7b bug file (final)
LIFE: iPad 1180x820, bot=cautious, seed 2026112533. Game build a1d2c8d4a29c (main 1dcb373e, CTM_BI s 2673733e, 2026-11-26T09:18Z), served from a local copy (BUILD PIN on, :8744). One life, no restart of the life: ckpt resumes only (see below).
Ending (game-imposed, not chosen): «Lãnh cung — Tuổi xuân qua đi», age 40, year 22, buổi 3018, 2626 taps, 0 dead buttons, stuck counter 0 (see HARNESS GAP below), exitPick none, jsClicks 0. Rank (srv.rk / STATUS): 0 → 1 (b425) → 2 (b655) → 0 (b843..b1128) → 2 (b1203) → 1 (b1398) → 2 (b1751) → 1 (b2278) → 2 (b2609) → 1 (b2950). Promotion offers 687 seen / 290 picked (decree 468, exam 207, select 12).
Harness lineage: 0e0ebe29 (start) → 8ea10d7e (switch at b232) → 97e55a457 (b2107) → 39c6e505 (in-place checkout 03:04Z, used from the b2417 resume) → f65d019b (in place 04:45Z, used from the b2614 resume). Every switch: same life, same out dir, same pinned build, save got = want.

## GAME bugs
- SAVE QUOTA SPLIT (b2610, year 19): localStorage.setItem('hclh-save-v2-1') throws QuotaExceededError at 5209334 chars, then every later save fails (j6 save() swallows it, ×1480). SAVE STALE: stored b2632 (5205066 chars, clock 19.218.2.1) vs live b3018 at the end (gap 386 buổi); the real save reached ~5.8M chars (~2.2K chars/buổi). The harness ckpt copy kept the life resumable (restores 5195588/5195588 chars at b2614 worked).
- KG82.phase stays «play» after the round ended: board theu shows its result («#kg82ok Xem kết quả» enabled, #kg82box hidden) but the game never sets phase «result» (×7). Root of the theu loops below.
- .kmov dialog scrolled to the end has no close / next button (×134; first seen b53; shot noclose-1795698161585.png).
- Item pick grid «Biếu quà làm lành»: the confirm «kipgo» stays off-screen after 8 real scrolls (×1).
- Console 404s on the pinned copy: /img/kit/emo-anim|emo-fx/binh.webp, vui.webp, emo-choang.webp, /img/kit/ico-download.webp (FOR MAIN 168 family).

## HARNESS gaps / bugs
- HARNESS GAP job 17 (F #24): #kdaytc «no way out» (tap-to-skip day card, not a game bug) ×2: b~655 (Sắc80 Tài81 …) and b~1400 (Sắc73 Tài99 …). Fixed in review/robot-realtap aece1ff5. Shot + save kept (nohit-1795709517415-{dump,save}.json).
- PIN COPY MISSING dev/vendor (pixi 404): the rt-serve-build sparse copy lacked /dev/vendor/pixi-8.5.2.min.js (page console 404 ×1900). Pixi-drawn screens from b1 until the first page load after 01:31Z (b2256 file copy; page loaded it at the b2417 resume) are «degraded vs LIVE» — NOT game bugs. Also /audio/* 404 on the old pin dir from 03:05Z to 04:25Z (fixed by 39c6e505 rt-serve-build re-serve at the b2609 resume).
- theu board loops (harness, FIXER #16): the stuck ladder never fired (board activity reset the no-clock timer) and a finished exam/result layer was treated as an in-play board: b2417 (26 min), b2609 (15 min), b2614 (8 min); each with «FREEZE STACK … Mt._tick @:7:65685» (renderer 903-1684 MB). Evidence out-s7b/stuck-2417 | stuck-2609 | stuck-2614 (png + run.log excerpt + ckpt before unstick; not committed, ckpt 6-7 MB each). Fixed by f65d019b: afterwards «BOARD theu 27 moves over … Xem kết quả pressed» in ~22 s.
- Picker stalled 97 steps / 60 s on .kmov (×1, harness) and NO-EXIT DIALOG .kmov (×1, harness).
- SAVE REWIND ×2 after reloads: b2377→b2376 (container restart 02:25Z) and b2609→b2608 (unstick); 1 buổi lost each.
- Container restart 02:25Z: all processes killed, disk kept; resume from ckpt 02:24:32Z b2377; BUILD PIN re-serve failed (rt-serve-build.sh exit 2, build older than 60 main commits) → pin server restarted by hand on :8744 from the same worktree; fixed in 39c6e505 (--b walk finds old builds / resume re-serves a dead pin).

## Runner facts
- Unsticks (all by killing only the node process, wrapper `until … resume=1` reopened the SAME life): 02:25Z container, 03:05Z (b2417), 04:25Z (b2609), 04:46Z (b2614). Harness switches at b232 and b2107 by the same kill+resume. Never a restart on a different URL, BUILD MISMATCH never seen.
- Crashes: 0. Dead buttons: 0. jsClicks: 0.
