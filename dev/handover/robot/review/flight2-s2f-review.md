# flight2-s2f review (honest note first)

**Honesty note.** This review was written by the life-runner session, which acted as a SUPERVISOR: it ran the harness, switched harness shas, watched logs and STATUS lines, and looked at a handful of screenshots only when a stall needed diagnosis. It did NOT play the life screen by screen. Scores for sections that need a player's eyes (art, text feel, pacing, emotion) are therefore N/A; only harness / stall / bug / mechanics findings are claimed.

## Life
- life flight2-s2f, persona bold, dev fold (755x1000), seed 2026112528, origin/road chosen by the harness.
- Ending: «Hồng nhan bạc mệnh — Bị ban chết vì đầu độc Hoàng tử Vĩnh Lâm», age 31, buổi 1964, year 14, rank 0 (rank metric per the older harness; not re-measured), 1835 taps, 0 dead buttons, 0 stuck, 32 bugs in the runner's final line. Real taps only (jsClicks 0), no time cap, no voluntary exit road (exitPick none).
- Tag: **MIXED-BUILD** (F #20 ruling). It counts for harness / stall / bug findings, NOT for single-build game conclusions.

## Build timeline (from the log)
- 02:21Z start: game 0a4c8010+ (b d402e37a51ed).
- From <= 07:39Z: resumes reloaded LIVE, which had moved to 6b5d3d05+ (b b7dcbbd06e03, built 06:59Z). Mixed build discovered at 10:47Z (F #20 query).
- 08a4ff8b..8ea10d7e era: harness re-recorded the life's build as 1dcb373e+ (b 5ab5b80e406e, 10:49Z).
- 17:32Z: «BUILD MISMATCH at reload» (exit 3): Pages had moved to 03e9c9d2 (b 4eb0cbfc91b0, 14:23Z). Guard and runner stopped, no restart loop.
- 17:35Z: resumed on the SERVED recorded build 5ab5b80e406e (127.0.0.1:8729), pin=1, harness 8ea10d7e, F #24 option (1). Played to the natural end on that build (buổi 1688 -> 1964).

## Harness timeline
4d7a22c6 -> d2e03d80 -> fd9218fe (06:13Z, b521) -> 89f5b956 (07:39Z, b796) -> 08a4ff8b (08:31Z, b956) -> ec026335 (10:43Z, b1281) -> 2df8f5fa (10:55Z, b1299) -> 0e0ebe29 (12:42Z, b1505) -> pin=0 on LIVE (13:55Z) -> 8ea10d7e (14:42Z, b1540) -> served pin=1 (17:35Z, b1688). Every switch was done at a fresh ckpt with the save restored (got = want where the harness reports it).

## Findings
1. **Gift picker «Biếu quà làm lành» (game, repeated ~22+20 times).** The confirm «kipgo» stays off-screen after 8 real scrolls, and later «no item can be given now» with 616 -> 918 items, every confirm disabled or greyed (card text e.g. «Thường Áo lụa thêu hoa nhỏ ... CẦN món còn nhẹ, chưa đủ lễ (nàng ta coi như 1 bạc, cần 12)»). The inventory grows without bound while no gift can be confirmed. One family, one fix scope: the whole gift/pick grid.
2. **#kdaytc dialog with no way out (game, x1):** no button reachable (all below the screen / clipped, nothing scrolls); lost: Ô lưu / Xem bản thân / stats strip. The runner got out by its unstick ladder.
3. **Tab crashed (Page crashed) x4** at buổi 1688, 1724, 1763, 1796 (about every 35-40 buổi once the save passed ~3.3 MB). The guard auto-resumed each time; no data lost. Related to save size / memory, not to the page logic.
4. **Resume stall after pin switch (harness, ~1 h, 12:42Z-13:55Z):** pinned local origin had no saved life, page showed «Chọn sổ», «save 0 chars», 2x «life not (re)opened». Fixed in 8ea10d7e (save restored on whatever origin).
5. **Harness-only notes:** NO-EXIT dialog .kmov (picker stalled 94 steps / 60 s; later unstuck by tapping «Ta biết rồi»); 4 blocked area taps (kemo ... elements appearing under the point).
6. Pace: ~150 buổi/h early, ~20-25 buổi/h after the save passed 3 MB.

## Scores (supervisor view)
Not scored for art / text / emotion / pacing (not observed). Mechanics: promotion roads 92 seen / 34 taken (exam 5, decree 84, select 3). Death by poisoning ban at age 31 is a game-imposed ending, valid per rules.

## Files
flight2-s2f.json (results), flight2-s2f.bugs.md (bug table), review/flight2-s2f-moments.md, log, shots stay on the VM (not in git).
