# REVIEW-N18 — review/quickcheck-figsig a9dc0a52 — PASS
PRIORITY #1 CHECK: OD — | main d1a36374 dev/tools/quickcheck.js:59-60 (+ coop-fig-retry.md r3) | review/* none | claims none.
18 LAWS: touched none (test harness only; no game text, UI, BAL, co-op code).
1. Diff vs origin/main d1a36374 = dev/tools/quickcheck.js only, 1 ins / 2 del (path is dev/tools/, not dev/test/ as HELP-N18 says). a9dc0a52 is a descendant of main.
2. Why the wait existed: coop-fig-retry r3 (0479cf32) restored it because quickcheck also runs NEWLIFE on the OLD live build; before r2 that build held its new-life card ~9.5 s on retries with every CDN request aborted (r2 c784873c deadlock, ORDER 22/11 08:43Z). Comment said "drop once r2 is LIVE". r2 is LIVE (609c86b0): origin/main index.html has nlFigsReady x3 + KCDN.m1fail x4 (j52.js:39-41, jcdn.js:15-28), so the live comparison build opens fast. Nothing else in dev/tools reads FIGSIG. Removing it cannot re-create the deadlock while the live build is >= r2. Residual: quickcheck against a live ref older than r2 (e.g. CTM_LIVE_REF set to an old sha) would again hold ~9.5 s; not the case for main.
3. quickcheck run twice on the branch (live = d1a36374):
 run 1 PASS 318 s, open 1890 ms, old save ok, perf render 318/314 tab 668/614 buoi 2337/2338 tasks>200ms 30/30, core gates PASS (7 hooks incl. coop-one-world)
 run 2 PASS 269 s, open 1967 ms, old save ok, perf render 304/316 tab 542/626 buoi 1539/2030 tasks>200ms 26/26, core gates PASS
 No deadlock, no NEWLIFE/TypeError, no flaky picture check seen.
4. Co-op e2e: not run. quickcheck does not gate on the co-op e2e; its coop-one-world hook ran and passed. Change is harness-only, so no game-path regression is possible.
VERDICT: PASS a9dc0a52 (ancestor = current origin/main d1a36374 → fast-forward).
LANDING: coordinator `git merge --ff-only a9dc0a52` on main (no build/index.html change, no sw.js bump needed), push main. Optional: run `bash dev/tools/quickcheck.sh` after landing.
