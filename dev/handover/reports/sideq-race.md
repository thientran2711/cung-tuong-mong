# SIDEQ-RACE — report (worker SIDEQ-RACE, took over from SIDEQ-TRIM's handover)

PRIORITY #1 CHECK: OD sideq rows (see sideq-trim report) | main: sideq-trim lands as a6ecd04e via LC25 | review/* review/sideq-race a395ab08 (handover from SIDEQ-TRIM) | claims SIDEQ-TRIM session_01Rc5AsJ6e84vZFSELKYtx9F (rolled to SIDEQ-RACE).

Order (MAIN 165, 26/11): dev/test/nrask-engine.js + dev/test/j72c-play.js fail ~1/4 runs on the sideq-trim branch («stuck at step 0 phải đến … trước»), never seen on LIVE. Find the race, fix the whole family (law 11), 10× clean.

## Verdict: NOT a game bug, NOT caused by sideq-trim. Two test-harness gaps, both latent on LIVE too.

### Cause 1 — j72c-play: the fresh test life is sometimes a servant (cung nữ) life
- j72c-play calls `start()` without forcing an origin. The random origin pick gives «cung nữ» (`cnv`) → j42 `srvInit` → `isSrv()` true → `q72On()` false (j72.js:13: Việc nhờ are off in a servant life, by design) → `q72Bot()` returns false at every step → «stuck at step 0», quest never ends.
- Instrumented failing run (temporary copy of the test, stuck line extended): `srv=true on=false dead=false conf=0 can1=true Ql=0 used=0 wk=0 dl=2 qa=1` in every stuck seed.
- Rate, measured in-page with the test's own start sequence (`SLOT=3; store.set(NL_KEY,null); start()` × 300): servant life 28/300 on the branch, 22/300 on LIVE (origin/main 4cfcda61) — same on both.
- Proof LIVE has the same gap: LIVE's own j72c-play with `window.__forceOrigin='cnv'` fails exactly the same way («plays to the end (undefined [0:r4:home:phải đến … trước][0:r4:r4:])»). LIVE simply had not drawn a cnv life in the few runs made.
- Fix: j72c-play forces a consort origin `window.__forceOrigin='thd'` (as nrask-engine, npc-roads*, nroadhp-* already do). Justified: it is a content test of a consort's Việc nhờ; a servant life has no Việc nhờ at all.

### Cause 2 — nrask-engine (steps 5, 6): an NPC popup lands in Q while khắc pass
- Failing run dump: `q72Why = «đang có việc chờ»`, `Q = [«Người bên cạnh»: «X đang ở cùng ngươi tại …, quay sang ngươi: nàng muốn ghé chơi ngươi.»]`. That card is jagent's «Có người tìm đến» (jagent.js:261/264), retitled by jplrule.js:47. It is pushed when an NPC's act lands during `spend()` inside `q72Do`.
- The test loops `q72Do` 12× without clearing Q, so after that popup every step is refused and the quest «did not end» (5) / `done:false` (6).
- Why load matters and the seed does not: the jagent tick is time-sliced by `performance.now()` (jagent.js:171–176, budget B) — under CPU load a different set of NPCs decides in a khắc. A seeded `Math.random` run failed under load (seed 30) and passed alone.
- Fix: `Q.length=0` before each `q72Do` in the loop (like a player dismissing the popup), exactly as nroadhp-unit.js:22 and j72c-play already do.

## Law 11 — the whole family (scan of dev/test)
Scan: every test calling `q72Do`/`q72Bot` (8 files) checked for (A) a `q72Do` loop without clearing Q, (B) a quest-playing test on a random origin; plus (C) content tests that make a quest from a GIVEN asker and so hit the sideq rank gate (the sideq-trim branch gave `window.__sqoff=1` to nrask-engine and j72c-play only).

| file | (A) Q not cleared in q72Do loop | (B) random origin | (C) sideq gate without __sqoff | before (branch) | after (branch) | LIVE 4cfcda61 |
|---|---|---|---|---|---|---|
| j72c-play.js | – (clears) | FIXED → 'thd' | had it | ~1/25 FAIL under load | 34/34 PASS (24 loaded + 10) | 24/24 (but forced cnv FAILS) |
| nrask-engine.js | FIXED (2 loops) | – ('thd') | had it | 2–3 FAIL ~1/12 under load | 34/34 PASS (24 loaded + 10) | 24/24 |
| npc-roads.js | FIXED | – | FIXED (help-quest evaluate) | 22/26 («make nr_emp» setup fails) | 27/30 | 27/30 |
| npc-roads-men.js | FIXED | – | FIXED (help-quest evaluate) | 16/23 | 19/23 | 19/23 |
| npc-roads-maids.js | FIXED | – | FIXED (help-quest evaluate) | 13/22 | 16/22 | 16/22 |
| nroadhp-shots.js | FIXED | – | FIXED | THROW (q72Make null → x.bk) | runs, 0 page errors | runs |
| nroadhp-unit.js | – (clears) | – | FIXED | THROW (q72Make null) + 0 | 1 FAIL (see below) | 2 FAIL (other) |
| j72c-oldsave.js | – (dismisses Q) | random, but asserts nothing on played steps | n/a | – | unchanged | – |

(C) is a branch-only regression of the sideq-trim gate in content tests: `q72Make(T, givenAsker)` returns null for an asker that does not fit her band / is not known to her. `__sqoff` was added only to the content (help-quest) evaluates; the long-life reach simulations in npc-roads* (lives walking roads over 240 months) are left as they are — they measure the real game. Their remaining FAILs are identical on LIVE (pre-existing, not this order).
Left as found (pre-existing, not sideq): nroadhp-unit «Mệnh truyện «Phụ tuyến» tab = kit skill cards with the person» — the tab renders without the `kskill` class now (kit card change); it was hidden before by the THROW. LIVE throws at another point (`setting 'c'`) and fails «Tai mắt → known» instead.

## Runs on the fix (branch review/sideq-race, game code unchanged = review/sideq-trim f0e75bdb)
- 12 rounds × 4 parallel (2× j72c-play + 2× nrask-engine): 48/48 ALL PASS. Before the fix the same load gave 3 failing logs in 36 (j72c 1/24, nrask 1/12), and 7/120 in a seeded nrask sweep.
- 10× each, no load: 10/10 + 10/10 ALL PASS.
- LIVE (origin/main 4cfcda61, its own tests), 12 rounds × 4: 48/48 — same gaps are latent there (cause 1 proven with a forced cnv start).

## Changes (tests only; no game code, no BAL, no build)
dev/test/j72c-play.js, nrask-engine.js, npc-roads.js, npc-roads-men.js, npc-roads-maids.js, nroadhp-shots.js, nroadhp-unit.js — each line carries a comment why. No test skipped or weakened: every assertion is unchanged.
