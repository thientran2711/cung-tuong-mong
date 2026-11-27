# LANHCUNG-EARLY — rank → 0 via Lãnh cung early (B NUMBERS worker session_01N1tNP2tteYrn7gJruqD63a, Foreman B ROOT 3)
PRIORITY #1 CHECK: OD 'lãnh cung|bỏ quên|thất sủng' → L353 (forget grace), L2328 (24/11 ~07:55Z: lãnh cung / ra cung "tùy mức độ nặng nhẹ", not automatic), L2636–2659 (26/11 punishment tiers: the crime decides; lãnh cung only NẶNG) | main: j3:170 «Bị bỏ quên» cold(), j8:113 fall() R(2) coin, jbal2 BAL.charge.C.vo pun "cold" | review/*: **review/punish-stack-live-3 cd2c142a / -rvk 1b5c1125 (PUNISH-TIER-9) already fixes all three** (j8 tsMonth/tsMonthAll thất sủng = MAIN 118 P3 + OD 24/11 ~07:55Z; fall(p,why,by,x) tiered via punTier, default «vừa»; charges carry tier: vo = vừa, mh/tt = nặng) | claims: none.
KIT CHECK: n/a (no UI; test + measure only).

## Verdict
**LANHCUNG-EARLY = COVERED by review/punish-stack-live-3 (in the LC31 gate as UI bundle 3a/3b).** No new game code (law 13: reuse; my own draft fix of j3/j14 was dropped the moment the branch was found). Delivered: a guard test + a measure, test-only, on **review/lanhcung-early 4d53f76140805ed067343f4b11eab268af0e5aa0** (base LIVE 772bee4f).

## Roads into lãnh cung on LIVE 772bee4f (every cold() caller)
| road | file | early-life risk | verdict vs rulings |
|---|---|---|---|
| «Bị bỏ quên» (Sủng ≤0, Danh ≤ BAL.danhG.forget 5, rank ≤1, after forgetGrace 6 mo) | j3:170 | HIGH: the two lowest ranks only, no crime, no evidence, no warning, her only (no NPC rule) | breaks law 5, 6a, 1 + OD L2328 / MAIN 118 P3 → fixed on psl3 (thất sủng, everyone, way back at Sủng ≥ BAL.thatS.back, «chợt nhớ» roll) |
| proven charge «Vu oan giá họa» → cold | jcharge chPunish, BAL.charge.C.vo pun "cold" | HIGH for a scheming player (15 of 16 random-bot lives, month 1–5, rank 0–1) | canon says vu khống = VỪA (giáng) → fixed on psl3 (vo tier "vua") |
| fall() coin R(2): 50 % lãnh cung vs giáng below Quý phi | j8:113 | low (0 hits in 49 sim lives) | tier by coin, not by crime → fixed on psl3 (x tier, default vừa) |
| death sentence commuted (nhân từ), escape, tư thông, coop | j8:107, jroute, j22, jcoopworld | rare, real NẶNG crimes | fine |

## Measures (headless, real page, dev/measure/lanhcung-sim.js; cold/demote/fall/restore hooked with caller)
| set | LIVE 772bee4f | psl3-rvk 1b5c1125 |
|---|---|---|
| sensible bot, 9 lives × 36 mo | 0 lãnh cung | (not re-run: 0 on LIVE) |
| idle / passive bot, 12 × 24 mo | 1 life «Bị bỏ quên» (t20, rank 1, Sủng 0 Danh 0) | **0** |
| random / reckless bot, 16 short lives | 16 lãnh cung (15 «vu oan» t1–5 rank 0–1, 1 «bỏ quên» t7) | **1** (mưu hại tính mạng = nặng, as ruled) |
Robot logs F + E (flight2-s7…s21 moments): 91 mid-life drops to rank 0 in 67 lives, 54 of them at the month tick (#kmrew / .kne, buổi 0) = the monthTick roads (forget, or demoteReview below). s18d b~163 = turn 14 month tick, Danh 3 → «Bị bỏ quên». E-S7 greedy-2 drop at turn 6 = exactly the end of forgetGrace.
Could she see it coming (LIVE)? No: no warning before «Bị bỏ quên», no odds word, no defence card; on psl3 the thất sủng line + news + a way back exist.

## Test (gates)
dev/test/lanhcung-early.js (real monthTick, random month steps stubbed as promo-root LC20): LIVE 772bee4f **FAIL 6 BAD** · psl3-rvk **PASS** · MUTATE=1 (LIVE rule put back on top of psl3) **FAIL 4 BAD**. Checks: rank 0 / rank 1 forgotten → thất sủng, no lãnh cung, rank kept; next month still out of lãnh cung; way back at Sủng ≥ BAL.thatS.back; newcomer grace; above BAL.thatS.rank never; NPC the same (law 1); numbers in BAL.thatS. rank-e2e / srv-rank / oldsave-r1 / quickcheck not run: no game code on this branch (they belong to the psl3 gate).
Note for the psl3 gate: dev/test/promo-root.js check (4) «after the grace → still sent to lãnh cung» asserts the OLD rule; on psl3 it must read thất sủng (canon overwrite, law 14) — the PUNISH-TIER owner should confirm it was updated.

## FOR MAIN (design, not changed — law 16)
DEMOTION REVIEW j30 demoteReview: Sủng under sungFloor(r) = RANKS[r].s − 20 for two months → giáng one rank, every consort (two-way). Idle lives: LIVE 6/12, psl3 3/12 drop 2→1/0 in months 2–7 (Danh 29–60, no fault). No OD line found for it; it is a rank change with no crime, which the 26/11 tier canon («NHẸ = everything else, no rank change») and «no fault ⇒ no punishment» (MAIN 118 P3) seem to exclude. Also law 4: the 20 is typed in j30 (not BAL). MAIN to decide: keep (rank pace), or make it thất sủng / NHẸ like «bị bỏ quên». Untouched by psl3.
