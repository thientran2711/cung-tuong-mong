PRIORITY #1 CHECK ('night-final|night-ledger|balance-chain|balance-final|jnf|jledger'): OD 23 (L1387/L1391/L1395/L1436/L1477/L1478/L1481 read verbatim) | ledger 1 | main 716be762: NO jnf.js / jledger.js / jbalcore.js (jfe.js start-of-tối flip still live) | review/* night-final(-fix/-r1/-r2), night-ledger(-r1), balance-chain, **balance-final 40775131** | claims: balance-final #5 row (D, LAND READY) + this row.

# night-rule (GAP J1: rows OD01, OD02, KP01) — worker report: NOTHING TO BUILD, rows close by landing review/balance-final

Worker: opus, session_01N1tNP4WihwjC1KpbcQwX9A; coordinator Foreman B ROOT session_01N1tNP67dwhHUVRbLgDsEPs. Brief briefs/b-gap-1.md J1.
START_CTX ≈ 4 % of 1M (own estimate). No branch review/night-rule was created (LAW 13: never rebuild).

## 1. Where the work already is (chain on origin)
| step | branch @ sha | verdict |
|---|---|---|
| night-final (OD:L1436/L1477/L1478 final rule + OD:L1481 Giữ chân + Tranh sủng/Chặn ngự giá rebalance) | review/night-final-r2 @ 52d5092d | PASS (review-night-final-r2.md) |
| 10-night ledger (OD:L1387/L1391/L1395) + NPC Ân drift fix (pace + BAL.nt.extraFx.anP 25: NPC Ân m24 17.4 → 3.5 vs base 1.6) | review/night-ledger-r1 @ 37018e74 (contains night-final-r2 + cycle-roll-r1) | PASS (review-night-ledger-r1.md) |
| balance-core + the whole night chain re-done on newer main | review/balance-chain @ ce3f5611 / f9a37b7e | SSK (balance-chain-redo.md) |
| balance-chain + balance-2 in ONE branch, merged LIVE many times, gates (night-final, night-multi, ledger, coop-night 105/105, coop-e2e 68/68, role-parity, quickcheck) | **review/balance-final @ 40775131** | **BIG PASS → LAND READY** (balance-final.md, 19/11 16:27Z; CLAIMS row 74; FOREMAN_D_STATUS: lands after choice-value-audit) |
GAP_LIST rows OD01 / OD02 / KP01 say "missing" with LIVE evidence — true for LIVE, but every one is built and PASSED in balance-final (law 2 measured: best-choice share 24–64 % each for Tranh sủng / Chặn ngự giá; Giữ chân gain-only).
night-final f7c54202 and night-ledger 55141158 named in the brief are OLDER links of this chain; merging them again onto LIVE would duplicate balance-final.

## 2. State today (checked 20/11 ~09:30Z, no push)
- LIVE main = 716be762. balance-final 40775131 merge-base = 2bda29a1 (19/11). `git merge-tree` LIVE × balance-final: **conflicts in 9 code files** (assemble.py, j1, j13, j24, j4, j54, j7, j70, j75) + index.html / sw.js → it needs a final-merge + gate re-run before it can land.
- choice-value-audit 02e151e3 (D's queue: lands BEFORE balance-final) also conflicts with LIVE (j24, j25, j3, j7 + generated); D #9 has a worker on its final-merge.
- Foreman D's order (FOREMAN_D_STATUS 19/11 22:08Z, ROOT-71): choice-value first, then balance-final final-merge. Owner flags for balance-final (QP, kids/y ≈1.45×, seat vacancy, NPC Sủng lower) are with MAIN, not decided.

## 3. Not covered by balance-final (left open, not mine to build)
- Co-op night: the final rule (OD:L1478 (3) "EVERY player (both co-op players) gets a forced choice") is PARKED in co-op (jnf nfParked = COOPW.on; co-op keeps the live start-of-tối flip via jfe) per OD:L1493 → coop-thin lane (Foreman B) after balance-final lands.
- Her Ân saturates (~80 at m24) with the ledger (review-night-ledger-r1 FOR MAIN 1) — balance pass, MAIN/D.
- review-night-ledger-r1 FOR MAIN 4/5/7 (cycle-tuần day acts, jdh milestone 10× sooner, AG2 custom off on days 1/15) — open questions for MAIN.

## 4. Options for Foreman B (decision is the coordinator's)
A. (recommended) Drop J1 as a build job; mark OD01/OD02/KP01 "closed by review/balance-final 40775131 (LAND READY, D queue)" in GAP_LIST; D's queue does the final-merge after choice-value.
B. If D cannot staff it soon: this worker (or a successor) does the final-merge of balance-final onto newest LIVE on a NEW branch review/balance-final-r2 (never pushing D's branch), re-runs balance-final's gate table, SSK → BIG re-gate. Needs D's OK first (same files as choice-value; whoever lands second merges).

## 5. MAIN ROOT-76 ruling 20/11 08:45Z (seen after §1–4) and what it means
Ruling: night-final (OD01/OD02) stays with D (#9 night-land-chain FUQc1YiG: balance-core-r3 → night-final-r3); B night-rule keeps ONLY KP01 (ledger), built on top of D's night-final-r3 (or LIVE once landed).
FLAG for MAIN + D (PRIORITY #1): review/balance-final 40775131 (D's own branch, BIG PASS 19/11) ALREADY holds balance-core + night-final + night-ledger-r1 merged and gated together. A fresh balance-core-r3 → night-final-r3 chain re-does that merge; D should start from balance-final (final-merge LIVE) instead, or say why not.
KP01 plan for this worker once night-final-r3 (or LIVE) has jnf: port review/night-ledger-r1 37018e74's own diff (jledger.js, j8 ldPin/ntP, j75 by-day custom + pace, jcycle cyLdDay, BAL.nt, ledger.js, ledger-bot.js) — the same lines balance-final already resolved against newer main (use them as the conflict guide) — re-run ledger.js / night-final / night-multi / coop-night / coop-e2e + ledger-bot before/after (NPC Ân, her Ân), SSK → BIG.

Status: WAITING for D's review/night-final-r3 on origin (or Foreman B's answer to §5 FLAG). No code changed, no branch pushed.
