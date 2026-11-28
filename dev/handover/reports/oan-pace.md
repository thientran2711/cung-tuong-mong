# OAN-PACE — worker report (MAIN CHÍNH 161, session_01Rc5AsJ4BHxGcaBAuSjAmze)
depth 1 · START_CTX ~3%.
PRIORITY #1 CHECK ('giảm oán|ob-oan|oán decay|lột đồ|strip'): OD 61 | main 15 (LIVE BAL.oanFade 2 per month, jbal.js) | review/* 4: pace-all fa05166a (ONE PACE TABLE + oán/ghen cool-down + jmend) = BASE; stat-pace d04561e8 + lc23-oan 53319e6f not live (land-chain-24 queue) → not included | claims: this worker (OD 26/11 ~18:40Z row).

Owner order: OD 26/11 ~18:40Z (last row of dev/OWNER_DECISIONS.md, handover branch): no cap on events / NPC choices; control the NUMBERS (oán/ghét rise too fast, fall too slow).

## Branch
`review/oan-pace` = pace-all fa05166a + LIVE f573dc94 merged in (conflicts: assemble.py = LIVE list + jmend; j8 rivalsTurn = LIVE line with pace-all `ghenCool(v)`; CHANGE line = pace-all's) + this work. Built files rebuilt.

## What changed (all numbers in BAL; text prints the constants)
| ask | done | where |
|---|---|---|
| (a) start from pace-all | pace-all's weekly cool-down (one wk() tick = one in-game DAY: 3 a month), deep-grudge floor by memory, jmend costly roads, ghen slowdown — reused, not redone | j28 oanCool, jmend, j1 ghenUp |
| (b) one bounded step per cause | `oanAdd` (the one oán door, j9 base, every holder and target, HER too) → `opUp`: a cause adds ≤ `BAL.oanPace.step` 12; the same incident (same pair, same buổi `bq()`) never stacks — the biggest cause counts; one person→one person rises ≤ `BAL.oanPace.day` 16 a day | joanpace opUp / opStep, j9 oanAdd |
| (b') «ghét» | a fall of thiện cảm (affAdd n<0) follows the same pace (`BAL.oanPace.ghet` step 12 / day 16); a rise of liking is never capped | joanpace opDn, j9 affAdd |
| (c) fade per DAY, faster when left alone, slower when deep | pace-all fade (band width ÷ season per day after `quiet` 2 days) × (1 + `alone.k` .1 × days left alone past quiet, max `alone.max` 10) × `deep.k` .5 at ≥ «Oán sâu» (`deep.lv` 3) | j28 ocOne, BAL.oanCool.alone / deep |
| (d) revenge spends oán | an act against a person (runAct of a j95 H95 act, twDo of an AGHOST talk deed, a lie about her j95bSeed) spends `vent.share` .35 of the doer's oán toward that person (≥ `vent.min` 3); same for her | joanpace opVent |
| (e) newcomer near 0 | new faces still start at oán 0 (j1 newRival unchanged, test E1); a lie/slight is one bounded step; the cold-palace release (+20, typed in j14) now goes through oanAdd (`BAL.ag.par3.cold.oanFree`); j95b rumour numbers (typed 18 / 12) → `BAL.oanPace.rum` | j14, jagacts3, j95b |
| (f) acting on her needs a threshold | every hostile choice (j95 H95 kinds: schemes, quarrels, lie rumours; jpma spite «Thách đấu») needs grudge heat = max(oán, Ghen × net.heat.ghenK (her only), dislike × net.heat.affK) ≥ `BAL.oanPace.act` 25; coerced by proof / a faction leader's order still opens it; a rumour she believes does NOT (it made every believer a new liar: a chain of lies from day 1). The player is never gated. The «why» prints the BAL number | joanpace motiveOK wrap, opHeatOK, jpma |
Rollback: `BAL.oanPace.on = 0` (old raw rise, no gate, no vent; pace-all fade stays under BAL.oanCool.on).
Two-way (law 1): her own oán / liking toward others go through the same door, same caps, same fade, same vent (tests B5, D2).

## Robot (dev/measure/oan-pace.js, inpage6 sensible bot, seeds 0–5, 12 months; summary dev/measure/oan-pace-sum.py)
A «targeting» = a hostile deed of an NPC that LANDS on her (agLand0 = every consort/man/servant deed; tag harm / scheme, quarrels, «Thách đấu» spite, a lie rumour about her j95bSeed).
BRANCH = this build with act 25 (run as act 20 build + BALO act 25 = the committed value; one branch life ended early in a parallel run (not reproduced alone, seed 2 → 12 months), so 182 days).

| | LIVE f573dc94 | pace-all | BRANCH |
|---|---|---|---|
| targetings per day, year 1 | 0.89 | 0.87 | 0.62 |
| days with ≥ 2 targetings | 21 % | 20 % | 16 % |
| days with any | 58 % | 54 % | 35 % |
| first targeting day (6 lives) | 3, 1, 2, 2, 2, 0 | 4, 2, 1, 3, 2, 1 | 21, 7, none, 7, 18, 16 |
| targetings/day months 1–5 | .61 .72 1.17 .67 1.33 | .33 .56 .61 .50 .44 | 0 0 .20 .20 .20 |
| targetings/day months 6–12 | 1.33 1.00 .83 .72 .61 1.06 .61 | 1.50 1.33 .83 1.22 .72 1.28 1.06 | .53 1.07 1.07 1.27 1.20 1.00 .80 |
| oán toward her, mean of consorts m3 / m6 / m12 | 11.4 / 18.4 / 27.1 | 11.3 / 18.4 / 26.3 | 4.0 / 5.9 / 9.7 |
| oán max m3 / m6 / m12 | 38.8 / 65.0 / 72.2 | 60.3 / 64.8 / 86.7 | 15.7 / 18.5 / 26.7 |
| consorts at ≥ «Chút oán» / ≥ «Oán» m12 | 10.7 / 4.0 | 10.0 / 3.5 | 2.8 / 0.2 |
| her own max oán m12 | 46.2 | 42.2 | 25.2 |
| Ghen mean m3 / m6 / m12 | 67.5 / 94.9 / 99.4 | 21.0 / 51.2 / 68.2 | 17.3 / 53.1 / 72.1 |
Biggest oán-to-her cause in LIVE: j95b lie rumours (122 rises, up to 74 in one life, 18–40 per lie) → now ≤ 12 per lie and no chain.
Remaining driver after month 6: Ghen (her favour with the Emperor — a reason she gives) × ghenK opens the gate for lie rumours and spite challenges; it follows pace-all's ghen rules, untouched here.

## Tests
- dev/test/oan-pace.js: ALL PASS 20 (E1 newcomer, B1–B6 step/incident/day/two-way, C1–C3 fade, D1–D2 vent, F1–F5 gate, G1–G2 ghét, R1 rollback).
- dev/test/pace-all.js: ALL PASS 32. one-core-guard: PASS.
- Regression (58 tests that read oán / motive / oanCool, dev/measure/pace-all-regress.sh, LIVE f573dc94 vs branch): differences only in
  cold-faction (5d/8a/8b: test SETUP used oanAdd/affAdd ±40..100 in one buổi → now bypasses the pace for the setup, 5d expects min(sell.oan × nết, BAL.oanPace.step)) → ALL PASS 20;
  receiver-choice (scan setup feuds at once → the scan sets BAL.oanPace.on = 0; law-2 block same) → PASS on 3 of 4 branch runs, the 4th a one-off gap / a ±2 nết-scaled liking (11 vs 13) that moved run to run (LIVE 3/3 PASS) — reviewer: please re-run 2×;
  moodknow-step0, npc-purpose-g1g, pace-all: LIVE FAIL (pace-all's own tests, not on LIVE) → branch PASS. Everything else same exit code as LIVE.
- Shown numbers (law 4, family scan /home/user/wt/oanpace-out/dispscan.js idea): a card that prints an oán rise or a liking fall bigger than the step now prints what really lands (jbal balOanUp / balGhet; balOan uses it): j14 «Gửi thư tố» (sell.oan 40 → 12), j55 tdLeak ×3, j95 vu cáo fail ×2, j78 f_6, jgift, jpoison, jmen ×2. Servant «thiện cảm» (s.loyal) is not affAdd — unchanged.
- quickcheck 2bc7e193 vs LIVE: TIME-SPILL PASS; open 1870 ms 0 errors; old save loads + plays; perf (interleaved, median of 3, new/live): render 229/192 ms, tab 515/407, buổi 1819/922 (runs 1819/691/3328 vs 922/1083/868: noisy box), tasks>200ms 25/25 → QUICKCHECK PASS. CORE GATES: G4 80-dialog-fixed (2 FAIL «empty Tốn/Được cell») and 90-button-crawl («Ô lưu · Lui») FAIL — the SAME 2 + 1 faults on LIVE f573dc94 and on pace-all (run here on all three) → pre-existing, not this branch. one-core-guard PASS.

## RV READY → MAIN: review/oan-pace (head in the message). Lander: stack AFTER pace-all fa05166a is NOT needed — this branch already holds pace-all + LIVE f573dc94; it REPLACES the pace-all slot (land this one instead of pace-all).

## Handover (worker at rollover point)
Open items for a successor / reviewer: (1) Ghen is the main hostile driver after month 6 (pace-all ghen rules); if sếp wants a quieter second half, the lever is BAL.oanPace.act or BAL.net.heat.ghenK — both one number. (2) receiver-choice flake above. (3) direct writes to .rel (55 modules) are not paced (only the affAdd door).

## Tóm tắt cho sếp
Bản LIVE: mới vào cung 0–3 ngày đã có người nhắm, trung bình ~0,9 lần/ngày, 1/5 số ngày bị ≥2 người; oán cao nhất lên ~72 sau 1 năm; nguồn lớn nhất là tin đồn bịa (một lời đồn +18–40 oán, người tin lại đi đồn tiếp). Bản mới (không chặn sự kiện, NPC vẫn tự quyết): mỗi cớ chỉ tăng một bậc (tối đa 12), cùng một chuyện không cộng dồn, mỗi ngày mỗi người tăng tối đa 16 (cả oán lẫn ghét); oán nguôi mỗi ngày, càng để yên càng nguôi nhanh, oán sâu nguôi chậm; ra tay xong thì hả giận (tiêu bớt oán); muốn nhắm sếp phải đủ «độ giận» 25. Kết quả: 5 tháng đầu gần như yên (0–0,2 lần/ngày), lần đầu bị nhắm từ ngày 7–21; cả năm 0,62 lần/ngày; oán trung bình sau 1 năm 27 → 10. Từ tháng 6 trở đi người nhắm chủ yếu do Ghen khi sếp được sủng (lý do sếp tạo ra).
