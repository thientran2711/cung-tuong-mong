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

## REVIEW r1 (reviewer session_01N1tNP4jG1k1XQ57mFwvRGV, sonnet SMALL, depth 1; verdict PASS 55db864a on review/live-test-reds-r1)
PRIORITY #1 CHECK: OD 0 | ledger 0 | CLAIMS row `REVIEW live-test-reds r1` (this) | worker report + brief read in full | git grep of `.go=`, `x=n.x`, `o.t=n.t` across dev/build for the same stale-closure family | scan rerun.
Merged on newest origin/main 4 times (main moved 2850c45b -> 711d7bad -> 5103d561 -> b3d2ccc7 while reviewing); index.html + sw.js + assets.json rebuilt each time with dev/site/build_site.sh (assets.json "v" differs only because the CDN index moved). Final sha 55db864a descends from origin/main b3d2ccc7. If main moves again, the landing merge must rebuild again (generated files only conflict).

### (1) No weakened test: old vs new assertion table
| test / case | old assertion | new assertion | verdict |
|---|---|---|---|
| emotion-acts fresh | `start()` loop in page, S undefined crash | `fresh1()` waits for S, S.name, no roulette step, re-rolls servant life | same lives, waits a real condition (30 s timeout, throws) |
| emotion-acts scold | `Q.length>0 && /Mắng/.test(Q[0].t)` | Mắng event anywhere in Q AND its pick lists >=2 maids | stricter |
| emotion-acts scoldlive (new) | — | dismissed maid absent, every live maid present, count equal | new; main 0/5, branch 10/10 |
| emotion-acts other 9 cases | `ok` + overflow checks after fixed 800+600+5400 ms | same `ok`, same overflow checks, after S/deck wait + dialog laid out + 2 frames | same checks |
| kit-conform G3 | 4 intro pages, same size, full-body figure, steps same size | identical assertions; waits for `#ktut .kpdlg` (or tour off), clears the blockers that park the tour; failure prints tour state | same checks |
| kit-conform other dialogs | 450/1200 ms sleeps | 2 animation frames (dialogs written synchronously, reducedMotion) | same checks |
| coop-e2e / rules-one-source / time-spill-guard | fixed boot / settle timers | `__ctmBuilt===1`, S exists + no dialog, `__tu.used===1&&!carry` (8 s) then the SAME assert | waiting only |
Reviewer hardening (my commit cee6c84f): the dialog wait in emotion-acts swallowed its timeout (`.catch(()=>{})`, vacuous checks after) -> now a dialog that never shows FAILS the case (`nodlg`, bad++). Result unchanged (all PASS).

### (2) jemoact.js fix is right for the whole group
`o.go=n.go` in the same-keys refresh branch of eaSync: only `go` is refreshed; x/t/c/w were already refreshed; no number, odds, cost or text changes (go closures read BAL constants at call time). git grep for the same stale-closure family: the `x/t/c/w` in-place refresh exists ONLY at jemoact.js:202; the other emotion cards (dapdo, khoc, thu, dan, huong) hold constants only, so no other card cached a target; j67 arcOpt / jaudit thiếu-lễ wrap options of other lists (talk options, arcs), not ea cards, so nothing wraps the replaced `go`. Not BIG.

### (3) Timer scan covers every gate? NO, one hole found and fixed
The worker scan listed dev/test only and matched `sleep|waitForTimeout`. `dev/tools/quickcheck.js` (gate 2: open / old save / perf) uses its own `sl(ms)` helper: line 71 `sl(1500)` before `loadSlot(3)` was a real race (old-save step could read before the game ran to its end). Fixed: waitForFunction `__ctmBuilt===1` (60 s, throws). timer-wait-scan.py now also scans quickcheck.js + odds-cap.js (hook 40) and matches `sl(`. Rerun: 21 waits >=300 ms in 9 files, all kept ones are poll intervals, offline durations under test, observation windows (quickcheck.js:62 error window, :50/:89/:90 settle before a measured step) or screenshot settles followed by a state wait; none sits directly before an assertion.

### (4) Co-op both seats unaffected
Game change is eaSync only (never on the servant road, no co-op code). coop-e2e (live Worker, both seats + rejoin + old save): 63/63 on the first merge, again 63/63 on the 5103d561 merge, 0 FAIL.

### NEW FLAKE found and fixed in the test (not the game)
After the first main merge emotion-acts scold / scoldlive went red ~1 in 12 runs (Q empty, khắc spent). Cause: act() -> runOpt rolls the ODDS CAP (BAL.odds.hi 95; a "sure" card still fails softly, j2 runOpt / j1 roll) so ~5 % of acts spend the khắc and queue NO pick. Not a game bug (rule: no sure act). Fix in test: `BAL.odds.hi=100` before the act in both cases (like the cases that set BAL.ea.out.ch=100). Proof: 30/30 green, 6 in parallel. The worker's 10/10 had been lucky (0.95^20 ~ 36 % chance of all green).

### Runs (Fold 755x1000@2; G3 755x1000)
| test | result |
|---|---|
| emotion-acts new test on main build | 0/5 (scoldlive: Mắng lists the dismissed maid) |
| emotion-acts on branch merge | 10/10 (merge 1) ; 30/30 after the odds pin (merge 2) ; 5/5 on merges 3 and 4 |
| kit-conform G3 | 10/10 exit 0 (merge 1), 3/3 (merge 2), 3/3 (merge 3), 1/1 (merge 4); MISSING 3-4 varies, known |
| rules-one-source (G2) x3 | bad [] / core bad [] |
| time-spill-guard x3 | PASS static + runtime |
| one-core-guard | PASS fails 0 (inlineNow 3800 <= 3842) |
| coop-e2e | 63/63 twice |
| quickcheck (merge 2, sha cee6c84f+merge): G1-G3 + hooks 5 + time-spill, open 1360 ms, old save ok, perf render 214/171 ms | PASS (G4 hooks mk-layer-scan/anchor-table need dev/art in the sparse worktree: with it, 12960 pictures 0 bad / 5992 0 bad) |
Images: none made, none in git; no CDN review folder used.

### Verdict
PASS 55db864a (review/live-test-reds-r1). Honest limit: G3 tutorial flake still not reproduced by anyone (0/36 baseline, 0/20 here); the fix removes the timer race and the failure line now names the blocker if it ever fires.
