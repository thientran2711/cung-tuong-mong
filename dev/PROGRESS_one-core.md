# PROGRESS — review/one-core (owner OD:L1267 ONE CORE)

- Report (before/after table, contradiction list, guard, tests, bot balance): dev/handover/reports/one-core.md
- Rulebook additions: the ONE CORE block in dev/build/jbal.js (BAL.time, lot, walk, sneak, srvAge, age, seat, night).
- Guard: `node dev/test/one-core-guard.js` (static, fails on a second value / typed core text / new inline rule number; frozen list
  dev/test/one-core-baseline.json, shrink-only via `--update`). Browser half: dev/test/rules-one-source.js §2b.
- Next (not done here): the frozen 6945 inline act/story prices (j67 story roads first) → per-act price tables in BAL, file by file,
  then `--update` to shrink the list.
- LANDED pass (review/one-core-land, 16/11 evening): merged with main (930 commits), every new typed rule number of the modules that came
  since moved into BAL (ONE CORE r2 block in jbal.js: route, orig, house, tds, td, actK, servK, m95, m95b, diff, ...), frozen list 6945 -> 6703;
  guard runs inside quickcheck (dev/tools/coregates.sh). Report: dev/handover/reports/one-core-land.md (handover branch).
