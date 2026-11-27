# E-ODDS2 review — review/e-odds2 fb2a9141 (base 4fd3bf42) — PASS (tier SMALL, text only)

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 3 | main 15 | review/e-f4fac 4fd3bf42 + review/e-odds2 fb2a9141 | claims E-ODDS2.

## Laws touched
- Law 7 (ladder words): PASS. All 6 roll-outcome prints (j51.js:66/67, jpq.js:102/107/108/114) now read «(cơ may: ${word(x)})»; word() = KIT_ODDS = BAL.odds.cut (j0.js:5), 7 bands.
- Law 4 (one core): PASS. The word comes from the same value that is rolled (p, o, o2, I.o); no typed word/number. Diff is 4 files only: j51, jpq, new scan, report; no BAL/rule/number change.
- Law 11 (whole group): PASS. odds-word-scan covers every j*.js; table of 6 fixed + left-for-owner + not-a-roll list in report is honest (see 3).
- Law 16: PASS. chanceW/chanceLo side-chance sites untouched (diff has no hunk outside the 6 lines; scan still counts 101; jpq:126 / jpoison:79 Kèm rows unchanged).

## Checks
1. Diff vs 4fd3bf42: exactly 6 string edits chanceLo→word, «khả năng (đổi ngôi)»→«cơ may:». j51.js and jpq.js only. OK.
2. dev/test/odds-word-scan.js: exit 0, 0 FAIL (101 side-chance left, 11 not-a-roll). Own mutant (jpq.js:102 re-typed «khả năng ${chanceLo(o)}»): FAIL 1 exit 1, count 102. Restored. OK.
3. Independent grep of j*.js (khả năng / xác suất / tỉ lệ / tỷ lệ / phần trăm / cơ hội / «NN %» / «${..} %»): remaining hits are comments, CSS (%), CHW regex (j1:103, side-chance reader), kit title text (j79:274 «Thang cơ hội»), story/help prose (j64, j72sd, jchatl…), lot poems (j13), download portion (jload:66), plus the owner-question chance* sites. No player-visible roll-odds print missed. OK.
4. Rebuilt with assemble.py (built ok). odds-offladder-scan exit 0 (purge text «cơ may: Khó lường», page errors 0); facact-log-scan exit 0 (silent 0); cold-faction ALL PASS 20; fac-parity-play 4 FAIL and role-parity-drift2-play 1 FAIL — FAIL lines diffed against base 4fd3bf42 built the same way: IDENTICAL (pre-existing, not caused).
5. Old saves: only the printed string changed; values p/o/o2/I.o (saved Z.inq.o) are the same numbers passed to word(), which takes any number; no save field added or renamed. Not played in a UI (no UI change). OK.

## Verdict
PASS fb2a9141. No findings for the worker. Open owner question stays: put Kèm/status side-chance scale (~101 sites, one edit in j1.js chanceW/chanceLo + jpq:126, jpoison:79) on the 7-band ladder?
