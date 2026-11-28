# flight2-s2j review (honest note first)

**Honesty note.** Written by the life-runner session as a SUPERVISOR: it started and watched the harness (log / STATUS / CP lines, the ckpt save state S through rt-save.js, an illness log) and looked at only a few screenshots. It did NOT play the life screen by screen. Art / text / pacing / emotion scores are N/A.

## Life
- life flight2-s2j, persona cautious + pick="Tĩnh dưỡng|Truyền thái y", dev fold (755x1000), seed 2026112568, fresh profile, harness review/robot-realtap-live-r22c 795f87ec (sparse worktree incl. dev/build), started 2026-11-28T02:22Z, LIFE DONE 11:5xZ (~9 h 30 m), one runner pid (25354), no crash, no resume.
- SINGLE BUILD 5fb13d60+ (b 8af7b3429f38, t 2026-11-27T21:15Z) = origin/main 18003079, served locally with pin=1 (pixi 200). NOT mixed-build.
- END: «Thái phi — Thành Thái phi», age 34, year 16, buổi 2237, 17680 taps, 0 dead buttons, 0 stuck, 7 bugs. Real taps (jsClicks 0), exitPick none. robot-audit: VALID (end imposed by the game); promotion roads 265 seen / 85 picked (decree 248, select 8, exam 9). S.rank stayed 0 for the whole life (the title came from the ending, not from a rank change).

## Findings
1. **«Sang ngày mới» softlock still present on LIVE 18003079 (game, ×15):** «Sang ngày mới» tapped 3× in one buổi but the buổi does not turn, dialog queue Q=1: «Nghe đồn» (×3) and «Có người đến» (×12). The runner's unstick ladder got past each one; same family as flight2-s2e (noturn).
2. Gift/item pick grid (game): confirm «kipgo» off-screen after 8 real scrolls (×5); grid «Đồ trong rương» re-opened 3× with no gift given, every item locked / confirm never usable (×1).
3. Every close of «.kscn» tapped 3× and the dialog stayed (Lui) (×1). Two-tap hands «Bỏ thi» and «Bớt lễ nghĩa» tapped for real, nothing lifted in 2 s, S and frame unchanged (×1 each).
4. **Illness scan (pick="Tĩnh dưỡng|Truyền thái y"), 120 logged changes (out8/s2j-illness.log):** kinds seen phonghan (max st1), tâm bệnh (max st3), mất ngủ (max st3), thuydau (thủy đậu, max st2). Each lasted ~5–15 min and CLEARED BY ITSELF; S.doctor and S.pray stayed 0 the whole life; the harness pick never fired; no illness dialog row in moments (only the usual «Thái hậu bệnh nặng» and «Cáo bệnh» options), no danger word, no lao phổi; Sức minimum 67, never < 60. Illness onsets from year 6 (age 24) on; none in years 1–5 beyond HUD «Tâm bệnh · nhẹ» seen in year 1.
5. Save: CTMZ-compressed, 12 KB at start → 338 KB at the end; no QuotaExceeded, no SAVE REWIND/STALE (the save stack fix on LIVE works). Pace ~150 buổi/h early, 250–400 buổi/h later.
6. Rank 0 from the start of the life (S.rank 0, tú nữ level); no rank-0/lãnh cung demotion event this time (the s2g/s2h demotion at year 2–3 did not recur on this build/seed).

## Scores (supervisor view)
Not scored for art / text / emotion / pacing (not observed).

## Files
flight2-s2j.json (results), flight2-s2j.bugs.md, flight2-s2j.log, review/flight2-s2j-moments.md, review/flight2-s2j-review.md, flight2-s2j-illness.log. Shots stay on the VM.
