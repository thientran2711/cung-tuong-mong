# pet-bath-test (SMALL) — review/pet-bath-test 211f71ae (base LIVE fc7f98f6)

PRIORITY #1 CHECK ('pet bath|Đã vuốt|mg-ui-rest'): hits main dev/test/mg-ui-rest.js:45 only; related mg-noword-care (words -> dots in thu_tam/thu_choi/tuoi). Reused, nothing new built.

## Verdict
GAME RIGHT, TEST STALE. «Sẵn sàng» starts the bath (PETC.game="bath", rules screen gone, khắc spent), progress is 5 kit dots (NWB.cnt, `.nwb-pip`), no word in play. Test line 45 still expected the old «Đã vuốt 0/5» text.

## Fix (test only, no game change)
dev/test/mg-ui-rest.js: pet case now checks game STATE: bath = PETC.game==="bath" + 5 `.nwb-pip` with 0 `.on` + no «Đã vuốt» word. feed (food buttons) and play (ball buttons, 3 pips) already state-based; plant water already state-based (`[data-shw]`).

## Scan (law 11): in-play text asserts on no-word kinds in dev/test/*.js
| file | assert | kind | before | after |
|---|---|---|---|---|
| mg-ui-rest.js:45 | /Đã vuốt 0\/5/ | thu_tam in play | FAIL | state (pips 5, on 0, no word) PASS |
| ag-mgcal.js:50 | /Đã thử 1\/N môn/ | result list screen, not in play | PASS | unchanged (not a no-word in-play screen) |
No other test greps in-play words of a no-word kind.

## Gates (Fold 755x1000, index.html at fc7f98f6 + test)
mg-ui-rest 39/39; mg-noword-kit PASS (39 kinds, 0 words); mg-allkinds PASS 13/13; mg-ready-guide PASS 9/9; quickcheck PASS (core gates, time-spill, old save loads); coop-e2e 94/94. No UI changed, so no new shots.
