# coop-night0 — one night path for a co-op room (opus worker session_01N1tNP3HK3BJNWZ1ufSpLkD, 22/11; START_CTX ≈ 4 %)
PRIORITY #1 CHECK: ORDER MAIN 104 06:28Z (FOREMAN_B_STATUS L228/L231) | main 24980875 jnf.js:387 act listener returns on !nfOn() | review/* none fixes it (rv 4jNDqKuC checked bundle-nfstall / night-*); review/night-ledger-coop edits jnf `re` (L394) + ld*, NOT nfOn / nfParked → no overlap with this fix | claims B row 'coop-night0 stall fixer'.
Branch **review/coop-night0** off origin/main 24980875.

## Root (rv 4jNDqKuC, confirmed)
nfOn() was a PER-SEAT decision (S.dead / isSrv / isKc of the seat's own life). jnf's co-op relay is host-authoritative, so a room whose two
seats disagree breaks: host cung nữ (nfOn false → live servant night, tnRelay) + guest phi tần (nfOn true) → the guest asks «which word for
day 0?» every 400 ms; the host's act listener returns on !nfOn() → guest «night 0» for ever, host «Chờ hảo hữu…».
Repro on LIVE: `COOP_A_ORIGIN=cnv COOP_B_ORIGIN=tt node dev/test/coop-e2e.js` → «buổi 0:3 advanced for both» FAIL, guest tr «night 0» ×N, dates [1,3,1] vs [1,3,0].

## Fix (jnf.js, one place: THE gate nfParked)
- `seatOff(P)` / `roomOff()` read the room's SHARED world `COOPW.base.P.a / .b` (the same on both phones): a seat is off the palace night when
  it is dead, a cung nữ not risen (`S.srv && !S.srv.risen`, old blob: top-level `srv`), or the tiểu thư at home (`S.kc && !S.kc.inPal`).
- `nfParked()` = thin part-E room **or roomOff()**. So in a room jnf runs only while BOTH seats live in the palace; otherwise the room is
  parked on the live co-op night on BOTH seats — the path co-op ran before the 20/11 unpark: jfe start-of-tối flip (also turns a tablet a
  seat had marked waiting, S.nfP, before the room went off), the live Tranh sủng / Chặn ngự giá cards (j2 deal, ACT.ok, RVGRP / BANDS via
  nfActs), jsteal's own pass, jcoopworld tnRelay / tnWeek (both read window.nfOn).
- Two-way (law 1): host cung nữ + guest phi tần and host phi tần + guest cung nữ give the same answer on both seats.
- Mid-week rise (j42 srvRise / jagmaid / jrd_cnv / j97): the risen seat counts from the merged week on (her blob in base.P), so both seats
  stay on the same (parked) path until then — never one seat on jnf and one off.
- `window.nfRoomOff` exported (test hook).

## LAW 11 scan — every per-seat night-path decision (host vs guest)
| decision | before | after |
|---|---|---|
| nfOn (jnf every entry point) | own S only (dead/srv/kc) → seats could differ | + nfParked→roomOff from shared base.P: same on both seats |
| servant seat (isSrv, j42) | own seat off, friend on → stall (this bug) | room parked on both |
| risen servant (srv.risen) mid-week | riser on at once, friend's view stale | both parked until the merged week, then both on |
| home route (isKc / kc.inPal) | own seat off, friend on → same stall (guest asks, host off) | room parked on both |
| dead seat (S.dead / P.dead) | dead host: listener off on that seat → same shape as this bug for a living guest | room parked on both |
| thin part-E room (thin.on(5)) | room-level already | unchanged |
| jfe flip (PK = nfParked) | only thin-E | thin-E or room off (tablet waiting S.nfP turned at tối) |
| live cards / ACT.ok / nfActs / stealPass | nfParked | same gate → follow automatically |
| tnRelay / tnWeek / jflip pending / jsteal flip | window.nfOn | follow automatically |
| host waits the friend's choice (x.fr) | friend() entry (consort only) | unchanged; a parked room never opens it |
| host() / guest() | worldOn / seat | room-level, unchanged |
Scan command: `grep -n "nfOn()\|nfParked()" dev/build/*.js | grep -v all.js` (30 call sites in 6 files: jnf, jcoopworld, jflip, jsteal, j2, jfe) — all now behind the one gate.

## Tests (before → after)
| test | LIVE 24980875 | review/coop-night0 |
|---|---|---|
| coop-e2e cnv/tt (repro) | STUCK night 0 (FAIL «buổi 0:3 advanced for both», every week after; rv: 114/138) | 129/129 (main base) · 141/141 on r3 + fix (with THE helper) |
| coop-e2e tt/cnv (reverse) | — | 129/129 (v1) · 141/141 on r3 + fix; one main-base run FAIL at 1:2 with Q:1 on the cung-nữ guest = the jfocus «Tiếp ▸» bot gap THE helper (r3) fixes, not jnf |
| coop-e2e random ×5 (r3 + fix) | — | 5/5 141/141 |
| coop-night0 (NEW, permanent) part 1 seat table + host day end | — | 12/12 |
| coop-night0 full (part 1 + e2e cnv/tt, tt/cnv) on r3 + fix | — | 14/14 exit 0 |
| coop-night | — | 111/111 (main base) |
| night-final | — | 11/11 exit 0 |
| night-coop-park | — | ALL OK 7/7 |
| one-core-guard | — | 0 fails |
| undef-scan | — | PASS |
| quickcheck | — | PASS (open 1551 ms, old save ok, core gates PASS) |
| role-parity vs LIVE | 2 pre-existing FAILs | the same 2 pre-existing FAILs only (up:P-ONLY:harm:petcare; riseCore Danh) |
Note: main's coop-e2e has no jfocus / kg82 taps (THE helper dev/test/lib/coop-clear.js lives on review/coop-host-lag-r3): a cung-nữ seat
meets cnvScold «Tiếp ▸» dialogs main's bot never clears; with the helper (r3 + this fix) every pair is clean. coop-night0 part 2 reuses
coop-e2e (its clear() = the helper once r3 lands), no second bot.

## Permanent test
`dev/test/coop-night0.js <url> [outdir]` — part 1 (no Worker, stub room): 9 seat states × both seats → nfOn / nfRoomOff, solo with a stale base,
host day end with a cung-nữ friend (no jnf tablet / choice / ctm-nf word, the day moves). Part 2 (NIGHT0_E2E≠0): coop-e2e with
NIGHT0_PAIRS (default cnv:tt,tt:cnv), COOP_WEEKS=NIGHT0_WEEKS (1).

## Merge note
Cherry-picks clean onto review/coop-host-lag-r3 (7e7e7dd9 → 7549b06a in my test worktree). review/night-ledger-coop touches jnf `re` / ld*
only: tell that worker the sha (done).

## SẴN SÀNG KIỂM 32f4afb9cd03b4071a28894205e7144d9604da72
review/coop-night0 @ 32f4afb9cd03b4071a28894205e7144d9604da72 (fix c347a849 + site rebuild). Reviewer: run the r3 + fix lane too (cherry-pick c347a849 onto review/coop-host-lag-r3: clean) — main-base coop-e2e lacks THE helper for cung-nữ jfocus dialogs.

## REVIEW r1 — PASS (opus BIG reviewer-lander session_01N1tNP3KWzR2PZhLsfwtajY, 22/11; START_CTX ≈ 6 %)
PRIORITY #1 CHECK: ORDER MAIN 104 06:28Z | LIVE f0070e61 (no nfParked/roomOff change) | review/coop-night0 32f4afb9, review/coop-host-lag-r3 7e7e7dd9 (THE helper), review/night-ledger-coop 96c62324 (ldOn = … && nfOn()) | CLAIMS B row 'REVIEW coop-night0'.
**PASS review/coop-night0-r1 @ 234d0298** = 32f4afb9 + merge LIVE f0070e61 (only index.html/sw.js conflicted → build_site.sh) + 2 test-only commits. jnf.js hunk = the worker's, unchanged.

### Root real (deterministic, LIVE f0070e61 vs branch)
| run | LIVE f0070e61 | branch |
|---|---|---|
| coop-e2e host cnv / guest tt | **110/130 STUCK**: «buổi 0:3 advanced» FAIL, host «Chờ hảo hữu…», dates [1,3,1] vs [1,3,0] | 129/129 |
| coop-e2e host tt **home route** (COOP_A_KC=nha, NEW) / guest tt | **76/92 STUCK night 0, same shape** (a 2nd root case of the same family, not in the worker's repro) | night/date rows all ok (85/91: 6 rows = by design, see below) |
| coop-night0 part 1 (file run on LIVE, test copied) | **1/12** (nfOn true with a cung-nữ / home / dead friend; host day end opens the jnf tablet + 2 ctm-nf words) | 12/12 |

### LAW 1 — every seat class, both directions (classes that decide the night path: palace / cung nữ / home / dead)
| pair (host / guest) | main base (branch) | r3 + fix (cherry-pick c347a849 onto 7e7e7dd9: clean) |
|---|---|---|
| cnv / tt | 129/129 | 141/141 |
| tt / cnv | night 0 ok; FAIL at buổi 1:1 Q:1 «e68q6srvMood: Kẻ hầu» on the cung-nữ guest = main bot's known jfocus gap (THE helper on r3), not jnf; 2nd run inside coop-night0: ok | **141/141** |
| tt+nha / tt (home host) | night/date ok | — |
| tt / tt+nha (home guest) | night/date ok (83/91; +2 «reborn friend» rows: the reborn seat takes the home route again, __kcO) | — |
| dead seat / mid-week rise / not joined / old blob | part 1 stub rows (seat table reads both blobs: roomOff is symmetric a‖b) | — |
By-design FAILs with a home seat (both directions, LIVE too): «each sees the other as a person», «friend starts as Người lạ», «one place» — a home seat is never placed in the palace (jcoopworld friendHome → buildFriend null). coop-night0 part 2 reads only the night / date row titles.
Mid-week change: both seats read COOPW.base.P (relayed by sendMe «me» / the week merge), so a rise / palace entry counts from the merged week on both phones; part 1 row «host-blob cung nữ (this seat, as the friend sees it)» = the riser's own view → parked. Residual (not new, LOW): the few-hundred-ms window between a seat's own sendMe and the friend's receipt; jnf step()/endTurn fall to the live path on !nfOn, so a flip mid-night does not hang (no stall seen in 13 e2e runs).

### LAW 11 scan — every per-seat night-path decision
`grep -n "nfOn()\|nfParked()" dev/build/*.js | grep -v all.js`: every call site (jnf, jcoopworld tnRelay/tnWeek, jflip, jsteal, j2, jfe PK) sits behind nfOn → nfParked → roomOff; no other per-seat night gate (isSrv / isKc / S.dead used for the night only inside nfOn). Worker's table confirmed row by row. Night-ledger (other branch): ldOn() = … && nfOn() → same gate, see below.

### Fixes by the reviewer (test-only, on review/coop-night0-r1)
1. `coop-e2e.js`: COOP_A_KC / COOP_B_KC=nha (jkc window.__kcO) — one line, no hunk overlap with r3's coop-e2e edits.
2. `coop-night0.js`: default pairs + `tt+nha:tt,tt:tt+nha`; the bad-row filter reads the FAIL row title only (the trace JSON says «night 0» on every row → false FAIL); a build without nfRoomOff gives FAIL rows instead of a hang.

### Gates (branch 234d0298 unless said)
| gate | result |
|---|---|
| coop-night0 full (part 1 + cnv/tt + tt/cnv) | 14/16 before fix 2 (2 false rows = filter), then home pairs 14/14 exit 0; part 1 12/12 |
| coop-e2e random ×5 | 5/5 129/129 |
| coop-night | 111/111 (1st run under 4-job load: 111/113, row 5 «guest reloads» merge timeout; rerun 111/111; LIVE 111/111) — load flake |
| night-final / night-multi / night-coop-park | exit 0 / exit 0 / ALL OK 7/7 |
| quickcheck vs LIVE index.html | PASS (open 11963 ms under load, both builds alike; perf medians new/live render 251/262, buổi 1608/1727) |
| one-core-guard | 0 fails · undef-scan PASS |
| role-parity | 2 FAIL = LIVE f0070e61 exactly (up:P-ONLY:harm:petcare; riseCore Danh) — pre-existing |
| CO-OP LAND GATE | coop-e2e PASS (5 random + cnv/tt + r3 both ways) + own both-seat check coop-night0 (4 pinned pairs, both directions) |

### night-ledger-coop (96c62324, rv session_01N1tNP6V2KcQjF1vXk4QeoT told 22/11)
Trial merge with r1: code clean (index.html/sw.js only). ldOn gates on nfOn → same gate, no conflict. Its comments reword nfParked as «a THIN part-E room only» — stale once this lands (asked to reword); asked to check a ledger rolled unparked then parked mid-tuần (friend dies / new life as cung nữ).
