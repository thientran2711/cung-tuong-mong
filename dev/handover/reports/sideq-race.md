# SIDEQ-RACE — HANDOVER (worker SIDEQ-TRIM rolled over: ctx ~46 % > START_CTX 3 % + 25 %)

Order (MAIN 165, 26/11 ~22:44Z): sideq-trim PASSED (RV-163, land a6ecd04e, LC25 queue). Follow-up, non-blocking: dev/test/nrask-engine.js + dev/test/j72c-play.js failed ~1/4 runs on the branch («stuck at step 0 phải đến … trước», 3× net ERR_FAILED), never on LIVE. Hunt the race in the first-step arrival with `window.__sqoff`; fix on THIS branch review/sideq-race if real; 10× clean runs of both tests (branch AND LIVE f573dc94 for comparison); RV READY → MAIN 165 session_01Rc5AsJ8B9RuGFGzjjQkmun.
Base: this branch = review/sideq-trim f0e75bdb (same game code as the landed a6ecd04e). Report of the parent work: dev/handover/reports/sideq-trim.md.

## What is known
- My one failing run (j72c-play, ~19:20Z): all 4 seeds stuck at step 0: `[0:<pl>:home:phải đến X trước][0:<pl>:<pl>:]` → after the test sets S.place=pl, q72Why is '' but `q72Bot()` still returns false; quest never ends (res undefined). 4 reruns right after: ALL PASS; later 3× ALL PASS. LIVE ran once: PASS. The «net::ERR_FAILED ×3» console lines also appear in PASSING runs (image requests aborted by the test) — not the cause by themselves.
- That failing run was started right after `bash dev/site/build_site.sh` while the robot (3 Chromium pages) was running → CPU load / timing is a suspect.
- What sideq-trim changes that the tests touch even with `__sqoff=1` (q72Fit / stepMax are bypassed by __sqoff, nothing else is):
  1. deadline trim: every T72 template gets `T.dl = min(T.dl0, BAL.sideq.dlMax=2)` (≥ waits+1) at load (jsideq.js `sqTrim`, also wraps T7) → x.dl = t0 + 2 instead of +4..8.
  2. jsideq q72Tick wrapper: an accepted quest with `wk() > x.dl && x.st===0 && !x.log.length` is removed quietly (sqQuiet, res "gone"). If a test step crosses a tuần boundary (goTo / spend khắc → endTurn → q72Tick) with the shorter deadline, the quest can vanish or the deadline path can differ from LIVE.
  3. q72CanOffer gap (BAL.sideq.gapW) and Q72CFG.max getter (open cap 2): j72c-play accepts via `it.opts[0].go()` — «Nhận lời» refuses when `q.a.length >= Q72CFG.max` (LIVE max 4, now 2). A leftover open quest from a previous seed in the same life → accept refused → the x is NOT in q.a … but the test asserts r.acc first (it passed in my failing run), so check whether the test's own x0 / pre-push path (line ~34, `x0={u:-1…}`) collides.
  4. j72.js sentence changes (q72Short) — text only.
- `q72Bot` (j72.js:303) returns false when, for the step's place, `can(travel(S.place,pl)+1)` fails or `accessOf(S,pl).ok` is false and `q72Host` is false — the test then teleports S.place and retries; if st.ch exists and every option is blocked by `o.t`, it also returns false. Instrument q72Bot's branch taken (temporary copy of the test, like I did: replace the stuck line to also print q.a.map(u/st/tid), q72On(), can(1), S.buoi, wk(), x.dl).

## Suggested plan
1. Loop 12× each test on the branch and on LIVE (`git worktree add … f573dc94`), under load too (run a robot or a 2nd test in parallel) — get a real failure rate.
2. On a failure, the instrumented copy tells which q72Bot branch returns false. Most likely candidates: (2) deadline trim + quiet removal across a tuần, or (3) open-cap 2 with a leftover quest. Test by setting `BAL.sideq.dlMax=99` / `open=[4,4,4]` inside the test page and rerunning the loop.
3. If it is game behaviour (not test-only), fix as a family in jsideq.js (e.g. the quiet late check must use the quest's own start, never fire on the tuần it was accepted); if test-only, make the tests set `BAL.sideq` to LIVE-like values next to `__sqoff=1`.
4. 10× clean both tests, quickcheck, RV READY → MAIN 165.

Disk/worktrees: none left by me except /home/user/wt/sqrace (sparse, this file only) — remove it after taking over.
