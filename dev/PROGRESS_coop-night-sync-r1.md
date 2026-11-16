# PROGRESS review/coop-night-sync-r1 (reviewer, coordinator session 9, 16/11)

Target: review/coop-night-sync @ 22e7932d. Branch r1 = that sha + merge of origin/main a363cc14, then 0a311183 (reign-road; sw.js/index.html rebuilt, not hand-merged) (one conflict in
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
| solo boot at 755x1000, 1180x820, 844x390 | game starts, no co-op clock, no overflow; "Sang buổi" steps |

coop-rejoin-stats.js (new): host rejoins mid-buổi, then guest rejoins mid-buổi, after both did acts (+tài/+sắc, khắc spent):
rejoiner keeps khắc/stats/buổi; the one who stayed keeps hers; clock runs and counts down on both with the same key; the buổi
steps for both (stayer not stuck); after the NEXT week merge both keep their gains and each sees the friend's real stats; same
date/week. (Run 1 had 2 script faults: over-pressing past the week; fixed in the script, not the game.)

## Notes / follow-ups (not blocking)
- The kept week lives in localStorage "ctm-coop-wk" only: a rejoin from ANOTHER device (or cleared storage) still restarts her
  week from the room's week-start base. Owner rule "newest personal state wins" is only fully met with a per-seat server copy
  (e.g. a small `wip` blob in the Worker). Two seats in the same browser profile overwrite each other's copy.
- Host commits the night alone when the guest seat is EMPTY (nOtherGone): the Worker then takes the host's end wholesale
  (F = A), so the absent guest's week is lost. Rare; worth a Worker-side merge with the base for the missing seat.
- Pre-existing on main (not this branch): closeModal() with an empty Q at the title (S undefined) throws
  "Cannot read properties of undefined (reading 'dead')" (core closeModal line `if(!S.dead...)`), reproduced on main a363cc14.
- Seen at 755x1000 in co-op (branch does not touch this layout): the clock chip "Còn … giây" + "Hảo hữu đang dở tay" sit over the second figure's name label.
