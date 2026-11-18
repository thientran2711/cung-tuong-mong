# test-flaky-sure (worker E12, test-only) — branch review/test-flaky-sure @ 36b82f75 (from origin/main 997e049d)
PRIORITY #1 CHECK ('flaky sure odds test nlNew retry'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 (MAIN ROOT-52 order 18/11 13:52Z). Reused: forced-roll idiom `window.roll=()=>true` (rel-audit/reward-box), neutral-eye idiom (shelf-check peer).
No game code changed: only dev/test/*.js + new dev/tools/test-flaky-scan.py.

## Faults and fixes
1. **Retry replays the stored life** (start() without `__nlInner` → nlBegin → nlGet(NL_KEY)): fixed in ALL 133 retry loops in 131 test files by `try{nlNew()}catch(e){}` before every `start()` in the loop (loops already on `__nlInner` are random per call and left alone).
2. **Odds ≥ BAL.odds.hi used as "sure"** (roll caps at 95 → 1/20 miss): 8 real sites forced with `window.roll=()=>true` (restored in finally): act-pics-cases, int-stats, rel-audit (deck act loop; the talk loop already forced), residence-seats (coldvisit ân xá `o.go()`), shelf-check (shelfThRebuke), sub-odds, thinhan. weather-port.js `o:100` only feeds the pure predicate wxOutAct (no roll) → false positive, listed in the scan's FP set.
3. Extra flakes found by the 20/20 runs (same tests, same family «life/taste-dependent state»), fixed test-side:
   - steal-mg-unit: target picked from her own house → runAct refuses («Người cùng cung») after the game already played → 2nd tap "plays a 2nd game" and cap list lacks the expected odds (≈3/20). Now target = first live rival outside her house.
   - shelf-check: the superior's/peer's random once-per-life taste made the frown/envy check and the tip check flaky → neutral eye (shelfTaste→0) around shelfSee(sup,peer) and shelfLook(rm,"tin đồn").
   **Possible GAME finding (not changed, for Foreman/main):** person-menu Tranh sủng/Chặn ngự giá on a same-house rival plays the minigame and THEN the act is refused (jsmg doAct wrapper checks `A.ok` but not sameHouse). Player burns a game for nothing.

## Scan (dev/tools/test-flaky-scan.py; `--fix-a` applies fix A; exit 1 while any hit remains)
| | before | after |
|---|---|---|
| A retry-replays-stored-life loops | 133 (in 133 files incl. cdn-play 2, men 2) | 0 |
| B sure-by-odds≥95 sites | 9 files (act-pics-cases 1, int-stats 1, rel-audit 2, residence-seats 1, shelf-check 1, sub-odds 1, thinhan 1, weather-port 1 FP) | 0 (7 files fixed, 1 FP, rel-audit talk loop already forced) |

## Tally (fixed tests re-run, pass/runs; each run = fresh page)
| test | origin/main | fixed |
|---|---|---|
| steal-mg-unit | 16/20 (fails: deck card not dealt (srv life) 4, 2nd tap/HER steal roll 4 same-house) | **20/20** |
| shelf-check | 19/20 → 18/20 mid-way (taste flakes) | **20/20** |
| int-stats (nbad 0 + «thành» line; script exits 1 by design on main too) | — | 6/6 |
| rel-audit | — | 3/3 |
| residence-seats | — | 2/2 |
| thinhan, act-pics-cases, sub-odds (shot tests, need outdir; sub-odds needs dev/build/all.js assembled) | — | 1/1 each exit 0, no page errors |
The other ~125 files (loop fix A only, mostly shot/scan drivers needing url/outdir/CDN) were not run 20x: the change is one mechanical statement; steal-mg-unit is the proof for the pattern.
quickcheck: `bash dev/tools/quickcheck.sh` → QUICKCHECK PASS · open 1421 ms · old save ok · core gates PASS (total 351 s).
Not fixed / out of scope: placeholder-pics.js has a pre-existing syntax error (untouched); a one-off pixi `r.updateLocalTransform is not a function` page error appeared in 1/40 shelf-check runs (engine, not test).

## ADD-ON (MAIN ROOT-52 15:30Z + Foreman E): coop-e2e + one pass over every fixed file  (branch @ 36b82f75)
- coop-e2e.js: BOTH checks that assume the friend is a stranger ('friend starts as Người lạ' and 'reborn friend is a stranger again') now also accept a servant-origin friend (f.id==null; k61St≠0 for a servant is by design). Accept-both, not pinned. Family scan (grep k61St( in dev/test): only those two sites assert 'unknown'; coop-bot only logs it. **NOT run 20/20: the live co-op Worker (ctm-coop…workers.dev) is unreachable from this box (curl 000); `node --check` only. Needs a seat with Worker access to run it 20x.**
- One pass of all 138 other changed files (`node file http://127.0.0.1:8765/index.html <out>`, 150 s cap, 4 parallel, same args as main): 42 green, 96 red. The same 96 re-run from origin/main with identical args: **95 red on both** (missing url/outdir/CDN images/shots the sandbox lacks, 4 timeouts), **0 green only on main**, 1 differing: act-dedupe-bot.js (124 timeout under 4-parallel load). Re-run alone 3x main / 4x fixed: both exit 2 or 0 at random (main 2/3 red, fixed 2/4 red) = pre-existing start-before-figs-ready race (`nlBegin` waits for FIGSIG; the test reads S at once → «S undefined»). Not caused by this job; it is a separate flake family (tests that call start() w/o __nlInner and touch S immediately), listed here, NOT fixed.
- Reds are therefore the same on main and the fixed branch; no regression found by the pass.
