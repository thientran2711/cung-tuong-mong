## REVIEW role-parity-bundle-fix — reviewer session_01964izFRgtaMS3fADE2hXYA (BIG tier, Foreman D #18 → D #19), depth 1, START_CTX 4%

PRIORITY #1 CHECK ('role-parity petcare maid.rise'): OD 0 | ledger 0 | claims D #18 worker session_01964izD4JTc9hWG68VKtmch | main 0 | review/* review/role-parity-bundle-fix c0ac67f6 | archive 0 (same line as the order; reused the worker report + coop-e2e's clear() for the driver diagnosis).

Reviewed: c0ac67f6 → bf1988f6 (merge f0070e61) → r1 efec3641 (my FAIL 1 fixed). Landing candidate: review/role-parity-bundle-fix-rv 9c057f42 = efec3641 + LIVE b55a0e1c (FF from LIVE).

### Verdict: PASS 9c057f42 — «LAND READY review/role-parity-bundle-fix-rv 9c057f42» (FF from LIVE b55a0e1c)

### Laws checked
| law | item | result |
|---|---|---|
| 1 TWO-WAY + 4 ONE CORE | (b) rise Danh carry (BAL.danhG.srvRise .2) | PASS — now inside jagmaid riseCore, the ONE path for every rise: player srvRise (callers jagmaid amMeNight, j97 r97rise, jrd_cnv) + NPC amRise + j14 eye path. Load-probe LIVE f0070e61 vs branch identical: player servant Danh 0/30/57 → 5/11/16; NPC risen = born Đáp ứng 8 + 5 = 13; NPC staff records with Danh 0/20 (none tracked → no carry, born Danh kept: a data difference, not a second rule). No player text prints the rise Danh (one-core-text / bind PASS). |
| 1 + 4 | (a) scan ALIAS harm:petcare = cx3:petcare | PASS — TRUE alias: agRunReg cx3:petcare → runAct(v,t,"petcare") = the same ACT.petcare.f (no odds, same effects). |
| 1 + 4 | ACT.petcare.ok `a===S?true:rel(a,t)>=10` (worker's flag) | FAIL 1 at bf1988f6 (availability gate differed by actor; typed 10/20) → FIXED in r1 efec3641: ok = tsbPets(t).length>0 for both; NPC friend test only in its choices (p3PetFr, cx3:petcare recheck: rel ≥ BAL.pet.helpFr 10; mind menu rel ≥ BAL.pet.helpMind 20). No other NPC path picks petcare through .ok alone (RVGRP is the player menu; BANDS hold petsteal only). Family scan (ACT ok gates with an actor-side a===S branch): petcare was the only one. jbal2 danhG comment names riseCore. |
| 11 WHOLE GROUP | role-parity scan both roles | 0 new gaps, open baseline 13, PROMO 0/0 |

### (5) coop-guest-maid / coop-pets week stall — cause found
Not the [data-km-close] press (both drivers had it). Cause: in co-op the night-flip choice (jnf, co-op since ROOT-82 20/11) picks «Tranh sủng» → the kg82 steal mini-game opens; these drivers' clear() had no #kg82skip / result-✕ step and fell back to wiping S.mg → jsmg stays busy, jnf's choice sits in st "mg" → both seats on «Chờ hảo hữu…» at tối for ever (dump: S.nfX {st:"mg", me:"feign"} on both seats). coop-guest-maid also still hid .kcf/#kroul with CSS. I fixed it test-only for 30+ drivers (9a90ea75); meanwhile LIVE b55a0e1c (coop-host-lag r3) landed the same family fix as ONE shared helper dev/test/lib/coop-clear.js (step 5 = the kg82 tap) → my commit was DROPPED in the final merge (no duplicate).

### LIVE findings (not this branch; for Foreman D)
1. coop-guest-maid step 3 «refused (no seat) → her maid is back»: the refused maid IS returned (__askN.returned 1, the «đủ người» log line shows) but she is not in the guest's S.staff two weeks later; the guest's staff list reads [] in every step of this driver. Needs a look (staff rebuild of the guest / capTrim on seat b?). Reached only now that the weeks advance.
2. coop-pets step 5 «B ends the week first while A holds a dialog» (2 checks: «B ended the week», «merged week keeps the late help» = its consequence: the week decay runs after the help, 55 → 41): under jnf co-op the guest's night needs the host's flip, which runs at the host's endTurn — blocked by A's open dialog, so B can never end first (forceNight cannot flip for a host in a dialog). Driver scenario to redesign (resolve the host's flip + choice first, then hold the dialog), or a rule decision if a host dialog may hold the guest's night.

### Gates on 9c057f42 (one at a time)
| gate | result |
|---|---|
| dev/test/role-parity.test.js (+ role-parity scan) | ALL PASS (0 new gaps, open 13, PROMO 0/0; riseCore Sủng 23/23, Danh +5/+5, Bạc 20, old-master ghen 5/5) |
| balance-core.js | PASS, 0 page errors |
| one-core-guard / one-core-bind / one-core-text | PASS / PASS (1341 prints, 0 mismatches) / PASS |
| sg-card-scan.js | PASS (law4-typed 0) |
| night-multi.js | PASS (errs []) |
| quickcheck.sh | run 1 FAIL on perf only (longTaskMaxMs 5010 > 5000; LIVE hit 5011 in the same run = box load) → re-run QUICKCHECK PASS · old save ok · core gates PASS |
| coop-e2e.js ×3 serial (host Fold + guest iPad) | 141/141 · 141/141 · 141/141 |
| coop-guest-maid.js | 36/37 — every week advances, the rise + relay PASS both seats; 1 FAIL = LIVE finding 1 |
| coop-pets.js | 48/50 — every petcare / thaopet / petsteal / gift check PASS both seats; 2 FAIL = LIVE finding 2 |
