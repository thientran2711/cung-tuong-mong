# one-core-roads — ONE CORE F1 roads (worker session_01N1tNP4eyJ4AQGCmA1HpA9c, Foreman B)

PRIORITY #1 CHECK ('one-core|go:|sc:|BAL.road.fx|BAL.arc'): OD 6 | ledger 0 | claims 8 | main 15 | review/* one-core, one-core-land(-r1) = gate live; review/one-core-dup = guard (base); no one-core-roads branch before this one. Reused: BAL.road.fx + rdFx (review/road-onecore), road-onecore-move/same pattern, BAL.road.rare + rdRare.
START_CTX ≈ 4 % of the 1M window; finished at ≈ 15 % (no rollover needed).

Branch review/one-core-roads (base review/one-core-dup 16d4925f; merged origin/main 6c4f21c3 and the newest review/one-core-dup 648461b5).

## What moved (owner OD:L1267 + OD line 1500; brief one-core-dup §2b worker 2)
Scope: dev/build/jrd_{tt,cn,muoi,dtq,nc,td,ch,thd,cnv}.js + jroad.js + jend14.js.
| kind | typed literals removed from the data files | now in |
|---|---|---|
| option sc (Lợi thế) | 2550 (incl. 6 in CHHO_D / ch_hoD) | BAL.road.fx[id][beat][i].sc |
| ending k (tier) | 774 + 1 (jroad r97 ending) | BAL.road.fx[id].E[end].k · BAL.road.rareK |
| go: amounts (rdOan / rdRel / e67* incl. single-arg e67dad / e67merit / e67heir / e67srvUp, matMis, CHU_/BAN_ MIS/NT, CHR_TH, a road person's sung / fond step, lmmCon) | 1780 option+ending, 30 rare finale | BAL.road.fx[...].g · BAL.road.rare[a].g |
Shape: option {c,w,l,o,sc,g}; ending {fx,k,sc,g} (every E entry now this shape); the go closure reads its amounts as its last parameter G (option go(A,ok,G), ending / rare go(A,G)); rdFx / rdRare (jroad.js) fill sc / k and wrap go with G = the BAL list. Index i = RUNTIME option index (a ...MAT2(a,m) spread fills two options from one literal).
Data files keep words, flags and story logic only. Texts: no player text in these files types a moved amount (scan: strings with ±N in the 11 files → only jrd_cn evidence helper "−1", a structural evidence count, not a moved amount).

## Guard (dev/test/one-core-guard.js, no --allow-grow)
| file | before (amt / sc / k) | after |
|---|---|---|
| jrd_tt | 78 / 289 / 56 | 0 |
| jrd_cn | 133 / 252 / 58 | 0 |
| jrd_muoi | 127 / 260 / 56 | 0 |
| jrd_dtq | 90 / 310 / 56 | 0 |
| jrd_nc | 75 / 281 / 56 | 0 |
| jrd_td | 195 / 349 / 58 | 0 |
| jrd_ch | 122 / 327 / 58 | 0 |
| jrd_thd | 174 / 212 / 56 | 0 |
| jrd_cnv | 99 / 248 / 56 | 0 |
| jroad | 0 / 0 / 1 | 0 |
| jend14 | 11 / 22 / 6 | 0 |
Baseline 11965 → 7794 (my files) → 7475 after merging one-core-dup F3. 0 fails. Guard code untouched.

## Proof (gate) — dev/measure/road-onecore-g-same.js (ref 16d4925f vs NEW, 60 trials per go / odds)
OLD vs NEW sandboxes; deep-equal sc / k / c / w / l / sf / f / e / need / fx / tag; odds === on random lives; every option go, ending go and RD97L rare go run on random lives with recording stubs (relAdd / oanAdd via the real rdOan / rdRel, e67*, ap67, … auto-stubbed unknown globals): call log + return + state after === .
| origin | chapters | sc | k | odds fn | go fns | go runs | diff |
|---|---|---|---|---|---|---|---|
| tt | 28 | 289 | 84 | 316 | 141 | 8700 | 0 |
| dtq | 28 | 310 | 84 | 324 | 165 | 10140 | 0 |
| muoi | 28 | 260 | 84 | 260 | 132 | 8040 | 0 |
| cn | 28 | 252 | 86 | 266 | 136 | 8280 | 0 |
| nc (+bd aliases) | 28+28 | 281 | 84 | 322 | 110 | 6780 | 0 |
| td | 28 | 349 | 86 | 325 | 188 | 11400 | 0 |
| ch | 28 | 351 | 86 | 334 | 179 | 10920 | 0 |
| thd | 28 | 212 | 84 | 270 | 173 | 10500 | 0 |
| cnv | 28 | 265 | 87 | 333 | 251 | 15300 | 0 |
| noi14/hau14/ke14 | 3 | 22 | 9 | 30 | 27 | 1620 | 0 |
Result: SAME (also after both merges). Negative test: 3 hand-made BAL changes (one sc, one option g, one rare g) → all 3 caught.
Tools: dev/measure/road-onecore-g-move.js (mover; --rare pass), road-onecore-g-same.js (proof).

## Tests
- one-core-guard PASS 0 fails · coop-one-world PASS · coop-e2e 60/60 (pre-merge build; final re-run below) · road-rare ALL PASS · road-end: lives reach ch14 (noi14/hau14/ke14 endings) · road-card Fold 755x1000 + iPad 1180x820 (tt_co_5, thd_sach_9, cnv_mat_8, hau14): no overflow, 0 errors, cards look the same (values unchanged; shots in scratch only).
- FINAL on 75bc9f05: coop-e2e 60/60 PASS · road-rare ALL PASS · coop-one-world PASS · one-core-guard 0 fails · proof SAME · QUICKCHECK PASS (old save ok; perf new/live render 209/244 ms, buổi 867/1073 ms).

## Left (not in scope / not rule numbers)
- go closures still type flags / indices / state: A.f.x=1, RD_FL(k,1), TDRUONG(1), rdGo(id,i) indices, S.th=0 on the Thái hậu's death, S.cutPay max(…,1) — not tunable amounts.
- jrd_cn:16 evidence helper text "−1" with evA(S,q,-1) (outside chapters; evidence count).
- Idea for Foreman B (not built, feature freeze): the guard's amt pattern misses single-argument calls (e67dad(4), e67merit(5)); worth adding a kind so F2/F3 catch them too.
