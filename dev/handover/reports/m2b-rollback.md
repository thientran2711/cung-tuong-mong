# m2b-rollback — SAVE ROLLBACK on true reload (robot M2b, 2026-11-25)
Build served: review/lc16-kitpack4-on-dbae @ f21a1042 (kit stack on dbae89eb). Life: thd_tho, SEED 102, Fold 755x1000, real taps.
Source logs: /home/user/wt/m2/{life.log,stuck.log,bugs.jsonl} (M2b container; tail copied to dev/handover/robot/m2/logs/ at next pack).

## Timeline (UTC; game date = year/month/week/buoi)
- 19:43:56 STUCK evening, state Y12 m2 w1 buoi3 age 31 (stuck.log k=426).
- 19:45:01 SOFTLOCK-RELOAD (45 escalations, no tap-reachable button) -> true reload. State at reload: Y12 m2 w1 b3.
- 19:49:39 SOFTLOCK-RELOAD again; the state logged AT this reload is Y12 m1 w0 b3 (bugs.jsonl) — i.e. after the 19:45 reload the game came back ~1 month EARLIER than where it was reloaded from.
- 19:50:48 STUCK at Y11 m12 w2 b3 age 30 (stuck.log k=451) — one more month back, AND the year number dropped 12 -> 11 (age 31 -> 30).
- 20:00:28 STUCK again at Y12 m2 w1 b3 (k=476); 20:01:33 SOFTLOCK-RELOAD at Y12 m2 w1 b3.
Net: two consecutive reloads rolled the life back Y12 m2 -> Y12 m1 -> Y11 m12 (~2 game months, across a year boundary); the robot replayed ~16 min to get back.

## Reading
- Autosave (index.html save(), localStorage SK(SLOT)) lags behind play by 1-2 months; each reload restores the last written save, not the live S. The second rollback happened although the first reload had just re-played from the old save: the save was not refreshed while replaying.
- Same family as SAVE-ROLLBACK-AT-YEAR-ROLLOVER (flight-M2.md Y4). Fix under review: B's review/save-unseen-lists 7e01f0f5.
## Asks for reviewer
1. Verify save() runs after every Sang buổi / month tick (and before any modal that can softlock), not only at year rollover.
2. Log save timestamp + S.year/month/tuan/buoi in the save blob so a reload can show "saved at game date X"; compare with the dates above.
3. After SANGBUOI r4 is LIVE: M2b logs every evening softlock with buổi + shot to see if it cleared.
