# review/fix-hadoc-loop — repeatable «Hạ độc» dilemma loop (ROBOT-10 bug B)

PRIORITY #1 CHECK ('Hạ độc|ha_doc|hadoc|roadpick|j70start'): OD 4 | claims 1 (this job, session_01964izCj26a6VP5u2Sr3qT5) | main: j70.js «Bày mưu» plan card (PEND.j70start), jtamco.js road card (PEND.roadpick, ECONOMY §5) — reused, not rebuilt | review/* none.

SẴN SÀNG KIỂM review/fix-hadoc-loop 2a8553dcf433b7ccb9aca80da77e1185100a93a4

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

## The robot's own save (dev/handover/robot/saves/save-B-hadoc-loop.json)
2a8553dc = 5ecfce53 + dev/test/robot-save-replay.js only. The save is from AFTER the loop (she was confined later for «vu oan» and holds 5 bạc), so the replay lifts the confinement and gives bạc (test only; the routing is what is checked). Real page reload, «Hạ độc» on Đoan Mộc Hàm Hương → «Ra tay ngay» → «Làm như thường»: LIVE → Bày mưu ×4 + road card ×4 in 8 taps, 0 khắc (loop, exit 1); this branch → Bày mưu ×1 + road card ×1, the act runs, 2 khắc spent (exit 0). `node dev/test/robot-save-replay.js <url> <save> B`.

## REVIEW (reviewer session_01964izF1kUMZR34FJms1QV9, 23/11)
PRIORITY #1 CHECK ('Hạ độc|hadoc|roadpick|j70start|j70Wants'): OD 4 | ledger 0 | claims worker Cj26a6VP (this job) | main: j70.js plan card, jtamco.js road card (reused, not rebuilt) | review/* review/fix-hadoc-loop only.
Target 2a8553dc (= 5ecfce53 + robot-save-replay.js). Reviewed on review/fix-hadoc-loop-rv, final-merged with newest LIVE 17835565 (merges of c39e5009, 37d07967, 17835565; only index.html/sw.js conflicted → rebuilt from source).

### 1. Repro + every choice (law 3)
- Robot save B (handover dev/handover/robot/saves/save-B-hadoc-loop.json), `node dev/test/robot-save-replay.js <url> <save> B`: LIVE c39e5009 → Bày mưu ×4, road card ×4, 8 taps, 0 khắc, loop (exit 1). Branch → Bày mưu 1, road card 1, 2 taps, 2 khắc (exit 0).
- Own probe, named targets, poison/block/huydung + spy/bribe/rash × every road × «Ra tay ngay» / «Bày mưu: …» (plan) / «Thôi» / road card alone (j70 off): branch: the act runs exactly once (runAct ≤ 1) and costs its khắc every time — 2 khắc when it runs now, or 1 khắc + one errand sent (jptime) when it travels; «Bày mưu» plan 2 khắc; «Thôi» 0 (nothing done). No act twice, none lost. LIVE: every j70-path road loops, 0 khắc. Paths without the plan card are byte-identical in behaviour to LIVE (j70Wants is false there).
- ECON_HER is cleared in econRoadGo's finally (and consumed by runAct / ptSend), so it cannot linger and suppress a later «Bày mưu».

### 2. Whole family (law 11)
- Dynamic card ping-pong scan (every her ACT key with a valid target = 30 keys, and every deck card = 21, × options 0–4, follow-ups up to 8 taps; LOOP = same card again with no khắc and no errand): LIVE 1 loop (huydung roadpick→j70start→roadpick), branch 0.
- Events/dilemmas re-firing in one buổi: 4 lives × 60 buổi bot, every option rotated: no runaway (guard never hit), repeats per buổi ≤ 2–3 (j70def, «Ra ngoài khi mặc trung y?», «Thái y bắt mạch», «Ngươi bắt gặp»…), each from a separate cause (one per deck act / per plot), same counts on LIVE. Not the same family, no re-fire loop → no FAIL item.
- Other doAct interceptors (jlooks, jslap, jsmg mini-games) resume through the INNER wrapper (d0.apply), never re-enter doAct → cannot ping-pong. Note: scan-act-intercepts.py now lists only j70 + jact, because jtamco's new pass-through `return d0.apply` sits before its pushDil — harmless, the dynamic scan covers it.

### 3. Law 1 two-way (NPC roads)
poison-road 35/35 PASS · econ-tamco PASS (npc roads n150, bad []) · econ-tamco-scan PASS (11 her + 11 npc). NPC road choice is inside the act (econRoadWrapF / econRoadNpc), no card, untouched.

### 4. Gates (merged head)
hadoc-loop ALL PASS (×7 runs; LIVE FAIL 9) · one-core-guard PASS · QUICKCHECK PASS on 59186a06 (LIVE 37d07967 merge; old save ok, perf new/live render 306/332, buổi 1570/1758 ms); on final 0273f818 (LIVE 17835565: jload/offline only) all gates PASS, old save ok, except G4 manifest-guard-selftest 15/1 — a live-CDN read, re-run alone 16 pass 0 fail, no manifest touched here; hadoc-loop, robot replay B, poison-road, one-core re-run on 0273f818 PASS · old save loads (quickcheck). Pre-existing on LIVE, confirmed LIVE→LIVE: night-steal-oldsave FAIL (tries 0, stale test, save loads, no errors); schemewire crash (null innerText) on LIVE too.

### Reviewer fix (r1, on -rv)
dev/test/hadoc-loop.js: the «direct» rows passed for nothing — they picked people she does not know, and j61 drops doAct on an unknown person silently (no act, no khắc), so the old `logSeq` check passed. The test now makes the target known (k61Know) and requires khắc spent (law 3). LIVE still FAIL 9, branch ALL PASS.

### Laws touched
1 two-way: NPC roads unchanged, PASS. 2/3 choices: every road still costs its own price + khắc, PASS. 4 one core: no number added, PASS. 7/9/10: no wording/UI change. 11: scan + table above, PASS. 13: check line above.

REVIEW PASS — LAND READY review/fix-hadoc-loop-rv 0273f81800515b85f72752d7afb66cfc8da4f47e (LIVE 17835565 is an ancestor: clean fast-forward)
