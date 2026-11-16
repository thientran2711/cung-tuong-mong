# PROGRESS review/coop-night-sync-r1 (reviewer, coordinator session 9, 16/11)

Target: review/coop-night-sync @ 22e7932d. Branch r1 = that sha + merge of origin/main a363cc14, then 0a311183 (reign-road), then 02a0d3f1 (act-dedupe), then c4e89f89, 0c23da40 (kit-sweep: co-op clock strip removed), a942395b (cloud save Sổ mây, per-room pid) (outside-r2-r2: jkc home road; jcoopworld begin() conflict resolved = branch snapshot restore + main's CW.fWasHome); sw.js/index.html/assets.json rebuilt each time, never hand-merged (one conflict in
dev/build/jcoopworld.js fromCanon buổi clamp: kept the branch's `LASTB()` = B4L (3), main had literal 3; same value). Site rebuilt
with dev/site/build_site.sh (index.html, sw.js, assets.json not hand-merged).

## Verdict: PASS

## Tests (two real Chromium clients, LIVE Worker ctm-coop.victoria-tntt.workers.dev)
| test | result |
|---|---|
| dev/test/coop-night.js (full, cases 1-14) run 1 / 2 / 3 | 105/105 · 105/105 · 105/105 |
| dev/test/coop-timer.js | 43/43 |
| dev/test/coop-e2e.js run 1 / 2 / 3 | 59/59 · 59/59 · 59/59 |
| dev/test/coop-rejoin-stats.js (NEW, reviewer) run 2 | 31/31 |
| after the 0a311183 merge: coop-night / coop-e2e / coop-rejoin-stats | 105/105 · 59/59 · 31/31 |
| after the 02a0d3f1 merge: coop-night / coop-e2e / coop-rejoin-stats | 104/105 (test flake, see below) · 59/59 · 31/31 |
| coop-night run 7 (after case-3 fix) / run 8 (after isRd for all night presses) | 104/105 (guest already ready, same flake) · 105/105 |
| FINAL on main c4e89f89: coop-night / coop-rejoin-stats / coop-e2e / coop-timer | 105/105 · 31/31 · 59/59 · 43/43 |
| FINAL on main 0c23da40: coop-night / coop-timer / coop-e2e / coop-rejoin-stats | 105/105 (run 12; run 11 104/105 = same night-ready flake in case 4, test fixed) · 43/43 · 59/59 · 31/31 |
| FINAL on main a942395b: coop-night / coop-e2e / coop-timer / coop-rejoin-stats | 105/105 · 59/59 · 43/43 · 31/31 (rs8 29/31: host drew the jkc home road, guest has no palace friend entry by design; assertion now accepts COOPW.friendHome) |
| solo boot at 755x1000, 1180x820, 844x390 | game starts, no co-op clock, no overflow; "Sang buổi" steps |

coop-rejoin-stats.js (new): host rejoins mid-buổi, then guest rejoins mid-buổi, after both did acts (+tài/+sắc, khắc spent):
rejoiner keeps khắc/stats/buổi; the one who stayed keeps hers; clock runs and counts down on both with the same key; the buổi
steps for both (stayer not stuck); after the NEXT week merge both keep their gains and each sees the friend's real stats; same
date/week. (Run 1 had 2 script faults: over-pressing past the week; fixed in the script, not the game.)

## Test fix on r1
- coop-night.js readyOnly(): run 5 failed only "1: host presses Sẵn sàng at tối" because the host was ALREADY night-ready before the
  press (a night with the Emperor from the test's clear() → jnight toMorning → COOPW.nightEnd at tối marks her ready). Every state
  check after it passed (host stayed in tối, same date, guest untouched, then one merged step). Not a game defect; the test now
  counts an already-ready seat as pressed.
- Run 6: case 3 failed the same way: the host was already night-ready (Emperor's night) when the test pushed its night event and
  the guest pressed, so both were ready and the host committed `go`; the guest ran its night while the host still read the event
  (guest showed the new date, pend, "Chờ hảo hữu…"; the week merged once after). Case 3 now detects an already-ready host and only
  finishes the night ("n/a" line). See follow-up 1.

- coop-night.js + coop-rejoin-stats.js bots now accept the identity card by '^Nhận thân phận' first and skip [data-kcp] road buttons
  (same fix main made in coop-timer.js for the jkc 'Vào cung ngay' road); without it setup looped on "Thân phận kiếp này".

## Notes / follow-ups (not blocking)
- (1) Night `go` ignores dialogs that open on a seat AFTER it became ready (friend notices, a night chain, a late event): the other
  seat then runs its night and shows the new date while this one still reads. Both had declared ready, so it is not the owner's
  bug 1, but a stricter gate is cheap: the host commits only when its own Q/mini game is empty (except forced time-out / other end),
  and the guest re-sends rd only while free. Suggested for a later pass.
- The kept week lives in localStorage "ctm-coop-wk" only: a rejoin from ANOTHER device (or cleared storage) still restarts her
  week from the room's week-start base. Owner rule "newest personal state wins" is only fully met with a per-seat server copy
  (e.g. a small `wip` blob in the Worker). Two seats in the same browser profile overwrite each other's copy.
- Host commits the night alone when the guest seat is EMPTY (nOtherGone): the Worker then takes the host's end wholesale
  (F = A), so the absent guest's week is lost. Rare; worth a Worker-side merge with the base for the missing seat.
- Pre-existing on main (not this branch): closeModal() with an empty Q at the title (S undefined) throws
  "Cannot read properties of undefined (reading 'dead')" (core closeModal line `if(!S.dead...)`), reproduced on main a363cc14.
- Seen at 755x1000 in co-op (branch does not touch this layout): the clock chip "Còn … giây" + "Hảo hữu đang dở tay" sit over the second figure's name label.
