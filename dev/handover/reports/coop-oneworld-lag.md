# E49 — co-op one-world lag (thin guest month-card / weekly bạc one merged week late) — STEP 0 RESULT: ALREADY FIXED IN B's LANE, NOT REBUILT
depth 3 (limit 8). Session session_01DgYSWmnL2hPHcScZRo5sRJ, child of FOREMAN E #30. ORDER MAIN 102 21/11 23:33Z, brief briefs/E49-coop-oneworld-lag.md.
PRIORITY #1 CHECK ('one-world|bongloc-coop|coop-thin-g|thin guest|lag'): OD 24 | ledger 1 | claims 8 (B coop-thin-g F1 fixer #4 session_01N1tNP48cvPSepUBAC1udzg, review/coop-thin-g-f1) | main 15 | review/* 10 (review/coop-thin-g-f1 e7b996f2 = the fix) | archive 0

## Root (proven on LIVE 02c6d8f4, level 6, probes in scratch only)
Not the month tick and not a late send. At the start of a new week the thin guest's FIRST person diff (`do erd`, jcoopthine gReady and the F-intent sender in jcoopthinf, both via `E.base(V)`) is computed against `TH.view` — and at that moment the view she holds is still the host's PRE-week copy of her (view `o.w` = last week). Her S is already the merged C (fromCanon), which is also exactly what the host rebuilds his store of her from. So the diff carries the whole week's merged change (month stipend, Lót tay tip, weekly bạc lines) as if it were a new act of hers; the host adds it a second time to his store; her phone keeps one count. Her next diff (now against a current view) carries the opposite delta → "equal again a week later".
Probe evidence (4 runs × 6 weeks, guest side at each erd with bạc): EVERY DIFF week had `view week < room week` and `base bạc = last week's`, `phone bạc = merged C bạc`; e.g. week 6: view w5 base 203, phone 255 = C 255 → op +52 → host 307 vs phone 255 (DIFF −52); the next erd −52 healed it. Weeks whose first erd went with a current-week view: always EQUAL. Host side: store rebuilt at the week from C = exact (e.g. 344 = C 344), then moved only by that erd (+72).

## B's lane already fixes it (review/coop-thin-g-f1, commit e7b996f2 «rv coop-thin-g r1: seat desync fix»)
jcoopthine.js: `E.base` never takes a view of an older week; on `week` her baseline = her post-merge S (`E.bs=curP()`, `E.pn=S.thpn`). Active from level 5 (`TH.on(5)`), so it covers the level-6 room of the repro, not only G's level 13. One place covers the whole family (law 11): every guest→host person diff (ready erd + every F intent's erd) goes through `E.base`, so bổng lộc / lễ nghĩa / cut answers / weekly bạc lines / any other personal number of her week end are all the same path.
Per STEP 0: NOT rebuilt; no review/coop-oneworld-lag branch made.

## Repro on review/coop-thin-g-f1 99201b6c + LIVE 02c6d8f4 (local trial merge, index.html/sw.js conflicts only, dev/index.html re-assembled; NOT pushed)
| test | LIVE 02c6d8f4 (before) | B lane + LIVE (after) |
|---|---|---|
| bongloc-coop.js (one-world check) | ×3: 1 FAIL (host 190 / phone 270) — reviewer saw ~50 % | ×6: 6/6 PASS 15/15 (2 first tries were Chromium "Target crashed" from 8 parallel browsers on 4 CPUs, re-run) |
| bongloc-coop-catch.js (6 merged weeks) | probes ×7 runs: DIFF in 5 runs (−82…+30), each healed next week | ×3: 18/18 weeks EQUAL, 0 gaps |
Side note (FOR B, not the lag): 1 of 3 catch runs had a console error `TypeError reading 'n' at rkOfFace` (j19 rkOfFace: `RANKS[r].n` with r out of range for a face) → "no page errors" FAIL in that run only; not seen in the 7 LIVE runs, not seen in the other 8 lane runs. Worth one look in B's lane (rank of a face outside RANKS on the guest).

## So
The ticket closes when B's coop-thin-g-f1 lands. Whoever reviews/lands it: add `bongloc-coop ×6` + `bongloc-coop-catch` (0 gaps) to its gates. E49 has no code to land.
