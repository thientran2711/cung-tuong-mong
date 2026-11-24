# E84r — SMALL REVIEW robot10-coop-stuckcap 0cdb9a41 (TEST-ONLY) — verdict **PASS 0cdb9a41** (merged with the harness head: review/robot10-coop-stuckcap-r **5127e083**)
PRIORITY #1 CHECK ('coop stuckcap'): claims F5 row | review/robot10-coop-stuckcap new; fixer report §19 read.
Sha verdicted: origin/review/robot10-coop-stuckcap 0cdb9a41 (base review/robot10-coop 6576e086). Merged with the CURRENT harness head review/robot10-coop d4b4408d (fixer #6 rtFam/dropP kept) → **review/robot10-coop-stuckcap-r 5127e083**, 0 conflicts.

| check | result |
|---|---|
| (1) no game file | diff = dev/measure/robot10-coop.js, dev/test/lib/coop-clear.js, 3 new dev/test files; no dev/build, no index.html |
| (2) family scan r10c-manual-scene-scan | 6 manual scenes listed (j93:231, jlevel:33, jne:98, jpromo:89, jtoil:1138, jne:167 #dawn). My own grep (manual:true + every kitSceneEnd caller): one more scene of the same kind NOT in its table: **jflip.js:119/153 kcf card flip** («Chuẩn bị thị tẩm / Ta biết rồi» only after final(): timer or a tap, KIT 81). The new TAP rule is generic (`.kmov` with no visible close) and kcf IS a `.kmov` whose click handler calls final("tap") → covered in behaviour. Non-blocking: add jflip to the scan table on the next harness touch. |
| (3) r10c-nightcard-tap (R8-cautious-3, timers off) | before (6576e086 coop-clear via CLEAR=): FAIL ×4 (Fold/iPad × night/dawn) → after: ok ×4 |
| (3) r10c-stuckcap | Fold ok (5/5 ok lines), iPad ok |
| (4) can the auto-tap hide a real deadlock? | No: it only clicks the scene element itself (or its picture), never a choice button; at most once per 1.5 s, forever; the stuck clock is the room week step, so a scene that never closes still ends as a stuck row, and STUCKCAP now records every stuck room per seat (shot path, layers + z, buttons ok / COVERED by). |
| (5) quickcheck --runs 5 (5127e083) | **PASS** 639 s (core gates, old save ok; render 218/202, tab 385/368, buổi 979/1002 ms) |
| (5) coop-e2e on LIVE 502c48c9 + the new coop-clear.js (the shared lib every co-op test uses) | Fold host **142/142**, COOP_SWAP **142/142** |
| (5) real pair run (5127e083, pair 1, SEED 1, STUCK=90 PCAP=600, LIVE Worker) | **0 stuck rooms** (no «## Stuck rooms» section); other rows = known families on the harness branch's older game base: save R[].rl drift, LAG budget rows |

BLOCKER FOR THE HARNESS OWNER (not this branch): review/robot10-coop (d4b4408d) does not merge with LIVE 502c48c9 — conflicts in dev/test/coop-lag.js and dev/test/lib/coop-lag-hooks.js (the harness still holds WSLOG locally; LIVE robot-coop-fix-1 r2 moved it to dev/test/lib/coop-wire.js). Whoever lands the harness must take LIVE's coop-wire version there.
Note (UX lead, from §19, for MAIN/KK20): manual kit scenes show their way out only after one timer; kitNightEnd has no tap hint.
Verdict: **PASS 0cdb9a41** (land as review/robot10-coop-stuckcap-r 5127e083 with the harness).
