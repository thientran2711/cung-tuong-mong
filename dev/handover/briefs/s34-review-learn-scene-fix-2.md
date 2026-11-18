PRIORITY #1 CHECK: see briefs/s33-learn-scene-fix-2.md line 1 | review/learn-scene-fix-2 8c30a85d | claims MAIN s34.
# REVIEW learn-scene-fix-2 r1 (opus, BIG tier: time/order + co-op) of 8c30a85d
Read dev/handover/briefs/s34-common.md + START_REVIEWER.md + the worker brief briefs/s33-learn-scene-fix-2.md + report reports/learn-scene-fix-2.md. Owner rules: OD:L1493 (no co-op patching — check this is a ROOT fix of the jorder kmHold↔kmPump deadlock, not a patch), OD day-khắc rule (OD tail "(17/11 ~16:45Z real").
Check: root cause proven (repro before, passes after); no new deadlock path (order-watchdog); single-player unaffected; coop-e2e x2, quickcheck, oldsave, learn-scene tests yourself; ONE CORE for any number; merge newest origin/main into review/learn-scene-fix-2-r1 first.
Verdict PASS/FAIL sha + reports/review-learn-scene-fix-2.md; send MAIN s34 + builder session_01UV1SzgWoEmnjTTEv7UgBNP (on PASS it joins batch s32a).
