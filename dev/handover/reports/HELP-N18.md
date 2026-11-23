# HELP-N18 — drop the capped FIGSIG wait in quickcheck open()
PRIORITY #1 CHECK: OD — | main d1a36374 dev/tools/quickcheck.js:60 (+ coop-fig-retry.md r3) | review/* none | claims none. depth: n/a (worker).
Why it was added: N04 coop-fig-retry made a failed FIGURES read retry (~9.5 s). quickcheck aborts every CDN request and also runs NEWLIFE on the OLD (LIVE) build; the old build then held its new-life card ~9.5 s, so perf NEWLIFE read S too early (r2 land deadlock). r3 added a capped (30 s, never fails) wait for FIGSIG!=="" || KCDN.m1fail>0, with the note "drop once r2 is LIVE".
Why removal is safe now: LIVE main contains j52 nlFigsReady() (true when KCDN.m1fail>0) + jcdn.js m1fail, so the old build (quickcheck "live" = 0a3ceede) opens its card fast too. Nothing else in dev/tools reads FIGSIG.
Branch review/quickcheck-figsig = a9dc0a52 (off LIVE d1a36374; diff = 1 file, 3 lines).
| | before (wait kept) | after (wait removed) |
|---|---|---|
| QUICKCHECK | PASS 223 s | PASS 251 s |
| open | 1755 ms | 1836 ms |
| old save (NEWLIFE on live build) | ok | ok |
| perf render new/live | 280/233 | 260/267 |
| tab | 440/457 | 488/492 |
| buoi | 1162/956 | 1366/2320 |
| tasks>200ms | 22/24 | 23/23 |
Core gates PASS both. No deadlock / no NEWLIFE error. Co-op e2e not run: diff touches only the test harness quickcheck.js, no game/co-op code. Caveat: quickcheck against a live build older than r2 would again hold ~9.5 s on NEWLIFE.
