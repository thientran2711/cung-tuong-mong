# flight2-s2h review (honest note first)

**Honesty note.** Written by the life-runner session as a SUPERVISOR: it started and watched the harness (logs / STATUS / CP lines / the ckpt save state S) and looked at a few screenshots only to answer foreman questions (m-look-140, m-rank-231-270). It did NOT play the life screen by screen. Art / text / pacing / emotion scores are N/A.

## Life
- life flight2-s2h, persona cautious, dev fold (755x1000), seed 2026112560, fresh profile, harness review/robot-realtap f65d019b, started 2026-11-27T16:17Z, stopped 2026-11-28T02:11Z (~9 h 55 m), one runner pid (4284), no crash, no resume.
- SINGLE BUILD: d9ca7892+ (b 86170222adab, t 2026-11-27T12:32Z) served locally at 127.0.0.1:8812 with pin=1; pixi 200 from the start (f65d019b self-check). NOT mixed-build.
- END: **QUOTA STOP (known, cured on LIVE bd47c753)** at buổi 2644 (json), age 36, year 19, rank 0. NO real ending reached. Real taps only (jsClicks 0), no cap, no exit road taken, 0 dead buttons, 0 stuck, STATUS bugs 5 (log lists 7-8 distinct lines).

## Findings
1. **Rank 1 → 0 captured (game).** year 2 turn 20 tuần 2 buổi 0 (~run buổi 231-270): harness EVENT «rank 1 → 0» on the #kmrew card «Bổng lộc tháng chín»; HUD behind it already «Lãnh cung», Sủng 0, Danh 0, Tâm trạng Phiền muộn −29, Sức 100, Bạc 134 (m-rank-231-270.png). Then «Lãnh cung» (button «Bước vào»), later «Rời lãnh cung · Tạ ơn» (year 3 turn 25). The trigger is not its own screen; the screens just before: «Đường sám hối» (turn 18), «Tiết Vạn thọ · Lễ», modal «Biếu quà làm lành» (gift picker), «Xong việc: Trò chuyện với cung nữ thân cận». S.rank stayed 0 for the rest of the life (age 20 → 36) although sủng later reached 18 (year 13). Same as flight2-s2g (rank 0 by turn 29-31). Two personas, same outcome: looks systemic. Reported to MAIN 179 / Foreman B LANHCUNG-EARLY via the foreman.
2. **Illness (observation).** phong hàn S.ill {k:'phonghan', st:1, known:true} at ~buổi 650 (age 22, Sức 91): passed by itself, no cure (S.doctor 0, S.pray 0), no illness dialog in moments. tâm bệnh {k:'tambenh', st:1, known:true} at ~buổi 2550 (age 35, Sức 90-96): cleared by CP 2600, no cure taken (bot did not pick Tĩnh dưỡng / Truyền thái y; harness pick option comes next life). No lao phổi in this life; Sức stayed 82-100.
3. **QuotaExceededError (game, known family).** From ~5.229M chars setItem fails on hclh-save-v2-1; the pinned build predates the save fix. FINAL ckpt pushed before the line (review/flight2-s2h @ 30b9af10).
4. **SAVE REWIND x3 (game):** reload b133 → stored b132, b880 → b879, b1992 → b1989 (3 buổi lost). Fixed on LIVE (B save stack).
5. no-clock loop: 150 taps without a clock step on #kg82 (harness-stuck bug, once). Gift picker «kipgo» confirm off-screen after 8 scrolls (x1, same family as s2f/s2g).
6. Harness: blocked area taps on «!» and «Thu làm tai mắt».

## Scores (supervisor view)
Not scored for art / text / emotion / pacing (not observed).

## Files
flight2-s2h.json (results at stop), flight2-s2h.bugs.md (+ s2h-notes.md), flight2-s2h.log, review/flight2-s2h-moments.md, review/flight2-s2h-review.md, flight2-s2h-final-ckpt/ (earlier push). Shots stay on the VM.
