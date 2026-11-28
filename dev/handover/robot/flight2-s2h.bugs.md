# flight2-s2h (real-tap harness f65d019b, fold)

| life | ending | age | buổi | taps | dead buttons | stuck | bugs | exit pick | promotion roads seen / taken |
|---|---|---|---|---|---|---|---|---|---|
| flight2-s2h | HARNESS |  | 2644 |  | 0 | 0 | 7 | — | 325 / 230 (decree 310, select 15) |

## Dead buttons


## Bugs

- [stuck] ×1 no-clock loop: 150 taps without a clock step on #kg82 «»
- [game] ×2 item pick grid: the confirm «kipgo» stays off-screen after 8 real scrolls ()
- [harness] ×1 area tap would have landed on a button (it appeared under the point) — blocked: «!»
- [harness] ×1 area tap would have landed on a button (it appeared under the point) — blocked: «Thu làm tai mắt»
- [game] ×1 SAVE REWIND: the game went back to an older save (the buổi since its last good save are lost)
- [game] ×6 QuotaExceededError: the game save no longer fits localStorage (j6 save() swallows it: every later save is lost)
- [harness] ×1 runner error: page.waitForTimeout: Target page, context or browser has been closed
## QUOTA STOP (known, cured on LIVE) — flight2-s2h stopped by order at 2026-11-28T02:11Z
- Stopped at buổi 2644 (json) / CP buổi 2600 year 18-19, age 36, rank 0, Sức 96, sủng 0, danh 2, bạc 197; runner + guard killed after a fresh ckpt+json (02:10:26Z). The last line «runner error: page.waitForTimeout: Target page … closed» in the bug table is MY kill, not a game/harness fault.
- QuotaExceededError on key hclh-save-v2-1 from ~5.229M chars (log line 235, 02:0xZ); stored save lags the live game from then on. FINAL ckpt (5130741 chars, 01:49:20Z, ~buổi 2560) pushed before the line: review/flight2-s2h @ 30b9af10, handover d25145e3.
- No life ending reached: this record is NOT a death / real ending (audit rule 2: expect INVALID or a manual QUOTA-STOP verdict by the foreman).
