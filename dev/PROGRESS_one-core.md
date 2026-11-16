# PROGRESS — review/one-core (owner OD:L1267 ONE CORE)

- Report (before/after table, contradiction list, guard, tests, bot balance): dev/handover/reports/one-core.md
- Rulebook additions: the ONE CORE block in dev/build/jbal.js (BAL.time, lot, walk, sneak, srvAge, age, seat, night).
- Guard: `node dev/test/one-core-guard.js` (static, fails on a second value / typed core text / new inline rule number; frozen list
  dev/test/one-core-baseline.json, shrink-only via `--update`). Browser half: dev/test/rules-one-source.js §2b.
- Next (not done here): the frozen 6945 inline act/story prices (j67 story roads first) → per-act price tables in BAL, file by file,
  then `--update` to shrink the list.
