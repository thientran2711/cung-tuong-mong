# kc-roads-cn-nc-fix2 (Foreman D worker, opus) — fixes the 1 BLOCKING item of review-kc-roads-cn-nc-fix-r1.md (OD:L1288)
Branch review/kc-roads-cn-nc-fix2 = review/kc-roads-cn-nc-fix-r1 @3dba018d (main b85cdb1e + entry-exam-r1 + reviewer fixes, items 2–4 kept) + origin/main ee5d33de, then 8f476f6f merged.
Merge 8f476f6f: assemble = main's list + jkc2.js, jentry.js after jkc.js (jmgt now on main); jbal2 = main's mgTier (mg-balance-2) + slap, then entry-exam's BAL.entry and its tuyen [1,0] override (reviewer entry-exam-r1); j83 = main's (mg-train); jdis = main's disInit + fix2 known(); generated files rebuilt. START_CTX ≈ 3 % (get_session read 0; own estimate).

## 1. BLOCKING — "Chờ 3 năm" worth as much as the palace years (OD:L1288, ONE CORE OD:L1267, owner BALANCE rule in PREAMBLE)
Method: dev/measure/kc2val.js, BOTH arms fresh in every run, now with SEED=<n> (seeded Math.random per life; not bit-exact: timers), 4 seeds per row
(n ≥ 16 lives per arm, 24 for cnv/nc/muoi/tt/bd). Gap table per run: dev/measure/kc2val-gap.py (mean, sd, ± se, gap per seed). Raw: dev/measure/kc2val-fix2-*.json.
Lever = BAL.kcv only (jkc2, the one carry table). New: a row keyed by ORIGIN wins over the road kind (kc2Carry), so each origin's home road is tuned in the same table.

### FINAL BAL.kcv (jkc2; a row keyed by ORIGIN wins over the road kind; carry still × selection tier kém 0.8 / khá 1 / tốt 1.2; rows of +0 not shown on the "Hành trang" card)
| row | review r1 build | final | measured gap that set it |
|---|---|---|---|
| dan (cnv) | dn 50 st 10 kn 10 art 1 bac 40 tin 25 | dn 75 st 15 (rest same) | −42 ±14 on main 8f476f6f |
| nc | dn 8 sung 10 st 3 kn 6 art 1 bac 10 | dn 4 sung 4 st 1 kn 2 | +44 ±18 on 8f476f6f |
| bd (new, ran the nc row) | (nc row) | dn 6 sung 10 st 2 kn 4 bac 10 | −28 (ee5d33de) then +43 (8f476f6f) |
| kc (muoi, other tiểu thư without a row) | dn 35 sung 28 st 8 kn 6 art 1 | dn 18 sung 14 st 4 kn 3 art 1 | muoi +47 ±19 |
| tt (new) | (kc row) | dn 4 st 1 kn 1 | +55 ±23 |
| ch, dtq (new) | (kc row) | dn 2 only (floor) | +60 / +49 |
| td (new) | (kc row) | dn 20 sung 15 st 4 kn 3 | −72 (ee5d33de, kc row) then +70 (8f476f6f, big row) |
| thd (new) | (kc row) | dn 4 sung 2 st 1 kn 1 | +60 ±17 |
cn: no home road (not in KC2K, not a jkc tiểu thư).

### Why the numbers moved twice: the palace arm is a moving target
Main moved from ee5d33de to 8f476f6f during this task (merged twice). On 8f476f6f the consort palace arm's Danh fell by ~20–30 in the same 22 months
(e.g. tt 34 → 13, nc 40 → 9, td 26 → 5; new palace systems on main: jcmaid close-maid secrets, D29 NPC acts) while the cnv palace arm rose. The home arm (snapshot
at entry) did not change. The bot is not stuck (every palace life reaches month 23). Any later main that changes palace gains will move these gaps again:
re-run `SEED=n node dev/measure/kc2val.js 4 cnv,nc,bd,muoi,tt,dtq,thd,ch,td` × 4 seeds + kc2val-pool.py at merge time.

