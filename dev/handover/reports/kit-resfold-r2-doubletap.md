# kit-resfold-r2: double-tap fix (RV-163C F1) + kit-dialogue stale test. RV READY review/kit-resfold-r2 740331b5

Worker: DIALOG-ORDER-R4, session_01Rc5AsKRkr3F1TohQ4mYcPn. Jobs from MAIN 167 (double tap) and MAIN 170 (kit-dialogue). Report to MAIN 171; reviewer RV-163E.
PRIORITY #1 CHECK: rv-163c.md F1 (double-tap-scan 1/224 «Y dược · Hỏi thái y») | KIT §6.2j (kitDlgArm + tap guard j3, KK44) | KK48 archived, nobody else on it.
Commits on top of 8740785b:
- 500c9ab4: the guard fix + KIT §6.2j text + scan BUSY/CPU.
- 1ac40109: scan sends real finger timing; dice notes are no longer FAILs.
- 740331b5: kit-dialogue test setup only.

## Root cause (F1)
The ONE double-tap guard (j3, document capture click, `kTapLast`) measured `BAL.kdlg.tapArm` (320 ms) from the moment the game HANDLED the 1st tap. On a busy phone the 1st tap's own work (open the picker, spend, redraw) outlasts 320 ms. The 2nd tap waits in the queue behind it and was read as a new tap. It then landed on the option under the finger of the «Hỏi thái y» picker the 1st tap opened, so khắc +1 and Bạc −4 were spent twice.
Second family member, found with the new BUSY mode: «Soát đồ» (Tư trang · Đi lại) spent khắc 2→4. The 1st tap had already spent, but the board was not redrawn yet, so the 2nd tap hit the same live button again.

## Fix (j3 only: the ONE guard, no per-button patch, law 11)
1. The double-tap window is measured between her two FINGER taps (`event.timeStamp`) as well as between their handling. Either one under tapArm counts as the same double tap.
2. A 2nd tap on the SAME button is not taken if the 1st tap already SPENT something since it landed (khắc `used`, Bạc, Sức, or any held-items list: inv / items / tt / tutrang / cloth / gifts / pets), even before the redraw. A stepper or toggle spends nothing, so it is untouched.
3. Unchanged: the «opened a new dialog» and «redrawn button» rules, `BAL.kdlg.tapNear` (40 px), and scripted clicks are never held. No new BAL key. No player-visible word.
KIT.md §6.2j is updated with both rules and the scan options.

## double-tap-scan.js (dev/test)
- Every double tap is now a real finger: two taps 70 ms apart by event timestamp, sent through CDP without waiting for the page. Before, a loaded box stretched the old mouse.click pair past tapArm, so the scan could not tell a double tap from a slow one; that is the likely cause of RV-163C's flaky 1/224.
- `BUSY=ms`: the 1st tap's work takes ms (a busy phone). `CPU=n`: CPU throttle.
- An items-only difference with no extra khắc / Bạc / Sức and no extra log line is a «note» (the same act rolled different dice; seen on the pet buy), not a second action.

| run (Fold 755x1000 unless named) | before (8740785b build) | after (740331b5) |
|---|---|---|
| double-tap-scan, normal | 220 taps, FAIL 0 (with the new finger timing) | 224 taps, FAIL 0 |
| double-tap-scan, BUSY=500 | 218 taps, FAIL 11 («Soát đồ» khắc 2→4, logs 3→9) | 222 taps, FAIL 0 |
| double-tap-scan, iPad 1180x820 | — | 253 taps, FAIL 0 |
| probe: «Hỏi thái y» double tap, 1st tap busy 500 ms | khắc +1, Bạc −4 extra | 0 extra |
| probe: same, not busy | 0 extra | 0 extra |

Kit tests on the after build: kit-res-fold PASS · kit-title-name PASS · dlg-twin PASS · one-core-guard PASS.

## kit-dialogue.js: 8 FAILs (MAIN 170 ticket, KK53 find), all STALE TEST, no code fault
Cause: the test's own setup runs `nextBuoi()` 5 times. That now ends a day, so the end-of-day motion scene «Lật thẻ bài» (`.kmov.kcf`, jflip) was queued over the board. `elementFromPoint` at the test's tap point = `.kcf-cards`, so every tap on the test scene hit the card flip instead.
Fix (test only): clear the game's motion scenes (kmReset / KMQ / `.kmov`, `#kmrew`, `#kpodov`, roulette) before the test opens its scene.

| check (Fold + iPad) | before | after |
|---|---|---|
| tap finishes the line, every cue fired | FAIL ×2 | ok |
| next tap = next line, spotlight moves | FAIL ×2 | ok |
| focus shot: one big, others hidden, bg blurred | FAIL ×2 | ok |
| after last line: onDone, everything cleaned | FAIL ×2 | ok |
| total | FAILED 8 | ALL PASS |

Stills looked at: kdv-focus-fold (one figure big, blurred ground, box «C») and kdv-line1-ipad (speaker lit, two dimmed, box inside the layer).
