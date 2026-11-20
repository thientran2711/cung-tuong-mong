# coop-staff-split — coop-e2e "names-equal" split (extra person in a consort's staff list on one seat)

PRIORITY #1 CHECK ('names-equal|staff list|coop staff|hhHas coop'): OD 0 | ledger 0 | main: names-equal check only on review/names-unique-r2-r1 (coop-e2e), hhHas j10:11 counts every staff entry | review/* names-unique-r2-r1 (check), coop-thin-g (no staff-count change; files disjoint: j10.js not touched there) | claims: CLAIMS:442 this worker only.

Worker session_01N1tNP63RC2P5MoZ7Kkhi6a (opus), coordinator Foreman B ROOT-1 session_01N1tNP4TLZqJMNrsakh7Bjk. START_CTX ≈ 5 % (estimate).
Branch **review/coop-staff-split** (from origin/main 8cf6b7d7, newest main 15bf9c77 merged). Worktree /home/user/wt/css (sparse).

## Root cause (two, both found by dumping both seats' staff lists at the divergence — STAFFDIFF + COOP_STAFFLOG probes)
1. **FALSE split (most of the reviewer's 3/7 fails, the LIVE "38 vs 37")** — the extra person is the OTHER PLAYER herself. A player who serves as cung nữ is S on her own seat and her coop entry (sid 901/902, coop:true, jcoopworld buildFriendSrv) in her mistress's staff on the other seat: one person, one place. The names-equal check counted her on one seat only; when both serve the same mistress the order also differed. Dump (L1-1): `v7 Hoa Yên Nhiên onlyB [901 "Âu Dương Ngọc Dao" maid coop]` = A's own S.name. → test fixed (coop entry / own S written as the mistress's last staff names, sorted, on both seats) + new check "each player sits in exactly one place (own name in no list, friend once)".
2. **REAL split + people vanishing (law 6b/6c)** — `hhHas(p)` (j10, the ONE household count) counted her coop entry. On the HOST (her entry lives there), `capSweep` (render + nextBuoi wrappers, jpromo) then saw her mistress one over the table and **trimmed a real servant** at her arrival (the person vanished); every month `fillStaff` ran with her pulled out (jcoopworld withoutFriend) and made one more, which the next trim dropped again. Host only → the guest kept the old list until the next merged week (probe PB-4: host drops sid 8 right after `state/placeFriend`, guest gets it at week 1). Solo never sees this (the cung-nữ player is not in m.staff). → **fix: hhHas leaves coop entries out** (fill / trim / capRoom / promo gifts / hire / staff tab all read it).

## Fix
- `dev/build/j10.js` hhHas: `filter(s=>s&&!s.coop)` (+ comment). Solo unchanged.
- `dev/test/coop-e2e.js`: names-equal normalised for the cung-nữ player(s); "one place" check; STAFFDIFF dump on a split; probes COOP_STAFFLOG=1 (host world vs merged week + mkServ stacks) and COOP_WEEKS=n.
- `dev/test/coop-staff-cap.js` (new, no network): regression that forces the path.
- `dev/test/coop-staff-scan.js` (new): law-11 group scan.

## Group scan (law 11) — `node dev/test/coop-staff-scan.js [ref]`
| family | sites | before | after |
|---|---|---|---|
| code puts her coop entry into a world list (placeFriend rivals/staff, host stand-in jcoopthin:134, guest keep jcoopthinc:213) | 4 | 4 PAIRED (pullFriend / npcMine filter) | 4 PAIRED |
| household count hhHas (cap table) | 1 + 15 readers | counts her (UNPAIRED) | EXCLUDES coop; 15 readers use the one count |
| tests comparing staff names across seats | 2 (coop-e2e same A/B) | 2 RAW (false split) | 2 NORMALISED |
| total open | | 3 | **0** |
Staff mutation sites (54 `staff.splice/push`) checked by hand: world loops (j14 servRanks, j42, jmline, jworld2, jmort, jstaff, jagstaff) run inside endTurn / rivalsBuoi = withoutFriend (her entry is out); player-act sites (j10 servAct, j70, jeitem, jface) may target her on purpose (two-way law); other staff-length reads (stipend j20 / jecon: month = friend pulled; j59 / jwhy: presence, she is really there).

## Tests (final sha 797982a5 = fix + newest main 15bf9c77 + index.html/sw.js rebuilt)
| test | before | after |
|---|---|---|
| coop-staff-cap.js (48 households, 6 lives, forced: her entry arrives + one month) | 48 arrival trims, 7 month churns → FAIL | 0 / 0 → PASS |
| coop-e2e names-equal + one-place, 11 runs on the fixed build (5 random, 3 guest cung nữ, 3 both cung nữ), LIVE Worker | names split in 3 of 7 (reviewer) / 2 of 6 here | **0 of 11**; 9 runs 80/80; 2 runs one fail each, NOT staff (below) |
| coop-e2e 12-week probe (4 month ends each, COOP_STAFFLOG, pre-fix build) | — | 4 runs, 0 host drift at the checks |
| outside/coop-home.js | — | 51/51 |
| coop-thin-d-probe.js level 4 (P3: guest buys the host who serves as cung nữ) | — | 34/34 |
| one-core-guard / undef-scan | — | PASS / PASS |
| quickcheck 797982a5 vs live 15bf9c77 | — | PASS: core gates PASS, time-spill PASS, open 1513 ms, old save from LIVE loads + plays a buổi, perf new/live render 231/207, tab 464/479, buổi 1091/989 ms |

### Not staff — 2 fails in the 11 verification runs (follow-up tickets for Foreman B)
- V3-3 (both cung nữ): "both seats show the same Thái hậu picture" FAIL at start and week 1 (guest fid null, host c14 → c20), healed at week 2. Same family as #2 (a HOST-only world write that reaches the guest one merged week late): `figThPick` (jfigx:39) draws S.thO.fid lazily at render on the host only; the guest waits ("the guest waits for the host's face"); the host's pick after a merge is not in that week's C. Owner lane art-wiring / co-op one world — not in this branch.
- V1-4 (random): "B reborn as a new person in the same world" FAIL (B's name unchanged right after rebirth); next check "A sees the reborn friend by her new name" ok. Looks like timing of the rebirth step; not seen in 20 other runs.
- names-unique-r2-r1 (not on main): its name sweep is host-only (jnamefix: "only the world owner sweeps"); a sweep that runs on the host after a merged week renames world people the guest sees only one week later — the reviewer's "one staff name differs at week 1 only (healed by week 2)". Same host-after-merge family; for the names lane.

Laws: 6b/6c (a real servant no longer vanishes; each player in exactly one place, same on both seats), 4 (one count hhHas), 11 (scan table), 14 (no second count). No UI change (no shots).

SẴN SÀNG KIỂM coop-staff-split 797982a5 (review/coop-staff-split).
