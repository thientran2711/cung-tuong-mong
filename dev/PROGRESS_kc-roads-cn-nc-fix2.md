# kc-roads-cn-nc-fix2 (Foreman D worker, opus) — fixes the 1 BLOCKING item of review-kc-roads-cn-nc-fix-r1.md (OD:L1288)
Branch review/kc-roads-cn-nc-fix2 = review/kc-roads-cn-nc-fix-r1 @3dba018d (main b85cdb1e + entry-exam-r1 + reviewer fixes, items 2–4 kept) + origin/main ee5d33de merged
(assemble.py: main's list + jmgt.js after j91.js + jkc2.js, jentry.js after jkc.js; site rebuilt). START_CTX ≈ 3 % (get_session read 0; own estimate).

## 1. BLOCKING — "Chờ 3 năm" worth as much as the palace years (OD:L1288, ONE CORE OD:L1267, owner BALANCE rule in PREAMBLE)
Method: dev/measure/kc2val.js, BOTH arms fresh in every run, now with SEED=<n> (seeded Math.random per life; not bit-exact: timers), 4 seeds per row
(n ≥ 16 lives per arm, 24 for cnv/nc/muoi/tt/bd). Gap table per run: dev/measure/kc2val-gap.py (mean, sd, ± se, gap per seed). Raw: dev/measure/kc2val-fix2-*.json.
Lever = BAL.kcv only (jkc2, the one carry table). New: a row keyed by ORIGIN wins over the road kind (kc2Carry), so each origin's home road is tuned in the same table.

### What changed (BAL.kcv)
| row | before | after | why |
|---|---|---|---|
| dan (cnv) | dn 50 st 10 kn 10 art 1 bac 40 tin 25 | unchanged | on main ee5d33de the gap is −11 ±13 (reviewer's −45 was on b85cdb1; palace arm sd 57–91) |
| nc | dn 8 sung 10 st 3 kn 6 art 1 bac 10 | unchanged | +13 ±17 on this main (reviewer +76 on b85cdb1); home selection BAL.entry.w.nc left as is |
| bd (new; before ran the nc row) | (nc row) | dn 12 sung 18 st 3 kn 6 art 1 bac 10 | home −28 ±16 on the nc row |
| kc (tiểu thư: tt, muoi) | dn 35 sung 28 st 8 kn 6 art 1 | dn 18 sung 14 st 4 kn 3 art 1 | tt +67 ±17, muoi +47 ±19 |
| ch (new) | (kc row) | dn 4 st 1 kn 1 | +65 ±18 on the kc row (home Phúc tuyển already lifts her to rank 2) |
| dtq (new) | (kc row) | dn 8 sung 6 st 2 kn 2 | +43 ±25 |
| td (new) | (kc row) | dn 45 sung 35 st 10 kn 8 art 1 | −72 ±17 (home enters at rank 0) |
| thd (new) | (kc row) | dn 24 sung 18 st 5 kn 4 art 1 | −21 ±15 |
cn: no home road (not in KC2K, not a jkc tiểu thư). The carry is still scaled by the selection tier (kém ×0.8 / khá ×1 / tốt ×1.2) and shown on the "Hành trang" card (kit rows).

### BEFORE (this merged build, old carry; seeds 1–4, 4 lives × 4 per arm)
| origin | palace V mean (sd, n alive/n) · tier kém/khá/tốt | home V mean (sd, n alive/n) · tier | gap home − palace (± se) | gap per seed | home srk / rank · Danh · Sủng | palace srk / rank · Danh · Sủng |
|---|---|---|---|---|---|---|
| bd | 329 (61, 16/16) · 4/11/1 | 302 (10, 16/16) · 0/0/16 | **-28** (±16) | -50 / -68 / -1 / 9 | 2 · 37 · 34 | 1 · 34 · 84 |
| cnv | 289 (91, 15/16) · 4/10/1 | 297 (17, 16/16) · 0/3/13 | **+8** (±24) | 7 / -38 / -30 / 87 | 1 · 63 · 3 | 1.9 · 69 · 4 |
| muoi | 297 (65, 13/16) · 3/10/0 | 344 (25, 12/16) · 0/0/0 | **+47** (±19) | 87 / 83 / -22 / 43 | 0.7 · 52 · 37 | 1.2 · 18 · 56 |
| nc | 331 (100, 15/16) · 2/13/0 | 334 (9, 16/16) · 0/0/16 | **+3** (±26) | 25 / 45 / -39 / -31 | 3 · 38 · 39 | 1.4 · 43 · 68 |
| tt | 334 (67, 16/16) · 1/13/2 | 401 (5, 8/16) · 0/0/0 | **+67** (±17) | 39 / 82 / 14 / 139 | 2 · 62 · 52 | 1.6 · 34 · 75 |
| ch | 298 (65, 13/16) · 0/5/8 | 363 (11, 9/16) · 0/0/0 | **+65** (±18) | 66 / 63 / 58 / 65 | 2 · 41 · 35 | 0.8 · 30 · 72 |
| dtq | 295 (92, 16/16) · 2/14/0 | 338 (29, 8/16) · 0/0/0 | **+43** (±25) | 37 / 57 / 100 / -9 | 1.5 · 38 · 31 | 1.2 · 36 · 46 |
| td | 357 (60, 13/14) · 0/12/1 | 285 (10, 10/15) · 0/0/0 | **-72** (±17) | -80 / -115 / -26 / -78 | 0 · 37 · 19 | 1.5 · 36 · 82 |
| thd | 332 (57, 15/15) · 1/10/4 | 311 (13, 11/16) · 0/0/0 | **-21** (±15) | 4 / -29 / -32 / -19 | 1.1 · 38 · 28 | 1.3 · 31 · 75 |
(dtq/thd/ch/td rows: seeds 31–34, kc row halved already — the kc row alone could not fit all six tiểu thư.)

### AFTER — per run, both arms fresh (cnv, nc, muoi, tt seeds 11–14 × 6; bd seeds 21–24 × 6 with the final bd row; dtq, thd, ch, td seeds 41–44 × 4)
| origin | palace V mean (sd, n alive/n) · tier kém/khá/tốt | home V mean (sd, n alive/n) · tier | gap home − palace (± se) | gap per seed | home srk / rank · Danh · Sủng | palace srk / rank · Danh · Sủng |
|---|---|---|---|---|---|---|
| cnv | 311 (57, 23/24) · 2/20/1 | 300 (20, 24/24) · 0/4/20 | **-11** (±13) | -12 / -12 / 13 / -33 | 1 · 63 · 4 | 2.2 · 79 · 20 |
| muoi | 335 (74, 22/24) · 3/19/0 | 315 (25, 20/24) · 0/0/0 | **-20** (±17) | -12 / 15 / -45 / -25 | 0.8 · 36 · 25 | 1.2 · 36 · 76 |
| nc | 321 (76, 20/23) · 2/17/1 | 334 (10, 24/24) · 0/0/24 | **+13** (±17) | 22 / 13 / 23 / -3 | 3 · 36 · 39 | 1.3 · 40 · 65 |
| tt | 332 (74, 22/24) · 1/17/4 | 347 (23, 17/24) · 0/0/0 | **+15** (±17) | -58 / 55 / 31 / 28 | 1.7 · 39 · 33 | 1.3 · 34 · 75 |
| bd | 311 (58, 22/24) · 5/17/0 | 315 (8, 24/24) · 0/0/24 | **+4** (±12) | -16 / -10 / 16 / 19 | 2 · 40 · 44 | 1.0 · 31 · 78 |
| ch | 303 (80, 15/16) · 0/8/7 | 325 (8, 9/16) · 0/0/0 | **+21** (±21) | 72 / 8 / 41 / -18 | 2 · 26 · 18 | 1.5 · 27 · 56 |
| dtq | 329 (80, 16/16) · 2/11/3 | 316 (21, 13/16) · 0/0/0 | **-13** (±21) | -5 / 12 / -63 / 5 | 1.5 · 28 · 22 | 1.6 · 32 · 82 |
| td | 293 (60, 14/16) · 2/9/3 | 328 (12, 10/16) · 0/0/0 | **+35** (±16) | -10 / 63 / 66 / 12 | 0 · 56 · 36 | 0.9 · 26 · 57 |
| thd | 271 (51, 16/16) · 0/12/4 | 310 (30, 9/16) · 0/0/0 | **+39** (±16) | 45 / 73 / 12 / 32 | 0.9 · 44 · 30 | 0.5 · 15 · 53 |

### AFTER — palace arm pooled over every fresh run on this branch (it never reads BAL.kcv), home arm = final rows only (dev/measure/kc2val-pool.py)
| origin | palace V pooled (n) | home V final build (n alive/n) | gap (± se) |
|---|---|---|---|
| ch | 301 (28) | 325 (9/16) | **+24** (±14) |
| cnv | 302 (38) | 300 (24/24) | **-2** (±13) |
| dtq | 312 (32) | 316 (13/16) | **+4** (±17) |
| muoi | 321 (35) | 315 (20/24) | **-6** (±14) |
| nc | 326 (35) | 334 (24/24) | **+9** (±15) |
| td | 324 (27) | 328 (10/16) | **+4** (±14) |
| thd | 300 (31) | 310 (9/16) | **+10** (±15) |
| tt | 333 (38) | 347 (17/24) | **+14** (±13) |
| bd | 308 (62) | 315 (24/24) | **+7** (±8) |
Every gap is within ~1.7 se of 0 and far inside the palace spread (sd 50–90): the palace is the gamble (Tân Giả khố / kém or high Sủng), home is the safe road
with about the same mean. Note: the palace arm moves between runs by up to ±60 (td 357 → 293, thd 332 → 271 with identical palace code), so single 8-life runs
cannot judge this; use ≥ 16 lives per arm and the per-seed column. nc/bd home still reach the ceiling 24/24 (tốt): the carry is what balances them (reviewer's
suggested selection lever not needed on this main; nc home Danh 36 Sủng 39 vs palace 40 / 65).
Tiểu thư home lives end outside the palace in 4–7 of 16 (bot accepts marriages "Vợ quan thanh liêm", "Gả xa"): those are real endings, not counted in V.

## Items 2–4 (reviewer PASS) kept; on the way
- Item 3 family again: main ee5d33de brought jdis "Nàng ghét: chưa rõ" on every person card → her home family showed as strangers again (kin-known FAIL 8/8).
  Fix in ONE place: jdis known() returns the whole list for k61Own people (maid, staff, kids, home family). kin-known 8/8 + 8/8 after; pcard-dislikes ALL PASS.
- Item 2 note: kcxscan now reads every object literal in kcCard( … ), also kcCard(S.maid?{…}:{…}) → 90 cards (was 88), 0 flagged.

## Tests (final build unless noted; 0 page errors)
| test | result |
|---|---|
| kc-roads/direct.js 755x1000 / 1180x820 | 9/9, 9/9 (755 re-run on the final rows) |
| entry-exam/direct.js 755x1000 / 1180x820 | 9/9 / 9/9 on single runs; INTERMITTENT "scene not closed by button" (kprevov still open 800 ms after its button) in 1–4 of 9 on some runs — the SAME on the reviewer build 3dba018 (r1.html: 4/4 then 2/4), so not this branch; entry-exam owner to give the test a longer wait |
| kc-roads/route.js cnv, nc, bd at 755x1000@2 + 1180x820@2 | PASS (fail lists empty) |
| kc-roads/kin-known.js 755x1000@2 / 1180x820@2 | 8/8, 8/8 (after the jdis fix) |
| pcard-dislikes.js 755x1000@2 | ALL PASS |
| measure/kcxscan.js | 90 cards, 0 flagged |
| mortality.js | pass, 0 page errors |
| kc-roads/coop-together.js (live Worker) | 26/26 |
| coop-e2e.js (live Worker) | 59/59 (one earlier run 59/60: "#next enabled … Chờ hảo hữu" timing; re-run clean) |
| outside/oldsave.js main ee5d33de save → this build, home save reload, 755x1000@2 | PASS (re-run on the final rows) |
page.goto 30 s timeouts appeared when 4 browser tests ran at once against python http.server; every test was re-run alone.

## Notes
- KIT: no new part, no CSS. VANPHONG: no new words (carry rows reuse the existing "Hành trang" card rows).
- Not run: dev/measure/entry-bots.js (BAL.entry not changed).
