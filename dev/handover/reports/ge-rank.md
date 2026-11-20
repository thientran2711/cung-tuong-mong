# ge-rank (E35, opus, FOREMAN E #23) — law 5 for grand endings: ONE engine key BAL.ge.odds.rank
PRIORITY #1 CHECK ('law-5|rank key|GE law' + 'ge-rank|BAL.ge.odds'): OD 0 | main: jge.js geOdds (no rank term), jbalge.js BAL.ge.odds {base,per,min,max,noCond} | review/*: none (no ge-rank branch; ge-batu/ge-writers-w* carry no rank term) | claims: E35 row only. Source of the ask: reports/ge-batu.md FOR E Q1 + ge-batu-review.md. Reused: rkOf (j8, the one rank reader), isSrv (j42), the road pattern ["-m","rank",k] (jbalbd).
READY sha: **c5ebab9a** on review/ge-rank (base LIVE 548dcd0d). START_CTX ≈ 3 %.

## What
- `BAL.ge.odds.rank: 2` (jbalge.js) = odds lost per rank step. `geOdds` (jge.js, the ONLY grand-ending odds site) = base + pull × per − geRk() × rank, then clamp [min,max], then the noCond cap (unchanged order).
- `geRk()` (window.geRk): her step = rkOf(S) 0 Đáp ứng … 7 Hoàng hậu; a servant life (isSrv, the cnv roads) climbs the maid ladder instead → step = S.srv.rk. Same key for all 40 branches, every wave; nothing per branch, no GE data file types odds.
- Gates (BAL.ge.gate stat floors, cond/fo terms) are NOT changed: they are end-of-life floors (design §2); law 5 lives in the one odds term. The ladder word on ge2 (D7 showOdds, off) reads the same geOdds.
- GRAND_ENDINGS.md §2 (resolve line) + key list fixed in place (law 14).
- No UI, no player word (VANPHONG untouched); old saves: nothing saved changes.

## Family scan (law 11) — `node dev/test/ge-rank-scan.js` (new)
Static: every odds/gate site in dev/build → geOdds is the one roll (jge.js:72 reads rank), the 4 other odds lines call geOdds; gates = stat floors only; 0 GE data files with their own odds.
| wave | branches | endings | law 5 holds BEFORE | AFTER | odds pull 3, rank 0→7 BEFORE | AFTER |
|---|---|---|---|---|---|---|
| pilot | 3 | 12 | 0/12 | 12/12 | 49 ×8 | 49 47 45 43 41 39 37 35 |
| W1 | 11 | 44 | 0/44 | 44/44 | 49 ×8 | same |
| W2 | 11 | 44 | 0/44 | 44/44 | 49 ×8 | same |
| W3 | 11 | 44 | 0/44 | 44/44 | 49 ×8 | same |
| Ba Tư | 4 | 16 | 0/16 | 16/16 | 49 ×8 | same |
| all | 40 | 160 | 0/160 | 160/160 | | |
Odds after (pull 0/3/6 × rank 0…7): 22→8 · 49→35 · 76→62. Servant step = maid rung ok; raised = rank ok. PASS 0 faults.

## Tests (c5ebab9a)
- ge-engine: new check `rank` (every branch: 8 ranks = clamp(base+3·per − r·rank), servant lives step S.srv.rk). `- all` 1324/1328 on 38802136 — the 4 fails were the test itself on the cnv servant lives (it moved S.rank); fixed in the test → cnv_mat,cnv_chu,cnv_ban,cnv_ma,tt_co 173/173.
- ge-guard 8/8 · ge-bd-scan 34 hits / 0 faults (unchanged) · one-core-guard PASS (inline 3776 ≤ 3930).
- **CO-OP** (gate L594): `COOP_GE=1 COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc node dev/test/coop-e2e.js` (live Worker, Fold host + iPad guest) **74/74 PASS**: each seat's GE odds read HER OWN rank (host 5 / guest 1 → 39 / 47; swapped two-way → 47 / 39; again after 3 merged weeks), the friend's rank never moves the other seat's odds.
- `bash dev/tools/quickcheck.sh` alone: **QUICKCHECK PASS** · core gates PASS · open 1753 ms · old save ok · perf new/live render 289/291, tab 573/511, buổi 1474/1105, tasks>200ms 22/23.
- role-parity: not run (no acts/agents touched). Shots: none (no UI change).

## FOR E
- Size: rank 2 per step (−14 at Hoàng hậu, −10 at the maid top rung). A full ge-measure re-run (inChar band .30–.60) on a roomier box would confirm; ge-batu saw this container crash on long measures. One key flip if E wants it steeper.
- Maid rung and consort rank share one step size (maid ladder 0–5). If E wants a separate servant step, it is a second key — not built (one key asked).