### FINAL — merged build (main 8f476f6f), verification run, both arms fresh (seeds 61–64 × 4; bd seeds 71–74 × 4 with the final bd row)
| origin | palace V mean (sd, n alive/n) · tier kém/khá/tốt | home V mean (sd, n alive/n) · tier | gap home − palace (± se) | gap per seed | home srk / rank · Danh · Sủng | palace srk / rank · Danh · Sủng |
|---|---|---|---|---|---|---|
| ch | 276 (55, 15/16) · 0/7/8 | 322 (6, 10/16) · 0/0/0 | **+45** (±14) | 37 / 94 / 15 / 29 | 2 · 21 · 18 | 0.4 · 11 · 71 |
| cnv | 317 (87, 15/16) · 3/11/1 | 327 (20, 16/16) · 0/7/9 | **+10** (±23) | 0 / 38 / 27 / -17 | 1 · 87 · 2 | 2.3 · 70 · 14 |
| dtq | 266 (59, 14/16) · 2/11/1 | 294 (24, 8/16) · 0/0/0 | **+28** (±18) | 25 / 39 / 5 / 52 | 1.2 · 22 · 14 | 0.6 · 10 · 54 |
| muoi | 296 (31, 16/16) · 3/12/1 | 317 (18, 11/16) · 0/0/0 | **+21** (±10) | 28 / 8 / 26 / 23 | 0.8 · 37 · 26 | 0.2 · 9 · 81 |
| nc | 305 (61, 15/16) · 2/12/1 | 294 (9, 16/16) · 0/0/16 | **-11** (±16) | -44 / -49 / -9 / 49 | 3 · 29 · 32 | 1.3 · 11 · 78 |
| td | 316 (62, 16/16) · 3/10/3 | 287 (11, 11/16) · 0/0/0 | **-29** (±16) | -63 / -29 / 3 / -22 | 0 · 36 · 20 | 1 · 20 · 82 |
| thd | 304 (78, 16/16) · 0/11/5 | 297 (17, 8/16) · 0/0/0 | **-7** (±20) | 49 / -52 / -41 / 16 | 1.6 · 26 · 18 | 1.2 · 12 · 66 |
| tt | 330 (56, 14/16) · 0/9/5 | 310 (15, 8/16) · 0/0/0 | **-20** (±16) | -11 / -20 / -16 / -31 | 1.6 · 24 · 16 | 1.8 · 20 · 80 |
| bd | 297 (67, 16/16) · 4/12/0 | 285 (8, 16/16) · 0/0/16 | **-12** (±17) | -61 / -8 / 25 / -3 | 2 · 32 · 34 | 1 · 13 · 72 |

