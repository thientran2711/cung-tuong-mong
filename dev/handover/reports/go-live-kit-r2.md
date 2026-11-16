# go-live-kit review r2 (BIG tier) - review/go-live-kit @ 35d6206c, re-merged onto origin/main c19b25eb

START_CTX ~3 %. Reviewer: sonnet, session_01UV1Szh1sDq4htTKesRN96t. Nothing pushed to main.
Branch was behind main (18 commits, title-sys). Re-merged; index.html/sw.js conflicts resolved by rebuilding (dev/site/build_site.sh).

## VERDICT: PASS a7029a88c10e64f27f19ad7f95710b3c7c629015 (pushed as review/go-live-kit-r2)

## The 3 r1 items
1. rollback/golive - FIXED.
   - dev/tools/gate-selftest.sh <main> <READY> --perf on a scratch origin: 16 passed, 0 failed (A first go-live tags old main -baseline BEFORE the push; previous -> old main;
     no tags -> build-line fallback -> old main; B rollback --yes is FF, tree == old main, bad build stays ancestor; C previous again does not toggle forward; D newer go-live then previous -> rollback build; E kit-branch commit and a stray commit refused).
   - My own adversarial runs (scratch origin, quickcheck stubbed): (a) first-ever `previous` with no tag and golive never run -> STOP, main unchanged;
     (b) golive of a non-FF sha -> STOP, main unchanged, 0 tags pushed; (c) rollback to a branch commit with NO live tag -> Refused (earlier selftest E);
     (d) rollback to current main's own files -> "already has"/new rollback commit only, FF; recovery rollback after a bad rollback works (FF, nothing lost);
     (e) unknown option `--force` rejected; unknown rev -> error; no `--force` anywhere in either script; every push plain (FF only).
2. Perf gate - FIXED. perfgate.json holds all numbers; render = fastest of 12 direct render() calls, tab = per-tab faster of 2 visits, medians of 3 alternating runs, outliers dropped.
   Normal run on the merged sha: PASS (render 242/279 ms, tab 295/338 ms new/live). +250 ms injected into render(): FAIL on renderMs (485 vs limit 378) AND tabMs (646 vs limit 484).
3. tier.js - FIXED. Probed with synthetic commits: new dev/tools/*.sh/.js/.json/.md, dev/tools/perfgate.json, dev/tools/GO_LIVE.md, dev/test/lib/* (existing and new files, .sh too) all -> BIG
   (gate files = "go-live gate (checks itself)", other tools/test-lib = "unsure -> BIG").
Branch builds / opens / old-save loads: quickcheck on the merged sha PASS (build ok, open 1010 ms, old save from the live build ok, 0 page errors).

## Non-blocking note (not a FAIL)
- Known-live trust = any live/* tag. A hand-made tag (`git tag live/x <branch commit>`) on a branch commit that is an ancestor of main is accepted by an explicit
  `rollback.sh <sha>`; I reproduced it (rolled back to files of a kit-branch commit, losing main's work; recoverable by a second rollback to the old tag). Only golive/rollback create these tags,
  so it needs a deliberate manual tag push. Optional hardening: refuse a tagged target whose tree lacks main's build line or require the tag message to be golive/rollback/baseline.
