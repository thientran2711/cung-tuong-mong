# live-test-reds — report (worker session_01N1tNP5EJX7wasCWUcM3KTF, depth 1; coordinator Foreman B ROOT)

PRIORITY #1 CHECK: OD 0 (OD:L1875 only names the job) | main dev/test/emotion-acts.js, kit-conform.js (existing gates, no new feature) | review/* none | claims: this row only. Branch `review/live-test-reds` from origin/main a2ad2401, commit **da15c5c4** (1 commit; generated index.html + sw.js rebuilt with dev/site/build_site.sh, same as other branches). START_CTX ~0 %; rollover not needed. No held file touched (jcoop*/jag*/j95*/jtoil*/jbal*/assemble/save untouched; assemble.py only RUN).

## (a) emotion-acts.js — three independent root causes (not one)
| # | symptom | root cause | where | fix |
|---|---|---|---|---|
| 1 | `S undefined` crash in fresh() (4/10 runs on main when 5 run in parallel) | **TEST**: `start()` hands `S` over asynchronously (measured 0.7–2.0 s after the call, 2 of 6 first calls leave S undefined); the old in-page loop `start(); if(!isSrv()) break` broke out with S undefined, then `S.mood.v=0` crashed | emotion-acts.js fresh() | new `fresh1()` starts the life from Node and waits for the real condition (S exists, S.name, no roulette step pending), re-rolls a servant life like before |
| 2 | case `scold` red (3/10 on main) | **TEST setup**: it pushes a 2nd maid at a rank whose BAL.promo.cap allows none; render() → capTrim takes her back and queues "Nội vụ phủ điều người" ahead of the pick. Also act() can queue an unrelated visitor event ("Có người tìm đến", 1 in 8) AHEAD of the pick | emotion-acts.js scold | rank raised until `capOf(S)[0]>=2` (same as case `hit` raises rank); assertion now finds the Mắng event anywhere in Q and ALSO requires its pick to list >=2 maids |
| 3 | (found while proving #2) the Mắng cung nữ card offers a **dismissed maid** / skips the pick | **GAME BUG**: `eaSync` (jemoact.js:202) refreshed `x,t,c,w` of the emotion cards but kept the OLD `go()` closure, which captured the maid list at deal time; the list only refreshed when the mood key set changed | dev/build/jemoact.js:202 | `o.go=n.go` (1 token). New case `scoldlive`: dismiss a maid after the card was built → pick must list exactly the current maids |
Before/after of the new case on the same tests: main build **0/10**, branch **10/10** (lists "Mắng <dismissed maid>" on main every time).

## (b) kit-conform G3 «tutorial: 0 intro pages (want 4)»
- Old code: `kitTour()` then `sleep(1500)`, read the card; per page click Tiếp, `sleep(1100)`, read; `if(!card) break`. The tour parks itself (jtut.js show()/loop(): `busy()` → `T.paused`, `coachOff()`) whenever any dialog/overlay is up, and resumes on its own tick, so a slow or busy moment = no card at the fixed read = 0 pages.
- **Not reproduced here**: baseline G3 passed 36/36 locally (alone, 6 in parallel, 6 CPU hogs, CDP 8x CPU throttle). So the fix is structural (race removed), not a measured before/after.
- New: wait for the real condition `#ktut .kpdlg` present OR tour off (`KTUT.on`), clearing the blockers that park the tour (Q, #modal, #dawn, #kload/#kupd/#kpodov/#coopfz) while `KTUT.paused`; after each Tiếp wait until the card signature changed (or tour off). Assertions unchanged (4 pages, same size, full-body figure, steps same size). On failure it now prints the tour state (on/paused/step/queue/visible blockers) so the next flake names its cause.
- Also kit-conform start: `sleep(2500)` → `__ctmBuilt`; 15x400 ms poll → wait for S (same async start() as #1); `sleep(1200)`/`sleep(450)` → 2 animation frames (dialogs are written synchronously, reducedMotion).

## Scan: fixed timers in the CORE GATES (tool: `python3 dev/test/timer-wait-scan.py`; `--all` = every dev/test/*.js)
Core gates = coregates.sh G2/G3 + quickcheck.d hooks + time-spill-guard + emotion-acts + coop-e2e. 33 waits >=300 ms before; whole dev/test has 3051 in 624 files (not touched: they are not gates; owners of those tests can run `--all`).
| file:line (before) | wait | kind | after |
|---|---|---|---|
| rules-one-source.js:9 | waitForTimeout(1500) after start/deser exist | boot settle | waitForFunction `__ctmBuilt===1` |
| time-spill-guard.js:54 | waitForTimeout(500) | bounded poll-retry (120 x) for the game frame | kept (is the poll interval) |
| time-spill-guard.js:61 | waitForTimeout(800) after start() | settle | F.waitForFunction S exists + no dialog up |
| kit-conform.js:23 / 25 / 26 / 28 | sleep 2500 / 400 x15 / 1200 / 450 | boot / poll / settle / settle | `__ctmBuilt` / wait S / 2 frames / 2 frames |
| kit-conform.js tour block | sleep 1500, 1100 | the G3 flake | conditions above |
| emotion-acts.js:15 | sleep(2500) | boot settle | `__ctmBuilt` |
| emotion-acts.js:20 | sleep 800 + 600 + 5400 per case | settle | S/deck wait + wait for the case's dialog laid out (no-dialog cases: 2 frames) |
| coop-e2e.js:109,116,167,200,204 | waitForTimeout 3000/3500 after goto | boot settle | `booted(o)` = `__ctmBuilt===1` |
| coop-e2e.js:89 | sleep(600) then assert carry | settle | waitForFunction on the SAME condition (`__tu.used===1&&!carry`, 8 s), then the same assertion |
| coop-e2e.js:28,34,41,48,53,88,90,96,120,129,175,176,180,185,187,205,207 | 250–3500 ms | poll-loop delays inside bounded retries, intentional offline durations (netDown/netUp), screenshot settle | **kept** (each already loops on a state check or is the thing under test); listed, not weakened |
No assertion weakened: old vs new check — emotion-acts: every old `ok` kept, scold now stricter (>=2 maids in the pick) + 1 new case; kit-conform: same 4-page/size/figure checks, only the waiting changed; others: waiting only.

## Runs (Fold 755x1000@2 for emotion-acts; 755x1000 for G3; 5 in parallel per batch)
| test | main build | branch da15c5c4 |
|---|---|---|
| emotion-acts OLD test | 7/10 (scold) ; 6/10 + 4 `S undefined` crashes (round 2) | — |
| emotion-acts NEW test (11 cases) | **0/10** (case scoldlive = game bug #3; all other cases 10/10) | **10/10** |
| kit-conform G3 (old test on main / new test on branch) | 10/10 exit 0 | 10/10 exit 0 |
| quickcheck.sh (core gates G1–G4, time-spill, open, OLD SAVE, perf) | — | **PASS** 186 s: open 1707 ms, old save ok, render 197/191, tab 457/515, buổi 1242/1236, tasks>200ms 16/17 |
| one-core-guard | — | PASS fails 0 (inlineNow 3839 <= baseline 3842) |
| coop-e2e (live Worker) | — | 63/63 passed, 0 FAIL |
(M)ISSING counts in G3 (1–4) vary run to run on both builds (random start / place cards); known, not a failure.

## Honest limits
- G3 flake itself not reproduced (0/36 baseline); fix removes the timer race but cannot be proven by a before/after. If it fires again the failure line now carries the blocker.
- emotion-acts is only run at 755x1000@2 here (default size list is 6 viewports; logic is size-independent but not re-run).
- Generated files: index.html/sw.js in the commit are rebuilt from this branch; the landing re-merge must rebuild again after merging newer main.

SẴN SÀNG KIỂM da15c5c4 (small review: diff = jemoact.js 1 token + dev/test/*.js + timer-wait-scan.py + generated index.html/sw.js).
