# PARKING VERIFY (E66) — 24/11
PRIORITY #1 CHECK ('rank'/'MG14'): see brief; reused parking-audit.md rows, main at 68799300.

## TASK A — B-RANK anti-cheat: BUILT, verified with proof
- Exists on origin/main: rank/worker/src/score.js `check()` (L38-60) + board.js re-computes score from the life summary (client score ignored); .github/workflows/rank-worker.yml runs score+board tests before deploy; game side dev/build/jrank.js.
- Existing tests on main: score.test.mjs ALL OK, board.test.mjs ALL OK (run today).
- NEW test rank/worker/test/forged.test.mjs on review/parking-rank @ f3c7ce80 (+1 file, 0 code change): 17 forged lives, each refused 422 with the right reason (mr>7, sr>4, no standing, year 61, age vs years, age0, kids vs years, Thái tử>sons, tg 99, danh 5000, Hoàng thái hậu without son, Nữ đế without Hoàng hậu, Thái phi non-consort, trail order / trail rank / trail kids, empty ending); client-sent score 999999 ignored (server 780); best possible life 12440 ≤ cap 15000; board holds only the 2 honest lives. ALL OK.
- Design note (matches LEADERBOARD.md): trail >80 entries is truncated, not refused. Known limit per doc: a plausible invented life passes (client-side game); seed+trail stored for later review. No gap found; no code fix needed.
- Not run: http.test.mjs (needs wrangler dev; it writes data).

## TASK B — MG14 part 2: ON MAIN (BUILT)
- kitGameVs live board: dev/build/jgamevs.js:8 + jpma.js pmVsUI/pmVsShow (L285-287); Cờ = real 7×7 board pmKyRun (jpma.js L233, L299-300); ladder C4 pmLad (L237, L253-269, L415); onlookers + consequences (jpma.js L252, pmEyeTxt); pmDuel exists. Landed via E38 re-gate lander (CLAIMS L585).
- Tests present on main: dev/test/person-minigame-acts-c.test.js, pm-live, pm-giveup, pm-wordmode, pm-quick-co7. NOT re-run: they need a built game (dev/index.html absent in this checkout).
- Nothing to rebuild.

State: rank anti-cheat ~100% verified; MG14 on main, tests not re-run here.
