PRIORITY #1 CHECK ('world window|worldWin|jworld|BAL.world'): OD 0 | ledger 0 | claims 1 (world-events-2 worker, this review) | main jworld.js (part 1, landed abe056c3) | review/* only review/world-events-2 ee9f5396 (the branch under review) — nothing duplicated.

# REVIEW world-events-2 r1 — BIG (opus) review — PASS e8b1906f

Reviewer session_01UV1SzjLZvCQHBpfo4LK15L, opened by Foreman C-AG (#1 session_01UV1Szh1sUAVP6FUuqZgkYs; verdict to #2 session_01UV1SziUGzeqJM9bXyR2ehR). START_CTX ~5 % of the window.
Branch `review/world-events-2-r1` = review/world-events-2 ee9f5396 + merge origin/main ce29592e (one-core-dup3: assemble.py conflict → main's list + jworld2 after jworld; generated files rebuilt) + merge origin/main 7e0250ec (generated files only) + reviewer fixes. Head **e8b1906f** is a fast-forward of origin/main 7e0250ec.

## Owner rules (OD L1587, L1593, 17/11 ~14:30Z — read verbatim)
| rule | result |
|---|---|
| real game events only, every window has a real cause | OK. Causes: a real birth (allKids diff → đầy tháng 3 tuần later), S.heir change, queen seat change, S.thIll / S.emp.ill stage, a real daughter's wedding (k.wed), heavy snow 2 of the last 3 tuần (real WX), a failed j55 flood/drought relief with Kho in a band, a real bùa frame (framed() / kframe) while the imperial house is ill, a vu cổ / ngoại thích verdict or Biên < 25 after a lost battle, the year-end audit + a REAL greedy servant (netIs), ≥3 maids at BAL.srvAge.out, a house ≥85 while the Emperor is young/ill or it is the queen's house, the calendar (khoa thi, phiên vương with a living Vương gia, tỉnh thân, Phật đản), đại trai đàn one tuần into a real disaster. No pure-dice event: the few rolls (trom.p, phat.afterP, purge) only decide whether a real cause turns into a window. |
| affects EVERYONE (her + every NPC group; NPC choice sites read the window) | OK. Every block has `act` / `place` weights read by the one worldPlanW (mindW, placeWhere); nightCh / nightMul / stipend payCut / feast / goTo curfew are the same gate for her and NPCs; every start() runs the NPC side by npcPick (gift / nurse / donate / share / keep a maid…). world_check2 §3 asserts the same night factor, night bar, pay hold, curfew for her and an NPC. |
| CENTER kit pop-up at start + end, her options, a Tuần lục line | OK (world_check2 17/17 kinds; shots below). |
| NO world-event "!" on the Dư đồ | OK: no AD_HAP / ACC_ROLE hook in jworld2 (grep 0); world_check2 asserts adHapNow has no world entry. |
| reuse, no rebuilt arc | OK: j13 thIll / j3 emp.ill / j1 allKids / j54 wed / j55 trS, tdPowAdd, tdHouse / j12 WX / j8 framed + ACT.kframe / j10 allServ, fillStaff / jnet greed / j22 Vương gia / BAL.srvAge reused; j92 wdTang fold of part 1 untouched. |
| Địa chấn (#9) | PARKED, not built (grep 0 in dev/build; jbal2 + jworld2 headers say parked). |

## Foreman's extra checks
- **kframe → vucoCause ONE function**: OK. `vucoCause(p,by)` is the only path; called from the framed() wrapper (why matches bùa / hình nhân / trù ẻo, by = ACTX.a) and from the ACT.kframe.f wrapper (its real success text "đào được hình nhân", j8:118). Guards: window already open, one queued, nobody of the house ill → no window.
- **worldWin memo, no shared-state leak**: OK. Key = (S, z.L ref, z.L.length, tuần) + every cached window still open (t1 > t). worldEnd reassigns z.L (new ref), worldStart pushes (length), an early end lowers t1 (the every() check), a co-op snapshot replaces S.wwin (new ref) → all invalidate. The list form returns `A.slice()` (callers can't mutate the cache); the single form returns the live record, as before the memo.
- **perf buổi**: the worker's +6 % is acceptable; on this box (4 CPU) QUICKCHECK median of 7 gave buổi 808 / 824 ms new/live (≈ −2 %), render 145/144, tab 270/267, tasks>200ms 11/11. A median-of-3 run gave 1169/806 with single runs from 634 to 1262 ms — noise, not the branch.

## Tests (merged head)
- QUICKCHECK: PASS (head e8b1906f, median of 5): open 1198 ms · old save ok · render 148/148 ms, tab 277/321, buổi 733/813, tasks>200ms 10/12 · core gates PASS (one-core-guard, rules-one-source, kit-conform, coop-one-world). Earlier runs on 0babcd54: median of 7 buổi 808/824.
- Core gates: one-core-guard PASS (inlineNow 5093 = baseline), one-core-text PASS, one-core-bind PASS (848 prints, 0 mismatches), rules-one-source, kit-conform, coop-one-world PASS (inside QUICKCHECK). Before the reviewer fix one-core-guard FAILED on the merged head (see fix 1).
- world_check2 40/40, world_check 25/25, agent_check 16/16, coop-e2e 63/63 (run alone).
- world_scan.py: 38 definitions (batch-2 keywords), matches report §8.2.
- Bot (`worldbot.js dev/index.html 35 <seed>`), 3 × 35 years, 0 errors / page errors / stuck / WW.err:

| per game year | seed 2 | seed 6 | seed 9 | worker seed 5 |
|---|---|---|---|---|
| lives | 4 | 6 | 4 | — |
| day / lap / hau | .37/.14/.06 | .31/.14/.03 | .20/.09/.06 | .31/.11/.11 |
| thb / benh | .14/0 | .06/0 | .20/0 | .11/0 |
| thi / vuong / tinh / phat | .26/.23/.91/1.09 | .26/.17/.83/1.11 | .26/.17/.80/1.09 | .23/.17/.91/1.11 |
| ret / trung / vuco / cam | .43/.03/.11/.14 | .49/.09/.06/.11 | .46/.09/.06/.14 | .49/.03/.03/.06 |
| trom / phong / hon / ngoai | .17/.06/.03/.03 | .17/.09/0/.03 | .11/.09/.03/.03 | .17/.06/0/.06 |
| tuần with 2 / 3 windows open | 69 / 0 | 47 / 0 | 47 / 0 | 44 / 0 |
| share of tuần under any hardship | 14.0 % | 13.3 % | 14.2 % | 12 % |
| longest hardship run (tuần) | 9 | 12 | 11 | 9 |
| longest dis/dich/hoa run | 6 | 6 | 6 | — |
| her nights barred | 8.1 % | 7.8 % | 8.3 % | 7.5 % |
| any window open | 27.6 % | 26.4 % | 27.8 % | 27 % |

No perpetual crisis (hardship ~1 tuần in 7, never longer than ~3 months); her nights barred ~8 % of tuần (part 1 alone 6–7 %). Agrees with the worker's table.

## Fixes made by the reviewer (small, on review/world-events-2-r1)
1. ONE CORE gate: after merging main (one-core-dup3), one-core-guard FAILED — `BAL.world.trung.months:[5,6,7,8,9]` equals a typed list in jrd_dtq.js (story step numbers, a coincidence, but the gate cannot tell). The growing season is now a range `trung.m0:5, m1:9` (`S.month>=m0&&S.month<=m1`). Also dropped `BAL.world.phong.afterP` (never read; the trộm → phóng cung link is `trom.phongP`; report §8.1 "or after … rét" is NOT built).
2. KIT row (same family as r1 fix 2): đại hàn "Chịu rét cho qua" kèm "dễ nhiễm phong hàn" showed **green under ĐƯỢC**; now "có thể bị nhiễm phong hàn" (KA_RISK, j63:53) → red KÈM. Checked in the real modal. Scan of every kèm/hỏng in jworld + jworld2: the others place right (để bụng / oán ngươi / Đức −2 → KÈM).
3. Thái hậu bệnh "Xin vào hầu bệnh": the fail line "hỏng: Thái hậu +2" printed a GAIN **red under MẤT**. Now a failed nurse gives nothing ("hỏng: không được gì", the family pattern of thi / tinh); BAL `thb.nurse.thFail` removed.

4. CO-OP ONE WORLD (QUICKCHECK gate G4 coop-one-world FAILED on the merged head, seed 7: "merge differs from the host", path S.wwin). Root: windows stored HER choice in the shared world record under the key `me` (`w.x.me` in part-1 đại xá, batch-2 vu cổ / trộm / phóng cung, plus `w.x.acc`); jcoopworld turns a `me` KEY into the seat's own pid, so host and guest copies of the same window differ → merge3 keeps an ended window ("A removed it; keep only if B changed it") → the đại xá window came back on the merged world. Whole family fixed: (a) her choice now lives in her own `S.wwMe[w.id]` (per player, like S.wwSeen; pruned like it), never in S.wwin; (b) đại xá card checks her OWN eligibility at the card (before: the host's flag, so a guest in lãnh cung was judged by the host's state); (c) batch-2 person fields held `"me"` as a VALUE under names jcoopworld does not translate (`mo`, `old`, `nw`, `t`), so a guest would read the host as herself (e.g. "mother of the prince"); renamed to the translated REFF names (`who`, `from` / `to`, `tgt`); world_check2 updated. coop-one-world now PASS on seeds 7, 3, 11, 5.

## Shots (scratch only, not in git; looked at)
Fold 755x1000 + iPad 1180x820: start pop-up "Thái hậu bệnh nặng" (VIỆC, Thái hậu figure, ev-benh-tat art, NPC nurses line, 3 kit options with odds word "Khó", TỐN / ĐƯỢC rows), start pop-up "Đại hàn, tuyết lớn" (Emperor, snow art, share / suffer lines, 2 options, KÈM red), end pop-up "Đại hàn" (BÁO, art, one line). No page errors, no horizontal overflow (scrollWidth = clientWidth).

## Notes for the Foreman (not blocking this branch)
- KIT (kit keeper, whole family): on iPad 1180x820 a modal with exactly TWO options lays them in narrow columns (grid 143px each, `.opts.kpopts.k3btns`) so TỐN / ĐƯỢC values wrap word by word ("Bạc / -20", "qua / mùa / rét") and the bottom line is cut until scrolled; 3-option modals use the wide 2-column layout. Reproduced with a plain test modal outside world events, so it is the kit grid, not this branch; every 2-option card in the game shows it. → KIT REQUEST.
- Co-op (as part 1): triggers + NPC effects and every end() run on the host. A GUEST's own option choice (vu cổ open/clean/accuse, trộm open/bribe/self, phóng cung keep/let) is now kept in her S.wwMe but the end() that would act on HER household runs only on the host seat, so for the guest only the immediate fx/apply of the option happens (her greedy servants / aged maids are not processed at the end). Known co-op gap, same class as part 1's 'start effects that touch her run on the host copy'; a follow-up for the thin-guest train (intents), not blocking.
- trom/vuco payCut (.1/.15) and dis/trung are taken as the largest open cut (one stipend line) — fine.

VERDICT: PASS e8b1906f
