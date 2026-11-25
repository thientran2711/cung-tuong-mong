# kit-opts-realtap — KIT review (KK26 KIT READY review/kit-opts-realtap dfdf48e4, KIT BUG #2, test-only + KIT §56.21)
PRIORITY #1 CHECK ('kit-opts-realtap|KIT BUG #2'): OD 0 | ledger 0 | claims KK26 | main 0 (test is new) | review/* 1 | archive 0

## REVIEW r1 (sonnet kit reviewer, 11/25/2026 ~09:10Z) — KIT FAIL (test not trustworthy)
Head dfdf48e4a8c7f137857934355c664e4b58eb5769 already contains newest LIVE 9f72524b; diff vs main = KIT.md §56.21 + dev/test/kit-opts-realtap.js + index.html build stamp. No game code changed.
Command `node dev/test/kit-opts-realtap.js index.html <out>` (Fold 755x1000 + iPad 1180x820), 3 runs on head:
| run | Fold | iPad |
|---|---|---|
| 1 | ok (16 frames, 9 long) | FAIL «vlout{}: real tap on the last option did not fire it» + «only 5 frames opened (skipped: pmPick{} rcpacc{})» |
| 2 | ok | ok (16 frames) |
| 3 | ok | FAIL same two rows |
LIVE 9f72524b index.html with the head test: ok / ok (1 run). `MUTATE=1` (the test's own non-vacuity switch: clip the frame at 62 % height, must FAIL): **ok / ok = did NOT fail**.
FAIL rows:
1. **Flaky on iPad** (2 of 3 runs FAIL on the same bare head): the iPad pass opens only 5 of 16 frames and the vlout last-option tap does not fire. Intermittent setup/veil/timing issue in the test (law: deterministic). KK: make the frame open + retry deterministic (clear veils each frame, wait for the frame to settle, retry the open) — «stable 6/6 on 0756a05b» did not hold on the newest head.
2. **Vacuous against its own mutation**: MUTATE=1 (frame clipped at 62 %) passes on both devices, so the test cannot catch the «list runs past the frame bottom» state it is named for. The rule says every kit test must FAIL on the bad state. KK: make the mutation actually bite (the rule `html body #modal .dlg{max-height:62vh…}` apparently does not hit these frames — target the real frame class, e.g. `.kpanel`/`.dlg.kpanel`, or inspect which element owns the visible frame) and show MUTATE=1 FAIL on both devices.
OK parts: KIT §56.21 text honest (M4 not reproduced; hardening not proof); test uses a real touch tap + elementFromPoint (no JS click). Not yet run: quickcheck (after r2; the branch changes no game code).
Verdict: KIT FAIL review/kit-opts-realtap dfdf48e4 → KK26 r2.
