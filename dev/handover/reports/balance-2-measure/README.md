# balance-2 measure tables (D8 worker, 17/11)

Summaries from dev/measure/anbal2.py over runbal2.sh output (raw dumps not committed). Builds: before = dev/game_base.html (branch before game changes); all others = dev/game_after.html (review/balance-2 @832c25d7). bp_* = ctxTaste/ctxCap old (12/22) vs new (18/30), skilled (hint) vs random bot. khoB = Khó on game_base, khoA = Khó on game_after, khoA13 = khoA with DIFF.kho.bal.hz=[1.35,0]; all Khó runs capped at 3 years (YRSTOP=3), so the HH column is not comparable with Vừa. sung = still running at push time; added later if the container lives.

| run | group | lives | Hoàng hậu | ended before HH/cap | early < 3 y | avg max rank | avg rank end | Sủng m12/24/36 | Danh m12/24/36 | stuck |
|---|---|---|---|---|---|---|---|---|---|---|
| before | vua | 152 | 14 (9 %) | 51 (34 %) | 24 (16 %) | 4.6 | 3.0 | 96/96/98 | 43/42/39 | 3 |
| after | vua | 152 | 7 (5 %) | 58 (38 %) | 30 (20 %) | 4.7 | 2.7 | 98/97/98 | 52/48/58 | 4 |
| khoA | kho | 76 | 0 (0 %) | 9 (12 %) | 9 (12 %) | 3.8 | 2.1 | 96/97/- | 48/55/- | 0 |
| khoA13 | kho | 76 | 1 (1 %) | 15 (20 %) | 15 (20 %) | 3.8 | 2.2 | 97/95/- | 56/49/- | 0 |
| khoB | kho | 76 | 0 (0 %) | 13 (17 %) | 13 (17 %) | 3.6 | 2.3 | 96/97/- | 42/34/- | 0 |
| bp_old_hint | vua | 40 | 2 (5 %) | 17 (42 %) | 12 (30 %) | 4.7 | 2.0 | 98/98/97 | 76/75/79 | 0 |
| bp_old_rand | vua | 40 | 1 (2 %) | 8 (20 %) | 6 (15 %) | 3.4 | 2.1 | 93/97/99 | 34/30/44 | 1 |
| bp_new_hint | vua | 40 | 5 (12 %) | 9 (22 %) | 6 (15 %) | 4.7 | 3.2 | 97/97/99 | 70/77/89 | 0 |
| bp_new_rand | vua | 40 | 2 (5 %) | 14 (35 %) | 10 (25 %) | 3.6 | 1.9 | 94/96/94 | 34/36/30 | 0 |
