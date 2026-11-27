# E-T2FLAKE-L5 — BLOCKED (premise false; nothing ported, no review branch pushed)

Checked on origin/main = LIVE 5fb13d60:
- None of the 4 test files exists on LIVE: dev/test/chapter-title-hook.js, title-notice-tap.js, titles2-ui.js, titles2-unit.js (`git ls-tree` empty; only other title-*.js tests exist).
- The game code they test is also absent from LIVE: no `window.TITLES2`, `rpSync`, `kitGoalChapter` in dev/build/*.js; no TITLES2/TITLES3 commits in main history. LIVE only has kitChapterTitle (j79.js), dhNoteGate (jdh.js), kitDayTitleShow (j79/jend), kitTitleOpen.
- Base 14a3a4c2 and 6cc8a0c4 are not in main; the whole titles2/titles3 feature line (introducing these tests + jdh3) has never landed.
- The hardening diff (14a3a4c2..6cc8a0c4, dev/test only) therefore has nothing to apply to; "LIVE wins, leave daycard-only cases" would leave ~all cases of titles2-unit/titles2-ui dropped, and adding the files whole would add tests that fail against LIVE code.

Dropped: everything. Run counts: none (no build/run done). Head sha: none pushed.
Needs a decision from FOREMAN E: land the titles2/titles3 feature line first (then the harden branch merges as-is), or close E-T2FLAKE as moot until then.
