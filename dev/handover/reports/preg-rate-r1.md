PASS 1c31bd7957367b7f27c550e60f7668d3a09cefc5 — D57 preg-rate reviewed on review/preg-rate-r1 (ancestor: origin/main e9c6021d). One reviewer fix: trysts/affairs now go through one function.

# D57 review/preg-rate — reviewer r1 (session_01DgYSWobwX8ehBC7umUckXK, opus). START_CTX ≈ 4 % (get_session read 0; estimate); end ≈ 13 %; no rollover.
Worker branch review/preg-rate @911dc478 merged onto main e9c6021d → review/preg-rate-r1 @1c31bd79.

## Checks
| check | result |
|---|---|
| Owner ruling D57 / OD:L1205 option 4 = 1+3 | BAL.conc .25→.5 (double for everyone) + BAL.cyc.fert {peak 1.6, low .5, cyc .1} by her true cycle phase. Matches. |
| Merge | conflict in jbal.js: kept main's birthAdd:2 (balance-pass-r1) + worker's conc:.5; index.html/sw.js rebuilt. |
| One source (OD:L1267) | fert numbers in BAL.cyc.fert, base in BAL.conc; texts print chanceLvl(conceiveCh()), no typed numbers. |
| Every conception roll via the one function | FAIL on the worker branch → FIXED on r1 (see below). Consort nights (night()), NPC nights, Cầu tự, stage cell, act texts, steal card: conceiveCh. Co-op: pure function of name + tuần; NPC rolls host-only (worker's claim; coop-e2e passes). |
| Chance wording | chanceLvl Rất thấp/Thấp/Vừa/Cao/Rất cao is CORRECT: owner OD:L221 puts side chances (pregnancy, reward…) on that ladder; Liều…Nắm chắc is only for the act's own odds. Note for kit keeper: VANPHONG.md §1 lists only the act ladder — add the side-chance ladder line (doc gap, not this branch). |
| New Sổ ghi line | "Ma ma dặn nhỏ: qua kỳ nguyệt sự chừng mươi ngày, tuần này là lúc dễ đậu thai nhất (có thai mỗi lần thị tẩm: Thấp)." cổ trang, no %, once per month in her peak tuần (checked over 40 weeks), not while pregnant. Shown in the existing Sổ ghi row; no new UI part. Shot 755x1000@2: wraps, no cut text, no overflow, no page errors. |
| Old saves | preg-rate.js old-save case PASS; palace-oldsave main build → r1: loads, no errors. |
| Tests | preg-rate.js PASS (with new tryst check); cycle.js logic ok + UI ok 755x1000@2/1180x820@2; mortality.js 120 2 no page errors; coop-e2e (live Worker) 59/59. |
| night-day 'steal' fail | CONFIRMED PRE-EXISTING: identical ok:false (steal: 0 nights, 0 clicks) on a plain origin/main e9c6021d build. Not counted. |

## Reviewer fix (commit 3b7b551d)
Three conception rolls bypassed conceiveCh, with typed numbers:
1. j22 tryst (her "Hẹn gặp riêng"): card showed chanceW(conceiveCh(S)) but rolled roll(15) — shown ≠ real.
2. j22 affairMonth (an NPC consort with a lover): roll(5).
3. jroute Tư thông: cl(conceiveCh(S),5,60) typed bounds (display + roll).
Now: BAL.trystC [5,60] + function trystCh(p) (jbal); jcycle overrides it to bound the RAW chance first and then apply the cycle factor (else the floor 5 flattened the window: her cycle tuần gave 5, same as peak). All three sites + card text use trystCh. Test check added (dev/test/preg-rate.js).
Left alone: servant-mode tryst j42 (roll(10) / chanceW(10), shown = real) — a maid, no consort cycle; typed number pre-existing → follow-up for the one-core audit.

## Balance (dev/measure/preg-bots.js, my own runs; same seeds before = main e9c6021d, after = r1; 10 years)
| measure | Sủng≥25 before (30 lives) | after | Sủng≥60 before (15) | after |
|---|---|---|---|---|
| NPC conception / 100 nights | 5.7 | 11.2 (peak ch 17.1 / low 5.6) | 6.7 | 10.0 |
| her mean chance per night | 3.7 | 8.6 | 5.6 | 9.0 |
| NPC births per consort-year (mean y1–10) | 0.06 | 0.10 | 0.07 | 0.08 |
| palace children alive after 5 y | 6.0 | 8.2 | 6.4 | 7.7 |
| palace children alive after 10 y | 6.2 | 9.5 | 8.3 | 8.9 |
| NPC sons alive after 10 y | 2.8 | 4.6 | 3.7 | 3.8 |
| heir = an NPC son at end | 21/30 | 25/30 | 10/15 | 11/15 |
Verdict: matches the worker's table. NPC births ≈ one child per consort per ~10 years — not high; NPC heir pressure rises (more NPC sons) as intended. Peak NOT trimmed. Her own births stay low in the bot because the bot player dies in ~half the lives (mortality domain, already noted by the worker).

## Notes (non-blocking)
- The peak line repeats every month for the whole life (12/year); fine as a reminder, but if the owner finds it noisy, show it only while she is not yet pregnant AND has ≥ 1 night in the last 3 months.
Worktrees /home/user/wt/pr1, /home/user/wt/pmain removed after push.