### FINAL — palace arm pooled over both fresh runs on main 8f476f6f (n ≈ 30; the palace arm never reads BAL.kcv), home = final rows (kc2val-pool.py)
| origin | palace V pooled (n) | home V final build (n alive/n) | gap (± se) |
|---|---|---|---|
| ch | 268 (30) | 322 (10/16) | **+53** (±12) |
| cnv | 326 (31) | 327 (16/16) | **+2** (±14) |
| dtq | 268 (29) | 294 (8/16) | **+26** (±14) |
| muoi | 311 (31) | 317 (11/16) | **+7** (±9) |
| nc | 297 (30) | 294 (16/16) | **-2** (±12) |
| td | 284 (32) | 287 (11/16) | **+3** (±13) |
| thd | 286 (32) | 297 (8/16) | **+11** (±14) |
| tt | 312 (28) | 310 (8/16) | **-2** (±15) |
| bd | 290 (47) | 285 (16/16) | **-5** (±10) |
7 of 9 within 1 se (cnv +2, nc −2, bd −5, tt −2, td +3, muoi +7, thd +11). OPEN: ch +53 and dtq +26 with their carry already at the floor (Danh +2):
their home Phúc tuyển itself (jkc kcDien: KC.cut + origin rank bonus `(S.origin.r)*4`, ch Thái hậu +15) lifts them above the palace arm. BUT their home road
also loses lives: 6/16 (ch) and 8/16 (dtq) home lives never enter (trả thẻ bài → married / other ending), which this survivors-only V (the reviewer's method)
does not count; counting a non-entry as 0 puts both home roads well under the palace. Lever if the coordinator wants survivors-only equality there:
the jkc selection (KC.cut / kcMyScore bonus), not BAL.kcv — not changed here (a jkc system shared by every tiểu thư).

### History (same method, for the reviewer)
On main ee5d33de, before (old carry, seeds 1–4):
| origin | palace V mean (sd, n alive/n) · tier kém/khá/tốt | home V mean (sd, n alive/n) · tier | gap home − palace (± se) | gap per seed | home srk / rank · Danh · Sủng | palace srk / rank · Danh · Sủng |
|---|---|---|---|---|---|---|
| bd | 329 (61, 16/16) · 4/11/1 | 302 (10, 16/16) · 0/0/16 | **-28** (±16) | -50 / -68 / -1 / 9 | 2 · 37 · 34 | 1 · 34 · 84 |
| cnv | 289 (91, 15/16) · 4/10/1 | 297 (17, 16/16) · 0/3/13 | **+8** (±24) | 7 / -38 / -30 / 87 | 1 · 63 · 3 | 1.9 · 69 · 4 |
| muoi | 297 (65, 13/16) · 3/10/0 | 344 (25, 12/16) · 0/0/0 | **+47** (±19) | 87 / 83 / -22 / 43 | 0.7 · 52 · 37 | 1.2 · 18 · 56 |
| nc | 331 (100, 15/16) · 2/13/0 | 334 (9, 16/16) · 0/0/16 | **+3** (±26) | 25 / 45 / -39 / -31 | 3 · 38 · 39 | 1.4 · 43 · 68 |
| tt | 334 (67, 16/16) · 1/13/2 | 401 (5, 8/16) · 0/0/0 | **+67** (±17) | 39 / 82 / 14 / 139 | 2 · 62 · 52 | 1.6 · 34 · 75 |
On ee5d33de, first tuning (seeds 11–14/21–24, rows since replaced): cnv −11, nc +13, muoi −20, tt +15, bd +4; seeds 41–44: ch +21, dtq −13, td +35, thd +39.
On main 8f476f6f with those rows (seeds 51–54, the run that showed the drift):
| origin | palace V mean (sd, n alive/n) · tier kém/khá/tốt | home V mean (sd, n alive/n) · tier | gap home − palace (± se) | gap per seed | home srk / rank · Danh · Sủng | palace srk / rank · Danh · Sủng |
|---|---|---|---|---|---|---|
| bd | 302 (79, 15/16) · 3/12/0 | 314 (11, 16/16) · 0/0/16 | **+12** (±21) | -10 / -24 / 11 / 64 | 2 · 42 · 44 | 0.9 · 16 · 73 |
| ch | 260 (68, 15/16) · 0/5/10 | 320 (11, 12/16) · 0/0/0 | **+60** (±18) | 52 / 101 / -5 / 83 | 2 · 25 · 18 | 0.9 · 8 · 43 |
| cnv | 334 (55, 16/16) · 1/15/0 | 292 (17, 16/16) · 0/4/12 | **-42** (±14) | -42 / -82 / -59 / 16 | 1 · 62 · 3 | 2.2 · 81 · 22 |
| dtq | 270 (57, 15/16) · 2/11/2 | 319 (20, 11/16) · 0/0/0 | **+49** (±16) | 64 / 65 / 52 / -9 | 1.4 · 28 · 21 | 0.4 · 8 · 68 |
| muoi | 326 (36, 15/16) · 3/10/2 | 322 (20, 10/16) · 0/0/0 | **-4** (±11) | -25 / -8 / 22 / -9 | 0.8 · 38 · 25 | 0.7 · 22 · 91 |
| nc | 288 (68, 15/16) · 2/9/4 | 332 (10, 16/16) · 0/0/16 | **+44** (±18) | 104 / 1 / 34 / 25 | 3 · 36 · 39 | 0.9 · 9 · 68 |
| td | 253 (61, 16/16) · 3/12/1 | 323 (10, 12/16) · 0/0/0 | **+70** (±15) | 86 / 4 / 65 / 130 | 0 · 54 · 36 | 0.5 · 5 · 49 |
| thd | 268 (63, 16/16) · 0/11/5 | 329 (21, 9/16) · 0/0/0 | **+60** (±17) | 87 / 14 / 72 / 91 | 1.2 · 47 · 33 | 0.6 · 5 · 57 |
| tt | 294 (81, 14/16) · 2/11/1 | 349 (24, 10/16) · 0/0/0 | **+55** (±23) | 80 / 103 / 80 / -45 | 1.8 · 40 · 33 | 1 · 13 · 70 |
Raw files: dev/measure/kc2val-fix2-{base,aft,bd,kc4,kc5,fin,ver,bdv}-s*.json. Note: within one build the palace arm of the same origin moved by up to 64 between
two 16-life runs (td 357 / 293 on ee5d33de), so judge on pooled ≥ 30 palace lives.

## Items 2–4 (reviewer PASS) kept; on the way
- main 8f476f6f retired kitRelRow (KIT §52 kitRel2): jkc2 home family card still called it (kin-known page error) → now the same kitRel2 table as jkc kcFamCard.
- Item 3 family again: main ee5d33de brought jdis "Nàng ghét: chưa rõ" on every person card → her home family showed as strangers again (kin-known FAIL 8/8).
  Fix in ONE place: jdis known() returns the whole list for k61Own people (maid, staff, kids, home family). kin-known 8/8 + 8/8 after; pcard-dislikes ALL PASS.
- Item 2 note: kcxscan now reads every object literal in kcCard( … ), also kcCard(S.maid?{…}:{…}) → 90 cards (was 88), 0 flagged.

## Tests (final build unless noted; 0 page errors)
| test | result |
|---|---|
| kc-roads/direct.js 755x1000 / 1180x820 | 9/9 (final), 9/9 (8f476f6f merge) |
| entry-exam/direct.js 755x1000 / 1180x820 | 9/9 / 9/9 on single runs; INTERMITTENT "scene not closed by button" (kprevov still open 800 ms after its button) in 1–4 of 9 on some runs — the SAME on the reviewer build 3dba018 (r1.html: 4/4 then 2/4), so not this branch; entry-exam owner to give the test a longer wait |
| kc-roads/route.js cnv, nc, bd at 755x1000@2 + 1180x820@2 | PASS on the 8f476f6f merge; 755x1000@2 again on the final rows, shots looked at (bd "Hành trang" card: kit rows, no +0 rows) |
| kc-roads/kin-known.js 755x1000@2 / 1180x820@2 | 8/8, 8/8 (after the jdis + kitRel2 fixes; 755 again on final rows) |
| pcard-dislikes.js 755x1000@2 | ALL PASS |
| measure/kcxscan.js | 90 cards, 0 flagged |
| mortality.js | pass, 0 page errors |
| kc-roads/coop-together.js (live Worker, 8f476f6f merge) | 26/26 |
| coop-e2e.js (live Worker, 8f476f6f merge) | 59/59 (one earlier run 59/60: "#next enabled … Chờ hảo hữu" timing; re-run clean) |
| outside/oldsave.js main 8f476f6f save → this build, home save reload, 755x1000@2 | PASS (final rows) |
page.goto 30 s timeouts appeared when 4 browser tests ran at once against python http.server; every test was re-run alone.

## Notes
- KIT: no new part, no CSS. VANPHONG: no new words (carry rows reuse the existing "Hành trang" card rows).
- Not run: dev/measure/entry-bots.js (BAL.entry not changed).
