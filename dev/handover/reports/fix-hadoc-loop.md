# review/fix-hadoc-loop — repeatable «Hạ độc» dilemma loop (ROBOT-10 bug B)

PRIORITY #1 CHECK ('Hạ độc|ha_doc|hadoc|roadpick|j70start'): OD 4 | claims 1 (this job, session_01964izCj26a6VP5u2Sr3qT5) | main: j70.js «Bày mưu» plan card (PEND.j70start), jtamco.js road card (PEND.roadpick, ECONOMY §5) — reused, not rebuilt | review/* none.

SẴN SÀNG KIỂM review/fix-hadoc-loop 5ecfce53b3ce6aff5d15f417afc2e256a8ca9800

Base: LIVE origin/main 225c5c08 (separate from review/fix-evening-softlock; no shared file). SMALL code change: dev/build/j70.js (+j70Wants), dev/build/jtamco.js (+3 lines), dev/test/hadoc-loop.js (new), dev/measure/scan-act-intercepts.py (new), index.html + sw.js (build). No rule, number, wording or UI changed.

## Root cause
Two `doAct` interceptors put a card up instead of running her scheme, and each lets the act through only on a ONE-CALL flag of its own:
- j70 «Bày mưu» (Ra tay ngay / Bày mưu: …) — skips while `window.__j70inst` (set only inside «Ra tay ngay»'s own doAct call);
- jtamco road card «Hạ độc» (Làm như thường / Hao tâm cơ / Thuê người / Thôi) — skips while `ECON_ROADGO` (set only inside the road's own doAct call).
jtamco wraps outside j70. «Ra tay ngay» → doAct → jtamco puts the road card up (j70's flag is gone when the card is answered) → «Làm như thường» → doAct → j70 puts «Bày mưu» up again → … for ever. The act never runs, no khắc is spent (robot: khắc used stays 2, 400 steps). Every road-priced scheme with a plan card loops, from either entry.

## Fix
- j70 `j70Wants(v,k)` (one test, exported): the plan card opens only when she has not already chosen to act now — `__j70inst` OR the road she just picked for this act and person (`window.ECON_HER`, set by jtamco econRoadGo for exactly that call).
- jtamco doAct: when `j70Wants` says j70's card is due, it goes first (pass through). Order is now always «Bày mưu» → «Ra tay ngay» → road card → the act (as j70's header and ECONOMY §5 describe), or the road card alone where j70 does not apply.

## Whole family (LAW 11)
Scan `python3 dev/measure/scan-act-intercepts.py`: every wrapper of an act entry (doAct / act / runAct / harmAct) that can stop the act and put a card up.
| interceptor | bypass | LIVE | this branch |
|---|---|---|---|
| j70.js doAct «Bày mưu» | one-call `__j70inst` | loops with jtamco | j70Wants: also the chosen road (ECON_HER) |
| jtamco.js doAct road card | one-call `ECON_ROADGO` | loops with j70 | j70's card first; no longer an interceptor of j70's path |
| jact.js act picker cards | `__adPend` | spends the khắc BEFORE the picker → cannot loop for free | unchanged |
NPC side: econRoadWrapF / econRoadNpc pick a road inside the act, no card → no loop.

Dynamic check, every scheme that has both cards (OWN70 key, jecon-priced): poison, musk, catswap, block, huydung × every road + the direct road card (j70 off):
| case | LIVE 225c5c08 | this branch |
|---|---|---|
| poison / block / huydung × Làm như thường, Hao tâm cơ, Thuê người | FAIL: roadpick→j70start→roadpick… 6 taps, 0 khắc | PASS: j70start→roadpick→act, 2 taps |
| poison / block / huydung direct (road card only) | PASS | PASS |
| musk / catswap (no odds roll → no road card, jtamco F2) | PASS | PASS |
| musk / catswap road options | SKIP (no road card by design) | SKIP |

## Gates
- `node dev/test/hadoc-loop.js [url]`: ALL PASS (16 PASS, 4 SKIP by design); LIVE: 9 FAIL (the ping-pong).
- `bash dev/tools/quickcheck.sh`: QUICKCHECK PASS (core gates PASS; old save ok; perf median new/live render 206/210 ms, buổi 1056/1970 ms, tasks>200ms 21/23).
- econ-tamco.test PASS, econ-tamco-scan PASS (11 her + 11 npc road schemes), poison-road 35/35 PASS.
- Pre-existing, not from this change: `schemewire.js` crashes the same way on LIVE (null innerText, stale test).

## Robot repro
SAVE-B (nc / nc_su / speed bot, seed 1086252990) was not forwarded yet; the loop is reproduced from the robot's steps by the test (LIVE shows exactly «Bày mưu: Ra tay ngay: hạ độc» / «Hạ độc: Làm như thường» repeating with no khắc spent).

## Merge with new LIVE 72521d62 (23/11 ~22:10Z)
5ecfce53 = a8004db6 + merge of LIVE 72521d62 (only index.html/sw.js conflicted → rebuilt; no source overlap). LIVE is ancestor (clean FF). Re-run on 5ecfce53: hadoc-loop ALL PASS; QUICKCHECK PASS (core gates PASS, old save ok, perf render 177/196 ms, buổi 924/1088 ms).
