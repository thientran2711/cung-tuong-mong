# kit-veil-harness — report (B KIT-CHAIN REPAIR WORKER A)
PRIORITY #1 CHECK ('kit-dialogue-vn'): OD 0 | ledger 0 | claims 8 | main 0 (no lib/veil on main) | review/* 2 | archive 0.

## Root causes found (3, all test-harness)
1. Picture-wait veil `#kroulw` («Luân hồi / Tranh luân hồi đang trải các thân phận…», jk2b.js kitRoulette wrapper, ≤8 s) covers the scene after start() when pictures are not cached.
2. The real origin roulette `#kroul` and the minigame reward overlay `#kmrew` also appear later and cover taps (found with elementFromPoint at the tap point).
3. Auto-«Hiệu ứng: Gọn» (OPT.fxon=false) on a loaded headless browser makes kitTypeLine finish at once (kit-dialogue flake «typing on:19»).

## Shared helper: dev/test/lib/veil.js
`V.guard(page|ctx)` (init script: CSS-hides + removes #kroulw), `V.waitOut(page)` (waits veil + #kroul gone), `V.fxFull(page)` (keeps OPT.fxon true). Scan: `python3 dev/test/veil-scan.py` (exit 1 if any start()+tap test unguarded). Apply: `dev/test/veil-apply.py`.
## Family scan (before/after), main 284e0d08
start()+tap tests: before = guarded-by-veil 0 | kroul-handled 168 | UNGUARDED 138 ; after = guarded 251 | kroul-handled 168 | UNGUARDED 0 (133 auto-inserted after `x=await ..newPage(..);`, 5 by hand). Note: dev/test/placeholder-pics.js already has a SyntaxError on main (a `*/` inside its header comment) — guard line added, file still not runnable, NOT fixed here.
## Per branch (merged NEWEST origin/main 284e0d08; KIT.md + jbal2.js conflicts = kept both sides; index.html/sw.js rebuilt by assemble.py + build_site.sh)
| branch | pushed as | sha | own test no args / Fold+iPad args | quickcheck |
|---|---|---|---|---|
| kit-dialogue-vn a478ddfc (+test from r1 214c6b2c) | review/kit-dialogue-vn-r2 | 3aa58798 | 5x ALL PASS / 20 ok | PASS 210 s old save ok |
| kit-daytitle-r1 3424b927 | review/kit-daytitle-r2 | 313bdfc6 | 4x ALL PASS / ALL PASS (1 fail seen only while quickcheck ran in parallel) | PASS |
| kit-evframe-r2 e067900f | review/kit-evframe-r3 | 3e27d76f | ALL PASS / ALL PASS | PASS |
kit-dialogue.js changes: dim now read from BAL.kdlg (.8/.9, §95 softer spotlight; old .5 literal was stale), typewriter slowed via BAL.kdlg.msWord=600 in the test only, `tapUntil` (a tap is repeated only until its effect shows), hide #kroul/#kmrew. Shots (Fold+iPad) looked: ok. No kit part touched.
LIVE moved 284e0d08 → 502c48c9 (kit-mapgo, UI-only Dư đồ) after my runs → self-merge at land OK.
