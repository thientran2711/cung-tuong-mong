# flight2-s2g (real-tap harness 97e55a45, fold)

| life | ending | age | buổi | taps | dead buttons | stuck | bugs | exit pick | promotion roads seen / taken |
|---|---|---|---|---|---|---|---|---|---|
| flight2-s2g | Lãnh cung — Tuổi xuân qua đi | 47 | 4150 | 35446 | 0 | 0 | 8 | — | 244 / 83 (decree 240, select 4) |

## Dead buttons


## Bugs

- [harness] ×1 area tap would have landed on a button (it appeared under the point) — blocked: «kemo kemo-tinhtu kemo-live kemo-m-sway»
- [harness] ×1 NO-EXIT DIALOG .kmov «» (div.kmov.kcf.km-full): picker stalled 79 steps, no close / next → later visits unstuck at once by taps
- [harness] ×1 picker stalled 79 steps / 61 s on .kmov «» without a real tap (area 79, deadEnd 1; last refused tap: gone «Nhận») → tapped «Ta biết rồi»
- [game] ×4 item pick grid: the confirm «kipgo» stays off-screen after 8 real scrolls (Biếu quà làm lành)
- [harness] ×82 area tap would have landed on a button (it appeared under the point) — blocked: «»
- [harness] ×4 BOARD co still in play after 6 min (0 moves) — the round never ended
- [game] ×8442 QuotaExceededError: the game save no longer fits localStorage (j6 save() swallows it: every later save is lost)
- [game] ×16 SAVE STALE: the stored save stopped following the live game (QuotaExceededError)
## SAVE FROZEN b2550 5154622 (stored) — QuotaExceededError (added by runner supervisor, merge into flight2-s2g.bugs.md at LIFE DONE)
- 10:53Z, CP after buổi 2600 (year 18): «CP SAVE ERROR: setItem failed 259× — QuotaExceededError key hclh-save-v2-1 (5299793 chars)»; first failure at 5247844 chars (log line 378), the live save kept growing 5247844 → 5299793 chars while the stored save stays at the b2550 value 5154622 chars (stored clock 18.218.2.3 vs live 18.223.2.1).
- Runner BUGs: «QuotaExceededError: the game save no longer fits localStorage (j6 save() swallows it: every later save is lost)» and «SAVE STALE: stored b2550 live b2600».
- Consequence: any crash/resume now restores b2550 (about 50 buổi lost); the life itself keeps playing in memory. Shot: shots-flight2-s2g/m-look-2600.png (VM only).

## Final addendum (LIFE DONE 16:12Z)
- Stored save never recovered: stored stayed 5222025 chars (SAVE STALE b<3000 … b<3300 at live b3800 … b4100), live save reached 7883116 chars, setItem failed 8435× by buổi 4046.
