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
